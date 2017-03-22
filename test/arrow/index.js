test.unit(
	[ "arrow/source.js" ],
	function(source){
		this.group("箭头函数测试");

		this.true("最简单的箭头函数", "a=>1");
		this.true("三元表达式与箭头函数共存", "1 > 2 ? a => 1 : a => 2");
		this.true("带运算的简写函数主体", "a=> 1+2+!3-window.x");
		this.true("带语句块的函数主体", "a=>{ let b = 1; }");
		this.true("空的小括号参数的箭头函数", "()=>{}");
		this.true("小括号参数的箭头函数", "(a)=>{}");
		this.true("带默认值与省略参数的箭头函数", "(a, b = 1, c, d = 2, ...e)=>{}");
		this.true("与赋值表达式共存的箭头函数", "let a = c /= b += a=>{}");
		this.true("带语句块的箭头函数与逗号", "() => {}, 2, 3");
		this.true("带语句块的箭头函数与三元运算符", "a ? ()=>{0} : ()=>{1}");

		this.true(
			"没语句块的箭头函数与逗号",
			"()=> 1, 2",
			false,
			function(parser){
				return parser.statements[1].expression instanceof Rexjs.CommaExpression ? "" : "没有解析出逗号表达式";
			}
		);

		this.true("复杂的测试", source, true);

		this.false(
			"数字参数",
			"9=>1",
			function(parser, err){
				return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字标签";
			}
		);

		this.false(
			"小括号内参数是数字",
			"(a, 1, b) => {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字标签";
			}
		);

		this.false(
			"字符串参数",
			"''=>1",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StringTag ? "" : "没有识别出字符串标签";
			}
		);

		this.false(
			"小括号内参数是字符串",
			"(a, '', b) => {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StringTag ? "" : "没有识别出字符串标签";
			}
		);

		this.false(
			"布尔参数",
			"true=>1",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BooleanTag ? "" : "没有识别出布尔标签";
			}
		);

		this.false(
			"小括号内参数是布尔",
			"(a, true, b) => {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BooleanTag ? "" : "没有识别出布尔标签";
			}
		);

		this.false(
			"一元运算参数",
			"!a=>1",
			function(parser, err){
				return err.context.tag instanceof Rexjs.UnaryTag ? "" : "没有识别出一元运算符标签";
			}
		);

		this.false(
			"小括号内参数是一元运算",
			"(a, !c, b) => {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.UnaryTag ? "" : "没有识别出一元运算符标签";
			}
		);

		this.false(
			"二元运算参数",
			"a + 2 =>1",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BinaryTag ? "" : "没有识别出二元运算符标签";
			}
		);

		this.false(
			"小括号内参数是二元运算",
			"(a, c + 2, b) => {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.BinaryTag ? "" : "没有识别出二元运算符标签";
			}
		);

		this.false(
			"小括号内参数是以一元运算开始的二元运算",
			"(a, !c + 2, b) => {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.UnaryTag ? "" : "没有识别出一元运算符标签";
			}
		);

		this.false(
			"属性访问器参数",
			"window.a => 1",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DotAccessorTag ? "" : "没有识别出点标签";
			}
		);

		this.false(
			"小括号内参数是属性访问器",
			"(a, window.c, b) => {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DotAccessorTag ? "" : "没有识别出点标签";
			}
		);

		this.false(
			"已换行的箭头符号",
			"a\n=>1",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ArrowTag ? "" : "没有识别出箭头函数标签";
			}
		);

		this.false(
			"带语句的简写函数主体",
			"a=>return",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ReturnTag ? "" : "没有识别出 return 关键字";
			}
		);

		this.false(
			"直接接逗号的函数主体",
			"a=>,",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出逗号";
			}
		);

		this.false(
			"箭头与函数主体大括号之间有其他字符",
			"a => 1{}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.OpenBraceTag ? "" : "没有识别到起始大括号";
			}
		);

		this.false(
			"语句块的箭头函数后面接除逗号外的表达式上下文",
			"() => {} / 2",
			function(parser, err){
				return err.context.content === "/" ? "" : "没有识别出除号";
			}
		);

		this.groupEnd();
	}
);