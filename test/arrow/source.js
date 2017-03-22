let fn = (a = 1, b, c = 3, ...d) => a + b + c + d[1]

if(
	fn(2, 4, void 0, 6, 7) !== 16
){
	throw "计算结果错误"
}

new function(){
	this.x = 100

	var obj = {
		fn: (a = 1, b, c = 3, ...d) => {
			return a + b + c + d[1] + this.x
		},
		x: 1000
	}

	if(
		obj.fn(2, 4, void 0, 6, 7) !== 116
	){
		throw "this 指向不正确1";
	}

	if(
		obj.fn.call(obj, 2, 4, void 0, 6, 7) !== 116
	){
		throw "this 指向不正确2";
	}
}();

if(
	(a => a)(100) !== 100 
){
	throw "单参数返回值有误"
}