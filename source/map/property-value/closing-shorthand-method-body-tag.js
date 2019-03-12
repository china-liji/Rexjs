import { ClosingFunctionBodyTag } from "../function/closing-function-body-tag";

export let ClosingShorthandMethodBodyTag = function(){
	/**
	 * 对象简写方法参数结束标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingShorthandMethodBodyTag extends ClosingFunctionBodyTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.propertySeparatorTags;
		};
	};
}();