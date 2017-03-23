test.unit(
	[ "if/source.js" ],
	function(source){
		this.group("if 语句");

		this.true("最简单的 if 语句", "if(true);");
		this.true("带语句块的 if 语句", "if(false){}");
		this.true("带运算条件的 if 语句", "if(a = 1 + 2 > 3);");
		this.true("嵌套的 if 语句", "if(1 + 2 > 3)if(a === 100){}");
		this.true("最简单的 if else 语句", "if(true);else;");
		this.true("嵌套的 if else 语句", "if(true);else if(1 + 2 > 3){}else {}");

		this.true("运算结果测试", source, true);

		this.false(
			"空的 if 条件",
			"if();",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有正确的捕获错误的结束小括号";
			}
		);

		this.false(
			"空的 if 主体语句",
			"if(true)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有捕获到错误的文件结束标签";
			}
		);

		this.false(
			"if 条件中出现分号",
			"if(;){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没正确捕获到错误的分号";
			}
		);

		this.false(
			"if 条件中出现带分号的表达式",
			"if(1;){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没正确捕获到错误的分号";
			}
		);

		this.false(
			"空的 else 主体语句",
			"if(true);else",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有捕获到错误的文件结束标签";
			}
		);

		this.false(
			"缺少分号的if else 语句",
			"if(true)else",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ElseTag ? "" : "没有捕获到错误的 else 标签";
			}
		);

		this.false(
			"if else 中间出现太多的分号",
			"if(true);;;;else;",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ElseTag ? "" : "没有捕获到错误的 else 标签";
			}
		);

		this.false(
			"if 条件语句中带有其他语句",
			"if(break);",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有捕获到其他语句";
			}
		);

		this.groupEnd();
	}
);