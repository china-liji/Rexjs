export let { Lang, Config } = new function(){

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

this.Config = function(Lang, BROWSER_SUPPORT){
	return class Config {
		static DIST_DIR = "./dist";

		static GIT_HUB = "https://github.com/china-liji/Rexjs";

		static commandLine = new Lang("命令行", "Command Line");

		static crossBrowser = new Lang(
			`支持${BROWSER_SUPPORT}等现代浏览器。`,
			`cross browser: ${BROWSER_SUPPORT}.`
		);

		static filename = new Lang("文件名", "filename");

		static helper = new Lang(
			"Rexjs-api 编译后的代码，在浏览器端运行时所依赖的文件",
			"this file provides generated code API, so reference it before run generated code in your browser."
		);

		static homepage = new Lang("官网", "Homepage");
		
		static importApi = new Lang("引入 rexjs-api 文件", `import "rexjs-api" module`);

		static initParser = new Lang("初始化解析器，以便多次使用", "initialize parser");

		static initFile = new Lang("初始化文件", "init file");

		static install = new Lang("安装", "Install");

		static lang = new Lang("English", "中文");

		static langPath = new Lang("", "blob/master/doc/read-me/chinese.md");
		
		static license = new Lang("开源许可", "License");

		static link = new Lang("相关链接", "Link");

		static madeInChina = new Lang("Made In China", "");

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

		static usage = new Lang("使用", "Usage");

		static webpackUsage = new Lang("Webpack 打包中应用", "");
	};
}(
	this.Lang,
	// BROWSER_SUPPORT
	"`Chrome`、`Firefox`、`Safari`、`IE9+`"
);

}();