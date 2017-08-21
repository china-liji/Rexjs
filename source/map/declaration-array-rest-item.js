// 声明数组省略项相关
~function(SpreadStatement){

this.DeclarationArrayRestStatement = function(out){
	/**
	 * 变量声明数组省略项拓展语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationArrayRestStatement(statements){
		SpreadStatement.call(this, statements);
	};
	DeclarationArrayRestStatement = new Rexjs(DeclarationArrayRestStatement, SpreadStatement);

	DeclarationArrayRestStatement.props({
		/**
		 * 跳出该语句
		 */
		out: function(){
			return out.call(this).origin;
		}
	});

	return DeclarationArrayRestStatement;
}(
	SpreadStatement.prototype.out
);

this.DeclarationArrayRestItemTag = function(DeclarationArrayItemTag, IdentifierExpression){
	/**
	 * 变量声明数组省略项标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayRestItemTag(_type){
		DeclarationArrayItemTag.call(this, _type);
	};
	DeclarationArrayRestItemTag = new Rexjs(DeclarationArrayRestItemTag, DeclarationArrayItemTag);

	DeclarationArrayRestItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayRestItemContextTags;
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
				context.tag = statement.target.target.expression.arrayOf.context.tag.variable
			)
			// 收集变量名
			.collectTo(parser, context, statements);

			// 设置当前表达式
			statement.expression = new IdentifierExpression(context);
		}
	});

	return DeclarationArrayRestItemTag;
}(
	this.DeclarationArrayItemTag,
	this.IdentifierExpression
);

this.DeclarationArrayRestTag = function(ArraySpreadItemTag, ArrayRestDestructuringItemExpression, ArraySpreadItemExpression, DeclarationArrayRestStatement){
	/**
	 * 变量声明数组省略项拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayRestTag(_type){
		ArraySpreadItemTag.call(this, _type);
	};
	DeclarationArrayRestTag = new Rexjs(DeclarationArrayRestTag, ArraySpreadItemTag);
	
	DeclarationArrayRestTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayRestItemTags;
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
			statement.expression = new ArrayRestDestructuringItemExpression(
				new ArraySpreadItemExpression(context)
			);

			// 设置当前语句
			statements.statement = new DeclarationArrayRestStatement(statements);
		}
	});

	return DeclarationArrayRestTag;
}(
	this.ArraySpreadItemTag,
	this.ArrayRestDestructuringItemExpression,
	this.ArraySpreadItemExpression,
	this.DeclarationArrayRestStatement
);

this.DeclarationArrayRestItemSeparatorTag = function(DeclarationArrayItemSeparatorTag){
	/**
	 * 变量声明数组省略项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayRestItemSeparatorTag(_type){
		DeclarationArrayItemSeparatorTag.call(this, _type);
	};
	DeclarationArrayRestItemSeparatorTag = new Rexjs(DeclarationArrayRestItemSeparatorTag, DeclarationArrayItemSeparatorTag);
	
	DeclarationArrayRestItemSeparatorTag.props({
		$type: TYPE_MATCHABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 报错
			parser.error(statement.target.expression.context, ECMAScriptErrors.REST_ELEMENT);
		}
	});

	return DeclarationArrayRestItemSeparatorTag;
}(
	this.DeclarationArrayItemSeparatorTag
);

}.call(
	this,
	this.SpreadStatement
);