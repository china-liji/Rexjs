new function(
	Rexjs,
	// 表达式相关
	Expression, ListExpression, EmptyExpression, PartnerExpression, LeftHandSideExpression,
	// 语句相关
	ECMAScriptStatement, ECMAScriptStatements,
	// 语法配置相关
	SyntaxConfig,
	// 标签相关类
	SyntaxTag, TagType,
	// 标签分类相关
	CLASS_STATEMENT_BEGIN, CLASS_EXPRESSION, CLASS_EXPRESSION_CONTEXT,
	// 标签类型相关
	TYPE_MATCHABLE, TYPE_UNEXPECTED, TYPE_MISTAKABLE,
	// 表达式状态相关
	STATE_STATEMENT_ENDABLE, STATE_STATEMENT_END, STATE_STATEMENT_ENDED,
	// 语句黑名单相关
	BLACKLIST_ASSGINMENT, BLACKLIST_SEMICOLON, BLACKLIST_COMMA,
	// 其他常量
	IDENTIFIER_REGEXP_SOURCE
){
"use strict";

// 迭代器相关
void function(){

this.IteratorIndex = function(){
	/**
	 * 迭代器索引
	 * @param {Number} max - 索引最大值
	 */
	function IteratorIndex(max){
		this.max = max;
	};
	IteratorIndex = new Rexjs(IteratorIndex);

	IteratorIndex.props({
		current: 0,
		/**
		 * 索引增加
		 * @param {Number} value - 增加的量值
		 */
		increase: function(value){
			var current = this.current + value, max = this.max;

			this.current = current > max ? max + 1 : current;
		},
		max: 0
	});

	return IteratorIndex;
}();

this.IteratorResult = function(){
	/**
	 * 迭代器结果
	 * @param {*} value - 结果值
	 * @param {Boolean} done - 是否已迭代完毕
	 */
	function IteratorResult(value, done){
		this.value = value;
		this.done = done;
	};
	IteratorResult = new Rexjs(IteratorResult);

	IteratorResult.props({
		value: void 0,
		done: false
	});

	return IteratorResult;
}();

this.Iterator = function(IteratorIndex, IteratorResult, Infinity){
	/**
	 * 迭代器
	 * @param {*} iterable - 可迭代的对象
	 */
	function Iterator(iterable){
		block:
		{
			// 如果是 null 或 undefined
			if(
				iterable == null
			){
				break block;
			}

			var length = iterable.length;

			// 如果长度属性不是数字
			if(
				typeof length !== "number"
			){
				// 取 size 属性
				length = iterable.size;

				// 如果还不是数字
				if(
					typeof length !== "number"
				){
					break block;
				}
			}

			// 初始化索引
			this.index = new IteratorIndex(length - 1);
			// 记录对象
			this.iterable = iterable;
			return;
		}

		// 抛出错误
		throw "TypeError: uniterable object " + iterable;
	};
	Iterator = new Rexjs(Iterator);

	Iterator.props({
		/**
		 * 迭代器关闭，并返回带有指定值的结果
		 * @param {*} value - 指定的结果值
		 */
		close: function(value){
			// 索引增加无限大
			this.index.increase(Infinity);
			// 返回结果
			return new IteratorResult(value, this.closed);
		},
		/**
		 * 判断该迭代器是否已经关闭
		 */
		get closed(){
			var index = this.index;

			return index.current > index.max;
		},
		index: null,
		iterable: null,
		/**
		 * 获取下一个迭代结果
		 */
		get next(){
			var result = this.result;

			// 索引增加 1
			this.index.increase(1);
			return result;
		},
		/**
		 * 获取当前迭代结果
		 */
		get result(){
			// 返回结果
			return new IteratorResult(
				this.iterable[this.index.current],
				this.closed
			);
		}
	});

	return Iterator;
}(
	this.IteratorIndex,
	this.IteratorResult,
	Infinity
);

this.Generator = function(Iterator){
	/**
	 * 生成器
	 * @param {*} iterable - 可迭代的对象
	 */
	function Generator(iterable){
		// 初始化迭代器
		this.iterator = new Iterator(iterable);
	};
	Generator = new Rexjs(Generator);

	Generator.props({
		iterator: null,
		/**
		 * 获取下一个迭代结果
		 */
		next: function(){
			return this.iterator.next;
		},
		/**
		 * 结束迭代，并返回带有指定值的结果
		 * @param {*} value - 指定的结果值
		 */
		return: function(value){
			return this.iterator.close(value);
		},
		/**
		 * 抛出错误
		 * @param {Error} error - 错误信息
		 */
		throw: function(error){
			// 抛出错误
			throw error;
		}
	});

	return Generator;
}(
	this.Iterator
);

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

this.ECMAScriptStatements = ECMAScriptStatements = function(Statements, ECMAScriptStatement){
	/**
	 * ECMAScript 语句块
	 */
	function ECMAScriptStatements(){
		Statements.call(this);
	};
	ECMAScriptStatements = new Rexjs(ECMAScriptStatements, Statements);

	ECMAScriptStatements.props({
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new ECMAScriptStatement(this);
		}
	});

	return ECMAScriptStatements;
}(
	Rexjs.Statements,
	this.ECMAScriptStatement
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

}.call(
	this
);


// 基础标签
void function(){

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

this.ColonTag = function(){
	/**
	 * 冒号标签
	 * @param {Number} _type - 标签类型
	 */
	function ColonTag(_type){
		SyntaxTag.call(this, _type);
	};
	ColonTag = new Rexjs(ColonTag, SyntaxTag);

	ColonTag.props({
		regexp: /:/
	});
	
	return ColonTag;
}();

this.CommentTag = function(){
	/**
	 * 注释标签
	 * @param {Number} _type - 标签类型
	 */
	function CommentTag(_type){
		SyntaxTag.call(this, _type);
	};
	CommentTag = new Rexjs(CommentTag, SyntaxTag);
	
	CommentTag.props({
		order: 400
	});
	
	return CommentTag;
}();

this.DeclarationTag = function(){
	/**
	 * 申明标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationTag(_type){
		SyntaxTag.call(this, _type);
	};
	DeclarationTag = new Rexjs(DeclarationTag, SyntaxTag);
	
	DeclarationTag.props({
		$class: CLASS_STATEMENT_BEGIN
	});
	
	return DeclarationTag;
}();

this.DefaultTag = function(){
	/**
	 * default 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultTag(_type){
		SyntaxTag.call(this, _type);
	};
	DefaultTag = new Rexjs(DefaultTag, SyntaxTag);
	
	DefaultTag.props({
		regexp: /default/
	});
	
	return DefaultTag;
}();

this.IdentifierTag = function(AssignableExpression, RegExp, keywords){
	/**
	 * 标识符标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierTag(_type){
		SyntaxTag.call(this, _type);
	};
	IdentifierTag = new Rexjs(IdentifierTag, SyntaxTag);
	
	IdentifierTag.props({
		$class: CLASS_EXPRESSION,
		order: 200,
		regexp: new RegExp(
			"(?:(?:" + keywords + ")|(?!" + keywords + "))"
			+
			IDENTIFIER_REGEXP_SOURCE
		),
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 之前标签所需匹配的标签列表
		 */
		require: function(tagMaps){
			return tagMaps.expressionContextTags;
		},
		name: "identifier",
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new AssignableExpression(context);
		}
	});
	
	return IdentifierTag;
}(
	this.AssignableExpression,
	RegExp,
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
	)
);

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
	 * @param {Number} _type - 标签类型
	 */
	function SpecialLineTerminatorTag(_type){
		LineTerminatorTag.call(this, _type);
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
	this
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
					parser.error(context, "Invalid regular expression flags");
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


// 变量名标签
void function(){

this.VariableTag = function(IdentifierTag, index){
	/**
	 * 变量标签
	 * @param {Number} _type - 标签类型
	 */
	function VariableTag(_type){
		IdentifierTag.call(this, _type);
	};
	VariableTag = new Rexjs(VariableTag, IdentifierTag);
	
	VariableTag.static({
		/**
		 * 获取解析时，下一个索引的变量名
		 */
		next: function(){
			index++;
			return "$Rexjs_" + index;
		},
		/**
		 * 使变量名索引减小 1
		 */
		back: function(){
			index--;
		}
	});

	VariableTag.props({
		order: 201
	});
	
	return VariableTag;
}(
	this.IdentifierTag,
	// index
	0
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
			return tagsMap.unexpectedTags;
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

this.StatementEndTag = function(CLASS_STATEMENT_END, tagType, unexpected){
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
		// 防止与 EmptyStatementTag 冲突
		order: 100,
		regexp: /;|$/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.unexpectedTags;
		},
		/**
		 * 获取标签类型
		 */
		get type(){
			return tagType;
		},
		/**
		 * 设置标签类型
		 * @param {Number} type - 标签类型
		 */
		set type(type){},
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
	Rexjs.TagClass.CLASS_STATEMENT_END,
	// tagType
	new TagType(TYPE_MISTAKABLE),
	SemicolonTag.prototype.unexpected
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
	 * @param {Number} _type - 标签类型
	 */
	function IllegalLineTerminatorTag(_type){
		SpecialLineTerminatorTag.call(this, _type);
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
			parser.error(context, "Illegal newline");
		}
	});
	
	return IllegalLineTerminatorTag;
}(
	this.SpecialLineTerminatorTag
);

