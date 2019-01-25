// JSX 基本相关
!function(selfClosingJSXBackslashTag, closingJSXElementTag, closingJSXMatchedElementTag){

this.JSXExpression = function(){
	/**
	 * JSX 表达式
	 */
	function JSXExpression(){
		Expression.call(this, null);

		this.children = new ListExpression(null, "");
	};
	JSXExpression = new Rexjs(JSXExpression, Expression);

	JSXExpression.props({
		children: null,
		closingElement: new DefaultExpression(),
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, _anotherBuilder){
			var childrenBuilder;

			// 如果需要编译 jsx
			if(config.jsx){
				var children = this.children, top = this.top;

				// 如果不是顶层元素
				if(!top){
					childrenBuilder = contentBuilder;
					contentBuilder = _anotherBuilder;

					// 追加 childrenBuilder 的内容
					contentBuilder.appendString(childrenBuilder.result + '",');
					// 清除 childrenBuilder 的内容
					childrenBuilder.clear();
				}

				// 追加实例化 JSXTemplate 代码
				contentBuilder.appendString("new Rexjs.JSXTemplate(");

				// 提取起始元素
				this.openingElement.extractTo(contentBuilder);

				// 如果有子节点
				if(children.length > 0){
					childrenBuilder = new ContentBuilder();

					// 追加子节点参数
					contentBuilder.appendString(',"children",["');
					// 提取子节点
					children.extractTo(childrenBuilder, contentBuilder);
					// 追加一些需要闭合的符号
					contentBuilder.appendString(childrenBuilder.result + '"]');
				}
				
				// 追加 JSXTemplate 的结束小括号
				contentBuilder.appendString(")");

				// 如果不是顶层元素
				if(!top){
					// 追加属性分隔符与字符串起始双引号
					contentBuilder.appendString(',"');
				}
				return;
			}

			// 提取起始元素
			this.openingElement.extractTo(contentBuilder);
			// 提取子节点
			this.children.extractTo(contentBuilder);
			// 提取闭合元素
			this.closingElement.extractTo(contentBuilder);
		},
		hasChildElements: false,
		openingElement: null,
		top: true
	});

	return JSXExpression;
}();

