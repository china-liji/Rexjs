var a = 1

for(var i of [1]){
	for(
		var i of [1,2,3]
	){

	}
}

if(Rexjs.ECMAScriptConfig.of.value){
	if(
		$Rexjs_0 instanceof Rexjs.Generator === false
	){
		throw "临时变量名值1错误"
	}

	if(
		$Rexjs_1 instanceof Rexjs.Generator === false
	){
		throw "临时变量名值2错误"
	}
}

{
	a = 10

	a = a -= window instanceof Window && 1 + 9 ^ 6 | 5 || 3 & 6 > 7 / 12 === 3;
	
	if(
		a !== -3
	){
		throw a;
	}
	
	a = a+= a *= 2 + 3 * 6 | 7 ^ 0 % 4 / 10 & 1;
	
	if(
		a !== -72
	){
		throw a;
	}
}