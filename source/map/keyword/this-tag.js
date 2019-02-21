import { LiteralTag } from "../literal/literal-tag";

export let ThisTag = function(){
	/**
	 * this 标签
	 * @param {Number} _type - 标签类型
	 */
	return class ThisTag extends LiteralTag {
		/**
		 * 该标签的正则表达式
		 * @type {RegExp}
		 */
		regexp = /this/;

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			let { closure } = statements;

			// 如果存在闭包
			if(closure){
				// 向当前闭包申请应用 this 关键字
				closure.applyThis(parser, context);
			}

			// 调用父类方法
			super.visitor(parser, context, statement, statements);
		}
	};
}();