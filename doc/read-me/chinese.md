### Rexjs - 是一款又快、又小、性价比极高的 `JavaScript(ES6+)` 语法的编译器！

------

#### [English](https://github.com/china-liji/Rexjs/)

#### 相关链接
* [官网](http://www.rexjs.org)
* [GitHub](https://github.com/china-liji/Rexjs)

#### 安装
* NPM
```
npm install rexjs-api
```

* Git
```
git clone https://github.com/china-liji/Rexjs.git
```

* [Zip](https://github.com/china-liji/Rexjs/archive/master.zip)

-----

#### 使用

> Web
```html
<script src="./dist/rex.min.js"></script>

<!-- 使用 type 属性定义模块 -->
<script type="text/rexjs">
	import "./file.js";

	export default class {};
</script>

<!--
	当然，一旦指定 src，则根据其路径来加载指定入口模块文件，
	而且，一旦提供 data-sourcemaps 属性时，不管值是什么，都将启用“源代码映射”功能。
-->
<script src="./file.js" type="text/rexjs" data-sourcemaps></script>
```
支持`Chrome`、`Firefox`、`Safari`、`IE9+`等现代浏览器。

> Nodejs

* ./ext.js
```js
import path from "path";

export default function(filename){
	return path.parse(filename).ext;
};
```

* ./index.js
```js
import ext from "./ext.js";

// 输出 ".js"
ext(__filename);
```

* 命令行
```
rexjs ./index.js
```

> Webpack Loader

详细参考：[Rexjs-loader](https://github.com/china-liji/Rexjs-loader)

> Rexjs API

* JavaScript
```js
// 引入 rexjs-api 文件

// Nodejs
let Rexjs = require("rexjs-api");

// Web Worker
importScripts("./dist/rex.min.js");
let Rexjs = self.Rexjs;

// Web: <script src="./dist/rex.min.js"></script>
let Rexjs = window.Rexjs;


// 初始化解析器，以便多次使用
let es5Code = "", parser = new Rexjs.ECMAScriptParser();

// 开始解析文件语法
parser.parse(
	// 初始化文件
	new Rexjs.File(
		// 文件名
		"./filename.js",
		// 源码
		"class Car {}"
	)
);

// 获取编译后的代码
es5Code = parser.build();
```

* HTML
```html

<!-- Rexjs-api 编译后的代码，在浏览器端运行时所依赖的文件 -->
<script src="./dist/rex-browser-helper.min.js"></script>
```

-----

#### 开源许可
MIT