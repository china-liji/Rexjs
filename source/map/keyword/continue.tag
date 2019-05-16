import { TerminatedBranchFlowTag } from "../terminated-branch-flow/terminated-branch-flow.tag";
import { ECMAScriptStatement } from "../ecmascript/ecmascript.stmt";

export let ContinueTag = function({ FLOW_CIRCULAR }){
	/**
	 * continue 标签
	 * @param {Number} _type - 标签类型
	 */
	return class ContinueTag extends TerminatedBranchFlowTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /continue/;

		/**
		 * 流类型
		 * @type {Number}
		 */
		flow = FLOW_CIRCULAR;

		/**
		 * 核对标记定义语句，是否满足当前中断流所对应的标记
		 * @param {Statement} statement - 需要判断的语句
		 * @param {TerminatedBranchFlowExpression} terminatedBranchFlowExpression - 中断分支流表达式
		 * @param {String} label - 需要核对的标记文本值
		 * @returns {Boolean}
		 */
		checkLabelledStatement(statement, terminatedBranchFlowExpression, label){
			// 如果语句流一致
			if((statement.flow & FLOW_CIRCULAR) === FLOW_CIRCULAR){
				// 返回父类判断结果
				return super.checkLabelledStatement(statement.target, terminatedBranchFlowExpression, label);
			}

			return false;
		};
		
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 * @returns {Number}
		 */
		getCurrentIndexBy(generatorExpression, terminatedFlowExpression){
			return terminatedFlowExpression.owner.conditionIndex;
		};
	};
}(
	ECMAScriptStatement
);