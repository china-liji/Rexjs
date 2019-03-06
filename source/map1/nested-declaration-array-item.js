// 变量声明数组项标签相关
!function(ClosingDeclarationArrayTag, closingDeclarationNestedArrayItemTag){

this.OpeningDeclarationNestedArrayItemTag = function(OpeningDeclarationArrayTag){
	/**
	 * 嵌套的变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningDeclarationNestedArrayItemTag(_type){
		OpeningDeclarationArrayTag.call(this, _type);
	};
	OpeningDeclarationNestedArrayItemTag = new Rexjs(OpeningDeclarationNestedArrayItemTag, OpeningDeclarationArrayTag);
	
	OpeningDeclarationNestedArrayItemTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingDeclarationNestedArrayItemTag;
		},
		/**
		 * 获取拥有该数组的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getArrayOf: function(statement){
			return statement.target.expression.arrayOf;
		}
	});

	return OpeningDeclarationNestedArrayItemTag;
}(
	this.OpeningDeclarationArrayTag
);

this.ClosingDeclarationNestedArrayItemTag = function(visitor){
	/**
	 * 标签变量声明数组结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingDeclarationNestedArrayItemTag(_type){
		ClosingDeclarationArrayTag.call(this, _type);
	};
	ClosingDeclarationNestedArrayItemTag = new Rexjs(ClosingDeclarationNestedArrayItemTag, ClosingDeclarationArrayTag);
	
	ClosingDeclarationNestedArrayItemTag.props({
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
	
	return ClosingDeclarationNestedArrayItemTag;
}(
	ClosingDeclarationArrayTag.prototype.visitor
);

closingDeclarationNestedArrayItemTag = new this.ClosingDeclarationNestedArrayItemTag();

}.call(
	this,
	this.ClosingDeclarationArrayTag,
	// closingDeclarationNestedArrayItemTag
	null
);