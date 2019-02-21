import { LiteralTag } from "../literal/literal-tag";

export let NullTag = function(){
	/**
	 * null 标签
	 * @param {Number} _type - 标签类型
	 */
	return class NullTag extends LiteralTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /null/;
	};
}();