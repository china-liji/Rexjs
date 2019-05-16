new function(fs, path, contentTypes, success, error){

this.Server = function(Promise, DIR_NAME, EXT_REGEXP, http){
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
				let url = incomingMessage.url, pathInfo = path.parse(url);

				// 设置编码
				serverResponse.setHeader("charset", "utf8");

				staticDirRegExp.lastIndex = EXT_REGEXP.lastIndex = 0;

				// 如果不是可访问的文件类型
				if(!staticDirRegExp.test(url) || !EXT_REGEXP.test(pathInfo.ext)){
					// 报错
					error(serverResponse);
					return;
				}

				let fullPath = DIR_NAME + url;

				// 判断文件状态
				fs.stat(
					fullPath,
					async (err, stats) => {
						// 如果 有错误 或 不是文件
						if(err || !stats.isFile()){
							// 报错
							error(serverResponse);
							return;
						}

						try {
							// 直接读取文件并返回
							success(
								serverResponse,
								await this.readFile(fullPath, pathInfo, incomingMessage),
								contentTypes[pathInfo.ext]
							);
						}
						catch(e){
							error(serverResponse);
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
	require("http")
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
	(serverResponse) => {
		serverResponse.setHeader("Content-Type", "text/plain;charset=utf-8;");
		serverResponse.writeHead(404);
		serverResponse.write("找不到指定文件！");
		serverResponse.end();
	}
);