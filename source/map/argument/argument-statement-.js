import { ECMAScriptStatement } from "../ecmascript/ecmascript-statement";
import { DefaultExpression } from "../core";

export let ArgumentStatement = function(){
	/**
	 * 参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class ArgumentStatement extends ECMAScriptStatement {
		/**
		 * 语句当前表达式
		 * @type {Expression}
		 */
		expression = new DefaultExpression();

		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			// 跳出语句并获取 inner
			let { inner } = this.out().arguments;

			// 判断标签内容
			switch(context.content){
				// 如果是逗号（参数名上下文只允许接等于号赋值标签，所以逗号会进入 catch）
				case ",":
					// 添加参数表达式
					inner.add(this.expression);
					// 返回分隔符标签
					return this.tagOf().separator;

				// 如果是结束小括号，则说明是
				case ")":
					// 设置参数表达式（空参数，是默认表达式，要用 set 方法）
					inner.set(this.expression);
					// 返回参数结束小括号标签
					return this.bindingOf();
			}

			// 报错
			parser.error(context);
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

			// 跳出语句并添加参数表达式
			this.out().arguments.inner.add(this.expression);
			// 返回分隔符标签
			return this.tagOf().separator;
		};

		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 * @returns {SyntaxTag}
		 */
		tagOf(){
			return this.target.expression.arguments.opening.tag;
		};
	};
}();