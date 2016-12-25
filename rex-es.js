new function(
	Rexjs,
	// 内容提取相关
	ContentBuilder,
	// 表达式相关
	Expression, ListExpression, EmptyExpression, DefaultExpression, PartnerExpression, LeftHandSideExpression,
	// ECMAScript 相关
	ECMAScriptErrors, ECMAScriptStatement,
	// 语法配置相关
	SyntaxConfig,
	// 标签相关类
	SyntaxTag, TagType,
	// 标签分类相关
	CLASS_STATEMENT_BEGIN, CLASS_STATEMENT_END, CLASS_EXPRESSION, CLASS_EXPRESSION_CONTEXT,
	// 标签类型相关
	TYPE_MATCHABLE, TYPE_UNEXPECTED, TYPE_MISTAKABLE,
	// 表达式状态相关
	STATE_STATEMENT_ENDABLE, STATE_STATEMENT_END, STATE_STATEMENT_ENDED,
	// 其他常量
	IDENTIFIER_REGEXP_SOURCE
){
"use strict";


// 错信信息相关
void function(){

this.ECMAScriptErrors = ECMAScriptErrors = function(REGEXP){
	/**
	 * 错误信息
	 */
	function ECMAScriptErrors(){};
	ECMAScriptErrors = new Rexjs(ECMAScriptErrors);

	ECMAScriptErrors.static({
		ASSIGNMENT: "Invalid left-hand side in assignment",
		CONST: "Assignment to constant variable",
		DEFAULT_CLAUSE: "More than one default clause in switch statement",
		DUPLICATE_PARAMETER_NAME: "Duplicate parameter name not allowed in this context",
		FOR: "Invalid left-hand side in for-loop",
		FOR_IN: "Invalid left-hand side in for-in loop: Must have a single binding",
		GETTER: "Getter must not have any formal parameters",
		ILLEGAL_STATEMENT: "Illegal ${1} statement",
		LABEL: 'Undefined label "${1}"',
		MISSING_INITIALIZER: "Missing initializer in const declaration",
		NEWLINE: "Illegal newline",
		NEWLINE_AFTER_THROW: "Illegal newline after throw",
		NEWLINE_BEFORE_ARROW: "Illegal newline before arrow",
		PREFIEX_OPERATION: "Invalid left-hand side expression in prefix operation",
		REDECLARATION: 'Identifier "${1}" has already been declared',
		REGEXP_FLAGS: "Invalid regular expression flags",
		REST: "Rest parameter must be last formal parameter",
		SETTER: "Setter must have exactly one formal parameter",
		TRY: "Missing catch or finally after try",
		WITH: "The code may not include a with statement",
		/**
		 * 将错误信息模板里的参数进行替换，并返回结果
		 * @param {String} type - 错误信息类型
		 * @param {String} _args - 
		 */
		template: function(type){
			var args = arguments;

			return this[type].replace(
				REGEXP,
				function(result, index){
					return args[index];
				}
			);
		}
	});

	return ECMAScriptErrors;
}(
	// REGEXP
	/\$\{(\d+)\}/g
);

}.call(
	this
);


// 公用的表达式
void function(){

this.AssignableExpression = function(){
	/**
	 * 可赋值的表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function AssignableExpression(context){
		Expression.call(this, context);
	};
	AssignableExpression = new Rexjs(AssignableExpression, Expression);

	return AssignableExpression;
}();

this.ConditionalExpression = function(){
	/**
	 * 带条件的表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ConditionalExpression(context){
		Expression.call(this, context);
	};
	ConditionalExpression = new Rexjs(ConditionalExpression, Expression);

	ConditionalExpression.props({
		condition: null
	});

	return ConditionalExpression;
}();

}.call(
	this
);


// 语句相关
void function(){

this.ECMAScriptStatement = ECMAScriptStatement = function(Statement){
	/**
	 * ECMAScript 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ECMAScriptStatement(statements){
		Statement.call(this, statements);
	};
	ECMAScriptStatement = new Rexjs(ECMAScriptStatement, Statement);

	return ECMAScriptStatement;
}(
	Rexjs.Statement
);

this.ConditionStatement = function(){
	/**
	 * 条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ConditionStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ConditionStatement = new Rexjs(ConditionStatement, ECMAScriptStatement);
	
	ConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是小括号
			if(
				context.content !== ")"
			){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出该语句并获取条件表达式
			var condition = this.out().condition;

			// 设置条件表达式的 inner
			condition.inner = this.expression;
			return condition.open.tag.binding;
		}
	});
	
	return ConditionStatement;
}();

}.call(
	this
);


// 语句块相关
void function(Statements, VariableCollections){

this.ECMAScriptVariableCollections = function(VariableCollection, generate){
	/**
	 * 变量名收集器集合
	 * @param {VariableIndex} index - 变量名索引
	 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
	 */
	function ECMAScriptVariableCollections(index, _prevCollections){
		VariableCollections.call(this, index);

		this.initBlackList(_prevCollections);
		this.initConst(_prevCollections);
		this.initDeclaration(_prevCollections);
		this.initRex(_prevCollections);
	};
	ECMAScriptVariableCollections = new Rexjs(ECMAScriptVariableCollections, VariableCollections);

	ECMAScriptVariableCollections.props({
		blacklist: null,
		const: null,
		declaration: null,
		/**
		 * 生成一个变量名
		 */
		generate: function(){
			var variable = generate.call(this);

			this.rex.collect(variable);
			return variable;
		},
		/**
		 * 初始化黑名单变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initBlackList: function(){
			this.blacklist = new VariableCollection();
		},
		/**
		 * 初始化常量变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initConst: function(){
			this.const = new VariableCollection();
		},
		/**
		 * 初始化声明变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initDeclaration: function(){
			this.declaration = new VariableCollection();
		},
		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initRex: function(){
			this.rex = new VariableCollection();
		},
		rex: null
	});

	return ECMAScriptVariableCollections;
}(
	Rexjs.VariableCollection,
	VariableCollections.prototype.generate
);

this.ECMAScriptStatements = function(ECMAScriptStatement, extractTo){
	/**
	 * ECMAScript 语句块
	 * @param {ECMAScriptVariableCollections} collections - 变量名收集器集合
	 */
	function ECMAScriptStatements(collections){
		Statements.call(this);

		// 初始化变量名集合
		this.collections = collections;
	};
	ECMAScriptStatements = new Rexjs(ECMAScriptStatements, Statements);

	ECMAScriptStatements.props({
		collections: null,
		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		declareTo: function(contentBuilder){
			// 添加临时变量名
			contentBuilder.appendString(
				this.collections.rex.toString("var ", ",", ";")
			);
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 插入变量名
			this.declareTo(contentBuilder);
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new ECMAScriptStatement(this);
		}
	});

	return ECMAScriptStatements;
}(
	this.ECMAScriptStatement,
	Statements.prototype.extractTo
);

this.GlobalStatements = function(ECMAScriptStatements, ECMAScriptVariableCollections, VariableIndex){
	/**
	 * 全局语句块
	 */
	function GlobalStatements(){
		ECMAScriptStatements.call(
			this,
			new ECMAScriptVariableCollections(
				new VariableIndex()
			)
		);
	};
	GlobalStatements = new Rexjs(GlobalStatements, ECMAScriptStatements);

	return GlobalStatements;
}(
	this.ECMAScriptStatements,
	this.ECMAScriptVariableCollections,
	Rexjs.VariableIndex
);

}.call(
	this,
	Rexjs.Statements,
	Rexjs.VariableCollections
);


// 基类标签
void function(RegExp){

this.CloseBraceTag = function(){
	/**
	 * 结束大括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBraceTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseBraceTag = new Rexjs(CloseBraceTag, SyntaxTag);

	CloseBraceTag.props({
		regexp: /\}/
	});
	
	return CloseBraceTag;
}();

this.CloseBracketTag = function(){
	/**
	 * 结束中括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBracketTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseBracketTag = new Rexjs(CloseBracketTag, SyntaxTag);

	CloseBracketTag.props({
		regexp: /\]/
	});
	
	return CloseBracketTag;
}();

this.CloseParenTag = function(){
	/**
	 * 结束小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseParenTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseParenTag = new Rexjs(CloseParenTag, SyntaxTag);

	CloseParenTag.props({
		regexp: /\)/
	});
	
	return CloseParenTag;
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
		order: 400
	});
	
	return CommentTag;
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

this.LiteralTag = function(){
	/**
	 * 字面量标签，即用肉眼一眼就可以看出含义的标签
	 * @param {Number} _type - 标签类型
	 */
	function LiteralTag(_type){
		SyntaxTag.call(this, _type);
	};
	LiteralTag = new Rexjs(LiteralTag, SyntaxTag);
	
	LiteralTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 之前标签所需匹配的标签列表
		 */
		require: function(tagMaps){
			return tagMaps.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new Expression(context);
		}
	})
	
	return LiteralTag;
}();

this.OpenBraceTag = function(){
	/**
	 * 起始大括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBraceTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenBraceTag = new Rexjs(OpenBraceTag, SyntaxTag);

	OpenBraceTag.props({
		regexp: /\{/
	});
	
	return OpenBraceTag;
}();

this.OpenBracketTag = function(){
	/**
	 * 起始中括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBracketTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenBracketTag = new Rexjs(OpenBracketTag, SyntaxTag);

	OpenBracketTag.props({
		regexp: /\[/
	});
	
	return OpenBracketTag;
}();

this.OpenParenTag = function(){
	/**
	 * 起始小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenParenTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenParenTag = new Rexjs(OpenParenTag, SyntaxTag);

	OpenParenTag.props({
		regexp: /\(/
	});
	
	return OpenParenTag;
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
		order: 100
	});
	
	return SpecialLineTerminatorTag;
}(
	Rexjs.LineTerminatorTag
);

}.call(
	this,
	RegExp
);


// 一些独立的标签相关
void function(){

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
	this
);


// 文件位置标签相关
void function(FilePositionTag){

this.FileStartTag = function(FileStartExpression){
	/**
	 * 文件起始符标签
	 * @param {Number} _type - 标签类型
	 */
	function FileStartTag(_type){
		FilePositionTag.call(this, _type);
	};
	FileStartTag = new Rexjs(FileStartTag, FilePositionTag);
	
	FileStartTag.props({
		order: Infinity,
		regexp: /^/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagMaps){
			return tagMaps.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式
			statement.expression = new FileStartExpression(context);
		}
	});
	
	return FileStartTag;
}(
	Rexjs.FileStartExpression
);

this.FileEndTag = function(FileEndExpression){
	/**
	 * 文件结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function FileEndTag(_type){
		FilePositionTag.call(this, _type);
	};
	FileEndTag = new Rexjs(FileEndTag, FilePositionTag);
	
	FileEndTag.props({
		regexp: /$/,
		throw: "end of input",
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式
			statement.expression = new FileEndExpression(context);
			
			// 终止解析
			parser.regexp.break();
		}
	});
	
	return FileEndTag;
}(
	Rexjs.FileEndExpression
);
	
}.call(
	this,
	Rexjs.FilePositionTag
);


// 注释标签
void function(CommentTag, tags){

this.SingleLineCommentTag = function(){
	/**
	 * 单行注释标签
	 * @param {Number} _type - 标签类型
	 */
	function SingleLineCommentTag(_type){
		CommentTag.call(this, _type);
	};
	SingleLineCommentTag = new Rexjs(SingleLineCommentTag, CommentTag);
	
	SingleLineCommentTag.props({
		regexp: /\/\/.*/
	});
	
	return SingleLineCommentTag;
}();

this.OpenMultiLineCommentTag = function(){
	/**
	 * 多行注释起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenMultiLineCommentTag(_type){
		CommentTag.call(this, _type);
	};
	OpenMultiLineCommentTag = new Rexjs(OpenMultiLineCommentTag, CommentTag);
	
	OpenMultiLineCommentTag.props({
		regexp: /\/\*/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = currentTags;
			return tagsMap.commentContextTags;
		}
	});
	
	return OpenMultiLineCommentTag;
}();

this.CommentContentTag = function(){
	/**
	 * 注释内容标签
	 * @param {Number} _type - 标签类型
	 */
	function CommentContentTag(_type){
		CommentTag.call(this, _type);
	};
	CommentContentTag = new Rexjs(CommentContentTag, CommentTag);
	
	CommentContentTag.props({
		// 防止与单行注释标签或多行注释起始标签冲突
		order: 401,
		regexp: /(?:[^*\r\n\u2028\u2029]|\*(?!\/))+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.commentContextTags;
		}
	});
	
	return CommentContentTag;
}();

this.CloseMultiLineCommentTag = function(){
	/**
	 * 多行注释结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseMultiLineCommentTag(_type){
		CommentTag.call(this, _type);
	};
	CloseMultiLineCommentTag = new Rexjs(CloseMultiLineCommentTag, CommentTag);
	
	CloseMultiLineCommentTag.props({
		regexp: /\*\//,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(){
			return tags;
		}
	});
	
	return CloseMultiLineCommentTag;
}();

}.call(
	this,
	this.CommentTag,
	// tags
	null
);


// 字面量标签
void function(LiteralTag){

this.BooleanTag = function(){
	/**
	 * 布尔标签
	 * @param {Number} _type - 标签类型
	 */
	function BooleanTag(_type){
		LiteralTag.call(this, _type);
	};
	BooleanTag = new Rexjs(BooleanTag, LiteralTag);
	
	BooleanTag.props({
		regexp: /true|false/
	});
	
	return BooleanTag;
}();

this.NullTag = function(){
	/**
	 * null 标签
	 * @param {Number} _type - 标签类型
	 */
	function NullTag(_type){
		LiteralTag.call(this, _type);
	};
	NullTag = new Rexjs(NullTag, LiteralTag);
	
	NullTag.props({
		regexp: /null/
	});
	
	return NullTag;
}();

this.ThisTag = function(){
	/**
	 * this 标签
	 * @param {Number} _type - 标签类型
	 */
	function ThisTag(_type){
		LiteralTag.call(this, _type);
	};
	ThisTag = new Rexjs(ThisTag, LiteralTag);
	
	ThisTag.props({
		regexp: /this/
	});
	
	return ThisTag;
}();

this.RegExpTag = function(visitor){
	/**
	 * 未捕获的正则表达式标签
	 * @param {Number} _type - 标签类型
	 */
	function RegExpTag(_type){
		LiteralTag.call(this, _type);
	};
	RegExpTag = new Rexjs(RegExpTag, LiteralTag);
	
	RegExpTag.props({
		regexp : /\/(?:\\[^\r\n\u2028\u2029]|[^/\\\r\n\u2028\u2029]+)+\/(?:\w|\$)*/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var i = 0, m = 0, g = 0, u = 0, y = 0, count = 0, content = context.content;
			
			// 遍历正则标记
			flags:
			for(
				var n = content.length - 1;n > -1;n--
			){
				// 判断当前标记
				switch(
					content[n]
				){
					case "/":
						break flags;

					case "i":
						count = ++i;
						break;
						
					case "m":
						count = ++m;
						break;
						
					case "g":
						count = ++g;
						break;
						
					case "u":
						count = ++u;
						break;
						
					case "y":
						count = ++y;
						break;
						
					default:
						count = 2;
						break;
				}
				
				// 如果对应标记出现过 2 次
				if(
					count > 1
				){
					// 报错
					parser.error(context, ECMAScriptErrors.REGEXP_FLAGS);
					return;
				}
			}
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return RegExpTag;
}(
	LiteralTag.prototype.visitor
);
	
this.NumberTag = function(){
	/**
	 * 数字标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberTag(_type){
		LiteralTag.call(this, _type);
	};
	NumberTag = new Rexjs(NumberTag, LiteralTag);
	
	NumberTag.props({
		// 防止与 "." 匹配冲突
		order: 100,
		regexp: /0[bB][01]+|0[oO][0-7]+|0[xX][0-9a-fA-F]+|(?:\d*\.\d+|\d+\.?)(?:e[+-]?\d+)?/,
		throw: "number"
	});
	
	return NumberTag;
}();

this.StringTag = function(){
	/**
	 * 字符串标签
	 * @param {Number} _type - 标签类型
	 */
	function StringTag(_type){
		LiteralTag.call(this, _type);
	};
	StringTag = new Rexjs(StringTag, LiteralTag);
	
	StringTag.props({
		regexp: /"(?:\\[\s\S]|[^"\\\r\n\u2028\u2029]+)*"|'(?:\\[\s\S]|[^'\\\r\n\u2028\u2029]+)*'/,
		throw: "string"
	});
	
	return StringTag;
}();

}.call(
	this,
	this.LiteralTag
);


// 标识符标签相关
void function(){

this.IdentifierExpression = function(AssignableExpression){
	/**
	 * 标识符表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function IdentifierExpression(context){
		AssignableExpression.call(this, context);
	};
	IdentifierExpression = new Rexjs(IdentifierExpression, AssignableExpression);

	return IdentifierExpression;
}(
	this.AssignableExpression
);

this.IdentifierTag = function(IdentifierExpression, keywords, compileRegExpBy){
	/**
	 * 标识符标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierTag(_type){
		SyntaxTag.call(this, _type);
	};
	IdentifierTag = new Rexjs(IdentifierTag, SyntaxTag);
	
	IdentifierTag.static({
		/**
		 * 获取所有关键字
		 */
		get keywords(){
			return keywords;
		},
		/**
		 * 设置所有关键字，并根据关键字重新编译该类的正则表达式
		 * @param {String} value - 所有关键字，以 "|" 分隔
		 */
		set keywords(value){
			// 记录值
			keywords = value;
			// 设置原型链 regexp 属性
			this.prototype.regexp = compileRegExpBy(keywords);
		}
	});

	IdentifierTag.props({
		$class: CLASS_EXPRESSION,
		order: 200,
		regexp: compileRegExpBy(keywords),
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 之前标签所需匹配的标签列表
		 */
		require: function(tagMaps){
			return tagMaps.expressionContextTags;
		},
		throw: "identifier",
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new IdentifierExpression(context);
		}
	});

	return IdentifierTag;
}(
	this.IdentifierExpression,
	// keywords
	[
		"break", "case", "catch", "class", "const", "continue",
		"debugger", "default", "delete", "do", "else", "enum", "export", "extends",
		"false", "finally", "for", "function", "if", "import", "in(?!stanceof)", "instanceof", "let", "new", "null",
		"return", "static", "super", "switch", "this", "throw", "true", "try", "typeof",
		"var", "void", "while", "with", "yield"
	]
	.join(
		"|"
	),
	// compileRegExpBy
	function(keywords){
		return new RegExp(
			"(?:" +
				// 匹配 var$、var_、vara、var中文 等情况
				"(?:" + keywords + ")|" +
				// 匹配 var1、var1_、var1$、var1中文 等情况
				"(?=(?:" + keywords + ")\\d+)|" +
				// 匹配 abc、_abc、$abc、中文abc 等情况
				"(?!" + keywords + ")" +
			")" +
			IDENTIFIER_REGEXP_SOURCE
		);
	}
);

}.call(
	this
);


// 变量标签相关
void function(){

this.VariableTag = function(IdentifierTag){
	/**
	 * 变量标签
	 * @param {Number} _type - 标签类型
	 */
	function VariableTag(_type){
		IdentifierTag.call(this, _type);
	};
	VariableTag = new Rexjs(VariableTag, IdentifierTag);

	VariableTag.props({
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containBy: function(variable, collections){
			return collections.const.contain(variable);
		},
		/**
		 * 判断变量名，是否已被指定收集器收集，如果已被收集则报错
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collected: function(parser, context, statements){
			var content = context.content;

			do {
				// 如果已被收集
				if(
					this.containBy(content, statements.collections)
				){
					// 报错
					parser.error(
						context,
						ECMAScriptErrors.template(this.errorType, context.content)
					);
					return true;
				}

				// 获取 target
				statements = statements.target;
			}
			// 如果语句块存在
			while(
				statements
			)

			return false;
		},
		errorType: "CONST",
		order: 201
	});
	
	return VariableTag;
}(
	this.IdentifierTag
);

this.VariableDeclarationTag = function(VariableTag, visitor){
	/**
	 * 变量声明标签
	 * @param {Number} _type - 标签类型
	 */
	function VariableDeclarationTag(_type){
		VariableTag.call(this, _type);
	};
	VariableDeclarationTag = new Rexjs(VariableDeclarationTag, VariableTag);

	VariableDeclarationTag.props({
		/**
		 * 判断该变量名是否还能被定义
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			var content = context.content;

			// 如果已被收集
			if(
				this.collected(parser, context, statements)
			){
				return;
			}
			
			// 收集变量名
			statements.collections.declaration.collect(content);
		},
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containBy: function(variable, collections){
			return collections.blacklist.contain(variable);
		},
		errorType: "REDECLARATION",
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return VariableDeclarationTag;
}(
	this.VariableTag,
	this.VariableTag.prototype.visitor
);

}.call(
	this
);


// 分号标签
void function(SemicolonTag){

this.EmptyStatementTag = function(){
	/**
	 * 空语句标签
	 * @param {Number} _type - 标签类型
	 */
	function EmptyStatementTag(_type){
		SemicolonTag.call(this, _type);
	};
	EmptyStatementTag = new Rexjs(EmptyStatementTag, SemicolonTag);
	
	EmptyStatementTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			(
				// 设置当前表达式
				statement.expression = new EmptyExpression(context)
			)
			// 如果有目标语句，则设置 STATE_STATEMENT_END，目的是提取表达式的时候，要包括分号
			.state = statement.target ? STATE_STATEMENT_END : STATE_STATEMENT_ENDED;
		}
	});
	
	return EmptyStatementTag;
}();

this.StatementEndTag = function(unexpected){
	/**
	 * 语句结束标签
	 * @param {Number} _type - 标签类型
	 */
	function StatementEndTag(_type){
		SemicolonTag.call(this, _type);
	};
	StatementEndTag = new Rexjs(StatementEndTag, SemicolonTag);
	
	StatementEndTag.props({
		$class: CLASS_STATEMENT_END,
		$type: TYPE_MISTAKABLE,
		// 防止与 EmptyStatementTag 冲突
		order: 100,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.state |= STATE_STATEMENT_END;
		}
	});
	
	return StatementEndTag;
}(
	SemicolonTag.prototype.unexpected
);

this.LastStatementEndTag = function(StatementEndTag){
	/**
	 * 最后一个语句结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function LastStatementEndTag(_type){
		StatementEndTag.call(this, _type);
	};
	LastStatementEndTag = new Rexjs(LastStatementEndTag, StatementEndTag);

	LastStatementEndTag.props({
		regexp: /$/,
		throw: "end of input"
	});

	return LastStatementEndTag;
}(
	this.StatementEndTag
);

}.call(
	this,
	this.SemicolonTag
);


// 行结束符标签
void function(SpecialLineTerminatorTag, visitor){

this.IllegalLineTerminatorTag = function(SpecialLineTerminatorTag){
	/**
	 * 不合法的行结束符标签
	 */
	function IllegalLineTerminatorTag(){
		SpecialLineTerminatorTag.call(this);
	};
	IllegalLineTerminatorTag = new Rexjs(IllegalLineTerminatorTag, SpecialLineTerminatorTag);
	
	IllegalLineTerminatorTag.props({
		order: 401,
		regexp: /(?:\/\*(?:[^*]|\*(?!\/))*)?[\r|\n|\u2028|\u2029]/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.NEWLINE);
		}
	});
	
	return IllegalLineTerminatorTag;
}(
	this.SpecialLineTerminatorTag
);

this.StatementBreakTag = function(){
	/**
	 * 语句行结束符标签
	 */
	function StatementBreakTag(){
		SpecialLineTerminatorTag.call(this);
	};
	StatementBreakTag = new Rexjs(StatementBreakTag, SpecialLineTerminatorTag);
	
	StatementBreakTag.props({
		$class: CLASS_STATEMENT_END,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置状态
			statement.expression.state |= STATE_STATEMENT_END;
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return StatementBreakTag;
}();

this.ExpressionBreakTag = function(){
	/**
	 * 表达式行结束符标签
	 */
	function ExpressionBreakTag(){
		SpecialLineTerminatorTag.call(this);
	};
	ExpressionBreakTag = new Rexjs(ExpressionBreakTag, SpecialLineTerminatorTag);
	
	ExpressionBreakTag.props({
		// 防止与 StatementBreakTag 冲突
		order: 101,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置状态
			statement.expression.state |= STATE_STATEMENT_ENDABLE;
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return ExpressionBreakTag;
}();

}.call(
	this,
	this.SpecialLineTerminatorTag,
	this.SpecialLineTerminatorTag.prototype.visitor
);


// 点属性访问器相关
void function(){

this.AccessorExpression = function(AssignableExpression){
	/**
	 * 属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} object - 拥有该属性的对象
	 */
	function AccessorExpression(context, object){
		AssignableExpression.call(this, context);

		this.object = object;
	};
	AccessorExpression = new Rexjs(AccessorExpression, AssignableExpression);
	
	AccessorExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取对象表达式
			this.object.extractTo(contentBuilder);
			
			// 添加点
			contentBuilder.appendContext(this.context);
			// 添加属性
			contentBuilder.appendContext(this.property);
		},
		object: null,
		property: null
	});
	
	return AccessorExpression;
}(
	this.AssignableExpression
);

this.DotAccessorTag = function(AccessorExpression){
	/**
	 * 点属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function DotAccessorTag(_type){
		SyntaxTag.call(this, _type);
	};
	DotAccessorTag = new Rexjs(DotAccessorTag, SyntaxTag);
	
	DotAccessorTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		// 防止与数字冲突，如：3.14.15
		order: 100,
		regexp: /\./,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.dotContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new AccessorExpression(context, statement.expression);
		}
	});
	
	return DotAccessorTag;
}(
	this.AccessorExpression
);

this.PropertyNameTag = function(IdentifierTag, RegExp){
	/**
	 * 属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyNameTag(_type){
		IdentifierTag.call(this, _type);
	};
	PropertyNameTag = new Rexjs(PropertyNameTag, IdentifierTag);
	
	PropertyNameTag.props({
		regexp: new RegExp(IDENTIFIER_REGEXP_SOURCE),
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.property = context;
		}
	});
	
	return PropertyNameTag;
}(
	this.IdentifierTag,
	RegExp
);

}.call(
	this
);


// 中括号属性访问器
void function(closeBracketAccessorTag){
	
this.BracketAccessorExpression = function(AccessorExpression){
	/**
	 * 中括号属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} object - 拥有该属性的对象
	 */
	function BracketAccessorExpression(context, object){
		AccessorExpression.call(this, context, object);
	};
	BracketAccessorExpression = new Rexjs(BracketAccessorExpression, AccessorExpression);
	
	BracketAccessorExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取对象
			this.object.extractTo(contentBuilder);
			// 提取属性
			this.property.extractTo(contentBuilder);
		}
	});
	
	return BracketAccessorExpression;
}(
	this.AccessorExpression
);
	
this.BracketAccessorStatement = function(){
	/**
	 * 中括号属性访问器语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BracketAccessorStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BracketAccessorStatement = new Rexjs(BracketAccessorStatement, ECMAScriptStatement);
	
	BracketAccessorStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭分组小括号
			if(
				context.content !== "]"
			){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出该语句并获取 property 属性
			var property = this.out().property;
			
			// 设置 inner
			property.inner = this.expression;
			return property.open.tag.binding;
		}
	});
	
	return BracketAccessorStatement;
}();

this.OpenBracketAccessorTag = function(OpenBracketTag, BracketAccessorExpression, BracketAccessorStatement){
	/**
	 * 起始中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBracketAccessorTag(_type){
		OpenBracketTag.call(this, _type);
	};
	OpenBracketAccessorTag = new Rexjs(OpenBracketAccessorTag, OpenBracketTag);
	
	OpenBracketAccessorTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBracketAccessorTag;
		},
		// 防止与起始数组标签冲突
		order: 100,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置临时表达式
			(
				statement.expression = new BracketAccessorExpression(context, statement.expression)
			)
			// 设置 property
			.property = new PartnerExpression(context);

			// 设置当前语句
			statements.statement = new BracketAccessorStatement(statements);
		}
	});
	
	return OpenBracketAccessorTag;
}(
	this.OpenBracketTag,
	this.BracketAccessorExpression,
	this.BracketAccessorStatement
);

this.CloseBracketAccessorTag = function(CloseBracketTag){
	/**
	 * 结束中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBracketAccessorTag(_type){
		CloseBracketTag.call(this, _type);
	};
	CloseBracketAccessorTag = new Rexjs(CloseBracketAccessorTag, CloseBracketTag);
	
	CloseBracketAccessorTag.props({
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
			// 设置表达式
			statement.expression.property.close = context;
		}
	});
	
	return CloseBracketAccessorTag;
}(
	this.CloseBracketTag
);

closeBracketAccessorTag = new this.CloseBracketAccessorTag();
	
}.call(
	this,
	// closeBracketAccessorTag
	null
);


// 逗号相关
void function(commaSiblingTag){

this.CommaExpression = function(){
	/**
	 * 逗号表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} firstExpression - 第一个子表达式
	 */
	function CommaExpression(context, firstExpression){
		ListExpression.call(this, context, ",");

		// 添加第一个子表达式
		this.add(firstExpression);
	};
	CommaExpression = new Rexjs(CommaExpression, ListExpression);

	return CommaExpression;
}();

