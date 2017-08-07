// 中断流标签子类相关
~function(){

this.ThrowTag = function(TerminatedFlowTag){
	/**
	 * throw 标签
	 * @param {Number} _type - 标签类型
	 */
	function ThrowTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	ThrowTag = new Rexjs(ThrowTag, TerminatedFlowTag);
	
	ThrowTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /throw/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.throwContextTags;
		}
	});
	
	return ThrowTag;
}(
	this.TerminatedFlowTag
);

this.ThrowContextLineTerminatorTag = function(IllegalLineTerminatorTag){
	/**
	 * throw 关键字上下文的行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function ThrowContextLineTerminatorTag(_type){
		IllegalLineTerminatorTag.call(this, _type);
	};
	ThrowContextLineTerminatorTag = new Rexjs(ThrowContextLineTerminatorTag, IllegalLineTerminatorTag);

	ThrowContextLineTerminatorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.NEWLINE_AFTER_THROW);
		}
	});

	return ThrowContextLineTerminatorTag;
}(
	this.IllegalLineTerminatorTag
);

}.call(
	this
);