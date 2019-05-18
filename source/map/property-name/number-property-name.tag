import { NumberTag } from "../base-tag/number.tag";
import { LiteralPropertyNameExpression } from "./literal-property-name.expr";

export let NumberPropertyNameTag = function(){
	/**
	 * 数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	return class NumberPropertyNameTag extends NumberTag {
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