this.CommaStatement = function(){
	/**
	 * 逗号语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CommaStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CommaStatement = new Rexjs(CommaStatement, ECMAScriptStatement);
	
	CommaStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().add(this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(
				context.content !== ","
			){
				return null;
			}

			// 跳出语句
			var commaExpression = this.out();

			// 添加表达式
			commaExpression.add(this.expression);
			// 返回标签
			return commaExpression.context.tag.binding;
		}
	});
	
	return CommaStatement;
}();

this.CommaTag = function(ExpressionSeparatorTag, CommaExpression, CommaStatement){
	/**
	 * 逗号标签
	 * @param {Number} _type - 标签类型
	 */
	function CommaTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	CommaTag = new Rexjs(CommaTag, ExpressionSeparatorTag);
	
	CommaTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return commaSiblingTag;
		},
		regexp: /,/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new CommaExpression(context, statement.expression);
			// 设置当前语句
			statements.statement = new CommaStatement(statements);
		}
	});
	
	return CommaTag;
}(
	this.ExpressionSeparatorTag,
	this.CommaExpression,
	this.CommaStatement
);

this.CommaSiblingTag = function(CommaTag, CommaStatement){
	/**
	 * 兄弟逗号标签，即同一语句下面的非第一个逗号
	 * @param {Number} _type - 标签类型
	 */
	function CommaSiblingTag(_type){
		CommaTag.call(this, _type);
	};
	CommaSiblingTag = new Rexjs(CommaSiblingTag, CommaTag);

	CommaSiblingTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new CommaStatement(statements);
		}
	});

	return CommaSiblingTag;
}(
	this.CommaTag,
	this.CommaStatement
);

commaSiblingTag = new this.CommaSiblingTag();
	
}.call(
	this,
	// commaSiblingTag
	null
);


// 一元标签基类
void function(){
	
this.UnaryExpression = function(){
	/**
	 * 一元表达式
	 * @param {Context} context - 标签上下文
	 */
	function UnaryExpression(context){
		Expression.call(this, context);
	};
	UnaryExpression = new Rexjs(UnaryExpression, Expression);
	
	UnaryExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var context = this.context;
			
			// 提取一元操作符的内容
			contentBuilder.appendContext(context);
			// 提取操作对象内容
			this.operand.extractTo(contentBuilder);
		},
		operand: null
	});
	
	return UnaryExpression;
}();

this.UnaryStatement = function(){
	/**
	 * 一元语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function UnaryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	UnaryStatement = new Rexjs(UnaryStatement, ECMAScriptStatement);
	
	UnaryStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(){
			// 跳出语句并设置 operand
			this.out().operand = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果一元标签验证该标签为表达式分隔符标签
			if(
				this.target.expression.context.tag.isSeparator(context)
			){
				// 跳出语句并设置 operand
				this.out().operand = this.expression;
			}
		}
	});
	
	return UnaryStatement;
}();

this.UnaryTag = function(UnaryExpression, UnaryStatement, ExpressionSeparatorTag){
	/**
	 * 一元标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryTag(_type){
		SyntaxTag.call(this, _type);
	};
	UnaryTag = new Rexjs(UnaryTag, SyntaxTag);
	
	UnaryTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			return context.tag instanceof ExpressionSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置临时表达式
			statement.expression = new UnaryExpression(context);
			// 设置当前语句
			statements.statement = new UnaryStatement(statements);
		}
	});
	
	return UnaryTag;
}(
	this.UnaryExpression,
	this.UnaryStatement,
	this.ExpressionSeparatorTag
);

this.UnaryKeywordTag = function(UnaryTag){
	/**
	 * 一元关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryKeywordTag(_type){
		UnaryTag.call(this, _type);
	};
	UnaryKeywordTag = new Rexjs(UnaryKeywordTag, UnaryTag);
	
	UnaryKeywordTag.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(content);
			// 追加空格
			contentBuilder.appendSpace();
		}
	});
	
	return UnaryKeywordTag;
}(
	this.UnaryTag
);

}.call(
	this
);


// 非赋值一元标签
void function(UnaryTag, UnaryKeywordTag){

this.DeleteTag = function(){
	/**
	 * delete 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DeleteTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	DeleteTag = new Rexjs(DeleteTag, UnaryKeywordTag);
	
	DeleteTag.props({
		regexp: /delete/
	});
	
	return DeleteTag;
}();

this.NewTag = function(isSeparator){
	/**
	 * new 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function NewTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	NewTag = new Rexjs(NewTag, UnaryKeywordTag);
	
	NewTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			/*
				该 isSeparator 是由 try 方法进入，
				而只有 CLASS_EXPRESSION_CONTEXT 标签才能进入 try，
				如果是起始小括号，
				那么则说明，它确定就是函数实例化的小括号
			*/
			return context.content === "(" || isSeparator.call(this, context);
		},
		regexp: /new/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.newContextTags;
		}
	});
	
	return NewTag;
}(
	UnaryKeywordTag.prototype.isSeparator
);

this.TypeofTag = function(){
	/**
	 * typeof 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function TypeofTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	TypeofTag = new Rexjs(TypeofTag, UnaryKeywordTag);
	
	TypeofTag.props({
		regexp: /typeof/
	});
	
	return TypeofTag;
}();

this.VoidTag = function(){
	/**
	 * void 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function VoidTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	VoidTag = new Rexjs(VoidTag, UnaryKeywordTag);
	
	VoidTag.props({
		regexp: /void/
	});
	
	return VoidTag;
}();

this.PlusTag = function(){
	/**
	 * 正号标签
	 * @param {Number} _type - 标签类型
	 */
	function PlusTag(_type){
		UnaryTag.call(this, _type);
	};
	PlusTag = new Rexjs(PlusTag, UnaryTag);
	
	PlusTag.props({
		regexp: /\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return PlusTag;
}();

this.PlusSiblingTag = function(PlusTag){
	/**
	 * 相邻的正号标签
	 * @param {Number} _type - 标签类型
	 */
	function PlusSiblingTag(_type){
		PlusTag.call(this, _type);
	};
	PlusSiblingTag = new Rexjs(PlusSiblingTag, PlusTag);
	
	PlusSiblingTag.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: 300
	});
	
	return PlusSiblingTag;
}(
	this.PlusTag
);

this.NegationTag = function(){
	/**
	 * 负号标签
	 * @param {Number} _type - 标签类型
	 */
	function NegationTag(_type){
		UnaryTag.call(this, _type);
	};
	NegationTag = new Rexjs(NegationTag, UnaryTag);
	
	NegationTag.props({
		regexp: /-/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return NegationTag;
}();

this.NegationSiblingTag = function(NegationTag){
	/**
	 * 重复的负号标签
	 * @param {Number} _type - 标签类型
	 */
	function NegationSiblingTag(_type){
		NegationTag.call(this, _type);
	};
	NegationSiblingTag = new Rexjs(NegationSiblingTag, NegationTag);
	
	NegationSiblingTag.props({
		order: 300
	});
	
	return NegationSiblingTag;
}(
	this.NegationTag
);

this.BitwiseNOTTag = function(){
	/**
	 * 二进制否定标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseNOTTag(_type){
		UnaryTag.call(this, _type);
	};
	BitwiseNOTTag = new Rexjs(BitwiseNOTTag, UnaryTag);
	
	BitwiseNOTTag.props({
		regexp: /~/
	});
	
	return BitwiseNOTTag;
}();

this.LogicalNOTTag = function(){
	/**
	 * 逻辑否定标签
	 * @param {Number} _type - 标签类型
	 */
	function LogicalNOTTag(_type){
		UnaryTag.call(this, _type);
	};
	LogicalNOTTag = new Rexjs(LogicalNOTTag, UnaryTag);
	
	LogicalNOTTag.props({
		regexp: /!/
	});
	
	return LogicalNOTTag;
}();
	
}.call(
	this,
	this.UnaryTag,
	this.UnaryKeywordTag
);


// 一元赋值标签
void function(AssignableExpression, AccessorExpression, UnaryStatement, VariableTag){

this.UnaryAssignmentStatement = function(catchMethod, tryMethod, checkExpression){
	/**
	 * 一元赋值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function UnaryAssignmentStatement(statements){
		UnaryStatement.call(this, statements);
	};
	UnaryAssignmentStatement = new Rexjs(UnaryAssignmentStatement, UnaryStatement);
	
	UnaryAssignmentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 核对表达式
			checkExpression(parser, this, context, catchMethod);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 核对表达式
			checkExpression(parser, this, context, tryMethod);
		}
	});
	
	return UnaryAssignmentStatement;
}(
	UnaryStatement.prototype.catch,
	UnaryStatement.prototype.try,
	// checkExpression
	function(parser, statement, context, method){
		var expression = statement.expression;

		// 如果当前表达式是赋值表达式
		if(
			expression instanceof AssignableExpression
		){
			var ctx = expression.context;

			switch(
				true
			){
				// 如果是属性访问表达式
				case expression instanceof AccessorExpression:
					break;

				// 如果没有被收集到常量
				case !ctx.tag.collected(parser, ctx, parser.statements):
					break;

				// 默认，即是变量标签，而且被收集到常量集合中（会触发报错）
				default:
					return;
			}

			// 调用父类方法
			method.call(statement, parser, context);
			return;
		}

		// 报错
		parser.error(statement.target.expression.context, ECMAScriptErrors.PREFIEX_OPERATION, true);
	}
);

this.UnaryAssignmentTag = function(UnaryTag, UnaryExpression, UnaryAssignmentStatement){
	/**
	 * 一元赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryAssignmentTag(_type){
		UnaryTag.call(this, _type);
	};
	UnaryAssignmentTag = new Rexjs(UnaryAssignmentTag, UnaryTag);

	UnaryAssignmentTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置临时表达式
			statement.expression = new UnaryExpression(context);
			// 设置当前语句
			statements.statement = new UnaryAssignmentStatement(statements);
		}
	});

	return UnaryAssignmentTag;
}(
	this.UnaryTag,
	this.UnaryExpression,
	this.UnaryAssignmentStatement
);

this.PostfixUnaryAssignmentTag = function(UnaryAssignmentTag){
	/**
	 * 后置一元赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function PostfixUnaryAssignmentTag(_type){
		UnaryAssignmentTag.call(this, _type);
	};
	PostfixUnaryAssignmentTag = new Rexjs(PostfixUnaryAssignmentTag, UnaryAssignmentTag);

	PostfixUnaryAssignmentTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
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
			parser.error(context);
			return;
			// 设置临时表达式
			statement.expression = new UnaryExpression(context);
			// 设置当前语句
			statements.statement = new UnaryAssignmentStatement(statements);
		}
	});

	return PostfixUnaryAssignmentTag;
}(
	this.UnaryAssignmentTag
);

}.call(
	this,
	this.AssignableExpression,
	this.AccessorExpression,
	this.UnaryStatement,
	this.VariableTag
);


// 一元赋值标签
void function(UnaryAssignmentTag, PostfixUnaryAssignmentTag){

this.IncrementTag = function(){
	/**
	 * 前置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function IncrementTag(_type){
		UnaryAssignmentTag.call(this, _type);
	};
	IncrementTag = new Rexjs(IncrementTag, UnaryAssignmentTag);
	
	IncrementTag.props({
		regexp: /\+\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return IncrementTag;
}();

this.IncrementSiblingTag = function(IncrementTag){
	/**
	 * 相邻的前置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function IncrementSiblingTag(_type){
		IncrementTag.call(this, _type);
	};
	IncrementSiblingTag = new Rexjs(IncrementSiblingTag, IncrementTag);
	
	IncrementSiblingTag.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: 302
	});
	
	return IncrementSiblingTag;
}(
	this.IncrementTag
);

this.PostfixIncrementTag = function(){
	/**
	 * 后置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function PostfixIncrementTag(_type){
		PostfixUnaryAssignmentTag.call(this, _type);
	};
	PostfixIncrementTag = new Rexjs(PostfixIncrementTag, PostfixUnaryAssignmentTag);
	
	PostfixIncrementTag.props({
		regexp: /\+\+/
	});
	
	return PostfixIncrementTag;
}();

this.DecrementTag = function(){
	/**
	 * 前置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function DecrementTag(_type){
		UnaryAssignmentTag.call(this, _type);
	};
	DecrementTag = new Rexjs(DecrementTag, UnaryAssignmentTag);
	
	DecrementTag.props({
		regexp: /--/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return DecrementTag;
}();

this.DecrementSiblingTag = function(DecrementTag){
	/**
	 * 相邻的前置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function DecrementSiblingTag(_type){
		DecrementTag.call(this, _type);
	};
	DecrementSiblingTag = new Rexjs(DecrementSiblingTag, DecrementTag);
	
	DecrementSiblingTag.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: 302
	});
	
	return DecrementSiblingTag;
}(
	this.DecrementTag
);

}.call(
	this,
	this.UnaryAssignmentTag,
	this.PostfixUnaryAssignmentTag
);


// 二元标签基类
void function(){

this.BinaryExpression = function(add){
	/**
	 * 二元表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function BinaryExpression(context){
		ListExpression.call(this, context, "");
	};
	BinaryExpression = new Rexjs(BinaryExpression, ListExpression);

	BinaryExpression.props({
		/**
		 * 添加表达式
		 * @param {Expression} expression - 需要添加的表达式
		 */
		add: function(expression){
			// 调用父类方法
			add.call(this, expression);

			// 设置最近添加的表达式
			this.latest = expression;
		},
		latest: null,
		/**
		 * 用指定表达式替换最近添加的表达式
		 * @param {Expression} expression - 指定的表达式
		 */
		replace: function(expression){
			this.latest = this[this.length - 1] = expression;
		}
	});

	return BinaryExpression;
}(
	ListExpression.prototype.add
);

this.BinaryStatement = function(){
	/**
	 * 二元语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BinaryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BinaryStatement = new Rexjs(BinaryStatement, ECMAScriptStatement);
	
	BinaryStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().add(this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是表达式分隔符标签
			if(
				this.target.expression.latest.context.tag.isSeparator(context)
			){
				// 跳出语句并添加表达式
				this.out().add(this.expression);
			}
		}
	});
	
	return BinaryStatement;
}();

this.BinaryTag = function(ExpressionSeparatorTag, BinaryExpression, BinaryStatement){
	/**
	 * 二元标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	BinaryTag = new Rexjs(BinaryTag, ExpressionSeparatorTag);
	
	BinaryTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			return context.tag instanceof ExpressionSeparatorTag;
		},
		order: 300,
		precedence: 0,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 如果当前表达式是二元表达式
			if(
				expression instanceof BinaryExpression
			){
				// 替换最近添加的表达式
				expression.replace(
					new LeftHandSideExpression(expression.latest, context)
				);
			}
			else {
				(
					// 设置当前表达式
					statement.expression = new BinaryExpression(context)
				)
				// 添加表达式
				.add(
					new LeftHandSideExpression(expression, context)
				);
			}

			// 设置当前语句
			statements.statement = new BinaryStatement(statements);
		}
	});
	
	return BinaryTag;
}(
	this.ExpressionSeparatorTag,
	this.BinaryExpression,
	this.BinaryStatement
);

}.call(
	this
);


// 特殊的二元标签
void function(BinaryTag){

this.AssignmentTag = function(BinaryExpression, AssignableExpression, IdentifierExpression, VariableDeclarationTag, isSeparator, visitor){
	/**
	 * 二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	function AssignmentTag(_type){
		BinaryTag.call(this, _type);
	};
	AssignmentTag = new Rexjs(AssignmentTag, BinaryTag);

	AssignmentTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			// 如果是父类确定的分隔符，但不是箭头符号，那么它就是赋值标签所认定的分隔符
			return isSeparator.call(this, context) && context.content !== "=>";
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			switch(
				true
			){
				// 如果表达式是可赋值表达式
				case expression instanceof AssignableExpression:
					break;

				// 如果表达式是二元表达式
				case expression instanceof BinaryExpression:
					// 如果上一个表达式也属于赋值表达式
					if(
						expression[expression.length - 2].context.tag.precedence === 0
					){
						expression = expression[expression.length - 1];
						break;
					}

				default:
					// 报错
					parser.error(context, ECMAScriptErrors.ASSIGNMENT, true);
					return;
			}

			// 如果是标识符表达式，那么需要验证是否为常量赋值
			if(
				expression instanceof IdentifierExpression
			){
				var ctx = expression.context, tag = ctx.tag;

				switch(
					true
				){
					// 如果当前是声明变量名标签，则不判断是否被收集，因为在声明中，已经判断，再判断的话，100% 由于重复定义，而报错
					case tag instanceof VariableDeclarationTag:
						break;

					// 如果已经被收集，会导致报错
					case tag.collected(parser, ctx, parser.statements):
						return;
				}
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return AssignmentTag;
}(
	this.BinaryExpression,
	this.AssignableExpression,
	this.IdentifierExpression,
	this.VariableDeclarationTag,
	BinaryTag.prototype.isSeparator,
	BinaryTag.prototype.visitor
);

this.BinaryKeywordTag = function(){
	/**
	 * 二元关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryKeywordTag(_type){
		BinaryTag.call(this, _type);
	};
	BinaryKeywordTag = new Rexjs(BinaryKeywordTag, BinaryTag);

	BinaryKeywordTag.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
			// 追加空格
			contentBuilder.appendSpace();
		}
	});
	
	return BinaryKeywordTag;
}();

}.call(
	this,
	this.BinaryTag
);


// 所有具体的二元标签
void function(BinaryTag, AssignmentTag, BinaryKeywordTag){

this.BasicAssignmentTag = function(){
	/**
	 * 二元基础赋值运算符“等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function BasicAssignmentTag(_type){
		AssignmentTag.call(this, _type);
	};
	BasicAssignmentTag = new Rexjs(BasicAssignmentTag, AssignmentTag);
	
	BasicAssignmentTag.props({
		regexp: /=/
	});
	
	return BasicAssignmentTag;
}();

this.ShorthandAssignmentTag = function(){
	/**
	 * 简写的二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	function ShorthandAssignmentTag(_type){
		AssignmentTag.call(this, _type);
	};
	ShorthandAssignmentTag = new Rexjs(ShorthandAssignmentTag, AssignmentTag);
	
	ShorthandAssignmentTag.props({
		// 防止与其他二元运算符冲突
		order: 303,
		regexp: /\+=|-=|\*=|\/=|%=|<<=|>>=|>>>=|\&=|\|=|\^=/
	});
	
	return ShorthandAssignmentTag;
}();

this.IllegalShorthandAssignmentTag = function(ShorthandAssignmentTag){
	/**
	 * 不合法的简写二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	function IllegalShorthandAssignmentTag(_type){
		ShorthandAssignmentTag.call(this, _type);
	};
	IllegalShorthandAssignmentTag = new Rexjs(IllegalShorthandAssignmentTag, ShorthandAssignmentTag);

	IllegalShorthandAssignmentTag.props({
		order: 304,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context);
		}
	});

	return IllegalShorthandAssignmentTag;
}(
	this.ShorthandAssignmentTag
);

this.LogicalORTag = function(){
	/**
	 * 逻辑运算符“或”标签
	 * @param {Number} _type - 标签类型
	 */
	function LogicalORTag(_type){
		BinaryTag.call(this, _type);
	};
	LogicalORTag = new Rexjs(LogicalORTag, BinaryTag);
	
	LogicalORTag.props({
		// 防止与 "|" 冲突
		order: 301,
		precedence: 1,
		regexp: /\|\|/
	});
	
	return LogicalORTag;
}();

this.LogicalANDTag = function(){
	/**
	 * 逻辑运算符“与”标签
	 * @param {Number} _type - 标签类型
	 */
	function LogicalANDTag(_type){
		BinaryTag.call(this, _type);
	};
	LogicalANDTag = new Rexjs(LogicalANDTag, BinaryTag);
	
	LogicalANDTag.props({
		// 防止与 "&" 冲突
		order: 301,
		precedence: 2,
		regexp: /\&\&/
	});
	
	return LogicalANDTag;
}();

this.BitwiseORTag = function(){
	/**
	 * 二进制位运算符“或”标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseORTag(_type){
		BinaryTag.call(this, _type);
	};
	BitwiseORTag = new Rexjs(BitwiseORTag, BinaryTag);
	
	BitwiseORTag.props({
		precedence: 3,
		regexp: /\|/
	});
	
	return BitwiseORTag;
}();

this.BitwiseXORTag = function(){
	/**
	 * 二进制位运算符“非或”标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseXORTag(_type){
		BinaryTag.call(this, _type);
	};
	BitwiseXORTag = new Rexjs(BitwiseXORTag, BinaryTag);
	
	BitwiseXORTag.props({
		precedence: 4,
		regexp: /\^/
	});
	
	return BitwiseXORTag;
}();

this.BitwiseANDTag = function(){
	/**
	 * 二进制位运算符“与”标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseANDTag(_type){
		BinaryTag.call(this, _type);
	};
	BitwiseANDTag = new Rexjs(BitwiseANDTag, BinaryTag);
	
	BitwiseANDTag.props({
		precedence: 5,
		regexp: /\&/
	});
	
	return BitwiseANDTag;
}();

this.IdentityTag = function(){
	/**
	 * 关系运算符“全等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentityTag(_type){
		BinaryTag.call(this, _type);
	};
	IdentityTag = new Rexjs(IdentityTag, BinaryTag);
	
	IdentityTag.props({
		// 防止与 "==" 或 "=" 冲突
		order: 303,
		precedence: 6,
		regexp: /===/
	});
	
	return IdentityTag;
}();

this.NonidentityTag = function(){
	/**
	 * 关系运算符“不全等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function NonidentityTag(_type){
		BinaryTag.call(this, _type);
	};
	NonidentityTag = new Rexjs(NonidentityTag, BinaryTag);
	
	NonidentityTag.props({
		// 防止与 "!=" 冲突
		order: 303,
		precedence: 6,
		regexp: /!==/
	});
	
	return NonidentityTag;
}();


this.EqualityTag = function(){
	/**
	 * 关系运算符“等于等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function EqualityTag(_type){
		BinaryTag.call(this, _type);
	};
	EqualityTag = new Rexjs(EqualityTag, BinaryTag);
	
	EqualityTag.props({
		order: 302,
		precedence: 6,
		regexp: /==/
	});
	
	return EqualityTag;
}();

this.InequalityTag = function(){
	/**
	 * 关系运算符“不等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function InequalityTag(_type){
		BinaryTag.call(this, _type);
	};
	InequalityTag = new Rexjs(InequalityTag, BinaryTag);
	
	InequalityTag.props({
		order: 302,
		precedence: 6,
		regexp: /!=/
	});
	
	return InequalityTag;
}();

this.LessThanOrEqualTag = function(){
	/**
	 * 关系运算符“小于等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function LessThanOrEqualTag(_type){
		BinaryTag.call(this, _type);
	};
	LessThanOrEqualTag = new Rexjs(LessThanOrEqualTag, BinaryTag);

	LessThanOrEqualTag.props({
		order: 301,
		precedence: 7,
		regexp: /<=/
	});
	
	return LessThanOrEqualTag;
}();

this.GreaterThanOrEqualTag = function(){
	/**
	 * 关系运算符“大于等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function GreaterThanOrEqualTag(_type){
		BinaryTag.call(this, _type);
	};
	GreaterThanOrEqualTag = new Rexjs(GreaterThanOrEqualTag, BinaryTag);
	
	GreaterThanOrEqualTag.props({
		order: 301,
		precedence: 7,
		regexp: />=/
	});
	
	return GreaterThanOrEqualTag;
}();

this.LessThanTag = function(){
	/**
	 * 关系运算符“小于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function LessThanTag(_type){
		BinaryTag.call(this, _type);
	};
	LessThanTag = new Rexjs(LessThanTag, BinaryTag);
	
	LessThanTag.props({
		precedence: 7,
		regexp: /</
	});
	
	return LessThanTag;
}();

this.GreaterThanTag = function(){
	/**
	 * 关系运算符“大于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function GreaterThanTag(_type){
		BinaryTag.call(this, _type);
	};
	GreaterThanTag = new Rexjs(GreaterThanTag, BinaryTag);
	
	GreaterThanTag.props({
		precedence: 7,
		regexp: />/
	});
	
	return GreaterThanTag;
}();

this.InstanceofTag = function(){
	/**
	 * 关系运算符“instanceof”标签
	 * @param {Number} _type - 标签类型
	 */
	function InstanceofTag(_type){
		BinaryKeywordTag.call(this, _type);
	};
	InstanceofTag = new Rexjs(InstanceofTag, BinaryKeywordTag);
	
	InstanceofTag.props({
		precedence: 7,
		regexp: /instanceof/
	});
	
	return InstanceofTag;
}();

this.InTag = function(){
	/**
	 * 关系运算符“in”标签
	 * @param {Number} _type - 标签类型
	 */
	function InTag(_type){
		BinaryKeywordTag.call(this, _type);
	};
	InTag = new Rexjs(InTag, BinaryKeywordTag);
	
	InTag.props({
		precedence: 7,
		regexp: /in(?!stanceof)/
	});
	
	return InTag;
}();

this.UnsignedRightShiftTag = function(){
	/**
	 * 二进制运算符“无符号右位移”标签
	 * @param {Number} _type - 标签类型
	 */
	function UnsignedRightShiftTag(_type){
		BinaryTag.call(this, _type);
	};
	UnsignedRightShiftTag = new Rexjs(UnsignedRightShiftTag, BinaryTag);
	
	UnsignedRightShiftTag.props({
		order: 302,
		precedence: 8,
		regexp: />>>/
	});
	
	return UnsignedRightShiftTag;
}();

this.LeftShiftTag = function(){
	/**
	 * 二进制运算符“左位移”标签
	 * @param {Number} _type - 标签类型
	 */
	function LeftShiftTag(_type){
		BinaryTag.call(this, _type);
	};
	LeftShiftTag = new Rexjs(LeftShiftTag, BinaryTag);
	
	LeftShiftTag.props({
		order: 301,
		precedence: 8,
		regexp: /<</
	});
	
	return LeftShiftTag;
}();

this.RightShiftTag = function(){
	/**
	 * 二进制运算符“右位移”标签
	 * @param {Number} _type - 标签类型
	 */
	function RightShiftTag(_type){
		BinaryTag.call(this, _type);
	};
	RightShiftTag = new Rexjs(RightShiftTag, BinaryTag);
	
	RightShiftTag.props({
		order: 301,
		precedence: 8,
		regexp: />>/
	});
	
	return RightShiftTag;
}();

