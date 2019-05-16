import { BinaryTag } from "../binary-operator/binary.tag";

export let GreaterThanTag = function(){
	/**
	 * 关系运算符“大于号”标签
	 * @param {Number} _type - 标签类型
	 */
	return class GreaterThanTag extends BinaryTag {
		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 7;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = />/;
	};
}();