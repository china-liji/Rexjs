// 字面量子类标签相关
!function(LiteralTag){

this.BooleanTag = function(){
	/**
	 * 布尔标签
	 * @param {Number} _type - 标签类型
	 */
	function BooleanTag(_type){
		LiteralTag.call(this, _type);
	};
	BooleanTag = new Rexjs(BooleanTag, LiteralTag);
	
	BooleanTag.props({
		regexp: /true|false/
	});
	
	return BooleanTag;
}();

this.NullTag = function(){
	/**
	 * null 标签
	 * @param {Number} _type - 标签类型
	 */
	function NullTag(_type){
		LiteralTag.call(this, _type);
	};
	NullTag = new Rexjs(NullTag, LiteralTag);
	
	NullTag.props({
		regexp: /null/
	});
	
	return NullTag;
}();

this.ThisTag = function(visitor){
	/**
	 * this 标签
	 * @param {Number} _type - 标签类型
	 */
	function ThisTag(_type){
		LiteralTag.call(this, _type);
	};
	ThisTag = new Rexjs(ThisTag, LiteralTag);
	
	ThisTag.props({
		regexp: /this/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前语句块申请应用 this 关键字
			statements.applyThis(parser, context);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return ThisTag;
}(
	LiteralTag.prototype.visitor
);

this.RegExpTag = function(visitor){
	/**
	 * 未捕获的正则表达式标签
	 * @param {Number} _type - 标签类型
	 */
	function RegExpTag(_type){
		LiteralTag.call(this, _type);
	};
	RegExpTag = new Rexjs(RegExpTag, LiteralTag);
	
	RegExpTag.props({
		regexp : /\/(?:\\[^\r\n\u2028\u2029]|[^/\\\r\n\u2028\u2029]+)+\/(?:\w|\$)*/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var i = 0, m = 0, g = 0, u = 0, y = 0, count = 0, content = context.content;
			
			// 遍历正则标记
			flags:
			for(var n = content.length - 1;n > -1;n--){
				// 判断当前标记
				switch(content[n]){
					case "/":
						break flags;

					case "i":
						count = ++i;
						break;
						
					case "m":
						count = ++m;
						break;
						
					case "g":
						count = ++g;
						break;
						
					case "u":
						count = ++u;
						break;
						
					case "y":
						count = ++y;
						break;
						
					default:
						count = 2;
						break;
				}
				
				// 如果对应标记出现过 2 次
				if(count > 1){
					// 报错
					parser.error(context, ECMAScriptErrors.REGEXP_FLAGS);
					return;
				}
			}
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return RegExpTag;
}(
	LiteralTag.prototype.visitor
);
	
this.NumberTag = function(){
	/**
	 * 数字标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberTag(_type){
		LiteralTag.call(this, _type);
	};
	NumberTag = new Rexjs(NumberTag, LiteralTag);
	
	NumberTag.props({
		// 防止与 DotTag 匹配冲突
		order: ECMAScriptOrders.NUMBER,
		regexp: /0[xX][0-9a-fA-F]+|0{2,}(?!\.)|(?:\d*\.\d+|\d+\.?)(?:e[+-]?\d+)?/,
		throw: "number"
	});
	
	return NumberTag;
}();

this.StringTag = function(){
	/**
	 * 字符串标签
	 * @param {Number} _type - 标签类型
	 */
	function StringTag(_type){
		LiteralTag.call(this, _type);
	};
	StringTag = new Rexjs(StringTag, LiteralTag);
	
	StringTag.props({
		regexp: /"(?:\\(?:[^\r]|\r\n?)|[^"\\\r\n\u2028\u2029]+)*"|'(?:\\(?:[^\r]|\r\n?)|[^'\\\r\n\u2028\u2029]+)*'/,
		throw: "string"
	});
	
	return StringTag;
}();

}.call(
	this,
	this.LiteralTag
);