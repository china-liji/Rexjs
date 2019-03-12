// 对象计算式属性相关
!function(closingComputedPropertyNameTag, closingComputedMethodNameTag){

this.ComputedPropertyNameExpression = function(){
	/**
	 * 属性计算式表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function ComputedPropertyNameExpression(opening){
		PartnerExpression.call(this, opening);
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
		}
	});

	return ComputedPropertyNameExpression;
}();

this.ComputedPropertyNameStatement = function(){
	/**
	 * 对象计算式语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ComputedPropertyNameStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ComputedPropertyNameStatement = new Rexjs(ComputedPropertyNameStatement, ECMAScriptStatement);

	ComputedPropertyNameStatement.props({
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

	return ComputedPropertyNameStatement;
}();

this.OpeningComputedPropertyNameTag = function(OpeningBracketTag, ComputedPropertyNameExpression, ComputedPropertyNameStatement){
	/**
	 * 起始对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningComputedPropertyNameTag(_type){
		OpeningBracketTag.call(this, _type);
	};
	OpeningComputedPropertyNameTag = new Rexjs(OpeningComputedPropertyNameTag, OpeningBracketTag);

	OpeningComputedPropertyNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingComputedPropertyNameTag;
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

			// 如果需要编译
			if(config.es6Base){
				// 给对象表达式设置临时变量名
				statement.expression.setCompiledVariableTo(
					statements,
					statement.target.expression
				);
			}
			
			// 设置当前属性
			statements.statement = new ComputedPropertyNameStatement(statements);
		}
	});

	return OpeningComputedPropertyNameTag;
}(
	this.OpeningBracketTag,
	this.ComputedPropertyNameExpression,
	this.ComputedPropertyNameStatement
);

this.ClosingComputedPropertyNameTag = function(ClosingBracketTag){
	/**
	 * 结束对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingComputedPropertyNameTag(_type){
		ClosingBracketTag.call(this, _type);
	};
	ClosingComputedPropertyNameTag = new Rexjs(ClosingComputedPropertyNameTag, ClosingBracketTag);

	ClosingComputedPropertyNameTag.props({
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
			statement.expression.name.closing = context;
		}
	});

	return ClosingComputedPropertyNameTag;
}(
	this.ClosingBracketTag
);

this.OpeningComputedMethodNameTag = function(OpeningComputedPropertyNameTag){
	/**
	 * 起始计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningComputedMethodNameTag(context){
		OpeningComputedPropertyNameTag.call(this, context);
	};
	OpeningComputedMethodNameTag = new Rexjs(OpeningComputedMethodNameTag, OpeningComputedPropertyNameTag);

	OpeningComputedMethodNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingComputedPropertyNameTag;
		}
	});

	return OpeningComputedMethodNameTag;
}(
	this.OpeningComputedPropertyNameTag
);

this.ClosingComputedMethodNameTag = function(ClosingComputedPropertyNameTag){
	/**
	 * 结束计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingComputedMethodNameTag(context){
		ClosingComputedPropertyNameTag.call(this, context);
	};
	ClosingComputedMethodNameTag = new Rexjs(ClosingComputedMethodNameTag, ClosingComputedPropertyNameTag);

	ClosingComputedMethodNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodArgumentsTags;
		}
	});

	return ClosingComputedMethodNameTag;
}(
	this.ClosingComputedPropertyNameTag
);

closingComputedPropertyNameTag = new this.ClosingComputedPropertyNameTag();
closingComputedMethodNameTag = new this.ClosingComputedMethodNameTag();

}.call(
	this,
	// closingComputedPropertyNameTag
	null,
	// closingComputedMethodNameTag
	null
);