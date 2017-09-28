var a = {
	a: 1
};

var b = {
	b(){
		--super.a
	}
}

Object.setPrototypeOf(b,a);

b.b();

debugger


// withSpread
// 11400 new \w*statement\(