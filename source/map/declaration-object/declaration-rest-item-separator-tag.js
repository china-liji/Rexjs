import { CommaTag } from "../comma/comma-tag";
import { TYPE_MATCHABLE } from "../core";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let DeclarationRestItemSeparatorTag = function(){
	/**
	 * 变量声明省略项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationRestItemSeparatorTag extends CommaTag {
		/**
		 * 标签捕获类型
		 * @type {Number}
		 */
		$type = TYPE_MATCHABLE;

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			// 报错
			parser.error(statement.target.expression.context, ECMAScriptErrors.REST_ELEMENT);
		};
	};
}();