/*
 * Rexjs
 * version: 1.7.2
 * homepage: https://china-liji.github.io/Rexjs.org
 * GitHub: https://github.com/china-liji/Rexjs
 */
﻿!function(Rexjs, Object, global, defineProperty, getPrototypeOf){

// Rexjs 的实现
new function(module, descriptor, setPrototypeOf, getOwnPropertyNames){
"use strict";

this.Rexjs = Rexjs = module.exports = function(create, getProperties, setPrototypeOf){
	/**
	 * 创建一个继承至指定父类的子类
	 * @param {Function} constructor - 构造函数
	 * @param {Rexjs} _SuperClass - 需要继承的父类
	 */
	return function Rexjs(constructor, _SuperClass){
		var __proto__, prototype, properties = getProperties(constructor);

		// 判断父类类型
		switch(typeof _SuperClass){
			// 如果是函数
			case "function":
				__proto__ = _SuperClass;
				prototype = _SuperClass.prototype;
				break;

			// 如果是 undefined
			case "undefined":
				__proto__ = getPrototypeOf(Rexjs);
				prototype = this.constructor.prototype;
				break;

			// 默认
			default:
				__proto__ = create(null, properties);
				prototype = null;
				break;
		}

		// 设置 __proto__
		setPrototypeOf(constructor, __proto__);

		// 设置 prototype
		constructor.prototype = create(prototype, properties);
		// 返回类的构造函数
		return constructor;
	};
}(
	Object.create,
	// getProperties
	function(constructor){
		return {
			constructor: {
				value: constructor,
				configurable: true,
				writable: true
			}
		};
	},
	// setPrototypeOf
	setPrototypeOf || (
		descriptor ?
			// 兼容： 旧版 IE10
			function(obj, prototype){
				descriptor.set.call(obj, prototype);
			} :
			// 兼容： IE9、旧版 Android
			function(obj, prototype){
				obj.$Rexjs_prototype = prototype;

				do {
					getOwnPropertyNames(
						prototype
					)
					.forEach(function(name){
						// 如果已经有该属性
						if(obj.hasOwnProperty(name)){
							return;
						}

						// 设置属性
						obj[name] = prototype[name];
					});

					// 继续获取原型链
					prototype = getPrototypeOf(prototype);
				}
				while(prototype);
			}
	)
);

this.value = function(definePrototype){
	return definePrototype(
		new Rexjs(Rexjs, null)
	);
}(
	// definePrototype
	function(rexjs){
		/*
			考虑到 ES6 初稿已经将 __proto__ 属性移除标准，所以在支持 ES6 的情况下，就不做处理；
			再者，IE10 及以下也没有 __proto__ 属性，也不用处理；
			最后，就算其他支持 __proto__ 属性的浏览器，不定义 __proto__ 也没关系，
			通过 Object.getPrototypeOf 方法一样可以获取，只不过在控制台里看不到 __proto__ 属性而已。
		*/
		if(!Object.prototype.hasOwnProperty("__proto__")){
			return rexjs;
		}

		defineProperty(
			rexjs,
			"__proto__",
			Object.getOwnPropertyDescriptor(
				Object.prototype,
				"__proto__"
			)
		);

		return rexjs;
	}
);

// 定义全局变量
defineProperty(global, "Rexjs", this);
}(
	// module
	typeof exports === "object" && typeof module === "object" ? module : {},
	// descriptor
	Object.getOwnPropertyDescriptor(
		Object.prototype,
		"__proto__"
	),
	Object.setPrototypeOf,
	Object.getOwnPropertyNames
);

// 静态属性
new function(Function, __proto__){
"use strict";

this.apply = Function.apply;
this.bind = Function.bind;
this.call = Function.call;
this.hasOwnProperty = Object.prototype.hasOwnProperty;
this.global = global;

this.static = function(getOwnPropertyDescriptor){
	/**
	 * 将一个或多个静态属性添加到该类，并/或修改现有属性的特性
	 * @param {Object} props - 包含一个或多个属性的键值对
	 */
	return function(props){
		for(var name in props){
			var descriptor = getOwnPropertyDescriptor(props, name);

			descriptor.enumerable = false;

			defineProperty(this, name, descriptor);
		}
	};
}(
	Object.getOwnPropertyDescriptor
);

this.props = function(staticMethod){
	/**
	 * 将一个或多个属性添加到该类，并/或修改现有属性的特性
	 * @param {Object} props - 包含一个或多个属性的键值对
	 */
	return function(props){
		staticMethod.call(this.prototype, props);
	};
}(
	this.static
);

this.toString = function(){
	return (
		// 如果成立，说明是低版本浏览器，之前并没有能设置 Rexjs.__proto__ 属性
		__proto__ === Function.prototype ?
			// 取函数的 toString
			Function.toString :
			// 自定义 toString
			function(){
				return "function " + (this.name || "") + "() { native code }";
			}
	);
}();

this.static.call(__proto__, this);

}(
	Function,
	// __proto__
	getPrototypeOf(Rexjs)
);


// 原型链属性的定义
new function(objectPrototype){
"use strict";

this.hasOwnProperty = objectPrototype.hasOwnProperty;
this.isPrototypeOf = objectPrototype.isPrototypeOf;
this.propertyIsEnumerable = objectPrototype.propertyIsEnumerable;

this.toString = function(){
	/**
	 * 对象字符串
	*/
	return function(){
		return "[Rexjs " + this.constructor.name + "]";
	};
}();

this.toLocaleString = function(toString){
	/**
	 * 对象本地字符串
	 */
	return function(){
		return toString.call(this);
	};
}(
	this.toString
);

this.valueOf = function(){
	/**
	 * 获取当前对象的值
	*/
	return function(){
		return this;
	};
}();

Rexjs.static.call(Rexjs.prototype, this);

}(
	// objectPrototype
	Object.prototype
);


// 基本方法和属性的定义
new function(Array){
"use strict";

this.every = function(){
	/**
	 * 确定对象的所有成员是否满足指定的测试
	 * @param {*} obj - 需要测试成员的对象
	 * @param {Function} fn - 用于测试对象成员的测试函数
	 * @param {*} _this - 指定测试函数的 this 对象
	 * @param {Boolean} _arrayLike - 对象是否是一种伪数组
	 */
	return function every(obj, fn, _this, _arrayLike){
		// 如果是数组
		if(_arrayLike){
			for(
				var i = 0, n = obj.length;i < n;i++
			){
				// 调用测试函数
				if(fn.call(_this, obj[i], i, obj)){
					continue;
				}
				
				return false;
			}
		}
		else {
			// 遍历
			for(var name in obj){
				// 调用测试函数
				if(fn.call(_this, obj[name], name, obj)){
					continue;
				}
				
				return false;
			}
		}

		return true;
	};
}();

this.forEach = function(every){
	/**
	 * 遍历对象的所有成员并对其执行指定操作函数
	 * @param {*} obj - 需要遍历的对象
	 * @param {Function} fn - 指定操作的函数
	 * @param {*} _this - 指定操作函数的 this 对象
	 * @param {Boolean} _arrayLike - 对象是否是一种伪数组
	 */
	return function forEach(obj, fn, _this, _arrayLike){
		// 如果是数组
		if(_arrayLike){
			for(var i = 0, n = obj.length;i < n;i++){
				// 调用测试函数
				fn.call(_this, obj[i], i, obj);
			}
		}
		else {
			// 遍历
			for(var name in obj){
				// 调用测试函数
				fn.call(_this, obj[name], name, obj);
			}
		}
		
		return obj;
	};
}(
	this.every
);

this.map = function(forEach){
	/**
	 * 遍历对象的所有成员并对其执行指定操作函数，取其返回值作为新对象集合的同名值，最后返回此新对象
	 * @param {Object} obj - 需要遍历的对象
	 * @param {Function} fn - 指定操作的函数
	 * @param {*} _this - 指定操作函数的 this 对象
	 * @param {Boolean} _arrayLike - 对象是否是一种伪数组
	 */
	return function map(obj, fn, _this, _arrayLike){
		var result = new obj.constructor();

		// 遍历对象
		forEach(
			obj,
			function(value, name, obj){
				// 设置值为fn的返回值
				result[name] = fn.call(this, value, name, obj);
			},
			_this,
			_arrayLike
		);
		
		return result;
	};
}(
	this.forEach
);

this.toArray = function(slice){
	/**
	 * 将类似数组的对象转化为数组
	 * @param {Object} obj - 需要遍历的对象
	 * @param {Number} _start - 进行截取，截取的起始索引
	 * @param {Number} _end - 需要截取的末尾索引
	 */
	return function toArray(obj, _start, _end){
		return slice.call(obj, _start || 0, _end);
	};
}(
	Array.prototype.slice
);

this.toString = function(){
	/**
	 * 使函数在控制台里看起来像本地代码
	 */
	return function toString(){
		var name = this.name;

		if(name){
			return "function " + name + "() { [native code] }";
		}

		return "function (){ [native code] }";
	};
}();

this.forEach(
	this,
	function(property, name, self){
		// 如果属性是函数
		if(typeof property === "function"){
			// 将函数的 toString 设置为 self.toString，实现模拟 native code
			property.toString = self.toString;
		}

		// 如果不是函数，则直接设置属性
		this[name] = property;
	},
	Rexjs
);

}(
	Array
);

}.call(
	this,
	// Rexjs
	null,
	Object,
	// global
	typeof window === "object" ? window :
	typeof global === "object" ? global :
	typeof self === "object" ? self :
	Function("return this;")(),
	Object.defineProperty,
	Object.getPrototypeOf
);
// 基础依赖类
new function(Rexjs, URL_REGEXP, DIR_SEPARATOR_REGEXP, encodeURI, getUrlInfo){

this.List = function(Array, Object, toArray){
	/**
	 * 对列表进行管理、操作的类
	 */
	function List(_rest){};
	List = new Rexjs(List);

	List.props({
		/**
		 * 合并另外一个数组，并返回合并后的新数组
		 * @param {Array} list - 另一个集合
		 */
		concat: function(array){
			return toArray(
					this
				)
				.concat(
					toArray(array)
				);
		},
		/**
		 * 清空整个集合
		 */
		clear: function(){
			this.splice(0);
		},
		/**
		 * 在原列表上，合并另一个集合
		 * @param {List, Array} list - 另一个集合
		 */
		combine: function(list){
			this.push.apply(this, list);
		},
		/**
		 * 对列表进行去重
		 */
		distinct: function(){
			this.splice(
					0
				)
				.forEach(
					function(item){
						if(this.indexOf(item) > -1){
							return;
						}

						this.push(item);
					},
					this
				);
		},
		length: 0
	});

	Object
		.getOwnPropertyNames(
			Array.prototype
		)
		.forEach(
			function(name){
				if(List.prototype.hasOwnProperty(name)){
					return;
				}

				if(name === "toString"){
					return;
				}

				var props = {};

				props[name] = this[name];

				List.props(props);
			},
			Array.prototype
		);

	return List;
}(
	Array,
	Object,
	Rexjs.toArray
);

this.URL = function(toString, parse){
	/**
	 * 地址
	 * @param {String} urlString - 地址字符串
	 * @param {String} _baseURLstring - 基准地址
	 */
	function URL(urlString, _baseURLstring){
		// 如果提供的是 null 或 undefined
		if(urlString == null){
			return;
		}

		// 转化为字符串
		urlString = toString(urlString);

		// 如果解析后存在 protocal 或者 没有提供基础路径
		if(parse(this, urlString) || !_baseURLstring){
			return;
		}

		var baseURL = new URL(_baseURLstring);

		parse(
			this,
			(
				baseURL.origin +
				// 如果是根目录路径，则忽略 dirname
				(urlString[0] === "/" ? "" : baseURL.dirname + "/") +
				urlString
			)
		);
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
			var protocal = this.protocal;

			return (
				(
					protocal ?
						protocal + (
							this.host ?
								"//" + (this.username ? this.username + "@" : "") + this.host :
								"/"
						) :
						""
				) +
				this.pathname + this.search + this.hash
			);
		},
		/**
		 * 获取域地址
		 */
		get origin(){
			var host = this.host;

			// 如果 host 存在
			if(host){
				return this.protocal + "//" + host;
			}

			return "";
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
		},
		username: ""
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
			// 报错
			throw "Invalid URL: " + urlString;
		}
		
		var dirnameArray = [],

			protocal = getUrlInfo(result, 1),

			username = getUrlInfo(result, 2),

			hostname = getUrlInfo(result, 3),

			port = getUrlInfo(result, 4),

			dirname = getUrlInfo(result, 5),

			filename = getUrlInfo(result, 6);

		url.protocal = protocal;
		url.hostname = hostname;
		url.username = username;
		url.port = port;
		url.filename = filename;
		url.ext = getUrlInfo(result, 7);
		url.search = getUrlInfo(result, 8);
		url.hash = getUrlInfo(result, 9);

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
			
			// 如果没有 protocal
			case "":
				break;

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
		
		// 分割路径
		dirname
			.split(
				DIR_SEPARATOR_REGEXP
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
		return protocal.length > 0;
	}
);

