new function(PROJECT_PATH){

this.Uglify = function(Source, Date, SOURCE_PATH, CHARSET, uglifyJs, fs, { version, repository, homepage }, console, getConfig){
	return class Uglify {
		constructor(){
			var files, result, info, path = `${PROJECT_PATH}/dist`;

			console.log(`正在合并 maps 文件至：${SOURCE_PATH}/rex-es.js`);

			info = `
				/*
				 * Rexjs
				 * version: ${version}
				 * homepage: ${homepage}
				 * GitHub: ${repository.url}
				 */
			`;

			info = info.replace(/(?:^\s*)|(?:[^\S\n]*$)/g, "").replace(/\n\s+/g, "\n ");

			// 先生成 rex-es.js 文件
			new Source().generate();

			files = [
				fs.readFileSync(`${SOURCE_PATH}/rex-core.js`, CHARSET),
				fs.readFileSync(`${SOURCE_PATH}/rex-basic.js`, CHARSET),
				fs.readFileSync(`${SOURCE_PATH}/rex-syntax.js`, CHARSET),
				fs.readFileSync(`${SOURCE_PATH}/rex-es.js`, CHARSET),
				fs.readFileSync(`${SOURCE_PATH}/rex-helper.js`, CHARSET),
				fs.readFileSync(`${SOURCE_PATH}/rex-browser.js`, CHARSET)
			];

			[
				getConfig("rex", files),
				getConfig("rex-api", files.slice(0, -1)),
				getConfig("rex-browser-helper", [files[0], files[1], files[4], files[5]], true)
			]
			.forEach(function(config){
				var { dirname, filename } = config, fullname = `${dirname}/${filename}`,

					code = config.files.join("\n"), result = uglifyJs.minify(code);

				console.log(`正在写入文件：${fullname}.*.js`);

				try {
					// 判断目录是否存在
					fs.statSync(dirname);
				}
				catch(e){
					fs.mkdirSync(dirname);
				}

				// 如果有错误
				if(result.error){
					// 抛出错误
					throw result.error;
				}

				// 写入非压缩文件
				fs.writeFileSync(fullname + ".bundle.js", info + code, CHARSET);
				// 写入压缩文件
				fs.writeFileSync(fullname + ".min.js", info + result.code, CHARSET);
			});
		};
	};
}(
	require("./index").Source,
	Date,
	// SOURCE_PATH
	`${PROJECT_PATH}/source`,
	// CHARSET
	"utf8",
	// uglifyJs
	require("uglify-js"),
	// fs
	require("fs"),
	require("../package.json"),
	console,
	// getConfig
	function(filename, files, minimize = false){
		return {
			dirname: `${PROJECT_PATH}/dist`,
			filename,
			files,
			minimize
		};
	}
);

new this.Uglify();

}(
	// PROJECT_PATH
	require("path").resolve(__dirname, "../")
);