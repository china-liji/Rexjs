import { SyntaxTag } from "../core";

export let SemicolonTag = function(){
	/**
	 * 分号标签
	 * @param {Number} _type - 标签类型
	 */
	return class SemicolonTag extends SyntaxTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /;/;
	};
}();