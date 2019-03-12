import { ClosingComputedPropertyNameTag } from "./closing-computed-property-name-tag";

export let ClosingComputedMethodNameTag = function(){
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