// 类声明标签相关
~function(ClassExpression, ClassNameTag){

this.ClassDeclarationExpression = function(config, extractTo){
	/**
	 * 类声明表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ClassDeclarationExpression(context){
		ClassExpression.call(this, context);
	};
	ClassDeclarationExpression = new Rexjs(ClassDeclarationExpression, ClassExpression);

	ClassDeclarationExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要解析类
			if(config.class){
				// 追加 var 关键字
				contentBuilder.appendString("var");
				// 提取名称
				this.name.extractTo(contentBuilder);
				// 追加变量赋值等于号
				contentBuilder.appendString("=");
				// 调用父类方法
				extractTo.call(this, contentBuilder);
				// 追加语句结束分号
				contentBuilder.appendString(";");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});

	return ClassDeclarationExpression;
}(
	ClassExpression.config,
	ClassExpression.prototype.extractTo
);

this.ClassDeclarationTag = function(ClassTag, ClassDeclarationExpression){
	/**
	 * 类声明标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassDeclarationTag(context){
		ClassTag.call(this, context);
	};
	ClassDeclarationTag = new Rexjs(ClassDeclarationTag, ClassTag);

	ClassDeclarationTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.classVariableTags;
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
			statement.expression = new ClassDeclarationExpression(context);
		}
	});

	return ClassDeclarationTag;
}(
	this.ClassTag,
	this.ClassDeclarationExpression
);

this.ClassVariableTag = function(visitor){
	/**
	 * 类名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassVariableTag(_type){
		ClassNameTag.call(this, _type);
	};
	ClassVariableTag = new Rexjs(ClassVariableTag, ClassNameTag);

	ClassVariableTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return ClassVariableTag;
}(
	ClassNameTag.prototype.visitor
);

}.call(
	this,
	this.ClassExpression,
	this.ClassNameTag
);