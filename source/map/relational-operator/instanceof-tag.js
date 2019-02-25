import { BinaryKeywordTag } from "../binary/binary-keyword-tag";

export let InstanceofTag = function(){
	/**
	 * 关系运算符“instanceof”标签
	 * @param {Number} _type - 标签类型
	 */
	return class InstanceofTag extends BinaryKeywordTag {
		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 7;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /instanceof/;
	};
}();