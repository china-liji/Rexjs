void function(SimpleTest, test){

test.group("分组小括号测试");

test.true("基本分组小括号", "(b);(2);(true);('');(1.2);(!true);([]);");
console.warn("小括号内的对象、函数、类");

test.true("带运算的分组小括号", "(2 + 3 - 5 * 9)");
test.true("带赋值运算的分组小括号", "(b += 3 - 5 * 9)");
test.true("嵌套的分组小括号", "(b += (3 - 5) * (9))");

test.true(
	"验证结果测试",
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
	"小括号内的表达式带分号",
	"(1;)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没有正确的捕获到语句结束性质的分号标签";
	}
);

test.false(
	"小括号内带分号",
	"(;)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没有正确的捕获到空语句性质的分号标签";
	}
);

test.false(
	"空的分组小括号",
	"()",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有正确捕获到结束小括号";
	}
);

test.false(
	"缺少结束小括号的分组",
	"(b += (3 - 5) *(9)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没有正确的捕获到文件结束性质的语句结束符标签";
	},
	function(parser, err){
		return err.context.content === "" ? "" : "内容捕获错误";
	}
);

test.false(
	"小括号中带有其他语句",
	"(break)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有捕获到其他语句";
	}
);

test.false(
	"带省略参数的分组小括号",
	"(a, b, ...c)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.IllegibleRestTag ? "" : "没有识别出省略小括号";
	}
);

test.groupEnd();
	
}(
	Rexjs.SimpleTest,
	test
);