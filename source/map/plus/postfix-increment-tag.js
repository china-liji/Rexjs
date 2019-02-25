import { PostfixUnaryAssignmentTag } from "../unary/postfix-unary-assignment-tag";

export let PostfixIncrementTag = function(){
	/**
	 * 后置递增标签
	 * @param {Number} _type - 标签类型
	 */
	return class PostfixIncrementTag extends PostfixUnaryAssignmentTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\+\+/;
	};
}();