import { TerminatedBranchFlowTag } from "../terminated-branch-flow/terminated-branch-flow.tag";

export let BreakTag = function(){
	/**
	 * break 标签
	 * @param {Number} _type - 标签类型
	 */
	return class BreakTag extends TerminatedBranchFlowTag {
		/**
		 * 标签正则
		 * @type {RegExp}
		 */
		regexp = /break/;

		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 * @returns {Number}
		 */
		getCurrentIndexBy(generatorExpression, terminatedFlowExpression){
			return terminatedFlowExpression.owner.mainFlowIndex;
		};
	};
}();