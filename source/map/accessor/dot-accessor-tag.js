import { DotTag } from "../base-tag/dot-tag";
import { CLASS_EXPRESSION_CONTEXT } from "../core";
import { AccessorExpression } from "./accessor-expression";
import { ECMAScriptOrders } from "../ecmascript/ecmascript-orders";

export let DotAccessorTag = function(){
	/**
	 * 点属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	return class DotAccessorTag extends DotTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_EXPRESSION_CONTEXT;

		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.DOT_ACCESSOR;

		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new AccessorExpression(context, statement.expression);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.dotAccessorContextTags;
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
			// 设置当前表达式
			context.setExpressionOf(statement);
		};
	};
}();