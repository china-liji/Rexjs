import { AssignableExpression } from "../base-expression/assignable-expression";

export let DestructuringExpression = function(){
	return class DestructuringExpression extends AssignableExpression {
		/**
		 * 解构赋值源表达式
		 * @type {Expression}
		 */
		origin = null;

		/**
		 * 解构表达式
		 * @param {Context} context - 标签上下文
		 * @param {Expression} origin - 解构赋值源表达式
		 */
		constructor(context, origin){
			super(context);

			this.origin = origin;
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {Expression} expression - 解构当前项
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		compileTo(){};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		extractTo(contentBuilder, anotherBuilder){
			// 直接提取源表达式
			this.origin.extractTo(contentBuilder);
		};
	};
}();