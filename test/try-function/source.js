var a = 123;


if(try a !== void 0){
	throw "非函数的返回值应该为 undefined";
}

var value = new try a;

if(typeof value !== "object" || JSON.stringify(value) !== "{}"){
	throw "try new 非函数的返回值应该为一个空对象";
}

a = function(){
	return 123;
}

if(try new a !== void 0){
	throw "try new 非函数的返回值应该为 undefined";
}

var i = 0;

a = function(value){
	i++;

	if(i < 5){
		return a;
	}
	
	return value;
}

var obj = {
	a: a
}

if(200 + try try try try try obj.a(10)(20)(...[30])(40)(...[50]) + 100 !== 350){
	throw "多个 try 的返回值不对";
}

i = 0;

if(try try try new try try obj["a"](10)(20)(...[30])(40)(...[50]) !== void 0){
	throw "多个 try 中加上 new 后的返回值不对";
}