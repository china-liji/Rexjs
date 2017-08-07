// 输出所有成员符号标签相关
~function(){

this.ExportAllMembersExpression = function(){
	/**
	 * 输出所有模块成员表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ExportAllMembersExpression(context){
		Expression.call(this, context);
	};
	ExportAllMembersExpression = new Rexjs(ExportAllMembersExpression, Expression);

	ExportAllMembersExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 追加输出字符串
			contentBuilder.appendString(
				"Rexjs.Module.exportFrom(" + anotherBuilder.result + ")"
			);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加 * 上下文
			contentBuilder.appendContext(this.context);
		}
	});

	return ExportAllMembersExpression;
}();

this.ExportAllMembersTag = function(AllMembersTag, ExportAllMembersExpression){
	/**
	 * 输出所有成员符号标签
	 * @param {Number} _type - 标签类型
	 */
	function ExportAllMembersTag(_type){
		AllMembersTag.call(this, _type);
	};
	ExportAllMembersTag = new Rexjs(ExportAllMembersTag, AllMembersTag);

	ExportAllMembersTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.unexpectedTags;
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
			statement.expression = new ExportAllMembersExpression(context);
			// 设置 allowFrom 属性，表示检测到 from 是属于正常语句部分
			statement.allowFrom = true;
		}
	});

	return ExportAllMembersTag;
}(
	this.AllMembersTag,
	this.ExportAllMembersExpression
);

}.call(
	this
);