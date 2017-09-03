// 大括号主体相关
!function(){

this.DefaultBraceBodyExpression = function(){
	/**
	 * 默认大括号主体表达式
	 */
	function DefaultBraceBodyExpression(){
		DefaultExpression.call(this);
	};
	DefaultBraceBodyExpression = new Rexjs(DefaultBraceBodyExpression, DefaultExpression);

	DefaultBraceBodyExpression.props({
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});

	return DefaultBraceBodyExpression;
}();

this.BraceBodyStatement = function(DefaultBraceBodyExpression){
	/**
	 * 大括号主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BraceBodyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BraceBodyStatement = new Rexjs(BraceBodyStatement, ECMAScriptStatement);
	
	BraceBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭大括号
			if(context.content !== "}"){
				return null;
			}

			// 跳出语句并设置 inner
			this.out(parser).inner = this.statements;
			// 返回结束语句块标签
			return this.bindingOf();
		},
		expression: new DefaultBraceBodyExpression(),
		/**
		 * 跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		out: function(parser){
			// 返回语句块表达式
			return (
				// 恢复语句块
				parser.statements = this.statements.target
			)
			.statement
			.expression;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.statements.target.statement.expression.context.tag;
		}
	});
	
	return BraceBodyStatement;
}(
	this.DefaultBraceBodyExpression
);

}.call(
	this
);