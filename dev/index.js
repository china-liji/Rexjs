var a,b, e;

var obj = Object.create({ b: 2 });

obj.c = 3;

Object.defineProperty(obj, "d", { enumerable: true, get: function(){} })

Object.defineProperty(obj, "e", { enumerable: false, get: function(){} });

var {
	e,...a
} = obj

debugger