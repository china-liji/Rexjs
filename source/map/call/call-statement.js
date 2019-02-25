import { ECMAScriptStatement } from "../ecmascript/ecmascript-statement";
import { EmptyExpression } from "../core";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";

export let CallStatement = function(){
	return class CallStatement extends ECMAScriptStatement {
		/**
		 * 函数调用语句
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		constructor(statements){
			super(statements);

			this.expression = new EmptyExpression(null);
		};

		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			// 如果不是关闭分组小括号
			if(context.content !== ")"){
				// 报错
				parser.error(context, ECMAScriptErrors.CALL);
				return null;
			}
			
			// 跳出该语句并设置表达式
			this.out().inner.set(this.expression);
			// 返回关闭分组小括号标签
			return this.bindingOf();
		};

		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		try(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出该语句并添加表达式
			this.out().inner.add(this.expression);
			// 返回关闭分组小括号标签
			return this.tagOf().separator;
		};
	};
}();