import Rexjs from "../core";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let FileStartTag = function({ FilePositionTag, FileStartExpression }){
	/**
	 * 文件起始符标签
	 * @param {Number} _type - 标签类型
	 */
	return class FileStartTag extends FilePositionTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.FILE_START;

		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /^/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTagsMap}
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
			// 设置当前表达式
			statement.expression = new FileStartExpression(context);
		};
	};
}(
	Rexjs
);