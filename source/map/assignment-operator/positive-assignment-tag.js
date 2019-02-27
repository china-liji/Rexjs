import { QuestionAssignmentTag } from "./question-assignment-tag";

export let PositiveAssignmentTag = function(){
	/**
	 * 有效值赋值标签
	 * @param {Number} _type - 标签类型
	 */
	return class PositiveAssignmentTag extends QuestionAssignmentTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\?\?=/;

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			let expression = super.getBoundExpression(context, statement);

			// 清空判断条件
			expression.condition = "";
			return expression;
		};
	};
}();