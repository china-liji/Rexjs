test.unit(
	[ "comma/source.js" ],
	function(source){
		this.group("逗号测试");

		this.true("基本的逗号", "1, this, null, true, '123', 456");
		this.true("带二元运算的逗号", "1 + 2, true + null");
		this.true("带二元赋值运算的逗号", "a = 1 + 2, a = a += true + null");
		this.true("带多个二元运算表达式的逗号", "1 + 2, 3 + 4, a = 5 + 6 + 8 / 10, a = 0");

		this.true(
			"验证表达式长度",
			"1,2,3,4,5",
			false,
			function(parser){
				return parser.statements[1].expression.length === 5 ? "" : "逗号表达式长度有误";
			}
		);

		this.true("验证结果 - 带多个二元运算表达式的逗号", source, true);

		this.false(
			"空的逗号表达式",
			",",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有捕获逗号";
			}
		);

		this.false(
			"连续的逗号",
			"1 + 2,, 3 + 4",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有捕获逗号";
			},
			function(parser, err){
				return err.context.position.column === 6 ? "" : "没有正确的捕获逗号的位置"
			}
		);

		this.groupEnd();
	}
);