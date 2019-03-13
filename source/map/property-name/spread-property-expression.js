import { PropertyExpression } from "../property/property-expression";
import { SpreadExpression } from "../spread-operator/spread-expression";
import { DefaultExpression } from "../core";

export let SpreadPropertyExpression = function(){
	return class SpreadPropertyExpression extends PropertyExpression {
		/**
		 * 拓展属性的属性名
		 * @type {Expression}
		 */
		name = new DefaultExpression();

		/**
		 * 属性拓展表达式
		 * @param {Context} context - 语法标签上下文
		 */
		constructor(context){
			super();

			// 设置属性值
			this.value = new SpreadExpression(context);
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		compileTo(contentBuilder, anotherBuilder){
			// 追加对象赋值方法
			contentBuilder.appendString("Rexjs.SpreadItem.assign(" + anotherBuilder.result + ",");
			// 提取操作对象
			this.value.operand.extractTo(contentBuilder);
			// 追加方法结束小括号以及属性分隔符逗号
			contentBuilder.appendString("),");
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 直接提取属性值
			this.value.extractTo(contentBuilder);
		};
	};
}();