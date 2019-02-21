import { MathematicalNumberTag } from "./mathematical-number-tag";

export let BinaryNumberTag = function(){
	/**
	 * 二进制数字标签
	 * @param {Number} _type - 标签类型
	 */
	return class BinaryNumberTag extends MathematicalNumberTag {
		/**
		 * 数字基数
		 * @type {String}
		 */
		radix = 2;

		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /0[bB][01]+/;
	};
}();