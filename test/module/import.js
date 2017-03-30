//import * as M from "./module/a.js"

//import { a, b } from "./module/a.js"

//import MyClass from "./module/a.js"

import xml from "./module/a.xml"
import css from "./module/a.css"

if(css !== "body { color: red; }"){
	throw "css 文件读取错误";
}

if(xml !== "<test>123</test>"){
	throw "xml 文件读取错误";
}

var z = 3

export let x = 1, y = 2

export default function(){}

export class fn{}

export { window as win, document };

export * from "./module/a.js"

export { x as t, z }

debugger