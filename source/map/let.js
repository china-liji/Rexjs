// let 语句相关
~function(ClosureVariableTag, localVariableTag, letDeclarationSeparatorTag){

this.LetTag = function(VarTag, config){
	/**
	 * let 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function LetTag(_type){
		VarTag.call(this, _type);
	};
	LetTag = new Rexjs(LetTag, VarTag);

	LetTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return letDeclarationSeparatorTag;
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.value ? "var" : content);
		},
		regexp: /let/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.letContextTags;
		},
		/**
		 * 获取绑定的变量名标签
		 */
		get variable(){
			return localVariableTag;
		}
	});

	return LetTag;
}(
	this.VarTag,
	// config
	ECMAScriptConfig.addBaseConfig("let")
);

this.LocalVariableTag = function(collectTo){
	/**
	 * 局部内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function LocalVariableTag(_type){
		ClosureVariableTag.call(this, _type);
	};
	LocalVariableTag = new Rexjs(LocalVariableTag, ClosureVariableTag);
	
	LocalVariableTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			// 调用父类方法
			collectTo.call(this, parser, context, statements);
			// 收集变量名
			statements.collections.blacklist.collect(context.content);
		},
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containsBy: function(variable, collections){
			return collections.declaration.contains(variable);
		}
	});
	
	return LocalVariableTag;
}(
	ClosureVariableTag.prototype.collectTo
);

this.LetDeclarationSeparatorTag = function(VarDeclarationSeparatorTag){
	/**
	 * let 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function LetDeclarationSeparatorTag(_type){
		VarDeclarationSeparatorTag.call(this, _type);
	};
	LetDeclarationSeparatorTag = new Rexjs(LetDeclarationSeparatorTag, VarDeclarationSeparatorTag);
	
	LetDeclarationSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.letContextTags;
		}
	});
	
	return LetDeclarationSeparatorTag;
}(
	this.VarDeclarationSeparatorTag
);

localVariableTag = new this.LocalVariableTag();
letDeclarationSeparatorTag = new this.LetDeclarationSeparatorTag();

}.call(
	this,
	this.ClosureVariableTag,
	// localVariableTag
	null,
	// letDeclarationSeparatorTag
	null
);