import { ECMAScriptStatement } from "../ecmascript/ecmascript-statement";
import { DefaultBraceBodyExpression } from "./default-brace-body-expression";

export let BraceBodyStatement = function(){
	return class BraceBodyStatement extends ECMAScriptStatement {
		/**
		 * 语句当前表达式
		 * @type {Expression}
		 */
		expression = new DefaultBraceBodyExpression();

		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			// 如果不是关闭大括号
			if(context.content !== "}"){
				return null;
			}

			// 跳出语句并设置 inner
			this.out(parser).inner = this.statements;
			// 返回结束语句块标签
			return this.bindingOf();
		};

		/**
		 * 跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @returns {Expression}
		 */
		out(parser){
			// 返回语句块表达式
			return (
				// 恢复语句块
				parser.statements = this.statements.target
			)
			.statement
			.expression;
		};

		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 * @returns {SyntaxTag}
		 */
		tagOf(){
			return this.statements.target.statement.expression.context.tag;
		};
	};
}();