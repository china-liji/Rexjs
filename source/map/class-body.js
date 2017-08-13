// 类主体标签相关
~function(DefaultConstructorExpression, BinaryNumberTag, OctalNumberTag, config, classPropertySeparatorTag, closeClassBodyTag){

this.ClassBodyExpression = function(ObjectExpression, extractTo, compileItem){
	/**
	 * 对象表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ClassBodyExpression(open){
		ObjectExpression.call(this, open);
	};
	ClassBodyExpression = new Rexjs(ClassBodyExpression, ObjectExpression);

	ClassBodyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 执行属性连接
			this.inner.execJoin(compileItem, contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 设置属性的连接符
			this.inner.join = ";";
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		indexOfConstructor: -1
	});

	return ClassBodyExpression;
}(
	this.ObjectExpression,
	PartnerExpression.prototype.extractTo,
	// compileItem
	function(item, contentBuilder){
		item.compileTo(contentBuilder);
	}
);

this.ClassPropertyStatement = function(PropertyStatement, ClassPropertyExpression, IdentifierTag, NumberTag, StringTag, insertConstructorIfNeed, getNumberTag){
	/**
	 * 类属性语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ClassPropertyStatement(statements){
		PropertyStatement.call(this, statements);
	};
	ClassPropertyStatement = new Rexjs(ClassPropertyStatement, PropertyStatement);

	ClassPropertyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var classExpression = this.out(), classBodyExpression = classExpression.body, propertyExpression = this.expression;

			// 如果不是空表达式
			if(propertyExpression.name !== null){
				// 如果存在访问器
				if(propertyExpression.accessible){
					// 根据访问器核对函数正确性
					propertyExpression.accessor.tag.checkFunction(
						parser,
						propertyExpression.value.operand,
						context
					);
				}

				// 添加属性表达式
				classBodyExpression.inner.add(propertyExpression);
			}

			var t, tag = this.tagOf(), content = context.content;

			switch(content){
				// 如果是属性分隔符
				case ";":
					return tag.separator;

				// 如果是结束大括号
				case "}":
					// 可能性的插入构造函数，即需要解析时候，又没有定义构造函数属性
					insertConstructorIfNeed(classExpression, classBodyExpression);
					// 返回类主体结束大括号
					return tag.binding;

				// 如果是 static
				case "static":
					t = tag.staticModifier;
					break;

				// 如果是 constructor
				case "constructor":
					t = tag.constructorMethodName;
					break;

				// 如果是 get
				case "get":
					t = tag.getDescriptor;
					break;

				// 如果是 set
				case "set":
					t = tag.setDescriptor;
					break;
				
				// 如果是计算式起始中括号
				case "[":
					t = tag.openComputedPropertyName;
					break;

				// 其他
				default: {
					var contextTag = context.tag;

					switch(true){
						// 如果标签是标识符标签
						case contextTag instanceof IdentifierTag:
							t = tag.identifierPropertyName;
							break;

						// 如果是数字标签
						case contextTag instanceof NumberTag:
							// 判断类型，并返回
							t = getNumberTag(tag, contextTag);
							break;

						// 如果是字符串标签
						case contextTag instanceof StringTag:
							t = tag.stringPropertyName;
							break;

						// 如果是关键字标签
						case IdentifierTag.keywords.indexOf(content) > -1:
							t = tag.keywordPropertyName;
							break;

						default:
							// 其他都是非法字符，报错
							parser.error(context);
							return null;
					}
				}
			}

			var statements = this.statements;

			// 进入这里，说明没有分隔符，要再判断

			// 设置当前语句
			statements.statement = new ClassPropertyStatement(statements);
			return t;
		},
		/**
		 * 初始化类属性表达式
		 */
		initExpression: function(){
			this.expression = new ClassPropertyExpression();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.body.context.tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 直接报错
			parser.error(context);
		}
	});

	return ClassPropertyStatement;
}(
	this.PropertyStatement,
	this.ClassPropertyExpression,
	this.IdentifierTag,
	this.NumberTag,
	this.StringTag,
	// insertConstructorIfNeed
	function(classExpression, classBodyExpression){
		switch(false){
			// 如果不需要编译类表达式
			case config.value:
				return;

			// 如果已有构造函数
			case classBodyExpression.indexOfConstructor === -1:
				return;
		}

		var inner = classBodyExpression.inner;

		// 设置构造函数索引值
		classBodyExpression.indexOfConstructor = inner.length;

		// 添加构造函数表达式
		inner.add(
			new DefaultConstructorExpression(
				classExpression.name.context,
				classExpression.extends.super !== null
			)
		);
	},
	// getNumberTag
	function(tag, contextTag){
		// 如果是二进制数字标签
		if(contextTag instanceof BinaryNumberTag){
			return tag.binaryNumberPropertyName;
		}

		// 如果是八进制数字标签
		if(contextTag instanceof OctalNumberTag){
			return tag.octalNumberPropertyName;
		}

		// 返回 es5 数字标签
		return tag.numberPropertyName;
	}
);

