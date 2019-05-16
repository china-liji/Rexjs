// 注释标签
!function(CommentTag, tags){

this.LineCommentTag = function(){
	/**
	 * 单行注释标签
	 * @param {Number} _type - 标签类型
	 */
	function LineCommentTag(_type){
		CommentTag.call(this, _type);
	};
	LineCommentTag = new Rexjs(LineCommentTag, CommentTag);
	
	LineCommentTag.props({
		regexp: /\/\/.*/
	});
	
	return LineCommentTag;
}();

this.OpeningBlockCommentTag = function(){
	/**
	 * 多行注释起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpeningBlockCommentTag(_type){
		CommentTag.call(this, _type);
	};
	OpeningBlockCommentTag = new Rexjs(OpeningBlockCommentTag, CommentTag);
	
	OpeningBlockCommentTag.props({
		regexp: /\/\*/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = currentTags;
			return tagsMap.openingMultiLineCommentContextTags;
		}
	});
	
	return OpeningBlockCommentTag;
}();

this.OpeningRestrictedCommentTag = function(OpeningBlockCommentTag){
	/**
	 * 受限制的多行注释起始标签，一般使用在表达式上下文中
	 * @param {Number} _type - 标签类型
	 */
	function OpeningRestrictedCommentTag(_type){
		OpeningBlockCommentTag.call(this, _type);
	};
	OpeningRestrictedCommentTag = new Rexjs(OpeningRestrictedCommentTag, OpeningBlockCommentTag);

	OpeningRestrictedCommentTag.props({
		order: ECMAScriptOrders.OPENING_RESTRICTED_COMMENT,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = currentTags;
			return tagsMap.openingRestrictedCommentContextTags;
		}
	});
	
	return OpeningRestrictedCommentTag;
}(
	this.OpeningBlockCommentTag
);

this.CommentBreakTag = function(ExpressionBreakTag){
	/**
	 * 注释行结束符标签
	 */
	function CommentBreakTag(){
		ExpressionBreakTag.call(this);
	};
	CommentBreakTag = new Rexjs(CommentBreakTag, ExpressionBreakTag);
	
	CommentBreakTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
		 */
		require: function(tagsMap, currentTags){
			// 记录严格模式的标签列表
			tags = tags.newlineTags;
			return currentTags;
		}
	});
	
	return CommentBreakTag;
}(
	this.ExpressionBreakTag
);

this.CommentContentTag = function(){
	/**
	 * 注释内容标签
	 * @param {Number} _type - 标签类型
	 */
	function CommentContentTag(_type){
		CommentTag.call(this, _type);
	};
	CommentContentTag = new Rexjs(CommentContentTag, CommentTag);
	
	CommentContentTag.props({
		// 防止与单行注释标签或多行注释起始标签冲突
		order: ECMAScriptOrders.COMMENT_CONTENT,
		regexp: /(?:[^*\r\n\u2028\u2029]|\*(?!\/))+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			return currentTags;
		}
	});
	
	return CommentContentTag;
}();

this.ClosingBlockCommentTag = function(){
	/**
	 * 多行注释结束标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosingBlockCommentTag(_type){
		CommentTag.call(this, _type);
	};
	ClosingBlockCommentTag = new Rexjs(ClosingBlockCommentTag, CommentTag);
	
	ClosingBlockCommentTag.props({
		regexp: /\*\//,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(){
			return tags;
		}
	});
	
	return ClosingBlockCommentTag;
}();

}.call(
	this,
	this.CommentTag,
	// tags
	null
);