this.ExpressionBreakTag = function(){
	/**
	 * 表达式行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function ExpressionBreakTag(_type){
		SpecialLineTerminatorTag.call(this, _type);
	};
	ExpressionBreakTag = new Rexjs(ExpressionBreakTag, SpecialLineTerminatorTag);
	
	ExpressionBreakTag.props({
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

this.StatementBreakTag = function(){
	/**
	 * 语句行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function StatementBreakTag(_type){
		SpecialLineTerminatorTag.call(this, _type);
	};
	StatementBreakTag = new Rexjs(StatementBreakTag, SpecialLineTerminatorTag);
	
	StatementBreakTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.unexpectedTags;
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

}.call(
	this,
	this.SpecialLineTerminatorTag,
	this.SpecialLineTerminatorTag.prototype.visitor
);


// 文件位置基类
void function(){

this.FilePositionExpression = function(){
	/**
	 * 文件位置表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FilePositionExpression(context){
		EmptyExpression.call(this, context);
	};
	FilePositionExpression = new Rexjs(FilePositionExpression, EmptyExpression);
	
	FilePositionExpression.props({
		state: STATE_STATEMENT_ENDED
	});
	
	return FilePositionExpression;
}();

this.FilePositionTag = function(){
	/**
	 * 文件位置标签
	 * @param {Number} _type - 标签类型
	 */
	function FilePositionTag(_type){
		SyntaxTag.call(this, _type);
	};
	FilePositionTag = new Rexjs(FilePositionTag, SyntaxTag);

	FilePositionTag.props({
		$class: CLASS_STATEMENT_BEGIN
	});
	
	return FilePositionTag;
}();

}.call(
	this
);


// 文件位置标签
void function(FilePositionExpression, FilePositionTag){

this.FileStartExpression = function(){
	/**
	 * 文件起始表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FileStartExpression(context){
		FilePositionExpression.call(this, context);
	};
	FileStartExpression = new Rexjs(FileStartExpression, FilePositionExpression);
	
	FileStartExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加闭包函数起始部分
			contentBuilder.appendString("void function(){");
			// 创建新行
			contentBuilder.newline();
			// 追加严格表达式字符串
			contentBuilder.appendString('"use strict";');
			// 创建新行
			contentBuilder.newline();
		}
	});
	
	return FileStartExpression;
}();

this.FileEndExpression = function(){
	/**
	 * 文件结束表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FileEndExpression(context){
		FilePositionExpression.call(this, context);
	};
	FileEndExpression = new Rexjs(FileEndExpression, FilePositionExpression);
	
	FileEndExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 创建新行
			contentBuilder.newline();
			// 追加闭包函数结束部分
			contentBuilder.appendString("}();");
		}
	});
	
	return FileEndExpression;
}();

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
			return tagMaps.unexpectedTags;
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
	this.FileStartExpression
);

this.FileEndTag = function(FileEndExpression, tagType){
	/**
	 * 文件结束符标签
	 */
	function FileEndTag(){
		FilePositionTag.call(this);
	};
	FileEndTag = new Rexjs(FileEndTag, FilePositionTag);
	
	FileEndTag.props({
		regexp: /$/,
		throw: "end of input",
		/**
		 * 获取标签类型
		 */
		get type(){
			return tagType;
		},
		/**
		 * 设置标签类型
		 * @param {Number} type - 标签类型
		 */
		set type(type){},
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
	this.FileEndExpression,
	// tagType
	new TagType(TYPE_MISTAKABLE)
);
	
}.call(
	this,
	this.FilePositionExpression,
	this.FilePositionTag
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
		 * 最后的异常处理
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 * @param {Boolean} afterTry - 是否是在 try 之后执行的
		 */
		finally: function(parser, context, afterTry){
			// 跳出语句并设置 operand
			this.out().operand = this.expression;
		}
	});
	
	return UnaryStatement;
}();

this.UnaryTag = function(UnaryExpression, UnaryStatement){
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
	this.UnaryStatement
);

}.call(
	this
);


// 特殊一元标签
void function(UnaryTag, visitor){

this.UnaryKeywordTag = function(){
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
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 关键字后面添加空格
			context.content = context.fragment + " ";

			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return UnaryKeywordTag;
}();

this.UnarySiblingTag = function(){
	/**
	 * 相邻的一元标签，即与前一个标签内容相重复的一元标签
	 * 此标签的存在，就是为了减少判断前面是否还是同样内容的一元标签，
	 * 因为解析时要加空格，不然会提取错误，如两个连续的正号(+)不加空格的话，会被当做递增(++)
	 * @param {Number} _type - 标签类型
	 */
	function UnarySiblingTag(_type){
		UnaryTag.call(this, _type);
	};
	UnarySiblingTag = new Rexjs(UnarySiblingTag, UnaryTag);
	
	UnarySiblingTag.props({
		order: 300,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 前面添加空格
			context.content = " " + context.fragment;

			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return UnarySiblingTag;
}();

}.call(
	this,
	this.UnaryTag,
	this.UnaryTag.prototype.visitor
);


// 所有具体的一元标签
void function(UnaryTag, UnaryKeywordTag, UnarySiblingTag){

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

this.NewTag = function(){
	/**
	 * new 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function NewTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	NewTag = new Rexjs(NewTag, UnaryKeywordTag);
	
	NewTag.props({
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
}();

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

this.PlusSiblingTag = function(){
	/**
	 * 相邻的正号标签
	 * @param {Number} _type - 标签类型
	 */
	function PlusSiblingTag(_type){
		UnarySiblingTag.call(this, _type);
	};
	PlusSiblingTag = new Rexjs(PlusSiblingTag, UnarySiblingTag);
	
	PlusSiblingTag.props({
		regexp: /\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return PlusSiblingTag;
}();

this.IncrementTag = function(PlusTag){
	/**
	 * 前置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function IncrementTag(_type){
		PlusTag.call(this, _type);
	};
	IncrementTag = new Rexjs(IncrementTag, PlusTag);
	
	IncrementTag.props({
		order: 301,
		regexp: /\+\+/
	});
	
	return IncrementTag;
}(
	this.PlusTag
);

this.IncrementSiblingTag = function(PlusSiblingTag){
	/**
	 * 相邻的前置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function IncrementSiblingTag(_type){
		PlusSiblingTag.call(this, _type);
	};
	IncrementSiblingTag = new Rexjs(IncrementSiblingTag, PlusSiblingTag);
	
	IncrementSiblingTag.props({
		order: 302,
		regexp: /\+\+/
	});
	
	return IncrementSiblingTag;
}(
	this.PlusSiblingTag
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

this.NegationSiblingTag = function(){
	/**
	 * 重复的负号标签
	 * @param {Number} _type - 标签类型
	 */
	function NegationSiblingTag(_type){
		UnarySiblingTag.call(this, _type);
	};
	NegationSiblingTag = new Rexjs(NegationSiblingTag, UnarySiblingTag);
	
	NegationSiblingTag.props({
		regexp: /-/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return NegationSiblingTag;
}();

this.DecrementTag = function(NegationTag){
	/**
	 * 前置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function DecrementTag(_type){
		NegationTag.call(this, _type);
	};
	DecrementTag = new Rexjs(DecrementTag, NegationTag);
	
	DecrementTag.props({
		order: 301,
		regexp: /--/
	});
	
	return DecrementTag;
}(
	this.NegationTag
);

this.DecrementSiblingTag = function(NegationSiblingTag){
	/**
	 * 相邻的前置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function DecrementSiblingTag(_type){
		NegationSiblingTag.call(this, _type);
	};
	DecrementSiblingTag = new Rexjs(DecrementSiblingTag, NegationSiblingTag);
	
	DecrementSiblingTag.props({
		order: 302,
		regexp: /--/
	});
	
	return DecrementSiblingTag;
}(
	this.NegationSiblingTag
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
	this.UnaryKeywordTag,
	this.UnarySiblingTag
);


// 二元标签基类
void function(){

this.BinaryExpression = function(){
	/**
	 * 二元表达式
	 */
	function BinaryExpression(){
		ListExpression.call(this, "");
	};
	BinaryExpression = new Rexjs(BinaryExpression, ListExpression);

	return BinaryExpression;
}();

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
		 * 最后的异常处理
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		finally: function(parser, context){
			// 跳出语句并添加表达式
			this.out().add(this.expression);
		}
	});
	
	return BinaryStatement;
}();

this.BinaryTag = function(BinaryExpression, BinaryStatement){
	/**
	 * 二元标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryTag(_type){
		SyntaxTag.call(this, _type);
	};
	BinaryTag = new Rexjs(BinaryTag, SyntaxTag);
	
	BinaryTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		keyword: false,
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
				var maxIndex = expression.length - 1;

				// 替换表达式
				expression[maxIndex] = new LeftHandSideExpression(expression[maxIndex], context);
			}
			else {
				(
					// 设置当前表达式
					statement.expression = new BinaryExpression()
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
	this.BinaryExpression,
	this.BinaryStatement
);

}.call(
	this
);


// 特殊的二元标签
void function(BinaryTag, visitor){

this.AssignmentTag = function(AssignableExpression, BinaryExpression){
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
				// 如果上一个表达式是可赋值的表达式
				case expression instanceof AssignableExpression:
					break;

				// 如果上一个表达式是二元表达式
				case expression instanceof BinaryExpression:
					// 如果上一个表达式也属于赋值表达式
					if(
						expression[expression.length - 2].context.tag.precedence === 0
					){
						break;
					}

				default:
					// 报错
					parser.error(context, "Invalid left-hand side in assignment", true);
					return;
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return AssignmentTag;
}(
	this.AssignableExpression,
	this.BinaryExpression
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
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 给关键字两端加上空格
			context.content = " " + context.fragment + " ";

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return BinaryKeywordTag;
}();

}.call(
	this,
	this.BinaryTag,
	this.BinaryTag.prototype.visitor
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
		order: 302,
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
		order: 303,
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
		order: 300,
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
		order: 300,
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
		order: 302,
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
		order: 302,
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
		order: 301,
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
		order: 301,
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
		order: 300,
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
		order: 300,
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
		order: 301,
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
		order: 300,
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
		order: 300,
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
		// 防止与单行注释混合成正则表达式
		order: 300,
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


// 点属性访问器相关
void function(){

this.AccessorExpression = function(AssignableExpression){
	/**
	 * 属性访问器表达式
	 * @param {Expression} object - 拥有该属性的对象
	 * @param {Context} context - 语法标签上下文
	 */
	function AccessorExpression(object, context){
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
			statement.expression = new AccessorExpression(statement.expression, context);
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
	 * @param {Expression} object - 拥有该属性的对象
	 */
	function BracketAccessorExpression(object){
		AccessorExpression.call(this, object, null);
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
			// 如果是关闭分组小括号
			if(
				context.content === "]"
			){
				// 跳出该语句并// 设置 inner
				this.out().property.inner = this.expression;
				return closeBracketAccessorTag;
			}
			
			// 报错
			parser.error(context);
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
				statement.expression = new BracketAccessorExpression(statement.expression)
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
	 * @param {Expression} firstExpression - 第一个子表达式
	 */
	function CommaExpression(firstExpression){
		ListExpression.call(this, ",");

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

			// 添加表达式
			this.target.expression.add(this.expression);
			// 返回标签
			return commaSiblingTag;
		}
	});
	
	return CommaStatement;
}();

this.CommaTag = function(CommaExpression, CommaStatement){
	/**
	 * 逗号标签
	 * @param {Number} _type - 标签类型
	 */
	function CommaTag(_type){
		SyntaxTag.call(this, _type);
	};
	CommaTag = new Rexjs(CommaTag, SyntaxTag);
	
	CommaTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
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
			statement.expression = new CommaExpression(statement.expression);
			// 设置当前语句
			statements.statement = new CommaStatement(statements);
		}
	});
	
	return CommaTag;
}(
	this.CommaExpression,
	this.CommaStatement
);

this.CommaSiblingTag = function(CommaTag){
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
			// 清空表达式
			statement.expression = null;
		}
	});

	return CommaSiblingTag;
}(
	this.CommaTag
);

