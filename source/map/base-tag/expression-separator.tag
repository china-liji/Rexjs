import { SyntaxTag, CLASS_EXPRESSION_CONTEXT, TYPE_MISTAKABLE } from "../core";

export let ExpressionSeparatorTag = function(){
	/**
	 * 表达式分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ExpressionSeparatorTag extends SyntaxTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_EXPRESSION_CONTEXT;

		/**
		 * 标签捕获类型
		 * @type {Number}
		 */
		$type = TYPE_MISTAKABLE;
	};
}();