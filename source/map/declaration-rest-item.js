// 声明数组省略项相关
~function(SpreadStatement){

this.DeclarationRestStatement = function(out){
	/**
	 * 变量声明省略项拓展语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationRestStatement(statements){
		SpreadStatement.call(this, statements);
	};
	DeclarationRestStatement = new Rexjs(DeclarationRestStatement, SpreadStatement);

	DeclarationRestStatement.props({
		/**
		 * 跳出该语句
		 */
		out: function(){
			return out.call(this).origin;
		}
	});

	return DeclarationRestStatement;
}(
	SpreadStatement.prototype.out
);

this.DeclarationRestItemSeparatorTag = function(CommaTag){
	/**
	 * 变量声明省略项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationRestItemSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	DeclarationRestItemSeparatorTag = new Rexjs(DeclarationRestItemSeparatorTag, CommaTag);
	
	DeclarationRestItemSeparatorTag.props({
		$type: TYPE_MATCHABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 报错
			parser.error(statement.target.expression.context, ECMAScriptErrors.REST_ELEMENT);
		}
	});

	return DeclarationRestItemSeparatorTag;
}(
	this.CommaTag
);

}.call(
	this,
	this.SpreadStatement
);