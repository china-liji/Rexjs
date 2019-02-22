import { EnvConstantTag } from "../env-constant/env-constant-tag";

export let EvalTag = function(){
	/**
	 * eval 标签
	 * @param {Number} _type - 标签类型
	 */
	return class EvalTag extends EnvConstantTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /eval/;
	};
}();