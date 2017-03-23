function fn(a = 1, b, c = 3, ...d){
	return a + b + c + d[1]
}

if(
	fn(2, 4, void 0, 6, 7) !== 16
){
	throw "计算结果错误"
}

var obj = { fn: fn }

obj.fn(...[1,2,3])

if(
	$Rexjs_0 !== obj
){
	throw "临时变量名生成有误";
}

function forOf(){
	for(var i of [1,2,3]){

	}

	if(
		$Rexjs_0 === obj
	){
		throw "没有在闭包内重置变量名索引";
	}
}

if(
	$Rexjs_0 === 2
){
	throw "变量名受到闭包的影响";
}