test.unit(
	[ "spread/source.js" ],
	function(source){
		test.group("拓展符测试");

		test.true("最简单的拓展符", "a(...[])");
		test.true("最后一个参数带拓展符", "a(x, y, ...z)");
		test.true("中间参数带拓展符", "a(x, ...[], y, ...z, s)");

		test.true("复杂的测试", source, true);

		test.false(
			"错误的使用拓展符",
			"...(1,2,3)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.SpreadTag ? "" : "没有识别出错误的拓展符";
			}
		);

		test.false(
			"函数调用中，连续的拓展符",
			"fn(1, ... ...[], ...[])",
			function(parser, err){
				return err.context.tag instanceof Rexjs.SpreadTag ? "" : "没有识别出错误的拓展符"; 
			},
			function(parser, err){
				return err.context.position.column === 10 ? "" : "没有正确的识别出错误拓展符位置";
			}
		);

		test.false(
			"拓展符在参数之后",
			"fn(1 ...)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.DotTag ? "" : "没有识别出错误的点标签";
			}
		);

		test.false(
			"没有带参数的拓展符",
			"fn(1, ..., 2)",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出错误的逗号";
			}
		);

		test.groupEnd();
	}
);