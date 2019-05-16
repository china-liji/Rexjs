// for 循环条件表达式相关
!function(IdentifierExpression, VarExpression, CommaStatement, closingForConditionTag, forInitConditionItemSeparatorTag, forInTag, forOfTag, forInitConditionSeparatorTag, forLogicConditionSeparatorTag, getOpeningConditionTag){

this.ForConditionStatement = function(){
	/**
	 * for 循环条件内部语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForConditionStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ForConditionStatement = new Rexjs(ForConditionStatement, ECMAScriptStatement);
	
	ForConditionStatement.props({
		expression: new DefaultExpression()
	});

	return ForConditionStatement;
}();

this.ForInitConditionStatement = function(ForConditionStatement, hasError){
	/**
	 * for 循环初始化条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForInitConditionStatement(statements){
		ForConditionStatement.call(this, statements);
	};
	ForInitConditionStatement = new Rexjs(ForInitConditionStatement, ForConditionStatement);
	
	ForInitConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var tag, expression = this.expression, target = this.target;

			// 判断标签内容
			switch(context.content){
				// 如果是分号
				case ";":
					// 设置标签
					tag = getOpeningConditionTag(this).forInitConditionSeparator;
					
					(
						// 设置目标语句的表达式
						this.target.expression = new ListExpression(null, ";")
					)
					// 添加表达式
					.add(
						expression
					);
					break;

				// 如果是 in
				case "in":
					tag = getOpeningConditionTag(this).forIn;

				// 如果是 of
				case "of":
					// 如果验证出错
					if(hasError(parser, expression, context)){
						return;
					}

					// 设置标签
					tag = tag || getOpeningConditionTag(this).forOf;
					// 设置目标语句的表达式
					this.target.expression = expression;
					break;

				default:
					// 报错
					parser.error(context);
					return;
			}

			// 跳出当前语句
			this.out();
			// 返回标签
			return tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 判断标签内容
			switch(context.content){
				// 如果是 in 关键字
				case "in":
					break;

				// 如果是逗号
				case ",":
					return getOpeningConditionTag(this).forInitConditionItemSeparator;

				// 默认
				default:
					return null;
			}

			var expression = this.expression;

			// 如果验证出错
			if(hasError(parser, expression, context)){
				return null;
			}

			// 设置目标语句的表达式
			this.target.expression = expression;

			// 跳出当前语句
			this.out();
			return getOpeningConditionTag(this).forIn;
		}
	});
	
	return ForInitConditionStatement;
}(
	this.ForConditionStatement,
	// hasError
	function(parser, expression, context){
		// 如果是声明表达式
		if(expression instanceof VarExpression){
			var list = expression.list;

			// 如果声明列表长度等于 1
			if(list.length === 1){
				// 设置表达式为列表的第一项
				expression = list[0];
			}
			else {
				// 返回错误信息
				parser.error(context, ECMAScriptErrors.FOR_IN);
				return true;
			}
		}

		// 如果是标识符表达式
		if(expression instanceof IdentifierExpression){
			return false;
		}

		// 返回错误信息
		parser.error(context, ECMAScriptErrors.FOR);
		return true;
	}
);

this.ForLogicConditionStatement = function(ForConditionStatement){
	/**
	 * for 循环的逻辑判断条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForLogicConditionStatement(statements){
		ForConditionStatement.call(this, statements);
	};
	ForLogicConditionStatement = new Rexjs(ForLogicConditionStatement, ForConditionStatement);
	
	ForLogicConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是分号
			if(context.content !== ";"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并添加表达式
			this.out().add(this.expression);
			// 返回标签
			return getOpeningConditionTag(this).forLogicConditionSeparator;
		}
	});
	
	return ForLogicConditionStatement;
}(
	this.ForConditionStatement
);

this.ForFinalConditionStatement = function(ForConditionStatement){
	/**
	 * for 循环的末条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForFinalConditionStatement(statements){
		ForConditionStatement.call(this, statements);
	};
	ForFinalConditionStatement = new Rexjs(ForFinalConditionStatement, ForConditionStatement);
	
	ForFinalConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().add(this.expression);
		}
	});
	
	return ForFinalConditionStatement;
}(
	this.ForConditionStatement
);

this.ForInitConditionSeparatorStatement = function(tryMethod){
	/**
	 * for 循环初始化条件分隔符语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForInitConditionSeparatorStatement(statements){
		CommaStatement.call(this, statements);
	};
	ForInitConditionSeparatorStatement = new Rexjs(ForInitConditionSeparatorStatement, CommaStatement);

	ForInitConditionSeparatorStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是 in 关键字
			if(context.content === "in"){
				// 跳出当前语句并添加表达式
				this.out().add(this.expression);
				return null;
			}

			// 返回父类方法处理的结果
			return tryMethod.call(this, parser, context);
		}
	});

	return ForInitConditionSeparatorStatement;
}(
	CommaStatement.prototype.try
);

this.OpeningForConditionTag = function(OpeningParenTag, ConditionStatement, ForInitConditionStatement){
	/**
	 * for 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningForConditionTag(_type){
		OpeningParenTag.call(this, _type);
	};
	OpeningForConditionTag = new Rexjs(OpeningForConditionTag, OpeningParenTag);
	
	OpeningForConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingForConditionTag;
		},
		/**
		 * 获取绑定的 forInTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forIn(){
			return forInTag;
		},
		/**
		 * 获取绑定的 forInitConditionItemSeparatorTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forInitConditionItemSeparator(){
			return forInitConditionItemSeparatorTag;
		},
		/**
		 * 获取绑定的 forInitConditionSeparatorTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forInitConditionSeparator(){
			return forInitConditionSeparatorTag;
		},
		/**
		 * 获取绑定的 forLogicConditionSeparatorTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forLogicConditionSeparator(){
			return forLogicConditionSeparatorTag;
		},
		/**
		 * 获取绑定的 forOfTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forOf(){
			return forOfTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.forConditionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 for 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
			// 再次设置当前语句，目的是 target 要指向 ConditionStatement
			statements.statement = new ForInitConditionStatement(statements);
		}
	});
	
	return OpeningForConditionTag;
}(
	this.OpeningParenTag,
	this.ConditionStatement,
	this.ForInitConditionStatement
);

this.ForInitConditionItemSeparatorTag = function(CommaTag, ForInitConditionSeparatorStatement, visitor){
	/**
	 * for 循环初始化条件项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ForInitConditionItemSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ForInitConditionItemSeparatorTag = new Rexjs(ForInitConditionItemSeparatorTag, CommaTag);

	ForInitConditionItemSeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ForInitConditionSeparatorStatement(statements);
		}
	});

	return ForInitConditionItemSeparatorTag;
}(
	this.CommaTag,
	this.ForInitConditionSeparatorStatement
);

this.ForConditionSeparatorTag = function(SemicolonTag){
	/**
	 * for 循环条件分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ForConditionSeparatorTag(_type){
		SemicolonTag.call(this, _type);
	};
	ForConditionSeparatorTag = new Rexjs(ForConditionSeparatorTag, SemicolonTag);

	ForConditionSeparatorTag.props({
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
			// 设置当前语句
			context.setStatementOf(statements);
		}
	});

	return ForConditionSeparatorTag;
}(
	this.SemicolonTag
);

this.ForInitConditionSeparatorTag = function(ForConditionSeparatorTag, ForLogicConditionStatement){
	/**
	 * for 循环条件中初始化语句的分隔符标签，即 for 循环条件的第一个分号标签
	 * @param {Number} _type - 标签类型
	 */
	function ForInitConditionSeparatorTag(_type){
		ForConditionSeparatorTag.call(this, _type)
	};
	ForInitConditionSeparatorTag = new Rexjs(ForInitConditionSeparatorTag, ForConditionSeparatorTag);

	ForInitConditionSeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ForLogicConditionStatement(statements);
		}
	});

	return ForInitConditionSeparatorTag;
}(
	this.ForConditionSeparatorTag,
	this.ForLogicConditionStatement
);

