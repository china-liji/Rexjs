// 对象相关
~function(DestructuringExpression, propertySeparatorTag, closeObjectTag, destructItem){

this.ObjectDestructuringExpression = function(){
	/**
	 * 对象解构表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ObjectDestructuringExpression(origin){
		DestructuringExpression.call(this, origin.open, origin);
	};
	ObjectDestructuringExpression = new Rexjs(ObjectDestructuringExpression, DestructuringExpression);

	ObjectDestructuringExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(destructItem, contentBuilder, anotherBuilder);
		}
	});

	return ObjectDestructuringExpression;
}();

this.ObjectDestructuringItemExpression = function(DestructuringItemExpression){
	/**
	 * 对象解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ObjectDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	ObjectDestructuringItemExpression = new Rexjs(ObjectDestructuringItemExpression, DestructuringItemExpression);

	ObjectDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var builder = new ContentBuilder();

			// 追加初始化解构目标代码
			builder.appendString("new Rexjs.ObjectDestructuringTarget(" + anotherBuilder.result + ")");

			// 遍历的提取每一项
			this.origin.inner.forEach(
				destructItem,
				contentBuilder,
				this.getVariableBuilder(contentBuilder, builder)
			);
		}
	});

	return ObjectDestructuringItemExpression;
}(
	this.DestructuringItemExpression
);

this.ObjectExpression = function(
	DestructibleExpression, ObjectDestructuringExpression, ObjectDestructuringItemExpression,
	PropertyDestructuringItemExpression, PropertyDestructuringRestItemExpression, PropertyDestructuringDefaultItemExpression,
	LiteralPropertyNameExpression, ComputedPropertyNameExpression, ShorthandMethodExpression, PropertyInitializerExpression,
	IdentifierExpression, AssignableExpression, BinaryExpression, SpreadExpression,
	BasicAssignmentTag,
	config,
	extractTo, compileItem, collected, error
){
	/**
	 * 对象表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ObjectExpression(open){
		DestructibleExpression.call(this, open);
	};
	ObjectExpression = new Rexjs(ObjectExpression, DestructibleExpression);

	ObjectExpression.props({
		/**
		 * 自动化生成变量
		 * @param {ECMAScriptStatements} statements - 当前语句块
		 */
		autoVariable: function(statements){
			// 如果已经记录了变量
			if(this.variable){
				return;
			}

			// 记录变量
			this.variable = statements.collections.generate();
		},
		/**
		 * 将对象每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(parser){
			var inner = this.inner;

			// 遍历
			for(var i = inner.min, j = inner.length;i < j;i++){
				var expression = inner[i], name = expression.name, value = expression.value, operand = value.operand;

				// 判断属性名
				switch(true){
					// 如果是字面量属性名
					case name instanceof LiteralPropertyNameExpression:
						// 如果是简写属性
						if(!operand){
							// 如果已经被收集到常量内
							if(collected(parser, name, true)){
								return;
							}

							// 转化表达式
							expression = new PropertyDestructuringItemExpression(expression);
							break;
						}

						// 如果是简写属性默认值表达式
						if(value instanceof PropertyInitializerExpression){
							// 转化表达式
							expression = new PropertyDestructuringDefaultItemExpression(expression, expression, parser.statements);
							break;
						}

					// 如果是计算式属性名
					case name instanceof ComputedPropertyNameExpression:
						// 判断属性值，这里一定会对应上面的属性名判断，因为在匹配标签上下文的时候，就已经保护了表达式的正确性
						switch(true){
							// 如果是可赋值的属性值
							case operand instanceof AssignableExpression:
								// 如果已经被收集到常量内
								if(collected(parser, operand, operand instanceof IdentifierExpression)){
									return;
								}

								// 转化表达式
								expression = new PropertyDestructuringItemExpression(expression);
								break;

							// 如果是二元表达式
							case operand instanceof BinaryExpression:
								// 如果二元运算表达式的标签是赋值符号
								if(operand.context.tag instanceof BasicAssignmentTag){
									// 如果二元表达式左侧不是解构表达式
									if(!(operand.left instanceof DestructuringExpression)){
										// 转化表达式
										expression = new PropertyDestructuringDefaultItemExpression(expression, operand, parser.statements);
										break;
									}
								}

								// 报错
								error(parser, operand);
								return;

							// 如果是可解构的表达式
							case operand instanceof DestructibleExpression:
								// 表明是嵌套解构子项
								value.destructuringItem = true;
								// 转化为解构子项
								value.operand = operand.toDestructuringItem(parser);

								// 转化表达式
								expression = new PropertyDestructuringItemExpression(expression);
								break;

							// 如果是简写表达式
							case operand instanceof ShorthandMethodExpression:
								// 报错
								error(parser, expression.accessible ? name : operand.arguments);
								return;

							default:
								// 报错
								error(parser, operand);
								return;
						}

						break;

					// 如果是拓展表达式
					case value instanceof SpreadExpression:
						// 如果不是对象最后一项
						if(i !== j - 1){
							// 报错
							error(parser, expression, "REST_ELEMENT");
							return;
						}

						// 如果是可赋值的属性值
						if(operand instanceof AssignableExpression){
							// 如果已经被收集到常量内
							if(collected(parser, operand, operand instanceof IdentifierExpression)){
								return;
							}

							// 转化表达式
							expression = new PropertyDestructuringRestItemExpression(expression);
							break;
						}

					default:
						// 报错
						error(parser, name);
						return;
				}

				// 重新设置表达式
				inner[i] = inner.latest = expression;
			}
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var variable = this.variable;

			// 如果存在变量名，说明需要分步设置属性
			if(variable){
				var anotherBuilder = new ContentBuilder();

				// 追加临时变量名
				anotherBuilder.appendString(variable);

				// 追加函数闭包头部
				contentBuilder.appendString("(" + variable + "={},");
				// 编译内容
				this.inner.forEach(compileItem, contentBuilder, anotherBuilder);
				// 追加函数闭包尾部
				contentBuilder.appendString(variable + ")");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(parser){
			// 转换内部表达式
			this.convert(parser, this.inner);
			return new ObjectDestructuringExpression(this);
		},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(parser){
			var inner = this.inner, expression = new ObjectDestructuringItemExpression(this);

			// 如果需要解析解构表达式 而且 长度大于 1（长度为 0 不解析，长度为 1，只需取一次对象，所以都不需要生成变量名）
			if(config.value && inner.length > 1){
				var collections = parser.statements.collections;

				// 给刚生成的解构赋值表达式设置变量名
				expression.variable = (
					// 如果是声明形式的解构赋值
					this.declaration ?
						// 只需提供，不用在语句块进行定义
						collections.provide() :
						// 需要提供并定义
						collections.generate()
				);
			}

			// 转换内部表达式
			this.convert(parser, this.inner);
			return expression;
		},
		variable: ""
	});

	return ObjectExpression;
}(
	this.DestructibleExpression,
	this.ObjectDestructuringExpression,
	this.ObjectDestructuringItemExpression,
	this.PropertyDestructuringItemExpression,
	this.PropertyDestructuringRestItemExpression,
	this.PropertyDestructuringDefaultItemExpression,
	this.LiteralPropertyNameExpression,
	this.ComputedPropertyNameExpression,
	this.ShorthandMethodExpression,
	this.PropertyInitializerExpression,
	this.IdentifierExpression,
	this.AssignableExpression,
	this.BinaryExpression,
	this.SpreadExpression,
	this.BasicAssignmentTag,
	DestructuringExpression.config,
	PartnerExpression.prototype.extractTo,
	// compileItem
	function(item, contentBuilder, anotherBuilder){
		item.compileTo(contentBuilder, anotherBuilder);
	},
	// collected
	function(parser, expression, identifier){
		// 如果是标识符表达式
		if(identifier){
			var context = expression.context;

			// 判断是否收集到常量中
			return context.tag.collected(parser, context, parser.statements);
		}

		return false;
	},
	// error
	function(parser, expression, _errorName){
		parser.error(
			expression.context,
			_errorName ? ECMAScriptErrors[_errorName] : null
		);
	}
);

this.OpenObjectTag = function(OpenBraceTag, ObjectExpression, PropertyStatement){
	/**
	 * 起始对象标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenObjectTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenObjectTag = new Rexjs(OpenObjectTag, OpenBraceTag);

	OpenObjectTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeObjectTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return propertySeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ObjectExpression(context);
			// 设置当前语句
			statements.statement = new PropertyStatement(statements);
		}
	});

	return OpenObjectTag;
}(
	this.OpenBraceTag,
	this.ObjectExpression,
	this.PropertyStatement
);

this.PropertySeparatorTag = function(CommaTag, PropertyStatement){
	/**
	 * 对象属性的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertySeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	PropertySeparatorTag = new Rexjs(PropertySeparatorTag, CommaTag);

	PropertySeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new PropertyStatement(statements);
		}
	});

	return PropertySeparatorTag;
}(
	this.CommaTag,
	this.PropertyStatement
);

this.CloseObjectTag = function(CloseBraceTag){
	/**
	 * 结束对象标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseObjectTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseObjectTag = new Rexjs(CloseObjectTag, CloseBraceTag);

	CloseObjectTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructibleExpressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 close
			statement.expression.close = context;
		}
	});

	return CloseObjectTag;
}(
	this.CloseBraceTag
);

propertySeparatorTag = new this.PropertySeparatorTag();
closeObjectTag = new this.CloseObjectTag();

}.call(
	this,
	this.DestructuringExpression,
	// propertySeparatorTag
	null,
	// closeObjectTag
	null,
	// destructItem
	function(expression, contentBuilder, anotherBuilder){
		expression.compileTo(contentBuilder, anotherBuilder);
	}
);