commaSiblingTag = new this.CommaSiblingTag();
	
}.call(
	this,
	// commaSiblingTag
	null
);


// 分组小括号标签
void function(closeGroupingTag){

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
			// 如果是关闭分组小括号
			if(
				context.content === ")"
			){
				// 跳出该语句并设置 inner
				this.out().inner = this.expression;
				// 返回关闭分组小括号标签
				return closeGroupingTag;
			}
			
			// 报错
			parser.error(context);
		}
	});
	
	return GroupingStatement;
}();

this.OpenGroupingTag = function(OpenParenTag, GroupingStatement){
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
			statement.expression = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new GroupingStatement(statements);
		}
	});
	
	return OpenGroupingTag;
}(
	this.OpenParenTag,
	this.GroupingStatement
);

this.CloseGroupingTag = function(CloseParenTag){
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
		}
	});
	
	return CloseGroupingTag;
}(
	this.CloseParenTag
);

closeGroupingTag = new this.CloseGroupingTag();

}.call(
	this,
	// closeGroupingTag
	null
);


// 数组相关
void function(closeArrayTag, arrayItemSparatorTag){

this.ArrayStatement = function(){
	/**
	 * 数组语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArrayStatement(statements){
		ECMAScriptStatement.call(this, statements);

		// 初始化表达式
		this.expression = new EmptyExpression(null);
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
			switch(
				context.content
			){
				case ",":
					// 添加表达式
					this.target.expression.inner.add(this.expression);
					// 返回标签
					return arrayItemSparatorTag;

				case "]":
					// 跳出语句并添加表达式
					this.out().inner.add(this.expression);
					// 返回结束标签
					return closeArrayTag;
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

			// 添加表达式
			this.target.expression.inner.add(this.expression);
			// 返回标签
			return arrayItemSparatorTag;
		}
	});

	return ArrayStatement;
}();

this.OpenArrayTag = function(OpenBracketTag, ArrayStatement){
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
			// 设置表达式
			(
				statement.expression = new PartnerExpression(context)
			)
			// 设置 inner
			.inner = new ListExpression(",");

			// 设置当前语句
			statements.statement = new ArrayStatement(statements);
		}
	});
	
	return OpenArrayTag;
}(
	this.OpenBracketTag,
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

this.ArrayItemSparatorTag = function(CommaTag){
	/**
	 * 数组项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArrayItemSparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ArrayItemSparatorTag = new Rexjs(ArrayItemSparatorTag, CommaTag);
	
	ArrayItemSparatorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 初始化新的空表达式
			statement.expression = new EmptyExpression(null);
		}
	});
	
	return ArrayItemSparatorTag;
}(
	this.CommaTag
);

closeArrayTag = new this.CloseArrayTag();
arrayItemSparatorTag = new this.ArrayItemSparatorTag();

}.call(
	this,
	// closeArrayTag
	null,
	// arrayItemSparatorTag
	null
);


// 语句块相关
void function(closeBlockTag){

this.BlockExpression = function(){
	/**
	 * 语句块表达式
	 * @param {Context} context - 表达式上下文
	 */
	function BlockExpression(context){
		PartnerExpression.call(this, context);
	};
	BlockExpression = new Rexjs(BlockExpression, PartnerExpression);
	
	BlockExpression.props({
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		}
	});
	
	return BlockExpression;
}();

this.BlockStatement = function(){
	/**
	 * 语句块语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BlockStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BlockStatement = new Rexjs(BlockStatement, ECMAScriptStatement);
	
	BlockStatement.props({
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

			var statements = this.statements;

			// 恢复语句块
			(
				parser.statements = statements.target
			)
			.statement
			.expression
			.inner = statements;

			// 返回结束语句块标签
			return closeBlockTag;
		}
	});
	
	return BlockStatement;
}();

this.BlockStatements = function(BlockStatement){
	/**
	 * 语句块
	 */
	function BlockStatements(){
		ECMAScriptStatements.call(this);
	};
	BlockStatements = new Rexjs(BlockStatements, ECMAScriptStatements);
	
	BlockStatements.props({
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new BlockStatement(this);
		}
	});
	
	return BlockStatements;
}(
	this.BlockStatement
);

this.OpenBlockTag = function(OpenBraceTag, BlockStatements, BlockExpression){
	/**
	 * 起始语句块标签
	 */
	function OpenBlockTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenBlockTag = new Rexjs(OpenBlockTag, OpenBraceTag);
	
	OpenBlockTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openBlockContextTags;
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
				parser.statements = new BlockStatements()
			)
			// 记录当前语句块
			.target = statements;
		}
	});
	
	return OpenBlockTag;
}(
	this.OpenBraceTag,
	this.BlockStatements,
	this.BlockExpression
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
			return tagsMap.unexpectedTags;
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

this.CloseEmptyBlockTag = function(CloseBlockTag, visitor){
	/**
	 * 结束空语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseEmptyBlockTag(_type){
		CloseBlockTag.call(this, _type);
	};
	CloseEmptyBlockTag = new Rexjs(CloseEmptyBlockTag, CloseBlockTag);
	
	CloseEmptyBlockTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 恢复语句块
			statements = parser.statements = statements.target;
			// 重新获取 statement
			statement = statements.statement;
			// 设置 inner 为空表达式
			statement.expression.inner = new EmptyExpression(null);
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return CloseEmptyBlockTag;
}(
	this.CloseBlockTag,
	this.CloseBlockTag.prototype.visitor
);

closeBlockTag = new this.CloseBlockTag();

}.call(
	this,
	// closeBlockTag
	null
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

this.LabelTag = function(IdentifierTag){
	/**
	 * 标记标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelTag(_type){
		IdentifierTag.call(this, _type);
	};
	LabelTag = new Rexjs(LabelTag, IdentifierTag);
	
	LabelTag.props({
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
	this.IdentifierTag
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


// 中断流相关 [todo]
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
		inBlock: false,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加 break 关键字
			contentBuilder.appendContext(this.context);
			// 提取 label
			this.label.extractTo(contentBuilder);
		},
		label: null
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
		
		this.expression = new EmptyExpression(null);
	};
	TerminatedFlowStatement = new Rexjs(TerminatedFlowStatement, ECMAScriptStatement);
	
	TerminatedFlowStatement.props({
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
				// 如果不是空表达式，说明是属于标记表达式
				case expression instanceof EmptyExpression:
					break;

				// 如果存在语句块
				case terminatedFlowExpression.blockStatement === null:
					break;

				// 默认
				default:
					// 报错
					parser.error(
						terminatedFlowExpression.context, "Illegal " + terminatedFlowExpression.context.content + " statement"
					);
					return;
			}

			// 跳出语句
			this.out();
			// 设置 label
			terminatedFlowExpression.label = this.expression;
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
		/**
		 * 核对标签定义语句是否满足当前标签所出现的场景
		 * @param {Statement} labelStatement - 标签定义语句
		 */
		checkLabelStatement: function(){
			return true;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.terminatedFlowContextTags;
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
			statements.statement = new TerminatedFlowStatement(statements);
		}
	});
	
	return TerminatedFlowTag;
}(
	this.TerminatedFlowExpression,
	this.TerminatedFlowStatement
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
		visitor: function(parser, context, statement){
			var content = context.content, target = statement.target, terminatedFlowTag = target.expression.context.tag;

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

					// 如果中断流标签核对无效
					case terminatedFlowTag.checkLabelStatement(labelledExpression):
						break;

					default:
						// 添加空格
						context.content = " " + context.content;
						// 设置当前表达式
						statement.expression = new Expression(context);
						return;
				}

				target = target.target;
			}

			// 报错
			parser.error(context, 'Undefined label "' + content + '"');
		}
	});
	
	return LabelledIdentifierTag;
}(
	this.LabelTag,
	this.LabelledStatement
);

}.call(
	this
);


// 中断流子类相关
void function(TerminatedFlowTag){

this.BreakTag = function(){
	/**
	 * break 标签
	 * @param {Number} _type - 标签类型
	 */
	function BreakTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	BreakTag = new Rexjs(BreakTag, TerminatedFlowTag);
	
	BreakTag.props({
		regexp: /break/
	});
	
	return BreakTag;
}();

this.ContinueTag = function(){
	/**
	 * continue 标签
	 * @param {Number} _type - 标签类型
	 */
	function ContinueTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	ContinueTag = new Rexjs(ContinueTag, TerminatedFlowTag);
	
	ContinueTag.props({
		checkLabelStatement: function(labelStatement){debugger
			
		},
		regexp: /continue/
	});
	
	return ContinueTag;
}();

}.call(
	this,
	this.TerminatedFlowTag
);

