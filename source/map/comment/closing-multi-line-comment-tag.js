import { CommentTag } from "./comment-tag";

export let ClosingMultiLineCommentTag = function(tags){
	/**
	 * 多行注释结束标签
	 * @param {Number} _type - 标签类型
	 */
	return class ClosingMultiLineCommentTag extends CommentTag {
		/**
		 * 解析时，该标签接下来所需匹配的标签列表
		 * @type {SyntaxTags}
		 */
		static requiredTags = null;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\*\//;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 * @returns {SyntaxTags}
		 */
		require(){
			return ClosingMultiLineCommentTag.requiredTags;
		};
	};
}();