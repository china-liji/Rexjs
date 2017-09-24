new function(MAP_PATH, dev, defaultList){

this.File = function(fs, DIR_NAME){
	/**
	 * 文件
	 */
	return class File {
		/**
		 * 读取文件内容
		 * @param {String} filepath - 文件路径
		 */
		static read(filepath){
			return fs.readFileSync(`${DIR_NAME}/${filepath}`, "utf8");
		};

		/**
		 * 写入文件内容到指定路径
		 * @param {String} filepath - 需要写入的文件路径
		 * @param {String} content - 需要写入的文件内容
		 */
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
	/**
	 * 源码
	 */
	return class Source extends EventEmitter {
		/**
		 * 根据文件列表生成源码
		 * @param {Array} list - 文件列表
		 */
		generate(list = defaultList){
			var content = list.map((filename) => {
					// 读取内容
					var content = File.read(`${MAP_PATH}/${filename}`);

					// 触发事件
					this.emit("read", content, filename);
					return content;
				})
				// 每个文件内容之间插入 3 个换行符，便于阅读代码
				.join(
					"\n".repeat(3)
				);

			// 写入文件
			File.write("../source/rex-es.js", content);
			return content;
		};
	};
}(
	this.File,
	require("events").EventEmitter
);

this.DevSource = function(Source, File, FUNCTION_BODY_REGEXP_SOURCE){
	/**
	 * 开发源码，将会根据文件生成 sourceURL
	 */
	return class DevSource extends Source {
		constructor(){
			var contents = [];

			super();

			// 监听事件
			this.on(
				"read",
				(content, filename) => {
					switch(filename){
						// 如果文件头部
						case "file-header.js":
							break;

						// 如果是文件末部
						case "file-footer.js":
							break;

						default:
							// 添加 eval 用于生成 sourceURL
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

		/**
		 * 根据文件列表生成源码
		 * @param {Array} list - 文件列表
		 */
		generate(list = defaultList){
			var content; 

			// 生成文件
			super.generate(list);

			// 获取文件内容
			content = this.contents.join(
				"\n".repeat(3)
			);

			// 写入文件
			File.write("../dev/rex-es.js", content);
			return content;
		};
	};
}(
	this.Source,
	this.File,
	// FUNCTION_BODY_REGEXP_SOURCE
	/^\s*function\s*\s*\(\s*\)\s*\{\s*([\s\S]*?)\s*\}\s*$/.source
);

module.exports = { DevSource: this.DevSource, Source: this.Source };
}(
	// MAP_PATH
	"../source/map",
	// dev
	process.argv.indexOf("-dev") > -1,
	// defaultList
	[
		"file-header.js",
		"ecmaScript-helper.js",
		"common-expression.js",
		"ecmaScript-statement.js",
		"ecmaScript-statements.js",
		"brace-body.js",
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
		"declaration-rest-item.js",
		"array.js",
		"array-spread-item.js",
		"declaration-array.js",
		"declaration-array-rest-item.js",
		"nested-declaration-array-item.js",
		"block.js",
		"function.js",
		"function-declaration.js",
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
		"property-spread-item.js",
		"object.js",
		"declaration-object.js",
		"declaration-property-name.js",
		"declaration-property-name-separator.js",
		"declaration-property-value.js",
		"declaration-property-rest-item.js",
		"declaration-array-object-item.js",
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
		"yield.js",
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
		"super.js",
		"super-call.js",
		"super-property.js",
		"super-property-assignment.js",
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