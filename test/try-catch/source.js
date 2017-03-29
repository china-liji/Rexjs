var a = 1

try {
	a += 2
}
catch(e){}
finally {
	a += 100

	try {
		throw 999
	}
	catch(e){
		a += e;
	}
	finally {
		a += 1
	}

	try {
		a += 2
	}
	finally {
		a -= 2
	}
}

if(
	a !== 1103
){
	throw "计算结果有误."
}