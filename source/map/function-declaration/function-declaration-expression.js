import { FunctionExpression } from "../function/function-expression";
import { Expression, STATE_STATEMENT_ENDED } from "../core";

export let FunctionDeclarationExpression = function(){
	return class FunctionDeclarationExpression extends FunctionExpression {
		/**
		 * 函数声明表达式
		 * @param {Context} context - 语法标签上下文
		 */
		constructor(context){
			super(context);

			this.head = new Expression(context);
		};

		/**
		 * 获取表达式状态
		 * @returns {Number}
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		};
		
		/**
		 * 设置表达式状态
		 * @returns {Number}
		 */
		set state(value){};
	};
}();