new function(fs, path, contentTypes, success, error){

this.Server = function(Promise, DIR_NAME, EXT_REGEXP, http, url){
	/**
	 * 服务器
	 */
	return class Server {
		constructor(port, staticDirs){
			let server, staticDirRegExp;

			if(!Array.isArray(staticDirs)){
				staticDirs = [staticDirs];
			}

			staticDirRegExp = new RegExp(`^(?:${staticDirs.join("|")})/`, "ig");
			
			server = http.createServer((incomingMessage, serverResponse) => {
				let urlInfo = url.parse(incomingMessage.url),

					urlString = urlInfo.pathname,
				
					pathInfo = path.parse(urlInfo.pathname);

				// 设置编码
				serverResponse.setHeader("charset", "utf8");

				staticDirRegExp.lastIndex = EXT_REGEXP.lastIndex = 0;

				// 如果不是可访问的文件类型
				if(!staticDirRegExp.test(urlString) || !EXT_REGEXP.test(pathInfo.ext)){
					// 报错
					error(serverResponse, `文件类型不匹配：${urlString}`);
					return;
				}

				let fullPath = DIR_NAME + urlString;

				// 判断文件状态
				fs.stat(
					fullPath,
					async (err, stats) => {
						// 如果 有错误 或 不是文件
						if(err || !stats.isFile()){
							// 报错
							error(serverResponse, "读取的目标不是文件");
							return;
						}

						try {
							// 直接读取文件并返回
							success(
								serverResponse,
								await this.readFile(fullPath, pathInfo, urlInfo, incomingMessage),
								contentTypes[pathInfo.ext]
							);
						}
						catch(e){
							console.error(e.stack);
							error(serverResponse, e);
						}
					}
				);
			});

			// 监听错误事件
			server.on(
				"error",
				(err) => {
					// 抛出错误
					throw err;
				}
			);

			// 监听端口
			server.listen(
				port,
				() => {
					// 打印信息
					console.log(`服务器开启，端口：${port}`);
				}
			);
		};

		async readFile(fullPath, pathInfo){
			return await new Promise((res, rej) => {
				fs.readFile(
					fullPath,
					"utf8",
					(err, content) => {
						if(err){
							rej(err);
							return;
						}

						res(content);
					}
				);
			});
		};
	};
}(
	Promise,
	// DIR_NAME
	path.resolve(__dirname, "../../"),
	// EXT_REGEXP
	new RegExp(
		`^(?:${
			Object
				.keys(contentTypes)
				.map((ext) => {
					return `\\${ext}`;
				})
				.join("|")
		})$`
	),
	require("http"),
	require("url")
);

module.exports = this;

}(
	require("fs"),
	require("path"),
	// contentTypes
	require("./content-types.json"),
	// success
	(serverResponse, content, contentType) => {
		serverResponse.setHeader("Content-Type", `${contentType};charset=utf-8;`);
		serverResponse.writeHead(200);
		serverResponse.write(content);
		serverResponse.end();
	},
	// error
	(serverResponse, description) => {
		serverResponse.setHeader("Content-Type", "text/plain;charset=utf-8;");
		serverResponse.writeHead(404);
		serverResponse.write(`找不到指定文件：${description}。`);
		serverResponse.end();
	}
);