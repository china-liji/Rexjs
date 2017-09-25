// 幂运算表达式相关
!function(BinaryExpression){

this.ExponentiationExpression = function(extractTo){
	/**
	 * 幂运算表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 左侧表达式
	 */
	function ExponentiationExpression(context, left){
		BinaryExpression.call(this, context, left);
	};
	ExponentiationExpression = new Rexjs(ExponentiationExpression, BinaryExpression);

	ExponentiationExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 追加算数方法
				contentBuilder.appendString("Math.pow(");
				// 提取左侧的算数底值
				this.left.extractTo(contentBuilder);
				// 追加参数分隔符
				contentBuilder.appendString(",");
				// 提取幂
				this.right.extractTo(contentBuilder);
				// 追加方法结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return ExponentiationExpression;
}(
	BinaryExpression.prototype.extractTo
);

this.ExponentiationTag = function(BinaryTag, ExponentiationExpression){
	/**
	 * 幂运算标签
	 * @param {Number} _type - 标签类型
	 */
	function ExponentiationTag(_type){
		BinaryTag.call(this, _type);
	};
	ExponentiationTag = new Rexjs(ExponentiationTag, BinaryTag);
	
	ExponentiationTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 */
		getBoundExpression: function(context, left){
			return new ExponentiationExpression(context, left);
		},
		// 防止与 "*" 冲突
		order: ECMAScriptOrders.EXPONENTIATION,
		precedence: 11,
		regexp: /\*\*/
	});
	
	return ExponentiationTag;
}(
	this.BinaryTag,
	this.ExponentiationExpression
);

}.call(
	this,
	this.BinaryExpression
);