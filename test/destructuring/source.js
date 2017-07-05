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