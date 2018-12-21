// JSX 占位符（参数）相关
!function(closingJSXPlaceHolderTag){

this.JSXPlaceHolderExpression = function(){
	/**
	 * JSX 占位符（参数）表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function JSXPlaceHolderExpression(opening){
		PartnerExpression.call(this, opening);
	};
	JSXPlaceHolderExpression = new Rexjs(JSXPlaceHolderExpression, PartnerExpression);

	JSXPlaceHolderExpression.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder){
			// 直接提取 inner
			this.inner.extractTo(contentBuilder);
		}
	});

	return JSXPlaceHolderExpression;
}();

this.JSXPlaceHolderStatement = function(PlaceHolderStatement){
	/**
	 * JSX 占位符（模板参数）语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function JSXPlaceHolderStatement(statements){
		PlaceHolderStatement.call(this, statements);
	};
	JSXPlaceHolderStatement = new Rexjs(JSXPlaceHolderStatement, PlaceHolderStatement);

	PlaceHolderStatement.props({
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

			// 返回结束标签
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.inner.latest.value.opening.tag;
		}
	});

	return JSXPlaceHolderStatement;
}(
	this.PlaceHolderStatement
);

this.OpeningJSXPlaceHolderTag = function(OpeningPlaceHolderTag, JSXPlaceHolderExpression, JSXPlaceHolderStatement){
	/**
	 * 起始 JSX 占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningJSXPlaceHolderTag(_type){
		OpeningPlaceHolderTag.call(this, _type);
	};
	OpeningJSXPlaceHolderTag = new Rexjs(OpeningJSXPlaceHolderTag, OpeningPlaceHolderTag);

	OpeningJSXPlaceHolderTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingJSXPlaceHolderTag;
		},
		regexp: /\{/,
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

	return OpeningJSXPlaceHolderTag;
}(
	this.OpeningPlaceHolderTag,
	this.JSXPlaceHolderExpression,
	this.JSXPlaceHolderStatement
);

this.ClosingJSXPlaceHolderTag = function(ClosingPlaceHolderTag){
	/**
	 * 结束 JSX 占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingJSXPlaceHolderTag(_type){
		ClosingPlaceHolderTag.call(this, _type);
	};
	ClosingJSXPlaceHolderTag = new Rexjs(ClosingJSXPlaceHolderTag, ClosingPlaceHolderTag);

	ClosingJSXPlaceHolderTag.props({
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

	return ClosingJSXPlaceHolderTag;
}(
	this.ClosingPlaceHolderTag
);

closingJSXPlaceHolderTag = new this.ClosingJSXPlaceHolderTag();

}.call(
	this,
	// closingJSXPlaceHolderTag
	null
);