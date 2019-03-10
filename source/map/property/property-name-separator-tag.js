import { ColonTag } from "../ternary-operator/colon-tag";
import { TYPE_MISTAKABLE } from "../core";
import { PropertyValueExpression } from "./property-value-expression";
import { PropertyValueStatement } from "./property-value-statement";

export let PropertyNameSeparatorTag = function(){
	/**
	 * 对象属性名称的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	return class PropertyNameSeparatorTag extends ColonTag {
		/**
		 * 标签捕获类型
		 * @type {Number}
		 */
		$type = TYPE_MISTAKABLE;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.expressionTags;
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
			// 设置对象属性表达式的值
			statement.expression.value = new PropertyValueExpression(context);
			// 设置当前语句
			statements.statement = new PropertyValueStatement(statements);
		};
	};
}();