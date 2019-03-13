// 解构表达式相关
!function(){

this.DestructibleExpression = function(IdentifierExpression, EnvConstantTag, Context){
	/**
	 * 可解构的表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function DestructibleExpression(opening){
		PartnerExpression.call(this, opening);

		this.inner = new ListExpression(null, ",");
	};
	DestructibleExpression = new Rexjs(DestructibleExpression, PartnerExpression);

	DestructibleExpression.props({
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){},
		/**
		 * 判断表达式变量名是否已经被收集
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 需要判断变量名的表达式
		 * @param {VarTag} _varTag - 声明标签，一旦提供该参数，如果是声明解构且变量名没有被收集，那么会自动进行收集
		 * @param {Boolean} _asIdentifier - 是否将表达式作为标识符表达式处理
		 */
		collectedBy: function(parser, expression, _varTag, _asIdentifier){
			// 如果是标识符表达式
			if(_asIdentifier || expression instanceof IdentifierExpression){
				var context = expression.context;

				// 如果是环境常量
				if(context.tag instanceof EnvConstantTag){
					// 报错
					parser.error(context);
					return false;
				}

				// 如果是声明解构且提供了声明标签
				if(this.declaration && _varTag){
					// 初始化替代的标签上下文
					context = new Context(
						_varTag,
						context.content,
						context.position
					);

					// 返回是否收集成功的对立结果（如果当前被搜集成功，那么说明之前没有被搜集）
					return !_varTag.variable.collectTo(parser, context, parser.statements);
				}

				// 判断是否收集到常量中
				return context.tag.collected(parser, context, parser.statements);
			}

			return false;
		},
		declaration: false,
		/**
		 * 根据语句块上下文给指定表达式设置变量名
		 * @param {Expression} expression - 需要设置变量名的表达式
		 * @param {Statements} statements - 当前语句块
		 */
		setVariableOf: function(expression, statements){
			var collections = statements.collections;

			expression.variable = (
				// 如果是 声明形式的解构赋值 而且 不存在需要编译的生成器
				this.declaration && !statements.contextGeneratorIfNeedCompile ?
					// 只需提供，不用在语句块进行定义
					collections.provide() :
					// 需要提供并定义
					collections.generate()
			);
		},
		/**
		 * 抛出错误
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 相关表达式
		 * @param {String} _errorName - 指定的错误名称
		 */
		throwError: function(parser, expression, _errorName){
			parser.error(
				expression.context,
				_errorName ? ECMAScriptErrors[_errorName] : null
			);
		},
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(){},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(){}
	});

	return DestructibleExpression;
}(
	this.IdentifierExpression,
	this.EnvConstantTag,
	Rexjs.Context
);

this.DestructuringExpression = function(AssignableExpression){
	/**
	 * 解构表达式
	 * @param {Context} context - 标签上下文
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function DestructuringExpression(context, origin){
		AssignableExpression.call(this, context);

		this.origin = origin;
	};
	DestructuringExpression = new Rexjs(DestructuringExpression, AssignableExpression);

	DestructuringExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {Expression} expression - 解构当前项
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(){},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 直接提取源表达式
			this.origin.extractTo(contentBuilder);
		},
		origin: null
	});

	return DestructuringExpression;
}(
	this.AssignableExpression
);

this.DestructuringItemExpression = function(DestructuringExpression){
	/**
	 * 解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function DestructuringItemExpression(origin){
		DestructuringExpression.call(this, origin.context, origin);
	};
	DestructuringItemExpression = new Rexjs(DestructuringItemExpression, DestructuringExpression);

	DestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var builder = new ContentBuilder();

			// 提取源表达式到临时内容生成器
			this.origin.extractTo(builder);
			// 追加赋值操作
			contentBuilder.appendString("," + builder.result + "=" + anotherBuilder.result);
		},
		/**
		 * 获取嵌套类型解构项的变量名生成器
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		getVariableBuilder: function(contentBuilder, anotherBuilder){
			// 根据长度判断
			switch(this.origin.inner.length){
				// 如果是 0，说明没有解构内容，不需要解构
				case 0:
					return null;

				// 如果是 1，说明可以直接用 $Rexjs_0[0] 形式直接使用，不需要单独使用变量名记录
				case 1:
					return anotherBuilder;
			}

			var variable = this.variable, builder = new ContentBuilder();

			// 追加变量名到临时内容生成器
			builder.appendString(variable);

			// 追加变量名的赋值操作
			contentBuilder.appendString(
				"," + variable + "=" + anotherBuilder.result
			);

			return builder;
		},
		rest: false,
		variable: ""
	});

	return DestructuringItemExpression;
}(
	this.DestructuringExpression
);

this.DefaultDestructuringItemExpression = function(DestructuringItemExpression){
	/**
	 * 解构默认项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 * @param {Statements} statements - 该表达式所处的语句块
	 */
	function DefaultDestructuringItemExpression(origin, statements){
		DestructuringItemExpression.call(this, origin);

		// 如果需要编译
		if(config.es6Base){
			// 给刚生成的解构赋值表达式设置变量名
			this.variable = statements.collections.generate();
		}
	};
	DefaultDestructuringItemExpression = new Rexjs(DefaultDestructuringItemExpression, DestructuringItemExpression);

	DefaultDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 将默认值表达式转换为三元表达式
			this.toTernary(this.origin, contentBuilder, anotherBuilder);
		},
		/**
		 * 将默认值表达式转换为三元表达式
		 * @param {BinaryExpression} expression - 默认值二元表达式
		 * @param {ContentBuilder} contentBuilder - 主内容生成器
		 * @param {ContentBuilder} valueBuilder - 属性值生成器
		 */
		toTernary: function(expression, contentBuilder, valueBuilder){
			var variable = this.variable, leftBuilder = new ContentBuilder(), rightBuilder = new ContentBuilder();

			// 提取左侧表达式到临时内容生成器
			expression.left.extractTo(leftBuilder);
			// 提取右侧表达式到临时内容生成器
			expression.right.extractTo(rightBuilder);

			// 追加赋值操作
			contentBuilder.appendString(
				"," + leftBuilder.result + "=(" +
					variable + "=" + valueBuilder.result + "," +
					// 三元表达式，判断是否为 undefined
					variable + "===void 0?" +
						rightBuilder.result +
						":" + variable +
				")"
			);
		}
	});

	return DefaultDestructuringItemExpression;
}(
	this.DestructuringItemExpression
);