this.AdditionTag = function(){
	/**
	 * 二元运算符“加号”标签
	 * @param {Number} _type - 标签类型
	 */
	function AdditionTag(_type){
		BinaryTag.call(this, _type);
	};
	AdditionTag = new Rexjs(AdditionTag, BinaryTag);
	
	AdditionTag.props({
		precedence: 9,
		regexp: /\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return AdditionTag;
}();

this.SubtractionTag = function(){
	/**
	 * 二元运算符“减号”标签
	 * @param {Number} _type - 标签类型
	 */
	function SubtractionTag(_type){
		BinaryTag.call(this, _type);
	};
	SubtractionTag = new Rexjs(SubtractionTag, BinaryTag);
	
	SubtractionTag.props({
		precedence: 9,
		regexp: /-/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return SubtractionTag;
}();

this.DivisionTag = function(){
	/**
	 * 二元运算符“除号”标签
	 * @param {Number} _type - 标签类型
	 */
	function DivisionTag(_type){
		BinaryTag.call(this, _type);
	};
	DivisionTag = new Rexjs(DivisionTag, BinaryTag);
	
	DivisionTag.props({
		precedence: 10,
		regexp: /\//
	});
	
	return DivisionTag;
}();

this.MultiplicationTag = function(){
	/**
	 * 二元运算符“乘号”标签
	 * @param {Number} _type - 标签类型
	 */
	function MultiplicationTag(_type){
		BinaryTag.call(this, _type);
	};
	MultiplicationTag = new Rexjs(MultiplicationTag, BinaryTag);
	
	MultiplicationTag.props({
		precedence: 10,
		regexp: /\*/
	});
	
	return MultiplicationTag;
}();

this.RemainderTag = function(){
	/**
	 * 二元运算符“百分号”标签
	 * @param {Number} _type - 标签类型
	 */
	function RemainderTag(_type){
		BinaryTag.call(this, _type);
	};
	RemainderTag = new Rexjs(RemainderTag, BinaryTag);
	
	RemainderTag.props({
		precedence: 10,
		regexp: /%/
	});
	
	return RemainderTag;
}();
	
}.call(
	this,
	this.BinaryTag,
	this.AssignmentTag,
	this.BinaryKeywordTag
);


// 三元表达式相关
void function(colonTag){

this.TernaryExpression = function(){
	/**
	 * 三元表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function TernaryExpression(context){
		Expression.call(this, context);
	};
	TernaryExpression = new Rexjs(TernaryExpression, Expression);

	TernaryExpression.props({
		condition: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取条件表达式
			this.condition.extractTo(contentBuilder);
			// 追加问号上下文
			contentBuilder.appendContext(this.context);
			// 提取成立条件表达式
			this.positive.extractTo(contentBuilder);
			// 追加冒号上下文
			contentBuilder.appendContext(this.colonContext);
			// 提取否定条件表达式
			this.negative.extractTo(contentBuilder);
		},
		negative: null,
		positive: null
	});

	return TernaryExpression;
}();

this.PositiveStatement = function(){
	/**
	 * 三元表达式的肯定条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PositiveStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	PositiveStatement = new Rexjs(PositiveStatement, ECMAScriptStatement);

	PositiveStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是冒号
			if(
				context.content !== ":"
			){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句
			var ternaryExpression = this.out();

			// 设置 positive
			ternaryExpression.positive = this.expression;
			return ternaryExpression.context.tag.binding;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(
				context.content === ","
			){
				// 报错
				parser.error(context);
			}
		}
	});

	return PositiveStatement;
}();

this.NegativeStatement = function(){
	/**
	 * 三元表达式的否定条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function NegativeStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	NegativeStatement = new Rexjs(NegativeStatement, ECMAScriptStatement);

	NegativeStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 negative
			this.out().negative = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(
				context.content === ","
			){
				// 跳出语句并设置 negative
				this.out().negative = this.expression;
			}
		}
	});

	return NegativeStatement;
}();

this.QuestionTag = function(ExpressionSeparatorTag, TernaryExpression, PositiveStatement){
	/**
	 * 三元运算符“问号”标签
	 * @param {Number} _type - 标签类型
	 */
	function QuestionTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	QuestionTag = new Rexjs(QuestionTag, ExpressionSeparatorTag);

	QuestionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return colonTag;
		},
		regexp: /\?/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 初始化三元表达式
			var ternaryExpression = new TernaryExpression(context);

			// 设置三元表达式的条件
			ternaryExpression.condition = statement.expression;
			// 设置当前表达式
			statement.expression = ternaryExpression;
			// 设置当前语句
			statements.statement = new PositiveStatement(statements);
		}
	});

	return QuestionTag;
}(
	this.ExpressionSeparatorTag,
	this.TernaryExpression,
	this.PositiveStatement
);

this.ColonTag = function(NegativeStatement){
	/**
	 * 冒号标签
	 * @param {Number} _type - 标签类型
	 */
	function ColonTag(_type){
		SyntaxTag.call(this, _type);
	};
	ColonTag = new Rexjs(ColonTag, SyntaxTag);

	ColonTag.props({
		regexp: /:/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置冒号上下文
			statement.expression.colonContext = context;
			// 设置当前语句
			statements.statement = new NegativeStatement(statements);
		}
	});
	
	return ColonTag;
}(
	this.NegativeStatement
);

colonTag = new this.ColonTag();

}.call(
	this,
	// colonTag
	null
);


// 函数调用相关
void function(BracketAccessorExpression, UnaryKeywordTag, parameterSeparatorTag, closeCallTag, extractTo){

this.CallExpression = function(UnaryExpression, AccessorExpression, config, compileWithAccessor, compileWithNew, compileDefault){
	/**
	 * 函数调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} operand - 操作对象表达式
	 */
	function CallExpression(open, operand){
		PartnerExpression.call(this, open);

		this.operand = operand;
		this.inner = new ListExpression(null, ",");
	};
	CallExpression = new Rexjs(CallExpression, PartnerExpression);

	CallExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

	CallExpression.props({
		/**
		 * 提取文本内容，空函数，不做任何处理
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var operand = this.operand;

			// 如果有拓展符且需要编译
			if(
				this.hasSpread && config.spread
			){
				switch(
					true
				){
					// 如果是对象方法的调用
					case operand instanceof AccessorExpression:
						// 根据访问器编译
						compileWithAccessor(contentBuilder, this, operand, this.variable);
						return;

					// 如果是一元表达式
					case operand instanceof UnaryExpression:
						// 而且如果是 new 关键字
						if(
							operand.context.content === "new"
						){
							// 根据 new 关键字编译
							compileWithNew(contentBuilder, this, operand);
							return;
						}

					default:
						// 编译默认情况
						compileDefault(contentBuilder, this, operand);
						return;
				}
			}
			
			// 提取操作对象
			operand.extractTo(contentBuilder);
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		hasSpread: false,
		operand: null,
		variable: ""
	});

	return CallExpression;
}(
	this.UnaryExpression,
	this.AccessorExpression,
	// config
	new SyntaxConfig("spread"),
	// compileWithAccessor
	function(contentBuilder, expression, operand, variable){
		// 追加临时变量名
		contentBuilder.appendString("(" + variable + "=");
		// 提取拥有此方法的对象
		operand.object.extractTo(contentBuilder);
		// 追加临时变量名的结束小括号
		contentBuilder.appendString(")");

		// 如果是中括号属性访问表达式
		if(
			operand instanceof BracketAccessorExpression
		){
			// 提取中括号
			operand.property.extractTo(contentBuilder);
		}
		else {
			// 提取点操作符
			contentBuilder.appendContext(operand.context);
			// 提取属性
			contentBuilder.appendContext(operand.property);
		}
		
		// 追加 apply 方法
		contentBuilder.appendString(".apply(" + variable + ",Rexjs.SpreadParameter.toArray");
		// 调用父类方法
		extractTo.call(expression, contentBuilder);
		// 追加 apply 方法的结束小括号
		contentBuilder.appendString(")");
	},
	// compileWithNew
	function(contentBuilder, expression, operand){
		// 追加 new 关键字上下文
		contentBuilder.appendContext(operand.context);
		// 追加 bind 方法
		contentBuilder.appendString("(Function.bind.apply(");
		// 提取该调用的方法
		operand.operand.extractTo(contentBuilder);
		// 追加拓展符编译的方法
		contentBuilder.appendString(",Rexjs.SpreadParameter.toArray");
		// 追加函数调用的起始小括号
		contentBuilder.appendContext(expression.open);
		// 追加 bind 所指定的 this
		contentBuilder.appendString("void 0,");
		// 提取函数调用参数
		expression.inner.extractTo(contentBuilder);
		// 追加函数调用的结束小括号
		contentBuilder.appendContext(expression.close);
		// 追加 bind 方法的结束小括号和函数立即执行的小括号（注：bind 方法与 apply 不同，不具有立即执行效果）
		contentBuilder.appendString("))()");
	},
	// compileDefault
	function(contentBuilder, expression, operand){
		// 追加 apply
		contentBuilder.appendString("Function.apply.call(");
		// 提取操作对象
		operand.extractTo(contentBuilder);
		// 追加 apply 方法的参数
		contentBuilder.appendString(",void 0,Rexjs.SpreadParameter.toArray");
		// 调用父类方法
		extractTo.call(expression, contentBuilder);
		// 追加 apply 方法的结束小括号
		contentBuilder.appendString(")");
	}
);

this.CallStatement = function(){
	/**
	 * 函数调用语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CallStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CallStatement = new Rexjs(CallStatement, ECMAScriptStatement);
	
	CallStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭分组小括号
			if(
				context.content !== ")"
			){
				// 报错
				parser.error(context);
				return null;
			}
			
			// 跳出该语句
			var callExpression = this.out();

			// 设置表达式
			callExpression.inner.set(this.expression);
			// 返回关闭分组小括号标签
			return callExpression.open.tag.binding;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(
				context.content !== ","
			){
				return null;
			}

			// 跳出该语句
			var callExpression = this.out();

			// 添加表达式
			callExpression.inner.add(this.expression);
			// 返回关闭分组小括号标签
			return callExpression.open.tag.separator;
		}
	});
	
	return CallStatement;
}();

this.OpenCallTag = function(OpenParenTag, CallExpression, CallStatement){
	/**
	 * 起始函数调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenCallTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenCallTag = new Rexjs(OpenCallTag, OpenParenTag);
	
	OpenCallTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeCallTag;
		},
		// 防止与分组小括号冲突
		order: 100,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.parameterTags;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return parameterSeparatorTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new CallExpression(context, statement.expression);
			
			// 设置当前语句
			(
				statements.statement = new CallStatement(statements)
			)
			// 设置表达式
			.expression = new DefaultExpression();
		}
	});
	
	return OpenCallTag;
}(
	this.OpenParenTag,
	this.CallExpression,
	this.CallStatement
);

this.ParameterSeparatorTag = function(CommaTag, CallStatement){
	/**
	 * 函数调用参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ParameterSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ParameterSeparatorTag = new Rexjs(ParameterSeparatorTag, CommaTag);

	ParameterSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.parameterTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new CallStatement(statements);
		}
	});

	return ParameterSeparatorTag;
}(
	this.CommaTag,
	this.CallStatement
);

this.CloseCallTag = function(CloseParenTag){
	/**
	 * 结束函数调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseCallTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseCallTag = new Rexjs(CloseCallTag, CloseParenTag);
	
	CloseCallTag.props({
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
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseCallTag;
}(
	this.CloseParenTag
);

parameterSeparatorTag = new this.ParameterSeparatorTag();
closeCallTag = new this.CloseCallTag();

}.call(
	this,
	this.BracketAccessorExpression,
	this.UnaryKeywordTag,
	// parameterSeparatorTag
	null,
	// closeCallTag
	null,
	// extractTo
	PartnerExpression.prototype.extractTo
);


// 拓展参数相关
void function(){

this.SpreadExpression = function(config){
	/**
	 * 拓展参数表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function SpreadExpression(context){
		Expression.call(this, context);
	};
	SpreadExpression = new Rexjs(SpreadExpression, Expression);

	SpreadExpression.props({
		argument: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译拓展符
			if(
				config.spread
			){
				// 追加编译拓展符方法
				contentBuilder.appendString("new Rexjs.SpreadParameter(");
				// 提取参数
				this.argument.extractTo(contentBuilder);
				// 追加拓展符方法的结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 追加拓展符上下文
			contentBuilder.appendContext(this.context);
			// 提取参数
			this.argument.extractTo(contentBuilder);
		}
	});

	return SpreadExpression;
}(
	this.CallExpression.config
);

this.SpreadStatement = function(){
	/**
	 * 拓展参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SpreadStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SpreadStatement = new Rexjs(SpreadStatement, ECMAScriptStatement);

	SpreadStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 argument
			this.out().argument = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(
				context.content === ","
			){
				// 跳出语句并设置 argument
				this.out().argument = this.expression;
			}
		}
	});

	return SpreadStatement;
}();

this.SpreadTag = function(SpreadExpression, SpreadStatement, AccessorExpression){
	/**
	 * 拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function SpreadTag(_type){
		SyntaxTag.call(this, _type);
	};
	SpreadTag = new Rexjs(SpreadTag, SyntaxTag);
	
	SpreadTag.props({
		// 防止与数字、点访问器冲突
		order: 101,
		regexp: /\.{3}/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var callExpression = statement.target.expression;

			// 设置当前表达式
			statement.expression = new SpreadExpression(context);
			// 设置当前语句
			statements.statement = new SpreadStatement(statements);

			// 如果已有拓展符
			if(
				callExpression.hasSpread
			){
				return;
			}

			switch(
				false
			){
				// 如果函数调用表达式的操作对象不是属性表达式
				case callExpression.operand instanceof AccessorExpression:
					break;

				// 如果已经存在变量名
				case callExpression.variable === "":
					break;

				default:
					// 生成变量名
					callExpression.variable = statements.collections.generate();
					break;
			}

			// 设置 call 表达式 hasSpread 属性，表示有拓展符
			callExpression.hasSpread = true;
		}
	});
	
	return SpreadTag;
}(
	this.SpreadExpression,
	this.SpreadStatement,
	this.AccessorExpression
);

}.call(
	this
);


// 数组相关
void function(closeArrayTag, arrayItemSeparatorTag){

this.ArrayExpression = function(){
	/**
	 * 数组表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArrayExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
	};
	ArrayExpression = new Rexjs(ArrayExpression, PartnerExpression);

	return ArrayExpression;
}();

this.ArrayStatement = function(){
	/**
	 * 数组语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArrayStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArrayStatement = new Rexjs(ArrayStatement, ECMAScriptStatement);

	ArrayStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			var arrayExpression = this.out();

			// 判断标签内容
			switch(
				context.content
			){
				case ",":
					// 添加表达式
					arrayExpression.inner.add(this.expression);
					// 返回标签
					return arrayExpression.open.tag.separator;

				case "]":
					// 设置表达式
					arrayExpression.inner.set(this.expression);
					// 返回结束标签
					return arrayExpression.open.tag.binding;
			}

			// 报错
			parser.error(context);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(
				context.content !== ","
			){
				return null;
			}

			// 跳出语句
			var arrayExpression = this.out();

			// 跳出语句并添加表达式
			arrayExpression.inner.add(this.expression);
			// 返回标签
			return arrayExpression.open.tag.separator;
		}
	});

	return ArrayStatement;
}();

this.OpenArrayTag = function(OpenBracketTag, ArrayExpression, ArrayStatement){
	/**
	 * 起始数组标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArrayTag(_type){
		OpenBracketTag.call(this, _type);
	};
	OpenArrayTag = new Rexjs(OpenArrayTag, OpenBracketTag);
	
	OpenArrayTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArrayTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return arrayItemSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ArrayExpression(context);
			// 设置当前语句
			statements.statement = new ArrayStatement(statements);
		}
	});
	
	return OpenArrayTag;
}(
	this.OpenBracketTag,
	this.ArrayExpression,
	this.ArrayStatement
);

this.ArrayItemSeparatorTag = function(CommaTag, ArrayStatement){
	/**
	 * 数组项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArrayItemSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ArrayItemSeparatorTag = new Rexjs(ArrayItemSeparatorTag, CommaTag);
	
	ArrayItemSeparatorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			(
				statements.statement = new ArrayStatement(statements)
			)
			// 设置语句表达式
			.expression = new EmptyExpression(null);
		}
	});
	
	return ArrayItemSeparatorTag;
}(
	this.CommaTag,
	this.ArrayStatement
);

this.CloseArrayTag = function(CloseBracketTag){
	/**
	 * 结束数组标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArrayTag(_type){
		CloseBracketTag.call(this, _type);
	};
	CloseArrayTag = new Rexjs(CloseArrayTag, CloseBracketTag);
	
	CloseArrayTag.props({
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
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseArrayTag;
}(
	this.CloseBracketTag
);

arrayItemSeparatorTag = new this.ArrayItemSeparatorTag();
closeArrayTag = new this.CloseArrayTag();

}.call(
	this,
	// closeArrayTag
	null,
	// arrayItemSeparatorTag
	null
);


// 语句块相关
void function(closeBlockTag){

this.BlockExpression = function(){
	/**
	 * 语句块表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function BlockExpression(open){
		PartnerExpression.call(this, open);
	};
	BlockExpression = new Rexjs(BlockExpression, PartnerExpression);
	
	BlockExpression.props({
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});
	
	return BlockExpression;
}();

this.DefaultBlockBodyExpression = function(){
	/**
	 * 默认语句块主体表达式
	 */
	function DefaultBlockBodyExpression(){
		DefaultExpression.call(this);
	};
	DefaultBlockBodyExpression = new Rexjs(DefaultBlockBodyExpression, DefaultExpression);

	DefaultBlockBodyExpression.props({
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});

	return DefaultBlockBodyExpression;
}();

this.BlockBodyStatement = function(DefaultBlockBodyExpression){
	/**
	 * 语句块主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BlockBodyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BlockBodyStatement = new Rexjs(BlockBodyStatement, ECMAScriptStatement);
	
	BlockBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭大括号
			if(
				context.content !== "}"
			){
				return null;
			}

			var statements = this.statements,
			
				blockExpression = (
						// 恢复语句块
						parser.statements = statements.target
					)
					.statement
					.expression;

			// 设置 inner
			blockExpression.inner = statements;
			// 返回结束语句块标签
			return blockExpression.open.tag.binding;
		},
		expression: new DefaultBlockBodyExpression()
	});
	
	return BlockBodyStatement;
}(
	this.DefaultBlockBodyExpression
);

this.BlockBodyStatements = function(ECMAScriptStatements, BlockBodyStatement){
	/**
	 * 语句块
	 * @param {ECMAScriptVariableCollections} collections - 变量名收集器集合
	 */
	function BlockBodyStatements(collections){
		ECMAScriptStatements.call(this, collections);
	};
	BlockBodyStatements = new Rexjs(BlockBodyStatements, ECMAScriptStatements);
	
	BlockBodyStatements.props({
		closure: false,
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new BlockBodyStatement(this);
		}
	});
	
	return BlockBodyStatements;
}(
	this.ECMAScriptStatements,
	this.BlockBodyStatement
);

this.OpenBlockTag = function(OpenBraceTag, BlockExpression, BlockBodyStatements, ECMAScriptVariableCollections){
	/**
	 * 起始语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBlockTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenBlockTag = new Rexjs(OpenBlockTag, OpenBraceTag);
	
	OpenBlockTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBlockTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new BlockExpression(context);
			
			// 设置当前语句块
			(
				parser.statements = new BlockBodyStatements(
					// 初始化变量名收集器集合
					new ECMAScriptVariableCollections(
						statements.collections.index
					)
				)
			)
			.target = statements;
		}
	});
	
	return OpenBlockTag;
}(
	this.OpenBraceTag,
	this.BlockExpression,
	this.BlockBodyStatements,
	this.ECMAScriptVariableCollections
);

this.CloseBlockTag = function(CloseBraceTag){
	/**
	 * 结束语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBlockTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseBlockTag = new Rexjs(CloseBlockTag, CloseBraceTag);
	
	CloseBlockTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseBlockTag;
}(
	this.CloseBraceTag
);

closeBlockTag = new this.CloseBlockTag();

}.call(
	this,
	// closeBlockTag
	null
);


// 函数表达式相关
void function(){

this.FunctionExpression = function(config){
	/**
	 * 函数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FunctionExpression(context){
		Expression.call(this, context);
	};
	FunctionExpression = new Rexjs(FunctionExpression, Expression);

	FunctionExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

	FunctionExpression.props({
		arguments: null,
		body: null,
		head: null,
		name: new DefaultExpression(),
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var defaultArgumentBuilder = new ContentBuilder();

			// 提取函数头部
			this.head.extractTo(contentBuilder);
			// 提取函数名称
			this.name.extractTo(contentBuilder);
			// 提取函数参数
			this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);
			// 提取函数主体
			this.body.extractTo(contentBuilder, defaultArgumentBuilder);
		}
	});

	return FunctionExpression;
}(
	// config
	new SyntaxConfig("defaultArgument", "restArgument", "arrowFunction")
);

this.FunctionDeclarationExpression = function(FunctionExpression){
	/**
	 * 函数声明表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FunctionDeclarationExpression(context){
		FunctionExpression.call(this, context);

		this.head = new Expression(context);
	};
	FunctionDeclarationExpression = new Rexjs(FunctionDeclarationExpression, FunctionExpression);

	FunctionDeclarationExpression.props({
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});

	return FunctionDeclarationExpression;
}(
	this.FunctionExpression
);

this.FunctionTag = function(FunctionExpression){
	/**
	 * 函数标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionTag(_type){
		SyntaxTag.call(this, _type);
	};
	FunctionTag = new Rexjs(FunctionTag, SyntaxTag);

	FunctionTag.props({
		$class: CLASS_EXPRESSION,
		regexp: /function/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			(
				statement.expression = new FunctionExpression(context)
			)
			// 设置函数表达式头部
			.head = new Expression(context);
		}
	});

	return FunctionTag;
}(
	this.FunctionExpression
);

this.FunctionDeclarationTag = function(FunctionTag, FunctionDeclarationExpression){
	/**
	 * 函数声明标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionDeclarationTag(_type){
		FunctionTag.call(this, _type);
	};
	FunctionDeclarationTag = new Rexjs(FunctionDeclarationTag, FunctionTag);

	FunctionDeclarationTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionDeclarationContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new FunctionDeclarationExpression(context);
		}
	});

	return FunctionDeclarationTag;
}(
	this.FunctionTag,
	this.FunctionDeclarationExpression
);

this.FunctionNameTag = function(VariableDeclarationTag, FunctionDeclarationExpression){
	/**
	 * 函数名标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	FunctionNameTag = new Rexjs(FunctionNameTag, VariableDeclarationTag);

	FunctionNameTag.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionArgumentTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的名称
			statement.expression.name = new Expression(context);
		}
	});

	return FunctionNameTag;
}(
	this.VariableDeclarationTag,
	this.FunctionDeclarationExpression
);

this.FunctionVariableTag = function(FunctionNameTag, visitor){
	/**
	 * 函数变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionVariableTag(_type){
		FunctionNameTag.call(this, _type);
	};
	FunctionVariableTag = new Rexjs(FunctionVariableTag, FunctionNameTag);

	FunctionVariableTag.props({
		order: 202,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);
		
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return FunctionVariableTag;
}(
	this.FunctionNameTag,
	this.FunctionNameTag.prototype.visitor
);

}.call(
	this
);


// 函数参数表达式相关
void function(argumentSeparatorTag, closeArgumentsTag){

this.ArgumentsExpression = function(VariableCollection){
	/**
	 * 函数参数列表表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArgumentsExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
		this.collection = new VariableCollection();
	};
	ArgumentsExpression = new Rexjs(ArgumentsExpression, PartnerExpression);

	ArgumentsExpression.props({
		collection: null
	});

	return ArgumentsExpression;
}(
	Rexjs.VariableCollection
);

this.ArgumentExpression = function(IdentifierExpression){
	/**
	 * 参数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ArgumentExpression(context){
		IdentifierExpression.call(this, context);
	};
	ArgumentExpression = new Rexjs(ArgumentExpression, IdentifierExpression);

	return ArgumentExpression;
}(
	this.IdentifierExpression
);

this.ArgumentStatement = function(){
	/**
	 * 参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArgumentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArgumentStatement = new Rexjs(ArgumentStatement, ECMAScriptStatement);

	ArgumentStatement.props({
		expression: new DefaultExpression(),
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并获取 arguments 属性
			var args = this.out().arguments;

			// 判断标签内容
			switch(
				context.content
			){
				// 如果是逗号（参数名上下文只允许接等于号赋值标签，所以逗号会进入 catch）
				case ",":
					// 跳出语句并添加参数表达式
					args.inner.add(this.expression);
					// 返回分隔符标签
					return args.open.tag.separator;

				// 如果是结束小括号，则说明是
				case ")":
					// 跳出语句并设置参数表达式（空参数，是默认表达式，要用 set 方法）
					args.inner.set(this.expression);
					// 返回参数结束小括号标签
					return args.open.tag.binding;
			}

			// 报错
			parser.error(context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(
				context.content !== ","
			){
				return null;
			}

			// 跳出语句并获取 arguments 属性
			var args = this.out().arguments;

			// 跳出语句并添加参数表达式
			args.inner.add(this.expression);
			// 返回分隔符标签
			return args.open.tag.separator;
		}
	});

	return ArgumentStatement;
}();

this.OpenArgumentsTag = function(OpenParenTag, ArgumentsExpression, ArgumentStatement){
	/**
	 * 起始函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArgumentsTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenArgumentsTag = new Rexjs(OpenArgumentsTag, OpenParenTag);

	OpenArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArgumentsTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return argumentSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openArgumentsContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的的参数
			statement.expression.arguments = new ArgumentsExpression(context);
			// 设置当前语句
			statements.statement = new ArgumentStatement(statements);
		}
	});

	return OpenArgumentsTag;
}(
	this.OpenParenTag,
	this.ArgumentsExpression,
	this.ArgumentStatement
);

this.ArgumentNameTag = function(VariableDeclarationTag, ArgumentExpression){
	/**
	 * 参数名标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ArgumentNameTag = new Rexjs(ArgumentNameTag, VariableDeclarationTag);

	ArgumentNameTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {VariableCollection} collection - 参数名收集器
		 */
		collectTo: function(parser, context, collection){
			var content = context.content;

			// 如果已经定义，说明是重复的参数名
			if(
				collection.contain(content)
			){
				// 报错
				parser.error(context, ECMAScriptErrors.DUPLICATE_PARAMETER_NAME);
				return;
			}

			// 参数列表收集变量名
			collection.collect(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.argumentNameContextTags;
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

			// 设置当前表达式
			statement.expression = new ArgumentExpression(context);
		}
	});

	return ArgumentNameTag;
}(
	this.VariableDeclarationTag,
	this.ArgumentExpression
);

this.ArgumentSeparatorTag = function(CommaTag, ArgumentStatement){
	/**
	 * 参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ArgumentSeparatorTag = new Rexjs(ArgumentSeparatorTag, CommaTag);

	ArgumentSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.argumentSeparatorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new ArgumentStatement(statements);
		}
	});

	return ArgumentSeparatorTag;
}(
	this.CommaTag,
	this.ArgumentStatement
);

this.CloseArgumentsTag = function(CloseParenTag){
	/**
	 * 结束函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArgumentsTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseArgumentsTag = new Rexjs(CloseArgumentsTag, CloseParenTag);

	CloseArgumentsTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionBodyTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置参数表达式的 close 属性
			statement.expression.arguments.close = context;
		}
	});

	return CloseArgumentsTag;
}(
	this.CloseParenTag
);

argumentSeparatorTag = new this.ArgumentSeparatorTag();
closeArgumentsTag = new this.CloseArgumentsTag();

}.call(
	this,
	// argumentSeparatorTag
	null,
	// closeArgumentsTag
	null
);


// 默认函数参数相关
void function(BasicAssignmentTag){

this.DefaultArgumentExpression = function(ArgumentExpression, config){
	/**
	 * 省略参数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DefaultArgumentExpression(context){
		ArgumentExpression.call(this, context);
	};
	DefaultArgumentExpression = new Rexjs(DefaultArgumentExpression, ArgumentExpression);

	DefaultArgumentExpression.props({
		assignment: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 如果需要编译默认参数
			if(
				config.defaultArgument
			){
				var context = this.context;

				// 追加参数名至 contentBuilder
				contentBuilder.appendContext(context);

				// 追加参数名至 anotherBuilder
				anotherBuilder.appendContext(context);
				// 判断是否为 undefined
				anotherBuilder.appendString("===void 0&&(");

				// 将赋值表达式提取至临时生成器
				this.assignment.extractTo(anotherBuilder);
				// 再对临时生成器添加分号
				anotherBuilder.appendString(");");
				return;
			}

			// 直接正式提取赋值表达式
			this.assignment.extractTo(contentBuilder);
		}
	});

	return DefaultArgumentExpression;
}(
	this.ArgumentExpression,
	this.FunctionExpression.config
);

this.ArgumentAssignmentStatement = function(){
	/**
	 * 默认参数赋值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArgumentAssignmentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArgumentAssignmentStatement = new Rexjs(ArgumentAssignmentStatement, ECMAScriptStatement);

	ArgumentAssignmentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 assignment
			this.out().assignment = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(
				context.content === ","
			){
				// 跳出语句并设置 assignment
				this.out().assignment = this.expression;
			}
		}
	});

	return ArgumentAssignmentStatement;
}();

this.ArgumentAssignmentTag = function(DefaultArgumentExpression, ArgumentAssignmentStatement, visitor){
	/**
	 * 默认参数赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	ArgumentAssignmentTag = new Rexjs(ArgumentAssignmentTag, BasicAssignmentTag);

	ArgumentAssignmentTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 设置当前表达式
			statement.expression = new DefaultArgumentExpression(expression.context);

			(
				// 初始化参数赋值语句
				statements.statement = statement = new ArgumentAssignmentStatement(statements)
			)
			// 设置 expression
			.expression = expression;
			
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return ArgumentAssignmentTag;
}(
	this.DefaultArgumentExpression,
	this.ArgumentAssignmentStatement,
	BasicAssignmentTag.prototype.visitor
);

}.call(
	this,
	this.BasicAssignmentTag
);


// 函数省略参数相关
void function(){

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
			if(
				config.restArgument
			){
				// 将默认参数名追加至临时生成器
				anotherBuilder.appendContext(this.name);
				// 将赋值运算追加至临时生成器
				anotherBuilder.appendString("=[].slice.call(arguments," + this.index + ");");
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
	this.FunctionExpression.config
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
			parser.error(statement.expression.context, ECMAScriptErrors.REST);
		}
	});

	return RestArgumentSeparatorTag;
}(
	this.ArgumentSeparatorTag
);

}.call(
	this
);


// 函数主体表达式相关
void function(BlockExpression, closeFunctionBodyTag){

this.FunctionBodyExpression = function(extractTo, insertDefaults){
	/**
	 * 函数主体语句块表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function FunctionBodyExpression(open){
		BlockExpression.call(this, open);
	};
	FunctionBodyExpression = new Rexjs(FunctionBodyExpression, BlockExpression);

	FunctionBodyExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		extractTo: function(contentBuilder, defaultArgumentBuilder){
			var defaults = defaultArgumentBuilder.result;

			// 如果没有默认或省略参数
			if(
				defaults.length === 0
			){
				// 直接提取函数主体
				extractTo.call(this, contentBuilder);
				return;
			}

			// 插入默认参数
			insertDefaults(contentBuilder, this, defaults);
		},
		state: BlockExpression.STATE_NONE
	});
	
	return FunctionBodyExpression;
}(
	BlockExpression.prototype.extractTo,
	// insertDefaults
	function(contentBuilder, expression, defaults){
		var inner = expression.inner, builder = new ContentBuilder();
		
		// 追加起始大括号
		contentBuilder.appendContext(expression.open);
		// 提取第一个表达式至临时生成器
		inner[0].expression.extractTo(builder);

		// 判断临时生成器内容
		switch(
			builder.result
		){
			// 如果是 'use strict'
			case "'use strict'":
			// 如果是 "use strict"
			case '"use strict"':
				// 正式提取第一个语句
				inner[0].extractTo(contentBuilder);
				// 追加分号
				contentBuilder.appendString(";");

				// 设置 inner 的最小解析索引为 1，即不再解析第一个语句，从第二语句开始
				inner.min = 1;
				break;
		}

		// 提取默认参数
		contentBuilder.appendString(defaults);
		// 提取函数内部语句
		expression.inner.extractTo(contentBuilder);
		// 追加结束大括号
		contentBuilder.appendContext(expression.close);
	}
);

this.FunctionBodyStatements = function(BlockBodyStatements, ECMAScriptVariableCollections, VariableIndex){
	/**
	 * 函数主体语句块
	 */
	function FunctionBodyStatements(){
		BlockBodyStatements.call(
			this,
			new ECMAScriptVariableCollections(
				new VariableIndex()
			)
		);
	};
	FunctionBodyStatements = new Rexjs(FunctionBodyStatements, BlockBodyStatements);
	
	FunctionBodyStatements.props({
		closure: true
	});
	
	return FunctionBodyStatements;
}(
	this.BlockBodyStatements,
	this.ECMAScriptVariableCollections,
	Rexjs.VariableIndex
);

this.FunctionBodyOuterStatement = function(){
	/**
	 * 函数主体外部语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function FunctionBodyOuterStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	FunctionBodyOuterStatement = new Rexjs(FunctionBodyOuterStatement, ECMAScriptStatement);

	FunctionBodyOuterStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return this.try(parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = this.expression;
		}
	});

	return FunctionBodyOuterStatement;
}();

this.OpenFunctionBodyTag = function(OpenBlockTag, FunctionBodyExpression, FunctionBodyStatements, FunctionBodyOuterStatement, collectArgumentNames){
	/**
	 * 起始函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenFunctionBodyTag(_type){
		OpenBlockTag.call(this, _type);
	};
	OpenFunctionBodyTag = new Rexjs(OpenFunctionBodyTag, OpenBlockTag);

	OpenFunctionBodyTag.props({
		/**
		 * 获取绑定的函数主体结束标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeFunctionBodyTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var functionBodyStatements = new FunctionBodyStatements();
			
			// 收集参数名到声明集合下
			collectArgumentNames(
				functionBodyStatements.collections.declaration,
				statement.expression.arguments.collection
			);

			(
				// 设置当前语句
				statements.statement = new FunctionBodyOuterStatement(statements)
			)
			// 设置表达式
			.expression = new FunctionBodyExpression(context);

			// 记录当前语句块
			functionBodyStatements.target = statements;
			// 设置当前语句块
			parser.statements = functionBodyStatements;
		}
	});

	return OpenFunctionBodyTag;
}(
	this.OpenBlockTag,
	this.FunctionBodyExpression,
	this.FunctionBodyStatements,
	this.FunctionBodyOuterStatement,
	// collectArgumentNames
	function(declarationCollection, argumentNameCollection){
		for(
			var i = 0, j = argumentNameCollection.length;i < j;i++
		){
			// 将参数名收入声明集合中
			declarationCollection.collect(
				argumentNameCollection[i]
			);
		}
	}
);

this.CloseFunctionBodyTag = function(CloseBlockTag, FunctionDeclarationExpression){
	/**
	 * 结束函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseFunctionBodyTag(_type){
		CloseBlockTag.call(this, _type);
	};
	CloseFunctionBodyTag = new Rexjs(CloseFunctionBodyTag, CloseBlockTag);

	CloseFunctionBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags, parser){
			// 如果是函数声明
			if(
				parser.statements.statement.target.expression instanceof FunctionDeclarationExpression
			){
				return tagsMap.mistakableTags;
			}

			return tagsMap.expressionContextTags;
		}
	});

	return CloseFunctionBodyTag;
}(
	this.CloseBlockTag,
	this.FunctionDeclarationExpression
);

closeFunctionBodyTag = new this.CloseFunctionBodyTag();

}.call(
	this,
	this.BlockExpression,
	// closeFunctionBodyTag
	null
);


// 分组小括号标签
void function(IdentifierExpression, ArgumentExpression, DefaultArgumentExpression, RestArgumentExpression, groupingSeparatorTag, closeGroupingTag, collectTo){

this.GroupingExpression = function(){
	/**
	 * 分组小括号表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function GroupingExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
	};
	GroupingExpression = new Rexjs(GroupingExpression, PartnerExpression);

	GroupingExpression.props({
		asArguments: false,
		restIndex: -1
	});

	return GroupingExpression;
}();

this.IllegibleRestArgumentExpression = function(){
	/**
	 * 难以辨别的、可能非法的省略参数表达式
	 * @param {Context} context - 拓展符语法标签上下文
	 * @param {Number} index - 省略参数位于参数列表中的索引
	 */
	function IllegibleRestArgumentExpression(context, index){
		RestArgumentExpression.call(this, context, index);
	};
	IllegibleRestArgumentExpression = new Rexjs(IllegibleRestArgumentExpression, RestArgumentExpression);

	IllegibleRestArgumentExpression.props({
		/**
		 * 获取参数名上下文
		 */
		get name(){
			return this.operand.context;
		},
		operand: null
	});

	return IllegibleRestArgumentExpression;
}();

this.GroupingStatement = function(){
	/**
	 * 分组小括号语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function GroupingStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	GroupingStatement = new Rexjs(GroupingStatement, ECMAScriptStatement);
	
	GroupingStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭分组小括号
			if(
				context.content !== ")"
			){
				// 报错
				parser.error(context);
				return null;
			}

			var groupingExpression = this.out(), inner = groupingExpression.inner;

			// 设置表达式
			inner.set(this.expression);

			// 如果经过上面设置表达式后，长度还是 0，就说明是空的小括号，就应该是要作为箭头函数参数存在
			if(
				inner.length === 0
			){
				// 设置 asArguments，表示这个分组表达式要作为箭头函数的参数使用
				groupingExpression.asArguments = true;
			}

			// 返回关闭分组小括号标签
			return groupingExpression.open.tag.binding;
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(
				context.content !== ","
			){
				return null;
			}

			// 跳出该语句
			var groupingExpression = this.out();

			// 添加表达式
			groupingExpression.inner.add(this.expression);
			return groupingExpression.open.tag.separator;
		}
	});
	
	return GroupingStatement;
}();

this.IllegibleRestArgumentStatement = function(){
	/**
	 * 难以辨别的、可能非法的省略参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IllegibleRestArgumentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	IllegibleRestArgumentStatement = new Rexjs(IllegibleRestArgumentStatement, ECMAScriptStatement);

	IllegibleRestArgumentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出该语句并设置 operand
			this.out().operand = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(
				context.content === ","
			){
				// 跳出该语句并设置 operand
				this.out().operand = this.expression;
			}
		}
	});

	return IllegibleRestArgumentStatement;
}();

this.GroupingContextStatement = function(ArgumentsExpression, BinaryExpression, ifIdentifier, ifBinary, error){
	/**
	 * 分组小括号上下文语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function GroupingContextStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	GroupingContextStatement = new Rexjs(GroupingContextStatement, ECMAScriptStatement);

	GroupingContextStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return this.try(parser, context);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.out();

			// 如果不是箭头符号
			if(
				context.content !== "=>"
			){
				// 如果要作为参数，即 有省略参数符号 或 空的小括号
				if(
					expression.asArguments
				){
					// 报错
					error(parser, expression);
				}

				return;
			}

			var inner = expression.inner, argumentsExpression = new ArgumentsExpression(expression.open);

			// 遍历项
			for(
				var i = 0, j = inner.length;i < j;i++
			){
				var exp = inner[i];

				switch(
					true
				){
					// 如果是标识符表达式
					case exp instanceof IdentifierExpression:
						i = ifIdentifier(parser, exp, argumentsExpression, i, j);
						break;

					// 如果是二元表达式
					case exp instanceof BinaryExpression:
						i = ifBinary(parser, exp, argumentsExpression, i, j);
						break;

					default:
						// 报错
						parser.error(exp.context);
						return;
				}
			}

			// 设置参数表达式的 close
			argumentsExpression.close = expression.close;
			// 将分组小括号表达式转化成参数列表表达式，并替换分组小括号表达式
			this.target.expression = argumentsExpression;
		}
	});

	return GroupingContextStatement;
}(
	this.ArgumentsExpression,
	this.BinaryExpression,
	// ifIdentifier
	function(parser, expression, argumentsExpression, i, j){
		var context;

		// 如果是省略参数表达式
		if(
			expression instanceof RestArgumentExpression
		){
			var operand = expression.operand;

			// 如果省略符的操作对象是标识符表达式
			if(
				operand instanceof IdentifierExpression
			){
				// 如果省略参数不是最后一项
				if(
					i !== j - 1
				){
					// 报错
					parser.error(expression.context, ECMAScriptErrors.REST);
					return j;
				}
			}
			else {
				// 报错
				parser.error(expression.operand.context);
				return j;
			}

			context = operand.context;
		}
		// 如果不是省略参数表达式，那么就是普通形式的参数
		else {
			context = expression.context;
			expression = new ArgumentExpression(context);
		}

		// 收集参数名
		collectTo.call(context.tag, parser, context, argumentsExpression.collection);
		// 添加参数表达式
		argumentsExpression.inner.add(expression);
		return i;
	},
	// ifBinary
	function(parser, expression, argumentsExpression, i, j){
		var leftHandSideExpression = expression[0], left = leftHandSideExpression.left, context = left.context;

		switch(
			false
		){
			// 如果左侧表达式不是标识符表达式
			case left instanceof IdentifierExpression:
				// 报错
				parser.error(left);
				return j;

			// 如果不是等于号
			case leftHandSideExpression.context.content === "=":
				// 报错
				parser.error(leftHandSideExpression.context);
				return j;

			// 默认，即默认值参数表达式
			default:
				var defaultArgumentExpression = new DefaultArgumentExpression(context);

				// 设置默认参数表达式的 assignment 属性
				defaultArgumentExpression.assignment = expression;
	
				// 收集参数名
				collectTo.call(context.tag, parser, context, argumentsExpression.collection);
				// 添加默认参数表达式
				argumentsExpression.inner.add(defaultArgumentExpression);
				return i;
		}
	},
	// error
	function(parser, expression){
		var restIndex = expression.restIndex;

		parser.error(restIndex > -1 ? expression.inner[restIndex].context : expression.close);
	}
);

this.OpenGroupingTag = function(OpenParenTag, GroupingExpression, GroupingStatement){
	/**
	 * 起始分组小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenGroupingTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenGroupingTag = new Rexjs(OpenGroupingTag, OpenParenTag);
	
	OpenGroupingTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeGroupingTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return groupingSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openGroupingContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new GroupingExpression(context);
			// 设置当前语句
			statements.statement = new GroupingStatement(statements);
		}
	});
	
	return OpenGroupingTag;
}(
	this.OpenParenTag,
	this.GroupingExpression,
	this.GroupingStatement
);

this.IllegibleRestTag = function(RestTag, IllegibleRestArgumentExpression, IllegibleRestArgumentStatement){
	/**
	 * 难以辨别的、可能非法的省略参数标签
	 * @param {Number} _type - 标签类型
	 */
	function IllegibleRestTag(_type){
		RestTag.call(this, _type);
	};
	IllegibleRestTag = new Rexjs(IllegibleRestTag, RestTag);

	IllegibleRestTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var groupingExpression = statement.target.expression;

			statement.expression = new IllegibleRestArgumentExpression(
				context,
				groupingExpression.inner.length
			);

			statements.statement = new IllegibleRestArgumentStatement(statements);

			if(
				groupingExpression.asArguments
			){
				return;
			}
			
			groupingExpression.asArguments = true;
			groupingExpression.restIndex = groupingExpression.inner.length;
		}
	});

	return IllegibleRestTag;
}(
	this.RestTag,
	this.IllegibleRestArgumentExpression,
	this.IllegibleRestArgumentStatement
);

