import { UnaryTag } from "../unary/unary-tag";

export let NegationTag = function(){
	/**
	 * 负号标签
	 * @param {Number} _type - 标签类型
	 */
	return class NegationTag extends UnaryTag {
		/**
		 * 标签正则
		 */
		regexp = /-/;
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