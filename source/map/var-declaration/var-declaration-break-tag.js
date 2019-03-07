import { ExpressionBreakTag } from "../line-terminator/expression-break-tag";

export let VarDeclarationBreakTag = function(){
	/**
	 * var 语句变量声明换行符标签
	 * @param {Number} _type - 标签类型
	 */
	return class VarDeclarationBreakTag extends ExpressionBreakTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.varDeclarationBreakContextTags;
		};
	};
}();