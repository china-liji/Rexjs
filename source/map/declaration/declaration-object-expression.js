import { ObjectExpression } from "../object/object-expression";

export let DeclarationObjectExpression = function(){
	return class DeclarationObjectExpression extends ObjectExpression {
		/**
		 * 是否为申明
		 * @type {Boolean}
		 */
		declaration = true;

		/**
		 * 该对象声明所处语句的表达式
		 * @type {Expression}
		 */
		objectOf = null;

		/**
		 * 变量对象声明表达式
		 * @param {Context} opening - 起始标签上下文
		 * @param {Expression} objectOf - 该对象声明所处语句的表达式
		 */
		constructor(opening, objectOf){
			super(opening);

			this.objectOf = objectOf;
		};

		/**
		 * 将对象每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @returns {void}
		 */
		convert(){};
	};
}();