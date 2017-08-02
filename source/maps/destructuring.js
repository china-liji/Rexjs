// 解构表达式相关
~function(config){

this.DestructibleExpression = function(){
	/**
	 * 可解构的表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function DestructibleExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(NULL, ",");
	};
	DestructibleExpression = new Rexjs(DestructibleExpression, PartnerExpression);

	DestructibleExpression.props({
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){},
		declaration: false,
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
}();

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

	DestructuringExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

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
					return NULL;

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
		variable: ""
	});

	return DestructuringItemExpression;
}(
	this.DestructuringExpression
);

this.DestructuringDefaultItemExpression = function(DestructuringItemExpression){
	/**
	 * 解构默认项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 * @param {Statements} statements - 该表达式所处的语句块
	 */
	function DestructuringDefaultItemExpression(origin, statements){
		DestructuringItemExpression.call(this, origin);

		// 如果需要解析解构表达式
		if(config.destructuring){
			// 给刚生成的解构赋值表达式设置变量名
			this.variable = statements.collections.generate();
		}
	};
	DestructuringDefaultItemExpression = new Rexjs(DestructuringDefaultItemExpression, DestructuringItemExpression);

	DestructuringDefaultItemExpression.props({
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

	return DestructuringDefaultItemExpression;
}(
	this.DestructuringItemExpression
);

}.call(
	this,
	// config
	new SyntaxConfig("destructuring")
);