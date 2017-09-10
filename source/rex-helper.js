new function(Rexjs){

// 迭代器相关
!function(){

this.IteratorIndex = function(){
	/**
	 * 迭代器索引
	 * @param {Number} max - 索引最大值，但不包括该最大值
	 */
	function IteratorIndex(max){
		this.max = max;
	};
	IteratorIndex = new Rexjs(IteratorIndex);

	IteratorIndex.props({
		current: 0,
		/**
		 * 索引增加
		 * @param {Number} value - 增加的量值
		 */
		increase: function(value){
			var current = this.current + value, max = this.max;

			this.current = current > max ? max : current;
		},
		max: 0
	});

	return IteratorIndex;
}();

this.IteratorResult = function(){
	/**
	 * 迭代器结果
	 * @param {*} value - 结果值
	 * @param {Boolean} done - 是否已迭代完毕
	 */
	function IteratorResult(value, done){
		this.value = value;
		this.done = done;
	};
	IteratorResult = new Rexjs(IteratorResult);

	IteratorResult.props({
		value: void 0,
		done: false
	});

	return IteratorResult;
}();

this.Iterator = function(IteratorIndex, IteratorResult){
	/**
	 * 迭代器
	 * @param {*} iterable - 可迭代的对象
	 */
	function Iterator(iterable){
		block:
		{
			// 如果是 null 或 undefined
			if(iterable == null){
				break block;
			}

			var length = iterable.length;

			// 如果长度属性不是数字
			if(typeof length !== "number"){
				// 取 size 属性
				length = iterable.size;

				// 如果还不是数字
				if(typeof length !== "number"){
					break block;
				}
			}

			// 初始化索引
			this.index = new IteratorIndex(length);
			// 记录对象
			this.iterable = iterable;
			return;
		}

		// 抛出错误
		throw "TypeError: uniterable object " + iterable;
	};
	Iterator = new Rexjs(Iterator);

	Iterator.props({
		/**
		 * 迭代器关闭，并返回带有指定值的结果
		 * @param {*} value - 指定的结果值
		 */
		close: function(value){
			// 索引增加无限大
			this.index.increase(Infinity);
			// 返回结果
			return new IteratorResult(value, this.closed);
		},
		/**
		 * 判断该迭代器是否已经关闭
		 */
		get closed(){
			var index = this.index;

			return index.current >= index.max;
		},
		index: null,
		iterable: null,
		/**
		 * 获取下一个迭代结果
		 */
		get next(){
			var result = this.result;

			// 索引增加 1
			this.index.increase(1);
			return result;
		},
		/**
		 * 获取当前迭代结果
		 */
		get result(){
			// 返回结果
			return new IteratorResult(
				this.iterable[this.index.current],
				this.closed
			);
		}
	});

	return Iterator;
}(
	this.IteratorIndex,
	this.IteratorResult
);

this.FunctionIterator = function(Iterator, IteratorResult, isNaN, toArray){
	/**
	 * 函数迭代器
	 * @param {Function} func - 需要迭代的函数
	 */
	function FunctionIterator(func, boundThis, boundArguments){
		Iterator.call(this, func);

		this.boundThis = boundThis;
		this.boundArguments = toArray(boundArguments);

		this.index.max = Infinity;
	};
	FunctionIterator = new Rexjs(FunctionIterator, Iterator);

	FunctionIterator.props({
		boundThis: null,
		boundArguments: null,
		/**
		 * 迭代器关闭，并返回带有指定值的结果
		 * @param {*} value - 指定的结果值
		 */
		close: function(value){
			// 索引增加无限大
			this.index.increase(NaN);
			// 返回结果
			return new IteratorResult(value, this.closed);
		},
		/**
		 * 判断该迭代器是否已经关闭
		 */
		get closed(){
			return isNaN(this.index.current);
		},
		/**
		 * 获取下一个迭代结果
		 */
		get next(){
			// 索引交给函数逻辑去处理，这里只需返回结果
			return this.result;
		},
		/**
		 * 获取当前迭代结果
		 */
		get result(){
			// 返回结果，这里的 this.closed 必须获取两次，因为 this.iterable 是个函数，执行的时候，回改变 this.closed 的值
			return new IteratorResult(
				this.closed ?
					void 0 :
					this.iterable.apply(this.boundThis, this.boundArguments),
				this.closed
			);
		}
	});

	return FunctionIterator;
}(
	this.Iterator,
	this.IteratorResult,
	isNaN,
	Rexjs.toArray
);

this.Generator = function(Iterator){
	/**
	 * 生成器
	 * @param {Iterator, *} iterator - 迭代器
	 */
	function Generator(iterator){
		// 初始化迭代器
		this.iterator = iterator instanceof Iterator ? iterator : new Iterator(iterator);
	};
	Generator = new Rexjs(Generator);

	Generator.props({
		iterator: null,
		/**
		 * 获取下一个迭代结果
		 */
		next: function(){
			return this.iterator.next;
		},
		/**
		 * 结束迭代，并返回带有指定值的结果
		 * @param {*} value - 指定的结果值
		 */
		return: function(value){
			return this.iterator.close(value);
		},
		/**
		 * 抛出错误
		 * @param {Error} error - 错误信息
		 */
		throw: function(error){
			// 抛出错误
			throw error;
		}
	});

	return Generator;
}(
	this.Iterator
);

}.call(
	this,
	Infinity
);


// 类相关
!function(){

this.ClassProperty = function(){
	/**
	 * 类的属性
	 * @param {String} name - 属性名
	 * @param {*} value - 属性值
	 * @param {String} _type - 属性类型，分别为 get、set、value
	 */
	function ClassProperty(name, value, _type){
		this.name = name;
		this.value = value;

		// 如果提供了 _type
		if(_type){
			// 设置 type
			this.type = _type;
		}
	};
	ClassProperty = new Rexjs(ClassProperty);

	ClassProperty.props({
		name: "",
		type: "value",
		value: null
	});

	return ClassProperty;
}();

this.StaticProperty = function(ClassProperty){
	/**
	 * 类的静态属性
	 * @param {String} name - 属性名
	 * @param {*} value - 属性值
	 * @param {String} _type - 属性类型，分别为 get、set、value
	 */
	function StaticProperty(name, value, _type){
		ClassProperty.call(this, name, value, _type);
	};
	StaticProperty = new Rexjs(StaticProperty, ClassProperty);

	return StaticProperty;
}(
	this.ClassProperty
);

this.Class = function(ClassProperty, StaticProperty, defineProperty, getPrototypeOf){
	/**
	 * 类
	 */
	function Class(){};
	Class = new Rexjs(Class);

	Class.static({
		/**
		 * 创建类
		 * @param {Rexjs} SuperClass - 所需继承的父类
		 * @param {Array} allProps - 类属性列表
		 * @param {Number} indexOfConstructor - 构造函数在类属性列表中的索引值
		 */
		create: function(SuperClass, allProps, indexOfConstructor){
			var constructor = allProps[indexOfConstructor].value;

			// 如果构造函数不是函数
			if(typeof constructor !== "function"){
				// 报错
				throw "Class extends value " + constructor.toString() + " is not a constructor or null";
			}

			var CreatedClass = new Rexjs(constructor, SuperClass);

			// 遍历属性
			allProps.forEach(
				function(property, index){
					// 如果是构造函数
					if(index === indexOfConstructor){
						return;
					}

					var type = property.type, descriptor = { enumerable: false, configurable: true };

					// 如果是值类型的属性
					if(type === "value"){
						// 设置描述符可写
						descriptor.writable = true;
						// 设置描述符的值
						descriptor.value = property.value;
					}
					else {
						// 设置访问器
						descriptor[type] = property.value;
					}

					// 定义属性
					defineProperty(
						// 如果是静态属性
						property instanceof StaticProperty ? CreatedClass : this,
						property.name,
						descriptor
					);
				},
				CreatedClass.prototype
			);

			return CreatedClass;
		},
		/**
		 * 获取实例的父类
		 * @param {Rexjs} instance - 某个类的实例
		 * @param {Number} depth - 要获取哪一层的父类
		 * @param {Boolean} _willCall - 是否将要被调用
		 */
		superOf: function(instance, depth, _willCall){
			var sp = instance;

			// 根据层次获取父类
			for(var i = 0;i < depth;i++){
				sp = getPrototypeOf(sp);
			}

			return (
				// 如果将要调用
				_willCall ?
					function(){
						var retValue = sp.constructor.apply(instance, arguments);

						// 如果构造函数返回值是对象，而且存在，则返回该对象，否则返回实例
						return (typeof retValue === "object" && retValue) || instance;
					} :
					sp
			);
		}
	});

	return Class;
}(
	this.ClassProperty,
	this.StaticProperty,
	Object.defineProperty,
	Object.getPrototypeOf
);

}.call(
	this
);


!function(XMLHttpRequest, URL_REGEXP, document, encodeURI, parseInt, getBaseHref){

this.URL = function(toString, parse){
	/**
	 * 地址，需要兼容 node 环境
	 * @param {String} urlString - 地址字符串
	 * @param {String} _baseURLstring - 基准地址
	 */
	function URL(urlString, _baseURLstring){
		// 转化为字符串
		var urlObj;
		
		// 转化为字符串
		urlString = toString(urlString);
		
		// 如果解析 URL 成功，说明是个完整的 URL，则不需要继续关联 _baseURLstring
		if(parse(this, urlString)){
			return;
		}

		if(_baseURLstring){
			var baseURL = new URL(_baseURLstring);

			if(
				parse(
					this,
					baseURL.origin + (baseURL.dirname + "/") + urlString
				)
			){
				return;
			}
		}

		// 报错
		throw "Invalid URL: " + urlString;
	};
	URL = new Rexjs(URL);

	URL.props({
		ext: "",
		dirname : "",
		filename: "",
		hash : "",
		/**
		 * 获取主机地址
		 */
		get host(){
			return this.hostname + (this.port ? ":" + this.port : "");
		},
		hostname : "",
		/**
		 * 获取完整连接
		 */
		get href(){
			return this.origin + this.pathname + this.search + this.hash;	
		},
		/**
		 * 获取域地址
		 */
		get origin(){
			return this.protocal + "//" + this.host;	
		},
		/**
		 * 获取路径名
		 */
		get pathname(){
			var dirname = this.dirname;
			
			return dirname + (dirname[dirname.length - 1] === "/" ? "" : "/") + this.filename;
		},
		port : "",
		protocal : "",
		search : "",
		/**
		 * 转化为字符串
		 */
		toString : function(){
			return this.href;
		}
	});

	return URL;
}(
	// toString
	function(urlString){
		// 如果不是字符串
		if(typeof urlString !== "string"){
			// 如果是 undefined 或者 null，则为空字符串，否则为 toString 的返回值
			urlString = urlString == null ? "" : urlString.toString();
		}
		
		// 返回转码后的字符串
		return encodeURI(
			urlString.trim()
		);
	},
	// parse
	function(url, urlString){
		// 匹配地址
		var result = urlString.match(URL_REGEXP);
		
		// 如果没有匹配结果
		if(result === null){
			return false;
		}
		
		var pathname = result[4] || "", protocal = result[1], hostname = result[2] || "", port = result[3] || "";
		
		url.protocal = protocal;
		url.hostname = hostname;
		url.port = port;
		url.ext = result[5] || "";
		url.search = result[6] || "";
		url.hash = result[7] || "";

		// 判断协议
		switch(protocal){
			// 如果是 http
			case "http:":
			// 如果是 https
			case "https:":
				// 如果主机名不存在
				if(!url.hostname){
					return false;
				}

				break;

			case undefined:
				return false;

			default: {
				var index;
		
				// 还原链接字符串
				urlString = decodeURI(urlString);
				
				switch(true){
					// 如果存在 search
					case url.search.length > 0 :
						// 设置 index
						index = urlString.indexOf("?");
						break;
					
					// 如果存在 hash
					case url.hash.length > 0 :
						// 设置 index
						index = urlString.indexOf("#");
						break;

					default :
						// 设置 index
						index = urlString.length;
						break;
				}
				
				// 重置 url 部分属性
				pathname = urlString.substring(protocal.length, index);
				url.hostname = url.port = "";
				url.search = decodeURI(url.search);
				url.hash = decodeURI(url.hash);

				break;
			}
		}
		
		var pathnameArray = [], hasFilename = url.ext.length > 0;
		
		// 分割路径
		pathname
			.split(
				"/"
			)
			.forEach(function(name){
				switch(name){
					// 如果是1点，说明是保持当前层目录，不需要做任何处理
					case "." :
						break;
					
					// 如果是2点，说明是返回上一层目录，则去掉数组的最后一个
					case ".." :
						pathnameArray.splice(pathnameArray.length - 1);
						break;
						
					case "" :
						break;
					
					// 添加目录
					default :
						pathnameArray.push(name);
						break;
				}
			});

		url.dirname = "/" + (hasFilename ? pathnameArray.slice(0, pathnameArray.length - 1) : pathnameArray).join("/");
		url.filename = hasFilename ? pathnameArray[pathnameArray.length - 1] : "";
		return true;
	}
);

this.ModuleName = function(URL, BASE_URI){
	/**
	 * 模块名称
	 * @param {String} value - 模块名称
	 * @param {String} _baseURLstring - 基础地址
	 */
	function ModuleName(value, _baseURLstring){
		URL.call(
			this,
			value,
			typeof _baseURLstring === "string" ? _baseURLstring : BASE_URI
		);

		// 如果文件名不存在
		if(this.filename === ""){
			// 设置文件名
			this.filename = "index.js";
			// 设置拓展名
			this.ext = ".js";
		}
	};
	ModuleName = new Rexjs(ModuleName, URL);

	ModuleName.props({
		value: ""
	});

	return ModuleName;
}(
	this.URL,
	new this.URL(
		getBaseHref(),
		location.href
	)
	.href
);

this.Module = function(
	ModuleName, ECMAScriptParser, MappingBuilder, File,
	STATUS_NONE, STATUS_LOADING, STATUS_PARSING, STATUS_READY, STATUS_COMPLETED,
	cache, name, exports,
	create, defineProperty, parse, nativeEval, load, trigger, appendCss
){
	/**
	 * 模块，todo: 需要兼容 node 环境
	 * @param {String} name - 模块名称
	 * @param {String} _code - 模块代码
	 * @param {Boolean} _sync - 是否同步
	 */
	function Module(name, _code, _sync){
		var moduleName = new ModuleName(name), href = moduleName.href;

		// 如果缓存里已经存在该模块
		if(cache.hasOwnProperty(href)){
			// 返回该模块
			return cache[href];
		}

		this.exports = create(null);
		this.imports = [];
		this.listeners = [];
		this.name = moduleName;
		this.status = STATUS_LOADING;
		this.targets = [];

		cache[href] = this;

		// 如果提供了代码
		if(typeof _code === "string"){
			// 代码就绪
			this.ready(_code, _sync);
			return;
		}

		// 加载代码
		load(this, name, href, _sync);
	};
	Module = new Rexjs(Module);

	Module.static({
		STATUS_NONE: STATUS_NONE,
		STATUS_LOADING: STATUS_LOADING,
		STATUS_PARSING: STATUS_PARSING,
		STATUS_READY: STATUS_READY,
		STATUS_COMPLETED: STATUS_COMPLETED,
		/**
		 * 获取模块缓存信息
		 */
		get cache(){
			return cache;
		},
		/**
		 * 获取指定模块的默认输出
		 * @param {String} name - 模块名称
		 * @param {String} _baseURLstring - 基础地址
		 */
		defaultOf: function(name, _baseURLstring){
			return this.import(name, _baseURLstring).default;
		},
		export: function(propertyName, value){
			defineProperty(
				exports,
				propertyName,
				{
					get: function(){ return value },
					configurable: false,
					enumerable: true
				}
			);
		},
		/**
		 * 输出模块成员
		 * @param {Object} exports - 需要输出的模块成员
		 * @param {String} _name - 可指定的输入来源模块的名称
		 * @param {String} _baseURLstring - 输入来源模块的基础地址
		 */
		exportAs: function(exports, _name, _baseURLstring){
			// 如果名称不存在
			if(!_name){
				// 遍历模块成员
				for(var propertyName in exports){
					// 输出成员
					this.export(propertyName, exports[propertyName]);
				}

				return;
			}

			// 获取来源模块的所有输出项
			var allExports = this.import(_name, _baseURLstring);

			// 遍历模块成员
			for(var propertyName in exports){
				// 输出成员
				this.export(
					propertyName,
					allExports[
						exports[propertyName]
					]
				);
			}
		},
		/**
		 * 根据来源模块来输出成员
		 * @param {String} name - 输入来源模块的名称
		 * @param {String} _baseURLstring - 输入来源模块的基础地址
		 */
		exportFrom: function(name, _baseURLstring){
			var exports = this.import(name, _baseURLstring);

			// 遍历模块成员
			for(var propertyName in exports){
				// 如果是默认输出
				if(propertyName === "default"){
					continue;
				}

				// 输出成员
				this.export(propertyName, exports[propertyName]);
			}
		},
		/**
		 * 导入模块
		 * @param {String} name - 模块名称
		 * @param {String} _baseURLstring - 基础地址
		 */
		import: function(name, _baseURLstring){
			return cache[
				new ModuleName(name, _baseURLstring).href
			]
			.exports;
		},
		/**
		 * 锁定模块名称，作为默认模块
		 */
		lock: function(n){
			name = n;
		},
		/**
		 * 获取模块成员
		 * @param {String} memberName - 成员名称
		 * @param {String} moduleName - 模块名称
		 * @param {String} _baseURLstring - 基础地址
		 */
		memberOf: function(memberName, moduleName, _baseURLstring){
			return this.import(moduleName, _baseURLstring)[memberName];
		},
		/**
		 * 获取模块
		 * @param {String} name - 模块名称
		 * @param {String} _baseURLstring - 基础地址
		 */
		moduleOf: function(name, _baseURLstring){
			return this.import(name, _baseURLstring);
		}
	});

	Module.props({
		exports: null,
		/**
		 * 执行编译后的代码
		 */
		eval: function(){
			// 判断状态
			switch(this.status){
				// 如果已经就绪
				case STATUS_READY:
					break;

				// 如果已经执行完成过
				case STATUS_COMPLETED:
					return true;

				default:
					return false;
			}

			// 如果所有需要引用的依赖模块的代码没有执行完成
			if(!this.imports.every(function(i){
				// 判断是否已经执行完成
				return (i.status & STATUS_COMPLETED) === STATUS_COMPLETED;
			})){
				return false;
			}

			// 设置状态为已完成
			this.status = STATUS_COMPLETED;
			// 缓存输出
			exports = this.exports;

			// 执行代码
			nativeEval(this.result);

			// 清空缓存
			exports = null;

			// 触发依赖该模块的其他模块的执行方法
			trigger(this);
			return true;
		},
		/**
		 * 执行监听器
		 * @param {Function} listener - 需要添加的监听器
		 */
		evalListener: function(listener){
			// 如果已经执行完成
			if(this.status === STATUS_COMPLETED){
				// 直接调用该监听器
				listener(this);
				return;
			}

			// 添加到等待列表中
			this.listeners.push(listener);
		},
		imports: null,
		listeners: null,
		name: null,
		origin: "",
		/**
		 * 代码准备就绪处理函数
		 * @param {String} content - 代码内容
		 * @param {Boolean} _sync - 是否同步
		 */
		ready: function(content, _sync){
			var name = this.name, ext = name.ext;

			this.origin = content;

			// 如果不是 js 文件
			if(ext !== ".js"){
				var result = content;

				// 判断拓展名
				switch(ext){
					// 如果是 css
					case ".css":
						// 添加 css
						result = appendCss(content, name.href);
						break;
					
					// 如果是 json
					case ".json":
						// 解析 json
						result = parse(content);
						break;
				}

				// 定义默认输出
				defineProperty(
					this.exports,
					"default",
					{
						get: function(){ return result },
						configurable: false,
						enumerable: true
					}
				);
				
				// 设置模块解析结果
				this.result = result;
				// 设置状态为已完成
				this.status = STATUS_COMPLETED;

				// 触发依赖该模块的其他模块的执行方法
				trigger(this);
				return;
			}

			var imports = this.imports, parser = new ECMAScriptParser();
			
			// 设置状态为解析中
			this.status = STATUS_PARSING;

			// 解析代码
			parser.parse(
				// 初始化文件
				new File(name.href, content)
			);
			
			// 设置模块解析结果
			this.result = parser.build();
			// 设置状态为已就绪
			this.status = STATUS_READY;

			// 遍历依赖
			parser.deps.forEach(
				function(dep){
					var href = new ModuleName(dep, name.href).href, mod = cache.hasOwnProperty(href) ? cache[href] : new Module(href, null, _sync);

					// 如果是重复导入
					if(imports.indexOf(mod) > -1){
						return;
					}

					// 添加需要导入的模块
					imports.push(mod);
					// 给导入模块添加目标模块
					mod.targets.push(this);
				},
				this
			);

			// 执行代码
			this.eval();
		},
		result: "",
		status: STATUS_NONE,
		targets: null
	});

	document.addEventListener(
		"DOMContentLoaded",
		function(){
			var count = 0;

			// 遍历元素
			[].forEach.call(
				document.querySelectorAll('script[type="text/rexjs"]'),
				function(script){
					// 如果存在 src 属性
					if(script.hasAttribute("src")){
						// 如果要生成 sourceMaps
						if(script.hasAttribute("data-sourcemaps")){
							// 开启 sourceMaps
							ECMAScriptParser.sourceMaps = true;
						}

						// 初始化模块
						new Module(script.src);
						return;
					}

					// 初始化内联模块
					new Module("inline-script-" + count++ +".js", script.textContent);
				}
			);
		}
	);

	return Module;
}(
	this.ModuleName,
	Rexjs.ECMAScriptParser,
	Rexjs.MappingBuilder,
	Rexjs.File,
	// STATUS_NONE
	parseInt(0, 2),
	// STATUS_LOADING
	parseInt(10, 2),
	// STATUS_PARSING
	parseInt(100, 2),
	// STATUS_READY
	parseInt(1000, 2),
	// STATUS_COMPLETED
	parseInt(11000, 2),
	// cache
	{},
	// name
	"",
	// exports
	null,
	Object.create,
	Object.defineProperty,
	JSON.parse,
	// nativeEval
	eval,	
	// load
	function(mod, name, href, _sync){
		var request = new XMLHttpRequest();

		// 监听 onload 事件
		request.addEventListener(
			"load",
			function(){
				// 如果存在错误
				if(this.status !== 200){
					throw '加载模块 "' + name + '" 错误，status：' + this.status + "。";
					return;
				}
				
				mod.ready(this.responseText, _sync);
			}
		);
		
		// 打开请求，采用异步get方式
		request.open("get", href, !_sync);
		// 发送请求
		request.send();
	},
	// trigger
	function(mod){
		var listeners = mod.listeners;

		mod.targets.forEach(function(target){
			target.eval();
		});

		listeners.forEach(function(listener){
			listener(mod);
		});

		listeners.splice(0);
	},
	// appendCss
	function(content, sourceURL){
		var style = document.createElement("style");
		
		// 设置 type
		style.type = "text/css";
		// 追加 sourceURL
		content += "\n/*# sourceURL=" + sourceURL + " */";

		// ie
		if(style.styleSheet){
			style.styleSheet.cssText = content;
		}
		else {
			style.textContent = content;
		}

		// 添加到文档头部
		document.head.appendChild(style);
		return style;
	}
);

}.call(
	this,
	XMLHttpRequest,
	// URL_REGEXP
	/^([^:/?#.]+:)?(?:\/\/(?:[^/?#]*@)?([\w\d\-\u0100-\uffff.%]*)(?::([0-9]+))?)?([^?#]+?(\.[^.?#\/]+)?)?(?:(\?[^#]*))?(?:(#.*))?$/,
	document,
	encodeURI,
	parseInt,
	// getBaseHref
	function(){
		// BASE_URI todo: 需要兼容 node 环境
		var baseElement = document.querySelector("base");

		return (
			baseElement && baseElement.getAttribute("href")
		) || "./";
	}
);


// 其他
!function(){

this.Object = function(){
	/**
	 * 对象
	 */
	function Object(){};
	Object = new Rexjs(Object);

	Object.static({
		/**
		 * 获取对象可枚举的属性的属性名集合
		 * @param {*} object - 需要获取属性名的对象
		 */
		getEnumerablePropertyNames: function(object){
			var names = [];

			// 遍历对象
			for(var name in object){
				// 添加属性名
				names.push(name);
			}

			return names;
		}
	});

	return Object;
}();

this.Function = function(bind, empty){
	/**
	 * 函数
	 */
	function Function(){};
	Function = new Rexjs(Function);

	Function.static({
		/**
		 * 强制转换为函数
		 * @param {*} object - 函数属性所处的对象
		 * @param {String} propertyName - 函数属性所处对象内的名称
		 */
		convert: function(object, propertyName){
			// 如果只有 1 个参数
			if(arguments.length === 1){
				// 如果是函数则返回，否则返回 empty 函数
				return typeof object === "function" ? object : empty;
			}

			// 获取函数
			var func = object[propertyName];

			// 如果不是函数
			if(typeof func !== "function"){
				// 返回 empty
				return empty;
			}

			// 返回绑定了 object 的新函数
			return bind.call(func, object);
		}
	});

	return Function;
}(
	Function.bind,
	// empty
	function(){}
);

this.SpreadItem = function(forEach, push){
	/**
	 * 拓展项
	 * @param {*} value - 拓展项的值
	 */
	function SpreadItem(value){
		this.value = value;
	};
	SpreadItem = new Rexjs(SpreadItem);

	SpreadItem.static({
		/**
		 * 给对象赋值，即将另一个对象合并
		 * @param {Object} object - 需要赋值的对象
		 * @param {Object} target - 被赋值或合并的对象
		 */
		assign: function(object, target){
			// 遍历
			forEach(
				target,
				function(value, name){
					// 赋值
					object[name] = value;
				}
			);

			return object;
		},
		/**
		 * 合并所有数组拓展项
		 */
		combine: function(_args){
			var array = [];

			// 遍历参数
			forEach(
				arguments,
				function(item){
					// 如果是 SpreadItem 类的实例
					if(item instanceof SpreadItem){
						// 添加多项
						push.apply(array, item.value);
						return;
					}

					// 添加单项
					array.push(item);
				},
				null,
				true
			);

			return array;
		},
		/**
		 * 通过一个拓展项列表合并所有拓展项
		 * @param {Array} list - 拓展项列表
		 */
		combineBy: function(list){
			return this.combine.apply(this, list);
		}
	});

	SpreadItem.props({
		value: null
	});

	return SpreadItem;
}(
	Rexjs.forEach,
	Array.prototype.push
);

this.ObjectDestructuringTarget = function(getOwnPropertyNames, getOwnPropertyDescriptor){
	/**
	 * 解构目标
	 * @param {Object} origin - 源解构对象
	 */
	function ObjectDestructuringTarget(origin){
		this.destructed = [];
		this.origin = origin;
	};
	ObjectDestructuringTarget = new Rexjs(ObjectDestructuringTarget);

	ObjectDestructuringTarget.props({
		destructed: null,
		/**
		 * 获取解构对象指定名称的属性
		 * @param {String} name - 解构属性名称
		 */
		get: function(name){
			// 记录名称
			this.destructed.push(name);

			// 返回值
			return this.origin[name];
		},
		origin: null,
		/**
		 * 获取没有记录过的其他属性
		 */
		get rest(){
			var rest = {}, origin = this.origin;

			// 获取源对象的所有自身属性并遍历
			getOwnPropertyNames(origin).forEach(
				function(name){
					// 如果已经被解构过
					if(this.indexOf(name) > -1){
						return;
					}

					// 如果是可以枚举的
					if(getOwnPropertyDescriptor(origin, name).enumerable){
						// 设置属性
						rest[name] = origin[name];
					}
				},
				this.destructed
			);

			return rest;
		}
	});

	return ObjectDestructuringTarget;
}(
	Object.getOwnPropertyNames,
	Object.getOwnPropertyDescriptor
);

}.call(
	this
);

Rexjs.static(this);
}(
	Rexjs
);