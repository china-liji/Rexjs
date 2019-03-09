import { OpeningParenTag } from "../paren/opening-paren-tag";
import { ArgumentsExpression } from "./arguments-expression";
import { ClosingArgumentsTag } from "./closing-arguments-tag";
import { ArgumentSeparatorTag } from "../argument/argument-separator-tag";
import { ArgumentStatement } from "../argument/argument-statement-";

export let OpeningArgumentsTag = function(closingArgumentsTag, argumentSeparatorTag){
	/**
	 * 起始函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	return class OpeningArgumentsTag extends OpeningParenTag {
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return closingArgumentsTag;
		};

		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get separator(){
			return argumentSeparatorTag;
		};
		
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
			// 设置函数表达式的的参数
			statement.expression.arguments = new ArgumentsExpression(context, statements);
			// 设置当前语句
			statements.statement = new ArgumentStatement(statements);
		}
	};
}(
	// closingArgumentsTag
	new ClosingArgumentsTag(),
	// argumentSeparatorTag
	new ArgumentSeparatorTag()
);