test.unit(
	[ "binary/source.js" ],
	function(source){
		this.group("二元表达式测试");

		this.true("基本的二元运算", "1 + 2");
		this.true("连续的二元运算", "1 + 2 + 3 * 5 / 8");
		this.true("赋值运算符", "a = 1 + 2 + this + null");
		this.true("连续的赋值运算符", "a = a += a >>>= 1 + 2 + this + null");

		this.true(
			"解析验证",
			"1 + !window.a - 100",
			function(parser){
				return parser.statements[1].expression instanceof Rexjs.BinaryExpression ? "" : "没有识别出二元表达式";
			},
			function(parser){
				return parser.statements[1].expression.left.right instanceof Rexjs.UnaryExpression ? "" : "没有识别出其中的一元表达式";
			}
		);

		this.true("连续的二元运算结果", source, true);

		this.false(
			"错误的赋值运算符",
			"1 = 2",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BasicAssignmentTag ? "" : "没有正确捕获错误的赋值运算符";
			}
		);

		this.false(
			"不连续的赋值运算符",
			"a = a + a /= 2",
			function(parser, err){
				return err.context.tag instanceof Rexjs.AssignmentTag ? "" : "没有正确捕获错误的赋值运算符";
			}
		);

		this.groupEnd();
	}
);