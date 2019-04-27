import { ArrayExpression } from "../array/array-expression";

export let DeclarationArrayExpression = function(){
	/**
	 * 数组变量声明表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	return class DeclarationArrayExpression extends ArrayExpression {
		/**
		 * 该数组的关联对象表达式
		 * @type {Expression}
		 */
		arrayOf = null;

		/**
		 * 是否为声明
		 * @type {Boolean}
		 */
		declaration = true;

		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @returns {void}
		 */
		convert(){};
	};
}();