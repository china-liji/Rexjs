// 函数调用相关
~function(BracketAccessorExpression, UnaryKeywordTag, parameterSeparatorTag, closeCallTag, extractTo){

this.CallExpression = function(UnaryExpression, AccessorExpression, config, compileWithAccessor, compileWithNew, compileDefault){
	/**
	 * 函数调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} operand - 操作对象表达式
	 */
	function CallExpression(open, operand){
		PartnerExpression.call(this, open);

		this.operand = operand;
		this.inner = new ListExpression(null, ",");
	};
	CallExpression = new Rexjs(CallExpression, PartnerExpression);

	CallExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

	CallExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var operand = this.operand;

			// 如果有拓展符且需要编译
			if(this.hasSpread && config.spread){
				switch(true){
					// 如果是对象方法的调用
					case operand instanceof AccessorExpression:
						// 根据访问器编译
						compileWithAccessor(contentBuilder, this, operand, this.variable);
						return;

					// 如果是一元表达式
					case operand instanceof UnaryExpression:
						// 而且如果是 new 关键字
						if(operand.context.content === "new"){
							// 根据 new 关键字编译
							compileWithNew(contentBuilder, this, operand);
							return;
						}

					default:
						// 编译默认情况
						compileDefault(contentBuilder, this, operand);
						return;
				}
			}
			
			// 提取操作对象
			operand.extractTo(contentBuilder);
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		hasSpread: false,
		operand: null,
		variable: ""
	});

	return CallExpression;
}(
	this.UnaryExpression,
	this.AccessorExpression,
	// config
	new SyntaxConfig("spread"),
	// compileWithAccessor
	function(contentBuilder, expression, operand, variable){
		// 追加临时变量名
		contentBuilder.appendString("(" + variable + "=");
		// 提取拥有此方法的对象
		operand.object.extractTo(contentBuilder);
		// 追加临时变量名的结束小括号
		contentBuilder.appendString(")");

		// 如果是中括号属性访问表达式
		if(operand instanceof BracketAccessorExpression){
			// 提取中括号
			operand.property.extractTo(contentBuilder);
		}
		else {
			// 提取点操作符
			contentBuilder.appendContext(operand.context);
			// 提取属性
			contentBuilder.appendContext(operand.property);
		}
		
		// 追加 apply 方法
		contentBuilder.appendString(".apply(" + variable + ",Rexjs.Parameter.toSpreadArray");
		// 调用父类方法
		extractTo.call(expression, contentBuilder);
		// 追加 apply 方法的结束小括号
		contentBuilder.appendString(")");
	},
	// compileWithNew
	function(contentBuilder, expression, operand){
		// 追加 new 关键字上下文
		contentBuilder.appendContext(operand.context);
		// 追加 bind 方法
		contentBuilder.appendString("(Function.bind.apply(");
		// 提取该调用的方法
		operand.operand.extractTo(contentBuilder);
		// 追加拓展符编译的方法
		contentBuilder.appendString(",Rexjs.Parameter.toSpreadArray");
		// 追加函数调用的起始小括号
		contentBuilder.appendContext(expression.open);
		// 追加 bind 所指定的 this
		contentBuilder.appendString("void 0,");
		// 提取函数调用参数
		expression.inner.extractTo(contentBuilder);
		// 追加函数调用的结束小括号
		contentBuilder.appendContext(expression.close);
		// 追加 bind 方法的结束小括号和函数立即执行的小括号（注：bind 方法与 apply 不同，不具有立即执行效果）
		contentBuilder.appendString("))()");
	},
	// compileDefault
	function(contentBuilder, expression, operand){
		// 追加 apply
		contentBuilder.appendString("Function.apply.call(");
		// 提取操作对象
		operand.extractTo(contentBuilder);
		// 追加 apply 方法的参数
		contentBuilder.appendString(",void 0,Rexjs.Parameter.toSpreadArray");
		// 调用父类方法
		extractTo.call(expression, contentBuilder);
		// 追加 apply 方法的结束小括号
		contentBuilder.appendString(")");
	}
);

this.CallStatement = function(){
	/**
	 * 函数调用语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CallStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CallStatement = new Rexjs(CallStatement, ECMAScriptStatement);
	
	CallStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭分组小括号
			if(context.content !== ")"){
				// 报错
				parser.error(context, ECMAScriptErrors.CALL);
				return null;
			}
			
			// 跳出该语句并设置表达式
			this.out().inner.set(this.expression);
			// 返回关闭分组小括号标签
			return this.bindingOf();
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

			// 跳出该语句并添加表达式
			this.out().inner.add(this.expression);
			// 返回关闭分组小括号标签
			return this.tagOf().separator;
		}
	});
	
	return CallStatement;
}();

this.OpenCallTag = function(OpenParenTag, CallExpression, CallStatement){
	/**
	 * 起始函数调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenCallTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenCallTag = new Rexjs(OpenCallTag, OpenParenTag);
	
	OpenCallTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeCallTag;
		},
		// 防止与分组小括号冲突
		order: ECMAScriptOrders.OPEN_CALL,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.parameterTags;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return parameterSeparatorTag;
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
			statement.expression = new CallExpression(context, statement.expression);
			
			// 设置当前语句
			(
				statements.statement = new CallStatement(statements)
			)
			// 设置表达式
			.expression = new DefaultExpression();
		}
	});
	
	return OpenCallTag;
}(
	this.OpenParenTag,
	this.CallExpression,
	this.CallStatement
);

this.ParameterSeparatorTag = function(CommaTag, CallStatement){
	/**
	 * 函数调用参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ParameterSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ParameterSeparatorTag = new Rexjs(ParameterSeparatorTag, CommaTag);

	ParameterSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.parameterTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new CallStatement(statements);
		}
	});

	return ParameterSeparatorTag;
}(
	this.CommaTag,
	this.CallStatement
);

this.CloseCallTag = function(CloseParenTag){
	/**
	 * 结束函数调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseCallTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseCallTag = new Rexjs(CloseCallTag, CloseParenTag);
	
	CloseCallTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
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
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseCallTag;
}(
	this.CloseParenTag
);

parameterSeparatorTag = new this.ParameterSeparatorTag();
closeCallTag = new this.CloseCallTag();

}.call(
	this,
	this.BracketAccessorExpression,
	this.UnaryKeywordTag,
	// parameterSeparatorTag
	null,
	// closeCallTag
	null,
	// extractTo
	PartnerExpression.prototype.extractTo
);