void function(test){

test.group("continue 语句测试");

test.true("for 循环中最简单的 continue 语句", "for(;false;)continue");
test.true("while 循环中最简单的 continue 语句", "while(false)continue");
test.true("带标记的 continue 语句", "a:while(false)break a");

test.true(
	"带语句块、换行与变量的 continue 语句",
	"for(;false;){continue\na}",
	false,
	function(parser){
		var error = "", statements = parser.statements[1].expression.body.inner;

		switch(
			false
		){
			case statements.length === 2:
				error = "未识别 continue 后面换行符";
				break;

			case statements[0].expression instanceof Rexjs.TerminatedFlowExpression:
				error = "没有解析 continue 表达式";
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
	"独立的 continue 语句",
	"continue",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ContinueTag ? "" : "没有识别出 break 关键字";
	}
);

test.false(
	"语句块内的 continue 语句",
	"{continue}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ContinueTag ? "" : "没有识别出 break 关键字";
	}
);

test.false(
	"标记后面的 continue 语句",
	"a:continue",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ContinueTag ? "" : "没有识别出 break 关键字";
	}
);

test.false(
	"在循环内，且没有指定标记的 continue 语句",
	"for(;false;)continue a",
	function(parser, err){
		return err.context.tag instanceof Rexjs.LabelledIdentifierTag ? "" : "没有识别出错误标记";
	}
);

test.groupEnd();

}(
	test
);