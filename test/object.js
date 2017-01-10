void function(SimpleTest, test){

test.group("对象测试");

test.true("空对象", "!{}");
test.true("单个标识符属性名", "!{ a: 1 }");
test.true("多个标识符属性名", "!{ a: 1, b: 2, c: 3 }");
test.true("多个标识符属性名并带有一一对应的逗号", "!{ a: 1, b: 2, c: 3, }");
test.true("单个关键字属性名", "!{ var: 1 }");
test.true("多个关键字属性名", "!{ var: 1, switch: 2 + 3 / 4 * (7), throw: 99 }");
test.true("多个关键字属性名并带有一一对应的逗号", "!{ var: 1, switch: 2 + 3 / 4 * (7), throw: 99, }");
test.true("单个简写属性名", "!{ a }");
test.true("多个简写属性名", "!{ a, b, c }");
test.true("多个简写属性名并带有一一对应的逗号", "!{ a, b, c, }");
test.true("单个字符串属性名", "!{ 'a': 1 }");
test.true("多个字符串属性名", "!{ 'a': 1, \"b\": 2, 'c': 3 }");
test.true("多个字符串属性名并带有一一对应的逗号", "!{ 'a': 1, \"b\": 2, 'c': 3, }");
test.true("单个数字属性名", "!{ 1: 1 }");
test.true("多个数字属性名", "!{ 1: 1, 2.22333: 2, 3: 3, 1e+1: 5, 0x1234567890abcdef: 6, .14e+1: 7, 0b10: 8 }");
test.true("多个字符串属性名并带有一一对应的逗号", "!{ 1: 1, 2: 2, 3: 3, }");
test.true("单个简写方法", "!{ a(){} }");
test.true("多个简写方法", "!{ a(){}, b(){} }");
test.true("多个简写方法并带有一一对应的逗号", "!{ a(){}, b(){}, c(){} }");
test.true("单个计算式属性", "!{ [1 + 2]: 1 }");
test.true("多个计算式属性", "!{ [1 + 2]: 1, [2 + 3]: function(){} }");
test.true("多个计算式属性并带有一一对应的逗号", "!{ [1 + 2]: 1, [2 + 3]: function(){}, [4 + 5 / 6..valueOf()]: 100 }");
test.true("单个计算式方法", "!{ [1 + 2](){} }");
test.true("多个计算式方法", "!{ [1 + 2](){}, [2 + 3](){} }");
test.true("多个计算式方法并带有一一对应的逗号", "!{ [1 + 2](){}, [2 + 3](){}, [4 + 5 / 6..valueOf()](){} }");
test.true("单个访问器", "!{ get a(){} }");
test.true("多个访问器", "!{ get a(){}, set a(value){} }");
test.true("多个访问器并带有一一对应的逗号", "!{ get a(){}, set a(value){}, get b(){}, }");
test.true("其他形式的访问器", "!{ get ''(){}, get 8(){}, set [1 + 2 + 3](v){}, set var(v){}, get 1(){} }");
test.true("访问器作为属性名", "!{ get : 1 }");
test.true("访问器作为简写属性名", "!{ set : 1 }");
test.true("访问器作为简写函数名", "!{ set(){} }");
test.true("带访问器属性名的访问器", "!{ set set(a){} }");
test.true("所有情况属性名并存", "!{ a, b: 2, var: 3, c, for: 4, d: 5, 'e': 6, if: 7, 8: 8, 9.333: 9, get ''(){}, set [1 + 2 + 3](v){}, set var(v){}, get 1(){}, }");

test.true(
	"复杂的测试",
	SimpleTest.innerContentOf(function(){
		var a, get, set, e = "e", f = "f", h, i, bn = parseInt(1010, 2)

		var obj = {
			.1: 0.1,
			"string": "stirng",
			a,
			b: 1,
			c(){

			},
			d(x, y = 100, ...z){
				return x + y + z[1]
			},
			[(e + "").toString()]: e,
			[f](){

			},
			["g"](x, y = 100, ...z){
				return x + y + z[1]
			},
			get,
			set,
			get: "get",
			set: "set",
			get h(){
				return h
			},
			set h(value){
				h = value + 1
			},
			get ["i"](){
				return i
			},
			set ["i"](value = 88){
				i = value + 2
			},
			get 0b1010(){
				return bn
			},
			set 0b1010(value){
				bn = value
			},
			get 0O1010(){
				return 0O1010
			},
			0b11: "0b11",
			get8888(){
				return 8888
			}
		}

		var names = [
			"0.1",
			"string",
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"get",
			"set",
			parseInt(1010, 2),
			parseInt(1010, 8),
			parseInt(11, 2),
			"get8888"
		]

		if(
			Object.getOwnPropertyNames(obj).sort().join("") !== names.sort().join("")
		){
			throw "没有正确解析出对象的每一个项"
		}

		if(
			obj.d(1, void 0, 2, 3) !== 104
		){
			throw "d方法运算结果有误"
		}

		if(
			obj.g(1, void 0, 2, 3) !== 104
		){
			throw "g方法运算结果有误"
		}

		obj.h = 999

		if(
			obj.h !== 1000
		){
			throw "h值获取错误:" + h
		}

		obj.i = void 0

		if(
			obj.i !== 90
		){
			throw "i值获取错误:" + i
		}

		if(
			obj[parseInt(1010, 2)] !== parseInt(1010, 2)
		){
			throw "二进制属性获取有误"
		}

		obj[parseInt(1010, 2)] = 1000

		if(
			bn !== 1000
		){
			throw "二进制属性设置失效"
		}

		if(
			!obj.hasOwnProperty(parseInt(11, 2))
		){
			throw "没有指定二进制属性"
		}

		if(
			obj[parseInt(1010, 8)] !== parseInt(1010, 8)
		){
			throw "八进制属性有误"
		}

		if(
			typeof obj["get8888"] !== "function"
		){
			throw "带访问器的属性名解析不正确"
		}

		if(
			obj["get8888"]() !== 8888
		){
			throw "带访问器的属性返回值不正确"
		}
	}),
	true
);

test.false(
	"非法属性名",
	"!{ +: 1 }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.PlusTag ? "" : "没有识别出加号";
	}
);

