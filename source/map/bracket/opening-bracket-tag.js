import { SyntaxTag } from "../core";

export let OpeningBracketTag = function(){
	/**
	 * 起始中括号标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningBracketTag extends SyntaxTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\[/;
	};
}();