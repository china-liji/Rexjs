// 对象简写方法相关
!function(OpeningArgumentsTag, closingShorthandMethodArgumentsTag, closingShorthandMethodBodyTag){

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
	
this.ShorthandMethodValueExpression = function(PropertyValueExpression, CompiledExpression, complie){
	/**
	 * 简写方法值表达式
	 */
	function ShorthandMethodValueExpression(){
		PropertyValueExpression.call(this, null);
	};
	ShorthandMethodValueExpression = new Rexjs(ShorthandMethodValueExpression, PropertyValueExpression);

	ShorthandMethodValueExpression.props({
		/**
		 * 以函数参数模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		argumentTo: function(contentBuilder){
			// 编译表达式
			complie(this, contentBuilder, "");
		},
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 编译表达式
			complie(this, contentBuilder, ":");
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 编译表达式
			complie(this, contentBuilder, "=");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
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
	Rexjs.CompiledExpression,
	// complie
	function(expression, contentBuilder, separator){
		// 追加 赋值等于号 和 函数头部
		contentBuilder.appendString(separator + "function");
		// 直接以简写形式提取表达式文本内容
		expression.shortTo(contentBuilder);
	}
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
		applySuper: function(){},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} opening - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, opening){
			// 报错
			parser.error(opening, ECMAScriptErrors.SUPER_CALL);
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

this.OpeningShorthandMethodArgumentsTag = function(ShorthandMethodValueExpression, ShorthandMethodValueStatement, visitor){
	/**
	 * 对象起始简写方法参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningShorthandMethodArgumentsTag(_type){
		OpeningArgumentsTag.call(this, _type);
	};
	OpeningShorthandMethodArgumentsTag = new Rexjs(OpeningShorthandMethodArgumentsTag, OpeningArgumentsTag);

	OpeningShorthandMethodArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingShorthandMethodArgumentsTag;
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

	return OpeningShorthandMethodArgumentsTag;
}(
	this.ShorthandMethodValueExpression,
	this.ShorthandMethodValueStatement,
	OpeningArgumentsTag.prototype.visitor
);

this.ClosingShorthandMethodArgumentsTag = function(ClosingArgumentsTag){
	/**
	 * 对象结束简写方法参数标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingShorthandMethodArgumentsTag(_type){
		ClosingArgumentsTag.call(this, _type);
	};
	ClosingShorthandMethodArgumentsTag = new Rexjs(ClosingShorthandMethodArgumentsTag, ClosingArgumentsTag);

	ClosingShorthandMethodArgumentsTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodBodyTags;
		}
	});

	return ClosingShorthandMethodArgumentsTag;
}(
	this.ClosingArgumentsTag
);

this.OpeningShorthandMethodBodyTag = function(OpeningFunctionBodyTag, ShorthandMethodBodyStatements){
	/**
	 * 对象简写方法参数起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningShorthandMethodBodyTag(_type){
		OpeningFunctionBodyTag.call(this, _type);
	};
	OpeningShorthandMethodBodyTag = new Rexjs(OpeningShorthandMethodBodyTag, OpeningFunctionBodyTag);

	OpeningShorthandMethodBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingShorthandMethodBodyTag;
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 */
		getBoundStatements: function(statements){
			return new ShorthandMethodBodyStatements(statements);
		}
	});

	return OpeningShorthandMethodBodyTag;
}(
	this.OpeningFunctionBodyTag,
	this.ShorthandMethodBodyStatements
);

this.ClosingShorthandMethodBodyTag = function(ClosingFunctionBodyTag){
	/**
	 * 对象简写方法参数结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingShorthandMethodBodyTag(_type){
		ClosingFunctionBodyTag.call(this, _type);
	};
	ClosingShorthandMethodBodyTag = new Rexjs(ClosingShorthandMethodBodyTag, ClosingFunctionBodyTag);

	ClosingShorthandMethodBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertySeparatorTags;
		}
	});

	return ClosingShorthandMethodBodyTag;
}(
	this.ClosingFunctionBodyTag
);

closingShorthandMethodArgumentsTag = new this.ClosingShorthandMethodArgumentsTag();
closingShorthandMethodBodyTag = new this.ClosingShorthandMethodBodyTag();

}.call(
	this,
	this.OpeningArgumentsTag,
	// closingShorthandMethodArgumentsTag
	null,
	// closingShorthandMethodBodyTag
	null
);