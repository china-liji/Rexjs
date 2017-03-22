test.unit(
	[],
	function(source){
		this.group("continue 语句测试");

		this.true("for 循环中最简单的 continue 语句", "for(;false;)continue");
		this.true("while 循环中最简单的 continue 语句", "while(false)continue");
		this.true("带标记的 continue 语句", "a:while(false)break a");

		this.true(
			"带语句块、换行与变量的 continue 语句",
			"for(;false;){continue\na}",
			false,
			function(parser){
				var error = "", statements = parser.statements[1].expression.body.inner;

				switch(
					false
				){
					case statements.length === 2:
						error = "未识别 continue 后面换行符";
						break;

					case statements[0].expression instanceof Rexjs.TerminatedFlowExpression:
						error = "没有解析 continue 表达式";
						break;

					case statements[1].expression instanceof Rexjs.AssignableExpression:
						error = "没有识别出二元运算表达式";
						break;
				}

				return error;
			}
		);

		this.false(
			"函数里的 continue 语句",
			"function fn(){continue;}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ContinueTag ? "" : "没有识别出 break 关键字";
			}
		);

		this.false(
			"独立的 continue 语句",
			"continue",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ContinueTag ? "" : "没有识别出 break 关键字";
			}
		);

		this.false(
			"语句块内的 continue 语句",
			"{continue}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ContinueTag ? "" : "没有识别出 break 关键字";
			}
		);

		this.false(
			"标记后面的 continue 语句",
			"a:continue",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ContinueTag ? "" : "没有识别出 break 关键字";
			}
		);

		this.false(
			"在循环内，且没有指定标记的 continue 语句",
			"for(;false;)continue a",
			function(parser, err){
				return err.context.tag instanceof Rexjs.LabelledIdentifierTag ? "" : "没有识别出错误标记";
			}
		);

		this.groupEnd();
	}
);