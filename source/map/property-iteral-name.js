// 对象字面量属性名相关
!function(require, requireOfMethodName, visitor, visitorOfMathematicalNumeral){

this.LiteralPropertyNameExpression = function(){
	/**
	 * 对象字面量属性名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LiteralPropertyNameExpression(context){
		Expression.call(this, context);
	};
	LiteralPropertyNameExpression = new Rexjs(LiteralPropertyNameExpression, Expression);

	LiteralPropertyNameExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加起始中括号
			contentBuilder.appendString("[");
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
			// 追加结束中括号
			contentBuilder.appendString("]");
		}
	});

	return LiteralPropertyNameExpression;
}();

require = function(){
	/**
	 * 获取此标签接下来所需匹配的标签列表
	 * @param {TagsMap} tagsMap - 标签集合映射
	 */
	return function(tagsMap){
		return tagsMap.propertyNameContextTags;
	};
}();

requireOfMethodName = function(){
	/**
	 * 获取此标签接下来所需匹配的标签列表
	 * @param {TagsMap} tagsMap - 标签集合映射
	 */
	return function(tagsMap){
		return tagsMap.shorthandMethodArgumentsTags;
	};
}();

visitor = function(LiteralPropertyNameExpression){
	/**
	 * 标签访问器
	 * @param {SyntaxParser} parser - 语法解析器
	 * @param {Context} context - 标签上下文
	 * @param {Statement} statement - 当前语句
	 * @param {Statements} statements - 当前语句块
	 */
	return function(parser, context, statement){
		// 设置表达式的 name 属性
		statement.expression.name = new LiteralPropertyNameExpression(context);
	};
}(
	this.LiteralPropertyNameExpression
);

visitorOfMathematicalNumeral = function(){
	/**
	 * 标签访问器
	 * @param {SyntaxParser} parser - 语法解析器
	 * @param {Context} context - 标签上下文
	 * @param {Statement} statement - 当前语句
	 * @param {Statements} statements - 当前语句块
	 */
	return function(parser, context, statement, statements){
		// 如果需要用 parseInt
		if(this.useParse()){
			// 自动化生成变量
			statement.target.expression.autoVariable(statements);
		}
		
		// 调用 visitor 方法
		visitor.call(this, parser, context, statement, statements);
	};
}();

this.StringPropertyNameTag = function(StringTag){
	/**
	 * 字符串属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function StringPropertyNameTag(_type){
		StringTag.call(this, _type);
	};
	StringPropertyNameTag = new Rexjs(StringPropertyNameTag, StringTag);

	StringPropertyNameTag.props({
		require: require,
		visitor: visitor
	});

	return StringPropertyNameTag;
}(
	this.StringTag
);

this.StringMethodNameTag = function(StringPropertyNameTag){
	/**
	 * 字符串方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function StringMethodNameTag(context){
		StringPropertyNameTag.call(this, context);
	};
	StringMethodNameTag = new Rexjs(StringMethodNameTag, StringPropertyNameTag);

	StringMethodNameTag.props({
		require: requireOfMethodName
	});

	return StringMethodNameTag;
}(
	this.StringPropertyNameTag
);

this.NumberPropertyNameTag = function(NumberTag){
	/**
	 * 数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberPropertyNameTag(_type){
		NumberTag.call(this, _type);
	};
	NumberPropertyNameTag = new Rexjs(NumberPropertyNameTag, NumberTag);

	NumberPropertyNameTag.props({
		require: require,
		visitor: visitor
	});

	return NumberPropertyNameTag;
}(
	this.NumberTag
);

this.NumberMethodNameTag = function(NumberPropertyNameTag){
	/**
	 * 数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberMethodNameTag(context){
		NumberPropertyNameTag.call(this, context);
	};
	NumberMethodNameTag = new Rexjs(NumberMethodNameTag, NumberPropertyNameTag);

	NumberMethodNameTag.props({
		require: requireOfMethodName
	});

	return NumberMethodNameTag;
}(
	this.NumberPropertyNameTag
);

this.BinaryNumberPropertyNameTag = function(BinaryNumberTag){
	/**
	 * 二进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberPropertyNameTag(_type){
		BinaryNumberTag.call(this, _type);
	};
	BinaryNumberPropertyNameTag = new Rexjs(BinaryNumberPropertyNameTag, BinaryNumberTag);
	
	BinaryNumberPropertyNameTag.props({
		require: require,
		visitor: visitorOfMathematicalNumeral
	});
	
	return BinaryNumberPropertyNameTag;
}(
	this.BinaryNumberTag
);

this.BinaryNumberMethodNameTag = function(BinaryNumberPropertyNameTag){
	/**
	 * 二进制数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberMethodNameTag(context){
		BinaryNumberPropertyNameTag.call(this, context);
	};
	BinaryNumberMethodNameTag = new Rexjs(BinaryNumberMethodNameTag, BinaryNumberPropertyNameTag);

	BinaryNumberMethodNameTag.props({
		require: requireOfMethodName
	});

	return BinaryNumberMethodNameTag;
}(
	this.BinaryNumberPropertyNameTag
);

this.OctalNumberPropertyNameTag = function(OctalNumberTag){
	/**
	 * 八进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberPropertyNameTag(_type){
		OctalNumberTag.call(this, _type);
	};
	OctalNumberPropertyNameTag = new Rexjs(OctalNumberPropertyNameTag, OctalNumberTag);
	
	OctalNumberPropertyNameTag.props({
		require: require,
		visitor: visitorOfMathematicalNumeral
	});
	
	return OctalNumberPropertyNameTag;
}(
	this.OctalNumberTag
);

this.OctalNumberMethodNameTag = function(OctalNumberPropertyNameTag){
	/**
	 * 八进制数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberMethodNameTag(context){
		OctalNumberPropertyNameTag.call(this, context);
	};
	OctalNumberMethodNameTag = new Rexjs(OctalNumberMethodNameTag, OctalNumberPropertyNameTag);

	OctalNumberMethodNameTag.props({
		require: requireOfMethodName
	});

	return OctalNumberMethodNameTag;
}(
	this.OctalNumberPropertyNameTag
);

}.call(
	this,
	// require
	null,
	// requireOfMethodName
	null,
	// visitor
	null,
	// visitorOfMathematicalNumeral
	null
);