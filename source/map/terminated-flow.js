// 中断流相关
!function(){

this.TerminatedFlowExpression = function(GenerableExpression){
	/**
	 * 中断流表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function TerminatedFlowExpression(context, statements){
		GenerableExpression.call(this, context, statements);
	};
	TerminatedFlowExpression = new Rexjs(TerminatedFlowExpression, GenerableExpression);
	
	TerminatedFlowExpression.props({
		branch: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			var tag = this.context.tag, generator = this.contextGeneratorIfNeedCompile;

			// 追加设置生成器索引的字符串
			contentBuilder.appendString(
				generator.currentIndexString + "=" + tag.getCurrentIndexBy(generator, this) + ";"
			);

			// 以常规形式的提取表达式文本内容
			this.normalizeTo(contentBuilder);
			// 追加分号
			contentBuilder.appendString(";");
			
			// 由于上面设置了分号，表示语句已经结束，不需要再添加分号
			this.state = STATE_STATEMENT_ENDED;

			// 追加 case 表达式字符串
			contentBuilder.appendString("case " + tag.getNextIndexBy(generator, this) + ":");
		},
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			var object = this.object;

			// 追加关键字
			contentBuilder.appendContext(this.context);

			// 如果是空表达式
			if(object instanceof EmptyExpression){
				return;
			}

			// 追加空格
			contentBuilder.appendSpace();
			// 提取对象
			object.extractTo(contentBuilder);
		},
		object: null
	});
	
	return TerminatedFlowExpression;
}(
	this.GenerableExpression
);

this.TerminatedFlowStatement = function(){
	/**
	 * 中断流语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TerminatedFlowStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	TerminatedFlowStatement = new Rexjs(TerminatedFlowStatement, ECMAScriptStatement);

	TerminatedFlowStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 object
			this.out().object = this.expression;
		}
	});
	
	return TerminatedFlowStatement;
}();

this.TerminatedFlowTag = function(TerminatedFlowExpression, TerminatedFlowStatement){
	/**
	 * 中断流标签
	 * @param {Number} _type - 标签类型
	 */
	function TerminatedFlowTag(_type){
		SyntaxTag.call(this, _type);
	};
	TerminatedFlowTag = new Rexjs(TerminatedFlowTag, SyntaxTag);
	
	TerminatedFlowTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		flow: ECMAScriptStatement.FLOW_MAIN,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new TerminatedFlowExpression(context, statement.statements);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new TerminatedFlowStatement(statements);
		},
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getCurrentIndexBy: function(){
			return "NaN";
		},
		/**
		 * 从相关生成器中获取下一次所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getNextIndexBy: function(){
			return "NaN";
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});
	
	return TerminatedFlowTag;
}(
	this.TerminatedFlowExpression,
	this.TerminatedFlowStatement
);

}.call(
	this
);