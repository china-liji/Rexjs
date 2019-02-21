import { LiteralTag } from "../literal/literal-tag";

export let NumberTag = function(){
	/**
	 * 数字标签
	 * @param {Number} _type - 标签类型
	 */
	return class NumberTag extends LiteralTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /0[xX][0-9a-fA-F]+|0{2,}(?!\.)|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/;

		/**
		 * 异常时需要抛出的信息
		 * @type {String}
		 */
		throw = "number";
	};
}();