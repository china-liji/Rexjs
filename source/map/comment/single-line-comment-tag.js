import { CommentTag } from "./comment-tag";

export let SingleLineCommentTag = function(){
	/**
	 * 单行注释标签
	 * @param {Number} _type - 标签类型
	 */
	return class SingleLineCommentTag extends CommentTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\/\/.*/;
	};
}();