// var 语句相关
void function(VariableTag, vdsTag){

this.VarExpression = function(BinaryExpression, extractTo){
	/**
	 * var 表达式
	 * @param {Context} context - 标签上下文
	 */
	function VarExpression(context){
		Expression.call(this, context);

		// 初始化 list
		this.list = new ListExpression(",");
	};
	VarExpression = new Rexjs(VarExpression, Expression);
	
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
	this.BinaryExpression,
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
			// 如果是逗号
			if(
				context.content === ","
			){
				// 添加表达式
				this.target.expression.list.add(this.expression);
				// 返回分隔符标签
				return vdsTag;
			}

			// 跳出语句并添加表达式
			this.out().list.add(this.expression);
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

			// 添加表达式
			this.target.expression.list.add(this.expression);
			// 返回分隔符标签
			return vdsTag;
		}
	});
	
	return VarStatement;
}();

this.VarTag = function(DeclarationTag, VarExpression, VarStatement){
	/**
	 * var 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function VarTag(_type){
		DeclarationTag.call(this, _type);
	};
	VarTag = new Rexjs(VarTag, DeclarationTag);

	VarTag.props({
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
			statements.statement = new VarStatement(statements);
		}
	});

	return VarTag;
}(
	this.DeclarationTag,
	this.VarExpression,
	this.VarStatement
);

this.InitingVariableTag = function(){
	/**
	 * 正在初始化的变量标签
	 * @param {Number} _type - 标签类型
	 */
	function InitingVariableTag(_type){
		VariableTag.call(this, _type);
	};
	InitingVariableTag = new Rexjs(InitingVariableTag, VariableTag);
	
	InitingVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.initingVariableContextTags;
		}
	});
	
	return InitingVariableTag;
}();

this.VDSTag = function(CommaTag){
	/**
	 * 变量声明分隔符标签(Variable Declaration Sparator Tag)
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
			// 清空表达式
			statement.expression = null;
		}
	});
	
	return VDSTag;
}(
	this.CommaTag
);

vdsTag = new this.VDSTag();

}.call(
	this,
	this.VariableTag,
	// vdsTag
	null
);


// let 语句
void function(VarTag){

this.LetTag = function(visitor){
	/**
	 * let 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function LetTag(_type){
		VarTag.call(this, _type);
	};
	LetTag = new Rexjs(LetTag, VarTag);

	LetTag.props({
		regexp: /let/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.letContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 修改内容
			context.content = "var";

			visitor.call(this, parser, context, statement, statements);
		}
	});

	return LetTag;
}(
	VarTag.prototype.visitor
);

}.call(
	this,
	this.VarTag
);


// if 语句相关
void function(closeIfConditionTag, elseTag){

this.IfExpression = function(){
	/**
	 * if 表达式
	 * @param {Context} context - 表达式上下文
	 */
	function IfExpression(context){
		Expression.call(this, context);
		
		this.ifContext = context;
	};
	IfExpression = new Rexjs(IfExpression, Expression);
	
	IfExpression.props({
		body: null,
		condition: null,
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
}();

this.IfConditionStatement = function(){
	/**
	 * if 条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IfConditionStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	IfConditionStatement = new Rexjs(IfConditionStatement, ECMAScriptStatement);
	
	IfConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果是小括号
			if(
				context.content === ")"
			){
				// 跳出该语句并设置条件表达式的 inner
				this.out().condition.inner = this.expression;
				return closeIfConditionTag;
			}

			// 报错
			parser.error(context);
		}
	});
	
	return IfConditionStatement;
}();

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
			var expression = this.expression;

			// 跳出语句并设置 ifBody
			this.out().ifBody = expression;
			
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
					return elseTag;
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

this.OpenIfConditionTag = function(OpenParenTag, IfConditionStatement){
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
			statements.statement = new IfConditionStatement(statements);
		}
	});
	
	return OpenIfConditionTag;
}(
	this.OpenParenTag,
	this.IfConditionStatement
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

this.WhileExpression = function(){
	/**
	 * while 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function WhileExpression(context){
		Expression.call(this, context);
	};
	WhileExpression = new Rexjs(WhileExpression, Expression);
	
	WhileExpression.props({
		body: null,
		condition: null,
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
}();

this.WhileConditionStatement = function(){
	/**
	 * while 条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function WhileConditionStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	WhileConditionStatement = new Rexjs(WhileConditionStatement, ECMAScriptStatement);
	
	WhileConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			if(
				context.content === ")"
			){
				// 跳出该语句并设置条件表达式的 inner
				this.out().condition.inner = this.expression;
				return closeWhileConditionTag;
			}

			// 报错
			parser.error(context);
		}
	});
	
	return WhileConditionStatement; 
}();

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
		}
	});
	
	return WhileBodyStatement;
}();

this.WhileTag = function(WhileExpression, WhileStatement){
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
	this.WhileExpression,
	this.WhileStatement
);

this.OpenWhileConditionTag = function(OpenParenTag, WhileConditionStatement){
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
			statements.statement = new WhileConditionStatement(statements);
		}
	});
	
	return OpenWhileConditionTag;
}(
	this.OpenParenTag,
	this.WhileConditionStatement
);

this.CloseWhileConditionTag = function(CloseParenTag, WhileConditionStatement, WhileBodyStatement){
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
	this.WhileConditionStatement,
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
	
this.DoExpression = function(){
	/**
	 * do 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DoExpression(context){
		Expression.call(this, context);
	};
	DoExpression = new Rexjs(DoExpression, Expression);
	
	DoExpression.props({
		condition: null,
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
}();

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
					// 跳出语句并设置 body
					this.out().body = expression;
					// 返回标签
					return doWhileTag;
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

this.DoWhileConditionStatement = function(){
	/**
	 * do while 条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DoWhileConditionStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	DoWhileConditionStatement = new Rexjs(DoWhileConditionStatement, ECMAScriptStatement);
	
	DoWhileConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果是结束小括号
			if(
				context.content === ")"
			){
				// 跳出该语句并设置条件表达式的 inner
				this.out().condition.inner = this.expression;
				return closeDoWhileConditionTag;
			}

			// 报错
			parser.error(context);
		}
	});
	
	return DoWhileConditionStatement;
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

this.OpenDoWhileConditionTag = function(OpenWhileConditionTag, DoWhileConditionStatement){
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
			statements.statement = new DoWhileConditionStatement(statements);
		}
	});
	
	return OpenDoWhileConditionTag;
}(
	this.OpenWhileConditionTag,
	this.DoWhileConditionStatement
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
			return tagsMap.unexpectedTags;
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
void function(VarExpression, AssignableExpression, CommaStatement, BinaryKeywordTag, closeForConditionTag, fcicTag, forInTag, forOfTag, fcisTag, fclsTag){

this.ForExpression = function(VariableTag, ContentBuilder, config, compileOf){
	/**
	 * for 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ForExpression(context){
		Expression.call(this, context);
	};
	ForExpression = new Rexjs(ForExpression, Expression);

	ForExpression.static({
		config: config
	});

	ForExpression.props({
		body: null,
		condition: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 添加 for 关键字
			contentBuilder.appendContext(this.context);

			// 如果是 of 标签而且需要编译 of
			if(
				this.iterator === forOfTag && config.of
			){
				// 编译 for of
				compileOf(
					this.condition,
					this.body,
					contentBuilder,
					new ContentBuilder(),
					VariableTag.next()
				);
				
				// 回收变量名
				VariableTag.back();
				return;
			}

			// 提取条件
			this.condition.extractTo(contentBuilder);
			// 提取主体
			this.body.extractTo(contentBuilder);
		},
		iterator: null
	});
	
	return ForExpression;
}(
	this.VariableTag,
	Rexjs.ContentBuilder,
	// config
	new SyntaxConfig("of"),
	// compileOf
	function(condition, body, contentBuilder, builder, generator){
		var inner = condition.inner;

		// 追加 for 循环条件起始小括号
		contentBuilder.appendContext(condition.open);
		// 追加 for 循环初始化语句
		contentBuilder.appendString("var " + generator + "=new Rexjs.Generator(");

		// 追加生成器的对象
		inner[1].extractTo(contentBuilder);

		// 追加 for 循环的逻辑条件
		contentBuilder.appendString(");!" + generator + ".iterator.closed;");
		// 追加 for 循环条件结束小括号
		contentBuilder.appendContext(condition.close);
		// 追加语句块起始大括号，目的是让 let、const 发挥效果
		contentBuilder.appendString("{");

		// 将对象值的初始化表达式提取到新的内容生成器里，目的是防止文档位置（position）的错乱，导致 mappings 不可用 
		inner[0].left.extractTo(builder);

		// 追加对象值的初始化
		contentBuilder.appendString(
			builder.complete() + "=" + generator + ".next().value;"
		);

		// 提取主体
		body.extractTo(contentBuilder);
		// 追加语句块结束小括号
		contentBuilder.appendString("}");
	}
);

this.ForConditionStatement = function(){
	/**
	 * for 循环条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForConditionStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ForConditionStatement = new Rexjs(ForConditionStatement, ECMAScriptStatement);

	ForConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束小括号
			if(
				context.content !== ")"
			){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 inner
			this.out().condition.inner = this.expression;
			// 返回标签
			return closeForConditionTag;
		}
	});
	
	return ForConditionStatement;
}();

this.ForConditionInnerStatement = function(){
	/**
	 * for 循环条件内部语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForConditionInnerStatement(statements){
		ECMAScriptStatement.call(this, statements);

		// 初始化表达式，目的是为了允许空表达式
		this.expression = new EmptyExpression(null);
	};
	ForConditionInnerStatement = new Rexjs(ForConditionInnerStatement, ECMAScriptStatement);
	
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
			var tag, expression = this.expression;

			// 判断标签内容
			switch(
				context.content
			){
				// 如果是分号
				case ";":
					// 设置标签
					tag = fcisTag;
					
					(
						// 设置目标语句的表达式
						this.target.expression = new ListExpression(";")
					)
					// 添加表达式
					.add(
						expression
					);
					break;

				// 如果是 in
				case "in":
					tag = forInTag;

				// 如果是 of
				case "of":
					// 如果验证出错
					if(
						hasError(parser, expression, context)
					){
						return;
					}

					// 设置标签
					tag = tag || forOfTag;
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
					return fcicTag;

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
			// 返回标签
			return forInTag;
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
				parser.error(context, "Invalid left-hand side in for-in loop: Must have a single binding.");
				return true;
			}
		}

		// 如果表达式是赋值表达式
		if(
			expression instanceof AssignableExpression
		){
			return false;
		}

		// 返回错误信息
		parser.error(context, "Invalid left-hand side in for-loop");
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
			// 如果是分号
			if(
				context.content === ";"
			){
				// 跳出语句并添加表达式
				this.out().add(this.expression);
				// 返回标签
				return fclsTag;
			}

			// 报错
			parser.error(context);
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

this.IterationStatement = function(){
	/**
	 * 迭代语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IterationStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	IterationStatement = new Rexjs(IterationStatement, ECMAScriptStatement);

	IterationStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 设置目标语句的表达式
			this.target.expression = this.expression;

			// 跳出当前语句
			this.out();
		}
	});

	return IterationStatement;
}();

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
		}
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

this.OpenForConditionTag = function(OpenParenTag, ForConditionStatement, FCIStatement){
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
			statements.statement = new ForConditionStatement(statements);
			// 再次设置当前语句，目的是 target 要指向 ForConditionStatement
			statements.statement = new FCIStatement(statements);
		}
	});
	
	return OpenForConditionTag;
}(
	this.OpenParenTag,
	this.ForConditionStatement,
	this.FCIStatement
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
			statement.expression = new CommaExpression(statement.expression);
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

this.IteratorTag = function(IterationStatement, visitor){
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
			visitor.call(this, parser, context, statement, statements);
			
			// 设置 for 表达式的迭代符
			statement.target.expression.iterator = this;
			// 设置当前语句
			statements.statement = new IterationStatement(statements);
		}
	});

	return IteratorTag;
}(
	this.IterationStatement,
	BinaryKeywordTag.prototype.visitor
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

this.ForOfTag = function(IteratorTag){
	/**
	 * for of 标签
	 * @param {Number} _type - 标签类型
	 */
	function ForOfTag(_type){
		IteratorTag.call(this, _type);
	};
	ForOfTag = new Rexjs(ForOfTag, IteratorTag);

	ForOfTag.props({
		regexp: /of/
	});

	return ForOfTag;
}(
	this.IteratorTag
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

closeForConditionTag = new this.CloseForConditionTag();
fcicTag = new this.FCICTag();
forInTag = new this.ForInTag();
forOfTag = new this.ForOfTag();
fcisTag = new this.FCISTag();
fclsTag = new this.FCLSTag();

}.call(
	this,
	this.VarExpression,
	this.AssignableExpression,
	this.CommaStatement,
	this.BinaryKeywordTag,
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
	null
);


// return 语句相关 [todo]
void function(){

this.ReturnExpression = function(){
	/**
	 * return 表达式
	 * @param {Context} context - 标签上下文
	 */
	function ReturnExpression(context){
		Expression.call(this, context);
	};
	ReturnExpression = new Rexjs(ReturnExpression, Expression);
	
	ReturnExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var value = this.value;
			
			// 追加 return 关键字
			contentBuilder.appendContext(this.context);

			// 如果是空表达式
			if(
				value instanceof EmptyExpression
			){
				// 返回
				return;
			}
			
			// 追加空格
			contentBuilder.appendSpace();
			// 提取返回值
			value.extractTo(contentBuilder);
		},
		value: null
	});
	
	return ReturnExpression;
}();

