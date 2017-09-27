// 模板相关
!function(closeTemplateTag){

this.TemplateExpression = function(extractTo, compileItem){
	/**
	 * 模板表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function TemplateExpression(open){
		PartnerExpression.call(this, open);
	};
	TemplateExpression = new Rexjs(TemplateExpression, PartnerExpression);

	TemplateExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 追加起始双引号
				contentBuilder.appendString('"');
				// 直接编译 inner
				this.inner.forEach(compileItem, contentBuilder);
				// 追加结束双引号
				contentBuilder.appendString('"');
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return TemplateExpression;
}(
	PartnerExpression.prototype.extractTo,
	// compileItem
	function(item, contentBuilder){
		item.compileTo(contentBuilder);
	}
);

this.TemplateStatement = function(){
	/**
	 * 模板语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TemplateStatement(statements){
		ECMAScriptStatement.call(this, statements);

		this.expression = new ListExpression(null, "");
	};
	TemplateStatement = new Rexjs(TemplateStatement, ECMAScriptStatement);

	TemplateStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			parser.error(context, ECMAScriptErrors.TEMPLATE);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是反引号
			if(context.content !== "`"){
				return null;
			}

			// 跳出语句并设置模板表达式的 inner
			this.out().inner = this.expression;
			// 返回结束标签
			return this.bindingOf();
		}
	});

	return TemplateStatement;
}();

this.OpenTemplateTag = function(TemplateExpression, TemplateStatement){
	/**
	 * 起始模板标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenTemplateTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenTemplateTag = new Rexjs(OpenTemplateTag, SyntaxTag);

	OpenTemplateTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeTemplateTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new TemplateExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new TemplateStatement(statements);
		},
		regexp: /`/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.templateContentTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});

	return OpenTemplateTag;
}(
	this.TemplateExpression,
	this.TemplateStatement
);

this.CloseTemplateTag = function(){
	/**
	 * 结束模板标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseTemplateTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseTemplateTag = new Rexjs(CloseTemplateTag, SyntaxTag);

	CloseTemplateTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		$type: TYPE_MISTAKABLE,
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		regexp: /`/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.close = context;
		}
	});

	return CloseTemplateTag;
}();

closeTemplateTag = new this.CloseTemplateTag();

}.call(
	this,
	// closeTemplateTag
	null
);