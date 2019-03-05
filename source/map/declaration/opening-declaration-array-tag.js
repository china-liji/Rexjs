import { OpeningArrayTag } from "../array/opening-array-tag";
import { DeclarationArrayExpression } from "./declaration-array-expression";
import { ClosingDeclarationArrayTag } from "./closing-declaration-array-tag";
import { DeclarationArrayItemSeparatorTag } from "./declaration-array-item-separator-tag";

export let OpeningDeclarationArrayTag = function(closingDeclarationArrayTag, declarationArrayItemSeparatorTag){
	/**
	 * 变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningDeclarationArrayTag extends OpeningArrayTag {
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingDeclarationArrayTag;
		};

		/**
		 * 获取拥有该数组的表达式
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getArrayOf(statement){
			return statement.target.expression;
		};

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @returns {Expression}
		 */
		getBoundExpression(context){
			return new DeclarationArrayExpression(context);
		};
		
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get separator(){
			return declarationArrayItemSeparatorTag;
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.openingDeclarationArrayContextTags;
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
			// 调用父类方法
			super.visitor(parser, context, statement, statements);

			// 通过当前语句给变量声明数组表达式绑定 arrayOf 属性
			statement.expression.arrayOf = this.getArrayOf(statement);
		};
	};
}(
	// closingDeclarationArrayTag
	new ClosingDeclarationArrayTag(),
	// declarationArrayItemSeparatorTag
	new DeclarationArrayItemSeparatorTag()
);