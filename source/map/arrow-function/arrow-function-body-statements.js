import { FunctionBodyStatements } from "../function/function-body-statements";

export let ArrowFunctionBodyStatements = function(){
	/**
	 * 函数主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	return class ArrowFunctionBodyStatements extends FunctionBodyStatements {
		/**
		 * 语句块闭包类型
		 * @type {Number}
		 */
		scope = FunctionBodyStatements.SCOPE_LAZY;

		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @returns {void}
		 */
		applySuper(parser, context){
			this.target.closure.applySuper(parser, context);
		};
		
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} opening - 起始父类调用小括号标签上下文
		 * @returns {void}
		 */
		applySuperCall(parser, context, opening){
			this.target.closure.applySuperCall(parser, context, opening);
		};

		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 * @returns {void}
		 */
		applyThis(parser, context){
			let { closure } = this.target;

			// 如果外层闭包存在
			if(closure){
				// 返回外层闭包应用结果
				return closure.applyThis(parser, context);
			}
		};

		/**
		 * 获取当前引用标识符
		 * @returns {String}
		 */
		get reference(){
			return this.target.reference;
		};
	};
}();