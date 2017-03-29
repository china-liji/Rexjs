test.unit(
	[ "while/source.js" ],
	function(source){
		test.group("while 语句测试");

		test.true("最简单的 while 语句", "while(false);");
		test.true("带语句块的 while 语句", "while(false){}");
		test.true("带运算条件的 while 语句", "while(a = 1 + 2 > 3);");
		test.true("嵌套的 while 语句", "while(1 + 2 > 3)while(a === 100){}");
		test.true("运算结果测试", source, true);

		test.false(
			"空的 while 条件",
			"while();",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有正确的捕获错误的结束小括号";
			}
		);

		test.false(
			"空的 while 主体语句",
			"while(true)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有捕获到错误的文件结束标签";
			}
		);

		test.false(
			"while 条件中出现分号",
			"while(;){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没正确捕获到错误的分号";
			}
		);

		test.false(
			"while 条件中出现带分号的表达式",
			"while(false;){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没正确捕获到错误的分号";
			}
		);

		test.false(
			"while 条件语句中带有其他语句",
			"while(break);",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有捕获到其他语句";
			}
		);

		test.groupEnd();
	}
);