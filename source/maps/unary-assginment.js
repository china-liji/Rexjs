// 一元赋值标签
~function(UnaryStatement, VariableTag){

this.UnaryAssignmentStatement = function(catchMethod, tryMethod, checkExpression){
	/**
	 * 一元赋值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function UnaryAssignmentStatement(statements){
		UnaryStatement.call(this, statements);
	};
	UnaryAssignmentStatement = new Rexjs(UnaryAssignmentStatement, UnaryStatement);
	
	UnaryAssignmentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 核对表达式
			checkExpression(parser, this, context, catchMethod);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 核对表达式
			checkExpression(parser, this, context, tryMethod);
		}
	});
	
	return UnaryAssignmentStatement;
}(
	UnaryStatement.prototype.catch,
	UnaryStatement.prototype.try,
	// checkExpression
	function(parser, statement, context, method){
		// 如果满足一元赋值标签条件
		if(statement.target.expression.context.tag.operable(parser, statement.expression)){
			// 调用父类方法
			method.call(statement, parser, context);
			return;
		}

		// 报错
		parser.error(statement.target.expression.context, ECMAScriptErrors.PREFIX_OPERATION, true);
	}
);

this.UnaryAssignmentTag = function(UnaryTag, UnaryExpression, UnaryAssignmentStatement, AssignableExpression, AccessorExpression){
	/**
	 * 一元赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryAssignmentTag(_type){
		UnaryTag.call(this, _type);
	};
	UnaryAssignmentTag = new Rexjs(UnaryAssignmentTag, UnaryTag);

	UnaryAssignmentTag.props({
		/**
		 * 判断该一元表达式在当前表达式中，是否能使用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 当前表达式
		 */
		operable: function(parser, expression){
			// 如果当前表达式是赋值表达式
			if(expression instanceof AssignableExpression){
				var ctx = expression.context;

				switch(true){
					// 如果是属性访问表达式
					case expression instanceof AccessorExpression:
						break;

					// 如果已被收集到常量（会触发报错）
					case ctx.tag.collected(parser, ctx, parser.statements):
						return false;
				}

				return true;
			}

			return false;
		},
		order: ECMAScriptOrders.UNARY_ASSIGNMENT,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new UnaryExpression(context);
			// 设置当前语句
			statements.statement = new UnaryAssignmentStatement(statements);
		}
	});

	return UnaryAssignmentTag;
}(
	this.UnaryTag,
	this.UnaryExpression,
	this.UnaryAssignmentStatement,
	this.AssignableExpression,
	this.AccessorExpression
);

this.PostfixUnaryAssignmentTag = function(UnaryAssignmentTag, PostfixUnaryExpression){
	/**
	 * 后置一元赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function PostfixUnaryAssignmentTag(_type){
		UnaryAssignmentTag.call(this, _type);
	};
	PostfixUnaryAssignmentTag = new Rexjs(PostfixUnaryAssignmentTag, UnaryAssignmentTag);

	PostfixUnaryAssignmentTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		order: ECMAScriptOrders.POSTFIX_UNARY_ASSIGNMENT,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restrictedExpressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 如果满足一元赋值标签条件
			if(this.operable(parser, expression)){
				(
					// 设置当前表达式
					statement.expression = new PostfixUnaryExpression(context)
				)
				// 设置 operand 属性
				.operand = expression;

				return;
			}

			// 报错
			parser.error(context, ECMAScriptErrors.POSTFIX_OPERATION, true);
		}
	});

	return PostfixUnaryAssignmentTag;
}(
	this.UnaryAssignmentTag,
	this.PostfixUnaryExpression
);

}.call(
	this,
	this.UnaryStatement,
	this.VariableTag
);