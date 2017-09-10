// 对象简写方法相关
!function(OpenArgumentsTag, closeShorthandMethodArgumentsTag, closeShorthandMethodBodyTag){

this.ShorthandMethodExpression = function(FunctionExpression){
	/**
	 * 简写方法表达式
	 */
	function ShorthandMethodExpression(){
		FunctionExpression.call(this, null);
	};
	ShorthandMethodExpression = new Rexjs(ShorthandMethodExpression, FunctionExpression);

	ShorthandMethodExpression.props({
		head: new DefaultExpression()
	});

	return ShorthandMethodExpression;
}(
	this.FunctionExpression
);
	
this.ShorthandMethodValueExpression = function(PropertyValueExpression, config){
	/**
	 * 简写方法值表达式
	 */
	function ShorthandMethodValueExpression(){
		PropertyValueExpression.call(this, null);
	};
	ShorthandMethodValueExpression = new Rexjs(ShorthandMethodValueExpression, PropertyValueExpression);

	ShorthandMethodValueExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加冒号
			contentBuilder.appendString(":function");
			// 直接以简写形式提取表达式文本内容
			this.shortTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加 赋值等于号 和 函数头部
			contentBuilder.appendString("=function");
			// 直接以简写形式提取表达式文本内容
			this.shortTo(contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要解析
			if(config.value){
				// 以定义属性的模式提取表达式文本内容
				this.defineTo(contentBuilder);
				return;
			}

			// 直接以简写形式提取表达式文本内容
			this.shortTo(contentBuilder);
		},
		/**
		 * 直接以简写形式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		shortTo: function(contentBuilder){
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		}
	});

	return ShorthandMethodValueExpression;
}(
	this.PropertyValueExpression,
	// config
	ECMAScriptConfig.addBaseConfig("shorthandMethod")
);

this.ShorthandMethodValueStatement = function(PropertyValueStatement, ShorthandMethodExpression){
	/**
	 * 对象简写方法值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ShorthandMethodValueStatement(statements){
		PropertyValueStatement.call(this, statements);

		this.expression = new ShorthandMethodExpression();
	};
	ShorthandMethodValueStatement = new Rexjs(ShorthandMethodValueStatement, PropertyValueStatement);

	ShorthandMethodValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return this.try(parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 跳出语句并设置属性值表达式的 operand 属性
			this.out().value.operand = this.expression;
		}
	});

	return ShorthandMethodValueStatement;
}(
	this.PropertyValueStatement,
	this.ShorthandMethodExpression
);

this.ShorthandMethodBodyStatements = function(FunctionBodyStatements){
	/**
	 * 简写方法主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function ShorthandMethodBodyStatements(target){
		FunctionBodyStatements.call(this, target);
	};
	ShorthandMethodBodyStatements = new Rexjs(ShorthandMethodBodyStatements, FunctionBodyStatements);

	ShorthandMethodBodyStatements.props({
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 相当于申请应用 this 关键字
			this.applyThis(parser, context);
			// 返回属性表达式的 superDepth 属性
			return parser.statements.target.statement.target.target.expression.superDepth;
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			// 报错
			parser.error(open, ECMAScriptErrors.SUPER_CALL);
			return 0;
		}
	});

	return ShorthandMethodBodyStatements;
}(
	this.FunctionBodyStatements
);

this.PropertyStarTag = function(StarTag){
	/**
	 * 函数声明星号标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyStarTag(_type){
		StarTag.call(this, _type);
	};
	PropertyStarTag = new Rexjs(PropertyStarTag, StarTag);

	PropertyStarTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置属性表达式的星号
			statement.expression.star = context;
		}
	});

	return PropertyStarTag;
}(
	this.StarTag
);

this.OpenShorthandMethodArgumentsTag = function(ShorthandMethodValueExpression, ShorthandMethodValueStatement, visitor){
	/**
	 * 对象起始简写方法参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenShorthandMethodArgumentsTag(_type){
		OpenArgumentsTag.call(this, _type);
	};
	OpenShorthandMethodArgumentsTag = new Rexjs(OpenShorthandMethodArgumentsTag, OpenArgumentsTag);

	OpenShorthandMethodArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeShorthandMethodArgumentsTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyExpression = statement.expression, star = propertyExpression.star;

			// 设置对象属性表达式的属性值
			propertyExpression.value = new ShorthandMethodValueExpression();
			// 初始化简写方法值语句
			statement = new ShorthandMethodValueStatement(statements);
			
			// 如果星号存在
			if(star){
				// 将简写函数表达式转化为生成器
				statement.expression.toGenerator(star);
			}

			// 设置当前语句
			statements.statement = statement;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return OpenShorthandMethodArgumentsTag;
}(
	this.ShorthandMethodValueExpression,
	this.ShorthandMethodValueStatement,
	OpenArgumentsTag.prototype.visitor
);

this.CloseShorthandMethodArgumentsTag = function(CloseArgumentsTag){
	/**
	 * 对象结束简写方法参数标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseShorthandMethodArgumentsTag(_type){
		CloseArgumentsTag.call(this, _type);
	};
	CloseShorthandMethodArgumentsTag = new Rexjs(CloseShorthandMethodArgumentsTag, CloseArgumentsTag);

	CloseShorthandMethodArgumentsTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodBodyTags;
		}
	});

	return CloseShorthandMethodArgumentsTag;
}(
	this.CloseArgumentsTag
);

this.OpenShorthandMethodBodyTag = function(OpenFunctionBodyTag, ShorthandMethodBodyStatements){
	/**
	 * 对象简写方法参数起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenShorthandMethodBodyTag(_type){
		OpenFunctionBodyTag.call(this, _type);
	};
	OpenShorthandMethodBodyTag = new Rexjs(OpenShorthandMethodBodyTag, OpenFunctionBodyTag);

	OpenShorthandMethodBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeShorthandMethodBodyTag;
		},
		/**
		 * 进入函数主体语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			// 设置当前语句块
			parser.statements = new ShorthandMethodBodyStatements(statements);
		}
	});

	return OpenShorthandMethodBodyTag;
}(
	this.OpenFunctionBodyTag,
	this.ShorthandMethodBodyStatements
);

this.CloseShorthandMethodBodyTag = function(CloseFunctionBodyTag){
	/**
	 * 对象简写方法参数结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseShorthandMethodBodyTag(_type){
		CloseFunctionBodyTag.call(this, _type);
	};
	CloseShorthandMethodBodyTag = new Rexjs(CloseShorthandMethodBodyTag, CloseFunctionBodyTag);

	CloseShorthandMethodBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertySeparatorTags;
		}
	});

	return CloseShorthandMethodBodyTag;
}(
	this.CloseFunctionBodyTag
);

closeShorthandMethodArgumentsTag = new this.CloseShorthandMethodArgumentsTag();
closeShorthandMethodBodyTag = new this.CloseShorthandMethodBodyTag();

}.call(
	this,
	this.OpenArgumentsTag,
	// closeShorthandMethodArgumentsTag
	null,
	// closeShorthandMethodBodyTag
	null
);