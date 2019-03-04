import { SpreadTag } from "../spread-operator/spread-tag";
import { ArraySpreadItemExpression } from "./array-spread-item-expression";

export let ArraySpreadTag = function(){
	/**
	 * 数组拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ArraySpreadTag extends SpreadTag {
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			// 告知数组表达式有拓展符
			statement.target.expression.spread = true;

			return new ArraySpreadItemExpression(context);
		};
	};
}();