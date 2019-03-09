import { DotAccessorTag } from "../accessor/dot-accessor-tag";
import { TargetExpression } from "./target-expression";

export let TargetAccessorTag = function(){
	/**
	 * target 访问器标签
	 * @param {Number} _type - 标签类型
	 */
	return class TargetAccessorTag extends DotAccessorTag {
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @returns {Expression}
		 */
		getBoundExpression(context){
			return new TargetExpression(context);
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.targetAccessorContextTags;
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
			// 调用父类方法
			super.visitor(
				parser,
				context,
				// 设置当前语句为 target，目的是因为当前已经不属于一元操作语句
				statements.statement = statement.target,
				statements
			);
		};
	};
}();