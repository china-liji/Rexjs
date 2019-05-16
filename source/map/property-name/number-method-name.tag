import { NumberPropertyNameTag } from "./number-property-name.tag";

export let NumberMethodNameTag = function(){
	/**
	 * 数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	return class NumberMethodNameTag extends NumberPropertyNameTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.shorthandMethodArgumentsTags;
		};
	};
}();