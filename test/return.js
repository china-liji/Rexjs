void function(test){

test.group("return 语句测试");

test.true("最简单的 return 语句", "return;return");
test.true("带返回值的 return 语句", "return a");
test.true("带运算的 return 语句", "return a + b + c + !window.a");

test.true(
	"带换行的 return 语句",
	"return \n a + b",
	false,
	function(parser){
		return parser.statements.length === 4 ? "" : "未识别 return 后面换行符";
	},
	function(parser){
		return parser.statements[1].expression instanceof Rexjs.ReturnExpression ? "" : "没有解析 return 表达式";
	},
	function(parser){
		return parser.statements[2].expression instanceof Rexjs.BinaryExpression ? "" : "没有识别出二元运算表达式";
	}
);

test.false(
	"将 return 作为运算表达式的一部分",
	"a + return + b",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ReturnTag ? "" : "没有识别出 return 标签";
	}
);

test.groupEnd();

}(
	test
);