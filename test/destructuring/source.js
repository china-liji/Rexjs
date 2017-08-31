var obj = {}, arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var e;

var r;

[...r] = [1,2,3]

if(r.length !== 3 || r[0] !== 1 || r[2] !== 3){
	throw "数组省略项解构赋值失败";
}

let [...rr] = [1,2,3];

if(rr.length !== 3 || rr[0] !== 1 || rr[2] !== 3){
	throw "解构数组省略项解构赋值失败";
}

var [a, b, c, d,,,,,,,,,,,,,,,,,,,e] = arr;

if([a === 0, b === 1, c === 2, d === 3, e === undefined].indexOf(false) > -1){
	throw "基础声明解构赋值失败";
}

var [, a, , b, c, ,] = [ ,,, obj.x,, obj.y,, c, , ,,,,,,, obj.z = 200 ] = arr;

if([a === 1, b === 3, c === 4, obj.x === 3, obj.y === 5, obj.z === 200].indexOf(false) > -1){
	throw "连续解构声明解构赋值失败";
}

[a, [, [[[b, d = arr[2] * 100, e = 300]]], ], , ,...r] = [, [,,obj.x],a, [c, obj.y], , c, ] = [1, [ 2, [[[3, , 3.1]]], 4], 5, [6, 7], 8, 9, 0];

if([a === 1, b === 3, c === 9, d === 200, e === 3.1, obj.x === 4, obj.y === 7, r.length === 3, r[0] === 8, r[1] === 9, r[2] === 0].indexOf(false) > -1){
	throw "多层解构失败";
}

let [x, [[,,y = 100 + 50 / 2 + window.parseInt(20, 10),],,], z = 50, ...rest] = [1, [[2,]], 3, 4, 5,6,7,8,9];

if([x === 1, y === 145, z === 3].indexOf(false) > -1){
	throw "多层默认值解构失败";
}

if(rest.length !== 6 || rest[0] !== 4 || rest[5] !== 9){
	throw "声明数组省略项解构失败";
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

var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, n, get, set, aa, restObject

obj = {};

new function(){

var obj = Object.create({ b: 2 });

obj.c = 3;

Object.defineProperty(obj, "d", { enumerable: true, get: function(){ return 5; } });

Object.defineProperty(obj, "e", { enumerable: false, get: function(){} });

({
	c = 5,
	...a
} = obj)

var names = Object.getOwnPropertyNames(a);

if(typeof a !== "object"){
	throw "对象省略项解构不是个对象";
}

if(names.length > 1){
	throw "对象省略项解构长度有问题";
}

if(names[0] !== "d"){
	throw "对象省略项解构没有识别出枚举属性";
}

if(Object.getOwnPropertyDescriptor(a, "d").value !== 5){
	throw "对象省略项的值不对";
}

}();

new function(){

var obj = Object.create({ b: 2 });

obj.c = 3;

Object.defineProperty(obj, "d", { enumerable: true, get: function(){ return 5; } });

Object.defineProperty(obj, "e", { enumerable: false, get: function(){} });

var {
	c = 5,
	...a
} = obj;

var names = Object.getOwnPropertyNames(a);

if(typeof a !== "object"){
	throw "对象声明解构 - 对象省略项解构不是个对象";
}

if(names.length > 1){
	throw "对象声明解构 - 对象省略项解构长度有问题";
}

if(names[0] !== "d"){
	throw "对象声明解构 - 对象省略项解构没有识别出枚举属性";
}

if(Object.getOwnPropertyDescriptor(a, "d").value !== 5){
	throw "对象声明解构 - 对象省略项的值不对";
}

}();


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
	bb: aa,
	...restObject
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
	9: 97,
	x: 100,
	y: 200
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
	n === 88,
	restObject.x === 100,
	restObject.y === 200
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
var a, b, c, d, e, f, g, h, i, j = 9, k, l, m, get, set, restObject

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
	],
	...restObject
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
	],
	y: 100,
	z: 200
});

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66,
	restObject.y === 100,
	restObject.z === 200
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
	],
	...restObject
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
	],
	y: 100,
	z: 200
};

if([
	a === 1,
	b === 2,
	c === 4,
	f === 5,
	g === 6,
	h === 7,
	m === 99,
	i === 66,
	restObject.y === 100,
	restObject.z === 200
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