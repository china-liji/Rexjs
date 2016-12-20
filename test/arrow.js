void function(SimpleTest, test){

test.group("箭头函数测试");

test.true("最简单的箭头函数", "a=>1");
test.true("三元表达式与箭头函数共存", "1 > 2 ? a => 1 : a => 2");
test.true("带运算的简写函数主体", "a=> 1+2+!3-window.x");
test.true("带语句块的函数主体", "a=>{ let a = 1; }");

test.false(
	"数字参数",
	"9=>1",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ArrowTag ? "" : "没有识别出箭头函数标签";
	}
);

test.false(
	"字符串参数",
	"''=>1",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ArrowTag ? "" : "没有识别出箭头函数标签";
	}
);

test.false(
	"布尔参数",
	"true=>1",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ArrowTag ? "" : "没有识别出箭头函数标签";
	}
);

test.false(
	"一元运算参数",
	"!a=>1",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ArrowTag ? "" : "没有识别出箭头函数标签";
	}
);

test.false(
	"二元运算参数",
	"!a + 2 =>1",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ArrowTag ? "" : "没有识别出箭头函数标签";
	}
);

test.false(
	"属性访问器参数",
	"window.a => 1",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ArrowTag ? "" : "没有识别出箭头函数标签";
	}
);

test.false(
	"已换行的箭头符号",
	"a\n=>1",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ArrowTag ? "" : "没有识别出箭头函数标签";
	}
);

test.false(
	"带语句的简写函数主体",
	"a=>return",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ReturnTag ? "" : "没有识别出 return 关键字";
	}
);

test.false(
	"直接接逗号的函数主体",
	"a=>,",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出逗号";
	}
);

test.false(
	"箭头与函数主体大括号之间有其他字符",
	"a => 1{}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.OpenBraceTag ? "" : "没有识别到起始大括号";
	}
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);