import {} from "../property-name/binary-number-method-name-tag";
import { BinaryNumberPropertyNameTag } from "../property-name/binary-number-property-name-tag";

export let DeclarationBinaryNumberPropertyNameTag = function(){
	/**
	 * 二进制数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationBinaryNumberPropertyNameTag extends BinaryNumberPropertyNameTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
         * @returns {SyntaxTag}
		 */
		require(tagsMap){
			return tagsMap.declarationPropertyNameSeparatorTags;
		};
	};
}();