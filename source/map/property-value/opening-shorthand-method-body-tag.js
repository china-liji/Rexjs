import { OpeningFunctionBodyTag } from "../function/opening-function-body-tag";
import { ShorthandMethodBodyStatements } from "./shorhand-method-body-statements";
import { ClosingShorthandMethodBodyTag } from "./closing-shorthand-method-body-tag";

export let OpeningShorthandMethodBodyTag = function(closingShorthandMethodBodyTag){
	/**
	 * 对象简写方法参数起始标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningShorthandMethodBodyTag extends OpeningFunctionBodyTag {
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingShorthandMethodBodyTag;
		};

		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 * @returns {Statements}
		 */
		getBoundStatements(statements){
			return new ShorthandMethodBodyStatements(statements);
		};
	};
}(
	// closingShorthandMethodBodyTag
	new ClosingShorthandMethodBodyTag()
);