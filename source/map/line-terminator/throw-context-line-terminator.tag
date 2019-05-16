import { IllegalLineTerminatorTag } from "./illegal-line-terminator.tag";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let ThrowContextLineTerminatorTag = function(){
	/**
	 * throw 关键字上下文的行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ThrowContextLineTerminatorTag extends IllegalLineTerminatorTag {
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
			parser.error(context, ECMAScriptErrors.NEWLINE_AFTER_THROW);
		}
	};
}();