this.ReturnStatement = function(){
	/**
	 * return 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ReturnStatement(statements){
		ECMAScriptStatement.call(this, statements);
		
		this.expression = new EmptyExpression(null);
	};
	ReturnStatement = new Rexjs(ReturnStatement, ECMAScriptStatement);
	
	ReturnStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 value
			this.out().value = this.expression;
		}
	});
	
	return ReturnStatement;
}();

this.ReturnTag = function(ReturnExpression, ReturnStatement){
	/**
	 * return 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ReturnTag(_type){
		SyntaxTag.call(this, _type);
	};
	ReturnTag = new Rexjs(ReturnTag, SyntaxTag);
	
	ReturnTag.props({
		$class: CLASS_STATEMENT_BEGIN,
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
			// 设置表达式
			statement.expression = new ReturnExpression(context);
			// 设置当前语句
			statements.statement = new ReturnStatement(statements);
		}
	});
	
	return ReturnTag;
}(
	this.ReturnExpression,
	this.ReturnStatement
);

}.call(
	this
);


// throw 语句相关
void function(){

this.ThrowExpression = function(){
	/**
	 * throw 表达式
	 * @param {Context} context - 标签上下文
	 */
	function ThrowExpression(context){
		Expression.call(this, context);
	};
	ThrowExpression = new Rexjs(ThrowExpression, Expression);
	
	ThrowExpression.props({
		exception: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 添加 throw 关键字
			contentBuilder.appendContext(this.context);
			// 添加空格
			contentBuilder.appendSpace();
			
			// 提取异常
			this.exception.extractTo(contentBuilder);
		}
	});
	
	return ThrowExpression;
}();

this.ThrowStatement = function(){
	/**
	 * throw 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ThrowStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ThrowStatement = new Rexjs(ThrowStatement, ECMAScriptStatement);
	
	ThrowStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 exception
			this.out().exception = this.expression;
		}
	});
	
	return ThrowStatement;
}();

this.ThrowTag = function(ThrowExpression, ThrowStatement){
	/**
	 * throw 标签
	 * @param {Number} _type - 标签类型
	 */
	function ThrowTag(_type){
		SyntaxTag.call(this, _type);
	};
	ThrowTag = new Rexjs(ThrowTag, SyntaxTag);
	
	ThrowTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /throw/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.throwContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式为 throw 表达式
			statement.expression = new ThrowExpression(context);
			// 设置当前语句为 throw 语句
			statements.statement = new ThrowStatement(statements);
		}
	});
	
	return ThrowTag;
}(
	this.ThrowExpression,
	this.ThrowStatement
);

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
			parser.error(context, "Illegal newline after throw");
		}
	});

	return ThrowContextLineTerminatorTag;
}(
	this.IllegalLineTerminatorTag
);

}.call(
	this
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
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			this.out().$expression.tryBlock = this.expression;
			
			switch(
				context.content
			){
				// 如果是 catch
				case "catch" :
					return catchTag;
				
				// 如果是 finally
				case "finally" :
					return finallyTag;
				
				// 默认
				default :
					// 报错
					parser.error(context, "Missing catch or finally after try");
					return null;
			}
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
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是 finally
			if(
				context.content === "finally"
			){
				this.out().$expression.catchBlock = this.expression;
				return finallyTag;
			}
			
			// 临时表达式转正
			this.requestFormalize().catchBlock = this.expression;;
			return this.catch(parser, context);
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
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// try 表达式结束
			this.requestFormalize().finallyBlock = this.expression;
			return this.catch(parser, context);
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
			// 设置临时表达式
			statement.$expression = new TryExpression(context);
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
			statement.$expression.catchContext = context;
			// 设置当前语句
			statements.statement = new CatchStatement(statements)
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
			statement.target.$expression.exception = new PartnerExpression(context);
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
			statement.target.$expression.exception.inner = new Expression(context);
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
			statement.target.$expression.exception.close = context;
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
			statement.$expression.finallyContext = context;
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
void function(closeSwitchConditionTag, closeSwitchBodyTag, caseTag, defaultCaseTag, caseDeclarationTag){

this.SwitchExpression = function(){
	/**
	 * switch 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SwitchExpression(context){
		Expression.call(this, context);
	};
	SwitchExpression = new Rexjs(SwitchExpression, Expression);

	SwitchExpression.props({
		body: null,
		condition: null,
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
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		}
	});

	return SwitchExpression;
}();

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
			contentBuilder.appendContext(this.declaration);

			// 提取 case 语句块
			this.statements.extractTo(contentBuilder);
		},
		declaration: null,
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		statements: null,
		value: null
	});

	return CaseExpression;
}();

this.DefaultCaseExpression = function(CaseExpression){
	/**
	 * switch default 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DefaultCaseExpression(context){
		CaseExpression.call(this, context);
	};
	DefaultCaseExpression = new Rexjs(DefaultCaseExpression, CaseExpression);

	DefaultCaseExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 添加 case 关键字
			contentBuilder.appendContext(this.context);
			// 添加冒号
			contentBuilder.appendContext(this.declaration);

			// 提取 case 语句块
			this.statements.extractTo(contentBuilder);
		},
		value: null
	});

	return DefaultCaseExpression;
}(
	this.CaseExpression
);

this.SwitchConditionStatement = function(){
	/**
	 * switch 条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SwitchConditionStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SwitchConditionStatement = new Rexjs(SwitchConditionStatement, ECMAScriptStatement);
	
	SwitchConditionStatement.props({
		blacklist: BLACKLIST_SEMICOLON,
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 跳出该语句
			this.out()
				.$expression
				.condition
				// 设置条件表达式的 inner
				.inner = this.expression;
			
			// 如果是小括号，返回关闭条件语句标签，否则返回 null
			return context.content === ")" ? closeSwitchConditionTag : null;
		}
	});
	
	return SwitchConditionStatement; 
}();

this.SwitchBodyStatements = function(){
	/**
	 * switch 主体语句块
	 */
	function SwitchBodyStatements(){
		ECMAScriptStatements.call(this);
	};
	SwitchBodyStatements = new Rexjs(SwitchBodyStatements, ECMAScriptStatements);

	SwitchBodyStatements.props({
		hasDefault: false
	});

	return SwitchBodyStatements;
}();

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
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 跳出该语句并设置临时表达式的 value
			this.out().$expression.value = this.expression;

			// 如果是关闭大括号，返回 caseDeclarationTag，否则返回 null
			return context.content === ":" ? caseDeclarationTag : null;
		}
	});
	
	return CaseValueStatement;
}();

