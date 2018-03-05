### {{slogan}}

------

#### [{{lang}}]({{GIT_HUB}}/{{langPath}})

#### {{link}}
* [{{homepage}}](http://www.rexjs.org)
* [GitHub]({{GIT_HUB}})

#### {{install}}
* NPM
```
npm install rexjs-api
```

* Git
```
git clone {{GIT_HUB}}.git
```

* [Zip]({{GIT_HUB}}/archive/master.zip)

-----

#### {{usage}}

> Web
```html
<script src="{{DIST_DIR}}/rex.min.js"></script>

<!-- {{scriptTypeAttribute}} -->
<script type="text/rexjs">
	import "./file.js";

	export default class {};
</script>

<!--
	{{scriptSrcAttribute}}
	{{scriptSourcemapsAttribute}}
-->
<script src="./file.js" type="text/rexjs" data-sourcemaps></script>
```
{{crossBrowser}}

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

// {{output}} ".js"
ext(__filename);
```

* {{commandLine}}
```
rexjs ./index.js
```

> Webpack Loader

{{reference}} [Rexjs-loader]({{GIT_HUB}}-loader)

> Rexjs API

* JavaScript
```js
// {{importApi}}

// Nodejs
let Rexjs = require("rexjs-api");

// Web Worker
importScripts("{{DIST_DIR}}/rex.min.js");
let Rexjs = self.Rexjs;

// Web: <script src="{{DIST_DIR}}/rex.min.js"></script>
let Rexjs = window.Rexjs;


// {{initParser}}
let es5Code = "", parser = new Rexjs.ECMAScriptParser();

// {{parse}}
parser.parse(
	// {{initFile}}
	new Rexjs.File(
		// {{filename}}
		"./filename.js",
		// {{source}}
		"class Car {}"
	)
);

// {{result}}
es5Code = parser.build();
```

* HTML
```html

<!-- {{helper}} -->
<script src="{{DIST_DIR}}/rex-browser-helper.min.js"></script>
```

-----

#### {{license}}
MIT