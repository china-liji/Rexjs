// 基类标签列表相关
!function(ECMAScriptTags, OnlyStatementEndTags){

this.ExpressionTags = function(list){
	/**
	 * 表达式标签列表
	 */
	function ExpressionTags(){
		ECMAScriptTags.call(this);
		
		this.delegate(list);
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
		}
	});
	
	return ExpressionTags;
}(
	// list
	[
		this.ClassTag,
		this.FunctionTag,
		this.OpeningObjectTag,
		this.TryFunctionTag,
		this.VariableTag
	]
);

this.NewlineTags = function(UnaryAssignmentTag, IncrementTag, DecrementTag){
	/**
	 * 新行标签列表
	 */
	function NewlineTags(){
		ECMAScriptTags.call(this);

		// 清空列表
		this.clear();

		// 添加标签
		this.push(
			new IncrementTag(TYPE_MISTAKABLE),
			new DecrementTag(TYPE_MISTAKABLE)
		);
	};
	NewlineTags = new Rexjs(NewlineTags, ECMAScriptTags);

	NewlineTags.static({
		mappable: false
	});

	NewlineTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 过滤掉一元赋值标签
			return tag instanceof UnaryAssignmentTag;
		},
		/**
		 * 获取相关的新行标签列表
		 */
		get newlineTags(){
			return this;
		}
	});

	return NewlineTags;
}(
	this.UnaryAssignmentTag,
	this.IncrementTag,
	this.DecrementTag
);

this.ExpressionContextTags = function(NewlineTags, list, ready){
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
		newlineTags: null,
		/**
		 * 将所有标签准备就绪，即排序和初始化正则表达式，这是个耗性能的方法
		 */
		ready: function(){
			// 初始化新行标签列表
			var newlineTags = new NewlineTags();

			this.newlineTags = newlineTags;
			
			// 注册当前的标签列表
			newlineTags.register(this);
			// 新行标签列表就绪，并编译正则
			newlineTags.ready();
			// 调用父类方法
			ready.call(this);
		}
	});
	
	return ExpressionContextTags;
}(
	this.NewlineTags,
	// list
	[
		this.AdditionTag,
		this.DotAccessorTag,
		this.ExpressionBreakTag,
		this.OnlyStatementEndTags,
		this.OpeningBracketAccessorTag,
		this.OpeningCallTag,
		this.OpeningRestrictedCommentTag,
		this.PostfixDecrementTag,
		this.PostfixIncrementTag,
		this.QuestionAssignmentTag,
		this.SubtractionTag,
		this.OpeningTemplateParameterTag
	],
	ECMAScriptTags.prototype.ready
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
		}
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
		}
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

	return IllegalTags;
}();

}.call(
	this,
	this.ECMAScriptTags,
	this.OnlyStatementEndTags
);