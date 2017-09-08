// 函数主体表达式相关
!function(closeFunctionBodyTag){

this.FunctionBodyExpression = function(extractTo, insertDefaults){
	/**
	 * 函数主体语句块表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function FunctionBodyExpression(open){
		PartnerExpression.call(this, open);
	};
	FunctionBodyExpression = new Rexjs(FunctionBodyExpression, PartnerExpression);

	FunctionBodyExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		extractTo: function(contentBuilder, defaultArgumentBuilder){
			var defaults = defaultArgumentBuilder.result;

			// 如果没有默认或省略参数
			if(defaults.length === 0){
				// 直接提取函数主体
				extractTo.call(this, contentBuilder);
				return;
			}
			
			// 插入默认参数
			insertDefaults(contentBuilder, this, defaults);
		},
		state: PartnerExpression.STATE_NONE
	});
	
	return FunctionBodyExpression;
}(
	PartnerExpression.prototype.extractTo,
	// insertDefaults
	function(contentBuilder, expression, defaults){
		var inner = expression.inner, builder = new ContentBuilder();
		
		// 追加起始大括号
		contentBuilder.appendContext(expression.open);
		// 提取第一个表达式至临时生成器
		inner[0].expression.extractTo(builder);

		// 判断临时生成器内容
		switch(builder.result){
			// 如果是 'use strict'
			case "'use strict'":
			// 如果是 "use strict"
			case '"use strict"':
				// 正式提取第一个语句
				inner[0].extractTo(contentBuilder);
				// 追加分号
				contentBuilder.appendString(";");

				// 设置 inner 的最小解析索引为 1，即不再解析第一个语句，从第二语句开始
				inner.min = 1;
				break;
		}

		// 提取默认参数
		contentBuilder.appendString(defaults);
		// 提取函数内部语句
		expression.inner.extractTo(contentBuilder);
		// 追加结束大括号
		contentBuilder.appendContext(expression.close);
	}
);

this.FunctionBodyStatements = function(ECMAScriptStatements, ECMAScriptVariableCollections, BraceBodyStatement, GeneratorExpression, VariableIndex, generatorConfig){
	/**
	 * 函数主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function FunctionBodyStatements(target){
		ECMAScriptStatements.call(
			this,
			target,
			new ECMAScriptVariableCollections(
				new VariableIndex()
			)
		);
	};
	FunctionBodyStatements = new Rexjs(FunctionBodyStatements, ECMAScriptStatements);
	
	FunctionBodyStatements.props({
		/**
		 * 获取当前所处闭包
		 */
		get closure(){
			return this;
		},
		/**
		 * 设置当前所处闭包
		 * @param {Statements} - 需要设置的闭包
		 */
		set closure(value){},
		/**
		 * 获取当前上下文中的生成器
		 */
		get contextGenerator(){
			// 获取函数表达式
			var expression = this.target.statement.target.expression;

			// 如果是生成器表达式，则返回表达式
			return expression instanceof GeneratorExpression ? expression : null;
		},
		/**
		 * 获取当前上下文中需要编译的生成器
		 */
		get contextGeneratorIfNeedCompile(){
			// 如果 需要编译 且 闭包存在，则返回 contextGenerator
			return generatorConfig.value ? this.contextGenerator : null;
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new BraceBodyStatement(this);
		},
		scope: ECMAScriptStatements.SCOPE_CLOSURE
	});
	
	return FunctionBodyStatements;
}(
	this.ECMAScriptStatements,
	this.ECMAScriptVariableCollections,
	this.BraceBodyStatement,
	this.GeneratorExpression,
	Rexjs.VariableIndex,
	// generatorConfig
	ECMAScriptConfig.generator
);

this.OpenFunctionBodyTag = function(OpenBraceTag, FunctionBodyExpression, FunctionBodyStatements, forEach){
	/**
	 * 起始函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenFunctionBodyTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenFunctionBodyTag = new Rexjs(OpenFunctionBodyTag, OpenBraceTag);

	OpenFunctionBodyTag.props({
		/**
		 * 获取绑定的函数主体结束标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeFunctionBodyTag;
		},
		/**
		 * 进入函数主体语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			// 设置当前语句块
			parser.statements = new FunctionBodyStatements(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var declarationCollection;
			
			(
				// 设置当前语句
				statements.statement = new BoxStatement(statements)
			)
			// 设置表达式
			.expression = new FunctionBodyExpression(context);

			// 进入函数主体语句块内部
			this.in(parser, statements);
			
			// 获取函数主体语句块的声明集合，注意：parser.statements 并不就是 statements
			declarationCollection = parser.statements.collections.declaration;

			// 收集参数名到声明集合下
			forEach(
				statement.expression.arguments.collection,
				declarationCollection.collect,
				declarationCollection
			);
		}
	});

	return OpenFunctionBodyTag;
}(
	this.OpenBraceTag,
	this.FunctionBodyExpression,
	this.FunctionBodyStatements,
	Rexjs.forEach
);

this.CloseFunctionBodyTag = function(CloseBraceTag){
	/**
	 * 结束函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseFunctionBodyTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseFunctionBodyTag = new Rexjs(CloseFunctionBodyTag, CloseBraceTag);

	CloseFunctionBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags, parser){
			return (
				// 如果表达式已结束
				(parser.statements.statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED ?
					tagsMap.mistakableTags :
					tagsMap.expressionContextTags
			);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;

			// 跳出语句并设置表达式的 body 属性
			statement.out().body = statement.expression;
		}
	});

	return CloseFunctionBodyTag;
}(
	this.CloseBraceTag
);

closeFunctionBodyTag = new this.CloseFunctionBodyTag();

}.call(
	this,
	// closeFunctionBodyTag
	null
);