// 所有模块成员表达式相关
!function(){

this.AllMembersExpression = function(MemberAliasExpression){
	/**
	 * 所有模块成员表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function AllMembersExpression(context){
		MemberAliasExpression.call(this, context);
	};
	AllMembersExpression = new Rexjs(AllMembersExpression, MemberAliasExpression);

	AllMembersExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			contentBuilder.appendString(
				this.variable.content + "=Rexjs.Module.moduleOf(" + anotherBuilder.result + ")"
			);
		}
	});

	return AllMembersExpression;
}(
	this.MemberAliasExpression
);

this.AllMembersTag = function(AllMembersExpression){
	/**
	 * 所有成员符号标签
	 * @param {Number} _type - 标签类型
	 */
	function AllMembersTag(_type){
		SyntaxTag.call(this, _type);
	};
	AllMembersTag = new Rexjs(AllMembersTag, SyntaxTag);

	AllMembersTag.props({
		regexp: /\*/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.moduleAliasTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var importExpression = statement.expression;

			// 向 import 表达式添加成员
			importExpression.members.add(
				new AllMembersExpression(context)
			);
			
			// 设置 clean 属性为 false，表示有变量名导入
			importExpression.clean = false;
		}
	});

	return AllMembersTag;
}(
	this.AllMembersExpression
);

this.ModuleAliasTag = function(AsTag){
	/**
	 * 模块别名标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleAliasTag(_type){
		AsTag.call(this, _type);
	};
	ModuleAliasTag = new Rexjs(ModuleAliasTag, AsTag);

	ModuleAliasTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.moduleVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 AllMembersExpression 表达式的 alias 属性
			statement.expression.members.latest.alias = context;
		}
	});

	return ModuleAliasTag;
}(
	this.AsTag
);

this.ModuleVariableTag = function(ConstVariableTag){
	/**
	 * 模块变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleVariableTag(_type){
		ConstVariableTag.call(this, _type);
	};
	ModuleVariableTag = new Rexjs(ModuleVariableTag, ConstVariableTag);

	ModuleVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorTags;
		},
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

			// 设置 AllMembersExpression 表达式的 variable 属性
			statement.expression.members.latest.variable = context;
		}
	});

	return ModuleVariableTag;
}(
	this.ConstVariableTag
);

}.call(
	this
);