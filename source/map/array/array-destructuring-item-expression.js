import { DestructuringItemExpression } from "../destructuring/destructuring-item-expression";
import { ContentBuilder } from "../core";

export let ArrayDestructuringItemExpression = function(){
	/**
	 * 数组解构项表达式
	 * @param {Expression} origin - 解构项源表达式
	 */
	return class ArrayDestructuringItemExpression extends DestructuringItemExpression {
		/**
		 * 解构单项
		 * @param {Expression} expression - 需要解构的表达式
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @param {Number} index - 项的索引
		 * @returns {void}
		 */
		static destruct(expression, contentBuilder, anotherBuilder, index){
			// 如果是空表达式
			if(expression.empty){
				return;
			}

			// 初始化变量名内容生成器
			let builder = new ContentBuilder();

			// 追加当前项的变量名
			builder.appendString(
				anotherBuilder.result + (
					expression.rest ?
						".slice(" + index + ")" :
						"[" + index + "]"
				)
			);

			// 提取并编译表达式文本内容
			expression.compileTo(contentBuilder, builder);
		};

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 * @returns {void}
		 */
		compileTo(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(
				ArrayDestructuringItemExpression.destruct,
				contentBuilder,
				this.getVariableBuilder(contentBuilder, anotherBuilder)
			);
		};
	};
}();