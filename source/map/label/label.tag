import { VariableTag } from "../variable/variable.tag";
import { CLASS_STATEMENT_BEGIN } from "../core";

export let LabelTag = function(){
	/**
	 * 标记标签
	 * @param {Number} _type - 标签类型
	 */
	return class LabelTag extends VariableTag {
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require(tagsMap){
			return tagsMap.labelContextTags;
		};
	};
}();