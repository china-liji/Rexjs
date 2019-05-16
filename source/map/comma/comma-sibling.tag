import { CommaTag } from "./comma.tag";
import { CommaStatement } from "./comma.stmt";

export let CommaSiblingTag = function(){
	/**
	 * 相邻的逗号标签，即同一语句下面的非第一个逗号
	 * @param {Number} _type - 标签类型
	 */
	return class CommaSiblingTag extends CommaTag {
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new CommaStatement(statements);
		};
	};
}();

CommaTag.storage.tag = new CommaSiblingTag();