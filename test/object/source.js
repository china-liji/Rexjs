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