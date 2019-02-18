import { SyntaxTag } from "../core/index";

export let AsTag = function(){
	/**
	 * as 标签
	 * @param {Number} _type - 标签类型
	 */
	return class AsTag extends SyntaxTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /as/;
	};
}();