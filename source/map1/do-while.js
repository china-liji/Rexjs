// do while 语句相关
!function(doWhileTag, closingDoWhileConditionTag){
	
this.DoExpression = function(ConditionalExpression){
	/**
	 * do 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function DoExpression(context, statements){
		ConditionalExpression.call(this, context, statements);
	};
	DoExpression = new Rexjs(DoExpression, ConditionalExpression);
	
	DoExpression.props({
		body: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			this.adapterIndex = this.mainFlowIndex;

			// 以生成器形式编译主体
			this.generateBodyTo(this.body, contentBuilder, true);
			// 以生成器形式编译逻辑条件
			this.generateConditionTo(this.condition.inner, contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		normalizeTo: function(contentBuilder){
			var body = this.body;
			
			// 追加 do 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			
			// 提取主体
			body.extractTo(contentBuilder);
			
			// 判断 do while 主体表达式是否需要加分号
			if((body.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
				// 追加分号
				contentBuilder.appendString(";");
			}
			
			// 追加 while 关键字
			contentBuilder.appendContext(this.whileContext);
			// 提取 while 条件
			this.condition.extractTo(contentBuilder);
		},
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} state - 表达式状态
		 */
		set state(state){},
		whileContext: null
	});
	
	return DoExpression;
}(
	this.ConditionalExpression
);

this.DoStatement = function(SingleStatement){
	/**
	 * do 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DoStatement(statements){
		SingleStatement.call(this, statements);
	};
	DoStatement = new Rexjs(DoStatement, SingleStatement);
	
	DoStatement.props({
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			var expression = this.expression;
			
			switch(false){
				// 如果不是 while 关键字
				case context.content === "while":
					break;
				
				// 如果表达式没有结束
				case (expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE:
					break;

				default:
					// 跳出语句并设置 body
					this.out().body = expression;
					// 返回 do while 标签
					return this.bindingOf();
			}

			// 报错
			parser.error(context);
		},
		flow: ECMAScriptStatement.FLOW_CIRCULAR
	});
	
	return DoStatement;
}(
	this.SingleStatement
);

this.DoTag = function(DoExpression, DoStatement){
	/**
	 * do 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DoTag(_type){
		SyntaxTag.call(this, _type);
	};
	DoTag = new Rexjs(DoTag, SyntaxTag);
	
	DoTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return doWhileTag;
		},
		regexp: /do/,
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
			// 设置当前表达式
			statement.expression = new DoExpression(context, statements);
			// 设置当前语句
			statements.statement = new DoStatement(statements);
		}
	});
	
	return DoTag;
}(
	this.DoExpression,
	this.DoStatement
);

this.DoWhileTag = function(WhileTag){
	/**
	 * do while 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DoWhileTag(_type){
		WhileTag.call(this, _type);
	};
	DoWhileTag = new Rexjs(DoWhileTag, WhileTag);

	DoWhileTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.doWhileConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.whileContext = context;
		}
	});
	
	return DoWhileTag;
}(
	this.WhileTag
);

this.OpeningDoWhileConditionTag = function(OpeningWhileConditionTag, ConditionStatement){
	/**
	 * do while 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningDoWhileConditionTag(_type){
		OpeningWhileConditionTag.call(this, _type);
	};
	OpeningDoWhileConditionTag = new Rexjs(OpeningDoWhileConditionTag, OpeningWhileConditionTag);

	OpeningDoWhileConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingDoWhileConditionTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 do while 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpeningDoWhileConditionTag;
}(
	this.OpeningWhileConditionTag,
	this.ConditionStatement
);

this.ClosingDoWhileConditionTag = function(ClosingWhileConditionTag){
	/**
	 * do while 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingDoWhileConditionTag(_type){
		ClosingWhileConditionTag.call(this, _type);
	};
	ClosingDoWhileConditionTag = new Rexjs(ClosingDoWhileConditionTag, ClosingWhileConditionTag);

	ClosingDoWhileConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		visitor: function(parser, context, statement){
			statement.expression.condition.closing = context;
		}
	});
	
	return ClosingDoWhileConditionTag;
}(
	this.ClosingWhileConditionTag
);

doWhileTag = new this.DoWhileTag();
closingDoWhileConditionTag = new this.ClosingDoWhileConditionTag();
	
}.call(
	this,
	// doWhileTag
	null,
	// closingDoWhileConditionTag
	null
);