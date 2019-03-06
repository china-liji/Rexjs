import { OpeningDeclarationArrayTag } from "./opening-declaration-array-tag";
import { ClosingDeclarationNestedArrayItemTag } from "./closing-declaration-nested-array-item-tag";

export let OpeningDeclarationNestedArrayItemTag = function(closingDeclarationNestedArrayItemTag){
	/**
	 * 嵌套的变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningDeclarationNestedArrayItemTag extends OpeningDeclarationArrayTag {
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingDeclarationNestedArrayItemTag;
		};

		/**
		 * 获取拥有该数组的表达式
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getArrayOf(statement){
			return statement.target.expression.arrayOf;
		};
	};
}(
	// closingDeclarationNestedArrayItemTag
	new ClosingDeclarationNestedArrayItemTag()
);