test.unit(
	[ "class/source1.js", "class/source2.js", "class/source3.js" ],
	function(source1, source2, source3){
		this.group("类测试");

		this.true("最简单的类", "class a{}");
		this.true("类表达式", "(class {})");
		this.true("带很多分号的空属性类", "class a{;;;;;;;;;;;;;;;;;}");
		this.true("带构造函数的类", "class a { constructor(){} }");
		this.true("带方法的类", "class a { a(){} }");

		this.true("带标识符属性的类", "class a { get(){} }");
		this.true("带数字属性的类", "class a { 1(){} }");
		this.true("带计算式属性的类", "class a { [1](){} }");
		this.true("带进制属性的类", "class a { 0b101(){} }");
		this.true("带访问器属性的类", "class a { get 0b101(){} }");
		this.true("带属性默认值的类", "class a { b = 100 }");
		this.true("带关键字属性默认值的类", "class a { var = 100 }");
		this.true("带多属性默认值的类", "class a { b = 100\n c = 99; d = 88 }");
		this.true("带多种属性默认值的类", "class a { a = 1; 'b' = 2; 3 = 3; 0b10 = 4; 0o5 = 5; [6] = 6; }");

		this.true("带静态标识符属性的类", "class a { static get(){} }");
		this.true("带静态数字属性的类", "class a { static 1(){} }");
		this.true("带静态计算式属性的类", "class a { static [1](){} }");
		this.true("带静态进制属性的类", "class a { static  0b101(){} }");
		this.true("带静态访问器属性的类", "class a { static get 0b101(){} }");
		this.true("带静态属性默认值的类", "class a { static b = 100 }");
		this.true("带静态 constructor 属性默认值的类", "class a { static constructor = 100 }");
		this.true("带关键字静态属性默认值的类", "class a { static var = 100 }");
		this.true("带多静态属性默认值的类", "class a { static b = 100\n static c = 99; static d = 88 }");
		this.true("带多种静态属性默认值的类", "class a { static a = 1; static 'b' = 2; static 3 = 3; static 0b10 = 4; static 0o5 = 5; static [6] = 6; }");
		
		this.true("带标识符生成器的类", "class a { *get(){} }");
		this.true("带数字生成器的类", "class a { *1(){} }");
		this.true("带计算式生成器的类", "class a { *[1](){} }");
		this.true("带进制生成器的类", "class a { *0b101(){} }");

		this.true("带静态标识符生成器的类", "class a { static *get(){} }");
		this.true("带静态数字生成器的类", "class a { static *1(){} }");
		this.true("带静态计算式生成器的类", "class a { static *[1](){} }");
		this.true("带静态进制生成器的类", "class a { static *0b101(){} }");
		
		this.true("带静态方法的类", "class a { static constructor(){} }");
		this.true("带多种方法的类", "class a { a(){} b(){};c = 100; static d = 99;static c(){};; static *0o12345(){}; *0b10101(){}; static d(){} e(){};;;.12(){};[1+2](){} static get 0b101(){} }");
		this.true("类表达式", "var a = class {}");
		this.true("带名称的类表达式", "var a = class a {}");
		this.true("直接继承另外一个类", "class A extends class B {} {}");
		this.true("继承的是父类是某个对象的属性1", "class A extends Rexjs.List {}");
		this.true("继承的是父类是某个对象的属性2", 'class A extends Rexjs["List"] {}');
		this.true("继承的是父类是某个方法的返回值", 'class A extends Rexjs["List"].constructor.a() {}');
		this.true("继承的是父类是某个模板方法的返回值", 'class A extends Rexjs["List"].constructor`a`() {}');
		this.true("继承的是父类是某个实例的返回值", 'class A extends new Rexjs["List"].constructor`a`() {}');

		this.true("类的属性验证1", source1, true);
		this.true("类的属性验证2", source2, true);
		this.true("继承的类没有构造函数", source3, true);

		this.false(
			"类声明缺少类名称",
			"class {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.OpeningBlockTag ? "" : "没有找到错误的起始语句块";
			}
		);

		this.false(
			// 因为这一对大括号已被认为是对象，即该类继承至某个对象
			"缺少类主体",
			"class A extends {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "没有找到错误的语句结束标签";
			}
		);

		this.false(
			"继承的表达式带逗号",
			"class A extends Rexjs.List, Rexjs.SyntaxElement {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有找到错误的逗号标签";
			}
		);

		this.false(
			"继承的表达式带三元表达式",
			"class A extends Rexjs.List? Rexjs.SyntaxElement : Rexjs.Expression {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.QuestionTag ? "" : "没有找到错误的问号标签";
			}
		);

		this.false(
			"继承的表达式带非 new 的一元表达式",
			"class A extends !Rexjs.List {}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.UnaryTag ? "" : "没有找到错误的一元标签";
			}
		);

		this.false(
			"类声明后面接小括号",
			"class A {}()",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ClosingParenTag ? "" : "没有识别出异常的结束分组小括号";
			}
		);

		this.false(
			"带访问器的生成器",
			"class A { get *a(){} }",
			function(parser, err){
				return err.context.content !== "*";
			}
		);

		this.false(
			"带访问器的静态生成器",
			"class A { static get *a(){} }",
			function(parser, err){
				return err.context.content !== "*";
			}
		);

		this.false(
			"类的键值对属性",
			"class A { a : 5 }",
			function(parser, err){
				return err.context.content === ":" ? "" : "类不能设置键值对属性";
			}
		);

		this.false(
			"类的简写属性",
			"class A { a }",
			function(parser, err){
				return err.context.content === "}" ? "" : "类不能设置简写属性";
			}
		);

		this.false(
			"类的静态简写属性",
			"class A { static a }",
			function(parser, err){
				return err.context.content !== "}";
			}
		);

		this.false(
			"构造函数属性值",
			"class A { constructor = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"缺少值的属性赋值",
			"class A { a = }",
			function(parser, err){
				return err.context.content !== "}";
			}
		);

		this.false(
			"缺少值的属性赋值 - 多属性",
			"class A { b(){} a = ; c = 99 }",
			function(parser, err){
				return err.context.content !== ";";
			}
		);

		this.false(
			"缺少值的属性赋值 - 缺少换行的多属性",
			"class A { b(){} a = 99 c = 99 }",
			function(parser, err){
				return err.context.content !== "c";
			}
		);

		this.false(
			"缺少值的属性赋值 - 换行后接 static 关键字",
			"class A { a = \n static b = 100 }",
			function(parser, err){
				return err.context.content !== "static";
			}
		);

		this.false(
			"访问器属性属性赋值 - 标识符",
			"class A { get a = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"访问器属性属性赋值 - 字符串",
			"class A { get 'a' = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"访问器属性属性赋值 - 数字",
			"class A { get 2 = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"访问器属性属性赋值 - 计算式",
			"class A { get [2] = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"访问器属性属性赋值 - 二进制数字",
			"class A { get 0b10 = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"访问器属性属性赋值 - 八进制数字",
			"class A { get 0o7 = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"生成器属性属性赋值",
			"class A { *a = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"缺少值的静态属性赋值",
			"class A { static a = }",
			function(parser, err){
				return err.context.content !== "}";
			}
		);

		this.false(
			"缺少值的静态属性赋值 - 多属性情况下",
			"class A { b(){} static a = ; c = 99 }",
			function(parser, err){
				return err.context.content !== ";";
			}
		);

		this.false(
			"缺少值的静态属性赋值 - 缺少换行的多属性",
			"class A { b(){} static [a] = 99 c = 99 }",
			function(parser, err){
				return err.context.content !== "c";
			}
		);

		this.false(
			"静态访问器属性属性赋值 - 标识符",
			"class A { static get a = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"静态访问器属性属性赋值 - 字符串",
			"class A { static get 'a' = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"静态访问器属性属性赋值 - 数字",
			"class A { static get 2 = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"静态访问器属性属性赋值 - 计算式",
			"class A { static get [2] = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"静态访问器属性属性赋值 - 二进制数字",
			"class A { static get 0b10 = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"静态访问器属性属性赋值 - 八进制数字",
			"class A { static get 0o7 = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"静态生成器属性属性赋值",
			"class A { static *a = 99 }",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"连续的 get、set",
			"class A { get get set(){} }",
			function(parser, err){
				return err.context.content !== "set";
			}
		);

		this.false(
			"类的拓展属性",
			"class A { ...a }",
			function(parser, err){
				return err.context.content !== "...";
			}
		);

		this.false(
			"super 之前调用 this",
			"class A extends B { constructor(){ if(true){ this } } }",
			function(parser, err){
				return err.context.content !== "this";
			}
		);

		this.groupEnd();
	}
);