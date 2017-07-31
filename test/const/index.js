test.unit(
	[],
	function(source){
		this.group("const 关键字测试");

		this.true("最简单的 const 语句", "const a = 1");

		/*
		* 由于 const 继承 let， let 测过过的就不再测试
		* 本文件主要测试失败，即对常量的赋值
		*/

		this.false(
			"给常量赋值",
			"const x = 1, y = 2, z = 3;a = 1, b = 2, z += 1000",
			function(parser, err){
				return err.context.tag instanceof Rexjs.VariableTag ? "" : "没有识别出被赋值的常量";
			},
			function(parser, err){
				return err.context.tag instanceof Rexjs.VariableDeclarationTag ? "没有识别正确的常量" : "";
			}
		);

		this.false(
			"语句块内部重新赋值",
			"const a = 1;{{{{ a = 2 }}}}",
			function(parser, err){
				return err.context.content !== "a";
			},
			function(parser, err){
				return err.context.position.column !== 14;
			}
		);

		this.false(
			"函数内部重新赋值",
			"const a = 1;!function(){ a = 2 }",
			function(parser, err){
				return err.context.content !== "a";
			},
			function(parser, err){
				return err.context.position.column !== 25;
			}
		);

		this.false(
			"常量递增",
			"const a = 1;++a",
			function(parser, err){
				return err.context.tag instanceof Rexjs.VariableTag ? "" : "没有识别出被赋值的常量";
			},
			function(parser, err){
				return err.context.tag instanceof Rexjs.VariableDeclarationTag ? "没有识别正确的常量" : "";
			}
		);

		this.false(
			"没有初始值的常量",
			"const x = 1, y = 2, z",
			function(parser, err){
				return err.context.tag instanceof Rexjs.VariableDeclarationTag ? "" : "没有识别正确的常量";
			},
			function(parser, err){
				return err.context.content === "z" ? "" : "没有识别到正确的常量";
			}
		);

		this.groupEnd();
	}
);