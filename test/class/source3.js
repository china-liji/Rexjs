class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
	}
}

class Audi extends Car {}

let audi = new Audi()

if(
	audi instanceof Car === false
){
	throw "audi 没有继承至 Car 类"
}

if(
	audi.name !== "Audi A4"
){
	throw "没有自动调用父类的构造函数"
}