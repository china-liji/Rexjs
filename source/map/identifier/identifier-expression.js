import { AssignableExpression } from "../base-expression/assignable-expression";

export let IdentifierExpression = function(){
	/**
	 * 标识符表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class IdentifierExpression extends AssignableExpression {};
}();