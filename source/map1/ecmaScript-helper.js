//ECMAScript 辅助类
!function(){

this.ECMAScriptErrors = function(REGEXP){
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
		JSX_ADJACENT_ELEMENT: "Adjacent JSX elements must be wrapped in an enclosing tag",
		JSX_CLOSING_TAG: "Expected corresponding JSX closing tag for <${1}>",
		ILLEGAL_STATEMENT: "Illegal ${1} statement",
		KEYWORD: '"${1}" keyword unexpected here',
		LABEL: 'Undefined ${1} label "${2}"',
		MISSING_INITIALIZER: "Missing initializer in const declaration",
		NEWLINE: "Illegal newline",
		NEWLINE_AFTER_THROW: "Illegal newline after throw",
		NEWLINE_BEFORE_ARROW: "Illegal newline before arrow",
		PREFIX_OPERATION: "Invalid left-hand side expression in prefix operation",
		POSTFIX_OPERATION: "Invalid left-hand side expression in postfix operation",
		REDECLARATION: 'Identifier "${1}" has already been declared',
		REGEXP_FLAGS: "Invalid regular expression flags",
		REST_ELEMENT: "Rest element must be last element",
		REST_PARAMETER: "Rest parameter must be last formal parameter",
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
		 * @param {String} _args - 需要替换的参数
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

this.ECMAScriptOrders = function(){
	/**
	 * 标签优先级顺序
	 */
	function ECMAScriptOrders(){};
	ECMAScriptOrders = new Rexjs(ECMAScriptOrders);

	ECMAScriptOrders.static({
		OPENING_ARROW_FUNCTION_BODY: 100,
		OPENING_BRACKET_ACCESSOR: 100,
		OPENING_CALL: 100,
		SPECIAL_LINE_TERMINATOR: 100,
		STATEMENT_END: 100,
		DOT_ACCESSOR: 101,
		EXPRESSION_BREAK: 101,
		MATHEMATICAL_NUMBER: 101,
		OPENING_SUPER_METHOD_CALL: 101,
		SPREAD: 101,
		BINARY: 200,
		NEGATION_SIBLING: 200,
		PLUS_SIBLING: 200,
		ARROW: 201,
		GREATER_THAN_OR_EQUAL: 201,
		LEFT_SHIFT: 201,
		LESS_THAN_OR_EQUAL: 201,
		LOGICAL_AND: 201,
		LOGICAL_OR: 201,
		RIGHT_SHIFT: 201,
		SUPER_PROPERTY_ASSIGNMENT: 201,
		EQUALITY: 202,
		EXPONENTIATION: 201,
		UNARY_ASSIGNMENT: 202,
		INEQUALITY: 200,
		UNSIGNED_RIGHT_SHIFT: 202,
		IDENTITY: 203,
		NONIDENTITY: 201,
		DESTRUCTURING_ASSIGNMENT: 201,
		POSTFIX_UNARY_ASSIGNMENT: 203,
		SHORTHAND_ASSIGNMENT: 203,
		SUPER_PROPERTY_SHORTHAND_ASSIGNMENT: 204,
		SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT: 204,
		JSX_ADJACENT_ELEMENT: 201,
		IDENTIFIER: 300,
		ENV_CONSTANT: 300,
		TARGET: 301,
		VARIABLE: 301,
		WORD_PROPERTY_NAME: 301,
		ACCESSOR_PROPERTY_NAME: 302,
		FUNCTION_VARIABLE: 302,
		PROPERTY_NAME: 303,
		STATIC_MODIFIER: 304,
		COMMENT: 400,
		OPENING_RESTRICTED_COMMENT: 401,
		COMMENT_CONTENT: 402,
		ILLEGAL_LINE_TERMINATOR: 403,
		TEMPLATE_CONTENT: 500,
		TEMPLATE_PARAMETER: 501,
		TEMPLATE_SPECIAL_CONTENT: 501,
		JSX_TEXT: 501,
		JSX_LINE_TERMINATOR: 502,
		FILE_START: 600
	});

	return ECMAScriptOrders;
}();

}.call(
	this
);