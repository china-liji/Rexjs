import { ExpressionSeparatorTag } from "../base-tag/expression-separator.tag";
import { CLASS_EXPRESSION_CONTEXT, STATE_STATEMENT_ENDABLE, EmptyExpression } from "../core";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { IdentifierExpression } from "../identifier/identifier.expr";
import { ArrowFunctionExpression } from "./arrow-function.expr";
import { SingleArgumentExpression } from "./single-argument.expr";
import { ArgumentsExpression } from "../arguments/arguments.expr";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";
import { BoxStatement } from "../base-statement/box.stmt";
import { ArrowFunctionBodyStatements } from "./arrow-function-body.stmts";
import { ArrowContextStatement } from "./arrow-context.stmt";

export let ArrowTag = function(){
	/**
	 * 箭头标签
	 * @param {Number} _type - 标签类型
	 */
	return class ArrowTag extends ExpressionSeparatorTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_EXPRESSION_CONTEXT;

		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.ARROW;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /=>/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {void}
		 */
		require(tagsMap){
			return tagsMap.arrowContextTags;
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
			let { expression } = statement;

			switch(true){
				// 如果是标识符表达式
				case expression instanceof IdentifierExpression:
					// 设置当前表达式
					statement.expression = new ArrowFunctionExpression(
						context,
						new SingleArgumentExpression(expression.context, statements)
					);
					break;

				// 如果是参数列表表达式
				case expression instanceof ArgumentsExpression:
					// 设置当前表达式
					statement.expression = new ArrowFunctionExpression(context, expression);
					break;

				default:
					// 报错
					parser.error(expression);
					return;
			}

			// 如果箭头符号换行了
			if((expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE){
				// 报错
				parser.error(context, ECMAScriptErrors.NEWLINE_BEFORE_ARROW);
				return;
			}

			// 设置外层语句块的语句
			statements.statement = statement = new BoxStatement(statements);
			// 设置外层语句块的语句表达式
			statement.expression = new EmptyExpression();
			// 设置当前语句块
			parser.statements = statements = new ArrowFunctionBodyStatements(statements);
			// 设置语句的当前语句
			statements.statement = new ArrowContextStatement(statements);
		};
	};
}();