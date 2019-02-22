import { SyntaxTag, Expression, CLASS_STATEMENT_BEGIN } from "../core";

export let DebuggerTag = function(){
	/**
	 * debugger 标签
	 * @param {Number} _type - 标签类型
	 */
	return class DebuggerTag extends SyntaxTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /debugger/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTagsMap}
		 */
		require(tagsMap){
			return tagsMap.statementEndTags;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement){
			statement.expression = new Expression(context);
		};
	};
}();