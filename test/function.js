void function(SimpleTest, test){

test.group("函数测试");

test.true("最简单的函数声明", "function a(){}");
test.true("带单个参数的函数声明", "function a(a){}");
test.true("带多参数的函数声明", "function a(a, b, c){}");
test.true("带单个默认参数的函数声明", "function a(a = 1){}");
test.true("带多个默认参数的函数声明", "function a(a = 1, b = 2, c, d = 4){}");
test.true("带单个省略参数的函数声明", "function a(...a){}");
test.true("带所有情况的参数的函数声明", "function a(a, b = 2, c, d = 4, ...e){}");
test.true("最简单的匿名函数表达式", "!function(){}");
test.true("最简单带名称的函数表达式", "!function a(){}");
test.true("带单个参数的函数表达式", "!function(a){}");
test.true("带多参数的函数表达式", "!function a(a, b, c){}");
test.true("带单个默认参数的函数表达式", "!function a(a = 1){}");
test.true("带多个默认参数的函数表达式", "!function a(a = 1, b = 2, c, d = 4){}");
test.true("带单个省略参数的函数表达式", "!function a(...a){}");
test.true("带所有情况的参数的函数表达式", "!function a(a, b = 2, c, d = 4, ...e){}");
test.true("函数表达式换行后接其他语句", "!function (){}\nvar b = 1");

test.true(
	"函数声明后面接表达式",
	"function a(){}(1,2,3)",
	false,
	function(parser){
		return parser.statements.length === 4 ? "" : "没有识别出 2 个语句";
	},
	function(parser){
		return parser.statements[1].expression instanceof Rexjs.FunctionExpression ? "" : "没有正确解析出函数表达式";
	}
);

test.true(
	"直接执行的函数表达式",
	"!function a(){}(1,2,3)",
	false,
	function(parser){
		return parser.statements.length === 3 ? "" : "语句被分离";
	},
	function(parser){
		return parser.statements[1].expression.operand.operand instanceof Rexjs.FunctionExpression ? "" : "没有正确解析出函数表达式";
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

test.true(
	"复杂的测试",
	SimpleTest.innerContentOf(function(){
		function fn(a = 1, b, c = 3, ...d){
			return a + b + c + d[1]
		}

		if(
			fn(2, 4, void 0, 6, 7) !== 16
		){
			throw "计算结果错误"
		}

		var obj = { fn: fn }

		obj.fn(...[1,2,3])

		if(
			$Rexjs_0 !== obj
		){
			throw "临时变量名生成有误";
		}

		function forOf(){
			for(var i of [1,2,3]){

			}

			if(
				$Rexjs_0 === obj
			){
				throw "没有在闭包内重置变量名索引";
			}
		}

		if(
			$Rexjs_0 === 2
		){
			throw "变量名受到闭包的影响";
		}
	}),
	true
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

test.false(
	"函数表达式后面直接接其他语句",
	"!function a(){} var b = 1",
	function(parser, err){
		return err.context.tag instanceof Rexjs.VarTag ? "" : "没有识别出 var 关键字";
	}
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);