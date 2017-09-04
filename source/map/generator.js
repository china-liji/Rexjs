// 函数生成器符号相关
!function(FunctionExpression, appendVariable){

this.GeneratorHeadExpression = function(){
	/**
	 * 生成器头部表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Context} generator - 生成器标签上下文
	 */
	function GeneratorHeadExpression(context, generator){
		Expression.call(this, context);

		this.generator = generator;
	};
	GeneratorHeadExpression = new Rexjs(GeneratorHeadExpression, Expression);

	GeneratorHeadExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取关键字
			contentBuilder.appendContext(this.context);
			// 提取 *
			contentBuilder.appendContext(this.generator);
		},
		generator: null
	});

	return GeneratorHeadExpression;
}();

this.GeneratorExpression = function(GeneratorHeadExpression, config, extractFunctionExpressionTo, extractStatementsTo, appendRange, setIndex){
	/**
	 * 生成器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Context} generator - 生成器标签上下文
	 */
	function GeneratorExpression(context, generator){
		FunctionExpression.call(this, context);

		this.head = new GeneratorHeadExpression(context, generator);
		this.ranges = [];
	};
	GeneratorExpression = new Rexjs(GeneratorExpression, FunctionExpression);

	GeneratorExpression.props({
		/**
		 * 追加索引值的判断
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		caseIndex: function(contentBuilder){
			contentBuilder.appendString(
				"case " + this.index + ":"
			);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			if(config.value){
				var inner = this.body.inner, collections = inner.collections,
				
					variable = collections.generate(), defaultArgumentBuilder = new ContentBuilder();

				this.variable = variable;

				// 提取 function 关键字
				contentBuilder.appendContext(this.head.context);
				
				// 提取函数名称
				this.name.extractTo(contentBuilder);
				// 提取函数参数
				this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);

				contentBuilder.appendString(
					"{var " + collections.rex.toString("", ",", "")
				);
				
				this.ranges.forEach(appendRange, contentBuilder);
				
				contentBuilder.appendString(
					";" +
					defaultArgumentBuilder.result +
					variable +
					"= new Rexjs.FunctionIterator(function(){for(;;){switch(" +
					variable +
					".index.current){"
				);

				this.caseIndex(contentBuilder);
				// 提取函数主体
				extractStatementsTo.call(inner, contentBuilder);
				
				setIndex(this, contentBuilder, variable + ".index.max");

				contentBuilder.appendString(
					"return;}}},this,arguments);return new Rexjs.Generator(" + variable + ");}"
				);

				debugger

				return;
			}

			extractFunctionExpressionTo.call(this, contentBuilder);
		},
		index: 0,
		/**
		 * 设置下一个索引
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		nextIndex: function(contentBuilder){
			setIndex(this, contentBuilder, ++this.index);
		},
		ranges: null,
		variable: ""
	});

	return GeneratorExpression;
}(
	this.GeneratorHeadExpression,
	// config
	ECMAScriptConfig.addBaseConfig("generator"),
	FunctionExpression.prototype.extractTo,
	Rexjs.Statements.prototype.extractTo,
	// appendRange
	function(range){
		range.forEach(appendVariable, this);
	},
	// setIndex
	function(expression, contentBuilder, index){
		// 追加赋值字符串
		contentBuilder.appendString(
			expression.variable + ".index.current=" + index + ";"
		);
	}
);

this.GeneratorTag = function(GeneratorExpression){
	/**
	 * 函数生成器标签
	 * @param {Number} _type - 标签类型
	 */
	function GeneratorTag(_type){
		SyntaxTag.call(this, _type);
	};
	GeneratorTag = new Rexjs(GeneratorTag, SyntaxTag);

	GeneratorTag.props({
		regexp: /\*/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new GeneratorExpression(statement.expression.context, context);
		}
	});

	return GeneratorTag;
}(
	this.GeneratorExpression
);

}.call(
	this,
	this.FunctionExpression,
	// appendVariable
	function(variable, contentBuilder){
		contentBuilder.appendString("," + variable);
	}
);