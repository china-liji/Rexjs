var obj = { value: 88 }

function fn(a, b, c, d, e, g){
	// 1 + 4 + 6 + ?
	return new Number(
		a + d + g + (this ? this.value : 6)
	);
};

fn.prototype = {
	value: 100
};

obj.obj = obj
obj.fn = fn

switch(
	false
){
	case fn(1, 2, ...[3, 4], ...[5, 6], 7).valueOf() === 17:
		throw "运算结果1错误";

	case obj.obj.obj.fn(...[1, 2], ...[3, 4], ...[5, 6], 7).valueOf() === 99:
		throw "运算结果2错误";

	case new fn(1, 2, ...[3, 4], ...[5, 6], ...[7]).valueOf() === 111:
		throw "运算结果3错误";

	case new obj.obj.fn(...[1, 2, 3, 4, 5, 6, 7]).valueOf() === 111:
		throw "运算结果4错误";

	case obj.obj["fn"](...[1, 2, 3, 4, 5, 6, 7]).valueOf() === 99:
		throw "运算结果5错误";
}

if(
	$Rexjs_0 !== obj
){
	throw "临时变量名生成有误";
}