this.JSXElementExpression = function(CHAR_CODE_A, CHAR_CODE_Z){
	/**
	 * JSX 元素表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function JSXElementExpression(opening){
		PartnerExpression.call(this, opening);

		this.inner = new ListExpression(null, " ");
	};
	JSXElementExpression = new Rexjs(JSXElementExpression, PartnerExpression);

	JSXElementExpression.props({
		hasJoinChar: false,
		isAccessorType: false,
		type: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder){
			var type = this.type, inner = this.inner;

			// 如果需要编译 jsx
			if(config.jsx){
				inner.join = ",";

				// 如果是访问器元素类型
				if(this.isAccessorType){
					// 直接提取 type
					type.extractTo(contentBuilder);
				}
				else {
					var typeContent = type.content, charCode = typeContent.charCodeAt(0);

					// 如果名称中包含 "-" 符号 或者 首字母属在 a-z 之中
					if(this.hasJoinChar || (charCode >= CHAR_CODE_A && charCode <= CHAR_CODE_Z)){
						// 追加起始字符串的双引号
						contentBuilder.appendString('"');
						// 追加字符串内容
						contentBuilder.appendContext(type);
						// 追加闭合字符串的双引号
						contentBuilder.appendString('"');
					}
					else {
						// 追加变量名
						contentBuilder.appendContext(type);
					}
				}

				// 如果有属性
				if(inner.length > 0){
					// 追加属性分隔符逗号
					contentBuilder.appendString(",");
					// 提取元素属性
					inner.extractTo(contentBuilder);
				}
				
				return;
			}

			// 追加起始尖括号
			contentBuilder.appendContext(this.opening);
			
			// 如果是访问器元素类型
			if(this.isAccessorType){
				// 直接提取 type
				type.extractTo(contentBuilder);
			}
			else {
				// 追加 type
				contentBuilder.appendContext(type);
			}

			// 追加空格
			contentBuilder.appendString(" ");
			// 提取元素属性
			inner.extractTo(contentBuilder);
			// 追加闭合尖括号
			contentBuilder.appendContext(this.closing);
		}
	});

	return JSXElementExpression;
}(
	// CHAR_CODE_A
	"a".charCodeAt(0),
	// CHAR_CODE_Z
	"z".charCodeAt(0)
);

this.JSXStatement = function(){
	/**
	 * JSX 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function JSXStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	JSXStatement = new Rexjs(JSXStatement, ECMAScriptStatement);

	JSXStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果是不标签结束符
			if(context.content !== ">"){
				// 报错
				parser.error(context);
				return null;
			}

			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.expression.opening.tag;
		}
	});

	return JSXStatement;
}();

this.OpeningJSXElementTag = function(JSXExpression, JSXElementExpression, JSXStatement){
	/**
	 * 起始 JSX 元素标签
	 * @param {Number} _type - 标签类型
	 * @param {Boolean} _isChild - 是否为最子节点 JSX 元素
	 */
	function OpeningJSXElementTag(_type, _isChild){
		SyntaxTag.call(this, _type);

		this.isChild = !!_isChild;
	};
	OpeningJSXElementTag = new Rexjs(OpeningJSXElementTag, SyntaxTag);

	OpeningJSXElementTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingJSXElementTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new JSXExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new JSXStatement(statements);
		},
		isChild: false,
		regexp: /<(?!\s*\/)/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openingJsxContextTags;
		},
		/**
		 * 获取绑定的 selfClosingJSXBackslash 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get selfClosingJSXBackslash(){
			return selfClosingJSXBackslashTag;
		},
		/**
		 * 设置 JSXExpression 表达式所关联的 openingElement 或 closingElement 属性
		 * @param {JSXExpression} jsxExpression - JSXExpression 表达式
		 * @param {JSXElementExpression} jsxElementExpression - JSXElementExpression 表达式
		 */
		setElementToJSXExpression: function(jsxExpression, jsxElementExpression){
			jsxExpression.openingElement = jsxElementExpression;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression, isChild = this.isChild, jsxElementExpression = new JSXElementExpression(context);

			// 如果是子节点元素
			if(isChild){
				// 设置顶层 JSXExpression 的 hasChildElements 属性，表示有子元素节点
				statement.expression.hasChildElements = true;

				// 初始化 BoxStatement 语句
				statement = new BoxStatement(statements);
				// 设置当前语句
				statements.statement = statement;
			}

			// 调用公共的 visitor
			commonVisitor(parser, context, statement, statements);
			
			// 设置 JSXStatement 语句的表达式
			statements.statement.expression = jsxElementExpression;
			// 获取 JSXExpression
			expression = statement.expression;

			// 设置 JSXExpression 表达式所关联的 openingElement 或 closingElement 属性
			this.setElementToJSXExpression(expression, jsxElementExpression);

			// 如果是子节点元素
			if(isChild){
				// 设置 JSXExpression 的 top 属性，表示不是最顶层元素
				expression.top = false;
				// 添加子表达式
				statement.target.expression.children.add(expression);
			}
		}
	});

	return OpeningJSXElementTag;
}(
	this.JSXExpression,
	this.JSXElementExpression,
	this.JSXStatement
);

this.SelfClosingJSXBackslashTag = function(){
	/**
	 * JSX 元素自闭合斜杠标签
	 * @param {Number} _type - 标签类型
	 */
	function SelfClosingJSXBackslashTag(_type){
		SyntaxTag.call(this, _type);
	};
	SelfClosingJSXBackslashTag = new Rexjs(SelfClosingJSXBackslashTag, SyntaxTag);

	SelfClosingJSXBackslashTag.props({
		regexp: /\/(?=\s*>)/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxSelfClosingBackslashContextTags;
		}
	});

	return SelfClosingJSXBackslashTag;
}();

