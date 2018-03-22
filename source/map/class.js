// 类标签相关
!function(){

this.ClassExpression = function(DefaultExtendsExpression){
	/**
	 * 类表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ClassExpression(context){
		Expression.call(this, context);
	};
	ClassExpression = new Rexjs(ClassExpression, Expression);

	ClassExpression.$({
		/**
		 * 自动化生成变量，以模拟 ObjectExpression 环境
		 * @param {ECMAScriptStatements} statements - 当前语句块
		 */
		autoVariable: function(statements){},
		extends: NULL,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var body = this.body, extendsExpression = this.extends;

			// 如果需要编译
			if(config.es6Base){
				var variable = this.variable;

				// 追加 create 方法头部代码
				contentBuilder.appendString(
					"(" +
					(variable ? variable + "=" : "") +
					"Rexjs.Class.create("
				);

				// 如果存在继承，说明有父类
				if(extendsExpression){
					// 编译继承表达式
					extendsExpression.compileTo(contentBuilder);
				}
				else {
					// 追加 undefined
					contentBuilder.appendString("void 0");
				}

				// 追加 父类 与 属性数组的起始中括号
				contentBuilder.appendString(",[");
				// 编译类主体
				body.compileTo(contentBuilder);
				// 追加 属性数组的结束中括号 和 构造函数的索引值，并传入闭包参数，目的是 更快的访问 及 更小的压缩代码
				contentBuilder.appendString("], " + body.indexOfConstructor.toString() + "))");
				return;
			}

			// 追加 class 关键字上下文
			contentBuilder.appendContext(this.context);
			// 提取类名称
			this.name.extractTo(contentBuilder);

			// 如果存在继承，说明有父类
			if(extendsExpression){
				// 提取 extends 表达式
				extendsExpression.extractTo(contentBuilder);
			}
			
			// 提取主体
			body.extractTo(contentBuilder);
		},
		name: new DefaultExpression(),
		variable: ""
	});

	return ClassExpression;
}(
	this.DefaultExtendsExpression
);

this.ClassTag = function(ClassExpression){
	/**
	 * 类标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassTag(_type){
		SyntaxTag.call(this, _type);
	};
	ClassTag = new Rexjs(ClassTag, SyntaxTag);

	ClassTag.$({
		$class: CLASS_EXPRESSION,
		regexp: /class/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.classContextTags;
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
			statement.expression = new ClassExpression(context);
		}
	});

	return ClassTag;
}(
	this.ClassExpression
);

this.ClassNameTag = function(VariableDeclarationTag){
	/**
	 * 类名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ClassNameTag = new Rexjs(ClassNameTag, VariableDeclarationTag);

	ClassNameTag.$({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.classNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置类表达式的名称
			statement.expression.name = new Expression(context);
		}
	});

	return ClassNameTag;
}(
	this.VariableDeclarationTag
);

}.call(
	this
);