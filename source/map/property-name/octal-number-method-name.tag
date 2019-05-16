import { OctalNumberPropertyNameTag } from "./octal-number-property-name.tag";

export let OctalNumberMethodNameTag = function(){
	/**
	 * 八进制数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	return class OctalNumberMethodNameTag extends OctalNumberPropertyNameTag {
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