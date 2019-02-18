import { SyntaxTag, TYPE_MATCHABLE } from "../core/index";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let CommentTag = function(){
	return class CommentTag extends SyntaxTag {
		/**
		 * 注释标签
		 */
		constructor(){
			super();
		};

		/**
		 * 标签捕获类型
		 * @type {Number}
		 */
		$type = TYPE_MATCHABLE;

		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.COMMENT;
	};
}();