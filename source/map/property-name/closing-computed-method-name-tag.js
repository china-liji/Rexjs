import { ClosingComputedPropertyNameTag } from "./closing-computed-property-name-tag";

export let ClosingComputedMethodNameTag = function(){
	/**
	 * 结束计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingComputedMethodNameTag extends ClosingComputedPropertyNameTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {void}
		 */
		require(tagsMap){
			return tagsMap.shorthandMethodArgumentsTags;
		};
	};
}();