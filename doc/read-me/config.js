import fs from "fs";
import path from "path";
import packageJson from "../../package.json";

export let { Lang, Config } = new function(getRexjsSize){

this.Lang = function(){
	return class Lang {
		cn = "";
		en = "";

		/**
		 * 语言
		 * @param {String} cn - 中文
		 * @param {String} en - 英文
		 */
		constructor(cn, en){
			this.cn = cn;
			this.en = en;
		};
	};
}();

this.Config = function(Lang, BROWSER_SUPPORT, REXJS_FILE_SIZE, getImageURL){
	return class Config {
		static DIST_DIR = "./dist";

		static FASTER_IMAGE_URL = getImageURL("../image/compare.jpg");

		static GIT_HUB = "https://github.com/china-liji/Rexjs";

		static REXJS_VERSION = packageJson.version;

		static commandLine = new Lang("命令行", "Command Line");

		static crossBrowser = new Lang(
			`支持${BROWSER_SUPPORT}等现代浏览器。`,
			`cross browser: ${BROWSER_SUPPORT}.`
		);

		static "f&s" = new Lang("更小且更快", "Faster and Smaller");

		static filename = new Lang("文件名", "filename");

		static helper = new Lang(
			"Rexjs-api 编译后的代码，在浏览器端运行时所依赖的文件",
			"This file provides generated code API, so reference it before run generated code in your browser."
		);

		static homepage = new Lang("官网", "Homepage");

		static htmlTemplate = new Lang("HTML 数据绑定模板。", "A data binding HTML template compiler.");
		
		static importApi = new Lang("引入 rexjs-api 文件", `import "rexjs-api" module`);

		static initParser = new Lang("初始化解析器，以便多次使用", "initialize parser");

		static initFile = new Lang("初始化文件", "init file");

		static install = new Lang("安装", "Install");

		static lang = new Lang("English", "中文");

		static langPath = new Lang("", "blob/master/doc/read-me/chinese.md");
		
		static link = new Lang("相关链接", "Link");

		static madeInChina = new Lang("Made In China", "");

		static otherPackages = new Lang("拓展包", "Other Packages");

		static output = new Lang("输出", "output");

		static parse = new Lang("开始解析文件语法", "parse module from a file");

		static reference = new Lang("详细参考：", "reference:");

		static result = new Lang("获取编译后的代码", "returning the generated code");

		static slogan = new Lang(
			"Rexjs - 是一款又快、又小、性价比极高的 `JavaScript(ES6+)` 语法的编译器！",
			"Rexjs is a faster and smaller `JavaScript(ES6+)` compiler!"
		);

		static source = new Lang("源码", "source");

		static scriptTypeAttribute = new Lang(
			"使用 type 属性定义模块",
			`set the "type" attribute to define a module`
		);

		static scriptSrcAttribute = new Lang(
			"当然，一旦指定 src，则根据其路径来加载指定入口模块文件，",
			`also, set the "src" attribute to reference a module,`
		);

		static scriptSourcemapsAttribute = new Lang(
			"而且，一旦提供 data-sourcemaps 属性时，不管值是什么，都将启用“源代码映射”功能。",
			`and add the "data-sourcemaps" attribute to enable sourcemaps.`
		);

		static smallerDesc = new Lang(`仅仅只有 ${REXJS_FILE_SIZE}，比其他解析器更小。`, `only ${REXJS_FILE_SIZE}, smaller than others.`);

		static thanks = new Lang("非常感谢您能看到这里，谢谢！", "Thanks!");

		static usage = new Lang("使用", "Usage");

		static webpackLoader = new Lang("Webpack Loader。", "Webpack Loader.");
	};
}(
	this.Lang,
	// BROWSER_SUPPORT
	"`Chrome`、`Firefox`、`Safari`、`IE9+`",
	// REXJS_FILE_SIZE
	getRexjsSize(),
	// getImageURL
	(filepath, type = "jpeg") => {
		return `data:image/${type};base64,${
			fs.readFileSync(
				path.resolve(__dirname, filepath),
				"base64"
			)
		}`;
	}
);

}(
	// getRexjsSize
	() => {
		var filename = path.resolve(__dirname, "../../dist/rex.min.js");

		return (
			Math.round(
				fs.statSync(filename).size / 1024
			) +
			"KB"
		);
	}
);