import { MathematicalNumberTag } from "./mathematical-number.tag";

export let OctalNumberTag = function(){
	/**
	 * 八进制数字标签
	 * @param {Number} _type - 标签类型
	 */
	return class OctalNumberTag extends MathematicalNumberTag {
		/**
		 * 数字基数
		 * @type {String}
		 */
		radix = 8;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /0[oO][0-7]+/;
	};
}();