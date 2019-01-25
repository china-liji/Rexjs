// for 循环迭代符表达式相关
!function(){

this.IterationStatement = function(BinaryStatement){
	/**
	 * 迭代语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IterationStatement(statements){
		BinaryStatement.call(this, statements);
	};
	IterationStatement = new Rexjs(IterationStatement, BinaryStatement);

	IterationStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出当前语句并设置 right
			this.out().right = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(){
			return null;
		}
	});

	return IterationStatement;
}(
	this.BinaryStatement
);

this.IteratorTag = function(BinaryKeywordTag, BinaryExpression, IterationStatement, visitor){
	/**
	 * for 循环迭代符标签
	 * @param {Number} _type - 标签类型
	 */
	function IteratorTag(_type){
		BinaryKeywordTag.call(this, _type);
	};
	IteratorTag = new Rexjs(IteratorTag, BinaryKeywordTag);

	IteratorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new IterationStatement(statements);
		},
		/**
		 * 判断编译时是否需要临时变量名
		 * @param {Statements} statements - 当前语句块
		 */
		hasVariable: function(statements){
			return statements.contextGeneratorIfNeedCompile !== null;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression, forExpression = statement.target.expression;

			// 设置 for 表达式的 iterator 属性
			forExpression.iterator = context.content;

			// 如果需要编译
			if(this.hasVariable(statements)){
				// 生成并记录临时变量名
				forExpression.variable = statements.collections.generate();
			}

			// 调用公共访问器方法
			commonVisitor.call(this, parser, context, statement, statements);
			
			// 设置当前表达式的左侧表达式
			statement.expression.left  = expression;
		}
	});

	return IteratorTag;
}(
	this.BinaryKeywordTag,
	this.BinaryExpression,
	this.IterationStatement
);

this.ForInTag = function(IteratorTag){
	/**
	 * for in 标签
	 * @param {Number} _type - 标签类型
	 */
	function ForInTag(_type){
		IteratorTag.call(this, _type);
	};
	ForInTag = new Rexjs(ForInTag, IteratorTag);

	ForInTag.props({
		regexp: /in(?!stanceof)/
	});

	return ForInTag;
}(
	this.IteratorTag
);

this.ForOfTag = function(IteratorTag, hasVariable){
	/**
	 * for of 标签
	 * @param {Number} _type - 标签类型
	 */
	function ForOfTag(_type){
		IteratorTag.call(this, _type);
	};
	ForOfTag = new Rexjs(ForOfTag, IteratorTag);

	ForOfTag.props({
		/**
		 * 判断编译时是否需要临时变量名
		 * @param {Statements} statements - 当前语句块
		 */
		hasVariable: function(statements){
			return config.es6Base || hasVariable.call(this, statements);
		},
		regexp: /of/
	});

	return ForOfTag;
}(
	this.IteratorTag,
	this.IteratorTag.prototype.hasVariable
);

}.call(
	this
);