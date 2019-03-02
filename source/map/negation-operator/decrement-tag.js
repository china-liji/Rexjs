import { UnaryAssignmentTag } from "../unary-operator/unary-assignment-tag";

export let DecrementTag = function(){
	/**
	 * 前置递减标签
	 * @param {Number} _type - 标签类型
	 */
	return class DecrementTag extends UnaryAssignmentTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /--/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.negationContextTags;
		};
	};
}();