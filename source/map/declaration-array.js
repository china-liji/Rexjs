// 数组解构赋值相关
!function(OpenArrayTag, BasicAssignmentTag, variableDeclarationArrayItemSeparatorTag, closeDeclarationArrayTag){

this.DeclarationArrayExpression = function(ArrayExpression){
	/**
	 * 变量声明数组表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function DeclarationArrayExpression(open){
		ArrayExpression.call(this, open);
	};
	DeclarationArrayExpression = new Rexjs(DeclarationArrayExpression, ArrayExpression);

	DeclarationArrayExpression.props({
		arrayOf: null,
		declaration: true,
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){}
	});

	return DeclarationArrayExpression;
}(
	this.ArrayExpression
);

this.DeclarationArrayItemAssignmentReadyStatement = function(){
	/**
	 * 变量声明数组项赋值准备语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationArrayItemAssignmentReadyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	DeclarationArrayItemAssignmentReadyStatement = new Rexjs(DeclarationArrayItemAssignmentReadyStatement, ECMAScriptStatement);
	
	DeclarationArrayItemAssignmentReadyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			this.out();
			return null;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句
				this.out();
			}

			return null;
		}
	});

	return DeclarationArrayItemAssignmentReadyStatement;
}();

this.OpenDeclarationArrayTag = function(DeclarationArrayExpression, visitor){
	/**
	 * 变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenDeclarationArrayTag(_type){
		OpenArrayTag.call(this, _type);
	};
	OpenDeclarationArrayTag = new Rexjs(OpenDeclarationArrayTag, OpenArrayTag);
	
	OpenDeclarationArrayTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeDeclarationArrayTag;
		},
		/**
		 * 获取拥有该数组的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getArrayOf: function(statement){
			return statement.target.expression;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new DeclarationArrayExpression(context);
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return variableDeclarationArrayItemSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openDeclarationArrayContextTags;
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

			// 通过当前语句给变量声明数组表达式绑定 arrayOf 属性
			statement.expression.arrayOf = this.getArrayOf(statement);
		}
	});

	return OpenDeclarationArrayTag;
}(
	this.DeclarationArrayExpression,
	OpenArrayTag.prototype.visitor
);

this.DeclarationArrayItemTag = function(VariableDeclarationTag, DestructuringItemExpression, IdentifierExpression){
	/**
	 * 变量声明数组项标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	DeclarationArrayItemTag = new Rexjs(DeclarationArrayItemTag, VariableDeclarationTag);
	
	DeclarationArrayItemTag.props({
		/**
		 * 获取该标签所处的数组语句
		 * @param {Statement} statement - 当前语句
		 */
		getArrayStatement: function(statement){
			return statement;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new DestructuringItemExpression(
				new IdentifierExpression(context)
			);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayItemContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			(
				// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
				context.tag = this.getArrayStatement(statement).target.expression.arrayOf.context.tag.variable
			)
			// 收集变量名
			.collectTo(parser, context, statements);

			// 设置当前表达式
			statement.expression = this.getBoundExpression(context);
		}
	});
	
	return DeclarationArrayItemTag;
}(
	this.VariableDeclarationTag,
	this.DestructuringItemExpression,
	this.IdentifierExpression
);

this.DeclarationArrayItemSeparatorTag = function(ArrayItemSeparatorTag){
	/**
	 * 变量声明数组项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemSeparatorTag(_type){
		ArrayItemSeparatorTag.call(this, _type);
	};
	DeclarationArrayItemSeparatorTag = new Rexjs(DeclarationArrayItemSeparatorTag, ArrayItemSeparatorTag);
	
	DeclarationArrayItemSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openDeclarationArrayContextTags;
		}
	});

	return DeclarationArrayItemSeparatorTag;
}(
	this.ArrayItemSeparatorTag
);

this.DeclarationArrayItemAssignmentTag = function(DeclarationArrayItemAssignmentReadyStatement, DestructuringDefaultItemExpression, visitor){
	/**
	 * 变量声明数组项赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	DeclarationArrayItemAssignmentTag = new Rexjs(DeclarationArrayItemAssignmentTag, BasicAssignmentTag);
	
	DeclarationArrayItemAssignmentTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 初始化赋值准备语句
			var readyStatement = new DeclarationArrayItemAssignmentReadyStatement(statements);

			// 设置准备语句的表达式
			readyStatement.expression = statement.expression;
			// 设置当前语句
			statements.statement = readyStatement;
			
			// 调用父类访问器
			visitor.call(this, parser, context, readyStatement, statements);

			// 覆盖当前语句的表达式
			statement.expression = new DestructuringDefaultItemExpression(readyStatement.expression, statements);
		}
	});

	return DeclarationArrayItemAssignmentTag;
}(
	this.DeclarationArrayItemAssignmentReadyStatement,
	this.DestructuringDefaultItemExpression,
	BasicAssignmentTag.prototype.visitor
);

this.CloseDeclarationArrayTag = function(CloseArrayTag){
	/**
	 * 标签变量声明数组结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseDeclarationArrayTag(_type){
		CloseArrayTag.call(this, _type);
	};
	CloseDeclarationArrayTag = new Rexjs(CloseDeclarationArrayTag, CloseArrayTag);
	
	CloseDeclarationArrayTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructuringAssignmentTags;
		}
	});
	
	return CloseDeclarationArrayTag;
}(
	this.CloseArrayTag
);

variableDeclarationArrayItemSeparatorTag = new this.DeclarationArrayItemSeparatorTag();
closeDeclarationArrayTag = new this.CloseDeclarationArrayTag();

}.call(
	this,
	this.OpenArrayTag,
	this.BasicAssignmentTag,
	// variableDeclarationArrayItemSeparatorTag
	null,
	// closeDeclarationArrayTag
	null
);