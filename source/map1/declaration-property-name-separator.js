// 对象解构声明的属性名分隔符相关
!function(PropertyInitializerTag, PropertyNameSeparatorTag){

this.DeclarationPropertyNameInitializerTag = function(PropertyDefaultDestructuringItemExpression, visitor){
	/**
	 * 变量声明属性名初始化标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyNameInitializerTag(_type){
		PropertyInitializerTag.call(this, _type);
	};
	DeclarationPropertyNameInitializerTag = new Rexjs(DeclarationPropertyNameInitializerTag, PropertyInitializerTag);

	DeclarationPropertyNameInitializerTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression, ctx = expression.name.context,
			
				variable = statement.target.expression.objectOf.context.tag.variable;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			ctx.tag = variable;

			// 收集变量名
			variable.collectTo(parser, ctx, statements);
			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 绑定解构项表达式
			statement.bound = new PropertyDefaultDestructuringItemExpression(expression, expression, statements);
		}
	});

	return DeclarationPropertyNameInitializerTag;
}(
	this.PropertyDefaultDestructuringItemExpression,
	PropertyInitializerTag.prototype.visitor
);

this.DeclarationPropertyNameSeparatorTag = function(visitor){
	/**
	 * 变量声明属性名称的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyNameSeparatorTag(_type){
		PropertyNameSeparatorTag.call(this, _type);
	};
	DeclarationPropertyNameSeparatorTag = new Rexjs(DeclarationPropertyNameSeparatorTag, PropertyNameSeparatorTag);

	DeclarationPropertyNameSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyValueTags;
		}
	});

	return DeclarationPropertyNameSeparatorTag;
}(
	PropertyNameSeparatorTag.prototype.visitor
);

}.call(
	this,
	this.PropertyInitializerTag,
	this.PropertyNameSeparatorTag
);