Rexjs.static(this);
}(
	Rexjs,
	// URL_REGEXP
	/^(?:([^:/?#.]+:)(?:\/+(?:([^/?#]*)@)?([\w\d\-\u0100-\uffff.%]*)(?::([0-9]+))?)?)?(?:([^?#]*?)([^\/]+?(\.[^.?#\/]+))?)?(?:(\?[^#]*))?(?:(#.*))?$/,
	// DIR_SEPARATOR_REGEXP
	/\/|\\/g,
	encodeURI,
	// getUrlInfo
	function(result, index){
		return result[index] || "";
	}
);
new function(Rexjs, URL, Module, global){

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


// 其他非模块相关
!function(){

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
		 * @param {Object} object - 需要被赋值的对象
		 * @param {Object} target - 用来赋值或合并的对象
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

}.call(
	this
);


// 模块编译器相关
!function(){

this.ModuleCompiler = function(){
	/**
	 * 模块编译器
	 */
	function ModuleCompiler(){};
	ModuleCompiler = new Rexjs(ModuleCompiler);

	ModuleCompiler.props({
		/**
		 * 编译模块
		 * @param {Module} module - 编译的模块
		 */
		compile: function(module){
			this.deps = [];
			this.result = module.origin;
		},
		deps: null,
		/**
		 * 执行模块编译结果
		 * @param {Module} module - 编译的模块
		 */
		exec: function(module){
			var compiler = this;

			// 加载模块
			module.load(function(){
				// 设置默认输出
				Module.export("default", compiler.result);
			});
		},
		result: null
	});

	return ModuleCompiler;
}();

this.JavaScriptCompiler = function(ModuleCompiler, ECMAScriptParser, File, nativeEval){
	/**
	 * JavaScript 模块编译器
	 */
	function JavaScriptCompiler(){
		ModuleCompiler.call(this);
	};
	JavaScriptCompiler = new Rexjs(JavaScriptCompiler, ModuleCompiler);

	JavaScriptCompiler.props({
		/**
		 * 编译模块
		 * @param {Module} module - 编译的模块
		 */
		compile: function(module){
			// 初始化解析器
			var parser = new ECMAScriptParser();
			
			// 解析代码
			parser.parse(
				// 初始化文件
				new File(module.name, module.origin)
			);
			
			// 设置模块解析结果
			this.result = parser.build();
			// 设置依赖
			this.deps = parser.deps;
		},
		/**
		 * 执行模块编译结果
		 * @param {Module} module - 编译的模块
		 */
		exec: function(module){
			nativeEval(this.result);
		}
	});

	return JavaScriptCompiler;
}(
	this.ModuleCompiler,
	Rexjs.ECMAScriptParser,
	Rexjs.File,
	// nativeEval
	eval
);

this.JSONCompiler = function(ModuleCompiler, parse){
	/**
	 * json 模块编译器
	 */
	function JSONCompiler(){
		ModuleCompiler.call(this);
	};
	JSONCompiler = new Rexjs(JSONCompiler, ModuleCompiler);

	JSONCompiler.props({
		/**
		 * 编译模块
		 * @param {Module} module - 编译的模块
		 */
		compile: function(module){
			// 设置模块解析结果
			this.result = parse(module.origin);
			// 设置依赖
			this.deps = [];
		}
	});

	return JSONCompiler;
}(
	this.ModuleCompiler,
	JSON.parse
);

}.call(
	this
);


// 模块相关
!function(STATUS_NONE, STATUS_LOADING, STATUS_COMPILING, STATUS_READY, STATUS_ENDED, STATUS_COMPLETED, STATUS_ERROR, moduleReady, trigger){

this.ModuleCache = function(cache, disabled, hasOwnProperty, getModuleHref, getCachedModule, deleteCachedModule){
	/**
	 * 模块缓存
	 * @param {String} name - 模块名称
	 * @param {String, Function} _code - 模块代码
	 * @param {Boolean} _sync - 是否同步
	 */
	function ModuleCache(){};
	ModuleCache = new Rexjs(ModuleCache);

	ModuleCache.static({
		/**
		 * 缓存模块
		 * @param {Module} module - 需要缓存的模块
		 */
		cache: function(module){
			// 如果禁用缓存了
			if(disabled){
				return;
			}

			// 进行缓存
			cache[module.name.href] = module;
		},
		/**
		 * 判断指定模块是否已经被缓存
		 * @param {Module} module - 需要判断的模块
		 */
		cached: function(module){
			return getModuleHref(module, hasOwnProperty, cache);
		},
		/**
		 * 清空缓存
		 */
		clear: function(){
			cache = {};
		},
		/**
		 * 删除一项缓存
		 * @param {Module} module - 需要判断的模块
		 */
		delete: function(module){
			return getModuleHref(module, deleteCachedModule, cache);
		},
		/**
		 * 获取是否禁用了缓存
		 */
		get disabled(){
			return disabled;
		},
		/**
		 * 设置是否禁用缓存
		 * @param {Boolean} value - 是否禁用缓存
		 */
		set disabled(value){
			// 如果是禁用
			if(value){
				// 清空缓存
				this.clear();
			}
			
			disabled = !!value;
		},
		/**
		 * 获取被缓存的模块
		 * @param {Module} module - 需要判断的模块
		 */
		item: function(module){
			return getModuleHref(module, getCachedModule, cache);
		}
	});

	return ModuleCache;
}(
	// cache
	{},
	// disabled
	false,
	Object.prototype.hasOwnProperty,
	// getModuleHref
	function(module, callback, _this){
		var href;

		// 如果是模块对象
		if(module instanceof Module){
			href = module.name.href;
		}
		// 如果是模块地址，视为模块名称处理
		else if(module instanceof URL){
			href = module.href;
		}
		// 如果是字符串
		else if(typeof module === "string"){
			href = module;
		}
		else {
			return false;
		}

		return callback.call(_this, href);
	},
	// getCachedModule
	function(href){
		return this[href];
	},
	// deleteCachedModule
	function(href){
		delete this[href];
		return true;
	}
);

this.Module = Module = function(ModuleCache, ModuleCompiler, stack, create, defineProperty, readFile, importedByDep){
	/**
	 * 模块
	 * @param {String} name - 模块名称
	 * @param {String, Function} _code - 模块代码
	 * @param {Boolean} _sync - 是否同步
	 */
	function Module(name, _code, _sync){
		var moduleName = moduleReady.parseName(name), href = moduleName.href;

		// 如果缓存里已经存在该模块
		if(ModuleCache.cached(href)){
			var module = ModuleCache.item(href);

			// 如果是函数而且没有结束（没有执行）
			if(typeof _code === "function" && !this.ended){
				// 加载当前模块
				module.load(_code);
			}

			// 返回该模块
			return module;
		}

		this.exports = create(null);
		this.imports = [];
		this.listeners = [];
		this.name = moduleName;
		this.status = STATUS_LOADING;
		this.targets = [];

		ModuleCache.cache(this);

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
		readFile(this, _sync);
	};
	Module = new Rexjs(Module);

	Module.static({
		STATUS_NONE: STATUS_NONE,
		STATUS_LOADING: STATUS_LOADING,
		STATUS_COMPILING: STATUS_COMPILING,
		STATUS_READY: STATUS_READY,
		STATUS_ENDED: STATUS_ENDED,
		STATUS_COMPLETED: STATUS_COMPLETED,
		STATUS_ERROR: STATUS_ERROR,
		/**
		 * 获取指定模块的默认输出
		 * @param {String} name - 模块名称
		 * @param {String} _baseUrlString - 基础地址
		 */
		defaultOf: function(name, _baseUrlString){
			return this.import(name, _baseUrlString).default;
		},
		/**
		 * 输出模块成员
		 * @param {String} name - 需要输出的模块成员名称
		 * @param {*} value - 需要输出的模块成员值
		 * @param {Module} _module - 需要输出到的指定模块
		 */
		export: function(name, value, _module){
			defineProperty(
				(_module || stack[stack.length - 1]).exports,
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
		 * @param {String} _baseUrlString - 输入来源模块的基础地址
		 */
		exportAs: function(exports, _name, _baseUrlString){
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
			var allExports = this.import(_name, _baseUrlString);

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
		 * @param {String} _baseUrlString - 输入来源模块的基础地址
		 */
		exportFrom: function(name, _baseUrlString){
			var exports = this.import(name, _baseUrlString);

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
		 * @param {String} _baseUrlString - 基础地址
		 */
		import: function(name, _baseUrlString){
			return (
				ModuleCache
					.item(
						moduleReady.parseName(name, _baseUrlString).href
					)
					.exports
			);
		},
		/**
		 * 获取模块成员
		 * @param {String} memberName - 成员名称
		 * @param {String} moduleName - 模块名称
		 * @param {String} _baseUrlString - 基础地址
		 */
		memberOf: function(memberName, moduleName, _baseUrlString){
			return this.import(moduleName, _baseUrlString)[memberName];
		},
		/**
		 * 获取模块
		 * @param {String} name - 模块名称
		 * @param {String} _baseUrlString - 基础地址
		 */
		moduleOf: function(name, _baseUrlString){
			return this.import(name, _baseUrlString);
		},
		/**
		 * 获取当前模块的堆栈情况
		 */
		get stack(){
			return stack;
		}
	});

	Module.props({
		compiler: null,
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

			// 编译完成
			this.compiler.exec(this);
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
			// 如果已经加载完成
			if(this.completed){
				return;
			}

			// 添加到堆栈中
			stack.push(this);
			// 加载当前模块
			loader.call(global, Rexjs);
			// 去掉当前模块
			stack.pop();

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
			var compiler, name = this.name, imports = this.imports;

			// 记录源内容
			this.origin = content;
			// 设置状态为编译中
			this.status = STATUS_COMPILING;
			// 设置编译器
			this.compiler = compiler = new (moduleReady.compilers[name.ext] || ModuleCompiler)();

			// 执行编译
			compiler.compile(this);
			
			// 设置状态为已就绪
			this.status = STATUS_READY;

			// 遍历依赖
			compiler.deps.forEach(
				function(dep){
					var href = moduleReady.parseName(dep, name.href).href, module = ModuleCache.cached(href) ? ModuleCache.item(href) : new Module(href, null, _sync);

					// 如果是重复导入
					if(imports.indexOf(module) > -1){
						return;
					}

					// 如果是两模块相互引用
					importedByDep(this, module, module, importedByDep);
					// 添加需要导入的模块
					imports.push(module);
					// 给导入模块添加目标模块
					module.targets.push(this);
				},
				this
			);

			// 执行代码
			this.eval();
		},
		status: STATUS_NONE,
		targets: null
	});

	return Module;
}(
	this.ModuleCache,
	this.ModuleCompiler,
	// stack
	[],
	Object.create,
	Object.defineProperty,
	// readFile
	function(module, _sync){
		moduleReady.readFile(
			module.name,
			function(content){
				module.ready(content, _sync);
			},
			function(error){
				// 设置状态
				module.status = STATUS_ERROR;
				// 设置错误响应文本
				module.origin = error;

				// 提示错误信息
				console.error('加载模块 "' + module.name.href + '" 错误：' + error + "。");
				// 触发监听器
				trigger(module);
			},
			_sync
		);
	},
	// importedByDep
	function(self, depModule, module, callee){
		var imports = module.imports;

		// 如果是两模块相互引用
		if(imports.indexOf(self) > - 1){
			// 报错
			throw (
				"Module has been imported by each other " +
				self.name.href + " " +
				depModule.name.href
			);
		}

		imports.forEach(function(module){
			callee(self, depModule, module, callee);
		});
	}
);

this.ModuleReady = function(JavaScriptCompiler, JSONCompiler, throwError){
	/**
	 * 模块系统准备就绪
	 */
	function ModuleReady(){
		this.compilers = {
			".js": JavaScriptCompiler,
			".json": JSONCompiler
		};

		moduleReady = this;
	};
	ModuleReady = new Rexjs(ModuleReady);

	ModuleReady.static({
		/**
		 * 获取当前模块系统准备就绪实例
		 */
		get current(){
			return moduleReady;
		}
	});

	ModuleReady.props({
		compilers: null,
		/**
		 * 解析模块名称
		 */
		parseName: function(){
			throwError("parseName");
		},
		/**
		 * 读取文件内容
		 */
		readFile: function(){
			throwError("readFile");
		}
	});

	return ModuleReady;
}(
	this.JavaScriptCompiler,
	this.JSONCompiler,
	// throwError
	function(method){
		throw "应该在创建 ModuleReady 的子类时，重新定义该方法：" + method;
	}
);

new this.ModuleReady();

}.call(
	this,
	// STATUS_NONE
	parseInt(0, 2),
	// STATUS_LOADING
	parseInt(10, 2),
	// STATUS_COMPILING
	parseInt(100, 2),
	// STATUS_READY
	parseInt(1000, 2),
	// STATUS_ENDED
	parseInt(10000, 2),
	// STATUS_COMPLETED
	parseInt(111000, 2),
	// STATUS_ERROR
	parseInt(1010000, 2),
	// moduleReady
	null,
	// trigger
	function(module, _progress){
		var listeners = module.listeners;

		// 如果没有提供 _progress 参数
		if(typeof _progress !== "number"){
			_progress = 1;
		}

		// 如果已经加载完成
		if(module.completed){
			// 触发引用模块的执行
			module.targets.forEach(function(target){
				target.eval();
			});

			// 清空监听器
			listeners = listeners.splice(0);
		}

		// 执行监听器
		listeners.forEach(function(listener){
			listener.call(module, _progress);
		});
	}
);

// jsx 相关
!function(){

this.JSXTemplate = function(SpreadItem, toArray, filterEmptyString){
	/**
	 * JSX 模板
	 * @param {Function, String} type - 元素类型
	 */
	function JSXTemplate(type){
		var props = {};

		// 从第二个参数开始遍历
		for(var i = 1, j = arguments.length;i < j;i += 2){
			var key = arguments[i];

			// 如果是拓展属性
			if(key instanceof SpreadItem){
				SpreadItem.assign(props, key.value);
				continue;
			}

			var value = arguments[i + 1];

			switch(key){
				case "ref":
					this.ref = value;
					continue;

				case "key":
					this.key = value;
					continue;

				case "children":
					break;

				default:
					// 设置 props 的键值
					props[key] = value;
					continue;
			}

			// 过滤空字符串
			value = value.filter(filterEmptyString);

			switch(value.length){
				// 如果没有子节点了
				case 0:
					break;

				// 如果只有一个节点
				case 1:
					props.children = value[0];
					break;

				default:
					props.children = value;
					break;
			}
		}

		this.type = type;
		this.props = props;
	};
	JSXTemplate = new Rexjs(JSXTemplate);

	JSXTemplate.props({
		key: null,
		props: null,
		ref: null,
		type: null
	});

	return JSXTemplate;
}(
	this.SpreadItem,
	Rexjs.toArray,
	// filterEmptyString
	function(child){
		return child !== "";
	}
);

}.call(
	this
);

Rexjs.static(this);
}(
	Rexjs,
	Rexjs.URL,
	// Module
	null,
	Rexjs.global
);
new function(Rexjs, Module, document, forEach){

// 浏览器环境中的模块编译器相关
!function(ModuleCompiler){

this.HTMLCompiler = function(URL_PREFIX_REGEXP){
	/**
	 * HTML 编译器
	 */
	function HTMLCompiler(){
		ModuleCompiler.call(this);
	};
	HTMLCompiler = new Rexjs(HTMLCompiler, ModuleCompiler);

	HTMLCompiler.props({
		/**
		 * 编译模块
		 * @param {Module} module - 编译的模块
		 */
		compile: function(module){
			var url = new URL(module.name.href);

			// 设置依赖
			this.deps = [];

			// 设置结果
			this.result = module.origin.replace(
				URL_PREFIX_REGEXP,
				url.origin + url.dirname + "/"
			);
		},
		/**
		 * 执行模块编译结果
		 * @param {Module} module - 编译的模块
		 */
		exec: function(module){
			var compiler = this;

			// 加载模块
			module.load(function(){
				// 设置默认输出
				Module.export("compiler", compiler);
				// 设置默认输出
				Module.export("default", compiler.result);
			});
		}
	});

	return HTMLCompiler;
}(
	// URL_PREFIX_REGEXP
	/to:\/\/|~\//ig
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

this.CSSCompiler = function(CSSSelectorMap, CSSRule, CSS_URL_REGEXP, enableSelectorMap, parse, merge, appendStyleTo){
	/**
	 * CSS 编译器
	 * @param {String} cssText - 源文本
	 * @param {String} sourceURL - 文件地址
	 */
	function CSSCompiler(cssText, sourceURL){
		ModuleCompiler.call(this);
	};
	CSSCompiler = new Rexjs(CSSCompiler, ModuleCompiler);

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
		 * 编译模块
		 * @param {Module} module - 编译的模块
		 */
		compile: function(module){
			var sourceURL = module.name.href;
			
			// 初始化引用
			this.deps = [];

			// 处理 css 源文本
			cssText = this.compileURLs(module.origin, sourceURL);

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
		},
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
							this.deps.push(rule.href);
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
		 * 执行模块编译结果
		 * @param {Module} module - 编译的模块
		 */
		exec: function(module){
			var compiler = this, selectorMap = this.selectorMap;

			// 合并选择器映射表
			merge.call(
				selectorMap,
				module.imports.map(function(mod){
					// 返回依赖模块的选择器映射
					return mod.compiler.selectorMap;
				})
			);

			// 添加到文档中
			this.style = appendStyleTo(this.result, document.head);

			// 加载模块
			module.load(function(){
				// 设置默认输出
				Module.export("compiler", compiler);
				// 设置默认输出
				Module.export("default", selectorMap);
			});
		},
		selectorMap: null,
		style: null
	});

	return CSSCompiler;
}(
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
	Rexjs.ModuleCompiler
);


// 模块于 浏览器环境 与 node 环境兼容相关
!function(ModuleReady, ECMAScriptParser, URL, baseElement){

this.BrowserReady = function(HTMLCompiler, CSSCompiler, XMLHttpRequest, BASE_URL, domContentLoaded){
	/**
	 * 浏览器模块系统准备就绪
	 */
	function BrowserReady(){
		var compilers;

		ModuleReady.call(this);

		compilers = this.compilers;
		compilers[".html"] = HTMLCompiler;
		compilers[".css"] = CSSCompiler;

		// 监听 DOMContentLoaded
		document.addEventListener("DOMContentLoaded", domContentLoaded);
	};
	BrowserReady = new Rexjs(BrowserReady, ModuleReady);

	BrowserReady.props({
		/**
		 * 解析模块名称
		 * @param {String} moduleName - 模块名称
		 * @param {String} _baseUrlString - 基础地址
		 */
		parseName: function(moduleName, _baseUrlString){
			var url = new URL(
				moduleName,
				_baseUrlString ? new URL(_baseUrlString, BASE_URL).href : BASE_URL
			);

			// 如果文件名不存在
			if(url.filename === ""){
				var pathname = url.pathname;

				return new URL(url.origin + (pathname ? pathname : "/index") + ".js" + url.search + url.hash);
			}

			return url;
		},
		/**
		 * 读取文件内容
		 * @param {ModuleName} moduleName - 文件路径
		 * @param {Function} success - 成功回调
		 * @param {Function} fail - 失败回调
		 * @param {Boolean} _sync - 是否为同步
		 */
		readFile: function(moduleName, success, fail, _sync){
			var request = new XMLHttpRequest();

			// 监听 onload 事件
			request.addEventListener(
				"load",
				function(){
					(this.status === 200 ? success : fail)(this.responseText);
				}
			);
			
			// 打开请求，采用异步 get 方式
			request.open("get", moduleName.href, !_sync);
			// 发送请求
			request.send();
		}
	});

	return BrowserReady;
}(
	this.HTMLCompiler,
	this.CSSCompiler,
	XMLHttpRequest,
	// BASE_URL
	new URL(
		baseElement ? baseElement.getAttribute("href") : "./",
		location.href
	)
	.href,
	// domContentLoaded
	function(){
		var count = 0;

		// 遍历元素
		forEach(
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
					new Module(
						script.getAttribute("src")
					);
					return;
				}

				// 初始化内联模块
				new Module("inline-script-" + count++ +".js", script.textContent);
			},
			null,
			true
		);
	}
);

}.call(
	this,
	Rexjs.ModuleReady,
	Rexjs.ECMAScriptParser,
	Rexjs.URL,
	// baseElement
	document.querySelector("base")
);

new this.BrowserReady();
Rexjs.static(this);
}(
	Rexjs,
	Rexjs.Module,
	document,
	Rexjs.forEach
);