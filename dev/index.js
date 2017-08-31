var a,b, c, e;

var obj = Object.create({ b: 2 });

obj.c = 3;

Object.defineProperty(obj, "d", { enumerable: true, get: function(){} })

Object.defineProperty(obj, "e", { enumerable: false, get: function(){} });

({
	c = 5,
	...a
} = obj)

debugger