import { IdentifierTag } from "../identifier/identifier-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let VariableTag = function(){
	/**
	 * 变量标签
	 * @param {Number} _type - 标签类型
	 */
	return class VariableTag extends IdentifierTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.VARIABLE;
	};
}();