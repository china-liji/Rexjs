test.unit(
	[ "destructuring/source.js" ],
	function(source){
		this.group("解构表达式测试");

		this.true("空的数组解构", "[] = arr");
		this.true("单项数组解构", "[a] = arr");
		this.true("访问器项数组解构", "[function(){}.a, window.b] = arr");
		this.true("多项数组解构", "[a, b, c, d] = arr");
		this.true("带空项的数组解构", "[, a, , b, c, ,] = arr");
		this.true("全空项的数组解构", "[,,,,] = arr");
		this.true("多层数组解构", "[a, [window.b, [c], ], window.d, ] = arr");
		this.true("连等解构", "[] = [a, [window.b, [c], ], window.d, ] = $ = [x, [y, ], , z, ] = arr");
		
		this.true("声明解构 - 空的数组解构", "var [] = arr");
		this.true("声明解构 - 单项数组解构", "var [a] = arr");
		this.true("声明解构 - 多项数组解构", "var [a, b, c, d] = arr");
		this.true("声明解构 - 带空项的数组解构", "var [, a, , b, c, ,] = arr");
		this.true("声明解构 - 全空项的数组解构", "var [,,,,] = arr");
		this.true("声明解构 - 多层数组解构", "var [a, [b, [c], ], d, ] = arr");
		this.true("var 声明解构 - 连等解构", "var [a, [, [c], ], , ] = $ = [, window.b, x, [y, window.d], , z, ] = arr");
		this.true("let 声明解构 - 连等解构", "let [a, [, [c], ], , ] = $ = [, window.b, x, [y, window.d], , z, ] = arr");
		this.true("const 声明解构 - 连等解构", "const [a, [, [c], ], , ] = $ = [, window.b, x, [y, window.d], , z, ] = arr");
		
		this.true("运算结果测试", source, true);

		this.false(
			"非标识符的解构 - 数字",
			"[1] = arr",
			function(parser, err){
				return err.context.content === "1" ? "" : "没有识别出数字";
			}
		);

		this.false(
			"非标识符的解构 - 字符串",
			"['123'] = arr",
			function(parser, err){
				return err.context.content === "'123'" ? "" : "没有识别出字符串";
			}
		);

		this.false(
			"非标识符的解构 - 布尔",
			"[true] = arr",
			function(parser, err){
				return err.context.content === "true" ? "" : "没有识别出布尔";
			}
		);

		this.false(
			"非标识符的解构 - 函数",
			"[function(){}] = arr",
			function(parser, err){
				return err.context.content === "function" ? "" : "没有识别出函数";
			}
		);

		this.false(
			"非标识符的解构 - 关键字",
			"[null] = arr",
			function(parser, err){
				return err.context.content === "null" ? "" : "没有识别出关键字";
			}
		);

		this.false(
			"非标识符的解构 - 小括号",
			"[(a)] = arr",
			function(parser, err){
				return err.context.content === "(" ? "" : "没有识别出小括号";
			}
		);

		this.false(
			"带运算的解构项",
			"[a + 1] = arr",
			function(parser, err){
				return err.context.content === "+" ? "" : "没有识别出运算符";
			}
		);

		this.false(
			"带运算的解构",
			"[a] + [b] = arr",
			function(parser, err){
				return err.context.content === "=" ? "" : "没有识别出赋值运算符";
			}
		);
		
		this.false(
			"声明解构 - 非标识符的解构 - 数字",
			"var [1] = arr",
			function(parser, err){
				return err.context.content === "1" ? "" : "没有识别出数字";
			}
		);

		this.false(
			"声明解构 - 非标识符的解构 - 字符串",
			"var ['123'] = arr",
			function(parser, err){
				return err.context.content === "'123'" ? "" : "没有识别出字符串";
			}
		);

		this.false(
			"声明解构 - 非标识符的解构 - 布尔",
			"var [true] = arr",
			function(parser, err){
				return err.context.content === "true" ? "" : "没有识别出布尔";
			}
		);

		this.false(
			"声明解构 - 非标识符的解构 - 函数",
			"var [function(){}] = arr",
			function(parser, err){
				return err.context.content === "function" ? "" : "没有识别出函数";
			}
		);

		this.false(
			"声明解构 - 非标识符的解构 - 关键字",
			"var [null] = arr",
			function(parser, err){
				return err.context.content === "null" ? "" : "没有识别出关键字";
			}
		);

		this.false(
			"声明解构 - 非标识符的解构 - 小括号",
			"var [(a)] = arr",
			function(parser, err){
				return err.context.content === "(" ? "" : "没有识别出小括号";
			}
		);

		this.false(
			"声明解构 - 非标识符的解构 - 访问器",
			"var [window.a] = arr",
			function(parser, err){
				return err.context.content === "." ? "" : "没有识别出访问器";
			}
		);

		this.false(
			"声明解构 - 带运算的解构项",
			"var [a + 1] = arr",
			function(parser, err){
				return err.context.content === "+" ? "" : "没有识别出运算符";
			}
		);

		this.false(
			"声明解构 - 带运算的解构",
			"var [a] + [b] = arr",
			function(parser, err){
				return err.context.content === "+" ? "" : "没有识别出运算符";
			}
		);

		this.false(
			"声明解构 - 数组解构中重复定义",
			"let [a, a] = arr",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 8 ? "" : "没有找到正确的错误地方";
			}
		);

		this.false(
			"声明解构 - 常量赋值",
			"const [a] = arr;a = 1;",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 16 ? "" : "没有找到正确的错误地方";
			}
		);

		this.groupEnd();
	}
);