import { ClosingFunctionBodyTag } from "../function/closing-function-body-tag";
import { STATE_STATEMENT_ENDABLE } from "../core";

export let ClosingArrowFunctionBodyTag = function(){
	/**
	 * 结束箭头函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingArrowFunctionBodyTag extends ClosingFunctionBodyTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.closingArrowFunctionBodyContextTags;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor(parser, context, statement, statements){
			// 设置表达式状态
			statement.expression.state = STATE_STATEMENT_ENDABLE;

			// 调用父类方法
			super.visitor(parser, context, statement, statements);
		};
	};
}();