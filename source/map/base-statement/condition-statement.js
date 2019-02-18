import { ECMAScriptStatement } from "../ecmascript/ecmascript-statement";

export let ConditionStatement = function(){
	/**
	 * 条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class ConditionStatement extends ECMAScriptStatement {
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			// 如果不是小括号
			if(context.content !== ")"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出该语句并设置条件表达式的 inner
			this.out().condition.inner = this.expression;
			return this.bindingOf();
		};

		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 * @returns {SyntaxTag}
		 */
		tagOf(){
			return this.target.expression.condition.context.tag;
		};
	};
}();