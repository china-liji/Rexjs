new function(description){
	
// 数组拓展符
var arr = [...[1,2,3], 4, ...[5,6,7], [8, 9]];

switch(
	true
){
	case arr.length !== 8 :
		break;
		
	case arr[1] !== 2 :
		break;
		
	case arr[arr.length - 1] instanceof Array === false :
		break;
		
	default :
		return;
}

throw description;
	
}(
	// description
	"数组拓展符解析错误。"
);
