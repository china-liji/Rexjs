import { OpeningArgumentsTag } from "../arguments/opening-arguments-tag";
import { ShorthandMethodValueExpression } from "./shorthand-method-value-expression";
import { ShorthandMethodValueStatement } from "./shorthand-method-value-statement";
import { ClosingShorthandMethodArgumentsTag } from "./closing-shorthand-method-arguments-tag";

export let OpeningShorthandMethodArgumentsTag = function(closingShorthandMethodArgumentsTag){
	/**
	 * 对象起始简写方法参数标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningShorthandMethodArgumentsTag extends OpeningArgumentsTag {
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingShorthandMethodArgumentsTag;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			let { expression } = statement, { star } = expression;

			// 设置对象属性表达式的属性值
			expression.value = new ShorthandMethodValueExpression();
			// 初始化简写方法值语句
			statement = new ShorthandMethodValueStatement(statements);
			
			// 如果星号存在
			if(star){
				// 将简写函数表达式转化为生成器
				statement.expression.toGenerator(star);
			}

			// 设置当前语句
			statements.statement = statement;

			// 调用父类方法
			super.visitor(parser, context, statement, statements);
		};
	};
}(
	// closingShorthandMethodArgumentsTag
	new ClosingShorthandMethodArgumentsTag()
);