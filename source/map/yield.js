// yield 表达式相关
!function(TerminatedFlowExpression, SingleStatement, ReturnTag){

this.YieldTag = function(visitor){
	/**
	 * yield 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function YieldTag(_type){
		ReturnTag.call(this, _type);
	};
	YieldTag = new Rexjs(YieldTag, ReturnTag);

	YieldTag.$({
		/**
		 * 获取上下文中的闭包
		 * @param {Statement} statements - 当前语句块
		 */
		contextClosure: function(statements){
			return statements.strictContextGenerator;
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.es6Base ? "return" : content);
		},
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param @param {FunctionExpression} functionExpression - 相关函数生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getCurrentIndexBy: function(functionExpression){
			return functionExpression.nextIndex();
		},
		/**
		 * 从相关生成器中获取下一次所需使用的生成器索引值
		 * @param @param {FunctionExpression} functionExpression - 相关函数生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getNextIndexBy: function(functionExpression){
			return functionExpression.index;
		},
		regexp: /yield/
	});

	return YieldTag;
}(
	ReturnTag.prototype.visitor
);

}.call(
	this,
	this.TerminatedFlowExpression,
	this.SingleStatement,
	this.ReturnTag
);