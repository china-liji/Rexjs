import { UnaryTag } from "./unary.tag";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { UnaryAssignmentStatement } from "./unary-assigment.stmt";
import { AssignableExpression } from "../base-expression/assignable.expr";
import { AccessorExpression } from "../accessor/accessor.expr";

export let UnaryAssignmentTag = function(){
	/**
	 * 一元赋值标签
	 * @param {Number} _type - 标签类型
	 */
	return class UnaryAssignmentTag extends UnaryTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.UNARY_ASSIGNMENT;

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatement}
		 */
		getBoundStatement(statements){
			return new UnaryAssignmentStatement(statements);
		};

		/**
		 * 判断该一元表达式在当前表达式中，是否能使用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 当前表达式
		 * @returns {Boolean}
		 */
		operable(parser, expression){
			// 如果当前表达式是赋值表达式
			if(expression instanceof AssignableExpression){
				let { context } = expression;

				switch(true){
					// 如果是属性访问表达式
					case expression instanceof AccessorExpression:
						break;

					// 如果已被收集到常量（会触发报错）
					case context.tag.collected(parser, context, parser.statements):
						return false;
				}

				return true;
			}

			return false;
		};
	};
}();