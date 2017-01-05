﻿"use strict -rex";

var get = [1], a = 2, set = (2, 6);

window.b = static class b {
	static a = "1";
	
	static b = "2";
	
	static get ["c"] (){
		return "3";
	};
	
	static get ["d"](){
		return "4";
	};
	
	static get e(){
		return "5";
	};
};

export class A extends Rexjs.List {
	a = 1;
	
	b = 2;
	
	static a = "1";
	
	c = 3;
	
	static b = "2";
	
	static get ["c"](){
		return "3";
	};
	
	d(){};
	
	static get ["d"](){
		return "4";
	};
	
	static e(){
		console.log("5");
	};
	
	constructor(list = [1,2], a  = 5, ...rest){
		//this;
		
		//super(list);
		
		this.e();
	}
	
	super(){
		//super();
	};
};

// 对象解析
window.c = {
	["a" + "cd"](){},
	get [a + set](x = 1, y = 2, z = 3){ return z; },
	get [set](){ return "get"; },
	"hello"(){},
	a
	,
	["a"+ "b"] : 0b0101 + 0o123,
	function(a = 5, b, c = 3, ...d){
		//var a = true ? ([]) : {k,["5"] : 1};
	},
	let : 1,
	a//
	,
	if(i = 0){},
	get a2(){ return a; }
};
/*
var get = 1;

// 对象解构赋值解析
{
	get,
	["s" + "e" + "t"] : set,
	"a" : a
} = {
	get : 1
};
*/

