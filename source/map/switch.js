// switch 语句相关
!function(OpenBlockTag, CloseBlockTag, closeSwitchConditionTag, closeSwitchBodyTag){

this.SwitchExpression = function(ConditionalExpression, forEach){
	/**
	 * switch 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function SwitchExpression(context, statements){
		ConditionalExpression.call(this, context, statements);

		// 如果存在需要编译的生成器
		if(this.contextGeneratorIfNeedCompile){
			// 记录临时变量名
			this.variable = statements.collections.generate();
		}
	};
	SwitchExpression = new Rexjs(SwitchExpression, ConditionalExpression);

	SwitchExpression.props({
		/**
		 * 获取表达式主体语句块
		 */
		get block(){
			return this.body;
		},
		/**
		 * 设置表达式主体语句块
		 * @param {BlockExpression} value - 需要设置的表达式主体语句块
		 */
		set block(value){
			this.body = value;
		},
		body: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			var variable = this.variable, generator = this.contextGeneratorIfNeedCompile;

			contentBuilder.appendString(variable + "=");

			this.condition.inner.extractTo(contentBuilder);

			contentBuilder.appendString(";");

			this.mainFlowIndex = generator.nextIndex();

			forEach(this.body.inner, function(statement){debugger
				var caseExpression = statement.expression;

				if(!caseExpression){
					return;
				}

				// 追加条件的三元判断字符串
				contentBuilder.appendString(variable + "===");

				caseExpression.value.extractTo(contentBuilder);

				contentBuilder.appendString(
					"?" + this.positiveIndex + ":" + this.negativeIndex + ";break;case " + this.positiveIndex + ":"
				);

				caseExpression.statements.extractTo(contentBuilder);

				// 追加索引设置以及 case 表达式字符串
				contentBuilder.appendString(
					this.contextGeneratorIfNeedCompile.currentIndexString + "=" + this.negativeIndex + ";break;case " + this.negativeIndex + ":"
				);
				
				this.positiveIndex = generator.nextIndex();
				this.negativeIndex = generator.nextIndex();
			}, this, true);

			contentBuilder.appendString("case " + this.mainFlowIndex + ":");
		},
		hasDefault: false,
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			// 添加 switch 关键字
			contentBuilder.appendContext(this.context);

			// 提取条件
			this.condition.extractTo(contentBuilder);
			// 提取主体
			this.body.extractTo(contentBuilder);
		},
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} value - 状态
		 */
		set state(value){},
		variable: ""
	});

	return SwitchExpression;
}(
	this.ConditionalExpression,
	Rexjs.forEach
);

this.SwitchStatement = function(){
	/**
	 * switch 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SwitchStatement(statements){
		BoxStatement.call(this, statements);
	};
	SwitchStatement = new Rexjs(SwitchStatement, BoxStatement);

	SwitchStatement.props({
		flow: BoxStatement.FLOW_LINEAR
	});

	return SwitchStatement;
}();

this.SwitchBodyStatement = function(BraceBodyStatement){
	/**
	 * switch 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SwitchBodyStatement(statements){
		BraceBodyStatement.call(this, statements);
	};
	SwitchBodyStatement = new Rexjs(SwitchBodyStatement, BraceBodyStatement);

	SwitchBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭大括号
			if(context.content !== "}"){
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 inner
			this.out(parser).inner = this.statements;
			// 返回结束语句块标签
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.statements.target.statement.expression.open.tag;
		}
	});

	return SwitchBodyStatement;
}(
	this.BraceBodyStatement
);

this.SwitchBodyStatements = function(BlockBodyStatements, SwitchBodyStatement, SwitchVariableCollections){
	/**
	 * switch 主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function SwitchBodyStatements(target){
		BlockBodyStatements.call(this, target);
	};
	SwitchBodyStatements = new Rexjs(SwitchBodyStatements, BlockBodyStatements);

	SwitchBodyStatements.props({
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new SwitchBodyStatement(this);
		}
	});

	return SwitchBodyStatements;
}(
	this.BlockBodyStatements,
	this.SwitchBodyStatement,
	this.SwitchVariableCollections
);

this.SwitchTag = function(SwitchExpression){
	/**
	 * switch 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function SwitchTag(_type){
		SyntaxTag.call(this, _type);
	};
	SwitchTag = new Rexjs(SwitchTag, SyntaxTag);
	
	SwitchTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /switch/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.switchConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new SwitchExpression(context, statements);
		}
	});
	
	return SwitchTag;
}(
	this.SwitchExpression
);

this.OpenSwitchConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * switch 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSwitchConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenSwitchConditionTag = new Rexjs(OpenSwitchConditionTag, OpenParenTag);
	
	OpenSwitchConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeSwitchConditionTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置条件表达式
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenSwitchConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseSwitchConditionTag = function(CloseParenTag){
	/**
	 * switch 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseSwitchConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseSwitchConditionTag = new Rexjs(CloseSwitchConditionTag, CloseParenTag);
	
	CloseSwitchConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.switchBlockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 条件表达式结束
			statement.expression.condition.close = context;
		}
	});
	
	return CloseSwitchConditionTag;
}(
	this.CloseParenTag
);

this.OpenSwitchBodyTag = function(SwitchStatement, SwitchBodyStatements, visitor){
	/**
	 * switch 主体起始标签
	 */
	function OpenSwitchBodyTag(_type){
		OpenBlockTag.call(this, _type);
	};
	OpenSwitchBodyTag = new Rexjs(OpenSwitchBodyTag, OpenBlockTag);
	
	OpenSwitchBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeSwitchBodyTag;
		},
		/**
		 * 进入语句块内部
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Statements} statements - 当前语句块
		 */
		in: function(parser, statements){
			// 设置当前语句块
			parser.statements = new SwitchBodyStatements(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openSwitchBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(
				this,
				parser,
				context,
				// 设置当前语句
				statements.statement = new SwitchStatement(statements),
				statements
			);
		}
	});
	
	return OpenSwitchBodyTag;
}(
	this.SwitchStatement,
	this.SwitchBodyStatements,
	OpenBlockTag.prototype.visitor
);

this.CloseSwitchBodyTag = function(visitor){
	/**
	 * switch 主体结束标签
	 */
	function CloseSwitchBodyTag(_type){
		CloseBlockTag.call(this, _type);
	};
	CloseSwitchBodyTag = new Rexjs(CloseSwitchBodyTag, CloseBlockTag);
	
	CloseSwitchBodyTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 跳出语句并设置表达式的 block 属性
			statement.out().block = statement.expression;
		}
	});
	
	return CloseSwitchBodyTag;
}(
	CloseBlockTag.prototype.visitor
);

closeSwitchConditionTag = new this.CloseSwitchConditionTag();

closeSwitchBodyTag = new this.CloseSwitchBodyTag();

}.call(
	this,
	this.OpenBlockTag,
	this.CloseBlockTag,
	// closeSwitchConditionTag
	null,
	// closeSwitchBodyTag
	null
);