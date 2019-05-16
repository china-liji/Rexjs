import { TerminatedFlowTag } from "../terminated-flow/terminated-flow.tag";
import { ECMAScriptStatement } from "../ecmascript/ecmascript.stmt";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";
import { EmptyExpression, CLASS_STATEMENT_BEGIN } from "../core";

export let ReturnTag = function(){
	/**
	 * return 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	return class ReturnTag extends TerminatedFlowTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 流类型
		 * @type {Number}
		 */
		flow = ECMAScriptStatement.FLOW_LINEAR;
		
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /return/;
		
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.returnContextTags;
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
			// 如果存在闭包
			if(statements.closure){
				// 调用父类访问器
				super.visitor(parser, context, statement, statements);

				// 设置当前表达式为空表达式
				statements.statement.expression = new EmptyExpression(null);
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
			);
		};
	};
}();