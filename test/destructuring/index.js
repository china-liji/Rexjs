test.unit(
	[ "destructuring/source.js" ],
	function(source){
		this.group("解构表达式测试");

		this.true("空的数组解构", "[] = arr");
		this.true("单项数组解构", "[a] = arr");
		this.true("默认值数组解构", "[,a = 1,,, b = 2 + 3 + window.c, c = 100, ] = arr");
		this.true("访问器项数组解构", "[function(){}.a, window.b] = arr");
		this.true("多项数组解构", "[a, b, c, d] = arr");
		this.true("带空项的数组解构", "[, a, , b, c, ,] = arr");
		this.true("全空项的数组解构", "[,,,,] = arr");
		this.true("多层数组解构", "[a, [window.b, [c], ], window.d, ] = arr");
		console.warn("嵌套对象解构的数组解构");
		this.true("连等解构", "[] = [a, [window.b, [c = 100,], ], window.d, ] = $ = [x, [y, ], , z, ] = arr");
		
		this.true("声明解构 - 空的数组解构", "var [] = arr");
		this.true("声明解构 - 单项数组解构", "var [a] = arr");
		this.true("声明解构 - 默认值数组解构", "[,a = 1,,, b = 2 + 3 + window.c, c = 100, ] = arr");
		this.true("声明解构 - 多项数组解构", "var [a, b, c, d] = arr");
		this.true("声明解构 - 带空项的数组解构", "var [, a, , b, c, ,] = arr");
		this.true("声明解构 - 全空项的数组解构", "var [,,,,] = arr");
		this.true("声明解构 - 多层数组解构", "var [a, [b, [c], ], d, ] = arr");
		this.true("var 声明解构 - 连等解构", "var [a, [, [c], ], , ] = $ = [, window.b, x, [y, window.d], , z, ] = arr");
		this.true("let 声明解构 - 连等解构", "let [a, [, [c], ], , ] = $ = [, window.b, x, [y, window.d], , z, ] = arr");
		this.true("const 声明解构 - 连等解构", "const [a, [, [c = 100,], ], d = 4, ] = $ = [, window.b, x, [y, window.d], , z, ] = arr");
		
		this.true("空的对象解构", "({} = obj)");
		this.true("简写单项对象解构", "({ a } = obj)");

		this.true("键值对单项对象解构 - 标识符名称", "({ a: b } = obj)");
		this.true("键值对单项对象解构 - 字符串名称", "({ 'a': b } = obj)");
		this.true("键值对单项对象解构 - 数字名称", "({ 1: b } = obj)");
		this.true("键值对单项对象解构 - 关键字名称", "({ null: b } = obj)");
		this.true("键值对单项对象解构 - 计算式名称", "({ ['hello']: b } = obj)");
		this.true("键值对单项对象解构 - 进制名称", "({ 0b10101: b } = obj)");
		this.true("键值对单项对象解构 - 属性访问器值", "({ a: (function(){}.toString() + '123').a } = obj)");
		
		// this.true("默认值对象解构", "({a = 5} = obj)");
		console.warn("默认值对象解构");
		
		this.true("默认值键值对单项对象解构 - 标识符名称", "({ a: b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 字符串名称", "({ 'a': b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 数字名称", "({ 1: b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 关键字名称", "({ null: b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 计算式名称", "({ ['hello']: b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 进制名称", "({ 0b10101: b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 属性访问器值", "({ a: (function(){}.toString() + '123').a = 5 } = obj)");
		
		this.true("嵌套数组解构的对象解构", "({ a: [a] } = obj)");
		this.true("嵌套对象解构的对象解构", "({ a: {a} } = obj)");

		this.true("多项对象解构", "({ a, 2: b, 'x': x = 1, ['y']: window.y, null: window.value = 1, 3: { c: [d = 100] } } = obj)");

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
			"带默认值的多层解构",
			"[[a] = 1] = b",
			function(parser, err){
				return err.context.content === "=" ? "" : "没有识别出错误的赋值符号";
			},
			function(parser, err){
				return err.context.position.column === 5 ? "" : "没有正确识别出错误位置";
			}
		);

		this.false(
			"带非赋值运算的解构项",
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
			"声明解构 - 带赋值运算的多层解构项",
			"var [[a] = 1] = arr",
			function(parser, err){
				return err.context.content === "=" ? "" : "没有识别出运算符";
			},
			function(parser, err){
				return err.context.position.column === 9 ? "" : "没有识别出位置";
			}
		);

		this.false(
			"声明解构 - 带非赋值运算的多层解构项",
			"var [[a] + 1] = arr",
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

		this.false(
			"声明解构 - 常量变量名作为解构项",
			"const a = 1;[a] = [];",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 13 ? "" : "没有找到正确的错误地方";
			}
		);

		this.false(
			"对象解构 - 简写的属性 - 数字",
			"({ 2 } = obj)",
			function(parser, err){
				return err.context.content === "}" ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"对象解构 - 简写的属性 - 字符串",
			"({ '2' } = obj)",
			function(parser, err){
				return err.context.content === "}" ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"对象解构 - 简写的属性 - 计算式",
			"({ ['2'] } = obj)",
			function(parser, err){
				return err.context.content === "}" ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"对象解构 - 简写的属性 - 关键字",
			"({ null } = obj)",
			function(parser, err){
				return err.context.content === "}" ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"对象解构 - 不规范的变量名 - 数字",
			"({ a: 2 } = obj)",
			function(parser, err){
				return err.context.content === "2" ? "" : "没有识别出不规范的变量名";
			}
		);
		
		this.false(
			"对象解构 - 不规范的变量名 - 字符串",
			"({ a: '2' } = obj)",
			function(parser, err){
				return err.context.content === "'2'" ? "" : "没有识别出不规范的变量名";
			}
		);
		
		this.false(
			"对象解构 - 不规范的变量名 - 关键字",
			"({ a: null } = obj)",
			function(parser, err){
				return err.context.content === "null" ? "" : "没有识别出不规范的变量名";
			}
		);
		
		this.false(
			"对象解构 - 不规范的变量名 - 非赋值二元表达式",
			"({ a: a + b } = obj)",
			function(parser, err){
				return err.context.content === "+" ? "" : "没有识别出不规范的变量名";
			}
		);

		this.false(
			"对象解构 - 不规范的变量名 - 其他表达式",
			"({ a: (!function(){} ? 1 : 2 } = obj))",
			function(parser, err){
				return err.context.content === "}" ? "" : "没有识别出不规范的变量名";
			}
		);

		this.false(
			"对象解构 - 简写方法",
			"({ a(){} } = obj)",
			function(parser, err){
				return err.context.content === "(" ? "" : "没有识别出简写方法";
			}
		);
		
		this.false(
			"对象解构 - 计算式简写方法",
			"({ ['a'](){} } = obj)",
			function(parser, err){
				return err.context.content === "(" ? "" : "没有识别出计算式简写方法";
			}
		);
		
		this.false(
			"对象解构 - 访问器方法",
			"({ get ['a'](){} } = obj)",
			function(parser, err){
				return err.context.content === "[" ? "" : "没有识别出访问器方法";
			}
		);
		
		this.false(
			"对象解构 - 带默认值的嵌套解构赋值",
			"({ a: {} = 5 } = obj)",
			function(parser, err){
				return err.context.content === "=" ? "" : "没有识别出带默认值的嵌套解构赋值";
			}
		);

		this.groupEnd();
	}
);