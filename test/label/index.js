test.unit(
	[ "label/source.js" ],
	function(source){
		this.group("label 标记测试");

		this.true("简单的标记语句", "hello:true");
		this.true("空的标记语句", "hello:;");
		this.true("连续的标记语句", "a:b:c:d:e:f:break a");
		this.true("被中断的标记语句", "label:break label");

		this.true("运算测试", source, true);

		this.false(
			"不完整的标记语句",
			"label:",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag ? "" : "没有捕获文件结束标签";
			}
		);

		this.false(
			"错误的关键字标记名称",
			"true:;",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ColonTag ? "" : "没有捕获错误的冒号";
			}
		);

		this.false(
			"跨闭包的标记",
			"a:{function fn(){ { break a } }}",
			function(parser, err){
				return err.context.tag instanceof Rexjs.LabelledIdentifierTag ? "" : "没有识别出标记标识符";
			}
		);

		this.groupEnd();
	}
);