// 父类属性赋值相关
!function(UnaryExpression, PostfixUnaryExpression, BinaryExpression, UnaryAssignmentStatement, SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT, extractTo, getBoundPostfixExpression, compileHead){

this.SuperPropertyBasicAssignmentExpression = function(){
	/**
	 * 父类属性基础赋值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SuperPropertyBasicAssignmentExpression(context){
		BinaryExpression.call(this, context);
	};
	SuperPropertyBasicAssignmentExpression = new Rexjs(SuperPropertyBasicAssignmentExpression, BinaryExpression);

	SuperPropertyBasicAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				var left = this.left;

				// 追加设置父类属性方法的起始代码
				contentBuilder.appendString("(Rexjs.Super.setProperty(");
				// 提取 super 表达式
				left.object.extractTo(contentBuilder);
				// 追加当前环境的 this 指向
				contentBuilder.appendString("," + left.closureReference + ",");
				// 编译属性名
				left.compilePropertyTo(contentBuilder);
				// 追加参数分隔符
				contentBuilder.appendString(",");
				// 追加属性值
				this.right.extractTo(contentBuilder);
				// 追加一系列结束小括号
				contentBuilder.appendString("))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});
	
	return SuperPropertyBasicAssignmentExpression;
}();

this.SuperPropertyShorthandAssignmentExpression = function(extractTo){
	/**
	 * 父类属性简写赋值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SuperPropertyShorthandAssignmentExpression(context){
		BinaryExpression.call(this, context);
	};
	SuperPropertyShorthandAssignmentExpression = new Rexjs(SuperPropertyShorthandAssignmentExpression, BinaryExpression);

	SuperPropertyShorthandAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				var content = this.context.content;

				// 追加获取属性值代码
				contentBuilder.appendString(
					// 编译头部
					compileHead(contentBuilder, this.left, this.variable) +
					content.substring(0, content.length - 1) +
					"("
				);

				// 追加属性值
				this.right.extractTo(contentBuilder);
				// 追加一系列结束小括号
				contentBuilder.appendString(")))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		variable: ""
	});
	
	return SuperPropertyShorthandAssignmentExpression;
}(
	BinaryExpression.prototype.extractTo
);

this.SuperPropertyUnaryAssignmentExpression = function(extractTo){
	/**
	 * 父类属性前置一元赋值表达式
	 * @param {Context} context - 标签上下文
	 */
	function SuperPropertyUnaryAssignmentExpression(context){
		UnaryExpression.call(this, context);
	};
	SuperPropertyUnaryAssignmentExpression = new Rexjs(SuperPropertyUnaryAssignmentExpression, UnaryExpression);
	
	SuperPropertyUnaryAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){debugger
				// 追加获取属性值代码
				contentBuilder.appendString(
					// 编译头部
					compileHead(contentBuilder, this.operand, this.variable) +
					this.context.content[0] +
					"1"
				);

				// 追加一系列结束小括号
				contentBuilder.appendString("))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		variable: ""
	});
	
	return SuperPropertyUnaryAssignmentExpression;
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
			// 如果需要编译
			if(config.es6Base){
				var valueVariable = this.valueVariable;

				// 追加获取属性值代码
				contentBuilder.appendString(
					"(" + valueVariable + "=" +
						// 编译头部
						compileHead(contentBuilder, this.operand, this.nameVariable) +
					")" +
					this.context.content[0] +
					"1"
				);

				// 追加一系列结束小括号
				contentBuilder.appendString(")," + valueVariable + ")");
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
	PostfixUnaryExpression.prototype.extractTo
);

this.SuperPropertyUnaryAssignmentStatement = function(SuperPropertyUnaryAssignmentExpression, SuperDotAccessorExpression, SuperBracketAccessorExpression, out){
	/**
	 * 父类属性一元赋值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SuperPropertyUnaryAssignmentStatement(statements){
		UnaryAssignmentStatement.call(this, statements);
	};
	SuperPropertyUnaryAssignmentStatement = new Rexjs(SuperPropertyUnaryAssignmentStatement, UnaryAssignmentStatement);

	SuperPropertyUnaryAssignmentStatement.props({
		/**
		 * 跳出该语句
		 */
		out: function(){
			var expression = this.expression;

			// 如果表达式父类属性访问器表达式
			if(expression instanceof SuperDotAccessorExpression || expression instanceof SuperBracketAccessorExpression){
				var target = this.target, superPropertyUnaryAssignmentExpression = new SuperPropertyUnaryAssignmentExpression(target.expression.context);

				// 如果需要编译
				if(config.es6Base){
					// 生成并记录临时变量名
					superPropertyUnaryAssignmentExpression.variable = this.statements.collections.generate();
				}

				// 设置 target 的表达式
				target.expression = superPropertyUnaryAssignmentExpression;
			}

			// 调用父类方法
			return out.call(this);
		}
	});

	return SuperPropertyUnaryAssignmentStatement;
}(
	this.SuperPropertyUnaryAssignmentExpression,
	this.SuperDotAccessorExpression,
	this.SuperBracketAccessorExpression,
	UnaryAssignmentStatement.prototype.out
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

this.SuperPropertyBasicAssignmentTag = function(BasicAssignmentTag, SuperPropertyBasicAssignmentExpression){
	/**
	 * 父类属性基础赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyBasicAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	SuperPropertyBasicAssignmentTag = new Rexjs(SuperPropertyBasicAssignmentTag, BasicAssignmentTag);
	
	SuperPropertyBasicAssignmentTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new SuperPropertyBasicAssignmentExpression(context);
		},
		order: ECMAScriptOrders.SUPER_PROPERTY_ASSIGNMENT
	});
	
	return SuperPropertyBasicAssignmentTag;
}(
	this.BasicAssignmentTag,
	this.SuperPropertyBasicAssignmentExpression
);

this.SuperPropertyShorthandAssignmentTag = function(ShorthandAssignmentTag, SuperPropertyShorthandAssignmentExpression){
	/**
	 * 父类属性简写赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyShorthandAssignmentTag(_type){
		ShorthandAssignmentTag.call(this, _type);
	};
	SuperPropertyShorthandAssignmentTag = new Rexjs(SuperPropertyShorthandAssignmentTag, ShorthandAssignmentTag);
	
	SuperPropertyShorthandAssignmentTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			var expression = new SuperPropertyShorthandAssignmentExpression(context);

			// 如果需要解析
			if(config.es6Base){
				// 生成并记录临时变量名
				expression.variable = statement.statements.collections.generate();
			}

			return expression;
		},
		order: ECMAScriptOrders.SUPER_PROPERTY_SHORTHAND_ASSIGNMENT
	});
	
	return SuperPropertyShorthandAssignmentTag;
}(
	this.ShorthandAssignmentTag,
	this.SuperPropertyShorthandAssignmentExpression
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
	this.BinaryExpression,
	this.UnaryAssignmentStatement,
	ECMAScriptOrders.SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT,
	this.BinaryExpression.prototype.extractTo,
	// getBoundPostfixExpression
	null,
	// compileHead
	function(contentBuilder, operand, variable){
		var propertyOwner = operand.object.propertyOwner, closureReference = operand.closureReference;

		// 追加设置 父类属性方法的起始代码、属性变量名 及 当前环境的 this 指向
		contentBuilder.appendString(
			"(Rexjs.Super.setProperty(" + propertyOwner + "," + closureReference + "," + variable + "="
		);

		// 编译属性名
		operand.compilePropertyTo(contentBuilder);
		// 追加分号
		contentBuilder.appendString(",");

		return (
			"Rexjs.Super.getProperty(" +
				propertyOwner + "," +
				closureReference + "," +
				variable +
			")"
		);
	}
);