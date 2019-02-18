import { SyntaxTag } from "../core/index";

export let SemicolonTag = function(){
	/**
	 * 分号标签
	 * @param {Number} _type - 标签类型
	 */
	return class SemicolonTag extends SyntaxTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /;/;
	};
}();