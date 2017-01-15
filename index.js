var a = class extends Rexjs["List"].prototype.constructor {
	set b(d){};
	static constructor(){
		console.log("cs")

		super.a
	};
	c(){
		return 100
	}
;
	static(){
		
	}

	static get get(){
		return 1
	};

	constructor(){
		super()
		console.log(arguments, this, super.b)
	}
}

a.constructor()

console.log(
	new a(1,2,3).c(),
	a.get
)

window.a = a