// 非赋值一元标签
~function(UnaryTag, UnaryKeywordTag){

this.DeleteTag = function(){
	/**
	 * delete 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DeleteTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	DeleteTag = new Rexjs(DeleteTag, UnaryKeywordTag);
	
	DeleteTag.props({
		regexp: /delete/
	});
	
	return DeleteTag;
}();

this.NewTag = function(isSeparator){
	/**
	 * new 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function NewTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	NewTag = new Rexjs(NewTag, UnaryKeywordTag);
	
	NewTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			/*
				该 isSeparator 是由 try 方法进入，
				而只有 CLASS_EXPRESSION_CONTEXT 标签才能进入 try，
				如果是起始小括号，
				那么则说明，它确定就是函数实例化的小括号
			*/
			return context.content === "(" || isSeparator.call(this, context);
		},
		regexp: /new/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.newContextTags;
		}
	});
	
	return NewTag;
}(
	UnaryKeywordTag.prototype.isSeparator
);

this.TypeofTag = function(){
	/**
	 * typeof 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function TypeofTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	TypeofTag = new Rexjs(TypeofTag, UnaryKeywordTag);
	
	TypeofTag.props({
		regexp: /typeof/
	});
	
	return TypeofTag;
}();

this.VoidTag = function(){
	/**
	 * void 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function VoidTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	VoidTag = new Rexjs(VoidTag, UnaryKeywordTag);
	
	VoidTag.props({
		regexp: /void/
	});
	
	return VoidTag;
}();

this.PlusTag = function(){
	/**
	 * 正号标签
	 * @param {Number} _type - 标签类型
	 */
	function PlusTag(_type){
		UnaryTag.call(this, _type);
	};
	PlusTag = new Rexjs(PlusTag, UnaryTag);
	
	PlusTag.props({
		regexp: /\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return PlusTag;
}();

this.PlusSiblingTag = function(PlusTag){
	/**
	 * 相邻的正号标签
	 * @param {Number} _type - 标签类型
	 */
	function PlusSiblingTag(_type){
		PlusTag.call(this, _type);
	};
	PlusSiblingTag = new Rexjs(PlusSiblingTag, PlusTag);
	
	PlusSiblingTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: ECMAScriptOrders.PLUS_SIBLING
	});
	
	return PlusSiblingTag;
}(
	this.PlusTag
);

this.NegationTag = function(){
	/**
	 * 负号标签
	 * @param {Number} _type - 标签类型
	 */
	function NegationTag(_type){
		UnaryTag.call(this, _type);
	};
	NegationTag = new Rexjs(NegationTag, UnaryTag);
	
	NegationTag.props({
		regexp: /-/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return NegationTag;
}();

this.NegationSiblingTag = function(NegationTag){
	/**
	 * 重复的负号标签
	 * @param {Number} _type - 标签类型
	 */
	function NegationSiblingTag(_type){
		NegationTag.call(this, _type);
	};
	NegationSiblingTag = new Rexjs(NegationSiblingTag, NegationTag);
	
	NegationSiblingTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: ECMAScriptOrders.NEGATION_SIBLING
	});
	
	return NegationSiblingTag;
}(
	this.NegationTag
);

this.BitwiseNOTTag = function(){
	/**
	 * 二进制否定标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseNOTTag(_type){
		UnaryTag.call(this, _type);
	};
	BitwiseNOTTag = new Rexjs(BitwiseNOTTag, UnaryTag);
	
	BitwiseNOTTag.props({
		regexp: /~/
	});
	
	return BitwiseNOTTag;
}();

this.LogicalNOTTag = function(){
	/**
	 * 逻辑否定标签
	 * @param {Number} _type - 标签类型
	 */
	function LogicalNOTTag(_type){
		UnaryTag.call(this, _type);
	};
	LogicalNOTTag = new Rexjs(LogicalNOTTag, UnaryTag);
	
	LogicalNOTTag.props({
		regexp: /!/
	});
	
	return LogicalNOTTag;
}();
	
}.call(
	this,
	this.UnaryTag,
	this.UnaryKeywordTag
);