// try catch 语句相关
!function(TryFunctionExpression, TryFunctionStatement, tryFunctionTag, catchTag, finallyTag){
	
this.TryExpression = function(GenerableExpression){
	/**
	 * try 表达式
	 * @param {Context} context - 标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function TryExpression(context, statements){
		GenerableExpression.call(this, context, statements);
	};
	TryExpression = new Rexjs(TryExpression, GenerableExpression);
	
	TryExpression.$({
		catchBlock: NULL,
		catchContext: NULL,
		exception: NULL,
		finallyBlock: NULL,
		finallyContext: NULL,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			var exception = this.exception, generator = this.contextGeneratorIfNeedCompile,
			
				exceptionIndex = generator.nextIndex(), mainFlowIndex = generator.nextIndex(), unobserveIndex = generator.nextIndex(),
				
				variable = generator.variable, currentIndexString = generator.currentIndexString;

			// 追加监听异常代码
			contentBuilder.appendString(
				variable + ".observe(" + exceptionIndex + ");"
			);

			// 提取 try 语句块
			this.tryBlock.inner.extractTo(contentBuilder);

			// 追加设置结束监听的代码
			contentBuilder.appendString(
				currentIndexString + "=" + unobserveIndex + ";break;"
			);

			// 如果异常存在，说明存在 catch 语句
			if(exception){
				// 追加异常索引代码
				contentBuilder.appendString(
					"case " + exceptionIndex + ":"
				);

				// 提取异常信息
				exception.inner.extractTo(contentBuilder);
				// 给异常信息赋值
				contentBuilder.appendString("=" + variable + ".exception;");

				// 提取 catch 语句块
				this.catchBlock.extractTo(contentBuilder);

				// 追加设置主流索引代码
				contentBuilder.appendString(
					currentIndexString + "=" + mainFlowIndex + ";break;"
				);
			}

			contentBuilder.appendString(
				// 追加去掉监视异常的代码
				"case " + unobserveIndex + ":" + variable + ".unobserve();" +
				// 追加设置主流索引代码
				currentIndexString + "=" + mainFlowIndex + ";break;case " + mainFlowIndex + ":"
			);

			// 如果 finally 关键字存在
			if(this.finallyContext){
				// 提取 finally 语句块
				this.finallyBlock.extractTo(contentBuilder);
			}
		},
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			var exception = this.exception, finallyContext = this.finallyContext;
			
			// 追加 try 关键字
			contentBuilder.appendContext(this.tryContext);
			// 提取 try 语句块
			this.tryBlock.extractTo(contentBuilder);
			
			// 如果异常存在，说明存在 catch 语句
			if(exception){
				// 追加 catch 关键字
				contentBuilder.appendContext(this.catchContext);
				// 提取异常内容
				exception.extractTo(contentBuilder);
				// 提取 catch 语句块
				this.catchBlock.extractTo(contentBuilder);
			}
			
			// 如果 finally 关键字存在
			if(finallyContext){
				// 追加 finally 关键字
				contentBuilder.appendContext(finallyContext);
				// 提取 finally 语句块
				this.finallyBlock.extractTo(contentBuilder);
			}
		},
		tryBlock: NULL,
		/**
		 * 获取 try 关键字上下文
		 */
		get tryContext(){
			return this.context;
		}
	});
	
	return TryExpression;
}(
	this.GenerableExpression
);

