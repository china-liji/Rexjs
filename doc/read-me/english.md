### Rexjs is a faster and smaller `JavaScript(ES6+)` compiler!

------

#### [中文](https://github.com/china-liji/Rexjs/blob/master/doc/read-me/chinese.md)

#### Link
* [Homepage](https://china-liji.github.io/Rexjs.org)
* [GitHub](https://github.com/china-liji/Rexjs)

#### Install
* NPM
```
npm install rexjs-api
```

* Git
```
git clone https://github.com/china-liji/Rexjs.git
```

* Download

[Zip](https://github.com/china-liji/Rexjs/archive/master.zip)

[rex.min.js](https://raw.githubusercontent.com/china-liji/Rexjs/master/./dist/rex.min.js) - 256KB

[rex-api.min.js](https://raw.githubusercontent.com/china-liji/Rexjs/master/./dist/rex-api.min.js) - 252KB

[rex-browser-helper.min.js](https://raw.githubusercontent.com/china-liji/Rexjs/master/./dist/rex-browser-helper.min.js) - 18KB

-----

#### Faster and Smaller
![](https://raw.githubusercontent.com/china-liji/Rexjs/master/doc/image/compare.jpg)

`./dist/rex.min.js`[1.7.2] only 256KB, smaller than others.

-----

#### Usage

> **Web**
```html
<script src="./dist/rex.min.js"></script>

<!-- set the "type" attribute to define a module -->
<script type="text/rexjs">
	import "./module.js";

	export default class {};
</script>

<!--
	also, set the "src" attribute to reference a module,
	and add the "data-sourcemaps" attribute to enable sourcemaps.
-->
<script src="./module.js" type="text/rexjs" data-sourcemaps></script>
```
cross browser: `Chrome`、`Firefox`、`Safari`、`IE9+`.

> **Nodejs**

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

// output ".js"
ext(__filename);
```

* Command Line
```
rexjs ./index.js
```

> **Rexjs API**

* JavaScript
```js
// import "rexjs-api" module

// Nodejs
let Rexjs = require("rexjs-api");

// Web Worker
importScripts("./dist/rex-api.min.js");
let Rexjs = self.Rexjs;

// Web: <script src="./dist/rex.min.js"></script>
let Rexjs = window.Rexjs;


// initialize parser
let es5Code = "", parser = new Rexjs.ECMAScriptParser();

// parse module from a file
parser.parse(
	// init file
	new Rexjs.File(
		// filename
		"./filename.js",
		// source
		"class Car {}"
	)
);

// returning the generated code
es5Code = parser.build();
```

* HTML

This file provides generated code API, so reference it before run generated code in your browser.
```html
<script src="./dist/rex-browser-helper.min.js"></script>
```

-----

#### Other Packages

* [Rexjs-loader](https://github.com/china-liji/Rexjs-loader) - Webpack Loader.

* [Rexjs-template](https://github.com/china-liji/Rexjs-template) - A data binding HTML template compiler.

-----

Thanks!