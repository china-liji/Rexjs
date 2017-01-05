new function(){

var obj = {
	let : 1
}

obj.for = obj

if(
	obj.for.for.for.for.for.let === 1
){
	return
}

throw "符号点“.”解析错误";	
}()