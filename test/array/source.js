var a = [,,,]

if(
	a.length !== 3
){
	throw "空项数组长度不等于3：" + a.length
}

a = [1,2,3,]

if(
	a.length !== 3
){
	throw "最后一项数组带逗号，但数组长度不等于3：" + a.length
}

a = [1, true,, !true, 2 + 3,, 'string',, 100 + 5 - !false - 0]

if(
	a.length !== 9
){
	throw "数组长度不等于9：" + a.length
}

if(
	a[8] !== 104
){
	throw "错误的数组项"
}