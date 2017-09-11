new function(checkGenerator){

// return
new function(){

var x = 0;

function* generator(){
	x++;

	yield 5;
};

var gen = generator();

var result1 = gen.return(100);
var result2 = gen.next();

if(x > 0){
	throw "return 后的生成器不应该再进入";
}

if(result1.value !== 100){
	throw "return -> value";
}

if(!result1.done){
	throw "return -> done";
}

if(result2.value !== void 0){
	throw "return -> next -> value";
}

if(!result2.done){
	throw "return -> next -> done";
}

}();


// 函数变量提升
new function(){

function* generator(){
	if(typeof a !== "function"){
		throw "函数变量提升失败"
	}

	yield a()

	a = 5

	yield a

	function a(){
		return 100;
	}
};

checkGenerator(
	generator(),
	[100, 5],
	"变量提升解析失败"
);

function* generator1(){
	if(typeof a !== "undefined"){
		throw "非最外层函数声明，不得提升";
	}

	{
		function a(){
			return 100;
		}
	}

	if(typeof b !== "undefined"){
		throw "非声明形式的函数，不得提升"
	}

	var b = function(){}
};

generator1();

}();


// 类变量提升
new function(){

function* generator(){
	var err = "类变量不存在变量提升";

	try {
		a
		throw err
	}
	catch(e){
		if(e === err){
			throw e;
		}
	}

	class a {
		constructor(){
			this.value = 100
		}
	}
};

generator()

}();


// if
new function(){

function* generator(value){
	var b;

	if(value > 5){
		b = 1

		{
			yield "x"
		}

		yield "x2"
		b += 2

		return b
	}
	else {
		b = 3

		yield "y"
		b = 4
	}

	yield b
};

checkGenerator(
	generator(10),
	["x", "x2", 3],
	"生成器中的 if 解析不正确"
);

checkGenerator(
	generator(3),
	["y", 4],
	"生成器中的 else 解析不正确"
);

}();


// for
new function(){

var x = 0;

var obj = {
	get a(){
		x++;
		return 100;
	}
}

var generator = function*(){
	var b;

	for(var i in { a: obj.a }){
		yield i
	}

	x:
	for(var i of [1,2,3,4,5]){
		var k = 8

		for(;;){
			yield i + "5"

			if(i < 3){
				continue x;
			}

			for(var m in { x: 1, y: 2, z: 3 }){
				yield m;
				continue
				yield 100
			}

			break
		}

		break;
		yield i
	}

	return 8989
	123;
};

if(x > 1){
	throw "for in 中的变量，没有被提出来，被多次定义了";
}

checkGenerator(
	generator(),
	["a", "15", "25", "35", "x", "y", "z", 8989],
	"生成器中的 for 循环解析不正确"
);
	
}();


// while
new function(){

var obj = {
	*generator(){
		var i = 0;

		while(i < 5){
			yield ++i
		}

		return 50
	}
};

checkGenerator(
	obj.generator(),
	[1, 2, 3, 4, 5, 50],
	"生成器中的 while 循环解析不正确"
);

}();


// do while
new function(){

class A {
	*generator(){
		var i = 0;

		do {
			yield ++i
		}
		while(i < 5)

		return 50
	}
};

checkGenerator(
	new A().generator(),
	[1, 2, 3, 4, 5, 50],
	"生成器中的 do while 循环解析不正确"
);

}();


// switch
new function(){

class A {
	static *generator(obj){
		var value = 100

		switch(obj.num){
			case 1:
				value += 1;
				yield value
				value += 5;

			// 故意放中间，测试会不会出现 bug
			default:
				value += 10
				yield value++

			case 1:
				yield value

			case 2:
				yield 2;
				break;

			case 3:
				yield 3
		}

		yield value
	};
}

var x = 0;

checkGenerator(
	A.generator({
		get num(){
			x++;
			return 1;
		}
	}),
	[101, 116, 117, 2, 117],
	"生成器中的 switch case 解析不正确"
);

checkGenerator(
	A.generator({ num: 5 }),
	[110, 111, 2, 111],
	"生成器中的 switch default 解析不正确"
);

if(x > 1){
	throw "switch 中的条件没有提出来，多次被计算"
}

function* generator(){
	switch(1){
		case 2:
			yield "x"
			break
		
		case 3:
			yield "y"
	}
		
	yield "z"
};

checkGenerator(
	generator(),
	["z"],
	"没有 default 表达式，且条件不匹配时，生成器函数没有运行到底"
);

function* generator1(){
	switch(1){
		case 2:
			yield "x"
			break
		
		case 3:
			yield "y"
		
		default:
			yield "y1"
	}
		
	yield "z"
};

checkGenerator(
	generator1(),
	["y1", "z"],
	"default 表达式为最后分支情况下，解析不正确"
);

function* generator2(){
	switch(1){
		default:
			yield "y1"

		case 2:
			yield "x"
			break
		
		case 3:
			yield "y"
	}
		
	yield "z"
};

checkGenerator(
	generator2(),
	["y1", "x", "z"],
	"default 表达式在非最后分支情况下，解析不正确"
);

}();


// 所有
new function(){

function* generator(obj){
	var value = 100

	switch(obj.num){
		case 1:
			value += 1;
			yield value
		
			if(value % 2 === 1){
				for(var i = 0;i < 3;i++){
					if(i % 3 === 0){
						value -= 30
					}
					else {
						yield value += i
					}
				}
			}
			else {
				value += 50;
			}

		case 1:
			do {
				yield value++
			}
			while(value < 76)

		default:
			value += 10
			yield value++

		case 2:
			yield 1;
			break;

		case 3:
			yield 100
	}

	yield value
};

checkGenerator(
	generator({ num: 1 }),
	[101, 72, 74, 74, 75, 86, 1, 87],
	"生成器中的混合条件解析不正确"
);

}();

}(
	// checkGenerator
	function(generator, values, error){
		var result = generator.next();

		for(var i = 0;;i++){
			if(values[i] !== result.value){
				throw error + ": 第" + i + "项";
			}

			if(result.done){
				return;
			}

			result = generator.next();
		}
	}
);