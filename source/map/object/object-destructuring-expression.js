import { DestructuringExpression } from "../destructuring/destructuring-expression";

export let ObjectDestructuringExpression = function(destructItem){
	return class ObjectDestructuringExpression extends DestructuringExpression {
		/**
		 * 对象解构表达式
		 * @param {Expression} origin - 解构赋值源表达式
		 */
		constructor(origin){
			super(origin.opening, origin);
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		compileTo(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(destructItem, contentBuilder, anotherBuilder);
		};
	};
}(
	// destructItem
	(expression, contentBuilder, anotherBuilder) => {
		expression.compileTo(contentBuilder, anotherBuilder);
	}
);