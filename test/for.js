void function(SimpleTest, test){

test.group("for 循环测试");

test.true("最简单的 for 循环", "for(;;)break");
test.true("仅带初始表达式的 for 循环", "for(i = 10;;)break");
test.true("仅带条件表达式的 for 循环", "for(;i < 100;)break");
test.true("仅带末表达式的 for 循环", "for(;;i += 1)break");
test.true("带声明的 for 循环", "for(var i;i < 100;i += 1){}");
test.true("带的多个变量的声明 for 循环", "for(var i, j = 100;i < j;i += 1){}");
test.true("最简单的 for in", "for(a in b);");
test.true("带声明的 for in", "for(var a in b);");
console.warn("默认值的 for in, for of");
// test.true("默认值的 for in", "for(var i = 100 in b);");
// test.true("默认值的 for of", "for(var i = 100 of b);");
test.true("最简单的 for of", "for(a of b);");
test.true("带声明的 for of", "for(var a in b);");
test.true("of 变量名", "var of");
test.true("带 of 变量的 for 循环初始化语句", "for(of;;)break;");
test.true("带 of 变量的 for 循环逻辑语句", "for(;of;)break;");
test.true("带 of 变量的 for 循环末语句", "for(;;of)break;");
test.true("带 of 变量的 for 循环", "for(of;of;of)break;");
test.true("带 of 变量名的 for in", "for(of in of);");
test.true("声明 of 声明变量名的 for in", "for(var of in a);");
test.true("带 of 变量的 for of", "for(of of of);");

test.true(
	"带声明和运算的 for in",
	"for(var a in b = c + 100, d - 1000, e);",
	false,
	function(parser){
		var inner = parser.statements[1].expression.condition.inner;

		if(
			inner instanceof Rexjs.BinaryExpression === false
		){
			return "条件表达式应该为二元表达式";
		}

		if(
			inner.length !== 2
		){
			return "条件表达式长度不对";
		}

		if(
			inner[0] instanceof Rexjs.LeftHandSideExpression === false
		){
			return "条件表达式的列表第一项表达式应该是左侧表达式";
		}

		if(
			inner[1] instanceof Rexjs.CommaExpression === false
		){
			return "条件表达式的列表第二项表达式应该是逗号表达式";
		}
	}
);

test.true(
	"复杂的测试",
	SimpleTest.innerContentOf(function(){
		a = 1

		for(
			var i = 100, j = 200;i < j;i += 1
		){
			for(
				;i < 150;
			){
				i += 1
			}
		}

		for(
			var value in []
		){
			i += 200;
		}

		var of = [1,1,1,1,1,1]

		for(
			of of of
		){
			i += 1;
		}

		of = [2,3,4,5,6]

		for(
			var x = 0, y = of.length;x < y;x += 1, of
		){
			i += of[x]
		}

		if(
			i !== 226
		){
			throw "运算结果有误";
		}
	}),
	true
);

test.false(
	"空的 for 条件",
	"for();",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有正确的捕获错误的结束小括号";
	}
);

test.false(
	"空的 for 主体语句",
	"for(;;)",
	function(parser, err){
		return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有捕获到错误的文件结束标签";
	}
);

test.false(
	"for 条件中少了分号",
	"for(;){}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有正确的捕获错误的结束小括号";
	}
);

test.false(
	"for 条件中多了分号",
	"for(;;;){}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没正确捕获到错误的分号";
	}
);

test.false(
	"for 条件初始化语句中带有其他语句",
	"for(break);",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有捕获到其他语句";
	}
);

test.false(
	"for 条件逻辑语句中带有其他语句",
	"for(;break;);",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有捕获到其他语句";
	}
);

test.false(
	"for 条件末语句中带有其他语句",
	"for(;;break);",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有捕获到其他语句";
	}
);

test.false(
	"不正确的 for in 的条件表达式",
	"for(a, b + 3 / 4 instanceof x in c);",
	function(parser, err){
		return err.context.tag instanceof Rexjs.InTag ? "" : "没有捕获到正确的 in 关键字";
	}
);

test.false(
	"不正确的 for of 的条件表达式",
	"for(a, b + 3 / 4 instanceof x of c);",
	function(parser, err){
		return err.context.tag instanceof Rexjs.LabelTag ? "" : "没有捕获到正确的 of 变量名";
	}
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);