void function(SimpleTest, test){

test.group("点 - 属性访问器测试");

test.true("最简单属性名", "a.a");
test.true("_ 属性名", "a._");
test.true("$ 属性名", "a.$");
test.true("组合属性名", "a.a_$;a._$a;a.$_a;");
test.true("浮点数字属性访问器", "1.2._");
test.true("省略小数的浮点数属性访问器", "1..$");
test.true("二进制数属性访问器", "0b010._");
test.true("八进制数属性访问器", "0o12345670.$");
test.true("十六进制数属性访问器", "0x1234567890ABCDEF._$a");
test.true("整数指数幂属性访问器", "1e1._");
test.true("整数正指数幂属性访问器", "1e+1.$");
test.true("整数负指数幂属性访问器", "1e-1._$a");
test.true("带点的整数指数幂属性访问器", "3.e1._");
test.true("带点的整数正指数幂属性访问器", "3.e+1.$");
test.true("带点的整数负指数幂属性访问器", "3.e-1.a");
test.true("浮点数指数幂属性访问器", "3.14e1._");
test.true("浮点数正指数幂属性访问器", "3.14e+1.$");
test.true("浮点数负指数幂属性访问器", "3.14e-1._$");
test.true("省略0的浮点数指数幂属性访问器", ".14e1.a");
test.true("省略0的浮点数正指数幂属性访问器", ".14e+1._$a");
test.true("省略0的浮点数负指数幂属性访问器", ".14e-1.$_a");
test.true("null 关键字的属性访问器", "null._");
test.true("布尔关键字的属性访问器", "true.$");
test.true("this 关键字的属性访问器", "this._");
test.true("正则的属性访问器", "/./._");
test.true("字符串的属性访问器", "'hello'.toString");
test.true("分组小括号的属性访问器", "(1)._");
test.true("数组的属性访问器", "[]._$");
test.true("关键字属性名", "a.var;a.break;a.continue;a.super;a.new;");
test.true("点属性访问器运算", "window.a + window.a * window.a / window.a");
test.true("属性访问器赋值", "window.a = 100");

test.false(
	"整数不能直接使用属性访问器",
	"1.$",
	function(parser, err){
		return err.context.tag instanceof Rexjs.LabelTag ? "" : "没有捕获到标记标签";
	}
);

test.false(
	"连续的点",
	"a.._",
	function(parser, err){
		return err.context.tag instanceof Rexjs.DotAccessorTag ? "" : "没有识别出多余的点标签";
	}
);

test.false(
	"以点开始的语句",
	"._$",
	function(parser, err){
		return err.context.tag instanceof Rexjs.DotAccessorTag ? "" : "没有识别出多余的点标签";
	}
);

test.false(
	"一元运算符后面的点",
	"!._",
	function(parser, err){
		return err.context.tag instanceof Rexjs.DotAccessorTag ? "" : "没有识别出多余的点标签";
	}
);

test.false(
	"二元运算符后面的点",
	"a + .9 - ._$",
	function(parser, err){
		return err.context.tag instanceof Rexjs.DotAccessorTag ? "" : "没有识别出多余的点标签";
	},
	function(parser, err){
		return err.context.position.column === 10 ? "" : "没有正确的识别出出错位置";
	}
);

console.warn("函数表达式的测试 - true");
console.warn("模板的测试 - true");
console.warn("对象的属性访问器 - true");
console.warn("super 的属性访问器 - true");
console.warn("函数声明的测试 - false");
console.warn("三元运算符后面的测试 - false");

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);