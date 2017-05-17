test.unit(
	[ "comment/source.js" ],
	function(source){
		this.group("注释测试");

		this.true("当行注释", "1,2,3,4 // 5");
		this.true("多行注释", "1,2,3,4/*,7,8,9\n*/,5,6");
		this.true("多行注释的换行作用", "a/*\n*/b");
		this.true("二元操作符中的多行注释", "a/*\n*/ + b");

		this.true("运算结果测试", source, true);

		this.false(
			"多行注释，但没换行",
			"a/**/b",
			function(parser, err){
				return err.context.content === "b" ? "" : "没有捕获连续的表达式";
			}
		);

		this.false(
			"多行注释后面的后置一元操作符",
			"a/*\n*/++",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有捕获错误的文件结束符";
			}
		);

		this.groupEnd();
	}
);