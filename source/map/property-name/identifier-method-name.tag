import { IdentifierPropertyNameTag } from "./identifier-property-name.tag";

export let IdentifierMethodNameTag = function(){
	/**
	 * 标识符方法名标签
	 * @param {Number} _type - 标签类型
	 */
	return class IdentifierMethodNameTag extends IdentifierPropertyNameTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = new RegExp(IdentifierPropertyNameTag.REGEXP_SOURCE);

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