import { LiteralTag } from "../literal/literal.tag";

export let StringTag = function(){
	/**
	 * 字符串标签
	 * @param {Number} _type - 标签类型
	 */
	return class StringTag extends LiteralTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /"(?:\\(?:[^\r]|\r\n?)|[^"\\\r\n\u2028\u2029]+)*"|'(?:\\(?:[^\r]|\r\n?)|[^'\\\r\n\u2028\u2029]+)*'/;

		/**
		 * 异常时需要抛出的信息
		 * @type {String}
		 */
		throw = "string";
	};
}();