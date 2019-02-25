import { BinaryTag } from "../binary/binary-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let NonidentityTag = function(){
	/**
	 * 关系运算符“不全等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	return class NonidentityTag extends BinaryTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.NONIDENTITY;

		/**
		 * 该二元表达式的运算优先级
		 * @type {Number}
		 */
		precedence = 6;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /!==/;
	};
}();