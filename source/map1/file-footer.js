Rexjs.static(this);
}.call(
	globalThis,
	Rexjs,
	Rexjs.ContentBuilder,
	Rexjs.Expression,
	Rexjs.ListExpression,
	Rexjs.EmptyExpression,
	Rexjs.DefaultExpression,
	Rexjs.PartnerExpression,
	Rexjs.LeftHandSideExpression,
	// ECMAScriptStatement
	globalThis.ECMAScriptStatement,
	// BoxStatement
	globalThis.BoxStatement,
	// ECMAScriptErrors
	globalThis.ECMAScriptErrors,
	// ECMAScriptOrders
	globalThis.ECMAScriptOrders,
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
	// config
	new Rexjs.SyntaxConfig("es6Base", "es6Module", "rexjs", "jsx"),
	globalThis.Method.visitor,
	globalThis.Method.getIdentifierRegExpSource
);