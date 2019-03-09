import { ECMAScriptStatements } from "../ecmascript/ecmascript-statements";
import { FunctionVariableCollections } from "./function-variable-collections";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";
import { ECMAScriptConfig } from "../ecmascript/ecmascript-config";
import { BraceBodyStatement } from "../brace/brace-body-statement";

export let FunctionBodyStatements = function(){
	return class FunctionBodyStatements extends ECMAScriptStatements {
		/**
		 * 语句块闭包类型
		 * @type {Number}
		 */
		scope = ECMAScriptStatements.SCOPE_CLOSURE;

		/**
		 * 函数主体语句块
		 * @param {Statements} target - 目标语句块，即上一层语句块
		 */
		constructor(target){
			super(
				target,
				new FunctionVariableCollections(
					target.statement.target.expression.arguments.collections
				)
			);
		};

		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @returns {void}
		 */
		applySuper(parser, context){
			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);
		};

		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} opening - 起始父类调用小括号标签上下文
		 * @returns {void}
		 */
		applySuperCall(parser, context){
			this.applySuper(parser, context);
		};

		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 * @returns {void}
		 */
		applyThis(){
			// 什么也不做，即默认允许应用
		};

		/**
		 * 获取当前所处闭包
		 * @returns {ECMAScriptStatements}
		 */
		get closure(){
			return this;
		};

		/**
		 * 设置当前所处闭包
		 * @param {Statements} - 需要设置的闭包
		 * @returns {ECMAScriptStatements}
		 */
		set closure(value){};
		
		/**
		 * 获取当前上下文中的生成器
		 * @returns {Expression}
		 */
		get contextGenerator(){
			// 获取函数表达式
			let { expression } = this.target.statement.target;

			// 如果存在生成器的星号，则返回表达式
			return expression.star ? expression : null;
		};

		/**
		 * 获取当前上下文中需要编译的生成器
		 * @returns {Generator}
		 */
		get contextGeneratorIfNeedCompile(){
			// 如果需要编译，则返回 contextGenerator
			return ECMAScriptConfig.es6Base ? this.contextGenerator : null;
		};
		
		/**
		 * 初始化语句
		 * @returns {ECMAScriptStatement}
		 */
		initStatement(){
			return new BraceBodyStatement(this);
		};
	};
}();