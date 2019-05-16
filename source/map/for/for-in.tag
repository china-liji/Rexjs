import { IteratorTag } from "../iterator/iterator.tag";

export let ForInTag = function(){
	/**
	 * for in 标签
	 * @param {Number} _type - 标签类型
	 */
	return class ForInTag extends IteratorTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /in(?!stanceof)/;
	};
}();