import { ExpressionSeparatorTag } from "../base-tag/expression-separator.tag";
import { BinaryExpression } from "./binary.expr";
import { BinaryStatement } from "./binary.stmt";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { BoxStatement } from "../base-statement/box.stmt";

export let BinaryTag = function(){
	/**
	 * 二元标签
	 * @param {Number} _type - 标签类型
	 */
	return class BinaryTag extends ExpressionSeparatorTag {
		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.BINARY;

		/**
		 * 该二元标签的计算优先级
		 * @type {Number}
		 */
		precedence = 0;

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 * @returns {Expression}
		 */
		getBoundExpression(context){
			return new BinaryExpression(context);
		};

		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {ECMAScriptStatement}
		 */
		getBoundStatement(statements){
			return new BinaryStatement(statements);
		};

		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 * @returns {Boolean}
		 */
		isSeparator(context){
			return context.tag instanceof ExpressionSeparatorTag;
		};

		
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.expressionTags;
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
			let { precedence } = this, { expression } = statement;

			// 如果当前表达式是二元表达式而且该二元表达式的运算符优先级小于当前运算符的优先级
			if(expression instanceof BinaryExpression && expression.context.tag.precedence < precedence){
				let exp = expression, { right } = expression;

				// 如果右侧表达式也是二元表达式
				while(right instanceof BinaryExpression){
					// 如果当前二元运算符的优先级小于等于该表达式的运算符优先级
					if(precedence <= right.context.tag.precedence){
						break;
					}

					// 记录上一个表达式
					exp = right;
					// 再获取右侧表达式
					right = right.right;
				}

				// 设置新的右侧表达式并设置当前表达式
				(
					exp.right = expression.last = context.setExpressionOf(
						// 仅仅为了模拟环境
						new BoxStatement(statements)
					)
				)
				// 设置左侧表达式
				.left = right;
			}
			else {
				// 设置当前表达式
				let binaryExpression = context.setExpressionOf(statement);

				// 设置左侧表达式
				binaryExpression.left = expression;
				// 设置最后的二元表达式为自己
				binaryExpression.last = binaryExpression;
			}

			// 设置当前语句
			context.setStatementOf(statements);
		}
	};
}();