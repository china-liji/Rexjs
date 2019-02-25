import { UnaryAssignmentTag } from "../unary-operator/unary-assignment-tag";

export let IncrementTag = function(){
	/**
	 * 前置递增标签
	 * @param {Number} _type - 标签类型
	 */
	return class IncrementTag extends UnaryAssignmentTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\+\+/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.plusContextTags;
		};
	};
}();