import { PropertyStatement } from "../property/property-statement";

export let PropertyDestructuringStatement = function(both){
	/**
	 * 对象属性解构语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class PropertyDestructuringStatement extends PropertyStatement {
		/**
		 * 解构的绑定对象
		 * @type {Expression}
		 */
		bound = null;

		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			let { bound } = this;

			return both(parser, this, context, bound, bound, super.catch);
		};
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		try(parser, context){
			return both(parser, this, context, this.bound, context.content === ",", super.try);
		};
	};
}(
	// both
	(parser, statement, context, bound, condition, method) => {
		// 如果满足条件
		if(condition){
			let tag, { inner } = statement.target.expression;

			// 调用父类方法
			tag = method.call(statement, parser, context);

			// 替换为解构项表达式
			inner[inner.length - 1] = inner.latest = bound;
			return tag;
		}

		return method.call(statement, parser, context);
	}
);