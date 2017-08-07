// 逗号相关
~function(commaSiblingTag){

this.CommaExpression = function(){
	/**
	 * 逗号表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} firstExpression - 第一个子表达式
	 */
	function CommaExpression(context, firstExpression){
		ListExpression.call(this, context, ",");

		// 添加第一个子表达式
		this.add(firstExpression);
	};
	CommaExpression = new Rexjs(CommaExpression, ListExpression);

	return CommaExpression;
}();

this.CommaStatement = function(){
	/**
	 * 逗号语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CommaStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CommaStatement = new Rexjs(CommaStatement, ECMAScriptStatement);
	
	CommaStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().add(this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出语句并添加表达式
			this.out().add(this.expression);
			// 返回标签
			return this.bindingOf();
		}
	});
	
	return CommaStatement;
}();

this.CommaTag = function(ExpressionSeparatorTag, CommaExpression, CommaStatement){
	/**
	 * 逗号标签
	 * @param {Number} _type - 标签类型
	 */
	function CommaTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	CommaTag = new Rexjs(CommaTag, ExpressionSeparatorTag);
	
	CommaTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return commaSiblingTag;
		},
		regexp: /,/,
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
			// 设置当前表达式
			statement.expression = new CommaExpression(context, statement.expression);
			// 设置当前语句
			statements.statement = new CommaStatement(statements);
		}
	});
	
	return CommaTag;
}(
	this.ExpressionSeparatorTag,
	this.CommaExpression,
	this.CommaStatement
);

this.CommaSiblingTag = function(CommaTag, CommaStatement){
	/**
	 * 兄弟逗号标签，即同一语句下面的非第一个逗号
	 * @param {Number} _type - 标签类型
	 */
	function CommaSiblingTag(_type){
		CommaTag.call(this, _type);
	};
	CommaSiblingTag = new Rexjs(CommaSiblingTag, CommaTag);

	CommaSiblingTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new CommaStatement(statements);
		}
	});

	return CommaSiblingTag;
}(
	this.CommaTag,
	this.CommaStatement
);

commaSiblingTag = new this.CommaSiblingTag();
	
}.call(
	this,
	// commaSiblingTag
	null
);