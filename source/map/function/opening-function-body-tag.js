import { OpeningBraceTag } from "../brace/opening-brace-tag";
import { FunctionBodyExpression } from "./function-body-expression";
import { BoxStatement } from "../base-statement/box-statement";
import { FunctionBodyStatements } from "./function-body-statements";
import { ClosingFunctionBodyTag } from "./closing-function-body-tag";

export let OpeningFunctionBodyTag = function(closingFunctionBodyTag){
	/**
	 * 起始函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningFunctionBodyTag extends OpeningBraceTag {
		/**
		 * 获取绑定的函数主体结束标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTags}
		 */
		get binding(){
			return closingFunctionBodyTag;
		};

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context){
			return new FunctionBodyExpression(context);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatment}
		 */
		getBoundStatement(statements){
			return new BoxStatement(statements);
		};

		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 * @returns {ECMAScriptStatments}
		 */
		getBoundStatements(statements){
			return new FunctionBodyStatements(statements);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.statementTags;
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
			// 再设置当前表达式
			context.setExpressionOf(
				// 先设置当前语句
				context.setStatementOf(statements)
			);
			
			// 最后设置当前语句块
			context.setStatementsOf(parser);
		};
	};
}(
	// closingFunctionBodyTag
	new ClosingFunctionBodyTag()
);