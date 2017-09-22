new function(){
	
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

debugger

/**
 * setPrototype 改变 super 的指向？？？？？？？？？？？？？？？？？
 */



// // 测试类的访问器属性中的 super
// !function(){

// class C1 {
// 	get(){
// 		return this.b;
// 	}
// }

// class C2 extends C1 {
// 	get a(){ return super.get() + 3 }
// }

// class C3 extends C2 {
// 	get a(){ return super.a };
// 	get b(){ return 1 }
// }

// if(new C3().a !== 4){
// 	throw "测试类的访问器属性中的 super 解析不正确"
// }

// debugger

// }();

}()