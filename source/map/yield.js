// yield 表达式相关
!function(TerminatedFlowExpression, SingleStatement, config){

this.YieldExpression = function(extractTo){
	/**
	 * yield 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {GeneratorExpression} generator - 生成器表达式
	 */
	function YieldExpression(context, generator){
		TerminatedFlowExpression.call(this, context);

		this.generator = generator;
	};
	YieldExpression = new Rexjs(YieldExpression, TerminatedFlowExpression);
	
	YieldExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.value){
				var generator = this.generator;

				generator.nextIndex(contentBuilder);

				// 调用父类方法
				extractTo.call(this, contentBuilder);

				if((this.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
					contentBuilder.appendString(";");
					
					this.state = STATE_STATEMENT_ENDED;
				}

				generator.caseIndex(contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		generator: null
	});
	
	return YieldExpression;
}(
	TerminatedFlowExpression.prototype.extractTo
);

this.YieldTag = function(ReturnTag, YieldExpression, TerminatedFlowStatement, notice){
	/**
	 * yield 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function YieldTag(_type){
		ReturnTag.call(this, _type);
	};
	YieldTag = new Rexjs(YieldTag, ReturnTag);

	YieldTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.value ? "return" : content);
		},
		regexp: /yield/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var generatorExpression = statements.contextGenerator;

			// 如果在生成器内
			if(generatorExpression){
				// 如果需要编译
				if(config.value){
					notice(statements);
				}

				// 设置表达式
				statement.expression = new YieldExpression(context, generatorExpression);
				
				(
					// 设置当前语句
					statements.statement = new TerminatedFlowStatement(statements)
				)
				// 设置表达式为空表达式
				.expression = new EmptyExpression(null);

				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
			);
		}
	});

	return YieldTag;
}(
	this.ReturnTag,
	this.YieldExpression,
	this.TerminatedFlowStatement,
	// notice
	function(statements){
		var closure = statements.closure;

		do {
			debugger

			switch(true){
				case statements.statement instanceof SingleStatement:
					break;
			}

			statements = statements.target;
		}
		while(statements !== closure);
	}
);

}.call(
	this,
	this.TerminatedFlowExpression,
	this.SingleStatement,
	// config
	ECMAScriptConfig.generator
);