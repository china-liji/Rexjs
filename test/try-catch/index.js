test.unit(
	[ "try-catch/source.js" ],
	function(source){
		test.group("try catch 语句测试");

		test.true("最简单的 try catch 语句", "try{}catch(e){}");
		test.true("最简单的 try finally 语句", "try{}finally{}");
		test.true("最简单的 try catch finally 语句", "try{}catch(e){}finally{}");
		test.true("复杂的测试", source, true);

		test.false(
			"不完整的 try catch",
			"try {catch(e){}",
			function(parser, err){
				return err.context.content !== "catch";
			}
		);

		test.false(
			"catch 关键字后面缺少大括号",
			"try{}catch(e)123;",
			function(parser, err){
				return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字";
			}
		);

		test.false(
			"finally 关键字后面缺少大括号",
			"try{}finally 123;",
			function(parser, err){
				return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字";
			}
		);

		test.false(
			"缺少 catch 或 finally",
			"try{}123;;",
			function(parser, err){
				return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字";
			}
		);

		test.false(
			"缺少的异常变量",
			"try{}catch(){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ClosingParenTag ? "" : "没有识别出结束小括号";
			}
		);

		test.false(
			"过多的异常变量",
			"try{}catch(e, b){}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出逗号";
			}
		);

		test.groupEnd();
	}
);