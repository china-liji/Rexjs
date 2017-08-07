// 公用的表达式
~function(){

this.AssignableExpression = function(){
	/**
	 * 可赋值的表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function AssignableExpression(context){
		Expression.call(this, context);
	};
	AssignableExpression = new Rexjs(AssignableExpression, Expression);

	return AssignableExpression;
}();

this.ConditionalExpression = function(){
	/**
	 * 带条件的表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ConditionalExpression(context){
		Expression.call(this, context);
	};
	ConditionalExpression = new Rexjs(ConditionalExpression, Expression);

	ConditionalExpression.props({
		condition: null
	});

	return ConditionalExpression;
}();

}.call(
	this
);