this.GroupingSeparatorTag = function(CommaTag, GroupingStatement){
	/**
	 * 分组小括号分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function GroupingSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	GroupingSeparatorTag = new Rexjs(GroupingSeparatorTag, CommaTag);

	GroupingSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openGroupingContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new GroupingStatement(statements);
		}
	});

	return GroupingSeparatorTag;
}(
	this.CommaTag,
	this.GroupingStatement
);

this.CloseGroupingTag = function(CloseParenTag, GroupingContextStatement){
	/**
	 * 结束分组小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseGroupingTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseGroupingTag = new Rexjs(CloseGroupingTag, CloseParenTag);
	
	CloseGroupingTag.props({
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
			// 设置表达式的 close
			statement.expression.close = context;
			// 设置当前语句
			statements.statement = new GroupingContextStatement(statements);
		}
	});
	
	return CloseGroupingTag;
}(
	this.CloseParenTag,
	this.GroupingContextStatement
);

groupingSeparatorTag = new this.GroupingSeparatorTag();
closeGroupingTag = new this.CloseGroupingTag();

}.call(
	this,
	this.IdentifierExpression,
	this.ArgumentExpression,
	this.DefaultArgumentExpression,
	this.RestArgumentExpression,
	// groupingSeparatorTag
	null,
	// closeGroupingTag
	null,
	this.ArgumentNameTag.prototype.collectTo
);


// 箭头函数相关
void function(FunctionExpression, ArgumentsExpression, OpenFunctionBodyTag, CloseFunctionBodyTag, config, closeArrowFunctionBodyTag){

this.ArrowFunctionExpression = function(){
	/**
	 * 箭头函数表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} args - 函数参数列表表达式
	 */
	function ArrowFunctionExpression(context, args){
		FunctionExpression.call(this, context);

		this.arguments = args;
	};
	ArrowFunctionExpression = new Rexjs(ArrowFunctionExpression, FunctionExpression);

	ArrowFunctionExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var defaultArgumentBuilder = new ContentBuilder();

			// 如果需要编译箭头函数
			if(
				config.arrowFunction
			){
				// 追加参数起始小括号
				contentBuilder.appendString("(function");
				// 提取并编译函数参数
				this.arguments.compileTo(contentBuilder, defaultArgumentBuilder);
				// 提取并编译函数主体
				this.body.compileTo(contentBuilder, defaultArgumentBuilder);
				// 追加 参数结束小括号 并使用 bind 方法绑定 this
				contentBuilder.appendString(".bind(this))");
				return;
			}
			
			// 提取参数
			this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);
			// 追加箭头符号
			contentBuilder.appendContext(this.context);
			// 提取函数主体
			this.body.extractTo(contentBuilder, defaultArgumentBuilder);
		}
	});

	return ArrowFunctionExpression;
}();

this.SingleArgumentExpression = function(ArgumentsExpression, ArgumentExpression){
	/**
	 * 单参数表达式
	 * @param {Context} argumentContext - 参数上下文
	 */
	function SingleArgumentExpression(argumentContext){
		ArgumentsExpression.call(this, null);

		// 添加参数表达式
		this.inner.add(
			new ArgumentExpression(argumentContext)
		);

		// 收集参数名
		this.collection.collect(argumentContext.content);
	};
	SingleArgumentExpression = new Rexjs(SingleArgumentExpression, ArgumentsExpression);

	SingleArgumentExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加参数起始小括号
			contentBuilder.appendString("(");
			// 提取参数名
			this.inner.extractTo(contentBuilder);
			// 追加参数结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取参数名
			this.inner.extractTo(contentBuilder);
		}
	});

	return SingleArgumentExpression;
}(
	this.ArgumentsExpression,
	this.ArgumentExpression
);

this.ArrowFunctionBodyExpression = function(FunctionBodyExpression){
	/**
	 * 箭头函数主体表达式
	 * @param {Expression} inner - 函数主体返回值表达式
	 */
	function ArrowFunctionBodyExpression(inner){
		FunctionBodyExpression.call(this, null);

		this.inner = inner;
	};
	ArrowFunctionBodyExpression = new Rexjs(ArrowFunctionBodyExpression, FunctionBodyExpression);

	ArrowFunctionBodyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		compileTo: function(contentBuilder, defaultArgumentBuilder){
			var defaults = defaultArgumentBuilder.result;

			// 追加函数主体起始大括号
			contentBuilder.appendString("{");

			// 如果没有默认或省略参数
			if(
				defaults.length > 0
			){
				// 插入默认参数
				contentBuilder.appendString(defaults);
			}

			// 追加 return 关键字
			contentBuilder.appendString("return ");
			// 提取函数主体返回值表达式
			this.inner.extractTo(contentBuilder);
			// 追加 表达式结束分号 与 函数主体结束大括号
			contentBuilder.appendString(";}");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		extractTo: function(contentBuilder, defaultArgumentBuilder){
			// 如果有默认参数
			if(
				defaultArgumentBuilder.result.length > 0
			){
				// 进行编译
				this.compileTo(contentBuilder, defaultArgumentBuilder);
				return;
			}

			// 直接提取函数主体返回值表达式
			this.inner.extractTo(contentBuilder);
		}
	});

	return ArrowFunctionBodyExpression;
}(
	this.FunctionBodyExpression
);

this.ArrowContextStatement = function(ArrowFunctionBodyExpression){
	/**
	 * 箭头符号上下文语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArrowContextStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArrowContextStatement = new Rexjs(ArrowContextStatement, ECMAScriptStatement);

	ArrowContextStatement.props({
		expression: new DefaultExpression(),
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = new ArrowFunctionBodyExpression(this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(
				context.content == ","
			){
				// 跳出语句并设置 body
				this.out().body = new ArrowFunctionBodyExpression(this.expression);
			}
		}
	});

	return ArrowContextStatement;
}(
	this.ArrowFunctionBodyExpression
);

this.ArrowTag = function(ExpressionSeparatorTag, ArrowFunctionExpression, SingleArgumentExpression, IdentifierExpression, ArgumentsExpression, ArrowContextStatement){
	/**
	 * 箭头标签
	 * @param {Number} _type - 标签类型
	 */
	function ArrowTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	ArrowTag = new Rexjs(ArrowTag, ExpressionSeparatorTag);

	ArrowTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		// 防止与“=”冲突
		order: 301,
		regexp: /=>/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.arrowContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			switch(
				true
			){
				// 如果是标识符表达式
				case expression instanceof IdentifierExpression:
					// 设置当前表达式
					statement.expression = new ArrowFunctionExpression(
						context,
						new SingleArgumentExpression(expression.context)
					);
					break;

				// 如果是参数列表表达式
				case expression instanceof ArgumentsExpression:
					// 设置当前表达式
					statement.expression = new ArrowFunctionExpression(context, expression);
					break;

				default:
					// 报错
					parser.error(expression);
					return;
			}

			// 如果箭头符号换行了
			if(
				(expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE
			){
				// 报错
				parser.error(context, ECMAScriptErrors.NEWLINE_BEFORE_ARROW);
				return;
			}

			// 设置当前语句
			statements.statement = new ArrowContextStatement(statements);
		}
	});

	return ArrowTag;
}(
	this.ExpressionSeparatorTag,
	this.ArrowFunctionExpression,
	this.SingleArgumentExpression,
	this.IdentifierExpression,
	this.ArgumentsExpression,
	this.ArrowContextStatement
);

this.OpenArrowFunctionBodyTag = function(visitor){
	/**
	 * 起始箭头函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArrowFunctionBodyTag(_type){
		OpenFunctionBodyTag.call(this, _type);
	};
	OpenArrowFunctionBodyTag = new Rexjs(OpenArrowFunctionBodyTag, OpenFunctionBodyTag);

	OpenArrowFunctionBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArrowFunctionBodyTag;
		},
		order: 100,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 跳出当前语句
			statement.out();
			// 调用父类方法
			visitor.call(this, parser, context, statements.statement, statements);
		}
	});

	return OpenArrowFunctionBodyTag;
}(
	OpenFunctionBodyTag.prototype.visitor
);

this.CloseArrowFunctionBodyTag = function(visitor){
	/**
	 * 结束箭头函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArrowFunctionBodyTag(_type){
		CloseFunctionBodyTag.call(this, _type);
	};
	CloseArrowFunctionBodyTag = new Rexjs(CloseArrowFunctionBodyTag, CloseFunctionBodyTag);

	CloseArrowFunctionBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closeArrowFunctionBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式状态
			statement.expression.state = STATE_STATEMENT_ENDED;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return CloseArrowFunctionBodyTag;
}(
	CloseFunctionBodyTag.prototype.visitor
);

closeArrowFunctionBodyTag = new this.CloseArrowFunctionBodyTag();

}.call(
	this,
	this.FunctionExpression,
	this.ArgumentsExpression,
	this.OpenFunctionBodyTag,
	this.CloseFunctionBodyTag,
	this.FunctionExpression.config,
	// closeArrowFunctionBodyTag
	null
);


// 对象相关
void function(IdentifierTag, objectItemSeparatorTag, closeObjectTag){

this.ShorthandPropertyValueExpression = function(){
	/**
	 * 简写属性值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ShorthandPropertyValueExpression(context){
		EmptyExpression.call(this, context);
	};
	ShorthandPropertyValueExpression = new Rexjs(ShorthandPropertyValueExpression, EmptyExpression);

	ShorthandPropertyValueExpression.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			contentBuilder.appendString(this.context.content);
		}
	});

	return ShorthandPropertyValueExpression;
}();

this.ObjectExpression = function(config, extractTo, compileInner){
	/**
	 * 对象表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ObjectExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
	};
	ObjectExpression = new Rexjs(ObjectExpression, PartnerExpression);

	ObjectExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

	ObjectExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(
				this.needCompile
			){
				// 追加函数闭包头部
				contentBuilder.appendString("(function(object, defineProperty){");
				// 编译内容
				compileInner(this.inner, contentBuilder);
				// 追加函数闭包尾部
				contentBuilder.appendString("return object;}({}, Object.defineProperty))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		needCompile: false
	});

	return ObjectExpression;
}(
	// config
	new SyntaxConfig("shorthandProperty", "computedName"),
	PartnerExpression.prototype.extractTo,
	// compileInner
	function(inner, contentBuilder){
		// 遍历 inner
		for(
			var i = inner.min, j = inner.length;i < j;i++
		){
			// 编译项
			inner[i].compileTo(contentBuilder);
		}
	}
);

this.ObjectItemExpression = function(ShorthandPropertyValueExpression, config){
	/**
	 * 对象项表达式
	 */
	function ObjectItemExpression(){
		Expression.call(this, null);
	};
	ObjectItemExpression = new Rexjs(ObjectItemExpression, Expression);

	ObjectItemExpression.props({
		/**
		 * 获取该属性项是否是一个访问器
		 */
		get accessible(){
			switch(
				this.accessor
			){
				// 如果访问器不存在
				case null:
					break;

				// 如果访问器仅仅是属性名
				case this.name.context:
					break;

				default:
					return true;
			}

			return false;
		},
		accessor: null,
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 如果是访问器
			if(
				this.accessible
			){
				// 追加 defineProperty 的调用
				contentBuilder.appendString("defineProperty(object,");
				// 提取属性名
				this.name.defineTo(contentBuilder);
				// 追加属性描述符
				contentBuilder.appendString(",{configurable:true,enumerable:true,");
				// 追加访问器内容
				contentBuilder.appendString(this.accessor.content);
				// 追加冒号
				contentBuilder.appendString(":");
				// 提取属性值
				this.value.extractTo(contentBuilder);
				// 追加结束调用
				contentBuilder.appendString("});");
				return;
			}

			// 追加 object
			contentBuilder.appendString("object");

			// 编译属性名
			this.name.compileTo(contentBuilder);
			// 追加赋值符号
			contentBuilder.appendString("=");
			// 提取属性值
			this.value.extractTo(contentBuilder);
			// 追加分号
			contentBuilder.appendString(";");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var value = this.value;

			// 如果是访问器
			if(
				this.accessible
			){
				// 将函数的头部内容清空，即不需要 function 关键字
				value.head.string = "";

				// 追加访问器
				contentBuilder.appendContext(this.accessor);
				// 追加空格
				contentBuilder.appendSpace();

				// 提取对象名称
				this.name.extractTo(contentBuilder);
				// 提取对象值
				value.extractTo(contentBuilder);
				return;
			}

			// 提取对象名称
			this.name.extractTo(contentBuilder);

			switch(
				false
			){
				// 如果不是简写属性值表达式
				case value instanceof ShorthandPropertyValueExpression:
					break;

				// 如果是简写且不需要解析简写属性名
				case config.shorthandProperty:
					return;
			}

			// 追加冒号分隔符
			contentBuilder.appendString(":");
			// 提取对象值
			value.extractTo(contentBuilder);
		},
		name: null,
		value: null
	});

	return ObjectItemExpression;
}(
	this.ShorthandPropertyValueExpression,
	// config
	this.ObjectExpression.config
);

