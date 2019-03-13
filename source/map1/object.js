// 对象相关
!function(DestructuringExpression, propertySeparatorTag, closingObjectTag, destructItem){

this.ObjectDestructuringExpression = function(){
	/**
	 * 对象解构表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ObjectDestructuringExpression(origin){
		DestructuringExpression.call(this, origin.opening, origin);
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
	PropertyDestructuringItemExpression, PropertyRestDestructuringItemExpression, PropertyDefaultDestructuringItemExpression,
	LiteralPropertyNameExpression, ComputedPropertyNameExpression, ShorthandMethodExpression, PropertyInitializerExpression,
	AssignableExpression, BinaryExpression, SpreadExpression,
	BasicAssignmentTag,
	extractTo, compileItem
){
	/**
	 * 对象表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function ObjectExpression(opening){
		DestructibleExpression.call(this, opening);
	};
	ObjectExpression = new Rexjs(ObjectExpression, DestructibleExpression);

	ObjectExpression.props({
		/**
		 * 将对象每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {VarTag} _varTag - 声明标签，一旦提供该参数，如果是声明解构且变量名没有被收集，那么会自动进行收集
		 */
		convert: function(parser, _varTag){
			var inner = this.inner;

			// 遍历
			for(var i = inner.min, j = inner.length;i < j;i++){
				var expression = inner[i], name = expression.name, value = expression.value, operand = value.operand;

				// 判断属性名
				switch(true){
					// 如果是字面量属性名
					case name instanceof LiteralPropertyNameExpression:
						// 如果是简写属性 或者 如果是简写属性默认值表达式
						if(!operand || value instanceof PropertyInitializerExpression){
							// 如果已经被收集到常量内
							if(this.collectedBy(parser, name, _varTag, true)){
								return;
							}

							// 转化表达式
							expression = (
								operand ?
									new PropertyDefaultDestructuringItemExpression(expression, expression, parser.statements) :
									new PropertyDestructuringItemExpression(expression)
							);
							break;
						}

					// 如果是计算式属性名
					case name instanceof ComputedPropertyNameExpression:
						// 判断属性值，这里一定会对应上面的属性名判断，因为在匹配标签上下文的时候，就已经保护了表达式的正确性
						switch(true){
							// 如果是可赋值的属性值
							case operand instanceof AssignableExpression:
								// 如果已经被收集到常量内
								if(this.collectedBy(parser, operand, _varTag)){
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
										expression = new PropertyDefaultDestructuringItemExpression(expression, operand, parser.statements);
										break;
									}
								}

								// 报错
								this.throwError(parser, operand);
								return;

							// 如果是可解构的表达式
							case operand instanceof DestructibleExpression:
								// 表明是嵌套解构子项
								value.destructuringItem = true;
								// 转化为解构子项
								value.operand = operand.toDestructuringItem(parser, _varTag);

								// 转化表达式
								expression = new PropertyDestructuringItemExpression(expression);
								break;

							// 如果是简写表达式
							case operand instanceof ShorthandMethodExpression:
								// 报错
								this.throwError(parser, expression.accessible ? name : operand.arguments);
								return;

							default:
								// 报错
								this.throwError(parser, operand);
								return;
						}

						break;

					// 如果是拓展表达式
					case value instanceof SpreadExpression:
						// 如果不是对象最后一项
						if(i !== j - 1){
							// 报错
							this.throwError(parser, expression, "REST_ELEMENT");
							return;
						}

						// 如果是可赋值的属性值
						if(operand instanceof AssignableExpression){
							// 如果已经被收集到常量内
							if(this.collectedBy(parser, operand, _varTag)){
								return;
							}

							// 转化表达式
							expression = new PropertyRestDestructuringItemExpression(expression);
							break;
						}

						// 报错
						this.throwError(parser, operand);
						return;

					default:
						// 报错
						this.throwError(parser, name);
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
			if(this.needCompile){
				var anotherBuilder = new ContentBuilder();

				// 追加临时变量名
				anotherBuilder.appendString(variable);
				// 追加临时变量名赋值代码
				contentBuilder.appendString("(" + variable + "={},");
				// 编译内容
				this.inner.forEach(compileItem, contentBuilder, anotherBuilder);
				// 追加结束小括号
				contentBuilder.appendString(variable + ")");
				return;
			}

			// 如果要将该对象用临时变量名记录
			if(variable){
				// 追加变量名赋值代码
				contentBuilder.appendString("(" + variable + "=");
				// 调用父类方法
				extractTo.call(this, contentBuilder);
				// 追加结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		needCompile: false,
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(parser, _varTag){
			// 转换内部表达式
			this.convert(parser, _varTag);
			return new ObjectDestructuringExpression(this);
		},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(parser, _varTag){
			var inner = this.inner, expression = new ObjectDestructuringItemExpression(this);

			// 如果需要解析 而且 长度大于 1（长度为 0 不解析，长度为 1，只需取一次对象，所以都不需要生成变量名）
			if(config.es6Base && inner.length > 1){
				// 设置变量名
				this.setVariableOf(expression, parser.statements);
			}

			// 转换内部表达式
			this.convert(parser, _varTag);
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
	this.PropertyRestDestructuringItemExpression,
	this.PropertyDefaultDestructuringItemExpression,
	this.LiteralPropertyNameExpression,
	this.ComputedPropertyNameExpression,
	this.ShorthandMethodExpression,
	this.PropertyInitializerExpression,
	this.AssignableExpression,
	this.BinaryExpression,
	this.SpreadExpression,
	this.BasicAssignmentTag,
	PartnerExpression.prototype.extractTo,
	// compileItem
	function(item, contentBuilder, anotherBuilder){
		item.compileTo(contentBuilder, anotherBuilder);
	}
);

this.OpeningObjectTag = function(OpeningBraceTag, ObjectExpression, PropertyStatement){
	/**
	 * 起始对象标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningObjectTag(_type){
		OpeningBraceTag.call(this, _type);
	};
	OpeningObjectTag = new Rexjs(OpeningObjectTag, OpeningBraceTag);

	OpeningObjectTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closingObjectTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new ObjectExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new PropertyStatement(statements);
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
		visitor: commonVisitor
	});

	return OpeningObjectTag;
}(
	this.OpeningBraceTag,
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
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new PropertyStatement(statements);
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
			// 设置当前语句
			context.setStatementOf(statements);
		}
	});

	return PropertySeparatorTag;
}(
	this.CommaTag,
	this.PropertyStatement
);

this.ClosingObjectTag = function(ClosingBraceTag){
	/**
	 * 结束对象标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingObjectTag(_type){
		ClosingBraceTag.call(this, _type);
	};
	ClosingObjectTag = new Rexjs(ClosingObjectTag, ClosingBraceTag);

	ClosingObjectTag.props({
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
			// 设置 closing
			statement.expression.closing = context;
		}
	});

	return ClosingObjectTag;
}(
	this.ClosingBraceTag
);

propertySeparatorTag = new this.PropertySeparatorTag();
closingObjectTag = new this.ClosingObjectTag();

}.call(
	this,
	this.DestructuringExpression,
	// propertySeparatorTag
	null,
	// closingObjectTag
	null,
	// destructItem
	function(expression, contentBuilder, anotherBuilder){
		expression.compileTo(contentBuilder, anotherBuilder);
	}
);