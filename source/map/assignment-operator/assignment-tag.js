import { BinaryTag } from "../binary-operator/binary-tag";
import { BinaryExpression } from "../binary-operator/binary-expression";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";
import { BoxStatement } from "../base-statement/box-statement";
import { AssignableExpression } from "../base-expression/assignable-expression";
import { IdentifierExpression } from "../identifier/identifier-expression";
import { VariableDeclarationTag } from "../variable/variable-declaration-tag";

export let AssignmentTag = function(assignable){
	/**
	 * 二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	return class AssignmentTag extends BinaryTag {
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 * @returns {Boolean}
		 */
		isSeparator(context){
			// 如果是父类确定的分隔符，但不是箭头符号，那么它就是赋值标签所认定的分隔符
			return super.isSeparator(context) && context.content !== "=>";
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
			let { expression } = statement;

			switch(true){
				// 如果可赋值
				case assignable(parser, expression):
					let binaryExpression = context.setExpressionOf(statement);

					// 设置左侧表达式
					binaryExpression.left = expression;
					// 设置最后的二元表达式为自己
					binaryExpression.last = binaryExpression;
					break;

				// 如果表达式是二元表达式
				case expression instanceof BinaryExpression:
					let { last } = expression, { right } = last;

					// 如果该二元表达式是“赋值表达式”，而且其值也是“可赋值表达式”
					if(last.context.tag.precedence === 0 && assignable(parser, right)){
						// 设置新的右侧表达式并设置当前表达式
						(
							last.right = expression.last = context.setExpressionOf(
								// 仅仅为了模拟环境
								new BoxStatement(statements)
							)
						)
						// 设置左侧表达式
						.left = right;
						break;
					}

				default:
					// 报错
					parser.error(context, ECMAScriptErrors.ASSIGNMENT, true);
					return;
			}

			// 设置当前语句
			context.setStatementOf(statements);
		};
	};
}(
	// assignable
	(parser, expression) => {
		// 如果是赋值表达式
		if(expression instanceof AssignableExpression){
			// 如果是标识符表达式，那么需要验证是否为常量赋值
			if(expression instanceof IdentifierExpression){
				let { context } = expression, { tag } = context;

				switch(true){
					// 如果当前是声明变量名标签，则不判断是否被收集，因为在声明中，已经判断，再判断的话，100% 由于重复定义，而报错
					case tag instanceof VariableDeclarationTag:
						break;

					// 如果已经被收集，会导致报错
					case tag.collected(parser, context, parser.statements):
						return false;
				}
			}

			return true;
		}

		return false;
	}
);