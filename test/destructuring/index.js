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
		this.true("省略项解构", "[a, b, , c, ...d] = arr");
		this.true("多层数组解构", "[a, [window.b, [c], ], window.d, ] = arr");
		this.true("嵌套对象解构的数组解构", "[ { a, b: [c] }, x, { y } ] = arr");
		this.true("连等解构", "[] = [a, [window.b, [c = 100,], ], window.d, ] = $ = [x, [y, ], , z, ] = arr");
		

		this.true("数组声明解构 - 空的数组解构", "var [] = arr");
		this.true("数组声明解构 - 单项数组解构", "var [a] = arr");
		this.true("数组声明解构 - 默认值数组解构", "[,a = 1,,, b = 2 + 3 + window.c, c = 100, ] = arr");
		this.true("数组声明解构 - 多项数组解构", "var [a, b, c, d] = arr");
		this.true("数组声明解构 - 带空项的数组解构", "var [, a, , b, c, ,] = arr");
		this.true("数组声明解构 - 全空项的数组解构", "var [,,,,] = arr");
		this.true("数组声明解构 - 省略项解构", "var [a, b, , c, ...d] = arr");
		this.true("数组声明解构 - 多层数组解构", "var [a, [b, [c], ], d, ] = arr");
		this.true("数组声明解构 - 嵌套对象解构的数组解构", "var [ { a, b: [c] }, x, { y } ] = arr");
		this.true("var 数组声明解构 - 连等解构", "var [a, [, [c], ], , ] = $ = [, window.b, x, [y, window.d], , z, ] = arr");
		this.true("let 数组声明解构 - 连等解构", "let [a, [, [c], ], , ] = $ = [, window.b, x, [y, window.d], , z, ] = arr");
		this.true("const 数组声明解构 - 连等解构", "const [a, [, [c = 100, { x, y = 5, z: [] }], ], d = 4, ] = $ = [, window.b, x1, [y1, window.d], , z1, ] = arr");
		

		this.true("空的对象解构", "({} = obj)");
		this.true("简写单项对象解构", "({ a } = obj)");
		this.true("变量省略项解构", "({a, b, c, ...d} = obj)");
		this.true("属性省略项解构", "({a, b, c, ...window.d} = obj)");

		this.true("键值对单项对象解构 - 标识符名称", "({ a: b } = obj)");
		this.true("键值对单项对象解构 - 字符串名称", "({ 'a': b } = obj)");
		this.true("键值对单项对象解构 - 数字名称", "({ 1: b } = obj)");
		this.true("键值对单项对象解构 - 关键字名称", "({ null: b } = obj)");
		this.true("键值对单项对象解构 - 计算式名称", "({ ['hello']: b } = obj)");
		this.true("键值对单项对象解构 - 进制名称", "({ 0b10101: b } = obj)");
		this.true("键值对单项对象解构 - 属性访问器值", "({ a: (function(){}.toString() + '123').a } = obj)");
		
		this.true("简写属性默认值对象解构", "({ a = 5, b = c = d = 5 } = obj)");

		this.true("默认值键值对单项对象解构 - 标识符名称", "({ a: b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 字符串名称", "({ 'a': b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 数字名称", "({ 1: b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 关键字名称", "({ null: b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 计算式名称", "({ ['hello']: b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 进制名称", "({ 0b10101: b = 5 } = obj)");
		this.true("默认值键值对单项对象解构 - 属性访问器值", "({ a: (function(){}.toString() + '123').a = 5 } = obj)");

		this.true("嵌套数组解构的对象解构", "({ a: [a] } = obj)");
		this.true("嵌套对象解构的对象解构", "({ a: {a} } = obj)");

		this.true("多项对象解构", "({ a, 2: b = 99, c, 'x': x = 1, ['y']: window.y, null: window.value = 1, 3: { c: [d = 100] }, ...x } = obj)");


		this.true("对象声明解构 - 空的对象解构", "var {} = obj");
		this.true("对象声明解构 - 简写单项对象解构", "var { a, } = obj");
		this.true("对象声明解构 - 省略项解构", "var {a, b, c, ...d} = obj");
		this.true("对象声明解构 - let - 简写单项对象解构", "let { a } = obj");
		this.true("对象声明解构 - const - 简写单项对象解构", "const { a, } = obj");

		this.true("对象声明解构 - 键值对单项对象解构 - 标识符名称", "var { a: b, } = obj");
		this.true("对象声明解构 - 键值对单项对象解构 - 字符串名称", "var { 'a': b } = obj");
		this.true("对象声明解构 - 键值对单项对象解构 - 数字名称", "var { 1: b } = obj");
		this.true("对象声明解构 - 键值对单项对象解构 - 关键字名称", "var { null: b } = obj");
		this.true("对象声明解构 - 键值对单项对象解构 - 计算式名称", "var { ['hello']: b } = obj");
		
		this.true("对象声明解构 - 键值对单项对象解构 - 进制名称", "var { 0b10101: b } = obj");
		
		this.true("对象声明解构 - 简写属性默认值对象解构", "var { a = 5, b = c = d = 5, } = obj");

		this.true("对象声明解构 - 默认值键值对单项对象解构 - 标识符名称", "var { a: b = 5 } = obj");
		this.true("对象声明解构 - 默认值键值对单项对象解构 - 字符串名称", "var { 'a': b = 5 } = obj");
		this.true("对象声明解构 - 默认值键值对单项对象解构 - 数字名称", "var { 1: b = 5 } = obj");
		this.true("对象声明解构 - 默认值键值对单项对象解构 - 关键字名称", "var { null: b = 5 } = obj");
		this.true("对象声明解构 - 默认值键值对单项对象解构 - 计算式名称", "var { ['hello']: b = 5 } = obj");
		this.true("对象声明解构 - 默认值键值对单项对象解构 - 进制名称", "var { 0b10101: b = 5 } = obj");
		
		this.true("对象声明解构 - 嵌套数组解构的对象解构", "let { a: [], } = obj");
		this.true("对象声明解构 - 嵌套对象解构的对象解构", "const { a: {} } = obj");

		this.true("对象声明解构 - 多项对象解构", "var { a, 2: b = 99, c, 'x': x = 1, ['y']: [{y}], null: value = 1, 3: { c: [d = 100] }, ...x } = obj");

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
			"非赋值表达式的省略项",
			"[...[]] = arr",
			function(parser, err){
				return err.context.content !== "[";
			},
			function(parser, err){
				return err.context.position.column !== 4;
			}
		);

		this.false(
			"非最后一项的省略项",
			"[...a, b] = arr",
			function(parser, err){
				return err.context.content !== "...";
			}
		);

		this.false(
			"常量省略项",
			"const a = 1;[...a] = arr",
			function(parser, err){
				return err.context.content !== "a";
			},
			function(parser, err){
				return err.context.position.column !== 16;
			}
		);

		this.false(
			"默认值省略项",
			"[...a = 5] = arr",
			function(parser, err){
				return err.context.content !== "=";
			}
		);
		
		this.false(
			"数组声明解构 - 解构表达式不完整",
			"var [a]",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag === false;
			}
		);
		
		this.false(
			"数组声明解构 - 非标识符的解构 - 数字",
			"var [1] = arr",
			function(parser, err){
				return err.context.content === "1" ? "" : "没有识别出数字";
			}
		);

		this.false(
			"数组声明解构 - 非标识符的解构 - 字符串",
			"var ['123'] = arr",
			function(parser, err){
				return err.context.content === "'123'" ? "" : "没有识别出字符串";
			}
		);

		this.false(
			"数组声明解构 - 非标识符的解构 - 布尔",
			"var [true] = arr",
			function(parser, err){
				return err.context.content === "true" ? "" : "没有识别出布尔";
			}
		);

		this.false(
			"数组声明解构 - 非标识符的解构 - 函数",
			"var [function(){}] = arr",
			function(parser, err){
				return err.context.content === "function" ? "" : "没有识别出函数";
			}
		);

		this.false(
			"数组声明解构 - 非标识符的解构 - 关键字",
			"var [null] = arr",
			function(parser, err){
				return err.context.content === "null" ? "" : "没有识别出关键字";
			}
		);

		this.false(
			"数组声明解构 - 非标识符的解构 - 小括号",
			"var [(a)] = arr",
			function(parser, err){
				return err.context.content === "(" ? "" : "没有识别出小括号";
			}
		);

		this.false(
			"数组声明解构 - 非标识符的解构 - 访问器",
			"var [window.a] = arr",
			function(parser, err){
				return err.context.content === "." ? "" : "没有识别出访问器";
			}
		);

		this.false(
			"数组声明解构 - 带运算的解构项",
			"var [a + 1] = arr",
			function(parser, err){
				return err.context.content === "+" ? "" : "没有识别出运算符";
			}
		);

		this.false(
			"数组声明解构 - 带赋值运算的多层解构项",
			"var [[a] = 1] = arr",
			function(parser, err){
				return err.context.content === "=" ? "" : "没有识别出运算符";
			},
			function(parser, err){
				return err.context.position.column === 9 ? "" : "没有识别出位置";
			}
		);

		this.false(
			"数组声明解构 - 带非赋值运算的多层解构项",
			"var [[a] + 1] = arr",
			function(parser, err){
				return err.context.content === "+" ? "" : "没有识别出运算符";
			}
		);

		this.false(
			"数组声明解构 - 带运算的解构",
			"var [a] + [b] = arr",
			function(parser, err){
				return err.context.content === "+" ? "" : "没有识别出运算符";
			}
		);

		this.false(
			"数组声明解构 - 数组解构中重复定义",
			"let [a, a] = arr",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 8 ? "" : "没有找到正确的错误地方";
			}
		);

		this.false(
			"数组声明解构 - 常量赋值",
			"const [a] = arr;a = 1;",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 16 ? "" : "没有找到正确的错误地方";
			}
		);

		this.false(
			"数组声明解构 - 常量变量名作为解构项",
			"const a = 1;[a] = [];",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 13 ? "" : "没有找到正确的错误地方";
			}
		);
		
		this.false(
			"数组声明解构 - 非赋值表达式的省略项",
			"var [...[]] = arr",
			function(parser, err){
				return err.context.content !== "[";
			},
			function(parser, err){
				return err.context.position.column !== 8;
			}
		);

		this.false(
			"数组声明解构 - 非最后一项的省略项",
			"var [...a,] = arr",
			function(parser, err){
				return err.context.content !== "...";
			}
		);

		this.false(
			"数组声明解构 - 重复声明的省略项",
			"let a;var [...a] = arr",
			function(parser, err){
				return err.context.content !== "a";
			},
			function(parser, err){
				return err.context.position.column !== 14;
			}
		);

		this.false(
			"数组声明解构 - 默认值省略项",
			"var [...a = 5] = arr",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"数组声明解构 - 属性访问器省略项",
			"var [...window.a] = arr",
			function(parser, err){
				return err.context.content !== ".";
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

		this.false(
			"对象解构 - 简写常量变量名作为对象解构项",
			"const a = 1;({ a } = {});",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 15 ? "" : "没有找到正确的错误地方";
			}
		);

		this.false(
			"对象解构 - 简写常量变量名作为对象解构项 - 默认值方式",
			"const a = 1;({ a = 5 } = {});",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 15 ? "" : "没有找到正确的错误地方";
			}
		);

		this.false(
			"对象解构 - 键值对常量变量名作为对象解构项",
			"const a = 1;({ 1: a } = {});",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 18 ? "" : "没有找到正确的错误地方";
			}
		);

		this.false(
			"对象解构 - 非赋值表达式的省略项",
			"({...{}} = obj)",
			function(parser, err){
				return err.context.content !== "{";
			},
			function(parser, err){
				return err.context.position.column !== 5;
			}
		);

		this.false(
			"对象解构 - 非最后一项的省略项",
			"({...a, b} = obj)",
			function(parser, err){
				return err.context.content !== "...";
			}
		);

		this.false(
			"对象解构 - 常量省略项",
			"const a = 1;({...a} = obj);",
			function(parser, err){
				return err.context.content !== "a";
			},
			function(parser, err){
				return err.context.position.column !== 17;
			}
		);

		this.false(
			"对象解构 - 默认值省略项",
			"({...a = 5} = obj)",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"对象声明解构 - 出现非法属性 - 数字",
			"var { 1 } = obj",
			function(parser, err){
				return err.context.content !== "}";
			}
		);

		this.false(
			"对象声明解构 - 出现非法属性 - 二进制数字",
			"var { 0b10 } = obj",
			function(parser, err){
				return err.context.content !== "}";
			}
		);

		this.false(
			"对象声明解构 - 出现非法属性 - 八进制数字",
			"var { 0o12345670 } = obj",
			function(parser, err){
				return err.context.content !== "}";
			}
		);

		this.false(
			"对象声明解构 - 出现非法属性 - 关键字",
			"var { null } = obj",
			function(parser, err){
				return err.context.content !== "}";
			}
		);

		this.false(
			"对象声明解构 - 出现非法属性 - 计算式",
			"var { [123] } = obj",
			function(parser, err){
				return err.context.content !== "}";
			}
		);

		this.false(
			"对象声明解构 - 出现非法属性 - 字符串",
			"var { 'string' } = obj",
			function(parser, err){
				return err.context.content !== "}";
			}
		);

		this.false(
			"对象声明解构 - 出现简写函数 - 数字函数名",
			"var { 1(){} } = obj",
			function(parser, err){
				return err.context.content !== "(";
			}
		);

		this.false(
			"对象声明解构 - 出现简写函数 - 二进制数字函数名",
			"var { 0b0101(){} } = obj",
			function(parser, err){
				return err.context.content !== "(";
			}
		);

		this.false(
			"对象声明解构 - 出现简写函数 - 八进制数字函数名",
			"var { 0o01234567(){} } = obj",
			function(parser, err){
				return err.context.content !== "(";
			}
		);

		this.false(
			"对象声明解构 - 出现简写函数 - 字符串函数名",
			"var { 'string'(){} } = obj",
			function(parser, err){
				return err.context.content !== "(";
			}
		);

		this.false(
			"对象声明解构 - 出现简写函数 - 关键字函数名",
			"var { null(){} } = obj",
			function(parser, err){
				return err.context.content !== "(";
			}
		);

		this.false(
			"对象声明解构 - 出现简写函数 - 计算式函数名",
			"var { [1](){} } = obj",
			function(parser, err){
				return err.context.content !== "(";
			}
		);
		
		this.false(
			"对象声明解构 - 属性值不是变量名 - 属性访问器",
			"var { a: window.a } = obj",
			function(parser, err){
				return err.context.content !== ".";
			}
		);
		
		this.false(
			"对象声明解构 - 属性值不是变量名 - 数字",
			"var { a: 1 } = obj",
			function(parser, err){
				return err.context.content !== "1";
			}
		);
		
		this.false(
			"对象声明解构 - 属性值不是变量名 - 字符串",
			"var { 'a': '1' } = obj",
			function(parser, err){
				return err.context.content !== "'1'";
			}
		);
		
		this.false(
			"对象声明解构 - 属性值不是变量名 - 其他表达式",
			"var { 1: a + '1' / 3 } = obj",
			function(parser, err){
				return err.context.content !== "+";
			}
		);
		
		this.false(
			"对象声明解构 - 简写属性默认值不完整",
			"var { a = } = obj",
			function(parser, err){
				return err.context.content !== "}";
			}
		);
		
		this.false(
			"对象声明解构 - 键值对属性默认值不完整",
			"var { a: b = } = obj",
			function(parser, err){
				return err.context.content !== "}";
			}
		);
		
		this.false(
			"对象声明解构 - 解构表达式不完整",
			"var { a }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.FileEndTag === false;
			}
		);

		this.false(
			"对象声明解构 - 重复定义",
			"var a;let { a } = obj",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 12 ? "" : "没有找到正确的错误地方";
			}
		);
		
		this.false(
			"对象声明解构 - 解构中重复定义",
			"let { a, a } = obj",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 9 ? "" : "没有找到正确的错误地方";
			}
		);

		this.false(
			"对象声明解构 - 常量赋值",
			"const { a } = obj;a = 1;",
			function(parser, err){
				return err.context.content === "a" ? "" : "没有识别出重复定义的 a";
			},
			function(parser, err){
				return err.context.position.column === 18 ? "" : "没有找到正确的错误地方";
			}
		);
		
		this.false(
			"对象声明解构 - 非赋值表达式的省略项",
			"var {...{}} = obj",
			function(parser, err){
				return err.context.content !== "{";
			},
			function(parser, err){
				return err.context.position.column !== 8;
			}
		);

		this.false(
			"对象声明解构 - 非最后一项的省略项",
			"var {...a,} = obj",
			function(parser, err){
				return err.context.content !== "...";
			}
		);

		this.false(
			"对象声明解构 - 重复声明的省略项",
			"let a;var {...a} = obj",
			function(parser, err){
				return err.context.content !== "a";
			},
			function(parser, err){
				return err.context.position.column !== 14;
			}
		);

		this.false(
			"对象声明解构 - 默认值省略项",
			"var {...a = 5} = obj",
			function(parser, err){
				return err.context.content !== "=";
			}
		);

		this.false(
			"对象声明解构 - 属性访问器省略项",
			"var {...window.a} = obj",
			function(parser, err){
				return err.context.content !== ".";
			}
		);

		this.groupEnd();
	}
);