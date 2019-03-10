import { ClosingParenTag } from "../paren/closing-paren-tag";
import { TYPE_UNEXPECTED } from "../core";

export let ClosingArgumentsTag = function(){
	/**
	 * 结束函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingArgumentsTag extends ClosingParenTag {
		/**
		 * 标签匹配类型
		 * @type {Number}
		 */
		$type = TYPE_UNEXPECTED;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.functionBodyTags;
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
			// 设置参数表达式的 closing 属性
			statement.expression.arguments.closing = context;
		};
	};
}();