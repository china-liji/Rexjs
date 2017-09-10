// if 语句相关
!function(closeIfConditionTag, elseTag){

this.IfExpression = function(ConditionalExpression){
	/**
	 * if 表达式
	 * @param {Context} context - 表达式上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function IfExpression(context, statements){
		ConditionalExpression.call(this, context, statements);
	};
	IfExpression = new Rexjs(IfExpression, ConditionalExpression);
	
	IfExpression.props({
		elseBody: null,
		elseContext: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			var mainFlowIndex, elseContext = this.elseContext;

			// 如果存在 else
			if(elseContext){
				// 获取下一个索引，以表示新的主流索引，不直接使用 this.linearFlowIndex，是因为其将要代表 else 分支流索引
				mainFlowIndex = this.branchFlowIndex = this.contextGeneratorIfNeedCompile.nextIndex();
			}

			// 以生成器形式去编译条件代码
			this.generateConditionTo(this.condition.inner, contentBuilder);
			// 编译 if 主体
			this.generateBodyTo(this.ifBody, contentBuilder);

			// 如果存在 else
			if(elseContext){
				// 再将其从 else 分支流中拉回到主流中
				this.mainFlowIndex = mainFlowIndex;

				// 编译 if 主体
				this.generateBodyTo(this.elseBody, contentBuilder);
			}
		},
		ifBody: null,
		/**
		 * 获取 if 关键字上下文
		 */
		get ifContext(){
			return this.context;
		},
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			// 追加 if 关键字
			contentBuilder.appendContext(this.ifContext);
			
			// 追加条件
			this.condition.extractTo(contentBuilder);
			// 追加主体语句
			this.ifBody.extractTo(contentBuilder);
			
			// 如果没有 else 关键字
			if(!this.elseContext){
				return;
			}
			
			// 判断 if 主体表达式是否需要加分号
			if((this.ifBody.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
				// 追加分号
				contentBuilder.appendString(";");
			}
			
			// 追加 else 关键字
			contentBuilder.appendContext(this.elseContext);
			// 追加空格
			contentBuilder.appendSpace();
			
			// 提取 else 主体内容
			this.elseBody.extractTo(contentBuilder);
		}
	});
	
	return IfExpression;
}(
	this.ConditionalExpression
);

this.IfBodyStatement = function(SingleStatement){
	/**
	 * if 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IfBodyStatement(statements){
		SingleStatement.call(this, statements);
	};
	IfBodyStatement = new Rexjs(IfBodyStatement, SingleStatement);
	
	IfBodyStatement.props({
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			var expression = this.expression;

			// 跳出语句并设置 if 表达式的主体
			this.out().ifBody = expression;
			
			switch(false){
				// 如果不是 else
				case context.content === "else":
					break;

				// 如果表达式还没有结束
				case (expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE:
					// 默认
					parser.error(context);
					break;

				default:
					// 返回 else 标签
					return this.bindingOf();
			}
		},
		flow: ECMAScriptStatement.FLOW_LINEAR
	});
	
	return IfBodyStatement;
}(
	this.SingleStatement
);

this.ElseBodyStatement = function(IfBodyStatement){
	/**
	 * else 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ElseBodyStatement(statements){
		IfBodyStatement.call(this, statements);
	};
	ElseBodyStatement = new Rexjs(ElseBodyStatement, IfBodyStatement);
	
	ElseBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 elseBody
			this.out().elseBody = this.expression;
		}
	});
	
	return ElseBodyStatement;
}(
	this.IfBodyStatement
);

this.IfTag = function(IfExpression){
	/**
	 * if 标签
	 */
	function IfTag(_type){
		SyntaxTag.call(this, _type);
	};
	IfTag = new Rexjs(IfTag, SyntaxTag);
	
	IfTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return elseTag;
		},
		regexp: /if/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.ifConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new IfExpression(context, statements);
		}
	});
	
	return IfTag;
}(
	this.IfExpression
);

this.OpenIfConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * if 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenIfConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenIfConditionTag = new Rexjs(OpenIfConditionTag, OpenParenTag);
	
	OpenIfConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeIfConditionTag;
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
			// 设置 if 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenIfConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseIfConditionTag = function(CloseParenTag, IfBodyStatement, IfBodyStatements){
	/**
	 * if 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseIfConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseIfConditionTag = new Rexjs(CloseIfConditionTag, CloseParenTag);
	
	CloseIfConditionTag.props({
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
			// 设置 if 条件的 close
			statement.expression.condition.close = context;
			// 设置当前语句 及 表达式主体语句
			statements.statement = new IfBodyStatement(statements);
		}
	});
	
	return CloseIfConditionTag;
}(
	this.CloseParenTag,
	this.IfBodyStatement,
	this.IfBodyStatements
);

this.ElseTag = function(ElseExpression, ElseBodyStatement){
	/**
	 * else 标签
	 * @param {Number} _type - 标签类型
	 */
	function ElseTag(_type){
		SyntaxTag.call(this, _type);
	};
	ElseTag = new Rexjs(ElseTag, SyntaxTag);
	
	ElseTag.props({
		regexp: /else/,
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
			// 设置 else 关键字上下文
			statement.expression.elseContext = context;
			// 设置当前语句
			statements.statement = new ElseBodyStatement(statements);
		}
	});
	
	return ElseTag;
}(
	this.ElseExpression,
	this.ElseBodyStatement
);

closeIfConditionTag = new this.CloseIfConditionTag();
elseTag = new this.ElseTag();

}.call(
	this,
	// closeIfConditionTag
	null,
	// elseTag
	null
);