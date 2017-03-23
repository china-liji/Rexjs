test.unit(
	[ "return/source.js" ],
	function(source){
		this.group("return 语句测试");

		this.true("最简单的 return 语句", "function fn(){return;}");
		this.true("带返回值的 return 语句", "function fn(){return a;}");
		this.true("带运算的 return 语句", "function fn(){return a + b + c + !window.a}");

		this.true(
			"带换行的 return 语句",
			"function fn(){return \n a + b}",
			false,
			function(parser){
				return parser.statements[1].expression.body.inner.length === 2 ? "" : "未识别 return 后面换行符";
			},
			function(parser){
				return parser.statements[1].expression.body.inner[0].expression instanceof Rexjs.TerminatedFlowExpression ? "" : "没有解析 return 表达式";
			},
			function(parser){
				return parser.statements[1].expression.body.inner[1].expression instanceof Rexjs.BinaryExpression ? "" : "没有识别出二元运算表达式";
			}
		);

		this.true("运算测试", source, true);

		this.false(
			"将 return 作为运算表达式的一部分",
			"a + return + b",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ReturnTag ? "" : "没有识别出 return 标签";
			}
		);

		this.false(
			"没有处于闭包内的 return 语句",
			"return",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ReturnTag ? "" : "没有识别出 return 标签";
			}
		);

		this.groupEnd();
	}
);