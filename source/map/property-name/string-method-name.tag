import { StringPropertyNameTag } from "./string-property-name.tag";

export let StringMethodNameTag = function(){
	/**
	 * 字符串方法名标签
	 * @param {Number} _type - 标签类型
	 */
	return class StringMethodNameTag extends StringPropertyNameTag {
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