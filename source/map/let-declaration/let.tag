import { VarTag } from "../var-declaration/var.tag";
import { LocalVariableTag } from "../variable/local-variable.tag";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";
import { LetDeclarationSeparatorTag } from "./let-declaration-separator.tag";

export let LetTag = function(letDeclarationSeparatorTag, localVariableTag){
	/**
	 * let 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	return class LetTag extends VarTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /let/;

		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 * @returns {SyntaxTag}
		 */
		get binding(){
			return letDeclarationSeparatorTag;
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
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.letContextTags;
		};

		/**
		 * 获取绑定的变量名标签
		 * @returns {SyntaxTag}
		 */
		get variable(){
			return localVariableTag;
		};
	};
}(
	// letDeclarationSeparatorTag
	new LetDeclarationSeparatorTag(),
	// localVariableTag
	new LocalVariableTag()
);