// 函数主体表达式相关
!function(closingFunctionBodyTag){

this.FunctionVariableCollections = function(ECMAScriptVariableCollections){
	/**
	 * 函数变量名收集器集合
	 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
	 */
	function FunctionVariableCollections(prevCollections){
		ECMAScriptVariableCollections.call(this, prevCollections.index, prevCollections);
	};
	FunctionVariableCollections = new Rexjs(FunctionVariableCollections, ECMAScriptVariableCollections);

	FunctionVariableCollections.props({
		/**
		 * 初始化声明变量名
		 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
		 */
		initDeclaration: function(prevCollections){
			this.declaration = prevCollections.declaration;
		}
	});

	return FunctionVariableCollections;
}(
	this.ECMAScriptVariableCollections
);

this.FunctionBodyExpression = function(extractTo, insertDefaults){
	/**
	 * 函数主体语句块表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function FunctionBodyExpression(opening){
		PartnerExpression.call(this, opening);
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
		contentBuilder.appendContext(expression.opening);
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
		contentBuilder.appendContext(expression.closing);
	}
);

this.FunctionBodyStatements = function(ECMAScriptStatements, BraceBodyStatement, FunctionVariableCollections){
	/**
	 * 函数主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function FunctionBodyStatements(target){
		ECMAScriptStatements.call(
			this,
			target,
			new FunctionVariableCollections(
				target.statement.target.expression.arguments.collections
			)
		);
	};
	FunctionBodyStatements = new Rexjs(FunctionBodyStatements, ECMAScriptStatements);
	
	FunctionBodyStatements.props({
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} opening - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context){
			this.applySuper(parser, context);
		},
		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 */
		applyThis: function(){
			// 什么也不做，即默认允许应用
		},
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

			// 如果存在生成器的星号，则返回表达式
			return expression.star ? expression : null;
		},
		/**
		 * 获取当前上下文中需要编译的生成器
		 */
		get contextGeneratorIfNeedCompile(){
			// 如果需要编译，则返回 contextGenerator
			return config.es6Base ? this.contextGenerator : null;
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
	this.BraceBodyStatement,
	this.FunctionVariableCollections
);

this.OpeningFunctionBodyTag = function(OpeningBraceTag, FunctionBodyExpression, FunctionBodyStatements){
	/**
	 * 起始函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningFunctionBodyTag(_type){
		OpeningBraceTag.call(this, _type);
	};
	OpeningFunctionBodyTag = new Rexjs(OpeningFunctionBodyTag, OpeningBraceTag);

	OpeningFunctionBodyTag.props({
		/**
		 * 获取绑定的函数主体结束标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingFunctionBodyTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context){
			return new FunctionBodyExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new BoxStatement(statements);
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 */
		getBoundStatements: function(statements){
			return new FunctionBodyStatements(statements);
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
			// 再设置当前表达式
			context.setExpressionOf(
				// 先设置当前语句
				context.setStatementOf(statements)
			);
			
			// 最后设置当前语句块
			context.setStatementsOf(parser);
		}
	});

	return OpeningFunctionBodyTag;
}(
	this.OpeningBraceTag,
	this.FunctionBodyExpression,
	this.FunctionBodyStatements
);

this.ClosingFunctionBodyTag = function(ClosingBraceTag){
	/**
	 * 结束函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingFunctionBodyTag(_type){
		ClosingBraceTag.call(this, _type);
	};
	ClosingFunctionBodyTag = new Rexjs(ClosingFunctionBodyTag, ClosingBraceTag);

	ClosingFunctionBodyTag.props({
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
			// 设置表达式的 closing
			statement.expression.closing = context;

			// 跳出语句并设置表达式的 body 属性
			statement.out().body = statement.expression;
		}
	});

	return ClosingFunctionBodyTag;
}(
	this.ClosingBraceTag
);

closingFunctionBodyTag = new this.ClosingFunctionBodyTag();

}.call(
	this,
	// closingFunctionBodyTag
	null
);