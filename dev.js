new function(fs, contentTypes){

this.Server = function(DIR_NAME, http, path, childProcess, testPath, error, readFile){
	return class Server {
		constructor(){
			var server = http.createServer((incomingMessage, serverResponse) => {
				var url = incomingMessage.url, p = path.parse(url);

				serverResponse.setHeader("charset", "utf8");

				if(!testPath(p)){
					error(serverResponse);
					return;
				}

				var fullPath = DIR_NAME + url;

				fs.stat(
					fullPath,
					(err, stats) => {
						if(err || !stats.isFile()){
							error(serverResponse);
							return;
						}

						if(p.base === "rex-es.js"){
							childProcess.execFileSync("node", ["index.js", "-dev"]);
						}

						readFile(fullPath, p, serverResponse);
					}
				);
			});

			server.on(
				"error",
				(err) => {
					throw err;
				}
			);

			server.listen(
				"729",
				() => {
					console.log("服务器开启，端口：729");
				}
			);
		};
	};
}(
	// DIR_NAME
	__dirname,
	require("http"),
	require("path"),
	require("child_process"),
	// testPath
	(path) => {
		return (
			/\/(?:dev|test|source)(?:\/|$)/.test(path.dir) &&
			/^(?:\.js|\.css|\.html|\.json|\.txt|\.xml)$/.test(path.ext)
		);
	},
	// error
	(serverResponse) => {
		serverResponse.setHeader("Content-Type", "text/plain;charset=utf-8;");
		serverResponse.writeHead(404);
		serverResponse.write("找不到指定文件！");
		serverResponse.end();
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

				serverResponse.setHeader("Content-Type", `${contentTypes[path.ext]};charset=utf-8;`);
				serverResponse.writeHead(200);
				serverResponse.write(content);
  				serverResponse.end();
			}
		);
	}
);

new this.Server();

}(
	require("fs"),
	// contentTypes
	{
		".txt": "text/plain",
		".js": "text/javascript",
		".html": "text/html",
		".css": "text/css",
		".json": "application/json",
		".xml": "text/xml"
	}
);