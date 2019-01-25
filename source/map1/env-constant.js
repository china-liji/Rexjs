// 运行环境常量（arguments、eval）相关
!function(){

this.EnvConstantExpression = function(){
	/**
	 * 运行环境常量表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function EnvConstantExpression(context){
		Expression.call(this, context);
	};
	EnvConstantExpression = new Rexjs(EnvConstantExpression, Expression);

	return EnvConstantExpression;
}();

this.EnvConstantTag = function(EnvConstantExpression){
	/**
	 * 运行环境常量标签
	 * @param {Number} _type - 标签类型
	 */
	function EnvConstantTag(_type){
		SyntaxTag.call(this, _type);
	};
	EnvConstantTag = new Rexjs(EnvConstantTag, SyntaxTag);

	EnvConstantTag.props({
		$class: CLASS_EXPRESSION,
		order: ECMAScriptOrders.ENV_CONSTANT,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new EnvConstantExpression(context);
		}
	});

	return EnvConstantTag;
}(
	this.EnvConstantExpression
);

}.call(
	this
);