// const 语句相关
!function(VarExpression, IdentifierExpression, VarStatement, LocalVariableTag, constantVariableTag, constDeclarationSeparatorTag){

this.ConstStatement = function(catchMethod, tryMethod){
	/**
	 * const 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ConstStatement(statements){
		VarStatement.call(this, statements);
	};
	ConstStatement = new Rexjs(ConstStatement, VarStatement);
	
	ConstStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果表达式是可赋值表达式
			if(this.expression instanceof IdentifierExpression){
				// 由于没有赋值操作，则报错
				parser.error(this.expression.context, ECMAScriptErrors.MISSING_INITIALIZER);
				// 返回分隔符标签
				return null;
			}

			return catchMethod.call(this, parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果表达式是可赋值表达式
			if(this.expression instanceof IdentifierExpression){
				// 由于没有赋值操作，则报错
				parser.error(this.expression.context, ECMAScriptErrors.MISSING_INITIALIZER);
				return null;
			}

			// 调用父类方法
			return tryMethod.call(this, parser, context);
		}
	});
	
	return ConstStatement;
}(
	VarStatement.prototype.catch,
	VarStatement.prototype.try
);

this.ConstTag = function(LetTag, ConstStatement){
	/**
	 * const 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstTag(_type){
		LetTag.call(this, _type);
	};
	ConstTag = new Rexjs(ConstTag, LetTag);

	ConstTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return constDeclarationSeparatorTag;
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.es6Base ? "var" : content);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ConstStatement(statements);
		},
		regexp: /const/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constContextTags;
		},
		/**
		 * 获取绑定的变量名标签
		 */
		get variable(){
			return constantVariableTag;
		}
	});

	return ConstTag;
}(
	this.LetTag,
	this.ConstStatement
);

this.ConstantVariableTag = function(collectTo){
	/**
	 * 局部内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstantVariableTag(_type){
		LocalVariableTag.call(this, _type);
	};
	ConstantVariableTag = new Rexjs(ConstantVariableTag, LocalVariableTag);
	
	ConstantVariableTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			// 调用父类方法
			if(collectTo.call(this, parser, context, statements)){
				// 收集变量名
				statements.collections.const.collect(context.content);
				return true;
			}
			
			return false;
		}
	});
	
	return ConstantVariableTag;
}(
	LocalVariableTag.prototype.collectTo
);

this.ConstDeclarationSeparatorTag = function(LetDeclarationSeparatorTag, ConstStatement){
	/**
	 * const 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstDeclarationSeparatorTag(_type){
		LetDeclarationSeparatorTag.call(this, _type);
	};
	ConstDeclarationSeparatorTag = new Rexjs(ConstDeclarationSeparatorTag, LetDeclarationSeparatorTag);
	
	ConstDeclarationSeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ConstStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constContextTags;
		}
	});
	
	return ConstDeclarationSeparatorTag;
}(
	this.LetDeclarationSeparatorTag,
	this.ConstStatement
);

constantVariableTag = new this.ConstantVariableTag();
constDeclarationSeparatorTag = new this.ConstDeclarationSeparatorTag();

}.call(
	this,
	this.VarExpression,
	this.IdentifierExpression,
	this.VarStatement,
	this.LocalVariableTag,
	// constantVariableTag
	null,
	// constDeclarationSeparatorTag
	null
);