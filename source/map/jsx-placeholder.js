// JSX 占位符（参数）相关
!function(closingJSXPlaceHolderTag){

this.JSXPlaceHolderExpression = function(extractTo){
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
		extractTo: function(contentBuilder, _anotherBuilder){
			// 如果需要编译 jsx
			if(config.jsx){
				var inner = this.inner, childrenBuilder = contentBuilder;

				contentBuilder = _anotherBuilder;

				// 追加 childrenBuilder 的内容
				contentBuilder.appendString(childrenBuilder.result + '",');
				// 清除 childrenBuilder 的内容
				childrenBuilder.clear();

				// 如果 inner 不是空表达式
				if(!inner.empty){
					// 追加起始小括号（以免逗号表达式造成参数的正确）
					contentBuilder.appendString("(");
					// 提取内部表达式
					inner.extractTo(contentBuilder);
					// 追加结束小括号与参数分隔符
					contentBuilder.appendString("),");
				}

				// 追加字符串起始双引号
				contentBuilder.appendString('"');
				return;
			}
			
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return JSXPlaceHolderExpression;
}(
	PartnerExpression.prototype.extractTo
);

this.JSXPlaceHolderStatement = function(PlaceHolderStatement){
	/**
	 * JSX 占位符（模板参数）语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function JSXPlaceHolderStatement(statements){
		PlaceHolderStatement.call(this, statements);

		this.expression = new EmptyExpression(null);
	};
	JSXPlaceHolderStatement = new Rexjs(JSXPlaceHolderStatement, PlaceHolderStatement);

	JSXPlaceHolderStatement.props({
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
			return this.target.expression.opening.tag;
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
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new JSXPlaceHolderExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new JSXPlaceHolderStatement(statements);
		},
		regexp: /\{/,
		/**
		 * 添加表达式到
		 * @param {Expression} expression - 当前生成的 JSXPlaceHolderExpression 表达式
		 * @param {Statement} statement - 当前语句
		 */
		setJSXPlaceHolderExpressionTo: function(expression, statement){
			// 添加子表达式
			statement.expression.children.add(expression);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var boxStatement = new BoxStatement(statements), expression = this.getBoundExpression(context, statement);

			// 设置 boxStatement 的表达式
			boxStatement.expression = expression;
			// 设置当前语句为 boxStatement
			statements.statement = boxStatement;
			
			// 添加表达式到列表中
			this.setJSXPlaceHolderExpressionTo(expression, statement);
			// 覆盖当前语句
			context.setStatementOf(statements);
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
			// 跳出 JSXPlaceHolderStatement 语句
			var jsxPlaceHolderExpression = statement.out();

			// 设置 JSXPlaceHolderExpression 的 inner 属性
			jsxPlaceHolderExpression.inner = statement.expression;
			// 设置 JSXPlaceHolderExpression 的 closing 属性
			jsxPlaceHolderExpression.closing = context;

			// 跳出 BoxStatement 语句
			statements.statement.out();
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