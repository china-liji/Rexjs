test.unit(
	[ "ternary/source.js" ],
	function(source){
		test.group("三元表达式测试");

		test.true("最简单的三元表达式", "a?b:c");
		test.true("嵌套的三元表达式", "a?b?c:d:e");

		test.true(
			"带运算的三元表达式",
			"1 + 2 + 3 + 4 > 100 ? window.yes() : window.no()",
			false,
			function(parser){
				if(
					parser.statements[1].expression instanceof Rexjs.TernaryExpression
				){
					return "";
				}

				return "不正确的三元表达式解析"
			}
		);

		test.true(
			"条件带逗号的三元表达式",
			"1 + 2, 3 + 4 > 100 ? yes() : no()",
			false,
			function(parser){
				var expression = parser.statements[1].expression;

				if(
					expression instanceof Rexjs.CommaExpression === false
				){
					return "不正确的逗号表达式解析";
				}

				if(
					expression[1] instanceof Rexjs.TernaryExpression
				){
					return "";
				}

				return "不正确的三元表达式解析"
			}
		)

		test.true("复杂的测试", source, true);

		test.false(
			"肯定条件语句带逗号",
			"a ? b, c : d",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出逗号标签";
			}
		);

		test.false(
			"肯定条件带语句",
			"a ? break : d",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有识别出 break 标签";
			}
		);

		test.false(
			"否定条件带语句",
			"a ? c : break",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有识别出 break 标签";
			}
		);

		test.false(
			"缺少条件的嵌套三元表达式",
			"a?b?c:d",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没有识别出文件结束符"
			}
		);

		test.groupEnd();
	}
);