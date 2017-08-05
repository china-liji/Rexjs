test.unit(
	[ "try-function/source.js" ],
	function(source){
		test.group("try function 语句测试");

		test.true("语句 - 标识符", "try a();");
		test.true("语句 - 不带小括号的标识符", "try a;");
		test.true("语句 - 方法对象", "try window.a.b.c.d()");
		test.true("语句 - 不带小括号的方法对象", "try window.a");

		test.true("表达式 - 标识符", "(try a());");
		test.true("表达式 - 不带小括号的标识符", "(try a);");
		test.true("表达式 - 方法对象", "(try window.a.b.c.d())");
		test.true("表达式 - 不带小括号的方法对象", "(try window.a)");

		test.true("连续的 try", "try try try try window.a()");
		test.true("try 与 new", "try new try new try window.a()");

		test.true("复杂的测试", source, true);

		test.true(
			"验证 try 一元表达式",
			"try window.a() + b",
			false,
			function(parser){
				return parser.statements[1].expression instanceof Rexjs.BinaryExpression === false;
			},
			function(parser){
				return parser.statements[1].expression.left instanceof Rexjs.TryFunctionExpression === false;
			},
			function(parser){
				return parser.statements[1].expression.left.operand instanceof Rexjs.CallExpression === false;
			}
		);

		test.false(
			"不完整的表达式",
			"try",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag === false;
			}
		);

		test.false(
			"try 后面接其他一元操作符字符",
			"try !b",
			function(parser, err){
				return err.context.content !== "!";;
			}
		);

		test.false(
			"try 后面接 super",
			"try super()",
			function(parser, err){
				return err.context.content !== "super";;
			}
		);

		test.false(
			"try 后面接表达式上下文",
			"try / 5",
			function(parser, err){
				return err.context.content !== "/";;
			}
		);

		test.groupEnd();
	}
);