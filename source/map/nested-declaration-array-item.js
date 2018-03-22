// 变量声明数组项标签相关
!function(CloseDeclarationArrayTag, closeNestedDeclarationArrayItemTag){

this.OpenNestedDeclarationArrayItemTag = function(OpenDeclarationArrayTag){
	/**
	 * 嵌套的变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenNestedDeclarationArrayItemTag(_type){
		OpenDeclarationArrayTag.call(this, _type);
	};
	OpenNestedDeclarationArrayItemTag = new Rexjs(OpenNestedDeclarationArrayItemTag, OpenDeclarationArrayTag);
	
	OpenNestedDeclarationArrayItemTag.$({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeNestedDeclarationArrayItemTag;
		},
		/**
		 * 获取拥有该数组的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getArrayOf: function(statement){
			return statement.target.expression.arrayOf;
		}
	});

	return OpenNestedDeclarationArrayItemTag;
}(
	this.OpenDeclarationArrayTag
);

this.CloseNestedDeclarationArrayItemTag = function(visitor){
	/**
	 * 标签变量声明数组结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseNestedDeclarationArrayItemTag(_type){
		CloseDeclarationArrayTag.call(this, _type);
	};
	CloseNestedDeclarationArrayItemTag = new Rexjs(CloseNestedDeclarationArrayItemTag, CloseDeclarationArrayTag);
	
	CloseNestedDeclarationArrayItemTag.$({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayItemSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 将表达式转化为解构项
			statement.expression = statement.expression.toDestructuringItem(parser);
		}
	});
	
	return CloseNestedDeclarationArrayItemTag;
}(
	CloseDeclarationArrayTag.prototype.visitor
);

closeNestedDeclarationArrayItemTag = new this.CloseNestedDeclarationArrayItemTag();

}.call(
	this,
	this.CloseDeclarationArrayTag,
	// closeNestedDeclarationArrayItemTag
	NULL
);