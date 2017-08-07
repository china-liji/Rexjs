// 迭代中断流子类相关
~function(TerminatedBranchFlowTag){

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
		regexp: /break/
	});
	
	return BreakTag;
}();

this.ContinueTag = function(FLOW_CIRCULAR){
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
		 * 核对标记语句，是否满足当前中断流所对应的标记
		 * @param {Statement} flowStatement - 标签语句
		 */
		checkFlowStatement: function(flowStatement){
			return (flowStatement.flow & FLOW_CIRCULAR) === FLOW_CIRCULAR;
		},
		flow: FLOW_CIRCULAR,
		regexp: /continue/
	});
	
	return ContinueTag;
}(
	// FLOW_CIRCULAR
	ECMAScriptStatement.FLOW_CIRCULAR
);

}.call(
	this,
	this.TerminatedBranchFlowTag
);