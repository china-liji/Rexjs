import { VariableDeclarationTag } from "../variable/variable-declaration-tag";
import { DestructuringItemExpression } from "../destructuring/destructuring-item-expression";
import { IdentifierExpression } from "../identifier/identifier-expression";

export let DeclarationArrayItemTag = function(){
	/**
	 * 变量声明数组项标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationArrayItemTag extends VariableDeclarationTag {
		/**
		 * 获取该标签所处的数组语句
		 * @param {Statement} statement - 当前语句
		 * @returns {ECMAScriptStatement}
		 */
		getArrayStatement(statement){
			return statement;
		};

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @returns {Expression}
		 */
		getBoundExpression(context){
			return new DestructuringItemExpression(
				new IdentifierExpression(context)
			);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.declarationArrayItemContextTags;
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
			// 设置当前表达式
			context.setExpressionOf(statement);
			
			(
				// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
				context.tag = this.getArrayStatement(statement).target.expression.arrayOf.context.tag.variable
			)
			// 收集变量名
			.collectTo(parser, context, statements);
		};
	};
}();