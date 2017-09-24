// 对象解构声明的属性名相关
!function(IdentifierPropertyNameTag, PropertyDestructuringItemExpression, closeComputedDeclarationPropertyNameTag, require){

this.IdentifierDeclarationPropertyNameStatement = function(both){
	/**
	 * 标识符声明属性名称语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IdentifierDeclarationPropertyNameStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	IdentifierDeclarationPropertyNameStatement = new Rexjs(IdentifierDeclarationPropertyNameStatement, ECMAScriptStatement);

	IdentifierDeclarationPropertyNameStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return both(
				parser,
				this,
				context.content === "}"
			);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			return both(
				parser,
				this,
				context.content === ","
			);
		}
	});

	return IdentifierDeclarationPropertyNameStatement;
}(
	// both
	function(parser, statement, isSeparator){
		// 跳出语句并获取表达式
		var expression = statement.out();

		// 如果是分隔符
		if(isSeparator){
			var context = expression.name.context, variable = statement.target.target.expression.objectOf.context.tag.variable;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			context.tag = variable;

			// 收集变量名
			variable.collectTo(parser, context, parser.statements);

			// 绑定解构项表达式
			statement.target.bound = new PropertyDestructuringItemExpression(expression);
		}

		return null;
	}
);

this.IdentifierDeclarationPropertyNameTag = function(IdentifierDeclarationPropertyNameStatement, visitor){
	/**
	 * 标识符声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierDeclarationPropertyNameTag(_type){
		IdentifierPropertyNameTag.call(this, _type);
	};
	IdentifierDeclarationPropertyNameTag = new Rexjs(IdentifierDeclarationPropertyNameTag, IdentifierPropertyNameTag);

	IdentifierDeclarationPropertyNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.identifierDeclarationPropertyNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 设置当前语句
			statements.statement = new IdentifierDeclarationPropertyNameStatement(statements);
		}
	});

	return IdentifierDeclarationPropertyNameTag;
}(
	this.IdentifierDeclarationPropertyNameStatement,
	IdentifierPropertyNameTag.prototype.visitor
);

this.NumberDeclarationPropertyNameTag = function(NumberPropertyNameTag){
	/**
	 * 数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberDeclarationPropertyNameTag(_type){
		NumberPropertyNameTag.call(this, _type);
	};
	NumberDeclarationPropertyNameTag = new Rexjs(NumberDeclarationPropertyNameTag, NumberPropertyNameTag);

	NumberDeclarationPropertyNameTag.props({
		require: require
	});

	return NumberDeclarationPropertyNameTag;
}(
	this.NumberPropertyNameTag
);

this.BinaryNumberDeclarationPropertyNameTag = function(BinaryNumberPropertyNameTag){
	/**
	 * 二进制数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberDeclarationPropertyNameTag(_type){
		BinaryNumberPropertyNameTag.call(this, _type);
	};
	BinaryNumberDeclarationPropertyNameTag = new Rexjs(BinaryNumberDeclarationPropertyNameTag, BinaryNumberPropertyNameTag);

	BinaryNumberDeclarationPropertyNameTag.props({
		require: require
	});

	return BinaryNumberDeclarationPropertyNameTag;
}(
	this.BinaryNumberPropertyNameTag
);

this.OctalNumberDeclarationPropertyNameTag = function(OctalNumberPropertyNameTag){
	/**
	 * 八进制数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberDeclarationPropertyNameTag(_type){
		OctalNumberPropertyNameTag.call(this, _type);
	};
	OctalNumberDeclarationPropertyNameTag = new Rexjs(OctalNumberDeclarationPropertyNameTag, OctalNumberPropertyNameTag);

	OctalNumberDeclarationPropertyNameTag.props({
		require: require
	});

	return OctalNumberDeclarationPropertyNameTag;
}(
	this.OctalNumberPropertyNameTag
);

this.KeywordDeclarationPropertyNameTag = function(KeywordPropertyNameTag){
	/**
	 * 关键字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function KeywordDeclarationPropertyNameTag(_type){
		KeywordPropertyNameTag.call(this, _type);
	};
	KeywordDeclarationPropertyNameTag = new Rexjs(KeywordDeclarationPropertyNameTag, KeywordPropertyNameTag);

	KeywordDeclarationPropertyNameTag.props({
		require: require
	});

	return KeywordDeclarationPropertyNameTag;
}(
	this.KeywordPropertyNameTag
);

this.StringDeclarationPropertyNameTag = function(StringPropertyNameTag){
	/**
	 * 字符串声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function StringDeclarationPropertyNameTag(_type){
		StringPropertyNameTag.call(this, _type);
	};
	StringDeclarationPropertyNameTag = new Rexjs(StringDeclarationPropertyNameTag, StringPropertyNameTag);

	StringDeclarationPropertyNameTag.props({
		require: require
	});

	return StringDeclarationPropertyNameTag;
}(
	this.StringPropertyNameTag
);

this.OpenComputedDeclarationPropertyNameTag = function(OpenComputedPropertyNameTag){
	/**
	 * 起始计算式属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenComputedDeclarationPropertyNameTag(_type){
		OpenComputedPropertyNameTag.call(this, _type);
	};
	OpenComputedDeclarationPropertyNameTag = new Rexjs(OpenComputedDeclarationPropertyNameTag, OpenComputedPropertyNameTag);

	OpenComputedDeclarationPropertyNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeComputedDeclarationPropertyNameTag;
		}
	});

	return OpenComputedDeclarationPropertyNameTag;
}(
	this.OpenComputedPropertyNameTag
);

this.CloseComputedDeclarationPropertyNameTag = function(CloseComputedPropertyNameTag){
	/**
	 * 结束计算式属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseComputedDeclarationPropertyNameTag(_type){
		CloseComputedPropertyNameTag.call(this, _type);
	};
	CloseComputedDeclarationPropertyNameTag = new Rexjs(CloseComputedDeclarationPropertyNameTag, CloseComputedPropertyNameTag);

	CloseComputedDeclarationPropertyNameTag.props({
		require: require
	});

	return CloseComputedDeclarationPropertyNameTag;
}(
	this.CloseComputedPropertyNameTag
);

closeComputedDeclarationPropertyNameTag = new this.CloseComputedDeclarationPropertyNameTag();

}.call(
	this,
	this.IdentifierPropertyNameTag,
	this.PropertyDestructuringItemExpression,
	// closeComputedDeclarationPropertyNameTag
	null,
	// require
	function(tagsMap){
		return tagsMap.declarationPropertyNameSeparatorTags;
	}
);