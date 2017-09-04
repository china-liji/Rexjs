// var 语句相关
!function(VariableDeclarationTag, closureVariableTag, varDeclarationSeparatorTag){

this.VarExpression = function(BinaryExpression){
	/**
	 * var 表达式
	 * @param {Context} context - 标签上下文
	 * @param {Statements} statements - 当前所处环境的变量收集器集合
	 */
	function VarExpression(context, statements){
		var range = statements.collections.declaration.range(), compiledGenerator = statements.contextGeneratorIfNeedCompile;

		Expression.call(this, context);

		this.list = new ListExpression(null, ",");
		this.range = range;
		
		// 如果需要编译的生成器存在
		if(compiledGenerator){
			// 添加变量收集器范围
			compiledGenerator.ranges.push(range);

			// 那么，该表达式将转化为普通的赋值表达式，不再是声明。
			this.declaration = false;
		}
	};
	VarExpression = new Rexjs(VarExpression, Expression);

	VarExpression.props({
		declaration: true,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果是声明
			if(this.declaration){
				// 提取 var 关键字
				contentBuilder.appendContext(this.context);
			}
		
			// 添加空格
			contentBuilder.appendSpace();
			// 提取变量列表
			this.list.extractTo(contentBuilder);
		},
		list: null,
		range: null
	});

	return VarExpression;
}(
	this.BinaryExpression
);

this.VarStatement = function(){
	/**
	 * var 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function VarStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	VarStatement = new Rexjs(VarStatement, ECMAScriptStatement);
	
	VarStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().list.add(this.expression);
			// 结束 var 表达式的变量名范围
			this.target.expression.range.end();

			// 如果是逗号，返回指定的分隔符，否则返回 null
			return context.content === "," ? this.bindingOf() : null;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出语句并添加表达式
			this.out().list.add(this.expression);
			// 返回分隔符标签
			return this.bindingOf();
		}
	});
	
	return VarStatement;
}();

this.VarTag = function(VarExpression, VarStatement){
	/**
	 * var 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function VarTag(_type){
		SyntaxTag.call(this, _type);
	};
	VarTag = new Rexjs(VarTag, SyntaxTag);

	VarTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return varDeclarationSeparatorTag;
		},
		regexp: /var/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.varContextTags;
		},
		/**
		 * 获取绑定的变量名标签
		 */
		get variable(){
			return closureVariableTag;
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
			statement.expression = new VarExpression(context, statements);
			// 设置当前语句
			statements.statement = new VarStatement(statements);
		}
	});

	return VarTag;
}(
	this.VarExpression,
	this.VarStatement
);

this.ClosureVariableTag = function(){
	/**
	 * 闭包内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosureVariableTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ClosureVariableTag = new Rexjs(ClosureVariableTag, VariableDeclarationTag);
	
	ClosureVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closureVariableContextTags;
		}
	});
	
	return ClosureVariableTag;
}();

this.VarDeclarationSeparatorTag = function(CommaTag, VarStatement){
	/**
	 * var 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function VarDeclarationSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	VarDeclarationSeparatorTag = new Rexjs(VarDeclarationSeparatorTag, CommaTag);
	
	VarDeclarationSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.varContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new VarStatement(statements)
		}
	});
	
	return VarDeclarationSeparatorTag;
}(
	this.CommaTag,
	this.VarStatement
);

closureVariableTag = new this.ClosureVariableTag();
varDeclarationSeparatorTag = new this.VarDeclarationSeparatorTag();

}.call(
	this,
	this.VariableDeclarationTag,
	// closureVariableTag
	null,
	// varDeclarationSeparatorTag
	null
);