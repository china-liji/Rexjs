import { UnaryTag } from "../unary-operator/unary.tag";

export let BitwiseNOTTag = function(){
	/**
	 * 二进制否定标签
	 * @param {Number} _type - 标签类型
	 */
	return class BitwiseNOTTag extends UnaryTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /~/;
	};
}();