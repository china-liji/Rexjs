void function(SimpleTest, test){

test.group("逗号测试");

test.true("基本的逗号", "1, this, null, true, '123', 456");
test.true("带二元运算的逗号", "1 + 2, true + null");
test.true("带二元赋值运算的逗号", "a = 1 + 2, a = a += true + null");
test.true("带多个二元运算表达式的逗号", "1 + 2, 3 + 4, a = 5 + 6 + 8 / 10, a = 0");

test.true(
	"验证结果 - 带多个二元运算表达式的逗号",
	SimpleTest.innerContentOf(function(){
		a = 1 + 2, 3 + 4, a = 5 + 6 + 8 / 10, a = 0;
		
		if(
			a !== 0
		){
			throw a;
		}
		
		a = (1 + 3, 5 + 6, null + 100, !true, !true - 0 * 100);
		
		if(
			a !== 0
		){
			throw a;
		}
	}),
	true
);

test.false(
	"空的逗号表达式",
	",",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有捕获逗号";
	}
);

test.false(
	"连续的逗号",
	"1 + 2,, 3 + 4",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有捕获逗号";
	},
	function(parser, err){
		return err.context.position.column === 6 ? "" : "没有正确的捕获逗号的位置"
	}
);

test.groupEnd()
}(
	Rexjs.SimpleTest,
	test
)