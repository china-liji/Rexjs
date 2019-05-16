import { ExpressionSeparatorTag } from "../base-tag/expression-separator.tag";
import { TernaryExpression } from "./ternary.expr";
import { PositiveStatement } from "./positive.stmt";
import { ColonTag } from "./colon.tag";

export let QuestionTag = function(colonTag){
	/**
	 * 三元运算符“问号”标签
	 * @param {Number} _type - 标签类型
	 */
	return class QuestionTag extends ExpressionSeparatorTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\?/;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return colonTag;
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
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
			// 初始化三元表达式
			let ternaryExpression = new TernaryExpression(context);

			// 设置三元表达式的条件
			ternaryExpression.condition = statement.expression;
			// 设置当前表达式
			statement.expression = ternaryExpression;
			// 设置当前语句
			statements.statement = new PositiveStatement(statements);
		}
	};
}(
	// colonTag
	new ColonTag()
);