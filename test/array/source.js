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

a = [1, true,, !true, 2 + 3,, 'string',, 100 + 5 - !false - 0, ...a, 5, ...[6,...[7]]]

if(
	a.length !== 15
){
	throw "数组长度不等于15：" + a.length
}

if(
	a[8] !== 104
){
	throw "错误的数组项"
}

if(a[9] !== 1 || a[14] !== 7){
	throw "数组拓展项错误";
}