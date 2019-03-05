import { ClosingArrayTag } from "../array/closing-array-tag";
import { TYPE_UNEXPECTED } from "../core";

export let ClosingDeclarationArrayTag = function(){
	/**
	 * 标签变量声明数组结束标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingDeclarationArrayTag extends ClosingArrayTag {
		/**
		 * 标签匹配类型
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