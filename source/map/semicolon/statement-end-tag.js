import { SemicolonTag } from "./semicolon-tag";
import { CLASS_STATEMENT_END, TYPE_MISTAKABLE, STATE_STATEMENT_END } from "../core";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let StatementEndTag = function(){
	/**
	 * 语句结束标签
	 * @param {Number} _type - 标签类型
	 */
	return class StatementEndTag extends SemicolonTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_END;

		/**
		 * 标签捕获类型
		 * @type {Number}
		 */
		$type = TYPE_MISTAKABLE;

		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.STATEMENT_END;

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
			statement.expression.state |= STATE_STATEMENT_END;
		}
	};
}();