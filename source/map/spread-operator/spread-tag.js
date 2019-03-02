import { SyntaxTag } from "../core";
import { SpreadExpression } from "./spread-expression";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { SpreadStatement } from "./spread-statement";
import { ECMAScriptMethod } from "../ecmascript/ecmascript-method";

export let SpreadTag = function(){
	/**
	 * 拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	return class SpreadTag extends SyntaxTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.SPREAD;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\.{3}/;

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			// 当匹配到拓展符时的处理逻辑
			statement.target.expression.spreadMatched(statement.statements);

			return new SpreadExpression(context);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatement}
		 */
		getBoundStatement(statements){
			return new SpreadStatement(statements);
		};
		
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
			ECMAScriptMethod.visitor(parser, context, statement, statements);
		};
	};
}();