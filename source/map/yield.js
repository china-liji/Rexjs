// yield 表达式相关
!function(TerminatedFlowExpression, SingleStatement, config){

this.YieldExpression = function(extractTo){
	/**
	 * yield 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {GeneratorExpression} contextGeneratorIfNeedCompile - 需要编译的生成器表达式
	 */
	function YieldExpression(context, contextGeneratorIfNeedCompile){
		TerminatedFlowExpression.call(this, context, contextGeneratorIfNeedCompile);
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
				var generator = this.contextGeneratorIfNeedCompile, index = generator.nextIndex();

				contentBuilder.appendString(
					generator.currentIndexString + "=" + index + ";"
				);

				this.contextGeneratorIfNeedCompile = null; 

				// 调用父类方法
				extractTo.call(this, contentBuilder);

				if((this.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
					contentBuilder.appendString(";");
					
					this.state = STATE_STATEMENT_ENDED;
				}

				contentBuilder.appendString("case " + index + ":");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
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
			var generator = statements.contextGenerator;

			// 如果在生成器内
			if(generator){
				// 如果需要编译
				if(config.value){
					notice(statements, generator);
				}

				// 设置表达式
				statement.expression = new YieldExpression(context, generator);
				
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
	function(statements, generator){
		var closure = statements.closure, target = closure.target;

		while(statements !== target){
			var expression, t = statements.target;

			switch(true){
				case statements.statement instanceof SingleStatement:
					expression = statements.statement.target.expression;
					break;

				case statements !== closure:
					expression = t.statement.expression;
					break;
			}

			expression.contextGeneratorIfNeedCompile = generator;
			statements = t;
		}
	}
);

}.call(
	this,
	this.TerminatedFlowExpression,
	this.SingleStatement,
	// config
	ECMAScriptConfig.generator
);