// yield 表达式相关
!function(TerminatedFlowExpression, SingleStatement, ReturnTag, config){

this.YieldTag = function(visitor, notice){
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
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generator - 相关生成器表达式
		 */
		getGeneratorIndex: function(generator){
			return generator.nextIndex();
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

				// 调用父类方法
				visitor.call(this, parser, context, statement, statements);
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
	ReturnTag.prototype.visitor,
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

				default:
					return;
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
	this.ReturnTag,
	// config
	ECMAScriptConfig.generator
);