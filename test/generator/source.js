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
	["x", "x2", "3"],
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

			case 1:
				yield value

			case 2:
				yield 1;
				break;

			default:
				value += 10
				yield value++
				break;
				value += 200
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
	[101, 106, 106],
	"生成器中的 switch case 1 解析不正确"
);

checkGenerator(
	A.generator({ num: 2}),
	[1, 100],
	"生成器中的 switch case 2 解析不正确"
);

if(x > 1){
	throw "switch 中的条件没有提出来，多次被计算"
}

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

		case 2:
			yield 1;
			break;

		default:
			value += 10
			yield value++
			break;
			value += 200
	}

	yield value
};

checkGenerator(
	generator({ num: 1 }),
	[101, 72, 74, 74, 75, 86, 87],
	"生成器中的混合条件解析不正确"
);

}();


}(
	// checkGenerator
	function(generator, values, error){
		for(var i = 0, result = generator.next();!result.done;i++){
			if(values[i] !== result.value){
				throw error + ": 第" + i + "项";
			}

			result = generator.next();
		}
	}
);