this.ObjectStatement = function(ObjectItemExpression, ifColon, ifComma){
	/**
	 * 对象语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ObjectStatement(statements){
		ECMAScriptStatement.call(this, statements);

		this.expression = new ObjectItemExpression();
	};
	ObjectStatement = new Rexjs(ObjectStatement, ECMAScriptStatement);

	ObjectStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(
				context.content !== "}"
			){
				// 报错
				parser.error(context);
				return null;
			}

			var expression = this.expression, objectExpression = this.out();

			switch(
				true
			){
				// 如果表达式名称不存在，说明是空项
				case expression.name === null:
					break;

				// 如果可能是访问器
				case expression.accessible:
					// 核对访问器函数
					expression.accessor.tag.checkFunction(parser, expression.value, context);

				default:
					// 跳出语句并添加表达式
					objectExpression.inner.add(expression);
					break;
			}

			return objectExpression.open.tag.binding;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			switch(
				context.content
			){
				// 如果是冒号
				case ":":
					return ifColon(parser, this.expression, context);

				// 如果是逗号
				case ",":
					return ifComma(parser, this, this.expression, context);
			}

			// 报错
			parser.error(context);
			return null;
		}
	});

	return ObjectStatement;
}(
	this.ObjectItemExpression,
	// ifColon
	function(parser, expression, context){
		var accessor = expression.accessor;

		switch(
			true
		){
			// 如果不是访问器
			case accessor === null:
				break;
			
			// 访问器存在，而且访问器不是属性名，而且还有冒号，即类似 !{ get a: 1 }
			case accessor !== expression.name.context:
				// 报错
				parser.error(context);
				break;
		}

		return null;
	},
	// ifComma
	function(parser, statement, expression, context){
		var objectExpression, accessor = expression.accessor;

		// 如果访问器存在
		if(
			accessor
		){
			// 如果访问器不是属性名
			if(
				expression.accessor !== expression.name.context
			){
				// 核对访问器函数
				expression.accessor.tag.checkFunction(parser, expression.value, context);
			}
		}

		// 跳出语句
		objectExpression = statement.out();

		// 添加表达式
		objectExpression.inner.add(expression);
		return objectExpression.open.tag.separator;
	}
);

this.ObjectValueStatement = function(){
	/**
	 * 对象值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ObjectValueStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ObjectValueStatement = new Rexjs(ObjectValueStatement, ECMAScriptStatement);

	ObjectValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 value
			this.out().value = this.expression;
		},
		try: function(parser, context){
			// 如果是逗号
			if(
				context.content === ","
			){
				// 跳出语句并设置 value
				this.out().value = this.expression;
			}
		}
	});

	return ObjectValueStatement;
}();

this.OpenObjectTag = function(OpenBraceTag, ObjectExpression, ObjectStatement){
	/**
	 * 起始对象标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenObjectTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenObjectTag = new Rexjs(OpenObjectTag, OpenBraceTag);

	OpenObjectTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeObjectTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return objectItemSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.objectNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ObjectExpression(context);
			// 设置当前语句
			statements.statement = new ObjectStatement(statements);
		}
	});

	return OpenObjectTag;
}(
	this.OpenBraceTag,
	this.ObjectExpression,
	this.ObjectStatement
);

this.ObjectNameSeparatorTag = function(ColonTag, ObjectValueStatement){
	/**
	 * 对象名称的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ObjectNameSeparatorTag(_type){
		ColonTag.call(this, _type);
	};
	ObjectNameSeparatorTag = new Rexjs(ObjectNameSeparatorTag, ColonTag);

	ObjectNameSeparatorTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statements.statement = new ObjectValueStatement(statements);
		}
	});

	return ObjectNameSeparatorTag;
}(
	this.ColonTag,
	this.ObjectValueStatement
);

this.ObjectItemSeparatorTag = function(CommaTag, ObjectStatement){
	/**
	 * 对象项的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ObjectItemSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ObjectItemSeparatorTag = new Rexjs(ObjectItemSeparatorTag, CommaTag);

	ObjectItemSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.objectNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new ObjectStatement(statements);
		}
	});

	return ObjectItemSeparatorTag;
}(
	this.CommaTag,
	this.ObjectStatement
);

this.CloseObjectTag = function(CloseBraceTag){
	/**
	 * 结束对象标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseObjectTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseObjectTag = new Rexjs(CloseObjectTag, CloseBraceTag);

	CloseObjectTag.props({
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
			statement.expression.close = context;
		}
	});

	return CloseObjectTag;
}(
	this.CloseBraceTag
);

objectItemSeparatorTag = new this.ObjectItemSeparatorTag();
closeObjectTag = new this.CloseObjectTag();

}.call(
	this,
	// objectItemSeparatorTag
	null,
	// closeObjectTag
	null
);


// 对象基础属性名相关
void function(IdentifierTag){

this.ObjectLiteralNameExpression = function(){
	/**
	 * 对象字面量属性名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ObjectLiteralNameExpression(context){
		Expression.call(this, context);
	};
	ObjectLiteralNameExpression = new Rexjs(ObjectLiteralNameExpression, Expression);

	ObjectLiteralNameExpression.props({
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

	return ObjectLiteralNameExpression;
}();

this.ObjectIdentifierNameExpression = function(ObjectLiteralNameExpression){
	/**
	 * 对象标识符属性名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ObjectIdentifierNameExpression(context){
		ObjectLiteralNameExpression.call(this, context);
	};
	ObjectIdentifierNameExpression = new Rexjs(ObjectIdentifierNameExpression, ObjectLiteralNameExpression);

	ObjectIdentifierNameExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加起始双引号
			contentBuilder.appendString('"');
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
			// 追加结束双引号
			contentBuilder.appendString('"');
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加点访问器
			contentBuilder.appendString(".");
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
		}
	});

	return ObjectIdentifierNameExpression;
}(
	this.ObjectLiteralNameExpression
);

this.ObjectIdentifierNameTag = function(ObjectIdentifierNameExpression, ShorthandPropertyValueExpression){
	/**
	 * 对象标识符属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ObjectIdentifierNameTag(_type){
		IdentifierTag.call(this, _type);
	};
	ObjectIdentifierNameTag = new Rexjs(ObjectIdentifierNameTag, IdentifierTag);

	ObjectIdentifierNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.objectIdentifierNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 设置表达式的 name 属性
			expression.name = new ObjectIdentifierNameExpression(context);
			// 设置表达式的 value 属性
			expression.value = new ShorthandPropertyValueExpression(context);
		}
	});

	return ObjectIdentifierNameTag;
}(
	this.ObjectIdentifierNameExpression,
	this.ShorthandPropertyValueExpression
);

this.ObjectPropertyNameTag = function(ObjectIdentifierNameTag, ObjectIdentifierNameExpression){
	/**
	 * 对象属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ObjectPropertyNameTag(_type){
		ObjectIdentifierNameTag.call(this, _type);
	};
	ObjectPropertyNameTag = new Rexjs(ObjectPropertyNameTag, ObjectIdentifierNameTag);

	ObjectPropertyNameTag.props({
		regexp: new RegExp(IdentifierTag.keywords),
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.objectNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 name 属性
			statement.expression.name = new ObjectIdentifierNameExpression(context); 
		}
	});

	return ObjectPropertyNameTag;
}(
	this.ObjectIdentifierNameTag,
	this.ObjectIdentifierNameExpression
);

this.ObjectStringNameTag = function(StringTag, ObjectLiteralNameExpression){
	/**
	 * 对象字符串属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ObjectStringNameTag(_type){
		StringTag.call(this, _type);
	};
	ObjectStringNameTag = new Rexjs(ObjectStringNameTag, StringTag);

	ObjectStringNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.objectNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 name 属性
			statement.expression.name = new ObjectLiteralNameExpression(context); 
		}
	});

	return ObjectStringNameTag;
}(
	this.StringTag,
	this.ObjectLiteralNameExpression
);

this.ObjectNumberNameTag = function(NumberTag, ObjectLiteralNameExpression){
	/**
	 * 对象数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ObjectNumberNameTag(_type){
		NumberTag.call(this, _type);
	};
	ObjectNumberNameTag = new Rexjs(ObjectNumberNameTag, NumberTag);

	ObjectNumberNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.objectNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 name 属性
			statement.expression.name = new ObjectLiteralNameExpression(context); 
		}
	});

	return ObjectNumberNameTag;
}(
	this.NumberTag,
	this.ObjectLiteralNameExpression
);

}.call(
	this,
	this.IdentifierTag
);


// 对象计算式属性相关
void function(closeObjectComputedNameTag){

this.ObjectComputedNameExpression = function(){
	/**
	 * 匹配组表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ObjectComputedNameExpression(open){
		PartnerExpression.call(this, open);
	};
	ObjectComputedNameExpression = new Rexjs(ObjectComputedNameExpression, PartnerExpression);

	ObjectComputedNameExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			this.inner.extractTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			this.extractTo(contentBuilder);
		}
	});

	return ObjectComputedNameExpression;
}();

this.ObjectComputedNameStatement = function(){
	/**
	 * 对象计算式语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ObjectComputedNameStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ObjectComputedNameStatement = new Rexjs(ObjectComputedNameStatement, ECMAScriptStatement);

	ObjectComputedNameStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束中括号
			if(
				context.content !== "]"
			){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并获取计算式表达式
			var objectComputedNameExpression = this.out().name;

			// 跳出语句并设置 inner
			objectComputedNameExpression.inner = this.expression;
			return objectComputedNameExpression.open.tag.binding;
		}
	})

	return ObjectComputedNameStatement;
}();

this.OpenObjectComputedNameTag = function(OpenBracketTag, ObjectComputedNameExpression, ObjectComputedNameStatement){
	/**
	 * 起始对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenObjectComputedNameTag(_type){
		OpenBracketTag.call(this, _type);
	};
	OpenObjectComputedNameTag = new Rexjs(OpenObjectComputedNameTag, OpenBracketTag);

	OpenObjectComputedNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeObjectComputedNameTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 name 属性
			statement.expression.name = new ObjectComputedNameExpression(context);

			// 设置对象表达式的 needCompile 属性
			statement.target.expression.needCompile = true;
			// 设置当前属性
			statements.statement = new ObjectComputedNameStatement(statements);
		}
	});

	return OpenObjectComputedNameTag;
}(
	this.OpenBracketTag,
	this.ObjectComputedNameExpression,
	this.ObjectComputedNameStatement
);

this.CloseObjectComputedNameTag = function(CloseBracketTag){
	/**
	 * 结束对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseObjectComputedNameTag(_type){
		CloseBracketTag.call(this, _type);
	};
	CloseObjectComputedNameTag = new Rexjs(CloseObjectComputedNameTag, CloseBracketTag);

	CloseObjectComputedNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.objectNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.name.close = context;
		}
	});

	return CloseObjectComputedNameTag;
}(
	this.CloseBracketTag
);

closeObjectComputedNameTag = new this.CloseObjectComputedNameTag();

}.call(
	this,
	// closeObjectComputedNameTag
	null
);


// 对象简写方法相关
void function(OpenArgumentsTag, ObjectItemSeparatorTag){

this.ShorthandMethodHeadExpression = function(){
	/**
	 * 简写方法头部表达式
	 */
	function ShorthandMethodHeadExpression(){
		Expression.call(this, null);
	};
	ShorthandMethodHeadExpression = new Rexjs(ShorthandMethodHeadExpression, Expression);

	ShorthandMethodHeadExpression.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			contentBuilder.appendString(this.string);
		},
		string: "function"
	});

	return ShorthandMethodHeadExpression;
}();

this.ObjectShorthandMethodStatement = function(ShorthandMethodHeadExpression, FunctionExpression){
	/**
	 * 对象简写方法语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ObjectShorthandMethodStatement(statements){
		ECMAScriptStatement.call(this, statements);

		(
			// 初始化函数表达式
			this.expression = new FunctionExpression()
		)
		// 设置函数表达式头部
		.head = new ShorthandMethodHeadExpression();
	};
	ObjectShorthandMethodStatement = new Rexjs(ObjectShorthandMethodStatement, ECMAScriptStatement);

	ObjectShorthandMethodStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return this.try(parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			this.out().value = this.expression;
		}
	});

	return ObjectShorthandMethodStatement;
}(
	this.ShorthandMethodHeadExpression,
	this.FunctionExpression
);

this.OpenShorthandMethodTag = function(ObjectShorthandMethodStatement, visitor){
	/**
	 * 对象起始简写方法标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenShorthandMethodTag(_type){
		OpenArgumentsTag.call(this, _type);
	};
	OpenShorthandMethodTag = new Rexjs(OpenShorthandMethodTag, OpenArgumentsTag);

	OpenShorthandMethodTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(
				this,
				parser,
				context,
				statements.statement = new ObjectShorthandMethodStatement(statements),
				statements
			);
		}
	});

	return OpenShorthandMethodTag;
}(
	
	this.ObjectShorthandMethodStatement,
	OpenArgumentsTag.prototype.visitor
);

this.ShorthandItemSeparatorTag = function(visitor){
	/**
	 * 对象简写项的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ShorthandItemSeparatorTag(_type){
		ObjectItemSeparatorTag.call(this, _type)
	};
	ShorthandItemSeparatorTag = new Rexjs(ShorthandItemSeparatorTag, ObjectItemSeparatorTag);

	ShorthandItemSeparatorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 跳出语句并添加表达式
			statement.out().inner.add(statement.expression);
			// 调用父类方法
			visitor.call(this, parser, context, statements.statement, statements);
		}
	});

	return ShorthandItemSeparatorTag;
}(
	ObjectItemSeparatorTag.prototype.visitor
);

}.call(
	this,
	this.OpenArgumentsTag,
	this.ObjectItemSeparatorTag
);


// 对象属性访问器相关
void function(ObjectNameSeparatorTag){

this.PropertyAccessorTag = function(ObjectIdentifierNameTag, FunctionExpression, AccessorStatement, visitor){
	/**
	 * 对象属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyAccessorTag(_type){
		ObjectIdentifierNameTag.call(this, _type);
	};
	PropertyAccessorTag = new Rexjs(PropertyAccessorTag, ObjectIdentifierNameTag);

	PropertyAccessorTag.props({
		/**
		 * 核对表达式是否为满足条件的函数表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 需要核对的表达式
		 * @param {Context} context- 当前解析内容的上下文
		 */
		checkFunction: function(parser, expression, context){
			// 如果是函数表达式
			if(
				expression instanceof FunctionExpression
			){
				var length = expression.arguments.inner.length;
				
				switch(
					true
				){
					// 如果长度小于最小参数长度
					case length < this.minArgs:
						// 报错
						parser.error(
							(
								expression.arguments.inner[this.minArgs] || expression.arguments
							)
							.context,
							ECMAScriptErrors[this.errorType]
						);
						break;

					// 如果长度大于最大参数长度
					case length > this.maxArgs:
						// 报错
						parser.error(
							(
								expression.arguments.inner[this.maxArgs] || expression.arguments
							)
							.context,
							ECMAScriptErrors[this.errorType]
						);
						break;

					default:
						return true;
				}
			}
			else {
				// 报错
				parser.error(context);
			}
			
			return false;
		},
		errorType: "",
		maxArgs: 0,
		minArgs: 0,
		order: 201,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.accessorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 设置表达式的 accessor 属性，记录 context
			expression.accessor = context;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return PropertyAccessorTag;
}(
	this.ObjectIdentifierNameTag,
	this.FunctionExpression,
	this.AccessorStatement,
	this.ObjectIdentifierNameTag.prototype.visitor
);

this.GetTag = function(PropertyAccessorTag){
	/**
	 * 对象属性访问器 get 标签
	 * @param {Number} _type - 标签类型
	 */
	function GetTag(_type){
		PropertyAccessorTag.call(this, _type);
	};
	GetTag = new Rexjs(GetTag, PropertyAccessorTag);

	GetTag.props({
		errorType: "GETTER",
		regexp: /get/
	});

	return GetTag;
}(
	this.PropertyAccessorTag
);

this.SetTag = function(PropertyAccessorTag){
	/**
	 * 对象属性访问器 set 标签
	 * @param {Number} _type - 标签类型
	 */
	function SetTag(_type){
		PropertyAccessorTag.call(this, _type);
	};
	SetTag = new Rexjs(SetTag, PropertyAccessorTag);

	SetTag.props({
		errorType: "SETTER",
		maxArgs: 1,
		minArgs: 1,
		regexp: /set/,
	});

	return SetTag;
}(
	this.PropertyAccessorTag
);

}.call(
	this,
	this.ObjectNameSeparatorTag
);


// 标记标签相关
void function(){

this.LabelledExpression = function(){
	/**
	 * 标记表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LabelledExpression(context){
		Expression.call(this, context);
	};
	LabelledExpression = new Rexjs(LabelledExpression, Expression);

	LabelledExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加标签名
			contentBuilder.appendContext(this.context);
			// 追加冒号
			contentBuilder.appendString(":");
			// 提取语句表达式内容
			this.statementExpression.extractTo(contentBuilder);
		},
		statementExpression: null
	});
	
	return LabelledExpression;
}();

this.LabelledStatement = function(){
	/**
	 * 标记语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function LabelledStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	LabelledStatement = new Rexjs(LabelledStatement, ECMAScriptStatement);
	
	LabelledStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 statementExpression
			this.out().statementExpression = this.expression
		}
	});
	
	return LabelledStatement;
}();

this.LabelTag = function(VariableTag){
	/**
	 * 标记标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelTag(_type){
		VariableTag.call(this, _type);
	};
	LabelTag = new Rexjs(LabelTag, VariableTag);
	
	LabelTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.labelContextTags;
		}
	});
	
	return LabelTag;
}(
	this.VariableTag
);

this.LabelColonTag = function(ColonTag, LabelledExpression, LabelledStatement){
	/**
	 * 标记冒号标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelColonTag(_type){
		ColonTag.call(this, _type);
	};
	LabelColonTag = new Rexjs(LabelColonTag, ColonTag);
	
	LabelColonTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new LabelledExpression(statement.expression.context);
			// 设置当前语句
			statements.statement = new LabelledStatement(statements);
		}
	});
	
	return LabelColonTag;
}(
	this.ColonTag,
	this.LabelledExpression,
	this.LabelledStatement
);

}.call(
	this
);


// 中断流相关
void function(){

this.TerminatedFlowExpression = function(){
	/**
	 * 中断流表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function TerminatedFlowExpression(context){
		Expression.call(this, context);
	};
	TerminatedFlowExpression = new Rexjs(TerminatedFlowExpression, Expression);
	
	TerminatedFlowExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var object = this.object;

			// 追加关键字
			contentBuilder.appendContext(this.context);

			// 如果是空表达式
			if(
				object instanceof EmptyExpression
			){
				return;
			}

			// 追加空格
			contentBuilder.appendSpace();
			// 提取对象
			object.extractTo(contentBuilder);
		},
		object: null
	});
	
	return TerminatedFlowExpression;
}();

this.TerminatedFlowStatement = function(){
	/**
	 * 中断流语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TerminatedFlowStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	TerminatedFlowStatement = new Rexjs(TerminatedFlowStatement, ECMAScriptStatement);

	TerminatedFlowStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 object
			this.out().object = this.expression;
		}
	});
	
	return TerminatedFlowStatement;
}();

this.TerminatedFlowTag = function(TerminatedFlowExpression, TerminatedFlowStatement){
	/**
	 * 中断流标签
	 * @param {Number} _type - 标签类型
	 */
	function TerminatedFlowTag(_type){
		SyntaxTag.call(this, _type);
	};
	TerminatedFlowTag = new Rexjs(TerminatedFlowTag, SyntaxTag);
	
	TerminatedFlowTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		flow: ECMAScriptStatement.FLOW_MAIN,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new TerminatedFlowExpression(context);
			// 设置当前语句
			statements.statement = new TerminatedFlowStatement(statements);
		}
	});
	
	return TerminatedFlowTag;
}(
	this.TerminatedFlowExpression,
	this.TerminatedFlowStatement
);

}.call(
	this
);


// 中断流标签子类相关
void function(TerminatedFlowTag){

this.ReturnTag = function(visitor){
	/**
	 * return 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ReturnTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	ReturnTag = new Rexjs(ReturnTag, TerminatedFlowTag);
	
	ReturnTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		flow: ECMAScriptStatement.FLOW_LINEAR,
		regexp: /return/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.returnContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var s = statements;

			// 如果语句块存在
			while(
				s
			){
				// 如果是闭包，而且不是系统最外层闭包
				if(
					s.closure && s.target !== null
				){
					// 调用父类访问器
					visitor.call(this, parser, context, statement, statements);

					// 设置当前表达式为空表达式
					statements.statement.expression = new EmptyExpression(null);
					return;
				}

				s = s.target;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("ILLEGAL_STATEMENT", "return")
			);
		}
	});
	
	return ReturnTag;
}(
	TerminatedFlowTag.prototype.visitor
);

this.ThrowTag = function(){
	/**
	 * throw 标签
	 * @param {Number} _type - 标签类型
	 */
	function ThrowTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	ThrowTag = new Rexjs(ThrowTag, TerminatedFlowTag);
	
	ThrowTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /throw/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.throwContextTags;
		}
	});
	
	return ThrowTag;
}();

this.ThrowContextLineTerminatorTag = function(IllegalLineTerminatorTag){
	/**
	 * throw 关键字上下文的行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function ThrowContextLineTerminatorTag(_type){
		IllegalLineTerminatorTag.call(this, _type);
	};
	ThrowContextLineTerminatorTag = new Rexjs(ThrowContextLineTerminatorTag, IllegalLineTerminatorTag);

	ThrowContextLineTerminatorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.NEWLINE_AFTER_THROW);
		}
	});

	return ThrowContextLineTerminatorTag;
}(
	this.IllegalLineTerminatorTag
);

}.call(
	this,
	this.TerminatedFlowTag
);


// 迭代中断流类相关
void function(TerminatedFlowStatement){

this.TerminatedBranchFlowStatement = function(catchMethod, withoutAnyFlow){
	/**
	 * 中断分支流语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TerminatedBranchFlowStatement(statements){
		TerminatedFlowStatement.call(this, statements);
		
		this.expression = new EmptyExpression(null);
	};
	TerminatedBranchFlowStatement = new Rexjs(TerminatedBranchFlowStatement, TerminatedFlowStatement);

	TerminatedBranchFlowStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var expression = this.expression, terminatedFlowExpression = this.target.expression;

			switch(
				false
			){
				// 如果不是空表达式，说明是属于标记表达式，而标记表达式已经经过验证
				case expression instanceof EmptyExpression:
					break;

				// 如果存在指定的流语句中
				case withoutAnyFlow(this.target, this.statements, terminatedFlowExpression.context.tag.flow):
					break;

				// 默认
				default:
					// 报错
					parser.error(
						terminatedFlowExpression.context,
						ECMAScriptErrors.template(
							"ILLEGAL_STATEMENT",
							terminatedFlowExpression.context.content
						)
					);
					return;
			}

			// 调用父类方法
			return catchMethod.call(this, parser, context);
		}
	});
	
	return TerminatedBranchFlowStatement;
}(
	TerminatedFlowStatement.prototype.catch,
	// withoutAnyFlow
	function(target, statements, flow){
		// 如果语句块存在
		while(
			statements
		){
			// 如果目标语句存在
			while(
				target
			){
				// 如果流一致
				if(
					(target.flow & flow) === flow
				){
					return false;
				}

				target = target.target;
			}

			// 如果是闭包
			if(
				statements.closure
			){
				return true;
			}

			statements = statements.target;
			target = statements.statement;
		}
	}
);

this.TerminatedBranchFlowTag = function(TerminatedFlowTag, TerminatedFlowExpression, TerminatedBranchFlowStatement){
	/**
	 * 中断分支流标签
	 * @param {Number} _type - 标签类型
	 */
	function TerminatedBranchFlowTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	TerminatedBranchFlowTag = new Rexjs(TerminatedBranchFlowTag, TerminatedFlowTag);
	
	TerminatedBranchFlowTag.props({
		/**
		 * 核对标记定义语句，是否满足当前中断流所对应的标记
		 * @param {Statement} labelStatement - 标签定义语句
		 */
		checkFlowStatement: function(){
			return true;
		},
		flow: ECMAScriptStatement.FLOW_BRANCH,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.terminatedBranchFlowContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new TerminatedFlowExpression(context);
			// 设置当前语句
			statements.statement = new TerminatedBranchFlowStatement(statements);
		}
	});
	
	return TerminatedBranchFlowTag;
}(
	this.TerminatedFlowTag,
	this.TerminatedFlowExpression,
	this.TerminatedBranchFlowStatement
);

this.LabelledIdentifierTag = function(LabelTag, LabelledStatement){
	/**
	 * 标记标识符标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelledIdentifierTag(_type){
		LabelTag.call(this, _type);
	};
	LabelledIdentifierTag = new Rexjs(LabelledIdentifierTag, LabelTag);
	
	LabelledIdentifierTag.props({
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
		visitor: function(parser, context, statement, statements){
			var content = context.content, flowStatement = statement, target = statement.target, terminatedFlowTag = target.expression.context.tag;

			while(
				statements
			){
				// 如果目标语句存在
				while(
					target
				){
					switch(
						false
					){
						// 如果目标语句不是标记语句
						case target instanceof LabelledStatement:
							break;

						// 如果标记名称不符合
						case target.target.expression.context.content === content:
							break;

						// 如果流语句核对无效
						case terminatedFlowTag.checkFlowStatement(flowStatement):
							break;

						default:
							// 设置当前表达式
							statement.expression = new Expression(context);
							return;
					}

					flowStatement = target;
					target = target.target;
				}

				// 如果是闭包
				if(
					statements.closure
				){
					break;
				}

				statements = statements.target;
				flowStatement = target;
				target = statements.statement;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("LABEL", content)
			);
		}
	});
	
	return LabelledIdentifierTag;
}(
	this.LabelTag,
	this.LabelledStatement
);

}.call(
	this,
	this.TerminatedFlowStatement
);


// 迭代中断流子类相关
void function(TerminatedBranchFlowTag){

this.BreakTag = function(){
	/**
	 * break 标签
	 * @param {Number} _type - 标签类型
	 */
	function BreakTag(_type){
		TerminatedBranchFlowTag.call(this, _type);
	};
	BreakTag = new Rexjs(BreakTag, TerminatedBranchFlowTag);
	
	BreakTag.props({
		regexp: /break/
	});
	
	return BreakTag;
}();

this.ContinueTag = function(FLOW_CIRCULAR){
	/**
	 * continue 标签
	 * @param {Number} _type - 标签类型
	 */
	function ContinueTag(_type){
		TerminatedBranchFlowTag.call(this, _type);
	};
	ContinueTag = new Rexjs(ContinueTag, TerminatedBranchFlowTag);
	
	ContinueTag.props({
		/**
		 * 核对标记语句，是否满足当前中断流所对应的标记
		 * @param {Statement} flowStatement - 标签语句
		 */
		checkFlowStatement: function(flowStatement){
			return (flowStatement.flow & FLOW_CIRCULAR) === FLOW_CIRCULAR;
		},
		flow: FLOW_CIRCULAR,
		regexp: /continue/
	});
	
	return ContinueTag;
}(
	// FLOW_CIRCULAR
	ECMAScriptStatement.FLOW_CIRCULAR
);

}.call(
	this,
	this.TerminatedBranchFlowTag
);


// var 语句相关
void function(VariableDeclarationTag, vdsTag){

this.VarExpression = function(config, extractTo){
	/**
	 * var 表达式
	 * @param {Context} context - 标签上下文
	 */
	function VarExpression(context){
		Expression.call(this, context);

		// 初始化 list
		this.list = new ListExpression(null, ",");
	};
	VarExpression = new Rexjs(VarExpression, Expression);

	VarExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});
	
	VarExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取 var 关键字
			contentBuilder.appendContext(this.context);
			// 添加空格
			contentBuilder.appendSpace();

			// 提取变量列表
			this.list.extractTo(contentBuilder);
		},
		list: null
	});

	return VarExpression;
}(
	// config
	new SyntaxConfig("let", "const"),
	ListExpression.prototype.extractTo
);

this.VarStatement = function(){
	/**
	 * var 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function VarStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	VarStatement = new Rexjs(VarStatement, ECMAScriptStatement);
	
	VarStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			var varExpression = this.out();

			// 添加表达式
			varExpression.list.add(this.expression);
			// 如果是逗号，返回指定的分隔符，否则返回 null
			return context.content === "," ? varExpression.context.tag.binding : null;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(
				context.content !== ","
			){
				return null;
			}

			// 跳出语句
			var varExpression = this.out();

			// 添加表达式
			varExpression.list.add(this.expression);
			// 返回分隔符标签
			return varExpression.context.tag.binding;
		}
	});
	
	return VarStatement;
}();

this.VarTag = function(VarExpression, VarStatement){
	/**
	 * var 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function VarTag(_type){
		SyntaxTag.call(this, _type);
	};
	VarTag = new Rexjs(VarTag, SyntaxTag);

	VarTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return vdsTag;
		},
		regexp: /var/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.varContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new VarExpression(context);
			// 设置当前语句
			statements.statement = new VarStatement(statements)
		}
	});

	return VarTag;
}(
	this.VarExpression,
	this.VarStatement
);

this.ClosureVariableTag = function(visitor){
	/**
	 * 闭包内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosureVariableTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ClosureVariableTag = new Rexjs(ClosureVariableTag, VariableDeclarationTag);
	
	ClosureVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closureVariableContextTags;
		}
	});
	
	return ClosureVariableTag;
}(
	VariableDeclarationTag.prototype.visitor
);

this.VDSTag = function(CommaTag, VarStatement){
	/**
	 * var 语句变量声明分隔符标签(Var Declaration Separator Tag)
	 * @param {Number} _type - 标签类型
	 */
	function VDSTag(_type){
		CommaTag.call(this, _type);
	};
	VDSTag = new Rexjs(VDSTag, CommaTag);
	
	VDSTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.varContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new VarStatement(statements)
		}
	});
	
	return VDSTag;
}(
	this.CommaTag,
	this.VarStatement
);

vdsTag = new this.VDSTag();

}.call(
	this,
	this.VariableDeclarationTag,
	// vdsTag
	null
);


// let 语句相关
void function(ClosureVariableTag, ldsTag){

this.LetTag = function(VarTag, config){
	/**
	 * let 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function LetTag(_type){
		VarTag.call(this, _type);
	};
	LetTag = new Rexjs(LetTag, VarTag);

	LetTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return ldsTag;
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.let ? "var" : content);
		},
		regexp: /let/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.letContextTags;
		}
	});

	return LetTag;
}(
	this.VarTag,
	this.VarExpression.config
);

this.LocalVariableTag = function(collectTo){
	/**
	 * 局部内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function LocalVariableTag(_type){
		ClosureVariableTag.call(this, _type);
	};
	LocalVariableTag = new Rexjs(LocalVariableTag, ClosureVariableTag);
	
	LocalVariableTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			// 调用父类方法
			collectTo.call(this, parser, context, statements);
			// 收集变量名
			statements.collections.blacklist.collect(context.content);
		},
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containBy: function(variable, collections){
			return collections.declaration.contain(variable);
		}
	});
	
	return LocalVariableTag;
}(
	ClosureVariableTag.prototype.collectTo
);

this.LDSTag = function(VDSTag){
	/**
	 * let 语句变量声明分隔符标签(Let Declaration Separator Tag)
	 * @param {Number} _type - 标签类型
	 */
	function LDSTag(_type){
		VDSTag.call(this, _type);
	};
	LDSTag = new Rexjs(LDSTag, VDSTag);
	
	LDSTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.letContextTags;
		}
	});
	
	return LDSTag;
}(
	this.VDSTag
);

