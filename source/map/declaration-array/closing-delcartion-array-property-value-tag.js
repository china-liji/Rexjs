import { ClosingDeclarationNestedArrayItemTag } from "./closing-declaration-nested-array-item-tag";

export let ClosingDeclarationArrayPropertyValueTag = function(){
    /**
	 * 数组声明属性值（即：对象解构中所嵌套的对象解构）结束标签
	 * @param {Number} _type - 标签类型
	 */
    return class ClosingDeclarationArrayPropertyValueTag extends ClosingDeclarationNestedArrayItemTag {
        /**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
         * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.declarationPropertySeparatorTags;
		};
    };
}();