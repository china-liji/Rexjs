// 模板参数相关
~function(TemplateExpression, PlaceHolderExpression){

this.TemplateParameterExpression = function(config, extractTo, compileInner){
	/**
	 * 模板参数表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} operand - 操作对象表达式
	 */
	function TemplateParameterExpression(open, operand){
		TemplateExpression.call(this, open);

		this.operand = operand;
	};
	TemplateParameterExpression = new Rexjs(TemplateParameterExpression, TemplateExpression);

	TemplateParameterExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取操作对象表达式
			this.operand.extractTo(contentBuilder);

			// 如果需要编译
			if(config.template){
				// 编译 inner
				compileInner(this.inner, contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		operand: null
	});

	return TemplateParameterExpression;
}(
	TemplateExpression.config,
	PartnerExpression.prototype.extractTo,
	// compileInner
	function(inner, contentBuilder){
		var placeholders = [];

		/*
			追加：
				1. 函数调用起始小括号
				2. 字符串模板参数的起始中括号
				3. 字符串起始双引号
		*/
		contentBuilder.appendString('(["');

		// 遍历 inner
		for(var i = inner.min, j = inner.length;i < j;i++){
			var expression = inner[i];

			// 如果是模板占位符表达式
			if(expression instanceof PlaceHolderExpression){
				// 分隔两个字符串
				contentBuilder.appendString('","');
				// 添加占位符表达式，目的是滞后编译
				placeholders.push(expression);
				continue;
			}

			// 直接编译该表达式
			expression.compileTo(contentBuilder);
		}

		/*
			追加：
				1. 字符串结束双引号
				2. 字符串模板参数的结束中括号
		*/
		contentBuilder.appendString('"]');

		// 遍历占位符表达式数组
		for(var x = 0, y = placeholders.length;x < y;x++){
			// 参数化提取该占位符表达式
			placeholders[x].parameterizeTo(contentBuilder);
		}

		// 追加函数调用起始小括号
		contentBuilder.appendString(")");
	}
);

this.OpenTemplateParameterTag = function(OpenTemplateTag, TemplateParameterExpression, TemplateStatement){
	/**
	 * 起始模板参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenTemplateParameterTag(_type){
		OpenTemplateTag.call(this, _type);
	};
	OpenTemplateParameterTag = new Rexjs(OpenTemplateParameterTag, OpenTemplateTag);

	OpenTemplateParameterTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		order: ECMAScriptOrders.TEMPLATE_PARAMETER,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new TemplateParameterExpression(context, statement.expression);
			// 设置当前语句
			statements.statement = new TemplateStatement(statements);
		}
	});

	return OpenTemplateParameterTag;
}(
	this.OpenTemplateTag,
	this.TemplateParameterExpression,
	this.TemplateStatement
);

}.call(
	this,
	this.TemplateExpression,
	this.PlaceHolderExpression
);