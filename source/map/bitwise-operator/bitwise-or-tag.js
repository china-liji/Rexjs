import { BinaryTag } from "../binary-operator/binary-tag";

export let BitwiseORTag = function(){
	/**
	 * 二进制位运算符“或”标签
	 * @param {Number} _type - 标签类型
	 */
	return class BitwiseORTag extends BinaryTag {
		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 3;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\|/;
	};
}();