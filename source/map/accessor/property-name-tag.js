import { IdentifierTag } from "../identifier/identifier-tag";

export let PropertyNameTag = function(){
	/**
	 * 属性名标签
	 * @param {Number} _type - 标签类型
	 */
	return class PropertyNameTag extends IdentifierTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = new RegExp(IdentifierTag.REGEXP_SOURCE);

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			statement.expression.property = context;
		};
	};
}();