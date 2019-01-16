test.unit(
	[],
	function(){
		function test(envConstant){
			this.true("最基本的 " + envConstant, envConstant);
			this.true("对象属性名为 " + envConstant, "var a = { a: 1, window, " + envConstant + ": 5 }");
			this.true("对象简写属性名为 " + envConstant, "var a = { a: 1, window, " + envConstant + " }");

			this.false(
				"使用 var 声明 " + envConstant,
				"var " + envConstant,
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);

			this.false(
				"使用 let 声明 " + envConstant,
				"let " + envConstant,
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);

			this.false(
				"使用 const 声明 " + envConstant,
				"const " + envConstant + " = 1",
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);

			this.false(
				"函数声明参数名为 " + envConstant,
				"function a(" + envConstant + "){}",
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);

			this.false(
				"函数表达式参数名为 " + envConstant,
				"var fn = function(" + envConstant + "){}",
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);

			this.false(
				"箭头函数参数名为 " + envConstant,
				"var fn = (" + envConstant + ") => {}",
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);

			this.false(
				"函数拓展参数名为 " + envConstant,
				"var fn = function(a, b, c, ..." + envConstant + "){}",
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);

			this.false(
				"箭头函数拓展参数名为 " + envConstant,
				"var fn = (a, b, c, ..." + envConstant + ") => {}",
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);

			this.false(
				"为 " + envConstant + "赋值",
				envConstant + " = 1;",
				function(parser, err){
					return err.context.content !== "=";
				}
			);

			this.false(
				"声明解构赋值中，属性名带 " + envConstant,
				"let { a, b, " + envConstant + " } = {};",
				function(parser, err){
					return err.context.content !== "}";
				}
			);

			this.false(
				"解构赋值中，属性名带 " + envConstant,
				"({ a, b, " + envConstant + " } = {})",
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);

			this.false(
				"声明解构赋值中，拓展属性名带 " + envConstant,
				"let { a, b, ..." + envConstant + " } = {};",
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);

			this.false(
				"解构赋值中，拓展属性名带 " + envConstant,
				"({ a, b, ..." + envConstant + " } = {})",
				function(parser, err){
					return err.context.content !== envConstant;
				}
			);
		};

		this.group("环境常量测试");

		test.call(this, "eval");
		test.call(this, "arguments");

		this.groupEnd();
	}
);