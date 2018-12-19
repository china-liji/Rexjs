// 数组声明解构内的对象解构相关
!function(ClosingDeclarationObjectTag, closingObjectDeclarationArrayItemTag){

this.OpeningObjectDeclarationArrayItemTag = function(OpeningDeclarationObjectTag){
	/**
	 * 对象声明数组项（即数组声明解构中，所嵌套的对象解构）起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningObjectDeclarationArrayItemTag(_type){
		OpeningDeclarationObjectTag.call(this, _type);
	};
	OpeningObjectDeclarationArrayItemTag = new Rexjs(OpeningObjectDeclarationArrayItemTag, OpeningDeclarationObjectTag);
	
	OpeningObjectDeclarationArrayItemTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingObjectDeclarationArrayItemTag;
		},
		/**
		 * 获取拥有该对象的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getObjectOf: function(statement){
			return statement.target.expression.arrayOf;
		}
	});

	return OpeningObjectDeclarationArrayItemTag;
}(
	this.OpeningDeclarationObjectTag
);

this.ClosingObjectDeclarationArrayItemTag = function(visitor){
	/**
	 * 对象声明数组项（即数组声明解构中，所嵌套的对象解构）结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingObjectDeclarationArrayItemTag(_type){
		ClosingDeclarationObjectTag.call(this, _type);
	};
	ClosingObjectDeclarationArrayItemTag = new Rexjs(ClosingObjectDeclarationArrayItemTag, ClosingDeclarationObjectTag);
	
	ClosingObjectDeclarationArrayItemTag.props({
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
	
	return ClosingObjectDeclarationArrayItemTag;
}(
	ClosingDeclarationObjectTag.prototype.visitor
);

closingObjectDeclarationArrayItemTag = new this.ClosingObjectDeclarationArrayItemTag();

}.call(
	this,
	this.ClosingDeclarationObjectTag,
	// closingObjectDeclarationArrayItemTag
	null
);