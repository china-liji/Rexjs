import { BinaryTag } from "../binary/binary-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let LeftShiftTag = function(){
	/**
	 * 二进制运算符“左位移”标签
	 * @param {Number} _type - 标签类型
	 */
	return class LeftShiftTag extends BinaryTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.LEFT_SHIFT;

		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 8;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /<</;
	};
}();