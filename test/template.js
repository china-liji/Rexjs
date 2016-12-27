void function(SimpleTest, test){

var str;

test.group("字符串模板 表达式测试");

test.true("最简单", "`123`");
test.true("带引号", "`\"'`");
test.true("带换行", "`\n\r`");
test.true("带参数", "`hello ${'world'}`");
test.true("被转义的 $", "`hello \\${`");
test.true("带空格的 $", "`hello $ {`");

test.true(
	"全部类型的换行符",
	"`\n\r\u2028\u2029`",
	false,
	function(parser){
		return parser.statements[1].expression instanceof Rexjs.TemplateExpression ? "" : "没有解析出模板表达式";
	},
	function(parser){
		var inner = parser.statements[1].expression.inner;
		
		for(
			var i = 0, j = inner.length;i < j;i++
		){
			if(
				inner[i] instanceof Rexjs.TemplateUnicodeExpression
			){
				continue;
			}

			return "没有识别出所有的换行符";
		}

		return "";
	}
);

test.true(
	"复杂的测试",
	SimpleTest.innerContentOf(function(){
		var t1 = `hello ${"world"}`

		if(
			t1 !== "hello world"
		){
			throw "模板解析结果错误";
		}

		var template = `
${
	function(){ return "hello world" }()
}
"string"
var a = '100'
${1}${2}${3}
${4}
`
		if(
			template.split("\n").length !== 7
		){
			throw "行数错误" + template.split("\n").length
		}

		if(
			template.indexOf("123") === -1
		){
			throw "检测不到字符串 123"
		}
	}),
	true
);

test.false(
	"缺少结束",
	"`",
	function(parser, err){
		return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有识别出文件结束符";
	}
);

test.false(
	"空的参数",
	"`1${}`",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"参数带语句",
	"`1${break}`",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有识别出 break 标签";
	}
);

test.false(
	"缺少参数结束大括号",
	"`1${'999'`",
	function(parser, err){
		return err.context.tag instanceof Rexjs.OpenTemplateTag ? "" : "没有识别出模板起始标签";
	}
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);