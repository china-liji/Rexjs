import { BinaryTag } from "../binary-operator/binary-tag";

export let RemainderTag = function(){
	/**
	 * 二元运算符“取余百分号”标签
	 * @param {Number} _type - 标签类型
	 */
	return class RemainderTag extends BinaryTag {
		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 10;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /%/;
	};
}();