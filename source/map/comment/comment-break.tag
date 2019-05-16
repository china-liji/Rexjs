import { ExpressionBreakTag } from "../line-terminator/expression-break.tag";
import { ClosingBlockCommentTag } from "./block-comment.closing";

export let CommentBreakTag = function(){
	/**
	 * 注释行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	return class CommentBreakTag extends ExpressionBreakTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 * @returns {SyntaxTags}
		 */
		require(tagsMap, currentTags){
			// 记录严格模式的标签列表
			ClosingBlockCommentTag.requiredTags = ClosingBlockCommentTag.requiredTags.newlineTags;
			return currentTags;
		};
	};
}();