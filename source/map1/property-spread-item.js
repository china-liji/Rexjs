// 对象属性拓展项相关
!function(){

this.SpreadPropertyExpression = function(PropertyExpression, SpreadExpression){
	/**
	 * 属性拓展表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SpreadPropertyExpression(context){
		PropertyExpression.call(this);

		// 设置属性值
		this.value = new SpreadExpression(context);
	};
	SpreadPropertyExpression = new Rexjs(SpreadPropertyExpression, PropertyExpression);

	SpreadPropertyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 追加对象赋值方法
			contentBuilder.appendString("Rexjs.SpreadItem.assign(" + anotherBuilder.result + ",");
			// 提取操作对象
			this.value.operand.extractTo(contentBuilder);
			// 追加方法结束小括号以及属性分隔符逗号
			contentBuilder.appendString("),");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 直接提取属性值
			this.value.extractTo(contentBuilder);
		},
		name: new DefaultExpression()
	});

	return SpreadPropertyExpression;
}(
	this.PropertyExpression,
	this.SpreadExpression
);

this.SpreadPropertyTag = function(SpreadTag, SpreadPropertyExpression, SpreadStatement){
	/**
	 * 对象属性拓展项标签
	 * @param {Number} _type - 标签类型
	 */
	function SpreadPropertyTag(_type){
		SpreadTag.call(this, _type);
	};
	SpreadPropertyTag = new Rexjs(SpreadPropertyTag, SpreadTag);
	
	SpreadPropertyTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = new SpreadPropertyExpression(context), boxStatement = new BoxStatement(statements);

			// 如果需要编译
			if(config.es6Base){
				// 给对象表达式设置临时变量名
				statement.expression.setCompiledVariableTo(
					statements,
					statement.target.expression
				);
			}

			// 设置当前语句的表达式
			statement.expression = expression;
			// 设置盒语句的表达式，以模拟环境
			boxStatement.expression = expression.value;
			// 设置当前语句，以模拟环境
			statements.statement = boxStatement;
			// 再次设置当前语句
			statements.statement = new SpreadStatement(statements);
		}
	});
	
	return SpreadPropertyTag;
}(
	this.SpreadTag,
	this.SpreadPropertyExpression,
	this.SpreadStatement
);

}.call(
	this
);