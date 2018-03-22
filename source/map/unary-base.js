// 一元标签基类
!function(){
	
this.UnaryExpression = function(){
	/**
	 * 一元表达式
	 * @param {Context} context - 标签上下文
	 */
	function UnaryExpression(context){
		Expression.call(this, context);
	};
	UnaryExpression = new Rexjs(UnaryExpression, Expression);
	
	UnaryExpression.$({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取一元操作符的内容
			contentBuilder.appendContext(this.context);
			// 提取操作对象内容
			this.operand.extractTo(contentBuilder);
		},
		operand: NULL
	});
	
	return UnaryExpression;
}();

this.UnaryStatement = function(){
	/**
	 * 一元语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function UnaryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	UnaryStatement = new Rexjs(UnaryStatement, ECMAScriptStatement);
	
	UnaryStatement.$({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(){
			// 跳出语句并设置 operand
			this.out().operand = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.expression;

			// 如果一元标签验证该标签为表达式分隔符标签
			if(this.target.expression.context.tag.isSeparator(context, expression)){
				// 跳出语句并设置 operand
				this.out().operand = expression;
			}
		}
	});
	
	return UnaryStatement;
}();

this.UnaryTag = function(UnaryExpression, UnaryStatement, ExpressionSeparatorTag){
	/**
	 * 一元标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryTag(_type){
		SyntaxTag.call(this, _type);
	};
	UnaryTag = new Rexjs(UnaryTag, SyntaxTag);
	
	UnaryTag.$({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context){
			return new UnaryExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new UnaryStatement(statements);
		},
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 * @param {Expression} operand - 该一元表达式所操作的对象
		 */
		isSeparator: function(context){
			return context.tag instanceof ExpressionSeparatorTag;
		},
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
		visitor: commonVisitor
	});
	
	return UnaryTag;
}(
	this.UnaryExpression,
	this.UnaryStatement,
	this.ExpressionSeparatorTag
);

this.UnaryKeywordTag = function(UnaryTag){
	/**
	 * 一元关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryKeywordTag(_type){
		UnaryTag.call(this, _type);
	};
	UnaryKeywordTag = new Rexjs(UnaryKeywordTag, UnaryTag);
	
	UnaryKeywordTag.$({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(content);
			// 追加空格
			contentBuilder.appendSpace();
		}
	});
	
	return UnaryKeywordTag;
}(
	this.UnaryTag
);

}.call(
	this
);