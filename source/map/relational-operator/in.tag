import { BinaryKeywordTag } from "../binary-operator/binary-keyword.tag";

export let InTag = function(){
	/**
	 * 关系运算符“in”标签
	 * @param {Number} _type - 标签类型
	 */
	return class InTag extends BinaryKeywordTag {
		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 7;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /in(?!stanceof)/;
	};
}();