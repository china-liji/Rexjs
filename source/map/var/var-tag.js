import { SyntaxTag, CLASS_STATEMENT_BEGIN } from "../core";
import { VarExpression } from "./var-expression";
import { VarStatement } from "./var-statement";
import { ECMAScriptMethod } from "../ecmascript/ecmascript-method";
import { VarDeclarationSeparatorTag } from "./var-declaration-separator-tag";
import { ClosureVariableTag } from "../variable/closure-variable-tag";

export let VarTag = function(varDeclarationSeparatorTag, closureVariableTag){
	/**
	 * var 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	return class VarTag extends SyntaxTag {
		/**
		 * 标签类型分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /var/;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTags}
		 */
		get binding(){
			return varDeclarationSeparatorTag;
		};

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new VarExpression(context, statement.statements);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatement}
		 */
		getBoundStatement(statements){
			return new VarStatement(statements);
		};
		
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.varContextTags;
		};

		/**
		 * 获取绑定的变量名标签
		 * @returns {SyntaxTag}
		 */
		get variable(){
			return closureVariableTag;
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
	// varDeclarationSeparatorTag
	new VarDeclarationSeparatorTag(),
	// closureVariableTag
	new ClosureVariableTag()
);