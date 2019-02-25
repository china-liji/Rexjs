import { BinaryTag } from "../binary-operator/binary-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let GreaterThanOrEqualTag = function(){
	/**
	 * 关系运算符“大于等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	return class GreaterThanOrEqualTag extends BinaryTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.GREATER_THAN_OR_EQUAL;

		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 7;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = />=/;
	};
}();