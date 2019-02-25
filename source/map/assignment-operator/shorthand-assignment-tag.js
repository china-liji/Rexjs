import { AssignmentTag } from "./assignment-tag";
import { ECMAScriptOrders } from "../ecmascript";

export let ShorthandAssignmentTag = function(){
	/**
	 * 简写的二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ShorthandAssignmentTag extends AssignmentTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.SHORTHAND_ASSIGNMENT;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\+=|-=|\*=|\/=|%=|<<=|>>=|>>>=|\&=|\|=|\^=/;
	};
}();