import { ArrayItemSeparatorTag } from "../array/array-item-separator-tag";

export let DeclarationArrayItemSeparatorTag = function(){
	/**
	 * 变量声明数组项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationArrayItemSeparatorTag extends ArrayItemSeparatorTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.openingDeclarationArrayContextTags;
		};
	};
}();