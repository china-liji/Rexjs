// 语句块组件相关
~function(OpenBlockTag, CloseBlockTag, closeBlockComponentTag){

this.BlockComponentStatement = function(){
	/**
	 * 语句块组件语句，目的是为其他表达式提供模拟环境
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BlockComponentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BlockComponentStatement = new Rexjs(BlockComponentStatement, ECMAScriptStatement);

	BlockComponentStatement.props({
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
			// 报错，在这之前，应该主动跳出该语句
			parser.error(context);
		}
	});

	return BlockComponentStatement;
}();

this.OpenBlockComponentTag = function(BlockComponentStatement, visitor){
	/**
	 * switch 主体起始标签
	 */
	function OpenBlockComponentTag(_type){
		OpenBlockTag.call(this, _type);
	};
	OpenBlockComponentTag = new Rexjs(OpenBlockComponentTag, OpenBlockTag);
	
	OpenBlockComponentTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBlockComponentTag;
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
			visitor.call(
				this,
				parser,
				context,
				// 设置当前语句
				statements.statement = new BlockComponentStatement(statements),
				statements
			);
		}
	});
	
	return OpenBlockComponentTag;
}(
	this.BlockComponentStatement,
	OpenBlockTag.prototype.visitor
);

this.CloseBlockComponentTag = function(visitor){
	/**
	 * switch 主体起始标签
	 */
	function CloseBlockComponentTag(_type){
		CloseBlockTag.call(this, _type);
	};
	CloseBlockComponentTag = new Rexjs(CloseBlockComponentTag, CloseBlockTag);
	
	CloseBlockComponentTag.props({
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

			// 跳出语句并设置表达式的 block 属性
			statement.out().block = statement.expression;
		}
	});
	
	return CloseBlockComponentTag;
}(
	CloseBlockTag.prototype.visitor
);

closeBlockComponentTag = new this.CloseBlockComponentTag();

}.call(
	this,
	this.OpenBlockTag,
	this.CloseBlockTag,
	// closeBlockComponentTag
	null
);