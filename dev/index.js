// import STRING from "./export.js";

// import html, { compiler } from "./temp.html"

class a {
	constructor(){
		console.log(999)
	}

	a(){
		console.log("super.a called")
	}
};

class b extends a {
	constructor(){
		let fn = () => {
			super();
		};

		debugger
	};

	c(){
		let fn = () => {
			super.a();
		};

		fn();
	}
}

new b().c()

// import styles, { compiler } from "./index.css";

debugger