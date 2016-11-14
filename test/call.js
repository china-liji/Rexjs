void function(SimpleTest, test){

test.group("函数调用测试");

test.true("最简单的函数调用", "a()");
test.true("带1个参数的函数调用", "a(1)");
test.true("带多个参数的函数调用", "a(1,2,3,4)");
test.true("带多个参数且有运算的函数调用", "a(1,2 + 3 / 1,!3 === false > 0,4)");
test.true("连续的函数调用", "!! 1 + !a(1)(2, 3)(4,5,6,7)(8,9,10)(true)(!false)");

test.true(
	"复杂的测试",
	SimpleTest.innerContentOf(function(){
		var a = 1;

		a += parseInt(10, 2);
		a += parseInt(110, 2);

		a += (1,2,3,3,4, parseInt(parseInt(10000, 2), 2));

		if(
			a !== 10
		){
			throw "错误的运算结果";
		}
	}),
	true
);

test.false(
	"函数调用表达式内带其他语句",
	"a(break)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有识别出 break 关键字";
	}
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);