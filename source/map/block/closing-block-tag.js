import { ClosingBraceTag } from "../brace/closing-brace-tag";

export let ClosingBlockTag = function(){
	return class ClosingBlockTag extends ClosingBraceTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
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
		visitor(parser, context, statement, statements){
			// 设置表达式的 closing
			statement.expression.closing = context;
		};
	};
}();