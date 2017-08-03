// 辅助性的标签列表相关
~function(SyntaxTags){

this.OnlyStatementEndTags = function(LastStatementEndTag, StatementBreakTag, StatementEndTag){
	/**
	 * 只有语句结束符的标签列表
	 */
	function OnlyStatementEndTags(){
		SyntaxTags.call(this);

		this.register(
			new LastStatementEndTag(),
			new StatementBreakTag(),
			new StatementEndTag()
		);
	};
	OnlyStatementEndTags = new Rexjs(OnlyStatementEndTags, SyntaxTags);

	return OnlyStatementEndTags;
}(
	this.LastStatementEndTag,
	this.StatementBreakTag,
	this.StatementEndTag
);

}.call(
	this,
	Rexjs.SyntaxTags
);