test.unit(
	[ "grouping/source.js" ],
	function(source){
		this.group("分组小括号测试");

		this.true("基本分组小括号", "(b);(2);(true);('');(1.2);(!true);([]);({});(function(){});(class {});");
		this.true("带运算的分组小括号", "(2 + 3 - 5 * 9)");
		this.true("带赋值运算的分组小括号", "(b += 3 - 5 * 9)");
		this.true("嵌套的分组小括号", "(b += (3 - 5) * (9))");

		this.true("验证结果测试", source, true);

		this.false(
			"小括号内的表达式带分号",
			"(1;)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没有正确的捕获到语句结束性质的分号标签";
			}
		);

		this.false(
			"小括号内带分号",
			"(;)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没有正确的捕获到空语句性质的分号标签";
			}
		);

		this.false(
			"空的分组小括号",
			"()",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有正确捕获到结束小括号";
			}
		);

		this.false(
			"缺少结束小括号的分组",
			"(b += (3 - 5) *(9)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没有正确的捕获到文件结束性质的语句结束符标签";
			},
			function(parser, err){
				return err.context.content === "" ? "" : "内容捕获错误";
			}
		);

		this.false(
			"小括号中带有其他语句",
			"(break)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有捕获到其他语句";
			}
		);

		this.false(
			"带省略参数的分组小括号",
			"(a, b, ...c)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.IllegibleRestTag ? "" : "没有识别出省略小括号";
			}
		);

		this.groupEnd();
	}
);