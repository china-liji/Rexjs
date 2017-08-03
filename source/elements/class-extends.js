// 继承标签相关
~function(){

this.ExtendsStatement = function(){
	function ExtendsStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ExtendsStatement = new Rexjs(ExtendsStatement, ECMAScriptStatement);

	ExtendsStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果是起始大括号
			if(context.content !== "{"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 extends 表达式的 super 属性
			this.out().extends.super = this.expression;
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.extends.context.tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			switch(context.content){
				// 点属性访问器
				case ".":
					break;

				// 中括号属性访问器
				case "[":
					break;

				// 方法调用
				case "(":
					break;

				// 模板方法调用
				case "`":
					break;

				default:
					// 报错
					parser.error(context);
					return null;
			}

			return context.tag;
		}
	});

	return ExtendsStatement;
}();

this.ExtendsTag = function(ExtendsExpression, ExtendsStatement, openClassBodyTag){
	/**
	 * extends 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ExtendsTag(_type){
		SyntaxTag.call(this, _type);
	};
	ExtendsTag = new Rexjs(ExtendsTag, SyntaxTag);

	ExtendsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return openClassBodyTag;
		},
		regexp: /extends/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.extendsContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置类表达式的 extends 属性
			statement.expression.extends = new ExtendsExpression(context);
			// 设置当前语句
			statements.statement = new ExtendsStatement(statements);
		}
	});

	return ExtendsTag;
}(
	this.ExtendsExpression,
	this.ExtendsStatement,
	// openClassBodyTag
	new this.OpenClassBodyTag()
);

}.call(
	this
);