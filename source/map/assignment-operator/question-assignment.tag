import { ShorthandAssignmentTag } from "./shorthand-assignment.tag";
import { QuestionAssignmentExpression } from "./question-assignment.expr";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";

export let QuestionAssignmentTag = function(){
	/**
	 * 疑问赋值标签
	 * @param {Number} _type - 标签类型
	 */
	return class QuestionAssignmentTag extends ShorthandAssignmentTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /\?=/;

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new QuestionAssignmentExpression(
				context,
				// 生成临时变量名
				statement.statements.collections.generate()
			);
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
			// 如果需要编译
			if(ECMAScriptConfig.rexjs){
				// 调用父类方法
				super.visitor(parser, context, statement, statements);
				return;
			}

			// 报错
			parser.error(context);
		};
	};
}();