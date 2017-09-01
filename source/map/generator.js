// 函数生成器符号相关
!function(FunctionExpression){

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

this.GeneratorExpression = function(GeneratorHeadExpression, config, extractTo){
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

	GeneratorExpression.static({
		/**
		 * 判断指定闭包是否为生成器闭包且将要被编译
		 * @param {FunctionBodyStatements} closure - 需要判断的闭包
		 * @param {CollectionRange} _range - 需要记录的变量收集器范围
		 */
		willCompile: function(closure, _range){
			// 如果闭包存在
			if(closure){
				var expression = closure.target.statement.target.expression;

				// 如果是生成器表达式
				if(expression instanceof GeneratorExpression){
					// 如果变量收集器范围存在
					if(_range){
						// 添加变量收集器范围
						expression.ranges.push(_range);
					}
					
					// 返回是否需要编译
					return config.value;
				}
			}

			return false;
		}
	});

	GeneratorExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			if(config.value){
				var str = [];

				this.ranges.forEach(function(range){
					range.forEach(function(variable){
						str.push(variable);
					})
				});

				debugger

				return;
			}

			extractTo.call(this, contentBuilder);
		},
		ranges: null
	});

	return GeneratorExpression;
}(
	this.GeneratorHeadExpression,
	// config
	ECMAScriptConfig.addBaseConfig("generator"),
	FunctionExpression.prototype.extractTo
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
	this.FunctionExpression
);