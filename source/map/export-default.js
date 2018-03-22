// export default 标签相关
!function(){

this.DefaultExportExpression = function(ExportExpression){
	/**
	 * 模块默认输出表达式
	 * @param {Context} context - 标签上下文
	 */
	function DefaultExportExpression(context){
		ExportExpression.call(this, context, NULL);
	};
	DefaultExportExpression = new Rexjs(DefaultExportExpression, ExportExpression);

	DefaultExportExpression.$({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加 default 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			// 提取成员
			this.member.extractTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加提取方法
			contentBuilder.appendString('Rexjs.Module.export("default",');
			// 提取成员
			this.member.extractTo(contentBuilder);
			// 追加提取方法结束小括号
			contentBuilder.appendString(")");
		}
	});

	return DefaultExportExpression;
}(
	this.ExportExpression
);

this.DefaultExportStatement = function(){
	/**
	 * 模块默认输出语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DefaultExportStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	DefaultExportStatement = new Rexjs(DefaultExportStatement, ECMAScriptStatement);

	DefaultExportStatement.$({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出当前语句并设置 member 属性
			this.out().member = this.expression;
		}
	});

	return DefaultExportStatement;
}();

this.DefaultExportTag = function(DefaultTag, DefaultExportExpression, DefaultExportStatement){
	/**
	 * 模块默认输出标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultExportTag(_type){
		DefaultTag.call(this, _type);
	};
	DefaultExportTag = new Rexjs(DefaultExportTag, DefaultTag);

	DefaultExportTag.$({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果已经输出过默认成员
			if(parser.defaultExported){
				parser.error(context, ECMAScriptErrors.EXPORT_DEFAULT);
				return;
			}

			// 记录全局解析器属性，标识已经输出过默认成员
			parser.defaultExported = true;
			
			// 设置当前表达式
			statement.expression = new DefaultExportExpression(context);
			// 设置当前语句
			statements.statement = new DefaultExportStatement(statements);
		}
	});

	return DefaultExportTag;
}(
	this.DefaultTag,
	this.DefaultExportExpression,
	this.DefaultExportStatement
);

}.call(
	this
);