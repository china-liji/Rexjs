import { UnaryStatement } from "./unary-statement";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let UnaryAssignmentStatement = function(error){
	/**
	 * 一元赋值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class UnaryAssignmentStatement extends UnaryStatement {
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			// 如果满足一元赋值标签条件
			if(this.target.expression.context.tag.operable(parser, this.expression)){
				// 跳出语句并设置 operand
				this.out().operand = this.expression;
				return;
			}

			// 报错
			error(parser, this);
		};

		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		try(parser, context){
			let {
				expression,
				target: {
					expression: {
						context: { tag }
					}
				}
			} = this;

			switch(false){
				// 如果不是分隔符标签
				case tag.isSeparator(context, expression):
					return;
	
				// 如果不能满足一元赋值标签条件
				case tag.operable(parser, expression):
					// 报错
					error(parser, this);
					return;
			}

			// 跳出语句并设置 operand
			this.out().operand = expression;
		};
	};
}(
	// error
	(parser, statement) => {
		// 报错
		parser.error(
			statement.target.expression.context,
			ECMAScriptErrors.PREFIX_OPERATION,
			true
		);
	}
);