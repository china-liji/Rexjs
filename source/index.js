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
						var content = File.read(`${MAPS_PATH}/${filename}`);

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
						case "file-header.js":
							break;

						case "file-footer.js":
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
									"\\n//# sourceURL=http://rexjs.org/${filename}"
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

console.time("time");
new this[dev ? "DevSource" : "Source"]().generate();
console.timeEnd("time");
}(
	// MAPS_PATH
	"/maps",
	// dev
	process.argv.indexOf("-dev") > -1,
	// list
	[
		"file-header.js",
		"ecmaScript-helper.js",
		"common-expression.js",
		"ecmaScript-statement.js",
		"ecmaScript-statements.js",
		"basic-tag.js",
		"file-position.js",
		"literal-base.js",
		"literal-inheritor.js",
		"mathematical-number.js",
		"identifier.js",
		"variable.js",
		"semicolon.js",
		"line-terminator.js",
		"comment.js",
		"accessor-dot.js",
		"accessor-bracket.js",
		"comma.js",
		"unary-base.js",
		"unary-non-assginment.js",
		"unary-assginment.js",
		"in(de)crement.js",
		"binary-base.js",
		"binary-special.js",
		"binary-all.js",
		"exponentiation.js",
		"ternary.js",
		"call.js",
		"spread.js",
		"destructuring.js",
		"array.js",
		"declaration-array.js",
		"nested-declaration-array-item.js",
		"block.js",
		"block-component.js",
		"function.js",
		"function-declaration.js",
		"generator.js",
		"argument.js",
		"argument-default.js",
		"argument-rest.js",
		"function-body.js",
		"target.js",
		"grouping.js",
		"arrow.js",
		"property.js",
		"property-iteral-name.js",
		"property-identifier-name.js",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		// "",
		"file-footer.js"
	]
);