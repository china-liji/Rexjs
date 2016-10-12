void function(SimpleTest, test){

test.group("中括号 - 属性访问器测试");

test.true("变量属性名", "window[a]");
test.true("字符串属性名", "window['a']");
test.true("布尔值属性名", "window[true]");
test.true("null 属性名", "window[null]");
test.true("数字属性名", "window[0]");
test.true("this 属性名", "window[this]");
test.true("正则属性名", "window[/a/]");
test.true("运算属性名", "window['to' + 'String']");
test.true("赋值运算属性名", "window[a += 'to' + 'String']");
test.true("数字属性访问器", "1['toString']");
test.true("null 关键字的属性访问器", "null['toString']");
test.true("布尔关键字的属性访问器", "true['toString']");
test.true("this 关键字的属性访问器", "this['toString']");
test.true("正则的属性访问器", "/./['toString']");
test.true("字符串的属性访问器", "'hello'['toString']");
test.true("分组小括号的属性访问器", "(1)['toString']");
test.true("数组的属性访问器", "[]['toString']");
test.true("点属性访问器运算", "window['name'] + window['name'] * window['name'] / window['name']");
test.true("属性访问器赋值", "window['a'] = 100");
test.true("连续的属性访问器", "window['a']['toString']");
test.true("与点属性访问器的混合使用", "window.a['toString']");
test.true("带小括号的属性名", "window['t' + ('o' + 'String')]");

test.true(
	"运算结果测试",
	SimpleTest.innerContentOf(function(){
		if(
			window.toString !== window['toString']
		){
			throw "错误的属性访问器";
		}
	}),
	true
);

test.false(
	"关键字属性名",
	"window[while]",
	function(parser, err){
		return err.context.tag instanceof Rexjs.WhileTag ? "" : "没有捕获到 while 关键字";
	}
);

console.warn("函数表达式的测试 - true");
console.warn("模板的测试 - true");
console.warn("super 的属性访问器 - true");
console.warn("函数声明的测试 - false");
console.warn("三元运算符后面的测试 - false");

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);