import { SpreadTag } from "../spread-operator/spread.tag";
import { ArgumentRestValueExpression } from "./argument-rest-value.expr";

export let ArgumentRestOperatorTag = function(){
	/**
	 * 参数省略符标签
	 * @param {Number} _type - 标签类型
	 */
	return class ArgumentRestOperatorTag extends SpreadTag {
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new ArgumentRestValueExpression(
				context,
				statement.target.expression.arguments.inner.length
			);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.argumentRestNameTags;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor(parser, context, statement){
			// 设置当前表达式
			context.setExpressionOf(statement);
		};
	};
}();