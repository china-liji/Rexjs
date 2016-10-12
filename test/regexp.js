void function(SimpleTest, test, callback1, callback2){

test.group("正则表达式测试");

test.true("无标识的正则表达式", "/./");
test.true("全局正则表达式", "/./g");
test.true("大小正则写表达式", "/./i");
test.true("多行正则表达式", "/./m");
test.true("Unicode 正则表达式", "/./u");
test.true("粘性正则表达式", "/./y");
test.true("多个标识正则表达式1", "/./img");
test.true("多个标识正则表达式2", "/./imguy");
test.true("复杂的表达式", "/^01234567890[0-9A-z]+?(?:)''$/imguy");

test.true(
	"带反斜杠的正则表达式",
	SimpleTest.innerContentOf(function(){
		/123\/abc\\\/*?\\/
	})
);

test.false("带有错误标识的正则表达式", "/./G", callback1, callback2);
test.false("连续重复标识的正则表达式", "/./ii", callback1, callback2);
test.false("间断重复标识的正则表达式", "/./imgi", callback1, callback2);

test.false(
	"已换行的正则表达式",
	"/\n/",
	function(parser, err){
		return err.context.tag instanceof Rexjs.DivisionTag ? "" : "未捕获换行后的除号";
	}
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test,
	// callback1
	function(parser, err){
		return err.context.tag instanceof Rexjs.RegExpTag ? "" : "未解析到正则表达式";
	},
	// callback2
	function(parser, err){
		return err.context.content === err.file.source ? "" : "正则表达式匹配不正确";
	}
);