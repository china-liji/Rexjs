import { SpreadPropertyTag } from "../property-name/spread-property.tag";
import { SpreadPropertyExpression } from "../property-name/spread-property.expr";
import { PropertyRestDestructuringItemExpression } from "../property-destructuring/property-rest-destructuring-item.expr";
import { DeclarationPropertyRestStatement } from "./delcaration-property-rest.stmt";

export let DeclarationPropertyRestTag = function(){
	/**
	 * 变量声明对象属性省略项拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	return class DeclarationPropertyRestTag extends SpreadPropertyTag {
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.declarationPropertyRestItemTags;
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
			let expression = new SpreadPropertyExpression(context);

			// 绑定解构项表达式
			statement.bound = new PropertyRestDestructuringItemExpression(expression);
			// 设置当前表达式
			statement.expression = expression;
			// 设置当前语句
			statements.statement = new DeclarationPropertyRestStatement(statements);
		};
	};
}();