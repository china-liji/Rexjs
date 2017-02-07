void function(SimpleTest, test){

test.group("super 测试");

test.true("子类：构造函数内的 super", "class A extends B { constructor(){ super(); } }");
test.true("子类：super 之后调用 this", "class A extends B { constructor(){ super(); this.a; } }");
test.true("子类：super 之后调用 super 的属性", "class A extends B { constructor(){ super(); super.a; } }");
test.true("子类：super 之后调用 super 的属性", "class A extends B { constructor(){ super(); super.a; } }");
test.true("子类：在方法中调用 super 属性", "class A extends B { a(){ super.a; } }");
test.true("对象：简写方法中使用 super", "!{ a(){ super.a;super.b; } }");

test.false(
	"无关联的 super",
	"{ super }",
	function(parser, err){
		return err.context.content !== "super";
	}
);

test.false(
	"子类：构造函数中缺少 super",
	"class A extends B { constructor(){} }",
	function(parser, err){
		return err.context.content !== "constructor";
	}
);

test.false(
	"子类：构造函数中单独的 super",
	"class A extends B { constructor(){ super; } }",
	function(parser, err){
		return err.context.content !== "super";
	}
);

test.false(
	"子类：方法中单独的 super",
	"class A extends B { a(){ super; } }",
	function(parser, err){
		return err.context.content !== "super";
	}
);

test.false(
	"子类：super 之前调用 this",
	"class A extends B { constructor(){ this.a; } }",
	function(parser, err){
		return err.context.content !== "this";
	}
);

test.false(
	"子类：super 之前调用 super 的属性",
	"class A extends B { constructor(){ super.a; } }",
	function(parser, err){
		return err.context.content !== "super";
	}
);

test.false(
	"子类：super 之后还调用 super",
	"class A extends B { constructor(){ super();super(); } }",
	function(parser, err){
		return err.context.content !== "(";
	}
);

test.false(
	"子类：在方法中调用 super",
	"class A extends B { a(){ super(); } }",
	function(parser, err){
		return err.context.content !== "(";
	}
);

test.false(
	"对象：非简写方法中使用 super",
	"!{ a: function(){ super.a; } }",
	function(parser, err){
		return err.context.content !== "super";
	}
);

test.groupEnd();
}(
	Rexjs.SimpleTest,
	test
);