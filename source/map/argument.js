// 函数参数表达式相关
!function(argumentSeparatorTag, closeArgumentsTag){

this.ArgumentsExpression = function(VariableCollection){
	/**
	 * 函数参数列表表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArgumentsExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(NULL, ",");
		this.collection = new VariableCollection();
	};
	ArgumentsExpression = new Rexjs(ArgumentsExpression, PartnerExpression);

	ArgumentsExpression.$({
		collection: NULL
	});

	return ArgumentsExpression;
}(
	Rexjs.VariableCollection
);

this.ArgumentExpression = function(IdentifierExpression){
	/**
	 * 参数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ArgumentExpression(context){
		IdentifierExpression.call(this, context);
	};
	ArgumentExpression = new Rexjs(ArgumentExpression, IdentifierExpression);

	return ArgumentExpression;
}(
	this.IdentifierExpression
);

this.ArgumentStatement = function(){
	/**
	 * 参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArgumentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArgumentStatement = new Rexjs(ArgumentStatement, ECMAScriptStatement);

	ArgumentStatement.$({
		expression: new DefaultExpression(),
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并获取 inner
			var inner = this.out().arguments.inner;

			// 判断标签内容
			switch(context.content){
				// 如果是逗号（参数名上下文只允许接等于号赋值标签，所以逗号会进入 catch）
				case ",":
					// 添加参数表达式
					inner.add(this.expression);
					// 返回分隔符标签
					return this.tagOf().separator;

				// 如果是结束小括号，则说明是
				case ")":
					// 设置参数表达式（空参数，是默认表达式，要用 set 方法）
					inner.set(this.expression);
					// 返回参数结束小括号标签
					return this.bindingOf();
			}

			// 报错
			parser.error(context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return NULL;
			}

			// 跳出语句并添加参数表达式
			this.out().arguments.inner.add(this.expression);
			// 返回分隔符标签
			return this.tagOf().separator;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.arguments.open.tag;
		}
	});

	return ArgumentStatement;
}();

this.OpenArgumentsTag = function(OpenParenTag, ArgumentsExpression, ArgumentStatement){
	/**
	 * 起始函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArgumentsTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenArgumentsTag = new Rexjs(OpenArgumentsTag, OpenParenTag);

	OpenArgumentsTag.$({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArgumentsTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return argumentSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openArgumentsContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的的参数
			statement.expression.arguments = new ArgumentsExpression(context);
			// 设置当前语句
			statements.statement = new ArgumentStatement(statements);
		}
	});

	return OpenArgumentsTag;
}(
	this.OpenParenTag,
	this.ArgumentsExpression,
	this.ArgumentStatement
);

this.ArgumentNameTag = function(VariableDeclarationTag, ArgumentExpression){
	/**
	 * 参数名标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ArgumentNameTag = new Rexjs(ArgumentNameTag, VariableDeclarationTag);

	ArgumentNameTag.$({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {VariableCollection} collection - 参数名收集器
		 */
		collectTo: function(parser, context, collection){
			var content = context.content;

			// 如果已经定义，说明是重复的参数名
			if(collection.contains(content)){
				// 报错
				parser.error(context, ECMAScriptErrors.DUPLICATE_PARAMETER_NAME);
				return;
			}

			// 参数列表收集变量名
			collection.collect(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.argumentNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statement.target.expression.arguments.collection);

			// 设置当前表达式
			statement.expression = new ArgumentExpression(context);
		}
	});

	return ArgumentNameTag;
}(
	this.VariableDeclarationTag,
	this.ArgumentExpression
);

this.ArgumentSeparatorTag = function(CommaTag, ArgumentStatement){
	/**
	 * 参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ArgumentSeparatorTag = new Rexjs(ArgumentSeparatorTag, CommaTag);

	ArgumentSeparatorTag.$({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.argumentSeparatorContextTags;
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
			statements.statement = new ArgumentStatement(statements);
		}
	});

	return ArgumentSeparatorTag;
}(
	this.CommaTag,
	this.ArgumentStatement
);

this.CloseArgumentsTag = function(CloseParenTag){
	/**
	 * 结束函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArgumentsTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseArgumentsTag = new Rexjs(CloseArgumentsTag, CloseParenTag);

	CloseArgumentsTag.$({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionBodyTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置参数表达式的 close 属性
			statement.expression.arguments.close = context;
		}
	});

	return CloseArgumentsTag;
}(
	this.CloseParenTag
);

argumentSeparatorTag = new this.ArgumentSeparatorTag();
closeArgumentsTag = new this.CloseArgumentsTag();

}.call(
	this,
	// argumentSeparatorTag
	NULL,
	// closeArgumentsTag
	NULL
);