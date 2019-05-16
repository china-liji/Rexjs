import { PropertyInitializerTag } from "../property-value/property-initializer.tag";
import { PropertyDefaultDestructuringItemExpression } from "../property-destructuring/property-default-destructuring-item.expr";

export let DeclarationPropertyNameInitializerTag = function(){
	/**
	 * 变量声明属性名初始化标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationPropertyNameInitializerTag extends PropertyInitializerTag {
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			let { expression } = statement, { context: ctx } = expression.name,
			
				{ variable } = statement.target.expression.objectOf.context.tag;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			ctx.tag = variable;

			// 收集变量名
			variable.collectTo(parser, ctx, statements);
			// 调用父类访问器
			super.visitor(parser, context, statement, statements);

			// 绑定解构项表达式
			statement.bound = new PropertyDefaultDestructuringItemExpression(expression, expression, statements);
		};
	};
}();