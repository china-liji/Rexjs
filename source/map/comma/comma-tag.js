import { ExpressionSeparatorTag } from "../base-tag/expression-separator-tag";
import { CommaExpression } from "./comma-expression";
import { ECMAScriptMethod } from "../ecmascript/ecmascript-method";
import { TagStorage } from "../core";
import { CommaStatement } from "./comma-statement";

export let CommaTag = function(tagStorage){
	/**
	 * 逗号标签
	 * @param {Number} _type - 标签类型
	 */
	return class CommaTag extends ExpressionSeparatorTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /,/;

		/**
		 * 获取所关联的标签存储器
		 * @returns {TagStorage}
		 */
		static get storage(){
			return tagStorage;
		};

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return tagStorage.tag;
		};

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new CommaExpression(context, statement.expression);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatement}
		 */
		getBoundStatement(statements){
			return new CommaStatement(statements);
		};
		
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.expressionTags;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor(parser, context, statement, statements){
			ECMAScriptMethod.visitor(parser, context, statement, statements);
		};
	};
}(
	// tagStorage
	new TagStorage()
);