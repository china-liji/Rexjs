test.unit(
	[ "call/source.js" ],
	function(source){
		this.group("函数调用测试");

		this.true("最简单的函数调用", "a()");
		this.true("带1个参数的函数调用", "a(1)");
		this.true("带多个参数的函数调用", "a(1,2,3,4)");
		this.true("带多个参数且有运算的函数调用", "a(1,2 + 3 / 1,!3 === false > 0,4)");
		this.true("连续的函数调用", "!! 1 + !a(1)(2, 3)(4,5,6,7)(8,9,10)(true)(!false)");

		this.true("复杂的测试", source, true);

		this.false(
			"函数调用表达式内带其他语句",
			"a(break)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有识别出 break 关键字";
			}
		);

		this.groupEnd();
	}
);