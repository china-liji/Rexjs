// 父类相关
!function(){

this.SuperExpression = function(LiteralExpression){
	/**
	 * super 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SuperExpression(context){
		LiteralExpression.call(this, context);
	};
	SuperExpression = new Rexjs(SuperExpression, LiteralExpression);
	
	SuperExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 直接追加属性拥有者临时变量
				contentBuilder.appendString(this.propertyOwner);
				return;
			}
			
			// 追加 super 关键字上下文
			contentBuilder.appendContext(this.context);
		},
		propertyOwner: ""
	});

	return SuperExpression;
}(
	this.LiteralExpression
);

this.SuperStatement = function(){
	/**
	 * super 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SuperStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SuperStatement = new Rexjs(SuperStatement, ECMAScriptStatement);

	SuperStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var superExpression = this.out();

			// 报错
			parser.error(
				superExpression.context,
				ECMAScriptErrors.template("KEYWORD", superExpression.context.content)
			);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果标签是可误解的
			if(context.tag.type.mistakable){
				// 跳出语句
				this.out();
				return;
			}

			// 借用 catch 来报错
			this.catch(parser, context);
		}
	});

	return SuperStatement;
}();

this.SuperTag = function(LiteralTag, SuperExpression, SuperStatement){
	/**
	 * super 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperTag(_type){
		LiteralTag.call(this, _type);
	};
	SuperTag = new Rexjs(SuperTag, LiteralTag);

	SuperTag.props({
		$class: CLASS_EXPRESSION,
		regexp: /super/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var closure = statements.closure;

			// 如果存在闭包
			if(closure){
				var superExpression = new SuperExpression(context), targetStatements = closure.target, propertyStatement = targetStatements.statement.target.target;

				// 如果需要编译
				if(config.es6Base){
					// 记录拥有者变量名
					superExpression.propertyOwner = propertyStatement.expression.requestVariableOf(
						targetStatements,
						propertyStatement.target.expression
					);
				}

				// 设置当前表达式
				statement.expression = superExpression;
				// 设置当前语句
				statements.statement = new SuperStatement(statements);
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);
		}
	});

	return SuperTag;
}(
	this.LiteralTag,
	this.SuperExpression,
	this.SuperStatement
);

}.call(
	this
);