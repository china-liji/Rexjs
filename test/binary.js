void function(SimpleTest, test){

test.group("二元表达式测试");

test.true("基本的二元运算", "1 + 2");
test.true("连续的二元运算", "1 + 2 + 3 * 5 / 8");
test.true("赋值运算符", "a = 1 + 2 + this + null");
test.true("连续的赋值运算符", "a = a += a >>>= 1 + 2 + this + null");

test.true(
	"连续的二元运算结果",
	SimpleTest.innerContentOf(function(){
		a = 10
		
		a = a -= window instanceof Window && 1 + 9 ^ 6 | 5 || 3 & 6 > 7 / 12 === 3;
		
		if(
			a !== -3
		){
			throw a;
		}
		
		a = a+= a *= 2 + 3 * 6 | 7 ^ 0 % 4 / 10 & 1;
		
		if(
			a !== -72
		){
			throw a;
		}
	}),
	true
);

test.false(
	"错误的赋值运算符",
	"1 = 2",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BasicAssignmentTag ? "" : "没有正确捕获错误的赋值运算符";
	}
);

test.false(
	"不连续的赋值运算符",
	"a = a + a /= 2",
	function(parser, err){
		return err.context.tag instanceof Rexjs.AssignmentTag ? "" : "没有正确捕获错误的赋值运算符";
	}
);

test.groupEnd();
}(
	Rexjs.SimpleTest,
	test
);