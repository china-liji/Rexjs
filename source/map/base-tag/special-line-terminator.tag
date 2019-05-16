import Rexjs from "../core";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let SpecialLineTerminatorTag = function(){
	/**
	 * 特殊的行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	return class SpecialLineTerminatorTag extends Rexjs.LineTerminatorTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.SPECIAL_LINE_TERMINATOR;
	};
}();