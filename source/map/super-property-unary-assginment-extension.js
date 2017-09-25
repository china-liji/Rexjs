// 父类属性一元赋值标签子类相关
!function(UnaryExpression, PostfixUnaryExpression, SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT){

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

this.SuperPropertyPostfixUnaryAssignmentExpression = function(extractTo){
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
			if(config.es6Base){debugger
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
	
	return SuperPropertyPostfixUnaryAssignmentExpression;
}(
	PostfixUnaryExpression.prototype.extractTo
);

this.SuperPropertyPostfixIncrementTag = function(PostfixIncrementTag, SuperPropertyPostfixUnaryAssignmentExpression){
	/**
	 * 父类属性后置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyPostfixIncrementTag(_type){
		PostfixIncrementTag.call(this, _type);
	};
	SuperPropertyPostfixIncrementTag = new Rexjs(SuperPropertyPostfixIncrementTag, PostfixIncrementTag);
	
	SuperPropertyPostfixIncrementTag.props({
		order: SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new SuperPropertyPostfixUnaryAssignmentExpression(context, statement.expression);
		}
	});
	
	return SuperPropertyPostfixIncrementTag;
}(
	this.PostfixIncrementTag,
	this.SuperPropertyPostfixUnaryAssignmentExpression
);

}.call(
	this,
	this.UnaryExpression,
	this.PostfixUnaryExpression,
	ECMAScriptOrders.SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT
);