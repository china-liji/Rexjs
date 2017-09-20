// 父类调用相关
!function(CallExpression, CallStatement){

this.SuperCallExpression = function(extractTo){
	/**
	 * 父类调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 * @param {String} reference - 构造函数中 this 的指向
	 */
	function SuperCallExpression(open, statement, constructorReference){
		CallExpression.call(this, open, statement);

		this.constructorReference = constructorReference;
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
		withSpread: function(){
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
	 * @param {Context} open - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 * @param {String} boundThis - 解析时，使用 Function.apply、call 或 bind 时，所需传递的 this
	 */
	function SuperMethodCallExpression(open, statement, boundThis){
		CallExpression.call(this, open, statement);

		this.boundThis = boundThis;
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
		 * 告知该表达式有拓展符
		 * @param {Statements} statements - 当前语句块
		 */
		withSpread: function(){
			this.spread = true;
		}
	});

	return SuperMethodCallExpression;
}(
	CallExpression.prototype.extractTo
);

this.OpenSuperCallTag = function(OpenCallTag, SuperCallExpression){
	/**
	 * 起始父类调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSuperCallTag(_type){
		OpenCallTag.call(this, _type);
	};
	OpenSuperCallTag = new Rexjs(OpenSuperCallTag, OpenCallTag);
	
	OpenSuperCallTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var closure = statements.closure;

			// 向当前闭包申请调用 super
			closure.applySuperCall(parser, statement.expression.context, context);

			// 设置当前表达式
			statement.expression = new SuperCallExpression(context, statement, closure.reference);
			// 设置当前语句
			statements.statement = new CallStatement(statements);
		}
	});
	
	return OpenSuperCallTag;
}(
	this.OpenCallTag,
	this.SuperCallExpression
);

this.OpenSuperMethodCallTag = function(OpenSuperCallTag, SuperMethodCallExpression, ConstructorBodyStatements){
	/**
	 * 起始父类方法调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSuperMethodCallTag(_type){
		OpenSuperCallTag.call(this, _type);
	};
	OpenSuperMethodCallTag = new Rexjs(OpenSuperMethodCallTag, OpenSuperCallTag);
	
	OpenSuperMethodCallTag.props({
		order: ECMAScriptOrders.OPEN_SUPER_METHOD_CALL,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new SuperMethodCallExpression(
				context,
				statement,
				statements.closure.reference
			);

			// 设置当前语句
			statements.statement = new CallStatement(statements);
		}
	});
	
	return OpenSuperMethodCallTag;
}(
	this.OpenSuperCallTag,
	this.SuperMethodCallExpression,
	this.ConstructorBodyStatements
);

}.call(
	this,
	this.CallExpression,
	this.CallStatement
);