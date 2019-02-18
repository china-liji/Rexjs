import { SyntaxTag } from "../core/index";

export let OpeningBracketTag = function(){
	/**
	 * 起始中括号标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningBracketTag extends SyntaxTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /\[/;
	};
}();