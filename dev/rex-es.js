new function(
	Rexjs,
	// 内容提取相关
	ContentBuilder,
	// 表达式相关
	Expression, ListExpression, EmptyExpression, DefaultExpression, PartnerExpression, LeftHandSideExpression,
	// ECMAScript 相关
	ECMAScriptStatement, ECMABoxStatement, ECMAScriptErrors, ECMAScriptOrders,
	// 语法配置相关
	SyntaxConfig,
	// 标签相关类
	SyntaxTag, TagType,
	// 标签分类相关
	CLASS_STATEMENT_BEGIN, CLASS_STATEMENT_END, CLASS_EXPRESSION, CLASS_EXPRESSION_CONTEXT,
	// 标签类型相关
	TYPE_MATCHABLE, TYPE_UNEXPECTED, TYPE_MISTAKABLE, TYPE_ILLEGAL,
	// 表达式状态相关
	STATE_STATEMENT_ENDABLE, STATE_STATEMENT_END, STATE_STATEMENT_ENDED,
	// 其他常量
	NULL, IDENTIFIER_REGEXP_SOURCE
){
"use strict";


eval(
									function(){
										//ECMAScript 辅助类
~function(){

this.ECMAScriptErrors = ECMAScriptErrors = function(REGEXP){
	/**
	 * 错误信息
	 */
	function ECMAScriptErrors(){};
	ECMAScriptErrors = new Rexjs(ECMAScriptErrors);

	ECMAScriptErrors.static({
		ASSIGNMENT: "Invalid left-hand side in assignment",
		CALL: "Missing ) after argument list",
		CONST: "Assignment to constant variable",
		CONSTRUCTOR: "Class constructor may not be ${1}",
		DEFAULT_CLAUSE: "More than one default clause in switch statement",
		DUPLICATE_PARAMETER_NAME: "Duplicate parameter name not allowed in this context",
		EXPORT_DEFAULT: "Default member has already been exported",
		FOR: "Invalid left-hand side in for-loop",
		FOR_IN: "Invalid left-hand side in for-in loop: Must have a single binding",
		GETTER: "Getter must not have any formal parameters",
		ILLEGAL_STATEMENT: "Illegal ${1} statement",
		KEYWORD: '"${1}" keyword unexpected here',
		LABEL: 'Undefined label "${1}"',
		MISSING_INITIALIZER: "Missing initializer in const declaration",
		NEWLINE: "Illegal newline",
		NEWLINE_AFTER_THROW: "Illegal newline after throw",
		NEWLINE_BEFORE_ARROW: "Illegal newline before arrow",
		PREFIX_OPERATION: "Invalid left-hand side expression in prefix operation",
		POSTFIX_OPERATION: "Invalid left-hand side expression in postfix operation",
		REDECLARATION: 'Identifier "${1}" has already been declared',
		REGEXP_FLAGS: "Invalid regular expression flags",
		REST: "Rest parameter must be last formal parameter",
		SETTER: "Setter must have exactly one formal parameter",
		SUPER_CALL: "Super call may not in class constructor",
		SUPER_CALL_UNEXTEND: "No any super to call",
		SUPER_RECALL: "Super may be called in this class constructor",
		TARGET: "new.target expression is not allowed here",
		TEMPLATE: "Unterminated template literal",
		TRY: "Missing catch or finally after try",
		WITH: "The code may not include a with statement",
		WITHOUT_SUPER_CALL: "Missing super call in this class constructor",
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

this.ECMAScriptOrders = ECMAScriptOrders = function(){
	/**
	 * 标签优先级顺序
	 */
	function ECMAScriptOrders(){};
	ECMAScriptOrders = new Rexjs(ECMAScriptOrders);

	ECMAScriptOrders.static({
		NUMBER: 100,
		OPEN_ARROW_FUNCTION_BODY: 100,
		OPEN_BRACKET_ACCESSOR: 100,
		OPEN_CALL: 100,
		SPECIAL_LINE_TERMINATOR: 100,
		STATEMENT_END: 100,
		DOT_ACCESSOR: 101,
		EXPRESSION_BREAK: 101,
		MATHEMATICAL_NUMBER: 101,
		SPREAD: 101,
		IDENTIFIER: 200,
		TARGET: 201,
		VARIABLE: 201,
		KEYWORD_PROPERTY_NAME: 201,
		FUNCTION_VARIABLE: 202,
		IDENTIFIER_PROPERTY_NAME: 202,
		WORD_PROPERTY_NAME: 203,
		STATIC_MODIFIER: 203,
		BINARY: 300,
		NEGATION_SIBLING: 300,
		PLUS_SIBLING: 300,
		ARROW: 301,
		GREATER_THAN_OR_EQUAL: 301,
		LEFT_SHIFT: 301,
		LESS_THAN_OR_EQUAL: 301,
		LOGICAL_AND: 301,
		LOGICAL_OR: 301,
		RIGHT_SHIFT: 301,
		EQUALITY: 302,
		EXPONENTIATION: 302,
		UNARY_ASSIGNMENT: 302,
		POSTFIX_UNARY_ASSIGNMENT: 303,
		INEQUALITY: 302,
		UNSIGNED_RIGHT_SHIFT: 302,
		IDENTITY: 303,
		NONIDENTITY: 303,
		DESTRUCTURING_ASSIGNMENT: 303,
		SHORTHAND_ASSIGNMENT: 303,
		ILLEGAL_SHORTHAND_ASSIGNMENT: 304,
		COMMENT: 400,
		OPEN_RESTRICTED_COMMENT: 401,
		COMMENT_CONTENT: 402,
		ILLEGAL_LINE_TERMINATOR: 403,
		TEMPLATE_CONTENT: 500,
		TEMPLATE_PARAMETER: 501,
		TEMPLATE_SPECIAL_CONTENT: 501,
		FILE_START: 600
	});

	return ECMAScriptOrders;
}();

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/ecmaScript-helper.js"
								)


eval(
									function(){
										// 公用的表达式
~function(){

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
		condition: NULL
	});

	return ConditionalExpression;
}();

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/common-expression.js"
								)


eval(
									function(){
										// 语句相关
~function(){

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

this.ECMABoxStatement = ECMABoxStatement = function(){
	/**
	 * 盒子语句，一般用于重写时，“过渡” 或 “连接” 父子语句，使其 “达到” 或 “模拟” 之前重写前的效果
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ECMABoxStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ECMABoxStatement = new Rexjs(ECMABoxStatement, ECMAScriptStatement);

	ECMABoxStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 返回 try 方法调用结果
			return this.try(parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 跳出语句
			this.out();
			return null;
		}
	});

	return ECMABoxStatement;
}();

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
			if(context.content !== ")"){
				// 报错
				parser.error(context);
				return NULL;
			}

			// 跳出该语句并设置条件表达式的 inner
			this.out().condition.inner = this.expression;
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.condition.context.tag;
		}
	});
	
	return ConditionStatement;
}();

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/ecmaScript-statement.js"
								)


eval(
									function(){
										// 语句块相关
~function(Statements){

this.ECMAScriptVariableCollections = function(VariableCollections, VariableCollection){
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
		blacklist: NULL,
		const: NULL,
		declaration: NULL,
		/**
		 * 生成一个临时变量名，并记搜集到 rex 变量名集合中
		 */
		generate: function(){
			var variable = this.provide();

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
		rex: NULL
	});

	return ECMAScriptVariableCollections;
}(
	Rexjs.VariableCollections,
	Rexjs.VariableCollection
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
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);

			return 0;
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			return this.applySuper(parser, context);
		},
		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 */
		applyThis: function(){
			// 什么也不做，即默认允许应用
		},
		collections: NULL,
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
		 * 提取语句块文本内容
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
	Rexjs.Statements
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/ecmaScript-statements.js"
								)


eval(
									function(){
										// 一些 基类 或 独立的 标签
~function(RegExp){
	
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
		regexp: /\./
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
			if(statements.target !== NULL || statement.flow !== FLOW_MAIN){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
				);
			}
		}
	});

	return ModuleTag;
}(
	ECMAScriptStatement.FLOW_MAIN
);

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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/basic-tag.js"
								)


eval(
									function(){
										// 文件位置标签相关
~function(FilePositionTag){

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
		order: ECMAScriptOrders.FILE_START,
		regexp: /^/,
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/file-position.js"
								)


eval(
									function(){
										// 字面量标签相关
~function(){

this.LiteralExpression = function(config){
	/**
	 * 字面量表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LiteralExpression(context){
		Expression.call(this, context);
	};
	LiteralExpression = new Rexjs(LiteralExpression, Expression);
	
	LiteralExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

	return LiteralExpression;
}(
	// config
	new SyntaxConfig("binaryNumber", "octalNumber")
);

this.LiteralTag = function(LiteralExpression){
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
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new LiteralExpression(context);
		}
	})
	
	return LiteralTag;
}(
	this.LiteralExpression
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/literal-base.js"
								)


eval(
									function(){
										// 字面量子类标签相关
~function(LiteralTag){

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

this.ThisTag = function(visitor){
	/**
	 * this 标签
	 * @param {Number} _type - 标签类型
	 */
	function ThisTag(_type){
		LiteralTag.call(this, _type);
	};
	ThisTag = new Rexjs(ThisTag, LiteralTag);
	
	ThisTag.props({
		regexp: /this/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前语句块申请应用 this 关键字
			statements.applyThis(parser, context);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return ThisTag;
}(
	LiteralTag.prototype.visitor
);

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
			for(var n = content.length - 1;n > -1;n--){
				// 判断当前标记
				switch(content[n]){
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
				if(count > 1){
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
		// 防止与 DotTag 匹配冲突
		order: ECMAScriptOrders.NUMBER,
		regexp: /0[xX][0-9a-fA-F]+|0{2,}(?!\.)|(?:\d*\.\d+|\d+\.?)(?:e[+-]?\d+)?/,
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
		regexp: /"(?:\\(?:[^\r]|\r\n?)|[^"\\\r\n\u2028\u2029]+)*"|'(?:\\(?:[^\r]|\r\n?)|[^'\\\r\n\u2028\u2029]+)*'/,
		throw: "string"
	});
	
	return StringTag;
}();

}.call(
	this,
	this.LiteralTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/literal-inheritor.js"
								)


eval(
									function(){
										// 算数标签相关
~function(config){

this.MathematicalNumberTag = function(NumberTag){
	/**
	 * 算数数字标签
	 * @param {Number} _type - 标签类型
	 */
	function MathematicalNumberTag(_type){
		NumberTag.call(this, _type);
	};
	MathematicalNumberTag = new Rexjs(MathematicalNumberTag, NumberTag);
	
	MathematicalNumberTag.props({
		/**
		 * 提取文本内容，空函数，不做任何处理
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加字符串内容
			contentBuilder.appendString(
				// 如果要使用 parseInt 方法
				this.useParse() ?
					// 转换为指定基数的数字
					'(parseInt("' + content.substring(2) + '",' + this.radix + "))" :
					content
			);
		},
		order: ECMAScriptOrders.MATHEMATICAL_NUMBER,
		radix: "10",
		/**
		 * 是否使用 parseInt 方法进行转义
		 */
		useParse: function(){
			return true;
		}
	});
	
	return MathematicalNumberTag;
}(
	this.NumberTag
);

this.BinaryNumberTag = function(MathematicalNumberTag){
	/**
	 * 二进制数字标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberTag(_type){
		MathematicalNumberTag.call(this, _type);
	};
	BinaryNumberTag = new Rexjs(BinaryNumberTag, MathematicalNumberTag);
	
	BinaryNumberTag.props({
		radix: "2",
		regexp: /0[bB][01]+/,
		/**
		 * 是否使用 parseInt 方法进行转义
		 */
		useParse: function(){
			return config.binaryNumber;
		}
	});
	
	return BinaryNumberTag;
}(
	this.MathematicalNumberTag
);

this.OctalNumberTag = function(MathematicalNumberTag){
	/**
	 * 八进制数字标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberTag(_type){
		MathematicalNumberTag.call(this, _type);
	};
	OctalNumberTag = new Rexjs(OctalNumberTag, MathematicalNumberTag);
	
	OctalNumberTag.props({
		radix: "8",
		regexp: /0[oO][0-7]+/,
		/**
		 * 是否使用 parseInt 方法进行转义
		 */
		useParse: function(){
			return config.octalNumber;
		}
	});
	
	return OctalNumberTag;
}(
	this.MathematicalNumberTag
);

}.call(
	this,
	this.LiteralExpression.config
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/mathematical-number.js"
								)


eval(
									function(){
										// 标识符标签相关
~function(){

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

this.IdentifierTag = function(IdentifierExpression, RegExg, keywords, regexp){
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
		 * 编译该标识符的表达式
		 * @param {String} exception - 会意外冲突的内容，则正则不会匹配到该内容
		 */
		compileRegExp: function(exception){
			return new RegExp(
				"(?:" +
					// 当 exception = "var"，匹配 var$、var_、vara、var中文 等情况
					"(?:" + exception + ")|" +
					// 当 exception = "var"，匹配 var1、var1_、var1$、var1中文 等情况
					"(?=(?:" + exception + ")\\d+)|" +
					// 匹配 abc、_abc、$abc、中文abc 等情况
					"(?!" + exception + ")" +
				")" +
				IDENTIFIER_REGEXP_SOURCE
			);
		},
		/**
		 * 获取所有关键字
		 */
		get keywords(){
			return keywords;
		},
		/**
		 * 设置所有关键字，并根据关键字重新编译该类的正则表达式
		 * @param {Array} value - 包含所有关键字的数组
		 */
		set keywords(value){
			// 记录值
			keywords = value;
			
			// 生成表达式
			regexp = this.compileRegExp(
				keywords.join("|")
			);
		}
	});

	IdentifierTag.props({
		$class: CLASS_EXPRESSION,
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
				if(this.containsBy(content, statements.collections)){
					// 报错
					parser.error(
						context,
						ECMAScriptErrors.template(this.errorType, context.content)
					);
					return true;
				}

				// 获取下一个语句块
				statements = this.nextStatementsOf(statements);
			}
			// 如果语句块存在
			while(statements);

			return false;
		},
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containsBy: function(variable, collections){
			return collections.const.contains(variable);
		},
		errorType: "CONST",
		/**
		 * 获取下一个语句块
		 * @params {ECMAScriptStatements} statements - 当前语句块
		 */
		nextStatementsOf: function(statements){
			return statements.target;
		},
		order: ECMAScriptOrders.IDENTIFIER,
		/**
		 * 获取正则表达式
		 */
		get regexp(){
			return regexp;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 之前标签所需匹配的标签列表
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
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

	// 设置 keywords，虽然值一样，但目的是编译正则
	IdentifierTag.keywords = keywords;
	return IdentifierTag;
}(
	this.IdentifierExpression,
	RegExp,
	// keywords
	[
		"break", "case", "catch", "class", "const", "continue",
		"debugger", "default", "delete", "do", "else", "enum", "export", "extends",
		"false", "finally", "for", "function", "if", "import", "in(?!stanceof)", "instanceof",
		"let", "new", "null", "return", "static", "super", "switch",
		"this", "throw", "true", "try", "typeof",
		"var", "void", "while", "with", "yield"
	],
	// regexp
	NULL
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/identifier.js"
								)


eval(
									function(){
										// 变量标签相关
~function(){

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
		order: ECMAScriptOrders.VARIABLE
	});
	
	return VariableTag;
}(
	this.IdentifierTag
);

this.VariableDeclarationTag = function(VariableTag, SCOPE_CLOSURE, visitor){
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
			if(this.collected(parser, context, statements)){
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
		containsBy: function(variable, collections){
			return collections.blacklist.contains(variable);
		},
		errorType: "REDECLARATION",
		/**
		 * 获取下一个语句块
		 * @params {ECMAScriptStatements} statements - 当前语句块
		 */
		nextStatementsOf: function(statements){
			// 如果当前语句块是闭包，那么返回 NULL（因为不同闭包内，可以多次声明同一变量），否则返回 target
			return (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? NULL : statements.target;
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
			this.collectTo(parser, context, statements);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return VariableDeclarationTag;
}(
	this.VariableTag,
	this.ECMAScriptStatements.SCOPE_CLOSURE,
	this.VariableTag.prototype.visitor
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/variable.js"
								)


eval(
									function(){
										// 分号标签
~function(SemicolonTag){

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
		order: ECMAScriptOrders.STATEMENT_END,
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/semicolon.js"
								)


eval(
									function(){
										// 行结束符标签
~function(SpecialLineTerminatorTag, visitor){

this.IllegalLineTerminatorTag = function(){
	/**
	 * 不合法的行结束符标签
	 */
	function IllegalLineTerminatorTag(){
		SpecialLineTerminatorTag.call(this);
	};
	IllegalLineTerminatorTag = new Rexjs(IllegalLineTerminatorTag, SpecialLineTerminatorTag);
	
	IllegalLineTerminatorTag.props({
		order: ECMAScriptOrders.ILLEGAL_LINE_TERMINATOR,
		regexp: /(?:\/\*(?:[^*]|\*(?!\/))*)?(?:\r\n?|\n|\u2028|\u2029)/,
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
}();

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
		order: ECMAScriptOrders.EXPRESSION_BREAK,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restrictedExpressionContextTags;
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/line-terminator.js"
								)


eval(
									function(){
										// 注释标签
~function(CommentTag, tags){

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
			return tagsMap.openMultiLineCommentContextTags;
		}
	});
	
	return OpenMultiLineCommentTag;
}();

this.OpenRestrictedCommentTag = function(OpenMultiLineCommentTag){
	/**
	 * 受限制的多行注释起始标签，一般使用在表达式上下文中
	 * @param {Number} _type - 标签类型
	 */
	function OpenRestrictedCommentTag(_type){
		OpenMultiLineCommentTag.call(this, _type);
	};
	OpenRestrictedCommentTag = new Rexjs(OpenRestrictedCommentTag, OpenMultiLineCommentTag);

	OpenRestrictedCommentTag.props({
		order: ECMAScriptOrders.OPEN_RESTRICTED_COMMENT,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = currentTags;
			return tagsMap.openRestrictedCommentContextTags;
		}
	});
	
	return OpenRestrictedCommentTag;
}(
	this.OpenMultiLineCommentTag
);

this.CommentBreakTag = function(ExpressionBreakTag){
	/**
	 * 注释行结束符标签
	 */
	function CommentBreakTag(){
		ExpressionBreakTag.call(this);
	};
	CommentBreakTag = new Rexjs(CommentBreakTag, ExpressionBreakTag);
	
	CommentBreakTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = tagsMap.restrictedExpressionContextTags;
			return currentTags;
		}
	});
	
	return CommentBreakTag;
}(
	this.ExpressionBreakTag
);

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
		order: ECMAScriptOrders.COMMENT_CONTENT,
		regexp: /(?:[^*\r\n\u2028\u2029]|\*(?!\/))+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			return currentTags;
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
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/comment.js"
								)


eval(
									function(){
										// 点属性访问器相关
~function(){

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
			
			// 追加点
			contentBuilder.appendContext(this.context);
			// 追加属性
			contentBuilder.appendContext(this.property);
		},
		object: NULL,
		property: NULL
	});
	
	return AccessorExpression;
}(
	this.AssignableExpression
);

this.DotAccessorTag = function(DotTag, AccessorExpression){
	/**
	 * 点属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function DotAccessorTag(_type){
		DotTag.call(this, _type);
	};
	DotAccessorTag = new Rexjs(DotAccessorTag, DotTag);
	
	DotAccessorTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		// 防止与 NumberTag 冲突
		order: ECMAScriptOrders.DOT_ACCESSOR,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.dotAccessorContextTags;
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
	this.DotTag,
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/accessor-dot.js"
								)


eval(
									function(){
										// 中括号属性访问器
~function(closeBracketAccessorTag){
	
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
			if(context.content !== "]"){
				// 报错
				parser.error(context);
				return NULL;
			}

			// 跳出该语句并设置 inner
			this.out().property.inner = this.expression;
			return this.bindingOf();
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
		order: ECMAScriptOrders.OPEN_BRACKET_ACCESSOR,
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
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/accessor-bracket.js"
								)


eval(
									function(){
										// 逗号相关
~function(commaSiblingTag){

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
			if(context.content !== ","){
				return NULL;
			}

			// 跳出语句并添加表达式
			this.out().add(this.expression);
			// 返回标签
			return this.bindingOf();
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
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/comma.js"
								)


eval(
									function(){
										// 一元标签基类
~function(){
	
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
			// 提取一元操作符的内容
			contentBuilder.appendContext(this.context);
			// 提取操作对象内容
			this.operand.extractTo(contentBuilder);
		},
		operand: NULL
	});
	
	return UnaryExpression;
}();

this.PostfixUnaryExpression = function(UnaryExpression){
	/**
	 * 后置一元表达式
	 * @param {Context} context - 标签上下文
	 */
	function PostfixUnaryExpression(context){
		UnaryExpression.call(this, context);
	};
	PostfixUnaryExpression = new Rexjs(PostfixUnaryExpression, UnaryExpression);
	
	PostfixUnaryExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取操作对象内容
			this.operand.extractTo(contentBuilder);
			// 提取一元操作符的内容
			contentBuilder.appendContext(this.context);
		}
	});
	
	return PostfixUnaryExpression;
}(
	this.UnaryExpression
);

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
			if(this.target.expression.context.tag.isSeparator(context)){
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
		 * 提取文本内容
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/unary-base.js"
								)


eval(
									function(){
										// 非赋值一元标签
~function(UnaryTag, UnaryKeywordTag){

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
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: ECMAScriptOrders.PLUS_SIBLING
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
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: ECMAScriptOrders.NEGATION_SIBLING
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/unary-non-assginment.js"
								)


eval(
									function(){
										// 一元赋值标签
~function(UnaryStatement, VariableTag){

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
		// 如果满足一元赋值标签条件
		if(statement.target.expression.context.tag.operable(parser, statement.expression)){
			// 调用父类方法
			method.call(statement, parser, context);
			return;
		}

		// 报错
		parser.error(statement.target.expression.context, ECMAScriptErrors.PREFIX_OPERATION, true);
	}
);

this.UnaryAssignmentTag = function(UnaryTag, UnaryExpression, UnaryAssignmentStatement, AssignableExpression, AccessorExpression){
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
		 * 判断该一元表达式在当前表达式中，是否能使用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 当前表达式
		 */
		operable: function(parser, expression){
			// 如果当前表达式是赋值表达式
			if(expression instanceof AssignableExpression){
				var ctx = expression.context;

				switch(true){
					// 如果是属性访问表达式
					case expression instanceof AccessorExpression:
						break;

					// 如果已被收集到常量（会触发报错）
					case ctx.tag.collected(parser, ctx, parser.statements):
						return false;
				}

				return true;
			}

			return false;
		},
		order: ECMAScriptOrders.UNARY_ASSIGNMENT,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new UnaryExpression(context);
			// 设置当前语句
			statements.statement = new UnaryAssignmentStatement(statements);
		}
	});

	return UnaryAssignmentTag;
}(
	this.UnaryTag,
	this.UnaryExpression,
	this.UnaryAssignmentStatement,
	this.AssignableExpression,
	this.AccessorExpression
);

this.PostfixUnaryAssignmentTag = function(UnaryAssignmentTag, PostfixUnaryExpression){
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
		order: ECMAScriptOrders.POSTFIX_UNARY_ASSIGNMENT,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restrictedExpressionContextTags;
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

			// 如果满足一元赋值标签条件
			if(this.operable(parser, expression)){
				(
					// 设置当前表达式
					statement.expression = new PostfixUnaryExpression(context)
				)
				// 设置 operand 属性
				.operand = expression;

				return;
			}

			// 报错
			parser.error(context, ECMAScriptErrors.POSTFIX_OPERATION, true);
		}
	});

	return PostfixUnaryAssignmentTag;
}(
	this.UnaryAssignmentTag,
	this.PostfixUnaryExpression
);

}.call(
	this,
	this.UnaryStatement,
	this.VariableTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/unary-assginment.js"
								)


eval(
									function(){
										// 递增和递减标签
~function(UnaryAssignmentTag, PostfixUnaryAssignmentTag){

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
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		}
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
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		}
	});
	
	return DecrementSiblingTag;
}(
	this.DecrementTag
);

