// 三元表达式相关
!function(colonTag){

this.TernaryExpression = function(){
	/**
	 * 三元表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function TernaryExpression(context){
		Expression.call(this, context);
	};
	TernaryExpression = new Rexjs(TernaryExpression, Expression);

	TernaryExpression.props({
		condition: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取条件表达式
			this.condition.extractTo(contentBuilder);
			// 追加问号上下文
			contentBuilder.appendContext(this.context);
			// 提取成立条件表达式
			this.positive.extractTo(contentBuilder);
			// 追加冒号上下文
			contentBuilder.appendContext(this.colonContext);
			// 提取否定条件表达式
			this.negative.extractTo(contentBuilder);
		},
		negative: null,
		positive: null
	});

	return TernaryExpression;
}();

this.PositiveStatement = function(){
	/**
	 * 三元表达式的肯定条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PositiveStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	PositiveStatement = new Rexjs(PositiveStatement, ECMAScriptStatement);

	PositiveStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是冒号
			if(context.content !== ":"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 positive
			this.out().positive = this.expression;
			return this.bindingOf();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 报错
				parser.error(context);
			}
		}
	});

	return PositiveStatement;
}();

this.NegativeStatement = function(){
	/**
	 * 三元表达式的否定条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function NegativeStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	NegativeStatement = new Rexjs(NegativeStatement, ECMAScriptStatement);

	NegativeStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 negative
			this.out().negative = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句并设置 negative
				this.out().negative = this.expression;
			}
		}
	});

	return NegativeStatement;
}();

this.QuestionTag = function(ExpressionSeparatorTag, TernaryExpression, PositiveStatement){
	/**
	 * 三元运算符“问号”标签
	 * @param {Number} _type - 标签类型
	 */
	function QuestionTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	QuestionTag = new Rexjs(QuestionTag, ExpressionSeparatorTag);

	QuestionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return colonTag;
		},
		regexp: /\?/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 初始化三元表达式
			var ternaryExpression = new TernaryExpression(context);

			// 设置三元表达式的条件
			ternaryExpression.condition = statement.expression;
			// 设置当前表达式
			statement.expression = ternaryExpression;
			// 设置当前语句
			statements.statement = new PositiveStatement(statements);
		}
	});

	return QuestionTag;
}(
	this.ExpressionSeparatorTag,
	this.TernaryExpression,
	this.PositiveStatement
);

this.ColonTag = function(NegativeStatement){
	/**
	 * 冒号标签
	 * @param {Number} _type - 标签类型
	 */
	function ColonTag(_type){
		SyntaxTag.call(this, _type);
	};
	ColonTag = new Rexjs(ColonTag, SyntaxTag);

	ColonTag.props({
		regexp: /:/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置冒号上下文
			statement.expression.colonContext = context;
			// 设置当前语句
			statements.statement = new NegativeStatement(statements);
		}
	});
	
	return ColonTag;
}(
	this.NegativeStatement
);

colonTag = new this.ColonTag();

}.call(
	this,
	// colonTag
	null
);