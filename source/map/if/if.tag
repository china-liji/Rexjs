import { SyntaxTag, CLASS_STATEMENT_BEGIN } from "../core";
import { IfExpression } from "./if.expr";
import { ElseTag } from "./else.tag";

export let IfTag = function(elseTag){
	/**
	 * if 标签
	 * @param {Number} _type - 标签类型
	 */
	return class IfTag extends SyntaxTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /if/;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return elseTag;
		};
		
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.ifConditionTags;
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
			// 设置表达式
			statement.expression = new IfExpression(context, statements);
		};
	};
}(
	// elseTag
	new ElseTag()
);