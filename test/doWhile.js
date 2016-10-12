void function(SimpleTest, test){

test.group("do while 语句测试");

test.true("基本测试", "do;while(false)");
test.true("带换行符的 do while 语句", "do 1 + 2;while(2 + 3 > 100)");
test.true("带语句块的 do while 语句", "do {} while(false)")
test.true("带运算符的 do while 语句", "do 1 + 2;while(2 + 3 > 100)");

test.true(
	"运算结果测试",
	SimpleTest.innerContentOf(function(){
		a = 100;
		
		do a += 1 + 2; while(2 + 3 > 100){ a += 99; };
		
		if(
			a !== 202
		){
			throw a;
		}
		
		do while(
			a < 1000
		){
			a += 100;
		}
		while(
			(a += 300) < 600
		)
		
		if(
			a !== 1302
		){
			throw a;
		}
	}),
	true
);

test.false(
	"没有分号隔开的 do while 语句",
	"do true while(false)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.WhileTag ? "" : "没有捕获到 while 标签";
	}
);

test.false(
	"带换行的空 do while 语句",
	"do \n while(false)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有捕获到文件结束标签";
	}
);

test.false(
	"带语句块又带分号的 do while 语句",
	"do {}; while(false)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没有捕获到空语句标签";
	}
);

test.false(
	"do while 条件中出现分号",
	"do;while(;)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没正确捕获到错误的分号";
	}
);

test.false(
	"do while 条件中出现带分号的表达式",
	"do;while(false;)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没正确捕获到错误的分号";
	}
);

test.false(
	"do while之间存在太多的分号",
	"do;;;;while(false)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没正确捕获到错误的分号";
	}
);

test.groupEnd();
}(
	Rexjs.SimpleTest,
	test
);