// 属性初始值标签相关
!function(PropertyValueExpression){

this.PropertyInitializerExpression = function(extractTo, toTernary){
	/**
	 * 属性初始值表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} variable - 对象简写属性所对应的变量名
	 */
	function PropertyInitializerExpression(context, variable){
		PropertyValueExpression.call(this, context);

		this.variable = variable;
	};
	PropertyInitializerExpression = new Rexjs(PropertyInitializerExpression, PropertyValueExpression);

	PropertyInitializerExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 以三元表达式的形式追加
			toTernary(contentBuilder, this, "=");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.rexjs){
				// 以三元表达式的形式追加
				toTernary(contentBuilder, this, ":");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		variable: null
	});

	return PropertyInitializerExpression;
}(
	PropertyValueExpression.prototype.extractTo,
	// toTernary
	function(contentBuilder, expression, assignment){
		var variableContent = expression.variable.context.content;
			
		// 追加 undefined 判断
		contentBuilder.appendString(
			assignment + variableContent + "===void 0?"
		);

		// 提取属性值
		expression.operand.extractTo(contentBuilder);

		// 追加三元运算的否定结果表达式
		contentBuilder.appendString(
			":" + variableContent
		);
	}
);

this.PropertyInitializerTag = function(BasicAssignmentTag, PropertyInitializerExpression, PropertyValueStatement){
	/**
	 * 属性初始值标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyInitializerTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	PropertyInitializerTag = new Rexjs(PropertyInitializerTag, BasicAssignmentTag);

	PropertyInitializerTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new PropertyInitializerExpression(context, statement.expression.name);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置属性表达式的值
			statement.expression.value = this.getBoundExpression(context, statement);
			// 设置当前语句
			statements.statement = new PropertyValueStatement(statements);
		}
	});

	return PropertyInitializerTag;
}(
	this.BasicAssignmentTag,
	this.PropertyInitializerExpression,
	this.PropertyValueStatement
);

}.call(
	this,
	this.PropertyValueExpression
);