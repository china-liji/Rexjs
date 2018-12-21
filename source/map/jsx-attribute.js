// JSX 属性相关
!function(closingJSXAttributePlaceHolderTag, closingJSXSpreadPlaceHolderTag){

this.JSXAttributeExpression = function(CompiledExpression){
	/**
	 * JSX 属性表达式
	 * @param {Context} context - 标签上下文
	 */
	function JSXAttributeExpression(context){
		Expression.call(this, context);

		this.name = context;
	};
	JSXAttributeExpression = new Rexjs(JSXAttributeExpression, Expression);

	JSXAttributeExpression.props({
		assignment: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder){
			// 追加参数分隔符逗号 与 字符串的起始分号
			contentBuilder.appendString(',"');
			// 追加属性名
			contentBuilder.appendContext(this.name);
			// 追加 字符串的结束分号 与 参数分隔符逗号 及 包括值的起始小括号（以免逗号表达式造成参数的正确）
			contentBuilder.appendString('",(');
			// 提取 value
			this.value.extractTo(contentBuilder);
			// 追加包括值的结束小括号
			contentBuilder.appendString(')');
		},
		name: null,
		value: new CompiledExpression("true")
	});

	return JSXAttributeExpression;
}(
	Rexjs.CompiledExpression
);

this.JSXSpreadAttributeExpression = function(SpreadExpression){
	/**
	 * JSX 拓展属性表达式
	 * @param {Context} context - 标签上下文
	 */
	function JSXSpreadAttributeExpression(context){
		SpreadExpression.call(this, context);
	};
	JSXSpreadAttributeExpression = new Rexjs(JSXSpreadAttributeExpression, SpreadExpression);

	JSXSpreadAttributeExpression.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder){
			// 追加 SpreadItem
			contentBuilder.appendString(",new Rexjs.SpreadItem(");
			// 提取 operand
			this.operand.extractTo(contentBuilder);
			// 追加 SpreadItem 方法的结束小括号 及 属性值
			contentBuilder.appendString("), null");
		}
	});

	return JSXSpreadAttributeExpression;
}(
	this.SpreadExpression
);

