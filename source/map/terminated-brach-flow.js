// 迭代中断流类相关
~function(TerminatedFlowStatement, SCOPE_CLOSURE){

this.TerminatedBranchFlowStatement = function(catchMethod, withoutAnyFlow){
	/**
	 * 中断分支流语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TerminatedBranchFlowStatement(statements){
		TerminatedFlowStatement.call(this, statements);
		
		this.expression = new EmptyExpression(null);
	};
	TerminatedBranchFlowStatement = new Rexjs(TerminatedBranchFlowStatement, TerminatedFlowStatement);

	TerminatedBranchFlowStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var expression = this.expression, terminatedFlowExpression = this.target.expression;

			switch(false){
				// 如果不是空表达式，说明是属于标记表达式，而标记表达式已经经过验证
				case expression instanceof EmptyExpression:
					break;

				// 如果存在指定的流语句中
				case withoutAnyFlow(this.statements, terminatedFlowExpression.context.tag.flow):
					break;

				// 默认
				default:
					// 报错
					parser.error(
						terminatedFlowExpression.context,
						ECMAScriptErrors.template(
							"ILLEGAL_STATEMENT",
							terminatedFlowExpression.context.content
						)
					);
					return;
			}

			// 调用父类方法
			return catchMethod.call(this, parser, context);
		}
	});
	
	return TerminatedBranchFlowStatement;
}(
	TerminatedFlowStatement.prototype.catch,
	// withoutAnyFlow
	function(statements, flow){
		// 如果语句块存在
		while(statements){
			var statement = statements.statement;

			// 如果语句存在
			while(statement){
				// 如果流一致
				if((statement.flow & flow) === flow){
					return false;
				}

				statement = statement.target;
			}

			// 如果是闭包，返回 null，中断循环，否则获取 target
			statements = (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? null : statements.target;
		}

		return true;
	}
);

this.TerminatedBranchFlowTag = function(TerminatedFlowTag, TerminatedFlowExpression, TerminatedBranchFlowStatement, LabelledStatement){
	/**
	 * 中断分支流标签
	 * @param {Number} _type - 标签类型
	 */
	function TerminatedBranchFlowTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	TerminatedBranchFlowTag = new Rexjs(TerminatedBranchFlowTag, TerminatedFlowTag);
	
	TerminatedBranchFlowTag.props({
		/**
		 * 核对标记定义语句，是否满足当前中断流所对应的标记
		 * @param {Statement} labelStatement - 标签定义语句
		 * @param {String} label - 需要核对的标记文本值
		 */
		checkFlowStatement: function(statement, label){
			// 如果当前语句是标记语句
			if(statement instanceof LabelledStatement){
				// 返回标签对比结果
				return statement.target.expression.context.content === label;
			}

			return false;
		},
		flow: ECMAScriptStatement.FLOW_BRANCH,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.terminatedBranchFlowContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new TerminatedFlowExpression(context);
			// 设置当前语句
			statements.statement = new TerminatedBranchFlowStatement(statements);
		}
	});
	
	return TerminatedBranchFlowTag;
}(
	this.TerminatedFlowTag,
	this.TerminatedFlowExpression,
	this.TerminatedBranchFlowStatement,
	this.LabelledStatement
);

this.LabelledIdentifierTag = function(LabelTag, withoutAnyFlow){
	/**
	 * 标记标识符标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelledIdentifierTag(_type){
		LabelTag.call(this, _type);
	};
	LabelledIdentifierTag = new Rexjs(LabelledIdentifierTag, LabelTag);
	
	LabelledIdentifierTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果没有存在指定的流语句中
			if(withoutAnyFlow(statements, statement.target.expression.context.tag, context.content)){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template(
						"LABEL",
						statement.target.expression.context.content,
						context.content
					)
				);

				return;
			}

			// 设置当前表达式
			statement.expression = new Expression(context);
		}
	});
	
	return LabelledIdentifierTag;
}(
	this.LabelTag,
	// withoutAnyFlow
	function(statements, terminatedFlowTag, content){
		// 如果语句块存在
		while(statements){
			var statement = statements.statement;

			// 如果语句存在
			while(statement){
				// 如果流语句核对有效
				if(terminatedFlowTag.checkFlowStatement(statement, content)){
					return false;
				}

				statement = statement.target;
			}

			// 如果是闭包，则获取 target，否则等于 null，中断循环
			statements = (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? null : statements.target;
		}

		return true;
	}
);

}.call(
	this,
	this.TerminatedFlowStatement,
	this.ECMAScriptStatements.SCOPE_CLOSURE
);