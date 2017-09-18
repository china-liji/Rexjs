// 函数调用相关
!function(ExecutableExpression, parameterSeparatorTag, closeCallTag){

this.CallExpression = function(AccessorExpression, BracketAccessorExpression, UnaryStatement, extractTo){
	/**
	 * 函数调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 */
	function CallExpression(open, statement){
		ExecutableExpression.call(this, open);

		this.operand = statement.expression;
		this.inner = new ListExpression(null, ",");

		// 如果是一元语句
		if(statement instanceof UnaryStatement){
			this.new = statement.target.expression.context.content === "new";
		}
	};
	CallExpression = new Rexjs(CallExpression, ExecutableExpression);

	CallExpression.props({
		/**
		 * 当拓展符存在时，以访问形式提取表达式内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		accessTo: function(contentBuilder){
			var operand = this.operand, boundThis = this.boundThis;

			// 追加临时变量名
			contentBuilder.appendString("(" + boundThis + "=");
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
			contentBuilder.appendString(".apply(" + boundThis + ",Rexjs.SpreadItem.combine");
			// 调用父类方法
			extractTo.call(this, contentBuilder);
			// 追加 apply 方法的结束小括号
			contentBuilder.appendString(")");
		},
		boundThis: "void 0",
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果有拓展符且需要编译
			if(this.spread && config.es6Base){
				switch(true){
					// 如果是 new 实例化
					case this.new:
						// 以实例化形式提取表达式内容
						this.newTo(contentBuilder);
						return;

					// 如果是对象方法的调用
					case this.operand instanceof AccessorExpression:
						// 以访问形式提取表达式内容
						this.accessTo(contentBuilder);
						return;

					default:
						// 以普通拓展符情况提取表达式内容
						this.spreadTo(contentBuilder);
						return;
				}
			}
			
			// 提取操作对象
			this.operand.extractTo(contentBuilder);
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		new: false,
		/**
		 * 当拓展符存在时，以实例化形式提取表达式内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		newTo: function(contentBuilder){
			// 追加 bind 方法
			contentBuilder.appendString("(Function.bind.apply(");
			// 提取该调用的方法
			this.operand.extractTo(contentBuilder);
			// 追加拓展符编译的方法
			contentBuilder.appendString(",Rexjs.SpreadItem.combine");
			// 追加函数调用的起始小括号
			contentBuilder.appendContext(this.open);
			// 追加 bind 所指定的 this
			contentBuilder.appendString(this.boundThis + ",");
			// 提取函数调用参数
			this.inner.extractTo(contentBuilder);
			// 追加函数调用的结束小括号
			contentBuilder.appendContext(this.close);
			// 追加 bind 方法的结束小括号和函数立即执行的小括号（注：bind 方法与 apply 不同，不具有立即执行效果）
			contentBuilder.appendString("))()");
		},
		operand: null,
		spread: false,
		/**
		 * 当拓展符存在时，以普通拓展符情况提取表达式内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		spreadTo: function(contentBuilder){
			// 追加 apply
			contentBuilder.appendString("Function.apply.call(");
			// 提取操作对象
			this.operand.extractTo(contentBuilder);
			// 追加 apply 方法的参数
			contentBuilder.appendString("," + this.boundThis + ",Rexjs.SpreadItem.combine");
			// 调用父类方法
			extractTo.call(this, contentBuilder);
			// 追加 apply 方法的结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 告知该表达式有拓展符
		 * @param {Statements} statements - 当前语句块
		 */
		withSpread: function(statements){
			// 如果已经告知过
			if(this.spread){
				return;
			}

			// 如果操作对象是属性表达式
			if(this.operand instanceof AccessorExpression){
				// 生成变量名
				this.boundThis = statements.collections.generate();
			}

			this.spread = true;
		}
	});

	return CallExpression;
}(
	this.AccessorExpression,
	this.BracketAccessorExpression,
	this.UnaryStatement,
	ExecutableExpression.prototype.extractTo
);

this.CallStatement = function(){
	/**
	 * 函数调用语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CallStatement(statements){
		ECMAScriptStatement.call(this, statements);

		this.expression = new EmptyExpression(null);
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
			statement.expression = new CallExpression(context, statement);
			// 设置当前语句
			statements.statement = new CallStatement(statements);
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
	this.ExecutableExpression,
	// parameterSeparatorTag
	null,
	// closeCallTag
	null
);