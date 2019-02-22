import { SemicolonTag } from "./semicolon-tag";
import { EmptyExpression, STATE_STATEMENT_END, CLASS_STATEMENT_BEGIN, STATE_STATEMENT_ENDED } from "../core";

export let EmptyStatementTag = function(){
	/**
	 * 分号标签
	 * @param {Number} _type - 标签类型
	 */
	return class EmptyStatementTag extends SemicolonTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.mistakableTags;
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
			(
				// 设置当前表达式
				statement.expression = new EmptyExpression(context)
			)
			// 如果有目标语句，则设置 STATE_STATEMENT_END，目的是提取表达式的时候，要包括分号
			.state = statement.target ? STATE_STATEMENT_END : STATE_STATEMENT_ENDED;
		};
	};
}();