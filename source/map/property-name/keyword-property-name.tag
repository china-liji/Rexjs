import { WordPropertyNameTag } from "./word-property-name.tag";

export let KeywordPropertyNameTag = function(){
	/**
	 * 关键字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	return class KeywordPropertyNameTag extends WordPropertyNameTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.propertyNameContextTags;
		};
	};
}();