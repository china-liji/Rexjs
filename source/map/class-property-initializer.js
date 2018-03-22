// 类的属性初始化表达式相关
(function(){

this.ClassPropertyInitializerExpression = function(PropertyInitializerExpression){
	/**
	 * 类属性初始值表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} variable - 对象简写属性所对应的变量名
	 */
	function ClassPropertyInitializerExpression(context, variable){
		PropertyInitializerExpression.call(this, context, variable);
	};
	ClassPropertyInitializerExpression = new Rexjs(ClassPropertyInitializerExpression, PropertyInitializerExpression);

	ClassPropertyInitializerExpression.$({
		/**
		 * 以参数模式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		argumentTo: function(contentBuilder){
			// 提取并编译表达式文本内容
			this.compileTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 直接提取值
			this.operand.extractTo(contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.rexjs){
				// 提取并编译表达式文本内容
				this.compileTo(contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return ClassPropertyInitializerExpression;
}(
	this.PropertyInitializerExpression
);

this.ClassPropertyInitializerTag = function(PropertyInitializerTag, ClassPropertyInitializerExpression){
	/**
	 * 类属性初始化标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassPropertyInitializerTag(_type){
		PropertyInitializerTag.call(this, _type);
	};
	ClassPropertyInitializerTag = new Rexjs(ClassPropertyInitializerTag, PropertyInitializerTag);

	ClassPropertyInitializerTag.$({
		$type: TYPE_MATCHABLE,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new ClassPropertyInitializerExpression(context, statement.expression.name);
		}
	});

	return ClassPropertyInitializerTag;
}(
	this.PropertyInitializerTag,
	this.ClassPropertyInitializerExpression
);

}.call(
	this
));