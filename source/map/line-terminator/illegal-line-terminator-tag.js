import { SpecialLineTerminatorTag } from "../base-tag";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let IllegalLineTerminatorTag = function(){
	/**
	 * 不合法的行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	return class IllegalLineTerminatorTag extends SpecialLineTerminatorTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.ILLEGAL_LINE_TERMINATOR;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /(?:\/\*(?:[^*]|\*(?!\/))*)?(?:\r\n?|\n|\u2028|\u2029)/;

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.NEWLINE);
		}
	};
}();