import { ECMAScriptStatement } from "../ecmascript/ecmascript-statement";

export let PropertyValueStatement = function(){
	/**
	 * 对象属性值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	return class PropertyValueStatement extends ECMAScriptStatement {
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		catch(parser, context){
			// 跳出语句并设置 operand
			this.out().value.operand = this.expression;
		};

		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @returns {SyntaxTag}
		 */
		try(parser, context){
			// 如果是逗号
			if(context.content === ","){
				this.catch(parser, context);
			}
		};
	};
}();