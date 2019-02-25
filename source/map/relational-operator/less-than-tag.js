import { BinaryTag } from "../binary/binary-tag";

export let LessThanTag = function(){
	/**
	 * 关系运算符“小于号”标签
	 * @param {Number} _type - 标签类型
	 */
	return class LessThanTag extends BinaryTag {
		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 7;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /</;
	};
}();