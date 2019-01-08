test.unit(
	[ "function/source.js" ],
	function(source){
		this.group("函数测试");

		this.true("最简单的函数声明", "function a(){}");
		this.true("带单个参数的函数声明", "function a(a){}");
		this.true("带多参数的函数声明", "function a(a, b, c){}");
		this.true("带单个默认参数的函数声明", "function a(a = 1){}");
		this.true("带多个默认参数的函数声明", "function a(a = 1, b = 2, c, d = 4){}");
		this.true("带单个省略参数的函数声明", "function a(...a){}");
		this.true("带所有情况的参数的函数声明", "function a(a, b = 2, c, d = 4, ...e){}");
		this.true("最简单的匿名函数表达式", "!function(){}");
		this.true("最简单带名称的函数表达式", "!function a(){}");
		this.true("带单个参数的函数表达式", "!function(a){}");
		this.true("带多参数的函数表达式", "!function a(a, b, c){}");
		this.true("带单个默认参数的函数表达式", "!function a(a = 1){}");
		this.true("带多个默认参数的函数表达式", "!function a(a = 1, b = 2, c, d = 4){}");
		this.true("带单个省略参数的函数表达式", "!function a(...a){}");
		this.true("带所有情况的参数的函数表达式", "!function a(a, b = 2, c, d = 4, ...e){}");
		this.true("函数表达式换行后接其他语句", "!function (){}\nvar b = 1");
		this.true("函数参数以逗号结束", "!function (a,b,c,){}");

		this.true(
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

		this.true(
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

		this.true(
			"带严格模式和默认值的函数声明",
			"function a(a = 1, b, c = 3, ...d){'use strict';var g = 100;}",
			false,
			function(parser, err){
				return parser.build().indexOf("{'use strict'") > -1 ? "" : "没有将省略参数插入到严格模式之后"
			}
		);

		this.true("复杂的测试", source, true);

		this.false(
			"缺少函数名的函数声明",
			"function (){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.OpeningGroupingTag ? "" : "没有识别出小括号";
			}
		);

		this.false(
			"省略参数出现连续的逗号，并以逗号结束",
			"function a(a, b, c,,){}",
			function(parser, err){
				return err.context.content !== "," || err.context.position.column !== 19;
			}
		);

		this.false(
			"无参数带逗号分隔符",
			"function a(,){}",
			function(parser, err){
				return err.context.content !== ",";
			}
		);

		this.false(
			"省略参数出现在非最后位置",
			"function a(a, ...b, c){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.RestTag ? "" : "没有捕获到省略参数拓展符";
			}
		);

		this.false(
			"函数声明后面不能接表达式上下文",
			"function a(){}, 1",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有捕获逗号标签";
			}
		);

		this.false(
			"函数表达式后面直接接其他语句",
			"!function a(){} var b = 1",
			function(parser, err){
				return err.context.tag instanceof Rexjs.VarTag ? "" : "没有识别出 var 关键字";
			}
		);

		this.false(
			"重复的参数名",
			"function a(x, y, z, ...x){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.VariableDeclarationTag ? "" : "没有识别出重复的参数名";
			}
		);

		this.false(
			"数字参数",
			"function fn(9){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字标签";
			}
		);

		this.false(
			"字符串参数",
			"function fn(''){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StringTag ? "" : "没有识别出字符串标签";
			}
		);

		this.false(
			"布尔参数",
			"function fn(true){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BooleanTag ? "" : "没有识别出布尔标签";
			}
		);

		this.false(
			"一元运算参数",
			"function fn(!a){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.UnaryTag ? "" : "没有识别出一元运算符标签";
			}
		);

		this.false(
			"二元运算参数",
			"function fn(a / 2){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BinaryTag ? "" : "没有识别出二元运算符标签";
			}
		);

		this.false(
			"小括号内参数是以一元运算开始的二元运算",
			"function fn(!a + 2){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.UnaryTag ? "" : "没有识别出一元运算符标签";
			}
		);

		this.false(
			"属性访问器参数",
			"function fn(window.a){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DotTag ? "" : "没有识别出点标签";
			}
		);

		this.false(
			"参数后面接数字",
			"function fn(window.123){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字";
			}
		);

		this.groupEnd();
	}
);