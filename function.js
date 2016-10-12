
// 函数主体相关标签
void function(){

this.OpenFunctionBodyTag = function(OpenCurlyTag){
	/**
	 * 函数主体起始大括号标签
	 */
	function OpenFunctionBodyTag(){
		OpenCurlyTag.call(this);
	};
	OpenFunctionBodyTag = new Rexjs(OpenFunctionBodyTag, OpenCurlyTag);
	
	OpenFunctionBodyTag.props({
		require : function(tagsMap){
			return tagsMap.closeFunctionBodyTags;
		},
		transformer : function(statement, context){
			statement.expression.body = context;
		}
	});
	
	return OpenFunctionBodyTag;
}(
	this.OpenCurlyTag
);

this.CloseFunctionBodyTag = function(CloseCurlyTag){
	/**
	 * 函数主体结束大括号标签
	 */
	function CloseFunctionBodyTag(){
		CloseCurlyTag.call(this);
	};
	CloseFunctionBodyTag = new Rexjs(CloseFunctionBodyTag, CloseCurlyTag);
	
	CloseFunctionBodyTag.props({
		transformer : function(statement, context){
			var functionExpression = statement.expression;
			
			functionExpression.body = context;
			
			functionExpression.end();
		}
	});
	
	return CloseFunctionBodyTag;
}(
	this.CloseCurlyTag
);

}.call(
	this
);


// 函数参数相关标签
void function(){

this.Argument = function(Expression){
	/**
	 * 函数参数
	 * @param {Context} name - 函数名上下文
	 */
	function Argument(name){
		Expression.call(this);
		
		this.name = name;
	};
	Argument = new Rexjs(Argument, Expression);
	
	return Argument;
}(
	this.Expression
);

this.Arguments = function(PartnerExpression){
	/**
	 * 函数参数集合
	 * @param {Context} open - 函数参数起始小括号上下文
	 */
	function Arguments(open){
		PartnerExpression.call(this, open);
		
		this.list = [];
	};
	Arguments = new Rexjs(Arguments, PartnerExpression);
	
	Arguments.props({
		list : null
	});
	
	return Arguments;
}(
	this.PartnerExpression
);

this.OpenArgumentTag = function(OpenParenTag, Arguments){
	/**
	 * 函数参数起始标签
	 */
	function OpenArgumentTag(){
		OpenParenTag.call(this);
	};
	OpenArgumentTag = new Rexjs(OpenArgumentTag, OpenParenTag);
	
	OpenArgumentTag.props({
		require : function(tagsMap){
			return tagsMap.argumentContextTags;
		},
		transformer : function(statement, context){
			statement.expression.arguments = new Arguments(context);
		}
	});
	
	return OpenArgumentTag;
}(
	this.OpenParenTag,
	this.Arguments
);

this.ArgumentNameTag = function(VariableTag, Argument){
	/**
	 * 函数参数名标签
	 */
	function ArgumentNameTag(){
		VariableTag.call(this);
	};
	ArgumentNameTag = new Rexjs(ArgumentNameTag, VariableTag);
	
	ArgumentNameTag.props({
		require : function(tagsMap){
			return tagsMap.argumentNameContextTags;
		},
		transformer : function(statement, context){
			statement
				.expression
				.arguments
				.list
				.push(
					new Argument(context)
				);
		}
	});
	
	
	return ArgumentNameTag;
}(
	this.VariableTag,
	this.Argument
);

this.ArgumentSeparatorTag = function(CommaTag){
	/**
	 * 参数分隔符标签
	 */
	function ArgumentSeparatorTag(){
		CommaTag.call(this);
	};
	ArgumentSeparatorTag = new Rexjs(ArgumentSeparatorTag, CommaTag);
	
	ArgumentSeparatorTag.props({
		require : function(tagsMap){
			return tagsMap.argumentSeparatorContextTags;
		}
	});
	
	return ArgumentSeparatorTag;
}(
	this.CommaTag
);

this.CloseArgumentTag = function(CloseParenTag){
	/**
	 * 函数参数结束标签
	 */
	function CloseArgumentTag(){
		CloseParenTag.call(this);
	};
	CloseArgumentTag = new Rexjs(CloseArgumentTag, CloseParenTag);
	
	CloseArgumentTag.props({
		require : function(tagsMap){
			return tagsMap.openFunctionBodyTags;
		},
		transformer : function(statement, context){
			statement.expression.arguments.close = context;
		}
	});
	
	return CloseArgumentTag;
}(
	this.CloseParenTag
);

}.call(
	this
);

