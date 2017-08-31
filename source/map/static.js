// 静态标签相关
!function(){

this.StaticTag = function(){
	/**
	 * 静态标签
	 * @param {Number} _type - 标签类型
	 */
	function StaticTag(_type){
		SyntaxTag.call(this, _type);
	};
	StaticTag = new Rexjs(StaticTag, SyntaxTag);

	StaticTag.props({
		regexp: /static/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 close
			statement.expression.body.close = context;
		}
	});

	return StaticTag;
}();

this.StaticModifierTag = function(StaticTag, IdentifierPropertyNameExpression){
	/**
	 * 静态属性修饰符标签
	 * @param {Number} _type - 标签类型
	 */
	function StaticModifierTag(_type){
		StaticTag.call(this, _type);
	};
	StaticModifierTag = new Rexjs(StaticModifierTag, StaticTag);

	StaticModifierTag.props({
		order: ECMAScriptOrders.STATIC_MODIFIER,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.staticModifierContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var classPropertyExpression = statement.expression;

			// 设置类属性表达式的修饰符
			classPropertyExpression.modifier = context;
			// 设置类属性表达式的属性名
			classPropertyExpression.name = new IdentifierPropertyNameExpression(context);
		}
	});

	return StaticModifierTag;
}(
	this.StaticTag,
	this.IdentifierPropertyNameExpression
);

}.call(
	this
);