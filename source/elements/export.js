// export 标签相关
~function(ModuleTag, VarExpression, FunctionDeclarationExpression, ClassDeclarationExpression, exportVariable){

this.ExportExpression = function(config, compile){
	/**
	 * export 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {File} file - 当前解析源文件信息
	 */
	function ExportExpression(context, file){
		Expression.call(this, context);

		this.file = file;
	};
	ExportExpression = new Rexjs(ExportExpression, Expression);

	ExportExpression.static({
		/**
		 * 获取表达式编译配置
		 */
		get config(){
			return config;
		}
	});

	ExportExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var from = this.from;

			// 如果需要解析 export
			if(config.export){
				// 编译成员
				compile(this.member, this.from, this.name, this.file, contentBuilder);
				return;
			}

			// 追加 export 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			// 提取成员
			this.member.extractTo(contentBuilder);

			// 如果有 from
			if(from){
				// 追加空格
				contentBuilder.appendSpace();
				// 追加 from 上下文
				contentBuilder.appendContext(from);
				// 追加空格
				contentBuilder.appendSpace();
				// 追加模块名称
				contentBuilder.appendContext(this.name);
			}
		},
		file: null,
		member: null
	});

	return ExportExpression;
}(
	// config
	new SyntaxConfig("export"),
	// compile
	function(member, from, name, file, contentBuilder){
		// 初始化内容生成器
		var anotherBuilder = new ContentBuilder();

		// 如果有 from
		if(from){
			// 追加模块名称
			anotherBuilder.appendString(name.content + ',"' + file.filename + '"');
		}

		// 先编译成员
		member.compileTo(contentBuilder, anotherBuilder);

		switch(true){
			// 如果是 var、let、const 表达式
			case member instanceof VarExpression:
				// 遍历所定义的变量并输出
				member.variables(exportVariable, contentBuilder);
				return;

			// 如果是函数声明
			case member instanceof FunctionDeclarationExpression:
			// 如果是类声明
			case member instanceof ClassDeclarationExpression:
				// 输出表达式名称变量
				exportVariable(member.name.context, contentBuilder, true);
				return;
		}
	}
);

this.ExportStatement = function(){
	/**
	 * export 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ExportStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ExportStatement = new Rexjs(ExportStatement, ECMAScriptStatement);

	ExportStatement.props({
		allowFrom: false,
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 member
			this.out().member = this.expression;

			// 如果是 from 且 该语句上下文中允许 from 出现
			return context.content === "from" && this.allowFrom ? this.bindingOf() : null;
		}
	});

	return ExportStatement;
}();

this.ExportTag = function(ExportExpression, ExportStatement, fromTag, visitor){
	/**
	 * export 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ExportTag(_type){
		ModuleTag.call(this, _type);
	};
	ExportTag = new Rexjs(ExportTag, ModuleTag);

	ExportTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return fromTag;
		},
		/**
		 * 收集该表达式所产生的变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} variable - 变量名标签上下文
		 */
		collectVariables: function(){},
		regexp: /export/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.exportContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 先调用父类方法，进行环境上下文检测
			visitor.call(this, parser, context, statement, statements);

			// 设置当前表达式
			statement.expression = new ExportExpression(context, parser.file);
			// 设置当前语句
			statements.statement = new ExportStatement(statements);
		}
	});

	return ExportTag;
}(
	this.ExportExpression,
	this.ExportStatement,
	// fromTag
	new this.FromTag(),
	ModuleTag.prototype.visitor
);

}.call(
	this,
	this.ModuleTag,
	this.VarExpression,
	this.FunctionDeclarationExpression,
	this.ClassDeclarationExpression,
	// exportVariable
	function(context, contentBuilder, _semicolonAfter){
		var content = context.content, str = 'Rexjs.Module.export("' + content + '", ' + content + ")";

		// 如果需要语句后面加分号
		if(_semicolonAfter){
			str += ";";
		}
		// 否则之前加分号
		else {
			str = ";" + str;
		}

		// 追加输出字符串
		contentBuilder.appendString(str);
	}
);