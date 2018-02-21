### Rexjs - 是一款又快、又小、性价比极高的 `JavaScript(ES6+)` 语法的编译器！

------

#### 官方链接
* [官网](http://www.rexjs.org)
* [Git](https://github.com/china-liji/Rexjs)

#### 下载、安装
* NPM
```
npm install rexjs-api
```

* Git
```
git clone https://github.com/china-liji/Rexjs.git
```

* Zip
> [https://github.com/china-liji/Rexjs/archive/master.zip](https://github.com/china-liji/Rexjs/archive/master.zip)

* Web 版源代码
> [直引用文件](http://rexjs.org/rex.min.js)

* API 版
> [API 文件](http://rexjs.org/rex-api.min.js)

> [浏览器端辅助文件](http://rexjs.org/rex-browser-helper.min.js)

#### Rexjs API 于 Webpack 打包中应用：
详细参考：[Rexjs-loader](https://github.com/china-liji/Rexjs-loader)

#### Rexjs API 应用：
- `JavaScript` 代码
```js
// 引入 rex api 文件

// Nodejs
let Rexjs = require("./rex-api.min.js");

// Web Worker
importScripts("./rex-api.min.js");
let Rexjs = self.Rexjs;

// 浏览器：先引用文件 <script src="./rex-api.min.js"></script>
let Rexjs = window.Rexjs;


// 初始化解析器，以便多次使用
let es5Code = "", parser = new Rexjs.ECMAScriptParser();

// 开始解析文件语法
parser.parse(
	// 初始化文件
	new Rexjs.File(
		// 文件名
		"./filename.js",
		/*
			文件内容：
			1. Nodejs 可以用 fs 读取等；
			2. Web Worker 可以用 self.onmessage 接收等；
			3. 浏览器使用 Ajax 从服务器获取 或 使用 FileReader 读取等。
		*/
		"class Car {}"
	)
);

/*
	生成并获取编译后的代码：
	1. Nodejs 可以交由打包工具 或 直接输出到页面等；
	2. Web Worker 通过 self.postMessage 输出内容等；
	3. 浏览器使用 eval(es5Code) 或 new Function(es5Code)() 直接运行代码等。
*/
es5Code = parser.build();
```

- `HTML` 代码
```html
<!--
	该文件是编译后代码所需依赖的 API，
	所以，该文件内容必须在编译输出之前引用 或 在编译内容之前打包进项目。
-->
<script src="./rex-browser-helper.min.js"></script>
```

#### 浏览器应用：
```html
<!-- 引用 rexjs -->
<script src="http://www.rexjs.org/rex.min.js"></script>

<!-- 使用 type 定义模块 -->
<script type="text/rexjs">
	import "./file.js";

	export default class {};
</script>

<!--
	当然，一旦指定 src，则根据其路径来加载指定入口模块文件，
	而且，一旦提供 data-sourcemaps 属性时，不管值是什么，都将启用“源代码映射”功能。
	友情提示：源代码映射是要耗性能的，如果代码量大，发布上线的版本时，应该关闭该功能。
-->
<script src="./file.js" type="text/rexjs" data-sourcemaps></script>
```
支持`Chrome`、`Firefox`、`Safari`、`IE9+`等现代浏览器。

-----

#### 纯中国制造：
此解析器未引用任何第三方**插件**及**类库**，属于完全独立、创新的一款 ```JavaScript``` 语法编译器，它是 100% **纯中国制造**！