// 函数相关标签
void function(){

this.FunctionExpression = function(Expression){
	/**
	 * 函数表达式
	 * @param {Context} context - 函数上下文
	 */
	function FunctionExpression(declaration){
		Expression.call(this);
		
		this.declaration = declaration;
	};
	FunctionExpression = new Rexjs(FunctionExpression, Expression);
	
	FunctionExpression.props({
		argumentList : null,
		body : null,
		declaration : null,
		name : null
	});
	
	return FunctionExpression;
}(
	this.Expression
);

this.FunctionNameTag = function(VariableTag){
	/**
	 * 函数名标签
	 */
	function FunctionNameTag(){
		VariableTag.call(this);
	};
	FunctionNameTag = new Rexjs(FunctionNameTag, VariableTag);
	
	FunctionNameTag.props({
		require : function(tagsMap){
			return tagsMap.argumentTags;
		},
		transformer : function(statement, context){
			statement.expression.name = context;
		}
	});
	
	return FunctionNameTag;
}(
	this.VariableTag
);

this.FunctionTag = function(KeywordTag, FunctionExpression){
	/**
	 * 函数标签
	 */
	function FunctionTag(_order){
		KeywordTag.call(this, _order);
	};
	FunctionTag = new Rexjs(FunctionTag, KeywordTag);
	
	FunctionTag.props({
		regexp : /function/,
		require : function(tagsMap){
			return tagsMap.functionContextTags;
		},
		transformer : function(statement, context){
			statement.appendExpression(
				new FunctionExpression(context)
			);
		}
	});
	
	return FunctionTag;
}(
	this.KeywordTag,
	this.FunctionExpression
);

this.FunctionDeclarationTag = function(FunctionTag){
	/**
	 * 函数申明标签
	 */
	function FunctionDeclarationTag(){
		FunctionTag.call(this);
	};
	FunctionDeclarationTag = new Rexjs(FunctionDeclarationTag, FunctionTag);
	
	FunctionDeclarationTag.props({
		require : function(tagsMap){
			return tagsMap.functionDeclarationContextTags;
		}
	});
	
	return FunctionDeclarationTag;
}(
	this.FunctionTag
);

}.call(
	this
);


// -----------------------------------
// -----------------------------------
// -----------------------------------
// -----------------------------------


// 函数参数标签列表
void function(){

this.ArgumentNameContextTags = function(ArgumentSeparatorTag, CloseArgumentTag){
	/**
	 * 参数名上下文标签
	 */
	function ArgumentNameContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new ArgumentSeparatorTag(),
			new CloseArgumentTag()
		);
	};
	ArgumentNameContextTags = new Rexjs(ArgumentNameContextTags, ECMAScriptTags);
	
	return ArgumentNameContextTags;
}(
	this.ArgumentSeparatorTag,
	this.CloseArgumentTag
);

this.ArgumentSeparatorContextTags = function(ArgumentNameTag){
	/**
	 * 参数分隔符上下文标签列表
	 */
	function ArgumentSeparatorContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new ArgumentNameTag()
		);
	};
	ArgumentSeparatorContextTags = new Rexjs(ArgumentSeparatorContextTags, ECMAScriptTags);
	
	return ArgumentSeparatorContextTags;
}(
	this.ArgumentNameTag
);

this.ArgumentContextTags = function(ArgumentSeparatorContextTags, CloseArgumentTag){
	/**
	 * 参数上下文标签列表
	 */
	function ArgumentContextTags(){
		ArgumentSeparatorContextTags.call(this);
		
		this.register(
			new CloseArgumentTag()
		);
	};
	ArgumentContextTags = new Rexjs(ArgumentContextTags, ArgumentSeparatorContextTags);
	
	return ArgumentContextTags;
}(
	this.ArgumentSeparatorContextTags,
	this.CloseArgumentTag
);

this.ArgumentTags = function(ArgumentContextTags, OpenArgumentTag){
	/**
	 * 参数标签列表
	 */
	function ArgumentTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new OpenArgumentTag()
		);
	};
	ArgumentTags = new Rexjs(ArgumentTags, ECMAScriptTags);
	
	return ArgumentTags;
}(
	this.ArgumentContextTags,
	this.OpenArgumentTag
);

