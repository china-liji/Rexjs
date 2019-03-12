import { FunctionExpression } from "../function/function-expression";
import { DefaultExpression } from "../core";

export let ShorthandMethodExpression = function(){
	return class ShorthandMethodExpression extends FunctionExpression {
		/**
		 * 方法头部表达式
		 * @type {Expression}
		 */
		head = new DefaultExpression();

		/**
		 * 简写方法表达式
		 */
		constructor(){
			super(null);
		};
	};
}();