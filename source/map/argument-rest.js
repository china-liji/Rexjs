// 函数省略参数相关
~function(){

this.RestArgumentExpression = function(ArgumentExpression, config){
	/**
	 * 省略参数表达式
	 * @param {Context} context - 拓展符语法标签上下文
	 * @param {Number} index - 省略参数位于参数列表中的索引
	 */
	function RestArgumentExpression(context, index){
		ArgumentExpression.call(this, context);

		this.index = index;
	};
	RestArgumentExpression = new Rexjs(RestArgumentExpression, ArgumentExpression);

	RestArgumentExpression.props({
		name: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 如果需要编译省略参数
			if(config.value){
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

	return RestArgumentExpression;
}(
	this.ArgumentExpression,
	// config
	ECMAScriptConfig.addBaseConfig("restArgument")
);

this.RestTag = function(SpreadTag, RestArgumentExpression){
	/**
	 * 参数省略符标签
	 * @param {Number} _type - 标签类型
	 */
	function RestTag(_type){
		SpreadTag.call(this, _type);
	};
	RestTag = new Rexjs(RestTag, SpreadTag);

	RestTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restArgumentNameTags;
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
			statement.expression = new RestArgumentExpression(
				context,
				statement.target.expression.arguments.inner.length
			);
		}
	});

	return RestTag;
}(
	this.SpreadTag,
	this.RestArgumentExpression
);

this.RestArgumentNameTag = function(ArgumentNameTag){
	/**
	 * 省略参数名标签
	 * @param {Number} _type - 标签类型
	 */
	function RestArgumentNameTag(_type){
		ArgumentNameTag.call(this, _type);
	};
	RestArgumentNameTag = new Rexjs(RestArgumentNameTag, ArgumentNameTag);

	RestArgumentNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restArgumentNameContextTags;
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

	return RestArgumentNameTag;
}(
	this.ArgumentNameTag
);

this.RestArgumentSeparatorTag = function(ArgumentSeparatorTag){
	/**
	 * 省略参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function RestArgumentSeparatorTag(_type){
		ArgumentSeparatorTag.call(this, _type);
	};
	RestArgumentSeparatorTag = new Rexjs(RestArgumentSeparatorTag, ArgumentSeparatorTag);

	RestArgumentSeparatorTag.props({
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

	return RestArgumentSeparatorTag;
}(
	this.ArgumentSeparatorTag
);

}.call(
	this
);