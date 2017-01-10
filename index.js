class a extends Rexjs["List"].prototype.constructor {
	set b(d){}
	static constructor(){
		console.log("cs")
	}
	c(){
		return 100
	}

	static get get(){
		return 1
	}

	constructor(){
		console.log(arguments, this)
	}
}

a.constructor()

console.log(
	new a(1,2,3).c(),
	a.get
)

window.a = a