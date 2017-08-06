new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

new function(){

var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50] = [1, [[2,]], 3];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

arr = [];
e = 0;

Object.defineProperty(
	arr,
	"1",
	{
		get: function(){
			e++;

			return [];
		}
	}
);

[, [a, b, c]] = arr;

if(e !== 1){
	throw "数组单项解构造成了多次访问";
}

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa

obj = {};

new function(){
	
({
	.1: k,
	"string": l = 5,
	a,
	aa: a,
	b: b,
	get,
	set,
	0b11: c,
	["d"]: d,
	0b10101: window.z,
	hello: window.x = 5,
	["wor" + "ld"]: window.world = 6,
	null: window.value,
	33: [m = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99,
	n = 88,
	bb: aa
} = {
	0.1: 0.1,
	a: 1,
	aa: 2,
	b: 3,
	get: 4,
	set: 5,
	3: 6,
	d: 7,
	21: 8,
	world: 9,
	null: 10,
	33: [, { 3.2: 11 }],
	4: { 4.1: [, 55] },
	9: 97
});

if([
	k === 0.1,
	l === 5,
	a === 2,
	b === 3,
	get === 4,
	set === 5,
	c === 6,
	d === 7,
	window.z === 8,
	window.x === 5,
	window.world === 9,
	window.value === 10,
	m === 89,
	e === 30,
	f === 11,
	h === 50,
	i === 55,
	j === 97,
	n === 88
].indexOf(false) > -1){
	throw "对象解构失败";
}

}();

new function(){

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

[
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组的嵌套解构有误";
}

}();


new function(){

var [
	,
	a,
	[
		b,
		,
		{
			c,
			d: [
				m = 99,
				{
					e: [f]
				}
			]
		},
		g
	],
	,
	h
] = [
	0,
	1,
	[
		2,
		3,
		{
			c: 4,
			d: [, {
				e: [5]
			}]
		},
		6
	],
	,
	7
];

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99
].indexOf(false) > -1){
	throw "数组声明解构 - 数组的嵌套解构有误";
}

}();


new function(){
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set

({
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象的嵌套解构有误";
}

var count = 0;

({ a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
});

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

new function(){

var {
	x: [
		,
		a,
		[
			b,
			,
			{
				c,
				d: [
					m = 99,
					{
						e: [f]
					}
				]
			},
			g
		],
		,
		h,
		i = 66
	]
} = {
	x: [
		0,
		1,
		[
			2,
			3,
			{
				c: 4,
				d: [, {
					e: [5]
				}]
			},
			6
		],
		,
		7
	]
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66
].indexOf(false) > -1){
	throw "对象声明解构 - 对象的嵌套解构有误";
}

var count = 0;

var { a: { a,b,c,d } } = {
	get a(){
		count++;
		return {}
	}
};

if(count !== 1){
	throw "对象单项解构造成了多次访问";
}

}();

}();


new function(){

	var h = 1, i = 2, bn = parseInt("1010", 2)

class A {
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  }
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
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
	"get8888",
	"constructor"
]

if(
	Object.getOwnPropertyNames(A.prototype).sort().join(";") !== names.sort().join(";")
){
	throw "没有正确解析出类的每一个属性"
}

var staticNames = [
	"prototype",
	"get",
	"constructor",
	parseInt(1010, 2).toString(),
	parseInt(1010, 8).toString(),
	"length"
];

if(
	!staticNames.every(
		function(name){
			return this.indexOf(name) > -1;
		},
		Object.getOwnPropertyNames(A)
	)
){
	throw "没有正确解析出类的每一个静态属性"
}

var a = new A()

if(
	a["0.1"]() !== 0.1
){
	throw "小数属性错误"
}

if(
	a.d(1, void 0, 2, 3) !== 104
){
	throw "d方法运算结果有误"
}

if(
	a.g(1, void 0, 2, 3) !== 104
){
	throw "g方法运算结果有误"
}

a.h = 999

if(
	a.h !== 1000
){
	throw "h值获取错误:" + h
}

a.i = void 0

if(
	a.i !== 90
){
	throw "i值获取错误:" + i
}

if(
	a[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制属性获取有误"
}

a[parseInt(1010, 2)] = 1000

if(
	bn !== 1000
){
	throw "二进制属性设置失效"
}

if(
	!A.prototype.hasOwnProperty(parseInt(11, 2))
){
	throw "没有指定二进制属性"
}

if(
	a[parseInt(1010, 8)] !== parseInt(1010, 8)
){
	throw "八进制属性有误"
}

if(
	typeof a["get8888"] !== "function"
){
	throw "带访问器的属性名解析不正确"
}

if(
	a["get8888"]() !== 8888
){
	throw "带访问器的属性返回值不正确"
}

if(
	a.x !== 2000
){
	throw "构造函数运行不正确"
}

A.constructor()

if(
	A.x !== 1000
){
	throw "类的静态方法没有运行"
}

if(
	A[parseInt(1010, 2)] !== parseInt(1010, 2)
){
	throw "二进制静态属性不正确";
}

if(
	A[parseInt(1010, 8)]() !== parseInt(1010, 8)
){
	throw "八进制静态属性不正确";
}

if(
	A.get !== parseInt(1010, 2)
){
	throw "get 静态属性获取不正确"
}

}();


new function(){

class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}

}();


new function(){

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}

}();

