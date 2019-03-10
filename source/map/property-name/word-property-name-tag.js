import { IdentifierPropertyNameTag } from "./identifier-property-name-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let WordPropertyNameTag = function(){
	/**
	 * 词组属性名称（非标识符）标签
	 * @param {Number} _type - 标签类型
	 */
	return class WordPropertyNameTag extends IdentifierPropertyNameTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.WORD_PROPERTY_NAME;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /[A-Za-z]+/;
	};
}();