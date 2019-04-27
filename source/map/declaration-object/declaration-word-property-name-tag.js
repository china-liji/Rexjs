import { WordPropertyNameTag } from "../property-name/word-property-name-tag";

export let DeclarationWordPropertyNameTag = function(){
	/**
	 * 词组（即其他非标识符）属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationWordPropertyNameTag extends WordPropertyNameTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
         * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.declarationPropertyNameSeparatorTags;
		};
	};
}();