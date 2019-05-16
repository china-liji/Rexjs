import { BinaryTag } from "../binary-operator/binary.tag";
import { ExponentiationExpression } from "./exponentiation.expr";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let ExponentiationTag = function(){
	/**
	 * 幂运算标签
	 * @param {Number} _type - 标签类型
	 */
	return class ExponentiationTag extends BinaryTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.EXPONENTIATION;

		/**
		 * 该二元表达式的计算优先级
		 * @type {Number}
		 */
		precedence = 11;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\*\*/;

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @returns {Expression}
		 */
		getBoundExpression(context){
			return new ExponentiationExpression(context);
		};
	};
}();