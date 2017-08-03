// 模板内容标签相关
~function(LineTerminatorTag, getUnicode){

this.TemplateUnicodeExpression = function(){
	/**
	 * 模板 Unicode 字符编码表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {String} unicode - 标签文本内容的 unicode 字符编码
	 */
	function TemplateUnicodeExpression(context, unicode){
		Expression.call(this, context);

		this.unicode = unicode;
	};
	TemplateUnicodeExpression = new Rexjs(TemplateUnicodeExpression, Expression);

	TemplateUnicodeExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			contentBuilder.appendString("\\u" + this.unicode);
		},
		unicode: "0000"
	});

	return TemplateUnicodeExpression;
}();

this.TemplateContentTag = function(){
	/**
	 * 模板内容标签
	 * @param {Number} _type - 标签类型
	 */
	function TemplateContentTag(_type){
		SyntaxTag.call(this, _type);
	};
	TemplateContentTag = new Rexjs(TemplateContentTag, SyntaxTag);

	TemplateContentTag.props({
		order: ECMAScriptOrders.TEMPLATE_CONTENT,
		regexp: /(?:\\[\s\S]|[^`])+?(?=\$\{|[`"\r\n\u2028\u2029])/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				// 初始化模板字符串表达式
				new Expression(context)
			);
		}
	});

	return TemplateContentTag;
}();

this.TemplateLineTerminatorTag = function(TemplateUnicodeExpression, RegExp, visitor){
	/**
	 * 模板换行符标签
	 * @param {String} char - 指定的换行符
	 * @param {Number} _type - 标签类型
	 */
	function TemplateLineTerminatorTag(char, _type){
		LineTerminatorTag.call(this, _type);

		this.regexp = new RegExp(char);
		this.unicode = getUnicode(char);
	};
	TemplateLineTerminatorTag = new Rexjs(TemplateLineTerminatorTag, LineTerminatorTag);

	TemplateLineTerminatorTag.props({
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				// 初始化 unicode 字符表达式
				new TemplateUnicodeExpression(context, this.unicode)
			);

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		},
		unicode: "0000"
	});

	return TemplateLineTerminatorTag;
}(
	this.TemplateUnicodeExpression,
	RegExp,
	LineTerminatorTag.prototype.visitor
);

this.TemplateQouteTag = function(TemplateUnicodeExpression, UNICODE){
	/**
	 * 模板双引号标签
	 * @param {Number} _type - 标签类型
	 */
	function TemplateQouteTag(_type){
		SyntaxTag.call(this, _type);
	};
	TemplateQouteTag = new Rexjs(TemplateQouteTag, SyntaxTag);

	TemplateQouteTag.props({
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		regexp: /"/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				// 初始化 unicode 字符表达式
				new TemplateUnicodeExpression(context, UNICODE)
			);
		}
	});

	return TemplateQouteTag;
}(
	this.TemplateUnicodeExpression,
	// UNICODE
	getUnicode('"')
);

}.call(
	this,
	Rexjs.LineTerminatorTag,
	// getUnicode
	function(char){
		var unicode = char.charCodeAt(0).toString(16);

		// 根据长度来生成前面的 0
		for(var i = unicode.length;i < 4;i++){
			unicode = "0" + unicode;
		}

		return unicode;
	}
);