ldsTag = new this.LDSTag();

}.call(
	this,
	this.ClosureVariableTag,
	// ldsTag
	null
);


// const 语句相关
void function(VarExpression, IdentifierExpression, VarStatement, LocalVariableTag, cdsTag){

this.ConstStatement = function(catchMethod, tryMethod){
	/**
	 * const 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ConstStatement(statements){
		VarStatement.call(this, statements);
	};
	ConstStatement = new Rexjs(ConstStatement, VarStatement);
	
	ConstStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果表达式是可赋值表达式
			if(
				this.expression instanceof IdentifierExpression
			){
				// 由于没有赋值操作，则报错
				parser.error(this.expression.context, ECMAScriptErrors.MISSING_INITIALIZER);
				// 返回分隔符标签
				return null;
			}

			return catchMethod.call(this, parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果表达式是可赋值表达式
			if(
				this.expression instanceof IdentifierExpression
			){
				// 由于没有赋值操作，则报错
				parser.error(this.expression.context, ECMAScriptErrors.MISSING_INITIALIZER);
				return null;
			}

			// 调用父类方法
			return tryMethod.call(this, parser, context);
		}
	});
	
	return ConstStatement;
}(
	VarStatement.prototype.catch,
	VarStatement.prototype.try
);

this.ConstTag = function(LetTag, ConstStatement, config){
	/**
	 * const 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstTag(_type){
		LetTag.call(this, _type);
	};
	ConstTag = new Rexjs(ConstTag, LetTag);

	ConstTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return cdsTag;
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.const ? "var" : content);
		},
		regexp: /const/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new VarExpression(context);
			// 设置当前语句
			statements.statement = new ConstStatement(statements);
		}
	});

	return ConstTag;
}(
	this.LetTag,
	this.ConstStatement,
	VarExpression.config
);

this.ConstVariableTag = function(collectTo){
	/**
	 * 局部内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstVariableTag(_type){
		LocalVariableTag.call(this, _type);
	};
	ConstVariableTag = new Rexjs(ConstVariableTag, LocalVariableTag);
	
	ConstVariableTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			// 调用父类方法
			collectTo.call(this, parser, context, statements);
			// 收集变量名
			statements.collections.const.collect(context.content);
		}
	});
	
	return ConstVariableTag;
}(
	LocalVariableTag.prototype.collectTo
);

this.CDSTag = function(LDSTag, ConstStatement){
	/**
	 * const 语句变量声明分隔符标签(Const Declaration Separator Tag)
	 * @param {Number} _type - 标签类型
	 */
	function CDSTag(_type){
		LDSTag.call(this, _type);
	};
	CDSTag = new Rexjs(CDSTag, LDSTag);
	
	CDSTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new ConstStatement(statements);
		}
	});
	
	return CDSTag;
}(
	this.LDSTag,
	this.ConstStatement
);

cdsTag = new this.CDSTag();

}.call(
	this,
	this.VarExpression,
	this.IdentifierExpression,
	this.VarStatement,
	this.LocalVariableTag,
	// cdsTag
	null
);


// if 语句相关
void function(closeIfConditionTag, elseTag){

this.IfExpression = function(ConditionalExpression){
	/**
	 * if 表达式
	 * @param {Context} context - 表达式上下文
	 */
	function IfExpression(context){
		ConditionalExpression.call(this, context);
		
		this.ifContext = context;
	};
	IfExpression = new Rexjs(IfExpression, ConditionalExpression);
	
	IfExpression.props({
		body: null,
		elseBody: null,
		elseContext: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var elseContext = this.elseContext;
			
			// 追加 if 关键字
			contentBuilder.appendContext(this.ifContext);
			
			// 追加条件
			this.condition.extractTo(contentBuilder);
			// 追加主体语句
			this.ifBody.extractTo(contentBuilder);
			
			// 如果没有 else 关键字
			if(
				elseContext === null
			){
				return;
			}
			
			// 判断 if 主体表达式是否需要加分号
			if(
				(this.ifBody.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED
			){
				// 追加分号
				contentBuilder.appendString(";");
			}
			
			// 追加 else 关键字
			contentBuilder.appendContext(elseContext);
			// 追加空格
			contentBuilder.appendSpace();
			
			// 提取 else 主体内容
			this.elseBody.extractTo(contentBuilder);
		},
		ifBody: null,
		ifContext: null
	});
	
	return IfExpression;
}(
	this.ConditionalExpression
);

this.IfBodyStatement = function(){
	/**
	 * if 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IfBodyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	IfBodyStatement = new Rexjs(IfBodyStatement, ECMAScriptStatement);
	
	IfBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var expression = this.expression, ifExpression = this.out();

			// 设置 if 表达式的主体
			ifExpression.ifBody = expression;
			
			switch(
				false
			){
				// 如果不是 else
				case context.content === "else":
					break;

				// 如果表达式还没有结束
				case (expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE:
					// 默认
					parser.error(context);
					break;

				default:
					// 返回 else 标签
					return ifExpression.ifContext.tag.binding;
			}
		}
	});
	
	return IfBodyStatement;
}();

this.ElseBodyStatement = function(){
	/**
	 * else 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ElseBodyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ElseBodyStatement = new Rexjs(ElseBodyStatement, ECMAScriptStatement);
	
	ElseBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 elseBody
			this.out().elseBody = this.expression;
		}
	});
	
	return ElseBodyStatement;
}();

this.IfTag = function(IfExpression){
	/**
	 * if 标签
	 */
	function IfTag(_type){
		SyntaxTag.call(this, _type);
	};
	IfTag = new Rexjs(IfTag, SyntaxTag);
	
	IfTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return elseTag;
		},
		regexp: /if/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.ifConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new IfExpression(context);
		}
	});
	
	return IfTag;
}(
	this.IfExpression
);

this.OpenIfConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * if 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenIfConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenIfConditionTag = new Rexjs(OpenIfConditionTag, OpenParenTag);
	
	OpenIfConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeIfConditionTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 if 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenIfConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseIfConditionTag = function(CloseParenTag, IfBodyStatement, IfBodyStatements){
	/**
	 * if 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseIfConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseIfConditionTag = new Rexjs(CloseIfConditionTag, CloseParenTag);
	
	CloseIfConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 if 条件的 close
			statement.expression.condition.close = context;
			// 设置当前语句 及 表达式主体语句
			statements.statement = new IfBodyStatement(statements);
		}
	});
	
	return CloseIfConditionTag;
}(
	this.CloseParenTag,
	this.IfBodyStatement,
	this.IfBodyStatements
);

this.ElseTag = function(ElseExpression, ElseBodyStatement){
	/**
	 * else 标签
	 * @param {Number} _type - 标签类型
	 */
	function ElseTag(_type){
		SyntaxTag.call(this, _type);
	};
	ElseTag = new Rexjs(ElseTag, SyntaxTag);
	
	ElseTag.props({
		regexp: /else/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 else 关键字上下文
			statement.expression.elseContext = context;
			// 设置当前语句
			statements.statement = new ElseBodyStatement(statements);
		}
	});
	
	return ElseTag;
}(
	this.ElseExpression,
	this.ElseBodyStatement
);

closeIfConditionTag = new this.CloseIfConditionTag();
elseTag = new this.ElseTag();

}.call(
	this,
	// closeIfConditionTag
	null,
	// elseTag
	null
);


// while 语句相关
void function(closeWhileConditionTag){

this.WhileExpression = function(ConditionalExpression){
	/**
	 * while 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function WhileExpression(context){
		ConditionalExpression.call(this, context);
	};
	WhileExpression = new Rexjs(WhileExpression, ConditionalExpression);
	
	WhileExpression.props({
		body: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 提取 while 关键字
			contentBuilder.appendContext(this.context);
			
			// 提取 while 条件
			this.condition.extractTo(contentBuilder);
			// 提取 while 主体语句
			this.body.extractTo(contentBuilder);
		}
	});
	
	return WhileExpression;
}(
	this.ConditionalExpression
);

this.WhileBodyStatement = function(){
	/**
	 * while 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function WhileBodyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	WhileBodyStatement = new Rexjs(WhileBodyStatement, ECMAScriptStatement);
	
	WhileBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = this.expression;
		},
		flow: ECMAScriptStatement.FLOW_CIRCULAR
	});
	
	return WhileBodyStatement;
}();

this.WhileTag = function(WhileExpression){
	/**
	 * while 标签
	 * @param {Number} _type - 标签类型
	 */
	function WhileTag(_type){
		SyntaxTag.call(this, _type);
	};
	WhileTag = new Rexjs(WhileTag, SyntaxTag);
	
	WhileTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /while/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.whileConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new WhileExpression(context);
		}
	});
	
	return WhileTag;
}(
	this.WhileExpression
);

this.OpenWhileConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * while 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenWhileConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenWhileConditionTag = new Rexjs(OpenWhileConditionTag, OpenParenTag);
	
	OpenWhileConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeWhileConditionTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 while 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenWhileConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseWhileConditionTag = function(CloseParenTag, WhileBodyStatement){
	/**
	 * while 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseWhileConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseWhileConditionTag = new Rexjs(CloseWhileConditionTag, CloseParenTag);
	
	CloseWhileConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 条件表达式结束
			statement.expression.condition.close = context;
			// 设置当前语句
			statements.statement = new WhileBodyStatement(statements);
		}
	});
	
	return CloseWhileConditionTag;
}(
	this.CloseParenTag,
	this.WhileBodyStatement
);

closeWhileConditionTag = new this.CloseWhileConditionTag();

}.call(
	this,
	// closeWhileConditionTag
	null
);


// do while 语句相关
void function(doWhileTag, closeDoWhileConditionTag){
	
this.DoExpression = function(ConditionalExpression){
	/**
	 * do 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DoExpression(context){
		ConditionalExpression.call(this, context);
	};
	DoExpression = new Rexjs(DoExpression, ConditionalExpression);
	
	DoExpression.props({
		body: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			var body = this.body;
			
			contentBuilder.appendContext(this.context);
			contentBuilder.appendSpace();
			
			body.extractTo(contentBuilder);
			
			// 判断 do while 主体表达式是否需要加分号
			if(
				(body.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED
			){
				// 追加分号
				contentBuilder.appendString(";");
			}
			
			contentBuilder.appendContext(this.whileContext);
			
			this.condition.extractTo(contentBuilder);
		},
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} state - 表达式状态
		 */
		set state(state){},
		whileContext: null
	});
	
	return DoExpression;
}(
	this.ConditionalExpression
);

this.DoStatement = function(){
	/**
	 * do 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DoStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	DoStatement = new Rexjs(DoStatement, ECMAScriptStatement);
	
	DoStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var expression = this.expression;
			
			switch(
				false
			){
				// 如果不是 while 关键字
				case context.content === "while":
					break;
				
				// 如果表达式没有结束
				case (expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE:
					break;
					
				default:
					// 跳出语句
					var doExpression = this.out();

					// 跳出语句并设置 body
					doExpression.body = expression;
					// 返回 do while 标签
					return doExpression.context.tag.binding;
			}

			var tag = context.tag;

			// 如果是语句结束标签
			if(
				tag.class.statementEnd
			){
				// 返回该标签
				return tag;
			}
			
			// 报错
			parser.error(context);
		}
	});
	
	return DoStatement;
}();

this.DoTag = function(DoExpression, DoStatement){
	/**
	 * do 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DoTag(_type){
		SyntaxTag.call(this, _type);
	};
	DoTag = new Rexjs(DoTag, SyntaxTag);
	
	DoTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return doWhileTag;
		},
		regexp: /do/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new DoExpression(context);
			// 设置当前语句
			statements.statement = new DoStatement(statements);
		}
	});
	
	return DoTag;
}(
	this.DoExpression,
	this.DoStatement
);

this.DoWhileTag = function(WhileTag){
	/**
	 * do while 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DoWhileTag(_type){
		WhileTag.call(this, _type);
	};
	DoWhileTag = new Rexjs(DoWhileTag, WhileTag);

	DoWhileTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.doWhileConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.whileContext = context;
		}
	});
	
	return DoWhileTag;
}(
	this.WhileTag
);

this.OpenDoWhileConditionTag = function(OpenWhileConditionTag, ConditionStatement){
	/**
	 * do while 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenDoWhileConditionTag(_type){
		OpenWhileConditionTag.call(this, _type);
	};
	OpenDoWhileConditionTag = new Rexjs(OpenDoWhileConditionTag, OpenWhileConditionTag);

	OpenDoWhileConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeDoWhileConditionTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 do while 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenDoWhileConditionTag;
}(
	this.OpenWhileConditionTag,
	this.ConditionStatement
);

this.CloseDoWhileConditionTag = function(CloseWhileConditionTag){
	/**
	 * do while 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseDoWhileConditionTag(_type){
		CloseWhileConditionTag.call(this, _type);
	};
	CloseDoWhileConditionTag = new Rexjs(CloseDoWhileConditionTag, CloseWhileConditionTag);

	CloseDoWhileConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		visitor: function(parser, context, statement){
			statement.expression.condition.close = context;
		}
	});
	
	return CloseDoWhileConditionTag;
}(
	this.CloseWhileConditionTag
);

doWhileTag = new this.DoWhileTag();
closeDoWhileConditionTag = new this.CloseDoWhileConditionTag();
	
}.call(
	this,
	// doWhileTag
	null,
	// closeDoWhileConditionTag
	null
);


// for 语句相关
void function(){

this.ForExpression = function(ConditionalExpression, config, compileOf){
	/**
	 * for 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ForExpression(context){
		ConditionalExpression.call(this, context);
	};
	ForExpression = new Rexjs(ForExpression, ConditionalExpression);

	ForExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

	ForExpression.props({
		body: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 添加 for 关键字
			contentBuilder.appendContext(this.context);

			// 如果是 of 标签而且需要编译 of
			if(
				this.iterator === "of" && config.of
			){
				// 编译 for of
				compileOf(
					this.condition,
					this.body,
					contentBuilder,
					new ContentBuilder(),
					this.variable
				);
				
				return;
			}

			// 提取条件
			this.condition.extractTo(contentBuilder);
			// 提取主体
			this.body.extractTo(contentBuilder);
		},
		iterator: "",
		variable: ""
	});
	
	return ForExpression;
}(
	this.ConditionalExpression,
	// config
	new SyntaxConfig("of"),
	// compileOf
	function(condition, body, contentBuilder, builder, variable){
		var inner = condition.inner;

		// 追加 for 循环条件起始小括号
		contentBuilder.appendContext(condition.open);
		// 追加 for 循环初始化语句
		contentBuilder.appendString(variable + "=new Rexjs.Generator(");

		// 追加生成器的对象
		inner[1].extractTo(contentBuilder);

		// 追加 for 循环的逻辑条件
		contentBuilder.appendString(");!" + variable + ".iterator.closed;");
		// 追加 for 循环条件结束小括号
		contentBuilder.appendContext(condition.close);
		// 追加语句块起始大括号，目的是让 let、const 发挥效果
		contentBuilder.appendString("{");

		// 将对象值的初始化表达式提取到新的内容生成器里，目的是防止文档位置（position）的错乱，导致 mappings 不可用 
		inner[0].left.extractTo(builder);

		// 追加对象值的初始化
		contentBuilder.appendString(
			builder.result + "=" + variable + ".next().value;"
		);

		// 提取主体
		body.extractTo(contentBuilder);
		// 追加语句块结束小括号
		contentBuilder.appendString("}");
	}
);

this.ForBodyStatement = function(){
	/**
	 * for 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForBodyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ForBodyStatement = new Rexjs(ForBodyStatement, ECMAScriptStatement);
	
	ForBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = this.expression;
		},
		flow: ECMAScriptStatement.FLOW_CIRCULAR
	});
	
	return ForBodyStatement;
}();

this.ForTag = function(ForExpression){
	/**
	 * for 标签
	 */
	function ForTag(_type){
		SyntaxTag.call(this, _type);
	};
	ForTag = new Rexjs(ForTag, SyntaxTag);
	
	ForTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /for/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.forConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式为 for 表达式
			statement.expression = new ForExpression(context);
		}
	});
	
	return ForTag;
}(
	this.ForExpression
);

}.call(
	this
);


// for 循环迭代符表达式相关
void function(){

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
			// 跳出当前语句并添加表达式
			this.out().add(this.expression);
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

this.IteratorTag = function(BinaryKeywordTag, BinaryExpression, LeftHandSideExpression, IterationStatement, visitor){
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
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var binaryExpression = new BinaryExpression(context);

			// 添加表达式
			binaryExpression.add(
				new LeftHandSideExpression(statement.expression, context)
			);

			// 设置 for 表达式的 iterator 属性
			statement.target.expression.iterator = context.content;
			// 设置当前表达式
			statement.expression = binaryExpression;
			// 设置当前语句
			statements.statement = new IterationStatement(statements);
		}
	});

	return IteratorTag;
}(
	this.BinaryKeywordTag,
	this.BinaryExpression,
	Rexjs.LeftHandSideExpression,
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

this.ForOfTag = function(IteratorTag, config, visitor){
	/**
	 * for of 标签
	 * @param {Number} _type - 标签类型
	 */
	function ForOfTag(_type){
		IteratorTag.call(this, _type);
	};
	ForOfTag = new Rexjs(ForOfTag, IteratorTag);

	ForOfTag.props({
		regexp: /of/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果需要编译 of
			if(
				config.of
			){
				// 生成并记录临时变量名
				statement.target.expression.variable = statements.collections.generate();
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return ForOfTag;
}(
	this.IteratorTag,
	this.ForExpression.config,
	this.IteratorTag.prototype.visitor
);

}.call(
	this
);


// for 循环条件表达式相关
void function(IdentifierExpression, VarExpression, CommaStatement, closeForConditionTag, fcicTag, forInTag, forOfTag, fcisTag, fclsTag, getOpenConditionTag){

this.ForConditionInnerStatement = function(){
	/**
	 * for 循环条件内部语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForConditionInnerStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ForConditionInnerStatement = new Rexjs(ForConditionInnerStatement, ECMAScriptStatement);
	
	ForConditionInnerStatement.props({
		expression: new DefaultExpression()
	});

	return ForConditionInnerStatement;
}();

this.FCIStatement = function(ForConditionInnerStatement, hasError){
	/**
	 * for 循环条件的初始化语句(For Condition Initialization Statement)
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function FCIStatement(statements){
		ForConditionInnerStatement.call(this, statements);
	};
	FCIStatement = new Rexjs(FCIStatement, ForConditionInnerStatement);
	
	FCIStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var tag, expression = this.expression, target = this.target;

			// 判断标签内容
			switch(
				context.content
			){
				// 如果是分号
				case ";":
					// 设置标签
					tag = getOpenConditionTag(this).fcis;
					
					(
						// 设置目标语句的表达式
						this.target.expression = new ListExpression(null, ";")
					)
					// 添加表达式
					.add(
						expression
					);
					break;

				// 如果是 in
				case "in":
					tag = getOpenConditionTag(this).forIn;

				// 如果是 of
				case "of":
					// 如果验证出错
					if(
						hasError(parser, expression, context)
					){
						return;
					}

					// 设置标签
					tag = tag || getOpenConditionTag(this).forOf;
					// 设置目标语句的表达式
					this.target.expression = expression;
					break;

				default:
					// 报错
					parser.error(context);
					return;
			}

			// 跳出当前语句
			this.out();
			// 返回标签
			return tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 判断标签内容
			switch(
				context.content
			){
				// 如果是 in 关键字
				case "in":
					break;

				// 如果是逗号
				case ",":
					return getOpenConditionTag(this).fcic;

				// 默认
				default:
					return null;
			}

			var expression = this.expression;

			// 如果验证出错
			if(
				hasError(parser, expression, context)
			){
				return null;
			}

			// 设置目标语句的表达式
			this.target.expression = expression;

			// 跳出当前语句
			this.out();
			return getOpenConditionTag(this).forIn;
		}
	});
	
	return FCIStatement;
}(
	this.ForConditionInnerStatement,
	// hasError
	function(parser, expression, context){
		// 如果是声明表达式
		if(
			expression instanceof VarExpression
		){
			var list = expression.list;

			// 如果声明列表长度等于 1
			if(
				list.length === 1
			){
				// 设置表达式为列表的第一项
				expression = list[0];
			}
			else {
				// 返回错误信息
				parser.error(context, ECMAScriptErrors.FOR_IN);
				return true;
			}
		}

		// 如果是标识符表达式
		if(
			expression instanceof IdentifierExpression
		){
			return false;
		}

		// 返回错误信息
		parser.error(context, ECMAScriptErrors.FOR);
		return true;
	}
);

this.FCLStatement = function(ForConditionInnerStatement){
	/**
	 * for 循环条件的逻辑判断语句(For Condition Logic Statement)
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function FCLStatement(statements){
		ForConditionInnerStatement.call(this, statements);
	};
	FCLStatement = new Rexjs(FCLStatement, ForConditionInnerStatement);
	
	FCLStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是分号
			if(
				context.content !== ";"
			){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并添加表达式
			this.out().add(this.expression);
			// 返回标签
			return getOpenConditionTag(this).fcls;
		}
	});
	
	return FCLStatement;
}(
	this.ForConditionInnerStatement
);

this.FCFStatement = function(ForConditionInnerStatement){
	/**
	 * for 循环条件的末语句(For Condition Finally Statement)
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function FCFStatement(statements){
		ForConditionInnerStatement.call(this, statements);
	};
	FCFStatement = new Rexjs(FCFStatement, ForConditionInnerStatement);
	
	FCFStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().add(this.expression);
		}
	});
	
	return FCFStatement;
}(
	this.ForConditionInnerStatement
);

this.FCICStatement = function(tryMethod){
	/**
	 * for 循环初始化条件中的逗号语句(For Condition Initialization Comma Statement)
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function FCICStatement(statements){
		CommaStatement.call(this, statements);
	};
	FCICStatement = new Rexjs(FCICStatement, CommaStatement);

	FCICStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是 in 关键字
			if(
				context.content === "in"
			){
				// 跳出当前语句并添加表达式
				this.out().add(this.expression);
				return null;
			}

			// 返回父类方法处理的结果
			return tryMethod.call(this, parser, context);
		}
	});

	return FCICStatement;
}(
	CommaStatement.prototype.try
);

this.OpenForConditionTag = function(OpenParenTag, ConditionStatement, FCIStatement){
	/**
	 * for 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenForConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenForConditionTag = new Rexjs(OpenForConditionTag, OpenParenTag);
	
	OpenForConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeForConditionTag;
		},
		/**
		 * 获取绑定的 forInTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forIn(){
			return forInTag;
		},
		/**
		 * 获取绑定的 forOfTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forOf(){
			return forOfTag;
		},
		/**
		 * 获取绑定的 fcicTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get fcic(){
			return fcicTag;
		},
		/**
		 * 获取绑定的 fcisTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get fcis(){
			return fcisTag;
		},
		/**
		 * 获取绑定的 fclsTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get fcls(){
			return fclsTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.forConditionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 for 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
			// 再次设置当前语句，目的是 target 要指向 ConditionStatement
			statements.statement = new FCIStatement(statements);
		}
	});
	
	return OpenForConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement,
	this.FCIStatement
);

this.FCICTag = function(CommaTag, CommaExpression, FCICStatement, visitor){
	/**
	 * for 循环初始化条件的逗号标签(For Condition Initialization Comma Tag)
	 * @param {Number} _type - 标签类型
	 */
	function FCICTag(_type){
		CommaTag.call(this, _type);
	};
	FCICTag = new Rexjs(FCICTag, CommaTag);

	FCICTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new CommaExpression(context, statement.expression);
			// 设置当前语句
			statements.statement = new FCICStatement(statements);
		}
	});

	return FCICTag;
}(
	this.CommaTag,
	this.CommaExpression,
	this.FCICStatement
);

this.FCSTag = function(SemicolonTag){
	/**
	 * for 循环条件中的分号标签(For Condition Semicolon Tag)
	 * @param {Number} _type - 标签类型
	 */
	function FCSTag(_type){
		SemicolonTag.call(this, _type);
	};
	FCSTag = new Rexjs(FCSTag, SemicolonTag);

	FCSTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagMaps){
			return tagMaps.expressionTags;
		}
	});

	return FCSTag;
}(
	this.SemicolonTag
);

this.FCISTag = function(FCSTag, FCLStatement){
	/**
	 * for 循环条件中初始化语句的分号标签，即第一个分号标签(For Condition Initialization Semicolon Tag)
	 * @param {Number} _type - 标签类型
	 */
	function FCISTag(_type){
		FCSTag.call(this, _type)
	};
	FCISTag = new Rexjs(FCISTag, FCSTag);

	FCISTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new FCLStatement(statements);
		}
	});

	return FCISTag;
}(
	this.FCSTag,
	this.FCLStatement
);

this.FCLSTag = function(FCSTag, FCFStatement){
	/**
	 * for 循环条件中逻辑语句的分号标签，即第二个分号标签(For Condition Logic Semicolon Tag)
	 * @param {Number} _type - 标签类型
	 */
	function FCLSTag(_type){
		FCSTag.call(this, _type)
	};
	FCLSTag = new Rexjs(FCLSTag, FCSTag);

	FCLSTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagMaps){
			return tagMaps.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new FCFStatement(statements);
		}
	});

	return FCLSTag;
}(
	this.FCSTag,
	this.FCFStatement
);

this.CloseForConditionTag = function(CloseParenTag, ForBodyStatement){
	/**
	 * for 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseForConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseForConditionTag = new Rexjs(CloseForConditionTag, CloseParenTag);
	
	CloseForConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 for 表达式条件的 close
			statement.expression.condition.close = context;
			// 设置当前语句
			statements.statement = new ForBodyStatement(statements);
		}
	});
	
	return CloseForConditionTag;
}(
	this.CloseParenTag,
	this.ForBodyStatement
);

closeForConditionTag = new this.CloseForConditionTag();
fcicTag = new this.FCICTag();
forInTag = new this.ForInTag();
forOfTag = new this.ForOfTag();
fcisTag = new this.FCISTag();
fclsTag = new this.FCLSTag();

}.call(
	this,
	this.IdentifierExpression,
	this.VarExpression,
	this.CommaStatement,
	// closeForConditionTag
	null,
	// fcicTag
	null,
	// forInTag
	null,
	// forOfTag
	null,
	// fcisTag
	null,
	// fclsTag
	null,
	// getOpenConditionTag
	function(statement){
		return statement.target.target.expression.condition.open.tag;
	}
);


// try catch 语句相关
void function(catchTag, finallyTag){
	
this.TryExpression = function(){
	/**
	 * try 表达式
	 * @param {Context} context - 标签上下文
	 */
	function TryExpression(context){
		Expression.call(this, context);
	};
	TryExpression = new Rexjs(TryExpression, Expression);
	
	TryExpression.props({
		catchBlock: null,
		catchContext: null,
		exception: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var exception = this.exception, finallyContext = this.finallyContext;
			
			// 追加 try 关键字
			contentBuilder.appendContext(this.tryContext);
			// 提取 try 语句块
			this.tryBlock.extractTo(contentBuilder);
			
			// 如果异常存在，说明存在 catch 语句
			if(
				exception
			){
				// 追加 catch 关键字
				contentBuilder.appendContext(this.catchContext);
				// 提取异常内容
				exception.extractTo(contentBuilder);
				// 提取 try 语句块
				this.catchBlock.extractTo(contentBuilder);
			}
			
			// 如果 finally 关键字存在
			if(
				finallyContext
			){
				// 追加 finally 关键字
				contentBuilder.appendContext(finallyContext);
				// 提取 finally 语句块
				this.finallyBlock.extractTo(contentBuilder);
			}
		},
		finallyBlock: null,
		finallyContext: null,
		tryBlock: null,
		/**
		 * 获取 try 关键字上下文
		 */
		get tryContext(){
			return this.context;
		}
	});
	
	return TryExpression;
}();

