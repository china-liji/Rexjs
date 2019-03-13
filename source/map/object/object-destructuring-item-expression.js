import { DestructuringItemExpression } from "../destructuring/destructuring-item-expression";
import { ContentBuilder } from "../core";

export let ObjectDestructuringItemExpression = function(destructItem){
	/**
	 * 对象解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	return class ObjectDestructuringItemExpression extends DestructuringItemExpression {
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		compileTo(contentBuilder, anotherBuilder){
			let builder = new ContentBuilder();

			// 追加初始化解构目标代码
			builder.appendString("new Rexjs.ObjectDestructuringTarget(" + anotherBuilder.result + ")");

			// 遍历的提取每一项
			this.origin.inner.forEach(
				destructItem,
				contentBuilder,
				this.getVariableBuilder(contentBuilder, builder)
			);
		}
	};
}(
	// destructItem
	(expression, contentBuilder, anotherBuilder) => {
		expression.compileTo(contentBuilder, anotherBuilder);
	}
);