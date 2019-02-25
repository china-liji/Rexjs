import { BinaryTag } from "../binary/binary-tag";

export let BitwiseXORTag = function(){
	/**
	 * 二进制位运算符“非或”标签
	 * @param {Number} _type - 标签类型
	 */
	return class BitwiseXORTag extends BinaryTag {
		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 4;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\^/;
	};
}();