new function(Rexjs){

// 迭代器相关
~function(){

this.IteratorIndex = function(){
	/**
	 * 迭代器索引
	 * @param {Number} max - 索引最大值
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

			this.current = current > max ? max + 1 : current;
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

this.Iterator = function(IteratorIndex, IteratorResult, Infinity){
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
			this.index = new IteratorIndex(length - 1);
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

			return index.current > index.max;
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
	this.IteratorResult,
	Infinity
);

this.Generator = function(Iterator){
	/**
	 * 生成器
	 * @param {*} iterable - 可迭代的对象
	 */
	function Generator(iterable){
		// 初始化迭代器
		this.iterator = new Iterator(iterable);
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
	this
);


// 类相关
~function(){

this.ClassProperty = function(){
	function ClassProperty(name, value, _type){
		this.name = name;
		this.value = value;

		if(_type){
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
	function StaticProperty(name, value, _type){
		ClassProperty.call(this, name, value, _type);
	};
	StaticProperty = new Rexjs(StaticProperty, ClassProperty);

	return StaticProperty;
}(
	this.ClassProperty
);

this.Class = function(ClassProperty, StaticProperty, defineProperty, getPrototypeOf){
	function Class(){

	};
	Class = new Rexjs(Class);

	Class.static({
		create: function(SuperClass, allProps, indexOfConstructor){
			var constructor = allProps[indexOfConstructor].value;

			if(typeof constructor !== "function"){
				throw "Class extends value " + constructor.toString() + " is not a constructor or null";
			}

			var CreatedClass = new Rexjs(constructor, SuperClass);

			allProps.forEach(
				function(property, index){
					if(index === indexOfConstructor){
						return;
					}

					var type = property.type, descriptor = { enumerable: false, configurable: true };

					if(type === "value"){
						descriptor.writable = true;
						descriptor.value = property.value;
					}
					else {
						descriptor[type] = property.value;
					}

					defineProperty(
						property instanceof StaticProperty ? CreatedClass : this,
						property.name,
						descriptor
					);
				},
				CreatedClass.prototype
			);

			return CreatedClass;
		},
		superOf: function(instance, depth, _willCall){
			var sp = null;

			for(var i = 0;i < depth;i++){
				sp = instance = getPrototypeOf(instance);
			}

			return (
				_willCall ?
					function(){
						sp.constructor.apply(instance, arguments);
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


~function(XMLHttpRequest, URL_REGEXP, encodeURI, parseInt){

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
		get host(){
			return this.hostname + (this.port ? ":" + this.port : "");
		},
		hostname : "",
		get href(){
			return this.origin + this.pathname + this.search + this.hash;	
		},
		get origin(){
			return this.protocal + "//" + this.host;	
		},
		get pathname(){
			var dirname = this.dirname;
			
			return dirname + (dirname[dirname.length - 1] === "/" ? "" : "/") + this.filename;
		},
		port : "",
		protocal : "",
		search : "",
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

		switch(protocal){
			case "http:":
			case "https:":
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
		
		var hasFilename, length, pathnameArray = [];
		
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

		length = pathnameArray.length;
		hasFilename = length > 0 ? pathnameArray[length - 1].indexOf(".") > -1 : false;

		url.dirname = "/" + (hasFilename ? pathnameArray.slice(0, pathnameArray.length - 1) : pathnameArray).join("/");
		url.filename = hasFilename ? pathnameArray[length - 1] : "";

		return true;
	}
);

this.ModuleName = function(URL, BASE_URI){
	function ModuleName(value, _baseURLstring){
		URL.call(
			this,
			value,
			typeof _baseURLstring === "string" ? _baseURLstring : BASE_URI
		);

		if(this.filename === ""){
			this.filename = "index.js";
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
	// BASE_URI todo: 需要兼容 node 环境
	document.baseURI
);

this.Module = function(ModuleName, ECMAScriptParser, MappingBuilder, File, STATUS_NONE, STATUS_LOADING, STATUS_PARSING, STATUS_READY, STATUS_COMPLETED, cache, name, exports, create, defineProperty, nativeEval, load){
	/**
	 * 模块，todo: 需要兼容 node 环境
	 */
	function Module(name, _code, _sync){
		var moduleName = new ModuleName(name), href = moduleName.href;

		this.exports = create(null);
		this.imports = [];
		this.name = moduleName;
		this.status = STATUS_LOADING;
		this.targets = [];

		cache[href] = this;

		if(typeof _code === "string"){
			this.ready(_code, _sync);
			return;
		}

		load(this, name, href, _sync);
	};
	Module = new Rexjs(Module);

	Module.static({
		STATUS_NONE: STATUS_NONE,
		STATUS_LOADING: STATUS_LOADING,
		STATUS_PARSING: STATUS_PARSING,
		STATUS_READY: STATUS_READY,
		STATUS_COMPLETED: STATUS_COMPLETED,
		get cache(){
			return cache;
		},
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
		exportAs: function(exports, _name, _baseURLstring){
			if(!_name){
				for(var propertyName in exports){
					this.export(propertyName, exports[propertyName]);
				}

				return;
			}

			var allExports = this.import(_name, _baseURLstring);

			for(var propertyName in exports){
				this.export(
					propertyName,
					allExports[
						exports[propertyName]
					]
				);
			}
		},
		exportFrom: function(name, _baseURLstring){
			var exports = this.import(name, _baseURLstring);

			for(var propertyName in exports){
				if(propertyName === "default"){
					continue;
				}

				this.export(propertyName, exports[propertyName]);
			}
		},
		import: function(name, _baseURLstring){
			if(!cache[
				new ModuleName(name, _baseURLstring).href
			]){
				debugger
			}

			return cache[
				new ModuleName(name, _baseURLstring).href
			]
			.exports;
		},
		lock: function(n){
			name = n;
		},
		memberOf: function(member, name, _baseURLstring){
			return this.import(name, _baseURLstring)[member];
		},
		moduleOf: function(name, _baseURLstring){
			return this.import(name, _baseURLstring);
		}
	});

	Module.props({
		exports: null,
		eval: function(){
			switch(this.status){
				case STATUS_READY:
					break;

				case STATUS_COMPLETED:
					return true;

				default:
					return false;
			}

			if(
				!this.imports.every(function(i){
					if((i.status & STATUS_READY) === STATUS_READY){
						return true;
					}

					return false;
				})
			){
				return false;
			}

			this.status = STATUS_COMPLETED;
			exports = this.exports;

			nativeEval(this.result);

			exports = null;

			this.targets.forEach(
				function(target){
					target.eval();
				},
				this
			);

			return true;
		},
		imports: null,
		name: null,
		ready: function(content, _sync){
			var name = this.name;

			switch(name.ext){
				case ".js":
					break;

				case ".css":
					var style = document.createElement("style");

					style.textContent = content;

					document.head.appendChild(style);

				default:
					defineProperty(
						this.exports,
						"default",
						{
							get: function(){ return content },
							configurable: false,
							enumerable: true
						}
					);
					
					this.result = content;
					this.status = STATUS_COMPLETED;

					this.targets.forEach(
						function(target){
							target.eval();
						},
						this
					);
					return;
			}

			var imports = this.imports, parser = new ECMAScriptParser(), file = new File(name.href, content);
			//var builder = new MappingBuilder(file);
			
			this.status = STATUS_PARSING;

			parser.parse(file);
			
			this.result = parser.build();
			this.status = STATUS_READY;

			parser.deps.forEach(
				function(dep){
					var href = new ModuleName(dep, name.href).href, mod = cache.hasOwnProperty(href) ? cache[href] : new Module(href, null, _sync);

					if(imports.indexOf(mod) > -1){
						return;
					}

					imports.push(mod);
					mod.targets.push(this);
				},
				this
			);

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

			[].forEach.call(
				document.querySelectorAll('script[type="text/rexjs"]'),
				function(script){
					if(script.hasAttribute("src")){
						new Module(script.src);
						return;
					}

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
	}
);

}.call(
	this,
	XMLHttpRequest,
	// URL_REGEXP
	/^([^:/?#.]+:)?(?:\/\/(?:[^/?#]*@)?([\w\d\-\u0100-\uffff.%]*)(?::([0-9]+))?)?([^?#]+?(\.[^.?#]+)?)?(?:(\?[^#]*))?(?:(#.*))?$/,
	encodeURI,
	parseInt
);


// 其他
~function(){

this.Parameter = function(forEach, push){
	function Parameter(value){
		this.value = value;
	};
	Parameter = new Rexjs(Parameter);

	Parameter.static({
		toSpreadArray: function(_args){
			var array = [];

			forEach.call(
				arguments,
				function(item){
					if(item instanceof Parameter){
						push.apply(array, item.value);
						return;
					}

					array.push(item);
				}
			);

			return array;
		},
		toTemplateArray: function(_args){
			var templates = [], array = [templates];

			forEach.call(
				arguments,
				function(item){
					(
						item instanceof Parameter ? array : templates
					)
					.push(
						item.value
					);
				}
			);

			return array;
		}
	});

	Parameter.props({
		value: null
	});

	return Parameter;
}(
	Array.prototype.forEach,
	Array.prototype.push
);

}.call(
	this
);

Rexjs.static(this);
}(
	Rexjs
);