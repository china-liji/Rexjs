test.unit(
	[ "block/source.js" ],
	function(source){
		this.group("语句块测试");

		this.true("空语句块", "{}");
		this.true("带换行的空语句块", "{\n\n\n}");
		this.true("带内容的语句块", "{ window.a + window.b }");

		this.true("复杂的测试", source, true);

		this.false(
			"语句块内的不完整属性访问器",
			"{ a. }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ClosingBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"语句块内的不完整 if 语句",
			"{ if }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ClosingBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"语句块内的不完整 try 语句",
			"{ try }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ClosingBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"语句块内的不完整 do while 语句",
			"{ do;while }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ClosingBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"语句块内的不完整函数声明语句",
			"{ function a }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ClosingBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"语句块内的不完整 var 语句",
			"{ var }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ClosingBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"语句块内的不完整 while 语句",
			"{ while }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ClosingBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"语句块内的不完整 switch 语句",
			"{ switch }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ClosingBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.groupEnd();
	}
);