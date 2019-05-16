import { SpreadTag } from "../spread-operator/spread.tag";
import { SpreadPropertyExpression } from "./spread-property.expr";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";
import { SpreadStatement } from "../spread-operator/spread.stmt";
import { BoxStatement } from "../base-statement/box.stmt";

export let SpreadPropertyTag = function(){
	/**
	 * 对象属性拓展项标签
	 * @param {Number} _type - 标签类型
	 */
	return class SpreadPropertyTag extends SpreadTag {
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement, statements){
			let expression = new SpreadPropertyExpression(context), boxStatement = new BoxStatement(statements);

			// 如果需要编译
			if(ECMAScriptConfig.es6Base){
				// 给对象表达式设置临时变量名
				statement.expression.setCompiledVariableTo(
					statements,
					statement.target.expression
				);
			}

			// 设置当前语句的表达式
			statement.expression = expression;
			// 设置盒语句的表达式，以模拟环境
			boxStatement.expression = expression.value;
			// 设置当前语句，以模拟环境
			statements.statement = boxStatement;
			// 再次设置当前语句
			statements.statement = new SpreadStatement(statements);
		};
	};
}();