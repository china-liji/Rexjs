// 构造函数标签相关
~function(OpenShorthandMethodArgumentsTag, CloseShorthandMethodBodyTag, PHASE_NONE, PHASE_WAITING_CALL, PHASE_CALLED, closeConstructorArgumentsTag, closeConstructorBodyTag, getClassPropertyStatement){

this.ConstructorNameExpression = function(config){
	/**
	 * 构造函数名称表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ConstructorNameExpression(context){
		Expression.call(this, context);
	};
	ConstructorNameExpression = new Rexjs(ConstructorNameExpression, Expression);

	ConstructorNameExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译类
			if(config.value){
				var context = this.context;
				
				// 如果没有类名
				if(context === null){
					return;
				}

				// 追加 空格 和 类名
				contentBuilder.appendString(" " + context.content);
			}
		}
	});

	return ConstructorNameExpression;
}(
	// config
	ECMAScriptConfig.class
);

this.DefaultConstructorExpression = function(ClassPropertyExpression){
	/**
	 * 默认构造函数表达式
	 * @param {Context} name - 类名称标签上下文
	 * @param {Boolean} extended - 该类存在继承
	 */
	function DefaultConstructorExpression(name, extended){
		ClassPropertyExpression.call(this);

		this.name = name;
		this.extended = extended;
	};
	DefaultConstructorExpression = new Rexjs(DefaultConstructorExpression, ClassPropertyExpression);

	DefaultConstructorExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			var name = this.name;

			// 追加构造函数
			contentBuilder.appendString(
				'new ClassProperty("constructor",function' +
				(name === null ? "" : " " + name.content) +
				"(){" + 
					(
						// 如果该类存在继承
						this.extended ?
							"Rexjs.Class.superOf(this," + this.superDepth + ",true)();" :
							""
					) +
				"})"
			);
		},
		extended: false,
		name: null
	});

	return DefaultConstructorExpression;
}(
	this.ClassPropertyExpression
);

this.ConstructorBodyStatements = function(ShorthandMethodBodyStatements){
	/**
	 * 简写方法主体语句块
	 * @param {Number} phase - 该语句块的父类调用阶段
	 */
	function ConstructorBodyStatements(phase){
		ShorthandMethodBodyStatements.call(this);

		this.phase = phase;
	};
	ConstructorBodyStatements = new Rexjs(ConstructorBodyStatements, ShorthandMethodBodyStatements);

	ConstructorBodyStatements.static({
		PHASE_CALLED: PHASE_CALLED,
		PHASE_NONE: PHASE_NONE,
		PHASE_WAITING_CALL: PHASE_WAITING_CALL
	});

	ConstructorBodyStatements.props({
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			// 判断阶段
			switch(this.phase){
				// 如果已经调用过 super
				case PHASE_CALLED:
					// 报错
					parser.error(open, ECMAScriptErrors.SUPER_RECALL);
					return 0;

				// 如果正在等待调用 super
				case PHASE_WAITING_CALL:
					break;

				default:
					// 报错
					parser.error(open, ECMAScriptErrors.SUPER_CALL_UNEXTEND);
					return 0;
			}

			// 表示已经调用过 super
			this.phase = PHASE_CALLED;
			// 返回属性表达式的 superDepth 属性
			return getClassPropertyStatement(this.target).expression.superDepth;
		},
		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 */
		applyThis: function(parser, context){
			// 如果阶段不等于等待调用 super，则说明，没有 super 或 已经调用
			if(this.phase !== PHASE_WAITING_CALL){
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);
		},
		phase: PHASE_NONE
	});

	return ConstructorBodyStatements;
}(
	this.ShorthandMethodBodyStatements
);

