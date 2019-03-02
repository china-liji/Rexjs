import { DestructuringDefaultItemExpression } from "../destructuring/destructuring-default-item-expression";
import { ContentBuilder } from "../core";

export let PropertyDestructuringDefaultItemExpression = function(){
	return class PropertyDestructuringDefaultItemExpression extends DestructuringDefaultItemExpression {
		/**
		 * 默认值赋值表达式
		 * @type {BinaryExpression}
		 */
		assignment = null;

		/**
		 * 属性解构默认项表达式
		 * @param {Expression} origin - 解构赋值源表达式
		 * @param {BinaryExpression} assignment - 默认值赋值表达式
		 * @param {Statements} statements - 该表达式所处的语句块
		 */
		constructor(origin, assignment, statements){
			super(origin, statements);

			this.assignment = assignment;
		};

		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @returns {void}
		 */
		extractTo(contentBuilder){
			let { origin } = this, { value } = origin;

			// 解构属性名
			origin.name.extractTo(contentBuilder);
			// 追加等号
			contentBuilder.appendContext(value.context);
			// 追加值
			value.operand.extractTo(contentBuilder);
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo(contentBuilder, anotherBuilder){
			let { origin } = this, builder = new ContentBuilder();

			// 追加获取属性方法起始代码
			builder.appendString(anotherBuilder.result + ".get(");
			// 解构属性名
			origin.name.defineTo(builder);
			// 追加获取属性方法结束代码
			builder.appendString(")");

			// 将默认值表达式转换为三元表达式
			this.toTernary(this.assignment, contentBuilder, builder);
		}
	};
}();