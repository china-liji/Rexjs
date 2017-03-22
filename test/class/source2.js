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
	case Car.isCar(car):
		throw "实例化结果有误"
	
	case Car.constructor(car) === car.constructor:
		throw "类的构造函数与实例的构造函数不一致"
		
	case Car.isToy(car):
		throw "属性运算错误"
		
	case car.getHeight() === 0.2:
		throw "高度不正确";
}

class Audi extends Car {
	constructor(){
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
		
		// 检测语句块内是否能调用 super
		{
			super("汽车")
		}
		
		// 检测 super 之后的 this 是否会报错
		this.height += 0.1
	}
	
	// 重写静态属性
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
	case Car.isCar(audi):
		throw "继承后的实例类型不正确"

	case Audi.isCar(audi):
		throw "audi 不是 Audi 的实例";

	case !Audi.isCar(car):
		throw "audi 不是 Car 的实例"

	case audi.getHeight() === audi.height + 0.1:
		throw "高度获取不一致"
	
	case audi.name === "汽车" :
		throw "实例属性获取不一致"
}