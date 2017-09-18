// 父类相关
!function(BracketAccessorExpression, CallExpression, CallStatement, OpenBracketAccessorTag, DotAccessorTag, closeSuperBracketAccessorTag){

this.SuperExpression = function(LiteralExpression){
	/**
	 * super 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SuperExpression(context){
		LiteralExpression.call(this, context);
	};
	SuperExpression = new Rexjs(SuperExpression, LiteralExpression);
	
	SuperExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 追加 getPrototypeOf 方法去获取父类
				contentBuilder.appendString("(Object.getPrototypeOf(" + this.propertyOwner + "))");
				return;
			}
			
			// 追加 super 关键字上下文
			contentBuilder.appendContext(this.context);
		},
		propertyOwner: ""
	});

	return SuperExpression;
}(
	this.LiteralExpression
);

this.SuperCallExpression = function(extractTo){
	/**
	 * 父类调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 * @param {String} thisLiteral - 构造函数中指向 this 的字面量，可能是 this，也可能是 Rexjs_0 等等
	 */
	function SuperCallExpression(open, statement, thisLiteral){
		CallExpression.call(this, open, statement);

		this.thisLiteral = thisLiteral;
	};
	SuperCallExpression = new Rexjs(SuperCallExpression, CallExpression);

	SuperCallExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				contentBuilder.appendString("(" + this.thisLiteral + "=Rexjs.Super.");
				
				// 如果有拓展符
				if(this.spread){
					// 设置 boundThis
					this.boundThis = "this";

					// 追加获取返回值函数的起始代码
					contentBuilder.appendString("returnedThis(this,");
					// 因为 super 不可能是对象属性，也不可能使用 new（语法上做了保护），所以直接使用 spreadTo 就可以了
					this.spreadTo(contentBuilder);
				}
				else {
					// 追加获取返回值函数的起始代码
					contentBuilder.appendString("callConstructor(");
					// 提取操作对象
					this.operand.extractTo(contentBuilder);
					// 追加 this 及 参数起始中括号
					contentBuilder.appendString(",this,[");
					// 提取参数
					this.inner.extractTo(contentBuilder);
					// 追加参数结束中括号
					contentBuilder.appendString("]");
				}

				// 追加以上关联的两个结束小括号
				contentBuilder.appendString("))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		thisLiteral: "",
		/**
		 * 告知该表达式有拓展符
		 * @param {Statements} statements - 当前语句块
		 */
		withSpread: function(){
			this.spread = true;
		}
	});

	return SuperCallExpression;
}(
	CallExpression.prototype.extractTo
);

this.SuperMethodCallExpression = function(extractTo){
	/**
	 * 父类方法调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 * @param {String} boundThis - 解析时，使用 Function.apply、call 或 bind 时，所需传递的 this
	 */
	function SuperMethodCallExpression(open, statement, boundThis){
		CallExpression.call(this, open, statement);

		this.boundThis = boundThis;
	};
	SuperMethodCallExpression = new Rexjs(SuperMethodCallExpression, CallExpression);

	SuperMethodCallExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 如果有拓展符
				if(this.spread){
					// 因为 super 不可能是对象属性，也不可能使用 new（语法上做了保护），所以直接使用 spreadTo 就可以了
					this.spreadTo(contentBuilder);
					return;
				}

				// 追加 execMethod 方法头部代码
				contentBuilder.appendString("Rexjs.Super.execMethod(");
				// 提取操作对象
				this.operand.extractTo(contentBuilder);
				// 追加 execMethod 方法的参数
				contentBuilder.appendString("," + this.boundThis + ",[");
				// 提取 inner
				this.inner.extractTo(contentBuilder);
				// 追加尾部代码
				contentBuilder.appendString("])");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 告知该表达式有拓展符
		 * @param {Statements} statements - 当前语句块
		 */
		withSpread: function(){
			this.spread = true;
		}
	});

	return SuperMethodCallExpression;
}(
	CallExpression.prototype.extractTo
);

