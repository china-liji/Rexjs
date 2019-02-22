import { SyntaxTag, CLASS_EXPRESSION } from "../core";
import { ParserMethod } from "../parser-env/parser-method";
import { ECMAScriptErrors } from "../ecmascript/ecmascript-errors";
import { ECMAScriptOrders } from "../ecmascript";
import { IdentifierExpression } from "./identifier-expression";

export let IdentifierTag = function(RegExg, REGEXP_SOURCE, exceptions, constantIdentifiers, constantKeywords, nonconstantKeywords, regexp){
	/**
	 * 标识符标签
	 * @param {Number} _type - 标签类型
	 */
	class IdentifierTag extends SyntaxTag {
		/**
		 * 标签种类分类
		 * @type {Number}
		 */
		$class = CLASS_EXPRESSION;

		/**
		 * 常量声明时的错误类型
		 * @type {String}
		 */
		errorType = "CONST";

		/**
		 * 标签顺序
		 * @type {Number}
		 */
		order = ECMAScriptOrders.IDENTIFIER;

		/**
		 * 异常时需要抛出的信息
		 * @type {String}
		 */
		throw = "identifier";

		/**
		 * 获取标识符正则的源字符串
		 * @returns {RegExp}
		 */
		static get REGEXP_SOURCE(){
			return REGEXP_SOURCE;
		};

		/**
		 * 编译该标识符的表达式
		 * @param {String} exception - 会意外冲突的内容，则正则不会匹配到该内容
		 * @param {String} exception - 会意外冲突的内容，则正则不会匹配到该内容
		 * @returns {RegExp}
		 */
		static compileRegExp(exception, _regexpSource){
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
		};

		/**
		 * 获取所有非关键字系统默认常量
		 * @returns {Array}
		 */
		static get constantIdentifiers(){
			return constantIdentifiers.slice();
		};

		/**
		 * 获取所有常量关键字
		 * @returns {Array}
		 */
		static get constantKeywords(){
			return constantKeywords.slice();
		};

		/**
		 * 获取所有常量
		 * @returns {Array}
		 */
		static get constants(){
			return constantIdentifiers.concat(constantKeywords);
		};

		/**
		 * 非标识符的词组
		 * @returns {Array}
		 */
		static get exceptions(){
			return exceptions.slice();
		};

		/**
		 * 设置非标识符的词组，并根据关键字重新编译该类的正则表达式
		 * @param {Array} value - 包含所有关键字的数组
		 * @returns {Array}
		 */
		static set exceptions(value){
			// 记录值
			exceptions = value;

			// 生成表达式
			regexp = this.compileRegExp(
				exceptions.join("|")
			);
		};

		/**
		 * 获取所有关键字
		 * @returns {Array}
		 */
		static get keywords(){
			return constantKeywords.concat(nonconstantKeywords);
		};

		/**
		 * 获取所有非常量关键字
		 * @returns {Array}
		 */
		static get nonconstantKeywords(){
			return nonconstantKeywords.slice();
		};

		/**
		 * 判断变量名，是否已被指定收集器收集，如果已被收集则报错
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 * @returns {Boolean}
		 */
		collected(parser, context, statements){
			let content = context.content;

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
		};

		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 * @returns {Boolean}
		 */
		containsBy(variable, collections){
			return collections.const.contains(variable);
		};

		/**
		 * 获取下一个语句块
		 * @params {ECMAScriptStatements} statements - 当前语句块
		 * @returns {ECMAScriptStatements}
		 */
		nextStatementsOf(statements){
			return statements.target;
		};

		/**
		 * 获取正则表达式
		 * @returns {RegExp}
		 */
		get regexp(){
			return regexp;
		};

		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 * @returns {SyntaxTagsMap}
		 */
		require(tagsMap){
			return tagsMap.expressionContextTags;
		};

		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 * @returns {void}
		 */
		visitor(parser, context, statement){
			// 设置表达式
			statement.expression = new IdentifierExpression(context);
		};
	};

	// 设置 exceptions，并触发编译正则
	IdentifierTag.exceptions = constantIdentifiers.concat(IdentifierTag.keywords);
	return IdentifierTag;
}(
	RegExp,
	// REGEXP_SOURCE
	ParserMethod.getIdentifierRegExpSource(),
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