import { ExecTag } from "../exec-operator/exec.tag";
import { TryFunctionExpression } from "./try-function.expr";
import { TryFunctionStatement } from "./try-function.stmt";

export let TryFunctionTag = function(){
	/**
	 * 尝试执行函数的 try 标签
	 * @param {Number} _type - 标签类型
	 */
	return class TryFunctionTag extends ExecTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /try/;

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new TryFunctionExpression(context);
			// 设置当前语句
			statements.statement = new TryFunctionStatement(statements);
		};
	};
}();