// 行结束符标签
!function(SpecialLineTerminatorTag, visitor){

this.IllegalLineTerminatorTag = function(){
	/**
	 * 不合法的行结束符标签
	 */
	function IllegalLineTerminatorTag(){
		SpecialLineTerminatorTag.call(this);
	};
	IllegalLineTerminatorTag = new Rexjs(IllegalLineTerminatorTag, SpecialLineTerminatorTag);
	
	IllegalLineTerminatorTag.$({
		order: ECMAScriptOrders.ILLEGAL_LINE_TERMINATOR,
		regexp: /(?:\/\*(?:[^*]|\*(?!\/))*)?(?:\r\n?|\n|\u2028|\u2029)/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.NEWLINE);
		}
	});
	
	return IllegalLineTerminatorTag;
}();

this.StatementBreakTag = function(){
	/**
	 * 语句行结束符标签
	 */
	function StatementBreakTag(){
		SpecialLineTerminatorTag.call(this);
	};
	StatementBreakTag = new Rexjs(StatementBreakTag, SpecialLineTerminatorTag);
	
	StatementBreakTag.$({
		$class: CLASS_STATEMENT_END,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
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

this.ExpressionBreakTag = function(){
	/**
	 * 表达式行结束符标签
	 */
	function ExpressionBreakTag(){
		SpecialLineTerminatorTag.call(this);
	};
	ExpressionBreakTag = new Rexjs(ExpressionBreakTag, SpecialLineTerminatorTag);
	
	ExpressionBreakTag.$({
		// 防止与 StatementBreakTag 冲突
		order: ECMAScriptOrders.EXPRESSION_BREAK,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restrictedExpressionContextTags;
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
			statement.expression.state |= STATE_STATEMENT_ENDABLE;
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return ExpressionBreakTag;
}();

}.call(
	this,
	this.SpecialLineTerminatorTag,
	this.SpecialLineTerminatorTag.prototype.visitor
);