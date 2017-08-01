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