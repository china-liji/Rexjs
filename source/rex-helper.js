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
		this.observers = [];
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
			// 索引增加 NaN
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
		exception: "",
		/**
		 * 获取下一个迭代结果
		 */
		get next(){
			// 索引交给函数逻辑去处理，这里只需返回结果
			return this.result;
		},
		observe: function(exceptionIndex){
			this.observers.push(exceptionIndex);
		},
		observers: null,
		/**
		 * 获取当前迭代结果
		 */
		get result(){
			try {
				// 返回结果，这里的 this.closed 必须获取两次，因为 this.iterable 是个函数，执行的时候，回改变 this.closed 的值
				return new IteratorResult(
					this.closed ?
						void 0 :
						this.iterable.apply(this.boundThis, this.boundArguments),
					this.closed
				);
			}
			catch(e){
				var observers = this.observers;

				// 如果没有监视
				if(observers.length === 0){
					// 抛出异常
					throw e;
				}

				// 记录异常
				this.exception = e;
				// 设置异常代码块相关索引值
				this.index.current = this.unobserve();

				// 进入异常处理并返回结果
				return this.result;
			}
		},
		/**
		 * 去除最后一个监视
		 */
		unobserve: function(){
			return this.observers.pop();
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
!function(getPrototypeOf, getOwnPropertyDescriptor, hasOwnProperty, getSuperOf){

getSuperOf = function(setterSupported){
	return (
		setterSupported ?
			getPrototypeOf :
			function(obj){
				switch(true){
					// 如果是 Rexjs 实例
					case obj instanceof Rexjs:
						break;

					// 如果自身拥有 $Rexjs_prototype 属性，说明是低版本浏览器的类构造函数，需要获取的是静态父类属性
					case hasOwnProperty.call(obj, "$Rexjs_prototype"):
						return obj.$Rexjs_prototype;
				}

				// 直接返回 getPrototypeOf 的结果
				return getPrototypeOf(obj);
			}
	);
}(
	// setterSupported
	!!(
		Object.setPrototypeOf ||
		getOwnPropertyDescriptor(
			Object.prototype,
			"__proto__"
		)
	)
);

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
		static: false,
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

	StaticProperty.props({
		static: true
	});

	return StaticProperty;
}(
	this.ClassProperty
);

this.Super = function(getPropertyDescriptor){
	/**
	 * 父类
	 */
	function Super(){};
	Super = new Rexjs(Super);

	Super.static({
		/**
		 * 调用父类的构造函数
		 * @param {Rexjs} classPrototype - 类的原型链
		 * @param {Rexjs} classInstance - 类的实例
		 * @param {Array} args - 构造函数参数列表
		 */
		callConstructor: function(classPrototype, classInstance, args){
			return this.returnedThis(
				classInstance,
				// 获取父类原型链上的构造函数并调用
				getPrototypeOf(classPrototype).constructor.apply(classInstance, args)
			);
		},
		/**
		 * 调用父类的方法
		 * @param {Rexjs, Object} classInstance - 类的实例
		 * @param {Function} method - 父类的方法
		 * @param {Array} args - 参数列表
		 */
		execMethod: function(classInstance, method, args){
			return method.apply(classInstance, args);
		},
		/**
		 * 获取父类属性值
		 * @param {Rexjs, Object} classPrototype - 某级父类的原型链
		 * @param {Rexjs, Object} classInstance - 类的实例
		 * @param {String} name - 需要获取属性的名称
		 */
		getProperty: function(classPrototype, classInstance, name){
			var descriptor = getPropertyDescriptor(classPrototype, name);

			// 如果描述符存在
			if(descriptor){
				// 如果是 get 访问器，则调用 get 方法，否则返回属性值
				return (
					descriptor.hasOwnProperty("get") ?
						descriptor.get.call(classInstance) :
						descriptor.value
				);
			}

			return void 0;
		},
		/**
		 * 获取父类构造函数执行结果所返回的、有效的 this
		 * @param {Rexjs} classInstance - 类的实例
		 * @param {*} returnValue - 构造函数所返回的值
		 */
		returnedThis: function(classInstance, returnValue){
			// 如果构造函数返回值是对象，而且存在，则返回该对象，否则返回实例
			return (typeof returnValue === "object" && returnValue) || classInstance;
		},
		/**
		 * 设置父类属性值
		 * @param {Rexjs, Object} classPrototype - 某级父类的原型链
		 * @param {Rexjs, Object} classInstance - 类的实例
		 * @param {String} name - 需要设置属性的名称
		 * @param {*} value - 需要设置属性的值
		 */
		setProperty: function(classPrototype, classInstance, name, value){
			var descriptor = getPropertyDescriptor(classPrototype, name);

			// 如果描述符存在而且是访问器
			if(descriptor && descriptor.hasOwnProperty("set")){
				var set = descriptor.set;

				// 如果是 set 访问器
				if(set){
					// 调用 set 方法
					set.call(classInstance, value);
				}

				return value;
			}

			// 直接给实例设置值
			classInstance[name] = value;
			return value;
		}
	});

	return Super;
}(
	// getPropertyDescriptor
	function(classPrototype, name){
		var superPrototype = getSuperOf(classPrototype);

		// 如果父类原型链存在
		while(superPrototype){
			// 如果是自身属性
			if(hasOwnProperty.call(superPrototype, name)){
				return getOwnPropertyDescriptor(superPrototype, name);
			}

			// 继续获取父类原型链
			superPrototype = getPrototypeOf(superPrototype);
		}

		return null;
	}
);

this.Class = function(ClassProperty, defineProperty){
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
		 * @param {Number} constructorIndex - 构造函数在类属性列表中的索引值
		 */
		create: function(SuperClass, allProps, constructorIndex){
			var constructor = allProps[constructorIndex].value;

			// 如果构造函数不是函数
			if(typeof constructor !== "function"){
				// 报错
				throw "Class extends value " + constructor.toString() + " is not a constructor or null";
			}

			var CreatedClass = new Rexjs(constructor, SuperClass), prototype = CreatedClass.prototype;

			// 避免使用 forEach 每次产生的新函数，所以使用 for 循环
			for(var i = 0, j = allProps.length;i < j;i++){
				var property = allProps[i];

				// 如果是构造函数
				if(i === constructorIndex){
					continue;
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
					property.static ? CreatedClass : prototype,
					property.name,
					descriptor
				);
			}

			return CreatedClass;
		}
	});

	return Class;
}(
	this.ClassProperty,
	Object.defineProperty
);

}.call(
	this,
	Object.getPrototypeOf,
	Object.getOwnPropertyDescriptor,
	Object.hasOwnProperty,
	// getSuperOf
	null
);


