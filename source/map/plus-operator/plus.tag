import { UnaryTag } from "../unary-operator/unary.tag";

export let PlusTag = function(){
	/**
	 * 正号标签
	 * @param {Number} _type - 标签类型
	 */
	return class PlusTag extends UnaryTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\+/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @return {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.plusContextTags;
		};
	};
}();