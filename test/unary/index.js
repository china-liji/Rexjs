test.unit(
	[ "unary/source.js" ],
	function(source){
		test.group("一元操作符");

		test.true("delete 操作符", "delete name");
		test.true("void 操作符", "void null");
		test.true("typeof 操作符", "typeof 123");
		test.true("new 操作符", "new constructor;new b;new '';new true;new 123;");
		test.true("逻辑否操作符", "!true");
		test.true("二进制否操作符", "~666");
		test.true("正号", "+a;+666;");
		test.true("负号", "-b;-333");
		test.true("多个一元表达式", "!+-~void typeof new constrcutor");
		test.true("连续的正号", " + + + + + + + 2", true);
		test.true("连续的负号", " - - - - - - - 2", true);
		test.true("加号后面跟正号", "3 + + + 2", true);
		test.true("减号后面跟负号", "3 - - - 2", true);
		test.true("前置递增", "++b");
		test.true("属性访问器的前置递增", "++window.a.b.c.d");
		test.true("带正号的前置递增", "+ ++b");
		test.true("前置递减", "--b");
		test.true("属性访问器的前置递减", "--window.a.b.c.d");
		test.true("带负号的前置递减", "- --b");
		test.true("带注释的后置一元操作符", "a/* abc */++");
		test.true("连续运算的一元操作符", "-+-+- -+ +--a+--a-a+++1");
		test.true("测试运算结果", source, true);

		test.true(
			"验证 new 一元表达式",
			"new window.a() + b",
			false,
			function(parser){
				return parser.statements[1].expression instanceof Rexjs.BinaryExpression ? "" : "没有识别出最外层的二元表达式";
			},
			function(parser){
				return parser.statements[1].expression[0].left instanceof Rexjs.CallExpression ? "" : "没有识别出函数啊用的正确位置";
			},
			function(parser){
				return parser.statements[1].expression[0].left.operand instanceof Rexjs.UnaryExpression ? "" : "没有正确识别出 new 一元操作符关键字";
			}
		)

		test.false(
			"不完整的一元表达式",
			"!",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有识别出文件结束";
			}
		);

		test.false(
			"++ 后面接不可赋值表达式",
			"++ +a",
			function(parser, err){
				return err.context.tag instanceof Rexjs.IncrementTag ? "" : "没有识别出递增标签";
			}
		);

		test.false(
			"-- 后面接不可赋值表达式",
			"-- +a",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DecrementTag ? "" : "没有识别出递增标签";
			}
		);

		test.false(
			"new 后面接其他一元操作符字符",
			"new !b",
			function(parser, err){
				return err.context.tag instanceof Rexjs.LogicalNOTTag ? "" : "没有识别出逻辑否定标签";
			}
		);

		test.false(
			"一元操作符后面不能接赋值操作",
			"void b += 2",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ShorthandAssignmentTag ? "" : "没有识别出简写赋值标签";
			}
		);

		test.false(
			"一元后置操作符后面接不同的前置一元操作符",
			"a++---a",
			function(parser, err){
				return err.context.content === "--" ? "" : "没有识别出递减这个错误";
			},
			function(parser, err){
				return err.context.position.column === 3 ? "" : "没有识别出错误位置";
			}
		);
		
		test.false(
			"一元后置操作符后面接相同的前置一元操作符",
			"a+++++a",
			function(parser, err){
				return err.context.content === "++" ? "" : "没有识别出递增这个错误";
			},
			function(parser, err){
				return err.context.position.column === 3 ? "" : "没有识别出错误位置";
			}
		);

		test.false(
			"前置、后置一元操作符都针对同一个变量使用",
			"++a--",
			function(parser, err){
				return err.context.content === "++" ? "" : "没有识别出错误的递增符号";
			}
		);

		test.false(
			"一元后置操作符没有接其他二元操作符",
			"var a = 1,\n b = a ++ b",
			function(parser, err){
				return err.context.content === "b" ? "" : "没有识别出错误";
			}
		);

		test.false(
			"换行后的后置操作符",
			"a\n++",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有识别出文件结束符";
			}
		);

		test.false(
			"注释内换行后的后置操作符",
			"a/*\n*/++",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有识别出文件结束符";
			}
		);

		test.false(
			"三个连续的减号",
			"---a",
			function(parser, err){
				return err.context.content === "--" ? "" : "没有识别出递减";
			},
			function(parser, err){
				return err.context.position.column === 0 ? "" : "没有识别出递减位置";
			}
		);

		test.groupEnd();
	}
);