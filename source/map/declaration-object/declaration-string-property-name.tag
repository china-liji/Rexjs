import { StringPropertyNameTag } from "../property-name/string-property-name.tag";

export let DeclarationStringPropertyNameTag = function(){
	/**
	 * 字符串声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationStringPropertyNameTag extends StringPropertyNameTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTag}
		 */
		require(tagsMap){
			return tagsMap.declarationPropertyNameSeparatorTags;
		};
	};
}();