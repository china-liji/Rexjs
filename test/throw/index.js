test.unit(
	[],
	function(){
		test.group("throw 语句测试");

		test.true("最简单的语句", "throw a");
		test.true("最注释的语句", "throw /**/  a");
		test.true("带运算的语句", "throw !window.a + 'abc' - str / (b)");

		test.false(
			"带换行符的语句",
			"throw \n 123",
			function(parser, err){
				return err.context.tag instanceof Rexjs.IllegalLineTerminatorTag ? "" : "没有正确的匹配到换行符";
			}
		);

		test.false(
			"注释中间带换行",
			"throw /**/  \n /**/ 123",
			function(parser, err){
				return err.context.tag instanceof Rexjs.IllegalLineTerminatorTag ? "" : "没有正确的匹配到换行符";
			}
		);

		test.false(
			"带换行符注释的语句",
			"throw /* 1231321   */  /*\n*/ 123",
			function(parser, err){
				return err.context.tag instanceof Rexjs.IllegalLineTerminatorTag ? "" : "没有正确的匹配到换行符";
			}
		);

		test.false(
			"直接文件结束的语句",
			"throw",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有正确的匹配到文件结束符";
			}
		);

		test.groupEnd();
	}
);