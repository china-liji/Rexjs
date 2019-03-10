import { PropertyValueStatement } from "../property/property-value-statement";
import { DefaultExpression } from "../core";
import { ShorthandPropertyValueExpression } from "./shorthand-property-value-expression";

export let IdentifierPropertyValueStatement = function(){
	/**
	 * 对象标识符属性值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class IdentifierPropertyValueStatement extends PropertyValueStatement {
		/**
		 * 语句当前表达式
		 * @type {Expression}
		 */
		expression = new DefaultExpression();

		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			// 跳出语句
			let propertyExpression = this.out();

			// 设置 value 为简写属性值表达式
			propertyExpression.value = new ShorthandPropertyValueExpression(propertyExpression.name.context);
		};

		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		try(parser, context){
			// 跳出语句
			let propertyExpression = this.out();

			// 如果是逗号
			if(context.content === ","){
				// 设置 value 为简写属性值表达式
				propertyExpression.value = new ShorthandPropertyValueExpression(propertyExpression.name.context);
			}
		};
	};
}();