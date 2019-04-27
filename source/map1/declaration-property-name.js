// 对象解构声明的属性名相关
!function(IdentifierPropertyNameTag, PropertyDestructuringItemExpression, closingDeclarationComputedPropertyNameTag, require){

this.DeclarationIdentifierPropertyNameStatement = function(both){
	/**
	 * 标识符声明属性名称语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationIdentifierPropertyNameStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	DeclarationIdentifierPropertyNameStatement = new Rexjs(DeclarationIdentifierPropertyNameStatement, ECMAScriptStatement);

	DeclarationIdentifierPropertyNameStatement.props({
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

	return DeclarationIdentifierPropertyNameStatement;
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

this.DeclarationIdentifierPropertyNameTag = function(DeclarationIdentifierPropertyNameStatement, visitor){
	/**
	 * 标识符声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationIdentifierPropertyNameTag(_type){
		IdentifierPropertyNameTag.call(this, _type);
	};
	DeclarationIdentifierPropertyNameTag = new Rexjs(DeclarationIdentifierPropertyNameTag, IdentifierPropertyNameTag);

	DeclarationIdentifierPropertyNameTag.props({
		regexp: IdentifierPropertyNameTag.compileRegExp(
			IdentifierPropertyNameTag.exceptions.join("|")
		),
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
			statements.statement = new DeclarationIdentifierPropertyNameStatement(statements);
		}
	});

	return DeclarationIdentifierPropertyNameTag;
}(
	this.DeclarationIdentifierPropertyNameStatement,
	IdentifierPropertyNameTag.prototype.visitor
);

this.DeclarationNumberPropertyNameTag = function(NumberPropertyNameTag){
	/**
	 * 数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationNumberPropertyNameTag(_type){
		NumberPropertyNameTag.call(this, _type);
	};
	DeclarationNumberPropertyNameTag = new Rexjs(DeclarationNumberPropertyNameTag, NumberPropertyNameTag);

	DeclarationNumberPropertyNameTag.props({
		require: require
	});

	return DeclarationNumberPropertyNameTag;
}(
	this.NumberPropertyNameTag
);

this.DeclarationBinaryNumberPropertyNameTag = function(BinaryNumberPropertyNameTag){
	/**
	 * 二进制数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationBinaryNumberPropertyNameTag(_type){
		BinaryNumberPropertyNameTag.call(this, _type);
	};
	DeclarationBinaryNumberPropertyNameTag = new Rexjs(DeclarationBinaryNumberPropertyNameTag, BinaryNumberPropertyNameTag);

	DeclarationBinaryNumberPropertyNameTag.props({
		require: require
	});

	return DeclarationBinaryNumberPropertyNameTag;
}(
	this.BinaryNumberPropertyNameTag
);

this.DeclarationOctalNumberPropertyNameTag = function(OctalNumberPropertyNameTag){
	/**
	 * 八进制数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationOctalNumberPropertyNameTag(_type){
		OctalNumberPropertyNameTag.call(this, _type);
	};
	DeclarationOctalNumberPropertyNameTag = new Rexjs(DeclarationOctalNumberPropertyNameTag, OctalNumberPropertyNameTag);

	DeclarationOctalNumberPropertyNameTag.props({
		require: require
	});

	return DeclarationOctalNumberPropertyNameTag;
}(
	this.OctalNumberPropertyNameTag
);

this.DeclarationWordPropertyNameTag = function(WordPropertyNameTag){
	/**
	 * 词组（即其他非标识符）属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationWordPropertyNameTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	DeclarationWordPropertyNameTag = new Rexjs(DeclarationWordPropertyNameTag, WordPropertyNameTag);

	DeclarationWordPropertyNameTag.props({
		require: require
	});

	return DeclarationWordPropertyNameTag;
}(
	this.WordPropertyNameTag
);

this.DeclarationStringPropertyNameTag = function(StringPropertyNameTag){
	/**
	 * 字符串声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationStringPropertyNameTag(_type){
		StringPropertyNameTag.call(this, _type);
	};
	DeclarationStringPropertyNameTag = new Rexjs(DeclarationStringPropertyNameTag, StringPropertyNameTag);

	DeclarationStringPropertyNameTag.props({
		require: require
	});

	return DeclarationStringPropertyNameTag;
}(
	this.StringPropertyNameTag
);

this.OpeningDeclarationComputedPropertyNameTag = function(OpeningComputedPropertyNameTag){
	/**
	 * 起始计算式属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningDeclarationComputedPropertyNameTag(_type){
		OpeningComputedPropertyNameTag.call(this, _type);
	};
	OpeningDeclarationComputedPropertyNameTag = new Rexjs(OpeningDeclarationComputedPropertyNameTag, OpeningComputedPropertyNameTag);

	OpeningDeclarationComputedPropertyNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingDeclarationComputedPropertyNameTag;
		}
	});

	return OpeningDeclarationComputedPropertyNameTag;
}(
	this.OpeningComputedPropertyNameTag
);

this.ClosingDeclarationComputedPropertyNameTag = function(ClosingComputedPropertyNameTag){
	/**
	 * 结束计算式属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingDeclarationComputedPropertyNameTag(_type){
		ClosingComputedPropertyNameTag.call(this, _type);
	};
	ClosingDeclarationComputedPropertyNameTag = new Rexjs(ClosingDeclarationComputedPropertyNameTag, ClosingComputedPropertyNameTag);

	ClosingDeclarationComputedPropertyNameTag.props({
		require: require
	});

	return ClosingDeclarationComputedPropertyNameTag;
}(
	this.ClosingComputedPropertyNameTag
);

closingDeclarationComputedPropertyNameTag = new this.ClosingDeclarationComputedPropertyNameTag();

}.call(
	this,
	this.IdentifierPropertyNameTag,
	this.PropertyDestructuringItemExpression,
	// closingDeclarationComputedPropertyNameTag
	null,
	// require
	function(tagsMap){
		return tagsMap.declarationPropertyNameSeparatorTags;
	}
);