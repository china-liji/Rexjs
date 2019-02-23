import { OpeningBracketTag } from "../bracket/opening-bracket-tag";
import { CLASS_EXPRESSION_CONTEXT } from "../core";
import { BracketAccessorExpression } from "./bracket-acccessor-expression";
import { BracketAccessorStatement } from "./bracket-accessor-statement";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { ParserMethod } from "../parser-env";
import { ClosingBracketAccessorTag } from "./closing-bracket-accessor-tag";

export let OpeningBracketAccessorTag = function(closingBracketAccessorTag){
	/**
	 * 起始中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningBracketAccessorTag extends OpeningBracketTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_EXPRESSION_CONTEXT;

		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.OPENING_BRACKET_ACCESSOR;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingBracketAccessorTag;
		};

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new BracketAccessorExpression(context, statement.expression);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatement}
		 */
		getBoundStatement(statements){
			return new BracketAccessorStatement(statements);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
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
		 */
		visitor(parser, context, statement, statements){
			ParserMethod.visitor(parser, context, statement, statements);
		};
	};
}(
	// closingBracketAccessorTag
	new ClosingBracketAccessorTag()
);