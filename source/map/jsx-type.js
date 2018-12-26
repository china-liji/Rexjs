// JSX 类型名称相关
!function(DotAccessorTag, PropertyNameTag){

this.JSXMemberAccessorStatement = function(){
	/**
	 * JSX 类型名称属性访问器语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function JSXMemberAccessorStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	JSXMemberAccessorStatement = new Rexjs(JSXMemberAccessorStatement, ECMAScriptStatement);

	JSXMemberAccessorStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 报错
			parser.error(context);
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.opening.tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var tag;

			// 判断内容
			switch(context.content){
				case ".":
					return context.tag;

				case "/":
					tag = this.tagOf().selfClosingJSXBackslash;
					break;

				case ">":
					tag = this.bindingOf();
					break;
			}

			// 如果获得了标签
			if(tag){
				// 跳出语句，并设置 JSXElementExpression 的 type
				this.out().type = this.expression;
				return tag;
			}

			// 报错
			parser.error(context);
			return null;
		}
	});

	return JSXMemberAccessorStatement;
}();

this.JSXIdentifierTag = function(IdentifierTag, JSXElementExpression){
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
			var jsxElementExpression = statement.expression;

			// 设置 type
			jsxElementExpression.type = context;
			// 设置 hasJoinChar
			jsxElementExpression.hasJoinChar = context.content.indexOf("-") > - 1;
		}
	});

	return JSXIdentifierTag;
}(
	this.IdentifierTag,
	this.JSXElementExpression
);

this.JSXMemberAccessorTag = function(IdentifierExpression, JSXMemberAccessorStatement, visitor){
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
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxPropertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var jsxElementExpression = statement.expression;

			// 如果表达式有 "-" 连接符
			if(jsxElementExpression.hasJoinChar){
				// 报错
				parser.error(context);
				return;
			}

			var jsxMemberAccessorStatement = new JSXMemberAccessorStatement(statements);

			// 设置 jsxMemberAccessorStatement 的表达式
			jsxMemberAccessorStatement.expression = (
				// 如果 type 已经是访问器
				jsxElementExpression.isAccessorType ?
					// 直接使用该访问器表达式
					jsxElementExpression.type :
					// 初始化标识符表达式
					new IdentifierExpression(jsxElementExpression.type)
			);

			// 设置表达式的 isAccessorType 属性，说明是访问器属性
			jsxElementExpression.isAccessorType = true;
			// 设置当前语句
			statements.statement = jsxMemberAccessorStatement;

			// 调用父类方法
			visitor.call(this, parser, context, jsxMemberAccessorStatement, statements);
		}
	});

	return JSXMemberAccessorTag;
}(
	this.IdentifierExpression,
	this.JSXMemberAccessorStatement,
	DotAccessorTag.prototype.visitor
);

this.JSXPropertyNameTag = function(visitor){
	/**
	 * JSX 类型属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXPropertyNameTag(_type){
		PropertyNameTag.call(this, _type);
	};
	JSXPropertyNameTag = new Rexjs(JSXPropertyNameTag, PropertyNameTag);
	
	JSXPropertyNameTag.props({
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
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 跳出语句并设置 JSXElementExpression 的 type 属性
			statement.out().type = statement.expression;
		}
	});
	
	return JSXPropertyNameTag;
}(
	PropertyNameTag.prototype.visitor
);

}.call(
	this,
	this.DotAccessorTag,
	this.PropertyNameTag
);