this.CaseBodyStatement = function(EmptyStatementExpression){
	/**
	 * case 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CaseBodyStatement(statements){
		ECMAScriptStatement.call(this, statements);

		// todo: 去掉 EmptyStatementExpression
		this.expression = new EmptyStatementExpression(null);
	};
	CaseBodyStatement = new Rexjs(CaseBodyStatement, ECMAScriptStatement);
	
	CaseBodyStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var tag;

			switch(
				context.content
			){
				// 如果是 case 关键字
				case "case":
					tag = caseTag;
					break;
				
				// 如果是 default 关键字
				case "default":
					tag = defaultCaseTag;
					break;

				// 如果是结束大括号
				case "}":
					tag = closeSwitchBodyTag;
					break;

				// 默认
				default:
					// 返回 catch 结果
					return this.catch(parser, context);
			}

			var statements = this.statements, targetStatements = statements.target;

			// CaseExpression 转正并设置 statements
			targetStatements.statement.formalize().statements = statements;

			// 如果是结束小括号
			if(
				tag === closeSwitchBodyTag
			){
				// 恢复语句
				parser.statements = targetStatements.target;
				return tag;
			}

			// 恢复语句
			parser.statements = targetStatements;

			// 创建新语句
			targetStatements.newStatement();
			// 如果表达式可以结束，那么返回 tag，否则返回 null
			return (this.expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE ? tag : null;
		}
	});
	
	return CaseBodyStatement;
}(
	// Rexjs.EmptyStatementExpression
	EmptyExpression
);

this.CaseBodyStatements = function(CaseBodyStatement){
	/**
	 * case 语句块
	 */
	function CaseBodyStatements(){
		ECMAScriptStatements.call(this);
	};
	CaseBodyStatements = new Rexjs(CaseBodyStatements, ECMAScriptStatements);

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
	this.CaseBodyStatement
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
			// 设置临时表达式
			statement.$expression = new SwitchExpression(context);
		}
	});
	
	return SwitchTag;
}(
	this.SwitchExpression
);

this.OpenSwitchConditionTag = function(OpenParenTag, SwitchConditionStatement){
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
			statement.$expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new SwitchConditionStatement(statements);
		}
	});
	
	return OpenSwitchConditionTag;
}(
	this.OpenParenTag,
	this.SwitchConditionStatement
);

this.CloseSwitchConditionTag = function(CloseParenTag, WhileConditionStatement, WhileBodyStatement){
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
			statement.$expression.condition.close = context;
		}
	});
	
	return CloseSwitchConditionTag;
}(
	this.CloseParenTag,
	this.WhileConditionStatement,
	this.WhileBodyStatement
);

this.OpenSwitchBodyTag = function(OpenBraceTag, SwitchBodyStatements){
	/**
	 * switch 主体起始标签
	 */
	function OpenSwitchBodyTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenSwitchBodyTag = new Rexjs(OpenSwitchBodyTag, OpenBraceTag);
	
	OpenSwitchBodyTag.props({
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
			var bodyStatements = new SwitchBodyStatements();

			// 设置子句表达式
			(
				statement.$expression.body = new PartnerExpression(context)
			)
			// 设置 inner
			.inner = bodyStatements;

			// 记录当前语句块
			bodyStatements.target = statements;
			// 设置当前语句块
			parser.statements = bodyStatements;
		}
	});
	
	return OpenSwitchBodyTag;
}(
	this.OpenBraceTag,
	this.SwitchBodyStatements
);

this.CloseSwitchBodyTag = function(CloseBraceTag){
	/**
	 * switch 主体结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseSwitchBodyTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseSwitchBodyTag = new Rexjs(CloseSwitchBodyTag, CloseBraceTag);
	
	CloseSwitchBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.unexpectedTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 临时表达式转正并设置 close
			statement.formalize().body.close = context;
		}
	});
	
	return CloseSwitchBodyTag;
}(
	this.CloseBraceTag
);

this.CloseEmptySwitchBodyTag = function(CloseSwitchBodyTag, visitor){
	/**
	 * switch 空的主体结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseEmptySwitchBodyTag(_type){
		CloseSwitchBodyTag.call(this, _type);
	};
	CloseEmptySwitchBodyTag = new Rexjs(CloseEmptySwitchBodyTag, CloseSwitchBodyTag);
	
	CloseEmptySwitchBodyTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 恢复语句块
			statements = parser.statements = statements.target;
			// 重新记录 statement
			statement = statements.statement;

			// 设置 inner
			statement.$expression.body.inner = new EmptyExpression(null);
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return CloseEmptySwitchBodyTag;
}(
	this.CloseSwitchBodyTag,
	this.CloseSwitchBodyTag.prototype.visitor
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
			// 设置临时表达式
			statement.$expression = new CaseExpression(context);
			// 设置当前语句
			statements.statement = new CaseValueStatement(statements);
		}
	});

	return CaseTag;
}(
	this.CaseExpression,
	this.CaseValueStatement
);

this.DefaultCaseTag = function(DefaultTag, DefaultCaseExpression){
	/**
	 * switch 语句中的 default 标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultCaseTag(_type){
		DefaultTag.call(this, _type);
	};
	DefaultCaseTag = new Rexjs(DefaultCaseTag, DefaultTag);

	DefaultCaseTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagMaps){
			return tagMaps.caseDeclarationTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果已经存在 default 表达式
			if(
				statements.hasDefault
			){
				// 报错
				parser.error(context, "More than one default clause in switch statement");
				return;
			}

			// 设置临时表达式
			statement.$expression = new DefaultCaseExpression(context);
			// 设置 hasDefault
			statements.hasDefault = true;
		}
	});

	return DefaultCaseTag;
}(
	this.DefaultTag,
	this.DefaultCaseExpression
);

this.CaseDeclarationTag = function(ColonTag, CaseBodyStatements){
	/**
	 * case 申明标签，即 case 对应的冒号
	 * @param {Number} _type - 标签类型
	 */
	function CaseDeclarationTag(_type){
		ColonTag.call(this, _type);
	};
	CaseDeclarationTag = new Rexjs(CaseDeclarationTag, ColonTag);

	CaseDeclarationTag.props({
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
			// 设置临时表达式的 declaration
			statement.$expression.declaration = context;

			// 设置当前语句块
			(
				parser.statements = new CaseBodyStatements()
			)
			// 设置 target
			.target = statements;
		}
	});

	return CaseDeclarationTag;
}(
	this.ColonTag,
	this.CaseBodyStatements
);

closeSwitchConditionTag = new this.CloseSwitchConditionTag();
closeSwitchBodyTag = new this.CloseSwitchBodyTag();
caseTag = new this.CaseTag();
defaultCaseTag = new this.DefaultCaseTag();
caseDeclarationTag = new this.CaseDeclarationTag();

}.call(
	this,
	// closeSwitchConditionTag
	null,
	// closeSwitchBodyTag
	null,
	// caseTag
	null,
	// defaultCaseTag
	null,
	// caseDeclarationTag
	null
);


// 其他单标签
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

this.SpreadTag = function(){
	/**
	 * 拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function SpreadTag(_type){
		SyntaxTag.call(this, _type);
	};
	SpreadTag = new Rexjs(SpreadTag, SyntaxTag);
	
	SpreadTag.props({
		order: 100,
		regexp: /\.{3}/
	});
	
	return SpreadTag;
}();

}.call(
	this
);


// 基类标签列表
void function(SyntaxTag){

this.ECMAScriptTags = function(DefaultTags, data){
	/**
	 * ECMAScript 标签列表
	 * @param {String} _id - 该标签列表的 id
	 */
	function ECMAScriptTags(_id){
		DefaultTags.call(this, _id);
		
		// 遍历标签数据
		data.forEach(
			function(dt){
				var type = dt.type;
				
				// 遍历标签列表
				dt.list.forEach(
					function(SyntaxTag){
						// 添加标签
						this.register(
							// 实例化标签
							new SyntaxTag(type)
						);
					},
					this
				);
			},
			this
		);
	};
	ECMAScriptTags = new Rexjs(ECMAScriptTags, DefaultTags);
	
	return ECMAScriptTags;
}(
	Rexjs.DefaultTags,
	// data
	[
		// 可以捕获的标签
		{
			type: TYPE_MATCHABLE,
			list: [
				this.SingleLineCommentTag,
				this.OpenMultiLineCommentTag
			]
		},
		// 未捕获的标签
		{
			type: TYPE_UNEXPECTED,
			// 这个数组一定要按顺序
			list: [
				this.BasicAssignmentTag,
				this.ShorthandAssignmentTag,
				this.LogicalORTag,
				this.LogicalANDTag,
				this.BitwiseORTag,
				this.BitwiseXORTag,
				this.BitwiseANDTag,
				this.IdentityTag,
				this.NonidentityTag,
				this.EqualityTag,
				this.InequalityTag,
				this.LessThanTag,
				this.GreaterThanTag,
				this.LessThanOrEqualTag,
				this.GreaterThanOrEqualTag,
				this.InstanceofTag,
				this.InTag,
				this.LeftShiftTag,
				this.RightShiftTag,
				this.AdditionTag,
				this.SubtractionTag,
				this.MultiplicationTag,
				this.DivisionTag,
				this.RemainderTag
			]
			// 这个数组可以不按顺序
			.concat([
				this.CaseTag,
				this.CatchTag,
				this.ColonTag,
				this.CommaTag,
				this.CloseBraceTag,
				this.CloseBracketTag,
				this.CloseParenTag,
				this.DefaultTag,
				this.DotAccessorTag,
				this.ElseTag,
				this.FinallyTag,
				this.SpreadTag
			])
		},
		// 可能被误解的标签
		{
			type: TYPE_MISTAKABLE,
			// 不需要按顺序
			list: [
				this.FileEndTag,
				this.EmptyStatementTag,
				this.PlusTag,
				this.NegationTag,
				this.IncrementTag,
				this.BitwiseNOTTag,
				this.LogicalNOTTag,
				this.OpenArrayTag,
				this.OpenBlockTag,
				this.OpenGroupingTag,
				this.LabelTag,
				this.BooleanTag,
				this.RegExpTag,
				this.NumberTag,
				this.StringTag,
				this.BreakTag,
				this.ContinueTag,
				this.DebuggerTag,
				this.DeleteTag,
				this.DoTag,
				this.ForTag,
				this.IfTag,
				this.NewTag,
				this.NullTag,
				this.ReturnTag,
				this.SwitchTag,
				this.ThisTag,
				this.ThrowTag,
				this.TryTag,
				this.TypeofTag,
				this.VarTag,
				this.VoidTag,
				this.WhileTag
			]
		}
	]
);
	
}.call(
	this,
	Rexjs.SyntaxTag
);


