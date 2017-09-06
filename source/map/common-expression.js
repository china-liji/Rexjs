// 公用的表达式
!function(){

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

this.ConditionalExpression = function(){
	/**
	 * 带条件的表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ConditionalExpression(context){
		Expression.call(this, context);
	};
	ConditionalExpression = new Rexjs(ConditionalExpression, Expression);

	ConditionalExpression.props({
		/**
		 * 以生成器形式去编译主体代码
		 * @param {Expression} body - 主体表达式
		 * @param {Number} nextStepIndex - 主体执行完的下一步索引值
		 * @param {Number} negativeIndex - 条件失败时所对应的索引值
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileBodyWithGenerator: function(body, nextStepIndex, negativeIndex, contentBuilder){
			// 提取主体内容
			body.extractTo(contentBuilder);

			// 判断主体表达式是否需要加分号
			if((body.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
				// 追加分号
				contentBuilder.appendString(";");
			}

			// 设置表达式状态为已结束
			this.state = STATE_STATEMENT_ENDED;

			// 追加索引设置以及 case 表达式字符串
			contentBuilder.appendString(
				this.contextGeneratorIfNeedCompile.currentIndexString + "=" + nextStepIndex + ";break;case " + negativeIndex + ":"
			);
		},
		/**
		 * 以生成器形式去编译条件代码
		 * @param {Expression} condition - 条件表达式
		 * @param {Number} index - 条件所处 case 代码块的索引值
		 * @param {Number} positiveIndex - 条件成立时所对应的索引值
		 * @param {Number} negativeIndex - 条件失败时所对应的索引值
		 * @param {Number} caseIndex - 条件判断后的下一个 case 代码块索引值
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileConditionWithGenerator: function(condition, index, positiveIndex, negativeIndex, caseIndex, contentBuilder){
			var currentIndexString = this.contextGeneratorIfNeedCompile.currentIndexString;

			// 追加设置当前索引字符串与 case 表达式
			contentBuilder.appendString(
				currentIndexString + "=" + index + ";break;case " + index + ":" + currentIndexString + "="
			);

			// 提取条件表达式
			condition.extractTo(contentBuilder);

			// 追加条件的三元判断字符串
			contentBuilder.appendString(
				"?" + positiveIndex + ":" + negativeIndex + ";break;case " + caseIndex + ":"
			);
		},
		condition: null,
		contextGeneratorIfNeedCompile: null
	});

	return ConditionalExpression;
}();

}.call(
	this
);