this.TryStatement = function(){
	/**
	 * try 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	TryStatement = new Rexjs(TryStatement, ECMAScriptStatement);
	
	TryStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			var tryExpression = this.out();

			// 设置 tryBlock 属性
			tryExpression.tryBlock = this.expression;
			
			switch(
				context.content
			){
				// 如果是 catch
				case "catch" :
					return tryExpression.context.tag.catch;
				
				// 如果是 finally
				case "finally" :
					return tryExpression.context.tag.finally;
			}

			// 报错
			parser.error(context, ECMAScriptErrors.TRY);
		}
	});
	
	return TryStatement;
}();

this.CatchStatement = function(){
	/**
	 * catch 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CatchStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CatchStatement = new Rexjs(CatchStatement, ECMAScriptStatement);
	
	CatchStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			var tryExpression = this.out();

			// 设置 catchBlock 属性
			tryExpression.catchBlock = this.expression;
			// 如果是 finally，则返回 finallyTag
			return context.content === "finally" ? tryExpression.context.tag.finally : null;
		}
	});
	
	return CatchStatement;
}();

this.FinallyStatement = function(){
	/**
	 * finally 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function FinallyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	FinallyStatement = new Rexjs(FinallyStatement, ECMAScriptStatement);
	
	FinallyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 finallyBlock
			this.out().finallyBlock = this.expression;
		}
	});
	
	return FinallyStatement;
}();

this.TryTag = function(TryExpression, TryStatement){
	/**
	 * try 标签
	 * @param {Number} _type - 标签类型
	 */
	function TryTag(_type){
		SyntaxTag.call(this, _type);
	};
	TryTag = new Rexjs(TryTag, SyntaxTag);
	
	TryTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return this.catch;
		},
		/**
		 * 获取绑定的 catchTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get catch(){
			return catchTag;
		},
		/**
		 * 获取绑定的 finallyTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get finally(){
			return finallyTag;
		},
		regexp: /try/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.blockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new TryExpression(context);
			// 设置当前语句
			statements.statement = new TryStatement(statements);
		}
	});
	
	return TryTag;
}(
	this.TryExpression,
	this.TryStatement
);

this.CatchTag = function(CatchStatement){
	/**
	 * catch 标签
	 * @param {Number} _type - 标签类型
	 */
	function CatchTag(_type){
		SyntaxTag.call(this, _type);
	};
	CatchTag = new Rexjs(CatchTag, SyntaxTag);
	
	CatchTag.props({
		regexp: /catch/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.catchedExceptionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 catch 关键字上下文
			statement.expression.catchContext = context;
			// 设置当前语句
			statements.statement = new CatchStatement(statements);
		}
	});
	
	return CatchTag;
}(
	this.CatchStatement
);

this.OpenCatchedExceptionTag = function(OpenParenTag){
	/**
	 * try catch 异常起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenCatchedExceptionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenCatchedExceptionTag = new Rexjs(OpenCatchedExceptionTag, OpenParenTag);
	
	OpenCatchedExceptionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.exceptionVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 try catch 表达式的异常信息
			statement.target.expression.exception = new PartnerExpression(context);
		}
	});
	
	return OpenCatchedExceptionTag;
}(
	this.OpenParenTag
);

this.ExceptionVariableTag = function(VariableTag){
	/**
	 * 异常变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ExceptionVariableTag(_type){
		VariableTag.call(this, _type);
	};
	ExceptionVariableTag = new Rexjs(ExceptionVariableTag, VariableTag);
	
	ExceptionVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closeCatchedExceptionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			statement.target.expression.exception.inner = new Expression(context);
		}
	});
	
	return ExceptionVariableTag;
}(
	this.VariableTag
);

this.CloseCatchedExceptionTag = function(CloseParenTag){
	/**
	 * try catch 异常结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseCatchedExceptionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseCatchedExceptionTag = new Rexjs(CloseCatchedExceptionTag, CloseParenTag);
	
	CloseCatchedExceptionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.blockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.target.expression.exception.close = context;
		}
	});
	
	return CloseCatchedExceptionTag;
}(
	this.CloseParenTag
);

this.FinallyTag = function(FinallyStatement){
	/**
	 * finally 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function FinallyTag(_type){
		SyntaxTag.call(this, _type);
	};
	FinallyTag = new Rexjs(FinallyTag, SyntaxTag);
	
	FinallyTag.props({
		regexp: /finally/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.blockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 finally 关键字上下文
			statement.expression.finallyContext = context;
			// 设置当前语句
			statements.statement = new FinallyStatement(statements);
		}
	});
	
	return FinallyTag;
}(
	this.FinallyStatement
);

catchTag = new this.CatchTag();
finallyTag = new this.FinallyTag();

}.call(
	this,
	// catchTag
	null,
	// finallyTag
	null
);


// switch 语句相关
void function(closeSwitchConditionTag, closeSwitchBodyTag){

this.SwitchVariableCollections = function(ECMAScriptVariableCollections){
	/**
	 * 变量名收集器集合
	 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
	 */
	function SwitchVariableCollections(prevCollections){
		ECMAScriptVariableCollections.call(this, prevCollections.index, prevCollections);
	};
	SwitchVariableCollections = new Rexjs(SwitchVariableCollections, ECMAScriptVariableCollections);

	SwitchVariableCollections.props({
		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
		 */
		initRex: function(prevCollections){
			this.rex = prevCollections.rex;
		}
	});

	return SwitchVariableCollections;
}(
	this.ECMAScriptVariableCollections
);

this.SwitchExpression = function(ConditionalExpression){
	/**
	 * switch 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SwitchExpression(context){
		ConditionalExpression.call(this, context);
	};
	SwitchExpression = new Rexjs(SwitchExpression, ConditionalExpression);

	SwitchExpression.props({
		body: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 添加 switch 关键字
			contentBuilder.appendContext(this.context);

			// 提取条件
			this.condition.extractTo(contentBuilder);
			// 提取主体
			this.body.extractTo(contentBuilder);
		},
		hasDefault: false,
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} value - 状态
		 */
		set state(value){}
	});

	return SwitchExpression;
}(
	this.ConditionalExpression
);

this.SwitchBodyStatement = function(BlockBodyStatement){
	/**
	 * switch 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SwitchBodyStatement(statements){
		BlockBodyStatement.call(this, statements);
	};
	SwitchBodyStatement = new Rexjs(SwitchBodyStatement, BlockBodyStatement);

	SwitchBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭大括号
			if(
				context.content !== "}"
			){
				parser.error(context);
				return null;
			}

			var statements = this.statements,

				body = (
					// 恢复语句块
						parser.statements = statements.target
					)
					.statement
					.expression
					.body;

			// 设置 inner
			body.inner = statements;
			// 返回结束语句块标签
			return body.open.tag.binding;
		}
	});

	return SwitchBodyStatement;
}(
	this.BlockBodyStatement
);

this.SwitchBodyStatements = function(BlockBodyStatements, SwitchBodyStatement, SwitchVariableCollections){
	/**
	 * switch 主体语句块
	 * @param {ECMAScriptVariableCollections} prevCollections - 可参考的上一个变量名收集器集合
	 */
	function SwitchBodyStatements(prevCollections){
		BlockBodyStatements.call(
			this,
			new SwitchVariableCollections(prevCollections)
		);
	};
	SwitchBodyStatements = new Rexjs(SwitchBodyStatements, BlockBodyStatements);

	SwitchBodyStatements.props({
		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		declareTo: function(){},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new SwitchBodyStatement(this);
		}
	});

	return SwitchBodyStatements;
}(
	this.BlockBodyStatements,
	this.SwitchBodyStatement,
	this.SwitchVariableCollections
);

this.SwitchTag = function(SwitchExpression){
	/**
	 * switch 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function SwitchTag(_type){
		SyntaxTag.call(this, _type);
	};
	SwitchTag = new Rexjs(SwitchTag, SyntaxTag);
	
	SwitchTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /switch/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.switchConditionTags;
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
			statement.expression = new SwitchExpression(context);
		}
	});
	
	return SwitchTag;
}(
	this.SwitchExpression
);

this.OpenSwitchConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * switch 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSwitchConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenSwitchConditionTag = new Rexjs(OpenSwitchConditionTag, OpenParenTag);
	
	OpenSwitchConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeSwitchConditionTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置条件表达式
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenSwitchConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseSwitchConditionTag = function(CloseParenTag){
	/**
	 * switch 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseSwitchConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseSwitchConditionTag = new Rexjs(CloseSwitchConditionTag, CloseParenTag);
	
	CloseSwitchConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.switchBlockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 条件表达式结束
			statement.expression.condition.close = context;
		}
	});
	
	return CloseSwitchConditionTag;
}(
	this.CloseParenTag
);

this.OpenSwitchBodyTag = function(OpenBlockTag, BlockExpression, SwitchBodyStatements){
	/**
	 * switch 主体起始标签
	 */
	function OpenSwitchBodyTag(_type){
		OpenBlockTag.call(this, _type);
	};
	OpenSwitchBodyTag = new Rexjs(OpenSwitchBodyTag, OpenBlockTag);
	
	OpenSwitchBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeSwitchBodyTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openSwitchBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression.body = new BlockExpression(context);

			// 设置当前语句块
			(
				parser.statements = new SwitchBodyStatements(statements.collections)
			)
			// 记录当前语句块
			.target = statements;
		}
	});
	
	return OpenSwitchBodyTag;
}(
	this.OpenBlockTag,
	this.BlockExpression,
	this.SwitchBodyStatements
);

this.CloseSwitchBodyTag = function(CloseBlockTag){
	/**
	 * 结束 switch 主体语句块标签
	 */
	function CloseSwitchBodyTag(_type){
		CloseBlockTag.call(this, _type);
	};
	CloseSwitchBodyTag = new Rexjs(CloseSwitchBodyTag, CloseBlockTag);

	CloseSwitchBodyTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.body.close = context;
		}
	});

	return CloseSwitchBodyTag;
}(
	this.CloseBlockTag
);

closeSwitchConditionTag = new this.CloseSwitchConditionTag();
closeSwitchBodyTag = new this.CloseSwitchBodyTag();

}.call(
	this,
	// closeSwitchConditionTag
	null,
	// closeSwitchBodyTag
	null
);


// case 表达式相关
void function(caseTag, defaultTag, caseValueSeparatorTag){

this.CaseExpression = function(){
	/**
	 * case 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function CaseExpression(context){
		Expression.call(this, context);
	};
	CaseExpression = new Rexjs(CaseExpression, Expression);

	CaseExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 添加 case 关键字
			contentBuilder.appendContext(this.context);
			// 添加空格
			contentBuilder.appendSpace();
			// 提取 value
			this.value.extractTo(contentBuilder);
			// 添加冒号
			contentBuilder.appendContext(this.separator);
			// 提取 case 语句块
			this.statements.extractTo(contentBuilder);
		},
		separator: null,
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} value - 状态
		 */
		set state(value){},
		statements: null,
		value: null
	});

	return CaseExpression;
}();

this.DefaultExpression = function(CaseExpression){
	/**
	 * switch default 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DefaultExpression(context){
		CaseExpression.call(this, context);
	};
	DefaultExpression = new Rexjs(DefaultExpression, CaseExpression);

	DefaultExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 添加 case 关键字
			contentBuilder.appendContext(this.context);
			// 添加冒号
			contentBuilder.appendContext(this.separator);

			// 提取 case 语句块
			this.statements.extractTo(contentBuilder);
		},
		value: null
	});

	return DefaultExpression;
}(
	this.CaseExpression
);

this.CaseValueStatement = function(){
	/**
	 * case 值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CaseValueStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CaseValueStatement = new Rexjs(CaseValueStatement, ECMAScriptStatement);
	
	CaseValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是冒号
			if(
				context.content !== ":"
			){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句
			var caseExpression = this.out();

			// 设置 value
			caseExpression.value = this.expression;
			return caseExpression.context.tag.binding;
		}
	});
	
	return CaseValueStatement;
}();

this.DefaultValueStatement = function(CaseValueStatement){
	/**
	 * default 值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DefaultValueStatement(statements){
		CaseValueStatement.call(this, statements);
	};
	DefaultValueStatement = new Rexjs(DefaultValueStatement, CaseValueStatement);

	DefaultValueStatement.props({
		expression: new DefaultExpression()
	});
	
	return DefaultValueStatement;
}(
	this.CaseValueStatement
);

this.CaseBodyStatement = function(BlockBodyStatement, isCase, isCloseBrace){
	/**
	 * case 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CaseBodyStatement(statements){
		BlockBodyStatement.call(this, statements);
	};
	CaseBodyStatement = new Rexjs(CaseBodyStatement, BlockBodyStatement);
	
	CaseBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			switch(
				context.content
			){
				// 如果是 case 关键字
				case "case":
					return isCase(parser, this, context).case;

				// 如果是 default 关键字
				case "default":
					return isCase(parser, this, context).default;

				// 如果是结束大括号
				case "}":
					isCloseBrace(parser, this.statements);
					return null;

				default:
					return null;
			}
		},
		flow: ECMAScriptStatement.FLOW_LINEAR
	});
	
	return CaseBodyStatement;
}(
	this.BlockBodyStatement,
	// isCase
	function(parser, statement, context){
		var statements = statement.statements, targetStatements = statements.target,
		
			caseExpression = targetStatements.statement.expression;

		// 如果语句可以结束
		if(
			(statement.expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE
		){
			// 设置 case 表达式的 statements
			caseExpression.statements = statements;
			// 恢复语句块
			parser.statements = targetStatements;
			// 创建新语句
			targetStatements.newStatement();
		}
		else {
			parser.error(context);
		}

		// 返回 case 标签
		return caseExpression.context.tag;
	},
	// isCloseBrace
	function(parser, statements){
		(
			// 恢复语句块
			parser.statements = statements.target
		)
		.statement
		.expression
		.statements = statements;
	}
);

this.CaseBodyStatements = function(BlockBodyStatements, CaseBodyStatement){
	/**
	 * case 语句块
	 * @param {ECMAScriptVariableCollections} prevCollections - 可参考的上一个变量名收集器
	 */
	function CaseBodyStatements(prevCollections){
		BlockBodyStatements.call(this, prevCollections);
	};
	CaseBodyStatements = new Rexjs(CaseBodyStatements, BlockBodyStatements);

	CaseBodyStatements.props({
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new CaseBodyStatement(this);
		}
	});

	return CaseBodyStatements;
}(
	this.BlockBodyStatements,
	this.CaseBodyStatement
);

this.CaseTag = function(CaseExpression, CaseValueStatement){
	/**
	 * case 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function CaseTag(_type){
		SyntaxTag.call(this, _type);
	};
	CaseTag = new Rexjs(CaseTag, SyntaxTag);

	CaseTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return caseValueSeparatorTag;
		},
		/**
		 * 获取当前标签标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get case(){
			return caseTag;
		},
		/**
		 * 获取绑定的 defaultTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get default(){
			return defaultTag;
		},
		regexp: /case/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new CaseExpression(context);
			// 设置当前语句
			statements.statement = new CaseValueStatement(statements);
		}
	});

	return CaseTag;
}(
	this.CaseExpression,
	this.CaseValueStatement
);

this.DefaultTag = function(CaseTag, DefaultExpression, DefaultValueStatement){
	/**
	 * switch 语句中的 default 标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultTag(_type){
		CaseTag.call(this, _type);
	};
	DefaultTag = new Rexjs(DefaultTag, CaseTag);

	DefaultTag.props({
		regexp: /default/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagMaps){
			return tagMaps.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var switchExpression = statements.target.statement.expression;

			// 如果已经存在 default 表达式
			if(
				switchExpression.hasDefault
			){
				// 报错
				parser.error(context, ECMAScriptErrors.DEFAULT_CLAUSE);
				return;
			}

			// 设置当前表达式
			statement.expression = new DefaultExpression(context);
			// 设置当前语句
			statements.statement = new DefaultValueStatement(statements);
			// 设置 hasDefault
			switchExpression.hasDefault = true;
		}
	});

	return DefaultTag;
}(
	this.CaseTag,
	this.DefaultExpression,
	this.DefaultValueStatement
);

this.CaseValueSeparatorTag = function(ColonTag, CaseBodyStatements){
	/**
	 * case 值的分隔符标签，即 case 对应的冒号
	 * @param {Number} _type - 标签类型
	 */
	function CaseValueSeparatorTag(_type){
		ColonTag.call(this, _type);
	};
	CaseValueSeparatorTag = new Rexjs(CaseValueSeparatorTag, ColonTag);

	CaseValueSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 separator
			statement.expression.separator = context;

			// 设置当前语句块
			(
				parser.statements = new CaseBodyStatements(statements.collections)
			)
			// 设置 target
			.target = statements;
		}
	});

	return CaseValueSeparatorTag;
}(
	this.ColonTag,
	this.CaseBodyStatements
);

caseTag = new this.CaseTag();
defaultTag = new this.DefaultTag();
caseValueSeparatorTag = new this.CaseValueSeparatorTag();

}.call(
	this,
	// caseTag
	null,
	// defaultTag
	null,
	// caseValueSeparatorTag
	null
);


// 辅助性的标签列表相关
void function(SyntaxTags){

this.OnlyStatementEndTags = function(LastStatementEndTag, StatementBreakTag, StatementEndTag){
	/**
	 * 只有语句结束符的标签列表
	 */
	function OnlyStatementEndTags(){
		SyntaxTags.call(this);

		this.register(
			new LastStatementEndTag(),
			new StatementBreakTag(),
			new StatementEndTag()
		);
	};
	OnlyStatementEndTags = new Rexjs(OnlyStatementEndTags, SyntaxTags);

	return OnlyStatementEndTags;
}(
	this.LastStatementEndTag,
	this.StatementBreakTag,
	this.StatementEndTag
);

}.call(
	this,
	Rexjs.SyntaxTags
);


// ECMAScript 标签列表相关
void function(){

this.ECMAScriptTags = function(DefaultTags, list){
	/**
	 * ECMAScript 标签列表
	 * @param {Number} _type - 该标签列表中，所有标签的初始化类型
	 */
	function ECMAScriptTags(_type){
		DefaultTags.call(this);

		// 遍历列表
		list.forEach(
			function(SyntaxTag){
				// 注册标签
				this.register(
					// 实例化标签
					new SyntaxTag(_type || TYPE_UNEXPECTED)
				);
			},
			this
		);
	};
	ECMAScriptTags = new Rexjs(ECMAScriptTags, DefaultTags);
	
	return ECMAScriptTags;
}(
	Rexjs.DefaultTags,
	// list
	[
		this.ArrowTag,
		this.BasicAssignmentTag,
		this.BitwiseANDTag,
		this.BitwiseNOTTag,
		this.BitwiseORTag,
		this.BitwiseXORTag,
		this.BooleanTag,
		this.BreakTag,
		this.CaseTag,
		this.CatchTag,
		this.CloseBraceTag,
		this.CloseBracketTag,
		this.CloseParenTag,
		this.ColonTag,
		this.CommaTag,
		this.ConstTag,
		this.ContinueTag,
		this.DebuggerTag,
		this.DefaultTag,
		this.DecrementTag,
		this.DeleteTag,
		this.DivisionTag,
		this.DoTag,
		this.DotAccessorTag,
		this.ElseTag,
		this.EmptyStatementTag,
		this.EqualityTag,
		this.FileEndTag,
		this.FinallyTag,
		this.ForTag,
		this.FunctionDeclarationTag,
		this.GreaterThanOrEqualTag,
		this.GreaterThanTag,
		this.IdentityTag,
		this.IfTag,
		this.InTag,
		this.IncrementTag,
		this.InequalityTag,
		this.InstanceofTag,
		this.LabelTag,
		this.LeftShiftTag,
		this.LessThanOrEqualTag,
		this.LessThanTag,
		this.LetTag,
		this.LogicalANDTag,
		this.LogicalNOTTag,
		this.LogicalORTag,
		this.MultiplicationTag,
		this.NegationTag,
		this.NewTag,
		this.NonidentityTag,
		this.NullTag,
		this.NumberTag,
		this.OpenArrayTag,
		this.OpenBlockTag,
		this.OpenGroupingTag,
		this.OpenMultiLineCommentTag,
		this.PlusTag,
		this.QuestionTag,
		this.RegExpTag,
		this.RemainderTag,
		this.ReturnTag,
		this.RightShiftTag,
		this.ShorthandAssignmentTag,
		this.SingleLineCommentTag,
		this.SpreadTag,
		this.StringTag,
		this.SwitchTag,
		this.ThisTag,
		this.ThrowTag,
		this.TryTag,
		this.TypeofTag,
		this.VarTag,
		this.VoidTag,
		this.WhileTag,
		this.WithTag
	]
);
	
}.call(
	this
);


// 基类标签列表相关
void function(ECMAScriptTags, OnlyStatementEndTags){

this.ExpressionTags = function(FunctionTag, OpenObjectTag, VariableTag){
	/**
	 * 表达式标签列表
	 */
	function ExpressionTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new FunctionTag(),
			new VariableTag(),
			new OpenObjectTag()
		);
	};
	ExpressionTags = new Rexjs(ExpressionTags, ECMAScriptTags);
	
	ExpressionTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是表达式标签
			if(
				tag.class.expression
			){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
			}
			
			return false;
		},
		id: "expressionTags"
	});
	
	return ExpressionTags;
}(
	this.FunctionTag,
	this.OpenObjectTag,
	this.VariableTag
);

this.ExpressionContextTags = function(AdditionTag, BinaryTag, CommaTag, ExpressionBreakTag, OpenBracketAccessorTag, OpenCallTag, PostfixIncrementTag, QuestionTag, SubtractionTag){
	/**
	 * 表达式上下文标签列表
	 */
	function ExpressionContextTags(){
		ECMAScriptTags.call(this);
		
		// 注册标签
		this.register(
			new AdditionTag(),
			new ExpressionBreakTag(),
			new OnlyStatementEndTags(),
			new OpenBracketAccessorTag(),
			new OpenCallTag(),
			new PostfixIncrementTag(),
			new SubtractionTag()
		);
	};
	ExpressionContextTags = new Rexjs(ExpressionContextTags, ECMAScriptTags);
	
	ExpressionContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			var tagClass = tag.class

			switch(
				true
			){
				// 如果是表达式上下文标签
				case tagClass.expressionContext:
				// 如果是语句标签
				case tagClass.statementBegin:
					// 重新绑定类型
					tag.type = new TagType(TYPE_MISTAKABLE);
					break;
			}

			return false;
		},
		id: "expressionContextTags"
	});
	
	return ExpressionContextTags;
}(
	this.AdditionTag,
	this.BinaryTag,
	this.CommaTag,
	this.ExpressionBreakTag,
	this.OpenBracketAccessorTag,
	this.OpenCallTag,
	this.PostfixIncrementTag,
	this.QuestionTag,
	this.SubtractionTag
);

this.StatementTags = function(FileEndTag){
	/**
	 * 语句标签列表
	 */
	function StatementTags(){
		ECMAScriptTags.call(this);
	};
	StatementTags = new Rexjs(StatementTags, ECMAScriptTags);
	
	StatementTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(
				tag.class.statementBegin
			){
				// 设置标签类型
				tag.type = new TagType(
					tag instanceof FileEndTag ? TYPE_MISTAKABLE : TYPE_MATCHABLE
				);
			}
			
			return false;
		},
		id: "statementTags"
	});
	
	return StatementTags;
}(
	this.FileEndTag
);

this.StatementEndTags = function(){
	/**
	 * 语句结束标签列表
	 */
	function StatementEndTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new OnlyStatementEndTags()
		);
	};
	StatementEndTags = new Rexjs(StatementEndTags, ECMAScriptTags);
	
	StatementEndTags.props({
		id: "statementEndTags"
	});
	
	return StatementEndTags;
}();

this.MistakableTags = function(StatementTags){
	/**
	 * 可能被误解的标签列表
	 */
	function MistakableTags(){
		StatementTags.call(this);
	};
	MistakableTags = new Rexjs(MistakableTags, StatementTags);
	
	MistakableTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(
				tag.class.statementBegin
			){
				// 设置类型
				tag.type = new TagType(TYPE_MISTAKABLE);
			}
			
			return false;
		},
		id: "mistakableTags"
	});
	
	return MistakableTags;
}(
	this.StatementTags
);

this.IllegalTags = function(TYPE_ILLEGAL){
	/**
	 * 非法标签列表
	 */
	function IllegalTags(){
		ECMAScriptTags.call(this, TYPE_ILLEGAL);
	};
	IllegalTags = new Rexjs(IllegalTags, ECMAScriptTags);

	IllegalTags.props({
		id: "illegalTags"
	});

	return IllegalTags;
}(
	TagType.TYPE_ILLEGAL
);

}.call(
	this,
	this.ECMAScriptTags,
	this.OnlyStatementEndTags
);


// 其他标签列表
void function(ECMAScriptTags, ExpressionTags, ExpressionContextTags, MistakableTags, StatementTags, StatementEndTags, IllegalTags){

this.ArgumentNameContextTags = function(ArgumentAssignmentTag){
	/**
	 * 参数名上下文标签列表
	 */
	function ArgumentNameContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new ArgumentAssignmentTag()
		);
	};
	ArgumentNameContextTags = new Rexjs(ArgumentNameContextTags, ECMAScriptTags);

	ArgumentNameContextTags.props({
		id: "argumentNameContextTags"
	});
	
	return ArgumentNameContextTags;
}(
	this.ArgumentAssignmentTag
);

this.ArgumentSeparatorContextTags = function(ArgumentNameTag, RestTag){
	/**
	 * 参数分隔符上下文标签列表
	 */
	function ArgumentSeparatorContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ArgumentNameTag(),
			new RestTag()
		);
	};
	ArgumentSeparatorContextTags = new Rexjs(ArgumentSeparatorContextTags, IllegalTags);

	ArgumentSeparatorContextTags.props({
		id: "argumentSeparatorContextTags"
	});
	
	return ArgumentSeparatorContextTags;
}(
	this.ArgumentNameTag,
	this.RestTag
);

this.ArrowContextTags = function(OpenArrowFunctionBodyTag){
	/**
	 * 箭头上下文标签
	 */
	function ArrowContextTags(){
		ExpressionTags.call(this);

		this.register(
			new OpenArrowFunctionBodyTag()
		);
	};
	ArrowContextTags = new Rexjs(ArrowContextTags, ExpressionTags);

	ArrowContextTags.props({
		id: "arrowContextTags"
	});

	return ArrowContextTags;
}(
	this.OpenArrowFunctionBodyTag
);

this.BlockTags = function(OpenBlockTag){
	/**
	 * 语句块标签列表
	 */
	function BlockTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenBlockTag()
		);
	};
	BlockTags = new Rexjs(BlockTags, IllegalTags);

	BlockTags.props({
		id: "blockTags"
	});
	
	return BlockTags;
}(
	this.OpenBlockTag
);

this.CatchedExceptionTags = function(OpenCatchedExceptionTag){
	/**
	 * 被捕获的异常标签列表
	 */
	function CatchedExceptionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenCatchedExceptionTag()
		);
	};
	CatchedExceptionTags = new Rexjs(CatchedExceptionTags, IllegalTags);
	
	CatchedExceptionTags.props({
		id: "catchedExceptionTags"
	});

	return CatchedExceptionTags;
}(
	this.OpenCatchedExceptionTag
);

this.CloseArrowFunctionBodyContextTags = function(CommaTag, filter){
	/**
	 * 结束箭头函数主体上下文标签列表
	 */
	function CloseArrowFunctionBodyContextTags(){
		MistakableTags.call(this);
	};
	CloseArrowFunctionBodyContextTags = new Rexjs(CloseArrowFunctionBodyContextTags, MistakableTags);
	
	CloseArrowFunctionBodyContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是逗号
			if(
				tag instanceof CommaTag
			){
				// 设置类型
				tag.type = new TagType(TYPE_MISTAKABLE);
				return false;
			}

			return filter.call(this, tag);
		},
		id: "closeArrowFunctionBodyContextTags"
	});

	return CloseArrowFunctionBodyContextTags;
}(
	this.CommaTag,
	MistakableTags.prototype.filter
);

this.CloseCatchedExceptionTags = function(CloseCatchedExceptionTag){
	/**
	 * 被捕获的异常结束标签标签列表
	 */
	function CloseCatchedExceptionTags(){
		IllegalTags.call(this);
		
		this.register(
			new CloseCatchedExceptionTag()
		);
	};
	CloseCatchedExceptionTags = new Rexjs(CloseCatchedExceptionTags, IllegalTags);
	
	CloseCatchedExceptionTags.props({
		id: "closeCatchedExceptionTags"
	});

	return CloseCatchedExceptionTags;
}(
	this.CloseCatchedExceptionTag
);

this.ClosureVariableContextTags = function(BasicAssignmentTag, IllegalShorthandAssignmentTag){
	/**
	 * 闭包内变量上下文标签列表
	 */
	function ClosureVariableContextTags(){
		StatementEndTags.call(this);

		this.register(
			new IllegalShorthandAssignmentTag()
		);
	};
	ClosureVariableContextTags = new Rexjs(ClosureVariableContextTags, StatementEndTags);

	ClosureVariableContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是赋值标签
			if(
				tag instanceof BasicAssignmentTag
			){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
			}
			
			return false;
		},
		id: "closureVariableContextTags"
	})
	
	return ClosureVariableContextTags;
}(
	this.BasicAssignmentTag,
	this.IllegalShorthandAssignmentTag
);

