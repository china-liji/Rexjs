new function(){

this.DevServer = function({ Server }, { DevSource }){
	return class DevServer extends Server {
		constructor(){
			super("9090", ["/dev", "/source", "/test"]);
		};

		readFile(fullPath, pathInfo, incomingMessage){
			// 如果不 rex-es.js 文件
			if(pathInfo.base !== "rex-es.js"){
				return super.readFile(fullPath, pathInfo);
			}

			return new DevSource(`http://${incomingMessage.headers.host}/source`).generate();
		};
	};
}(
	// Server
	require("./index"),
	require("../index")
);

new this.DevServer();

}();