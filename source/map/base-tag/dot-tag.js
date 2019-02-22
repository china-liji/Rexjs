import { SyntaxTag } from "../core";

export let DotTag = function(){
	/**
	 * 点标签
	 * @param {Number} _type - 标签类型
	 */
	return class DotTag extends SyntaxTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\.(?!\d)/;
	};
}();