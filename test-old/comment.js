new function(){

var fn = function(){
	var /*
		多行注释
	*/
	a
	// 单行注释
	= 1;
};

var str = fn.toString();

switch(
	false
){
	case str.indexOf("/*") === -1 :
		break;
		
	case str.indexOf("//") === -1 :
		break;

	default :
		return;
}

throw "注释解析错误。";
	
}();