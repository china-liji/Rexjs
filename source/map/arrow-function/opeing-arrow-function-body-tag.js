import { OpeningFunctionBodyTag } from "../function/opening-function-body-tag";
import { ArrowFunctionBodyStatements } from "./arrow-function-body-statements";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { ClosingArrowFunctionBodyTag } from "./closing-arrow-function-body-tag";

export let OpeningArrowFunctionBodyTag = function(closingArrowFunctionBodyTag){
	/**
	 * 起始箭头函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningArrowFunctionBodyTag extends OpeningFunctionBodyTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.OPENING_ARROW_FUNCTION_BODY;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @type {SyntaxTag}
		 */
		get binding(){
			return closingArrowFunctionBodyTag;
		};

		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 * @returns {ECMAScriptStatements}
		 */
		getBoundStatements(statements){
			return new ArrowFunctionBodyStatements(statements);
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
			let { target } = statements;

			// 跳出 ArrowContextStatement 语句
			statement.out();
			// 跳出 box 语句
			target.statement.out();

			// 设置表达式
			context.setExpressionOf(
				// 先设置当前语句
				context.setStatementOf(target)
			);
		};
	};
}(
	// closingArrowFunctionBodyTag
	new ClosingArrowFunctionBodyTag()
);