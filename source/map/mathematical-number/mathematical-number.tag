import { NumberTag } from "../base-tag/number.tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let MathematicalNumberTag = function(){
	/**
	 * 算数数字标签
	 * @param {Number} _type - 标签类型
	 */
	return class MathematicalNumberTag extends NumberTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.MATHEMATICAL_NUMBER;

		/**
		 * 数字基数
		 * @type {String}
		 */
		radix = 10;

		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 * @returns {void}
		 */
		extractTo(contentBuilder, content){
			// 追加字符串内容
			contentBuilder.appendString(
				// 如果需要编译
				ECMAScriptConfig.es6Base ?
					// 转换为指定基数的数字
					'(parseInt("' + content.substring(2) + '",' + this.radix + "))" :
					content
			);
		}
	};
}();