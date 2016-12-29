void function(SimpleTest, test){

test.group("语句块测试");

test.true("空语句块", "{}");
test.true("带换行的空语句块", "{\n\n\n}");
test.true("带内容的语句块", "{ window.a + window.b }");

test.true(
	"复杂的测试",
	SimpleTest.innerContentOf(function(){
		a = 1

		for(var i of [1]){
			for(
				var i of [1,2,3]
			){

			}
		}
		
		if(
			$Rexjs_0 instanceof RexjsHelper.Generator === false
		){
			throw "临时变量名值1错误"
		}

		if(
			$Rexjs_1 instanceof RexjsHelper.Generator === false
		){
			throw "临时变量名值2错误"
		}

		{
			a = 10
		
			a = a -= window instanceof Window && 1 + 9 ^ 6 | 5 || 3 & 6 > 7 / 12 === 3;
			
			if(
				a !== -3
			){
				throw a;
			}
			
			a = a+= a *= 2 + 3 * 6 | 7 ^ 0 % 4 / 10 & 1;
			
			if(
				a !== -72
			){
				throw a;
			}
		}
	}),
	true
);

test.false(
	"语句块内的不完整属性访问器",
	"{ a. }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"语句块内的不完整 if 语句",
	"{ if }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"语句块内的不完整 try 语句",
	"{ try }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"语句块内的不完整 do while 语句",
	"{ do;while }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"语句块内的不完整函数声明语句",
	"{ function a }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"语句块内的不完整 var 语句",
	"{ var }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"语句块内的不完整 while 语句",
	"{ while }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"语句块内的不完整 switch 语句",
	"{ switch }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);