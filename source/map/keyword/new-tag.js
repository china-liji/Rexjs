import { ExecTag } from "../exec/exec-tag";

export let NewTag = function(){
	/**
	 * new 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	return class NewTag extends ExecTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /new/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.newContextTags;
		};
	};
}();