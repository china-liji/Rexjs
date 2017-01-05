new function(description){
"use strict -rex"

// 把 obj 放在小括号内，测试小括号内的对象是否能被解析
var obj = ({
	get a(){},
	get "b"(){},
	obj,
	c(){},
	"d"(){},
	["a" + "b"] : 1,
	hello : 55,
	["b" + "c"] : 2,
	["c" + "d"](){},
	get ["d" + "e"](){}
})

var obj = {
	// 计算式名称
	["a" + "b"] : 1,
	// 计算式方法
	["f" + "n"](){},
	// 计算式访问器
	set ["setter"](){},
	// 访问器
	get "setter"(){},
	// 简写方法
	shorthand(){},
	// 简写属性名称
	description,
	// 默认值
	//obj = true,
	// 键值对
	key : true
}

var compare = {
	ab : "number",
	fn : "function",
	setter : "undefined",
	shorthand : "function",
	description : "string",
	key : "boolean"
}

for(
	var name in compare
){
	if(
		compare[name] === typeof obj[name]
	){
		continue
	}
	
	throw description
}

obj = {
	// 单个计算式测试
	["a" + "b"](){}
}

obj = {
	// 单个计算式访问器测试
	get ["a" + "b"](){}
}

// 嵌套的对象
obj = {
	ob : {
		["a" + "b"](){},
		o : {
			["cd"] : 1
		}
	}
}

}(
	// description
	"对象解析错误。"
);
