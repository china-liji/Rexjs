// 模块默认成员标签相关
~function(){

this.DefaultMemberExpression = function(MemberExpression){
	/**
	 * 模块默认成员导入表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DefaultMemberExpression(context){
		MemberExpression.call(this, context);
	};
	DefaultMemberExpression = new Rexjs(DefaultMemberExpression, MemberExpression);

	DefaultMemberExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 追加成员变量赋值字符串
			contentBuilder.appendString(
				this.context.content + "=Rexjs.Module.defaultOf(" + anotherBuilder.result + ")"
			);
		}
	});

	return DefaultMemberExpression;
}(
	this.MemberExpression
);

this.DefaultMemberTag = function(MemberVariableTag, DefaultMemberExpression){
	/**
	 * 模块默认成员标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultMemberTag(_type){
		MemberVariableTag.call(this, _type);
	};
	DefaultMemberTag = new Rexjs(DefaultMemberTag, MemberVariableTag);

	DefaultMemberTag.props({
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
			var importExpression = statement.expression;

			// 收集变量名
			this.collectTo(parser, context, statements);

			// 向 import 表达式的添加成员
			importExpression.members.add(
				new DefaultMemberExpression(context)
			);

			// 设置 clean 属性为 false，表示有变量名导入
			importExpression.clean = false;
		}
	});

	return DefaultMemberTag;
}(
	this.MemberVariableTag,
	this.DefaultMemberExpression
);

}.call(
	this
);