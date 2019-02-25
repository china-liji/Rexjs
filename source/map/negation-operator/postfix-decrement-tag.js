import { PostfixUnaryAssignmentTag } from "../unary-operator/postfix-unary-assignment-tag";

export let PostfixDecrementTag = function(){
	/**
	 * 后置递减标签
	 * @param {Number} _type - 标签类型
	 */
	return class PostfixDecrementTag extends PostfixUnaryAssignmentTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /--/;
	};
}();