this.ClosingJSXElementTag = function(){
	/**
	 * 闭合 JSX 元素标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingJSXElementTag(_type){
		SyntaxTag.call(this, _type);
	};
	ClosingJSXElementTag = new Rexjs(ClosingJSXElementTag, SyntaxTag);

	ClosingJSXElementTag.props({
		regexp: />/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxChildTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 JSXElementExpression 的 closing 属性
			statement.expression.closing = context;

			// 跳出 JSXStatement 语句
			statement.out();
		}
	});

	return ClosingJSXElementTag;
}();

this.OpeningJSXMatchedElementTag = function(OpeningJSXElementTag){
	/**
	 * 起始 JSX 闭合标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningJSXMatchedElementTag(_type){
		OpeningJSXElementTag.call(this, _type);
	};
	OpeningJSXMatchedElementTag = new Rexjs(OpeningJSXMatchedElementTag, OpeningJSXElementTag);

	OpeningJSXMatchedElementTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingJSXMatchedElementTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return statement.expression;
		},
		regexp: /<(?=\s*\/)/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxMatchedBackslashTags;
		},
		/**
		 * 获取绑定的 selfClosingJSXBackslash 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get selfClosingJSXBackslash(){
			return null;
		},
		/**
		 * 设置 JSXExpression 表达式所关联的 openingElement 或 closingElement 属性
		 * @param {JSXExpression} jsxExpression - JSXExpression 表达式
		 * @param {JSXElementExpression} jsxElementExpression - JSXElementExpression 表达式
		 */
		setElementToJSXExpression: function(jsxExpression, jsxElementExpression){
			jsxExpression.closingElement = jsxElementExpression;
		}
	});

	return OpeningJSXMatchedElementTag;
}(
	this.OpeningJSXElementTag
);

this.JSXMatchedBackslashTag = function(SelfClosingJSXBackslashTag){
	/**
	 * JSX 元素闭合斜杠标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXMatchedBackslashTag(_type){
		SelfClosingJSXBackslashTag.call(this, _type);
	};
	JSXMatchedBackslashTag = new Rexjs(JSXMatchedBackslashTag, SelfClosingJSXBackslashTag);

	JSXMatchedBackslashTag.props({
		regexp: /\//,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openingJsxContextTags;
		}
	});

	return JSXMatchedBackslashTag;
}(
	this.SelfClosingJSXBackslashTag
);

this.ClosingJSXMatchedElementTag = function(ClosingJSXElementTag, visitor){
	/**
	 * 结束 JSX 闭合标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingJSXMatchedElementTag(_type){
		ClosingJSXElementTag.call(this, _type);
	};
	ClosingJSXMatchedElementTag = new Rexjs(ClosingJSXMatchedElementTag, ClosingJSXElementTag);

	ClosingJSXMatchedElementTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return statements.statement;
		},
		/**
		 * 检查是否有属性存在
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statement} statement - 当前语句
		 */
		hasAttribute: function(parser, statement){
			var expression = statement.expression;

			// 如果闭合元素有属性
			if(expression.inner.length === 0){
				return;
			}

			// 报错
			parser.error(expression.inner[0].context);
		},
		/**
		 * 校对元素类型
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		matchType: function(parser, context, statement){
			var content,
			
				openingElement = statement.target.expression.openingElement,

				closingElement = statement.expression,
				
				isAccessorType1 = openingElement.isAccessorType,
				
				isAccessorType2 = closingElement.isAccessorType;

			// 如果都是访问器类型
			if(isAccessorType1 && isAccessorType2){
				var contentBuilder1 = new ContentBuilder(), contentBuilder2 = new ContentBuilder();

				// 提取 openingElement 的类型字符串
				openingElement.type.extractTo(contentBuilder1);
				// // 提取 closingElement 的类型字符串
				closingElement.type.extractTo(contentBuilder2);

				content = contentBuilder1.result;

				// 如果一致
				if(content === contentBuilder2.result){
					return;
				}
			}
			// 如果都不是访问器类型，即都为字面量类型
			else if(!isAccessorType1 && !isAccessorType2){
				content = openingElement.type.content;

				// 如果一致
				if(content === closingElement.type.content){
					return;
				}
			}

			// 报错
			parser.error(
				closingElement.opening,
				ECMAScriptErrors.template("JSX_CLOSING_TAG", content)
			);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags, parser){
			var jsxExpression = parser.statements.statement.expression;

			switch(false){
				// 如果没有子元素
				case jsxExpression.hasChildElements:
					break;

				// 如果没有闭合标签，即为 自闭合元素
				case jsxExpression.closingElement.default:
					break;

				/*
					如果有子元素而且暂时还没有闭合标签，说明不是自闭合元素
					而且闭合标签还没有解析到
					那肯定就是刚刚匹配完“子元素”并跳出的 BoxStatement 语句，
					该 ClosingJSXMatchedElementTag 为子元素的闭合标记，
					而不是外层元素的闭合标记
				*/
				default:
					return tagsMap.jsxChildTags;
			}

			// 如果是最外层元素的闭合标记
			return tagsMap.closingJSXMatchedElementContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 检查是否有属性存在
			this.hasAttribute(parser, statement);
			// 校对类型
			this.matchType(parser, context, statement);

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 如果是顶层 JSXExpression
			if(statements.statement.expression.top){
				return;
			}
			
			// 跳出 BoxStatement 语句
			statements.statement.out();
		}
	});

	return ClosingJSXMatchedElementTag;
}(
	this.ClosingJSXElementTag,
	this.ClosingJSXElementTag.prototype.visitor
);

