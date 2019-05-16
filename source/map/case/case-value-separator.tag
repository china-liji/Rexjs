import { ColonTag } from "../ternary-operator/colon.tag";
import { CaseBodyStatements } from "./case-body.stmts";

export let CaseValueSeparatorTag = function(){
	/**
	 * case 值的分隔符标签，即 case 对应的冒号
	 * @param {Number} _type - 标签类型
	 */
	return class CaseValueSeparatorTag extends ColonTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTag}
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
			// 设置表达式的 separator
			statement.expression.separator = context;
			// 设置当前语句块
			parser.statements = new CaseBodyStatements(statements);
		};
	};
}();