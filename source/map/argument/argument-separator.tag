import { CommaTag } from "../comma/comma.tag";
import { ArgumentStatement } from "./argument.stmt";

export let ArgumentSeparatorTag = function(){
	/**
	 * 参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ArgumentSeparatorTag extends CommaTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.openingArgumentsContextTags;
		};

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
			statements.statement = new ArgumentStatement(statements);
		};
	};
}();