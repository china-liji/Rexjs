### Rexjs - Made in China 的 ECMAScript 语言解析器

官方网站：[http://jqun.oschina.io/rexjs.org](http://jqun.oschina.io/rexjs.org)

新手教程：
`
<!-- 引用 rexjs -->
<script src="http://rexjs.org/rex.min.js"></script>

<!-- 使用 type 定义模块 -->
<script type="text/rexjs">
	import "./file.js";

	export default class {};
</script>

<!-- 当然，一旦指定 src，则根据其路径来加载指定模块文件 -->
<script src="./file.js" type="text/rexjs"></script>
`

支持浏览器：Chrome、Firefox、Safari、IE9+。

因涉及到某些 DOM，目前仅支持浏览器使用，今年9、10月的 1.1.0+ 或 1.2.0+ 版本将支持 Node 或 Web Worker，多谢理解。