// 模块辅助类
!function(URL_REGEXP, document, encodeURI){

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
					(
						baseURL.protocal + "//" + baseURL.host +
						// 如果是根目录路径，则忽略 dirname
						(urlString[0] === "/" ? "" : baseURL.dirname + "/") +
						urlString
					)
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
			var hostname = this.hostname;

			// 如果存在 hostname
			if(hostname){
				var port = this.port;

				// 拼接 host
				return hostname + (port ? ":" + port : "");
			}

			// 返回空字符串
			return "";
		},
		hostname : "",
		/**
		 * 获取完整连接
		 */
		get href(){
			return this.protocal + (this.hostname ? "//" + this.host : "") + this.pathname + this.search + this.hash;	
		},
		/**
		 * 获取域地址
		 */
		get origin(){
			// 如果 hostname 存在
			if(this.hostname){
				// 返回拼接结果
				return this.protocal + "//" + this.host;
			}

			// 返回 null 字符串
			return "null";
		},
		/**
		 * 获取路径名
		 */
		get pathname(){
			var filename = this.filename, dirname = this.dirname;

			// 如果文件名存在
			if(filename){
				// 拼接目录名和文件名
				return dirname + (dirname[dirname.length - 1] === "/" ? "" : "/") + filename;
			}

			// 直接返回目录名
			return dirname;
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
		if(!result){
			return false;
		}
		
		var dirname = result[4] || "", protocal = result[1],
		
			hostname = result[2] || "", port = result[3] || "",
			
			filename = result[5] || "";
		
		url.protocal = protocal;
		url.hostname = hostname;
		url.port = port;
		url.filename = filename;
		url.ext = result[6] || "";
		url.search = result[7] || "";
		url.hash = result[8] || "";

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
			
			case void 0:
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

				// 清空 host 与 port
				url.hostname = url.port = "";

				// 如果是 dataURL
				if(protocal === "data:"){
					// 直接设置 dirname
					url.dirname = urlString.substring(protocal.length, index);
					// 清空 filename 与 ext
					url.filename = url.ext = "";
					return true;
				}
				
				// 重置 url 部分属性
				dirname = urlString.substring(protocal.length, index - filename.length);
				// 解码 search
				url.search = decodeURI(url.search);
				// 解码 hash
				url.hash = decodeURI(url.hash);
				break;
			}
		}
		
		var dirnameArray = [];
		
		// 分割路径
		dirname
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
						dirnameArray.splice(dirnameArray.length - 1);
						break;
						
					case "" :
						break;
					
					// 添加目录
					default :
						dirnameArray.push(name);
						break;
				}
			});

		// 如果 文件名不存在 而且 路径名最后是 "/"
		if(!filename && dirname[dirname.length - 1] === "/"){
			// 那么添加空字符串，方便下面的 dirname 在末尾加上 "/"
			dirnameArray.push("");
		}

		// 设置 dirname
		url.dirname = "/" + dirnameArray.join("/");
		return true;
	}
);

