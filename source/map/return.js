// 中断流标签子类相关
!function(TerminatedFlowTag){

this.ReturnTag = function(SCOPE_CLOSURE, visitor){
	/**
	 * return 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ReturnTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	ReturnTag = new Rexjs(ReturnTag, TerminatedFlowTag);
	
	ReturnTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		flow: ECMAScriptStatement.FLOW_LINEAR,
		regexp: /return/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.returnContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果存在闭包
			if(statements.closure){
				// 调用父类访问器
				visitor.call(this, parser, context, statement, statements);

				// 设置当前表达式为空表达式
				statements.statement.expression = new EmptyExpression(null);
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
			);
		}
	});
	
	return ReturnTag;
}(
	this.ECMAScriptStatements.SCOPE_CLOSURE,
	TerminatedFlowTag.prototype.visitor
);

}.call(
	this,
	this.TerminatedFlowTag,
	this.ECMAScriptStatements
);