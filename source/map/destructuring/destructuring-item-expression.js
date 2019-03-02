import { DestructuringExpression } from "./destructuring-expression";
import { ContentBuilder } from "../core";

export let DestructuringItemExpression = function(){
	return class DestructuringItemExpression extends DestructuringExpression {
		/**
		 * 是否为省略解构项
		 * @type {Boolean}
		 */
		rest = false;

		/**
		 * 临时变量名
		 * @type {String}
		 */
		variable = "";

		/**
		 * 解构项表达式
		 * @param {Expression} origin - 解构赋值源表达式
		 */
		constructor(origin){
			super(origin.context, origin);
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		compileTo(contentBuilder, anotherBuilder){
			let builder = new ContentBuilder();

			// 提取源表达式到临时内容生成器
			this.origin.extractTo(builder);
			// 追加赋值操作
			contentBuilder.appendString("," + builder.result + "=" + anotherBuilder.result);
		};

		/**
		 * 获取嵌套类型解构项的变量名生成器
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {ContentBuilder}
		 */
		getVariableBuilder(contentBuilder, anotherBuilder){
			// 根据长度判断
			switch(this.origin.inner.length){
				// 如果是 0，说明没有解构内容，不需要解构
				case 0:
					return null;

				// 如果是 1，说明可以直接用 $Rexjs_0[0] 形式直接使用，不需要单独使用变量名记录
				case 1:
					return anotherBuilder;
			}

			let { variable } = this, builder = new ContentBuilder();

			// 追加变量名到临时内容生成器
			builder.appendString(variable);

			// 追加变量名的赋值操作
			contentBuilder.appendString(
				"," + variable + "=" + anotherBuilder.result
			);

			return builder;
		};
	};
}();