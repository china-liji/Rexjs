import { OctalNumberPropertyNameTag } from "../property-name/octal-number-property-name-tag";

export let DeclarationOctalNumberPropertyNameTag = function(){
	/**
	 * 八进制数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationOctalNumberPropertyNameTag extends OctalNumberPropertyNameTag {
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