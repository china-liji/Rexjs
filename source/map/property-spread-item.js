// 对象属性拓展项相关
~function(config){

this.PropertySpreadItemExpression = function(SpreadExpression){
	/**
	 * 对象属性拓展项表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function PropertySpreadItemExpression(context){
		SpreadExpression.call(this, context);
	};
	PropertySpreadItemExpression = new Rexjs(PropertySpreadItemExpression, SpreadExpression);

	PropertySpreadItemExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){debugger
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

	return PropertySpreadItemExpression;
}(
	this.SpreadExpression
);

this.PropertySpreadTag = function(SpreadTag, EmptyPropertyNameExpression, PropertySpreadItemExpression, SpreadStatement){
	/**
	 * 对象属性拓展项标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertySpreadTag(_type){
		SpreadTag.call(this, _type);
	};
	PropertySpreadTag = new Rexjs(PropertySpreadTag, SpreadTag);
	
	PropertySpreadTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyExpression = statement.expression;

			// 告知数组表达式，是否需要编译拓展符
			//statement.target.expression.needCompileSpread = config.value;
			propertyExpression.name = new EmptyPropertyNameExpression();
			propertyExpression.value = new PropertySpreadItemExpression(context);

			// 设置当前语句
			statements.statement = new SpreadStatement(statements);
		}
	});
	
	return PropertySpreadTag;
}(
	this.SpreadTag,
	this.EmptyPropertyNameExpression,
	this.PropertySpreadItemExpression,
	this.SpreadStatement
);

}.call(
	this,
	// config
	ECMAScriptConfig.addBaseConfig("propertySpreadItem")
);