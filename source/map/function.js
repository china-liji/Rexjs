// 函数表达式相关
!function(extractTo, appendVariable){

this.FunctionExpression = function(config, appendRange, compileBody){
	/**
	 * 函数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FunctionExpression(context){
		Expression.call(this, context);
	};
	FunctionExpression = new Rexjs(FunctionExpression, Expression);

	FunctionExpression.props({
		arguments: null,
		body: null,
		/**
		 * 获取当前索引字符串
		 */
		get currentIndexString(){
			return this.variable + ".index.current";
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var defaultArgumentBuilder = new ContentBuilder();

			// 提取函数头部
			this.head.extractTo(contentBuilder);

			// 如果存在星号，说明是生成器
			if(this.star){
				// 如果需要编译
				if(config.value){
					var inner = this.body.inner, collections = inner.collections;

					this.variable = collections.generate();

					// 提取函数名称
					this.name.extractTo(contentBuilder);
					// 提取函数参数
					this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);

					// 追加临时变量名的声明
					contentBuilder.appendString(
						"{var " + collections.rex.toString("", ",", "")
					);
					
					// 追加生成器内部的变量名声明
					this.ranges.forEach(appendRange, contentBuilder);
					// 编译主体代码
					compileBody(this, defaultArgumentBuilder, inner, contentBuilder);
					return;
				}

				// 追加星号上下文
				contentBuilder.appendContext(this.star);
			}
			
			// 提取函数名称
			this.name.extractTo(contentBuilder);
			// 提取函数参数
			this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);
			// 提取函数主体
			this.body.extractTo(contentBuilder, defaultArgumentBuilder);
		},
		head: null,
		index: 0,
		name: new DefaultExpression(),
		/**
		 * 设置下一个索引
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		nextIndex: function(contentBuilder){
			return ++this.index;
		},
		ranges: null,
		star: null,
		/**
		 * 转化为生成器
		 * @param {Context} star - 生成器星号上下文
		 */
		toGenerator: function(star){
			this.star = star;
			this.ranges = [];
		},
		variable: ""
	});

	return FunctionExpression;
}(
	// config
	ECMAScriptConfig.addBaseConfig("generator"),
	// appendRange
	function(range){
		range.forEach(appendVariable, this);
	},
	// compileBody
	function(expression, defaultArgumentBuilder, inner, contentBuilder){
		var variable = expression.variable, currentIndexString = expression.currentIndexString;

		// 追加迭代器代码
		contentBuilder.appendString(
			";" +
			defaultArgumentBuilder.result +
			variable +
			"= new Rexjs.FunctionIterator(function(){for(;;){switch(" +
			currentIndexString +
			"){case " +
			expression.index +
			":"
		);

		// 提取函数主体
		extractTo.call(inner, contentBuilder);
		
		// 追加迭代器结束代码及生成器代码
		contentBuilder.appendString(
			"default:" +
			currentIndexString +
			"=NaN;return void 0;}}},this,arguments);return new Rexjs.Generator(" +
			variable +
			");}"
		);
	}
);

this.FunctionTag = function(FunctionExpression){
	/**
	 * 函数标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionTag(_type){
		SyntaxTag.call(this, _type);
	};
	FunctionTag = new Rexjs(FunctionTag, SyntaxTag);

	FunctionTag.props({
		$class: CLASS_EXPRESSION,
		regexp: /function/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionContextTags;
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
			(
				statement.expression = new FunctionExpression(context)
			)
			// 设置函数表达式头部
			.head = new Expression(context);
		}
	});

	return FunctionTag;
}(
	this.FunctionExpression
);

this.StarTag = function(){
	/**
	 * 星号标签
	 * @param {Number} _type - 标签类型
	 */
	function StarTag(_type){
		SyntaxTag.call(this, _type);
	};
	StarTag = new Rexjs(StarTag, SyntaxTag);

	StarTag.props({
		regexp: /\*/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.starContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 将函数表达式转化为生成器
			statement.expression.toGenerator(context);
		}
	});

	return StarTag;
}();

this.FunctionNameTag = function(VariableDeclarationTag, FunctionDeclarationExpression){
	/**
	 * 函数名标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	FunctionNameTag = new Rexjs(FunctionNameTag, VariableDeclarationTag);

	FunctionNameTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionArgumentTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的名称
			statement.expression.name = new Expression(context);
		}
	});

	return FunctionNameTag;
}(
	this.VariableDeclarationTag,
	this.FunctionDeclarationExpression
);

}.call(
	this,
	Rexjs.Statements.prototype.extractTo,
	// appendVariable
	function(variable, contentBuilder){
		contentBuilder.appendString("," + variable);
	}
);