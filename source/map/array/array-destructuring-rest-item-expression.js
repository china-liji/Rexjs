import { DestructuringItemExpression } from "../destructuring/destructuring-item-expression";
import { ContentBuilder } from "../core";

export let ArrayDestructuringRestItemExpression = function(){
	/**
	 * 数组解构省略项表达式
	 * @param {Expression} origin - 解构项源表达式
	 */
	return class ArrayDestructuringRestItemExpression extends DestructuringItemExpression {
		/**
		 * 是否为省略解构项
		 * @type {Boolean}
		 */
		rest = true;

		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo(contentBuilder, anotherBuilder){
			let builder = new ContentBuilder();
			
			// 提取源表达式到临时内容生成器
			this.origin.operand.extractTo(builder);
			// 追加赋值操作
			contentBuilder.appendString("," + builder.result + "=" + anotherBuilder.result);
		};
	};
}();