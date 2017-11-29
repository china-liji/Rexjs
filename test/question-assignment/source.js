var a, b = 100;

b ?= a;

if(b !== 100){
	throw "undefined 赋值造成了影响";
}

a = null;

[
	null,
	0,
	"",
	false
].forEach(function(value){
	b ?= value;

	if(b !== value){
		throw value + " 的赋值失败";
	}
});

var obj = { c: 100 }

a = window.a ?= obj.c;

if(a !== 100){
	throw "连续赋值：a 的值错误";
}

if(window.a !== 100){
	throw "连续赋值：window.a 的值错误";
}

b = 100;

var c = b ?= obj.d;

if(c !== void 0){
	throw "连续赋值：c 的值错误";
}

var d = 5;

d ?= b ?= obj.d;

if(d !== 5){
	throw "连续赋值：d 的值错误";
}