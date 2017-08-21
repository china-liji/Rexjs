// 对象计算式属性相关
~function(closeComputedPropertyNameTag, closeComputedMethodNameTag){

this.ComputedPropertyNameExpression = function(){
	/**
	 * 属性计算式表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ComputedPropertyNameExpression(open){
		PartnerExpression.call(this, open);
	};
	ComputedPropertyNameExpression = new Rexjs(ComputedPropertyNameExpression, PartnerExpression);

	ComputedPropertyNameExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			this.extractTo(contentBuilder);
		},
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加起始小括号，防止 inner 里面是逗号表达式，会出现意外
			contentBuilder.appendString("(");
			// 提取 inner
			this.inner.extractTo(contentBuilder);
			// 追加结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		destructTo: function(contentBuilder){
			// 直接提取
			this.extractTo(contentBuilder);
		}
	});

	return ComputedPropertyNameExpression;
}();

this.ObjectComputedNameStatement = function(){
	/**
	 * 对象计算式语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ObjectComputedNameStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ObjectComputedNameStatement = new Rexjs(ObjectComputedNameStatement, ECMAScriptStatement);

	ObjectComputedNameStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束中括号
			if(context.content !== "]"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 inner
			this.out().name.inner = this.expression;
			// 返回结束标签
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.name.context.tag;
		},
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 报错
				parser.error(context);
			}
		}
	})

	return ObjectComputedNameStatement;
}();

this.OpenComputedPropertyNameTag = function(OpenBracketTag, ComputedPropertyNameExpression, ObjectComputedNameStatement, config){
	/**
	 * 起始对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenComputedPropertyNameTag(_type){
		OpenBracketTag.call(this, _type);
	};
	OpenComputedPropertyNameTag = new Rexjs(OpenComputedPropertyNameTag, OpenBracketTag);

	OpenComputedPropertyNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeComputedPropertyNameTag;
		},
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
			// 设置表达式的 name 属性
			statement.expression.name = new ComputedPropertyNameExpression(context);

			// 如果需要编译计算式名称
			if(config.value){
				// 自动化生成变量
				statement.target.expression.autoVariable(statements);
			}
			
			// 设置当前属性
			statements.statement = new ObjectComputedNameStatement(statements);
		}
	});

	return OpenComputedPropertyNameTag;
}(
	this.OpenBracketTag,
	this.ComputedPropertyNameExpression,
	this.ObjectComputedNameStatement,
	// config
	ECMAScriptConfig.addBaseConfig("computedName")
);

this.CloseComputedPropertyNameTag = function(CloseBracketTag){
	/**
	 * 结束对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseComputedPropertyNameTag(_type){
		CloseBracketTag.call(this, _type);
	};
	CloseComputedPropertyNameTag = new Rexjs(CloseComputedPropertyNameTag, CloseBracketTag);

	CloseComputedPropertyNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.name.close = context;
		}
	});

	return CloseComputedPropertyNameTag;
}(
	this.CloseBracketTag
);

this.OpenComputedMethodNameTag = function(OpenComputedPropertyNameTag){
	/**
	 * 起始计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenComputedMethodNameTag(context){
		OpenComputedPropertyNameTag.call(this, context);
	};
	OpenComputedMethodNameTag = new Rexjs(OpenComputedMethodNameTag, OpenComputedPropertyNameTag);

	OpenComputedMethodNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeComputedPropertyNameTag;
		}
	});

	return OpenComputedMethodNameTag;
}(
	this.OpenComputedPropertyNameTag
);

this.CloseComputedMethodNameTag = function(CloseComputedPropertyNameTag){
	/**
	 * 结束计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseComputedMethodNameTag(context){
		CloseComputedPropertyNameTag.call(this, context);
	};
	CloseComputedMethodNameTag = new Rexjs(CloseComputedMethodNameTag, CloseComputedPropertyNameTag);

	CloseComputedMethodNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodArgumentsTags;
		}
	});

	return CloseComputedMethodNameTag;
}(
	this.CloseComputedPropertyNameTag
);

closeComputedPropertyNameTag = new this.CloseComputedPropertyNameTag();
closeComputedMethodNameTag = new this.CloseComputedMethodNameTag();

}.call(
	this,
	// closeComputedPropertyNameTag
	null,
	// closeComputedMethodNameTag
	null
);