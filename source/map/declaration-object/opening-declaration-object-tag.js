import { OpeningObjectTag } from "../object/opening-object-tag";
import { DeclarationObjectExpression } from "./declaration-object-expression";
import { PropertyDestructuringStatement } from "../property-destructuring/property-destructuring-statement";
import { ClosingDeclarationObjectTag } from "./closing-declaration-object-tag";
import { DeclarationPropertySeparatorTag } from "./declaration-property-separator-tag";

export let OpeningDeclarationObjectTag = function(closingDeclarationObjectTag, declarationPropertySeparatorTag){
	/**
	 * 变量声明对象起始标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningDeclarationObjectTag extends OpeningObjectTag {
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingDeclarationObjectTag;
		};

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new DeclarationObjectExpression(
				context,
				this.getObjectOf(statement)
			);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {Statement}
		 */
		getBoundStatement(statements){
			return new PropertyDestructuringStatement(statements);
		};

		/**
		 * 获取拥有该对象的表达式
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getObjectOf(statement){
			return statement.target.expression;
		};

		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get separator(){
			return declarationPropertySeparatorTag;
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.declarationPropertyNameTags;
		};
	};
}(
	// closingDeclarationObjectTag
	new ClosingDeclarationObjectTag(),
	// declarationPropertySeparatorTag
	new DeclarationPropertySeparatorTag()
);