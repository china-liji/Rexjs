import { UnaryAssignmentTag } from "./unary-assignment-tag";
import { CLASS_EXPRESSION_CONTEXT } from "../core";
import { PostfixUnaryExpression } from "./postfix-unary-expression";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let PostfixUnaryAssignmentTag = function(){
	/**
	 * 后置一元赋值标签
	 * @param {Number} _type - 标签类型
	 */
	return class PostfixUnaryAssignmentTag extends UnaryAssignmentTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_EXPRESSION_CONTEXT;

		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.POSTFIX_UNARY_ASSIGNMENT;

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new PostfixUnaryExpression(context, statement.expression);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.expressionContextTags.newlineTags;
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
			// 如果满足一元赋值标签条件
			if(this.operable(parser, statement.expression)){
				// 设置当前表达式
				context.setExpressionOf(statement);
				return;
			}

			// 报错
			parser.error(context, ECMAScriptErrors.POSTFIX_OPERATION, true);
		};
	};
}();