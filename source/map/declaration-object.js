// 对象声明解构赋值相关
!function(PropertyDestructuringItemExpression, PropertyStatement, variableDeclarationPropertySeparatorTag, closeDeclarationObjectTag){
	
this.DeclarationObjectExpression = function(ObjectExpression){
	/**
	 * 变量声明数组表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} objectOf - 该对象所属的声明表达式
	 */
	function DeclarationObjectExpression(open, objectOf){
		ObjectExpression.call(this, open);

		this.objectOf = objectOf;
	};
	DeclarationObjectExpression = new Rexjs(DeclarationObjectExpression, ObjectExpression);

	DeclarationObjectExpression.props({
		/**
		 * 将对象每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){},
		declaration: true,
		objectOf: null
	});

	return DeclarationObjectExpression;
}(
	this.ObjectExpression
);

this.PropertyDestructuringStatement = function(catchMethod, tryMethod, both){
	/**
	 * 对象属性解构语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PropertyDestructuringStatement(statements){
		PropertyStatement.call(this, statements);
	};
	PropertyDestructuringStatement = new Rexjs(PropertyDestructuringStatement, PropertyStatement);

	PropertyDestructuringStatement.props({
		bound: null,
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var bound = this.bound;

			return both(parser, this, context, bound, bound, catchMethod);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			return both(parser, this, context, this.bound, context.content === ",", tryMethod);
		}
	});

	return PropertyDestructuringStatement;
}(
	PropertyStatement.prototype.catch,
	PropertyStatement.prototype.try,
	// both
	function(parser, statement, context, bound, condition, method){
		// 如果满足条件
		if(condition){
			var tag, inner = statement.target.expression.inner;

			// 调用父类方法
			tag = method.call(statement, parser, context);

			// 替换为解构项表达式
			inner[inner.length - 1] = inner.latest = bound;
			return tag;
		}

		return method.call(statement, parser, context);
	}
);

this.OpenDeclarationObjectTag = function(OpenObjectTag, DeclarationObjectExpression, PropertyDestructuringStatement){
	/**
	 * 变量声明对象起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenDeclarationObjectTag(_type){
		OpenObjectTag.call(this, _type);
	};
	OpenDeclarationObjectTag = new Rexjs(OpenDeclarationObjectTag, OpenObjectTag);

	OpenDeclarationObjectTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeDeclarationObjectTag;
		},
		/**
		 * 获取拥有该对象的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getObjectOf: function(statement){
			return statement.target.expression;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return variableDeclarationPropertySeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyNameTags;
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
			statement.expression = new DeclarationObjectExpression(
				context,
				this.getObjectOf(statement)
			);

			// 设置当前语句
			statements.statement = new PropertyDestructuringStatement(statements);
		}
	});

	return OpenDeclarationObjectTag;
}(
	this.OpenObjectTag,
	this.DeclarationObjectExpression,
	this.PropertyDestructuringStatement
);

this.DeclarationPropertySeparatorTag = function(PropertySeparatorTag, PropertyDestructuringStatement){
	/**
	 * 对象属性的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertySeparatorTag(_type){
		PropertySeparatorTag.call(this, _type);
	};
	DeclarationPropertySeparatorTag = new Rexjs(DeclarationPropertySeparatorTag, PropertySeparatorTag);

	DeclarationPropertySeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyNameTags;
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
			statements.statement = new PropertyDestructuringStatement(statements);
		}
	});

	return DeclarationPropertySeparatorTag;
}(
	this.PropertySeparatorTag,
	this.PropertyDestructuringStatement
);

this.CloseDeclarationObjectTag = function(CloseObjectTag){
	/**
	 * 结束变量声明对象标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseDeclarationObjectTag(_type){
		CloseObjectTag.call(this, _type);
	};
	CloseDeclarationObjectTag = new Rexjs(CloseDeclarationObjectTag, CloseObjectTag);

	CloseDeclarationObjectTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructuringAssignmentTags;
		}
	});

	return CloseDeclarationObjectTag;
}(
	this.CloseObjectTag
);

variableDeclarationPropertySeparatorTag = new this.DeclarationPropertySeparatorTag();
closeDeclarationObjectTag = new this.CloseDeclarationObjectTag();

}.call(
	this,
	this.PropertyDestructuringItemExpression,
	this.PropertyStatement,
	// variableDeclarationPropertySeparatorTag
	null,
	// closeDeclarationObjectTag
	null
);