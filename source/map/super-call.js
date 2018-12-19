// 父类调用相关
!function(CallExpression, OpeningCallTag){

this.SuperCallExpression = function(extractTo){
	/**
	 * 父类调用表达式
	 * @param {Context} opening - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 */
	function SuperCallExpression(opening, statement){
		CallExpression.call(this, opening, statement);

		this.constructorReference = statement.statements.closure.reference;
	};
	SuperCallExpression = new Rexjs(SuperCallExpression, CallExpression);

	SuperCallExpression.props({
		constructorReference: "",
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				contentBuilder.appendString("(" + this.constructorReference + "=Rexjs.Super.");
				
				// 如果有拓展符
				if(this.spread){
					// 设置 boundThis
					this.boundThis = "this";

					// 追加获取返回值函数的起始代码
					contentBuilder.appendString("returnedThis(this,");
					// 因为 super 不可能是对象属性，也不可能使用 new（语法上做了保护），所以直接使用 spreadTo 就可以了
					this.spreadTo(contentBuilder);
				}
				else {
					// 追加获取返回值函数的起始代码
					contentBuilder.appendString("callConstructor(");
					// 提取操作对象
					this.operand.extractTo(contentBuilder);
					// 追加 this 及 参数起始中括号
					contentBuilder.appendString(",this,[");
					// 提取参数
					this.inner.extractTo(contentBuilder);
					// 追加参数结束中括号
					contentBuilder.appendString("]");
				}

				// 追加以上关联的两个结束小括号
				contentBuilder.appendString("))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 告知该表达式有拓展符
		 * @param {Statements} statements - 当前语句块
		 */
		spreadMatched: function(){
			this.spread = true;
		}
	});

	return SuperCallExpression;
}(
	CallExpression.prototype.extractTo
);

this.SuperMethodCallExpression = function(extractTo){
	/**
	 * 父类方法调用表达式
	 * @param {Context} opening - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 */
	function SuperMethodCallExpression(opening, statement){
		CallExpression.call(this, opening, statement);

		this.boundThis = statement.statements.closure.reference;
	};
	SuperMethodCallExpression = new Rexjs(SuperMethodCallExpression, CallExpression);

	SuperMethodCallExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 如果有拓展符
				if(this.spread){
					// 因为 super 不可能是对象属性，也不可能使用 new（语法上做了保护），所以直接使用 spreadTo 就可以了
					this.spreadTo(contentBuilder);
					return;
				}

				// 追加 execMethod 方法头部代码
				contentBuilder.appendString("Rexjs.Super.execMethod(" + this.boundThis + ",");
				// 提取操作对象
				this.operand.extractTo(contentBuilder);
				// 追加 execMethod 方法的参数
				contentBuilder.appendString(",[");
				// 提取 inner
				this.inner.extractTo(contentBuilder);
				// 追加尾部代码
				contentBuilder.appendString("])");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 当匹配到拓展符时的处理逻辑
		 * @param {Statements} statements - 当前语句块
		 */
		spreadMatched: function(){
			this.spread = true;
		}
	});

	return SuperMethodCallExpression;
}(
	CallExpression.prototype.extractTo
);

this.OpeningSuperCallTag = function(SuperCallExpression, visitor){
	/**
	 * 起始父类调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningSuperCallTag(_type){
		OpeningCallTag.call(this, _type);
	};
	OpeningSuperCallTag = new Rexjs(OpeningSuperCallTag, OpeningCallTag);
	
	OpeningSuperCallTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new SuperCallExpression(context, statement);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前闭包申请调用 super
			statements.closure.applySuperCall(parser, statement.expression.context, context);

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return OpeningSuperCallTag;
}(
	this.SuperCallExpression,
	OpeningCallTag.prototype.visitor
);

this.OpeningSuperMethodCallTag = function(SuperMethodCallExpression){
	/**
	 * 起始父类方法调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningSuperMethodCallTag(_type){
		OpeningCallTag.call(this, _type);
	};
	OpeningSuperMethodCallTag = new Rexjs(OpeningSuperMethodCallTag, OpeningCallTag);
	
	OpeningSuperMethodCallTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new SuperMethodCallExpression(context, statement);
		},
		order: ECMAScriptOrders.OPENING_SUPER_METHOD_CALL
	});
	
	return OpeningSuperMethodCallTag;
}(
	this.SuperMethodCallExpression
);

}.call(
	this,
	this.CallExpression,
	this.OpeningCallTag
);