import { TerminatedFlowTag } from "../terminated-flow/terminated-flow.tag";
import { CLASS_STATEMENT_BEGIN } from "../core";

export let ThrowTag = function(){
	/**
	 * throw 标签
	 * @param {Number} _type - 标签类型
	 */
	return class ThrowTag extends TerminatedFlowTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /throw/;
		
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {void}
		 */
		require(tagsMap){
			return tagsMap.throwContextTags;
		};
	};
}();