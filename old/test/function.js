new function(description = "函数默认值解析错误。"){

// rex 模式
function rexMode(){
	"use strict -rex"
	
	return {
		rexMode = function(){}
	}
}

// 默认值 和 省略值
new function defaultValue1(
	x = 1,
	...r,
	// 嵌套的函数默认值
	y = function(a = x){
		if(
			a !== 1
		){
			throw description
		}
		
		return "";
	}(),
	z = 99,
	normal,
	...rest
){
	"use strict -rex" + x === "use strict -rex1" || function(){ throw description }();
	
	switch(
		false
	){
		case y === "" :
			break;
			
		case Array.isArray(r) :
			break;
			
		case r.join("") === "1234":
			break;
			
		case z === 1 :
			break;
			
		case normal === 2 :
			break;
			
		case Array.isArray(rest) :
			break;
			
		case rest.join("") === "34" :
			break;
			
		default :
			return;
	}

	throw description
}(
	void 0, void 0, void 0, 1, 2, 3, 4 
)

function defaultValue2(x = "Michael", y = 2, z, ...rest){
	"use strict"
}

this.name = "Lee"

function check(str){
	if(
		str !== "Michael Lee"
	){
		throw description
	}
}

// 箭头函数
var fn = (x = "Michael", y = 2, ...z) => {
	return x + " " + this.name
}

check(
	fn()
)

// 不带小括号的箭头函数
fn = x => {
	return x + " " + this.name
}

check(
	fn("Michael")
)

var fn2 = x

	=>
	
	x + " " + this.name,
	
	fn3 = (x = "Michael")
	
	=>
	
	x + " " + this.name

check(
	fn2("Michael")
)

check(
	fn3()
)

var obj = {
	fn : (x = "Michael", y = 2, ...z)
		=> 
		x + " " + this.name
	,
	fn1 : function(x = "Michael", y = 2, ...z){
		return x + " " + y
	}
}

// 测试对象内部的函数
check(
	obj.fn()
)

check(
	obj.fn1(void 0, "Lee")
)
}();