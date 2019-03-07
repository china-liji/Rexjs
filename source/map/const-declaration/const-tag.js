import { LetTag } from "../let-declaration/let-tag";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";
import { ConstStatement } from "./const-statement";
import { ConstantVariableTag } from "../variable/constant-variable-tag";
import { ConstDeclarationSeparatorTag } from "./const-declaration-separator-tag";

export let ConstTag = function(constDeclarationSeparatorTag, constantVariableTag){
	/**
	 * const 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	return class ConstTag extends LetTag {
		/**
		 * 标签正则
		 */
		regexp = /const/;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return constDeclarationSeparatorTag;
		};

		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 * @returns {void}
		 */
		extractTo(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(ECMAScriptConfig.es6Base ? "var" : content);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatement}
		 */
		getBoundStatement(statements){
			return new ConstStatement(statements);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.constContextTags;
		};

		/**
		 * 获取绑定的变量名标签
		 * @returns {SyntaxTag}
		 */
		get variable(){
			return constantVariableTag;
		};
	};
}(
	// constDeclarationSeparatorTag
	new ConstDeclarationSeparatorTag(),
	// constantVariableTag
	new ConstantVariableTag
);