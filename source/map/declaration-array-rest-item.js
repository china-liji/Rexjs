// 声明数组省略项相关
!function(){

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

this.DeclarationArrayRestTag = function(ArraySpreadTag, ArrayDestructuringRestItemExpression, ArraySpreadItemExpression, DeclarationRestStatement){
	/**
	 * 变量声明数组省略项拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayRestTag(_type){
		ArraySpreadTag.call(this, _type);
	};
	DeclarationArrayRestTag = new Rexjs(DeclarationArrayRestTag, ArraySpreadTag);
	
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
			statement.expression = new ArrayDestructuringRestItemExpression(
				new ArraySpreadItemExpression(context)
			);

			// 设置当前语句
			statements.statement = new DeclarationRestStatement(statements);
		}
	});

	return DeclarationArrayRestTag;
}(
	this.ArraySpreadTag,
	this.ArrayDestructuringRestItemExpression,
	this.ArraySpreadItemExpression,
	this.DeclarationRestStatement
);

}.call(
	this
);