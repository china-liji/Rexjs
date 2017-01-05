new function(){
var x, y, z

var fn = function(){
	var
	a 
	= 1
	
	var
		b = 2,
		c = 3
		,d = 4
	
	x = ++
	a
	
	d++
	++d
	d
	+=
	5
	
	y
		=
		new
		window
		["String"]
		(123)
		[0]
		
	z = {}
	[0]
		
	return 
	d
}

var fn2 = function(){
	var
	a 
	= 1;
	
	var
		b = 2,
		c = 3
		,d = 4;
	
	x = ++
	a;
	
	d++;
	++d;
	d
	+=
	5;
	
	y
		=
		new
		window
		["String"]
		(123)
		[0];
		
	z = {}
	[0];
		
	return; 
	d;
}

switch(
	false
){
	case fn.toString() === fn2.toString() :
		break;
	
	case fn() === void 0 :
		break;
	
	case x === 2 :
		break;
		
	case y === "1" :
		break;
	
	case z === void 0 :
		break;
		
	default :
		return;
}

throw "asi机制解析错误！"
}();