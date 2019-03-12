import { PropertyValueStatement } from "../property/property-value-statement";
import { ShorthandMethodExpression } from "../property-name/shorthand-method-expression";

export let ShorthandMethodValueStatement = function(){
	return class ShorthandMethodValueStatement extends PropertyValueStatement {
		/**
		 * 对象简写方法值语句
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		constructor(statements){
			super(statements);

			this.expression = new ShorthandMethodExpression();
		};

		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			return this.try(parser, context);
		};

		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		try(parser, context){
			// 跳出语句并设置属性值表达式的 operand 属性
			this.out().value.operand = this.expression;
		};
	};
}();