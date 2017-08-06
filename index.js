new function(ELEMENTS_PATH, dev, list){

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
				"source/rex-es.js",
				list.map((filename) => {
						var content = File.read(`${ELEMENTS_PATH}/${filename}`);

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
								);`
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
				"dev/rex-es.js",
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
	/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/.source
);

console.time("time");
new this[dev ? "DevSource" : "Source"]().generate();
console.timeEnd("time");
}(
	// ELEMENTS_PATH
	"source/elements",
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
		"unary-exec.js",
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
		"property-initializer.js",
		"property-computed-name.js",
		"property-shorthand-method.js",
		"property-accessor.js",
		"object.js",
		"declaration-object.js",
		"declaration-property-name.js",
		"declaration-property-separator.js",
		"declaration-property-value.js",
		"declaration-array-item-object.js",
		"label.js",
		"terminated-flow.js",
		"return.js",
		"throw.js",
		"terminated-brach-flow.js",
		"break-continue.js",
		"var.js",
		"let.js",
		"const.js",
		"if.js",
		"while.js",
		"do-while.js",
		"for.js",
		"for-iterator.js",
		"for-condition.js",
		"try-function.js",
		"try-catch.js",
		"switch.js",
		"case.js",
		"template.js",
		"template-content.js",
		"template-placeholder.js",
		"template-parameter.js",
		"static.js",
		"class-helper-expression.js",
		"class.js",
		"class-declaration.js",
		"class-constructor.js",
		"class-accessor.js",
		"class-body.js",
		"class-extends.js",
		"class-super.js",
		"import.js",
		"import-multiple.js",
		"import-default.js",
		"import-all.js",
		"export.js",
		"export-default.js",
		"export-multiple.js",
		"export-all.js",
		"destructuring-assginment.js",
		"tags-helper.js",
		"ecmaScript-tags.js",
		"tags-base.js",
		"tags-others.js",
		"ecmaScript-parser.js",
		"file-footer.js"
	]
);