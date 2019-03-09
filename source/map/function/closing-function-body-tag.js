import { ClosingBraceTag } from "../brace/closing-brace-tag";
import { STATE_STATEMENT_ENDED } from "../core";

export let ClosingFunctionBodyTag = function(){
	/**
	 * 结束函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingFunctionBodyTag extends ClosingBraceTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap, currentTags, parser){
			return (
				// 如果表达式已结束
				(parser.statements.statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED ?
					tagsMap.mistakableTags :
					tagsMap.expressionContextTags
			);
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

			// 跳出语句并设置表达式的 body 属性
			statement.out().body = statement.expression;
		};
	};
}();