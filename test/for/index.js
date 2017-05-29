test.unit(
	[ "for/source.js" ],
	function(source){
		this.group("for 循环测试");

		this.true("最简单的 for 循环", "for(;;)break");
		this.true("仅带初始表达式的 for 循环", "for(i = 10;;)break");
		this.true("仅带条件表达式的 for 循环", "for(;i < 100;)break");
		this.true("仅带末表达式的 for 循环", "for(;;i += 1)break");
		this.true("带声明的 for 循环", "for(var i;i < 100;i += 1){}");
		this.true("带的多个变量的声明 for 循环", "for(var i, j = 100;i < j;i += 1){}");
		this.true("最简单的 for in", "for(a in b);");
		this.true("带声明的 for in", "for(var a in b);");
		this.true("最简单的 for of", "for(a of b);");
		this.true("带声明的 for of", "for(var a in b);");
		this.true("of 变量名", "var of");
		this.true("带 of 变量的 for 循环初始化语句", "for(of;;)break;");
		this.true("带 of 变量的 for 循环逻辑语句", "for(;of;)break;");
		this.true("带 of 变量的 for 循环末语句", "for(;;of)break;");
		this.true("带 of 变量的 for 循环", "for(of;of;of)break;");
		this.true("带 of 变量名的 for in", "for(of in of);");
		this.true("声明 of 声明变量名的 for in", "for(var of in a);");
		this.true("带 of 变量的 for of", "for(of of of);");

		this.true(
			"带声明和运算的 for in",
			"for(var a in b = c + 100, d - 1000, e);",
			false,
			function(parser){
				var inner = parser.statements[1].expression.condition.inner;

				if(
					inner instanceof Rexjs.BinaryExpression === false
				){
					return "条件表达式应该为二元表达式";
				}

				if(
					inner.left instanceof Rexjs.VarExpression === false
				){
					return "条件的左侧应该为声明表达式"
				}

				if(
					inner.right instanceof Rexjs.CommaExpression === false
				){
					return "条件表达式的列表第二项表达式应该是逗号表达式";
				}

				if(
					inner.right.length !== 3
				){
					return "逗号表达式长度不正确";
				}
			}
		);

		this.true("复杂的测试", source, true);

		this.false(
			"空的 for 条件",
			"for();",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有正确的捕获错误的结束小括号";
			}
		);

		this.false(
			"空的 for 主体语句",
			"for(;;)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有捕获到错误的文件结束标签";
			}
		);

		this.false(
			"for 条件中少了分号",
			"for(;){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有正确的捕获错误的结束小括号";
			}
		);

		this.false(
			"for 条件中多了分号",
			"for(;;;){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.EmptyStatementTag ? "" : "没正确捕获到错误的分号";
			}
		);

		this.false(
			"for 条件初始化语句中带有其他语句",
			"for(break);",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有捕获到其他语句";
			}
		);

		this.false(
			"for 条件逻辑语句中带有其他语句",
			"for(;break;);",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有捕获到其他语句";
			}
		);

		this.false(
			"for 条件末语句中带有其他语句",
			"for(;;break);",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BreakTag ? "" : "没有捕获到其他语句";
			}
		);

		this.false(
			"不正确的 for in 的条件表达式",
			"for(a, b + 3 / 4 instanceof x in c);",
			function(parser, err){
				return err.context.tag instanceof Rexjs.InTag ? "" : "没有捕获到正确的 in 关键字";
			}
		);

		this.false(
			"不正确的 for of 的条件表达式",
			"for(a, b + 3 / 4 instanceof x of c);",
			function(parser, err){
				return err.context.tag instanceof Rexjs.LabelTag ? "" : "没有捕获到正确的 of 变量名";
			}
		);

		this.groupEnd();
	}
);