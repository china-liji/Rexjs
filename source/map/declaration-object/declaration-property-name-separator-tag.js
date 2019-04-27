import { PropertyNameSeparatorTag } from "../property/property-name-separator-tag";

export let DeclarationPropertyNameSeparatorTag = function(){
    /**
	 * 变量声明属性名称的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
    return class DeclarationPropertyNameSeparatorTag extends PropertyNameSeparatorTag {
        /**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
         * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.declarationPropertyValueTags;
		};
    };
}();