// 测试类的 super
!function(){

var obj = {};

function fn(){}

class Car {
	constructor(name = "Audi A4", height = 1.5, width = 1.8){
		this.name = name
		this.height = height
		this.width = width
		this.id = 45;

		this.obj = obj;
	}

	getObj(){
		return this.obj;
	}

	getWidth(width = this.width){
		return width
	};

	get fn(){
		return fn
	}

	static get color(){
		return "red"
	}
}

Car.prototype.id = 10;

class Audi extends Car {
	static get color(){
		return super.color
	}
}

let audi = new Audi()

class BMW extends Car {
	constructor(){
		var obj;

		super();

		obj = super.getObj();
		
		obj.value = this.getValue();

		return obj;
	}

	getValue(){
		return (
			super["getWidth"]() +
			super.id +
			super["getWidt" + "h"](...[5])
		);
	}
}

class X5 extends BMW {}

if(new X5() !== obj){
	throw "类的返回不等于父类的返回值";
}

if(obj.value !== 16.8){
	throw "123";
}

if(X5.color !== "red"){
	throw "静态属性值不对"
}

}();


// 测试类的访问器属性中的 super
!function(){

class C1 {
	get(){
		return this.b;
	}
}

class C2 extends C1 {
	get a(){ return super.get() + 3 }
}

class C3 extends C2 {
	get a(){ return super.a };
	get b(){ return 1 }
}

if(new C3().a !== 4){
	throw "测试类的访问器属性中的 super 解析不正确"
}

}();



// 测试对象的 super
!function(){

if(!Object.setPrototypeOf){
	return;
}

var a = {
	get x(){ return this.y + 2 }
}

var b = { y: 2 }

Object.setPrototypeOf(b,a);

var c = {
	get x(){ return this.y + 45 }
}

var d = {
	y: 100,
	get(){
		return super.x
	}
}

Object.setPrototypeOf(d, c)

console.log(
	d.get.call(b),
	b.x,
	d.x
);

if(b.x !== 4){
	throw "父级属性访问器没有绑定调用 super 时所处的 this";
}

if(d.get.call(b) !== 47){
	throw "super 只跟声明时所在对象的父级进行绑定，而不会随着 setPrototypeOf 而改变";
}

if(d.x !== 145){
	throw "当前对象方法 或 父级属性访问器没有绑定调用 super 时所处的 this";
}

}();