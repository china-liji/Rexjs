void function(test){

test.group("函数测试");

test.true("最简单的函数声明", "function a(){}");
test.true("带单个参数的函数声明", "function a(a){}");
test.true("带多参数的函数声明", "function a(a, b, c){}");
test.true("带单个默认参数的函数声明", "function a(a = 1){}");
test.true("带多个默认参数的函数声明", "function a(a = 1, b = 2, c, d = 4){}");
test.true("带单个省略参数的函数声明", "function a(...a){}");
test.true("带所有情况的参数的函数声明", "function a(a, b = 2, c, d = 4, ...e){}")

test.true(
	"最简单的函数声明",
	"function a(){}(1,2,3)",
	false,
	function(parser){
		return parser.statements.length === 4 ? "" : "没有识别出 2 个语句"
	},
	function(parser){
		return parser.statements[1].expression instanceof Rexjs.FunctionExpression ? "" : "没有正确解析出函数表达式";
	}
);

test.true(
	"带严格模式和默认值的函数声明",
	"function a(a = 1, b, c = 3, ...d){'use strict';var g = 100;}",
	false,
	function(parser, err){
		return parser.build().indexOf("{'use strict'") > -1 ? "" : "没有将省略参数插入到严格模式之后"
	}
);

test.false(
	"缺少函数名的函数声明",
	"function (){}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.OpenGroupingTag ? "" : "没有识别出小括号";
	}
);

test.false(
	"省略参数出现在非最后位置",
	"function a(a, ...b, c){}",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有捕获逗号标签";
	}
);

test.false(
	"函数声明后面不能接表达式上下文",
	"function a(){}, 1",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有捕获逗号标签";
	}
);

test.groupEnd();

}(
	test
);