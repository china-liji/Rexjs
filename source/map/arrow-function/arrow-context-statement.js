import { SingleStatement } from "../base-statement/single-statement";
import { ArrowFunctionBodyExpression } from "./arrow-function-body-expression";
import { DefaultExpression } from "../core";

export let ArrowContextStatement = function(){
	/**
	 * 箭头符号上下文语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class ArrowContextStatement extends SingleStatement {
		/**
		 * 语句当前表达式
		 * @type {Expression}
		 */
		expression = new DefaultExpression();

		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {void}
		 */
		requestOut(parser, context){
			let { target } = parser.statements;

			// 跳出当前语句
			this.out();
			// 跳出 box 语句并设置 body
			target.statement.out().body = new ArrowFunctionBodyExpression(this.expression);
			// 设置当前语句块
			parser.statements = target;
		};
		
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		try(parser, context){
			// 如果是逗号
			if(context.content === ","){
				this.requestOut(parser, context);
			}
		};
	};
}();