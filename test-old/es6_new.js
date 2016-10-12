﻿"use strict -rex";

setTimeout(
	function(){
		import { a, b } from ".///////a.js";
	},
	1000
);

console.log(123);

/*
window.a = undefined;
window.b = 0;
window.c = 99;

var obj = { a = b + 3, b : 2 };

{ a = 5, b, c = a + 100 } = obj;
*/