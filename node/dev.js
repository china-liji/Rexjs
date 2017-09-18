new function(DevSource, fs, path, contentTypes, success, error){

this.Server = function(DIR_NAME, http, testPath, readFile){
	/**
	 * 服务器
	 */
	return class Server {
		constructor(){
			var server = http.createServer((incomingMessage, serverResponse) => {
				var url = incomingMessage.url, p = path.parse(url);

				// 设置编码
				serverResponse.setHeader("charset", "utf8");

				// 如果不是可访问的文件类型
				if(!testPath(p)){
					// 报错
					error(serverResponse);
					return;
				}

				var fullPath = DIR_NAME + url;

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

						// 如果不 rex-es.js 文件
						if(p.base !== "rex-es.js"){
							// 直接读取文件并返回
							readFile(fullPath, p, serverResponse);
							return;
						}

						success(
							serverResponse,
							// 生成开发源码
							new DevSource().generate(),
							contentTypes[p.ext]
						);
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

			// 监听 729 端口
			server.listen(
				"729",
				() => {
					// 打印信息
					console.log("服务器开启，端口：729");
				}
			);
		};
	};
}(
	// DIR_NAME
	path.resolve(__dirname, "../"),
	require("http"),
	// testPath
	(path) => {
		return (
			/^\/(?:dev|test|source|extension|old)(?:\/|$)/.test(path.dir) &&
			/^(?:\.js|\.css|\.html|\.json|\.txt|\.xml)$/.test(path.ext)
		);
	},
	// readFile
	(fullPath, path, serverResponse) => {
		fs.readFile(
			fullPath,
			"utf8",
			(err, content) => {
				if(err){
					error(serverResponse);
					return;
				}

				success(serverResponse, content, contentTypes[path.ext]);
			}
		);
	}
);

new this.Server();

}(
	require("./index").DevSource,
	require("fs"),
	require("path"),
	// contentTypes
	{
		".txt": "text/plain",
		".js": "text/javascript",
		".html": "text/html",
		".css": "text/css",
		".json": "application/json",
		".xml": "text/xml"
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