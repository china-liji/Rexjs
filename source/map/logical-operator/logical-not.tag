import { UnaryTag } from "../unary-operator/unary.tag";

export let LogicalNOTTag = function(){
	/**
	 * 逻辑否定标签
	 * @param {Number} _type - 标签类型
	 */
	return class LogicalNOTTag extends UnaryTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /!/;
	};
}();