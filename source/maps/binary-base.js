// 二元标签基类
~function(){

this.BinaryExpression = function(){
	/**
	 * 二元表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 该二元表达式左侧运算的表达式
	 */
	function BinaryExpression(context, left){
		Expression.call(this, context);

		this.left = left;
	};
	BinaryExpression = new Rexjs(BinaryExpression, Expression);

	BinaryExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 先提取左侧表达式
			this.left.extractTo(contentBuilder);
			// 追加运算符
			contentBuilder.appendContext(this.context);
			// 提取右侧表达式
			this.right.extractTo(contentBuilder);
		},
		last: NULL,
		left: NULL,
		right: NULL
	});

	return BinaryExpression;
}();

this.BinaryStatement = function(setRight){
	/**
	 * 二元语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BinaryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BinaryStatement = new Rexjs(BinaryStatement, ECMAScriptStatement);
	
	BinaryStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			setRight(this);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是表达式分隔符标签
			if(this.target.expression.context.tag.isSeparator(context)){
				setRight(this);
			}
		}
	});
	
	return BinaryStatement;
}(
	// setRight
	function(statement){
		// 跳出语句并给最后一个二元表达式设置 right
		statement.out().last.right = statement.expression;
	}
);

this.BinaryTag = function(ExpressionSeparatorTag, BinaryExpression, BinaryStatement){
	/**
	 * 二元标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	BinaryTag = new Rexjs(BinaryTag, ExpressionSeparatorTag);
	
	BinaryTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			return context.tag instanceof ExpressionSeparatorTag;
		},
		order: ECMAScriptOrders.BINARY,
		precedence: 0,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 将该二元标签转换为二元表达式
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 */
		toExpression: function(context, left){
			return new BinaryExpression(context, left);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression, precedence = this.precedence;

			// 如果当前表达式是二元表达式而且该二元表达式的运算符优先级小于当前运算符的优先级
			if(expression instanceof BinaryExpression && expression.context.tag.precedence < precedence){
				var exp = expression, right = expression.right;

				// 如果右侧表达式也是二元表达式
				while(right instanceof BinaryExpression){
					// 如果当前二元运算符的优先级小于等于该表达式的运算符优先级
					if(precedence <= right.context.tag.precedence){
						break;
					}

					// 记录上一个表达式
					exp = right;
					// 再获取右侧表达式
					right = right.right;
				}

				// 设置新的右侧表达式
				exp.right = expression.last = this.toExpression(context, right);
			}
			else {
				var binaryExpression = this.toExpression(context, expression);

				// 设置当前表达式并将最后的二元表达式为自己
				statement.expression = binaryExpression.last = binaryExpression;
			}

			// 设置当前语句
			statements.statement = new BinaryStatement(statements);
		}
	});
	
	return BinaryTag;
}(
	this.ExpressionSeparatorTag,
	this.BinaryExpression,
	this.BinaryStatement
);

}.call(
	this
);