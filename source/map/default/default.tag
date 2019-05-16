import { CaseTag } from "../case/case.tag";
import { DefaultCaseExpression } from "./default.expr";
import { DefaultValueStatement } from "./default-value.stmt";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let DefaultTag = function(){
	/**
	 * switch 语句中的 default 标签
	 * @param {Number} _type - 标签类型
	 */
	return class DefaultTag extends CaseTag {
		/**
		 * 标签表达式
		 * @type {RegExp}
		 */
		regexp = /default/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.mistakableTags;
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
			let { expression: switchExpression } = statements.target.statement.target;

			// 如果已经存在 default 表达式
			if(switchExpression.hasDefault){
				// 报错
				parser.error(context, ECMAScriptErrors.DEFAULT_CLAUSE);
				return;
			}

			// 设置当前表达式
			statement.expression = new DefaultCaseExpression(context);
			// 设置当前语句
			statements.statement = new DefaultValueStatement(statements);
			// 设置 hasDefault
			switchExpression.hasDefault = true;
		}
	};
}();

CaseTag.bindDefault(
	new DefaultTag()
);