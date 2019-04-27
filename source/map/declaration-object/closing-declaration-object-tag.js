import { ClosingObjectTag } from "../object/closing-object-tag";
import { TYPE_UNEXPECTED } from "../core";

export let ClosingDeclarationObjectTag = function(){
	/**
	 * 结束变量声明对象标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingDeclarationObjectTag extends ClosingObjectTag {
		/**
		 * 标签捕获类型
		 * @type {Number}
		 */
		$type = TYPE_UNEXPECTED;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.destructuringAssignmentTags;
		};
	};
}();