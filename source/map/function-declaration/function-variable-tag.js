import { FunctionNameTag } from "../function/function-name-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let FunctionVariableTag = function(){
	/**
	 * 函数变量名标签
	 * @param {Number} _type - 标签类型
	 */
	return class FunctionVariableTag extends FunctionNameTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.FUNCTION_VARIABLE;

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);
		
			// 调用父类方法
			super.visitor(parser, context, statement, statements);
		};
	};
}();