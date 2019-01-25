new function(fs, path, contentTypes, success, error){

this.Server = function(DIR_NAME, EXT_REGEXP, http, readFile){
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
					(err, stats) => {
						// 如果 有错误 或 不是文件
						if(err || !stats.isFile()){
							// 报错
							error(serverResponse);
							return;
						}

						// 直接读取文件并返回
						readFile(fullPath, pathInfo, serverResponse);
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
	};
}(
	// DIR_NAME
	path.resolve(__dirname, "../../"),
	// EXT_REGEXP
	/^(?:\.js|\.css|\.html|\.json|\.txt|\.xml|\.md)$/,
	require("http"),
	// readFile
	(fullPath, pathInfo, serverResponse) => {
		fs.readFile(
			fullPath,
			"utf8",
			(err, content) => {
				if(err){
					error(serverResponse);
					return;
				}

				success(serverResponse, content, contentTypes[pathInfo.ext]);
			}
		);
	}
);

module.exports = this;

}(
	require("fs"),
	require("path"),
	// contentTypes
	{
		".txt": "text/plain",
		".js": "text/javascript",
		".html": "text/html",
		".css": "text/css",
		".json": "application/json",
		".xml": "text/xml",
		".md": "text/plain"
	},
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