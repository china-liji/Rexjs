test.unit(
	[ "do-while/source.js" ],
	function(source){
		this.group("do while 语句测试");

		this.true("基本测试", "do;while(false)");
		this.true("带换行符的 do while 语句", "do 1 + 2;while(2 + 3 > 100)");
		this.true("带语句块的 do while 语句", "do {} while(false)")
		this.true("带运算符的 do while 语句", "do 1 + 2;while(2 + 3 > 100)");

		this.true("运算结果测试", source, true);

		this.false(
			"没有分号隔开的 do while 语句",
			"do true while(false)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.WhileTag ? "" : "没有捕获到 while 标签";
			}
		);

		this.false(
			"带换行的空 do while 语句",
			"do \n while(false)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有捕获到文件结束标签";
			}
		);

		this.false(
			"带语句块又带分号的 do while 语句",
			"do {}; while(false)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没有捕获到空语句标签";
			}
		);

		this.false(
			"do while 条件中出现分号",
			"do;while(;)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没正确捕获到错误的分号";
			}
		);

		this.false(
			"do while 条件中出现带分号的表达式",
			"do;while(false;)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没正确捕获到错误的分号";
			}
		);

		this.false(
			"do while之间存在太多的分号",
			"do;;;;while(false)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没正确捕获到错误的分号";
			}
		);

		this.groupEnd();
	}
);