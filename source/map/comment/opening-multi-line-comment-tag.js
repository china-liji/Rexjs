import { CommentTag } from "./comment-tag";
import { ClosingMultiLineCommentTag } from "./closing-multi-line-comment-tag";

export let OpeningMultiLineCommentTag = function(){
	/**
	 * 多行注释起始标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningMultiLineCommentTag extends CommentTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\/\*/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 * @returns {SyntaxTags}
		 */
		require(tagsMap, currentTags){
			// 记录 currentTags
			ClosingMultiLineCommentTag.requiredTags = currentTags;
			return tagsMap.openingMultiLineCommentContextTags;
		};
	};
}();