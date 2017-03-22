test.unit(
	[ "array/source.js" ],
	function(source){
		this.group("数组测试");

		this.true("空的数组", "[]");
		this.true("单项数组", "[1];[true];[!true];['string'];[a += 5 + !false - 0];")
		this.true("多项数组", "[1, true, !true, 2 + 3, 'string', a += 5 + !false - 0]");
		this.true("最简单的空项数组", "[,]");
		this.true("带空项的数组", "[1, true,, !true, 2 + 3,, 'string',, a += 5 + !false - 0]");
		this.true("小括号内的数组", "([1,2,,3])");
		this.true("连续的赋值运算符", "[a + 5, a += 5, , , a + 6, , a -= 100]");

		this.true(
			"全空项数组",
			"[,,,]",
			false,
			function(parser){
				return parser.statements[1].expression.inner.length === 4 ? "" : "数组解析错误，长度不对";
			}
		);

		this.true("运算结果测试", source, true);

		this.false(
			"缺少结束中括号的空数组",
			"[",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "未捕获文件结束标签";
			}
		);

		this.false(
			"缺少结束中括号的非空数组",
			"[1, true, !false - 0",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "未捕获语句结束标签";
			}
		);

		this.false(
			"带语句的数组",
			"[break]",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "未捕获 break 语句标签";
			}
		);

		this.groupEnd();
	}
);