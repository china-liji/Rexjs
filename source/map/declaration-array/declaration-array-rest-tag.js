import { ArraySpreadTag } from "../array/array-spread-tag";
import { ArrayRestDestructuringItemExpression } from "../array/array-rest-destructuring-item-expression";
import { ArraySpreadItemExpression } from "../array/array-spread-item-expression";
import { DeclarationRestStatement } from "../declaration-object/declaration-rest-statement";

export let DeclarationArrayRestTag = function(){
	/**
	 * 变量声明数组省略项拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationArrayRestTag extends ArraySpreadTag {
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @returns {Expression}
		 */
		getBoundExpression(context){
			return new ArrayRestDestructuringItemExpression(
				new ArraySpreadItemExpression(context)
			);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatement}
		 */
		getBoundStatement(statements){
			return new DeclarationRestStatement(statements);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.declarationArrayRestItemTags;
		};
	};
}();