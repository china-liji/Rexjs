import { STATE_STATEMENT_END } from "../core";
import { ECMAScriptStatement } from "../ecmascript/ecmascript-statement";

export let SingleStatement = function(){
	/**
	 * 单语句，即与上下文无关的语句，一般用于 if、for、while 等等语句的主体
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class SingleStatement extends ECMAScriptStatement {
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			switch(false){
				// 如果不是分号
				case context.content === ";":
					break;

				// 如果分号不是标识着语句结束
				case context.tag.class.statementEnd:
					break;

				// 如果当前表达式已经标识着语句结束
				case (this.expression.state & STATE_STATEMENT_END) !== STATE_STATEMENT_END:
					break;

				default:
					// 返回该分号标签
					return context.tag;
			}

			// 请求跳出该语句
			return this.requestOut(parser, context);
		};

		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {Expression}
		 */
		requestOut(){
			return null;
		}
	};
}();