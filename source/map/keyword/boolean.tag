import { LiteralTag } from "../literal/literal.tag";

export let BooleanTag = function(){
	/**
	 * 布尔标签
	 * @param {Number} _type - 标签类型
	 */
	return class BooleanTag extends LiteralTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /true|false/;
	};
}();