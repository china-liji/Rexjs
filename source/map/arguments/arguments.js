import { EnvConstantTag } from "../env-constant/env-constant-tag";

export let ArgumentsTag = function(){
	/**
	 * arguments 标识符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ArgumentsTag extends EnvConstantTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /arguments/;
	};
}();