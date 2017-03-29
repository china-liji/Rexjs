test.unit(
	[ "var/source.js" ],
	function(source){
		test.group("var 语句测试");

		test.true("最简单的 var 语句", "var a");
		test.true("最简单的赋值 var 语句", "var a = 1");
		test.true("多变量的 var 语句", "var a, b, c = 1, d, e = 2");
		test.true("较复杂的 var 语句", "var a, b = 1 + 3 / 3 * (4 + 8) + ([] - 0), c = b += 100 + 1000, d");
		test.true("测试运算结果", source, true);

		test.false(
			"错误的变量名 - 数字",
			"var a = 2, 1 = true",
			function(parser, err){
				return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有正确的捕获数字标签";
			}
		);

		test.false(
			"错误的变量名 - boolean",
			"var true = ''",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BooleanTag ? "" : "没有正确的捕获布尔标签";
			}
		);

		test.false(
			"错误的变量名 - 关键字",
			"var break = 3",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有正确的捕获 break 标签";
			}
		);

		test.false(
			"其他赋值操作符",
			"var a = 4, b += 3",
			function(parser, err){
				return err.context.tag instanceof Rexjs.AssignmentTag ? "" : "没有正确的捕获赋值操作符标签";
			}
		);

		test.false(
			"变量名后面接其他二元操作符",
			"var a / 3",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BinaryTag ? "" : "没有正确的捕获错误的二元操作符";
			}
		)

		test.groupEnd();
	}
);