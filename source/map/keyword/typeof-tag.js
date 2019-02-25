import { UnaryKeywordTag } from "../unary/unary-keyword-tag";

export let TypeofTag = function(){
	/**
	 * typeof 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	return class TypeofTag extends UnaryKeywordTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /typeof/;
	};
}();