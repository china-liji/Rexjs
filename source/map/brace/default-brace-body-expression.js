import { DefaultExpression, STATE_STATEMENT_ENDED } from "../core";

export let DefaultBraceBodyExpression = function(){
	/**
	 * 默认大括号主体表达式
	 * @param {Context} context - 语法标签上下文
	 */
	return class DefaultBraceBodyExpression extends DefaultExpression {
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		};
		
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	};
}();