import { ListExpression } from "../core";

export let CommaExpression = function(){
	return class CommaExpression extends ListExpression {
		/**
		 * 逗号表达式
		 * @param {Context} context - 语法标签上下文
		 * @param {Expression} firstExpression - 第一个子表达式
		 */
		constructor(context, firstExpression){
			super(context, ",");

			// 添加第一个子表达式
			this.add(firstExpression);
		};
	};
}();