// 基类标签列表相关
~function(ECMAScriptTags, OnlyStatementEndTags){

this.ExpressionTags = function(FunctionTag, ClassTag, OpenObjectTag, VariableTag){
	/**
	 * 表达式标签列表
	 */
	function ExpressionTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new FunctionTag(),
			new ClassTag(),
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
			if(tag.class.expression){
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
	this.ClassTag,
	this.OpenObjectTag,
	this.VariableTag
);

this.ExpressionContextTags = function(list){
	/**
	 * 表达式上下文标签列表
	 */
	function ExpressionContextTags(){
		ECMAScriptTags.call(this);

		this.delegate(list);
	};
	ExpressionContextTags = new Rexjs(ExpressionContextTags, ECMAScriptTags);
	
	ExpressionContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			var tagClass = tag.class;

			switch(true){
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
	// list
	[
		this.AdditionTag,
		this.DotAccessorTag,
		this.ExpressionBreakTag,
		this.OnlyStatementEndTags,
		this.OpenBracketAccessorTag,
		this.OpenCallTag,
		this.OpenRestrictedCommentTag,
		this.PostfixDecrementTag,
		this.PostfixIncrementTag,
		this.SubtractionTag,
		this.OpenTemplateParameterTag
	]
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
			if(tag.class.statementBegin){
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
			if(tag.class.statementBegin){
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

this.IllegalTags = function(){
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
}();

}.call(
	this,
	this.ECMAScriptTags,
	this.OnlyStatementEndTags
);