### {{slogan}}

------

#### [{{lang}}]({{GIT_HUB}}/{{langPath}})

#### {{link}}
* [{{homepage}}](http://www.rexjs.org)
* [GitHub]({{GIT_HUB}})

#### {{install}}
* NPM
```
npm install {{PACKAGE_NAME}}
```

* Git
```
git clone {{GIT_HUB}}.git
```

* {{download}}

[Zip]({{GIT_HUB}}/archive/master.zip)

[{{FILENAME_REXJS}}]({{GIT_HUB_USER_CONTENT}}/{{DIST_DIR}}/{{FILENAME_REXJS}}) - {{REXJS_FILE_SIZE}}

[{{FILENAME_REXJS_API}}]({{GIT_HUB_USER_CONTENT}}/{{DIST_DIR}}/{{FILENAME_REXJS_API}}) - {{REXJS_API_SIZE}}

[{{FILENAME_REXJS_HELPER}}]({{GIT_HUB_USER_CONTENT}}/{{DIST_DIR}}/{{FILENAME_REXJS_HELPER}}) - {{REXJS_HELPER_SIZE}}

-----

#### {{f&s}}
![]({{GIT_HUB_USER_CONTENT}}/doc/image/compare.jpg)

`{{DIST_DIR}}/{{FILENAME_REXJS}}`[{{REXJS_VERSION}}] {{smallerDesc}}

-----

#### {{usage}}

> **Web**
```html
<script src="{{DIST_DIR}}/{{FILENAME_REXJS}}"></script>

<!-- {{scriptTypeAttribute}} -->
<script type="text/rexjs">
	import "./module.js";

	export default class {};
</script>

<!--
	{{scriptSrcAttribute}}
	{{scriptSourcemapsAttribute}}
-->
<script src="./module.js" type="text/rexjs" data-sourcemaps></script>
```
{{crossBrowser}}

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

// {{output}} ".js"
ext(__filename);
```

* {{commandLine}}
```
rexjs ./index.js
```

> **Rexjs API**

* JavaScript
```js
// {{importApi}}

// Nodejs
let Rexjs = require("{{PACKAGE_NAME}}");

// Web Worker
importScripts("{{DIST_DIR}}/{{FILENAME_REXJS_API}}");
let Rexjs = self.Rexjs;

// Web: <script src="{{DIST_DIR}}/{{FILENAME_REXJS}}"></script>
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

{{helper}}
```html
<script src="{{DIST_DIR}}/{{FILENAME_REXJS_HELPER}}"></script>
```

-----

#### {{otherPackages}}

* [Rexjs-loader]({{GIT_HUB}}-loader) - {{webpackLoader}}

* [Rexjs-template]({{GIT_HUB}}-template) - {{htmlTemplate}}

-----

{{thanks}}