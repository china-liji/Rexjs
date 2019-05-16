import { IdentifierTag } from "../identifier/identifier.tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { IdentifierPropertyNameExpression } from "./identifier-property-name.expr";
import { ShorthandPropertyValueExpression } from "../property-value/shorthand-property-value.expr";

export let IdentifierPropertyNameTag = function(){
	/**
	 * 标识符属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	return class IdentifierPropertyNameTag extends IdentifierTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.PROPERTY_NAME;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = IdentifierTag.compileRegExp(
			["get", "set"].concat(IdentifierTag.exceptions).join("|")
		);

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.identifierPropertyNameContextTags;
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
			let { expression } = statement;

			// 设置表达式的 name 属性
			expression.name = new IdentifierPropertyNameExpression(context);
			// 设置当前语句
			expression.value = new ShorthandPropertyValueExpression(context);
		};
	};
}();