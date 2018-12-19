// while 语句相关
!function(closingWhileConditionTag){

this.WhileExpression = function(ConditionalExpression){
	/**
	 * while 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function WhileExpression(context, statements){
		ConditionalExpression.call(this, context, statements);
	};
	WhileExpression = new Rexjs(WhileExpression, ConditionalExpression);
	
	WhileExpression.props({
		body: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			// 以生成器形式编译逻辑条件
			this.generateConditionTo(this.condition.inner, contentBuilder);
			// 以生成器形式编译主体
			this.generateBodyTo(this.body, contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		normalizeTo: function(contentBuilder){
			// 提取 while 关键字
			contentBuilder.appendContext(this.context);
			
			// 提取 while 条件
			this.condition.extractTo(contentBuilder);
			// 提取 while 主体语句
			this.body.extractTo(contentBuilder);
		}
	});
	
	return WhileExpression;
}(
	this.ConditionalExpression
);

this.WhileBodyStatement = function(SingleStatement){
	/**
	 * while 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function WhileBodyStatement(statements){
		SingleStatement.call(this, statements);
	};
	WhileBodyStatement = new Rexjs(WhileBodyStatement, SingleStatement);
	
	WhileBodyStatement.props({
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = this.expression;
		},
		flow: ECMAScriptStatement.FLOW_CIRCULAR
	});
	
	return WhileBodyStatement;
}(
	this.SingleStatement
);

this.WhileTag = function(WhileExpression){
	/**
	 * while 标签
	 * @param {Number} _type - 标签类型
	 */
	function WhileTag(_type){
		SyntaxTag.call(this, _type);
	};
	WhileTag = new Rexjs(WhileTag, SyntaxTag);
	
	WhileTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /while/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.whileConditionTags;
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
			statement.expression = new WhileExpression(context, statements);
		}
	});
	
	return WhileTag;
}(
	this.WhileExpression
);

this.OpeningWhileConditionTag = function(OpeningParenTag, ConditionStatement){
	/**
	 * while 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningWhileConditionTag(_type){
		OpeningParenTag.call(this, _type);
	};
	OpeningWhileConditionTag = new Rexjs(OpeningWhileConditionTag, OpeningParenTag);
	
	OpeningWhileConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingWhileConditionTag;
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
		visitor: function(parser, context, statement, statements){
			// 设置 while 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpeningWhileConditionTag;
}(
	this.OpeningParenTag,
	this.ConditionStatement
);

this.ClosingWhileConditionTag = function(ClosingParenTag, WhileBodyStatement){
	/**
	 * while 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingWhileConditionTag(_type){
		ClosingParenTag.call(this, _type);
	};
	ClosingWhileConditionTag = new Rexjs(ClosingWhileConditionTag, ClosingParenTag);
	
	ClosingWhileConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 条件表达式结束
			statement.expression.condition.closing = context;
			// 设置当前语句
			statements.statement = new WhileBodyStatement(statements);
		}
	});
	
	return ClosingWhileConditionTag;
}(
	this.ClosingParenTag,
	this.WhileBodyStatement
);

closingWhileConditionTag = new this.ClosingWhileConditionTag();

}.call(
	this,
	// closingWhileConditionTag
	null
);