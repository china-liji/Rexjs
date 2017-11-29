test.unit(
	[ "question-assignment/source.js" ],
	function(source){
		this.group("疑问赋值测试");

		this.true("基本赋值", "a?=b");
		this.true("对象赋值", "window.a?=b");
		this.true("连续赋值", "a = window.b ?= c = d ?= e ?= f + 5");

		this.true("运算测试", source, true);

		this.false(
			"符号分离",
			"a ? = b",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"缺少赋值对象",
			"?= b",
			function(parser, err){
				return err.context.content !== "?=";
			}
		);

		this.false(
			"缺少值",
			"a ?= ",
			function(parser, err){
				return !(err.context.tag instanceof Rexjs.FileEndTag);
			}
		);
	
		this.groupEnd();
	}
);