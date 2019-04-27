import { IdentifierPropertyNameTag } from "../property-name/identifier-property-name-tag";
import { DeclarationIdentifierPropertyNameStatement } from "./declaration-identifier-property-name";

export let DeclarationIdentifierPropertyNameTag = function(){
	/**
	 * 标识符声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationIdentifierPropertyNameTag extends IdentifierPropertyNameTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = IdentifierPropertyNameTag.compileRegExp(
			IdentifierPropertyNameTag.exceptions.join("|")
		);
		
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.identifierDeclarationPropertyNameContextTags;
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
			// 调用父类方法
			super.visitor(parser, context, statement, statements);

			// 设置当前语句
			statements.statement = new DeclarationIdentifierPropertyNameStatement(statements);
		};
	};
}();