this.SelfClosingJSXElementTag = function(ClosingJSXMatchedElementTag){
	/**
	 * JSX 自闭合标签
	 * @param {Number} _type - 标签类型
	 */
	function SelfClosingJSXElementTag(_type){
		ClosingJSXMatchedElementTag.call(this, _type);
	};
	SelfClosingJSXElementTag = new Rexjs(SelfClosingJSXElementTag, ClosingJSXMatchedElementTag);

	SelfClosingJSXElementTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 如果不需要编译 jsx
			if(!config.jsx){
				// 追加标签内容
				contentBuilder.appendString("/");
			}

			// 追加标签内容
			contentBuilder.appendString(content);
		},
		/**
		 * 检查是否有属性存在
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statement} statement - 当前语句
		 */
		hasAttribute: function(){},
		/**
		 * 校对元素类型
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		matchType: function(){}
	});

	return SelfClosingJSXElementTag;
}(
	this.ClosingJSXMatchedElementTag
);

this.OpeningJSXAdjacentElementTag = function(OpeningJSXElementTag){
	/**
	 * 起始 JSX 相邻元素标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningJSXAdjacentElementTag(_type){
		OpeningJSXElementTag.call(this, _type);
	};
	OpeningJSXAdjacentElementTag = new Rexjs(OpeningJSXAdjacentElementTag, OpeningJSXElementTag);

	OpeningJSXAdjacentElementTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		$type: TYPE_MISTAKABLE,
		order: ECMAScriptOrders.JSX_ADJACENT_ELEMENT,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 直接报错
			parser.error(context, ECMAScriptErrors.JSX_ADJACENT_ELEMENT);
		}
	});

	return OpeningJSXAdjacentElementTag;
}(
	this.OpeningJSXElementTag
);

selfClosingJSXBackslashTag = new this.SelfClosingJSXBackslashTag();
closingJSXElementTag = new this.ClosingJSXElementTag();
closingJSXMatchedElementTag = new this.ClosingJSXMatchedElementTag();

}.call(
	this,
	// selfClosingJSXBackslashTag
	null,
	// closingJSXElementTag
	null,
	// closingJSXMatchedElementTag
	null
);