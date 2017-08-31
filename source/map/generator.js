// 函数生成器符号相关
!function(){

this.GeneratorHeaderExpression = function(){
	function GeneratorHeaderExpression(context){
		Expression.call(this, context);
	};
	GeneratorHeaderExpression = new Rexjs(GeneratorHeaderExpression, Expression);


	return GeneratorHeaderExpression;
}();

this.GeneratorTag = function(){
	/**
	 * 函数生成器标签
	 * @param {Number} _type - 标签类型
	 */
	function GeneratorTag(_type){
		SyntaxTag.call(this, _type);
	};
	GeneratorTag = new Rexjs(GeneratorTag, SyntaxTag);

	GeneratorTag.props({
		regexp: /\*/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的 generator 属性
			statement.expression.generator = context;
		}
	});

	return GeneratorTag;
}();

}.call(
	this
);