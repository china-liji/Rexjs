// 模板占位符（模板参数）标签相关
!function(closePlaceHolderTag){

this.PlaceHolderExpression = function(){
	/**
	 * 模板占位符（模板参数）表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function PlaceHolderExpression(open){
		PartnerExpression.call(this, open);
	};
	PlaceHolderExpression = new Rexjs(PlaceHolderExpression, PartnerExpression);

	PlaceHolderExpression.$({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			/*
				追加：
					1. 上个字符串的结束双引号
					2. 字符串拼接的加号
					3. 表达式分组的起始小括号
			*/
			contentBuilder.appendString('"+(');
			// 提取 inner
			this.inner.extractTo(contentBuilder);
			/*
				追加：
					1. 表达式分组的结束小括号
					2. 字符串拼接的加号
					3. 下个字符串的结束双引号
			*/
			contentBuilder.appendString(')+"');
		},
		/**
		 * 提取并参数化表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		parameterizeTo: function(contentBuilder){
			// 追加参数分隔符与起始小括号，小括号是防止逗号表达式被当做参数分隔符
			contentBuilder.appendString(",(");
			// 提取 inner
			this.inner.extractTo(contentBuilder);
			// 结束小括号
			contentBuilder.appendString(")");
		}
	});

	return PlaceHolderExpression;
}();

this.PlaceHolderStatement = function(){
	/**
	 * 模板占位符（模板参数）语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PlaceHolderStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	PlaceHolderStatement = new Rexjs(PlaceHolderStatement, ECMAScriptStatement);

	PlaceHolderStatement.$({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context, ECMAScriptErrors.TEMPLATE);
				return NULL;
			}

			// 跳出语句并设置最近表达式的 inner
			this.out().latest.inner = this.expression;
			// 返回结束标签
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.latest.context.tag;
		}
	});

	return PlaceHolderStatement;
}();

this.OpenPlaceHolderTag = function(OpenBraceTag, PlaceHolderExpression, PlaceHolderStatement){
	/**
	 * 起始模板占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenPlaceHolderTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenPlaceHolderTag = new Rexjs(OpenPlaceHolderTag, OpenBraceTag);

	OpenPlaceHolderTag.$({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closePlaceHolderTag;
		},
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		regexp: /\$\{/,
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
			// 添加表达式
			statement.expression.add(
				new PlaceHolderExpression(context)
			);

			// 设置当前语句
			statements.statement = new PlaceHolderStatement(statements);
		}
	});

	return OpenPlaceHolderTag;
}(
	this.OpenBraceTag,
	this.PlaceHolderExpression,
	this.PlaceHolderStatement
);

this.ClosePlaceHolderTag = function(CloseBraceTag){
	/**
	 * 结束模板占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosePlaceHolderTag(_type){
		CloseBraceTag.call(this, _type);
	};
	ClosePlaceHolderTag = new Rexjs(ClosePlaceHolderTag, CloseBraceTag);

	ClosePlaceHolderTag.$({
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
		visitor: function(parser, context, statement, statements){
			statement.expression.latest.close = context;
		}
	});

	return ClosePlaceHolderTag;
}(
	this.CloseBraceTag
);

closePlaceHolderTag = new this.ClosePlaceHolderTag();

}.call(
	this,
	// closePlaceHolderTag
	NULL
);