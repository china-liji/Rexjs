// await 表达式相关
!function(TerminatedFlowExpression, YieldTag){

	// array: function(){

	// 	},
	// 	binary: function(expression, contentBuilder){
	// 		debugger
	// 	},
	// if for while 
	// 	bracketAccessor: function(){

	// 	},
	// 	call: function(){

	// 	},
	// 	common: function(){

	// 	},
	// 	grouping: function(){

	// 	},
	// 	property: function(){

	// 	},
	// 	ternary: function(){

	// 	}

this.AwaitBlockExpression = function(){
	/**
	 * await 解析时，所需提升表达式的外层语句块表达式
	 * @param {Statements} statements - 该语句将要所处的语句块
	 * @param {Expression} origin - 被替代的表达式
	 */
	function AwaitBlockExpression(statements, rootStatement, statement){
		var expression, target = statement, list = new ListExpression(NULL, "");

		PartnerExpression.call(this, NULL);

		do {
			// 设置当前语句
			statement = target;
			// 获取 target
			target = target.target;
			// 获取 target 的表达式
			expression = target.expression;

			// 提升表达式
			expression.hoist(list, statements);
		}
		// 如果不是根语句
		while(target !== rootStatement);

		this.basicStatement = statement;
		this.origin = expression;
		this.inner = list;
	};
	AwaitBlockExpression = new Rexjs(AwaitBlockExpression, PartnerExpression);

	AwaitBlockExpression.$({
		/**
		 * 所处语句块中的基础语句，即根语句下的第一个语句
		 * @param {ECMAScriptStatement}
		 */
		basicStatement: NULL,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var inner = this.inner;

			//contentBuilder.appendString("{");

			for(var i = inner.length - 1;i > -1;i--){
				inner[i].hoistTo(contentBuilder);
			}

			this.origin.extractTo(contentBuilder);
			//contentBuilder.appendString("}");
		},
		/**
		 * 被替代的表达式
		 * @type {Expression}
		 */
		origin: NULL
	});

	return AwaitBlockExpression;
}();

this.AwaitExpression = function(generateTo){
	/**
	 * await 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function AwaitExpression(context, statements){
		TerminatedFlowExpression.call(this, context, statements);

		// 如果需要编译 es6
		if(config.es6Base){
			// 记录临时变量
			this.variable = statements.collections.generate();
		}
	};
	AwaitExpression = new Rexjs(AwaitExpression, TerminatedFlowExpression);

	AwaitExpression.$({
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			var variable = this.variable;

			// 提取临时赋值起始代码
			contentBuilder.appendString("(" + variable + "=");
			// 提取返回对象
			this.object.extractTo(contentBuilder);
			// 提取临时赋值结束部分代码
			contentBuilder.appendString(");");

			// 重置 object 属性
			this.object = new CompiledExpression(this.variable);

			// 调用父类方法
			generateTo.call(this, contentBuilder);
		}
	});

	return AwaitExpression;
}(
	TerminatedFlowExpression.prototype.generateTo
);

this.AwaitStatement = function(TerminatedFlowStatement, ExpressionSeparatorTag){
	/**
	 * await 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function AwaitStatement(statements){
		TerminatedFlowStatement.call(this, statements);
	};
	AwaitStatement = new Rexjs(AwaitStatement, TerminatedFlowStatement);

	AwaitStatement.$({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是分隔符标签
			if(context.tag instanceof ExpressionSeparatorTag){
				return this.catch(parser, context);
			}
		}
	});
	
	return AwaitStatement;
}(
	this.TerminatedFlowStatement,
	this.ExpressionSeparatorTag
);

this.AwaitBlockStatement = function(){
	/**
	 * 外层 await 语句块语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function AwaitBlockStatement(statements, rootStatement, expression){
		ECMAScriptStatement.call(this, statements);

		this.target = rootStatement;
		this.expression = expression;
	};
	AwaitBlockStatement = new Rexjs(AwaitBlockStatement, ECMAScriptStatement);

	AwaitBlockStatement.$({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(){
			this.out();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			return this.catch(parser, context);
		}
	});

	return AwaitBlockStatement;
}();

this.AwaitTag = function(AwaitExpression, AwaitBlockExpression, AwaitStatement, AwaitBlockStatement, AsyncStatement, visitor){
	/**
	 * await 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function AwaitTag(_type){
		YieldTag.call(this, _type);
	};
	AwaitTag = new Rexjs(AwaitTag, YieldTag);

	AwaitTag.$({
		/**
		 * 标签类别
		 * @type {Number}
		 */
		$class: CLASS_EXPRESSION,
		/**
		 * 获取上下文中的闭包
		 * @param {Statements} statements - 当前语句块
		 */
		contextClosure: function(statements){
			var closure = statements.closure;

			// 如果有闭包而且存在对应的 async 语句
			if(closure && closure.target.statement.target instanceof AsyncStatement){
				return closure;
			}

			return NULL;
		},
		/**
		 * 错误类别，即 ECMAScriptErrors 中所定义错误的键名
		 * @type {Number}
		 */
		errorType: "AWAIT",
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new AwaitExpression(context, statement.statements);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new AwaitStatement(statements);
		},
		/**
		 * 该标签的匹配正则
		 * @type {RegExp}
		 */
		regexp: /await/,
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
			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);

			return;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 如果需要解析 es6
			if(config.es6Base){
				var rootStatement = statements[statements.length - 1], generator = statements.contextGeneratorIfNeedCompile;

				// 如果不是根语句
				if(statement !== rootStatement){
					var awaitBlockExpression = new AwaitBlockExpression(statements, rootStatement, statement);

					// 重置根语句表达式
					rootStatement.expression = awaitBlockExpression;
					// 修改根语句下面基础语句的 target
					awaitBlockExpression.basicStatement.target = new AwaitBlockStatement(statements, rootStatement, awaitBlockExpression.origin);
				}

				return;
				// 记录临时变量
				statement.expression.variable = statements.collections.generate();

				generator.hoistings.push(
					new CompiledExpression("function bb(){}")
				);
			}
		}
	});

	return AwaitTag;
}(
	this.AwaitExpression,
	this.AwaitBlockExpression,
	this.AwaitStatement,
	this.AwaitBlockStatement,
	this.AsyncStatement,
	YieldTag.prototype.visitor
);

}.call(
	this,
	this.TerminatedFlowExpression,
	this.YieldTag
);