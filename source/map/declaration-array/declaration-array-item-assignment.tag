import { DeclarationArrayItemAssignmentReadyStatement } from "./declaration-array-item-assignment-ready.stmt";
import { DefaultDestructuringItemExpression } from "../destructuring/default-destructuring-item.expr";
import { BasicAssignmentTag } from "../assignment-operator/basic-assignment.tag";

export let DeclarationArrayItemAssignmentTag = function(){
	/**
	 * 变量声明数组项赋值标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationArrayItemAssignmentTag extends BasicAssignmentTag {
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor(parser, context, statement, statements){
			// 初始化赋值准备语句
			let readyStatement = new DeclarationArrayItemAssignmentReadyStatement(statements);

			// 设置准备语句的表达式
			readyStatement.expression = statement.expression;
			// 设置当前语句
			statements.statement = readyStatement;
			
			// 调用父类访问器
			super.visitor(parser, context, readyStatement, statements);

			// 覆盖当前语句的表达式
			statement.expression = new DefaultDestructuringItemExpression(readyStatement.expression, statements);
		};
	};
}();