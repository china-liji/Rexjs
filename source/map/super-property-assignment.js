// 父类属性赋值相关
!function(BinaryExpression, extractTo){

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

this.SuperPropertyShorthandAssignmentExpression = function(extractTo, compile){
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
				// 编译表达式
				compile(contentBuilder, this.left, this.right, this.variable, this.context.content);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		variable: ""
	});
	
	return SuperPropertyShorthandAssignmentExpression;
}(
	BinaryExpression.prototype.extractTo,
	// compile
	function(contentBuilder, left, right, variable, content){
		var propertyOwner = left.object.propertyOwner, closureReference = left.closureReference;

		// 追加设置 父类属性方法的起始代码、属性变量名 及 当前环境的 this 指向
		contentBuilder.appendString(
			"(Rexjs.Super.setProperty(" + propertyOwner + "," + closureReference + "," + variable + "="
		);

		// 编译属性名
		left.compilePropertyTo(contentBuilder);

		// 追加获取属性值代码
		contentBuilder.appendString(
			",Rexjs.Super.getProperty(" +
				propertyOwner + "," +
				closureReference + "," +
				variable +
			")" +
			content.substring(0, content.length - 1) +
			"("
		);

		// 追加属性值
		right.extractTo(contentBuilder);
		// 追加一系列结束小括号
		contentBuilder.appendString(")))");
	}
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

}.call(
	this,
	this.BinaryExpression,
	this.BinaryExpression.prototype.extractTo
);