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

debugger

}();