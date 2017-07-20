

var a, b, c, d, e, f, g, h, i, j = 9, k, l, get, set

obj = {};

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
	33: [c = 89, { 3.1: e = 30, 3.2: f = 25 }],
	"4": { 4.1: [h = 50, i = 5] },
	[j]: j = 99
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
	a === 2
].indexOf("false") > -1){
	throw "对象解构失败";
}