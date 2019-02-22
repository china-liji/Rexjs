import { Expression } from "../core";

export let EnvConstantExpression = function(){
	/**
	 * 运行环境常量表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class EnvConstantExpression extends Expression {};
}();