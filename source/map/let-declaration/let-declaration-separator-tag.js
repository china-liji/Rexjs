import { VarDeclarationSeparatorTag } from "../var-declaration/var-declaration-separator-tag";

export let LetDeclarationSeparatorTag = function(){
	/**
	 * let 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	return class LetDeclarationSeparatorTag extends VarDeclarationSeparatorTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.letContextTags;
		};
	};
}();