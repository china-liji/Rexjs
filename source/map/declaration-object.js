// 对象声明解构赋值相关
!function(PropertyDestructuringItemExpression, PropertyStatement, OpeningObjectTag, variableDeclarationPropertySeparatorTag, closingDeclarationObjectTag){
	
this.DeclarationObjectExpression = function(ObjectExpression){
	/**
	 * 变量声明数组表达式
	 * @param {Context} opening - 起始标签上下文
	 * @param {Expression} objectOf - 该对象声明所处语句的表达式
	 */
	function DeclarationObjectExpression(opening, objectOf){
		ObjectExpression.call(this, opening);

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

this.OpeningDeclarationObjectTag = function(DeclarationObjectExpression, PropertyDestructuringStatement, visitor){
	/**
	 * 变量声明对象起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningDeclarationObjectTag(_type){
		OpeningObjectTag.call(this, _type);
	};
	OpeningDeclarationObjectTag = new Rexjs(OpeningDeclarationObjectTag, OpeningObjectTag);

	OpeningDeclarationObjectTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingDeclarationObjectTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new DeclarationObjectExpression(
				context,
				this.getObjectOf(statement)
			);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new PropertyDestructuringStatement(statements);
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
		}
	});

	return OpeningDeclarationObjectTag;
}(
	
	this.DeclarationObjectExpression,
	this.PropertyDestructuringStatement,
	OpeningObjectTag.prototype.visitor
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
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new PropertyDestructuringStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyNameTags;
		}
	});

	return DeclarationPropertySeparatorTag;
}(
	this.PropertySeparatorTag,
	this.PropertyDestructuringStatement
);

this.ClosingDeclarationObjectTag = function(ClosingObjectTag){
	/**
	 * 结束变量声明对象标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingDeclarationObjectTag(_type){
		ClosingObjectTag.call(this, _type);
	};
	ClosingDeclarationObjectTag = new Rexjs(ClosingDeclarationObjectTag, ClosingObjectTag);

	ClosingDeclarationObjectTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructuringAssignmentTags;
		}
	});

	return ClosingDeclarationObjectTag;
}(
	this.ClosingObjectTag
);

variableDeclarationPropertySeparatorTag = new this.DeclarationPropertySeparatorTag();
closingDeclarationObjectTag = new this.ClosingDeclarationObjectTag();

}.call(
	this,
	this.PropertyDestructuringItemExpression,
	this.PropertyStatement,
	this.OpeningObjectTag,
	// variableDeclarationPropertySeparatorTag
	null,
	// closingDeclarationObjectTag
	null
);