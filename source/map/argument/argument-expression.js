import { IdentifierExpression } from "../identifier/identifier-expression";

export let ArgumentExpression = function(){
	/**
	 * 参数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class ArgumentExpression extends IdentifierExpression {};
}();