var a = 100

switch(
	1 + 3 / 3 * 4 - 5
){
	case 1:
		a += 1

	case 2:
		a += 3

	case 0: {
		a -= 100
		
		break
	}

	if(
		a > 100
	){
		a = 10000
	}

	default:
		throw "错误的测试"
}

if(
	a !== 0
){
	throw "计算结果错误";
}