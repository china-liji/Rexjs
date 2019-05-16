new function({ Module, ModuleCache, File, ECMAScriptParser, JavaScriptCompiler, ModuleReady, URL, Base64 }, MAP_PATH, fs, path, source, dev, baseURL, jsFileExts, defaultList){

this.File = function(url){
	/**
	 * 文件
	 */
	return class File {
		static path(pathString, _onerror){
			try {
				// 判断文件是否存在并且是文件
				if(fs.statSync(pathString).isFile()){
					return pathString;
				}
			}
			catch(e){}

			let pathInfo = path.parse(pathString);

			// 如果 “有目录且不是文件” 或者 “没有目录也没有文件”，而且有拓展名
			if(pathInfo.ext){
				return _onerror ? _onerror() : pathString;
			}

			let { search, hash, pathname } = url.parse(pathString), postfix = `.js${search || ""}${hash || ""}`;

			return this.path(
				`${pathname}${postfix}`,
				() => {
					return this.path(
						`${pathname}/index${postfix}`,
						() => {
							return _onerror ? _onerror() : pathString;
						}
					);
				}
			);
		};

		/**
		 * 读取文件内容
		 * @param {String} filepath - 文件路径
		 */
		static read(filepath){
			return fs.readFileSync(filepath, "utf8");
		};

		/**
		 * 写入文件内容到指定路径
		 * @param {String} filepath - 需要写入的文件路径
		 * @param {String} content - 需要写入的文件内容
		 */
		static write(filepath, content){
			fs.writeFileSync(filepath, content, "utf8");
		};
	};
}(
	require("url")
);

this.SourceCompiler = function(defaultLoader){
	/**
	 * Rexjs 源码模块编译器
	 */
	return class SourceCompiler extends JavaScriptCompiler {
		/**
		 * 编译模块
		 * @param {Module} module - 编译的模块
		 */
		compile({ name, origin }){
			// 初始化解析器
			let parser = new ECMAScriptParser();

			try {
				// 解析代码
				parser.parse(
					// 初始化文件
					new File(
						name,
						origin,
						new URL(`rexjs://${name.pathname}`)
					)
				);
				
				// 设置模块解析结果
				this.result = parser.build();
				// 设置依赖
				this.deps = parser.deps;
			}
			catch(e){
				this.result = `throw "${e.split(`"`).join(`\\"`)}"`;
				this.deps = [];
			}
		};

		/**
		 * 执行模块编译结果
		 * @param {Module} module - 编译的模块
		 */
		exec(module){
			// 触发事件
			source.contents.push(this.result);
			module.load(defaultLoader);
		}
	};
}(
	// defaultLoader
	() => {}
);

this.SourceModuleReady = function(SourceCompiler, File, Buffer, toMapPath, unmapPath){
	return class SourceModuleReady extends ModuleReady {
		constructor(){
			super();

			jsFileExts.forEach((ext) => {
				this.compilers[ext] = SourceCompiler;
			});
			
			// 绑定 base64 的编译方法
			Base64.bindBtoa(function(string){
				return Buffer.from(string).toString("base64");
			});
		};

		unmap(moduleName){
			let url = new URL(
				moduleName,
				baseURL
			);

			return new URL(
				unmapPath(
					File.path(
						toMapPath(url.href)
					)
				)
			);
		}

		parseName(moduleName, _baseUrlString){
			return new URL(
				unmapPath(
					File.path(
						toMapPath(
							new URL(
								moduleName,
								_baseUrlString ? new URL(_baseUrlString, baseURL).href : baseURL
							)
							.href
						)
					)
				)
			);

			let url = new URL(
				moduleName,
				_baseUrlString ? new URL(this.unmap(_baseUrlString).href, baseURL).href : baseURL
			);

			return url;
		};

		/**
		 * 读取文件内容
		 * @param {ModuleName} moduleName - 文件路径
		 * @param {Function} success - 成功回调
		 * @param {Function} fail - 失败回调
		 */
		readFile({ href }, success, fail){
			try {
				success(
					File.read(
						toMapPath(
							this.unmap(href).href
						)
					)
				);
			}
			catch(e){
				success(
					`throw "${e.toString().split(`"`).join(`\\"`)}"`
				);
			}
		}	
	};
}(
	this.SourceCompiler,
	this.File,
	Buffer,
	// toMapPath
	(href) => {
		if(baseURL && href.indexOf(baseURL + "/") === 0){
			href = href.substring(baseURL.length + 1);
		}

		return `${__dirname}/${MAP_PATH}/${href}`;
	},
	// unmapPath
	(path) => {
		let prefix = `${__dirname}/${MAP_PATH}/`;

		if(path.indexOf(prefix) === 0){
			path = path.substring(prefix.length);
		}

		return baseURL ? `${baseURL}/${path}` : path;
	}
);

this.Source = function(SourceModuleReady, File, EventEmitter, inited){
	/**
	 * 源码
	 */
	return class Source extends EventEmitter {
		constructor(){
			super();

			this.contents = [];
		};
		
		/**
		 * 根据文件列表生成源码
		 */
		generate(_sourceMaps){
			let content, code, contents = this.contents = [];

			if(!inited){
				inited = true;

				new SourceModuleReady();
			}

			ECMAScriptParser.sourceMaps = !!_sourceMaps;
			source = this;

			ModuleCache.clear();

			// test ↓
			{
				let readDir, filenames = [];

				readDir = (dir, includeCurrentDirectorFiles = true) => {
					fs.readdirSync(dir).forEach((name) => {
						let pathString = `${dir}/${name}`, stats = fs.statSync(pathString);

						if(stats.isFile()){
							if(includeCurrentDirectorFiles && jsFileExts.indexOf(path.parse(pathString).ext) > -1){
								filenames.push(pathString);
							}

							return;
						}

						if(stats.isDirectory()){
							readDir(pathString);
							return;
						}
					});
				};

				readDir(
					path.normalize(`${__dirname}/${MAP_PATH}`),
					false
				);

				code = (
					function(){
						let globalThis = {};

						let define = (exports) => {
							for(let name in exports){
								globalThis[name] = exports[name];
							}
						};

						// {{template}}

						window.globalThis = globalThis;
					}
				)
				.toString()
				.replace(
					/\/\/ {{template}}/,
					filenames
						.map((filename, index) => {
							let variable = `imported_${index}`;

							return `import * as ${variable} from "./${path.relative(`${__dirname}/${MAP_PATH}`, filename)}";\ndefine(${variable});`
						})
						.join("\n")
				)
				.match(/^\s*function\s*\(\s*\)\s*\{\s*([\s\S]*)?\s*\}\s*$/)[
					1
				];
			}
			// test ↑

			new Module("./index.js", code);

			source = null;

			content = contents.join(
				"\n".repeat(3)
			);

			File.write(`${__dirname}/../source/rex-es.js`, content);
			return content;
		};
	};
}(
	this.SourceModuleReady,
	this.File,
	require("events").EventEmitter,
	// inited
	false
);

this.DevSource = function(Source, File, FUNCTION_BODY_REGEXP_SOURCE){
	/**
	 * 开发源码，将会根据文件生成 sourceURL
	 */
	return class DevSource extends Source {
		constructor(sourceURL){
			super();

			baseURL = `${sourceURL}/map`;
		};

		/**
		 * 根据文件列表生成源码
		 * @param {Array} list - 文件列表
		 */
		generate(){
			let content;

			// 生成文件
			super.generate(true);

			this.contents = this.contents.map((content) => {
				return `eval(
					function(){
						${content}
					}
					.toString()
					.match(
						/${FUNCTION_BODY_REGEXP_SOURCE}/
					)[1]
				);`
			});

			defaultList.map((filename) => {
				// 读取内容
				let content = File.read(`${__dirname}/${MAP_PATH}1/${filename}`);

				switch(filename){
					// 如果文件头部
					case "file-header.js":
						break;

					// 如果是文件末部
					case "file-footer.js":
						break;

					default:
						// 添加 eval 用于生成 sourceURL
						content = (
							`eval(
								function(){
									${content}
								}
								.toString()
								.match(
									/${FUNCTION_BODY_REGEXP_SOURCE}/
								)[1] +
								"\\n//# sourceURL=http://localhost:9090/source/map1/${filename}"
							);`
						);
						break;
				}

				this.contents.push(content);
			});

			content = (
				this.contents
					.join(
						"\n".repeat(3)
					) +
					`\n //# sourceURL=${new URL(`${baseURL}/..`).href}/rex-es.js`
			);

			// 写入文件
			File.write(`${__dirname}/../dev/rex-es.js`, content);
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
	// Rexjs
	require("./rex-api.bundle.js"),
	// MAP_PATH
	"../source/map",
	require("fs"),
	require("path"),
	// source
	null,
	// dev
	process.argv.indexOf("-dev") > -1,
	// baseURL
	"",
	// jsFileExts
	[require("./server/content-types.json")].map((contentTypes) => {
		let exts = [];

		for(let ext in contentTypes){
			if(contentTypes[ext] === "text/javascript"){
				exts.push(ext);
			}
		}

		return exts;
	})[0],
	// defaultList
	[
		"file-header.js",
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
		"class-property-name.js",
		"class-property-initializer.js",
		"class-accessor.js",
		"class-body.js",
		"class-extends.js",
		"super-property.js",
		"super-property-assignment.js",
		"super-call.js",
		"super.js",
		"import.js",
		"import-multiple.js",
		"import-default.js",
		"import-all.js",
		"export.js",
		"export-default.js",
		"export-multiple.js",
		"export-all.js",
		"destructuring-assginment.js",
		"argument-destructuring.js",
		"grouping.js",
		"jsx.js",
		"jsx-type.js",
		"jsx-placeholder.js",
		"jsx-attribute.js",
		"jsx-children.js",
		"tags-helper.js",
		"ecmaScript-tags.js",
		"tags-base.js",
		"tags-others.js",
		"ecmaScript-parser.js",
		"file-footer.js"
	]
);