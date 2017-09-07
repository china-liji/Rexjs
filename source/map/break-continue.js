// 迭代中断流子类相关
!function(TerminatedBranchFlowTag){

this.BreakTag = function(){
	/**
	 * break 标签
	 * @param {Number} _type - 标签类型
	 */
	function BreakTag(_type){
		TerminatedBranchFlowTag.call(this, _type);
	};
	BreakTag = new Rexjs(BreakTag, TerminatedBranchFlowTag);
	
	BreakTag.props({
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getCurrentIndexBy: function(generatorExpression, terminatedFlowExpression){
			return terminatedFlowExpression.owner.mainFlowIndex;
		},
		regexp: /break/
	});
	
	return BreakTag;
}();

this.ContinueTag = function(FLOW_CIRCULAR, checkLabelledStatement){
	/**
	 * continue 标签
	 * @param {Number} _type - 标签类型
	 */
	function ContinueTag(_type){
		TerminatedBranchFlowTag.call(this, _type);
	};
	ContinueTag = new Rexjs(ContinueTag, TerminatedBranchFlowTag);
	
	ContinueTag.props({
		/**
		 * 核对标记定义语句，是否满足当前中断流所对应的标记
		 * @param {Statement} statement - 需要判断的语句
		 * @param {String} label - 需要核对的标记文本值
		 */
		checkLabelledStatement: function(statement, label){
			// 如果语句流一致
			if((statement.flow & FLOW_CIRCULAR) === FLOW_CIRCULAR){
				// 返回父类判断结果
				return checkLabelledStatement.call(this, statement.target, label);
			}

			return false;
		},
		flow: FLOW_CIRCULAR,
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getCurrentIndexBy: function(generatorExpression, terminatedFlowExpression){
			return terminatedFlowExpression.owner.conditionIndex;
		},
		regexp: /continue/
	});
	
	return ContinueTag;
}(
	// FLOW_CIRCULAR
	ECMAScriptStatement.FLOW_CIRCULAR,
	TerminatedBranchFlowTag.prototype.checkLabelledStatement
);

}.call(
	this,
	this.TerminatedBranchFlowTag
);