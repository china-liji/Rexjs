// for 语句相关
!function(CompiledExpression){

this.ForExpression = function(ConditionalExpression, config, compileOf, compileOfWithGenerator){
	/**
	 * for 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ForExpression(context){
		ConditionalExpression.call(this, context);
	};
	ForExpression = new Rexjs(ForExpression, ConditionalExpression);

	ForExpression.props({
		body: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var iterator = this.iterator, generator = this.contextGeneratorIfNeedCompile;

			// 如果存在需要编译的生成器
			if(generator){
				var index = generator.nextIndex(), positiveIndex = generator.nextIndex(), negativeIndex = generator.nextIndex();

				// 如果迭代符存在
				if(iterator){
					// 如果是 of 标签而且需要编译 of
					if(iterator === "of" && config.value){
						// 以生成器形式编译 of
						compileOfWithGenerator(this, index, positiveIndex, negativeIndex, generator, contentBuilder);
						return;
					}

					// 以生成器形式编译逻辑条件
					this.compileConditionWithGenerator(this.condition, index, positiveIndex, negativeIndex, positiveIndex, contentBuilder);
					// 以生成器形式编译主体
					this.compileBodyWithGenerator(this.body, index, negativeIndex, contentBuilder);
					return;
				}

				// 以生成器形式编译 for in
				compileInWithGenerator(this, index, positiveIndex, negativeIndex, generator, contentBuilder);
				return;
			}

			// 添加 for 关键字
			contentBuilder.appendContext(this.context);

			// 如果是 of 标签而且需要编译 of
			if(iterator === "of" && config.value){
				// 编译 for of
				compileOf(
					this.condition,
					this.body,
					contentBuilder,
					new ContentBuilder(),
					this.variable
				);
				
				return;
			}

			// 提取条件
			this.condition.extractTo(contentBuilder);
			// 提取主体
			this.body.extractTo(contentBuilder);
		},
		iterator: "",
		variable: ""
	});
	
	return ForExpression;
}(
	this.ConditionalExpression,
	// config
	ECMAScriptConfig.addBaseConfig("of"),
	// compileOf
	function(condition, body, contentBuilder, builder, variable){
		var inner = condition.inner;

		// 追加 for 循环条件起始小括号
		contentBuilder.appendContext(condition.open);
		// 追加 for 循环初始化语句
		contentBuilder.appendString(variable + "=new Rexjs.Generator(");

		// 追加生成器的对象
		inner.right.extractTo(contentBuilder);

		// 追加 for 循环的逻辑条件
		contentBuilder.appendString(");!" + variable + ".iterator.closed;");
		// 追加 for 循环条件结束小括号
		contentBuilder.appendContext(condition.close);
		// 追加语句块起始大括号，目的是让 let、const 发挥效果
		contentBuilder.appendString("{");

		// 将对象值的初始化表达式提取到新的内容生成器里，目的是防止文档位置（position）的错乱，导致 mappings 不可用 
		inner.left.extractTo(builder);

		// 追加对象值的初始化
		contentBuilder.appendString(
			builder.result + "=" + variable + ".next().value;"
		);

		// 提取主体
		body.extractTo(contentBuilder);
		// 追加语句块结束小括号
		contentBuilder.appendString("}");
	},
	// compileOfWithGenerator
	function(expression, index, positiveIndex, negativeIndex, generator, contentBuilder){
		var variable = expression.variable, inner = expression.condition.inner, builder = new ContentBuilder();

		// 追加 for 循环初始化语句
		contentBuilder.appendString(variable + "=new Rexjs.Generator(");
		// 追加生成器的对象
		inner.right.extractTo(contentBuilder);
		// 追加 Generator 的结束小括号与语句分隔符
		contentBuilder.appendString(");");

		// 以生成器形式编译条件
		expression.compileConditionWithGenerator(
			new CompiledExpression(variable + ".iterator.closed"),
			index,
			negativeIndex,
			positiveIndex,
			positiveIndex,
			contentBuilder
		);

		// 将对象值的初始化表达式提取到新的内容生成器里，目的是防止文档位置（position）的错乱，导致 mappings 不可用 
		inner.left.extractTo(builder);

		// 追加对象值的初始化
		contentBuilder.appendString(
			builder.result + "=" + variable + ".next().value;"
		);

		// 以生成器形式编译主体
		expression.compileBodyWithGenerator(expression.body, index, negativeIndex, contentBuilder);
	},
	// compileInWithGenerator
	function(expression, index, positiveIndex, negativeIndex, generator, contentBuilder){
		var inner = expression.condition.inner, finallyIndex = generator.nextIndex();

		// 提取初始化条件
		inner[0].extractTo(contentBuilder);
		// 追加分号
		contentBuilder.appendString(";");
		// 以生成器形式编译逻辑条件
		expression.compileConditionWithGenerator(inner[1], index, positiveIndex, negativeIndex, finallyIndex, contentBuilder);
		// 提取最终条件
		inner[2].extractTo(contentBuilder);

		// 追加设置索引字符串及 case 表达式
		contentBuilder.appendString(
			";" + generator.currentIndexString + "=" + index + ";break;case " + positiveIndex + ":"
		);

		// 以生成器形式编译主体
		expression.compileBodyWithGenerator(expression.body, finallyIndex, negativeIndex, contentBuilder);
	}
);

this.ForBodyStatement = function(SingleStatement){
	/**
	 * for 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForBodyStatement(statements){
		SingleStatement.call(this, statements);
	};
	ForBodyStatement = new Rexjs(ForBodyStatement, SingleStatement);
	
	ForBodyStatement.props({
		flow: ECMAScriptStatement.FLOW_CIRCULAR,
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = this.expression;
		}
	});
	
	return ForBodyStatement;
}(
	this.SingleStatement
);

this.ForTag = function(ForExpression){
	/**
	 * for 标签
	 */
	function ForTag(_type){
		SyntaxTag.call(this, _type);
	};
	ForTag = new Rexjs(ForTag, SyntaxTag);
	
	ForTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /for/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.forConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式为 for 表达式
			statement.expression = new ForExpression(context);
		}
	});
	
	return ForTag;
}(
	this.ForExpression
);

}.call(
	this,
	Rexjs.CompiledExpression
);