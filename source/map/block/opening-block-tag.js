import { OpeningBraceTag } from "../brace/opening-brace-tag";
import { BlockExpression } from "./block-expression";
import { BlockBodyStatements } from "./block-body-statements";
import { ClosingBlockTag } from "./closing-block-tag";
import { CLASS_STATEMENT_BEGIN } from "../core";

export let OpeningBlockTag = function(closingBlockTag){
	/**
	 * 起始语句块标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningBlockTag extends OpeningBraceTag {
		/**
		 * 标签类型分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingBlockTag;
		};

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new BlockExpression(context, statement.statements);
		};

		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 * @returns {ECMAScriptStatements}
		 */
		getBoundStatements(statements){
			return new BlockBodyStatements(statements);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.statementTags;
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
			// 设置当前表达式
			context.setExpressionOf(statement);
			// 设置当前语句块
			context.setStatementsOf(parser);
		};
	};
}(
	// closingBlockTag
	new ClosingBlockTag()
);