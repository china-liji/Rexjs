import { Expression } from "../core";

export let BinaryExpression = function(){
	/**
	 * 二元表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class BinaryExpression extends Expression {
		/**
		 * 连续的二元表达式中的最后一个
		 * @type {BinaryExpression}
		 */
		last = null;

		/**
		 * 该二元表达式的左侧表达式
		 * @type {Expression}
		 */
		left = null;

		/**
		 * 该二元表达式的右侧表达式
		 * @type {Expression}
		 */
		right = null;

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 先提取左侧表达式
			this.left.extractTo(contentBuilder);
			// 追加运算符
			contentBuilder.appendContext(this.context);
			// 提取右侧表达式
			this.right.extractTo(contentBuilder);
		}
	};
}();