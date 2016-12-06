void function(test){

test.group("变量测试");

test.true("字母变量", "abc");
test.true("带关键字的变量", "var1;function中文;while$;for_;in1$;with2中文;");
test.true("字母与数字变量", "a123");
test.true("下划线变量", "_");
test.true("$变量", "$");
test.true("混合型变量", "_a$123bc$a123");
test.true("关键字开头的变量", "true_");
test.true("关键字结尾的变量", "$true");
test.true("中文变量", "你好");
test.true("其他语言变量", "γΦゆさЩ");

test.false(
	"错误的变量 - 以数字开头",
	"1abc",
	function(parser, err){
		return err.context.tag instanceof Rexjs.IdentifierTag ? "" : "没有正确分离出错误的标识符";
	},
	function(parser, err){
		return err.context.content === "abc" ? "" : "标识符识别位置出错";
	}
);

test.groupEnd();

}(
	test
);