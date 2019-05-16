import { SyntaxTag } from "../core";
import { CaseExpression } from "./case.expr";
import { CaseValueStatement } from "./case-value.stmt";
import { CaseValueSeparatorTag } from "./case-value-separator.tag";

export let CaseTag = function(caseValueSeparatorTag, caseTag, defaultTag){
	/**
	 * case 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	return class CaseTag extends SyntaxTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /case/;

		/**
		 * 设置绑定的 defaultTag
		 * @param {SyntaxTag} defTag - 需要绑定的 defaultTag
		 * @returns {void}
		 */
		static bindDefault(defTag){
			defaultTag = defTag;
		};

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return caseValueSeparatorTag;
		};

		/**
		 * 获取当前标签标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get case(){
			return caseTag || (caseTag = new CaseTag());
		};

		/**
		 * 获取绑定的 defaultTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get default(){
			return defaultTag;
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
			// 设置当前表达式
			statement.expression = new CaseExpression(context);
			// 设置当前语句
			statements.statement = new CaseValueStatement(statements);
		};
	};
}(
	// caseValueSeparatorTag
	new CaseValueSeparatorTag(),
	// caseTag
	null,
	// defaultTag
	null
);