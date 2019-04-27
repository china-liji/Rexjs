import { ECMAScriptStatement } from "../ecmascript/ecmascript-statement";
import { DefaultExpression } from "../core";
import { PropertyDestructuringItemExpression } from "../property-destructuring/property-destructuring-item-expression";

export let DeclarationIdentifierPropertyNameStatement = function(both){
	/**
	 * 标识符声明属性名称语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class DeclarationIdentifierPropertyNameStatement extends ECMAScriptStatement {
		/**
		 * 语句当前表达式
		 * @type {Expression}
		 */
		expression = new DefaultExpression();

		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			return both(
				parser,
				this,
				context.content === "}"
			);
		};

		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		try(parser, context){
			return both(
				parser,
				this,
				context.content === ","
			);
		};
	};
}(
	// both
	function(parser, statement, isSeparator){
		// 跳出语句并获取表达式
		let expression = statement.out();

		// 如果是分隔符
		if(isSeparator){
			let { context } = expression.name, { variable } = statement.target.target.expression.objectOf.context.tag;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			context.tag = variable;

			// 收集变量名
			variable.collectTo(parser, context, parser.statements);

			// 绑定解构项表达式
			statement.target.bound = new PropertyDestructuringItemExpression(expression);
		}

		return null;
	}
);