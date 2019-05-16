import { PropertyNameTag } from "../accessor/property-name.tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";
import { ECMAScriptStatements } from "../ecmascript/ecmascript.stmts";

export let TargetTag = function(SCOPE_CLOSURE, SCOPE_LAZY){
	/**
	 * target 标签
	 * @param {Number} _type - 标签类型
	 */
	return class TargetTag extends PropertyNameTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.TARGET;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /target/;

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			let s = statements;

			doBlock:
			do {
				// 如果是闭包，而且不是惰性闭包（箭头函数）
				if((s.scope & SCOPE_LAZY) === SCOPE_CLOSURE){
					// 调用父类方法
					super.visitor(parser, context, statement, statements);
					return;
				}

				s = s.target;
			}
			while(s);

			// 报错
			parser.error(statement.expression.context, ECMAScriptErrors.TARGET);
		};
	};
}(
	ECMAScriptStatements.SCOPE_CLOSURE,
	ECMAScriptStatements.SCOPE_LAZY
);