import { BinaryTag } from "../binary-operator/binary-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let ZeroFillRightShiftTag = function(){
	/**
	 * 二进制运算符“无符号右位移”标签
	 * @param {Number} _type - 标签类型
	 */
	return class ZeroFillRightShiftTag extends BinaryTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.ZERO_FILL_RIGHT_SHIFT;

		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 8;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = />>>/;
	};
}();