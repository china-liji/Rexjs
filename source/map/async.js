!function(FunctionTag){

this.AsyncExpression = function(){
	/**
	 * 异步表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function AsyncExpression(context, declaration){
		Expression.call(this, context);

		this.declaration = true;
	};
	AsyncExpression = new Rexjs(AsyncExpression, Expression);

	AsyncExpression.$({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				var func = this.function;

				// 追加方法调用起始代码
				contentBuilder.appendString("Rexjs.AsyncFunction.async(");
				// 提取函数
				func.extractTo(contentBuilder);

				// 追加方法调用结束代码
				contentBuilder.appendString(
					(func.star.content === "async" ? "" : ",true") + ")"
				);
				return;
			}

			// 追加关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			// 提取函数
			this.function.extractTo(contentBuilder);
		},
		function: NULL
	});

	return AsyncExpression;
}();

this.AsyncStatement = function(){
	/**
	 * 异步语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function AsyncStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	AsyncStatement = new Rexjs(AsyncStatement, ECMAScriptStatement);

	AsyncStatement.$({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return this.try(parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			this.out().function = this.expression;
		}
	});

	return AsyncStatement;
}();

this.AsyncTag = function(AsyncExpression, AsyncStatement){
	/**
	 * 异步标签
	 * @param {Number} _type - 标签类型
	 */
	function AsyncTag(_type){
		SyntaxTag.call(this, _type);
	};
	AsyncTag = new Rexjs(AsyncTag, SyntaxTag);

	AsyncTag.$({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /async/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.asyncContextTags;
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
			statement.expression = new AsyncExpression(context);
			// 设置当前语句
			statements.statement = new AsyncStatement(statements);
		}
	});

	return AsyncTag;

}(
	this.AsyncExpression,
	this.AsyncStatement
);

this.AsycnFunctionTag = function(visitor){
	/**
	 * 异步函数标签
	 * @param {Number} _type - 标签类型
	 */
	function AsycnFunctionTag(_type){
		FunctionTag.call(this, _type);
	};
	AsycnFunctionTag = new Rexjs(AsycnFunctionTag, FunctionTag);

	AsycnFunctionTag.$({
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

			// 如果需要解析 es6
			if(config.es6Base){
				// 用生成器方式解析该函数
				statement.expression.toGenerator(
					// 传入 async 关键字上下文用于替代 StarTag
					statement.target.expression.context
				);
			}
		}
	});

	return AsycnFunctionTag;
}(
	FunctionTag.prototype.visitor
);

}.call(
	this,
	this.FunctionTag
);