this.PropertyDestructuringItemExpression = function(DestructuringItemExpression){
	/**
	 * 属性解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function PropertyDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	PropertyDestructuringItemExpression = new Rexjs(PropertyDestructuringItemExpression, DestructuringItemExpression);

	PropertyDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var origin = this.origin, builder = new ContentBuilder();

			// 追加获取属性方法起始代码
			builder.appendString(anotherBuilder.result + ".get(");
			// 解构属性名
			origin.name.defineTo(builder);
			// 追加获取属性方法结束代码
			builder.appendString(")");
			// 解构属性值
			origin.value.destructTo(contentBuilder, builder);
		}
	});

	return PropertyDestructuringItemExpression;
}(
	this.DestructuringItemExpression
);

this.PropertyRestDestructuringItemExpression = function(PropertyDestructuringItemExpression){
	/**
	 * 对象属性结构省略项表达式
	 * @param {Expression} origin - 解构项源表达式
	 */
	function PropertyRestDestructuringItemExpression(origin){
		PropertyDestructuringItemExpression.call(this, origin);
	};
	PropertyRestDestructuringItemExpression = new Rexjs(PropertyRestDestructuringItemExpression, PropertyDestructuringItemExpression);

	PropertyRestDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var builder = new ContentBuilder();
			
			// 提取源表达式到临时内容生成器
			this.origin.value.operand.extractTo(builder);
			// 追加赋值操作
			contentBuilder.appendString("," + builder.result + "=" + anotherBuilder.result + ".rest");
		},
		rest: true
	});

	return PropertyRestDestructuringItemExpression;
}(
	this.PropertyDestructuringItemExpression
);

this.PropertyDefaultDestructuringItemExpression = function(DefaultDestructuringItemExpression){
	/**
	 * 属性解构默认项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 * @param {BinaryExpression} assignment - 默认值赋值表达式
	 * @param {Statements} statements - 该表达式所处的语句块
	 */
	function PropertyDefaultDestructuringItemExpression(origin, assignment, statements){
		DefaultDestructuringItemExpression.call(this, origin, statements);

		this.assignment = assignment;
	};
	PropertyDefaultDestructuringItemExpression = new Rexjs(PropertyDefaultDestructuringItemExpression, DefaultDestructuringItemExpression);

	PropertyDefaultDestructuringItemExpression.props({
		assignment: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var origin = this.origin, value = origin.value;

			// 解构属性名
			origin.name.extractTo(contentBuilder);
			// 追加等号
			contentBuilder.appendContext(value.context);
			// 追加值
			value.operand.extractTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var origin = this.origin, builder = new ContentBuilder();

			// 追加获取属性方法起始代码
			builder.appendString(anotherBuilder.result + ".get(");
			// 解构属性名
			origin.name.defineTo(builder);
			// 追加获取属性方法结束代码
			builder.appendString(")");

			// 将默认值表达式转换为三元表达式
			this.toTernary(this.assignment, contentBuilder, builder);
		}
	});

	return PropertyDefaultDestructuringItemExpression;
}(
	this.DefaultDestructuringItemExpression
);

}.call(
	this
);