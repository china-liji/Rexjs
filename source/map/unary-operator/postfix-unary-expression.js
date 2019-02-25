import { UnaryExpression } from "./unary-expression";

export let PostfixUnaryExpression = function(){
	return class PostfixUnaryExpression extends UnaryExpression {
		/**
		 * 后置一元表达式
		 * @param {Context} context - 标签上下文
		 * @param {AssignableExpression} operand - 操作对象表达式
		 */
		constructor(context, operand){
			super(context);

			this.operand = operand;
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 提取操作对象内容
			this.operand.extractTo(contentBuilder);
			// 提取一元操作符的内容
			contentBuilder.appendContext(this.context);
		};
	};
}();