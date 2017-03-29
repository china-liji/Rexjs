test.unit(
	[ "template/source.js" ],
	function(source){
		var str;

		test.group("字符串模板 表达式测试");

		test.true("最简单", "``");
		test.true("最简单内容", "`1`");
		test.true("带引号", "`\"'`");
		test.true("带换行", "`\n\r`");
		test.true("带参数", "`hello ${'world'}`");
		test.true("被转义的 $", "`hello \\${`");
		test.true("带空格的 $", "`hello $ {`");
		test.true("模板函数调用", "fn``");
		test.true("带换行后的模板参数", "fn\n`123${'456'}${789}\"abc\"`");

		test.true(
			"全部类型的换行符",
			"`\n\r\u2028\u2029`",
			false,
			function(parser){
				return parser.statements[1].expression instanceof Rexjs.TemplateExpression ? "" : "没有解析出模板表达式";
			},
			function(parser){
				var inner = parser.statements[1].expression.inner;
				
				for(
					var i = 0, j = inner.length;i < j;i++
				){
					if(
						inner[i] instanceof Rexjs.TemplateUnicodeExpression
					){
						continue;
					}

					return "没有识别出所有的换行符";
				}

				return "";
			}
		);

		test.true("复杂的测试", source, true);

		test.false(
			"缺少结束",
			"`",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有识别出文件结束符";
			}
		);

		test.false(
			"空的参数",
			"`1${}`",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		test.false(
			"参数带语句",
			"`1${break}`",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有识别出 break 标签";
			}
		);

		test.false(
			"缺少参数结束大括号",
			"`1${'999'`",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有识别出文件结束符";
			}
		);

		test.groupEnd();

	}
);