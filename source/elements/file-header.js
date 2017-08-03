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
	IDENTIFIER_REGEXP_SOURCE
){
"use strict";