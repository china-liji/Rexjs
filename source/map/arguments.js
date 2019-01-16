// 函数参数表达式相关
!function(argumentSeparatorTag, closingArgumentsTag){

this.ArgumentsExpression = function(ECMAScriptVariableCollections, extractTo, extractRange){
	/**
	 * 函数参数列表表达式
	 * @param {Context} opening - 起始标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function ArgumentsExpression(opening, statements){
		PartnerExpression.call(this, opening);
		
		this.collections = new ECMAScriptVariableCollections(
			statements.collections.index
		);

		this.inner = new ListExpression(null, ",");
		this.ranges = new ListExpression(null, ",");
	};
	ArgumentsExpression = new Rexjs(ArgumentsExpression, PartnerExpression);

	ArgumentsExpression.props({
		get collection(){
			return this.collections.declaration;
		},
		collections: null,
		ranges: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 遍历变量名收集器区域
			this.ranges.forEach(extractRange, anotherBuilder);

			// 如果有变量名
			if(anotherBuilder.result.length > 0){
				// 追加分号
				anotherBuilder.appendString(";");
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder, anotherBuilder);
		}
	});

	return ArgumentsExpression;
}(
	this.ECMAScriptVariableCollections,
	PartnerExpression.prototype.extractTo,
	// extractRange
	function(range, anotherBuilder){
		var variableString = range.toString("", ",", "");

		// 如果没有变量
		if(variableString.length === 0){
			return;
		}

		// 如果已经有内容
		if(anotherBuilder.result.length > 0){
			// 追加变量分号
			anotherBuilder.appendString(",");
		}
		else {
			// 追加 var 声明
			anotherBuilder.appendString("var ");
		}

		// 追加变量名
		anotherBuilder.appendString(variableString);
	}
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

	ArgumentStatement.props({
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
				return null;
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
			return this.target.expression.arguments.opening.tag;
		}
	});

	return ArgumentStatement;
}();

this.ArgumentsTag = function(EnvConstantTag){
	/**
	 * arguments 标识符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentsTag(_type){
		EnvConstantTag.call(this, _type);
	};
	ArgumentsTag = new Rexjs(ArgumentsTag, EnvConstantTag);

	ArgumentsTag.props({
		regexp: /arguments/
	});

	return ArgumentsTag;
}(
	this.EnvConstantTag
);

this.OpeningArgumentsTag = function(OpeningParenTag, ArgumentsExpression, ArgumentStatement){
	/**
	 * 起始函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningArgumentsTag(_type){
		OpeningParenTag.call(this, _type);
	};
	OpeningArgumentsTag = new Rexjs(OpeningArgumentsTag, OpeningParenTag);

	OpeningArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingArgumentsTag;
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
			return tagsMap.openingArgumentsContextTags;
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
			statement.expression.arguments = new ArgumentsExpression(context, statements);
			// 设置当前语句
			statements.statement = new ArgumentStatement(statements);
		}
	});

	return OpeningArgumentsTag;
}(
	this.OpeningParenTag,
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

	ArgumentNameTag.props({
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
				return false;
			}

			// 参数列表收集变量名
			collection.collect(content);
			return true;
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

	ArgumentSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openingArgumentsContextTags;
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

this.ClosingArgumentsTag = function(ClosingParenTag){
	/**
	 * 结束函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingArgumentsTag(_type){
		ClosingParenTag.call(this, _type);
	};
	ClosingArgumentsTag = new Rexjs(ClosingArgumentsTag, ClosingParenTag);

	ClosingArgumentsTag.props({
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
			// 设置参数表达式的 closing 属性
			statement.expression.arguments.closing = context;
		}
	});

	return ClosingArgumentsTag;
}(
	this.ClosingParenTag
);

argumentSeparatorTag = new this.ArgumentSeparatorTag();
closingArgumentsTag = new this.ClosingArgumentsTag();

}.call(
	this,
	// argumentSeparatorTag
	null,
	// closingArgumentsTag
	null
);