this.TryStatement = function(toUnary){
	/**
	 * try 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	TryStatement = new Rexjs(TryStatement, ECMAScriptStatement);
	
	TryStatement.$({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var expression = this.expression;

			// 如果是默认表达式，即 try 关键字后面跟的不是起始大括号 "{"，因为起始大括号会给该语句重新设置表达式为 BlockExpression
			if(expression.default){
				return toUnary(parser, this, expression, context);
			}

			// 跳出语句并设置 tryBlock 属性
			this.out().tryBlock = expression;
			
			switch(context.content){
				// 如果是 catch
				case "catch" :
					return this.tagOf().catch;
				
				// 如果是 finally
				case "finally" :
					return this.tagOf().finally;
			}

			// 报错
			parser.error(context, ECMAScriptErrors.TRY);
		},
		expression: new DefaultExpression()
	});
	
	return TryStatement;
}(
	// toUnary
	function(parser, statement, expression, context){
		var tag = context.tag;

		// 如果匹配到的标签是可误解的
		if(tag.type.mistakable){
			var statements = statement.statements, targetContext = statement.out().context;

			// 重置标签
			targetContext.tag = tryFunctionTag;
			// 重置目标语句的表达式
			statement.target.expression = new TryFunctionExpression(targetContext);
			// 设置当前语句为
			statements.statement = new TryFunctionStatement(statements);

			return tag;
		}

		// 报错
		parser.error(context);
	}
);

this.CatchStatement = function(){
	/**
	 * catch 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CatchStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CatchStatement = new Rexjs(CatchStatement, ECMAScriptStatement);
	
	CatchStatement.$({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 catchBlock 属性
			this.out().catchBlock = this.expression;
			// 如果是 finally，则返回 finallyTag
			return context.content === "finally" ? this.tagOf().finally : NULL;
		}
	});
	
	return CatchStatement;
}();

this.FinallyStatement = function(){
	/**
	 * finally 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function FinallyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	FinallyStatement = new Rexjs(FinallyStatement, ECMAScriptStatement);
	
	FinallyStatement.$({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 finallyBlock
			this.out().finallyBlock = this.expression;
		}
	});
	
	return FinallyStatement;
}();

this.TryTag = function(TryExpression, TryStatement){
	/**
	 * try 标签
	 * @param {Number} _type - 标签类型
	 */
	function TryTag(_type){
		SyntaxTag.call(this, _type);
	};
	TryTag = new Rexjs(TryTag, SyntaxTag);
	
	TryTag.$({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return this.catch;
		},
		/**
		 * 获取绑定的 catchTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get catch(){
			return catchTag;
		},
		/**
		 * 获取绑定的 finallyTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get finally(){
			return finallyTag;
		},
		regexp: /try/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.tryContextTags;
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
			statement.expression = new TryExpression(context, statements);
			// 设置当前语句
			statements.statement = new TryStatement(statements);
		}
	});
	
	return TryTag;
}(
	this.TryExpression,
	this.TryStatement
);

this.CatchTag = function(CatchStatement){
	/**
	 * catch 标签
	 * @param {Number} _type - 标签类型
	 */
	function CatchTag(_type){
		SyntaxTag.call(this, _type);
	};
	CatchTag = new Rexjs(CatchTag, SyntaxTag);
	
	CatchTag.$({
		regexp: /catch/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.catchedExceptionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 catch 关键字上下文
			statement.expression.catchContext = context;
			// 设置当前语句
			statements.statement = new CatchStatement(statements);
		}
	});
	
	return CatchTag;
}(
	this.CatchStatement
);

this.OpenCatchedExceptionTag = function(OpenParenTag){
	/**
	 * try catch 异常起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenCatchedExceptionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenCatchedExceptionTag = new Rexjs(OpenCatchedExceptionTag, OpenParenTag);
	
	OpenCatchedExceptionTag.$({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.exceptionVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 try catch 表达式的异常信息
			statement.target.expression.exception = new PartnerExpression(context);
		}
	});
	
	return OpenCatchedExceptionTag;
}(
	this.OpenParenTag
);

this.ExceptionVariableTag = function(VariableDeclarationTag){
	/**
	 * 异常变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ExceptionVariableTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ExceptionVariableTag = new Rexjs(ExceptionVariableTag, VariableDeclarationTag);
	
	ExceptionVariableTag.$({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closeCatchedExceptionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var tryExpression = statement.target.expression, generator = tryExpression.contextGeneratorIfNeedCompile;

			// 如果存在需要编译的生成器
			if(generator){
				var range = statements.collections.declaration.range();

				// 添加变量名收集器范围
				generator.ranges.push(range);
				// 收集变量名
				this.collectTo(parser, context, statements);
				// 范围结束
				range.end();
			}
			else {
				// 仅仅只收集变量名
				this.collectTo(parser, context, statements);
			}

			// 设置 inner
			tryExpression.exception.inner = new Expression(context);
		}
	});
	
	return ExceptionVariableTag;
}(
	this.VariableDeclarationTag
);

this.CloseCatchedExceptionTag = function(CloseParenTag){
	/**
	 * try catch 异常结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseCatchedExceptionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseCatchedExceptionTag = new Rexjs(CloseCatchedExceptionTag, CloseParenTag);
	
	CloseCatchedExceptionTag.$({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.blockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.target.expression.exception.close = context;
		}
	});
	
	return CloseCatchedExceptionTag;
}(
	this.CloseParenTag
);

this.FinallyTag = function(FinallyStatement){
	/**
	 * finally 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function FinallyTag(_type){
		SyntaxTag.call(this, _type);
	};
	FinallyTag = new Rexjs(FinallyTag, SyntaxTag);
	
	FinallyTag.$({
		regexp: /finally/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.blockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 finally 关键字上下文
			statement.expression.finallyContext = context;
			// 设置当前语句
			statements.statement = new FinallyStatement(statements);
		}
	});
	
	return FinallyTag;
}(
	this.FinallyStatement
);

catchTag = new this.CatchTag();
finallyTag = new this.FinallyTag();

}.call(
	this,
	this.TryFunctionExpression,
	this.TryFunctionStatement,
	// tryFunctionTag
	new this.TryFunctionTag(),
	// catchTag
	NULL,
	// finallyTag
	NULL
);