this.ForLogicConditionSeparatorTag = function(ForConditionSeparatorTag, ForFinalConditionStatement){
	/**
	 * for 循环条件中逻辑语句的分号标签，即 for 循环条件的第二个分号标签
	 * @param {Number} _type - 标签类型
	 */
	function ForLogicConditionSeparatorTag(_type){
		ForConditionSeparatorTag.call(this, _type)
	};
	ForLogicConditionSeparatorTag = new Rexjs(ForLogicConditionSeparatorTag, ForConditionSeparatorTag);

	ForLogicConditionSeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ForFinalConditionStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		}
	});

	return ForLogicConditionSeparatorTag;
}(
	this.ForConditionSeparatorTag,
	this.ForFinalConditionStatement
);

this.ClosingForConditionTag = function(ClosingParenTag, ForBodyStatement){
	/**
	 * for 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingForConditionTag(_type){
		ClosingParenTag.call(this, _type);
	};
	ClosingForConditionTag = new Rexjs(ClosingForConditionTag, ClosingParenTag);
	
	ClosingForConditionTag.props({
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
			// 设置 for 表达式条件的 closing
			statement.expression.condition.closing = context;
			// 设置当前语句
			statements.statement = new ForBodyStatement(statements);
		}
	});
	
	return ClosingForConditionTag;
}(
	this.ClosingParenTag,
	this.ForBodyStatement
);

closingForConditionTag = new this.ClosingForConditionTag();
forInTag = new this.ForInTag();
forOfTag = new this.ForOfTag();
forInitConditionItemSeparatorTag = new this.ForInitConditionItemSeparatorTag();
forInitConditionSeparatorTag = new this.ForInitConditionSeparatorTag();
forLogicConditionSeparatorTag = new this.ForLogicConditionSeparatorTag();

}.call(
	this,
	this.IdentifierExpression,
	this.VarExpression,
	this.CommaStatement,
	// closingForConditionTag
	null,
	// forInitConditionItemSeparatorTag
	null,
	// forInTag
	null,
	// forOfTag
	null,
	// forInitConditionSeparatorTag
	null,
	// forLogicConditionSeparatorTag
	null,
	// getOpeningConditionTag
	function(statement){
		return statement.target.target.expression.condition.opening.tag;
	}
);