// import 关键字相关
~function(ModuleTag, config){

this.ImportExpression = function(compileMember){
	/**
	 * import 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {File} file - 当前解析源文件信息
	 */
	function ImportExpression(context, file){
		Expression.call(this, context);

		this.file = file;
		this.members = new ListExpression(null, ",");
	};
	ImportExpression = new Rexjs(ImportExpression, Expression);

	ImportExpression.props({
		clean: true,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译 import 语句
			if(config.value){
				// 如果当前 import 没有导入任何成员
				if(this.clean){
					// 返回，因为模块在依赖分析时候就已经加载
					return;
				}

				// 初始化内容生成器
				var anotherBuilder = new ContentBuilder();

				// 如果有 from
				if(this.from){
					// 追加模块名称
					anotherBuilder.appendString(
						this.name.content + ',"' + this.file.filename + '"'
					);
				}

				// 追加变量声明关键字
				contentBuilder.appendString("var ");
				// 编译每一个成员
				this.members.execJoin(compileMember, contentBuilder, anotherBuilder);
				return;
			}

			var from = this.from;

			// 追加 import 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();

			// 如果有 from
			if(from){
				// 提取成员
				this.members.extractTo(contentBuilder);
				// 追加空格
				contentBuilder.appendSpace();
				// 追加 from
				contentBuilder.appendContext(from);
				// 追加空格
				contentBuilder.appendSpace();
			}

			// 提取模块名称
			contentBuilder.appendContext(this.name);
		},
		file: null,
		from: null,
		members: null,
		name: null
	});

	return ImportExpression;
}(
	// compileMember
	function(member, contentBuilder, anotherBuilder){
		member.compileTo(contentBuilder, anotherBuilder);
	}
);

this.ImportTag = function(ImportExpression, visitor){
	/**
	 * import 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ImportTag(_type){
		ModuleTag.call(this, _type);
	};
	ImportTag = new Rexjs(ImportTag, ModuleTag);

	ImportTag.props({
		regexp: /import/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.importContextTags;
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
			statement.expression = new ImportExpression(context, parser.file);
		}
	});

	return ImportTag;
}(
	this.ImportExpression,
	ModuleTag.prototype.visitor
);

this.MemberSeparatorTag = function(CommaTag){
	/**
	 * 模块成员分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	MemberSeparatorTag = new Rexjs(MemberSeparatorTag, CommaTag);

	MemberSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(){}
	});

	return MemberSeparatorTag;
}(
	this.CommaTag
);

this.FromTag = function(){
	/**
	 * from 标签
	 * @param {Number} _type - 标签类型
	 */
	function FromTag(_type){
		SyntaxTag.call(this, _type);
	};
	FromTag = new Rexjs(FromTag, SyntaxTag);

	FromTag.props({
		regexp: /from/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.moduleNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 import 表达式的 from 属性
			statement.expression.from = context;
		}
	});

	return FromTag;
}();

this.ModuleNameTag = function(StringTag){
	/**
	 * 模块名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleNameTag(_type){
		StringTag.call(this, _type);
	};
	ModuleNameTag = new Rexjs(ModuleNameTag, StringTag);

	ModuleNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var content = context.content;

			// 设置 import 表达式的 name 属性
			statement.expression.name = context;

			// 如果需要解析 import 语句，否则不需要添加依赖，因为统统交给浏览器自己或第三方去处理 import 语句
			if(config.value){
				// 添加模块依赖
				parser.deps.push(
					content.substring(1, content.length - 1)
				);
			}
		}
	});

	return ModuleNameTag; 
}(
	this.StringTag
);

}.call(
	this,
	this.ModuleTag,
	// config
	ECMAScriptConfig.addModuleConfig("import")
);