this.SuperStatement = function(){
	/**
	 * super 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SuperStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SuperStatement = new Rexjs(SuperStatement, ECMAScriptStatement);

	SuperStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var superExpression = this.out();

			// 报错
			parser.error(
				superExpression.context,
				ECMAScriptErrors.template("KEYWORD", superExpression.context.content)
			);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果标签是可误解的
			if(context.tag.type.mistakable){
				// 跳出语句
				this.out();
				return;
			}

			// 借用 catch 来报错
			this.catch(parser, context);
		}
	});

	return SuperStatement;
}();

this.SuperTag = function(LiteralTag, SuperExpression, SuperStatement){
	/**
	 * super 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperTag(_type){
		LiteralTag.call(this, _type);
	};
	SuperTag = new Rexjs(SuperTag, LiteralTag);

	SuperTag.props({
		$class: CLASS_EXPRESSION,
		regexp: /super/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var closure = statements.closure;

			// 如果存在闭包
			if(closure){
				var superExpression = new SuperExpression(context), targetStatements = closure.target, propertyStatement = targetStatements.statement.target.target;

				// 如果需要编译
				if(config.es6Base){
					// 记录拥有者变量名
					superExpression.propertyOwner = propertyStatement.expression.requestVariableOf(
						targetStatements,
						propertyStatement.target.expression
					);
				}

				// 设置当前表达式
				statement.expression = superExpression;
				// 设置当前语句
				statements.statement = new SuperStatement(statements);
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);
		}
	});

	return SuperTag;
}(
	this.LiteralTag,
	this.SuperExpression,
	this.SuperStatement
);

this.OpenSuperCallTag = function(OpenCallTag, SuperCallExpression){
	/**
	 * 起始父类调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSuperCallTag(_type){
		OpenCallTag.call(this, _type);
	};
	OpenSuperCallTag = new Rexjs(OpenSuperCallTag, OpenCallTag);
	
	OpenSuperCallTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var closure = statements.closure;

			// 向当前闭包申请调用 super
			closure.applySuperCall(parser, statement.expression.context, context);

			// 设置当前表达式
			statement.expression = new SuperCallExpression(context, statement, closure.thisLiteral);
			// 设置当前语句
			statements.statement = new CallStatement(statements);
		}
	});
	
	return OpenSuperCallTag;
}(
	this.OpenCallTag,
	this.SuperCallExpression
);

this.OpenSuperBracketAccessorTag = function(visitor){
	/**
	 * 起始父类中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSuperBracketAccessorTag(_type){
		OpenBracketAccessorTag.call(this, _type);
	};
	OpenSuperBracketAccessorTag = new Rexjs(OpenSuperBracketAccessorTag, OpenBracketAccessorTag);
	
	OpenSuperBracketAccessorTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeSuperBracketAccessorTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前闭包申请调用 super
			statements.closure.applySuper(parser, statement.expression.context, context);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return OpenSuperBracketAccessorTag;
}(
	OpenBracketAccessorTag.prototype.visitor
);

this.CloseSuperBracketAccessorTag = function(CloseBracketAccessorTag){
	/**
	 * 结束父类中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseSuperBracketAccessorTag(_type){
		CloseBracketAccessorTag.call(this, _type);
	};
	CloseSuperBracketAccessorTag = new Rexjs(CloseSuperBracketAccessorTag, CloseBracketAccessorTag);
	
	CloseSuperBracketAccessorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superAccessorContextTags;
		}
	});
	
	return CloseSuperBracketAccessorTag;
}(
	this.CloseBracketAccessorTag
);

this.SuperDotAccessorTag = function(visitor){
	/**
	 * 父类点属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperDotAccessorTag(_type){
		DotAccessorTag.call(this, _type);
	};
	SuperDotAccessorTag = new Rexjs(SuperDotAccessorTag, DotAccessorTag);
	
	SuperDotAccessorTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superPropertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前闭包申请调用 super
			statements.closure.applySuper(parser, statement.expression.context, context);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return SuperDotAccessorTag;
}(
	DotAccessorTag.prototype.visitor
);

this.SuperPropertyNameTag = function(PropertyNameTag){
	/**
	 * 父类属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyNameTag(_type){
		PropertyNameTag.call(this, _type);
	};
	SuperPropertyNameTag = new Rexjs(SuperPropertyNameTag, PropertyNameTag);
	
	SuperPropertyNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superAccessorContextTags;
		}
	});
	
	return SuperPropertyNameTag;
}(
	this.PropertyNameTag
);

this.OpenSuperMethodCallTag = function(OpenSuperCallTag, SuperMethodCallExpression, ConstructorBodyStatements){
	/**
	 * 起始父类方法调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSuperMethodCallTag(_type){
		OpenSuperCallTag.call(this, _type);
	};
	OpenSuperMethodCallTag = new Rexjs(OpenSuperMethodCallTag, OpenSuperCallTag);
	
	OpenSuperMethodCallTag.props({
		order: ECMAScriptOrders.OPEN_SUPER_METHOD_CALL,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var closure = statements.closure;

			// 设置当前表达式
			statement.expression = new SuperMethodCallExpression(
				context,
				statement,
				// 如果是在构造函数语句块中
				closure instanceof ConstructorBodyStatements ?
					statements.closure.thisLiteral :
					"this"
			);

			// 设置当前语句
			statements.statement = new CallStatement(statements);
		}
	});
	
	return OpenSuperMethodCallTag;
}(
	this.OpenSuperCallTag,
	this.SuperMethodCallExpression,
	this.ConstructorBodyStatements
);

closeSuperBracketAccessorTag = new this.CloseSuperBracketAccessorTag();

}.call(
	this,
	this.BracketAccessorExpression,
	this.CallExpression,
	this.CallStatement,
	this.OpenBracketAccessorTag,
	this.DotAccessorTag,
	// closeSuperBracketAccessorTag
	null
);