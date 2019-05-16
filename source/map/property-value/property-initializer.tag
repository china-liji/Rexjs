import { BasicAssignmentTag } from "../assignment-operator/basic-assignment.tag";
import { PropertyInitializerExpression } from "./property-initializer.expr";
import { PropertyValueStatement } from "../property/property-value.stmt";

export let PropertyInitializerTag = function(){
	/**
	 * 属性初始值标签
	 * @param {Number} _type - 标签类型
	 */
	return class PropertyInitializerTag extends BasicAssignmentTag {
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new PropertyInitializerExpression(context, statement.expression.name);
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
			// 设置属性表达式的值
			statement.expression.value = this.getBoundExpression(context, statement);
			// 设置当前语句
			statements.statement = new PropertyValueStatement(statements);
		};
	};
}();