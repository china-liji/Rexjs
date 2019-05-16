import { TryCatchExpression } from "./try-catch.expr";
import { TryStatement } from "./try.stmt";
import { CatchTag } from "./catch.tag";
import { FinallyTag } from "./finally.tag";
import { SyntaxTag, CLASS_STATEMENT_BEGIN } from "../core";

export let TryTag = function(catchTag, finallyTag){
	/**
	 * try 标签
	 * @param {Number} _type - 标签类型
	 */
	return class TryTag extends SyntaxTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /try/;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return this.catch;
		};

		/**
		 * 获取绑定的 catchTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get catch(){
			return catchTag;
		};

		/**
		 * 获取绑定的 finallyTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get finally(){
			return finallyTag;
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.tryContextTags;
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
			statement.expression = new TryCatchExpression(context, statements);
			// 设置当前语句
			statements.statement = new TryStatement(statements);
		};
	};
}(
	// catchTag
	new CatchTag(),
	// finallyTag
	new FinallyTag()
);