var a, b, c, d, e, f

var n = 6


({
	a,
	2: b,
	3: [c],
	"4": { 4.1: d = 50, 4.2: e = 5 },
	[n]: f = 99,
	null: window.value,
	// x(){},
	// [y](){},
	// get z(){},
	// $: [$] = 1
} = {
	a: 1,
	2: 2,
	3: [3],
	4: { 4.1: 4 },
	6: 6,
	null: "123"
});

({} = {})

// ({
// 	.1: 0.1,
// 	"string": "stirng",
// 	a,
// 	b: 1,
// 	c(){

// 	},
// 	d(x, y = 100, ...z){
// 		return x + y + z[1]
// 	},
// 	[(e + "").toString()]: e,
// 	[f](){

// 	},
// 	["g"](x, y = 100, ...z){
// 		return x + y + z[1]
// 	},
// 	get,
// 	set,
// 	get: "get",
// 	set: "set",
// 	get h(){
// 		return h
// 	},
// 	set h(value){
// 		h = value + 1
// 	},
// 	get ["i"](){
// 		return i
// 	},
// 	set ["i"](value = 88){
// 		i = value + 2
// 	},
// 	get 0b1010(){
// 		return bn
// 	},
// 	set 0b1010(value){
// 		bn = value
// 	},
// 	get 0O1010(){
// 		return 0O1010
// 	},
// 	0b11: "0b11",
// 	get8888(){
// 		return 8888
// 	}
// } = {})