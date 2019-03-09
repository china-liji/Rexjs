import { VariableDeclarationTag } from "../variable/variable-declaration-tag";
import { Expression } from "../core";

export let FunctionNameTag = function(){
	/**
	 * 函数名标签
	 * @param {Number} _type - 标签类型
	 */
	return class FunctionNameTag extends VariableDeclarationTag {
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 * @returns {void}
		 */
		extractTo(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.functionArgumentTags;
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
			// 设置函数表达式的名称
			statement.expression.name = new Expression(context);
		};
	}
}();