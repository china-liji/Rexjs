// 父类相关
!function(){

this.SuperExpression = function(LiteralExpression, config){
	/**
	 * super 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SuperExpression(context){
		LiteralExpression.call(this, context);
	};
	SuperExpression = new Rexjs(SuperExpression, LiteralExpression);
	
	SuperExpression.props({
		call: false,
		depth: 1,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译类
			if(config.value){
				// 追加编译后调用 super 的字符串
				contentBuilder.appendString(
					"(Rexjs.Class.superOf(this," + this.depth + "" + (this.call ? ",true" : "") + "))"
				);

				return;
			}
			
			// 追加 super 关键字上下文
			contentBuilder.appendContext(this.context);
		}
	});

	return SuperExpression;
}(
	this.LiteralExpression,
	// config
	ECMAScriptConfig.class
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
			// 跳出当前语句
			var superExpression = this.out();

			switch(context.content){
				// 如果是小括号
				case "(":
					// 表明是调用 super
					superExpression.call = true;
					// 向当前语句块申请调用 super
					superExpression.depth = this.statements.applySuperCall(parser, superExpression.context, context);
					break;

				// 如果是点属性访问器
				case ".":
				// 如果是中括号属性访问器
				case "[":
					// 向当前语句块申请应用 super 关键字
					superExpression.depth = this.statements.applySuper(parser, superExpression.context);
					break;

				default:
					// 借用 catch 来报错
					this.catch(parser, context);
					return null;
			}

			return context.tag;
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
			// 设置当前表达式
			statement.expression = new SuperExpression(context);
			// 设置当前语句
			statements.statement = new SuperStatement(statements);
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