// 标识符标签相关
!function(){

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

this.IdentifierTag = function(IdentifierExpression, RegExg, REGEXP_SOURCE, exceptions, constantIdentifiers, constantKeywords, nonconstantKeywords, regexp){
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
		 * 获取标识符正则的源字符串
		 */
		get REGEXP_SOURCE(){
			return REGEXP_SOURCE;
		},
		/**
		 * 编译该标识符的表达式
		 * @param {String} exception - 会意外冲突的内容，则正则不会匹配到该内容
		 * @param {String} exception - 会意外冲突的内容，则正则不会匹配到该内容
		 */
		compileRegExp: function(exception, _regexpSource){
			_regexpSource = _regexpSource || REGEXP_SOURCE;

			return new RegExp(
				"(?:" +
					// 当 exception = "var"，匹配 var$、var_、vara、var中文 等情况
					"(?:" + exception + ")|" +
					// 当 exception = "var"，匹配 var1、var1_、var1$、var1中文 等情况
					"(?=(?:" + exception + ")\\d+)|" +
					// 匹配 abc、_abc、$abc、中文abc 等情况
					"(?!" + exception + ")" +
				")" +
				_regexpSource
			);
		},
		/**
		 * 获取所有非关键字系统默认常量
		 */
		get constantIdentifiers(){
			return constantIdentifiers.slice();
		},
		/**
		 * 获取所有常量关键字
		 */
		get constantKeywords(){
			return constantKeywords.slice();
		},
		/**
		 * 获取所有常量
		 */
		get constants(){
			return constantIdentifiers.concat(constantKeywords);
		},
		/**
		 * 非标识符的词组
		 */
		get exceptions(){
			return exceptions.slice();
		},
		/**
		 * 设置非标识符的词组，并根据关键字重新编译该类的正则表达式
		 * @param {Array} value - 包含所有关键字的数组
		 */
		set exceptions(value){
			// 记录值
			exceptions = value;

			// 生成表达式
			regexp = this.compileRegExp(
				exceptions.join("|")
			);
		},
		/**
		 * 获取所有关键字
		 */
		get keywords(){
			return constantKeywords.concat(nonconstantKeywords);
		},
		/**
		 * 获取所有非常量关键字
		 */
		get nonconstantKeywords(){
			return nonconstantKeywords.slice();
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
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
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

	// 设置 exceptions，并触发编译正则
	IdentifierTag.exceptions = constantIdentifiers.concat(IdentifierTag.keywords);
	return IdentifierTag;
}(
	this.IdentifierExpression,
	RegExp,
	// REGEXP_SOURCE
	getIdentifierRegExpSource(),
	// exceptions
	null,
	// constantIdentifiers
	["eval", "arguments"],
	// constantKeywords
	[
		"false", "null", "this", "true"
	],
	// nonconstantKeywords
	[
		"break", "case", "catch", "class", "const", "continue",
		"debugger", "default", "delete", "do", "else", "export", "extends",
		"finally", "for", "function", "if", "import", "in(?!stanceof)", "instanceof",
		"let", "new", "return", "static", "super", "switch",
		"throw", "try", "typeof", "var", "void", "while", "with", "yield"
	],
	// regexp
	null
);

}.call(
	this
);