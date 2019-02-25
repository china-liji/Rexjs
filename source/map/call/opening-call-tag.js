import { OpeningParenTag } from "../paren/opening-paren-tag";
import { CLASS_EXPRESSION_CONTEXT } from "../core";
import { CallExpression } from "./call-expression";
import { CallStatement } from "./call-statement";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { ECMAScriptMethod } from "../ecmascript/ecmascript-method";
import { ClosingCallTag } from "./closing-call-tag";

export let OpeningCallTag = function(closingCallTag){
	/**
	 * 起始函数调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningCallTag extends OpeningParenTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_EXPRESSION_CONTEXT;

		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.OPENING_CALL;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingCallTag;
		};

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new CallExpression(context, statement);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatement}
		 */
		getBoundStatement(statements){
			return new CallStatement(statements);
		};
		
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.parameterTags;
		};

		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTags}
		 */
		get separator(){
			return parameterSeparatorTag;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor(parser, context, statement, statements){
			ECMAScriptMethod.visitor(parser, context, statement, statements);
		};
	};
}(
	// closingCallTag
	new ClosingCallTag()
);