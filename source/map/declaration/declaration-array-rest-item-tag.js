import { DeclarationArrayItemTag } from "./declaration-array-item-tag";
import { IdentifierExpression } from "../identifier/identifier-expression";

export let DeclarationArrayRestItemTag = function(){
	/**
	 * 变量声明数组省略项标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationArrayRestItemTag extends DeclarationArrayItemTag {
		/**
		 * 获取该标签所处的数组语句
		 * @param {Statement} statement - 当前语句
		 * @returns {ECMAScriptStatement}
		 */
		getArrayStatement(statement){
			return statement.target;
		};
		
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @returns {Expression}
		 */
		getBoundExpression(context){
			return new IdentifierExpression(context);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.declarationArrayRestItemContextTags;
		};
	};
}();