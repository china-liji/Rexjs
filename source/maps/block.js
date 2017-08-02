// 语句块相关
~function(closeBlockTag){

this.BlockExpression = function(){
	/**
	 * 语句块表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function BlockExpression(open){
		PartnerExpression.call(this, open);
	};
	BlockExpression = new Rexjs(BlockExpression, PartnerExpression);
	
	BlockExpression.props({
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});
	
	return BlockExpression;
}();

this.DefaultBlockBodyExpression = function(){
	/**
	 * 默认语句块主体表达式
	 */
	function DefaultBlockBodyExpression(){
		DefaultExpression.call(this);
	};
	DefaultBlockBodyExpression = new Rexjs(DefaultBlockBodyExpression, DefaultExpression);

	DefaultBlockBodyExpression.props({
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

	return DefaultBlockBodyExpression;
}();

this.BlockBodyStatement = function(DefaultBlockBodyExpression){
	/**
	 * 语句块主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BlockBodyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BlockBodyStatement = new Rexjs(BlockBodyStatement, ECMAScriptStatement);
	
	BlockBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭大括号
			if(context.content !== "}"){
				return NULL;
			}

			// 跳出语句并设置 inner
			this.out(parser).inner = this.statements;
			// 返回结束语句块标签
			return this.bindingOf();
		},
		expression: new DefaultBlockBodyExpression(),
		/**
		 * 跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		out: function(parser){
			// 返回语句块表达式
			return (
				// 恢复语句块
				parser.statements = this.statements.target
			)
			.statement
			.expression;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.statements.target.statement.expression.context.tag;
		}
	});
	
	return BlockBodyStatement;
}(
	this.DefaultBlockBodyExpression
);

this.BlockBodyStatements = function(ECMAScriptStatements, BlockBodyStatement){
	/**
	 * 语句块
	 * @param {ECMAScriptVariableCollections} collections - 变量名收集器集合
	 */
	function BlockBodyStatements(collections){
		ECMAScriptStatements.call(this, collections);
	};
	BlockBodyStatements = new Rexjs(BlockBodyStatements, ECMAScriptStatements);
	
	BlockBodyStatements.props({
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 返回外层语句块的处理结果
			return this.target.applySuper(parser, context);
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			// 返回外层语句块的处理结果
			return this.target.applySuperCall(parser, context, open);
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new BlockBodyStatement(this);
		},
		scope: ECMAScriptStatements.SCOPE_BLOCK
	});
	
	return BlockBodyStatements;
}(
	this.ECMAScriptStatements,
	this.BlockBodyStatement
);

this.OpenBlockTag = function(OpenBraceTag, BlockExpression, BlockBodyStatements, ECMAScriptVariableCollections){
	/**
	 * 起始语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBlockTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenBlockTag = new Rexjs(OpenBlockTag, OpenBraceTag);
	
	OpenBlockTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBlockTag;
		},
		/**
		 * 进入语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			// 设置当前语句块
			(
				parser.statements = new BlockBodyStatements(
					// 初始化变量名收集器集合
					new ECMAScriptVariableCollections(
						statements.collections.index
					)
				)
			)
			.target = statements;
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
			// 设置表达式
			statement.expression = new BlockExpression(context);
			
			// 进入语句块内部
			this.in(parser, statements);
		}
	});
	
	return OpenBlockTag;
}(
	this.OpenBraceTag,
	this.BlockExpression,
	this.BlockBodyStatements,
	this.ECMAScriptVariableCollections
);

this.CloseBlockTag = function(CloseBraceTag){
	/**
	 * 结束语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBlockTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseBlockTag = new Rexjs(CloseBlockTag, CloseBraceTag);
	
	CloseBlockTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseBlockTag;
}(
	this.CloseBraceTag
);

closeBlockTag = new this.CloseBlockTag();

}.call(
	this,
	// closeBlockTag
	NULL
);