this.CommentContextTags = function(LineTerminatorTag, CommentContentTag, CloseMultiLineCommentTag){
	/**
	 * 注释上下文标签列表
	 */
	function CommentContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new LineTerminatorTag(),
			new CommentContentTag(),
			new CloseMultiLineCommentTag()
		);
	};
	CommentContextTags = new Rexjs(CommentContextTags, IllegalTags);

	CommentContextTags.props({
		id: "commentContextTags"
	});
	
	return CommentContextTags;
}(
	Rexjs.LineTerminatorTag,
	this.CommentContentTag,
	this.CloseMultiLineCommentTag
);

this.ConstContextTags = function(ConstVariableTag){
	/**
	 * const 关键字上下文标签列表
	 */
	function ConstContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ConstVariableTag()
		);
	};
	ConstContextTags = new Rexjs(ConstContextTags, IllegalTags);

	ConstContextTags.props({
		id: "constContextTags"
	});
	
	return ConstContextTags;
}(
	this.ConstVariableTag
);

this.DoWhileConditionTags = function(OpenDoWhileConditionTag){
	/**
	 * do while 条件标签列表
	 */
	function DoWhileConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenDoWhileConditionTag()
		);
	};
	DoWhileConditionTags = new Rexjs(DoWhileConditionTags, IllegalTags);
	
	DoWhileConditionTags.props({
		id: "doWhileConditionTags"
	});

	return DoWhileConditionTags;
}(
	this.OpenDoWhileConditionTag
);

this.DotContextTags = function(PropertyNameTag){
	/**
	 * 点属性访问器上下文标签列表
	 */
	function DotContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new PropertyNameTag()
		);
	};
	DotContextTags = new Rexjs(DotContextTags, IllegalTags);
	
	DotContextTags.props({
		id: "dotContextTags"
	});

	return DotContextTags;
}(
	this.PropertyNameTag
);

this.ExceptionVariableTags = function(ExceptionVariableTag){
	/**
	 * catch 语句异常变量标签列表
	 */
	function ExceptionVariableTags(){
		IllegalTags.call(this);
		
		this.register(
			new ExceptionVariableTag()
		);
	};
	ExceptionVariableTags = new Rexjs(ExceptionVariableTags, IllegalTags);

	ExceptionVariableTags.props({
		id: "exceptionVariableTags"
	});
	
	return ExceptionVariableTags;
}(
	this.ExceptionVariableTag
);

this.FileStartTags = function(FileStartTag){
	/**
	 * 文件起始标签列表
	 */
	function FileStartTags(){
		IllegalTags.call(this);
		
		this.register(
			new FileStartTag()
		);
	};
	FileStartTags = new Rexjs(FileStartTags, IllegalTags);
	
	FileStartTags.props({
		entrance: true,
		id: "fileStartTags"
	});
	
	return FileStartTags;
}(
	this.FileStartTag
);

this.ForConditionTags = function(OpenForConditionTag){
	/**
	 * for 条件标签列表
	 */
	function ForConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenForConditionTag()
		);
	};
	ForConditionTags = new Rexjs(ForConditionTags, IllegalTags);

	ForConditionTags.props({
		id: "forConditionTags"
	});
	
	return ForConditionTags;
}(
	this.OpenForConditionTag
);

this.ForConditionContextTags = function(VarTag){
	/**
	 * for 条件上下文标签列表
	 */
	function ForConditionTags(){
		ExpressionTags.call(this);
	};
	ForConditionTags = new Rexjs(ForConditionTags, ExpressionTags);

	ForConditionTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(
				tag instanceof VarTag
			){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
			}
			
			return false;
		},
		id: "forConditionContextTags"
	});
	
	return ForConditionTags;
}(
	this.VarTag
);

this.FunctionArgumentTags = function(OpenArgumentsTag){
	/**
	 * 函数参数标签列表
	 */
	function FunctionArgumentTags(){
		IllegalTags.call(this);

		this.register(
			new OpenArgumentsTag()
		);
	};
	FunctionArgumentTags = new Rexjs(FunctionArgumentTags, IllegalTags);

	FunctionArgumentTags.props({
		id: "functionArgumentTags"
	});

	return FunctionArgumentTags;
}(
	this.OpenArgumentsTag
);

this.FunctionBodyTags = function(OpenFunctionBodyTag){
	/**
	 * 函数主体标签列表
	 */
	function FunctionBodyTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenFunctionBodyTag()
		);
	};
	FunctionBodyTags = new Rexjs(FunctionBodyTags, IllegalTags);

	FunctionBodyTags.props({
		id: "functionBodyTags"
	});
	
	return FunctionBodyTags;
}(
	this.OpenFunctionBodyTag
);

this.FunctionContextTags = function(FunctionNameTag, OpenArgumentsTag){
	/**
	 * 函数关键字上下文标签列表
	 */
	function FunctionContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new FunctionNameTag(),
			new OpenArgumentsTag()
		);
	};
	FunctionContextTags = new Rexjs(FunctionContextTags, IllegalTags);

	FunctionContextTags.props({
		id: "functionContextTags"
	});
	
	return FunctionContextTags;
}(
	this.FunctionNameTag,
	this.OpenArgumentsTag
);

this.FunctionDeclarationContextTags = function(FunctionContextTags, FunctionVariableTag, OpenArgumentsTag){
	/**
	 * 函数声明上下文标签列表
	 */
	function FunctionDeclarationContextTags(){
		FunctionContextTags.call(this);

		this.register(
			new FunctionVariableTag()
		);
	};
	FunctionDeclarationContextTags = new Rexjs(FunctionDeclarationContextTags, FunctionContextTags);

	FunctionDeclarationContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是起始参数标签，则过滤掉
			return tag instanceof OpenArgumentsTag;
		},
		id: "functionDeclarationContextTags"
	});
	
	return FunctionDeclarationContextTags;
}(
	this.FunctionContextTags,
	this.FunctionVariableTag,
	this.OpenArgumentsTag
);

this.IfConditionTags = function(OpenIfConditionTag){
	/**
	 * if 条件标签列表
	 */
	function IfConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenIfConditionTag()
		);
	};
	IfConditionTags = new Rexjs(IfConditionTags, IllegalTags);

	IfConditionTags.props({
		id: "ifConditionTags"
	});
	
	return IfConditionTags;
}(
	this.OpenIfConditionTag
);

this.LabelContextTags = function(LabelColonTag){
	/**
	 * 标记标签上下文列表
	 */
	function LabelContextTags(){
		ExpressionContextTags.call(this);
		
		this.register(
			new LabelColonTag()
		);
	};
	LabelContextTags = new Rexjs(LabelContextTags, ExpressionContextTags);

	LabelContextTags.props({
		id: "labelContextTags"
	});
	
	return LabelContextTags;
}(
	this.LabelColonTag
);

this.LetContextTags = function(LocalVariableTag){
	/**
	 * let 关键字上下文标签列表
	 */
	function LetContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new LocalVariableTag()
		);
	};
	LetContextTags = new Rexjs(LetContextTags, IllegalTags);

	LetContextTags.props({
		id: "letContextTags"
	});
	
	return LetContextTags;
}(
	this.LocalVariableTag
);

this.NegationContextTags = function(NegationSiblingTag, DecrementSiblingTag){
	/**
	 * 正号上下文标签列表
	 */
	function NegationContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new NegationSiblingTag(),
			new DecrementSiblingTag()
		);
	};
	NegationContextTags = new Rexjs(NegationContextTags, ExpressionTags);

	NegationContextTags.props({
		id: "negationContextTags"
	});
	
	return NegationContextTags;
}(
	this.NegationSiblingTag,
	this.DecrementSiblingTag
);

this.NewContextTags = function(UnaryTag, NewTag, filter){
	/**
	 * 语句块起始上下文标签列表
	 */
	function NewContextTags(){
		ExpressionTags.call(this);
	};
	NewContextTags = new Rexjs(NewContextTags, ExpressionTags);
	
	NewContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是一元标签
			if(
				tag instanceof UnaryTag
			){
				// 如果是 new 关键字标签
				if(
					tag instanceof NewTag
				){
					// 设置为可匹配
					tag.type = new TagType(TYPE_MATCHABLE);
				}
				
				return false;
			}
			
			return filter.call(this, tag);
		},
		id: "newContextTags"
	});
	
	return NewContextTags;
}(
	this.UnaryTag,
	this.NewTag,
	this.ExpressionTags.prototype.filter
);

this.ObjectNameContextTags = function(OpenShorthandMethodTag, ObjectNameSeparatorTag){
	/**
	 * 对象名称上下文标签列表
	 */
	function ObjectNameContextTags(){
		IllegalTags.call(this);

		this.register(
			new OpenShorthandMethodTag(),
			new ObjectNameSeparatorTag()
		);
	};
	ObjectNameContextTags = new Rexjs(ObjectNameContextTags, IllegalTags);

	ObjectNameContextTags.props({
		id: "objectNameContextTags"
	});

	return ObjectNameContextTags;
}(
	this.OpenShorthandMethodTag,
	this.ObjectNameSeparatorTag
);

this.ObjectIdentifierNameContextTags = function(ObjectNameContextTags, ShorthandItemSeparatorTag, CloseObjectTag){
	/**
	 * 对象标识符名称上下文标签列表
	 */
	function ObjectIdentifierNameContextTags(){
		ObjectNameContextTags.call(this);

		this.register(
			new ShorthandItemSeparatorTag(),
			new CloseObjectTag(TYPE_UNEXPECTED)
		);
	};
	ObjectIdentifierNameContextTags = new Rexjs(ObjectIdentifierNameContextTags, ObjectNameContextTags);

	ObjectIdentifierNameContextTags.props({
		id: "objectIdentifierNameContextTags"
	});

	return ObjectIdentifierNameContextTags;
}(
	this.ObjectNameContextTags,
	this.ShorthandItemSeparatorTag,
	this.CloseObjectTag
);

this.ObjectNameTags = function(CloseObjectTag, ObjectIdentifierNameTag, ObjectNumberNameTag, ObjectPropertyNameTag, ObjectStringNameTag, OpenObjectComputedNameTag, GetTag, SetTag){
	/**
	 * 对象名称标签列表
	 */
	function ObjectNameTags(){
		IllegalTags.call(this);

		this.register(
			new CloseObjectTag(TYPE_UNEXPECTED),
			new ObjectIdentifierNameTag(),
			new ObjectNumberNameTag(),
			new ObjectPropertyNameTag(),
			new ObjectStringNameTag(),
			new OpenObjectComputedNameTag(),
			new GetTag(),
			new SetTag()
		);
	};
	ObjectNameTags = new Rexjs(ObjectNameTags, IllegalTags);

	ObjectNameTags.props({
		id: "objectNameTags"
	});

	return ObjectNameTags;
}(
	this.CloseObjectTag,
	this.ObjectIdentifierNameTag,
	this.ObjectNumberNameTag,
	this.ObjectPropertyNameTag,
	this.ObjectStringNameTag,
	this.OpenObjectComputedNameTag,
	this.GetTag,
	this.SetTag
);

this.AccessorContextTags = function(ObjectNameTags, OpenShorthandMethodTag, ObjectNameSeparatorTag, ShorthandItemSeparatorTag, PropertyAccessorTag){
	/**
	 * 属性访问器上下文标签列表
	 */
	function AccessorContextTags(){
		ObjectNameTags.call(this);
		
		this.register(
			new OpenShorthandMethodTag(),
			new ObjectNameSeparatorTag(),
			new ShorthandItemSeparatorTag()
		);
	};
	AccessorContextTags = new Rexjs(AccessorContextTags, ObjectNameTags);

	AccessorContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是访问器标签，则过滤掉
			return tag instanceof PropertyAccessorTag;
		},
		id: "accessorContextTags"
	});
	
	return AccessorContextTags;
}(
	this.ObjectNameTags,
	this.OpenShorthandMethodTag,
	this.ObjectNameSeparatorTag,
	this.ShorthandItemSeparatorTag,
	this.PropertyAccessorTag
);

this.OpenArgumentsContextTags = function(ArgumentSeparatorContextTags, CloseArgumentsTag){
	/**
	 * 参数起始上下文标签列表
	 */
	function OpenArgumentsContextTags(){
		ArgumentSeparatorContextTags.call(this);
		
		this.register(
			new CloseArgumentsTag()
		);
	};
	OpenArgumentsContextTags = new Rexjs(OpenArgumentsContextTags, ArgumentSeparatorContextTags);

	OpenArgumentsContextTags.props({
		id: "openArgumentsContextTags"
	});
	
	return OpenArgumentsContextTags;
}(
	this.ArgumentSeparatorContextTags,
	this.CloseArgumentsTag
);

this.OpenGroupingContextTags = function(IllegibleRestTag){
	/**
	 * 起始分组小括号上下文标签列表
	 */
	function OpenGroupingContextTags(){
		ExpressionTags.call(this);

		this.register(
			new IllegibleRestTag()
		);
	};
	OpenGroupingContextTags = new Rexjs(OpenGroupingContextTags, ExpressionTags);

	OpenGroupingContextTags.props({
		id: "openGroupingContextTags"
	});

	return OpenGroupingContextTags;
}(
	this.IllegibleRestTag
);

this.OpenSwitchBodyContextTags = function(CaseTag, DefaultTag, CloseBlockTag){
	/**
	 * switch 语句块起始上下文标签列表
	 */
	function OpenSwitchBodyContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new CaseTag(),
			new DefaultTag(),
			new CloseBlockTag(TYPE_UNEXPECTED)
		);
	};
	OpenSwitchBodyContextTags = new Rexjs(OpenSwitchBodyContextTags, IllegalTags);

	OpenSwitchBodyContextTags.props({
		id: "openSwitchBodyContextTags"
	});
	
	return OpenSwitchBodyContextTags;
}(
	this.CaseTag,
	this.DefaultTag,
	this.CloseBlockTag
);

this.ParameterTags = function(SpreadTag){
	/**
	 * 函数调用参数标签列表
	 */
	function ParameterTags(){
		ExpressionTags.call(this);
		
		this.register(
			new SpreadTag()
		);
	};
	ParameterTags = new Rexjs(ParameterTags, ExpressionTags);

	ParameterTags.props({
		id: "parameterTags"
	});
	
	return ParameterTags;
}(
	this.SpreadTag
);

this.PlusContextTags = function(PlusSiblingTag, IncrementSiblingTag){
	/**
	 * 正号上下文标签列表
	 */
	function PlusContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new PlusSiblingTag(),
			new IncrementSiblingTag()
		);
	};
	PlusContextTags = new Rexjs(PlusContextTags, ExpressionTags);

	PlusContextTags.props({
		id: "plusContextTags"
	});
	
	return PlusContextTags;
}(
	this.PlusSiblingTag,
	this.IncrementSiblingTag
);

this.RestArgumentNameTags = function(RestArgumentNameTag){
	/**
	 * 省略参数名标签列表
	 */
	function RestArgumentNameTags(){
		IllegalTags.call(this);
		
		this.register(
			new RestArgumentNameTag()
		);
	};
	RestArgumentNameTags = new Rexjs(RestArgumentNameTags, IllegalTags);

	RestArgumentNameTags.props({
		id: "restArgumentNameTags"
	});
	
	return RestArgumentNameTags;
}(
	this.RestArgumentNameTag
);

this.RestArgumentNameContextTags = function(RestArgumentSeparatorTag){
	/**
	 * 省略参数名上下文标签列表
	 */
	function RestArgumentNameContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new RestArgumentSeparatorTag()
		);
	};
	RestArgumentNameContextTags = new Rexjs(RestArgumentNameContextTags, ECMAScriptTags);

	RestArgumentNameContextTags.props({
		id: "restArgumentNameContextTags"
	});
	
	return RestArgumentNameContextTags;
}(
	this.RestArgumentSeparatorTag
);

this.ReturnContextTags = function(OnlyStatementEndTags){
	/**
	 * return 上下文标签列表
	 */
	function ReturnContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new OnlyStatementEndTags()
		);
	};
	ReturnContextTags = new Rexjs(ReturnContextTags, ExpressionTags);

	ReturnContextTags.props({
		id: "returnContextTags"
	})
	
	return ReturnContextTags;
}(
	this.OnlyStatementEndTags
);

this.SwitchBlockTags = function(OpenSwitchBodyTag){
	/**
	 * switch 语句块标签列表
	 */
	function SwitchBlockTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenSwitchBodyTag()
		);
	};
	SwitchBlockTags = new Rexjs(SwitchBlockTags, IllegalTags);

	SwitchBlockTags.props({
		id: "switchBlockTags"
	});
	
	return SwitchBlockTags;
}(
	this.OpenSwitchBodyTag
);

this.SwitchConditionTags = function(OpenSwitchConditionTag){
	/**
	 * switch 条件标签列表
	 */
	function SwitchConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenSwitchConditionTag()
		);
	};
	SwitchConditionTags = new Rexjs(SwitchConditionTags, IllegalTags);

	SwitchConditionTags.props({
		id: "switchConditionTags"
	});
	
	return SwitchConditionTags;
}(
	this.OpenSwitchConditionTag
);

this.TerminatedBranchFlowContextTags = function(LabelledIdentifierTag){
	/**
	 * 中断分支流上下文标签列表
	 */
	function TerminatedBranchFlowContextTags(){
		StatementEndTags.call(this);
		
		this.register(
			new LabelledIdentifierTag()
		);
	};
	TerminatedBranchFlowContextTags = new Rexjs(TerminatedBranchFlowContextTags, StatementEndTags);

	TerminatedBranchFlowContextTags.props({
		id: "terminatedBranchFlowContextTags"
	});
	
	return TerminatedBranchFlowContextTags;
}(
	this.LabelledIdentifierTag
);

this.ThrowContextTags = function(ThrowContextLineTerminatorTag){
	/**
	 * throw 关键字上下文标签
	 */
	function ThrowContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new ThrowContextLineTerminatorTag()
		);
	};
	ThrowContextTags = new Rexjs(ThrowContextTags, ExpressionTags);

	ThrowContextTags.props({
		id: "throwContextTags"
	});
	
	return ThrowContextTags;
}(
	this.ThrowContextLineTerminatorTag
);

this.UnexpectedTags = function(){
	/**
	 * 未捕获的标签列表
	 */
	function UnexpectedTags(){
		ECMAScriptTags.call(this);
	};
	UnexpectedTags = new Rexjs(UnexpectedTags, ECMAScriptTags);

	UnexpectedTags.props({
		id: "unexpectedTags"
	});

	return UnexpectedTags;
}();

this.VarContextTags = function(ClosureVariableTag){
	/**
	 * var 关键字上下文标签列表
	 */
	function VarContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ClosureVariableTag()
		);
	};
	VarContextTags = new Rexjs(VarContextTags, IllegalTags);

	VarContextTags.props({
		id: "varContextTags"
	});
	
	return VarContextTags;
}(
	this.ClosureVariableTag
);

this.WhileConditionTags = function(OpenWhileConditionTag){
	/**
	 * while 条件标签列表
	 */
	function WhileConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenWhileConditionTag()
		);
	};
	WhileConditionTags = new Rexjs(WhileConditionTags, IllegalTags);

	WhileConditionTags.props({
		id: "whileConditionTags"
	});
	
	return WhileConditionTags;
}(
	this.OpenWhileConditionTag
);

}.call(
	this,
	this.ECMAScriptTags,
	this.ExpressionTags,
	this.ExpressionContextTags,
	this.MistakableTags,
	this.StatementTags,
	this.StatementEndTags,
	this.IllegalTags
);


// 语法配置相关
void function(){

this.ECMAScript6Config = function(forConfig, functionConfig, objectConfig, callConfig, varConfig){
	/**
	 * ECMAScript6 语法配置
	 */
	function ECMAScript6Config(){
		SyntaxConfig.call(this);
	};
	ECMAScript6Config = new Rexjs(ECMAScript6Config, SyntaxConfig);

	ECMAScript6Config.static({
		/**
		 * 获取是否应该编译 ECMAScript6 的所有表达式
		 */
		get all(){
			return (
				this.defaultArgument &&
				this.forOf &&
				this.restArgument &&
				this.shorthandProperty &&
				this.spread &&
				this.let &&
				this.const &&
				this.arrowFunction
			);
		},
		/**
		 * 设置是否应该编译 ECMAScript6 的所有表达式
		 * @param {Boolean} value - 是否编译
		 */
		set all(value){
			this.defaultArgument =
			this.forOf =
			this.restArgument =
			this.shorthandProperty = 
			this.spread =
			this.let =
			this.const =
			this.arrowFunction = value;
		},
		/**
		 * 获取箭头函数是否应该编译
		 */
		get arrowFunction(){
			return functionConfig.arrowFunction;
		},
		/**
		 * 设置箭头函数是否应该编译
		 * @param {Boolean} value - 是否编译
		 */
		set arrowFunction(value){
			functionConfig.arrowFunction = value;
		},
		/**
		 * 获取 const 关键字是否应该编译
		 */
		get const(){
			return varConfig.const;
		},
		/**
		 * 设置 const 关键字是否应该编译
		 * @param {Boolean} value - 是否编译
		 */
		set const(value){
			varConfig.const = value;
		},
		/**
		 * 获取默认值参数表达式是否应该编译
		 */
		get defaultArgument(){
			return functionConfig.defaultArgument;
		},
		/**
		 * 设置默认值参数表达式是否应该编译
		 * @param {Boolean} value - 是否编译
		 */
		set defaultArgument(value){
			functionConfig.defaultArgument = value;
		},
		/**
		 * 获取 for of 表达式是否应该编译
		 */
		get forOf(){
			return forConfig.of;
		},
		/**
		 * 设置 for of 表达式是否应该编译
		 * @param {Boolean} value - 是否编译
		 */
		set forOf(value){
			forConfig.of = value;
		},
		/**
		 * 获取 let 关键字是否应该编译
		 */
		get let(){
			return varConfig.let;
		},
		/**
		 * 设置 let 关键字是否应该编译
		 * @param {Boolean} value - 是否编译
		 */
		set let(value){
			varConfig.let = value;
		},
		/**
		 * 获取省略参数表达式是否应该编译
		 */
		get restArgument(){
			return functionConfig.restArgument;
		},
		/**
		 * 设置省略参数表达式是否应该编译
		 * @param {Boolean} value - 是否编译
		 */
		set restArgument(value){
			functionConfig.restArgument = value;
		},
		/**
		 * 获取对象简写名称是否应该编译
		 */
		get shorthandProperty(){
			return objectConfig.shorthandProperty;
		},
		/**
		 * 设置对象简写名称是否应该编译
		 * @param {Boolean} value - 是否编译
		 */
		set shorthandProperty(value){
			objectConfig.shorthandProperty = value;
		},
		/**
		 * 获取拓展符是否应该编译
		 */
		get spread(){
			return callConfig.spread;
		},
		/**
		 * 设置拓展符是否应该编译
		 * @param {Boolean} value - 是否编译
		 */
		set spread(value){
			callConfig.spread = value;
		}
	});

	return ECMAScript6Config;
}(
	// forConfig
	this.ForExpression.config,
	// functionConfig
	this.FunctionExpression.config,
	// objectConfig
	this.ObjectExpression.config,
	// callConfig
	this.CallExpression.config,
	// varConfig
	this.VarExpression.config
);

}.call(
	this
);


// ECMAScript 解析器相关
void function(SyntaxParser){

this.ECMAScriptTagsMap = function(SyntaxTagsMap, tagsArray){
	/**
	 * ECMAScript 标签列表映射，初始化该类是个耗性能过程，建议作为单例使用
	 */
	function ECMAScriptTagsMap(){
		SyntaxTagsMap.call(this);
		
		tagsArray.forEach(
			function(Tags){
				this.map(
					new Tags()
				);
			},
			this
		);
	};
	ECMAScriptTagsMap = new Rexjs(ECMAScriptTagsMap, SyntaxTagsMap);
	
	return ECMAScriptTagsMap;
}(
	Rexjs.SyntaxTagsMap,
	// tagsArray
	[
		// 基类标签列表
		this.ExpressionTags,
		this.ExpressionContextTags,
		this.MistakableTags,
		this.IllegalTags,
		this.StatementTags,
		this.StatementEndTags,
		// 其他标签列表
		this.AccessorContextTags,
		this.ArgumentNameContextTags,
		this.ArgumentSeparatorContextTags,
		this.ArrowContextTags,
		this.BlockTags,
		this.CatchedExceptionTags,
		this.CloseArrowFunctionBodyContextTags,
		this.CloseCatchedExceptionTags,
		this.ClosureVariableContextTags,
		this.CommentContextTags,
		this.ConstContextTags,
		this.DoWhileConditionTags,
		this.DotContextTags,
		this.ExceptionVariableTags,
		this.FileStartTags,
		this.ForConditionTags,
		this.ForConditionContextTags,
		this.FunctionArgumentTags,
		this.FunctionBodyTags,
		this.FunctionContextTags,
		this.FunctionDeclarationContextTags,
		this.IfConditionTags,
		this.LabelContextTags,
		this.LetContextTags,
		this.NegationContextTags,
		this.NewContextTags,
		this.ObjectIdentifierNameContextTags,
		this.ObjectNameContextTags,
		this.ObjectNameTags,
		this.OpenArgumentsContextTags,
		this.OpenGroupingContextTags,
		this.OpenSwitchBodyContextTags,
		this.ParameterTags,
		this.PlusContextTags,
		this.RestArgumentNameTags,
		this.RestArgumentNameContextTags,
		this.ReturnContextTags,
		this.SwitchBlockTags,
		this.SwitchConditionTags,
		this.TerminatedBranchFlowContextTags,
		this.ThrowContextTags,
		this.UnexpectedTags,
		this.VarContextTags,
		this.WhileConditionTags
	]
);

this.ECMAScriptParser = function(ECMAScriptTagsMap, GlobalStatements, tagsMap, parse){
	/**
	 * ECMAScript 语法解析器
	 */
	function ECMAScriptParser(){
		SyntaxParser.call(this);
	};
	ECMAScriptParser = new Rexjs(ECMAScriptParser, SyntaxParser);

	ECMAScriptParser.props({
		/**
		 * 将解析后的语法生成字符串
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 */
		build: function(_contentBuilder){
			var contentBuilder = _contentBuilder || new ContentBuilder();
			
			// 追加闭包函数起始部分
			contentBuilder.appendString("void function(){");
			// 创建新行
			contentBuilder.newline();
			// 追加严格表达式字符串
			contentBuilder.appendString('"use strict";');
			// 创建新行
			contentBuilder.newline();

			// 提取语法列表内容
			this.statements.extractTo(contentBuilder);
			
			// 创建新行
			contentBuilder.newline();
			// 追加闭包函数结束部分
			contentBuilder.appendString("}();");

			return contentBuilder.complete();
		},
		/**
		 * 开始解析
		 * @param {File} file - 文件信息
		 */
		parse: function(file){
			parse.call(
				this,
				file,
				/*
					如果 tagsMap 没有初始化，则初始化，
					在这里初始化的目的是为了：
					1. 当不使用 ECMAScriptParser 时，不会耗性能
					2. 就算多次使用 ECMAScriptParser，也不会多次初始化 ECMAScriptTagsMap
				*/
				tagsMap || (tagsMap = new ECMAScriptTagsMap()),
				new GlobalStatements()
			);
		}
	});

	return ECMAScriptParser;
}(
	this.ECMAScriptTagsMap,
	this.GlobalStatements,
	// tagsMap
	null,
	SyntaxParser.prototype.parse
);
	
}.call(
	this,
	Rexjs.SyntaxParser
);

Rexjs.static(this);
}(
	Rexjs,
	Rexjs.ContentBuilder,
	Rexjs.Expression,
	Rexjs.ListExpression,
	Rexjs.EmptyExpression,
	Rexjs.DefaultExpression,
	Rexjs.PartnerExpression,
	Rexjs.LeftHandSideExpression,
	// ECMAScriptErrors
	null,
	// ECMAScriptStatement
	null,
	Rexjs.SyntaxConfig,
	Rexjs.SyntaxTag,
	Rexjs.TagType,
	Rexjs.TagClass.CLASS_STATEMENT_BEGIN,
	Rexjs.TagClass.CLASS_STATEMENT_END,
	Rexjs.TagClass.CLASS_EXPRESSION,
	Rexjs.TagClass.CLASS_EXPRESSION_CONTEXT,
	Rexjs.TagType.TYPE_MATCHABLE,
	Rexjs.TagType.TYPE_UNEXPECTED,
	Rexjs.TagType.TYPE_MISTAKABLE,
	Rexjs.Expression.STATE_STATEMENT_ENDABLE,
	Rexjs.Expression.STATE_STATEMENT_END,
	Rexjs.Expression.STATE_STATEMENT_ENDED,
	// IDENTIFIER_REGEXP_SOURCE
	/(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*/
		.toString()
		.match(
			/^\/([\s\S]*)\/$/
		)[1]
);