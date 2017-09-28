// 父类属性一元赋值标签子类相关
!function(UnaryExpression, PostfixUnaryExpression, SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT, getBoundPostfixExpression){

this.SuperPropertyPrefixUnaryAssignmentExpression = function(extractTo){
	/**
	 * 父类属性前置一元赋值表达式
	 * @param {Context} context - 标签上下文
	 */
	function SuperPropertyPrefixUnaryAssignmentExpression(context){
		UnaryExpression.call(this, context);
	};
	SuperPropertyPrefixUnaryAssignmentExpression = new Rexjs(SuperPropertyPrefixUnaryAssignmentExpression, UnaryExpression);
	
	SuperPropertyPrefixUnaryAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			if(config.es6Base){
				// 提取操作对象内容
				this.operand.extractTo(contentBuilder);
				// 提取一元操作符的内容
				contentBuilder.appendContext(this.context);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});
	
	return SuperPropertyPrefixUnaryAssignmentExpression;
}(
	UnaryExpression.prototype.extractTo
);

this.SuperPropertyPostfixUnaryAssignmentExpression = function(extractTo, compile){
	/**
	 * 父类属性后置一元赋值表达式
	 * @param {Context} context - 标签上下文
	 * @param {AssignableExpression} operand - 操作对象表达式
	 */
	function SuperPropertyPostfixUnaryAssignmentExpression(context, operand){
		PostfixUnaryExpression.call(this, context, operand);
	};
	SuperPropertyPostfixUnaryAssignmentExpression = new Rexjs(SuperPropertyPostfixUnaryAssignmentExpression, PostfixUnaryExpression);
	
	SuperPropertyPostfixUnaryAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 编译表达式
				compile(contentBuilder, this.operand, this.context, this.nameVariable, this.valueVariable);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		nameVariable: "",
		valueVariable: ""
	});
	
	return SuperPropertyPostfixUnaryAssignmentExpression;
}(
	PostfixUnaryExpression.prototype.extractTo,
	// compile
	function(contentBuilder, operand, context, nameVariable, valueVariable){
		var propertyOwner = operand.object.propertyOwner, closureReference = operand.closureReference;

		// 追加设置 父类属性方法的起始代码 及 属性变量名
		contentBuilder.appendString("(Rexjs.Super.setProperty(" + propertyOwner);
		// 追加当前环境的 this 指向
		contentBuilder.appendString("," + closureReference + "," + nameVariable + "=");
		// 编译属性名
		operand.compilePropertyTo(contentBuilder);

		// 追加参数分隔符
		contentBuilder.appendString(
			",(" + valueVariable + "=Rexjs.Super.getProperty(" +
				propertyOwner + "," +
				closureReference + "," +
				nameVariable +
			"))" +
			context.content[0] +
			"1"
		);

		// 追加一系列结束小括号
		contentBuilder.appendString(")," + valueVariable + ")");
	}
);

getBoundPostfixExpression = function(SuperPropertyPostfixUnaryAssignmentExpression){
	/**
	 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
	 * @param {Context} context - 相关的语法标签上下文
	 * @param {Statement} statement - 当前语句
	 */
	return function(context, statement){
		var expression = new SuperPropertyPostfixUnaryAssignmentExpression(context, statement.expression);

		// 如果需要解析
		if(config.es6Base){
			var collections = statement.statements.collections;
			
			// 生成并记录属性名临时变量名
			expression.nameVariable = collections.generate();
			// 生成并记录属性值临时变量名
			expression.valueVariable = collections.generate();
		}

		return expression;
	};
}(
	this.SuperPropertyPostfixUnaryAssignmentExpression
);

this.SuperPropertyPostfixIncrementTag = function(PostfixIncrementTag){
	/**
	 * 父类属性后置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyPostfixIncrementTag(_type){
		PostfixIncrementTag.call(this, _type);
	};
	SuperPropertyPostfixIncrementTag = new Rexjs(SuperPropertyPostfixIncrementTag, PostfixIncrementTag);
	
	SuperPropertyPostfixIncrementTag.props({
		getBoundExpression: getBoundPostfixExpression,
		order: SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT
	});
	
	return SuperPropertyPostfixIncrementTag;
}(
	this.PostfixIncrementTag
);

this.SuperPropertyPostfixDecrementTag = function(PostfixDecrementTag){
	/**
	 * 父类属性后置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyPostfixDecrementTag(_type){
		PostfixDecrementTag.call(this, _type);
	};
	SuperPropertyPostfixDecrementTag = new Rexjs(SuperPropertyPostfixDecrementTag, PostfixDecrementTag);
	
	SuperPropertyPostfixDecrementTag.props({
		getBoundExpression: getBoundPostfixExpression,
		order: SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT
	});
	
	return SuperPropertyPostfixDecrementTag;
}(
	this.PostfixDecrementTag
);

}.call(
	this,
	this.UnaryExpression,
	this.PostfixUnaryExpression,
	ECMAScriptOrders.SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT,
	// getBoundPostfixExpression
	null
);