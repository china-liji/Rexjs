import { StringTag } from "../base-tag/string-tag";
import { LiteralPropertyNameExpression } from "./literal-property-name-expression";

export let StringPropertyNameTag = function(){
	return class StringPropertyNameTag extends StringTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.propertyNameContextTags;
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
			// 设置表达式的 name 属性
			statement.expression.name = new LiteralPropertyNameExpression(context);
		};
	};
}();