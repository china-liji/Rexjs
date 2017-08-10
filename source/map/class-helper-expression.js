// 一些类的辅助表达式相关
~function(PropertyExpression){

this.ExtendsExpression = function(){
	/**
	 * extends 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ExtendsExpression(context){
		Expression.call(this, context);
	};
	ExtendsExpression = new Rexjs(ExtendsExpression, Expression);

	ExtendsExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 直接提取 super 表达式即可
			this.super.extractTo(contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加空格，分离与 class 关键字 或 类名称
			contentBuilder.appendSpace();
			// 追加 extends 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格，分离 super
			contentBuilder.appendSpace();
			// 提取 super 表达式
			this.super.extractTo(contentBuilder);
		},
		super: null
	});

	return ExtendsExpression;
}();

this.DefaultExtendsExpression = function(ExtendsExpression){
	/**
	 * 默认 extends 表达式
	 */
	function DefaultExtendsExpression(){
		ExtendsExpression.call(this, null);
	};
	DefaultExtendsExpression = new Rexjs(DefaultExtendsExpression, ExtendsExpression);

	DefaultExtendsExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			contentBuilder.appendString("void 0");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(){}
	});

	return DefaultExtendsExpression;
}(
	this.ExtendsExpression
);
	
this.ClassPropertyExpression = function(extractTo){
	/**
	 * 类属性表达式
	 */
	function ClassPropertyExpression(){
		PropertyExpression.call(this);
	};
	ClassPropertyExpression = new Rexjs(ClassPropertyExpression, PropertyExpression);

	ClassPropertyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加 实例化类的属性
			contentBuilder.appendString(this.static ? "new StaticProperty(" : "new ClassProperty(");

			// 提取属性名
			this.name.defineTo(contentBuilder);
			// 追加参数分隔符逗号
			contentBuilder.appendString(",function");
			// 直接以简写形式提取表达式文本内容
			this.value.shortTo(contentBuilder);

			// 如果存在访问器
			if(this.accessible){
				// 追加 属性类型分隔符 及 属性类型
				contentBuilder.appendString(
					',"' + this.accessor.content + '"'
				);
			}

			// 追加实例化的结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 获取原型链的深度或层次
		 */
		get superDepth(){
			return this.static ? 1 : 2;
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果是静态属性
			if(this.static){
				// 追加修饰符
				contentBuilder.appendContext(this.modifier);
				// 追加空格
				contentBuilder.appendSpace();
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		modifier: null,
		/**
		 * 获取该属性是否为静态属性
		 */
		get static(){
			return this.named(this.modifier);
		}
	});

	return ClassPropertyExpression;
}(
	PropertyExpression.prototype.extractTo
);

}.call(
	this,
	this.PropertyExpression
);