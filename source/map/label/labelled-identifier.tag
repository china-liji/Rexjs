import { LabelTag } from "./label.tag";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";
import { Expression } from "../core";
import { ECMAScriptStatements } from "../ecmascript/ecmascript.stmts";

export let LabelledIdentifierTag = function(withoutAnyFlow){
	/**
	 * 标记标识符标签
	 * @param {Number} _type - 标签类型
	 */
	return class LabelledIdentifierTag extends LabelTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.statementEndTags;
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
			// 如果没有存在指定的流语句中
			if(withoutAnyFlow(statement.target.expression, statements, context.content)){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template(
						"LABEL",
						statement.target.expression.context.content,
						context.content
					)
				);

				return;
			}

			// 设置当前表达式
			statement.expression = new Expression(context);
		};
	};
}(
	// withoutAnyFlow
	(terminatedBranchFlowExpression, statements, content) => {
		let { tag } = terminatedBranchFlowExpression.context, { SCOPE_CLOSURE } = ECMAScriptStatements;

		// 如果语句块存在
		while(statements){
			let { statement } = statements;

			// 如果语句存在
			while(statement){
				// 如果流语句核对有效
				if(tag.checkLabelledStatement(statement, terminatedBranchFlowExpression, content)){
					return false;
				}

				statement = statement.target;
			}

			// 如果是闭包，则获取 target，否则等于 null，中断循环
			statements = (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? null : statements.target;
		}

		return true;
	}
);