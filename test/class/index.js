test.unit(
	[ "class/source1.js", "class/source2.js", "class/source3.js" ],
	function(source1, source2, source3){
		this.group("类测试");

		this.true("最简单的类", "class a{}");
		this.true("类表达式", "(class {})");
		this.true("带很多分号的空属性类", "class a{;;;;;;;;;;;;;;;;;}");
		this.true("带构造函数的类", "class a { constructor(){} }");
		this.true("带方法的类", "class a { a(){} }");
		this.true("带静态方法的类", "class a { static constructor(){} }");
		this.true("带多种方法的类", "class a { a(){} b(){};;static c(){};; static d(){} e(){};;;.12(){};[1+2](){} static get 0b101(){} }");
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
				return err.context.tag instanceof Rexjs.OpenBlockTag ? "" : "没有找到错误的起始语句块";
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
				return err.context.tag instanceof Rexjs.CloseParenTag ? "" : "没有识别出异常的结束分组小括号";
			}
		);

		this.false(
			"类属性默认值",
			"class A { a = 5 }",
			function(parser, err){
				return err.context.content === "=" ? "" : "类不能设置属性默认值";
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

		this.groupEnd();
	}
);