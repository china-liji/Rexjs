import { SyntaxTag, CLASS_STATEMENT_BEGIN } from "../core/index";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let WithTag = function(){
	/**
	 * with 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	return class WithTag extends SyntaxTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /with/;

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
			parser.error(context, ECMAScriptErrors.WITH);
		};
	};
}();