this.PostfixDecrementTag = function(){
	/**
	 * 后置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function PostfixDecrementTag(_type){
		PostfixUnaryAssignmentTag.call(this, _type);
	};
	PostfixDecrementTag = new Rexjs(PostfixDecrementTag, PostfixUnaryAssignmentTag);
	
	PostfixDecrementTag.props({
		regexp: /--/
	});
	
	return PostfixDecrementTag;
}();

}.call(
	this,
	this.UnaryAssignmentTag,
	this.PostfixUnaryAssignmentTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/in(de)crement.js"
								)


eval(
									function(){
										// 二元标签基类
~function(){

this.BinaryExpression = function(){
	/**
	 * 二元表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 该二元表达式左侧运算的表达式
	 */
	function BinaryExpression(context, left){
		Expression.call(this, context);

		this.left = left;
	};
	BinaryExpression = new Rexjs(BinaryExpression, Expression);

	BinaryExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 先提取左侧表达式
			this.left.extractTo(contentBuilder);
			// 追加运算符
			contentBuilder.appendContext(this.context);
			// 提取右侧表达式
			this.right.extractTo(contentBuilder);
		},
		last: NULL,
		left: NULL,
		right: NULL
	});

	return BinaryExpression;
}();

this.BinaryStatement = function(setRight){
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
			setRight(this);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是表达式分隔符标签
			if(this.target.expression.context.tag.isSeparator(context)){
				setRight(this);
			}
		}
	});
	
	return BinaryStatement;
}(
	// setRight
	function(statement){
		// 跳出语句并给最后一个二元表达式设置 right
		statement.out().last.right = statement.expression;
	}
);

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
		order: ECMAScriptOrders.BINARY,
		precedence: 0,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 将该二元标签转换为二元表达式
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 */
		toExpression: function(context, left){
			return new BinaryExpression(context, left);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression, precedence = this.precedence;

			// 如果当前表达式是二元表达式而且该二元表达式的运算符优先级小于当前运算符的优先级
			if(expression instanceof BinaryExpression && expression.context.tag.precedence < precedence){
				var exp = expression, right = expression.right;

				// 如果右侧表达式也是二元表达式
				while(right instanceof BinaryExpression){
					// 如果当前二元运算符的优先级小于等于该表达式的运算符优先级
					if(precedence <= right.context.tag.precedence){
						break;
					}

					// 记录上一个表达式
					exp = right;
					// 再获取右侧表达式
					right = right.right;
				}

				// 设置新的右侧表达式
				exp.right = expression.last = this.toExpression(context, right);
			}
			else {
				var binaryExpression = this.toExpression(context, expression);

				// 设置当前表达式并将最后的二元表达式为自己
				statement.expression = binaryExpression.last = binaryExpression;
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/binary-base.js"
								)


eval(
									function(){
										// 特殊的二元标签
~function(BinaryTag, AssignableExpression, IdentifierExpression, VariableDeclarationTag){

this.AssignmentTag = function(BinaryExpression, BinaryStatement, isSeparator, assignable){
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

			switch(true){
				// 如果可赋值
				case assignable(parser, expression):
					var binaryExpression = this.toExpression(context, expression);

					// 设置当前表达式并将最后的二元表达式为自己
					statement.expression = binaryExpression.last = binaryExpression;
					break;

				// 如果表达式是二元表达式
				case expression instanceof BinaryExpression:
					var last = expression.last, right = last.right;

					// 如果该二元表达式是“赋值表达式”，而且其值也是“可赋值表达式”
					if(last.context.tag.precedence === 0 && assignable(parser, right)){
						// 设置右侧表达式及记录为最后一个二元表达式
						last.right = expression.last = this.toExpression(context, right);
						break;
					}

				default:
					// 报错
					parser.error(context, ECMAScriptErrors.ASSIGNMENT, true);
					return;
			}

			// 设置当前语句
			statements.statement = new BinaryStatement(statements);
		}
	});
	
	return AssignmentTag;
}(
	this.BinaryExpression,
	this.BinaryStatement,
	BinaryTag.prototype.isSeparator,
	// assignable
	function(parser, expression){
		// 如果是赋值表达式
		if(expression instanceof AssignableExpression){
			// 如果是标识符表达式，那么需要验证是否为常量赋值
			if(expression instanceof IdentifierExpression){
				var ctx = expression.context, tag = ctx.tag;

				switch(true){
					// 如果当前是声明变量名标签，则不判断是否被收集，因为在声明中，已经判断，再判断的话，100% 由于重复定义，而报错
					case tag instanceof VariableDeclarationTag:
						break;

					// 如果已经被收集，会导致报错
					case tag.collected(parser, ctx, parser.statements):
						return false;
				}
			}

			return true;
		}

		return false;
	}
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
		 * 提取文本内容
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
	this.BinaryTag,
	this.AssignableExpression,
	this.IdentifierExpression,
	this.VariableDeclarationTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/binary-special.js"
								)


eval(
									function(){
										// 所有具体的二元标签
~function(BinaryTag, AssignmentTag, BinaryKeywordTag){

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
		order: ECMAScriptOrders.SHORTHAND_ASSIGNMENT,
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
		order: ECMAScriptOrders.ILLEGAL_SHORTHAND_ASSIGNMENT,
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
		order: ECMAScriptOrders.LOGICAL_OR,
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
		order: ECMAScriptOrders.LOGICAL_AND,
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
		order: ECMAScriptOrders.IDENTITY,
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
		order: ECMAScriptOrders.NONIDENTITY,
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
		order: ECMAScriptOrders.EQUALITY,
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
		order: ECMAScriptOrders.INEQUALITY,
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
		order: ECMAScriptOrders.LESS_THAN_OR_EQUAL,
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
		order: ECMAScriptOrders.GREATER_THAN_OR_EQUAL,
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
		order: ECMAScriptOrders.UNSIGNED_RIGHT_SHIFT,
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
		order: ECMAScriptOrders.LEFT_SHIFT,
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
		order: ECMAScriptOrders.RIGHT_SHIFT,
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/binary-all.js"
								)


eval(
									function(){
										// 幂运算表达式相关
~function(BinaryExpression){

this.ExponentiationExpression = function(config, extractTo){
	/**
	 * 幂运算表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 左侧表达式
	 */
	function ExponentiationExpression(context, left){
		BinaryExpression.call(this, context, left);
	};
	ExponentiationExpression = new Rexjs(ExponentiationExpression, BinaryExpression);

	ExponentiationExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

	ExponentiationExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要解析幂运算
			if(config.exponentiation){
				// 追加算数方法
				contentBuilder.appendString("Math.pow(");
				// 提取左侧的算数底值
				this.left.extractTo(contentBuilder);
				// 追加参数分隔符
				contentBuilder.appendString(",");
				// 提取幂
				this.right.extractTo(contentBuilder);
				// 追加方法结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return ExponentiationExpression;
}(
	// config
	new SyntaxConfig("exponentiation"),
	BinaryExpression.prototype.extractTo
);

this.ExponentiationTag = function(BinaryTag, ExponentiationExpression){
	/**
	 * 幂运算标签
	 * @param {Number} _type - 标签类型
	 */
	function ExponentiationTag(_type){
		BinaryTag.call(this, _type);
	};
	ExponentiationTag = new Rexjs(ExponentiationTag, BinaryTag);
	
	ExponentiationTag.props({
		// 防止与 "*" 冲突
		order: ECMAScriptOrders.EXPONENTIATION,
		precedence: 11,
		regexp: /\*\*/,
		/**
		 * 将该二元标签转换为二元表达式
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 */
		toExpression: function(context, left){
			return new ExponentiationExpression(context, left);
		}
	});
	
	return ExponentiationTag;
}(
	this.BinaryTag,
	this.ExponentiationExpression
);

}.call(
	this,
	this.BinaryExpression
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/exponentiation.js"
								)


eval(
									function(){
										// 三元表达式相关
~function(colonTag){

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
		condition: NULL,
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
		negative: NULL,
		positive: NULL
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
			if(context.content !== ":"){
				// 报错
				parser.error(context);
				return NULL;
			}

			// 跳出语句并设置 positive
			this.out().positive = this.expression;
			return this.bindingOf();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
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
			if(context.content === ","){
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
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/ternary.js"
								)


eval(
									function(){
										// 函数调用相关
~function(BracketAccessorExpression, UnaryKeywordTag, parameterSeparatorTag, closeCallTag, extractTo){

this.CallExpression = function(UnaryExpression, AccessorExpression, config, compileWithAccessor, compileWithNew, compileDefault){
	/**
	 * 函数调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} operand - 操作对象表达式
	 */
	function CallExpression(open, operand){
		PartnerExpression.call(this, open);

		this.operand = operand;
		this.inner = new ListExpression(NULL, ",");
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
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var operand = this.operand;

			// 如果有拓展符且需要编译
			if(this.hasSpread && config.spread){
				switch(true){
					// 如果是对象方法的调用
					case operand instanceof AccessorExpression:
						// 根据访问器编译
						compileWithAccessor(contentBuilder, this, operand, this.variable);
						return;

					// 如果是一元表达式
					case operand instanceof UnaryExpression:
						// 而且如果是 new 关键字
						if(operand.context.content === "new"){
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
		operand: NULL,
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
		if(operand instanceof BracketAccessorExpression){
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
		contentBuilder.appendString(".apply(" + variable + ",Rexjs.Parameter.toSpreadArray");
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
		contentBuilder.appendString(",Rexjs.Parameter.toSpreadArray");
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
		contentBuilder.appendString(",void 0,Rexjs.Parameter.toSpreadArray");
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
			if(context.content !== ")"){
				// 报错
				parser.error(context, ECMAScriptErrors.CALL);
				return NULL;
			}
			
			// 跳出该语句并设置表达式
			this.out().inner.set(this.expression);
			// 返回关闭分组小括号标签
			return this.bindingOf();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return NULL;
			}

			// 跳出该语句并添加表达式
			this.out().inner.add(this.expression);
			// 返回关闭分组小括号标签
			return this.tagOf().separator;
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
		order: ECMAScriptOrders.OPEN_CALL,
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
	NULL,
	// closeCallTag
	NULL,
	// extractTo
	PartnerExpression.prototype.extractTo
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/call.js"
								)


eval(
									function(){
										// 拓展参数相关
~function(){

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
		argument: NULL,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译拓展符
			if(config.spread){
				// 追加编译拓展符方法
				contentBuilder.appendString("new Rexjs.Parameter(");
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
			if(context.content === ","){
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
		order: ECMAScriptOrders.SPREAD,
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
			if(callExpression.hasSpread){
				return;
			}

			switch(false){
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/spread.js"
								)


eval(
									function(){
										// 解构表达式相关
~function(config){

this.DestructibleExpression = function(){
	/**
	 * 可解构的表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function DestructibleExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(NULL, ",");
	};
	DestructibleExpression = new Rexjs(DestructibleExpression, PartnerExpression);

	DestructibleExpression.props({
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){},
		declaration: false,
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(){},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(){}
	});

	return DestructibleExpression;
}();

this.DestructuringExpression = function(AssignableExpression){
	/**
	 * 解构表达式
	 * @param {Context} context - 标签上下文
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function DestructuringExpression(context, origin){
		AssignableExpression.call(this, context);

		this.origin = origin;
	};
	DestructuringExpression = new Rexjs(DestructuringExpression, AssignableExpression);

	DestructuringExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

	DestructuringExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {Expression} expression - 解构当前项
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(){},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 直接提取源表达式
			this.origin.extractTo(contentBuilder);
		},
		origin: null
	});

	return DestructuringExpression;
}(
	this.AssignableExpression
);

this.DestructuringItemExpression = function(DestructuringExpression){
	/**
	 * 解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function DestructuringItemExpression(origin){
		DestructuringExpression.call(this, origin.context, origin);
	};
	DestructuringItemExpression = new Rexjs(DestructuringItemExpression, DestructuringExpression);

	DestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var builder = new ContentBuilder();

			// 提取源表达式到临时内容生成器
			this.origin.extractTo(builder);
			// 追加赋值操作
			contentBuilder.appendString("," + builder.result + "=" + anotherBuilder.result);
		},
		/**
		 * 获取嵌套类型解构项的变量名生成器
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		getVariableBuilder: function(contentBuilder, anotherBuilder){
			// 根据长度判断
			switch(this.origin.inner.length){
				// 如果是 0，说明没有解构内容，不需要解构
				case 0:
					return NULL;

				// 如果是 1，说明可以直接用 $Rexjs_0[0] 形式直接使用，不需要单独使用变量名记录
				case 1:
					return anotherBuilder;
			}

			var variable = this.variable, builder = new ContentBuilder();

			// 追加变量名到临时内容生成器
			builder.appendString(variable);

			// 追加变量名的赋值操作
			contentBuilder.appendString(
				"," + variable + "=" + anotherBuilder.result
			);

			return builder;
		},
		variable: ""
	});

	return DestructuringItemExpression;
}(
	this.DestructuringExpression
);

this.DestructuringDefaultItemExpression = function(DestructuringItemExpression){
	/**
	 * 解构默认项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 * @param {Statements} statements - 该表达式所处的语句块
	 */
	function DestructuringDefaultItemExpression(origin, statements){
		DestructuringItemExpression.call(this, origin);

		// 如果需要解析解构表达式
		if(config.destructuring){
			// 给刚生成的解构赋值表达式设置变量名
			this.variable = statements.collections.generate();
		}
	};
	DestructuringDefaultItemExpression = new Rexjs(DestructuringDefaultItemExpression, DestructuringItemExpression);

	DestructuringDefaultItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 将默认值表达式转换为三元表达式
			this.toTernary(this.origin, contentBuilder, anotherBuilder);
		},
		/**
		 * 将默认值表达式转换为三元表达式
		 * @param {BinaryExpression} expression - 默认值二元表达式
		 * @param {ContentBuilder} contentBuilder - 主内容生成器
		 * @param {ContentBuilder} valueBuilder - 属性值生成器
		 */
		toTernary: function(expression, contentBuilder, valueBuilder){
			var variable = this.variable, leftBuilder = new ContentBuilder(), rightBuilder = new ContentBuilder();

			// 提取左侧表达式到临时内容生成器
			expression.left.extractTo(leftBuilder);
			// 提取右侧表达式到临时内容生成器
			expression.right.extractTo(rightBuilder);

			// 追加赋值操作
			contentBuilder.appendString(
				"," + leftBuilder.result + "=(" +
					variable + "=" + valueBuilder.result + "," +
					// 三元表达式，判断是否为 undefined
					variable + "===void 0?" +
						rightBuilder.result +
						":" + variable +
				")"
			);
		}
	});

	return DestructuringDefaultItemExpression;
}(
	this.DestructuringItemExpression
);

}.call(
	this,
	// config
	new SyntaxConfig("destructuring")
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/destructuring.js"
								)


eval(
									function(){
										// 数组相关
~function(DestructuringExpression, DestructuringItemExpression, DestructuringDefaultItemExpression, IdentifierExpression, AssignableExpression, BinaryExpression, BasicAssignmentTag, closeArrayTag, arrayItemSeparatorTag, destructItem){

this.ArrayDestructuringExpression = function(){
	/**
	 * 数组解构表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ArrayDestructuringExpression(origin){
		DestructuringExpression.call(this, origin.open, origin);
	};
	ArrayDestructuringExpression = new Rexjs(ArrayDestructuringExpression, DestructuringExpression);

	ArrayDestructuringExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(destructItem, contentBuilder, anotherBuilder);
		}
	});

	return ArrayDestructuringExpression;
}();

this.ArrayDestructuringItemExpression = function(){
	/**
	 * 数组解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ArrayDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	ArrayDestructuringItemExpression = new Rexjs(ArrayDestructuringItemExpression, DestructuringItemExpression);

	ArrayDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(
				destructItem,
				contentBuilder,
				this.getVariableBuilder(contentBuilder, anotherBuilder)
			);
		}
	});

	return ArrayDestructuringItemExpression;
}();

this.ArrayExpression = function(DestructibleExpression, ArrayDestructuringExpression, ArrayDestructuringItemExpression, config, collected){
	/**
	 * 数组表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArrayExpression(open){
		DestructibleExpression.call(this, open);
	};
	ArrayExpression = new Rexjs(ArrayExpression, DestructibleExpression);

	ArrayExpression.props({
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(parser){
			var expression, inner = this.inner;

			outerBlock:
			{
				// 遍历
				for(var i = inner.min, j = inner.length;i < j;i++){
					expression = inner[i];

					switch(true){
						// 如果是标识符表达式
						case expression instanceof AssignableExpression:
							// 如果已经被收集到常量内
							if(collected(parser, expression)){
								break outerBlock;
							}

							// 转化表达式
							expression = new DestructuringItemExpression(expression);
							break;

						// 如果是可解构的表达式
						case expression instanceof DestructibleExpression:
							expression = expression.toDestructuringItem(parser);
							break;

						// 如果是空表达式
						case expression instanceof EmptyExpression:
							continue;
						
						// 如果是二元运算表达式
						case expression instanceof BinaryExpression:
							// 如果二元运算表达式的标签是赋值符号
							if(expression.context.tag instanceof BasicAssignmentTag){
								// 如果二元表达式左侧是解构表达式
								if(expression.left instanceof DestructuringExpression){
									break outerBlock;
								}

								// 转化表达式
								expression = new DestructuringDefaultItemExpression(expression, parser.statements);
								break;
							}

							break outerBlock;

						default:
							break outerBlock;
					}

					// 重新设置表达式
					inner[i] = inner.latest = expression;
				}

				return;
			}

			// 报错
			parser.error(expression.context);
		},
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(parser){
			// 转换内部表达式
			this.convert(parser, this.inner);
			return new ArrayDestructuringExpression(this);
		},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(parser){
			var inner = this.inner, expression = new ArrayDestructuringItemExpression(this);

			// 如果需要解析解构表达式 而且 长度大于 1（长度为 0 不解析，长度为 1，只需取一次对象，所以都不需要生成变量名）
			if(config.destructuring && inner.length > 1){
				var collections = parser.statements.collections;

				// 给刚生成的解构赋值表达式设置变量名
				expression.variable = (
					// 如果是声明形式的解构赋值
					this.declaration ?
						// 只需提供，不用在语句块进行定义
						collections.provide() :
						// 需要提供并定义
						collections.generate()
				);
			}

			// 转换内部表达式
			this.convert(parser, this.inner);
			return expression;
		}
	});

	return ArrayExpression;
}(
	this.DestructibleExpression,
	this.ArrayDestructuringExpression,
	this.ArrayDestructuringItemExpression,
	DestructuringExpression.config,
	// collected
	function(parser, expression){
		// 如果是标识符表达式
		if(expression instanceof IdentifierExpression){
			var context = expression.context;

			// 判断是否收集到常量中
			return context.tag.collected(parser, context, parser.statements);
		}

		return false;
	}
);

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
			// 判断标签内容
			switch(context.content){
				case ",":
					// 跳出语句并添加表达式
					this.out().inner.add(this.expression);
					// 返回标签
					return this.tagOf().separator;

				case "]":
					// 跳出语句并设置表达式
					this.out().inner.set(this.expression);
					// 返回结束标签
					return this.bindingOf();
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
			if(context.content !== ","){
				return NULL;
			}

			// 跳出语句并添加表达式
			this.out().inner.add(this.expression);
			// 返回标签
			return this.tagOf().separator;
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
			// 设置语句表达式为空表达式，目的是与默认表达式区分，因为空数组是默认表达式，可以使用 set 来过滤，而其他空项不应该被过滤，所以使用空表达式
			.expression = new EmptyExpression(NULL);
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
			return tagsMap.destructibleExpressionContextTags;
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
	this.DestructuringExpression,
	this.DestructuringItemExpression,
	this.DestructuringDefaultItemExpression,
	this.IdentifierExpression,
	this.AssignableExpression,
	this.BinaryExpression,
	this.BasicAssignmentTag,
	// closeArrayTag
	NULL,
	// arrayItemSeparatorTag
	NULL,
	// destructItem
	function(expression, contentBuilder, anotherBuilder, index){
		// 初始化变量名内容生成器
		var builder = new ContentBuilder();

		// 追加当前项的变量名
		builder.appendString(anotherBuilder.result + "[" + index + "]");
		// 提取并编译表达式文本内容
		expression.compileTo(contentBuilder, builder);
	}
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/array.js"
								)


eval(
									function(){
										// 数组解构赋值相关
~function(BasicAssignmentTag, variableDeclarationArrayItemSeparatorTag, closeDeclarationArrayTag){

this.DeclarationArrayExpression = function(ArrayExpression){
	/**
	 * 变量声明数组表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} arrayOf - 该数组所属的声明表达式
	 */
	function DeclarationArrayExpression(open, arrayOf){
		ArrayExpression.call(this, open);

		this.arrayOf = arrayOf;
	};
	DeclarationArrayExpression = new Rexjs(DeclarationArrayExpression, ArrayExpression);

	DeclarationArrayExpression.props({
		arrayOf: null,
		declaration: true,
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){}
	});

	return DeclarationArrayExpression;
}(
	this.ArrayExpression
);

this.DeclarationArrayItemAssignmentReadyStatement = function(){
	/**
	 * 变量声明数组项赋值准备语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationArrayItemAssignmentReadyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	DeclarationArrayItemAssignmentReadyStatement = new Rexjs(DeclarationArrayItemAssignmentReadyStatement, ECMAScriptStatement);
	
	DeclarationArrayItemAssignmentReadyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			this.out();
			return NULL;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句
				this.out();
			}

			return NULL;
		}
	});

	return DeclarationArrayItemAssignmentReadyStatement;
}(
);

this.OpenDeclarationArrayTag = function(OpenArrayTag, DeclarationArrayExpression, ArrayStatement){
	/**
	 * 变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenDeclarationArrayTag(_type){
		OpenArrayTag.call(this, _type);
	};
	OpenDeclarationArrayTag = new Rexjs(OpenDeclarationArrayTag, OpenArrayTag);
	
	OpenDeclarationArrayTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeDeclarationArrayTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return variableDeclarationArrayItemSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openDeclarationArrayContextTags;
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
			statement.expression = new DeclarationArrayExpression(context, statement.target.expression);
			// 设置当前语句
			statements.statement = new ArrayStatement(statements);
		}
	});

	return OpenDeclarationArrayTag;
}(
	this.OpenArrayTag,
	this.DeclarationArrayExpression,
	this.ArrayStatement
);

this.DeclarationArrayItemTag = function(VariableDeclarationTag, DestructuringItemExpression, IdentifierExpression){
	/**
	 * 变量声明数组项标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	DeclarationArrayItemTag = new Rexjs(DeclarationArrayItemTag, VariableDeclarationTag);
	
	DeclarationArrayItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayItemContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			(
				// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
				context.tag = statement.target.expression.arrayOf.context.tag.variable
			)
			// 收集变量名
			.collectTo(parser, context, statements);

			// 设置当前表达式
			statement.expression = new DestructuringItemExpression(
				new IdentifierExpression(context)
			);
		}
	});
	
	return DeclarationArrayItemTag;
}(
	this.VariableDeclarationTag,
	this.DestructuringItemExpression,
	this.IdentifierExpression
);

this.DeclarationArrayItemSeparatorTag = function(ArrayItemSeparatorTag){
	/**
	 * 变量声明数组项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemSeparatorTag(_type){
		ArrayItemSeparatorTag.call(this, _type);
	};
	DeclarationArrayItemSeparatorTag = new Rexjs(DeclarationArrayItemSeparatorTag, ArrayItemSeparatorTag);
	
	DeclarationArrayItemSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openDeclarationArrayContextTags;
		}
	});

	return DeclarationArrayItemSeparatorTag;
}(
	this.ArrayItemSeparatorTag
);

this.DeclarationArrayItemAssignmentTag = function(DeclarationArrayItemAssignmentReadyStatement, DestructuringDefaultItemExpression, visitor){
	/**
	 * 变量声明数组项赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	DeclarationArrayItemAssignmentTag = new Rexjs(DeclarationArrayItemAssignmentTag, BasicAssignmentTag);
	
	DeclarationArrayItemAssignmentTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 初始化赋值准备语句
			var readyStatement = new DeclarationArrayItemAssignmentReadyStatement(statements);

			// 设置准备语句的表达式
			readyStatement.expression = statement.expression;
			// 设置当前语句
			statements.statement = readyStatement;
			
			// 调用父类访问器
			visitor.call(this, parser, context, readyStatement, statements);

			// 覆盖当前语句的表达式
			statement.expression = new DestructuringDefaultItemExpression(readyStatement.expression, statements);
		}
	});

	return DeclarationArrayItemAssignmentTag;
}(
	this.DeclarationArrayItemAssignmentReadyStatement,
	this.DestructuringDefaultItemExpression,
	BasicAssignmentTag.prototype.visitor
);

this.CloseDeclarationArrayTag = function(CloseArrayTag){
	/**
	 * 标签变量声明数组结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseDeclarationArrayTag(_type){
		CloseArrayTag.call(this, _type);
	};
	CloseDeclarationArrayTag = new Rexjs(CloseDeclarationArrayTag, CloseArrayTag);
	
	CloseDeclarationArrayTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructuringAssignmentTags;
		}
	});
	
	return CloseDeclarationArrayTag;
}(
	this.CloseArrayTag
);

variableDeclarationArrayItemSeparatorTag = new this.DeclarationArrayItemSeparatorTag();
closeDeclarationArrayTag = new this.CloseDeclarationArrayTag();

}.call(
	this,
	this.BasicAssignmentTag,
	// variableDeclarationArrayItemSeparatorTag
	NULL,
	// closeDeclarationArrayTag
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/declaration-array.js"
								)


eval(
									function(){
										// 变量声明数组项标签相关
~function(CloseDeclarationArrayTag, closeNestedDeclarationArrayItemTag){

this.OpenNestedDeclarationArrayItemTag = function(OpenDeclarationArrayTag, DeclarationArrayExpression, ArrayStatement){
	/**
	 * 嵌套的变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenNestedDeclarationArrayItemTag(_type){
		OpenDeclarationArrayTag.call(this, _type);
	};
	OpenNestedDeclarationArrayItemTag = new Rexjs(OpenNestedDeclarationArrayItemTag, OpenDeclarationArrayTag);
	
	OpenNestedDeclarationArrayItemTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeNestedDeclarationArrayItemTag;
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
			statement.expression = new DeclarationArrayExpression(
				context,
				statement.target.expression.arrayOf
			);

			// 设置当前语句
			statements.statement = new ArrayStatement(statements);
		}
	});

	return OpenNestedDeclarationArrayItemTag;
}(
	this.OpenDeclarationArrayTag,
	this.DeclarationArrayExpression,
	this.ArrayStatement
);

this.CloseNestedDeclarationArrayItemTag = function(visitor){
	/**
	 * 标签变量声明数组结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseNestedDeclarationArrayItemTag(_type){
		CloseDeclarationArrayTag.call(this, _type);
	};
	CloseNestedDeclarationArrayItemTag = new Rexjs(CloseNestedDeclarationArrayItemTag, CloseDeclarationArrayTag);
	
	CloseNestedDeclarationArrayItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayItemSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 将表达式转化为解构项
			statement.expression = statement.expression.toDestructuringItem(parser);
		}
	});
	
	return CloseNestedDeclarationArrayItemTag;
}(
	CloseDeclarationArrayTag.prototype.visitor
);

closeNestedDeclarationArrayItemTag = new this.CloseNestedDeclarationArrayItemTag();

}.call(
	this,
	this.CloseDeclarationArrayTag,
	// closeNestedDeclarationArrayItemTag
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/nested-declaration-array-item.js"
								)


eval(
									function(){
										// 语句块相关
~function(closeBlockTag){

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
			if(context.content !== "}"){
				return NULL;
			}

			// 跳出语句并设置 inner
			this.out(parser).inner = this.statements;
			// 返回结束语句块标签
			return this.bindingOf();
		},
		expression: new DefaultBlockBodyExpression(),
		/**
		 * 跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		out: function(parser){
			// 返回语句块表达式
			return (
				// 恢复语句块
				parser.statements = this.statements.target
			)
			.statement
			.expression;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.statements.target.statement.expression.context.tag;
		}
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
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 返回外层语句块的处理结果
			return this.target.applySuper(parser, context);
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			// 返回外层语句块的处理结果
			return this.target.applySuperCall(parser, context, open);
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new BlockBodyStatement(this);
		},
		scope: ECMAScriptStatements.SCOPE_BLOCK
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
		 * 进入语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
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
			
			// 进入语句块内部
			this.in(parser, statements);
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
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/block.js"
								)


eval(
									function(){
										// 语句块组件相关
~function(OpenBlockTag, CloseBlockTag, closeBlockComponentTag){

this.BlockComponentStatement = function(){
	/**
	 * 语句块组件语句，目的是为其他表达式提供模拟环境
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BlockComponentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BlockComponentStatement = new Rexjs(BlockComponentStatement, ECMAScriptStatement);

	BlockComponentStatement.props({
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
			// 报错，在这之前，应该主动跳出该语句
			parser.error(context);
		}
	});

	return BlockComponentStatement;
}();

this.OpenBlockComponentTag = function(BlockComponentStatement, visitor){
	/**
	 * switch 主体起始标签
	 */
	function OpenBlockComponentTag(_type){
		OpenBlockTag.call(this, _type);
	};
	OpenBlockComponentTag = new Rexjs(OpenBlockComponentTag, OpenBlockTag);
	
	OpenBlockComponentTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBlockComponentTag;
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
			visitor.call(
				this,
				parser,
				context,
				// 设置当前语句
				statements.statement = new BlockComponentStatement(statements),
				statements
			);
		}
	});
	
	return OpenBlockComponentTag;
}(
	this.BlockComponentStatement,
	OpenBlockTag.prototype.visitor
);

this.CloseBlockComponentTag = function(visitor){
	/**
	 * switch 主体起始标签
	 */
	function CloseBlockComponentTag(_type){
		CloseBlockTag.call(this, _type);
	};
	CloseBlockComponentTag = new Rexjs(CloseBlockComponentTag, CloseBlockTag);
	
	CloseBlockComponentTag.props({
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

			// 跳出语句并设置表达式的 block 属性
			statement.out().block = statement.expression;
		}
	});
	
	return CloseBlockComponentTag;
}(
	CloseBlockTag.prototype.visitor
);

closeBlockComponentTag = new this.CloseBlockComponentTag();

}.call(
	this,
	this.OpenBlockTag,
	this.CloseBlockTag,
	// closeBlockComponentTag
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/block-component.js"
								)


eval(
									function(){
										// 函数表达式相关
~function(){

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
		arguments: NULL,
		/**
		 * 获取表达式主体语句块
		 */
		get block(){
			return this.body;
		},
		/**
		 * 设置表达式主体语句块
		 * @param {BlockExpression} value - 需要设置的表达式主体语句块
		 */
		set block(value){
			this.body = value;
		},
		body: NULL,
		head: NULL,
		generator: NULL,
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
	new SyntaxConfig("defaultArgument", "restArgument", "arrowFunction", "generator")
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
		 * 提取文本内容
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

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/function.js"
								)


eval(
									function(){
										// 函数声明标签相关
~function(FunctionNameTag){

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

this.FunctionVariableTag = function(visitor){
	/**
	 * 函数变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionVariableTag(_type){
		FunctionNameTag.call(this, _type);
	};
	FunctionVariableTag = new Rexjs(FunctionVariableTag, FunctionNameTag);

	FunctionVariableTag.props({
		order: ECMAScriptOrders.FUNCTION_VARIABLE,
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
	FunctionNameTag.prototype.visitor
);

}.call(
	this,
	this.FunctionNameTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/function-declaration.js"
								)


eval(
									function(){
										// 函数生成器符号相关
~function(){

this.GeneratorHeaderExpression = function(){
	function GeneratorHeaderExpression(context){
		Expression.call(this, context);
	};
	GeneratorHeaderExpression = new Rexjs(GeneratorHeaderExpression, Expression);


	return GeneratorHeaderExpression;
}();

this.GeneratorTag = function(){
	/**
	 * 函数生成器标签
	 * @param {Number} _type - 标签类型
	 */
	function GeneratorTag(_type){
		SyntaxTag.call(this, _type);
	};
	GeneratorTag = new Rexjs(GeneratorTag, SyntaxTag);

	GeneratorTag.props({
		regexp: /\*/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的 generator 属性
			statement.expression.generator = context;
		}
	});

	return GeneratorTag;
}();

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/generator.js"
								)


eval(
									function(){
										// 函数参数表达式相关
~function(argumentSeparatorTag, closeArgumentsTag){

this.ArgumentsExpression = function(VariableCollection){
	/**
	 * 函数参数列表表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArgumentsExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(NULL, ",");
		this.collection = new VariableCollection();
	};
	ArgumentsExpression = new Rexjs(ArgumentsExpression, PartnerExpression);

	ArgumentsExpression.props({
		collection: NULL
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
			// 跳出语句并获取 inner
			var inner = this.out().arguments.inner;

			// 判断标签内容
			switch(context.content){
				// 如果是逗号（参数名上下文只允许接等于号赋值标签，所以逗号会进入 catch）
				case ",":
					// 添加参数表达式
					inner.add(this.expression);
					// 返回分隔符标签
					return this.tagOf().separator;

				// 如果是结束小括号，则说明是
				case ")":
					// 设置参数表达式（空参数，是默认表达式，要用 set 方法）
					inner.set(this.expression);
					// 返回参数结束小括号标签
					return this.bindingOf();
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
			if(context.content !== ","){
				return NULL;
			}

			// 跳出语句并添加参数表达式
			this.out().arguments.inner.add(this.expression);
			// 返回分隔符标签
			return this.tagOf().separator;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.arguments.open.tag;
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
			if(collection.contains(content)){
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
	NULL,
	// closeArgumentsTag
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/argument.js"
								)


eval(
									function(){
										// 默认函数参数相关
~function(BasicAssignmentTag){

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
		assignment: NULL,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 如果需要编译默认参数
			if(config.defaultArgument){
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
			if(context.content === ","){
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/argument-default.js"
								)


eval(
									function(){
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
		name: NULL,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 如果需要编译省略参数
			if(config.restArgument){
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
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/argument-rest.js"
								)


eval(
									function(){
										// 函数主体表达式相关
~function(BlockExpression, closeFunctionBodyTag){

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
			if(defaults.length === 0){
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
		switch(builder.result){
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

this.GeneratorBodyExpression = function(FunctionBodyExpression){
	/**
	 * 函数主体语句块表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function GeneratorBodyExpression(open){
		FunctionBodyExpression.call(this, open);
	};
	GeneratorBodyExpression = new Rexjs(GeneratorBodyExpression, FunctionBodyExpression);

	GeneratorBodyExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		// extractTo: function(contentBuilder, defaultArgumentBuilder){debugger
			
		// }
	});
	
	return GeneratorBodyExpression;
}(
	this.FunctionBodyExpression
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
		scope: BlockBodyStatements.SCOPE_CLOSURE
	});
	
	return FunctionBodyStatements;
}(
	this.BlockBodyStatements,
	this.ECMAScriptVariableCollections,
	Rexjs.VariableIndex
);

this.OpenFunctionBodyTag = function(OpenBlockComponentTag, FunctionBodyExpression, GeneratorBodyExpression, FunctionBodyStatements, BlockComponentStatement, config, forEach){
	/**
	 * 起始函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenFunctionBodyTag(_type){
		OpenBlockComponentTag.call(this, _type);
	};
	OpenFunctionBodyTag = new Rexjs(OpenFunctionBodyTag, OpenBlockComponentTag);

	OpenFunctionBodyTag.props({
		/**
		 * 获取绑定的函数主体结束标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeFunctionBodyTag;
		},
		/**
		 * 进入函数主体语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			(
				// 设置当前语句块
				parser.statements = new FunctionBodyStatements()
			)
			// 设置目标语句块
			.target = statements;
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
			var declarationCollection, functionBodyExpression, expression = statement.expression;
			
			functionBodyExpression = (
				// 如果有生成器并且需要解析
				expression.generator && config.generator ?
					new GeneratorBodyExpression(context):
					new FunctionBodyExpression(context)
			);

			(
				// 设置当前语句
				statements.statement = new BlockComponentStatement(statements)
			)
			// 设置表达式
			.expression = functionBodyExpression;

			// 进入函数主体语句块内部
			this.in(parser, statements);
			
			// 获取函数主体语句块的声明集合，注意：parser.statements 并不就是 statements
			declarationCollection = parser.statements.collections.declaration;

			// 收集参数名到声明集合下
			forEach(
				expression.arguments.collection,
				declarationCollection.collect,
				declarationCollection
			);
		}
	});

	return OpenFunctionBodyTag;
}(
	this.OpenBlockComponentTag,
	this.FunctionBodyExpression,
	this.GeneratorBodyExpression,
	this.FunctionBodyStatements,
	this.BlockComponentStatement,
	this.FunctionExpression.config,
	Rexjs.forEach
);

this.CloseFunctionBodyTag = function(CloseBlockComponentTag){
	/**
	 * 结束函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseFunctionBodyTag(_type){
		CloseBlockComponentTag.call(this, _type);
	};
	CloseFunctionBodyTag = new Rexjs(CloseFunctionBodyTag, CloseBlockComponentTag);

	CloseFunctionBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags, parser){
			return (
				// 如果表达式已结束
				(parser.statements.statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED ?
					tagsMap.mistakableTags :
					tagsMap.expressionContextTags
			);
		}
	});

	return CloseFunctionBodyTag;
}(
	this.CloseBlockComponentTag
);

closeFunctionBodyTag = new this.CloseFunctionBodyTag();

}.call(
	this,
	this.BlockExpression,
	// closeFunctionBodyTag
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/function-body.js"
								)


eval(
									function(){
										// new.target 表达式相关
~function(ECMAScriptStatements, PropertyNameTag){

this.TargetExpression = function(AccessorExpression){
	/**
	 * new.target 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function TargetExpression(context){
		AccessorExpression.call(this, context, NULL);
	};
	TargetExpression = new Rexjs(TargetExpression, AccessorExpression);

	TargetExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加 new 关键字
			contentBuilder.appendString("new");
			// 追加点
			contentBuilder.appendContext(this.context);
			// 追加属性
			contentBuilder.appendContext(this.property);
		}
	});

	return TargetExpression;
}(
	this.AccessorExpression
);

this.TargetAccessorTag = function(DotAccessorTag, TargetExpression){
	/**
	 * target 访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function TargetAccessorTag(_type){
		DotAccessorTag.call(this, _type);
	};
	TargetAccessorTag = new Rexjs(TargetAccessorTag, DotAccessorTag);

	TargetAccessorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.targetAccessorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			(
				// 设置当前语句为 target，目的是因为当前已经不属于一元操作语句
				statements.statement = statement.target
			)
			// 设置当前语句的表达式
			.expression = new TargetExpression(context);
		}
	});

	return TargetAccessorTag;
}(
	this.DotAccessorTag,
	this.TargetExpression
);

this.TargetTag = function(SCOPE_CLOSURE, SCOPE_LAZY, visitor){
	/**
	 * target 标签
	 * @param {Number} _type - 标签类型
	 */
	function TargetTag(_type){
		PropertyNameTag.call(this, _type);
	};
	TargetTag = new Rexjs(TargetTag, PropertyNameTag);

	TargetTag.props({
		order: ECMAScriptOrders.TARGET,
		regexp: /target/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var s = statements;

			doBlock:
			do {
				// 判断作用域类型
				switch(s.scope & SCOPE_LAZY){
					// 如果是惰性闭包
					case SCOPE_LAZY:
						break doBlock;

					// 如果是普通闭包
					case SCOPE_CLOSURE:
						// 调用父类方法
						visitor.call(this, parser, context, statement, statements);
						return;

					// 如果不是闭包
					default:
						s = s.target;
						break;
				}
			}
			while(s);

			// 报错
			parser.error(statement.expression.context, ECMAScriptErrors.TARGET);
		}
	});

	return TargetTag;
}(
	ECMAScriptStatements.SCOPE_CLOSURE,
	ECMAScriptStatements.SCOPE_LAZY,
	PropertyNameTag.prototype.visitor
);

}.call(
	this,
	this.ECMAScriptStatements,
	this.PropertyNameTag
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/target.js"
								)


eval(
									function(){
										// 分组小括号标签相关
~function(IdentifierExpression, ArgumentExpression, DefaultArgumentExpression, RestArgumentExpression, groupingSeparatorTag, closeGroupingTag, collectTo){

this.GroupingExpression = function(){
	/**
	 * 分组小括号表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function GroupingExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(NULL, ",");
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
		operand: NULL
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
			if(context.content !== ")"){
				// 报错
				parser.error(context);
				return NULL;
			}

			var groupingExpression = this.out(), inner = groupingExpression.inner;

			// 设置表达式
			inner.set(this.expression);

			// 如果经过上面设置表达式后，长度还是 0，就说明是空的小括号，就应该是要作为箭头函数参数存在
			if(inner.length === 0){
				// 设置 asArguments，表示这个分组表达式要作为箭头函数的参数使用
				groupingExpression.asArguments = true;
			}

			// 返回关闭分组小括号标签
			return this.bindingOf();
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return NULL;
			}

			// 跳出该语句并添加表达式
			this.out().inner.add(this.expression);
			return this.tagOf().separator;
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
			if(context.content === ","){
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
			if(context.content !== "=>"){
				// 如果要作为参数，即 有省略参数符号 或 空的小括号
				if(expression.asArguments){
					// 报错
					error(parser, expression);
				}

				return;
			}

			var inner = expression.inner, argumentsExpression = new ArgumentsExpression(expression.open);

			// 遍历项
			for(var i = 0, j = inner.length;i < j;i++){
				var exp = inner[i];

				switch(true){
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
		if(expression instanceof RestArgumentExpression){
			var operand = expression.operand;

			// 如果省略符的操作对象是标识符表达式
			if(operand instanceof IdentifierExpression){
				// 如果省略参数不是最后一项
				if(i !== j - 1){
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
		var left = expression.left, context = left.context;

		switch(false){
			// 如果左侧表达式不是标识符表达式
			case left instanceof IdentifierExpression:
				// 报错
				parser.error(left);
				return j;

			// 如果不是等于号
			case expression.context.content === "=":
				// 报错
				parser.error(expression.context);
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

			// 设置当前表达式
			statement.expression = new IllegibleRestArgumentExpression(
				context,
				groupingExpression.inner.length
			);

			// 设置当前语句
			statements.statement = new IllegibleRestArgumentStatement(statements);

			// 如果已经标记过该属性
			if(groupingExpression.asArguments){
				return;
			}
			
			// 设置表达式属性，标识视为参数
			groupingExpression.asArguments = true;
			// 设置参数起始索引
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
	NULL,
	// closeGroupingTag
	NULL,
	this.ArgumentNameTag.prototype.collectTo
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/grouping.js"
								)


eval(
									function(){
										// 箭头函数相关
~function(FunctionExpression, ArgumentsExpression, OpenFunctionBodyTag, CloseFunctionBodyTag, config, closeArrowFunctionBodyTag){

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
			if(config.arrowFunction){
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
		ArgumentsExpression.call(this, NULL);

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
		 * 提取表达式文本内容
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
		FunctionBodyExpression.call(this, NULL);

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
			if(defaults.length > 0){
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
			if(defaultArgumentBuilder.result.length > 0){
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
			if(context.content == ","){
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
		order: ECMAScriptOrders.ARROW,
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

			switch(true){
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
			if((expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE){
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

this.OpenArrowFunctionBodyTag = function(SCOPE_LAZY, visitor){
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
		order: ECMAScriptOrders.OPEN_ARROW_FUNCTION_BODY,
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

			// 将 FunctionBodyStatements 作用域设置为惰性闭包
			parser.statements.scope = SCOPE_LAZY;
		}
	});

	return OpenArrowFunctionBodyTag;
}(
	this.ECMAScriptStatements.SCOPE_LAZY,
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
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/arrow.js"
								)


eval(
									function(){
										// 对象属性相关
~function(){

this.PropertyDestructuringItemExpression = function(DestructuringItemExpression){
	/**
	 * 属性解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function PropertyDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	PropertyDestructuringItemExpression = new Rexjs(PropertyDestructuringItemExpression, DestructuringItemExpression);

	PropertyDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var origin = this.origin, builder = new ContentBuilder();

			// 追加属性对象
			builder.appendString(anotherBuilder.result);

			// 解构属性名
			origin.name.destructTo(builder);
			// 解构属性值
			origin.value.destructTo(contentBuilder, builder);
		}
	});

	return PropertyDestructuringItemExpression;
}(
	this.DestructuringItemExpression
);

this.PropertyDestructuringDefaultItemExpression = function(DestructuringDefaultItemExpression){
	/**
	 * 属性解构默认项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 * @param {BinaryExpression} assignment - 默认值赋值表达式
	 * @param {Statements} statements - 该表达式所处的语句块
	 */
	function PropertyDestructuringDefaultItemExpression(origin, assignment, statements){
		DestructuringDefaultItemExpression.call(this, origin, statements);

		this.assignment = assignment;
	};
	PropertyDestructuringDefaultItemExpression = new Rexjs(PropertyDestructuringDefaultItemExpression, DestructuringDefaultItemExpression);

	PropertyDestructuringDefaultItemExpression.props({
		assignment: NULL,
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var origin = this.origin, builder = new ContentBuilder();

			// 追加属性对象
			builder.appendString(anotherBuilder.result);
			// 解构属性名
			origin.name.destructTo(builder);

			// 将默认值表达式转换为三元表达式
			this.toTernary(this.assignment, contentBuilder, builder);
		}
	});

	return PropertyDestructuringDefaultItemExpression;
}(
	this.DestructuringDefaultItemExpression
);

this.PropertyExpression = function(BinaryExpression, ShorthandPropertyValueExpression, config){
	/**
	 * 对象属性表达式
	 */
	function PropertyExpression(){
		BinaryExpression.call(this, NULL, NULL);
	};
	PropertyExpression = new Rexjs(PropertyExpression, BinaryExpression);

	PropertyExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

	PropertyExpression.props({
		/**
		 * 获取该属性是否为访问器属性
		 */
		get accessible(){
			return this.named(this.accessor);
		},
		accessor: NULL,
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 如果是访问器
			if(this.accessible){
				// 追加 defineProperty 的调用
				contentBuilder.appendString("defineProperty(object,");
				// 提取属性名
				this.name.defineTo(contentBuilder);
				// 追加属性描述符
				contentBuilder.appendString(",{configurable:true,enumerable:true,");
				// 追加访问器内容
				contentBuilder.appendString(this.accessor.content);
				// 提取属性值
				this.value.defineTo(contentBuilder);
				// 追加结束调用
				contentBuilder.appendString("});");
				return;
			}

			// 追加 object
			contentBuilder.appendString("object");
			// 编译属性名
			this.name.compileTo(contentBuilder);
			// 编译属性值
			this.value.compileTo(contentBuilder);
			// 追加分号
			contentBuilder.appendString(";");
		},
		/**
		 * 获取标签上下文
		 */
		get context(){
			return this.value.context;
		},
		/**
		 * 设置标签上下文
		 * @parma {Context} value - 标签上下文
		 */
		set context(value){},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果是访问器
			if(this.accessible){
				// 追加访问器
				contentBuilder.appendContext(this.accessor);
				// 追加空格
				contentBuilder.appendSpace();
			}

			// 提取属性名称
			this.name.extractTo(contentBuilder);
			// 提取属性值
			this.value.extractTo(contentBuilder);
		},
		/**
		 * 获取该二元表达式所关联的最后一个二元表达式
		 */
		get last(){
			return this;
		},
		/**
		 * 设置该二元表达式所关联的最后一个二元表达式
		 * @parma {BinaryExpression} value - 二元表达式
		 */
		set last(value){},
		/**
		 * 获取该二元表达式的左侧表达式
		 */
		get left(){
			return this.name;
		},
		/**
		 * 设置该二元表达式的左侧表达式
		 * @parma {Expression} value - 左侧表达式
		 */
		set left(value){},
		name: NULL,
		/**
		 * 判断非属性名标签上下文是否已经用于属性名
		 * @param {Context} context - 需要判断的指定标签
		 */
		named: function(context){
			switch(context){
				// 如果 context 不存在
				case NULL:
					break;

				// 如果 context 仅仅是属性名
				case this.name.context:
					break;

				default:
					return true;
			}

			return false;
		},
		/**
		 * 获取该二元表达式的右侧表达式
		 */
		get right(){
			return this.value.operand;
		},
		/**
		 * 设置该二元表达式的右侧表达式
		 * @parma {Expression} value - 左侧表达式
		 */
		set right(value){},
		superDepth: 1,
		value: NULL
	});

	return PropertyExpression;
}(
	this.BinaryExpression,
	this.ShorthandPropertyValueExpression,
	// config
	new SyntaxConfig("shorthandMethod", "shorthandPropertyName", "computedName", "propertyInitializer")
);

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
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		destructTo: function(contentBuilder){
			// 调用编译表达式
			this.compileTo(contentBuilder);
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

this.PropertyValueExpression = function(){
	/**
	 * 对象属性值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function PropertyValueExpression(context){
		Expression.call(this, context);
	};
	PropertyValueExpression = new Rexjs(PropertyValueExpression, Expression);

	PropertyValueExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			this.extractTo(contentBuilder);
		},
		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		destructTo: function(contentBuilder, anotherBuilder){
			// 如果是子解构项
			if(this.destructuringItem){
				// 提取操作对象
				this.operand.compileTo(contentBuilder, anotherBuilder);
				return;
			}

			// 追加表达式分隔符
			contentBuilder.appendString(",");
			// 提取操作对象
			this.operand.extractTo(contentBuilder);
			// 追加赋值操作表达式
			contentBuilder.appendString("=" + anotherBuilder.result);
		},
		destructuringItem: false,
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加赋值符号
			contentBuilder.appendString("=");
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加冒号分隔符
			contentBuilder.appendContext(this.context);
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		},
		operand: NULL
	});

	return PropertyValueExpression;
}();

this.PropertyValueStatement = function(setOperand){
	/**
	 * 对象属性值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PropertyValueStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	PropertyValueStatement = new Rexjs(PropertyValueStatement, ECMAScriptStatement);

	PropertyValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 设置 operand
			setOperand(this);
		},
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 设置 operand
				setOperand(this);
			}
		}
	});

	return PropertyValueStatement;
}(
	// setOperand
	function(statement){
		// 跳出语句并设置 operand
		statement.out().value.operand = statement.expression;
	}
);

this.PropertyStatement = function(PropertyExpression, ifComma){
	/**
	 * 对象属性语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PropertyStatement(statements){
		ECMAScriptStatement.call(this, statements);

		this.initExpression();
	};
	PropertyStatement = new Rexjs(PropertyStatement, ECMAScriptStatement);

	PropertyStatement.props({
		assigned: false,
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context);
				return NULL;
			}

			var expression = this.expression, objectExpression = this.out();

			switch(true){
				// 如果表达式是空项
				case expression.name === null:
					break;

				// 如果可能是访问器
				case expression.accessible:
					// 核对访问器函数
					expression.accessor.tag.checkFunction(parser, expression.value.operand, context);

				default:
					// 跳出语句并添加表达式
					objectExpression.inner.add(expression);
					break;
			}

			return this.bindingOf();
		},
		/**
		 * 初始化该语句的表达式
		 */
		initExpression: function(){
			this.expression = new PropertyExpression();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			switch(context.content){
				// 如果是冒号
				case ":":
				// 如果是等于号
				case "=":
					// 如果已经赋值过，即 键值对值 或 属性默认值
					if(this.assigned){
						break;
					}

					this.assigned = true;
					return NULL;

				// 如果是逗号
				case ",":
					return ifComma(parser, this, this.expression, context);
			}

			// 报错
			parser.error(context);
		}
	});

	return PropertyStatement;
}(
	this.PropertyExpression,
	// ifComma
	function(parser, statement, expression, context){
		// 如果是属性访问器
		if(expression.accessible){
			// 核对访问器函数
			expression.accessor.tag.checkFunction(
				parser,
				expression.value.operand,
				context
			);
		}

		// 跳出语句并
		statement.out().inner.add(expression);
		// 返回分隔符标签
		return statement.tagOf().separator;
	}
);

this.PropertyNameSeparatorTag = function(ColonTag, PropertyValueExpression, PropertyValueStatement){
	/**
	 * 对象属性名称的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyNameSeparatorTag(_type){
		ColonTag.call(this, _type);
	};
	PropertyNameSeparatorTag = new Rexjs(PropertyNameSeparatorTag, ColonTag);

	PropertyNameSeparatorTag.props({
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
			// 设置对象属性表达式的值
			statement.expression.value = new PropertyValueExpression(context);
			// 设置当前语句
			statements.statement = new PropertyValueStatement(statements);
		}
	});

	return PropertyNameSeparatorTag;
}(
	this.ColonTag,
	this.PropertyValueExpression,
	this.PropertyValueStatement
);

}.call(
	this
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property.js"
								)


eval(
									function(){
										// 对象字面量属性名相关
~function(require, requireOfMethodName, visitor, visitorOfMathematicalNumeral){

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
		// 如果需要编译
		if(this.useParse()){
			// 设置对象表达式的 useFunction 属性，表示要用函数包裹，进行封装
			statement.target.expression.useFunction = true;
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
	NULL,
	// requireOfMethodName
	NULL,
	// visitor
	NULL,
	// visitorOfMathematicalNumeral
	NULL
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property-iteral-name.js"
								)


eval(
									function(){
										// 对象标识符属性名相关
~function(PropertySeparatorTag, RegExp){

this.IdentifierPropertyNameExpression = function(LiteralPropertyNameExpression){
	/**
	 * 对象标识符属性名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function IdentifierPropertyNameExpression(context){
		LiteralPropertyNameExpression.call(this, context);
	};
	IdentifierPropertyNameExpression = new Rexjs(IdentifierPropertyNameExpression, LiteralPropertyNameExpression);

	IdentifierPropertyNameExpression.props({
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
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		destructTo: function(contentBuilder){
			// 追加对象访问符
			contentBuilder.appendString(".");
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
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

	return IdentifierPropertyNameExpression;
}(
	this.LiteralPropertyNameExpression
);

this.ShorthandPropertyValueExpression = function(PropertyValueExpression){
	/**
	 * 简写属性值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ShorthandPropertyValueExpression(context){
		PropertyValueExpression.call(this, context);
	};
	ShorthandPropertyValueExpression = new Rexjs(ShorthandPropertyValueExpression, PropertyValueExpression);

	ShorthandPropertyValueExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加冒号和变量名
			contentBuilder.appendString("=" + this.context.content);
		},
		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		destructTo: function(contentBuilder, anotherBuilder){
			// 追加逗号表达式分隔符
			contentBuilder.appendString(",");
			// 追加变量名
			contentBuilder.appendContext(this.context);
			// 追加赋值表达式
			contentBuilder.appendString("=" + anotherBuilder.result);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(){}
	});

	return ShorthandPropertyValueExpression;
}(
	this.PropertyValueExpression
);

this.IdentifierPropertyValueStatement = function(PropertyValueStatement, ShorthandPropertyValueExpression){
	/**
	 * 对象标识符属性值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IdentifierPropertyValueStatement(statements){
		PropertyValueStatement.call(this, statements);
	};
	IdentifierPropertyValueStatement = new Rexjs(IdentifierPropertyValueStatement, PropertyValueStatement);

	IdentifierPropertyValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			var propertyExpression = this.out();

			// 设置 value 为简写属性值表达式
			propertyExpression.value = new ShorthandPropertyValueExpression(propertyExpression.name.context);
		},
		expression: new DefaultExpression(),
		try: function(parser, context){
			// 跳出语句
			var propertyExpression = this.out();

			// 如果是逗号
			if(context.content === ","){
				// 设置 value 为简写属性值表达式
				propertyExpression.value = new ShorthandPropertyValueExpression(propertyExpression.name.context);
			}
		}
	});

	return IdentifierPropertyValueStatement;
}(
	this.PropertyValueStatement,
	this.ShorthandPropertyValueExpression
);

this.IdentifierPropertyNameTag = function(IdentifierTag, IdentifierPropertyNameExpression, ShorthandPropertyValueExpression){
	/**
	 * 标识符属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierPropertyNameTag(_type){
		IdentifierTag.call(this, _type);
	};
	IdentifierPropertyNameTag = new Rexjs(IdentifierPropertyNameTag, IdentifierTag);

	IdentifierPropertyNameTag.props({
		order: ECMAScriptOrders.IDENTIFIER_PROPERTY_NAME,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.identifierPropertyNameContextTags;
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
			expression.name = new IdentifierPropertyNameExpression(context);
			// 设置当前语句
			expression.value = new ShorthandPropertyValueExpression(context);
		}
	});

	return IdentifierPropertyNameTag;
}(
	this.IdentifierTag,
	this.IdentifierPropertyNameExpression,
	this.ShorthandPropertyValueExpression
);

this.IdentifierMethodNameTag = function(IdentifierPropertyNameTag){
	/**
	 * 标识符方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierMethodNameTag(context){
		IdentifierPropertyNameTag.call(this, context);
	};
	IdentifierMethodNameTag = new Rexjs(IdentifierMethodNameTag, IdentifierPropertyNameTag);

	IdentifierMethodNameTag.props({
		regexp: new RegExp(IDENTIFIER_REGEXP_SOURCE),
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodArgumentsTags;
		}
	});

	return IdentifierMethodNameTag;
}(
	this.IdentifierPropertyNameTag
);

this.WordPropertyNameTag = function(IdentifierPropertyNameTag, POSTFIX_REGEXP_SOURCE){
	/**
	 * 词组属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function WordPropertyNameTag(_type){
		IdentifierPropertyNameTag.call(this, _type);
	};
	WordPropertyNameTag = new Rexjs(WordPropertyNameTag, IdentifierPropertyNameTag);

	WordPropertyNameTag.static({
		/**
		 * 编译该标识符的表达式
		 * @param {String} identifier - 需提供的标识符，并该正则只匹配该标识符
		 */
		compileRegExp: function(identifier){
			return new RegExp(identifier + POSTFIX_REGEXP_SOURCE);
		}
	});

	WordPropertyNameTag.props({
		order: ECMAScriptOrders.WORD_PROPERTY_NAME,
		regexp: /[A-Za-z]+/
	});

	return WordPropertyNameTag;
}(
	this.IdentifierPropertyNameTag,
	// POSTFIX_REGEXP_SOURCE
	"(?!\\d+|\\d*" + IDENTIFIER_REGEXP_SOURCE + ")"
);

this.KeywordPropertyNameTag = function(WordPropertyNameTag, IdentifierPropertyNameExpression){
	/**
	 * 关键字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function KeywordPropertyNameTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	KeywordPropertyNameTag = new Rexjs(KeywordPropertyNameTag, WordPropertyNameTag);

	KeywordPropertyNameTag.props({
		order: ECMAScriptOrders.KEYWORD_PROPERTY_NAME,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameContextTags;
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
			statement.expression.name = new IdentifierPropertyNameExpression(context); 
		}
	});

	return KeywordPropertyNameTag;
}(
	this.WordPropertyNameTag,
	this.IdentifierPropertyNameExpression
);

}.call(
	this,
	this.PropertySeparatorTag,
	RegExp
);
									}
									.toString()
									.match(
										/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/
									)[1] +
									"\n//# sourceURL=http://rexjs.org/property-identifier-name.js"
								)


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
	// ECMAScriptStatement
	null,
	// ECMABoxStatement
	null,
	// ECMAScriptErrors
	null,
	// ECMAScriptOrders
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
	Rexjs.TagType.TYPE_ILLEGAL,
	Rexjs.Expression.STATE_STATEMENT_ENDABLE,
	Rexjs.Expression.STATE_STATEMENT_END,
	Rexjs.Expression.STATE_STATEMENT_ENDED,
	// NULL
	null,
	// IDENTIFIER_REGEXP_SOURCE
	/(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*/
		.toString()
		.match(
			/^\/(.+)\/$/
		)[1]
);