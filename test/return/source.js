function fn1(a = 1, b, c = 3, ...d){
	return a + b + c + d[1]
}

if(
	fn1(2, 4, void 0, 6, 7) !== 16
){
	throw "计算结果错误"
}

function fn2(a = 1, b, c = 3, ...d){
	return
	a + b + c + d[1]
}

if(fn2() !== void 0){
	throw "函数 return 语句的换行没作用"
}