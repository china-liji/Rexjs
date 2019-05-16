import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";
import { IteratorTag } from "../iterator/iterator.tag";

export let ForOfTag = function(){
	/**
	 * for of 标签
	 * @param {Number} _type - 标签类型
	 */
	return class ForOfTag extends IteratorTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /of/;
		
		/**
		 * 判断编译时是否需要临时变量名
		 * @param {Statements} statements - 当前语句块
		 * @returns {Boolean}
		 */
		hasVariable(statements){
			return ECMAScriptConfig.es6Base || super.hasVariable(statements);
		};
	};
}();