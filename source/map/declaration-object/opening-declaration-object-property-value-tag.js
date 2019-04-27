import { OpeningDeclarationObjectTag } from "./opening-declaration-object-tag";
import { ClosingDeclarationObjectPropertyValueTag } from "./closing-declaration-object-property-value-tag";
import { PropertyDestructuringItemExpression } from "../property-destructuring/property-destructuring-item-expression";

export let OpeningDeclarationObjectPropertyValueTag = function(closingDeclarationObjectPropertyValueTag){
    /**
	 * 对象声明属性值（即：对象解构中所嵌套的对象解构）起始标签
	 * @param {Number} _type - 标签类型
	 */
    return class OpeningDeclarationObjectPropertyValueTag extends OpeningDeclarationObjectTag {
        /**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
         * @returns {SyntaxTag}
		 */
		get binding(){
			return closingDeclarationObjectPropertyValueTag;
        };
        
		/**
		 * 获取拥有该对象的表达式
		 * @param {Statement} statement - 当前语句
         * @returns {Expression}
		 */
		getObjectOf(statement){
			return statement.target.target.expression.objectOf;
        };
        
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
         * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			let { target } = statement, { expression } = target;

			// 调用父类方法
			super.visitor(parser, context, statement, statements);

			// 设置 destructuringItem 属性，以标识为解构子项
			expression.value.destructuringItem = true;
			// 绑定解构项表达式
			target.bound = new PropertyDestructuringItemExpression(expression);
		};
    };
}(
    // closingDeclarationObjectPropertyValueTag
    new ClosingDeclarationObjectPropertyValueTag()
);