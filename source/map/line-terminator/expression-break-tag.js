import { SpecialLineTerminatorTag } from "../base-tag/special-line-terminator-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { STATE_STATEMENT_ENDABLE } from "../core";

export let ExpressionBreakTag = function(){
	/**
	 * 表达式行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ExpressionBreakTag extends SpecialLineTerminatorTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.EXPRESSION_BREAK;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 * @returns {SyntaxTags}
		 */
		require(tagsMap, currentTags){
			return currentTags.newlineTags;
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
			// 设置状态
			statement.expression.state |= STATE_STATEMENT_ENDABLE;
			
			super.visitor(parser, context, statement, statements);
		};
	};
}();