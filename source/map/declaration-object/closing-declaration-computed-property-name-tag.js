import { ClosingComputedPropertyNameTag } from "../property-name/closing-computed-property-name-tag";

export let ClosingDeclarationComputedPropertyNameTag = function(){
	/**
	 * 结束计算式属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingDeclarationComputedPropertyNameTag extends ClosingComputedPropertyNameTag {
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