test.false(
	"2属性间缺少逗号",
	"!{ a: 1\n 3: 2 }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.NumberTag ? "" : "没有识别出数字";
	}
);

test.false(
	"负值属性名",
	"!{ -1: 1 }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.NegationTag ? "" : "没有识别出减号";
	}
);

test.false(
	"逗号后面接非法属性名",
	"!{ var: 1, +: 2 }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.PlusTag ? "" : "没有识别出加号";
	}
);

test.false(
	"简写关键字属性",
	"!{ var }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"简写数字属性",
	"!{ 1 }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"简写字符串属性",
	"!{ 'abc' }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CloseBraceTag ? "" : "没有识别出结束大括号";
	}
);

test.false(
	"计算式名称带逗号",
	"!{ [1,2]: 3 }",
	function(parser, err){
		return err.context.content === "," ? "" : "没有识别出逗号";
	}
);

test.false(
	"简写方法后面接其他非法字符",
	"!{ a(){}() }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.OpenParenTag ? "" : "没有识别出非法字符";
	}
);

test.false(
	"计算式属性名后面接其他非法字符",
	"!{ [1] + 1: 1 }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.PlusTag ? "" : "没有识别出非法字符";
	}
);

test.false(
	"访问器缺少函数参数及主体",
	"!{ get var, }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出非法字符";
	}
);

test.false(
	"访问器后面接冒号",
	"!{ get var(){}: 1 }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ColonTag ? "" : "没有识别出非法字符";
	}
);

test.false(
	"带参数的获取器",
	"!{ get var(a){} }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.IdentifierTag ? "" : "没有识别出访问器参数";
	}
);

test.false(
	"缺少参数的设置器",
	"!{ set var(){} }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.OpenArgumentsTag ? "" : "没有识别出访问器参数个数";
	}
);

test.false(
	"只有逗号",
	"!{ , }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出逗号标签";
	}
);

test.false(
	"多个逗号",
	"!{ a,, }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.CommaTag ? "" : "没有识别出逗号标签";
	},
	function(parser, err){
		return err.context.position.column === 5 ? "" : "逗号位置识别错误";
	}
);

test.false(
	"带多个参数的设置器",
	"!{ set var(a, b){} }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.IdentifierTag ? "" : "没有识别出访问器多个参数";
	},
	function(parser, err){
		return err.context.content === "b" ? "" : "没有正确识别出参数名";
	}
);

test.false(
	"多个冒号",
	"!{ a: b: c }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.ColonTag ? "" : "没有识别出冒号";
	},
	function(parser, err){
		return err.context.position.column === 7 ? "" : "冒号位置不正确";
	}
);

test.false(
	"数字属性名后面接其他",
	"!{ 1e+10a: 1 }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.LabelTag ? "" : "没有识别出标记标签";
	},
	function(parser, err){
		return err.context.content === "a" ? "" : "没有找到错误的标识符";
	}
);

test.false(
	"二进制数字属性名后面接其他",
	"!{ 0b01a: 1 }",
	function(parser, err){
		return err.context.tag instanceof Rexjs.LabelTag ? "" : "没有识别出标记标签";
	},
	function(parser, err){
		return err.context.content === "a" ? "" : "没有找到错误的标识符";
	}
);

test.groupEnd();

}(
	Rexjs.SimpleTest,
	test
);