this.ConstructorTag = function(WordPropertyNameTag, IdentifierPropertyNameExpression){
	/**
	 * 构造函数标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstructorTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	ConstructorTag = new Rexjs(ConstructorTag, WordPropertyNameTag);

	ConstructorTag.props({
		regexp: WordPropertyNameTag.compileRegExp("constructor"),
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constructorArgumentsTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyExpression = statement.expression;

			// 设置类的名称
			propertyExpression.name = new IdentifierPropertyNameExpression(context);

			// 如果是静态属性
			if(propertyExpression.static){
				return;
			}

			// 如果存在访问器
			if(propertyExpression.accessible){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template("CONSTRUCTOR", "an accessor")
				);

				return;
			}

			var classBodyExpression = statement.target.expression.body;

			// 设置类主体表达式的构造函数索引
			classBodyExpression.indexOfConstructor = classBodyExpression.inner.length;
		}
	});

	return ConstructorTag;
}(
	this.WordPropertyNameTag,
	this.IdentifierPropertyNameExpression
);

this.OpenConstructorArgumentsTag = function(ConstructorNameExpression, visitor){
	/**
	 * 构造函数参数起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenConstructorArgumentsTag(_type){
		OpenShorthandMethodArgumentsTag.call(this, _type);
	};
	OpenConstructorArgumentsTag = new Rexjs(OpenConstructorArgumentsTag, OpenShorthandMethodArgumentsTag);

	OpenConstructorArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeConstructorArgumentsTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 设置构造函数的函数表达式的名称
			statements.statement.target.expression.name = new ConstructorNameExpression(statement.target.expression.name.context);
		}
	});

	return OpenConstructorArgumentsTag;
}(
	this.ConstructorNameExpression,
	OpenShorthandMethodArgumentsTag.prototype.visitor
);

this.CloseConstructorArgumentsTag = function(CloseShorthandMethodArgumentsTag){
	/**
	 * 构造函数参数结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseConstructorArgumentsTag(_type){
		CloseShorthandMethodArgumentsTag.call(this, _type);
	};
	CloseConstructorArgumentsTag = new Rexjs(CloseConstructorArgumentsTag, CloseShorthandMethodArgumentsTag);

	CloseConstructorArgumentsTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constructorBodyTags;
		}
	});

	return CloseConstructorArgumentsTag;
}(
	this.CloseShorthandMethodArgumentsTag
);

this.OpenConstructorBodyTag = function(OpenShorthandMethodBodyTag, ConstructorBodyStatements){
	/**
	 * 构造函数起始主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenConstructorBodyTag(_type){
		OpenShorthandMethodBodyTag.call(this, _type);
	};
	OpenConstructorBodyTag = new Rexjs(OpenConstructorBodyTag, OpenShorthandMethodBodyTag);

	OpenConstructorBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeConstructorBodyTag;
		},
		/**
		 * 进入函数主体语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			// 设置当前语句块
			(
				parser.statements = new ConstructorBodyStatements(
					// 如果有父类
					getClassPropertyStatement(parser.statements).target.expression.extends.context ?
						PHASE_WAITING_CALL :
						PHASE_NONE
				)
			)
			.target = statements;
		}
	});

	return OpenConstructorBodyTag;
}(
	this.OpenShorthandMethodBodyTag,
	this.ConstructorBodyStatements
);

this.CloseConstructorBodyTag = function(visitor){
	/**
	 * 构造函数起始主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseConstructorBodyTag(_type){
		CloseShorthandMethodBodyTag.call(this, _type);
	};
	CloseConstructorBodyTag = new Rexjs(CloseConstructorBodyTag, CloseShorthandMethodBodyTag);

	CloseConstructorBodyTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果需要调用 super，但没有调用
			if(statement.expression.inner.phase === PHASE_WAITING_CALL){
				// 报错
				parser.error(statement.target.target.expression.name.context, ECMAScriptErrors.WITHOUT_SUPER_CALL);
				return;
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return CloseConstructorBodyTag;
}(
	CloseShorthandMethodBodyTag.prototype.visitor
);

closeConstructorArgumentsTag = new this.CloseConstructorArgumentsTag();
closeConstructorBodyTag = new this.CloseConstructorBodyTag();

}.call(
	this,
	this.OpenShorthandMethodArgumentsTag,
	this.CloseShorthandMethodBodyTag,
	// PHASE_NONE
	0,
	// PHASE_WAITING_CALL
	1,
	// PHASE_CALLED
	2,
	// closeConstructorArgumentsTag
	null,
	// closeConstructorBodyTag
	null,
	// getClassPropertyStatement
	function(statements){
		return statements.statement.target.target;
	}
);