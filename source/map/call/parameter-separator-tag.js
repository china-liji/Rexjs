import { CommaTag } from "../comma/comma-tag";
import { CallStatement } from "./call-statement";

export let ParameterSeparatorTag = function(){
	/**
	 * 函数调用参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ParameterSeparatorTag extends CommaTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTag}
		 */
		require(tagsMap){
			return tagsMap.parameterTags;
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
			statements.statement = new CallStatement(statements);
		};
	};
}();