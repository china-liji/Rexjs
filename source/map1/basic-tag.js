// 一些 基类 或 独立的 标签
!function(RegExp){
	
this.AsTag = function(AsExpression){
	/**
	 * as 标签
	 * @param {Number} _type - 标签类型
	 */
	function AsTag(_type){
		SyntaxTag.call(this, _type);
	};
	AsTag = new Rexjs(AsTag, SyntaxTag);

	AsTag.props({
		regexp: /as/
	});

	return AsTag;
}(
	this.AsExpression
);

this.ClosingBraceTag = function(){
	/**
	 * 结束大括号标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingBraceTag(_type){
		SyntaxTag.call(this, _type);
	};
	ClosingBraceTag = new Rexjs(ClosingBraceTag, SyntaxTag);

	ClosingBraceTag.props({
		regexp: /\}/
	});
	
	return ClosingBraceTag;
}();

this.ClosingBracketTag = function(){
	/**
	 * 结束中括号标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingBracketTag(_type){
		SyntaxTag.call(this, _type);
	};
	ClosingBracketTag = new Rexjs(ClosingBracketTag, SyntaxTag);

	ClosingBracketTag.props({
		regexp: /\]/
	});
	
	return ClosingBracketTag;
}();

this.ClosingParenTag = function(){
	/**
	 * 结束小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingParenTag(_type){
		SyntaxTag.call(this, _type);
	};
	ClosingParenTag = new Rexjs(ClosingParenTag, SyntaxTag);

	ClosingParenTag.props({
		regexp: /\)/
	});
	
	return ClosingParenTag;
}();

this.CommentTag = function(){
	/**
	 * 注释标签
	 */
	function CommentTag(){
		SyntaxTag.call(this);
	};
	CommentTag = new Rexjs(CommentTag, SyntaxTag);

	CommentTag.props({
		$type: TYPE_MATCHABLE,
		order: ECMAScriptOrders.COMMENT
	});
	
	return CommentTag;
}();

this.DebuggerTag = function(){
	/**
	 * debugger 标签
	 * @param {Number} _type - 标签类型
	 */
	function DebuggerTag(_type){
		SyntaxTag.call(this, _type);
	};
	DebuggerTag = new Rexjs(DebuggerTag, SyntaxTag);
	
	DebuggerTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /debugger/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			statement.expression = new Expression(context);
		}
	});
	
	return DebuggerTag;
}();

this.DotTag = function(){
	/**
	 * 点标签
	 * @param {Number} _type - 标签类型
	 */
	function DotTag(_type){
		SyntaxTag.call(this, _type);
	};
	DotTag = new Rexjs(DotTag, SyntaxTag);
	
	DotTag.props({
		regexp: /\.(?!\d)/
	});
	
	return DotTag;
}();

this.ExpressionSeparatorTag = function(){
	/**
	 * 表达式分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ExpressionSeparatorTag(_type){
		SyntaxTag.call(this, _type);
	};
	ExpressionSeparatorTag = new Rexjs(ExpressionSeparatorTag, SyntaxTag);

	ExpressionSeparatorTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		$type: TYPE_MISTAKABLE
	});

	return ExpressionSeparatorTag;
}();

this.ModuleTag = function(FLOW_MAIN){
	/**
	 * 模块标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleTag(_type){
		SyntaxTag.call(this, _type);
	};
	ModuleTag = new Rexjs(ModuleTag, SyntaxTag);

	ModuleTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 收集该表达式所产生的变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} variable - 变量名标签上下文
		 */
		collectVariables: function(parser, variable){
			variable.tag.collectTo(parser, variable, parser.statements);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果当前语句有 target，说明不是最外层语句 或者 不是默认语句流
			if(statements.target || statement.flow !== FLOW_MAIN){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
				);

				return;
			}

			// 调用公共访问器
			commonVisitor(parser, context, statement, statements);

			// 设置当前表达式的 file 属性
			statement.expression.file = parser.file;
		}
	});

	return ModuleTag;
}(
	ECMAScriptStatement.FLOW_MAIN
);

this.OpeningBraceTag = function(){
	/**
	 * 起始大括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningBraceTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpeningBraceTag = new Rexjs(OpeningBraceTag, SyntaxTag);

	OpeningBraceTag.props({
		regexp: /\{/
	});
	
	return OpeningBraceTag;
}();

this.OpeningBracketTag = function(){
	/**
	 * 起始中括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningBracketTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpeningBracketTag = new Rexjs(OpeningBracketTag, SyntaxTag);

	OpeningBracketTag.props({
		regexp: /\[/
	});
	
	return OpeningBracketTag;
}();

this.OpeningParenTag = function(){
	/**
	 * 起始小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningParenTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpeningParenTag = new Rexjs(OpeningParenTag, SyntaxTag);

	OpeningParenTag.props({
		regexp: /\(/
	});
	
	return OpeningParenTag;
}();

this.SemicolonTag = function(){
	/**
	 * 分号标签
	 * @param {Number} _type - 标签类型
	 */
	function SemicolonTag(_type){
		SyntaxTag.call(this, _type);
	};
	SemicolonTag = new Rexjs(SemicolonTag, SyntaxTag);
	
	SemicolonTag.props({
		regexp: /;/
	});
	
	return SemicolonTag;
}();

this.SpecialLineTerminatorTag = function(LineTerminatorTag){
	/**
	 * 特殊的行结束符标签
	 */
	function SpecialLineTerminatorTag(){
		LineTerminatorTag.call(this);
	};
	SpecialLineTerminatorTag = new Rexjs(SpecialLineTerminatorTag, LineTerminatorTag);
	
	SpecialLineTerminatorTag.props({
		order: ECMAScriptOrders.SPECIAL_LINE_TERMINATOR
	});
	
	return SpecialLineTerminatorTag;
}(
	Rexjs.LineTerminatorTag
);

this.WithTag = function(){
	/**
	 * with 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function WithTag(_type){
		SyntaxTag.call(this, _type);
	};
	WithTag = new Rexjs(WithTag, SyntaxTag);
	
	WithTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /with/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.WITH);
		}
	});
	
	return WithTag;
}();

}.call(
	this,
	RegExp
);