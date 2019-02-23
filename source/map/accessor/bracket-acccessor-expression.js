import { AccessorExpression } from "./accessor-expression";
import { PartnerExpression } from "../core";

export let BracketAccessorExpression = function(){
	return class BracketAccessorExpression extends AccessorExpression {
		/**
		 * 中括号属性访问器表达式
		 * @param {Context} context - 语法标签上下文
		 * @param {Expression} object - 拥有该属性的对象
		 */
		constructor(context, object){
			super(context, object);

			this.property = new PartnerExpression(context);
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 提取对象
			this.object.extractTo(contentBuilder);
			// 提取属性
			this.property.extractTo(contentBuilder);
		}
	};
}();