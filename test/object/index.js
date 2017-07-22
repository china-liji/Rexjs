test.unit(
	[ "object/source.js" ],
	function(source){
		this.group("对象测试");

		this.true("空对象", "!{}");
		this.true("单个标识符属性名", "!{ a: 1 }");
		this.true("多个标识符属性名", "!{ a: 1, b: 2, c: 3 }");
		this.true("多个标识符属性名并带有一一对应的逗号", "!{ a: 1, b: 2, c: 3, }");
		this.true("单个关键字属性名", "!{ var: 1 }");
		this.true("多个关键字属性名", "!{ var: 1, switch: 2 + 3 / 4 * (7), throw: 99 }");
		this.true("多个关键字属性名并带有一一对应的逗号", "!{ var: 1, switch: 2 + 3 / 4 * (7), throw: 99, }");
		this.true("单个简写属性名", "!{ a }");
		this.true("多个简写属性名", "!{ a, b, c }");
		this.true("多个简写属性名并带有一一对应的逗号", "!{ a, b, c, }");
		this.true("单个字符串属性名", "!{ 'a': 1 }");
		this.true("多个字符串属性名", "!{ 'a': 1, \"b\": 2, 'c': 3 }");
		this.true("多个字符串属性名并带有一一对应的逗号", "!{ 'a': 1, \"b\": 2, 'c': 3, }");
		this.true("单个数字属性名", "!{ 1: 1 }");
		this.true("多个数字属性名", "!{ 1: 1, 2.22333: 2, 3: 3, 1e+1: 5, 0x1234567890abcdef: 6, .14e+1: 7, 0b10: 8 }");
		this.true("多个字符串属性名并带有一一对应的逗号", "!{ 1: 1, 2: 2, 3: 3, }");
		this.true("单个简写方法", "!{ a(){} }");
		this.true("多个简写方法", "!{ a(){}, b(){} }");
		this.true("多个简写方法并带有一一对应的逗号", "!{ a(){}, b(){}, c(){} }");
		this.true("单个计算式属性", "!{ [1 + 2]: 1 }");
		this.true("多个计算式属性", "!{ [1 + 2]: 1, [2 + 3]: function(){} }");
		this.true("多个计算式属性并带有一一对应的逗号", "!{ [1 + 2]: 1, [2 + 3]: function(){}, [4 + 5 / 6..valueOf()]: 100 }");
		this.true("单个计算式方法", "!{ [1 + 2](){} }");
		this.true("多个计算式方法", "!{ [1 + 2](){}, [2 + 3](){} }");
		this.true("多个计算式方法并带有一一对应的逗号", "!{ [1 + 2](){}, [2 + 3](){}, [4 + 5 / 6..valueOf()](){} }");
		this.true("单个访问器", "!{ get a(){} }");
		this.true("多个访问器", "!{ get a(){}, set a(value){} }");
		this.true("多个访问器并带有一一对应的逗号", "!{ get a(){}, set a(value){}, get b(){}, }");
		this.true("其他形式的访问器", "!{ get ''(){}, get 8(){}, set [1 + 2 + 3](v){}, set var(v){}, get 1(){} }");
		this.true("访问器作为属性名", "!{ get : 1 }");
		this.true("访问器作为简写属性名", "!{ set : 1 }");
		this.true("访问器作为简写函数名", "!{ set(){} }");
		this.true("带访问器属性名的访问器", "!{ set set(a){} }");
		this.true("单项属性默认值", "!{ a = 1 }");
		this.true("多项属性默认值", "!{ a = 1, b = c = d + 5 + 6 }");
		this.true("所有情况属性名并存", "!{ a, b: 2, g = 1, h = i = u + 5 + 6, var: 3, c, for: 4, d: 5, 'e': 6, if: 7, 8: 8, 9.333: 9, get ''(){}, set [1 + 2 + 3](v){}, set var(v){}, get 1(){}, }");

		this.true("复杂的测试", source, true);

		this.false(
			"非法属性名",
			"!{ +: 1 }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.PlusTag ? "" : "没有识别出加号";
			}
		);

		this.false(
			"2属性间缺少逗号",
			"!{ a: 1\n 3: 2 }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字";
			}
		);

		this.false(
			"负值属性名",
			"!{ -1: 1 }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.NegationTag ? "" : "没有识别出减号";
			}
		);

		this.false(
			"逗号后面接非法属性名",
			"!{ var: 1, +: 2 }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.PlusTag ? "" : "没有识别出加号";
			}
		);

		this.false(
			"简写关键字属性",
			"!{ var }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"简写数字属性",
			"!{ 1 }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"简写字符串属性",
			"!{ 'abc' }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"计算式名称带逗号",
			"!{ [1,2]: 3 }",
			function(parser, err){
				return err.context.content === "," ? "" : "没有识别出逗号";
			}
		);

		this.false(
			"简写方法后面接其他非法字符",
			"!{ a(){}() }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.OpenParenTag ? "" : "没有识别出非法字符";
			}
		);

		this.false(
			"计算式属性名后面接其他非法字符",
			"!{ [1] + 1: 1 }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.PlusTag ? "" : "没有识别出非法字符";
			}
		);

		this.false(
			"数字默认值",
			"!{ 1 = 5 }",
			function(parser, err){
				return err.context.content === "=" ? "" : "数字属性不能设置默认值";
			}
		);
		
		this.false(
			"字符串默认值",
			"!{ '123' = 5 }",
			function(parser, err){
				return err.context.content === "=" ? "" : "字符串属性不能设置默认值";
			}
		);
		
		this.false(
			"关键字默认值",
			"!{ null = 5 }",
			function(parser, err){
				return err.context.content === "=" ? "" : "关键字属性不能设置默认值";
			}
		);

		this.false(
			"计算式默认值",
			"!{ [null] = 5 }",
			function(parser, err){
				return err.context.content === "=" ? "" : "计算式属性不能设置默认值";
			}
		);

		this.false(
			"默认值作为属性名",
			"!{ a = b : 2 }",
			function(parser, err){
				return err.context.content === ":" ? "" : "没有识别出冒号";
			}
		);
		
		this.false(
			"默认值表达式不完整",
			"!{ a =  }",
			function(parser, err){
				return err.context.content === "}" ? "" : "没有识别出结束大括号";
			}
		);

		this.false(
			"访问器默认值",
			"!{ get a = 5(){} }",
			function(parser, err){
				return err.context.content === "=" ? "" : "访问器属性不能设置默认值";
			}
		);

		this.false(
			"访问器缺少函数参数及主体",
			"!{ get var, }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出非法字符";
			}
		);

		this.false(
			"访问器后面接冒号",
			"!{ get var(){}: 1 }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ColonTag ? "" : "没有识别出非法字符";
			}
		);

		this.false(
			"带参数的获取器",
			"!{ get var(a){} }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.IdentifierTag ? "" : "没有识别出访问器参数";
			}
		);

		this.false(
			"缺少参数的设置器",
			"!{ set var(){} }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.OpenArgumentsTag ? "" : "没有识别出访问器参数个数";
			}
		);

		this.false(
			"只有逗号",
			"!{ , }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出逗号标签";
			}
		);

		this.false(
			"计算式缺少值",
			"({[a]})",
			function(parser, err){
				return err.context.content === "}" ? "" : "计算式缺少值";
			}
		);

		this.false(
			"多个逗号",
			"!{ a,, }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出逗号标签";
			},
			function(parser, err){
				return err.context.position.column === 5 ? "" : "逗号位置识别错误";
			}
		);

		this.false(
			"带多个参数的设置器",
			"!{ set var(a, b){} }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.IdentifierTag ? "" : "没有识别出访问器多个参数";
			},
			function(parser, err){
				return err.context.content === "b" ? "" : "没有正确识别出参数名";
			}
		);

		this.false(
			"多个冒号",
			"!{ a: b: c }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.ColonTag ? "" : "没有识别出冒号";
			},
			function(parser, err){
				return err.context.position.column === 7 ? "" : "冒号位置不正确";
			}
		);

		this.false(
			"数字属性名后面接其他",
			"!{ 1e+10a: 1 }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.LabelTag ? "" : "没有识别出标记标签";
			},
			function(parser, err){
				return err.context.content === "a" ? "" : "没有找到错误的标识符";
			}
		);

		this.false(
			"二进制数字属性名后面接其他",
			"!{ 0b01a: 1 }",
			function(parser, err){
				return err.context.tag instanceof Rexjs.LabelTag ? "" : "没有识别出标记标签";
			},
			function(parser, err){
				return err.context.content === "a" ? "" : "没有找到错误的标识符";
			}
		);

		this.groupEnd();
	}
);