// 基类标签列表
void function(ECMAScriptTags){

this.ExpressionTags = function(VariableTag){
	/**
	 * 表达式标签列表
	 * @param {String} _id - 该标签列表的 id
	 */
	function ExpressionTags(_id){
		ECMAScriptTags.call(this, _id);
		
		this.register(
			new VariableTag()
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
	this.VariableTag
);

this.ExpressionContextTags = function(StatementEndTag, ExpressionBreakTag, OpenBracketAccessorTag, BinaryTag, CommaTag){
	/**
	 * 表达式上下文标签列表
	 * @param {String} _id - 该标签列表的 id
	 */
	function ExpressionContextTags(_id){
		ECMAScriptTags.call(this, _id);
		
		// 注册标签
		this.register(
			new StatementEndTag(),
			new ExpressionBreakTag(),
			new OpenBracketAccessorTag()
		);
	};
	ExpressionContextTags = new Rexjs(ExpressionContextTags, ECMAScriptTags);
	
	ExpressionContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是表达式上下文标签
			if(
				tag.class.expressionContext
			){
				var type = TYPE_MATCHABLE;

				switch(
					true
				){
					// 如果是二元标签
					case tag instanceof BinaryTag:
					// 如果是逗号标签
					case tag instanceof CommaTag:
						type = TYPE_MISTAKABLE;
						break;
				}

				// 重新绑定类型
				tag.type = new TagType(type);
			}
			
			return false;
		},
		id: "expressionContextTags"
	});
	
	return ExpressionContextTags;
}(
	this.StatementEndTag,
	this.ExpressionBreakTag,
	this.OpenBracketAccessorTag,
	this.BinaryTag,
	this.CommaTag
);

this.StatementTags = function(){
	/**
	 * 语句标签列表
	 * @param {String} _id - 该标签列表的 id
	 */
	function StatementTags(_id){
		ECMAScriptTags.call(this, _id);
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
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
			}
			
			return false;
		},
		id: "statementTags"
	});
	
	return StatementTags;
}();

this.StatementEndTags = function(StatementEndTag, StatementBreakTag){
	/**
	 * 语句结束标签列表
	 * @param {String} _id - 该标签列表的 id
	 */
	function StatementEndTags(_id){
		ECMAScriptTags.call(this, _id);
		
		this.register(
			new StatementEndTag(),
			new StatementBreakTag()
		);
	};
	StatementEndTags = new Rexjs(StatementEndTags, ECMAScriptTags);
	
	StatementEndTags.props({
		id: "statementEndTags"
	});
	
	return StatementEndTags;
}(
	this.StatementEndTag,
	this.StatementBreakTag
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

}.call(
	this,
	this.ECMAScriptTags
);


// 其他标签列表
void function(ECMAScriptTags, ExpressionTags, ExpressionContextTags, StatementTags, StatementEndTags){

this.BlockTags = function(OpenBlockTag){
	/**
	 * 语句块标签列表
	 */
	function BlockTags(){
		ECMAScriptTags.call(this, "blockTags");
		
		this.register(
			new OpenBlockTag()
		);
	};
	BlockTags = new Rexjs(BlockTags, ECMAScriptTags);
	
	return BlockTags;
}(
	this.OpenBlockTag
);

this.CaseDeclarationTags = function(CaseDeclarationTag){
	/**
	 * case 声明标签列表
	 */
	function CaseDeclarationTags(){
		ECMAScriptTags.call(this, "caseDeclarationTags");

		this.register(
			new CaseDeclarationTag()
		);
	};
	CaseDeclarationTags = new Rexjs(CaseDeclarationTags, ECMAScriptTags);

	return CaseDeclarationTags;
}(
	this.CaseDeclarationTag
);

this.CaseDeclarationContextTags = function(CloseSwitchBodyTag, CaseTag, DefaultCaseTag){
	/**
	 * case 声明上下文标签列表
	 */
	function CaseDeclarationContextTags(){
		StatementTags.call(this, "caseDeclarationContextTags");

		this.register(
			new CloseSwitchBodyTag(),
			new CaseTag(),
			new DefaultCaseTag()
		);
	};
	CaseDeclarationContextTags = new Rexjs(CaseDeclarationContextTags, StatementTags);

	return CaseDeclarationContextTags;
}(
	this.CloseSwitchBodyTag,
	this.CaseTag,
	this.DefaultCaseTag
);

this.CatchedExceptionTags = function(OpenCatchedExceptionTag){
	/**
	 * 被捕获的异常标签列表
	 */
	function CatchedExceptionTags(){
		ECMAScriptTags.call(this, "catchedExceptionTags");
		
		this.register(
			new OpenCatchedExceptionTag()
		);
	};
	CatchedExceptionTags = new Rexjs(CatchedExceptionTags, ECMAScriptTags);
	
	return CatchedExceptionTags;
}(
	this.OpenCatchedExceptionTag
);

this.CloseCatchedExceptionTags = function(CloseCatchedExceptionTag){
	/**
	 * 被捕获的异常结束标签标签列表
	 */
	function CloseCatchedExceptionTags(){
		ECMAScriptTags.call(this, "closeCatchedExceptionTags");
		
		this.register(
			new CloseCatchedExceptionTag()
		);
	};
	CloseCatchedExceptionTags = new Rexjs(CloseCatchedExceptionTags, ECMAScriptTags);
	
	return CloseCatchedExceptionTags;
}(
	this.CloseCatchedExceptionTag
);

this.CommentContextTags = function(LineTerminatorTag, CommentContentTag, CloseMultiLineCommentTag){
	/**
	 * 注释上下文标签列表
	 */
	function CommentContextTags(){
		ECMAScriptTags.call(this, "commentContextTags");
		
		this.register(
			new LineTerminatorTag(),
			new CommentContentTag(),
			new CloseMultiLineCommentTag()
		);
	};
	CommentContextTags = new Rexjs(CommentContextTags, ECMAScriptTags);
	
	return CommentContextTags;
}(
	Rexjs.LineTerminatorTag,
	this.CommentContentTag,
	this.CloseMultiLineCommentTag
);

this.DoWhileConditionTags = function(OpenDoWhileConditionTag){
	/**
	 * do while 条件标签列表
	 */
	function DoWhileConditionTags(){
		ECMAScriptTags.call(this, "doWhileConditionTags");
		
		this.register(
			new OpenDoWhileConditionTag()
		);
	};
	DoWhileConditionTags = new Rexjs(DoWhileConditionTags, ECMAScriptTags);
	
	return DoWhileConditionTags;
}(
	this.OpenDoWhileConditionTag
);

this.DotContextTags = function(PropertyNameTag){
	function DotContextTags(){
		ECMAScriptTags.call(this, "dotContextTags");
		
		this.register(
			new PropertyNameTag()
		);
	};
	DotContextTags = new Rexjs(DotContextTags, ECMAScriptTags);
	
	return DotContextTags;
}(
	this.PropertyNameTag
);

this.ExceptionVariableTags = function(ExceptionVariableTag){
	/**
	 * catch 语句异常变量标签列表
	 */
	function ExceptionVariableTags(){
		ECMAScriptTags.call(this, "exceptionVariableTags");
		
		this.register(
			new ExceptionVariableTag()
		);
	};
	ExceptionVariableTags = new Rexjs(ExceptionVariableTags, ECMAScriptTags);
	
	return ExceptionVariableTags;
}(
	this.ExceptionVariableTag
);

this.FileStartTags = function(FileStartTag){
	/**
	 * 文件起始标签列表
	 */
	function FileStartTags(){
		ECMAScriptTags.call(this, "fileStartTags");
		
		this.register(
			new FileStartTag()
		);
	};
	FileStartTags = new Rexjs(FileStartTags, ECMAScriptTags);
	
	FileStartTags.props({
		entrance: true
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
		ECMAScriptTags.call(this, "forConditionTags");
		
		this.register(
			new OpenForConditionTag()
		);
	};
	ForConditionTags = new Rexjs(ForConditionTags, ECMAScriptTags);
	
	return ForConditionTags;
}(
	this.OpenForConditionTag
);

this.ForConditionContextTags = function(VarTag){
	/**
	 * for 条件上下文标签列表
	 */
	function ForConditionTags(){
		ExpressionTags.call(this, "forConditionContextTags");
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
		}
	});
	
	return ForConditionTags;
}(
	this.VarTag
);

this.IfConditionTags = function(OpenIfConditionTag){
	/**
	 * if 条件标签列表
	 */
	function IfConditionTags(){
		ECMAScriptTags.call(this, "ifConditionTags");
		
		this.register(
			new OpenIfConditionTag()
		);
	};
	IfConditionTags = new Rexjs(IfConditionTags, ECMAScriptTags);
	
	return IfConditionTags;
}(
	this.OpenIfConditionTag
);

