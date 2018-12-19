// 父类属性相关
!function(AccessorExpression, BracketAccessorExpression, OpeningBracketAccessorTag, DotAccessorTag, closingSuperBracketAccessorTag, compileSuperAccessor){

this.SuperBracketAccessorExpression = function(extractTo){
	/**
	 * 父类中括号属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statement} statement - 当前语句
	 */
	function SuperBracketAccessorExpression(context, statement){
		BracketAccessorExpression.call(this, context, statement.expression);

		this.closureReference = statement.statements.closure.reference;
	};
	SuperBracketAccessorExpression = new Rexjs(SuperBracketAccessorExpression, BracketAccessorExpression);
	
	SuperBracketAccessorExpression.props({
		closureReference: "",
		/**
		 * 提取属性文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compilePropertyTo: function(contentBuilder){
			// 追加起始小括号，以防止 a[x,y,z] 这样的属性所造成 getProperty 方法的参数混乱
			contentBuilder.appendString("(");
			// 提取中括号内部代码
			this.property.inner.extractTo(contentBuilder);
			// 追加结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 编译父类属性访问器
				compileSuperAccessor(this, contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});
	
	return SuperBracketAccessorExpression;
}(
	BracketAccessorExpression.prototype.extractTo
);

this.SuperDotAccessorExpression = function(extractTo){
	/**
	 * 父类点属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statement} statement - 当前语句
	 */
	function SuperDotAccessorExpression(context, statement){
		AccessorExpression.call(this, context, statement.expression);

		this.closureReference = statement.statements.closure.reference;
	};
	SuperDotAccessorExpression = new Rexjs(SuperDotAccessorExpression, AccessorExpression);
	
	SuperDotAccessorExpression.props({
		closureReference: "",
		/**
		 * 提取属性文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compilePropertyTo: function(contentBuilder){
			// 追加起始双引号
			contentBuilder.appendString('"');
			// 追加属性
			contentBuilder.appendContext(this.property);
			// 追加结束双引号
			contentBuilder.appendString('"');
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 编译父类属性访问器
				compileSuperAccessor(this, contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});
	
	return SuperDotAccessorExpression;
}(
	AccessorExpression.prototype.extractTo
);

this.OpeningSuperBracketAccessorTag = function(SuperBracketAccessorExpression, BracketAccessorStatement, visitor){
	/**
	 * 起始父类中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningSuperBracketAccessorTag(_type){
		OpeningBracketAccessorTag.call(this, _type);
	};
	OpeningSuperBracketAccessorTag = new Rexjs(OpeningSuperBracketAccessorTag, OpeningBracketAccessorTag);
	
	OpeningSuperBracketAccessorTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingSuperBracketAccessorTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new SuperBracketAccessorExpression(context, statement);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new BracketAccessorStatement(statements);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前闭包申请调用 super
			statements.closure.applySuper(parser, statement.expression.context, context);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return OpeningSuperBracketAccessorTag;
}(
	this.SuperBracketAccessorExpression,
	this.BracketAccessorStatement,
	OpeningBracketAccessorTag.prototype.visitor
);

this.ClosingSuperBracketAccessorTag = function(ClosingBracketAccessorTag){
	/**
	 * 结束父类中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingSuperBracketAccessorTag(_type){
		ClosingBracketAccessorTag.call(this, _type);
	};
	ClosingSuperBracketAccessorTag = new Rexjs(ClosingSuperBracketAccessorTag, ClosingBracketAccessorTag);
	
	ClosingSuperBracketAccessorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superAccessorContextTags;
		}
	});
	
	return ClosingSuperBracketAccessorTag;
}(
	this.ClosingBracketAccessorTag
);

this.SuperDotAccessorTag = function(SuperDotAccessorExpression, visitor){
	/**
	 * 父类点属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperDotAccessorTag(_type){
		DotAccessorTag.call(this, _type);
	};
	SuperDotAccessorTag = new Rexjs(SuperDotAccessorTag, DotAccessorTag);
	
	SuperDotAccessorTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new SuperDotAccessorExpression(context, statement);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superPropertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前闭包申请调用 super
			statements.closure.applySuper(parser, statement.expression.context, context);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return SuperDotAccessorTag;
}(
	this.SuperDotAccessorExpression,
	DotAccessorTag.prototype.visitor
);

this.SuperPropertyNameTag = function(PropertyNameTag){
	/**
	 * 父类属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyNameTag(_type){
		PropertyNameTag.call(this, _type);
	};
	SuperPropertyNameTag = new Rexjs(SuperPropertyNameTag, PropertyNameTag);
	
	SuperPropertyNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superAccessorContextTags;
		}
	});
	
	return SuperPropertyNameTag;
}(
	this.PropertyNameTag
);

closingSuperBracketAccessorTag = new this.ClosingSuperBracketAccessorTag();

}.call(
	this,
	this.AccessorExpression,
	this.BracketAccessorExpression,
	this.OpeningBracketAccessorTag,
	this.DotAccessorTag,
	// closingSuperBracketAccessorTag
	null,
	// compileSuperAccessor
	function(expression, contentBuilder, extractProperty){
		// 追加获取父类属性方法的起始代码
		contentBuilder.appendString("(Rexjs.Super.getProperty(");
		// 提取 super 表达式
		expression.object.extractTo(contentBuilder);
		// 追加当前环境的 this 指向
		contentBuilder.appendString("," + expression.closureReference + ",");
		// 提取属性
		expression.compilePropertyTo(contentBuilder);
		// 追加一系列结束小括号
		contentBuilder.appendString("))");
	}
);