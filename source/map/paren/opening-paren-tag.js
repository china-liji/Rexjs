import { SyntaxTag } from "../core";

export let OpeningParenTag = function(){
	/**
	 * 起始小括号标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningParenTag extends SyntaxTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /\(/;
	};
}();