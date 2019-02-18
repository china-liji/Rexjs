import { SyntaxTag } from "../core/index";

export let OpeningBraceTag = function(){
	/**
	 * 起始大括号标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningBraceTag extends SyntaxTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /\{/;
	};
}();