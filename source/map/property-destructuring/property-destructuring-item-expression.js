import { DestructuringItemExpression } from "../destructuring/destructuring-item-expression";
import { ContentBuilder } from "../core";

export let PropertyDestructuringItemExpression = function(){
	/**
	 * 属性解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	return class PropertyDestructuringItemExpression extends DestructuringItemExpression {
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		compileTo(contentBuilder, anotherBuilder){
			let { origin } = this, builder = new ContentBuilder();

			// 追加获取属性方法起始代码
			builder.appendString(anotherBuilder.result + ".get(");
			// 解构属性名
			origin.name.defineTo(builder);
			// 追加获取属性方法结束代码
			builder.appendString(")");
			// 解构属性值
			origin.value.destructTo(contentBuilder, builder);
		};
	};
}();