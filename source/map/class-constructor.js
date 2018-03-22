// 构造函数标签相关
!function(IdentifierPropertyNameExpression, ShorthandMethodBodyStatements, OpenShorthandMethodArgumentsTag, CloseShorthandMethodBodyTag, PHASE_NONE, PHASE_WAITING_CALL, PHASE_CALLED, closeConstructorArgumentsTag, closeConstructorBodyTag){

this.ConstructorNameExpression = function(){
	/**
	 * 构造函数名称表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ConstructorNameExpression(context){
		IdentifierPropertyNameExpression.call(this, context);
	};
	ConstructorNameExpression = new Rexjs(ConstructorNameExpression, IdentifierPropertyNameExpression);

	ConstructorNameExpression.$({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				var context = this.context;
				
				// 如果有类名
				if(context){
					// 追加 空格 和 类名
					contentBuilder.appendString(" " + context.content);
				}
			}
		}
	});

	return ConstructorNameExpression;
}();

this.DefaultConstructorPropertyExpression = function(ClassPropertyExpression, ConstructorNameExpression){
	/**
	 * 默认构造函数表达式
	 * @param {Statements} statements - 当前语句块
	 * @param {Context} name - 类名称标签上下文
	 */
	function DefaultConstructorPropertyExpression(statements, classExpression){
		ClassPropertyExpression.call(this);

		// 初始化构造函数名称表达式
		this.name = new ConstructorNameExpression(classExpression.name.context);

		// 如果 extends 存在，说明有父类
		if(classExpression.extends){
			this.hasSuper = true;
			// 获取属性拥有者变量名
			this.propertyOwner = this.requestVariableOf(statements, classExpression);
		}
	};
	DefaultConstructorPropertyExpression = new Rexjs(DefaultConstructorPropertyExpression, ClassPropertyExpression);

	DefaultConstructorPropertyExpression.$({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加属性初始化代码
			contentBuilder.appendString('new Rexjs.ClassProperty("constructor",function');
			// 提取名称
			this.name.extractTo(contentBuilder);

			// 追加函数参数及主体的起始大括号
			contentBuilder.appendString("(){");

			// 如果有父类
			if(this.hasSuper){
				// 追加父类构造函数的调用
				contentBuilder.appendString(
					"return Rexjs.Super.callConstructor(" + this.propertyOwner + ", this);"
				);
			}

			// 追加函数的结束大括号及 ClassProperty 方法的结束小括号
			contentBuilder.appendString("})");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(){},
		hasSuper: false,
		name: NULL,
		/**
		 * 获取属性的拥有者
		 * @param {ClassExpression} classExpression - 类表达式
		 */
		owner: function(){
			return this.propertyOwner;
		},
		propertyOwner: ""
	});

	return DefaultConstructorPropertyExpression;
}(
	this.ClassPropertyExpression,
	this.ConstructorNameExpression
);

this.ConstructorBodyStatements = function(extractTo, applyAfterSuperCall){
	/**
	 * 简写方法主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 * @param {Number} phase - 该语句块的父类调用阶段
	 */
	function ConstructorBodyStatements(target, phase){
		var extendsExpression = target.statement.target.target.target.expression.extends;

		ShorthandMethodBodyStatements.call(this, target);

		// 如果存在继承关系，说明有父类
		if(extendsExpression){
			this.phase = PHASE_WAITING_CALL;

			// 如果需要编译
			if(config.es6Base){
				this.reference = this.collections.generate();
			}

			return;
		}

		this.phase = PHASE_NONE;
	};
	ConstructorBodyStatements = new Rexjs(ConstructorBodyStatements, ShorthandMethodBodyStatements);

	ConstructorBodyStatements.$$({
		PHASE_CALLED: PHASE_CALLED,
		PHASE_NONE: PHASE_NONE,
		PHASE_WAITING_CALL: PHASE_WAITING_CALL
	});

	ConstructorBodyStatements.$({
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 如果是在 super 调用之后
			applyAfterSuperCall(parser, this, context);
		},
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
					return;

				// 如果正在等待调用 super
				case PHASE_WAITING_CALL:
					break;

				default:
					// 报错
					parser.error(open, ECMAScriptErrors.SUPER_CALL_UNEXTEND);
					return;
			}

			// 表示已经调用过 super
			this.phase = PHASE_CALLED;
		},
		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 */
		applyThis: function(parser, context){
			// 如果是在 super 调用之后
			if(applyAfterSuperCall(parser, this, context)){
				// 修改 this 上下文的文本内容为临时变量名，因为 this 是要根据 super 的返回值来决定的
				context.content = this.reference;
			}
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			extractTo.call(this, contentBuilder);

			// 如果需要编译
			if(config.es6Base){
				// 如果父类被调用过，说明存在父类
				if(this.phase === PHASE_CALLED){
					// 追加构造函数返回值
					contentBuilder.appendString("return " + this.reference + ";");
				}
			}
		},
		phase: PHASE_NONE
	});

	return ConstructorBodyStatements;
}(
	ShorthandMethodBodyStatements.prototype.extractTo,
	// applyAfterSuperCall
	function(parser, statements, context){
		// 判断阶段
		switch(statements.phase){
			// 无阶段，说明没有父类
			case PHASE_NONE:
				return false;

			// 如果 super 已经被调用
			case PHASE_CALLED:
				return true;
		}

		// 报错，因为进入这里，说明是在没有调用 super 之前
		parser.error(
			context,
			ECMAScriptErrors.template("KEYWORD", context.content)
		);
	}
);

this.ConstructorTag = function(WordPropertyNameTag, ConstructorPropertyExpression){
	/**
	 * 构造函数标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstructorTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	ConstructorTag = new Rexjs(ConstructorTag, WordPropertyNameTag);

	ConstructorTag.$({
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
	this.ConstructorPropertyExpression
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

	OpenConstructorArgumentsTag.$({
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

	CloseConstructorArgumentsTag.$({
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

	OpenConstructorBodyTag.$({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeConstructorBodyTag;
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 */
		getBoundStatements: function(statements){
			return new ConstructorBodyStatements(statements);
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

	CloseConstructorBodyTag.$({
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
	this.IdentifierPropertyNameExpression,
	this.ShorthandMethodBodyStatements,
	this.OpenShorthandMethodArgumentsTag,
	this.CloseShorthandMethodBodyTag,
	// PHASE_NONE
	0,
	// PHASE_WAITING_CALL
	1,
	// PHASE_CALLED
	2,
	// closeConstructorArgumentsTag
	NULL,
	// closeConstructorBodyTag
	NULL
);