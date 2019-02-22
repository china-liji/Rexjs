import { OpeningMultiLineCommentTag } from "./opening-multi-line-comment-tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { ClosingMultiLineCommentTag } from "./closing-multi-line-comment-tag";

export let OpeningRestrictedCommentTag = function(){
	/**
	 * 受限制的多行注释起始标签，一般使用在表达式上下文中
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningRestrictedCommentTag extends OpeningMultiLineCommentTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.OPENING_RESTRICTED_COMMENT;

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 * @returns {SyntaxTags}
		 */
		require(tagsMap, currentTags){
			// 记录 currentTags
			ClosingMultiLineCommentTag.requiredTags = currentTags;
			return tagsMap.openingRestrictedCommentContextTags;
		};
	};
}();