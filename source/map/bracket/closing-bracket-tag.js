import { SyntaxTag } from "../core/index";

export let ClosingBracketTag = function(){
	/**
	 * 结束中括号标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingBracketTag extends SyntaxTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /\]/;
	};
}();