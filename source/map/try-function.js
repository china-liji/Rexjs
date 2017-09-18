!function(UnaryExpression, CallExpression, FunctionConvertorExpression){

this.TryFunctionExpression = function(extractTo){
	/**
	 * 尝试执行函数表达式
	 * @param {Context} context - 标签上下文
	 */
	function TryFunctionExpression(context){
		UnaryExpression.call(this, context);
	};
	TryFunctionExpression = new Rexjs(TryFunctionExpression, UnaryExpression);

	TryFunctionExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.rexjs){
				// 直接提取操作对象
				this.operand.extractTo(contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return TryFunctionExpression;
}(
	UnaryExpression.prototype.extractTo
);

this.FunctionConvertorExpression = FunctionConvertorExpression = function(AccessorExpression, extractAccessor){
	/**
	 * 函数转换器表达式
	 * @param {Expression} func - 标签上下文
	 */
	function FunctionConvertorExpression(func){
		Expression.call(this, func.context);

		this.function = func;
	};
	FunctionConvertorExpression = new Rexjs(FunctionConvertorExpression, Expression);

	FunctionConvertorExpression.props({
		called: true,
		function: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var func = this.function;

			// 如果需要编译
			if(config.rexjs){
				// 追加转换方法
				contentBuilder.appendString("(Rexjs.Function.convert(");

				// 如果函数是访问器形式的
				if(func instanceof AccessorExpression){
					// 以访问器形式提取
					extractAccessor(contentBuilder, func, func.property);
				}
				else {
					// 直接提取
					func.extractTo(contentBuilder);
				}

				// 追加转换方法的结束小括号
				contentBuilder.appendString(
					// 如果没有带执行方法的小括号，则加上
					"))" + (this.called ? "" : "()")
				);

				return;
			}

			// 直接提取
			func.extractTo(contentBuilder);
		}
	});

	return FunctionConvertorExpression;
}(
	this.AccessorExpression,
	// extractAccessor
	function(contentBuilder, func, property){
		// 先提取函数所属对象
		func.object.extractTo(contentBuilder);

		// 追加 convert 方法的参数分隔符
		contentBuilder.appendString(",");

		// 如果是匹配组表达式，则说明是中括号（window["a"]）形式的访问器
		if(property instanceof PartnerExpression){
			// 将起始中括号改成小括号
			contentBuilder.appendString("(");
			// 提取括号内部表达式
			property.inner.extractTo(contentBuilder);
			// 将结束中括号改成小括号
			contentBuilder.appendString(")");
			return;
		}

		// 将标识符用双引号包括起来
		contentBuilder.appendString('"');
		// 提取标识符
		contentBuilder.appendContext(property);
		// 将标识符用双引号包括起来
		contentBuilder.appendString('"');
	}
);

this.TryFunctionStatement = function(UnaryStatement, setOperand){
	/**
	 * 一元语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TryFunctionStatement(statements){
		UnaryStatement.call(this, statements);
	};
	TryFunctionStatement = new Rexjs(TryFunctionStatement, UnaryStatement);
	
	TryFunctionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(){
			// 设置 operand
			setOperand(this, this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.expression;

			// 如果一元标签验证该标签为表达式分隔符标签
			if(this.target.expression.context.tag.isSeparator(context, expression)){
				// 设置 operand
				setOperand(this, expression);
			}
		}
	});
	
	return TryFunctionStatement;
}(
	this.UnaryStatement,
	// setOperand
	function(statement, expression){
		// 如果是函数调用表达式
		if(expression instanceof CallExpression){
			// 将函数调用表达式的操作对象设置为 函数转换器表达式
			expression.operand = new FunctionConvertorExpression(expression.operand);
		}
		else {
			// 直接设置表达式为 函数转换器表达式
			expression = new FunctionConvertorExpression(expression);
			// 并告知函数转换器表达式，并没有被手动调用
			expression.called = false;
		}

		// 设置操作对象
		statement.out().operand = expression;
	}
);

this.TryFunctionTag = function(ExecTag, TryFunctionExpression, TryFunctionStatement){
	/**
	 * 尝试执行函数的 try 标签
	 * @param {Number} _type - 标签类型
	 */
	function TryFunctionTag(_type){
		ExecTag.call(this, _type);
	};
	TryFunctionTag = new Rexjs(TryFunctionTag, ExecTag);

	TryFunctionTag.props({
		regexp: /try/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new TryFunctionExpression(context);
			// 设置当前语句
			statements.statement = new TryFunctionStatement(statements);
		}
	});

	return TryFunctionTag;
}(
	this.ExecTag,
	this.TryFunctionExpression,
	this.TryFunctionStatement
);

}.call(
	this,
	this.UnaryExpression,
	this.CallExpression,
	// FunctionConvertorExpression
	null
);