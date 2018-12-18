var a = function(){
	if(window.x + 2)
	b = 5 * window.a.b.c + 1 / await new Promise((r) => { r() });
}

// var a = async function(){
// 	a.a.a[await 1]

// 	var obj = {
// 		get a(){ console.log("obj.a");return 5; },
// 		get b(){ console.log("obj.b");return 1; },
// 		get c(){ console.log("obj.c");return 2; }
// 	}

// 	function b(){};

// 	// 26
// 	var value = b(
// 		b(obj.a) * await Promise((res)=>{
// 			setTimeout(res, 1000, 5)
// 		}) - obj.b + obj.c
// 	);

// 	// throw 7777
// 	debugger

// 	console.log("after1");

// 	await new Promise((res) => {
// 		setTimeout(res, 2000, 888)
// 	});

// 	console.log("after2");
// 	return 3333;
// }

// a().then(function(value){
// 	console.log(value);
// });








// var bbbb = new Promise((res, rej) => {
// 	setTimeout(() => {
// 		res(666);
// 		console.log(99999)
// 	}, 1000)
// });

// bbbb.then(() => { console.log("then");return {} })

// var fn = async function *a(a, b, c){

// 	yield "abc"

// 	await bbbb;

// 	console.log("async inner");

// 	return new Promise((r) => {
// 		r("promise 3")
// 	});
// };

// var gen = fn();

// gen.throw(555).then((r, n) => {
// 	console.log(r,n, "next1");
// })

// gen.next().then((r, n) => {
// 	console.log(r,n, "next2");
// })

// gen.next().then((r, n) => {
// 	console.log(r,n, "next3");
// });