// 对象解构声明的省略属性相关
!function(SpreadStatement){

this.DeclarationPropertyRestStatement = function(out){
	/**
	 * 变量声明省略项拓展语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationPropertyRestStatement(statements){
		SpreadStatement.call(this, statements);
	};
	DeclarationPropertyRestStatement = new Rexjs(DeclarationPropertyRestStatement, SpreadStatement);

	DeclarationPropertyRestStatement.props({
		/**
		 * 跳出该语句
		 */
		out: function(){
			return out.call(this).value;
		}
	});

	return DeclarationPropertyRestStatement;
}(
	SpreadStatement.prototype.out
);

this.DeclarationPropertyRestItemTag = function(IdentifierDeclarationPropertyNameTag, IdentifierExpression){
	/**
	 * 变量声明对象属性省略项标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyRestItemTag(_type){
		IdentifierDeclarationPropertyNameTag.call(this, _type);
	};
	DeclarationPropertyRestItemTag = new Rexjs(DeclarationPropertyRestItemTag, IdentifierDeclarationPropertyNameTag);

	DeclarationPropertyRestItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyRestItemContextTags;
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
				context.tag = statement.target.target.expression.objectOf.context.tag.variable
			)
			// 收集变量名
			.collectTo(parser, context, statements);

			// 设置当前表达式
			statement.expression = new IdentifierExpression(context);
		}
	});

	return DeclarationPropertyRestItemTag;
}(
	this.IdentifierDeclarationPropertyNameTag,
	this.IdentifierExpression
);

this.DeclarationPropertyRestTag = function(PropertySpreadTag, PropertyDestructuringRestItemExpression, PropertySpreadExpression, DeclarationPropertyRestStatement){
	/**
	 * 变量声明对象属性省略项拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyRestTag(_type){
		PropertySpreadTag.call(this, _type);
	};
	DeclarationPropertyRestTag = new Rexjs(DeclarationPropertyRestTag, PropertySpreadTag);
	
	DeclarationPropertyRestTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyRestItemTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = new PropertySpreadExpression(context);

			// 绑定解构项表达式
			statement.bound = new PropertyDestructuringRestItemExpression(expression);
			// 设置当前表达式
			statement.expression = expression;
			// 设置当前语句
			statements.statement = new DeclarationPropertyRestStatement(statements);
		}
	});

	return DeclarationPropertyRestTag;
}(
	this.PropertySpreadTag,
	this.PropertyDestructuringRestItemExpression,
	this.PropertySpreadExpression,
	this.DeclarationPropertyRestStatement
);

}.call(
	this,
	this.SpreadStatement
);