// switch 语句相关
!function(OpeningBlockTag, ClosingBlockTag, closingSwitchConditionTag, closingSwitchBodyTag, generateCase){

this.SwitchExpression = function(ConditionalExpression, generateBody){
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
			var inner = this.body.inner, variable = this.variable;

			// 追加临时变量赋值操作
			contentBuilder.appendString(variable + "=new Rexjs.SwitchCondition(");
			// 追加条件，将其作为临时变量名的值
			this.condition.inner.extractTo(contentBuilder);
			// 追加赋值操作语句的分号
			contentBuilder.appendString(");");

			// 以生成器形式编译主体
			generateBody(this, inner, variable, this.contextGeneratorIfNeedCompile, contentBuilder);
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
	// generateBody
	function(switchExpression, inner, variable, generator, contentBuilder){
		var currentIndexString = generator.currentIndexString, mainFlowIndex = generator.nextIndex(), branchFlowIndex = generator.nextIndex();

		// 修改主流索引值为刚刚产生的新索引值
		switchExpression.mainFlowIndex = mainFlowIndex;
		// 设置分支流的索引值，用于 default 表达式使用
		switchExpression.branchFlowIndex = branchFlowIndex;

		// 遍历主体
		for(var i = 0, j = inner.length;i < j;i++){
			// 以生成器形式编译 case 表达式
			generateCase(switchExpression, inner[i], generator, variable, currentIndexString, contentBuilder);
		}

		if(switchExpression.hasDefault){
			// 追加判断，是否进入 default 表达式相关语句块代码
			contentBuilder.appendString(
				currentIndexString  + "=" + variable + ".default()?" + branchFlowIndex + ":" + mainFlowIndex + ";break;"
			);
		}

		// 追加主流索引的 case 表达式
		contentBuilder.appendString("case " + mainFlowIndex + ":");
	}
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
			return this.statements.target.statement.expression.opening.tag;
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

this.OpeningSwitchConditionTag = function(OpeningParenTag, ConditionStatement){
	/**
	 * switch 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningSwitchConditionTag(_type){
		OpeningParenTag.call(this, _type);
	};
	OpeningSwitchConditionTag = new Rexjs(OpeningSwitchConditionTag, OpeningParenTag);
	
	OpeningSwitchConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingSwitchConditionTag;
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
	
	return OpeningSwitchConditionTag;
}(
	this.OpeningParenTag,
	this.ConditionStatement
);

this.ClosingSwitchConditionTag = function(ClosingParenTag){
	/**
	 * switch 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingSwitchConditionTag(_type){
		ClosingParenTag.call(this, _type);
	};
	ClosingSwitchConditionTag = new Rexjs(ClosingSwitchConditionTag, ClosingParenTag);
	
	ClosingSwitchConditionTag.props({
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
			statement.expression.condition.closing = context;
		}
	});
	
	return ClosingSwitchConditionTag;
}(
	this.ClosingParenTag
);

this.OpeningSwitchBodyTag = function(SwitchStatement, SwitchBodyStatements, visitor){
	/**
	 * switch 主体起始标签
	 */
	function OpeningSwitchBodyTag(_type){
		OpeningBlockTag.call(this, _type);
	};
	OpeningSwitchBodyTag = new Rexjs(OpeningSwitchBodyTag, OpeningBlockTag);
	
	OpeningSwitchBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingSwitchBodyTag;
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 */
		getBoundStatements: function(statements){
			return new SwitchBodyStatements(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openingSwitchBodyContextTags;
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
	
	return OpeningSwitchBodyTag;
}(
	this.SwitchStatement,
	this.SwitchBodyStatements,
	OpeningBlockTag.prototype.visitor
);

this.ClosingSwitchBodyTag = function(visitor){
	/**
	 * switch 主体结束标签
	 */
	function ClosingSwitchBodyTag(_type){
		ClosingBlockTag.call(this, _type);
	};
	ClosingSwitchBodyTag = new Rexjs(ClosingSwitchBodyTag, ClosingBlockTag);
	
	ClosingSwitchBodyTag.props({
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
	
	return ClosingSwitchBodyTag;
}(
	ClosingBlockTag.prototype.visitor
);

closingSwitchConditionTag = new this.ClosingSwitchConditionTag();

closingSwitchBodyTag = new this.ClosingSwitchBodyTag();

}.call(
	this,
	this.OpeningBlockTag,
	this.ClosingBlockTag,
	// closingSwitchConditionTag
	null,
	// closingSwitchBodyTag
	null,
	// generateCase
	function(switchExpression, statement, generator, variable, currentIndexString, contentBuilder){
		var expression = statement.expression;

		// 如果空表达式，说明没有 case 表达式
		if(expression.empty){
			return;
		}

		var value = expression.value, positiveIndex = switchExpression.positiveIndex, negativeIndex = switchExpression.negativeIndex;

		// 如果是 default 表达式
		if(value.default){
			var branchFlowIndex = switchExpression.branchFlowIndex;

			// 追加三元判断的“条件”字符串
			contentBuilder.appendString(
				// 如果已经匹配到值，那么就应该进入 default 表达式对应语句块，否则跳过进入下一项匹配
				currentIndexString + "=" + variable + ".matched?" + branchFlowIndex + ":" + positiveIndex +
				";break;case " + branchFlowIndex + ":"
			);

			// 提取 case 表达式的主体语句块
			expression.statements.extractTo(contentBuilder);

			// 追加三元判断的“不成立”时的相关索引处理
			contentBuilder.appendString(
				currentIndexString + "=" + positiveIndex + ";break;case " + positiveIndex + ":"
			);
		}
		else {
			// 追加三元判断的“条件”字符串
			contentBuilder.appendString(currentIndexString + "=" + variable + ".case(");
			// 追加判断值表达式
			expression.value.extractTo(contentBuilder);

			// 追加 三元判断的执行表达式 与 条件“成立”时相关的 case 表达式字符串
			contentBuilder.appendString(
				")?" + positiveIndex + ":" + negativeIndex + ";break;case " + positiveIndex + ":"
			);

			// 提取 case 表达式的主体语句块
			expression.statements.extractTo(contentBuilder);

			// 追加三元判断的“不成立”时的相关索引处理
			contentBuilder.appendString(
				currentIndexString + "=" + negativeIndex + ";break;case " + negativeIndex + ":"
			);
		}

		// 设置三元判断“成立”时的索引值
		switchExpression.positiveIndex = generator.nextIndex();
		// 设置三元判断“不成立”时的索引值
		switchExpression.negativeIndex = generator.nextIndex();
	}
);