// 公用的表达式
!function(DEFAULT_INDEX){

this.AssignableExpression = function(){
	/**
	 * 可赋值的表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function AssignableExpression(context){
		Expression.call(this, context);
	};
	AssignableExpression = new Rexjs(AssignableExpression, Expression);

	return AssignableExpression;
}();

this.GenerableExpression = function(){
	/**
	 * 可生成的表达式，即在生成器内部，随着生成器需要一起编译的表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function GenerableExpression(context, statements){
		Expression.call(this, context);

		this.contextGeneratorIfNeedCompile = statements.contextGeneratorIfNeedCompile;
	};
	GenerableExpression = new Rexjs(GenerableExpression, Expression);

	GenerableExpression.$({
		contextGeneratorIfNeedCompile: NULL,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果存在需要编译的生成器
			if(this.contextGeneratorIfNeedCompile){
				// 以生成器形式的提取表达式文本内容
				this.generateTo(contentBuilder);
				return;
			}

			// 以常规形式的提取表达式文本内容
			this.normalizeTo(contentBuilder);
		},
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(){},
		mainFlowIndex: DEFAULT_INDEX,
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(){}
	});

	return GenerableExpression;
}();

this.ConditionalExpression = function(GenerableExpression, generateBody){
	/**
	 * 带条件的表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function ConditionalExpression(context, statements){
		GenerableExpression.call(this, context, statements);
	};
	ConditionalExpression = new Rexjs(ConditionalExpression, GenerableExpression);

	ConditionalExpression.$({
		/**
		 * 该条件表达式其他用途适配时所对应的索引值，即保留索引值，供辅助使用
		 * @type {Number}
		 */
		adapterIndex: DEFAULT_INDEX,
		/**
		 * 条件表达式所处分支流结束时所对应的索引值
		 * @type {Number}
		 */
		branchFlowIndex: DEFAULT_INDEX,
		condition: NULL,
		/**
		 * 条件表达式所处分支流起始时所对应的索引值
		 * @type {Number}
		 */
		conditionIndex: DEFAULT_INDEX,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var generator = this.contextGeneratorIfNeedCompile;

			// 如果存在需要编译的生成器
			if(generator){
				this.conditionIndex = this.branchFlowIndex = generator.nextIndex();
				this.positiveIndex = this.adapterIndex = generator.nextIndex();
				this.negativeIndex = this.mainFlowIndex = generator.nextIndex();

				// 以生成器形式的提取表达式文本内容
				this.generateTo(contentBuilder);
				return;
			}

			// 以常规形式的提取表达式文本内容
			this.normalizeTo(contentBuilder);
		},
		/**
		 * 以生成器形式去编译（后置）主体代码
		 * @param {Expression} body - 主体表达式
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateBodyTo: function(body, contentBuilder){
			// 以生成器形式去编译主体代码
			generateBody(this, body, contentBuilder);

			// 追加索引设置以及 case 表达式字符串
			contentBuilder.appendString(
				this.contextGeneratorIfNeedCompile.currentIndexString + "=" + this.branchFlowIndex + ";break;case " + this.mainFlowIndex + ":"
			);
		},
		/**
		 * 以生成器形式去编译条件代码
		 * @param {Expression} condition - 条件表达式
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateConditionTo: function(condition, contentBuilder){
			var currentIndexString = this.contextGeneratorIfNeedCompile.currentIndexString, conditionIndex = this.conditionIndex;

			// 追加设置条件索引字符串与 case 表达式
			contentBuilder.appendString(
				currentIndexString + "=" + conditionIndex + ";break;case " + conditionIndex + ":" + currentIndexString + "="
			);

			// 提取条件表达式
			condition.extractTo(contentBuilder);

			// 追加条件的三元判断字符串
			contentBuilder.appendString(
				"?" + this.positiveIndex + ":" + this.negativeIndex + ";break;case " + this.adapterIndex + ":"
			);
		},
		/**
		 * 以生成器形式去编译前置主体代码（do while 就是前置主体形式的表达式）
		 * @param {Expression} body - 主体表达式
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generatePrefixBodyTo: function(body, contentBuilder){
			var positiveIndex = this.positiveIndex;

			// 追加索引设置以及 case 表达式字符串
			contentBuilder.appendString(
				this.contextGeneratorIfNeedCompile.currentIndexString + "=" + positiveIndex + ";break;case " + positiveIndex + ":"
			);

			// 以生成器形式去编译主体代码
			generateBody(this, body, contentBuilder);
		},
		/**
		 * 条件不成立所对应的索引值
		 * @type {Number}
		 */
		negativeIndex: DEFAULT_INDEX,
		/**
		 * 条件成立所对应的索引值
		 * @type {Number}
		 */
		positiveIndex: DEFAULT_INDEX
	});

	return ConditionalExpression;
}(
	this.GenerableExpression,
	
	// generateBody
	function(expression, body, contentBuilder){
		// 提取主体内容
		body.extractTo(contentBuilder);

		// 判断主体表达式是否需要加分号
		if((body.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
			// 追加分号
			contentBuilder.appendString(";");
		}

		// 设置表达式状态为已结束
		expression.state = STATE_STATEMENT_ENDED;
	}
);

}.call(
	this,
	// DEFAULT_INDEX
	-1
);