this.HTMLCompiler = function(URL, FORMAT_REGEXP, UNFORMAT_REGEXP, createdBody, attrs, forEach){
	/**
	 * HTML 编译器
	 * @param {String} cssText - 源文本
	 * @param {String} sourceURL - 文件地址
	 */
	function HTMLCompiler(html, sourceURL){
		// 格式化 html 并赋值给 body 元素
		createdBody.innerHTML = html.replace(FORMAT_REGEXP, '<script rexjs-html-compiler $1></script>');

		// 遍历拥有属性的元素
		forEach(
			createdBody.querySelectorAll("[" + attrs.join("], [") + "]"),
			function(element){
				// 遍历属性
				attrs.forEach(function(attr){
					// 如果元素没有该属性
					if(!element.hasAttribute(attr)){
						return;
					}

					// 设置属性
					element.setAttribute(
						attr,
						// 格式化路径
						new URL(
							element.getAttribute(attr),
							sourceURL
						)
						.href
					);
				});
			},
			null,
			true
		);

		// 去格式化并设置结果
		this.result = createdBody.innerHTML.replace(UNFORMAT_REGEXP, function(str, escape, format){
			// 如果是被 innerHTML 转移的符号
			if(escape){
				// 设置 body 的 innerHTML，起到反转义
				createdBody.innerHTML = escape;
				// 获取 textContent，获取未转义的字符
				return createdBody.textContent;
			}

			// 返回去转义的结果
			return "&" + format + ";";
		});

		// 清空 innerHTML
		createdBody.innerHTML = "";
	};
	HTMLCompiler = new Rexjs(HTMLCompiler);

	HTMLCompiler.static({
		/**
		 * 添加链接性质的属性，此后该属性的值将会根据当期文件路径来修改
		 * @param {String} attr - 链接性质的属性
		 */
		addURLAttr: function(attr){
			attrs.push(attr);
		}
	});

	HTMLCompiler.props({
		result: ""
	});

	return HTMLCompiler;
}(
	this.URL,
	// FORMAT_REGEXP
	/\&(\w+);/g,
	// UNFORMAT_REGEXP
	/(&\w+;)|<script\s+rexjs-html-compiler(?:\s*=\s*"")?\s+(\w+)(?:\s*=\s*"")?\s*><\/script>/g,
	// createdBody
	document.implementation.createHTMLDocument("").body,
	// attrs
	["src", "href"],
	Rexjs.forEach
);

