import { SyntaxTag, CLASS_STATEMENT_BEGIN } from "../core";
import { ECMAScriptStatement } from "../ecmascript/ecmascript.stmt";
import { TerminatedFlowExpression } from "./terminated-flow.expr";
import { TerminatedFlowStatement } from "./terminated-flow.stmt";
import { ECMAScriptMethod } from "../ecmascript/ecmascript-method";

export let TerminatedFlowTag = function(){
	/**
	 * 中断流标签
	 * @param {Number} _type - 标签类型
	 */
	return class TerminatedFlowTag extends SyntaxTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_STATEMENT_BEGIN;

		/**
		 * 流类型
		 * @type {Number}
		 */
		flow = ECMAScriptStatement.FLOW_MAIN;
		
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new TerminatedFlowExpression(context, statement.statements);
		};
		
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {Statement}
		 */
		getBoundStatement(statements){
			return new TerminatedFlowStatement(statements);
		};
		
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 * @returns {String}
		 */
		getCurrentIndexBy(){
			return "NaN";
		};
		
		/**
		 * 从相关生成器中获取下一次所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 * @returns {String}
		 */
		getNextIndexBy(){
			return "NaN";
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
			 ECMAScriptMethod.visitor(parser, context, statement, statements);
		};
	};
}();