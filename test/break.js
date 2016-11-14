void function(test){

test.group("break 语句测试");

test.true("for 循环中最简单的 break 语句", "for(;;)break");
test.true("while 循环中最简单的 break 语句", "while(false)break");
test.true("带标记的 break 语句", "a:break a");
test.true("带标记的多层语句块 break 语句", "a:{{{{{break a}}}}}");

test.true(
	"带语句块、换行与变量的 break 语句",
	"for(;;){break\na}",
	false,
	function(parser){
		var error = "", statements = parser.statements[1].expression.body.inner;

		switch(
			false
		){
			case statements.length === 2:
				error = "未识别 break 后面换行符";
				break;

			case statements[0].expression instanceof Rexjs.TerminatedFlowExpression:
				error = "没有解析 break 表达式";
				break;

			case statements[1].expression instanceof Rexjs.AssignableExpression:
				error = "没有识别出二元运算表达式";
				break;
		}

		return error;
	}
);

console.warn("使用函数配合测试");

test.false(
	"独立的 break 语句",
	"break",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有识别出 break 关键字";
	}
);

test.false(
	"语句块内的 break 语句",
	"{break}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有识别出 break 关键字";
	}
);

test.false(
	"缺少标记名称",
	"a:break",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有识别出 break 关键字";
	}
);

test.false(
	"带换行的标记名称",
	"a:break\na",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有识别出 break 关键字";
	}
);

test.false(
	"没有指定标记的 break 语句",
	"a:break b",
	function(parser, err){
		return err.context.tag instanceof Rexjs.LabelledIdentifierTag ? "" : "没有识别出错误标记";
	}
);

test.false(
	"在循环内，且没有指定标记的 break 语句",
	"for(;;)break a",
	function(parser, err){
		return err.context.tag instanceof Rexjs.LabelledIdentifierTag ? "" : "没有识别出错误标记";
	}
);

test.groupEnd();

}(
	test
);