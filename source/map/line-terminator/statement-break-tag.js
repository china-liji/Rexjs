import { SpecialLineTerminatorTag } from "../base-tag";
import { CLASS_STATEMENT_END, STATE_STATEMENT_END } from "../core";

export let StatementBreakTag = function(){
	/**
	 * 语句行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	return class StatementBreakTag extends SpecialLineTerminatorTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_END;

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
		visitor(parser, context, statement, statements){
			// 设置状态
			statement.expression.state |= STATE_STATEMENT_END;
			
			super.visitor(parser, context, statement, statements);
		}
	};
}();