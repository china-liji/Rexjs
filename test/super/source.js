// 测试类构造函数中的 super
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

var a, b, c;

class A {
	static get x(){
		return 100;
	};

	static set x(value){
		this.x_a = value;
	};

	get x(){
		return this.y + 2;
	};

	get y(){
		return super.y;
	}
}

// 有构造函数
class B extends A {
	constructor(){
		super();

		this.z = 45;
	};

	static get x(){
		return super.x += 100;
	};

	get x(){
		return super.x;
	};

	set x(value){
		this.x_b = value;
	};

	get y(){
		return 2;
	};
};

// 无构造函数
class C extends B {
	getX(){
		return super.x += 88;
	};

	getZ(){
		return super.z_c = 66;
	};

	get y(){
		return 1000;
	};
};


a = new A();
b = new B();
c = new C();

if(a.y !== void 0){
	throw "A 类没有父类，所以值应该是 undefined";
}

if(B.x !== 200){
	throw "静态父类属性简写 赋值 或 返回值错误";
}

if(B.x_a !== 200){
	throw "静态父类属性，没有关联相关的 this";
}

if(A.x_a !== void 0){
	throw "静态父类属性中使用 this，不应该给父类赋值";
}

if(b.x !== 4){
	throw "类的父类属性获取错误";
}

if(c.getX() !== 1090){
	throw "多级继承的父类属性获取有误";
}

if(c.getX.call(b) !== 92){
	throw "多级继承的子类方法使用 call 之后，父类属性获取不正确";
}

c.getZ();

if(c.z_c !== 66){
	throw "父类属性赋值时，当父类不存在指定属性时，应该在当前 this 上赋值该属性";
}

c.getZ.call(b);

if(b.z_c !== 66){
	throw "多级继承的子类方法使用 call 之后，给父类属性赋值时，当父类不存在指定属性时，应该在当前 this 上赋值该属性";
}

}();



// 测试对象的 super
!function(){

if(!Object.setPrototypeOf){
	return;
}

var a = {
	get x(){ return this.y + 2 },
	set x(value){ this.x_a = value; },
	value: 88
}

var b = {
	y: 2,
	get x(){ return super.x },
	set x(value){ this.x_b = value; },
	postfixIncrementSuper(){
		return super.value++;
	}
}

Object.setPrototypeOf(b,a);

var c = {
	get x(){ return this.y + 45 },
	set x(value){ this.x_c = value; },
	get y(){
		return this.y + 123
	}
}

var d = {
	y: 100,
	getX(){
		return super.x += 5
	},
	set x(value){ this.x_d = value; },
	getY(){
		return super.y = 66
	},
	getZ(){
		return super.y
	}
}

Object.setPrototypeOf(d, c)

if(b.x !== 4){
	throw "父级属性访问器不正确：可能没有绑定调用 super 时所处的 this";
}

if(b.postfixIncrementSuper() !== 88){
	throw "父类属性递增返回值错误";
}

if(b.value !== 89){
	throw "非访问器形式的父类属性设置，结果应设置在子类上";
}

if(a.value !== 88){
	throw "非访问器形式的父类属性设置，结果不应该置在父类上";
}

if(d.getX.call(b) !== 52){
	throw "super 只跟声明时所在对象的父级进行绑定，而不会随着 setPrototypeOf 而改变";
}

d.getX()

if(d.x_c !== 150){
	throw "父级属性的简写赋值应该根据 super 关键字所在函数的父级所决定，即 d 的父级是 c";
}

if(b.x_c !== 52){
	throw "父级属性的简写赋值应该根据 super 关键字所在函数的父级所决定，即 d 的父级是 c，而不是 b 与 a 的关系";
}

d.getY();

if(d.y !== 100){
	throw "赋值父级属性时，如果父级只有 get，没有 set，那么则不执行赋值操作";
}

if(d.getZ.call(b) !== 125){
	throw "父级属性的获取应该根据 super 关键字所在函数的父级所决定，即 d 的父级是 c，而不是 b 与 a 的关系";
}

}();