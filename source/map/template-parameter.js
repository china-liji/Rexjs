// 模板参数相关
!function(TemplateExpression, PlaceHolderExpression, OpenTemplateTag){

this.TemplateParameterExpression = function(extractTo, compileInner){
	/**
	 * 模板参数表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} operand - 被作为函数调用的表达式
	 */
	function TemplateParameterExpression(open, operand){
		TemplateExpression.call(this, open);

		this.operand = operand;
	};
	TemplateParameterExpression = new Rexjs(TemplateParameterExpression, TemplateExpression);

	TemplateParameterExpression.$({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取操作对象表达式
			this.operand.extractTo(contentBuilder);

			// 如果需要编译
			if(config.es6Base){
				// 编译 inner
				compileInner(this.inner, contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		operand: NULL
	});

	return TemplateParameterExpression;
}(
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

this.OpenTemplateParameterTag = function(TemplateParameterExpression, visitor){
	/**
	 * 起始模板参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenTemplateParameterTag(_type){
		OpenTemplateTag.call(this, _type);
	};
	OpenTemplateParameterTag = new Rexjs(OpenTemplateParameterTag, OpenTemplateTag);

	OpenTemplateParameterTag.$({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new TemplateParameterExpression(context, statement.expression);
		},
		order: ECMAScriptOrders.TEMPLATE_PARAMETER
	});

	return OpenTemplateParameterTag;
}(
	this.TemplateParameterExpression,
	OpenTemplateTag.prototype.visitor
);

}.call(
	this,
	this.TemplateExpression,
	this.PlaceHolderExpression,
	this.OpenTemplateTag
);