this.InitingVariableContextTags = function(BasicAssignmentTag, IllegalShorthandAssignmentTag){
	/**
	 * 正在初始化的变量上下文标签列表
	 */
	function InitingVariableContextTags(){
		StatementEndTags.call(this, "initingVariableContextTags");

		this.register(
			new IllegalShorthandAssignmentTag()
		);
	};
	InitingVariableContextTags = new Rexjs(InitingVariableContextTags, StatementEndTags);

	InitingVariableContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(
				tag instanceof BasicAssignmentTag
			){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
			}
			
			return false;
		}
	})
	
	return InitingVariableContextTags;
}(
	this.BasicAssignmentTag,
	this.IllegalShorthandAssignmentTag
);

this.LabelContextTags = function(LabelColonTag){
	/**
	 * 标记标签上下文列表
	 */
	function LabelContextTags(){
		ExpressionContextTags.call(this, "labelContextTags");
		
		this.register(
			new LabelColonTag()
		);
	};
	LabelContextTags = new Rexjs(LabelContextTags, ExpressionContextTags);
	
	return LabelContextTags;
}(
	this.LabelColonTag
);

this.NegationContextTags = function(NegationSiblingTag, DecrementSiblingTag){
	/**
	 * 正号上下文标签列表
	 */
	function NegationContextTags(){
		ExpressionTags.call(this, "negationContextTags");
		
		this.register(
			new NegationSiblingTag(),
			new DecrementSiblingTag()
		);
	};
	NegationContextTags = new Rexjs(NegationContextTags, ExpressionTags);
	
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
		ExpressionTags.call(this, "newContextTags");
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
		}
	});
	
	return NewContextTags;
}(
	this.UnaryTag,
	this.NewTag,
	this.ExpressionTags.prototype.filter
);

this.OpenBlockContextTags = function(CloseEmptyBlockTag){
	/**
	 * 语句块起始上下文标签列表
	 */
	function OpenBlockContextTags(){
		StatementTags.call(this, "openBlockContextTags");

		this.register(
			new CloseEmptyBlockTag()
		);
	};
	OpenBlockContextTags = new Rexjs(OpenBlockContextTags, StatementTags);
	
	return OpenBlockContextTags;
}(
	this.CloseEmptyBlockTag
);

this.OpenSwitchBodyContextTags = function(CloseEmptySwitchBodyTag, CaseTag, DefaultCaseTag){
	/**
	 * switch 语句块起始上下文标签列表
	 */
	function OpenSwitchBodyContextTags(){
		ECMAScriptTags.call(this, "openSwitchBodyContextTags");
		
		this.register(
			new CloseEmptySwitchBodyTag(),
			new CaseTag(),
			new DefaultCaseTag()
		);
	};
	OpenSwitchBodyContextTags = new Rexjs(OpenSwitchBodyContextTags, ECMAScriptTags);
	
	return OpenSwitchBodyContextTags;
}(
	this.CloseEmptySwitchBodyTag,
	this.CaseTag,
	this.DefaultCaseTag
);

this.PlusContextTags = function(PlusSiblingTag, IncrementSiblingTag){
	/**
	 * 正号上下文标签列表
	 */
	function PlusContextTags(){
		ExpressionTags.call(this, "plusContextTags");
		
		this.register(
			new PlusSiblingTag(),
			new IncrementSiblingTag()
		);
	};
	PlusContextTags = new Rexjs(PlusContextTags, ExpressionTags);
	
	return PlusContextTags;
}(
	this.PlusSiblingTag,
	this.IncrementSiblingTag
);

this.ReturnContextTags = function(StatementEndTag, StatementBreakTag){
	/**
	 * return 上下文标签列表
	 */
	function ReturnContextTags(){
		ExpressionTags.call(this, "returnContextTags");
		
		this.register(
			new StatementEndTag(),
			new StatementBreakTag()
		);
	};
	ReturnContextTags = new Rexjs(ReturnContextTags, ExpressionTags);
	
	return ReturnContextTags;
}(
	this.StatementEndTag,
	this.StatementBreakTag
);

this.SwitchBlockTags = function(OpenSwitchBodyTag){
	/**
	 * switch 语句块标签列表
	 */
	function SwitchBlockTags(){
		ECMAScriptTags.call(this, "switchBlockTags");
		
		this.register(
			new OpenSwitchBodyTag()
		);
	};
	SwitchBlockTags = new Rexjs(SwitchBlockTags, ECMAScriptTags);
	
	return SwitchBlockTags;
}(
	this.OpenSwitchBodyTag
);

this.SwitchConditionTags = function(OpenSwitchConditionTag){
	/**
	 * switch 条件标签列表
	 */
	function SwitchConditionTags(){
		ECMAScriptTags.call(this, "switchConditionTags");
		
		this.register(
			new OpenSwitchConditionTag()
		);
	};
	SwitchConditionTags = new Rexjs(SwitchConditionTags, ECMAScriptTags);
	
	return SwitchConditionTags;
}(
	this.OpenSwitchConditionTag
);

this.TerminatedFlowContextTags = function(LabelledIdentifierTag){
	/**
	 * 中断流上下文标签列表
	 */
	function TerminatedFlowContextTags(){
		StatementEndTags.call(this, "terminatedFlowContextTags");
		
		this.register(
			new LabelledIdentifierTag()
		);
	};
	TerminatedFlowContextTags = new Rexjs(TerminatedFlowContextTags, StatementEndTags);
	
	return TerminatedFlowContextTags;
}(
	this.LabelledIdentifierTag
);

this.ThrowContextTags = function(ThrowContextLineTerminatorTag){
	/**
	 * throw 关键字上下文标签
	 */
	function ThrowContextTags(){
		ExpressionTags.call(this, "throwContextTags");
		
		this.register(
			new ThrowContextLineTerminatorTag()
		);
	};
	ThrowContextTags = new Rexjs(ThrowContextTags, ExpressionTags);
	
	return ThrowContextTags;
}(
	this.ThrowContextLineTerminatorTag
);

this.VarContextTags = function(InitingVariableTag){
	/**
	 * var 语句上下文标签列表
	 */
	function VarContextTags(){
		ECMAScriptTags.call(this, "varContextTags");
		
		this.register(
			new InitingVariableTag()
		);
	};
	VarContextTags = new Rexjs(VarContextTags, ECMAScriptTags);
	
	return VarContextTags;
}(
	this.InitingVariableTag
);

this.WhileConditionTags = function(OpenWhileConditionTag){
	/**
	 * while 条件标签列表
	 */
	function WhileConditionTags(){
		ECMAScriptTags.call(this, "whileConditionTags");
		
		this.register(
			new OpenWhileConditionTag()
		);
	};
	WhileConditionTags = new Rexjs(WhileConditionTags, ECMAScriptTags);
	
	return WhileConditionTags;
}(
	this.OpenWhileConditionTag
);

}.call(
	this,
	this.ECMAScriptTags,
	this.ExpressionTags,
	this.ExpressionContextTags,
	this.StatementTags,
	this.StatementEndTags
);


// 语法配置相关
void function(){

this.ECMAScript6Config = function(forConfig){
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
			return this.forOf;
		},
		/**
		 * 设置是否应该编译 ECMAScript6 的所有表达式
		 * @param {Boolean} value - 是否编译
		 */
		set all(value){
			this.forOf = value;
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
		}
	});

	return ECMAScript6Config;
}(
	// forConfig
	this.ForExpression.config
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
		this.StatementTags,
		this.StatementEndTags,
		this.UnexpectedTags,
		// 其他标签列表
		this.BlockTags,
		this.CaseDeclarationTags,
		this.CaseDeclarationContextTags,
		this.CatchedExceptionTags,
		this.CloseCatchedExceptionTags,
		this.CommentContextTags,
		this.DoWhileConditionTags,
		this.DotContextTags,
		this.ExceptionVariableTags,
		this.FileStartTags,
		this.ForConditionTags,
		this.ForConditionContextTags,
		this.IfConditionTags,
		this.InitingVariableContextTags,
		this.LabelContextTags,
		this.NegationContextTags,
		this.NewContextTags,
		this.OpenBlockContextTags,
		this.OpenSwitchBodyContextTags,
		this.PlusContextTags,
		this.ReturnContextTags,
		this.SwitchBlockTags,
		this.SwitchConditionTags,
		this.TerminatedFlowContextTags,
		this.ThrowContextTags,
		this.VarContextTags,
		this.WhileConditionTags
	]
);

this.ECMAScriptParser = function(ECMAScriptTagsMap, tagsMap, parse){
	/**
	 * ECMAScript 语法解析器
	 */
	function ECMAScriptParser(){
		SyntaxParser.call(this);
	};
	ECMAScriptParser = new Rexjs(ECMAScriptParser, SyntaxParser);

	ECMAScriptParser.props({
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
				new ECMAScriptStatements()
			);
		}
	});

	return ECMAScriptParser;
}(
	this.ECMAScriptTagsMap,
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
	Rexjs.Expression,
	Rexjs.ListExpression,
	Rexjs.EmptyExpression,
	Rexjs.PartnerExpression,
	Rexjs.LeftHandSideExpression,
	// ECMAScriptStatement
	null,
	// ECMAScriptStatements
	null,
	Rexjs.SyntaxConfig,
	Rexjs.SyntaxTag,
	Rexjs.TagType,
	Rexjs.TagClass.CLASS_STATEMENT_BEGIN,
	Rexjs.TagClass.CLASS_EXPRESSION,
	Rexjs.TagClass.CLASS_EXPRESSION_CONTEXT,
	Rexjs.TagType.TYPE_MATCHABLE,
	Rexjs.TagType.TYPE_UNEXPECTED,
	Rexjs.TagType.TYPE_MISTAKABLE,
	Rexjs.Expression.STATE_STATEMENT_ENDABLE,
	Rexjs.Expression.STATE_STATEMENT_END,
	Rexjs.Expression.STATE_STATEMENT_ENDED,
	Rexjs.Statement.BLACKLIST_ASSGINMENT,
	Rexjs.Statement.BLACKLIST_SEMICOLON,
	Rexjs.Statement.BLACKLIST_COMMA,
	// IDENTIFIER_REGEXP_SOURCE
	/(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*/
		.toString()
		.match(
			/^\/([\s\S]*)\/$/
		)[1]
);