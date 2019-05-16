import { VariableDeclarationTag } from "../variable/variable-declaration.tag";
import { PropertyDestructuringItemExpression } from "../property-destructuring/property-destructuring-item.expr";

export let DeclarationPropertyValueTag = function(){
	/**
	 * 对象解构声明的属性值标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationPropertyValueTag extends VariableDeclarationTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.declarationPropertyValueContextTags;
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
			let { target } = statement, { variable } = target.target.expression.objectOf.context.tag;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			context.tag = variable;

			// 调用父类方法
			super.visitor(parser, context, statement, statements);

			// 绑定解构项表达式
			target.bound = new PropertyDestructuringItemExpression(target.expression);
		};
	};
}();