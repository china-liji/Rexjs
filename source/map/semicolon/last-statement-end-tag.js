import { StatementEndTag } from "./statement-end-tag";

export let LastStatementEndTag = function(){
	/**
	 * 最后一个语句结束符标签
	 * @param {Number} _type - 标签类型
	 */
	return class LastStatementEndTag extends StatementEndTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /$/;

		/**
		 * 异常时需要抛出的信息
		 * @type {String}
		 */
		throw = "end of input";
	};
}();