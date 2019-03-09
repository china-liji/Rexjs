// 函数省略参数相关
!function(){

this.ArgumentRestValueExpression = function(ArgumentExpression){
	/**
	 * 省略参数表达式
	 * @param {Context} context - 拓展符语法标签上下文
	 * @param {Number} index - 省略参数位于参数列表中的索引
	 */
	function ArgumentRestValueExpression(context, index){
		ArgumentExpression.call(this, context);

		this.index = index;
	};
	ArgumentRestValueExpression = new Rexjs(ArgumentRestValueExpression, ArgumentExpression);

	ArgumentRestValueExpression.props({
		name: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 将默认参数名追加至临时生成器
				anotherBuilder.appendContext(this.name);
				// 将赋值运算追加至临时生成器
				anotherBuilder.appendString("=Rexjs.toArray(arguments," + this.index + ");");
			}
			else {
				// 直接正式添加省略符
				contentBuilder.appendContext(this.context);
			}

			// 正式的追加参数名
			contentBuilder.appendContext(this.name);
		},
		index: 0
	});

	return ArgumentRestValueExpression;
}(
	this.ArgumentExpression
);

this.ArgumentRestOperatorTag = function(SpreadTag, ArgumentRestValueExpression){
	/**
	 * 参数省略符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentRestOperatorTag(_type){
		SpreadTag.call(this, _type);
	};
	ArgumentRestOperatorTag = new Rexjs(ArgumentRestOperatorTag, SpreadTag);

	ArgumentRestOperatorTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new ArgumentRestValueExpression(
				context,
				statement.target.expression.arguments.inner.length
			);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.argumentRestNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式
			context.setExpressionOf(statement);
		}
	});

	return ArgumentRestOperatorTag;
}(
	this.SpreadTag,
	this.ArgumentRestValueExpression
);

this.ArgumentRestNameTag = function(ArgumentNameTag){
	/**
	 * 省略参数名标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentRestNameTag(_type){
		ArgumentNameTag.call(this, _type);
	};
	ArgumentRestNameTag = new Rexjs(ArgumentRestNameTag, ArgumentNameTag);

	ArgumentRestNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.argumentRestNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statement.target.expression.arguments.collection);

			// 设置省略参数名
			statement.expression.name = context;
		}
	});

	return ArgumentRestNameTag;
}(
	this.ArgumentNameTag
);

this.ArgumentRestValueSeparatorTag = function(ArgumentSeparatorTag){
	/**
	 * 省略参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentRestValueSeparatorTag(_type){
		ArgumentSeparatorTag.call(this, _type);
	};
	ArgumentRestValueSeparatorTag = new Rexjs(ArgumentRestValueSeparatorTag, ArgumentSeparatorTag);

	ArgumentRestValueSeparatorTag.props({
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
			parser.error(statement.expression.context, ECMAScriptErrors.REST_PARAMETER);
		}
	});

	return ArgumentRestValueSeparatorTag;
}(
	this.ArgumentSeparatorTag
);

}.call(
	this
);