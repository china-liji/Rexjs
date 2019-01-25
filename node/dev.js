new function(DevSource, fs, path, contentTypes, success, error){

this.ParserHelper = function({ ECMAScriptParser, File, URL, Base64 }, Buffer, parser){
	return class ParserHelper {
		static init(){
			// 绑定 base64 的编译方法
			Base64.bindBtoa(function(string){
				return Buffer.from(string).toString("base64");
			});

			ECMAScriptParser.sourceMaps = true;

			parser = new ECMAScriptParser();
		};

		static parse(pathInfo, source){
			parser.parse(
				// 初始化文件
				new File(
					new URL(
						"http://localhost:9090/" + path.format(pathInfo)
					),
					source
				)
			);

			return parser.build();
		};
	};
}(
	// Rexjs
	require("./rex-api.bundle.js"),
	Buffer,
	// parser
	null
);

this.Server = function(ParserHelper, DIR_NAME, MAP_PATH, http, testPath, readFile){
	/**
	 * 服务器
	 */
	return class Server {
		constructor(){
			let server = http.createServer((incomingMessage, serverResponse) => {
				let url = incomingMessage.url, pathInfo = path.parse(url);

				// 设置编码
				serverResponse.setHeader("charset", "utf8");

				// 如果不是可访问的文件类型
				if(!testPath(pathInfo)){
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

						// 如果不 rex-es.js 文件
						if(pathInfo.base !== "rex-es.js"){
							// 直接读取文件并返回
							readFile(fullPath, pathInfo, serverResponse);
							return;
						}

						success(
							serverResponse,
							// 生成开发源码
							new DevSource(`http://${incomingMessage.headers.host}/source`).generate(),
							contentTypes[pathInfo.ext]
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

			// 监听 9090 端口
			server.listen(
				"9090",
				() => {
					// 打印信息
					console.log("服务器开启，端口：9090");
				}
			);

			ParserHelper.init();
		};
	};
}(
	this.ParserHelper,
	// DIR_NAME
	path.resolve(__dirname, "../"),
	// MAP_PATH
	"/dev/map/",
	require("http"),
	// testPath
	(pathInfo) => {
		return (
			/^\/(?:dev|test|source)(?:\/|$)/.test(pathInfo.dir) &&
			/^(?:\.js|\.css|\.html|\.json|\.txt|\.xml|\.md)$/.test(pathInfo.ext)
		);
	},
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