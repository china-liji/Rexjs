import * as Module from "./export.js"

import ExportedClass from "./export.js"

import { a, b, x as c, MyClass as MC } from "./export.js"

import "export.js"

[Module.a, a, Module.x, c].forEach(function(value){
	if(value !== 1){
		console.error("模块输出值有误")
	}
})

if(ExportedClass !== Module.default){
	console.error("默认输出不一致")
}

if(typeof ExportedClass !== "function"){
	console.error("默认值输出错误")
}

if(Module.i !== 1){
	console.error("模块加载顺序出错")
}

if(typeof Module.MyClass !== "function"){
	console.error("没有输出类")
}

if(Module.MyClass !== MC){
	console.error("输出不对应")
}

if(typeof Module.myFunction !== "function"){
	console.error("没有输出函数")
}

import xml from "./a.xml"
import css from "./a.css"

if(css !== "body { color: #222; z-index: 99; position: relative; }"){
	console.error("css 文件读取结果错误")
}

if(getComputedStyle(document.body).zIndex !== "99"){
	console.error("css 并没有被加载进文档")
}

if(xml !== "<test>123</test>"){
	console.error("xml 文件读取结果错误")
}