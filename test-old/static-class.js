new function(){
"use strict -rex"

static
class Car {
	constructor(){
		var width
		
		assign
		{
			1.2 as height,
			width
		}
	}
	
	static color = "red"
	
	static height = 0
	
	static width = 0
	
	static getHeight(){
		return this.height
	}
}

var Bike = static class {
	static isCar(){}	
}

switch(
	true
){
	case Car.color !== "red" :
		break
		
	case Car.height !== 1.2 :
		break
		
	case Car.width !== 0 :
		break
		
	case Car.getHeight() !== 1.2 :
		break
		
	case typeof Bike.isCar !== "function" :
		break
		
	default :
		return
}

throw "静态类解析错误"
}()