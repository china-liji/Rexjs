### Rexjs is a faster and smaller `JavaScript(ES6+)` compiler!

------

#### [中文](https://github.com/china-liji/Rexjs/blob/master/doc/read-me/chinese.md)

#### Link
* [Homepage](http://www.rexjs.org)
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

* [Zip](https://github.com/china-liji/Rexjs/archive/master.zip)

-----

#### Usage

> Web
```html
<script src="./dist/rex.min.js"></script>

<!-- set the "type" attribute to define a module -->
<script type="text/rexjs">
	import "./file.js";

	export default class {};
</script>

<!--
	also, set the "src" attribute to reference a module,
	and add the "data-sourcemaps" attribute to enable sourcemaps.
-->
<script src="./file.js" type="text/rexjs" data-sourcemaps></script>
```
cross browser: `Chrome`、`Firefox`、`Safari`、`IE9+`.

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

// output ".js"
ext(__filename);
```

* Command Line
```
rexjs ./index.js
```

> Rexjs API

* JavaScript
```js
// import "rexjs-api" module

// Nodejs
let Rexjs = require("rexjs-api");

// Web Worker
importScripts("./dist/rex.min.js");
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

* Webpack Loader - [Rexjs-loader](https://github.com/china-liji/Rexjs-loader)

* Data binding HTML template - [Rexjs-template](https://github.com/china-liji/Rexjs-template)