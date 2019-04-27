import { OpeningDeclarationNestedArrayItemTag } from "./opeing-declaration-nested-array-item-tag";
import { PropertyDestructuringItemExpression } from "../property-destructuring/property-destructuring-item-expression";
import { ClosingDeclarationArrayPropertyValueTag } from "./closing-delcartion-array-property-value-tag";

export let OpeningDeclarationArrayPropertyValueTag = function(closingDeclarationArrayPropertyValueTag){
    /**
	 * 数组声明属性值（即：对象解构中所嵌套的对象解构）起始标签
	 * @param {Number} _type - 标签类型
	 */
    return class OpeningDeclarationArrayPropertyValueTag extends OpeningDeclarationNestedArrayItemTag {
        /**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
         * @returns {SyntaxTag}
		 */
		get binding(){
			return closingDeclarationArrayPropertyValueTag;
        };
        
		/**
		 * 获取拥有该数组的表达式
		 * @param {Statement} statement - 当前语句
         * @returns {Expression}
		 */
		getArrayOf(statement){
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
    // closingDeclarationArrayPropertyValueTag
    new ClosingDeclarationArrayPropertyValueTag()
);