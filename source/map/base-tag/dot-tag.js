import { SyntaxTag } from "../core/index";

export let DotTag = function(){
	/**
	 * 点标签
	 * @param {Number} _type - 标签类型
	 */
	return class DotTag extends SyntaxTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /\.(?!\d)/;
	};
}();