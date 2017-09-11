function* generator(){debugger
	({ a: {b} } = { a: {b:200} })

	if(typeof A === "function"){
		throw "类变量不存在变量提升";
	}

	class A {
		constructor(){
			this.value = 100
		}
	}
};

generator().next();