import { Expression } from "../core";

export let TernaryExpression = function(){
	/**
	 * 三元表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class TernaryExpression extends Expression {
		/**
		 * 三元表达式的条件表达式
		 * @type {Expression}
		 */
		condition = null;
		
		/**
		 * 三元表达式的否定条件表达式
		 * @type {Expression}
		 */
		negative = null;

		/**
		 * 三元表达式的成立条件表达式
		 * @type {Expression}
		 */
		positive = null;

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 提取条件表达式
			this.condition.extractTo(contentBuilder);
			// 追加问号上下文
			contentBuilder.appendContext(this.context);
			// 提取成立条件表达式
			this.positive.extractTo(contentBuilder);
			// 追加冒号上下文
			contentBuilder.appendContext(this.colonContext);
			// 提取否定条件表达式
			this.negative.extractTo(contentBuilder);
		};
	};
}();