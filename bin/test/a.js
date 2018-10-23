// 相对路径
import generator from "b.js";
// 再次加载
import $generator from "./b.js";
// 项目 node_modules
import uglifyByRexjs from "uglify-js";
// nodejs 核心模块
import pathByRexjs from "path";
// 当前目录下的 url 文件
import url from "./url";

export default class A {}

let uglifyByRequire = require("uglify-js");
let pathByRequire = require("path");

const URL_STRING = "https://china-liji.github.io/Rexjs.org";

let gen = generator();

let hello = gen.next().value;

let ext = gen.next().value;

let $path = gen.next().value;

let myUrl = url(URL_STRING);

[
	hello,
	ext,
	myUrl,
	generator,
	pathByRexjs,
	pathByRexjs,
	uglifyByRexjs.minify
]
.forEach(
	function(value, index){
		if(value !== this[index]){
			throw `rexjs 在 node 环境中出现错误：${index}`;
		}
	},
	[
		"world",
		".js",
		URL_STRING,
		$generator,
		pathByRequire,
		$path,
		uglifyByRequire.minify
	]
);

console.log("node 环境运行测试全部通过!")