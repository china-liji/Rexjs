// 数组拓展项相关
~function(config){

this.ArraySpreadItemExpression = function(SpreadExpression){
	/**
	 * 数组拓展项表达式
	 * @param {Context} open - 起始标签上下文
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
			// 如果需要编译拓展符
			if(config.value){
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

this.ArraySpreadItemTag = function(SpreadTag, ArraySpreadItemExpression, SpreadStatement){
	/**
	 * 数组拓展项标签
	 * @param {Number} _type - 标签类型
	 */
	function ArraySpreadItemTag(_type){
		SpreadTag.call(this, _type);
	};
	ArraySpreadItemTag = new Rexjs(ArraySpreadItemTag, SpreadTag);
	
	ArraySpreadItemTag.props({
		/**
		 * 获取是否需要编译
		 */
		get compile(){
			return config.value;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 告知数组表达式，是否需要编译拓展符
			statement.target.expression.needCompileSpread = config.value;

			// 设置当前表达式
			statement.expression = new ArraySpreadItemExpression(context);
			// 设置当前语句
			statements.statement = new SpreadStatement(statements);
		}
	});
	
	return ArraySpreadItemTag;
}(
	this.SpreadTag,
	this.ArraySpreadItemExpression,
	this.SpreadStatement
);

}.call(
	this,
	// config
	ECMAScriptConfig.addBaseConfig("arraySpreadItem")
);