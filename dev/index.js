// 无构造函数
class C extends Rexjs.List {
	constructor(){
		super();

		this.z = 45;
	};

	static get x(){
		return super.x++ += 100;
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
