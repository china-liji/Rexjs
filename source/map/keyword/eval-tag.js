import { EnvConstantTag } from "../env-constant/env-constant-tag";

export let EvalTag = function(){
	/**
	 * eval 标签
	 * @param {Number} _type - 标签类型
	 */
	return class EvalTag extends EnvConstantTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /eval/;
	};
}();