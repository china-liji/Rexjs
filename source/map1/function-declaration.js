// 函数声明标签相关
!function(FunctionNameTag){

this.FunctionDeclarationExpression = function(FunctionExpression){
	/**
	 * 函数声明表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FunctionDeclarationExpression(context){
		FunctionExpression.call(this, context);

		this.head = new Expression(context);
	};
	FunctionDeclarationExpression = new Rexjs(FunctionDeclarationExpression, FunctionExpression);

	FunctionDeclarationExpression.props({
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});

	return FunctionDeclarationExpression;
}(
	this.FunctionExpression
);

this.FunctionDeclarationTag = function(FunctionTag, FunctionDeclarationExpression){
	/**
	 * 函数声明标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionDeclarationTag(_type){
		FunctionTag.call(this, _type);
	};
	FunctionDeclarationTag = new Rexjs(FunctionDeclarationTag, FunctionTag);

	FunctionDeclarationTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionDeclarationContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var functionDeclarationExpression = new FunctionDeclarationExpression(context), generator = statements.contextGeneratorIfNeedCompile;

			// 如果存在需要编译的生成器
			if(generator){
				// 如果处于当前闭包语句块层级，说明要变量提升
				if(statements === statements.closure){
					// 设置当前表达式为空表达式
					statement.expression = new EmptyExpression(null);

					(
						// 设置当前语句
						statements.statement = new BoxStatement(statements)
					)
					// 设置盒语句的表达式
					.expression = functionDeclarationExpression;

					// 记录变量提升表达式
					generator.hoistings.push(functionDeclarationExpression);
					return;
				}
			}

			// 设置当前表达式
			statement.expression = functionDeclarationExpression;
		}
	});

	return FunctionDeclarationTag;
}(
	this.FunctionTag,
	this.FunctionDeclarationExpression
);

this.FunctionDeclarationStarTag = function(StarTag){
	/**
	 * 函数声明星号标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionDeclarationStarTag(_type){
		StarTag.call(this, _type);
	};
	FunctionDeclarationStarTag = new Rexjs(FunctionDeclarationStarTag, StarTag);

	FunctionDeclarationStarTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionDeclarationStarContextTags;
		}
	});

	return FunctionDeclarationStarTag;
}(
	this.StarTag
);

this.FunctionVariableTag = function(visitor){
	/**
	 * 函数变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionVariableTag(_type){
		FunctionNameTag.call(this, _type);
	};
	FunctionVariableTag = new Rexjs(FunctionVariableTag, FunctionNameTag);

	FunctionVariableTag.props({
		order: ECMAScriptOrders.FUNCTION_VARIABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);
		
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return FunctionVariableTag;
}(
	FunctionNameTag.prototype.visitor
);

}.call(
	this,
	this.FunctionNameTag
);