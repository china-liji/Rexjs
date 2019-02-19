import { Expression } from "../core/index";

export let LiteralExpression = function(){
	/**
	 * 字面量表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class LiteralExpression extends Expression {};
}();