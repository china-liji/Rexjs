import { BasicAssignmentTag } from "../assignment-operator/basic-assignment-tag";
import { ArgumentDefaultValueExpression } from "./argument-default-value-expression";
import { ArgumentAssignmentStatement } from "./argument-assignment-statement";

export let ArgumentAssignmentTag = function(){
	/**
	 * 默认参数赋值标签
	 * @param {Number} _type - 标签类型
	 */
	return class ArgumentAssignmentTag extends BasicAssignmentTag {
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			let { expression } = statement;

			// 设置当前表达式
			statement.expression = new ArgumentDefaultValueExpression(expression.context);

			(
				// 初始化参数赋值语句
				statements.statement = statement = new ArgumentAssignmentStatement(statements)
			)
			// 设置 expression
			.expression = expression;
			
			// 调用父类方法
			super.visitor(parser, context, statement, statements);
		};
	};
}();