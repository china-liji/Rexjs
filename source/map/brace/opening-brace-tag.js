import { SyntaxTag } from "../core";

export let OpeningBraceTag = function(){
	/**
	 * 起始大括号标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningBraceTag extends SyntaxTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\{/;
	};
}();