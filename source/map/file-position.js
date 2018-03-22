// 文件位置标签相关
!function(FilePositionTag){

this.FileStartTag = function(FileStartExpression){
	/**
	 * 文件起始符标签
	 * @param {Number} _type - 标签类型
	 */
	function FileStartTag(_type){
		FilePositionTag.call(this, _type);
	};
	FileStartTag = new Rexjs(FileStartTag, FilePositionTag);
	
	FileStartTag.$({
		order: ECMAScriptOrders.FILE_START,
		regexp: /^/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式
			statement.expression = new FileStartExpression(context);
		}
	});
	
	return FileStartTag;
}(
	Rexjs.FileStartExpression
);

this.FileEndTag = function(FileEndExpression, GlobalStatements){
	/**
	 * 文件结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function FileEndTag(_type){
		FilePositionTag.call(this, _type);
	};
	FileEndTag = new Rexjs(FileEndTag, FilePositionTag);
	
	FileEndTag.$({
		regexp: /$/,
		throw: "end of input",
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		visitor: function(parser, context, statement, statements){
			switch(false){
				// 如果不是全局语句块，说明不是最外层
				case statements instanceof GlobalStatements:
					break;

				// 如果不是最后一个语句，则说明语句没有完全跳出
				case statement === statements[statements.length - 1]:
					break;

				// 如果存在表达式，说明解析有问题，因为该标签是语句起始标签，而又有上面两点保证，所以当前表达式必定为 null，为了 100% 确保，还是判断一下
				case !statement.expression:
					break;

				default:
					// 设置当前表达式
					statement.expression = new FileEndExpression(context);
					
					// 终止解析
					parser.regexp.break();
					return;
			}

			// 报错
			parser.error(context);
		}
	});
	
	return FileEndTag;
}(
	Rexjs.FileEndExpression,
	this.GlobalStatements
);
	
}.call(
	this,
	Rexjs.FilePositionTag
);