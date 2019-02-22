import { SyntaxTag } from "../core";

export let AsTag = function(){
	/**
	 * as 标签
	 * @param {Number} _type - 标签类型
	 */
	return class AsTag extends SyntaxTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /as/;
	};
}();