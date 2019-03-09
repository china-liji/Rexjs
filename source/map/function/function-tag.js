import { SyntaxTag, CLASS_EXPRESSION, Expression } from "../core";
import { FunctionExpression } from "./function-expression";

export let FunctionTag = function(){
	/**
	 * 函数标签
	 * @param {Number} _type - 标签类型
	 */
	return class FunctionTag extends SyntaxTag {
		/**
		 * 标签类型分类
		 */
		$class = CLASS_EXPRESSION;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /function/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.functionContextTags;
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
			// 设置当前表达式
			(
				statement.expression = new FunctionExpression(context)
			)
			// 设置函数表达式头部
			.head = new Expression(context);
		};
	};
}();