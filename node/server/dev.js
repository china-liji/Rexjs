new function(){

this.DevServer = function({ Server }, { DevSource }, typescript){
	return class DevServer extends Server {
		constructor(){
			super("9090", ["/dev", "/source", "/test"]);
		};

		async readFile(fullPath, pathInfo, urlInfo, incomingMessage){
			// 如果不 rex-es.js 文件
			if(pathInfo.base !== "rex-es.js"){
				let content = await super.readFile(fullPath, pathInfo);

				if(pathInfo.ext === ".ts"){
					return (
						typescript
							.transpileModule(
								content,
								{
									compilerOptions: {
										module: "ES6"
									}
								}
							)
							.outputText
					);
				}

				return content;
			}

			return new DevSource(`http://${incomingMessage.headers.host}/source`).generate();
		};
	};
}(
	// Server
	require("./index"),
	require("../index"),
	// typescript
	require("typescript")
);

new this.DevServer();

}();