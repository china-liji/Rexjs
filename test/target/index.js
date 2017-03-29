test.unit(
	[],
	function(){
		var str;

		test.group("new.target 表达式测试");

		test.true("最简单的表达式", "function fn(){ new.target }");
		test.true("在无语句块的箭头函数主体内", "function fn(){ return () => new.target }")

		test.false(
			"缺少函数闭包",
			"new.target",
			function(parser, err){
				return err.context.tag instanceof Rexjs.TargetAccessorTag ? "" : "没有识别出点访问符";
			}
		);

		test.false(
			"在箭头函数内",
			"() => { new.target }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.TargetAccessorTag ? "" : "没有识别出点访问符";
			}
		);

		test.groupEnd();
	}
);