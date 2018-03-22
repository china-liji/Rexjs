// 模块输出多成员表达式相关
!function(OpenMultipleMembersTag, CloseMultipleMembersTag, closeExportMultipleMembersTag){

this.PseudoImportExpression = function(ImportExpression){
	/**
	 * 伪 import 表达式，用于模拟相关环境
	 * @param {Context} context - 标签上下文
	 * @param {File} file - 当前解析源文件信息
	 */
	function PseudoImportExpression(context, file){
		ImportExpression.call(this, context, file);
	};
	PseudoImportExpression = new Rexjs(PseudoImportExpression, ImportExpression);

	PseudoImportExpression.$({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取成员
			this.members.extractTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 解析语法时确保过，只有唯一一个，所以直接编译最近且唯一项
			this.members.latest.compileTo(contentBuilder, anotherBuilder);
		}
	});

	return PseudoImportExpression;
}(
	this.ImportExpression
);

this.OpenExportMultipleMembersTag = function(PseudoImportExpression, visitor){
	/**
	 * 多成员输出起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenExportMultipleMembersTag(_type){
		OpenMultipleMembersTag.call(this, _type);
	};
	OpenExportMultipleMembersTag = new Rexjs(OpenExportMultipleMembersTag, OpenMultipleMembersTag);

	OpenExportMultipleMembersTag.$({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeExportMultipleMembersTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var pseudoImportExpression = new PseudoImportExpression(
				statement.target.expression.context,
				parser.file
			);

			// 设置当前表达式
			statement.expression = pseudoImportExpression;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 告知该表达式所属语句不是导入语句
			pseudoImportExpression.members.latest.import = false;
		}
	});

	return OpenExportMultipleMembersTag;
}(
	this.PseudoImportExpression,
	OpenMultipleMembersTag.prototype.visitor
);

this.CloseExportMultipleMembersTag = function(visitor){
	/**
	 * 多成员输出结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseExportMultipleMembersTag(_type){
		CloseMultipleMembersTag.call(this, _type);
	};
	CloseExportMultipleMembersTag = new Rexjs(CloseExportMultipleMembersTag, CloseMultipleMembersTag);

	CloseExportMultipleMembersTag.$({
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
			// 设置语句允许出现 from
			statement.allowFrom = true;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return CloseExportMultipleMembersTag;
}(
	CloseMultipleMembersTag.prototype.visitor
);

closeExportMultipleMembersTag = new this.CloseExportMultipleMembersTag();

}.call(
	this,
	this.OpenMultipleMembersTag,
	this.CloseMultipleMembersTag,
	// closeExportMultipleMembersTag
	NULL
);