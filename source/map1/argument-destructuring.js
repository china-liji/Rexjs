// 函数参数解构赋值相关
!function(
	ArgumentDestructuringExpression, ArgumentsDestructuringStatements, OpeningDeclarationObjectTag, OpeningDeclarationArrayTag, ClosingDeclarationObjectTag, ClosingDeclarationArrayTag,
	varTag, closingArgumentObjectDestructuringTag, closingArgumentArrayDestructuringTag,
	openingTagVisitor, closingTagVisitor
){

openingTagVisitor = function(Context){
	/**
	 * 函数参数起始标签访问器
	 * @param {SyntaxTag} tag - 语法标签
	 * @param {Function} superVisitor - 语法标签的父类访问器函数
	 * @param {SyntaxParser} parser - 语法解析器
	 * @param {Context} context - 标签上下文
	 * @param {Statement} statement - 当前语句
	 * @param {Statements} statements - 当前语句块
	 */
	return function(tag, superVisitor, parser, context, statement, statements){
		var destructibleExpression, argumentsExpression = statement.target.expression.arguments;

		// 设置当前语句块
		parser.statements = statements = new ArgumentsDestructuringStatements(statements, argumentsExpression);

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
		superVisitor.call(tag, parser, context, statements.statement, statements);

		// 获取 destructibleExpression
		destructibleExpression = statements.statement.target.expression;
		// 设置当前语句的表达式
		statement.expression = new ArgumentDestructuringExpression(parser, argumentsExpression, destructibleExpression);
	};
}(
	Rexjs.Context
);

closingTagVisitor = function(){
	/**
	 * 函数参数起始标签访问器
	 * @param {SyntaxTag} tag - 语法标签
	 * @param {Function} superVisitor - 语法标签的父类访问器函数
	 * @param {SyntaxParser} parser - 语法解析器
	 * @param {Context} context - 标签上下文
	 * @param {Statement} statement - 当前语句
	 * @param {Statements} statements - 当前语句块
	 */
	return function(tag, superVisitor, parser, context, statement, statements){
		// 调用父类方法
		superVisitor.call(tag, parser, context, statement, statements);

		(
			// 设置当前语句块
			parser.statements = statements.target
		)
		.statement
		.expression
		// 关闭所有变量名范围
		.closeAllRanges();
	};
}();
	
this.ArgumentDestructuringExpression = ArgumentDestructuringExpression = function(DestructuringAssignmentExpression, ObjectExpression, DeclarationObjectExpression, CollectionRangeExpression, extractTo, declareVariable){
	/**
	 * 函数参数解构赋值表达式
	 * @param {SyntaxParser} parser - 语法解析器
	 * @param {ArgumentsExpression} argumentsExpression - 函数参数列表表达式
	 * @param {Expression} destructibleExpression - 可解构变量声明表达式
	 */
	function ArgumentDestructuringExpression(parser, argumentsExpression, destructibleExpression){
		DestructuringAssignmentExpression.call(this, null);

		// 如果需要解析 es6
		if(config.es6Base){
			var collections = argumentsExpression.collections;

			// 设置变量名
			destructibleExpression.setVariableOf(this, parser.statements);

			// 添加普通变量名声明范围
			argumentsExpression.ranges.add(
				this.declarationRange = collections.declaration.range()
			);

			// 添加 rex 变量名声明范围
			argumentsExpression.ranges.add(
				this.rexRange = collections.rex.range()
			);
		}

		// 将表达式设置为声明形式，因为箭头函数参数里的对象、数组解构当前并不是以声明形式存在的
		destructibleExpression.declaration = true;
		// 设置左侧表达式
		this.left = destructibleExpression.toDestructuring(parser, varTag);
		// 判断是否为对象解构
		this.isObjectDestructuring = destructibleExpression instanceof ObjectExpression;
		// 取消声明模式，而且必须在最后设置，避免 rex 变量名以 var 声明的形式出现
		destructibleExpression.declaration = false;

		this.closeAllRanges();
	};
	ArgumentDestructuringExpression = new Rexjs(ArgumentDestructuringExpression, DestructuringAssignmentExpression);

	ArgumentDestructuringExpression.props({
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
				// 向另一个内容生成器追加变量名
				anotherBuilder.appendString(variable);

				// 如果是对象解构
				if(this.isObjectDestructuring){
					// 追加解构方法
					anotherBuilder.appendString("=new Rexjs.ObjectDestructuringTarget(" + variable + ")");
				}
				
				// 提取并编译左侧表达式
				this.left.compileTo(anotherBuilder, builder);
				// 追加分号
				anotherBuilder.appendString(";");
				return;
			}

			// 提取左侧表达式
			this.left.extractTo(contentBuilder, anotherBuilder);
		},
		isObjectDestructuring: false,
		rexRange: null
	});

	return ArgumentDestructuringExpression;
}(
	this.DestructuringAssignmentExpression,
	this.ObjectExpression,
	this.DeclarationObjectExpression,
	Rexjs.CollectionRangeExpression,
	this.DestructuringAssignmentExpression.prototype.extractTo,
	// declareVariable
	function(variable, anotherBuilder){
		anotherBuilder.appendString(variable);
	}
);

