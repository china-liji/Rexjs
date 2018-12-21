// JSX 基本相关
!function(closingJSXElementTag){

this.JSXExpression = function(){
	/**
	 * JSX 表达式
	 */
	function JSXExpression(){
		Expression.call(this, null);
	};
	JSXExpression = new Rexjs(JSXExpression, Expression);

	JSXExpression.props({
		closingElement: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder){
			this.openingElement.extractTo(contentBuilder);
		},
		openingElement: null
	});

	return JSXExpression;
}();

this.JSXElementExpression = function(CHAR_CODE_A, CHAR_CODE_Z, extractAttribute){
	/**
	 * JSX 元素表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function JSXElementExpression(opening){
		PartnerExpression.call(this, opening);

		this.inner = new ListExpression(null, ",");
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
			var type = this.type;

			contentBuilder.appendString("new Rexjs.JSX(");

			if(this.isAccessorType){
				type.extractTo(contentBuilder);
			}
			else {
				var typeContent = type.content, charCode = typeContent.charCodeAt(0);

				// 如果名称中包含 "-" 符号 或者 首字母属在 a-z 之中
				if(this.hasJoinChar || (charCode >= CHAR_CODE_A && charCode <= CHAR_CODE_Z)){
					contentBuilder.appendString('"');
					contentBuilder.appendContext(type);
					contentBuilder.appendString('"');
				}
				else {
					contentBuilder.appendContext(type);
				}
			}

			this.inner.forEach(extractAttribute, contentBuilder);
			contentBuilder.appendString(")");
		}
	});

	return JSXElementExpression;
}(
	// CHAR_CODE_A
	"a".charCodeAt(0),
	// CHAR_CODE_Z
	"z".charCodeAt(0),
	// extractAttribute
	function(attribute, contentBuilder){
		attribute.extractTo(contentBuilder);
	}
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
			debugger
		}
	});

	return JSXStatement;
}();

this.OpeningJSXElementTag = function(JSXElementExpression){
	/**
	 * 起始 JSX 标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningJSXElementTag(_type){
		SyntaxTag.call(this, _type);
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
		regexp: /</,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openingJsxContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new JSXElementExpression(context);
		}
	});

	return OpeningJSXElementTag;
}(
	this.JSXElementExpression
);

this.JSXSelfClosingBackslashTag = function(){
	/**
	 * JSX 元素快速结束斜杠标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXSelfClosingBackslashTag(_type){
		SyntaxTag.call(this, _type);
	};
	JSXSelfClosingBackslashTag = new Rexjs(JSXSelfClosingBackslashTag, SyntaxTag);

	JSXSelfClosingBackslashTag.props({
		regexp: /\//,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxSelfClosingBackslashContextTags;
		}
	});

	return JSXSelfClosingBackslashTag;
}();

this.ClosingJSXElementTag = function(){
	/**
	 * 起始 JSX 标签
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
			return tagsMap.statementTags;
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

this.JSXSelfClosingElementTag = function(ClosingJSXElementTag){
	/**
	 * JSX 自结束标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXSelfClosingElementTag(_type){
		ClosingJSXElementTag.call(this, _type);
	};
	JSXSelfClosingElementTag = new Rexjs(JSXSelfClosingElementTag, ClosingJSXElementTag);

	JSXSelfClosingElementTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		}
	});

	return JSXSelfClosingElementTag;
}(
	this.ClosingJSXElementTag
);

closingJSXElementTag = new this.ClosingJSXElementTag();

}.call(
	this,
	// jsxSelfClosingBackslashTag
	null,
	// closingJSXElementTag
	null
);