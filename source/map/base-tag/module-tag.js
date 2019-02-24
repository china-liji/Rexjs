import { SyntaxTag, CLASS_STATEMENT_BEGIN } from "../core";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";
import { ECMAScriptStatement } from "../ecmascript/ecmascript-statement";
import { ECMAScriptMethod } from "../ecmascript/ecmascript-method";

export let ModuleTag = function(FLOW_MAIN){
	/**
	 * 模块标签
	 * @param {Number} _type - 标签类型
	 */
	return class ModuleTag extends SyntaxTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 收集该表达式所产生的变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} variable - 变量名标签上下文
		 * @returns {void}
		 */
		collectVariables(parser, variable){
			variable.tag.collectTo(parser, variable, parser.statements);
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
			// 如果当前语句有 target，说明不是最外层语句 或者 不是默认语句流
			if(statements.target || statement.flow !== FLOW_MAIN){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
				);

				return;
			}

			// 调用公共访问器
			ECMAScriptMethod.visitor(parser, context, statement, statements);

			// 设置当前表达式的 file 属性
			statement.expression.file = parser.file;
		};
	};
}(
	ECMAScriptStatement.FLOW_MAIN
);