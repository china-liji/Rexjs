import { LetDeclarationSeparatorTag } from "../let-declaration/let-declaration-separator.tag";
import { ConstStatement } from "./const.stmt";

export let ConstDeclarationSeparatorTag = function(){
	/**
	 * const 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ConstDeclarationSeparatorTag extends LetDeclarationSeparatorTag {
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
	};
}();