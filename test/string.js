void function(SimpleTest, test){

test.group("字符串测试");

test.true("双引号字符串 - 字符串", '"123abc-*&^$"');
test.true("双引号字符串 - 空字符串", '""');

test.true(
	"双引号字符串 - 反斜杠",
	SimpleTest.innerContentOf(function(){
		"12\\\\\\3\\"
	})
);

test.true(
	"双引号字符串 - 被转义的双引号",
	SimpleTest.innerContentOf(function(){
		"123\\\"abc\"**\\"
	})
);

test.true(
	"双引号字符串 - 反斜杠的换行",
	SimpleTest.innerContentOf(function(){
		"123\
		\\\\\
		abc\"**\\"
	})
);

test.true("单引号字符串 - 字符串", "'123abc-*&^$'");
test.true("单引号字符串 - 空字符串", "''");

test.true(
	"单引号字符串 - 反斜杠",
	SimpleTest.innerContentOf(function(){
		'12\\\\\\3\\'
	})
);

test.true(
	"单引号字符串 - 被转义的单引号",
	SimpleTest.innerContentOf(function(){
		'123\\\'abc\'**\\'
	})
);

test.true(
	"单引号字符串 - 反斜杠的换行",
	SimpleTest.innerContentOf(function(){
		'123\
		\\\\\
		abc\'**\\'
	})
);

test.false("错误的字符串 - 缺少引号", '"\\"');
test.false("错误的字符串 - 单双引号搭配", "'\"");

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);