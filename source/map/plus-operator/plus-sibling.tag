import { PlusTag } from "./plus.tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let PlusSiblingTag = function(){
	/**
	 * 相邻的正号标签
	 * @param {Number} _type - 标签类型
	 */
	return class PlusSiblingTag extends PlusTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.PLUS_SIBLING;

		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 * @returns {void}
		 */
		extractTo(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		};
	};
}();