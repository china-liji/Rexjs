new function(MAPS_PATH, dev, list){

this.File = function(fs, DIR_NAME){
	return class File {
		static read(filepath){
			return fs.readFileSync(`${DIR_NAME}/${filepath}`, "utf8");
		};

		static write(filepath, content){
			fs.writeFileSync(`${DIR_NAME}/${filepath}`, content, "utf8");
		};
	};
}(
	require("fs"),
	// DIR_NAME
	__dirname
);

this.Source = function(File, EventEmitter){
	return class Source extends EventEmitter {
		generate(){
			File.write(
				"rex-es.js",
				list.map((filename) => {
						var content = File.read(`${MAPS_PATH}/${filename}.js`);

						this.emit("read", content, filename);
						return content;
					})
					.join(
						"\n".repeat(3)
					)
			);
		};
	};
}(
	this.File,
	require("events").EventEmitter
);

this.DevSource = function(Source, File, FUNCTION_BODY_REGEXP_SOURCE){
	return class DevSource extends Source {
		constructor(){
			var contents = [];

			super();

			this.on(
				"read",
				(content, filename) => {
					switch(filename){
						case "header":
							break;

						case "footer":
							break;

						default:
							contents.push(
								`eval(
									function(){
										${content}
									}
									.toString()
									.match(
										/${FUNCTION_BODY_REGEXP_SOURCE}/
									)[1] +
									"\\n//# sourceURL=http://rexjs.org/${filename}.js"
								)`
							);
							return;
					}

					contents.push(content);
				}
			);

			this.contents = contents;
		};

		generate(){
			super.generate();

			File.write(
				"../dev/rex-es.js",
				this.contents.join(
					"\n".repeat(3)
				)
			);
		};
	};
}(
	this.Source,
	this.File,
	// FUNCTION_BODY_REGEXP_SOURCE
	/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/.source
);

new this[dev ? "DevSource" : "Source"]().generate();

}(
	// MAPS_PATH
	"/maps",
	// dev
	process.argv.indexOf("-dev") > -1,
	// list
	[
		"header",
		"helper",
		"footer"
	]
);