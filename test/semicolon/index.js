test.unit(
	[],
	function(){
		test.group("分号测试");

		test.true("空语句", ";");
		test.true("常量后面接分号", "a;b;;;;c;;;;d;;;");
		test.true("字面量后面接分号", "true;false;;;null;;");
		test.true("数字后面接分号", "1.2;;;3;.7;;;");
		test.true("字符串后面接分号", "'123';;;;;;'123321';;;");
		test.true("其他后面接分号", "window.a;!true + window.b + !!window.c;");

		test.true(
			"连续的空语句",
			";;;;",
			false,
			function(parser){
				var statements = parser.statements, STATE_STATEMENT_ENDED = Rexjs.Expression.STATE_STATEMENT_ENDED;

				for(
					var i = 1, j = statements.length - 1;i < j;i++
				){
					if(
						statements[i].expression.state === STATE_STATEMENT_ENDED
					){
						continue;
					}

					return "表达式状态不正确";
				}
			}
		);

		test.true(
			"空 if 主体语句",
			"if(true);",
			false,
			function(parser){
				return parser.statements[1].expression.state === Rexjs.Expression.STATE_STATEMENT_END ? "" : "表达式状态不正确";
			}
		);

		test.true(
			"语句结束符分号与空语句分号并存",
			"1;;;;",
			false,
			function(parser){
				var statements = parser.statements, STATE_STATEMENT_ENDED = Rexjs.Expression.STATE_STATEMENT_ENDED;

				if(
					parser.statements[1].expression.state !== Rexjs.Expression.STATE_STATEMENT_END
				){
					return "表达式状态不正确";
				}

				for(
					var i = 2, j = statements.length - 1;i < j;i++
				){
					if(
						statements[i].expression.state === STATE_STATEMENT_ENDED
					){
						continue;
					}

					return "表达式状态不正确";
				}
			}
		);

		test.groupEnd();
	}
);