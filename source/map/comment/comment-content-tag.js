import { CommentTag } from "./comment-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let CommentContentTag = function(){
	/**
	 * 注释内容标签
	 * @param {Number} _type - 标签类型
	 */
	return class CommentContentTag extends CommentTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.COMMENT_CONTENT;

		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /(?:[^*\r\n\u2028\u2029]|\*(?!\/))+/;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 * @returns {SyntaxTags}
		 */
		require(tagsMap, currentTags){
			return currentTags;
		};
	};
}();