import { SyntaxTag } from "../core/index";

export let ClosingBraceTag = function(){
	/**
	 * 结束大括号标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingBraceTag extends SyntaxTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /\}/;
	};
}();