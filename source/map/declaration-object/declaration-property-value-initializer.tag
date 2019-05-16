import { BasicAssignmentTag } from "../assignment-operator/basic-assignment.tag";
import { PropertyDefaultDestructuringItemExpression } from "../property-destructuring/property-default-destructuring-item.expr";

export let DeclarationPropertyValueInitializerTag = function(){
	/**
	 * 变量声明属性值初始化标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationPropertyValueInitializerTag extends BasicAssignmentTag {
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			let {target} = statement;

			// 调用父类访问器
			super.visitor(parser, context, statement, statements);

			// 绑定解构项表达式
			target.bound = new PropertyDefaultDestructuringItemExpression(target.expression, statement.expression, statements);
		};
	};
}();