this.OpenClassBodyTag = function(
	OpenObjectTag,
	ClassBodyExpression, ClassPropertyStatement,
	binaryNumberPropertyNameTag, constructorTag,
	getDescriptorTag, identifierPropertyNameTag, numberPropertyNameTag,
	octalNumberPropertyNameTag, openComputedPropertyNameTag,
	setDescriptorTag, staticModifierTag, stringPropertyNameTag, keywordPropertyNameTag
){
	/**
	 * 起始函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenClassBodyTag(_type){
		OpenObjectTag.call(this, _type);
	};
	OpenClassBodyTag = new Rexjs(OpenClassBodyTag, OpenObjectTag);

	OpenClassBodyTag.props({
		/**
		 * 获取绑定的二进制数字标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binaryNumberPropertyName(){
			return binaryNumberPropertyNameTag;
		},
		/**
		 * 获取绑定的类主体结束标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeClassBodyTag;
		},
		/**
		 * 获取绑定的构造函数标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get constructorMethodName(){
			return constructorTag;
		},
		/**
		 * 获取绑定的 get 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get getDescriptor(){
			return getDescriptorTag;
		},
		/**
		 * 获取绑定的标识符属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get identifierPropertyName(){
			return identifierPropertyNameTag;
		},
		/**
		 * 获取绑定的关键字属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get keywordPropertyName(){
			return keywordPropertyNameTag;
		},
		/**
		 * 获取绑定的数字属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get numberPropertyName(){
			return numberPropertyNameTag;
		},
		/**
		 * 获取绑定的八进制数字属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get octalNumberPropertyName(){
			return octalNumberPropertyNameTag;
		},
		/**
		 * 获取绑定的起始计算式名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get openComputedPropertyName(){
			return openComputedPropertyNameTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return classPropertySeparatorTag;
		},
		/**
		 * 获取绑定的 set 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get setDescriptor(){
			return setDescriptorTag;
		},
		/**
		 * 获取绑定的 static 修饰符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get staticModifier(){
			return staticModifierTag;
		},
		/**
		 * 获取绑定的字符串属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get stringPropertyName(){
			return stringPropertyNameTag
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openClassBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置类表达式的主体
			statement.expression.body = new ClassBodyExpression(context);
			// 设置当前语句
			statements.statement = new ClassPropertyStatement(statements);
		}
	});

	return OpenClassBodyTag;
}(
	this.OpenObjectTag,
	this.ClassBodyExpression,
	this.ClassPropertyStatement,
	// binaryNumberPropertyNameTag
	new this.BinaryNumberPropertyNameTag(),
	// constructorTag
	new this.ConstructorTag(),
	// getDescriptorTag
	new this.GetDescriptorTag(),
	// identifierPropertyNameTag
	new this.IdentifierPropertyNameTag(),
	// numberPropertyNameTag
	new this.NumberPropertyNameTag(),
	// octalNumberPropertyNameTag
	new this.OctalNumberPropertyNameTag(),
	// openComputedPropertyNameTag
	new this.OpenComputedPropertyNameTag(),
	// setDescriptorTag
	new this.SetDescriptorTag(),
	// staticModifierTag
	new this.StaticModifierTag(),
	// stringPropertyNameTag
	new this.StringPropertyNameTag(),
	// keywordPropertyNameTag
	new this.KeywordPropertyNameTag()
);

this.ClassPropertySeparatorTag = function(SemicolonTag, ClassPropertyStatement){
	/**
	 * 类属性分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassPropertySeparatorTag(_type){
		SemicolonTag.call(this, _type);
	};
	ClassPropertySeparatorTag = new Rexjs(ClassPropertySeparatorTag, SemicolonTag);

	ClassPropertySeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openClassBodyContextTags;
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
			statements.statement = new ClassPropertyStatement(statements);
		}
	});

	return ClassPropertySeparatorTag;
}(
	this.SemicolonTag,
	this.ClassPropertyStatement
);

this.ClassPropertyPlaceholderTag = function(ClassPropertySeparatorTag){
	/**
	 * 类属性占位符（即空属性分隔符）标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassPropertyPlaceholderTag(_type){
		ClassPropertySeparatorTag.call(this, _type);
	};
	ClassPropertyPlaceholderTag = new Rexjs(ClassPropertyPlaceholderTag, ClassPropertySeparatorTag);

	ClassPropertyPlaceholderTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(){}
	});

	return ClassPropertyPlaceholderTag;
}(
	this.ClassPropertySeparatorTag
);

this.CloseClassBodyTag = function(CloseObjectTag){
	/**
	 * 类主体结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseClassBodyTag(_type){
		CloseObjectTag.call(this, _type);
	};
	CloseClassBodyTag = new Rexjs(CloseClassBodyTag, CloseObjectTag);

	CloseClassBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags, parser){
			return (
				// 如果表达式已结束
				(parser.statements.statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED ?
					tagsMap.mistakableTags :
					tagsMap.expressionContextTags
			);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 close
			statement.expression.body.close = context;
		}
	});

	return CloseClassBodyTag;
}(
	this.CloseObjectTag
);

classPropertySeparatorTag = new this.ClassPropertySeparatorTag();
closeClassBodyTag = new this.CloseClassBodyTag();

}.call(
	this,
	this.DefaultConstructorExpression,
	this.BinaryNumberTag,
	this.OctalNumberTag,
	// config
	ECMAScriptConfig.class,
	// classPropertySeparatorTag
	null,
	// closeClassBodyTag
	null
);