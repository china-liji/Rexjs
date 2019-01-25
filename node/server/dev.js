new function(){

this.DevServer = function({ Server }){
	return class DevServer extends Server {
		constructor(){
			super("9090", ["/dev", "/source"]);
		};
	};
}(
	// Server
	require("./index")
);

new this.DevServer();

}();