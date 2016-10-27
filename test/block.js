void function(SimpleTest, test){

test.group("语句块测试");

test.true("空语句块", "{}");
test.true("带换行的空语句块", "{\n\n\n}");
test.true("带内容的语句块", "{ window.a + window.b }");

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);