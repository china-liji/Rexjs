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

	DeclarationArrayRestItemTag.$({
		/**
		 * 获取该标签所处的数组语句
		 * @param {Statement} statement - 当前语句
		 */
		getArrayStatement: function(statement){
			return statement.target;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new IdentifierExpression(context);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayRestItemContextTags;
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
	
	DeclarationArrayRestTag.$({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new ArrayDestructuringRestItemExpression(
				new ArraySpreadItemExpression(context)
			);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new DeclarationRestStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayRestItemTags;
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