this.JSXSpreadStatement = function(SpreadStatement){
	/**
	 * JSX 拓展语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function JSXSpreadStatement(statements){
		SpreadStatement.call(this, statements);
	};
	JSXSpreadStatement = new Rexjs(JSXSpreadStatement, SpreadStatement);

	JSXSpreadStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 JSXSpreadAttributeExpression 的 oprand 属性
			this.out().inner.latest.inner.operand = this.expression;
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.inner.latest.opening.tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 报错
				parser.error(context);
			}
		}
	});

	return JSXSpreadStatement;
}(
	this.SpreadStatement
);

this.JSXAttributeNameTag = function(JSXIdentifierTag, JSXAttributeExpression){
	/**
	 * JSX 属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXAttributeNameTag(_type){
		JSXIdentifierTag.call(this, _type);
	};
	JSXAttributeNameTag = new Rexjs(JSXAttributeNameTag, JSXIdentifierTag);

	JSXAttributeNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxAttributeNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加属性表达式
			statement.expression.inner.add(
				new JSXAttributeExpression(context)
			);
		}
	});

	return JSXAttributeNameTag;
}(
	this.JSXIdentifierTag,
	this.JSXAttributeExpression
);

this.JSXAttributeAssginmentTag = function(BasicAssignmentTag){
	/**
	 * JSX 属性赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXAttributeAssginmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	JSXAttributeAssginmentTag = new Rexjs(JSXAttributeAssginmentTag, BasicAssignmentTag);

	JSXAttributeAssginmentTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxAttributeAssginmentContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 JSXAttributeExpression 的赋值符
			statement.expression.inner.latest.assignment = context;
		}
	});

	return JSXAttributeAssginmentTag;
}(
	this.BasicAssignmentTag
);

this.JSXStringTag = function(StringTag, LiteralExpression){
	/**
	 * JSX 字符串标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXStringTag(_type){
		StringTag.call(this, _type);
	};
	JSXStringTag = new Rexjs(JSXStringTag, StringTag);

	JSXStringTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxTypeContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 JSXAttributeExpression 的值
			statement.expression.inner.latest.value = new LiteralExpression(context);
		}
	});

	return JSXStringTag;
}(
	this.StringTag,
	this.LiteralExpression
);

this.OpeningJSXAttributePlaceHolderTag = function(OpeningJSXPlaceHolderTag, JSXPlaceHolderExpression, JSXPlaceHolderStatement){
	/**
	 * 起始 JSX 属性占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningJSXAttributePlaceHolderTag(_type){
		OpeningJSXPlaceHolderTag.call(this, _type);
	};
	OpeningJSXAttributePlaceHolderTag = new Rexjs(OpeningJSXAttributePlaceHolderTag, OpeningJSXPlaceHolderTag);

	OpeningJSXAttributePlaceHolderTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingJSXAttributePlaceHolderTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 JSXAttributeExpression 的值
			statement.expression.inner.latest.value = new JSXPlaceHolderExpression(context);
			// 设置当前语句
			statements.statement = new JSXPlaceHolderStatement(statements);
		}
	});

	return OpeningJSXAttributePlaceHolderTag;
}(
	this.OpeningJSXPlaceHolderTag,
	this.JSXPlaceHolderExpression,
	this.JSXPlaceHolderStatement
);

this.ClosingJSXAttributePlaceHolderTag = function(ClosingJSXPlaceHolderTag){
	/**
	 * 结束 JSX 属性占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingJSXAttributePlaceHolderTag(_type){
		ClosingJSXPlaceHolderTag.call(this, _type);
	};
	ClosingJSXAttributePlaceHolderTag = new Rexjs(ClosingJSXAttributePlaceHolderTag, ClosingJSXPlaceHolderTag);

	ClosingJSXAttributePlaceHolderTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxTypeContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var jsxPlaceHolderExpression = statement.out().inner.latest.value;

			// 设置 JSXPlaceHolderExpression 的 inner 属性
			jsxPlaceHolderExpression.inner = statement.expression;
			// 设置 JSXPlaceHolderExpression 的 closing 属性
			jsxPlaceHolderExpression.closing = context;
		}
	});

	return ClosingJSXAttributePlaceHolderTag;
}(
	this.ClosingJSXPlaceHolderTag
);

this.OpeningJSXSpreadPlaceHolderTag = function(OpeningJSXAttributePlaceHolderTag, JSXPlaceHolderExpression){
	/**
	 * 起始 JSX 拓展属性占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningJSXSpreadPlaceHolderTag(_type){
		OpeningJSXAttributePlaceHolderTag.call(this, _type);
	};
	OpeningJSXSpreadPlaceHolderTag = new Rexjs(OpeningJSXSpreadPlaceHolderTag, OpeningJSXAttributePlaceHolderTag);

	OpeningJSXSpreadPlaceHolderTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingJSXSpreadPlaceHolderTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxSpreadTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加到 JSXElementExpression 的属性列表之中
			statement.expression.inner.add(
				new JSXPlaceHolderExpression(context)
			);
		}
	});

	return OpeningJSXSpreadPlaceHolderTag;
}(
	this.OpeningJSXAttributePlaceHolderTag,
	this.JSXPlaceHolderExpression
);

this.JSXSpreadTag = function(SpreadTag, JSXSpreadAttributeExpression, JSXSpreadStatement){
	/**
	 * JSX 拓展属性标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXSpreadTag(_type){
		SpreadTag.call(this, _type);
	};
	JSXSpreadTag = new Rexjs(JSXSpreadTag, SpreadTag);

	JSXSpreadTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new JSXSpreadAttributeExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new JSXSpreadStatement(statements);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 JSXPlaceHolderExpression 表达式的 inner
			statement.expression.inner.latest.inner = this.getBoundExpression(context, statement);
			// 设置当前语句
			context.setStatementOf(statements);
		}
	});

	return JSXSpreadTag;
}(
	this.SpreadTag,
	this.JSXSpreadAttributeExpression,
	this.JSXSpreadStatement
);

this.ClosingJSXSpreadPlaceHolderTag = function(ClosingJSXAttributePlaceHolderTag){
	/**
	 * 结束 JSX 拓展属性占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingJSXSpreadPlaceHolderTag(_type){
		ClosingJSXAttributePlaceHolderTag.call(this, _type);
	};
	ClosingJSXSpreadPlaceHolderTag = new Rexjs(ClosingJSXSpreadPlaceHolderTag, ClosingJSXAttributePlaceHolderTag);

	ClosingJSXSpreadPlaceHolderTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 JSXPlaceHolderExpression 表达式的 closing
			statement.expression.inner.latest.closing = context;
		}
	});

	return ClosingJSXSpreadPlaceHolderTag;
}(
	this.ClosingJSXAttributePlaceHolderTag
);

closingJSXAttributePlaceHolderTag = new this.ClosingJSXAttributePlaceHolderTag();
closingJSXSpreadPlaceHolderTag = new this.ClosingJSXSpreadPlaceHolderTag();

}.call(
	this,
	// closingJSXAttributePlaceHolderTag
	null,
	// closingJSXSpreadPlaceHolderTag
	null
);