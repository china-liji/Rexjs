import { OpeningBraceTag } from "../brace/opening-brace-tag";
import { CLASS_EXPRESSION } from "../core";
import { ObjectExpression } from "./object-expression";
import { PropertyStatement } from "../property/property-statement";
import { ECMAScriptMethod } from "../ecmascript/ecmascript-method";
import { ClosingObjectTag } from "./closing-object-tag";
import { PropertySeparatorTag } from "../property-value/property-separator-tag";

export let OpeningObjectTag = function(closingObjectTag, propertySeparatorTag){
	/**
	 * 起始对象标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningObjectTag extends OpeningBraceTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_EXPRESSION;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTags}
		 */
		get binding(){
			return closingObjectTag;
		};

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @returns {Expression}
		 */
		getBoundExpression(context){
			return new ObjectExpression(context);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatement}
		 */
		getBoundStatement(statements){
			return new PropertyStatement(statements);
		};

		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get separator(){
			return propertySeparatorTag;
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.propertyNameTags;
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
			ECMAScriptMethod.visitor(parser, context, statement, statements);
		};
	};
}(
	// closingObjectTag
	new ClosingObjectTag(),
	// propertySeparatorTag
	new PropertySeparatorTag()
);