import { ClosingArgumentsTag } from "../arguments/closing-arguments-tag";

export let ClosingShorthandMethodArgumentsTag = function(){
	/**
	 * 对象结束简写方法参数标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingShorthandMethodArgumentsTag extends ClosingArgumentsTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {void}
		 */
		require(tagsMap){
			return tagsMap.shorthandMethodBodyTags;
		};
	};
}();