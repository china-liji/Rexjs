import { TerminatedFlowTag } from "../terminated-flow/terminated-flow.tag";
import { LabelledStatement } from "../label/labelled.stmt";
import { ECMAScriptStatement } from "../ecmascript/ecmascript.stmt";
import { TerminatedBranchFlowExpression } from "./terminated-branch-flow.expr";
import { TerminatedBranchFlowStatement } from "./terminated-branch-flow.stmt";

export let TerminatedBranchFlowTag = function(){
	/**
	 * 中断分支流标签
	 * @param {Number} _type - 标签类型
	 */
	return class TerminatedBranchFlowTag extends TerminatedFlowTag {
		/**
		 * 流类型
		 * @type {Number}
		 */
		flow = ECMAScriptStatement.FLOW_BRANCH;

		/**
		 * 核对标记定义语句，是否满足当前中断流所对应的标记
		 * @param {Statement} statement - 需要判断的语句
		 * @param {TerminatedBranchFlowExpression} terminatedBranchFlowExpression - 中断分支流表达式
		 * @param {String} label - 需要核对的标记文本值
		 * @returns {Boolean}
		 */
		checkLabelledStatement(statement, terminatedBranchFlowExpression, label){
			// 如果当前语句是标记语句
			if(statement instanceof LabelledStatement){
				// 返回标签对比结果
				if(statement.target.expression.context.content === label){
					// 设置中断流表达式所属表达式
					terminatedBranchFlowExpression.owner = statement.expression;
					return true;
				}
			}

			return false;
		};
		
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 * @returns {Expression}
		 */
		getBoundExpression(context, statement){
			return new TerminatedBranchFlowExpression(context, statement.statements);
		};
		
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 * @returns {Statement}
		 */
		getBoundStatement(statements){
			return new TerminatedBranchFlowStatement(statements);
		};
		
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @returns {SyntaxTags}
		 */
		require(tagsMap){
			return tagsMap.terminatedBranchFlowContextTags;
		};
	};
}();