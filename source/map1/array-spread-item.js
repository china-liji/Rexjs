// 数组拓展项相关
!function(){

this.ArraySpreadItemExpression = function(SpreadExpression){
	/**
	 * 数组拓展项表达式
	 * @param {Context} context - 标签上下文
	 */
	function ArraySpreadItemExpression(context){
		SpreadExpression.call(this, context);
	};
	ArraySpreadItemExpression = new Rexjs(ArraySpreadItemExpression, SpreadExpression);

	ArraySpreadItemExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 追加初始化拓展项
				contentBuilder.appendString("new Rexjs.SpreadItem(");
				// 提取操作对象
				this.operand.extractTo(contentBuilder);
				// 追加初始化拓展项的结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 追加拓展符上下文
			contentBuilder.appendContext(this.context);
			// 提取参数
			this.operand.extractTo(contentBuilder);
		}
	});

	return ArraySpreadItemExpression;
}(
	this.SpreadExpression
);

this.ArraySpreadTag = function(SpreadTag, ArraySpreadItemExpression){
	/**
	 * 数组拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArraySpreadTag(_type){
		SpreadTag.call(this, _type);
	};
	ArraySpreadTag = new Rexjs(ArraySpreadTag, SpreadTag);
	
	ArraySpreadTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			// 告知数组表达式有拓展符
			statement.target.expression.spread = true;

			return new ArraySpreadItemExpression(context);
		}
	});
	
	return ArraySpreadTag;
}(
	this.SpreadTag,
	this.ArraySpreadItemExpression
);

}.call(
	this
);