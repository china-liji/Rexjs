// 对象声明解构赋值相关
!function(closingDeclarationArgumentObjectTag){
	
this.DeclarationArgumentObjectExpression = function(DestructuringAssignmentExpression, CollectionRangeExpression, extractTo, declareVariable){
	/**
	 * 函数参数变量声明数组表达式
	 * @param {SyntaxParser} parser - 语法解析器
	 * @param {DeclarationObjectExpression} declarationObjectExpression - 变量对象声明表达式
	 */
	function DeclarationArgumentObjectExpression(parser, declarationObjectExpression){
		DestructuringAssignmentExpression.call(this, null);

		// 设置左侧表达式
		this.left = declarationObjectExpression.toDestructuring(parser);

		// 如果需要解析 es6
		if(config.es6Base){
			var statements = parser.statements, collections = statements.collections, argumentsExpression = statements.target.statement.target.expression.arguments;

			// 设置变量名
			declarationObjectExpression.setVariableOf(this, statements);

			// 添加普通变量名声明范围
			argumentsExpression.ranges.add(
				this.declarationRange = collections.declaration.range()
			);

			// 添加 rex 变量名声明范围
			argumentsExpression.ranges.add(
				this.rexRange = collections.rex.range()
			);
		}
	};
	DeclarationArgumentObjectExpression = new Rexjs(DeclarationArgumentObjectExpression, DestructuringAssignmentExpression);

	DeclarationArgumentObjectExpression.props({
		/**
		 * 闭合相关变量区间
		 */
		closeAllRanges: function(){
			// 如果需要解析 es6
			if(config.es6Base){
				this.declarationRange.close();
				this.rexRange.close();
			}
		},
		declarationRange: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 如果需要解析 es6
			if(config.es6Base){
				var variable = this.variable, builder = new ContentBuilder();

				// 追加函数参数变量名
				contentBuilder.appendString(variable);
				// 追加后续提取中用到的变量名
				builder.appendString(variable);
				// 追加解构方法
				anotherBuilder.appendString(variable + "=new Rexjs.ObjectDestructuringTarget(" + variable + ")");
				// 提取并编译左侧表达式
				this.left.compileTo(anotherBuilder, builder);
				// 追加分号
				anotherBuilder.appendString(";");
				return;
			}

			// 提取左侧表达式
			this.left.extractTo(contentBuilder, anotherBuilder);
		},
		rexRange: null
	});

	return DeclarationArgumentObjectExpression;
}(
	this.DestructuringAssignmentExpression,
	Rexjs.CollectionRangeExpression,
	this.DestructuringAssignmentExpression.prototype.extractTo,
	// declareVariable
	function(variable, anotherBuilder){
		anotherBuilder.appendString(variable);
	}
);

this.OpeningDeclarationArgumentObjectTag = function(OpeningDeclarationObjectTag, DeclarationArgumentObjectExpression, ECMAScriptStatements, Context, varTag, visitor){
	/**
	 * 函数参数变量声明对象起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningDeclarationArgumentObjectTag(_type){
		OpeningDeclarationObjectTag.call(this, _type);
	};
	OpeningDeclarationArgumentObjectTag = new Rexjs(OpeningDeclarationArgumentObjectTag, OpeningDeclarationObjectTag);

	OpeningDeclarationArgumentObjectTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingDeclarationArgumentObjectTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var declarationObjectExpression, argumentsExpression = statement.target.expression.arguments, collections = argumentsExpression.collections;

			// 设置当前语句块
			parser.statements = statements = new ECMAScriptStatements(statements, collections);
			// 设置语句块的闭包模式
			statements.scope = ECMAScriptStatements.SCOPE_CLOSURE;

			// 调用 var 标签，模拟 var 语句情形，以便使用解构声明
			varTag.visitor(
				parser,
				new Context(
					varTag,
					argumentsExpression.opening.content,
					argumentsExpression.opening.position
				),
				statements.statement,
				statements
			);

			// 调用父类访问器
			visitor.call(this, parser, context, statements.statement, statements);

			// 获取 declarationObjectExpression
			declarationObjectExpression = statements.statement.target.expression;
			// 设置当前语句的表达式
			statement.expression = new DeclarationArgumentObjectExpression(parser, declarationObjectExpression);
			// 取消声明模式，而且必须在最后设置，避免 rex 变量名以 var 声明的形式出现
			declarationObjectExpression.declaration = false;
		}
	});

	return OpeningDeclarationArgumentObjectTag;
}(
	this.OpeningDeclarationObjectTag,
	this.DeclarationArgumentObjectExpression,
	this.ECMAScriptStatements,
	Rexjs.Context,
	// varTag
	new this.VarTag(),
	this.OpeningDeclarationObjectTag.prototype.visitor
);

this.ClosingDeclarationArgumentObjectTag = function(ClosingDeclarationObjectTag, visitor){
	/**
	 * 函数参数结束变量声明对象标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingDeclarationArgumentObjectTag(_type){
		ClosingDeclarationObjectTag.call(this, _type);
	};
	ClosingDeclarationArgumentObjectTag = new Rexjs(ClosingDeclarationArgumentObjectTag, ClosingDeclarationObjectTag);

	ClosingDeclarationArgumentObjectTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			(
				// 设置当前语句块
				parser.statements = statements.target
			)
			.statement
			.expression
			// 关闭所有变量名范围
			.closeAllRanges();
		}
	});

	return ClosingDeclarationArgumentObjectTag;
}(
	this.ClosingDeclarationObjectTag,
	this.ClosingDeclarationObjectTag.prototype.visitor
);

closingDeclarationArgumentObjectTag = new this.ClosingDeclarationArgumentObjectTag();

}.call(
	this,
	// closingDeclarationArgumentObjectTag
	null
);