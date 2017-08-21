// 拓展参数相关
~function(config){

this.SpreadExpression = function(){
	/**
	 * 拓展参数表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function SpreadExpression(context){
		Expression.call(this, context);
	};
	SpreadExpression = new Rexjs(SpreadExpression, Expression);

	SpreadExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译拓展符
			if(config.value){
				// 追加编译拓展符方法
				contentBuilder.appendString("new Rexjs.SpreadItem(");
				// 提取参数
				this.operand.extractTo(contentBuilder);
				// 追加拓展符方法的结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 追加拓展符上下文
			contentBuilder.appendContext(this.context);
			// 提取参数
			this.operand.extractTo(contentBuilder);
		},
		operand: null
	});

	return SpreadExpression;
}();

this.SpreadStatement = function(){
	/**
	 * 拓展参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SpreadStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SpreadStatement = new Rexjs(SpreadStatement, ECMAScriptStatement);

	SpreadStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 operand
			this.out().operand = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句并设置 operand
				this.out().operand = this.expression;
			}
		}
	});

	return SpreadStatement;
}();

this.SpreadTag = function(SpreadExpression, SpreadStatement, AccessorExpression){
	/**
	 * 拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function SpreadTag(_type){
		SyntaxTag.call(this, _type);
	};
	SpreadTag = new Rexjs(SpreadTag, SyntaxTag);
	
	SpreadTag.props({
		// 防止与数字、点访问器冲突
		order: ECMAScriptOrders.SPREAD,
		regexp: /\.{3}/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var callExpression = statement.target.expression;

			// 设置当前表达式
			statement.expression = new SpreadExpression(context);
			// 设置当前语句
			statements.statement = new SpreadStatement(statements);

			// 如果已有拓展符
			if(callExpression.spread){
				return;
			}

			switch(false){
				// 如果函数调用表达式的操作对象不是属性表达式
				case callExpression.operand instanceof AccessorExpression:
					break;

				// 如果已经存在变量名
				case callExpression.variable === "":
					break;

				default:
					// 生成变量名
					callExpression.variable = statements.collections.generate();
					break;
			}

			// 设置 call 表达式 spread 属性，表示有拓展符
			callExpression.spread = true;
			// 告知 call 表达式，需要编译 spread
			callExpression.needCompileSpread = config.value;
		}
	});
	
	return SpreadTag;
}(
	this.SpreadExpression,
	this.SpreadStatement,
	this.AccessorExpression
);

}.call(
	this,
	// config
	ECMAScriptConfig.addBaseConfig("spread")
);