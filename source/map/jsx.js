!function(closingJSXTag){

this.JSXExpression = function(){
	/**
	 * JSX 表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function JSXExpression(opening){
		PartnerExpression.call(this, opening);
	};
	JSXExpression = new Rexjs(JSXExpression, PartnerExpression);

	JSXExpression.props({

	});

	return JSXExpression;
}();

this.OpeningJSXTag = function(JSXExpression){
	/**
	 * 起始 JSX 标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningJSXTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpeningJSXTag = new Rexjs(OpeningJSXTag, SyntaxTag);

	OpeningJSXTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingJSXTag;
		},
		regexp: /\</,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			// return tagsMap.openingJsxContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			debugger
			statement.expression = new JSXExpression(context);
		}
	});

	return OpeningJSXTag;
}(
	this.JSXExpression
);

this.ClosingJSXTag = function(){
	/**
	 * 起始 JSX 标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingJSXTag(_type){
		SyntaxTag.call(this, _type);
	};
	ClosingJSXTag = new Rexjs(ClosingJSXTag, SyntaxTag);

	ClosingJSXTag.props({
		order: ECMAScriptOrders.JSX,
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
			debugger
		}
	});

	return ClosingJSXTag;
}();

this.JSXIdentifierTag = function(IdentifierTag){
	/**
	 * 属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function JSXIdentifierTag(_type){
		IdentifierTag.call(this, _type);
	};
	JSXIdentifierTag = new Rexjs(JSXIdentifierTag, IdentifierTag);

	JSXIdentifierTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.jsxIdentifierContextTags;
		}
	});

	return JSXIdentifierTag;
}(
	this.IdentifierTag
);

closingJSXTag = new this.ClosingJSXTag();

}.call(
	this,
	// closingJSXTag
	null
);