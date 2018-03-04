module.exports = new function(NodeModule, PREFIX_REGEXP, CWD, { JavaScriptCompiler, Module, ModuleReady, Base64, ECMAScriptParser, URL }, path, paths, argv){

this.NodejsJavaScriptCompiler = function(forEach){
	/**
	 * JavaScrit 编译器
	 */
	return class NodejsJavaScriptCompiler extends JavaScriptCompiler {
		/**
		 * 执行模块编译结果
		 * @param {Module} module - 编译的模块
		 */
		exec(module){
			var filename = module.name.href, mod = new NodeModule(filename, null);

			// 设置名称
			mod.filename = filename;
			// 设置路径
			mod.paths = NodeModule._nodeModulePaths(module.name.dirname);
			// 设置缓存
			NodeModule._cache[filename] = mod;
			
			// 编译
			mod._compile(this.result, filename);

			// 如果没有提供 default 输出
			if(!module.exports.default){
				// 使用 mod.exports 作为默认输出
				Module.export("default", mod.exports, module);
			}

			// 设置为已加载
			mod.loaded = true;
		};
	};
}(
	Rexjs.forEach
);

this.NodejsModuleURL = function(){
	return class NodejsModuleURL extends URL {
		/**
		 * nodejs 内置模块地址
		 * @param {URL} moduleName - 模块名称地址
		 */
		constructor(moduleName){
			super(null);

			// 设置目录
			this.dirname = moduleName;
			// 设置拓展名为 .node，目的是让编译器不编译
			this.ext = ".node";
		};
	};
}();

this.NodejsReady = function(NodejsJavaScriptCompiler, NodejsModuleURL, Buffer, NODE_VERSION, fs, path, require, parseArgv){
	return class NodejsReady extends ModuleReady {
		/**
		 * 模块就绪
		 */
		constructor(){
			super();

			// 如果 nodejs 版本太低
			if(NODE_VERSION < 8.9){
				throw "需要 node v8.9 及以上版本的支持";
			}

			// 设置编译器
			this.compilers[".js"] = NodejsJavaScriptCompiler;

			// 绑定 base64 的编译方法
			Base64.bindBtoa(function(string){
				return Buffer.from(string).toString("base64");
			});

			// 解析进程参数
			parseArgv();
		};

		/**
		 * 解析模块名称
		 * @param {String} moduleName - 模块名称
		 * @param {String} _baseUrlString - 基础地址
		 */
		parseName(moduleName, _baseUrlString){
			// 如果是内置模块
			if(NodeModule.builtinModules.includes(moduleName)) {
				return new NodejsModuleURL(moduleName);
			}

			var result, url = new URL(moduleName, _baseUrlString), pathObject = path.parse(moduleName);

			// 获取模块文件路径
			result = NodeModule._findPath(
				pathObject.base,
				(
					// 如果有目录名 或者 有拓展名
					pathObject.dir || pathObject.ext ?
						// 使用当前目录
						[path.parse(url.pathname).dir] :
						// 使用 node_modules 目录
						NodeModule._nodeModulePaths(url.dirname)
				),
				false
			);

			// 如果找不到模块
			if(!result){
				throw `Cannot find module "${moduleName}" from "${_baseUrlString}"`;
			}

			// 返回地址
			return new URL(result);
		};

		/**
		 * 读取文件内容
		 * @param {ModuleName} moduleName - 文件路径
		 * @param {Function} success - 成功回调
		 */
		readFile(moduleName, success){
			// 如果是内置模块
			if(moduleName instanceof NodejsModuleURL){
				// 执行成功回调
				success(
					// 直接使用 require
					require(moduleName.pathname)
				);

				return;
			}

			// 执行成功回调
			success(
				// 读取文件
				fs.readFileSync(moduleName.pathname, "utf8")
			);
		};
	};
}(
	this.NodejsJavaScriptCompiler,
	this.NodejsModuleURL,
	Buffer,
	// NODE_VERSION
	parseFloat(process.versions.node),
	// fs
	require("fs"),
	// path
	require("path"),
	require,
	// parseArgv
	() => {
		// 开启 sourceMaps
		ECMAScriptParser.sourceMaps = true;

		// 判断基本命令
		["rexjs", "rexjs-api", __filename].every((cmd) => {
			var index = argv.indexOf(cmd);

			// 如果不是基础命令
			if(index === -1){
				// 继续判断下一个
				return true;
			}

			var mpath;

			// 从基础命令开始，循环判断其他参数
			for(let i = index + 1, j = argv.length;i < j;i++){
				let arg = argv[i];

				// 如果不是配置参数
				if(!PREFIX_REGEXP.test(arg)){
					// 默认为模块文件路径参数
					mpath = arg;
					continue;
				}

				// 判断配置参数
				switch(arg){
					// 如果是禁用 sourcemaps
					case "--disable-sourcemaps":
						// 禁用 sourcemaps
						ECMAScriptParser.sourceMaps = false;
						continue;
				}
			}

			// 如果没有文件入口
			if(!mpath){
				throw "需要提供一个入口文件路径为命令参数...";
			}

			// 初始化模块
			new Module(
				path.resolve(CWD, mpath)
			);

			return false;
		});
	}
);

new this.NodejsReady();
}(
	// NodeModule
	require("module"),
	// PREFIX_REGEXP
	/^-+/,
	// CWD
	process.cwd(),
	require("../dist/rex-api.bundle.js"),
	// path
	require("path"),
	module.paths,
	process.argv
);