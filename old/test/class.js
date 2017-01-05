// 非 rex 模式
new function(description){
class Car {
	// 构造函数默认值
	constructor(name, height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}

	// 换行的静态属性
	static
	isCar(car){
		return car instanceof Car
	}
	;
	
	;
	
	;
	// 普通静态属性
	static isToy(car){
		return car.height < 0.5 && car.width < 0.5
	}
	
	;
	
	;
	
	;
	// 类的属性
	getHeight(){
		return this.height
	}
	;
	;
	;
	// 静态 constructor 属性
	static constructor(car){
		return car.constructor
	}
}

var car = new Car("汽车", 0.2, 0.3)

switch(
	false
){
	case Car.isCar(car) :
		throw description
		return
	
	case Car.constructor(car) === car.constructor :
		throw description
		return
		
	case Car.isToy(car) :
		throw description
		return
		
	case car.getHeight() === 0.2 :
		return;
}

class Audi extends Car {
	constructor(){
		"use strict -rex"
		
		// 检测函数内部的 this 是否会报错
		function a(){
			this
		}
		
		// 检测类内部的 this 是否会报错
		class Inside {
			constructor(){
				this
			}
			
			// 如果这里取消注释，则会报错
			// audi = this
		}
		
		// 如果这里取消注释，则会报错
		// { ( [this] ) }
		
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this
	}
	
	// 被覆盖的静态属性
	static
	
	isCar(audi){
		return audi instanceof Audi;
	}
	
	// 被覆盖的属性
	getHeight(height = 0.1){
		return this.height + height
	}
}

var audi = new Audi("A4")

switch(
	false
){
	case Car.isCar(audi) :
		break

	case Audi.isCar(audi) :
		break

	case !Audi.isCar(car) :
		break

	case audi.getHeight() === audi.height + 0.1 :
		break
	
	case audi.name === "汽车" :
		break
		
	default :
		return
}

throw description
}(
	// description
	"类解析错误"
)


// rex 模式
new function(description){
"use strict -rex"

// 测试 assign 是否在外部被解析
var assign = 1

// 匿名类测试
var Car = class {
	constructor(name, height = void 0, _color){
		var as = "as";
		
		// 测试 assign
		assign {
			// 测试连续的 as
			as as as,
			// 换行的 as 表达式 和 字符串名称
			arguments[0]
			as
			"name",
			// 计算值
			Car.defaultHeight - 1 as minHeight,
			// 简写
			height,
			// as 表达式
			_color as color
		}
	}
	
	// 静态属性默认值
	static defaultHeight = 1.5
	
	// 属性默认值
	height = 1.5
	
	// 属性默认值
	width = 1.8
}

// 匿名类继承测试
var Audi = (class extends Car {
	constructor(name, color = "white"){
		
	}
})

var audi = new Audi("A4", "red")

switch(
	false
){
	case audi.name === "A4" :
		break
		
	case audi.height === 1.5 :
		break
		
	case audi.width === 1.8 :
		break
		
	case audi.color === "red" :
		break
	
	case audi.minHeight === 0.5 :
		break
	
	default :
		return
}

throw description
}(
	// description
	"类解析错误 -rex"
)