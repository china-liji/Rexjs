import { BinaryTag } from "../binary-operator/binary-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let LogicalANDTag = function(){
	/**
	 * 逻辑运算符“与”标签
	 * @param {Number} _type - 标签类型
	 */
	return class LogicalANDTag extends BinaryTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.LOGICAL_AND;

		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 2;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\&\&/;
	};
}();