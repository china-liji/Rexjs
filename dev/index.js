var h = 0, i = 2, bn = parseInt("1010", 2)

class A {
	p1 = h = 1
	2 = 2
	0b11111 = 3
	0o12345 = 4
	[5] = 5
	"6" = 6
	.1(){
		return 0.1;
	};;
	"string"(){
		return "string"
	}
	a(){};;
	b(){ return 1 }
	c(){

	};
	d(x, y = 100, ...z){
		return x + y + z[1]
	};
	[("e" + "").toString()](){  };
	["f"](){}
	["g"](x, y = 100, ...z){
		return x + y + z[1]
	};
	get(){ return "get" }
	set(){ return "set" }
	get h(){
		return h
	};
	set h(value){
		h = value + 1
	};
	get ["i"](){
		return i
	}
	set ["i"](value = 88){
		i = value + 2
	}
	get 0b1010(){
		return bn
	}
	set 0b1010(value){
		bn = value
	}
	get 0O1010(){
		return 0O1010
	}
	0b11(){ return "0b11" }
	get8888(){
		return 8888
	}

	static constructor(){
		this.x = 1000
	};

	static get 0b1010(){
		return 0b1010
	}

	static 0O1010(){
		return 0O1010
	}

	constructor(){
		this.x = 2000
	}

	static get get(){
		return this[0b1010]
	}
}