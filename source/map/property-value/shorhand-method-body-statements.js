import { FunctionBodyStatements } from "../function/function-body-statements";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let ShorthandMethodBodyStatements = function(){
	/**
	 * 简写方法主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	return class ShorthandMethodBodyStatements extends FunctionBodyStatements {
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @returns {void}
		 */
		applySuper(){};

		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} opening - 起始父类调用小括号标签上下文
		 * @returns {void}
		 */
		applySuperCall(parser, context, opening){
			// 报错
			parser.error(opening, ECMAScriptErrors.SUPER_CALL);
		};
	};
}();