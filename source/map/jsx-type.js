// JSX 类型名称相关
!function(DotAccessorTag, jsxSelfClosingBackslashTag, closingJSXElementTag){

this.JSXMemberAccessorStatement = function(IdentifierExpression){
	/**
	 * JSX 类型名称属性访问器语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function JSXMemberAccessorStatement(statements){
		ECMAScriptStatement.call(this, statements);

		this.expression = new IdentifierExpression(this.target.expression.type);
	};
	JSXMemberAccessorStatement = new Rexjs(JSXMemberAccessorStatement, ECMAScriptStatement);

	JSXMemberAccessorStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			debugger

			// 判断标签内容
			switch(context.content){
				case ",":
					// 跳出语句并添加表达式
					this.out().inner.add(this.expression);
					// 返回标签
					return this.tagOf().separator;

				case "]":
					// 跳出语句并设置表达式
					this.out().inner.set(this.expression);
					// 返回结束标签
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
			// 判断内容
			switch(context.content){
				case ".":
					return context.tag;

				case "/":
					this.out().type = this.expression;
					return jsxSelfClosingBackslashTag;

				case ">":
					this.out().type = this.expression;
					return closingJSXElementTag;

				default:
					// 报错
					parser.error(context);
					return null;
			}
		}
	});

	return JSXMemberAccessorStatement;
}(
	this.IdentifierExpression
);

this.JSXIdentifierTag = function(IdentifierTag, JSXExpression, JSXStatement){
	/**
	 * 属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXIdentifierTag(_type){
		IdentifierTag.call(this, _type);
	};
	JSXIdentifierTag = new Rexjs(JSXIdentifierTag, IdentifierTag);

	JSXIdentifierTag.props({
		regexp: IdentifierTag.compileRegExp(
			IdentifierTag.keywords.join("|"),
			getIdentifierRegExpSource("-")
		),
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxIdentifierContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var jsxElementExpression = statement.expression, jsxExpression = new JSXExpression(), jsxStatement = new JSXStatement(statements);

			// 设置 type
			jsxElementExpression.type = context;
			// 设置 hasJoinChar
			jsxElementExpression.hasJoinChar = context.content.indexOf("-") > - 1;
			// 设置 jsxStatement 的表达式 及 jsxExpression 的起始元素属性
			jsxStatement.expression = jsxExpression.openingElement = jsxElementExpression;
			// 设置当前表达式
			statement.expression = jsxExpression;
			// 设置当前语句
			statements.statement = jsxStatement;
		}
	});

	return JSXIdentifierTag;
}(
	this.IdentifierTag,
	this.JSXExpression,
	this.JSXStatement
);

this.JSXMemberAccessorTag = function(JSXMemberAccessorStatement, visitor){
	/**
	 * JSX 类型名称点属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXMemberAccessorTag(_type){
		DotAccessorTag.call(this, _type);
	};
	JSXMemberAccessorTag = new Rexjs(JSXMemberAccessorTag, DotAccessorTag);
	
	JSXMemberAccessorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 如果表达式有 "-" 连接符
			if(expression.hasJoinChar){
				// 报错
				parser.error(context);
				return;
			}

			// 设置表达式的 isAccessorType 属性，说明是访问器属性
			expression.isAccessorType = true;

			// 调用父类方法
			visitor.call(
				this,
				parser,
				context,
				statements.statement = new JSXMemberAccessorStatement(statements),
				statements
			);
		}
	});

	return JSXMemberAccessorTag;
}(
	this.JSXMemberAccessorStatement,
	DotAccessorTag.prototype.visitor
);

}.call(
	this,
	this.DotAccessorTag,
	// jsxSelfClosingBackslashTag
	new this.JSXSelfClosingBackslashTag(),
	// closingJSXElementTag
	new this.ClosingJSXElementTag()
);