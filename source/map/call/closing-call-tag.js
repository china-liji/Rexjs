import { ClosingParenTag } from "../paren/closing-paren-tag";

export let ClosingCallTag = function(){
	/**
	 * 结束函数调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingCallTag extends ClosingParenTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.expressionContextTags;
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