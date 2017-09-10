test.unit(
	[ "generator/source.js" ],
	function(source){
		this.group("生成器测试");

		this.true("声明形式的函数生成器", "function* generator(){}");
		this.true("非声明形式的函数生成器", "var a = function* generator(){}");
		this.true("非声明形式的匿名函数生成器", "var a = function*(){}");
		this.true("带返回值的 yield", "function* generator(){ yield 123; }");
		this.true("不带返回值的 yield", "function* generator(){ yield }");
		this.true("对象生成器属性", "!{ *a(){ yield } }");
		this.true("类生成器属性", "class A { *a(){ yield } }");
		this.true("类静态生成器属性", "class A { static *a(){ yield } }");

		this.true("验证结果测试", source, true);

		this.false(
			"没有名称的声明形式生成器",
			"function *(){}",
			function(parser, err){
				return err.context.content !== "(";
			}
		);

		this.false(
			"非生成器内使用 yield",
			"function a(){ yield }",
			function(parser, err){
				return err.context.content !== "yield";
			}
		);

		this.false(
			"箭头函数内使用 yield",
			"var a = () => yield",
			function(parser, err){
				return err.context.content !== "yield";
			}
		);

		this.false(
			"生成器内部函数中使用 yield",
			"function* g(){ function b(){ yield 5; } }",
			function(parser, err){
				return err.context.content !== "yield";
			}
		);

		this.groupEnd();
	}
);