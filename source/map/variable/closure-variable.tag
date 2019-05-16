import { VariableDeclarationTag } from "./variable-declaration.tag";

export let ClosureVariableTag = function(){
	/**
	 * 闭包内变量标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosureVariableTag extends VariableDeclarationTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.closureVariableContextTags;
		};
	};
}();