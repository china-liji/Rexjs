test.unit(
	[],
	function(){
		this.group("点 - 属性访问器测试");

		this.true("最简单属性名", "a.a");
		this.true("_ 属性名", "a._");
		this.true("$ 属性名", "a.$");
		this.true("组合属性名", "a.a_$;a._$a;a.$_a;");
		this.true("浮点数字属性访问器", "1.2._");
		this.true("省略小数的浮点数属性访问器", "1..$");
		this.true("二进制数属性访问器", "0b010._");
		this.true("八进制数属性访问器", "0o12345670.$");
		this.true("十六进制数属性访问器", "0x1234567890ABCDEF._$a");
		this.true("整数指数幂属性访问器", "1e1._");
		this.true("整数正指数幂属性访问器", "1e+1.$");
		this.true("整数负指数幂属性访问器", "1e-1._$a");
		this.true("带点的整数指数幂属性访问器", "3.e1._");
		this.true("带点的整数正指数幂属性访问器", "3.e+1.$");
		this.true("带点的整数负指数幂属性访问器", "3.e-1.a");
		this.true("浮点数指数幂属性访问器", "3.14e1._");
		this.true("浮点数正指数幂属性访问器", "3.14e+1.$");
		this.true("浮点数负指数幂属性访问器", "3.14e-1._$");
		this.true("省略0的浮点数指数幂属性访问器", ".14e1.a");
		this.true("省略0的浮点数正指数幂属性访问器", ".14e+1._$a");
		this.true("省略0的浮点数负指数幂属性访问器", ".14e-1.$_a");
		this.true("null 关键字的属性访问器", "null._");
		this.true("布尔关键字的属性访问器", "true.$");
		this.true("this 关键字的属性访问器", "this._");
		this.true("正则的属性访问器", "/./._");
		this.true("字符串的属性访问器", "'hello'.toString");
		this.true("分组小括号的属性访问器", "(1)._");
		this.true("数组的属性访问器", "[]._$");
		this.true("关键字属性名", "a.var;a.break;a.continue;a.super;a.new;");
		this.true("点属性访问器运算", "window.a + window.a * window.a / window.a");
		this.true("属性访问器赋值", "window.a = 100");
		this.true("函数表达式的属性", "(function(){}.hello = 123)");
		this.true("模板的属性", "`123${ss}`.xx");
		this.true("对象的属性访问器", "({}.name)");
		this.true("super 的属性访问器", "({ a(){ super.a(); } })");

		this.false(
			"整数不能直接使用属性访问器",
			"1.$",
			function(parser, err){
				return err.context.tag instanceof Rexjs.LabelTag ? "" : "没有捕获到标记标签";
			}
		);

		this.false(
			"连续的点",
			"a.._",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DotTag ? "" : "没有识别出多余的点标签";
			}
		);

		this.false(
			"以点开始的语句",
			"._$",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DotTag ? "" : "没有识别出多余的点标签";
			}
		);

		this.false(
			"一元运算符后面的点",
			"!._",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DotTag ? "" : "没有识别出多余的点标签";
			}
		);

		this.false(
			"二元运算符后面的点",
			"a + .9 - ._$",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DotTag ? "" : "没有识别出多余的点标签";
			},
			function(parser, err){
				return err.context.position.column === 9 ? "" : "没有正确的识别出出错位置";
			}
		);

		this.false(
			"函数声明后带点属性访问器",
			"function fn(){}.name",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DotTag ? "" : "没有识别出多余的点标签";
			}
		);
		
		this.groupEnd();
	}
);