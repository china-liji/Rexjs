// 执行函数的一元操作符相关
!function(UnaryKeywordTag){

this.ExecutableExpression = function(){
	/**
	 * 可被执行的（函数）表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function ExecutableExpression(opening){
		PartnerExpression.call(this, opening);
	};
	ExecutableExpression = new Rexjs(ExecutableExpression, PartnerExpression);

	return ExecutableExpression;
}();

this.ExecTag = function(ExecutableExpression, isSeparator){
	/**
	 * 执行函数关键字（如：new、try 等）标签
	 * @param {Number} _type - 标签类型
	 */
	function ExecTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	ExecTag = new Rexjs(ExecTag, UnaryKeywordTag);
	
	ExecTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 * @param {Expression} operand - 该一元表达式所操作的对象
		 */
		isSeparator: function(context, operand){
			/*
				该 isSeparator 是由 try 方法进入，
				而只有 CLASS_EXPRESSION_CONTEXT 标签才能进入 try
			*/
			return operand instanceof ExecutableExpression || isSeparator.call(this, context);
		}
	});
	
	return ExecTag;
}(
	this.ExecutableExpression,
	UnaryKeywordTag.prototype.isSeparator
);

}.call(
	this,
	this.UnaryKeywordTag
);