this.ArgumentTagsMap = function(ArgumentNameContextTags, ArgumentSeparatorContextTags, ArgumentContextTags, ArgumentTags){
	function ArgumentTagsMap(){
		SyntaxTagsMap.call(this);
		
		this.argumentNameContextTags = new ArgumentNameContextTags();
		this.argumentSeparatorContextTags = new ArgumentSeparatorContextTags();
		this.argumentContextTags = new ArgumentContextTags();
		this.argumentTags = new ArgumentTags();
	};
	ArgumentTagsMap = new Rexjs(ArgumentTagsMap, SyntaxTagsMap);
	
	return ArgumentTagsMap;
}(
	this.ArgumentNameContextTags,
	this.ArgumentSeparatorContextTags,
	this.ArgumentContextTags,
	this.ArgumentTags
);
	
}.call(
	this
);


// 函数主体标签
void function(){

this.OpenFunctionBodyTags = function(OpenFunctionBodyTag){
	/**
	 * 函数主体起始大括号标签列表
	 */
	function OpenFunctionBodyTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new OpenFunctionBodyTag()
		);
	};
	OpenFunctionBodyTags = new Rexjs(OpenFunctionBodyTags, ECMAScriptTags);
	
	return OpenFunctionBodyTags;
}(
	this.OpenFunctionBodyTag
);

this.CloseFunctionBodyTags = function(CloseFunctionBodyTag){
	/**
	 * 函数主体结束大括号标签列表
	 */
	function CloseFunctionBodyTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new CloseFunctionBodyTag()
		);
	};
	CloseFunctionBodyTags = new Rexjs(CloseFunctionBodyTags, ECMAScriptTags);
	
	return CloseFunctionBodyTags;
}(
	this.CloseFunctionBodyTag
);

this.FunctionBodyTagsMap = function(OpenFunctionBodyTags, CloseFunctionBodyTags){
	function FunctionBodyTagsMap(){
		SyntaxTagsMap.call(this);
		
		this.openFunctionBodyTags = new OpenFunctionBodyTags();
		this.closeFunctionBodyTags = new CloseFunctionBodyTags();
	};
	FunctionBodyTagsMap = new Rexjs(FunctionBodyTagsMap, SyntaxTagsMap);
	
	return FunctionBodyTagsMap;
}(
	this.OpenFunctionBodyTags,
	this.CloseFunctionBodyTags
);

}.call(
	this
);

// 函数标签列表
void function(){

this.FunctionDeclarationContextTags = function(FunctionNameTag){
	/**
	 * 函数声明上下文标签列表
	 */
	function FunctionDeclarationContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new FunctionNameTag()
		);
	};
	FunctionDeclarationContextTags = new Rexjs(FunctionDeclarationContextTags, ECMAScriptTags);
	
	return FunctionDeclarationContextTags;
}(
	this.FunctionNameTag
);

this.FunctionContextTags = function(FunctionDeclarationContextTags, OpenArgumentTag){
	/**
	 * 函数上下文标签列表
	 */
	function FunctionContextTags(){
		FunctionDeclarationContextTags.call(this);
		
		this.register(
			new OpenArgumentTag()
		);
	};
	FunctionContextTags = new Rexjs(FunctionContextTags, FunctionDeclarationContextTags);
	
	return FunctionContextTags;
}(
	this.FunctionDeclarationContextTags,
	this.OpenArgumentTag
);

this.FunctionTagsMap = function(ArgumentTagsMap, FunctionBodyTagsMap, FunctionDeclarationContextTags, FunctionContextTags){
	function FunctionTagsMap(){
		SyntaxTagsMap.call(this);
		
		this.from(
			new ArgumentTagsMap(),
			new FunctionBodyTagsMap()
		);
		
		this.functionDeclarationContextTags = new FunctionDeclarationContextTags();
		this.functionContextTags = new FunctionContextTags();
	};
	FunctionTagsMap = new Rexjs(FunctionTagsMap, SyntaxTagsMap);
	
	return FunctionTagsMap;
}(
	this.ArgumentTagsMap,
	this.FunctionBodyTagsMap,
	this.FunctionDeclarationContextTags,
	this.FunctionContextTags
);

}.call(
	this
);
