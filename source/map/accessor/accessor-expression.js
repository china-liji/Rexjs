import { AssignableExpression } from "../base-expression/assignable-expression";

export let AccessorExpression = function(){
	return class AccessorExpression extends AssignableExpression {
		/**
		 * 访问对象
		 * @type {Expression}
		 */
		object = null;

		/**
		 * 访问属性
		 * @type {Context}
		 */
		property = null;

		/**
		 * 属性访问器表达式
		 * @param {Context} context - 语法标签上下文
		 * @param {Expression} object - 拥有该属性的对象
		 */
		constructor(context, object){
			super(context);

			this.object = object;
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			// 提取对象表达式
			this.object.extractTo(contentBuilder);
			
			// 追加点
			contentBuilder.appendContext(this.context);
			// 追加属性
			contentBuilder.appendContext(this.property);
		};
	};
}();