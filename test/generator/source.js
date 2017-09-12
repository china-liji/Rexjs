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
	if(typeof fn !== "function"){
		throw "函数变量提升失败"
	}

	yield fn()

	var b = 5

	yield b

	if(typeof fn !== "function"){
		throw "函数的变量名声明没有提出到生成器头部";
	}

	function fn(){
		return 100;
	}

	yield 6
};

checkGenerator(
	generator(),
	[100, 5, 6],
	"变量提升解析失败"
);

}();


// 类变量提升
new function(){

function* generator(){
	var err = "类变量不存在变量提升"

	try {
		new A()
		throw  err
	}
	catch(e){
		if(e === err){
			throw err;
		}
	}

	class A {
		constructor(){
			this.value = A
		}
	}

	var b = new A()

	yield b

	if(typeof A !== "function"){
		throw "类的变量名声明没有提出到生成器头部"
	}
};

var g = generator()
g.next();
g.next();

}();


// try catch
new function(){

function* generator(){
	try {
		yield 1

		try {
			throw 123
		}
		catch(e){
			yield 2
			throw 999
		}
	}
	catch(e){
		yield 3

		try {
			var b = 2;
			throw 456
			yield 4
		}
		catch(d){
			var x = 55
			yield 5
		}
	}
	finally {
		var d = 4
		yield 6
	}

	try {
		throw 7
	}
	catch(e){
		yield 8
	}

	yield 9
}

checkGenerator(
	generator(),
	[1, 2, 3, 5, 6, 8, 9],
	"生成器中的 try catch 解析有误"
);

}();


// 解构
new function(){

var generator = function*(){
	var { a: { y, z }, b:[ b, x ] } = { a: { y: 100 }, b: [ , 200 ] }

	yield x

	yield y

	yield z

	var i, m, n

	([i, { m, n: [n] }] = [,{ m: 3, n:[5] }])

	yield m + n
}

checkGenerator(
	generator(),
	[200, 100, undefined, 8],
	"生成器中的解构解析有误"
);

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
						try {
							throw "123"
						}
						catch(e){
							yield value += i
						}
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