this.CSSSelectorMap = function(CSS_SELECTOR_REGEXP, SEPARATOR_REGEXP, cache, postfix, getOwnPropertyNames, hasOwnProperty){
	/**
	 * CSS 选择器映射表
	 * @param {String} namespaceURI - 映射表命名空间地址
	 */
	function CSSSelectorMap(namespaceURI){
		// 创建一个新的映射表
		cache[namespaceURI] = this;
	};
	CSSSelectorMap = new Rexjs(CSSSelectorMap);

	CSSSelectorMap.static({
		/**
		 * 根据命名空间地址获取映射表，如果没有则创建一个并返回
		 * @param {String} namespaceURI - 映射表命名空间地址
		 */
		getSelectorMapByNS: function(namespaceURI){
			// 如果存在
			if(hasOwnProperty.call(cache, namespaceURI)){
				return cache[namespaceURI];
			}

			// 返回新建的映射表
			return new CSSSelectorMap(namespaceURI);
		}
	});

	CSSSelectorMap.props({
		/**
		 * 合并其他选择器映射表
		 * @param {Array.<CSSSelectorMap>} mapList - 其他的选择器映射表
		 */
		merge: function(mapList){
			var cssSelectorMap = this;

			// 遍历列表
			mapList.forEach(
				function(map){
					// 如果是同一个
					if(map === cssSelectorMap){
						// 不处理
						return;
					}

					// 遍历属性名
					getOwnPropertyNames(map).forEach(this, map);
				},
				function(key){
					// 如果已经有该属性
					if(hasOwnProperty.call(cssSelectorMap, key)){
						return;
					}

					// 设置属性
					cssSelectorMap[key] = this[key];
				}
			);
		},
		/**
		 * 解析选择器
		 * @param {String} selectorText - 选择器文本
		 */
		parse: function(selectorText){
			var cssSelectorMap = this;

			// 返回替换后的字符串
			return (
				selectorText.replace(
					CSS_SELECTOR_REGEXP,
					function(str){
						var key, selector = str.substring(1);

						// 获取 key
						key = selector.replace(
							SEPARATOR_REGEXP,
							function(s){
								return s[1].toUpperCase();
							}
						);

						// 如果没有该属性
						if(!hasOwnProperty.call(cssSelectorMap, key)){
							postfix++;
							// 设置属性
							cssSelectorMap[key] = selector + "-" + postfix.toString(16);
						}

						// 返回结果
						return str[0] + cssSelectorMap[key];
					}
				)
			);
		}
	});

	return CSSSelectorMap;
}(
	// CSS_SELECTOR_REGEXP
	/(?:#|\.)[^#.[+~*>:,\s]+/g,
	// SEPARATOR_REGEXP
	/(?:-|_)\w/g,
	// cache
	{},
	// postfix - 起始 2560 ~ 2816 16 进制后最少有 3 位数，且第一位应该为字母
	Math.round(2560 + Math.random() * 256),
	Object.getOwnPropertyNames,
	Object.prototype.hasOwnProperty
);

this.CSSCompiler = function(URL, CSSSelectorMap, CSSRule, CSS_URL_REGEXP, enableSelectorMap, parse, merge, forEach, appendStyleTo){
	/**
	 * CSS 编译器
	 * @param {String} cssText - 源文本
	 * @param {String} sourceURL - 文件地址
	 */
	function CSSCompiler(cssText, sourceURL){
		// 初始化引用
		this.imports = [];

		// 处理 css 源文本
		cssText = this.compileURLs(cssText, sourceURL);

		// 如果需要启用选择器映射
		if(enableSelectorMap){
			// 设置属性
			this.selectorMap = new CSSSelectorMap(sourceURL);

			// 编译选择器
			cssText = this.compileSelectors(
				appendStyleTo(
					cssText,
					document.implementation.createHTMLDocument("").head
				)
				.sheet
				.cssRules
			);
		}

		// 追加 sourceURL
		this.result = cssText + "\n/*# sourceURL=" + sourceURL + " */";
	};
	CSSCompiler = new Rexjs(CSSCompiler);

	CSSCompiler.static({
		/**
		 * 禁止使用选择器解析器
		 */
		disableSelectorMap: function(){
			enableSelectorMap = false;
		}
	});

	CSSCompiler.props({
		/**
		 * 编译 CSS 选择器
		 * @param {CSSRuleList} cssRules - css 规则列表
		 */
		compileSelectors: function(cssRules){
			var result = "";

			// 遍历规则
			forEach(
				cssRules,
				function(rule){
					// 判断类型
					switch(rule.type){
						// 如果是 style 规则
						case CSSRule.STYLE_RULE:
							// 解析选择器
							result += parse.call(this.selectorMap, rule.selectorText) + "{" + rule.style.cssText + "}";
							return;

						// 如果是 @media 规则
						case CSSRule.MEDIA_RULE:
							result += "@media " + rule.conditionText;
							break;

						// 如果是 @keyframes 规则
						case CSSRule.KEYFRAMES_RULE:
							result += "@keyframes " + rule.name;
							break;

						// 如果是 @supports 规则
						case CSSRule.SUPPORTS_RULE:
							result += "@supports " + rule.conditionText;
							break;

						// 如果是 @import 规则
						case CSSRule.IMPORT_RULE:
							this.imports.push(rule.href);
							return;

						// 如果是 @namespace 规则
						case CSSRule.NAMESPACE_RULE:
							// 如果是选择器映射空间
							if(rule.prefix === "selector-map"){
								this.selectorMap = CSSSelectorMap.getSelectorMapByNS(rule.namespaceURI);
								return;
							}

						// 其他
						default:
							result += rule.cssText;
							return;
					}

					// 追加起始大括号
					result += "{";
					// 继续编译子规则的选择器
					result += this.compileSelectors(rule.cssRules);
					// 追加结束大括号
					result += "}";
				},
				this,
				true
			);

			return result;
		},
		/**
		 * 编译 URL，将地址转为绝对路径
		 * @param {String} cssText - css 文本内容
		 * @param {String} sourceURL - 当前 css 文件的文件地址
		 */
		compileURLs: function(cssText, sourceURL){
			return cssText.replace(
				CSS_URL_REGEXP,
				function(str, urlStart, urlQuote, url, urlEnd){
					// 如果 url 不存在
					if(!url){
						return str;
					}

					// 返回 url
					return urlStart + new URL(url, sourceURL).href + urlEnd;
				}
			);
		},
		/**
		 * 完成编译，合并依赖模块的选择器映射表，并将样式添加到文档中
		 */
		done: function(selectorMapList){
			// 合并选择器映射表
			merge.call(this.selectorMap, selectorMapList);

			// 添加到文档中
			this.style = appendStyleTo(this.result, document.head);
		},
		imports: null,
		result: "",
		selectorMap: null,
		style: null
	});

	return CSSCompiler;
}(
	this.URL,
	this.CSSSelectorMap,
	CSSRule,
	// CSS_URL_REGEXP
	new RegExp(
		[
			// 注释正则
			/\/\*[\s\S]*?\*\//.source,
			// 字符串正则
			/"(?:\\(?:[^\r]|\r\n?)|[^"\\\r\n\u2028\u2029]+)*"|'(?:\\(?:[^\r]|\r\n?)|[^'\\\r\n\u2028\u2029]+)*'/.source,
			// 路径正则
			/(\burl\s*\(\s*(['"]?))(.*?)(\2\s*\))/.source
		]
		.join("|"),
		"g"
	),
	// enableSelectorMap
	true,
	this.CSSSelectorMap.prototype.parse,
	this.CSSSelectorMap.prototype.merge,
	Rexjs.forEach,
	// appendStyleTo
	function(cssText, parentElement){
		var style = document.createElement("style");

		style.type = "text/css";
		style.textContent = cssText;

		parentElement.appendChild(style);
		return style;
	}
);

}.call(
	this,
	// URL_REGEXP
	/^([^:/?#.]+:)?(?:\/\/(?:[^/?#]*@)?([\w\d\-\u0100-\uffff.%]*)(?::([0-9]+))?)?(?:([^?#]+?)([^\/]+?(\.[^.?#\/]+))?)?(?:(\?[^#]*))?(?:(#.*))?$/,
	document,
	encodeURI
);


!function(
	URL, ECMAScriptParser, XMLHttpRequest,
	STATUS_NONE, STATUS_LOADING, STATUS_PARSING, STATUS_READY, STATUS_ENDED, STATUS_COMPLETED, STATUS_ERROR,
	document, trigger
){

this.ModuleName = function(BASE_URI){
	/**
	 * 模块名称
	 * @param {String} value - 模块名称
	 * @param {String} _baseURLstring - 基础地址
	 */
	function ModuleName(value, _baseURLstring){
		URL.call(
			this,
			value,
			typeof _baseURLstring === "string" ? new URL(_baseURLstring, BASE_URI).href : BASE_URI
		);

		// 如果文件名存在
		if(this.filename !== ""){
			return;
		}

		var pathname = this.pathname;

		// 返回新的实例
		return new ModuleName(
			this.origin + pathname + "/index.js" + this.search + this.hash
		);
	};
	ModuleName = new Rexjs(ModuleName, URL);

	ModuleName.props({
		value: ""
	});

	return ModuleName;
}(
	new URL(
		(
			document.querySelector("base") ||
			{
				getAttribute: function(){
					return "./";
				}
			}
		)
		.getAttribute("href"),
		location.href
	)
	.href
);

this.Module = function(
	ModuleName, HTMLCompiler, CSSCompiler, MappingBuilder, File,
	cache, exports, global,
	create, defineProperty, parse, nativeEval, request, listenDomReady
){
	/**
	 * 模块
	 * @param {String} name - 模块名称
	 * @param {String, Function} _code - 模块代码
	 * @param {Boolean} _sync - 是否同步
	 */
	function Module(name, _code, _sync){
		var moduleName = new ModuleName(name), href = moduleName.href;

		// 如果缓存里已经存在该模块
		if(cache.hasOwnProperty(href)){
			var mod = cache[href];

			// 如果是函数而且没有结束（没有执行）
			if(typeof _code === "function" && !this.ended){
				// 加载当前模块
				mod.load(_code);
			}

			// 返回该模块
			return mod;
		}

		this.exports = create(null);
		this.imports = [];
		this.listeners = [];
		this.name = moduleName;
		this.status = STATUS_LOADING;
		this.targets = [];

		cache[href] = this;

		// 判断代码类型
		switch(typeof _code){
			// 如果是字符串
			case "string":
				// 代码就绪
				this.ready(_code, _sync);
				return;

			// 如果是函数
			case "function":
				// 加载当前模块
				this.load(_code);
				return;
		}

		// 加载代码
		request(this, name, href, _sync);
	};
	Module = new Rexjs(Module);

	Module.static({
		STATUS_NONE: STATUS_NONE,
		STATUS_LOADING: STATUS_LOADING,
		STATUS_PARSING: STATUS_PARSING,
		STATUS_READY: STATUS_READY,
		STATUS_ENDED: STATUS_ENDED,
		STATUS_COMPLETED: STATUS_COMPLETED,
		STATUS_ERROR: STATUS_ERROR,
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
		/**
		 * 输出模块成员
		 * @param {String} name - 需要输出的模块成员名称
		 * @param {*} value - 需要输出的模块成员值
		 */
		export: function(name, value){
			defineProperty(
				exports,
				name,
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
			return (
				cache[
					new ModuleName(name, _baseURLstring).href
				]
				.exports
			);
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
		/**
		 * 判断该模块是否已经加载并执行完成
		 */
		get completed(){
			return (this.status & STATUS_COMPLETED) === STATUS_COMPLETED;
		},
		/**
		 * 判断该模块是否已经加载结束
		 */
		get ended(){
			return (this.status & STATUS_ENDED) === STATUS_ENDED;
		},
		/**
		 * 判断该模块是否发生了错误
		 */
		get error(){
			return (this.status & STATUS_ERROR) === STATUS_ERROR;
		},
		exports: null,
		/**
		 * 执行编译后的代码
		 */
		eval: function(){
			var count = 0, progress = 0, imports = this.imports, status = this.status;

			// 如果还没有就绪
			if((this.status & STATUS_READY) !== STATUS_READY){
				return false;
			}
			
			// 如果已经执行完成
			if(this.completed){
				return true;
			}

			// 遍历
			imports.forEach(function(i){
				// 如果已完成，总数加 1，否则加 0。ps：+true = 1, +false = 0
				count += +i.completed;
			});

			// 计算进度
			progress = count / imports.length;

			// 如果所有需要引用的依赖模块的代码没有执行完成
			if(progress < 1){
				// 触发监听器
				trigger(
					this,
					+progress.toFixed(2)
				);

				return false;
			}

			var result = this.result;
			
			// 判断拓展名
			switch(this.name.ext){
				// 如果是 js
				case ".js":
					// 执行代码
					nativeEval(result);
					break;

				// 如果是 css
				case ".css":
					// 样式编译完成
					result.done(
						// 遍历 imports
						this.imports.map(function(mod){
							// 返回依赖模块的选择器映射
							return mod.result.selectorMap;
						})
					);

					// 加载模块
					this.load(function(){
						// 设置默认输出
						Module.export("compiler", result);
						// 设置默认输出
						Module.export("default", result.selectorMap);
					});
					break;

				// 如果是 html
				case ".html":
					// 加载模块
					this.load(function(){
						// 设置默认输出
						Module.export("compiler", result);
						// 设置默认输出
						Module.export("default", result.result);
					});
					break;

				default:
					// 加载模块
					this.load(function(){
						// 设置默认输出
						Module.export("default", result);
					});
					break;
			}
			
			return true;
		},
		imports: null,
		/**
		 * 监听模块加载进度
		 * @param {Function} listener - 需要添加的监听器
		 */
		listen: function(listener){
			// 如果已经结束
			if(this.ended){
				// 直接调用该监听器
				listener.call(this, 1);
				return;
			}

			// 添加到等待列表中
			this.listeners.push(listener);
		},
		listeners: null,
		/**
		 * 加载当前模块
		 * @param {Function} loader - 模块加载函数
		 */
		load: function(loader){
			// 缓存输出
			exports = this.exports;

			// 加载当前模块
			loader.call(global, Rexjs);

			// 清空缓存
			exports = null;
			// 设置状态为已完成
			this.status = STATUS_COMPLETED;

			// 触发依赖该模块的其他模块的执行方法
			trigger(this);
		},
		name: null,
		origin: "",
		/**
		 * 代码准备就绪处理函数
		 * @param {String} content - 代码内容
		 * @param {Boolean} _sync - 是否同步
		 */
		ready: function(content, _sync){
			var deps, result = content, name = this.name;

			// 记录源内容
			this.origin = content;
			// 设置状态为解析中
			this.status = STATUS_PARSING;

			// 判断拓展名
			switch(name.ext){
				case ".js":
					var parser = new ECMAScriptParser();
			
					// 解析代码
					parser.parse(
						// 初始化文件
						new File(name.href, content)
					);
					
					// 设置模块解析结果
					result = parser.build();
					// 获取依赖
					deps = parser.deps;
					break;

				// 如果是 css
				case ".css":
					// 设置模块解析结果
					result = new CSSCompiler(content, name.href);
					// 获取依赖
					deps = result.imports;
					break;
				
				// 如果是 html
				case ".html":
					result = new HTMLCompiler(content, name.href);
					break;
				
				// 如果是 json
				case ".json":
					// 设置模块解析结果
					result = parse(content);
					break;
			}

			// 设置模块解析结果
			this.result = result;
			// 设置状态为已就绪
			this.status = STATUS_READY;

			// 如果存在依赖模块
			if(deps && deps.length > 0){
				var imports = this.imports;

				// 遍历依赖
				deps.forEach(
					function(dep){
						var href = new ModuleName(dep, name.href).href, mod = cache.hasOwnProperty(href) ? cache[href] : new Module(href, null, _sync);

						// 如果是重复导入
						if(imports.indexOf(mod) > -1){
							return;
						}

						// 如果是两模块相互引用
						if(mod.imports.indexOf(this) > - 1){
							// 报错
							throw (
								"Module has been imported by each other " +
								name.href + " " +
								mod.name.href
							);
						}

						// 添加需要导入的模块
						imports.push(mod);
						// 给导入模块添加目标模块
						mod.targets.push(this);
					},
					this
				);
			}

			// 执行代码
			this.eval();
		},
		result: "",
		status: STATUS_NONE,
		targets: null
	});

	// 监听 dom 就绪事件
	listenDomReady(Module);
	return Module;
}(
	this.ModuleName,
	this.HTMLCompiler,
	this.CSSCompiler,
	Rexjs.MappingBuilder,
	Rexjs.File,
	// cache
	{},
	// exports
	null,
	// global
	typeof global === "undefined" ? self : global,
	Object.create,
	Object.defineProperty,
	JSON.parse,
	// nativeEval
	eval,	
	// request
	function(mod, name, href, _sync){
		var request = new XMLHttpRequest();

		// 监听 onload 事件
		request.addEventListener(
			"load",
			function(){
				// 如果存在错误
				if(this.status !== 200){
					// 设置状态
					mod.status = STATUS_ERROR;
					// 设置错误响应文本
					mod.result = mod.origin = this.responseText;

					// 提示错误信息
					console.error('加载模块 "' + name + '" 错误，status：' + this.status + "。");
					// 触发监听器
					trigger(mod);
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
	// listenDomReady
	function(Module){
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
	}
);

}.call(
	this,
	this.URL,
	Rexjs.ECMAScriptParser,
	XMLHttpRequest,
	// STATUS_NONE
	parseInt(0, 2),
	// STATUS_LOADING
	parseInt(10, 2),
	// STATUS_PARSING
	parseInt(100, 2),
	// STATUS_READY
	parseInt(1000, 2),
	// STATUS_ENDED
	parseInt(10000, 2),
	// STATUS_COMPLETED
	parseInt(111000, 2),
	// STATUS_ERROR
	parseInt(1010000, 2),
	document,
	// trigger
	function(mod, _progress){
		var listeners = mod.listeners;

		// 如果没有提供 _progress 参数
		if(typeof _progress !== "number"){
			_progress = 1;
		}

		// 如果已经加载完成
		if(mod.completed){
			// 触发引用模块的执行
			mod.targets.forEach(function(target){
				target.eval();
			});

			// 清空监听器
			listeners = listeners.splice(0);
		}

		// 执行监听器
		listeners.forEach(function(listener){
			listener.call(mod, _progress);
		});
	}
);


// 其他
!function(){

this.SwitchCondition = function(){
	/**
	 * switch 条件
	 * @param {*} value - 条件值
	 */
	function SwitchCondition(value){
		this.value = value;
	};
	SwitchCondition = new Rexjs(SwitchCondition);

	SwitchCondition.props({
		/**
		 * 检测所提供的值是否与条件值一致
		 * @param {*} value - 所需检测的值
		 */
		case: function(value){
			switch(true){
				// 如果已经匹配到值
				case this.matched:
					break;

				// 如果值一致
				case this.value === value:
					this.matched = true;
					break;

				default:
					return false;
			}

			return true;
		},
		/**
		 * 判断是否还能进入 default 表达式
		 */
		default: function(){
			// 如果已经有匹配到值，则不允许再进入 default
			if(this.matched){
				return false;
			}

			this.matched = true;
			return true;
		},
		matched: false,
		value: null
	});

	return SwitchCondition;
}();

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