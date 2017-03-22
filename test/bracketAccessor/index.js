test.unit(
	[ "bracketAccessor/source.js" ],
	function(source){
		this.group("中括号 - 属性访问器测试");

		this.true("变量属性名", "window[a]");
		this.true("字符串属性名", "window['a']");
		this.true("布尔值属性名", "window[true]");
		this.true("null 属性名", "window[null]");
		this.true("数字属性名", "window[0]");
		this.true("this 属性名", "window[this]");
		this.true("正则属性名", "window[/a/]");
		this.true("运算属性名", "window['to' + 'String']");
		this.true("赋值运算属性名", "window[a += 'to' + 'String']");
		this.true("数字属性访问器", "1['toString']");
		this.true("null 关键字的属性访问器", "null['toString']");
		this.true("布尔关键字的属性访问器", "true['toString']");
		this.true("this 关键字的属性访问器", "this['toString']");
		this.true("正则的属性访问器", "/./['toString']");
		this.true("字符串的属性访问器", "'hello'['toString']");
		this.true("分组小括号的属性访问器", "(1)['toString']");
		this.true("数组的属性访问器", "[]['toString']");
		this.true("点属性访问器运算", "window['name'] + window['name'] * window['name'] / window['name']");
		this.true("属性访问器赋值", "window['a'] = 100");
		this.true("连续的属性访问器", "window['a']['toString']");
		this.true("与点属性访问器的混合使用", "window.a['toString']");
		this.true("带小括号的属性名", "window['t' + ('o' + 'String')]");
		this.true("函数表达式的属性访问器", "(function(){}['name'])");
		this.true("模板的属性访问器", "`123${hello}`['length']");
		this.true("super 的属性访问器", "class a extends b { constructor(){ super();super['name']; } }");

		this.true("运算结果测试", source, true);

		this.false(
			"关键字属性名",
			"window[while]",
			function(parser, err){
				return err.context.tag instanceof Rexjs.WhileTag ? "" : "没有捕获到 while 关键字";
			}
		);

		this.groupEnd();
	}
);