this.ArgumentsDestructuringStatements = ArgumentsDestructuringStatements = function(ECMAScriptStatements){
	/**
	 * 函数参数列表解构语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function ArgumentsDestructuringStatements(target, argumentsExpression){
		ECMAScriptStatements.call(this, target, argumentsExpression.collections);
	};
	ArgumentsDestructuringStatements = new Rexjs(ArgumentsDestructuringStatements, ECMAScriptStatements);
	
	ArgumentsDestructuringStatements.props({
		scope: ECMAScriptStatements.SCOPE_CLOSURE
	});

	return ArgumentsDestructuringStatements;
}(
	this.ECMAScriptStatements
);

this.OpeningArgumentObjectDestructuringTag = function(visitor){
	/**
	 * 函数参数对象解构起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningArgumentObjectDestructuringTag(_type){
		OpeningDeclarationObjectTag.call(this, _type);
	};
	OpeningArgumentObjectDestructuringTag = new Rexjs(OpeningArgumentObjectDestructuringTag, OpeningDeclarationObjectTag);

	OpeningArgumentObjectDestructuringTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingArgumentObjectDestructuringTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			openingTagVisitor(this, visitor, parser, context, statement, statements);
		}
	});

	return OpeningArgumentObjectDestructuringTag;
}(
	OpeningDeclarationObjectTag.prototype.visitor
);

this.ClosingArgumentObjectDestructuringTag = function(visitor){
	/**
	 * 函数参数对象解构结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingArgumentObjectDestructuringTag(_type){
		ClosingDeclarationObjectTag.call(this, _type);
	};
	ClosingArgumentObjectDestructuringTag = new Rexjs(ClosingArgumentObjectDestructuringTag, ClosingDeclarationObjectTag);

	ClosingArgumentObjectDestructuringTag.props({
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
			closingTagVisitor(this, visitor, parser, context, statement, statements);
		}
	});

	return ClosingArgumentObjectDestructuringTag;
}(
	ClosingDeclarationObjectTag.prototype.visitor
);

this.OpeningArgumentArrayDestructuringTag = function(visitor){
	/**
	 * 函数参数数组解构起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningArgumentArrayDestructuringTag(_type){
		OpeningDeclarationArrayTag.call(this, _type);
	};
	OpeningArgumentArrayDestructuringTag = new Rexjs(OpeningArgumentArrayDestructuringTag, OpeningDeclarationArrayTag);

	OpeningArgumentArrayDestructuringTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingArgumentArrayDestructuringTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			openingTagVisitor(this, visitor, parser, context, statement, statements);
		}
	});

	return OpeningArgumentArrayDestructuringTag;
}(
	OpeningDeclarationArrayTag.prototype.visitor
);

this.ClosingArgumentArrayDestructuringTag = function(visitor){
	/**
	 * 函数参数数组解构结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingArgumentArrayDestructuringTag(_type){
		ClosingDeclarationArrayTag.call(this, _type);
	};
	ClosingArgumentArrayDestructuringTag = new Rexjs(ClosingArgumentArrayDestructuringTag, ClosingDeclarationArrayTag);

	ClosingArgumentArrayDestructuringTag.props({
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
			closingTagVisitor(this, visitor, parser, context, statement, statements);
		}
	});

	return ClosingArgumentArrayDestructuringTag;
}(
	ClosingDeclarationArrayTag.prototype.visitor
);

closingArgumentObjectDestructuringTag = new this.ClosingArgumentObjectDestructuringTag();
closingArgumentArrayDestructuringTag = new this.ClosingArgumentArrayDestructuringTag();

}.call(
	this,
	// ArgumentDestructuringExpression
	null,
	// ArgumentsDestructuringStatements
	null,
	this.OpeningDeclarationObjectTag,
	this.OpeningDeclarationArrayTag,
	this.ClosingDeclarationObjectTag,
	this.ClosingDeclarationArrayTag,
	// varTag
	new this.VarTag(),
	// closingArgumentObjectDestructuringTag
	null,
	// closingArgumentArrayDestructuringTag
	null,
	// openingTagVisitor
	null,
	// closingTagVisitor
	null
);