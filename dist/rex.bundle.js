!function(Rexjs, Object, MODULE_CODE_STRING, defineProperty, getPrototypeOf){

// Rexjs 的实现
new function(global, module, descriptor, setPrototypeOf, getOwnPropertyNames){
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
	// global
	Function("return this")(),
	// module
	eval(MODULE_CODE_STRING),
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

this.MODULE_CODE_STRING = MODULE_CODE_STRING;

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
	// MODULE_CODE_STRING
	'typeof exports === "object" && typeof module === "object" ? module : {}',
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
	/^(?:([^:/?#.]+:)(?:\/+(?:([^/?#]*)@)?([\w\d\-\u0100-\uffff.%]*)(?::([0-9]+))?)?)?(?:([^?#]+?)([^\/]+?(\.[^.?#\/]+))?)?(?:(\?[^#]*))?(?:(#.*))?$/,
	// DIR_SEPARATOR_REGEXP
	/\/|\\/g,
	encodeURI,
	// getUrlInfo
	function(result, index){
		return result[index] || "";
	}
);
// 基于 Rexjs 语法相关
new function(Rexjs, forEach){
"use strict";

// 变量名集合相关
!function(){

this.VariableIndex = function(){
	/**
	 * 变量索引，用于生产临时变量使用
	 */
	function VariableIndex(){};
	VariableIndex = new Rexjs(VariableIndex);

	VariableIndex.props({
		/**
		 * 值加 1
		 */
		increase: function(){
			this.value++;
		},
		value: 0
	});

	return VariableIndex;
}();

this.CollectionRange = function(){
	/**
	 * 变量收集器范围
	 * @param {VariableCollection} collection - 所相关的变量收集器
	 */
	function CollectionRange(collection){
		this.collection = collection;

		this.start();
	};
	CollectionRange = new Rexjs(CollectionRange);

	CollectionRange.props({
		collection: null,
		/**
		 * 记录结束点（范围包括该点）
		 */
		end: function(){
			this.to = this.collection.length - 1;
		},
		/**
		 * 根据该范围执行回调，并传入对应变量名作为参数
		 * @param {Function} callback - 回调函数
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		forEach: function(callback, _contentBuilder, _anotherBuilder){
			var collection = this.collection;

			for(var i = this.from, j = this.to + 1;i < j;i++){
				// 执行回调
				callback(collection[i], _contentBuilder, _anotherBuilder);
			}
		},
		from: -1,
		/**
		 * 记录起始点（范围包括该点）
		 */
		start: function(){
			this.from = this.collection.length;
		},
		to: -1
	});

	return CollectionRange;
}();

this.VariableCollection = function(CollectionRange){
	/**
	 * 变量名收集器
	 */
	function VariableCollection(){};
	VariableCollection = new Rexjs(VariableCollection);

	VariableCollection.props({
		/**
		 * 搜集变量名
		 * @param {String} variable - 变量名
		 */
		collect: function(variable){
			this[this.length++] = variable;
		},
		/**
		 * 判断该集合内是否包含指定变量名
		 * @param {String} variable - 指定的变量名
		 */
		contains: function(variable){
			for(var i = 0, j = this.length;i < j;i++){
				// 如果变量名相同
				if(this[i] === variable){
					return true;
				}
			}

			return false;
		},
		length: 0,
		/**
		 * 返回一个收集器范围
		 */
		range: function(){
			return new CollectionRange(this);
		},
		/**
		 * 转化为字符串
		 * @param {String} before - 变量之前的字符串
		 * @param {String} join - 变量连接字符串
		 * @param {String} after - 变量之后的字符串
		 */
		toString: function(before, join, after){
			var length = this.length;

			// 如果有效长度是 0
			if(length === 0){
				return "";
			}

			var result = before + this[0];

			for(var i = 1;i < length;i++){
				// 拼接连接符
				result += join;
				// 拼接变量名
				result += this[i];
			}

			return result + after;
		}
	});

	return VariableCollection;
}(
	this.CollectionRange
);

this.VariableCollections = function(PREFIX){
	/**
	 * 变量名收集器集合
	 * @param {VariableIndex} index - 变量名索引
	 */
	function VariableCollections(index){
		this.index = index;
	};
	VariableCollections = new Rexjs(VariableCollections);

	VariableCollections.static({
		/**
		 * 获取临时变量名前缀
		 */
		get prefix(){
			return PREFIX;
		},
		/**
		 * 设置临时变量名前缀
		 * @param {String} value - 需要设置的变量名前缀
		 */
		set prefix(value){
			PREFIX = value;
		}
	});

	VariableCollections.props({
		index: 0,
		/**
		 * 提供一个变量名
		 */
		provide: function(){
			var index = this.index, variable = PREFIX + index.value;

			index.increase();
			return variable;
		}
	});

	return VariableCollections;
}(
	// PREFIX
	"$Rexjs_"
);

}.call(
	this
);


// 文件相关
!function(){

this.File = function(){
	/**
	 * 文件信息
	 * @param {Url} url - 文件路径
	 * @param {String} source - 源文件内容
	 */
	function File(url, source){
		this.url = url;
		this.source = source;
	};
	File = new Rexjs(File);
	
	File.props({
		source: "",
		url: null
	});
	
	return File;
}();

this.Position = function(){
	/**
	 * 标签在语法文件中所处的位置
	 * @param {Number} line - 标签所处行数索引值
	 * @param {Number} column - 标签所处列数索引值
	 */
	function Position(line, column){
		this.line = line;
		this.column = column;
	};
	Position = new Rexjs(Position);
	
	Position.props({
		column: 0,
		line: 0
	});
	
	return Position;
}();

this.Context = function(){
	/**
	 * 标签在语法文件中所匹配的上下文
	 * @param {SyntaxTag} tag - 相关的标签
	 * @param {String} content - 标签所匹配到的代码内容
	 * @param {Position} position - 标签在语法文件中所处的位置
	 */
	function Context(tag, content, position){
		this.tag = tag;
		this.content = content;
		this.position = position;
	};
	Context = new Rexjs(Context);
	
	Context.props({
		content: "",
		position: 0,
		/**
		 * 给语句设置相关表达式，此方法存在的目的是保证 getBoundExpression 必须传入 context 与 statement 这 2 个参数
		 * @param {Statement} statement - 当前语句
		 */
		setExpressionOf: function(statement){
			return statement.expression = this.tag.getBoundExpression(this, statement);
		},
		/**
		 * 给语句块设置相关语句，此方法存在的目的是为了保持与 setExpressionOf 的使用一致性
		 * @param {Statements} statements - 当前语句块
		 */
		setStatementOf: function(statements){
			return statements.statement = this.tag.getBoundStatement(statements);
		},
		/**
		 * 给解析设置相关语句块，此方法存在的目的是为了保持与 setExpressionOf 的使用一致性
		 * @param {Statements} statements - 当前语句块
		 */
		setStatementsOf: function(parser){
			return parser.statements = this.tag.getBoundStatements(parser.statements);
		},
		tag: null
	});
	
	return Context;
}();

this.ContentBuilder = function(){
	/**
	 * 内容生成器
	 */
	function ContentBuilder(){};
	ContentBuilder = new Rexjs(ContentBuilder);
	
	ContentBuilder.props({
		/**
		 * 追加内容上下文
		 * @param {Context} context - 标签内容上下文
		 */
		appendContext: function(context){
			// 交给标签来处理内容
			context.tag.extractTo(this, context.content);
		},
		/**
		 * 追加空格
		 */
		appendSpace: function(){
			this.appendString(" ");
		},
		/**
		 * 追加内容
		 * @param {String} content - 数据内容
		 */
		appendString: function(content){
			this.result += content;
		},
		/**
		 * 完成生成，返回结果
		 */
		complete: function(){
			return this.result;
		},
		/**
		 * 追加新行
		 */
		newline: function(){
			this.appendString("\n");
		},
		result: ""
	});
	
	return ContentBuilder;
}();

this.SourceBuilder = function(ContentBuilder){
	/**
	 * 源码生成器，用来生成 sourceURL
	 * @param {File} file - 生成器相关文件
	 */
	function SourceBuilder(file){
		ContentBuilder.call(this);

		this.file = file;
	};
	SourceBuilder = new Rexjs(SourceBuilder, ContentBuilder);
	
	SourceBuilder.props({
		/**
		 * 完成生成，返回结果
		 */
		complete: function(){
			// 追加新行
			this.newline();
			// 追加 sourceURL
			this.appendString("//# sourceURL=" + this.file.url.href);

			return this.result;
		},
		file: null
	});
	
	return SourceBuilder;
}(
	this.ContentBuilder
);

}.call(
	this
);


// 映射生成器相关
!function(SourceBuilder){

this.Base64 = function(chars, parseInt, btoa){
	/**
	 * base64 相关处理类
	 */
	function Base64(){};
	Base64 = new Rexjs(Base64);
	
	Base64.static({
		/**
		 * 绑定编码 base64 的方法
		 * @param {Function} method - 编码 base64 的方法
		 * 
		 */
		bindBtoa: function(method){
			btoa = method;
		},
		/**
		 * 将字符串编码为 base64，返回是否支持编码
		 * @param {String} string - 源字符串
		 * @param {Function} callback - 回调函数
		 * @param {*} _this - callback 所需绑定的 this
		 * @returns {Boolean}
		 */
		btoa: function(string, callback, _this){
			// 如果方法存在
			if(typeof btoa === "function"){
				// 执行回调
				callback.call(
					_this,
					// 编码
					btoa(string)
				);

				return true;
			}

			return false;
		},
		/**
		 * 将指定数字进行 base64 VLQ 编码
		 * @param {Number} num - 所需提供的数字
		 */
		vlq: function(num){
			var binary, length, result = "";

			// 如果数字小于 0
			if(num < 0){
				// 将数字以正数形式转化为二进制，并在后面加 1，表示负数
				binary = (-num).toString(2) + "1";
			}
			else {
				// 将数字转化为二进制，并在后面加 0，表示正数
				binary = num.toString(2) + "0";
			}

			length = binary.length;
			
			// 字符串从后往前逆序循环，当长度大于 5 时
			while(length > 5){
				// 拼接结果
				result += chars[
					// 转化为十进制
					parseInt(
						// 截取字符串，每段前面加 1，表示一个数字（num）的连续编码中
						"1" + binary.substring(length - 5, length),
						2
					)
				];
				
				// 长度减 5
				length -= 5;
			}
			
			// 拼接结果
			result += chars[
				// 转化为十进制
				parseInt(
					/*
						截取最后一段字符串，前面“不”加 1，表示该数字（num）编码结束
						原理：
						1. 剩余长度不足 5 位，前面应该用 0 来补足 5 位数
						2. 在最前面加上 0，表示该数字（num）编码结束
						但是，在实际计算中，前面的 0，都可以忽略，所以代码中不会加入这段“原理性代码”。
					*/
					binary.substring(0, length),
					2
				)
			];
			
			// 返回结果
			return result;
		}
	});
	
	return Base64;
}(
	// chars
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
	parseInt,
	// btoa
	typeof btoa === "undefined" ? null : btoa
);

this.MappingPosition = function(Position){
	/**
	 * 源码映射生成器中所记录的位置
	 */
	function MappingPosition(){
		Position.call(this, 0, 0);
	};
	MappingPosition = new Rexjs(MappingPosition, Position);
	
	MappingPosition.props({
		generatedLineOffset: 0,
		generatedLineDiff: 0,
		generatedColumnOffset: 0,
		generatedColumnDiff: 0
	});
	
	return MappingPosition;
}(
	this.Position
);

this.MappingBuilder = function(URL, MappingPosition, Base64, JSON, appendContext, appendString, complete, merge, newline){
	/**
	 * 源码映射生成器，用来生成 sourceMap
	 * @param {File} file - 生成器相关文件
	 */
	function MappingBuilder(file){
		SourceBuilder.call(this, file);
		
		this.position = new MappingPosition();
	};
	MappingBuilder = new Rexjs(MappingBuilder, SourceBuilder);
	
	MappingBuilder.static({
		/**
		 * 判断是否支持 sourceMaps
		 */
		get supported(){
			return Base64.btoa(
				"",
				function(){}
			);
		}
	});
	
	MappingBuilder.props({
		/**
		 * 追加内容上下文，同时会更新 sourceMap
		 * @param {Context} context - 标签内容上下文
		 */
		appendContext: function(context){
			var diff, diffVLQ, contextPosition = context.position, builderPosition = this.position,
			
				line = contextPosition.line, column = contextPosition.column;

			// 如果不是空行
			if(builderPosition.generatedLineOffset !== builderPosition.generatedColumnOffset){
				// 追加逗号
				this.appendMappings(",");
			}

			// 追加映射当前信息
			this.appendMappings(
				Base64.vlq(builderPosition.generatedColumnDiff) +
				"A" +
				Base64.vlq(line - builderPosition.line) +
				Base64.vlq(column - builderPosition.column)
			);
			
			// 先要清空一次列的差值
			builderPosition.generatedColumnDiff = 0;

			// 调用父类方法
			appendContext.call(this, context);

			// 获取刚刚上下文所产生的生成列偏移值
			diff = builderPosition.generatedColumnDiff;
			// 获取对应 vlq 编码
			diffVLQ = Base64.vlq(diff);

			/*
				将映射点向右移动等同于 生成列偏移值 的量，并指向原来的位置，
				如：context 所添加的值为 var，
				在此之前，位置是在 var 之前，即 v 的索引位置，
				那么下面的代码，目的是将位置移动到 var 之后，即 r 后面的索引位置，
				而且源代码的位置还是在 var 之前。
			*/
			this.appendMappings("," + diffVLQ + "AAA");
			// 这段代码的目的就是将上面源代码的位置，也移动到 var 之后
			this.appendMappings(",AAA" + diffVLQ);

			// 记录源码的行
			builderPosition.line = line;
			// 记录源码的列
			builderPosition.column = column + diff;
			// 记录列的偏移量
			builderPosition.generatedColumnOffset += diff;
			// 清空列的差值
			builderPosition.generatedColumnDiff = 0;
		},
		/**
		 * 追加映射内容
		 * @param {String} content - 映射内容
		 */
		appendMappings: function(content){
			this.mappings += content;
		},
		/**
		 * 追加内容
		 * @param {String} content - 数据内容
		 */
		appendString: function(content){
			// 计算生成的列差值
			this.position.generatedColumnDiff += content.length;

			// 调用父类方法
			appendString.call(this, content);
		},
		/**
		 * 完成生成，返回结果
		 */
		complete: function(){
			var url = this.file.url;

			// 如果支持解析 base64
			if(Base64.btoa(
				JSON.stringify({
					version: 3,
					sources: [ url.href ],
					names: [],
					mappings: this.mappings
				}),
				function(result){
					// 追加新行
					this.newline();
					// 追加 sourceURL
					this.appendString("//# sourceURL=" + new URL("http://sourceURL" + url.pathname).href);
					// 追加新行
					this.newline();
					// 追加 mappingURL 头部
					this.appendString("//# sourceMappingURL=data:application/json;base64,");
					// 追加 mappings
					this.appendString(result);
				},
				this
			)){
				return this.result;
			}

			// 返回结果
			return complete.call(this);
		},
		mappings: "",
		/**
		 * 追加新行，同时会更新 sourceMap
		 */
		newline: function(){
			var position = this.position;
			
			// 给 mappings 添加分号，表示新行的开始
			this.appendMappings(";");
			// 追加换行符
			newline.call(this);
			
			// 设置偏移量
			position.generatedLineOffset = position.generatedColumnOffset += position.generatedColumnDiff;
			// 清空差值
			position.generatedLineDiff = position.generatedColumnDiff = 0;
		},
		position: null
	});
	
	return MappingBuilder;
}(
	Rexjs.URL,
	this.MappingPosition,
	this.Base64,
	JSON,
	SourceBuilder.prototype.appendContext,
	SourceBuilder.prototype.appendString,
	SourceBuilder.prototype.complete,
	SourceBuilder.prototype.merge,
	SourceBuilder.prototype.newline
);

}.call(
	this,
	this.SourceBuilder
);


// 语法相关
!function(){

this.SyntaxElement = function(){
	/**
	 * 语法元素
	 */
	function SyntaxElement(){};
	SyntaxElement = new Rexjs(SyntaxElement);
	
	SyntaxElement.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(){}
	});
	
	return SyntaxElement;
}();

this.SyntaxConfig = function(){
	/**
	 * 语法配置，用于管理是否编译指定表达式
	 * @param {String} name - 配置名称
	 */
	function SyntaxConfig(){
		forEach(
			arguments,
			function(name){
				this[name] = true;
			},
			this,
			true
		);
	};
	SyntaxConfig = new Rexjs(SyntaxConfig);

	return SyntaxConfig;
}();

this.SyntaxRegExp = function(RegExp, Infinity){
	/**
	 * 语法正则表达式类，用于语法树匹配
	 */
	function SyntaxRegExp(){};
	SyntaxRegExp = new Rexjs(SyntaxRegExp);

	SyntaxRegExp.props({
		/**
		 * 中断正则表达式的匹配
		 */
		break: function(){
			this.lastIndex = Infinity;
		},
		/**
		 * 执行正则表达式进行匹配
		 * @param {RegExp} regexp - 初始化的表达式
		 * @param {String} source - 需要匹配的源代码内容字符串
		 * @param {Function} regexpCallback - 正则表达式匹配出来的回调函数
		 */
		exec: function(regexp, source, callback){
			var result, content = "", index = -1, lastIndex = this.lastIndex;

			// 初始化
			this.lastIndex = 0;
			
			for(;;){
				regexp.lastIndex = lastIndex = this.lastIndex;
				result = regexp.exec(source);

				// 如果没匹配到结果
				if(result === null){
					// 跳出循环
					break;
				}
				
				// 如果相等，说明中间没有其他字符
				if(result.index === lastIndex){
					content = result[0];
					index = result.indexOf("", 1) - 1;
				}
				else {
					// 取第一个字符
					content = source[lastIndex];
					index = -1;
				}

				// 进行回调
				regexp = callback(content, index);
				// 计算 lastIndex
				this.lastIndex += content.length;
			}

			// 如果成立，说明已经没有未处理的代码
			if(this.lastIndex >= source.length){
				return;
			}
			
			// 进行回调
			callback(
				source.substring(this.lastIndex),
				-1
			);

			// 中断匹配
			this.break();
		},
		lastIndex: 0
	});

	return SyntaxRegExp;
}(
	RegExp,
	Infinity
);

}.call(
	this
);


// 标签数据相关
!function(){

this.TagData = function(){
	/**
	 * 标签数据
	 * @param {*} value - 标签数据
	 */
	function TagData(value){
		this.value = value;
	};
	TagData = new Rexjs(TagData);

	TagData.props({
		value: null
	});

	return TagData;
}();

}.call(
	this
);


// 标签数据子类相关
!function(TagData, parseInt){

this.TagClass = function(CLASS_NONE, CLASS_STATEMENT, CLASS_STATEMENT_BEGIN, CLASS_STATEMENT_END, CLASS_EXPRESSION, CLASS_EXPRESSION_CONTEXT){
	/**
	 * 标签性质定位的类别
	 * @param {Number} value - 标签类别
	 */
	function TagClass(value){
		TagData.call(this, value);

		this.expression = (value & CLASS_EXPRESSION) === CLASS_EXPRESSION;
		this.expressionContext = (value & CLASS_EXPRESSION_CONTEXT) === CLASS_EXPRESSION_CONTEXT;
		this.statement = (value & CLASS_STATEMENT) === CLASS_STATEMENT;
		this.statementBegin = (value & CLASS_STATEMENT_BEGIN) === CLASS_STATEMENT_BEGIN;
		this.statementEnd = (value & CLASS_STATEMENT_END) === CLASS_STATEMENT_END;
	};
	TagClass = new Rexjs(TagClass, TagData);

	TagClass.static({
		// 表达式标签类别
		CLASS_EXPRESSION: CLASS_EXPRESSION,
		// 表达式上下文标签类别
		CLASS_EXPRESSION_CONTEXT: CLASS_EXPRESSION_CONTEXT,
		// 无标签分类
		CLASS_NONE: CLASS_NONE,
		// 语句标签类别
		CLASS_STATEMENT: CLASS_STATEMENT,
		// 语句起始标签类别
		CLASS_STATEMENT_BEGIN: CLASS_STATEMENT_BEGIN,
		// 语句结束标签类别
		CLASS_STATEMENT_END: CLASS_STATEMENT_END
	});

	TagClass.props({
		expression: false,
		expressionContext: false,
		statement: false,
		statementBegin: false,
		statementEnd: false
	});

	return TagClass;
}(
	// CLASS_NONE
	parseInt(0, 2),
	// CLASS_STATEMENT
	parseInt(10, 2),
	// CLASS_STATEMENT_BEGIN
	parseInt(110, 2),
	// CLASS_STATEMENT_END
	parseInt(1010, 2),
	// CLASS_EXPRESSION
	parseInt(10110, 2),
	// CLASS_EXPRESSION_CONTEXT
	parseInt(100000, 2)
);

this.TagType = function(TYPE_NONE, TYPE_MATCHABLE, TYPE_UNEXPECTED, TYPE_MISTAKABLE, TYPE_ILLEGAL){
	/**
	 * 标签正则捕获类型
	 * @param {Number} value - 标签类型
	 */
	function TagType(value){
		TagData.call(this, value);

		this.illegal = (value & TYPE_ILLEGAL) === TYPE_ILLEGAL;
		this.matchable = (value & TYPE_MATCHABLE) === TYPE_MATCHABLE;
		this.mistakable = (value & TYPE_MISTAKABLE) === TYPE_MISTAKABLE;
		this.unexpected = (value & TYPE_UNEXPECTED) === TYPE_UNEXPECTED;
	};
	TagType = new Rexjs(TagType, TagData);

	TagType.static({
		// 非法标签类型
		TYPE_ILLEGAL: TYPE_ILLEGAL,
		// 无标签类型
		TYPE_NONE: TYPE_NONE,
		// 可匹配的标签类型
		TYPE_MATCHABLE: TYPE_MATCHABLE,
		// 可能会无解的标签类型
		TYPE_MISTAKABLE: TYPE_MISTAKABLE,
		// 未捕获的标签类型
		TYPE_UNEXPECTED: TYPE_UNEXPECTED
	});

	TagType.props({
		illegal: false,
		matchable: false,
		mistakable: false,
		unexpected: false
	});

	return TagType;
}(
	// TYPE_NONE
	parseInt(0, 2),
	// TYPE_MATCHABLE
	parseInt(10, 2),
	// TYPE_UNEXPECTED
	parseInt(100, 2),
	// TYPE_MISTAKABLE
	parseInt(1100, 2),
	// TYPE_ILLEGAL
	parseInt(10100, 2)
);

this.SyntaxTag = function(SyntaxElement, TagClass, TagType){
	/**
	 * 语法标签
	 * @param {Number} _type - 标签类型
	 */
	function SyntaxTag(_type){
		SyntaxElement.call(this);

		this.type = new TagType(_type || this.$type);
		this.class = new TagClass(this.$class);
	};
	SyntaxTag = new Rexjs(SyntaxTag, SyntaxElement);

	SyntaxTag.props({
		$class: TagClass.CLASS_NONE,
		$type: TagType.TYPE_MATCHABLE,
		/**
		 * 获取绑定的标签，该标签列表一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return null;
		},
		class: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(){
			return null;
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(){
			return null;
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatements: function(){
			return null;
		},
		order: 0,
		regexp: null,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 之前标签所需匹配的标签列表
		 */
		require: function(tagsMap, currentTags){
			return currentTags;
		},
		throw: "token",
		type: null,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(){}
	});

	return SyntaxTag;
}(
	this.SyntaxElement,
	this.TagClass,
	this.TagType
);

}.call(
	this,
	this.TagData,
	parseInt
);


// 子类标签相关
!function(SyntaxTag){

this.FilePositionTag = function(CLASS_STATEMENT_BEGIN){
	/**
	 * 文件位置标签
	 * @param {Number} _type - 标签类型
	 */
	function FilePositionTag(_type){
		SyntaxTag.call(this, _type);
	};
	FilePositionTag = new Rexjs(FilePositionTag, SyntaxTag);

	FilePositionTag.props({
		$class: CLASS_STATEMENT_BEGIN
	});
	
	return FilePositionTag;
}(
	this.TagClass.CLASS_STATEMENT_BEGIN
);

this.IllegalTag = function(TYPE_ILLEGAL){
	/**
	 * 非法的标签，一般指定的是两次匹配字符串之间的非法内容
	 */
	function IllegalTag(){
		SyntaxTag.call(this);
	};
	IllegalTag = new Rexjs(IllegalTag, SyntaxTag);
	
	IllegalTag.props({
		$type: TYPE_ILLEGAL,
		throw: "token ILLEGAL"
	});
	
	return IllegalTag;
}(
	this.TagType.TYPE_ILLEGAL
);

this.WhitespaceTag = function(){
	/**
	 * 空白字符标签
	 */
	function WhitespaceTag(){
		SyntaxTag.call(this);
	};
	WhitespaceTag = new Rexjs(WhitespaceTag, SyntaxTag);
	
	WhitespaceTag.props({
		regexp: /[^\S\r\n\u2028\u2029]+/
	});
	
	return WhitespaceTag;
}();

this.LineTerminatorTag = function(WhitespaceTag){
	/**
	 * 行结束符标签
	 */
	function LineTerminatorTag(){
		WhitespaceTag.call(this);
	};
	LineTerminatorTag = new Rexjs(LineTerminatorTag, WhitespaceTag);
	
	LineTerminatorTag.static({
		CARRIAGE_RETURN: "\r",
		LINE_SEPARATOR: "\u2028",
		LINEFEED: "\n",
		PARAGRAPH_SEPARATOR: "\u2029"
	});

	LineTerminatorTag.props({
		regexp: /\r\n?|\n|\u2028|\u2029/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser){
			var position = parser.position;
			
			position.line += 1;
			position.column = 0;
		}
	});
	
	return LineTerminatorTag;
}(
	this.WhitespaceTag
);

}.call(
	this,
	this.SyntaxTag
);


// 标签列表相关
!function(SyntaxTag, RegExp){

this.SyntaxTags = function(List, getSortedValue, distinct){
	/**
	 * 语法标签列表
	 */
	function SyntaxTags(){
		List.call(this);
	};
	SyntaxTags = new Rexjs(SyntaxTags, List);

	SyntaxTags.props({
		/**
		 * 将一系列标签类托管给当前标签列表来实例化，并进行注册
		 * @param {Array} list - 一系列标签类
		 * @param {Number} _type - 所有标签初始化的标签类型
		 */
		delegate: function(list, _type){
			// 注册标签
			this.register.apply(
				this,
				// 映射标签
				list.map(function(SyntaxTag){
					// 实例化标签
					return new SyntaxTag(_type);
				})
			);
		},
		entrance: false,
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			return false;
		},
		/**
		 * 将所有标签准备就绪，即排序和初始化正则表达式，ps：这是个耗性能的方法
		 */
		ready: function(){
			var copy = this.slice(0);

			// 对标签进行排序
			this.sort(function(tag1, tag2){
				return (
					getSortedValue(copy, tag1, tag2, "matchable", true) ||
					getSortedValue(copy, tag1, tag2, "mistakable", true) ||
					getSortedValue(copy, tag1, tag2, "illegal", false) ||
					getSortedValue(copy, tag1, tag2, "unexpected", false, true)
				);
			});
			
			// 初始化正则表达式
			this.regexp = new RegExp(
				// 去重并获取 source
				distinct(this),
				// 必须为全局匹配，否则正则的 lastIndex 无效
				"g"
			);
		},
		regexp: /[^\S\s]/g,
		/**
		 * 注册添加语法标签，与 push 方法不同的是，register 会进过滤器，而 push 不会
		 * @param {SyntaxTag, SyntaxTags} _rest - 需要添加的 语法标签 或 语法标签列表
		 */
		register: function(_rest){
			forEach(
				arguments,
				function(obj){
					// 如果对象也是一个标签列表
					if(obj instanceof SyntaxTags){
						// 再次调用注册方法
						this.register.apply(this, obj);
						return;
					}

					// 检查是否应该过滤该标签
					if(this.filter(obj)){
						return;
					}
					
					// 添加标签
					this.push(obj);
				},
				this,
				true
			);
		}
	});

	return SyntaxTags;
}(
	Rexjs.List,
	// getSortedValue
	function(copy, tag1, tag2, property, value, _bothNot){
		var type1 = tag1.type, type2 = tag2.type;

		switch(value){
			// 如果第一个类型属性值为 value
			case type1[property]:
				// 如果第二个类型属性值不为 value
				if(type2[property] !== value){
					// 将第一个标签插入到第二个标签前面
					return -1;
				}

				// 两个类型属性值都是 value
				break;

			// 如果第二个类型属性值为 value，而第一个类型属性值不为 value
			case type2[property]:
				// 将第二个标签插入到第一个标签前面
				return 1;

			// 两个类型属性值都不为 value
			default:
				// 如果在都不为 value 的情况下，还需要继续对比
				if(_bothNot){
					break;
				}

				// 进行下一个属性的比较
				return 0;
		}

		// 如果 tag1 的排序更大
		if(tag1.order - tag2.order > 0){
			// 将 tag1 插入到 tag2 前面
			return -1;
		}
		
		// 如果 tag2 的排序更大
		if(tag1.order - tag2.order < 0){
			// 将 tag2 插入到 tag1 前面
			return 1;
		}
		
		// 默认，即，order 相同，则不改变排序。ps：在某些浏览器的 sort 中，不能使用 0，0 会使 tag1 排到 tag2 前面
		return copy.indexOf(tag1) - copy.indexOf(tag2);
	},
	// distinct
	function(tags){
		var sources = [];
		
		tags.splice(
				0
			)
			.forEach(
				function(tag){
					var regexp = tag.regexp;
					
					// 如果没有提供正则，则说明不需要匹配，作为未捕获的标签
					if(regexp === null){
						tags[-1] = tag;
						return;
					}
					
					var source = regexp.source;
					
					// 如果已经存在
					if(this(source)){
						return;
					}
					
					// 添加正则源字符串
					sources.push(
						"(?:" + source + ")()"
					);
					
					// 添加标签
					tags.push(tag);
				},
				function(source){
					// 检测是否有重复标签
					return !tags.every(function(tag){
						return tag.regexp.source !== source;
					});
				}
			);
			
		return sources.join("|")
	}
);

this.DefaultTags = function(SyntaxTags, WhitespaceTag, LineTerminatorTag, IllegalTag){
	/**
	 * 默认标签列表
	 */
	function DefaultTags(){
		SyntaxTags.call(this);
		
		this.register(
			new WhitespaceTag(),
			new LineTerminatorTag(),
			new IllegalTag()
		);
	};
	DefaultTags = new Rexjs(DefaultTags, SyntaxTags);
	
	return DefaultTags;
}(
	this.SyntaxTags,
	this.WhitespaceTag,
	this.LineTerminatorTag,
	this.IllegalTag
);

this.SyntaxTagsMap = function(){
	/**
	 * 语法标签列表映射，供解析时在不同需求下获取不同的语法标签集合
	 */
	function SyntaxTagsMap(){};
	SyntaxTagsMap = new Rexjs(SyntaxTagsMap);
	
	SyntaxTagsMap.props({
		/**
		 * 映射标签列表
		 * @param {String} name - 标签唯一名称
		 * @param {SyntaxTags} tags - 需要映射的标签列表
		 */
		map: function(name, tags){
			// 标签列表就绪
			tags.ready();
			
			// 如果是入口标签列表
			if(tags.entrance){
				// 设置入口标签
				this.entranceTags = tags;
			}
			
			// 根据 name 设置标签列表
			this[name] = tags;
		}
	});
	
	return SyntaxTagsMap;
}();

}.call(
	this,
	this.SyntaxTag,
	RegExp
);


// 语法解析相关
!function(SyntaxElement, SyntaxTag, SyntaxConfig){

this.Expression = function(parseInt){
	/**
	 * 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function Expression(context){
		SyntaxElement.call(this);
		
		this.context = context;
	};
	Expression = new Rexjs(Expression, SyntaxElement);
	
	Expression.static({
		// 无状态
		STATE_NONE: parseInt(0, 2),
		// 表达式结束状态
		STATE_EXPRESSION_END: parseInt(10, 2),
		// 语句可结束状态
		STATE_STATEMENT_ENDABLE: parseInt(110, 2),
		// 语句结束状态，当开始编译，进行语句连接时，应该在两语句之间加语句连接符，如分号等
		STATE_STATEMENT_END: parseInt(1110, 2),
		// 语句已结束状态，当开始编译，进行语句连接时，不需要再加语句连接符，如分号等
		STATE_STATEMENT_ENDED: parseInt(11110, 2)
	});
	
	Expression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, _anotherBuilder){
			this.extractTo(contentBuilder, _anotherBuilder);
		},
		context: null,
		/**
		 * 获取是否为默认表达式
		 */
		get default(){
			return false;
		},
		/**
		 * 获取是否为空表达式
		 */
		get empty(){
			return false;
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			contentBuilder.appendContext(this.context);
		},
		state: Expression.STATE_NONE
	});
	
	return Expression;
}(
	parseInt
);

this.Statement = function(){
	/**
	 * 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function Statement(statements){
		SyntaxElement.call(this);
		
		this.target = statements.statement;
		this.statements = statements;
	};
	Statement = new Rexjs(Statement, SyntaxElement);

	Statement.static({
		// 文档流主流
		FLOW_MAIN: parseInt(10, 2),
		// 文档流分支流
		FLOW_BRANCH: parseInt(100, 2),
		// 文档流线性分支流
		FLOW_LINEAR: parseInt(1100, 2),
		// 文档流循环分支流
		FLOW_CIRCULAR: parseInt(10100, 2)
	});
	
	Statement.props({
		/**
		 * 获取该语句 try、catch 方法所需返回的默认绑定标签
		 */
		bindingOf: function(){
			return this.tagOf().binding;
		},
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return null;
		},
		expression: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取表达式内容
			this.expression.extractTo(contentBuilder);
		},
		flow: Statement.FLOW_MAIN,
		/**
		 * 跳出该语句
		 */
		out: function(){
			var target = this.target, expression = target.expression;

			// 记录当前表达式的状态，这里不能用 "|="，因为该状态是覆盖操作
			expression.state = this.expression.state;
			// 恢复语句
			this.statements.statement = target;

			// 返回目标语句的表达式
			return expression;
		},
		statements: null,
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.context.tag;
		},
		target: null,
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			return null;
		}
	});
	
	return Statement;
}();

this.Statements = function(Statement, STATE_STATEMENT_ENDED, parseInt){
	/**
	 * 语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function Statements(target){
		SyntaxElement.call(this);
		
		// 记录目标语句块
		this.target = target;

		// 初始化语句
		this.newStatement();
	};
	Statements = new Rexjs(Statements, SyntaxElement);

	Statements.static({
		// 全局作用域
		SCOPE_GLOBAL: parseInt(10, 2),
		// 块级作用域
		SCOPE_BLOCK: parseInt(100, 2),
		// 闭包作用域
		SCOPE_CLOSURE: parseInt(1000, 2),
		// 惰性闭包作用域，一般用于特殊的闭包处理使用
		SCOPE_LAZY: parseInt(11000, 2)
	});
	
	Statements.props({
		/**
		 * 清空语句块
		 */
		clear: function(){
			// 清空当前语句
			this.statement = null;
			
			// 清空列表
			this.splice(0);
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var join = this.join;

			// 遍历所有语句
			for(var i = this.min, j = this.length;i < j;i++){
				var statement = this[i];

				// 提取语句
				statement.extractTo(contentBuilder);

				// 如果表达式状态是 STATE_STATEMENT_ENDED，则说明不需要加语句连接符
				if((statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED){
					continue;
				}
				
				// 追加语句连接符
				contentBuilder.appendString(join);
			}
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new Statement(this);
		},
		join: ";",
		length: 0,
		min: 0,
		/**
		 * 创建新语句
		 */
		newStatement: function(){
			// 先清空当前语句
			this.statement = null;
			return this.statement = this[this.length++] = this.initStatement();
		},
		reference: "this",
		scope: Statements.SCOPE_GLOBAL,
		splice: Array.prototype.splice,
		statement: null,
		target: null
	});
	
	return Statements;
}(
	this.Statement,
	this.Expression.STATE_STATEMENT_ENDED,
	parseInt
);

}.call(
	this,
	this.SyntaxElement,
	this.SyntaxTag,
	this.SyntaxConfig
);


// 其他表达式
!function(Expression){

this.CompiledExpression = function(){
	/**
	 * 已编译的表达式，一般用于将已编译过的文本作为表达式的形式委托出去使用
	 * @param {String} value - 已编译过的代码字符串
	 */
	function CompiledExpression(value){
		Expression.call(this, null);

		this.value = value;
	};
	CompiledExpression = new Rexjs(CompiledExpression, Expression);
	
	CompiledExpression.props({
		/**
		 * 提取文本内容，空函数，不做任何处理
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			contentBuilder.appendString(this.value);
		},
		value: ""
	});
	
	return CompiledExpression;
}();

this.EmptyExpression = function(){
	/**
	 * 空表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function EmptyExpression(context){
		Expression.call(this, context);
	};
	EmptyExpression = new Rexjs(EmptyExpression, Expression);
	
	EmptyExpression.props({
		/**
		 * 获取是否为空表达式
		 */
		get empty(){
			return true;
		},
		/**
		 * 提取文本内容，空函数，不做任何处理
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(){}
	});
	
	return EmptyExpression;
}();

this.DefaultExpression = function(EmptyExpression, STATE_NONE){
	/**
	 * 默认空表达式，一般用于语句的默认表达式
	 */
	function DefaultExpression(){
		EmptyExpression.call(this, null);
	};
	DefaultExpression = new Rexjs(DefaultExpression, EmptyExpression);

	DefaultExpression.props({
		/**
		 * 获取是否为默认表达式
		 */
		get default(){
			return true;
		},
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_NONE;
		},
		/**
		 * 设置表达式状态
		 * @param {Number} value - 表达式状态
		 */
		set state(value){}
	});

	return DefaultExpression;
}(
	this.EmptyExpression,
	this.EmptyExpression.STATE_NONE
);

this.ListExpression = function(extractItem){
	/**
	 * 列表表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {String} join - 表达式连接符
	 */
	function ListExpression(context, join){
		Expression.call(this, context);

		this.join = join;
	};
	ListExpression = new Rexjs(ListExpression, Expression);
	
	ListExpression.props({
		/**
		 * 添加表达式
		 * @param {Expression} expression - 需要添加的表达式
		 */
		add: function(expression){
			this[this.length++] = this.latest = expression;
		},
		/**
		 * 执行连接所有表达式
		 * @param {Function} callback - 回调函数
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		execJoin: function(callback, contentBuilder, _anotherBuilder){
			var min = this.min, length = this.length;

			// 如果长度小于等于最小索引值
			if(length <= min){
				return;
			}

			var join = this.join;

			// 回调第一项
			callback(this[min], contentBuilder, _anotherBuilder);

			// 遍历项
			for(var i = min + 1, j = length;i < j;i++){
				// 添加表达式连接符
				contentBuilder.appendString(join);

				// 回调第 i 项
				callback(this[i], contentBuilder, _anotherBuilder);
			}
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, _anotherBuilder){
			// 执行连接所有表达式
			this.execJoin(extractItem, contentBuilder, _anotherBuilder);
		},
		/**
		 * 遍历每一个有效项
		 * @param {Function} callback - 回调函数
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		forEach: function(callback, _contentBuilder, _anotherBuilder){
			for(var i = this.min, j = this.length;i < j;i++){
				// 执行回调
				callback(this[i], _contentBuilder, _anotherBuilder, i);
			}
		},
		join: "",
		latest: null,
		length: 0,
		min: 0,
		/**
		 * 设置表达式，与 add 不同，当 expession 为默认表达式时，会忽略该操作
		 * @param {Expression} expression - 需要添加的表达式
		 */
		set: function(expression){
			// 如果是默认表达式
			if(expression.default){
				return false;
			}

			// 添加表达式
			this.add(expression);
			return true;
		}
	});
	
	return ListExpression;
}(
	// extractItem
	function(item, contentBuilder, _anotherBuilder){
		item.extractTo(contentBuilder, _anotherBuilder);
	}
);

this.LeftHandSideExpression = function(){
	/**
	 * 左侧表达式
	 * @param {Expression} left - 左侧表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LeftHandSideExpression(left, context){
		Expression.call(this, context);

		this.left = left;
	};
	LeftHandSideExpression = new Rexjs(LeftHandSideExpression, Expression);

	LeftHandSideExpression.props({
		left: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取左侧的表达式内容
			this.left.extractTo(contentBuilder);
			// 添加上下文内容
			contentBuilder.appendContext(this.context);
		}
	});

	return LeftHandSideExpression;
}();

this.PartnerExpression = function(){
	/**
	 * 匹配组表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function PartnerExpression(open){
		Expression.call(this, open);
		
		this.open = open;
	};
	PartnerExpression = new Rexjs(PartnerExpression, Expression);
	
	PartnerExpression.props({
		close: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, _anotherBuilder){
			// 追加起始标签内容
			contentBuilder.appendContext(this.open);
			// 追加中间内容
			this.inner.extractTo(contentBuilder, _anotherBuilder);
			// 追加结束标签内容
			contentBuilder.appendContext(this.close);
		},
		inner: null,
		open: null
	});
	
	return PartnerExpression;
}();

this.FilePositionExpression = function(EmptyExpression){
	/**
	 * 文件位置表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FilePositionExpression(context){
		EmptyExpression.call(this, context);
	};
	FilePositionExpression = new Rexjs(FilePositionExpression, EmptyExpression);
	
	FilePositionExpression.props({
		state: EmptyExpression.STATE_STATEMENT_ENDED
	});
	
	return FilePositionExpression;
}(
	this.EmptyExpression
);

this.FileStartExpression = function(FilePositionExpression){
	/**
	 * 文件起始表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FileStartExpression(context){
		FilePositionExpression.call(this, context);
	};
	FileStartExpression = new Rexjs(FileStartExpression, FilePositionExpression);
	
	return FileStartExpression;
}(
	this.FilePositionExpression
);

this.FileEndExpression = function(FilePositionExpression){
	/**
	 * 文件结束表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FileEndExpression(context){
		FilePositionExpression.call(this, context);
	};
	FileEndExpression = new Rexjs(FileEndExpression, FilePositionExpression);
	
	return FileEndExpression;
}(
	this.FilePositionExpression
);

}.call(
	this,
	this.Expression
);


// 语法解析相关
!function(Expression, ListExpression, LeftHandSideExpression, STATE_STATEMENT_ENDABLE){

this.SyntaxError = function(MappingBuilder, e, contextOf){
	/**
	 * 抛出语法错误信息
	 * @param {File} file - 具有语法错误的文件
	 * @param {Context, Expression} info - 出错信息
	 * @param {String} _description - 错误描述
	 * @param {Boolean} _reference - 是否是引用错误
	 */
	function SyntaxError(file, info, _description, _reference){
		var context = contextOf(info), content = context.content, position = context.position;

		// 如果支持 MappingBuilder
		if(MappingBuilder.supported){
			// 生成源文件 map
			e(
				new MappingBuilder(file).complete()
			);
		}

		// 如果是引用错误
		if(_reference){
			this.reference = true;
		}

		this.description = _description || "Unexpected " + context.tag.throw + (content ? " " + content : "");
		this.file = file;
		this.context = context;
	};
	SyntaxError = new Rexjs(SyntaxError);
	
	SyntaxError.props({
		context: null,
		description: "",
		/**
		 * 获悉错误消息
		 */
		get message(){
			var position = this.context.position;

			return (this.reference ? "Reference" : "Syntax") + "Error: " + this.description + " @ " + this.file.url.href + ":" + (position.line + 1) + ":" + (position.column + 1);
		},
		file: null,
		reference: false,
		/**
		 * 转字符串
		 */
		toString: function(){
			return this.message;
		}
	});

	return SyntaxError;
}(
	this.MappingBuilder,
	// e
	eval,
	// contextOf
	function(info){
		// 如果不是表达式
		if(!(info instanceof Expression)){
			// 认为是 context，直接返回
			return info;
		}

		var expression = info;

		for(;;){
			// 如果是列表表达式
			if(info instanceof ListExpression){
				// 如果长度为 0
				if(info.length > 0){
					// 记录表达式
					expression = info;
					// 取第一项
					info = info[0];
					continue;
				}
			}
			// 如果是左侧表达式
			else if(info instanceof LeftHandSideExpression){
				// 记录表达式
				expression = info;
				// 获取 left
				info = info.left
				continue;
			}

			break;
		}

		return expression.context;
	}
);

this.SyntaxParser = function(SyntaxRegExp, SyntaxError, Position, Context, ContentBuilder, toTryCatch){
	/**
	 * 语法解析器
	 */
	function SyntaxParser(){
		this.regexp = new SyntaxRegExp();
	};
	SyntaxParser = new Rexjs(SyntaxParser);
	
	SyntaxParser.props({
		/**
		 * 将解析后的语法生成字符串，并返回
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 */
		build: function(_contentBuilder){
			var contentBuilder = _contentBuilder || new ContentBuilder();
			
			this.statements.extractTo(contentBuilder);
			return contentBuilder.complete();
		},
		details: null,
		/**
		 * 抛出错误
		 * @param {Context, Expression} info - 出错信息
		 * @param {String} _description - 错误描述
		 * @param {Boolean} _reference - 是否是引用错误
		 */
		error: function(info, _description, _reference){
			var error = new SyntaxError(this.file, info, _description, _reference);

			// 中断匹配，结束解析
			this.regexp.break();

			// 记录错误详情
			this.details = error;
			// 报错
			throw error.message;
		},
		file: null,
		/**
		 * 开始解析语法文件
		 * @param {File} file - 文件信息
		 * @param {SyntaxTagsMap} tagsMap - 标签列表映射
		 * @param {Statements} statements - 初始化的语句块
		 */
		parse: function(file, tagsMap, statements){
			var parser = this, tags = tagsMap.entranceTags, position = this.position = new Position(0, 0);

			// 设置 tagsMap
			this.tagsMap = tagsMap;
			// 记录文件
			this.file = file;
			// 清空错误信息
			this.details = null;
			// 初始化语句块
			this.statements = statements;
			
			// 执行正则
			this.regexp.exec(
				tags.regexp,
				file.source,
				function(content, tagIndex){
					var context, tag = tags[tagIndex];

					// 初始化 context
					context = new Context(
						tag,
						content,
						new Position(
							position.line,
							position.column
						)
					);
					
					// 增加列数
					position.column += content.length;
					
					// 如果标签异常，即不应该被捕获
					if(tag.type.unexpected){
						// 进入异常捕获处理
						context.tag = tag = toTryCatch(parser, context, tag, parser.statements);
					}

					// 获取语句块，以防在 toTryCatch 中被修改过
					statements = parser.statements;
					
					// 访问标签
					tag.visitor(parser, context, statements.statement, statements);

					// 获取下一步需要匹配的标签列表
					tags = tag.require(tagsMap, tags, parser);
					// 返回下一步需要匹配的正则
					return tags.regexp;
				}
			);
		},
		position: null,
		regexp: null,
		statements: null,
		tagsMap: null
	});
	
	return SyntaxParser;
}(
	this.SyntaxRegExp,
	this.SyntaxError,
	this.Position,
	this.Context,
	this.ContentBuilder,
	// toTryCatch
	function(parser, context, tag, statements){
		var statement = statements.statement;

		// 如果表达式存在
		outerBlock:
		if(statement.expression){
			var tagClass = tag.class, tagType = tag.type, mistakable = tagType.mistakable;

			// 如果标签是可能被误解的而且是语句标签 或 标签是合法的非误解标签
			if(mistakable ? tagClass.statement : !tagType.illegal){
				for(;;){
					// 获取 catch 所返回的标签
					var t = statement.catch(parser, context);

					// 如果标签存在
					if(t){
						// 返回该标签
						return t;
					}

					// 获取当前语句
					var s = (statements = parser.statements).statement;

					// 如果等于当前语句
					if(statement === s){
						// 获取 target
						s = statement.target;

						// 如果 target 存在
						if(s){
							// 跳出当前语句
							statement.out();
						}
						// 如果 target 不存在
						else {
							// 中断循环
							break;
						}
					}

					// 记录当前语句
					statement = s;
				}

				// 如果是被误解的
				if(mistakable){
					// 如果是语句结束标签
					if(tagClass.statementEnd){
						// 返回标签
						return tag;
					}

					// 如果表达式可以结束
					if((statements.statement.expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE){
						// 创建新语句
						statements.newStatement();
						// 返回标签
						return tag;
					}
				}

				// 跳出外层语句块
				break outerBlock;
			}

			// 如果是可误解的，且不是语句标签（上面的判断保证了一定不是语句标签）
			if(mistakable){
				// 如果语句存在
				while(statement){
					// 获取 try 所返回的标签
					var t = statement.try(parser, context);

					// 如果标签存在
					if(t){
						// 返回该标签
						return t;
					}

					// 获取当前语句
					var s = parser.statements.statement;

					// 如果等于当前语句，说明没有跳出语句
					if(statement === s){
						// 中断循环
						break;
					}

					// 记录语句
					statement = s;
				}

				// 返回标签
				return tag;
			}
		}

		// 报错
		parser.error(context);
		return null;
	}
);

}.call(
	this,
	this.Expression,
	this.ListExpression,
	this.LeftHandSideExpression,
	this.Expression.STATE_STATEMENT_ENDABLE
);

Rexjs.static(this);
}(
	Rexjs,
	Rexjs.forEach
);
new function(
	Rexjs,
	// 内容提取相关
	ContentBuilder,
	// 表达式相关
	Expression, ListExpression, EmptyExpression, DefaultExpression, PartnerExpression, LeftHandSideExpression,
	// ECMAScript 相关
	ECMAScriptStatement, BoxStatement, ECMAScriptErrors, ECMAScriptOrders,
	// 标签相关类
	SyntaxTag, TagType,
	// 标签分类相关
	CLASS_STATEMENT_BEGIN, CLASS_STATEMENT_END, CLASS_EXPRESSION, CLASS_EXPRESSION_CONTEXT,
	// 标签类型相关
	TYPE_MATCHABLE, TYPE_UNEXPECTED, TYPE_MISTAKABLE, TYPE_ILLEGAL,
	// 表达式状态相关
	STATE_STATEMENT_ENDABLE, STATE_STATEMENT_END, STATE_STATEMENT_ENDED,
	// 其他常量
	IDENTIFIER_REGEXP_SOURCE,
	// 其他非方法变量
	config,
	// 其他方法变量
	commonVisitor
){
"use strict";


//ECMAScript 辅助类
!function(){

this.ECMAScriptErrors = ECMAScriptErrors = function(REGEXP){
	/**
	 * 错误信息
	 */
	function ECMAScriptErrors(){};
	ECMAScriptErrors = new Rexjs(ECMAScriptErrors);

	ECMAScriptErrors.static({
		ASSIGNMENT: "Invalid left-hand side in assignment",
		CALL: "Missing ) after argument list",
		CONST: "Assignment to constant variable",
		CONSTRUCTOR: "Class constructor may not be ${1}",
		DEFAULT_CLAUSE: "More than one default clause in switch statement",
		DUPLICATE_PARAMETER_NAME: "Duplicate parameter name not allowed in this context",
		EXPORT_DEFAULT: "Default member has already been exported",
		FOR: "Invalid left-hand side in for-loop",
		FOR_IN: "Invalid left-hand side in for-in loop: Must have a single binding",
		GETTER: "Getter must not have any formal parameters",
		ILLEGAL_STATEMENT: "Illegal ${1} statement",
		KEYWORD: '"${1}" keyword unexpected here',
		LABEL: 'Undefined ${1} label "${2}"',
		MISSING_INITIALIZER: "Missing initializer in const declaration",
		NEWLINE: "Illegal newline",
		NEWLINE_AFTER_THROW: "Illegal newline after throw",
		NEWLINE_BEFORE_ARROW: "Illegal newline before arrow",
		PREFIX_OPERATION: "Invalid left-hand side expression in prefix operation",
		POSTFIX_OPERATION: "Invalid left-hand side expression in postfix operation",
		REDECLARATION: 'Identifier "${1}" has already been declared',
		REGEXP_FLAGS: "Invalid regular expression flags",
		REST_ELEMENT: "Rest element must be last element",
		REST_PARAMETER: "Rest parameter must be last formal parameter",
		SETTER: "Setter must have exactly one formal parameter",
		SUPER_CALL: "Super call may not in class constructor",
		SUPER_CALL_UNEXTEND: "No any super to call",
		SUPER_RECALL: "Super may be called in this class constructor",
		TARGET: "new.target expression is not allowed here",
		TEMPLATE: "Unterminated template literal",
		TRY: "Missing catch or finally after try",
		WITH: "The code may not include a with statement",
		WITHOUT_SUPER_CALL: "Missing super call in this class constructor",
		/**
		 * 将错误信息模板里的参数进行替换，并返回结果
		 * @param {String} type - 错误信息类型
		 * @param {String} _args - 需要替换的参数
		 */
		template: function(type){
			var args = arguments;

			return this[type].replace(
				REGEXP,
				function(result, index){
					return args[index];
				}
			);
		}
	});

	return ECMAScriptErrors;
}(
	// REGEXP
	/\$\{(\d+)\}/g
);

this.ECMAScriptOrders = ECMAScriptOrders = function(){
	/**
	 * 标签优先级顺序
	 */
	function ECMAScriptOrders(){};
	ECMAScriptOrders = new Rexjs(ECMAScriptOrders);

	ECMAScriptOrders.static({
		OPEN_ARROW_FUNCTION_BODY: 100,
		OPEN_BRACKET_ACCESSOR: 100,
		OPEN_CALL: 100,
		SPECIAL_LINE_TERMINATOR: 100,
		STATEMENT_END: 100,
		DOT_ACCESSOR: 101,
		EXPRESSION_BREAK: 101,
		MATHEMATICAL_NUMBER: 101,
		OPEN_SUPER_METHOD_CALL: 101,
		SPREAD: 101,
		BINARY: 200,
		NEGATION_SIBLING: 200,
		PLUS_SIBLING: 200,
		ARROW: 201,
		GREATER_THAN_OR_EQUAL: 201,
		LEFT_SHIFT: 201,
		LESS_THAN_OR_EQUAL: 201,
		LOGICAL_AND: 201,
		LOGICAL_OR: 201,
		RIGHT_SHIFT: 201,
		SUPER_PROPERTY_ASSIGNMENT: 201,
		EQUALITY: 202,
		EXPONENTIATION: 202,
		UNARY_ASSIGNMENT: 202,
		INEQUALITY: 202,
		UNSIGNED_RIGHT_SHIFT: 202,
		IDENTITY: 203,
		NONIDENTITY: 203,
		DESTRUCTURING_ASSIGNMENT: 203,
		POSTFIX_UNARY_ASSIGNMENT: 203,
		SHORTHAND_ASSIGNMENT: 203,
		ILLEGAL_SHORTHAND_ASSIGNMENT: 204,
		SUPER_PROPERTY_SHORTHAND_ASSIGNMENT: 204,
		SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT: 204,
		IDENTIFIER: 300,
		TARGET: 301,
		VARIABLE: 301,
		KEYWORD_PROPERTY_NAME: 301,
		FUNCTION_VARIABLE: 302,
		IDENTIFIER_PROPERTY_NAME: 302,
		WORD_PROPERTY_NAME: 303,
		STATIC_MODIFIER: 304,
		COMMENT: 400,
		OPEN_RESTRICTED_COMMENT: 401,
		COMMENT_CONTENT: 402,
		ILLEGAL_LINE_TERMINATOR: 403,
		TEMPLATE_CONTENT: 500,
		TEMPLATE_PARAMETER: 501,
		TEMPLATE_SPECIAL_CONTENT: 501,
		FILE_START: 600
	});

	return ECMAScriptOrders;
}();

}.call(
	this
);


// 公用的表达式
!function(){

this.AssignableExpression = function(){
	/**
	 * 可赋值的表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function AssignableExpression(context){
		Expression.call(this, context);
	};
	AssignableExpression = new Rexjs(AssignableExpression, Expression);

	return AssignableExpression;
}();

this.GenerableExpression = function(){
	/**
	 * 可生成的表达式，即在生成器内部，随着生成器需要一起编译的表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function GenerableExpression(context, statements){
		Expression.call(this, context);

		this.contextGeneratorIfNeedCompile = statements.contextGeneratorIfNeedCompile;
	};
	GenerableExpression = new Rexjs(GenerableExpression, Expression);

	GenerableExpression.props({
		contextGeneratorIfNeedCompile: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果存在需要编译的生成器
			if(this.contextGeneratorIfNeedCompile){
				// 以生成器形式的提取表达式文本内容
				this.generateTo(contentBuilder);
				return;
			}

			// 以常规形式的提取表达式文本内容
			this.normalizeTo(contentBuilder);
		},
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(){},
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(){}
	});

	return GenerableExpression;
}();

this.ConditionalExpression = function(GenerableExpression, DEFAULT_INDEX, generateBody){
	/**
	 * 带条件的表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function ConditionalExpression(context, statements){
		GenerableExpression.call(this, context, statements);
	};
	ConditionalExpression = new Rexjs(ConditionalExpression, GenerableExpression);

	ConditionalExpression.props({
		adapterIndex: DEFAULT_INDEX,
		branchFlowIndex: DEFAULT_INDEX,
		condition: null,
		conditionIndex: DEFAULT_INDEX,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var generator = this.contextGeneratorIfNeedCompile;

			// 如果存在需要编译的生成器
			if(generator){
				this.conditionIndex = this.branchFlowIndex = generator.nextIndex();
				this.positiveIndex = this.adapterIndex = generator.nextIndex();
				this.negativeIndex = this.mainFlowIndex = generator.nextIndex();

				// 以生成器形式的提取表达式文本内容
				this.generateTo(contentBuilder);
				return;
			}

			// 以常规形式的提取表达式文本内容
			this.normalizeTo(contentBuilder);
		},
		/**
		 * 以生成器形式去编译（后置）主体代码
		 * @param {Expression} body - 主体表达式
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateBodyTo: function(body, contentBuilder){
			// 以生成器形式去编译主体代码
			generateBody(this, body, contentBuilder);

			// 追加索引设置以及 case 表达式字符串
			contentBuilder.appendString(
				this.contextGeneratorIfNeedCompile.currentIndexString + "=" + this.branchFlowIndex + ";break;case " + this.mainFlowIndex + ":"
			);
		},
		/**
		 * 以生成器形式去编译条件代码
		 * @param {Expression} condition - 条件表达式
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateConditionTo: function(condition, contentBuilder){
			var currentIndexString = this.contextGeneratorIfNeedCompile.currentIndexString, conditionIndex = this.conditionIndex;

			// 追加设置条件索引字符串与 case 表达式
			contentBuilder.appendString(
				currentIndexString + "=" + conditionIndex + ";break;case " + conditionIndex + ":" + currentIndexString + "="
			);

			// 提取条件表达式
			condition.extractTo(contentBuilder);

			// 追加条件的三元判断字符串
			contentBuilder.appendString(
				"?" + this.positiveIndex + ":" + this.negativeIndex + ";break;case " + this.adapterIndex + ":"
			);
		},
		/**
		 * 以生成器形式去编译前置主体代码（do while 就是前置主体形式的表达式）
		 * @param {Expression} body - 主体表达式
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generatePrefixBodyTo: function(body, contentBuilder){
			var positiveIndex = this.positiveIndex;

			// 追加索引设置以及 case 表达式字符串
			contentBuilder.appendString(
				this.contextGeneratorIfNeedCompile.currentIndexString + "=" + positiveIndex + ";break;case " + positiveIndex + ":"
			);

			// 以生成器形式去编译主体代码
			generateBody(this, body, contentBuilder);
		},
		negativeIndex: DEFAULT_INDEX,
		mainFlowIndex: DEFAULT_INDEX,
		positiveIndex: DEFAULT_INDEX
	});

	return ConditionalExpression;
}(
	this.GenerableExpression,
	// DEFAULT_INDEX
	-1,
	// generateBody
	function(expression, body, contentBuilder){
		// 提取主体内容
		body.extractTo(contentBuilder);

		// 判断主体表达式是否需要加分号
		if((body.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
			// 追加分号
			contentBuilder.appendString(";");
		}

		// 设置表达式状态为已结束
		expression.state = STATE_STATEMENT_ENDED;
	}
);

}.call(
	this
);


// 语句相关
!function(){

this.ECMAScriptStatement = ECMAScriptStatement = function(Statement){
	/**
	 * ECMAScript 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ECMAScriptStatement(statements){
		Statement.call(this, statements);
	};
	ECMAScriptStatement = new Rexjs(ECMAScriptStatement, Statement);

	return ECMAScriptStatement;
}(
	Rexjs.Statement
);

this.BoxStatement = BoxStatement = function(){
	/**
	 * 盒子语句，一般用于重写时，“过渡” 或 “连接” 父子语句，使其 “达到” 或 “模拟” 之前重写前的效果
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BoxStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BoxStatement = new Rexjs(BoxStatement, ECMAScriptStatement);

	BoxStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 返回 try 方法调用结果
			return this.try(parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 跳出语句
			this.out();
			return null;
		}
	});

	return BoxStatement;
}();

this.ConditionStatement = function(){
	/**
	 * 条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ConditionStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ConditionStatement = new Rexjs(ConditionStatement, ECMAScriptStatement);
	
	ConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是小括号
			if(context.content !== ")"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出该语句并设置条件表达式的 inner
			this.out().condition.inner = this.expression;
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.condition.context.tag;
		}
	});
	
	return ConditionStatement;
}();

this.SingleStatement = function(){
	/**
	 * 单语句，即与上下文无关的语句，一般用于 if、for、while 等等语句的主体
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SingleStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SingleStatement = new Rexjs(SingleStatement, ECMAScriptStatement);
	
	SingleStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			switch(false){
				// 如果不是分号
				case context.content === ";":
					break;

				// 如果分号不是标识着语句结束
				case context.tag.class.statementEnd:
					break;

				// 如果当前表达式已经标识着语句结束
				case (this.expression.state & STATE_STATEMENT_END) !== STATE_STATEMENT_END:
					break;

				default:
					// 返回该分号标签
					return context.tag;
			}

			// 请求跳出该语句
			return this.requestOut(parser, context);
		},
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(){
			return null;
		}
	});

	return SingleStatement;
}();

}.call(
	this
);


// 语句块相关
!function(Statements){

this.ECMAScriptVariableCollections = function(VariableCollections, VariableCollection){
	/**
	 * 变量名收集器集合
	 * @param {VariableIndex} index - 变量名索引
	 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
	 */
	function ECMAScriptVariableCollections(index, _prevCollections){
		VariableCollections.call(this, index);

		this.initBlackList(_prevCollections);
		this.initConst(_prevCollections);
		this.initDeclaration(_prevCollections);
		this.initRex(_prevCollections);
	};
	ECMAScriptVariableCollections = new Rexjs(ECMAScriptVariableCollections, VariableCollections);

	ECMAScriptVariableCollections.props({
		blacklist: null,
		const: null,
		declaration: null,
		/**
		 * 生成一个临时变量名，并记搜集到 rex 变量名集合中
		 */
		generate: function(){
			var variable = this.provide();

			this.rex.collect(variable);
			return variable;
		},
		/**
		 * 初始化黑名单变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initBlackList: function(){
			this.blacklist = new VariableCollection();
		},
		/**
		 * 初始化常量变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initConst: function(){
			this.const = new VariableCollection();
		},
		/**
		 * 初始化声明变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initDeclaration: function(){
			this.declaration = new VariableCollection();
		},
		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initRex: function(){
			this.rex = new VariableCollection();
		},
		rex: null
	});

	return ECMAScriptVariableCollections;
}(
	Rexjs.VariableCollections,
	Rexjs.VariableCollection
);

this.ECMAScriptStatements = function(ECMAScriptStatement, extractTo){
	/**
	 * ECMAScript 语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 * @param {ECMAScriptVariableCollections} collections - 变量名收集器集合
	 */
	function ECMAScriptStatements(target, collections){
		Statements.call(this, target);

		// 初始化变量名集合
		this.collections = collections;
	};
	ECMAScriptStatements = new Rexjs(ECMAScriptStatements, Statements);

	ECMAScriptStatements.props({
		closure: null,
		collections: null,
		/**
		 * 获取当前上下文中的生成器
		 */
		get contextGenerator(){
			var closure = this.closure;

			// 如果闭包存在，则返回 contextGenerator
			return closure ? closure.contextGenerator : null;
		},
		/**
		 * 获取当前上下文中需要编译的生成器
		 */
		get contextGeneratorIfNeedCompile(){
			var closure = this.closure;

			// 如果闭包存在，则返回 contextGeneratorIfNeedCompile
			return closure ? closure.contextGeneratorIfNeedCompile : null;
		},
		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		declareTo: function(contentBuilder){
			// 添加临时变量名
			contentBuilder.appendString(
				this.collections.rex.toString("var ", ",", ";")
			);
		},
		/**
		 * 提取语句块文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 插入变量名
			this.declareTo(contentBuilder);
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new ECMAScriptStatement(this);
		}
	});

	return ECMAScriptStatements;
}(
	this.ECMAScriptStatement,
	Statements.prototype.extractTo
);

this.GlobalStatements = function(ECMAScriptStatements, ECMAScriptVariableCollections, VariableIndex){
	/**
	 * 全局语句块
	 */
	function GlobalStatements(){
		ECMAScriptStatements.call(
			this,
			null,
			new ECMAScriptVariableCollections(
				new VariableIndex()
			)
		);
	};
	GlobalStatements = new Rexjs(GlobalStatements, ECMAScriptStatements);

	GlobalStatements.props({
		/**
		 * 获取当前上下文中的生成器
		 */
		get contextGenerator(){
			return null;
		},
		/**
		 * 获取当前上下文中需要编译的生成器
		 */
		get contextGeneratorIfNeedCompile(){
			return null;
		}
	});

	return GlobalStatements;
}(
	this.ECMAScriptStatements,
	this.ECMAScriptVariableCollections,
	Rexjs.VariableIndex
);

}.call(
	this,
	Rexjs.Statements
);


// 大括号主体相关
!function(){

this.DefaultBraceBodyExpression = function(){
	/**
	 * 默认大括号主体表达式
	 */
	function DefaultBraceBodyExpression(){
		DefaultExpression.call(this);
	};
	DefaultBraceBodyExpression = new Rexjs(DefaultBraceBodyExpression, DefaultExpression);

	DefaultBraceBodyExpression.props({
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});

	return DefaultBraceBodyExpression;
}();

this.BraceBodyStatement = function(DefaultBraceBodyExpression){
	/**
	 * 大括号主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BraceBodyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BraceBodyStatement = new Rexjs(BraceBodyStatement, ECMAScriptStatement);
	
	BraceBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭大括号
			if(context.content !== "}"){
				return null;
			}

			// 跳出语句并设置 inner
			this.out(parser).inner = this.statements;
			// 返回结束语句块标签
			return this.bindingOf();
		},
		expression: new DefaultBraceBodyExpression(),
		/**
		 * 跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		out: function(parser){
			// 返回语句块表达式
			return (
				// 恢复语句块
				parser.statements = this.statements.target
			)
			.statement
			.expression;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.statements.target.statement.expression.context.tag;
		}
	});
	
	return BraceBodyStatement;
}(
	this.DefaultBraceBodyExpression
);

}.call(
	this
);


// 一些 基类 或 独立的 标签
!function(RegExp){
	
this.AsTag = function(AsExpression){
	/**
	 * as 标签
	 * @param {Number} _type - 标签类型
	 */
	function AsTag(_type){
		SyntaxTag.call(this, _type);
	};
	AsTag = new Rexjs(AsTag, SyntaxTag);

	AsTag.props({
		regexp: /as/
	});

	return AsTag;
}(
	this.AsExpression
);

this.CloseBraceTag = function(){
	/**
	 * 结束大括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBraceTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseBraceTag = new Rexjs(CloseBraceTag, SyntaxTag);

	CloseBraceTag.props({
		regexp: /\}/
	});
	
	return CloseBraceTag;
}();

this.CloseBracketTag = function(){
	/**
	 * 结束中括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBracketTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseBracketTag = new Rexjs(CloseBracketTag, SyntaxTag);

	CloseBracketTag.props({
		regexp: /\]/
	});
	
	return CloseBracketTag;
}();

this.CloseParenTag = function(){
	/**
	 * 结束小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseParenTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseParenTag = new Rexjs(CloseParenTag, SyntaxTag);

	CloseParenTag.props({
		regexp: /\)/
	});
	
	return CloseParenTag;
}();

this.CommentTag = function(){
	/**
	 * 注释标签
	 */
	function CommentTag(){
		SyntaxTag.call(this);
	};
	CommentTag = new Rexjs(CommentTag, SyntaxTag);

	CommentTag.props({
		$type: TYPE_MATCHABLE,
		order: ECMAScriptOrders.COMMENT
	});
	
	return CommentTag;
}();

this.DebuggerTag = function(){
	/**
	 * debugger 标签
	 * @param {Number} _type - 标签类型
	 */
	function DebuggerTag(_type){
		SyntaxTag.call(this, _type);
	};
	DebuggerTag = new Rexjs(DebuggerTag, SyntaxTag);
	
	DebuggerTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /debugger/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			statement.expression = new Expression(context);
		}
	});
	
	return DebuggerTag;
}();

this.DotTag = function(){
	/**
	 * 点标签
	 * @param {Number} _type - 标签类型
	 */
	function DotTag(_type){
		SyntaxTag.call(this, _type);
	};
	DotTag = new Rexjs(DotTag, SyntaxTag);
	
	DotTag.props({
		regexp: /\.(?!\d)/
	});
	
	return DotTag;
}();

this.ExpressionSeparatorTag = function(){
	/**
	 * 表达式分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ExpressionSeparatorTag(_type){
		SyntaxTag.call(this, _type);
	};
	ExpressionSeparatorTag = new Rexjs(ExpressionSeparatorTag, SyntaxTag);

	ExpressionSeparatorTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		$type: TYPE_MISTAKABLE
	});

	return ExpressionSeparatorTag;
}();

this.ModuleTag = function(FLOW_MAIN){
	/**
	 * 模块标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleTag(_type){
		SyntaxTag.call(this, _type);
	};
	ModuleTag = new Rexjs(ModuleTag, SyntaxTag);

	ModuleTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 收集该表达式所产生的变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} variable - 变量名标签上下文
		 */
		collectVariables: function(parser, variable){
			variable.tag.collectTo(parser, variable, parser.statements);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果当前语句有 target，说明不是最外层语句 或者 不是默认语句流
			if(statements.target || statement.flow !== FLOW_MAIN){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
				);

				return;
			}

			// 调用公共访问器
			commonVisitor(parser, context, statement, statements);

			// 设置当前表达式的 file 属性
			statement.expression.file = parser.file;
		}
	});

	return ModuleTag;
}(
	ECMAScriptStatement.FLOW_MAIN
);

this.OpenBraceTag = function(){
	/**
	 * 起始大括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBraceTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenBraceTag = new Rexjs(OpenBraceTag, SyntaxTag);

	OpenBraceTag.props({
		regexp: /\{/
	});
	
	return OpenBraceTag;
}();

this.OpenBracketTag = function(){
	/**
	 * 起始中括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBracketTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenBracketTag = new Rexjs(OpenBracketTag, SyntaxTag);

	OpenBracketTag.props({
		regexp: /\[/
	});
	
	return OpenBracketTag;
}();

this.OpenParenTag = function(){
	/**
	 * 起始小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenParenTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenParenTag = new Rexjs(OpenParenTag, SyntaxTag);

	OpenParenTag.props({
		regexp: /\(/
	});
	
	return OpenParenTag;
}();

this.SemicolonTag = function(){
	/**
	 * 分号标签
	 * @param {Number} _type - 标签类型
	 */
	function SemicolonTag(_type){
		SyntaxTag.call(this, _type);
	};
	SemicolonTag = new Rexjs(SemicolonTag, SyntaxTag);
	
	SemicolonTag.props({
		regexp: /;/
	});
	
	return SemicolonTag;
}();

this.SpecialLineTerminatorTag = function(LineTerminatorTag){
	/**
	 * 特殊的行结束符标签
	 */
	function SpecialLineTerminatorTag(){
		LineTerminatorTag.call(this);
	};
	SpecialLineTerminatorTag = new Rexjs(SpecialLineTerminatorTag, LineTerminatorTag);
	
	SpecialLineTerminatorTag.props({
		order: ECMAScriptOrders.SPECIAL_LINE_TERMINATOR
	});
	
	return SpecialLineTerminatorTag;
}(
	Rexjs.LineTerminatorTag
);

this.WithTag = function(){
	/**
	 * with 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function WithTag(_type){
		SyntaxTag.call(this, _type);
	};
	WithTag = new Rexjs(WithTag, SyntaxTag);
	
	WithTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /with/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.WITH);
		}
	});
	
	return WithTag;
}();

}.call(
	this,
	RegExp
);


// 文件位置标签相关
!function(FilePositionTag){

this.FileStartTag = function(FileStartExpression){
	/**
	 * 文件起始符标签
	 * @param {Number} _type - 标签类型
	 */
	function FileStartTag(_type){
		FilePositionTag.call(this, _type);
	};
	FileStartTag = new Rexjs(FileStartTag, FilePositionTag);
	
	FileStartTag.props({
		order: ECMAScriptOrders.FILE_START,
		regexp: /^/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式
			statement.expression = new FileStartExpression(context);
		}
	});
	
	return FileStartTag;
}(
	Rexjs.FileStartExpression
);

this.FileEndTag = function(FileEndExpression, GlobalStatements){
	/**
	 * 文件结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function FileEndTag(_type){
		FilePositionTag.call(this, _type);
	};
	FileEndTag = new Rexjs(FileEndTag, FilePositionTag);
	
	FileEndTag.props({
		regexp: /$/,
		throw: "end of input",
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		visitor: function(parser, context, statement, statements){
			switch(false){
				// 如果不是全局语句块，说明不是最外层
				case statements instanceof GlobalStatements:
					break;

				// 如果不是最后一个语句，则说明语句没有完全跳出
				case statement === statements[statements.length - 1]:
					break;

				// 如果存在表达式，说明解析有问题，因为该标签是语句起始标签，而又有上面两点保证，所以当前表达式必定为 null，为了 100% 确保，还是判断一下
				case !statement.expression:
					break;

				default:
					// 设置当前表达式
					statement.expression = new FileEndExpression(context);
					
					// 终止解析
					parser.regexp.break();
					return;
			}

			// 报错
			parser.error(context);
		}
	});
	
	return FileEndTag;
}(
	Rexjs.FileEndExpression,
	this.GlobalStatements
);
	
}.call(
	this,
	Rexjs.FilePositionTag
);


// 字面量标签相关
!function(){

this.LiteralExpression = function(){
	/**
	 * 字面量表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LiteralExpression(context){
		Expression.call(this, context);
	};
	LiteralExpression = new Rexjs(LiteralExpression, Expression);
	
	return LiteralExpression;
}();

this.LiteralTag = function(LiteralExpression){
	/**
	 * 字面量标签，即用肉眼一眼就可以看出含义的标签
	 * @param {Number} _type - 标签类型
	 */
	function LiteralTag(_type){
		SyntaxTag.call(this, _type);
	};
	LiteralTag = new Rexjs(LiteralTag, SyntaxTag);
	
	LiteralTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 之前标签所需匹配的标签列表
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new LiteralExpression(context);
		}
	})
	
	return LiteralTag;
}(
	this.LiteralExpression
);

}.call(
	this
);


// 字面量子类标签相关
!function(LiteralTag){

this.BooleanTag = function(){
	/**
	 * 布尔标签
	 * @param {Number} _type - 标签类型
	 */
	function BooleanTag(_type){
		LiteralTag.call(this, _type);
	};
	BooleanTag = new Rexjs(BooleanTag, LiteralTag);
	
	BooleanTag.props({
		regexp: /true|false/
	});
	
	return BooleanTag;
}();

this.NullTag = function(){
	/**
	 * null 标签
	 * @param {Number} _type - 标签类型
	 */
	function NullTag(_type){
		LiteralTag.call(this, _type);
	};
	NullTag = new Rexjs(NullTag, LiteralTag);
	
	NullTag.props({
		regexp: /null/
	});
	
	return NullTag;
}();

this.ThisTag = function(visitor){
	/**
	 * this 标签
	 * @param {Number} _type - 标签类型
	 */
	function ThisTag(_type){
		LiteralTag.call(this, _type);
	};
	ThisTag = new Rexjs(ThisTag, LiteralTag);
	
	ThisTag.props({
		regexp: /this/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var closure = statements.closure;

			// 如果存在闭包
			if(closure){
				// 向当前闭包申请应用 this 关键字
				closure.applyThis(parser, context);
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return ThisTag;
}(
	LiteralTag.prototype.visitor
);

this.RegExpTag = function(visitor){
	/**
	 * 未捕获的正则表达式标签
	 * @param {Number} _type - 标签类型
	 */
	function RegExpTag(_type){
		LiteralTag.call(this, _type);
	};
	RegExpTag = new Rexjs(RegExpTag, LiteralTag);

	RegExpTag.props({
		/*
			主体分三部分：
				1. 反斜杠 + 非换行符，如：\/
				2. 中括号内容，又分两部分：
					2.1 被转义的非换行符，如：\]
					2.2 非换行符、转义符（/）、结束中括号（]）
				3. 除了 转义符（/）、斜杠（\）、起始中括号（[）、换行符 之外的其他字符
		*/
		regexp : /\/(?:\\[^\r\n\u2028\u2029]|\[(?:\\[^\r\n\u2028\u2029]|[^\\\]\r\n\u2028\u2029])*\]|[^/\\[\r\n\u2028\u2029])+\/[imguy]*/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var i = 0, m = 0, g = 0, u = 0, y = 0, count = 0, content = context.content;
			
			// 遍历正则标记
			flags:
			for(var n = content.length - 1;n > -1;n--){
				// 判断当前标记
				switch(content[n]){
					case "/":
						break flags;

					case "i":
						count = ++i;
						break;
						
					case "m":
						count = ++m;
						break;
						
					case "g":
						count = ++g;
						break;
						
					case "u":
						count = ++u;
						break;
						
					case "y":
						count = ++y;
						break;
						
					default:
						count = 2;
						break;
				}
				
				// 如果对应标记出现过 2 次
				if(count > 1){
					// 报错
					parser.error(context, ECMAScriptErrors.REGEXP_FLAGS);
					return;
				}
			}
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return RegExpTag;
}(
	LiteralTag.prototype.visitor
);
	
this.NumberTag = function(){
	/**
	 * 数字标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberTag(_type){
		LiteralTag.call(this, _type);
	};
	NumberTag = new Rexjs(NumberTag, LiteralTag);
	
	NumberTag.props({
		regexp: /0[xX][0-9a-fA-F]+|0{2,}(?!\.)|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/,
		throw: "number"
	});
	
	return NumberTag;
}();

this.StringTag = function(){
	/**
	 * 字符串标签
	 * @param {Number} _type - 标签类型
	 */
	function StringTag(_type){
		LiteralTag.call(this, _type);
	};
	StringTag = new Rexjs(StringTag, LiteralTag);
	
	StringTag.props({
		regexp: /"(?:\\(?:[^\r]|\r\n?)|[^"\\\r\n\u2028\u2029]+)*"|'(?:\\(?:[^\r]|\r\n?)|[^'\\\r\n\u2028\u2029]+)*'/,
		throw: "string"
	});
	
	return StringTag;
}();

}.call(
	this,
	this.LiteralTag
);


// 算数标签相关
!function(){

this.MathematicalNumberTag = function(NumberTag){
	/**
	 * 算数数字标签
	 * @param {Number} _type - 标签类型
	 */
	function MathematicalNumberTag(_type){
		NumberTag.call(this, _type);
	};
	MathematicalNumberTag = new Rexjs(MathematicalNumberTag, NumberTag);
	
	MathematicalNumberTag.props({
		/**
		 * 提取文本内容，空函数，不做任何处理
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加字符串内容
			contentBuilder.appendString(
				// 如果需要编译
				config.es6Base ?
					// 转换为指定基数的数字
					'(parseInt("' + content.substring(2) + '",' + this.radix + "))" :
					content
			);
		},
		order: ECMAScriptOrders.MATHEMATICAL_NUMBER,
		radix: "10"
	});
	
	return MathematicalNumberTag;
}(
	this.NumberTag
);

this.BinaryNumberTag = function(MathematicalNumberTag){
	/**
	 * 二进制数字标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberTag(_type){
		MathematicalNumberTag.call(this, _type);
	};
	BinaryNumberTag = new Rexjs(BinaryNumberTag, MathematicalNumberTag);
	
	BinaryNumberTag.props({
		radix: "2",
		regexp: /0[bB][01]+/
	});
	
	return BinaryNumberTag;
}(
	this.MathematicalNumberTag
);

this.OctalNumberTag = function(MathematicalNumberTag){
	/**
	 * 八进制数字标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberTag(_type){
		MathematicalNumberTag.call(this, _type);
	};
	OctalNumberTag = new Rexjs(OctalNumberTag, MathematicalNumberTag);
	
	OctalNumberTag.props({
		radix: "8",
		regexp: /0[oO][0-7]+/
	});
	
	return OctalNumberTag;
}(
	this.MathematicalNumberTag
);

}.call(
	this
);


// 标识符标签相关
!function(){

this.IdentifierExpression = function(AssignableExpression){
	/**
	 * 标识符表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function IdentifierExpression(context){
		AssignableExpression.call(this, context);
	};
	IdentifierExpression = new Rexjs(IdentifierExpression, AssignableExpression);

	return IdentifierExpression;
}(
	this.AssignableExpression
);

this.IdentifierTag = function(IdentifierExpression, RegExg, keywords, regexp){
	/**
	 * 标识符标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierTag(_type){
		SyntaxTag.call(this, _type);
	};
	IdentifierTag = new Rexjs(IdentifierTag, SyntaxTag);
	
	IdentifierTag.static({
		/**
		 * 编译该标识符的表达式
		 * @param {String} exception - 会意外冲突的内容，则正则不会匹配到该内容
		 */
		compileRegExp: function(exception){
			return new RegExp(
				"(?:" +
					// 当 exception = "var"，匹配 var$、var_、vara、var中文 等情况
					"(?:" + exception + ")|" +
					// 当 exception = "var"，匹配 var1、var1_、var1$、var1中文 等情况
					"(?=(?:" + exception + ")\\d+)|" +
					// 匹配 abc、_abc、$abc、中文abc 等情况
					"(?!" + exception + ")" +
				")" +
				IDENTIFIER_REGEXP_SOURCE
			);
		},
		/**
		 * 获取所有关键字
		 */
		get keywords(){
			return keywords;
		},
		/**
		 * 设置所有关键字，并根据关键字重新编译该类的正则表达式
		 * @param {Array} value - 包含所有关键字的数组
		 */
		set keywords(value){
			// 记录值
			keywords = value;
			
			// 生成表达式
			regexp = this.compileRegExp(
				keywords.join("|")
			);
		}
	});

	IdentifierTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 判断变量名，是否已被指定收集器收集，如果已被收集则报错
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collected: function(parser, context, statements){
			var content = context.content;

			do {
				// 如果已被收集
				if(this.containsBy(content, statements.collections)){
					// 报错
					parser.error(
						context,
						ECMAScriptErrors.template(this.errorType, context.content)
					);
					return true;
				}

				// 获取下一个语句块
				statements = this.nextStatementsOf(statements);
			}
			// 如果语句块存在
			while(statements);

			return false;
		},
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containsBy: function(variable, collections){
			return collections.const.contains(variable);
		},
		errorType: "CONST",
		/**
		 * 获取下一个语句块
		 * @params {ECMAScriptStatements} statements - 当前语句块
		 */
		nextStatementsOf: function(statements){
			return statements.target;
		},
		order: ECMAScriptOrders.IDENTIFIER,
		/**
		 * 获取正则表达式
		 */
		get regexp(){
			return regexp;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 之前标签所需匹配的标签列表
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		throw: "identifier",
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置表达式
			statement.expression = new IdentifierExpression(context);
		}
	});

	// 设置 keywords，虽然值一样，但目的是编译正则
	IdentifierTag.keywords = keywords;
	return IdentifierTag;
}(
	this.IdentifierExpression,
	RegExp,
	// keywords
	[
		"break", "case", "catch", "class", "const", "continue",
		"debugger", "default", "delete", "do", "else", "enum", "export", "extends",
		"false", "finally", "for", "function", "if", "import", "in(?!stanceof)", "instanceof",
		"let", "new", "null", "return", "static", "super", "switch",
		"this", "throw", "true", "try", "typeof",
		"var", "void", "while", "with", "yield"
	],
	// regexp
	null
);

}.call(
	this
);


// 变量标签相关
!function(){

this.VariableTag = function(IdentifierTag){
	/**
	 * 变量标签
	 * @param {Number} _type - 标签类型
	 */
	function VariableTag(_type){
		IdentifierTag.call(this, _type);
	};
	VariableTag = new Rexjs(VariableTag, IdentifierTag);

	VariableTag.props({
		order: ECMAScriptOrders.VARIABLE
	});
	
	return VariableTag;
}(
	this.IdentifierTag
);

this.VariableDeclarationTag = function(VariableTag, SCOPE_CLOSURE, visitor){
	/**
	 * 变量声明标签
	 * @param {Number} _type - 标签类型
	 */
	function VariableDeclarationTag(_type){
		VariableTag.call(this, _type);
	};
	VariableDeclarationTag = new Rexjs(VariableDeclarationTag, VariableTag);

	VariableDeclarationTag.props({
		/**
		 * 判断该变量名是否还能被定义
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			var content = context.content;

			// 如果已被收集
			if(this.collected(parser, context, statements)){
				return;
			}
			
			// 收集变量名
			statements.collections.declaration.collect(content);
		},
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containsBy: function(variable, collections){
			return collections.blacklist.contains(variable);
		},
		errorType: "REDECLARATION",
		/**
		 * 获取下一个语句块
		 * @params {ECMAScriptStatements} statements - 当前语句块
		 */
		nextStatementsOf: function(statements){
			// 如果当前语句块是闭包，那么返回 null（因为不同闭包内，可以多次声明同一变量），否则返回 target
			return (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? null : statements.target;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return VariableDeclarationTag;
}(
	this.VariableTag,
	this.ECMAScriptStatements.SCOPE_CLOSURE,
	this.VariableTag.prototype.visitor
);

}.call(
	this
);


// 分号标签
!function(SemicolonTag){

this.EmptyStatementTag = function(){
	/**
	 * 空语句标签
	 * @param {Number} _type - 标签类型
	 */
	function EmptyStatementTag(_type){
		SemicolonTag.call(this, _type);
	};
	EmptyStatementTag = new Rexjs(EmptyStatementTag, SemicolonTag);
	
	EmptyStatementTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			(
				// 设置当前表达式
				statement.expression = new EmptyExpression(context)
			)
			// 如果有目标语句，则设置 STATE_STATEMENT_END，目的是提取表达式的时候，要包括分号
			.state = statement.target ? STATE_STATEMENT_END : STATE_STATEMENT_ENDED;
		}
	});
	
	return EmptyStatementTag;
}();

this.StatementEndTag = function(unexpected){
	/**
	 * 语句结束标签
	 * @param {Number} _type - 标签类型
	 */
	function StatementEndTag(_type){
		SemicolonTag.call(this, _type);
	};
	StatementEndTag = new Rexjs(StatementEndTag, SemicolonTag);
	
	StatementEndTag.props({
		$class: CLASS_STATEMENT_END,
		$type: TYPE_MISTAKABLE,
		// 防止与 EmptyStatementTag 冲突
		order: ECMAScriptOrders.STATEMENT_END,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.state |= STATE_STATEMENT_END;
		}
	});
	
	return StatementEndTag;
}(
	SemicolonTag.prototype.unexpected
);

this.LastStatementEndTag = function(StatementEndTag){
	/**
	 * 最后一个语句结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function LastStatementEndTag(_type){
		StatementEndTag.call(this, _type);
	};
	LastStatementEndTag = new Rexjs(LastStatementEndTag, StatementEndTag);

	LastStatementEndTag.props({
		regexp: /$/,
		throw: "end of input"
	});

	return LastStatementEndTag;
}(
	this.StatementEndTag
);

}.call(
	this,
	this.SemicolonTag
);


// 行结束符标签
!function(SpecialLineTerminatorTag, visitor){

this.IllegalLineTerminatorTag = function(){
	/**
	 * 不合法的行结束符标签
	 */
	function IllegalLineTerminatorTag(){
		SpecialLineTerminatorTag.call(this);
	};
	IllegalLineTerminatorTag = new Rexjs(IllegalLineTerminatorTag, SpecialLineTerminatorTag);
	
	IllegalLineTerminatorTag.props({
		order: ECMAScriptOrders.ILLEGAL_LINE_TERMINATOR,
		regexp: /(?:\/\*(?:[^*]|\*(?!\/))*)?(?:\r\n?|\n|\u2028|\u2029)/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.NEWLINE);
		}
	});
	
	return IllegalLineTerminatorTag;
}();

this.StatementBreakTag = function(){
	/**
	 * 语句行结束符标签
	 */
	function StatementBreakTag(){
		SpecialLineTerminatorTag.call(this);
	};
	StatementBreakTag = new Rexjs(StatementBreakTag, SpecialLineTerminatorTag);
	
	StatementBreakTag.props({
		$class: CLASS_STATEMENT_END,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置状态
			statement.expression.state |= STATE_STATEMENT_END;
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return StatementBreakTag;
}();

this.ExpressionBreakTag = function(){
	/**
	 * 表达式行结束符标签
	 */
	function ExpressionBreakTag(){
		SpecialLineTerminatorTag.call(this);
	};
	ExpressionBreakTag = new Rexjs(ExpressionBreakTag, SpecialLineTerminatorTag);
	
	ExpressionBreakTag.props({
		// 防止与 StatementBreakTag 冲突
		order: ECMAScriptOrders.EXPRESSION_BREAK,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restrictedExpressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置状态
			statement.expression.state |= STATE_STATEMENT_ENDABLE;
			
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return ExpressionBreakTag;
}();

}.call(
	this,
	this.SpecialLineTerminatorTag,
	this.SpecialLineTerminatorTag.prototype.visitor
);


// 注释标签
!function(CommentTag, tags){

this.SingleLineCommentTag = function(){
	/**
	 * 单行注释标签
	 * @param {Number} _type - 标签类型
	 */
	function SingleLineCommentTag(_type){
		CommentTag.call(this, _type);
	};
	SingleLineCommentTag = new Rexjs(SingleLineCommentTag, CommentTag);
	
	SingleLineCommentTag.props({
		regexp: /\/\/.*/
	});
	
	return SingleLineCommentTag;
}();

this.OpenMultiLineCommentTag = function(){
	/**
	 * 多行注释起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenMultiLineCommentTag(_type){
		CommentTag.call(this, _type);
	};
	OpenMultiLineCommentTag = new Rexjs(OpenMultiLineCommentTag, CommentTag);
	
	OpenMultiLineCommentTag.props({
		regexp: /\/\*/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = currentTags;
			return tagsMap.openMultiLineCommentContextTags;
		}
	});
	
	return OpenMultiLineCommentTag;
}();

this.OpenRestrictedCommentTag = function(OpenMultiLineCommentTag){
	/**
	 * 受限制的多行注释起始标签，一般使用在表达式上下文中
	 * @param {Number} _type - 标签类型
	 */
	function OpenRestrictedCommentTag(_type){
		OpenMultiLineCommentTag.call(this, _type);
	};
	OpenRestrictedCommentTag = new Rexjs(OpenRestrictedCommentTag, OpenMultiLineCommentTag);

	OpenRestrictedCommentTag.props({
		order: ECMAScriptOrders.OPEN_RESTRICTED_COMMENT,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = currentTags;
			return tagsMap.openRestrictedCommentContextTags;
		}
	});
	
	return OpenRestrictedCommentTag;
}(
	this.OpenMultiLineCommentTag
);

this.CommentBreakTag = function(ExpressionBreakTag){
	/**
	 * 注释行结束符标签
	 */
	function CommentBreakTag(){
		ExpressionBreakTag.call(this);
	};
	CommentBreakTag = new Rexjs(CommentBreakTag, ExpressionBreakTag);
	
	CommentBreakTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			// 记录 currentTags
			tags = tagsMap.restrictedExpressionContextTags;
			return currentTags;
		}
	});
	
	return CommentBreakTag;
}(
	this.ExpressionBreakTag
);

this.CommentContentTag = function(){
	/**
	 * 注释内容标签
	 * @param {Number} _type - 标签类型
	 */
	function CommentContentTag(_type){
		CommentTag.call(this, _type);
	};
	CommentContentTag = new Rexjs(CommentContentTag, CommentTag);
	
	CommentContentTag.props({
		// 防止与单行注释标签或多行注释起始标签冲突
		order: ECMAScriptOrders.COMMENT_CONTENT,
		regexp: /(?:[^*\r\n\u2028\u2029]|\*(?!\/))+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags){
			return currentTags;
		}
	});
	
	return CommentContentTag;
}();

this.CloseMultiLineCommentTag = function(){
	/**
	 * 多行注释结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseMultiLineCommentTag(_type){
		CommentTag.call(this, _type);
	};
	CloseMultiLineCommentTag = new Rexjs(CloseMultiLineCommentTag, CommentTag);
	
	CloseMultiLineCommentTag.props({
		regexp: /\*\//,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(){
			return tags;
		}
	});
	
	return CloseMultiLineCommentTag;
}();

}.call(
	this,
	this.CommentTag,
	// tags
	null
);


// 点属性访问器相关
!function(){

this.AccessorExpression = function(AssignableExpression){
	/**
	 * 属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} object - 拥有该属性的对象
	 */
	function AccessorExpression(context, object){
		AssignableExpression.call(this, context);

		this.object = object;
	};
	AccessorExpression = new Rexjs(AccessorExpression, AssignableExpression);
	
	AccessorExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取对象表达式
			this.object.extractTo(contentBuilder);
			
			// 追加点
			contentBuilder.appendContext(this.context);
			// 追加属性
			contentBuilder.appendContext(this.property);
		},
		object: null,
		property: null
	});
	
	return AccessorExpression;
}(
	this.AssignableExpression
);

this.DotAccessorTag = function(DotTag, AccessorExpression){
	/**
	 * 点属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function DotAccessorTag(_type){
		DotTag.call(this, _type);
	};
	DotAccessorTag = new Rexjs(DotAccessorTag, DotTag);
	
	DotAccessorTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new AccessorExpression(context, statement.expression);
		},
		// 防止与 NumberTag 冲突
		order: ECMAScriptOrders.DOT_ACCESSOR,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.dotAccessorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			context.setExpressionOf(statement);
		}
	});
	
	return DotAccessorTag;
}(
	this.DotTag,
	this.AccessorExpression
);

this.PropertyNameTag = function(IdentifierTag, RegExp){
	/**
	 * 属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyNameTag(_type){
		IdentifierTag.call(this, _type);
	};
	PropertyNameTag = new Rexjs(PropertyNameTag, IdentifierTag);
	
	PropertyNameTag.props({
		regexp: new RegExp(IDENTIFIER_REGEXP_SOURCE),
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.property = context;
		}
	});
	
	return PropertyNameTag;
}(
	this.IdentifierTag,
	RegExp
);

}.call(
	this
);


// 中括号属性访问器
!function(closeBracketAccessorTag){
	
this.BracketAccessorExpression = function(AccessorExpression){
	/**
	 * 中括号属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} object - 拥有该属性的对象
	 */
	function BracketAccessorExpression(context, object){
		AccessorExpression.call(this, context, object);

		this.property = new PartnerExpression(context);
	};
	BracketAccessorExpression = new Rexjs(BracketAccessorExpression, AccessorExpression);
	
	BracketAccessorExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取对象
			this.object.extractTo(contentBuilder);
			// 提取属性
			this.property.extractTo(contentBuilder);
		}
	});
	
	return BracketAccessorExpression;
}(
	this.AccessorExpression
);
	
this.BracketAccessorStatement = function(){
	/**
	 * 中括号属性访问器语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BracketAccessorStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BracketAccessorStatement = new Rexjs(BracketAccessorStatement, ECMAScriptStatement);
	
	BracketAccessorStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭分组小括号
			if(context.content !== "]"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出该语句并设置 inner
			this.out().property.inner = this.expression;
			return this.bindingOf();
		}
	});
	
	return BracketAccessorStatement;
}();

this.OpenBracketAccessorTag = function(OpenBracketTag, BracketAccessorExpression, BracketAccessorStatement){
	/**
	 * 起始中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBracketAccessorTag(_type){
		OpenBracketTag.call(this, _type);
	};
	OpenBracketAccessorTag = new Rexjs(OpenBracketAccessorTag, OpenBracketTag);
	
	OpenBracketAccessorTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBracketAccessorTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new BracketAccessorExpression(context, statement.expression);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new BracketAccessorStatement(statements);
		},
		// 防止与起始数组标签冲突
		order: ECMAScriptOrders.OPEN_BRACKET_ACCESSOR,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});
	
	return OpenBracketAccessorTag;
}(
	this.OpenBracketTag,
	this.BracketAccessorExpression,
	this.BracketAccessorStatement
);

this.CloseBracketAccessorTag = function(CloseBracketTag){
	/**
	 * 结束中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBracketAccessorTag(_type){
		CloseBracketTag.call(this, _type);
	};
	CloseBracketAccessorTag = new Rexjs(CloseBracketAccessorTag, CloseBracketTag);
	
	CloseBracketAccessorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression.property.close = context;
		}
	});
	
	return CloseBracketAccessorTag;
}(
	this.CloseBracketTag
);

closeBracketAccessorTag = new this.CloseBracketAccessorTag();
	
}.call(
	this,
	// closeBracketAccessorTag
	null
);


// 逗号相关
!function(commaSiblingTag){

this.CommaExpression = function(){
	/**
	 * 逗号表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} firstExpression - 第一个子表达式
	 */
	function CommaExpression(context, firstExpression){
		ListExpression.call(this, context, ",");

		// 添加第一个子表达式
		this.add(firstExpression);
	};
	CommaExpression = new Rexjs(CommaExpression, ListExpression);

	return CommaExpression;
}();

this.CommaStatement = function(){
	/**
	 * 逗号语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CommaStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CommaStatement = new Rexjs(CommaStatement, ECMAScriptStatement);
	
	CommaStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().add(this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出语句并添加表达式
			this.out().add(this.expression);
			// 返回标签
			return this.bindingOf();
		}
	});
	
	return CommaStatement;
}();

this.CommaTag = function(ExpressionSeparatorTag, CommaExpression, CommaStatement){
	/**
	 * 逗号标签
	 * @param {Number} _type - 标签类型
	 */
	function CommaTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	CommaTag = new Rexjs(CommaTag, ExpressionSeparatorTag);
	
	CommaTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return commaSiblingTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new CommaExpression(context, statement.expression);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new CommaStatement(statements);
		},
		regexp: /,/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});
	
	return CommaTag;
}(
	this.ExpressionSeparatorTag,
	this.CommaExpression,
	this.CommaStatement
);

this.CommaSiblingTag = function(CommaTag, CommaStatement){
	/**
	 * 兄弟逗号标签，即同一语句下面的非第一个逗号
	 * @param {Number} _type - 标签类型
	 */
	function CommaSiblingTag(_type){
		CommaTag.call(this, _type);
	};
	CommaSiblingTag = new Rexjs(CommaSiblingTag, CommaTag);

	CommaSiblingTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new CommaStatement(statements);
		}
	});

	return CommaSiblingTag;
}(
	this.CommaTag,
	this.CommaStatement
);

commaSiblingTag = new this.CommaSiblingTag();
	
}.call(
	this,
	// commaSiblingTag
	null
);


// 一元标签基类
!function(){
	
this.UnaryExpression = function(){
	/**
	 * 一元表达式
	 * @param {Context} context - 标签上下文
	 */
	function UnaryExpression(context){
		Expression.call(this, context);
	};
	UnaryExpression = new Rexjs(UnaryExpression, Expression);
	
	UnaryExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取一元操作符的内容
			contentBuilder.appendContext(this.context);
			// 提取操作对象内容
			this.operand.extractTo(contentBuilder);
		},
		operand: null
	});
	
	return UnaryExpression;
}();

this.UnaryStatement = function(){
	/**
	 * 一元语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function UnaryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	UnaryStatement = new Rexjs(UnaryStatement, ECMAScriptStatement);
	
	UnaryStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(){
			// 跳出语句并设置 operand
			this.out().operand = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.expression;

			// 如果一元标签验证该标签为表达式分隔符标签
			if(this.target.expression.context.tag.isSeparator(context, expression)){
				// 跳出语句并设置 operand
				this.out().operand = expression;
			}
		}
	});
	
	return UnaryStatement;
}();

this.UnaryTag = function(UnaryExpression, UnaryStatement, ExpressionSeparatorTag){
	/**
	 * 一元标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryTag(_type){
		SyntaxTag.call(this, _type);
	};
	UnaryTag = new Rexjs(UnaryTag, SyntaxTag);
	
	UnaryTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context){
			return new UnaryExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new UnaryStatement(statements);
		},
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 * @param {Expression} operand - 该一元表达式所操作的对象
		 */
		isSeparator: function(context){
			return context.tag instanceof ExpressionSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});
	
	return UnaryTag;
}(
	this.UnaryExpression,
	this.UnaryStatement,
	this.ExpressionSeparatorTag
);

this.UnaryKeywordTag = function(UnaryTag){
	/**
	 * 一元关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryKeywordTag(_type){
		UnaryTag.call(this, _type);
	};
	UnaryKeywordTag = new Rexjs(UnaryKeywordTag, UnaryTag);
	
	UnaryKeywordTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(content);
			// 追加空格
			contentBuilder.appendSpace();
		}
	});
	
	return UnaryKeywordTag;
}(
	this.UnaryTag
);

}.call(
	this
);


// 执行函数的一元操作符相关
!function(UnaryKeywordTag){

this.ExecutableExpression = function(){
	/**
	 * 可被执行的（函数）表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ExecutableExpression(open){
		PartnerExpression.call(this, open);
	};
	ExecutableExpression = new Rexjs(ExecutableExpression, PartnerExpression);

	return ExecutableExpression;
}();

this.ExecTag = function(ExecutableExpression, isSeparator){
	/**
	 * 执行函数关键字（如：new、try 等）标签
	 * @param {Number} _type - 标签类型
	 */
	function ExecTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	ExecTag = new Rexjs(ExecTag, UnaryKeywordTag);
	
	ExecTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 * @param {Expression} operand - 该一元表达式所操作的对象
		 */
		isSeparator: function(context, operand){
			/*
				该 isSeparator 是由 try 方法进入，
				而只有 CLASS_EXPRESSION_CONTEXT 标签才能进入 try
			*/
			return operand instanceof ExecutableExpression || isSeparator.call(this, context);
		}
	});
	
	return ExecTag;
}(
	this.ExecutableExpression,
	UnaryKeywordTag.prototype.isSeparator
);

}.call(
	this,
	this.UnaryKeywordTag
);


// 非赋值一元标签
!function(UnaryTag, UnaryKeywordTag){

this.DeleteTag = function(){
	/**
	 * delete 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DeleteTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	DeleteTag = new Rexjs(DeleteTag, UnaryKeywordTag);
	
	DeleteTag.props({
		regexp: /delete/
	});
	
	return DeleteTag;
}();

this.NewTag = function(ExecTag){
	/**
	 * new 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function NewTag(_type){
		ExecTag.call(this, _type);
	};
	NewTag = new Rexjs(NewTag, ExecTag);
	
	NewTag.props({
		regexp: /new/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.newContextTags;
		}
	});
	
	return NewTag;
}(
	this.ExecTag
);

this.TypeofTag = function(){
	/**
	 * typeof 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function TypeofTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	TypeofTag = new Rexjs(TypeofTag, UnaryKeywordTag);
	
	TypeofTag.props({
		regexp: /typeof/
	});
	
	return TypeofTag;
}();

this.VoidTag = function(){
	/**
	 * void 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function VoidTag(_type){
		UnaryKeywordTag.call(this, _type);
	};
	VoidTag = new Rexjs(VoidTag, UnaryKeywordTag);
	
	VoidTag.props({
		regexp: /void/
	});
	
	return VoidTag;
}();

this.PlusTag = function(){
	/**
	 * 正号标签
	 * @param {Number} _type - 标签类型
	 */
	function PlusTag(_type){
		UnaryTag.call(this, _type);
	};
	PlusTag = new Rexjs(PlusTag, UnaryTag);
	
	PlusTag.props({
		regexp: /\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return PlusTag;
}();

this.PlusSiblingTag = function(PlusTag){
	/**
	 * 相邻的正号标签
	 * @param {Number} _type - 标签类型
	 */
	function PlusSiblingTag(_type){
		PlusTag.call(this, _type);
	};
	PlusSiblingTag = new Rexjs(PlusSiblingTag, PlusTag);
	
	PlusSiblingTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: ECMAScriptOrders.PLUS_SIBLING
	});
	
	return PlusSiblingTag;
}(
	this.PlusTag
);

this.NegationTag = function(){
	/**
	 * 负号标签
	 * @param {Number} _type - 标签类型
	 */
	function NegationTag(_type){
		UnaryTag.call(this, _type);
	};
	NegationTag = new Rexjs(NegationTag, UnaryTag);
	
	NegationTag.props({
		regexp: /-/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return NegationTag;
}();

this.NegationSiblingTag = function(NegationTag){
	/**
	 * 重复的负号标签
	 * @param {Number} _type - 标签类型
	 */
	function NegationSiblingTag(_type){
		NegationTag.call(this, _type);
	};
	NegationSiblingTag = new Rexjs(NegationSiblingTag, NegationTag);
	
	NegationSiblingTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		order: ECMAScriptOrders.NEGATION_SIBLING
	});
	
	return NegationSiblingTag;
}(
	this.NegationTag
);

this.BitwiseNOTTag = function(){
	/**
	 * 二进制否定标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseNOTTag(_type){
		UnaryTag.call(this, _type);
	};
	BitwiseNOTTag = new Rexjs(BitwiseNOTTag, UnaryTag);
	
	BitwiseNOTTag.props({
		regexp: /~/
	});
	
	return BitwiseNOTTag;
}();

this.LogicalNOTTag = function(){
	/**
	 * 逻辑否定标签
	 * @param {Number} _type - 标签类型
	 */
	function LogicalNOTTag(_type){
		UnaryTag.call(this, _type);
	};
	LogicalNOTTag = new Rexjs(LogicalNOTTag, UnaryTag);
	
	LogicalNOTTag.props({
		regexp: /!/
	});
	
	return LogicalNOTTag;
}();
	
}.call(
	this,
	this.UnaryTag,
	this.UnaryKeywordTag
);


// 一元赋值标签
!function(VariableTag){

this.PostfixUnaryExpression = function(UnaryExpression){
	/**
	 * 后置一元表达式
	 * @param {Context} context - 标签上下文
	 * @param {AssignableExpression} operand - 操作对象表达式
	 */
	function PostfixUnaryExpression(context, operand){
		UnaryExpression.call(this, context);

		this.operand = operand;
	};
	PostfixUnaryExpression = new Rexjs(PostfixUnaryExpression, UnaryExpression);
	
	PostfixUnaryExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取操作对象内容
			this.operand.extractTo(contentBuilder);
			// 提取一元操作符的内容
			contentBuilder.appendContext(this.context);
		}
	});
	
	return PostfixUnaryExpression;
}(
	this.UnaryExpression
);

this.UnaryAssignmentStatement = function(UnaryStatement, error){
	/**
	 * 一元赋值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function UnaryAssignmentStatement(statements){
		UnaryStatement.call(this, statements);
	};
	UnaryAssignmentStatement = new Rexjs(UnaryAssignmentStatement, UnaryStatement);
	
	UnaryAssignmentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果满足一元赋值标签条件
			if(this.target.expression.context.tag.operable(parser, this.expression)){
				// 跳出语句并设置 operand
				this.out().operand = this.expression;
				return;
			}

			// 报错
			error(parser, this);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.expression, tag = this.target.expression.context.tag;

			switch(false){
				// 如果不是分隔符标签
				case tag.isSeparator(context, expression):
					return;
	
				// 如果不能满足一元赋值标签条件
				case tag.operable(parser, expression):
					// 报错
					error(parser, this);
					return;
			}

			// 跳出语句并设置 operand
			this.out().operand = expression;
		}
	});
	
	return UnaryAssignmentStatement;
}(
	this.UnaryStatement,
	// error
	function(parser, statement){
		// 报错
		parser.error(
			statement.target.expression.context,
			ECMAScriptErrors.PREFIX_OPERATION,
			true
		);
	}
);

this.UnaryAssignmentTag = function(UnaryTag, UnaryExpression, UnaryAssignmentStatement, AssignableExpression, AccessorExpression){
	/**
	 * 一元赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function UnaryAssignmentTag(_type){
		UnaryTag.call(this, _type);
	};
	UnaryAssignmentTag = new Rexjs(UnaryAssignmentTag, UnaryTag);

	UnaryAssignmentTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new UnaryAssignmentStatement(statements);
		},
		/**
		 * 判断该一元表达式在当前表达式中，是否能使用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 当前表达式
		 */
		operable: function(parser, expression){
			// 如果当前表达式是赋值表达式
			if(expression instanceof AssignableExpression){
				var ctx = expression.context;

				switch(true){
					// 如果是属性访问表达式
					case expression instanceof AccessorExpression:
						break;

					// 如果已被收集到常量（会触发报错）
					case ctx.tag.collected(parser, ctx, parser.statements):
						return false;
				}

				return true;
			}

			return false;
		},
		order: ECMAScriptOrders.UNARY_ASSIGNMENT
	});

	return UnaryAssignmentTag;
}(
	this.UnaryTag,
	this.UnaryExpression,
	this.UnaryAssignmentStatement,
	this.AssignableExpression,
	this.AccessorExpression
);

this.PostfixUnaryAssignmentTag = function(UnaryAssignmentTag, PostfixUnaryExpression){
	/**
	 * 后置一元赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function PostfixUnaryAssignmentTag(_type){
		UnaryAssignmentTag.call(this, _type);
	};
	PostfixUnaryAssignmentTag = new Rexjs(PostfixUnaryAssignmentTag, UnaryAssignmentTag);

	PostfixUnaryAssignmentTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new PostfixUnaryExpression(context, statement.expression);
		},
		order: ECMAScriptOrders.POSTFIX_UNARY_ASSIGNMENT,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restrictedExpressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果满足一元赋值标签条件
			if(this.operable(parser, statement.expression)){
				// 设置当前表达式
				context.setExpressionOf(statement);
				return;
			}

			// 报错
			parser.error(context, ECMAScriptErrors.POSTFIX_OPERATION, true);
		}
	});

	return PostfixUnaryAssignmentTag;
}(
	this.UnaryAssignmentTag,
	this.PostfixUnaryExpression
);

}.call(
	this,
	this.VariableTag
);


// 递增和递减标签
!function(UnaryAssignmentTag, PostfixUnaryAssignmentTag){

this.IncrementTag = function(){
	/**
	 * 前置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function IncrementTag(_type){
		UnaryAssignmentTag.call(this, _type);
	};
	IncrementTag = new Rexjs(IncrementTag, UnaryAssignmentTag);
	
	IncrementTag.props({
		regexp: /\+\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return IncrementTag;
}();

this.IncrementSiblingTag = function(IncrementTag){
	/**
	 * 相邻的前置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function IncrementSiblingTag(_type){
		IncrementTag.call(this, _type);
	};
	IncrementSiblingTag = new Rexjs(IncrementSiblingTag, IncrementTag);
	
	IncrementSiblingTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		}
	});
	
	return IncrementSiblingTag;
}(
	this.IncrementTag
);

this.PostfixIncrementTag = function(){
	/**
	 * 后置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function PostfixIncrementTag(_type){
		PostfixUnaryAssignmentTag.call(this, _type);
	};
	PostfixIncrementTag = new Rexjs(PostfixIncrementTag, PostfixUnaryAssignmentTag);
	
	PostfixIncrementTag.props({
		regexp: /\+\+/
	});
	
	return PostfixIncrementTag;
}();

this.DecrementTag = function(){
	/**
	 * 前置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function DecrementTag(_type){
		UnaryAssignmentTag.call(this, _type);
	};
	DecrementTag = new Rexjs(DecrementTag, UnaryAssignmentTag);
	
	DecrementTag.props({
		regexp: /--/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return DecrementTag;
}();

this.DecrementSiblingTag = function(DecrementTag){
	/**
	 * 相邻的前置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function DecrementSiblingTag(_type){
		DecrementTag.call(this, _type);
	};
	DecrementSiblingTag = new Rexjs(DecrementSiblingTag, DecrementTag);
	
	DecrementSiblingTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		}
	});
	
	return DecrementSiblingTag;
}(
	this.DecrementTag
);

this.PostfixDecrementTag = function(){
	/**
	 * 后置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function PostfixDecrementTag(_type){
		PostfixUnaryAssignmentTag.call(this, _type);
	};
	PostfixDecrementTag = new Rexjs(PostfixDecrementTag, PostfixUnaryAssignmentTag);
	
	PostfixDecrementTag.props({
		regexp: /--/
	});
	
	return PostfixDecrementTag;
}();

}.call(
	this,
	this.UnaryAssignmentTag,
	this.PostfixUnaryAssignmentTag
);


// 二元标签基类
!function(){

this.BinaryExpression = function(){
	/**
	 * 二元表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function BinaryExpression(context){
		Expression.call(this, context);
	};
	BinaryExpression = new Rexjs(BinaryExpression, Expression);

	BinaryExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 先提取左侧表达式
			this.left.extractTo(contentBuilder);
			// 追加运算符
			contentBuilder.appendContext(this.context);
			// 提取右侧表达式
			this.right.extractTo(contentBuilder);
		},
		last: null,
		left: null,
		right: null
	});

	return BinaryExpression;
}();

this.BinaryStatement = function(setRight){
	/**
	 * 二元语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function BinaryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	BinaryStatement = new Rexjs(BinaryStatement, ECMAScriptStatement);
	
	BinaryStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			setRight(this);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是表达式分隔符标签
			if(this.target.expression.context.tag.isSeparator(context)){
				setRight(this);
			}
		}
	});
	
	return BinaryStatement;
}(
	// setRight
	function(statement){
		// 跳出语句并给最后一个二元表达式设置 right
		statement.out().last.right = statement.expression;
	}
);

this.BinaryTag = function(ExpressionSeparatorTag, BinaryExpression, BinaryStatement){
	/**
	 * 二元标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	BinaryTag = new Rexjs(BinaryTag, ExpressionSeparatorTag);
	
	BinaryTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Expression} left - 该二元表达式左侧运算的表达式
		 */
		getBoundExpression: function(context){
			return new BinaryExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new BinaryStatement(statements);
		},
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			return context.tag instanceof ExpressionSeparatorTag;
		},
		order: ECMAScriptOrders.BINARY,
		precedence: 0,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression, precedence = this.precedence;

			// 如果当前表达式是二元表达式而且该二元表达式的运算符优先级小于当前运算符的优先级
			if(expression instanceof BinaryExpression && expression.context.tag.precedence < precedence){
				var exp = expression, right = expression.right;

				// 如果右侧表达式也是二元表达式
				while(right instanceof BinaryExpression){
					// 如果当前二元运算符的优先级小于等于该表达式的运算符优先级
					if(precedence <= right.context.tag.precedence){
						break;
					}

					// 记录上一个表达式
					exp = right;
					// 再获取右侧表达式
					right = right.right;
				}

				// 设置新的右侧表达式并设置当前表达式
				(
					exp.right = expression.last = context.setExpressionOf(
						// 仅仅为了模拟环境
						new BoxStatement(statements)
					)
				)
				// 设置左侧表达式
				.left = right;
			}
			else {
				// 设置当前表达式
				var binaryExpression = context.setExpressionOf(statement);

				// 设置左侧表达式
				binaryExpression.left = expression;
				// 设置最后的二元表达式为自己
				binaryExpression.last = binaryExpression;
			}

			// 设置当前语句
			context.setStatementOf(statements);
		}
	});
	
	return BinaryTag;
}(
	this.ExpressionSeparatorTag,
	this.BinaryExpression,
	this.BinaryStatement
);

}.call(
	this
);


// 二元标签子类
!function(BinaryTag, AssignableExpression, IdentifierExpression, VariableDeclarationTag){

this.AssignmentTag = function(BinaryExpression, isSeparator, assignable){
	/**
	 * 二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	function AssignmentTag(_type){
		BinaryTag.call(this, _type);
	};
	AssignmentTag = new Rexjs(AssignmentTag, BinaryTag);

	AssignmentTag.props({
		/**
		 * 验证所提供的标签是否为表达式分隔符标签
		 * @param {Context} context - 所需验证的标签上下文
		 */
		isSeparator: function(context){
			// 如果是父类确定的分隔符，但不是箭头符号，那么它就是赋值标签所认定的分隔符
			return isSeparator.call(this, context) && context.content !== "=>";
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			switch(true){
				// 如果可赋值
				case assignable(parser, expression):
					var binaryExpression = context.setExpressionOf(statement);

					// 设置左侧表达式
					binaryExpression.left = expression;
					// 设置最后的二元表达式为自己
					binaryExpression.last = binaryExpression;
					break;

				// 如果表达式是二元表达式
				case expression instanceof BinaryExpression:
					var last = expression.last, right = last.right;

					// 如果该二元表达式是“赋值表达式”，而且其值也是“可赋值表达式”
					if(last.context.tag.precedence === 0 && assignable(parser, right)){
						// 设置新的右侧表达式并设置当前表达式
						(
							last.right = expression.last = context.setExpressionOf(
								// 仅仅为了模拟环境
								new BoxStatement(statements)
							)
						)
						// 设置左侧表达式
						.left = right;
						break;
					}

				default:
					// 报错
					parser.error(context, ECMAScriptErrors.ASSIGNMENT, true);
					return;
			}

			// 设置当前语句
			context.setStatementOf(statements);
		}
	});
	
	return AssignmentTag;
}(
	this.BinaryExpression,
	BinaryTag.prototype.isSeparator,
	// assignable
	function(parser, expression){
		// 如果是赋值表达式
		if(expression instanceof AssignableExpression){
			// 如果是标识符表达式，那么需要验证是否为常量赋值
			if(expression instanceof IdentifierExpression){
				var ctx = expression.context, tag = ctx.tag;

				switch(true){
					// 如果当前是声明变量名标签，则不判断是否被收集，因为在声明中，已经判断，再判断的话，100% 由于重复定义，而报错
					case tag instanceof VariableDeclarationTag:
						break;

					// 如果已经被收集，会导致报错
					case tag.collected(parser, ctx, parser.statements):
						return false;
				}
			}

			return true;
		}

		return false;
	}
);

this.BinaryKeywordTag = function(){
	/**
	 * 二元关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryKeywordTag(_type){
		BinaryTag.call(this, _type);
	};
	BinaryKeywordTag = new Rexjs(BinaryKeywordTag, BinaryTag);

	BinaryKeywordTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
			// 追加空格
			contentBuilder.appendSpace();
		}
	});
	
	return BinaryKeywordTag;
}();

}.call(
	this,
	this.BinaryTag,
	this.AssignableExpression,
	this.IdentifierExpression,
	this.VariableDeclarationTag
);


// 所有具体的二元标签
!function(BinaryTag, AssignmentTag, BinaryKeywordTag){

this.BasicAssignmentTag = function(){
	/**
	 * 二元基础赋值运算符“等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function BasicAssignmentTag(_type){
		AssignmentTag.call(this, _type);
	};
	BasicAssignmentTag = new Rexjs(BasicAssignmentTag, AssignmentTag);
	
	BasicAssignmentTag.props({
		regexp: /=/
	});
	
	return BasicAssignmentTag;
}();

this.ShorthandAssignmentTag = function(){
	/**
	 * 简写的二元赋值运算符标签
	 * @param {Number} _type - 标签类型
	 */
	function ShorthandAssignmentTag(_type){
		AssignmentTag.call(this, _type);
	};
	ShorthandAssignmentTag = new Rexjs(ShorthandAssignmentTag, AssignmentTag);
	
	ShorthandAssignmentTag.props({
		// 防止与其他二元运算符冲突
		order: ECMAScriptOrders.SHORTHAND_ASSIGNMENT,
		regexp: /\+=|-=|\*=|\/=|%=|<<=|>>=|>>>=|\&=|\|=|\^=/
	});
	
	return ShorthandAssignmentTag;
}();

this.LogicalORTag = function(){
	/**
	 * 逻辑运算符“或”标签
	 * @param {Number} _type - 标签类型
	 */
	function LogicalORTag(_type){
		BinaryTag.call(this, _type);
	};
	LogicalORTag = new Rexjs(LogicalORTag, BinaryTag);
	
	LogicalORTag.props({
		// 防止与 "|" 冲突
		order: ECMAScriptOrders.LOGICAL_OR,
		precedence: 1,
		regexp: /\|\|/
	});
	
	return LogicalORTag;
}();

this.LogicalANDTag = function(){
	/**
	 * 逻辑运算符“与”标签
	 * @param {Number} _type - 标签类型
	 */
	function LogicalANDTag(_type){
		BinaryTag.call(this, _type);
	};
	LogicalANDTag = new Rexjs(LogicalANDTag, BinaryTag);
	
	LogicalANDTag.props({
		// 防止与 "&" 冲突
		order: ECMAScriptOrders.LOGICAL_AND,
		precedence: 2,
		regexp: /\&\&/
	});
	
	return LogicalANDTag;
}();

this.BitwiseORTag = function(){
	/**
	 * 二进制位运算符“或”标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseORTag(_type){
		BinaryTag.call(this, _type);
	};
	BitwiseORTag = new Rexjs(BitwiseORTag, BinaryTag);
	
	BitwiseORTag.props({
		precedence: 3,
		regexp: /\|/
	});
	
	return BitwiseORTag;
}();

this.BitwiseXORTag = function(){
	/**
	 * 二进制位运算符“非或”标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseXORTag(_type){
		BinaryTag.call(this, _type);
	};
	BitwiseXORTag = new Rexjs(BitwiseXORTag, BinaryTag);
	
	BitwiseXORTag.props({
		precedence: 4,
		regexp: /\^/
	});
	
	return BitwiseXORTag;
}();

this.BitwiseANDTag = function(){
	/**
	 * 二进制位运算符“与”标签
	 * @param {Number} _type - 标签类型
	 */
	function BitwiseANDTag(_type){
		BinaryTag.call(this, _type);
	};
	BitwiseANDTag = new Rexjs(BitwiseANDTag, BinaryTag);
	
	BitwiseANDTag.props({
		precedence: 5,
		regexp: /\&/
	});
	
	return BitwiseANDTag;
}();

this.IdentityTag = function(){
	/**
	 * 关系运算符“全等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentityTag(_type){
		BinaryTag.call(this, _type);
	};
	IdentityTag = new Rexjs(IdentityTag, BinaryTag);
	
	IdentityTag.props({
		// 防止与 "==" 或 "=" 冲突
		order: ECMAScriptOrders.IDENTITY,
		precedence: 6,
		regexp: /===/
	});
	
	return IdentityTag;
}();

this.NonidentityTag = function(){
	/**
	 * 关系运算符“不全等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function NonidentityTag(_type){
		BinaryTag.call(this, _type);
	};
	NonidentityTag = new Rexjs(NonidentityTag, BinaryTag);
	
	NonidentityTag.props({
		// 防止与 "!=" 冲突
		order: ECMAScriptOrders.NONIDENTITY,
		precedence: 6,
		regexp: /!==/
	});
	
	return NonidentityTag;
}();


this.EqualityTag = function(){
	/**
	 * 关系运算符“等于等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function EqualityTag(_type){
		BinaryTag.call(this, _type);
	};
	EqualityTag = new Rexjs(EqualityTag, BinaryTag);
	
	EqualityTag.props({
		order: ECMAScriptOrders.EQUALITY,
		precedence: 6,
		regexp: /==/
	});
	
	return EqualityTag;
}();

this.InequalityTag = function(){
	/**
	 * 关系运算符“不等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function InequalityTag(_type){
		BinaryTag.call(this, _type);
	};
	InequalityTag = new Rexjs(InequalityTag, BinaryTag);
	
	InequalityTag.props({
		order: ECMAScriptOrders.INEQUALITY,
		precedence: 6,
		regexp: /!=/
	});
	
	return InequalityTag;
}();

this.LessThanOrEqualTag = function(){
	/**
	 * 关系运算符“小于等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function LessThanOrEqualTag(_type){
		BinaryTag.call(this, _type);
	};
	LessThanOrEqualTag = new Rexjs(LessThanOrEqualTag, BinaryTag);

	LessThanOrEqualTag.props({
		order: ECMAScriptOrders.LESS_THAN_OR_EQUAL,
		precedence: 7,
		regexp: /<=/
	});
	
	return LessThanOrEqualTag;
}();

this.GreaterThanOrEqualTag = function(){
	/**
	 * 关系运算符“大于等于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function GreaterThanOrEqualTag(_type){
		BinaryTag.call(this, _type);
	};
	GreaterThanOrEqualTag = new Rexjs(GreaterThanOrEqualTag, BinaryTag);
	
	GreaterThanOrEqualTag.props({
		order: ECMAScriptOrders.GREATER_THAN_OR_EQUAL,
		precedence: 7,
		regexp: />=/
	});
	
	return GreaterThanOrEqualTag;
}();

this.LessThanTag = function(){
	/**
	 * 关系运算符“小于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function LessThanTag(_type){
		BinaryTag.call(this, _type);
	};
	LessThanTag = new Rexjs(LessThanTag, BinaryTag);
	
	LessThanTag.props({
		precedence: 7,
		regexp: /</
	});
	
	return LessThanTag;
}();

this.GreaterThanTag = function(){
	/**
	 * 关系运算符“大于号”标签
	 * @param {Number} _type - 标签类型
	 */
	function GreaterThanTag(_type){
		BinaryTag.call(this, _type);
	};
	GreaterThanTag = new Rexjs(GreaterThanTag, BinaryTag);
	
	GreaterThanTag.props({
		precedence: 7,
		regexp: />/
	});
	
	return GreaterThanTag;
}();

this.InstanceofTag = function(){
	/**
	 * 关系运算符“instanceof”标签
	 * @param {Number} _type - 标签类型
	 */
	function InstanceofTag(_type){
		BinaryKeywordTag.call(this, _type);
	};
	InstanceofTag = new Rexjs(InstanceofTag, BinaryKeywordTag);
	
	InstanceofTag.props({
		precedence: 7,
		regexp: /instanceof/
	});
	
	return InstanceofTag;
}();

this.InTag = function(){
	/**
	 * 关系运算符“in”标签
	 * @param {Number} _type - 标签类型
	 */
	function InTag(_type){
		BinaryKeywordTag.call(this, _type);
	};
	InTag = new Rexjs(InTag, BinaryKeywordTag);
	
	InTag.props({
		precedence: 7,
		regexp: /in(?!stanceof)/
	});
	
	return InTag;
}();

this.UnsignedRightShiftTag = function(){
	/**
	 * 二进制运算符“无符号右位移”标签
	 * @param {Number} _type - 标签类型
	 */
	function UnsignedRightShiftTag(_type){
		BinaryTag.call(this, _type);
	};
	UnsignedRightShiftTag = new Rexjs(UnsignedRightShiftTag, BinaryTag);
	
	UnsignedRightShiftTag.props({
		order: ECMAScriptOrders.UNSIGNED_RIGHT_SHIFT,
		precedence: 8,
		regexp: />>>/
	});
	
	return UnsignedRightShiftTag;
}();

this.LeftShiftTag = function(){
	/**
	 * 二进制运算符“左位移”标签
	 * @param {Number} _type - 标签类型
	 */
	function LeftShiftTag(_type){
		BinaryTag.call(this, _type);
	};
	LeftShiftTag = new Rexjs(LeftShiftTag, BinaryTag);
	
	LeftShiftTag.props({
		order: ECMAScriptOrders.LEFT_SHIFT,
		precedence: 8,
		regexp: /<</
	});
	
	return LeftShiftTag;
}();

this.RightShiftTag = function(){
	/**
	 * 二进制运算符“右位移”标签
	 * @param {Number} _type - 标签类型
	 */
	function RightShiftTag(_type){
		BinaryTag.call(this, _type);
	};
	RightShiftTag = new Rexjs(RightShiftTag, BinaryTag);
	
	RightShiftTag.props({
		order: ECMAScriptOrders.RIGHT_SHIFT,
		precedence: 8,
		regexp: />>/
	});
	
	return RightShiftTag;
}();

this.AdditionTag = function(){
	/**
	 * 二元运算符“加号”标签
	 * @param {Number} _type - 标签类型
	 */
	function AdditionTag(_type){
		BinaryTag.call(this, _type);
	};
	AdditionTag = new Rexjs(AdditionTag, BinaryTag);
	
	AdditionTag.props({
		precedence: 9,
		regexp: /\+/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.plusContextTags;
		}
	});
	
	return AdditionTag;
}();

this.SubtractionTag = function(){
	/**
	 * 二元运算符“减号”标签
	 * @param {Number} _type - 标签类型
	 */
	function SubtractionTag(_type){
		BinaryTag.call(this, _type);
	};
	SubtractionTag = new Rexjs(SubtractionTag, BinaryTag);
	
	SubtractionTag.props({
		precedence: 9,
		regexp: /-/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.negationContextTags;
		}
	});
	
	return SubtractionTag;
}();

this.DivisionTag = function(){
	/**
	 * 二元运算符“除号”标签
	 * @param {Number} _type - 标签类型
	 */
	function DivisionTag(_type){
		BinaryTag.call(this, _type);
	};
	DivisionTag = new Rexjs(DivisionTag, BinaryTag);
	
	DivisionTag.props({
		precedence: 10,
		regexp: /\//
	});
	
	return DivisionTag;
}();

this.MultiplicationTag = function(){
	/**
	 * 二元运算符“乘号”标签
	 * @param {Number} _type - 标签类型
	 */
	function MultiplicationTag(_type){
		BinaryTag.call(this, _type);
	};
	MultiplicationTag = new Rexjs(MultiplicationTag, BinaryTag);
	
	MultiplicationTag.props({
		precedence: 10,
		regexp: /\*/
	});
	
	return MultiplicationTag;
}();

this.RemainderTag = function(){
	/**
	 * 二元运算符“百分号”标签
	 * @param {Number} _type - 标签类型
	 */
	function RemainderTag(_type){
		BinaryTag.call(this, _type);
	};
	RemainderTag = new Rexjs(RemainderTag, BinaryTag);
	
	RemainderTag.props({
		precedence: 10,
		regexp: /%/
	});
	
	return RemainderTag;
}();
	
}.call(
	this,
	this.BinaryTag,
	this.AssignmentTag,
	this.BinaryKeywordTag
);


// 疑问赋值表达式
!function(ShorthandAssignmentTag){

this.QuestionAssignmentExpression = function(BinaryExpression){
	/**
	 * 疑问赋值达式
	 * @param {Context} context - 语法标签上下文
	 * @param {String} variable - 临时变量名
	 */
	function QuestionAssignmentExpression(context, variable){
		BinaryExpression.call(this, context);

		this.variable = variable;
	};
	QuestionAssignmentExpression = new Rexjs(QuestionAssignmentExpression, BinaryExpression);

	QuestionAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var variable = this.variable;

			// 追加临时变量赋值操作
			contentBuilder.appendString("((" + variable + "=");
			// 提取右侧表达式，作为临时变量的值
			this.right.extractTo(contentBuilder);
			// 追加三元运算符的判断条件
			contentBuilder.appendString(")!==void 0?");
			// 在三元表达式的成立条件部分，提取左侧表达式
			this.left.extractTo(contentBuilder);
			// 在三元表达式的成立条件部分，给左侧表达式赋值；并在否定条件部分直接返回该临时变量
			contentBuilder.appendString("=" + variable + ":" + variable + ")");
		},
		variable: ""
	});

	return QuestionAssignmentExpression;
}(
	this.BinaryExpression
);

this.QuestionAssignmentTag = function(QuestionAssignmentExpression, visitor){
	/**
	 * 疑问赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function QuestionAssignmentTag(_type){
		ShorthandAssignmentTag.call(this, _type);
	};
	QuestionAssignmentTag = new Rexjs(QuestionAssignmentTag, ShorthandAssignmentTag);

	QuestionAssignmentTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new QuestionAssignmentExpression(
				context,
				// 生成临时变量名
				statement.statements.collections.generate()
			);
		},
		regexp: /\?=/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果需要编译
			if(config.rexjs){
				// 调用父类方法
				visitor.call(this, parser, context, statement, statements);
				return;
			}

			// 报错
			parser.error(context);
		}
	});

	return QuestionAssignmentTag;
}(
	this.QuestionAssignmentExpression,
	ShorthandAssignmentTag.prototype.visitor
);

}.call(
	this,
	this.ShorthandAssignmentTag
);


// 幂运算表达式相关
!function(BinaryExpression){

this.ExponentiationExpression = function(extractTo){
	/**
	 * 幂运算表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} left - 左侧表达式
	 */
	function ExponentiationExpression(context, left){
		BinaryExpression.call(this, context, left);
	};
	ExponentiationExpression = new Rexjs(ExponentiationExpression, BinaryExpression);

	ExponentiationExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 追加算数方法
				contentBuilder.appendString("(Math.pow(");
				// 提取左侧的算数底值
				this.left.extractTo(contentBuilder);
				// 追加参数分隔符
				contentBuilder.appendString(",");
				// 提取幂
				this.right.extractTo(contentBuilder);
				// 追加方法结束小括号
				contentBuilder.appendString("))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return ExponentiationExpression;
}(
	BinaryExpression.prototype.extractTo
);

this.ExponentiationTag = function(BinaryTag, ExponentiationExpression){
	/**
	 * 幂运算标签
	 * @param {Number} _type - 标签类型
	 */
	function ExponentiationTag(_type){
		BinaryTag.call(this, _type);
	};
	ExponentiationTag = new Rexjs(ExponentiationTag, BinaryTag);
	
	ExponentiationTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new ExponentiationExpression(context);
		},
		// 防止与 "*" 冲突
		order: ECMAScriptOrders.EXPONENTIATION,
		precedence: 11,
		regexp: /\*\*/
	});
	
	return ExponentiationTag;
}(
	this.BinaryTag,
	this.ExponentiationExpression
);

}.call(
	this,
	this.BinaryExpression
);


// 三元表达式相关
!function(colonTag){

this.TernaryExpression = function(){
	/**
	 * 三元表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function TernaryExpression(context){
		Expression.call(this, context);
	};
	TernaryExpression = new Rexjs(TernaryExpression, Expression);

	TernaryExpression.props({
		condition: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取条件表达式
			this.condition.extractTo(contentBuilder);
			// 追加问号上下文
			contentBuilder.appendContext(this.context);
			// 提取成立条件表达式
			this.positive.extractTo(contentBuilder);
			// 追加冒号上下文
			contentBuilder.appendContext(this.colonContext);
			// 提取否定条件表达式
			this.negative.extractTo(contentBuilder);
		},
		negative: null,
		positive: null
	});

	return TernaryExpression;
}();

this.PositiveStatement = function(){
	/**
	 * 三元表达式的肯定条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PositiveStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	PositiveStatement = new Rexjs(PositiveStatement, ECMAScriptStatement);

	PositiveStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是冒号
			if(context.content !== ":"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 positive
			this.out().positive = this.expression;
			return this.bindingOf();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 报错
				parser.error(context);
			}
		}
	});

	return PositiveStatement;
}();

this.NegativeStatement = function(){
	/**
	 * 三元表达式的否定条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function NegativeStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	NegativeStatement = new Rexjs(NegativeStatement, ECMAScriptStatement);

	NegativeStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 negative
			this.out().negative = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句并设置 negative
				this.out().negative = this.expression;
			}
		}
	});

	return NegativeStatement;
}();

this.QuestionTag = function(ExpressionSeparatorTag, TernaryExpression, PositiveStatement){
	/**
	 * 三元运算符“问号”标签
	 * @param {Number} _type - 标签类型
	 */
	function QuestionTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	QuestionTag = new Rexjs(QuestionTag, ExpressionSeparatorTag);

	QuestionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return colonTag;
		},
		regexp: /\?/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 初始化三元表达式
			var ternaryExpression = new TernaryExpression(context);

			// 设置三元表达式的条件
			ternaryExpression.condition = statement.expression;
			// 设置当前表达式
			statement.expression = ternaryExpression;
			// 设置当前语句
			statements.statement = new PositiveStatement(statements);
		}
	});

	return QuestionTag;
}(
	this.ExpressionSeparatorTag,
	this.TernaryExpression,
	this.PositiveStatement
);

this.ColonTag = function(NegativeStatement){
	/**
	 * 冒号标签
	 * @param {Number} _type - 标签类型
	 */
	function ColonTag(_type){
		SyntaxTag.call(this, _type);
	};
	ColonTag = new Rexjs(ColonTag, SyntaxTag);

	ColonTag.props({
		regexp: /:/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置冒号上下文
			statement.expression.colonContext = context;
			// 设置当前语句
			statements.statement = new NegativeStatement(statements);
		}
	});
	
	return ColonTag;
}(
	this.NegativeStatement
);

colonTag = new this.ColonTag();

}.call(
	this,
	// colonTag
	null
);


// 函数调用相关
!function(ExecutableExpression, parameterSeparatorTag, closeCallTag){

this.CallExpression = function(AccessorExpression, BracketAccessorExpression, UnaryStatement, extractTo){
	/**
	 * 函数调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 */
	function CallExpression(open, statement){
		ExecutableExpression.call(this, open);

		this.operand = statement.expression;
		this.inner = new ListExpression(null, ",");

		// 如果是一元语句
		if(statement instanceof UnaryStatement){
			this.new = statement.target.expression.context.content === "new";
		}
	};
	CallExpression = new Rexjs(CallExpression, ExecutableExpression);

	CallExpression.props({
		/**
		 * 当拓展符存在时，以访问形式提取表达式内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		accessTo: function(contentBuilder){
			var operand = this.operand, boundThis = this.boundThis;

			// 追加临时变量名
			contentBuilder.appendString("(" + boundThis + "=");
			// 提取拥有此方法的对象
			operand.object.extractTo(contentBuilder);
			// 追加临时变量名的结束小括号
			contentBuilder.appendString(")");

			// 如果是中括号属性访问表达式
			if(operand instanceof BracketAccessorExpression){
				// 提取中括号
				operand.property.extractTo(contentBuilder);
			}
			else {
				// 提取点操作符
				contentBuilder.appendContext(operand.context);
				// 提取属性
				contentBuilder.appendContext(operand.property);
			}
			
			// 追加 apply 方法
			contentBuilder.appendString(".apply(" + boundThis + ",Rexjs.SpreadItem.combine");
			// 调用父类方法
			extractTo.call(this, contentBuilder);
			// 追加 apply 方法的结束小括号
			contentBuilder.appendString(")");
		},
		boundThis: "void 0",
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果有拓展符且需要编译
			if(this.spread && config.es6Base){
				switch(true){
					// 如果是 new 实例化
					case this.new:
						// 以实例化形式提取表达式内容
						this.newTo(contentBuilder);
						return;

					// 如果是对象方法的调用
					case this.operand instanceof AccessorExpression:
						// 以访问形式提取表达式内容
						this.accessTo(contentBuilder);
						return;

					default:
						// 以普通拓展符情况提取表达式内容
						this.spreadTo(contentBuilder);
						return;
				}
			}
			
			// 提取操作对象
			this.operand.extractTo(contentBuilder);
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		new: false,
		/**
		 * 当拓展符存在时，以实例化形式提取表达式内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		newTo: function(contentBuilder){
			// 追加 bind 方法
			contentBuilder.appendString("(Function.bind.apply(");
			// 提取该调用的方法
			this.operand.extractTo(contentBuilder);
			// 追加拓展符编译的方法
			contentBuilder.appendString(",Rexjs.SpreadItem.combine");
			// 追加函数调用的起始小括号
			contentBuilder.appendContext(this.open);
			// 追加 bind 所指定的 this
			contentBuilder.appendString(this.boundThis + ",");
			// 提取函数调用参数
			this.inner.extractTo(contentBuilder);
			// 追加函数调用的结束小括号
			contentBuilder.appendContext(this.close);
			// 追加 bind 方法的结束小括号和函数立即执行的小括号（注：bind 方法与 apply 不同，不具有立即执行效果）
			contentBuilder.appendString("))()");
		},
		operand: null,
		spread: false,
		/**
		 * 当匹配到拓展符时的处理逻辑
		 * @param {Statements} statements - 当前语句块
		 */
		spreadMatched: function(statements){
			// 如果已经告知过
			if(this.spread){
				return;
			}

			// 如果操作对象是属性表达式
			if(this.operand instanceof AccessorExpression){
				// 生成变量名
				this.boundThis = statements.collections.generate();
			}

			this.spread = true;
		},
		/**
		 * 当拓展符存在时，以普通拓展符情况提取表达式内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		spreadTo: function(contentBuilder){
			// 追加 apply
			contentBuilder.appendString("(Function.apply.call(");
			// 提取操作对象
			this.operand.extractTo(contentBuilder);
			// 追加参数
			contentBuilder.appendString("," + this.boundThis + ",Rexjs.SpreadItem.combine");
			// 调用父类方法
			extractTo.call(this, contentBuilder);
			// 追加结束小括号
			contentBuilder.appendString("))");
		}
	});

	return CallExpression;
}(
	this.AccessorExpression,
	this.BracketAccessorExpression,
	this.UnaryStatement,
	ExecutableExpression.prototype.extractTo
);

this.CallStatement = function(){
	/**
	 * 函数调用语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CallStatement(statements){
		ECMAScriptStatement.call(this, statements);

		this.expression = new EmptyExpression(null);
	};
	CallStatement = new Rexjs(CallStatement, ECMAScriptStatement);
	
	CallStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭分组小括号
			if(context.content !== ")"){
				// 报错
				parser.error(context, ECMAScriptErrors.CALL);
				return null;
			}
			
			// 跳出该语句并设置表达式
			this.out().inner.set(this.expression);
			// 返回关闭分组小括号标签
			return this.bindingOf();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出该语句并添加表达式
			this.out().inner.add(this.expression);
			// 返回关闭分组小括号标签
			return this.tagOf().separator;
		}
	});
	
	return CallStatement;
}();

this.OpenCallTag = function(OpenParenTag, CallExpression, CallStatement){
	/**
	 * 起始函数调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenCallTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenCallTag = new Rexjs(OpenCallTag, OpenParenTag);
	
	OpenCallTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeCallTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new CallExpression(context, statement);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new CallStatement(statements);
		},
		// 防止与分组小括号冲突
		order: ECMAScriptOrders.OPEN_CALL,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.parameterTags;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return parameterSeparatorTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});
	
	return OpenCallTag;
}(
	this.OpenParenTag,
	this.CallExpression,
	this.CallStatement
);

this.ParameterSeparatorTag = function(CommaTag, CallStatement){
	/**
	 * 函数调用参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ParameterSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ParameterSeparatorTag = new Rexjs(ParameterSeparatorTag, CommaTag);

	ParameterSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.parameterTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new CallStatement(statements);
		}
	});

	return ParameterSeparatorTag;
}(
	this.CommaTag,
	this.CallStatement
);

this.CloseCallTag = function(CloseParenTag){
	/**
	 * 结束函数调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseCallTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseCallTag = new Rexjs(CloseCallTag, CloseParenTag);
	
	CloseCallTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseCallTag;
}(
	this.CloseParenTag
);

parameterSeparatorTag = new this.ParameterSeparatorTag();
closeCallTag = new this.CloseCallTag();

}.call(
	this,
	this.ExecutableExpression,
	// parameterSeparatorTag
	null,
	// closeCallTag
	null
);


// 拓展参数相关
!function(){

this.SpreadExpression = function(){
	/**
	 * 拓展参数表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function SpreadExpression(context){
		Expression.call(this, context);
	};
	SpreadExpression = new Rexjs(SpreadExpression, Expression);

	SpreadExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 追加编译拓展符方法
				contentBuilder.appendString("new Rexjs.SpreadItem(");
				// 提取参数
				this.operand.extractTo(contentBuilder);
				// 追加拓展符方法的结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 追加拓展符上下文
			contentBuilder.appendContext(this.context);
			// 提取参数
			this.operand.extractTo(contentBuilder);
		},
		operand: null
	});

	return SpreadExpression;
}();

this.SpreadStatement = function(){
	/**
	 * 拓展参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SpreadStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SpreadStatement = new Rexjs(SpreadStatement, ECMAScriptStatement);

	SpreadStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 operand
			this.out().operand = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句并设置 operand
				this.out().operand = this.expression;
			}
		}
	});

	return SpreadStatement;
}();

this.SpreadTag = function(SpreadExpression, SpreadStatement, AccessorExpression, DEFAULT_BOUND_THIS){
	/**
	 * 拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function SpreadTag(_type){
		SyntaxTag.call(this, _type);
	};
	SpreadTag = new Rexjs(SpreadTag, SyntaxTag);
	
	SpreadTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			// 当匹配到拓展符时的处理逻辑
			statement.target.expression.spreadMatched(statement.statements);

			return new SpreadExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new SpreadStatement(statements);
		},
		// 防止与数字、点访问器冲突
		order: ECMAScriptOrders.SPREAD,
		regexp: /\.{3}/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});
	
	return SpreadTag;
}(
	this.SpreadExpression,
	this.SpreadStatement,
	this.AccessorExpression,
	this.CallExpression.DEFAULT_BOUND_THIS
);

}.call(
	this
);


// 解构表达式相关
!function(){

this.DestructibleExpression = function(){
	/**
	 * 可解构的表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function DestructibleExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
	};
	DestructibleExpression = new Rexjs(DestructibleExpression, PartnerExpression);

	DestructibleExpression.props({
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){},
		declaration: false,
		/**
		 * 根据语句块上下文给指定表达式设置变量名
		 * @param {Expression} expression - 需要设置变量名的表达式
		 * @param {Statements} statements - 当前语句块
		 */
		setVariableOf: function(expression, statements){
			var collections = statements.collections;

			expression.variable = (
				// 如果是 声明形式的解构赋值 而且 不存在需要编译的生成器
				this.declaration && !statements.contextGeneratorIfNeedCompile ?
					// 只需提供，不用在语句块进行定义
					collections.provide() :
					// 需要提供并定义
					collections.generate()
			);
		},
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(){},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(){}
	});

	return DestructibleExpression;
}();

this.DestructuringExpression = function(AssignableExpression){
	/**
	 * 解构表达式
	 * @param {Context} context - 标签上下文
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function DestructuringExpression(context, origin){
		AssignableExpression.call(this, context);

		this.origin = origin;
	};
	DestructuringExpression = new Rexjs(DestructuringExpression, AssignableExpression);

	DestructuringExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {Expression} expression - 解构当前项
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(){},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 直接提取源表达式
			this.origin.extractTo(contentBuilder);
		},
		origin: null
	});

	return DestructuringExpression;
}(
	this.AssignableExpression
);

this.DestructuringItemExpression = function(DestructuringExpression){
	/**
	 * 解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function DestructuringItemExpression(origin){
		DestructuringExpression.call(this, origin.context, origin);
	};
	DestructuringItemExpression = new Rexjs(DestructuringItemExpression, DestructuringExpression);

	DestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var builder = new ContentBuilder();

			// 提取源表达式到临时内容生成器
			this.origin.extractTo(builder);
			// 追加赋值操作
			contentBuilder.appendString("," + builder.result + "=" + anotherBuilder.result);
		},
		/**
		 * 获取嵌套类型解构项的变量名生成器
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		getVariableBuilder: function(contentBuilder, anotherBuilder){
			// 根据长度判断
			switch(this.origin.inner.length){
				// 如果是 0，说明没有解构内容，不需要解构
				case 0:
					return null;

				// 如果是 1，说明可以直接用 $Rexjs_0[0] 形式直接使用，不需要单独使用变量名记录
				case 1:
					return anotherBuilder;
			}

			var variable = this.variable, builder = new ContentBuilder();

			// 追加变量名到临时内容生成器
			builder.appendString(variable);

			// 追加变量名的赋值操作
			contentBuilder.appendString(
				"," + variable + "=" + anotherBuilder.result
			);

			return builder;
		},
		rest: false,
		variable: ""
	});

	return DestructuringItemExpression;
}(
	this.DestructuringExpression
);

this.DestructuringDefaultItemExpression = function(DestructuringItemExpression){
	/**
	 * 解构默认项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 * @param {Statements} statements - 该表达式所处的语句块
	 */
	function DestructuringDefaultItemExpression(origin, statements){
		DestructuringItemExpression.call(this, origin);

		// 如果需要编译
		if(config.es6Base){
			// 给刚生成的解构赋值表达式设置变量名
			this.variable = statements.collections.generate();
		}
	};
	DestructuringDefaultItemExpression = new Rexjs(DestructuringDefaultItemExpression, DestructuringItemExpression);

	DestructuringDefaultItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 将默认值表达式转换为三元表达式
			this.toTernary(this.origin, contentBuilder, anotherBuilder);
		},
		/**
		 * 将默认值表达式转换为三元表达式
		 * @param {BinaryExpression} expression - 默认值二元表达式
		 * @param {ContentBuilder} contentBuilder - 主内容生成器
		 * @param {ContentBuilder} valueBuilder - 属性值生成器
		 */
		toTernary: function(expression, contentBuilder, valueBuilder){
			var variable = this.variable, leftBuilder = new ContentBuilder(), rightBuilder = new ContentBuilder();

			// 提取左侧表达式到临时内容生成器
			expression.left.extractTo(leftBuilder);
			// 提取右侧表达式到临时内容生成器
			expression.right.extractTo(rightBuilder);

			// 追加赋值操作
			contentBuilder.appendString(
				"," + leftBuilder.result + "=(" +
					variable + "=" + valueBuilder.result + "," +
					// 三元表达式，判断是否为 undefined
					variable + "===void 0?" +
						rightBuilder.result +
						":" + variable +
				")"
			);
		}
	});

	return DestructuringDefaultItemExpression;
}(
	this.DestructuringItemExpression
);

this.PropertyDestructuringItemExpression = function(DestructuringItemExpression){
	/**
	 * 属性解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function PropertyDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	PropertyDestructuringItemExpression = new Rexjs(PropertyDestructuringItemExpression, DestructuringItemExpression);

	PropertyDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var origin = this.origin, builder = new ContentBuilder();

			// 追加获取属性方法起始代码
			builder.appendString(anotherBuilder.result + ".get(");
			// 解构属性名
			origin.name.defineTo(builder);
			// 追加获取属性方法结束代码
			builder.appendString(")");
			// 解构属性值
			origin.value.destructTo(contentBuilder, builder);
		}
	});

	return PropertyDestructuringItemExpression;
}(
	this.DestructuringItemExpression
);

this.PropertyDestructuringRestItemExpression = function(PropertyDestructuringItemExpression){
	/**
	 * 对象属性结构省略项表达式
	 * @param {Expression} origin - 解构项源表达式
	 */
	function PropertyDestructuringRestItemExpression(origin){
		PropertyDestructuringItemExpression.call(this, origin);
	};
	PropertyDestructuringRestItemExpression = new Rexjs(PropertyDestructuringRestItemExpression, PropertyDestructuringItemExpression);

	PropertyDestructuringRestItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var builder = new ContentBuilder();
			
			// 提取源表达式到临时内容生成器
			this.origin.value.operand.extractTo(builder);
			// 追加赋值操作
			contentBuilder.appendString("," + builder.result + "=" + anotherBuilder.result + ".rest");
		},
		rest: true
	});

	return PropertyDestructuringRestItemExpression;
}(
	this.PropertyDestructuringItemExpression
);

this.PropertyDestructuringDefaultItemExpression = function(DestructuringDefaultItemExpression){
	/**
	 * 属性解构默认项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 * @param {BinaryExpression} assignment - 默认值赋值表达式
	 * @param {Statements} statements - 该表达式所处的语句块
	 */
	function PropertyDestructuringDefaultItemExpression(origin, assignment, statements){
		DestructuringDefaultItemExpression.call(this, origin, statements);

		this.assignment = assignment;
	};
	PropertyDestructuringDefaultItemExpression = new Rexjs(PropertyDestructuringDefaultItemExpression, DestructuringDefaultItemExpression);

	PropertyDestructuringDefaultItemExpression.props({
		assignment: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var origin = this.origin, value = origin.value;

			// 解构属性名
			origin.name.extractTo(contentBuilder);
			// 追加等号
			contentBuilder.appendContext(value.context);
			// 追加值
			value.operand.extractTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var origin = this.origin, builder = new ContentBuilder();

			// 追加获取属性方法起始代码
			builder.appendString(anotherBuilder.result + ".get(");
			// 解构属性名
			origin.name.defineTo(builder);
			// 追加获取属性方法结束代码
			builder.appendString(")");

			// 将默认值表达式转换为三元表达式
			this.toTernary(this.assignment, contentBuilder, builder);
		}
	});

	return PropertyDestructuringDefaultItemExpression;
}(
	this.DestructuringDefaultItemExpression
);

}.call(
	this
);


// 声明数组省略项相关
!function(SpreadStatement){

this.DeclarationRestStatement = function(out){
	/**
	 * 变量声明省略项拓展语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationRestStatement(statements){
		SpreadStatement.call(this, statements);
	};
	DeclarationRestStatement = new Rexjs(DeclarationRestStatement, SpreadStatement);

	DeclarationRestStatement.props({
		/**
		 * 跳出该语句
		 */
		out: function(){
			return out.call(this).origin;
		}
	});

	return DeclarationRestStatement;
}(
	SpreadStatement.prototype.out
);

this.DeclarationRestItemSeparatorTag = function(CommaTag){
	/**
	 * 变量声明省略项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationRestItemSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	DeclarationRestItemSeparatorTag = new Rexjs(DeclarationRestItemSeparatorTag, CommaTag);
	
	DeclarationRestItemSeparatorTag.props({
		$type: TYPE_MATCHABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 报错
			parser.error(statement.target.expression.context, ECMAScriptErrors.REST_ELEMENT);
		}
	});

	return DeclarationRestItemSeparatorTag;
}(
	this.CommaTag
);

}.call(
	this,
	this.SpreadStatement
);


// 数组相关
!function(DestructibleExpression, DestructuringExpression, DestructuringItemExpression, DestructuringDefaultItemExpression, IdentifierExpression, AssignableExpression, BinaryExpression, BasicAssignmentTag, closeArrayTag, arrayItemSeparatorTag, destructItem){

this.ArrayDestructuringExpression = function(){
	/**
	 * 数组解构表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ArrayDestructuringExpression(origin){
		DestructuringExpression.call(this, origin.open, origin);
	};
	ArrayDestructuringExpression = new Rexjs(ArrayDestructuringExpression, DestructuringExpression);

	ArrayDestructuringExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(destructItem, contentBuilder, anotherBuilder);
		}
	});

	return ArrayDestructuringExpression;
}();

this.ArrayDestructuringItemExpression = function(){
	/**
	 * 数组解构项表达式
	 * @param {Expression} origin - 解构项源表达式
	 */
	function ArrayDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	ArrayDestructuringItemExpression = new Rexjs(ArrayDestructuringItemExpression, DestructuringItemExpression);

	ArrayDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(
				destructItem,
				contentBuilder,
				this.getVariableBuilder(contentBuilder, anotherBuilder)
			);
		}
	});

	return ArrayDestructuringItemExpression;
}();

this.ArrayDestructuringRestItemExpression = function(){
	/**
	 * 数组解构省略项表达式
	 * @param {Expression} origin - 解构项源表达式
	 */
	function ArrayDestructuringRestItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	ArrayDestructuringRestItemExpression = new Rexjs(ArrayDestructuringRestItemExpression, DestructuringItemExpression);

	ArrayDestructuringRestItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var builder = new ContentBuilder();
			
			// 提取源表达式到临时内容生成器
			this.origin.operand.extractTo(builder);
			// 追加赋值操作
			contentBuilder.appendString("," + builder.result + "=" + anotherBuilder.result);
		},
		rest: true
	});

	return ArrayDestructuringRestItemExpression;
}();

this.ArrayExpression = function(ArrayDestructuringExpression, ArrayDestructuringItemExpression, ArrayDestructuringRestItemExpression, SpreadExpression, extractTo, collected, error){
	/**
	 * 数组表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArrayExpression(open){
		DestructibleExpression.call(this, open);
	};
	ArrayExpression = new Rexjs(ArrayExpression, DestructibleExpression);

	ArrayExpression.props({
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(parser){
			var inner = this.inner;

			// 遍历
			for(var i = inner.min, j = inner.length;i < j;i++){
				var expression = inner[i];

				switch(true){
					// 如果是可赋值的表达式，即 标识符 或 属性访问器
					case expression instanceof AssignableExpression:
						// 如果已经被收集到常量内
						if(collected(parser, expression)){
							// collected 方法内已经报错
							return;
						}

						// 转化表达式
						expression = new DestructuringItemExpression(expression);
						break;

					// 如果是可解构的表达式
					case expression instanceof DestructibleExpression:
						expression = expression.toDestructuringItem(parser);
						break;

					// 如果是空表达式
					case expression instanceof EmptyExpression:
						continue;
					
					// 如果是二元运算表达式
					case expression instanceof BinaryExpression:
						// 如果二元运算表达式的标签是赋值符号
						if(expression.context.tag instanceof BasicAssignmentTag){
							// 如果二元表达式左侧不是解构表达式
							if(expression.left instanceof DestructuringExpression === false){
								// 转化表达式
								expression = new DestructuringDefaultItemExpression(expression, parser.statements);
								break;
							}
						}

						// 报错
						error(parser, expression);
						return;

					// 如果是拓展表达式
					case expression instanceof SpreadExpression:
						// 如果不是数组最后一项
						if(i !== j - 1){
							// 报错
							error(parser, expression, "REST_ELEMENT");
							return;
						}

						// 如果是可赋值的表达式，即 标识符 或 属性访问器
						if(expression.operand instanceof AssignableExpression){
							// 如果已经被收集到常量内
							if(collected(parser, expression.operand)){
								// collected 方法内已经报错
								return;
							}

							// 转化表达式
							expression = new ArrayDestructuringRestItemExpression(expression);
							break;
						}

						// 报错
						error(parser, expression.operand);
						return;

					default:
						// 报错
						error(parser, expression);
						return;
				}

				// 重新设置表达式
				inner[i] = inner.latest = expression;
			}
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果有拓展符且需要编译
			if(this.spread && config.es6Base){
				// 追加拓展项合并方法字符串
				contentBuilder.appendString(
					"(Rexjs.SpreadItem.combineBy("
				);

				// 调用父类方法
				extractTo.call(this, contentBuilder);

				// // 追加拓展项合并方法的结束小括号
				contentBuilder.appendString(
					"))"
				);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		spread: false,
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(parser){
			// 转换内部表达式
			this.convert(parser, this.inner);
			return new ArrayDestructuringExpression(this);
		},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(parser){
			var inner = this.inner, expression = new ArrayDestructuringItemExpression(this);

			// 如果需要编译 而且 长度大于 1（长度为 0 不解析，长度为 1，只需取一次对象，所以都不需要生成变量名）
			if(config.es6Base && inner.length > 1){
				// 设置变量名
				this.setVariableOf(expression, parser.statements);
			}

			// 转换内部表达式
			this.convert(parser, this.inner);
			return expression;
		}
	});

	return ArrayExpression;
}(
	this.ArrayDestructuringExpression,
	this.ArrayDestructuringItemExpression,
	this.ArrayDestructuringRestItemExpression,
	this.SpreadExpression,
	DestructibleExpression.prototype.extractTo,
	// collected
	function(parser, expression){
		// 如果是标识符表达式
		if(expression instanceof IdentifierExpression){
			var context = expression.context;

			// 判断是否收集到常量中
			return context.tag.collected(parser, context, parser.statements);
		}

		return false;
	},
	// error
	function(parser, expression, _errorName){
		parser.error(
			expression.context,
			_errorName ? ECMAScriptErrors[_errorName] : null
		);
	}
);

this.ArrayStatement = function(){
	/**
	 * 数组语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArrayStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArrayStatement = new Rexjs(ArrayStatement, ECMAScriptStatement);

	ArrayStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 判断标签内容
			switch(context.content){
				case ",":
					// 跳出语句并添加表达式
					this.out().inner.add(this.expression);
					// 返回标签
					return this.tagOf().separator;

				case "]":
					// 跳出语句并设置表达式
					this.out().inner.set(this.expression);
					// 返回结束标签
					return this.bindingOf();
			}

			// 报错
			parser.error(context);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出语句并添加表达式
			this.out().inner.add(this.expression);
			// 返回标签
			return this.tagOf().separator;
		}
	});

	return ArrayStatement;
}();

this.OpenArrayTag = function(OpenBracketTag, ArrayExpression, ArrayStatement){
	/**
	 * 起始数组标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArrayTag(_type){
		OpenBracketTag.call(this, _type);
	};
	OpenArrayTag = new Rexjs(OpenArrayTag, OpenBracketTag);
	
	OpenArrayTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArrayTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new ArrayExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ArrayStatement(statements);
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return arrayItemSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openArrayContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});
	
	return OpenArrayTag;
}(
	this.OpenBracketTag,
	this.ArrayExpression,
	this.ArrayStatement
);

this.ArrayItemSeparatorTag = function(CommaTag, ArrayStatement){
	/**
	 * 数组项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArrayItemSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ArrayItemSeparatorTag = new Rexjs(ArrayItemSeparatorTag, CommaTag);
	
	ArrayItemSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openArrayContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			(
				statements.statement = new ArrayStatement(statements)
			)
			// 设置语句表达式为空表达式，目的是与默认表达式区分，因为空数组是默认表达式，可以使用 set 来过滤，而其他空项不应该被过滤，所以使用空表达式
			.expression = new EmptyExpression(null);
		}
	});
	
	return ArrayItemSeparatorTag;
}(
	this.CommaTag,
	this.ArrayStatement
);

this.CloseArrayTag = function(CloseBracketTag){
	/**
	 * 结束数组标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArrayTag(_type){
		CloseBracketTag.call(this, _type);
	};
	CloseArrayTag = new Rexjs(CloseArrayTag, CloseBracketTag);
	
	CloseArrayTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructibleExpressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseArrayTag;
}(
	this.CloseBracketTag
);

arrayItemSeparatorTag = new this.ArrayItemSeparatorTag();
closeArrayTag = new this.CloseArrayTag();

}.call(
	this,
	this.DestructibleExpression,
	this.DestructuringExpression,
	this.DestructuringItemExpression,
	this.DestructuringDefaultItemExpression,
	this.IdentifierExpression,
	this.AssignableExpression,
	this.BinaryExpression,
	this.BasicAssignmentTag,
	// closeArrayTag
	null,
	// arrayItemSeparatorTag
	null,
	// destructItem
	function(expression, contentBuilder, anotherBuilder, index){
		// 如果是空表达式
		if(expression.empty){
			return;
		}

		// 初始化变量名内容生成器
		var builder = new ContentBuilder();

		// 追加当前项的变量名
		builder.appendString(
			anotherBuilder.result + (
				expression.rest ?
					".slice(" + index + ")" :
					"[" + index + "]"
			)
		);

		// 提取并编译表达式文本内容
		expression.compileTo(contentBuilder, builder);
	}
);


// 数组拓展项相关
!function(){

this.ArraySpreadItemExpression = function(SpreadExpression){
	/**
	 * 数组拓展项表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArraySpreadItemExpression(context){
		SpreadExpression.call(this, context);
	};
	ArraySpreadItemExpression = new Rexjs(ArraySpreadItemExpression, SpreadExpression);

	ArraySpreadItemExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 追加初始化拓展项
				contentBuilder.appendString("new Rexjs.SpreadItem(");
				// 提取操作对象
				this.operand.extractTo(contentBuilder);
				// 追加初始化拓展项的结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 追加拓展符上下文
			contentBuilder.appendContext(this.context);
			// 提取参数
			this.operand.extractTo(contentBuilder);
		}
	});

	return ArraySpreadItemExpression;
}(
	this.SpreadExpression
);

this.ArraySpreadTag = function(SpreadTag, ArraySpreadItemExpression){
	/**
	 * 数组拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArraySpreadTag(_type){
		SpreadTag.call(this, _type);
	};
	ArraySpreadTag = new Rexjs(ArraySpreadTag, SpreadTag);
	
	ArraySpreadTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			// 告知数组表达式有拓展符
			statement.target.expression.spread = true;

			return new ArraySpreadItemExpression(context);
		}
	});
	
	return ArraySpreadTag;
}(
	this.SpreadTag,
	this.ArraySpreadItemExpression
);

}.call(
	this
);


// 数组解构赋值相关
!function(OpenArrayTag, BasicAssignmentTag, variableDeclarationArrayItemSeparatorTag, closeDeclarationArrayTag){

this.DeclarationArrayExpression = function(ArrayExpression){
	/**
	 * 变量声明数组表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function DeclarationArrayExpression(open){
		ArrayExpression.call(this, open);
	};
	DeclarationArrayExpression = new Rexjs(DeclarationArrayExpression, ArrayExpression);

	DeclarationArrayExpression.props({
		arrayOf: null,
		declaration: true,
		/**
		 * 将数组每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){}
	});

	return DeclarationArrayExpression;
}(
	this.ArrayExpression
);

this.DeclarationArrayItemAssignmentReadyStatement = function(){
	/**
	 * 变量声明数组项赋值准备语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationArrayItemAssignmentReadyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	DeclarationArrayItemAssignmentReadyStatement = new Rexjs(DeclarationArrayItemAssignmentReadyStatement, ECMAScriptStatement);
	
	DeclarationArrayItemAssignmentReadyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			this.out();
			return null;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句
				this.out();
			}

			return null;
		}
	});

	return DeclarationArrayItemAssignmentReadyStatement;
}();

this.OpenDeclarationArrayTag = function(DeclarationArrayExpression, visitor){
	/**
	 * 变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenDeclarationArrayTag(_type){
		OpenArrayTag.call(this, _type);
	};
	OpenDeclarationArrayTag = new Rexjs(OpenDeclarationArrayTag, OpenArrayTag);
	
	OpenDeclarationArrayTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeDeclarationArrayTag;
		},
		/**
		 * 获取拥有该数组的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getArrayOf: function(statement){
			return statement.target.expression;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new DeclarationArrayExpression(context);
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return variableDeclarationArrayItemSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openDeclarationArrayContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 通过当前语句给变量声明数组表达式绑定 arrayOf 属性
			statement.expression.arrayOf = this.getArrayOf(statement);
		}
	});

	return OpenDeclarationArrayTag;
}(
	this.DeclarationArrayExpression,
	OpenArrayTag.prototype.visitor
);

this.DeclarationArrayItemTag = function(VariableDeclarationTag, DestructuringItemExpression, IdentifierExpression){
	/**
	 * 变量声明数组项标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	DeclarationArrayItemTag = new Rexjs(DeclarationArrayItemTag, VariableDeclarationTag);
	
	DeclarationArrayItemTag.props({
		/**
		 * 获取该标签所处的数组语句
		 * @param {Statement} statement - 当前语句
		 */
		getArrayStatement: function(statement){
			return statement;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new DestructuringItemExpression(
				new IdentifierExpression(context)
			);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayItemContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			context.setExpressionOf(statement);
			
			(
				// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
				context.tag = this.getArrayStatement(statement).target.expression.arrayOf.context.tag.variable
			)
			// 收集变量名
			.collectTo(parser, context, statements);
		}
	});
	
	return DeclarationArrayItemTag;
}(
	this.VariableDeclarationTag,
	this.DestructuringItemExpression,
	this.IdentifierExpression
);

this.DeclarationArrayItemSeparatorTag = function(ArrayItemSeparatorTag){
	/**
	 * 变量声明数组项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemSeparatorTag(_type){
		ArrayItemSeparatorTag.call(this, _type);
	};
	DeclarationArrayItemSeparatorTag = new Rexjs(DeclarationArrayItemSeparatorTag, ArrayItemSeparatorTag);
	
	DeclarationArrayItemSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openDeclarationArrayContextTags;
		}
	});

	return DeclarationArrayItemSeparatorTag;
}(
	this.ArrayItemSeparatorTag
);

this.DeclarationArrayItemAssignmentTag = function(DeclarationArrayItemAssignmentReadyStatement, DestructuringDefaultItemExpression, visitor){
	/**
	 * 变量声明数组项赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayItemAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	DeclarationArrayItemAssignmentTag = new Rexjs(DeclarationArrayItemAssignmentTag, BasicAssignmentTag);
	
	DeclarationArrayItemAssignmentTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 初始化赋值准备语句
			var readyStatement = new DeclarationArrayItemAssignmentReadyStatement(statements);

			// 设置准备语句的表达式
			readyStatement.expression = statement.expression;
			// 设置当前语句
			statements.statement = readyStatement;
			
			// 调用父类访问器
			visitor.call(this, parser, context, readyStatement, statements);

			// 覆盖当前语句的表达式
			statement.expression = new DestructuringDefaultItemExpression(readyStatement.expression, statements);
		}
	});

	return DeclarationArrayItemAssignmentTag;
}(
	this.DeclarationArrayItemAssignmentReadyStatement,
	this.DestructuringDefaultItemExpression,
	BasicAssignmentTag.prototype.visitor
);

this.CloseDeclarationArrayTag = function(CloseArrayTag){
	/**
	 * 标签变量声明数组结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseDeclarationArrayTag(_type){
		CloseArrayTag.call(this, _type);
	};
	CloseDeclarationArrayTag = new Rexjs(CloseDeclarationArrayTag, CloseArrayTag);
	
	CloseDeclarationArrayTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructuringAssignmentTags;
		}
	});
	
	return CloseDeclarationArrayTag;
}(
	this.CloseArrayTag
);

variableDeclarationArrayItemSeparatorTag = new this.DeclarationArrayItemSeparatorTag();
closeDeclarationArrayTag = new this.CloseDeclarationArrayTag();

}.call(
	this,
	this.OpenArrayTag,
	this.BasicAssignmentTag,
	// variableDeclarationArrayItemSeparatorTag
	null,
	// closeDeclarationArrayTag
	null
);


// 声明数组省略项相关
!function(){

this.DeclarationArrayRestItemTag = function(DeclarationArrayItemTag, IdentifierExpression){
	/**
	 * 变量声明数组省略项标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayRestItemTag(_type){
		DeclarationArrayItemTag.call(this, _type);
	};
	DeclarationArrayRestItemTag = new Rexjs(DeclarationArrayRestItemTag, DeclarationArrayItemTag);

	DeclarationArrayRestItemTag.props({
		/**
		 * 获取该标签所处的数组语句
		 * @param {Statement} statement - 当前语句
		 */
		getArrayStatement: function(statement){
			return statement.target;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new IdentifierExpression(context);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayRestItemContextTags;
		}
	});

	return DeclarationArrayRestItemTag;
}(
	this.DeclarationArrayItemTag,
	this.IdentifierExpression
);

this.DeclarationArrayRestTag = function(ArraySpreadTag, ArrayDestructuringRestItemExpression, ArraySpreadItemExpression, DeclarationRestStatement){
	/**
	 * 变量声明数组省略项拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationArrayRestTag(_type){
		ArraySpreadTag.call(this, _type);
	};
	DeclarationArrayRestTag = new Rexjs(DeclarationArrayRestTag, ArraySpreadTag);
	
	DeclarationArrayRestTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new ArrayDestructuringRestItemExpression(
				new ArraySpreadItemExpression(context)
			);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new DeclarationRestStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayRestItemTags;
		}
	});

	return DeclarationArrayRestTag;
}(
	this.ArraySpreadTag,
	this.ArrayDestructuringRestItemExpression,
	this.ArraySpreadItemExpression,
	this.DeclarationRestStatement
);

}.call(
	this
);


// 变量声明数组项标签相关
!function(CloseDeclarationArrayTag, closeNestedDeclarationArrayItemTag){

this.OpenNestedDeclarationArrayItemTag = function(OpenDeclarationArrayTag){
	/**
	 * 嵌套的变量声明数组起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenNestedDeclarationArrayItemTag(_type){
		OpenDeclarationArrayTag.call(this, _type);
	};
	OpenNestedDeclarationArrayItemTag = new Rexjs(OpenNestedDeclarationArrayItemTag, OpenDeclarationArrayTag);
	
	OpenNestedDeclarationArrayItemTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeNestedDeclarationArrayItemTag;
		},
		/**
		 * 获取拥有该数组的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getArrayOf: function(statement){
			return statement.target.expression.arrayOf;
		}
	});

	return OpenNestedDeclarationArrayItemTag;
}(
	this.OpenDeclarationArrayTag
);

this.CloseNestedDeclarationArrayItemTag = function(visitor){
	/**
	 * 标签变量声明数组结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseNestedDeclarationArrayItemTag(_type){
		CloseDeclarationArrayTag.call(this, _type);
	};
	CloseNestedDeclarationArrayItemTag = new Rexjs(CloseNestedDeclarationArrayItemTag, CloseDeclarationArrayTag);
	
	CloseNestedDeclarationArrayItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayItemSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 将表达式转化为解构项
			statement.expression = statement.expression.toDestructuringItem(parser);
		}
	});
	
	return CloseNestedDeclarationArrayItemTag;
}(
	CloseDeclarationArrayTag.prototype.visitor
);

closeNestedDeclarationArrayItemTag = new this.CloseNestedDeclarationArrayItemTag();

}.call(
	this,
	this.CloseDeclarationArrayTag,
	// closeNestedDeclarationArrayItemTag
	null
);


// 语句块相关
!function(closeBlockTag){

this.BlockVariableCollections = function(ECMAScriptVariableCollections){
	/**
	 * 块级区域变量名收集器集合
	 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
	 */
	function BlockVariableCollections(prevCollections){
		ECMAScriptVariableCollections.call(this, prevCollections.index, prevCollections);
	};
	BlockVariableCollections = new Rexjs(BlockVariableCollections, ECMAScriptVariableCollections);

	BlockVariableCollections.props({
		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} prevCollections - 可参考上一个收集器集合
		 */
		initRex: function(prevCollections){
			this.rex = prevCollections.rex;
		}
	});

	return BlockVariableCollections;
}(
	this.ECMAScriptVariableCollections
);

this.BlockExpression = function(extractTo){
	/**
	 * 语句块表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function BlockExpression(open, statements){
		PartnerExpression.call(this, open);

		this.contextGeneratorIfNeedCompile = statements.contextGeneratorIfNeedCompile;
	};
	BlockExpression = new Rexjs(BlockExpression, PartnerExpression);
	
	BlockExpression.props({
		contextGeneratorIfNeedCompile: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果存在需要编译的生成器
			if(this.contextGeneratorIfNeedCompile){
				// 直接提取 inner
				this.inner.extractTo(contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});
	
	return BlockExpression;
}(
	PartnerExpression.prototype.extractTo
);

this.BlockBodyStatements = function(ECMAScriptStatements, BraceBodyStatement, BlockVariableCollections){
	/**
	 * 语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function BlockBodyStatements(target){
		ECMAScriptStatements.call(
			this,
			target,
			new BlockVariableCollections(target.collections)
		);

		this.closure = target.closure;
	};
	BlockBodyStatements = new Rexjs(BlockBodyStatements, ECMAScriptStatements);
	
	BlockBodyStatements.props({
		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		declareTo: function(){},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new BraceBodyStatement(this);
		},
		scope: ECMAScriptStatements.SCOPE_BLOCK
	});
	
	return BlockBodyStatements;
}(
	this.ECMAScriptStatements,
	this.BraceBodyStatement,
	this.BlockVariableCollections
);

this.OpenBlockTag = function(OpenBraceTag, BlockExpression, BlockBodyStatements, BlockVariableCollections){
	/**
	 * 起始语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenBlockTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenBlockTag = new Rexjs(OpenBlockTag, OpenBraceTag);
	
	OpenBlockTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeBlockTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new BlockExpression(context, statement.statements);
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 */
		getBoundStatements: function(statements){
			return new BlockBodyStatements(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			context.setExpressionOf(statement);
			// 设置当前语句块
			context.setStatementsOf(parser);
		}
	});
	
	return OpenBlockTag;
}(
	this.OpenBraceTag,
	this.BlockExpression,
	this.BlockBodyStatements,
	this.BlockVariableCollections
);

this.CloseBlockTag = function(CloseBraceTag){
	/**
	 * 结束语句块标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseBlockTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseBlockTag = new Rexjs(CloseBlockTag, CloseBraceTag);
	
	CloseBlockTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
		}
	});
	
	return CloseBlockTag;
}(
	this.CloseBraceTag
);

closeBlockTag = new this.CloseBlockTag();

}.call(
	this,
	// closeBlockTag
	null
);


// 函数表达式相关
!function(extractTo, appendVariable){

this.FunctionExpression = function(appendRange, appendHoisting, compileBody){
	/**
	 * 函数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FunctionExpression(context){
		Expression.call(this, context);
	};
	FunctionExpression = new Rexjs(FunctionExpression, Expression);

	FunctionExpression.props({
		arguments: null,
		body: null,
		/**
		 * 获取当前索引字符串
		 */
		get currentIndexString(){
			return this.variable + ".index.current";
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var defaultArgumentBuilder = new ContentBuilder();

			// 提取函数头部
			this.head.extractTo(contentBuilder);

			// 如果存在星号，说明是生成器
			if(this.star){
				// 如果需要编译
				if(config.es6Base){
					var inner = this.body.inner, collections = inner.collections;

					this.variable = collections.generate();

					// 提取函数名称
					this.name.extractTo(contentBuilder);
					// 提取函数参数
					this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);

					// 追加临时变量名的声明
					contentBuilder.appendString(
						"{var " + collections.rex.toString("", ",", "")
					);
					
					// 追加生成器内部的变量名声明
					this.ranges.forEach(appendRange, contentBuilder);
					// 追加声明语句的分号
					contentBuilder.appendString(";");
					// 追加变量提升表达式
					this.hoistings.forEach(appendHoisting, contentBuilder);

					// 编译主体代码
					compileBody(this, defaultArgumentBuilder, inner, contentBuilder);
					return;
				}

				// 追加星号上下文
				contentBuilder.appendContext(this.star);
			}
			
			// 提取函数名称
			this.name.extractTo(contentBuilder);
			// 提取函数参数
			this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);
			// 提取函数主体
			this.body.extractTo(contentBuilder, defaultArgumentBuilder);
		},
		head: null,
		hoistings: null,
		index: 0,
		name: new DefaultExpression(),
		/**
		 * 设置下一个索引
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		nextIndex: function(contentBuilder){
			return ++this.index;
		},
		ranges: null,
		star: null,
		/**
		 * 转化为生成器
		 * @param {Context} star - 生成器星号上下文
		 */
		toGenerator: function(star){
			this.star = star;
			this.ranges = [];
			this.hoistings = [];
		},
		variable: ""
	});

	return FunctionExpression;
}(
	// appendRange
	function(range){
		range.forEach(appendVariable, this);
	},
	// appendHoisting
	function(hoisting){
		hoisting.extractTo(this);
	},
	// compileBody
	function(expression, defaultArgumentBuilder, inner, contentBuilder){
		var variable = expression.variable, currentIndexString = expression.currentIndexString;

		// 追加迭代器代码
		contentBuilder.appendString(
			defaultArgumentBuilder.result +
			variable +
			"= new Rexjs.FunctionIterator(function(){for(;;){switch(" +
			currentIndexString +
			"){case " +
			expression.index +
			":"
		);

		// 提取函数主体
		extractTo.call(inner, contentBuilder);
		
		// 追加迭代器结束代码及生成器代码
		contentBuilder.appendString(
			"default:" +
			currentIndexString +
			"=NaN;return void 0;}}},this,arguments);return new Rexjs.Generator(" +
			variable +
			");}"
		);
	}
);

this.FunctionTag = function(FunctionExpression){
	/**
	 * 函数标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionTag(_type){
		SyntaxTag.call(this, _type);
	};
	FunctionTag = new Rexjs(FunctionTag, SyntaxTag);

	FunctionTag.props({
		$class: CLASS_EXPRESSION,
		regexp: /function/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			(
				statement.expression = new FunctionExpression(context)
			)
			// 设置函数表达式头部
			.head = new Expression(context);
		}
	});

	return FunctionTag;
}(
	this.FunctionExpression
);

this.StarTag = function(){
	/**
	 * 星号标签
	 * @param {Number} _type - 标签类型
	 */
	function StarTag(_type){
		SyntaxTag.call(this, _type);
	};
	StarTag = new Rexjs(StarTag, SyntaxTag);

	StarTag.props({
		regexp: /\*/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.starContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 将函数表达式转化为生成器
			statement.expression.toGenerator(context);
		}
	});

	return StarTag;
}();

this.FunctionNameTag = function(VariableDeclarationTag, FunctionDeclarationExpression){
	/**
	 * 函数名标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	FunctionNameTag = new Rexjs(FunctionNameTag, VariableDeclarationTag);

	FunctionNameTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionArgumentTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的名称
			statement.expression.name = new Expression(context);
		}
	});

	return FunctionNameTag;
}(
	this.VariableDeclarationTag,
	this.FunctionDeclarationExpression
);

}.call(
	this,
	Rexjs.Statements.prototype.extractTo,
	// appendVariable
	function(variable, contentBuilder){
		contentBuilder.appendString("," + variable);
	}
);


// 函数声明标签相关
!function(FunctionNameTag){

this.FunctionDeclarationExpression = function(FunctionExpression){
	/**
	 * 函数声明表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function FunctionDeclarationExpression(context){
		FunctionExpression.call(this, context);

		this.head = new Expression(context);
	};
	FunctionDeclarationExpression = new Rexjs(FunctionDeclarationExpression, FunctionExpression);

	FunctionDeclarationExpression.props({
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){}
	});

	return FunctionDeclarationExpression;
}(
	this.FunctionExpression
);

this.FunctionDeclarationTag = function(FunctionTag, FunctionDeclarationExpression){
	/**
	 * 函数声明标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionDeclarationTag(_type){
		FunctionTag.call(this, _type);
	};
	FunctionDeclarationTag = new Rexjs(FunctionDeclarationTag, FunctionTag);

	FunctionDeclarationTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionDeclarationContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var functionDeclarationExpression = new FunctionDeclarationExpression(context), generator = statements.contextGeneratorIfNeedCompile;

			// 如果存在需要编译的生成器
			if(generator){
				// 如果处于当前闭包语句块层级，说明要变量提升
				if(statements === statements.closure){
					// 设置当前表达式为空表达式
					statement.expression = new EmptyExpression(null);

					(
						// 设置当前语句
						statements.statement = new BoxStatement(statements)
					)
					// 设置盒语句的表达式
					.expression = functionDeclarationExpression;

					// 记录变量提升表达式
					generator.hoistings.push(functionDeclarationExpression);
					return;
				}
			}

			// 设置当前表达式
			statement.expression = functionDeclarationExpression;
		}
	});

	return FunctionDeclarationTag;
}(
	this.FunctionTag,
	this.FunctionDeclarationExpression
);

this.FunctionDeclarationStarTag = function(StarTag){
	/**
	 * 函数声明星号标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionDeclarationStarTag(_type){
		StarTag.call(this, _type);
	};
	FunctionDeclarationStarTag = new Rexjs(FunctionDeclarationStarTag, StarTag);

	FunctionDeclarationStarTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionDeclarationStarContextTags;
		}
	});

	return FunctionDeclarationStarTag;
}(
	this.StarTag
);

this.FunctionVariableTag = function(visitor){
	/**
	 * 函数变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function FunctionVariableTag(_type){
		FunctionNameTag.call(this, _type);
	};
	FunctionVariableTag = new Rexjs(FunctionVariableTag, FunctionNameTag);

	FunctionVariableTag.props({
		order: ECMAScriptOrders.FUNCTION_VARIABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);
		
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return FunctionVariableTag;
}(
	FunctionNameTag.prototype.visitor
);

}.call(
	this,
	this.FunctionNameTag
);


// 函数参数表达式相关
!function(argumentSeparatorTag, closeArgumentsTag){

this.ArgumentsExpression = function(VariableCollection){
	/**
	 * 函数参数列表表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ArgumentsExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
		this.collection = new VariableCollection();
	};
	ArgumentsExpression = new Rexjs(ArgumentsExpression, PartnerExpression);

	ArgumentsExpression.props({
		collection: null
	});

	return ArgumentsExpression;
}(
	Rexjs.VariableCollection
);

this.ArgumentExpression = function(IdentifierExpression){
	/**
	 * 参数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ArgumentExpression(context){
		IdentifierExpression.call(this, context);
	};
	ArgumentExpression = new Rexjs(ArgumentExpression, IdentifierExpression);

	return ArgumentExpression;
}(
	this.IdentifierExpression
);

this.ArgumentStatement = function(){
	/**
	 * 参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArgumentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArgumentStatement = new Rexjs(ArgumentStatement, ECMAScriptStatement);

	ArgumentStatement.props({
		expression: new DefaultExpression(),
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并获取 inner
			var inner = this.out().arguments.inner;

			// 判断标签内容
			switch(context.content){
				// 如果是逗号（参数名上下文只允许接等于号赋值标签，所以逗号会进入 catch）
				case ",":
					// 添加参数表达式
					inner.add(this.expression);
					// 返回分隔符标签
					return this.tagOf().separator;

				// 如果是结束小括号，则说明是
				case ")":
					// 设置参数表达式（空参数，是默认表达式，要用 set 方法）
					inner.set(this.expression);
					// 返回参数结束小括号标签
					return this.bindingOf();
			}

			// 报错
			parser.error(context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出语句并添加参数表达式
			this.out().arguments.inner.add(this.expression);
			// 返回分隔符标签
			return this.tagOf().separator;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.arguments.open.tag;
		}
	});

	return ArgumentStatement;
}();

this.OpenArgumentsTag = function(OpenParenTag, ArgumentsExpression, ArgumentStatement){
	/**
	 * 起始函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArgumentsTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenArgumentsTag = new Rexjs(OpenArgumentsTag, OpenParenTag);

	OpenArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArgumentsTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return argumentSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openArgumentsContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置函数表达式的的参数
			statement.expression.arguments = new ArgumentsExpression(context);
			// 设置当前语句
			statements.statement = new ArgumentStatement(statements);
		}
	});

	return OpenArgumentsTag;
}(
	this.OpenParenTag,
	this.ArgumentsExpression,
	this.ArgumentStatement
);

this.ArgumentNameTag = function(VariableDeclarationTag, ArgumentExpression){
	/**
	 * 参数名标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ArgumentNameTag = new Rexjs(ArgumentNameTag, VariableDeclarationTag);

	ArgumentNameTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {VariableCollection} collection - 参数名收集器
		 */
		collectTo: function(parser, context, collection){
			var content = context.content;

			// 如果已经定义，说明是重复的参数名
			if(collection.contains(content)){
				// 报错
				parser.error(context, ECMAScriptErrors.DUPLICATE_PARAMETER_NAME);
				return;
			}

			// 参数列表收集变量名
			collection.collect(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.argumentNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statement.target.expression.arguments.collection);

			// 设置当前表达式
			statement.expression = new ArgumentExpression(context);
		}
	});

	return ArgumentNameTag;
}(
	this.VariableDeclarationTag,
	this.ArgumentExpression
);

this.ArgumentSeparatorTag = function(CommaTag, ArgumentStatement){
	/**
	 * 参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ArgumentSeparatorTag = new Rexjs(ArgumentSeparatorTag, CommaTag);

	ArgumentSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.argumentSeparatorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new ArgumentStatement(statements);
		}
	});

	return ArgumentSeparatorTag;
}(
	this.CommaTag,
	this.ArgumentStatement
);

this.CloseArgumentsTag = function(CloseParenTag){
	/**
	 * 结束函数参数标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArgumentsTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseArgumentsTag = new Rexjs(CloseArgumentsTag, CloseParenTag);

	CloseArgumentsTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.functionBodyTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置参数表达式的 close 属性
			statement.expression.arguments.close = context;
		}
	});

	return CloseArgumentsTag;
}(
	this.CloseParenTag
);

argumentSeparatorTag = new this.ArgumentSeparatorTag();
closeArgumentsTag = new this.CloseArgumentsTag();

}.call(
	this,
	// argumentSeparatorTag
	null,
	// closeArgumentsTag
	null
);


// 默认函数参数相关
!function(BasicAssignmentTag){

this.DefaultArgumentExpression = function(ArgumentExpression){
	/**
	 * 省略参数表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DefaultArgumentExpression(context){
		ArgumentExpression.call(this, context);
	};
	DefaultArgumentExpression = new Rexjs(DefaultArgumentExpression, ArgumentExpression);

	DefaultArgumentExpression.props({
		assignment: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 如果需要编译
			if(config.es6Base){
				var context = this.context;

				// 追加参数名至 contentBuilder
				contentBuilder.appendContext(context);

				// 追加参数名至 anotherBuilder
				anotherBuilder.appendContext(context);
				// 判断是否为 undefined
				anotherBuilder.appendString("===void 0&&(");

				// 将赋值表达式提取至临时生成器
				this.assignment.extractTo(anotherBuilder);
				// 再对临时生成器添加分号
				anotherBuilder.appendString(");");
				return;
			}

			// 直接正式提取赋值表达式
			this.assignment.extractTo(contentBuilder);
		}
	});

	return DefaultArgumentExpression;
}(
	this.ArgumentExpression
);

this.ArgumentAssignmentStatement = function(){
	/**
	 * 默认参数赋值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArgumentAssignmentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ArgumentAssignmentStatement = new Rexjs(ArgumentAssignmentStatement, ECMAScriptStatement);

	ArgumentAssignmentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 assignment
			this.out().assignment = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出语句并设置 assignment
				this.out().assignment = this.expression;
			}
		}
	});

	return ArgumentAssignmentStatement;
}();

this.ArgumentAssignmentTag = function(DefaultArgumentExpression, ArgumentAssignmentStatement, visitor){
	/**
	 * 默认参数赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function ArgumentAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	ArgumentAssignmentTag = new Rexjs(ArgumentAssignmentTag, BasicAssignmentTag);

	ArgumentAssignmentTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 设置当前表达式
			statement.expression = new DefaultArgumentExpression(expression.context);

			(
				// 初始化参数赋值语句
				statements.statement = statement = new ArgumentAssignmentStatement(statements)
			)
			// 设置 expression
			.expression = expression;
			
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return ArgumentAssignmentTag;
}(
	this.DefaultArgumentExpression,
	this.ArgumentAssignmentStatement,
	BasicAssignmentTag.prototype.visitor
);

}.call(
	this,
	this.BasicAssignmentTag
);


// 函数省略参数相关
!function(){

this.RestArgumentExpression = function(ArgumentExpression){
	/**
	 * 省略参数表达式
	 * @param {Context} context - 拓展符语法标签上下文
	 * @param {Number} index - 省略参数位于参数列表中的索引
	 */
	function RestArgumentExpression(context, index){
		ArgumentExpression.call(this, context);

		this.index = index;
	};
	RestArgumentExpression = new Rexjs(RestArgumentExpression, ArgumentExpression);

	RestArgumentExpression.props({
		name: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, anotherBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 将默认参数名追加至临时生成器
				anotherBuilder.appendContext(this.name);
				// 将赋值运算追加至临时生成器
				anotherBuilder.appendString("=Rexjs.toArray(arguments," + this.index + ");");
			}
			else {
				// 直接正式添加省略符
				contentBuilder.appendContext(this.context);
			}

			// 正式的追加参数名
			contentBuilder.appendContext(this.name);
		},
		index: 0
	});

	return RestArgumentExpression;
}(
	this.ArgumentExpression
);

this.RestTag = function(SpreadTag, RestArgumentExpression){
	/**
	 * 参数省略符标签
	 * @param {Number} _type - 标签类型
	 */
	function RestTag(_type){
		SpreadTag.call(this, _type);
	};
	RestTag = new Rexjs(RestTag, SpreadTag);

	RestTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new RestArgumentExpression(
				context,
				statement.target.expression.arguments.inner.length
			);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restArgumentNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement){
			// 设置当前表达式
			context.setExpressionOf(statement);
		}
	});

	return RestTag;
}(
	this.SpreadTag,
	this.RestArgumentExpression
);

this.RestArgumentNameTag = function(ArgumentNameTag){
	/**
	 * 省略参数名标签
	 * @param {Number} _type - 标签类型
	 */
	function RestArgumentNameTag(_type){
		ArgumentNameTag.call(this, _type);
	};
	RestArgumentNameTag = new Rexjs(RestArgumentNameTag, ArgumentNameTag);

	RestArgumentNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.restArgumentNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statement.target.expression.arguments.collection);

			// 设置省略参数名
			statement.expression.name = context;
		}
	});

	return RestArgumentNameTag;
}(
	this.ArgumentNameTag
);

this.RestArgumentSeparatorTag = function(ArgumentSeparatorTag){
	/**
	 * 省略参数分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function RestArgumentSeparatorTag(_type){
		ArgumentSeparatorTag.call(this, _type);
	};
	RestArgumentSeparatorTag = new Rexjs(RestArgumentSeparatorTag, ArgumentSeparatorTag);

	RestArgumentSeparatorTag.props({
		$type: TYPE_MATCHABLE,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 报错
			parser.error(statement.expression.context, ECMAScriptErrors.REST_PARAMETER);
		}
	});

	return RestArgumentSeparatorTag;
}(
	this.ArgumentSeparatorTag
);

}.call(
	this
);


// 函数主体表达式相关
!function(closeFunctionBodyTag){

this.FunctionBodyExpression = function(extractTo, insertDefaults){
	/**
	 * 函数主体语句块表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function FunctionBodyExpression(open){
		PartnerExpression.call(this, open);
	};
	FunctionBodyExpression = new Rexjs(FunctionBodyExpression, PartnerExpression);

	FunctionBodyExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		extractTo: function(contentBuilder, defaultArgumentBuilder){
			var defaults = defaultArgumentBuilder.result;

			// 如果没有默认或省略参数
			if(defaults.length === 0){
				// 直接提取函数主体
				extractTo.call(this, contentBuilder);
				return;
			}
			
			// 插入默认参数
			insertDefaults(contentBuilder, this, defaults);
		},
		state: PartnerExpression.STATE_NONE
	});
	
	return FunctionBodyExpression;
}(
	PartnerExpression.prototype.extractTo,
	// insertDefaults
	function(contentBuilder, expression, defaults){
		var inner = expression.inner, builder = new ContentBuilder();
		
		// 追加起始大括号
		contentBuilder.appendContext(expression.open);
		// 提取第一个表达式至临时生成器
		inner[0].expression.extractTo(builder);

		// 判断临时生成器内容
		switch(builder.result){
			// 如果是 'use strict'
			case "'use strict'":
			// 如果是 "use strict"
			case '"use strict"':
				// 正式提取第一个语句
				inner[0].extractTo(contentBuilder);
				// 追加分号
				contentBuilder.appendString(";");

				// 设置 inner 的最小解析索引为 1，即不再解析第一个语句，从第二语句开始
				inner.min = 1;
				break;
		}

		// 提取默认参数
		contentBuilder.appendString(defaults);
		// 提取函数内部语句
		expression.inner.extractTo(contentBuilder);
		// 追加结束大括号
		contentBuilder.appendContext(expression.close);
	}
);

this.FunctionBodyStatements = function(ECMAScriptStatements, ECMAScriptVariableCollections, BraceBodyStatement, VariableIndex){
	/**
	 * 函数主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function FunctionBodyStatements(target){
		ECMAScriptStatements.call(
			this,
			target,
			new ECMAScriptVariableCollections(target.collections.index)
		);
	};
	FunctionBodyStatements = new Rexjs(FunctionBodyStatements, ECMAScriptStatements);
	
	FunctionBodyStatements.props({
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context){
			this.applySuper(parser, context);
		},
		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 */
		applyThis: function(){
			// 什么也不做，即默认允许应用
		},
		/**
		 * 获取当前所处闭包
		 */
		get closure(){
			return this;
		},
		/**
		 * 设置当前所处闭包
		 * @param {Statements} - 需要设置的闭包
		 */
		set closure(value){},
		/**
		 * 获取当前上下文中的生成器
		 */
		get contextGenerator(){
			// 获取函数表达式
			var expression = this.target.statement.target.expression;

			// 如果存在生成器的星号，则返回表达式
			return expression.star ? expression : null;
		},
		/**
		 * 获取当前上下文中需要编译的生成器
		 */
		get contextGeneratorIfNeedCompile(){
			// 如果需要编译，则返回 contextGenerator
			return config.es6Base ? this.contextGenerator : null;
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new BraceBodyStatement(this);
		},
		scope: ECMAScriptStatements.SCOPE_CLOSURE
	});
	
	return FunctionBodyStatements;
}(
	this.ECMAScriptStatements,
	this.ECMAScriptVariableCollections,
	this.BraceBodyStatement,
	Rexjs.VariableIndex
);

this.OpenFunctionBodyTag = function(OpenBraceTag, FunctionBodyExpression, FunctionBodyStatements, forEach){
	/**
	 * 起始函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenFunctionBodyTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenFunctionBodyTag = new Rexjs(OpenFunctionBodyTag, OpenBraceTag);

	OpenFunctionBodyTag.props({
		/**
		 * 获取绑定的函数主体结束标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeFunctionBodyTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context){
			return new FunctionBodyExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new BoxStatement(statements);
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 */
		getBoundStatements: function(statements){
			return new FunctionBodyStatements(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var declarationCollection;
			
			// 再设置当前表达式
			context.setExpressionOf(
				// 先设置当前语句
				context.setStatementOf(statements)
			);
			
			// 最后设置当前语句块
			statements = context.setStatementsOf(parser);

			// 获取函数主体语句块的声明集合
			declarationCollection = statements.collections.declaration;

			// 收集参数名到声明集合下
			forEach(
				statement.expression.arguments.collection,
				declarationCollection.collect,
				declarationCollection
			);
		}
	});

	return OpenFunctionBodyTag;
}(
	this.OpenBraceTag,
	this.FunctionBodyExpression,
	this.FunctionBodyStatements,
	Rexjs.forEach
);

this.CloseFunctionBodyTag = function(CloseBraceTag){
	/**
	 * 结束函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseFunctionBodyTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseFunctionBodyTag = new Rexjs(CloseFunctionBodyTag, CloseBraceTag);

	CloseFunctionBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags, parser){
			return (
				// 如果表达式已结束
				(parser.statements.statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED ?
					tagsMap.mistakableTags :
					tagsMap.expressionContextTags
			);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;

			// 跳出语句并设置表达式的 body 属性
			statement.out().body = statement.expression;
		}
	});

	return CloseFunctionBodyTag;
}(
	this.CloseBraceTag
);

closeFunctionBodyTag = new this.CloseFunctionBodyTag();

}.call(
	this,
	// closeFunctionBodyTag
	null
);


// new.target 表达式相关
!function(ECMAScriptStatements, DotAccessorTag, PropertyNameTag){

this.TargetExpression = function(AccessorExpression){
	/**
	 * new.target 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function TargetExpression(context){
		AccessorExpression.call(this, context, null);
	};
	TargetExpression = new Rexjs(TargetExpression, AccessorExpression);

	TargetExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加 new 关键字
			contentBuilder.appendString("new");
			// 追加点
			contentBuilder.appendContext(this.context);
			// 追加属性
			contentBuilder.appendContext(this.property);
		}
	});

	return TargetExpression;
}(
	this.AccessorExpression
);

this.TargetAccessorTag = function(TargetExpression, visitor){
	/**
	 * target 访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function TargetAccessorTag(_type){
		DotAccessorTag.call(this, _type);
	};
	TargetAccessorTag = new Rexjs(TargetAccessorTag, DotAccessorTag);

	TargetAccessorTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new TargetExpression(context);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.targetAccessorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(
				this,
				parser,
				context,
				// 设置当前语句为 target，目的是因为当前已经不属于一元操作语句
				statements.statement = statement.target,
				statements
			);
		}
	});

	return TargetAccessorTag;
}(
	this.TargetExpression,
	DotAccessorTag.prototype.visitor
);

this.TargetTag = function(SCOPE_CLOSURE, SCOPE_LAZY, visitor){
	/**
	 * target 标签
	 * @param {Number} _type - 标签类型
	 */
	function TargetTag(_type){
		PropertyNameTag.call(this, _type);
	};
	TargetTag = new Rexjs(TargetTag, PropertyNameTag);

	TargetTag.props({
		order: ECMAScriptOrders.TARGET,
		regexp: /target/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var s = statements;

			doBlock:
			do {
				// 判断作用域类型
				switch(s.scope & SCOPE_LAZY){
					// 如果是惰性闭包
					case SCOPE_LAZY:
						break doBlock;

					// 如果是普通闭包
					case SCOPE_CLOSURE:
						// 调用父类方法
						visitor.call(this, parser, context, statement, statements);
						return;

					// 如果不是闭包
					default:
						s = s.target;
						break;
				}
			}
			while(s);

			// 报错
			parser.error(statement.expression.context, ECMAScriptErrors.TARGET);
		}
	});

	return TargetTag;
}(
	ECMAScriptStatements.SCOPE_CLOSURE,
	ECMAScriptStatements.SCOPE_LAZY,
	PropertyNameTag.prototype.visitor
);

}.call(
	this,
	this.ECMAScriptStatements,
	this.DotAccessorTag,
	this.PropertyNameTag
);


// 分组小括号标签相关
!function(IdentifierExpression, ArgumentExpression, DefaultArgumentExpression, RestArgumentExpression, RestTag, groupingSeparatorTag, closeGroupingTag, collectTo){

this.GroupingExpression = function(){
	/**
	 * 分组小括号表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function GroupingExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
	};
	GroupingExpression = new Rexjs(GroupingExpression, PartnerExpression);

	GroupingExpression.props({
		asArguments: false,
		restIndex: -1
	});

	return GroupingExpression;
}();

this.IllegibleRestArgumentExpression = function(){
	/**
	 * 难以辨别的、可能非法的省略参数表达式
	 * @param {Context} context - 拓展符语法标签上下文
	 * @param {Number} index - 省略参数位于参数列表中的索引
	 */
	function IllegibleRestArgumentExpression(context, index){
		RestArgumentExpression.call(this, context, index);
	};
	IllegibleRestArgumentExpression = new Rexjs(IllegibleRestArgumentExpression, RestArgumentExpression);

	IllegibleRestArgumentExpression.props({
		/**
		 * 获取参数名上下文
		 */
		get name(){
			return this.operand.context;
		},
		operand: null
	});

	return IllegibleRestArgumentExpression;
}();

this.GroupingStatement = function(){
	/**
	 * 分组小括号语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function GroupingStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	GroupingStatement = new Rexjs(GroupingStatement, ECMAScriptStatement);
	
	GroupingStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭分组小括号
			if(context.content !== ")"){
				// 报错
				parser.error(context);
				return null;
			}

			var groupingExpression = this.out(), inner = groupingExpression.inner;

			// 设置表达式
			inner.set(this.expression);

			// 如果经过上面设置表达式后，长度还是 0，就说明是空的小括号，就应该是要作为箭头函数参数存在
			if(inner.length === 0){
				// 设置 asArguments，表示这个分组表达式要作为箭头函数的参数使用
				groupingExpression.asArguments = true;
			}

			// 返回关闭分组小括号标签
			return this.bindingOf();
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出该语句并添加表达式
			this.out().inner.add(this.expression);
			return this.tagOf().separator;
		}
	});
	
	return GroupingStatement;
}();

this.IllegibleRestArgumentStatement = function(){
	/**
	 * 难以辨别的、可能非法的省略参数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IllegibleRestArgumentStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	IllegibleRestArgumentStatement = new Rexjs(IllegibleRestArgumentStatement, ECMAScriptStatement);

	IllegibleRestArgumentStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出该语句并设置 operand
			this.out().operand = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 跳出该语句并设置 operand
				this.out().operand = this.expression;
			}
		}
	});

	return IllegibleRestArgumentStatement;
}();

this.GroupingContextStatement = function(ArgumentsExpression, BinaryExpression, ifIdentifier, ifBinary, error){
	/**
	 * 分组小括号上下文语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function GroupingContextStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	GroupingContextStatement = new Rexjs(GroupingContextStatement, ECMAScriptStatement);

	GroupingContextStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return this.try(parser, context);
		},
		/**
		 * 获取当前语句表达式
		 */
		get expression(){
			return this.target.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.out();

			// 如果不是箭头符号
			if(context.content !== "=>"){
				// 如果要作为参数，即 有省略参数符号 或 空的小括号
				if(expression.asArguments){
					// 报错
					error(parser, expression);
				}

				return;
			}

			var inner = expression.inner, argumentsExpression = new ArgumentsExpression(expression.open);

			// 遍历项
			for(var i = 0, j = inner.length;i < j;i++){
				var exp = inner[i];

				switch(true){
					// 如果是标识符表达式
					case exp instanceof IdentifierExpression:
						i = ifIdentifier(parser, exp, argumentsExpression, i, j);
						break;

					// 如果是二元表达式
					case exp instanceof BinaryExpression:
						i = ifBinary(parser, exp, argumentsExpression, i, j);
						break;

					default:
						// 报错
						parser.error(exp.context);
						return;
				}
			}

			// 设置参数表达式的 close
			argumentsExpression.close = expression.close;
			// 将分组小括号表达式转化成参数列表表达式，并替换分组小括号表达式
			this.target.expression = argumentsExpression;
		}
	});

	return GroupingContextStatement;
}(
	this.ArgumentsExpression,
	this.BinaryExpression,
	// ifIdentifier
	function(parser, expression, argumentsExpression, i, j){
		var context;

		// 如果是省略参数表达式
		if(expression instanceof RestArgumentExpression){
			// 如果省略参数不是最后一项
			if(i !== j - 1){
				// 报错
				parser.error(expression.context, ECMAScriptErrors.REST_PARAMETER);
				return j;
			}

			var operand = expression.operand;

			// 如果省略符的操作对象是标识符表达式
			if(operand instanceof IdentifierExpression){
				context = operand.context;
			}
			else {
				// 报错
				parser.error(expression.operand.context);
				return j;
			}
		}
		// 如果不是省略参数表达式，那么就是普通形式的参数
		else {
			context = expression.context;
			expression = new ArgumentExpression(context);
		}

		// 收集参数名
		collectTo.call(context.tag, parser, context, argumentsExpression.collection);
		// 添加参数表达式
		argumentsExpression.inner.add(expression);
		return i;
	},
	// ifBinary
	function(parser, expression, argumentsExpression, i, j){
		var left = expression.left, context = left.context;

		switch(false){
			// 如果左侧表达式不是标识符表达式
			case left instanceof IdentifierExpression:
				// 报错
				parser.error(left);
				return j;

			// 如果不是等于号
			case expression.context.content === "=":
				// 报错
				parser.error(expression.context);
				return j;

			// 默认，即默认值参数表达式
			default:
				var defaultArgumentExpression = new DefaultArgumentExpression(context);

				// 设置默认参数表达式的 assignment 属性
				defaultArgumentExpression.assignment = expression;
	
				// 收集参数名
				collectTo.call(context.tag, parser, context, argumentsExpression.collection);
				// 添加默认参数表达式
				argumentsExpression.inner.add(defaultArgumentExpression);
				return i;
		}
	},
	// error
	function(parser, expression){
		var restIndex = expression.restIndex;

		parser.error(restIndex > -1 ? expression.inner[restIndex].context : expression.close);
	}
);

this.OpenGroupingTag = function(OpenParenTag, GroupingExpression, GroupingStatement){
	/**
	 * 起始分组小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenGroupingTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenGroupingTag = new Rexjs(OpenGroupingTag, OpenParenTag);
	
	OpenGroupingTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeGroupingTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return groupingSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openGroupingContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new GroupingExpression(context);
			// 设置当前语句
			statements.statement = new GroupingStatement(statements);
		}
	});
	
	return OpenGroupingTag;
}(
	this.OpenParenTag,
	this.GroupingExpression,
	this.GroupingStatement
);

this.IllegibleRestTag = function(IllegibleRestArgumentExpression, IllegibleRestArgumentStatement, visitor){
	/**
	 * 难以辨别的、可能非法的省略参数标签
	 * @param {Number} _type - 标签类型
	 */
	function IllegibleRestTag(_type){
		RestTag.call(this, _type);
	};
	IllegibleRestTag = new Rexjs(IllegibleRestTag, RestTag);

	IllegibleRestTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new IllegibleRestArgumentExpression(
				context,
				statement.target.expression.inner.length
			);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var groupingExpression = statement.target.expression;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 设置当前语句
			statements.statement = new IllegibleRestArgumentStatement(statements);

			// 如果已经标记过该属性
			if(groupingExpression.asArguments){
				return;
			}
			
			// 设置表达式属性，标识视为参数
			groupingExpression.asArguments = true;
			// 设置参数起始索引
			groupingExpression.restIndex = groupingExpression.inner.length;
		}
	});

	return IllegibleRestTag;
}(
	this.IllegibleRestArgumentExpression,
	this.IllegibleRestArgumentStatement,
	RestTag.prototype.visitor
);

this.GroupingSeparatorTag = function(CommaTag, GroupingStatement){
	/**
	 * 分组小括号分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function GroupingSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	GroupingSeparatorTag = new Rexjs(GroupingSeparatorTag, CommaTag);

	GroupingSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openGroupingContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new GroupingStatement(statements);
		}
	});

	return GroupingSeparatorTag;
}(
	this.CommaTag,
	this.GroupingStatement
);

this.CloseGroupingTag = function(CloseParenTag, GroupingContextStatement){
	/**
	 * 结束分组小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseGroupingTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseGroupingTag = new Rexjs(CloseGroupingTag, CloseParenTag);
	
	CloseGroupingTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 close
			statement.expression.close = context;
			// 设置当前语句
			statements.statement = new GroupingContextStatement(statements);
		}
	});
	
	return CloseGroupingTag;
}(
	this.CloseParenTag,
	this.GroupingContextStatement
);

groupingSeparatorTag = new this.GroupingSeparatorTag();
closeGroupingTag = new this.CloseGroupingTag();

}.call(
	this,
	this.IdentifierExpression,
	this.ArgumentExpression,
	this.DefaultArgumentExpression,
	this.RestArgumentExpression,
	this.RestTag,
	// groupingSeparatorTag
	null,
	// closeGroupingTag
	null,
	this.ArgumentNameTag.prototype.collectTo
);


// 箭头函数相关
!function(FunctionExpression, ArgumentsExpression, OpenFunctionBodyTag, CloseFunctionBodyTag, closeArrowFunctionBodyTag){

this.ArrowFunctionExpression = function(){
	/**
	 * 箭头函数表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} args - 函数参数列表表达式
	 */
	function ArrowFunctionExpression(context, args){
		FunctionExpression.call(this, context);

		this.arguments = args;
	};
	ArrowFunctionExpression = new Rexjs(ArrowFunctionExpression, FunctionExpression);

	ArrowFunctionExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var defaultArgumentBuilder = new ContentBuilder();

			// 如果需要编译
			if(config.es6Base){
				/*
					这里有包括了两层函数，
					因为箭头函数里的 this 与 arguments 都是指向外层的，箭头函数自己没有 arguments
				*/

				var args = this.arguments;

				// 追加外层函数头部代码
				contentBuilder.appendString("(function");
				// 提取并编译函数参数
				args.compileTo(contentBuilder, defaultArgumentBuilder);
				// 追加内层函数头部代码 与 默认参数
				contentBuilder.appendString("{" + defaultArgumentBuilder.result + "return function()");

				/*
					设置默认参数为“连接所有参数名后的字符串”
					1. 因为默认参数在上面已经被追加至 contentBuilder 内
					2. 由于两层函数，但实际运行是内层函数，而函数参数是设置在外层函数上，
					所以运行时，设置 debugger，会无法获取参数信息，
					所以要在内层函数上引用一次所有参数，以方便 debugger
				*/
				defaultArgumentBuilder.result = args.collection.toString("", ",", ";");

				// 提取并编译函数主体
				this.body.compileTo(contentBuilder, defaultArgumentBuilder);
				// 追加两层函数的尾部代码
				contentBuilder.appendString(".apply(this[0],this[1])}.bind([this, arguments]))");
				return;
			}
			
			// 提取参数
			this.arguments.extractTo(contentBuilder, defaultArgumentBuilder);
			// 追加箭头符号
			contentBuilder.appendContext(this.context);
			// 提取函数主体
			this.body.extractTo(contentBuilder, defaultArgumentBuilder);
		}
	});

	return ArrowFunctionExpression;
}();

this.SingleArgumentExpression = function(ArgumentsExpression, ArgumentExpression){
	/**
	 * 单参数表达式
	 * @param {Context} argumentContext - 参数上下文
	 */
	function SingleArgumentExpression(argumentContext){
		ArgumentsExpression.call(this, null);

		// 添加参数表达式
		this.inner.add(
			new ArgumentExpression(argumentContext)
		);

		// 收集参数名
		this.collection.collect(argumentContext.content);
	};
	SingleArgumentExpression = new Rexjs(SingleArgumentExpression, ArgumentsExpression);

	SingleArgumentExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加参数起始小括号
			contentBuilder.appendString("(");
			// 提取参数名
			this.inner.extractTo(contentBuilder);
			// 追加参数结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取参数名
			this.inner.extractTo(contentBuilder);
		}
	});

	return SingleArgumentExpression;
}(
	this.ArgumentsExpression,
	this.ArgumentExpression
);

this.ArrowFunctionBodyExpression = function(FunctionBodyExpression){
	/**
	 * 箭头函数主体表达式
	 * @param {Expression} inner - 函数主体返回值表达式
	 */
	function ArrowFunctionBodyExpression(inner){
		FunctionBodyExpression.call(this, null);

		this.inner = inner;
	};
	ArrowFunctionBodyExpression = new Rexjs(ArrowFunctionBodyExpression, FunctionBodyExpression);

	ArrowFunctionBodyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		compileTo: function(contentBuilder, defaultArgumentBuilder){
			var defaults = defaultArgumentBuilder.result;

			// 追加函数主体起始大括号
			contentBuilder.appendString("{");

			// 如果没有默认或省略参数
			if(defaults.length > 0){
				// 插入默认参数
				contentBuilder.appendString(defaults);
			}

			// 追加 return 关键字
			contentBuilder.appendString("return ");
			// 提取函数主体返回值表达式
			this.inner.extractTo(contentBuilder);
			// 追加 表达式结束分号 与 函数主体结束大括号
			contentBuilder.appendString(";}");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} defaultArgumentBuilder - 默认参数生成器
		 */
		extractTo: function(contentBuilder, defaultArgumentBuilder){
			// 如果有默认参数
			if(defaultArgumentBuilder.result.length > 0){
				// 进行编译
				this.compileTo(contentBuilder, defaultArgumentBuilder);
				return;
			}

			// 直接提取函数主体返回值表达式
			this.inner.extractTo(contentBuilder);
		}
	});

	return ArrowFunctionBodyExpression;
}(
	this.FunctionBodyExpression
);

this.ArrowContextStatement = function(SingleStatement, ArrowFunctionBodyExpression){
	/**
	 * 箭头符号上下文语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ArrowContextStatement(statements){
		SingleStatement.call(this, statements);
	};
	ArrowContextStatement = new Rexjs(ArrowContextStatement, SingleStatement);

	ArrowContextStatement.props({
		expression: new DefaultExpression(),
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = new ArrowFunctionBodyExpression(this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				this.requestOut(parser, context);
			}
		}
	});

	return ArrowContextStatement;
}(
	this.SingleStatement,
	this.ArrowFunctionBodyExpression
);

this.ArrowTag = function(ExpressionSeparatorTag, ArrowFunctionExpression, SingleArgumentExpression, IdentifierExpression, ArgumentsExpression, ArrowContextStatement){
	/**
	 * 箭头标签
	 * @param {Number} _type - 标签类型
	 */
	function ArrowTag(_type){
		ExpressionSeparatorTag.call(this, _type);
	};
	ArrowTag = new Rexjs(ArrowTag, ExpressionSeparatorTag);

	ArrowTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		// 防止与“=”冲突
		order: ECMAScriptOrders.ARROW,
		regexp: /=>/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.arrowContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			switch(true){
				// 如果是标识符表达式
				case expression instanceof IdentifierExpression:
					// 设置当前表达式
					statement.expression = new ArrowFunctionExpression(
						context,
						new SingleArgumentExpression(expression.context)
					);
					break;

				// 如果是参数列表表达式
				case expression instanceof ArgumentsExpression:
					// 设置当前表达式
					statement.expression = new ArrowFunctionExpression(context, expression);
					break;

				default:
					// 报错
					parser.error(expression);
					return;
			}

			// 如果箭头符号换行了
			if((expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE){
				// 报错
				parser.error(context, ECMAScriptErrors.NEWLINE_BEFORE_ARROW);
				return;
			}

			// 设置当前语句
			statements.statement = new ArrowContextStatement(statements);
		}
	});

	return ArrowTag;
}(
	this.ExpressionSeparatorTag,
	this.ArrowFunctionExpression,
	this.SingleArgumentExpression,
	this.IdentifierExpression,
	this.ArgumentsExpression,
	this.ArrowContextStatement
);

this.OpenArrowFunctionBodyTag = function(SCOPE_LAZY, visitor){
	/**
	 * 起始箭头函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArrowFunctionBodyTag(_type){
		OpenFunctionBodyTag.call(this, _type);
	};
	OpenArrowFunctionBodyTag = new Rexjs(OpenArrowFunctionBodyTag, OpenFunctionBodyTag);

	OpenArrowFunctionBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArrowFunctionBodyTag;
		},
		order: ECMAScriptOrders.OPEN_ARROW_FUNCTION_BODY,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 跳出当前语句
			statement.out();
			// 调用父类方法
			visitor.call(this, parser, context, statements.statement, statements);

			// 将 FunctionBodyStatements 作用域设置为惰性闭包
			parser.statements.scope = SCOPE_LAZY;
		}
	});

	return OpenArrowFunctionBodyTag;
}(
	this.ECMAScriptStatements.SCOPE_LAZY,
	OpenFunctionBodyTag.prototype.visitor
);

this.CloseArrowFunctionBodyTag = function(visitor){
	/**
	 * 结束箭头函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArrowFunctionBodyTag(_type){
		CloseFunctionBodyTag.call(this, _type);
	};
	CloseArrowFunctionBodyTag = new Rexjs(CloseArrowFunctionBodyTag, CloseFunctionBodyTag);

	CloseArrowFunctionBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closeArrowFunctionBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式状态
			statement.expression.state = STATE_STATEMENT_ENDABLE;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return CloseArrowFunctionBodyTag;
}(
	CloseFunctionBodyTag.prototype.visitor
);

closeArrowFunctionBodyTag = new this.CloseArrowFunctionBodyTag();

}.call(
	this,
	this.FunctionExpression,
	this.ArgumentsExpression,
	this.OpenFunctionBodyTag,
	this.CloseFunctionBodyTag,
	// closeArrowFunctionBodyTag
	null
);


// 对象属性相关
!function(){

this.PropertyExpression = function(BinaryExpression){
	/**
	 * 对象属性表达式
	 */
	function PropertyExpression(){
		BinaryExpression.call(this, null, null);
	};
	PropertyExpression = new Rexjs(PropertyExpression, BinaryExpression);

	PropertyExpression.props({
		/**
		 * 获取该属性是否为访问器属性
		 */
		get accessible(){
			return this.named(this.accessor);
		},
		accessor: null,
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 如果是访问器
			if(this.accessible){
				// 追加 defineProperty 的调用
				contentBuilder.appendString("Object.defineProperty(" + anotherBuilder.result + ",");
				// 提取属性名
				this.name.defineTo(contentBuilder);
				// 追加属性描述符
				contentBuilder.appendString(",{configurable:true,enumerable:true,");
				// 追加访问器内容
				contentBuilder.appendString(this.accessor.content);
				// 提取属性值
				this.value.defineTo(contentBuilder);
				// 追加结束调用
				contentBuilder.appendString("}),");
				return;
			}

			// 追加临时变量名
			contentBuilder.appendString(anotherBuilder.result);
			// 编译属性名
			this.name.compileTo(contentBuilder);
			// 编译属性值
			this.value.compileTo(contentBuilder);
			// 追加表达式分隔符逗号
			contentBuilder.appendString(",");
		},
		/**
		 * 获取标签上下文
		 */
		get context(){
			return this.value.context;
		},
		/**
		 * 设置标签上下文
		 * @parma {Context} value - 标签上下文
		 */
		set context(value){},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var name = this.name, value = this.value;

			// 如果是访问器
			if(this.accessible){
				// 追加访问器
				contentBuilder.appendContext(this.accessor);
				// 追加空格
				contentBuilder.appendSpace();
				// 提取属性名称
				name.extractTo(contentBuilder);
				// 直接以简写形式提取表达式文本内容
				value.shortTo(contentBuilder);
				return;
			}

			// 如果存在星号，说明是生成器属性
			if(this.star){
				// 如果需要编译
				if(config.es6Base){
					// 提取属性名称
					name.extractTo(contentBuilder);
					// 以定义属性的模式提取表达式文本内容
					value.defineTo(contentBuilder);
					return;
				}

				// 设置生成器属性的属性名称
				value.operand.name = this.name;
				
				// 提取属性值
				value.extractTo(contentBuilder);
				return;
			}

			// 提取属性名称
			name.extractTo(contentBuilder);
			// 提取属性值
			value.extractTo(contentBuilder);
		},
		/**
		 * 获取该二元表达式所关联的最后一个二元表达式
		 */
		get last(){
			return this;
		},
		/**
		 * 设置该二元表达式所关联的最后一个二元表达式
		 * @parma {BinaryExpression} value - 二元表达式
		 */
		set last(value){},
		/**
		 * 获取该二元表达式的左侧表达式
		 */
		get left(){
			return this.name;
		},
		/**
		 * 设置该二元表达式的左侧表达式
		 * @parma {Expression} value - 左侧表达式
		 */
		set left(value){},
		name: null,
		/**
		 * 判断非属性名标签上下文是否已经用于属性名
		 * @param {Context} context - 需要判断的指定标签
		 */
		named: function(context){
			switch(context){
				// 如果 context 不存在
				case null:
					break;

				// 如果 context 仅仅是属性名
				case this.name.context:
					break;

				default:
					return true;
			}

			return false;
		},
		/**
		 * 请求获取相关对象表达式的临时变量名，如果没有，则先生成变量名
		 * @param {Statements} statements - 对象表达式所处的语句块
		 * @param {ObjectExpression} objectExpression - 对象表达式
		 */
		requestVariableOf: function(statements, objectExpression){
			var variable = objectExpression.variable;

			// 如果对象变量不存在
			if(!variable){
				// 给对象表达式生成并记录变量名
				objectExpression.variable = variable = statements.collections.generate();
			}

			return variable;
		},
		/**
		 * 获取该二元表达式的右侧表达式
		 */
		get right(){
			return this.value.operand;
		},
		/**
		 * 设置该二元表达式的右侧表达式
		 * @parma {Expression} value - 左侧表达式
		 */
		set right(value){},
		star: null,
		/**
		 * 给相关对象表达式设置编译时所需使用的临时变量名
		 * @param {Statements} statements - 对象表达式所处的语句块
		 * @param {ObjectExpression} objectExpression - 对象表达式
		 */
		setCompiledVariableTo: function(statements, objectExpression){
			// 请求获取相关对象表达式的临时变量名
			this.requestVariableOf(statements, objectExpression);

			// 将对象表达式设置为需要编译
			objectExpression.needCompile = true;
		},
		value: null
	});

	return PropertyExpression;
}(
	this.BinaryExpression
);

this.PropertyValueExpression = function(){
	/**
	 * 对象属性值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function PropertyValueExpression(context){
		Expression.call(this, context);
	};
	PropertyValueExpression = new Rexjs(PropertyValueExpression, Expression);

	PropertyValueExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			this.extractTo(contentBuilder);
		},
		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		destructTo: function(contentBuilder, anotherBuilder){
			// 如果是子解构项
			if(this.destructuringItem){
				// 提取操作对象
				this.operand.compileTo(contentBuilder, anotherBuilder);
				return;
			}

			// 追加表达式分隔符
			contentBuilder.appendString(",");
			// 提取操作对象
			this.operand.extractTo(contentBuilder);
			// 追加赋值操作表达式
			contentBuilder.appendString("=" + anotherBuilder.result);
		},
		destructuringItem: false,
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加赋值符号
			contentBuilder.appendString("=");
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加冒号分隔符
			contentBuilder.appendContext(this.context);
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		},
		operand: null
	});

	return PropertyValueExpression;
}();

this.PropertyValueStatement = function(setOperand){
	/**
	 * 对象属性值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PropertyValueStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	PropertyValueStatement = new Rexjs(PropertyValueStatement, ECMAScriptStatement);

	PropertyValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 设置 operand
			setOperand(this);
		},
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 设置 operand
				setOperand(this);
			}
		}
	});

	return PropertyValueStatement;
}(
	// setOperand
	function(statement){
		// 跳出语句并设置 operand
		statement.out().value.operand = statement.expression;
	}
);

this.PropertyStatement = function(PropertyExpression, ifComma){
	/**
	 * 对象属性语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PropertyStatement(statements){
		ECMAScriptStatement.call(this, statements);

		this.initExpression();
	};
	PropertyStatement = new Rexjs(PropertyStatement, ECMAScriptStatement);

	PropertyStatement.props({
		assigned: false,
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context);
				return null;
			}

			var expression = this.expression, objectExpression = this.out();

			switch(true){
				// 如果名称不存在，说明表达式是空项
				case !expression.name:
					break;

				// 如果可能是访问器
				case expression.accessible:
					// 核对访问器函数
					expression.accessor.tag.checkFunction(parser, expression.value.operand, context);

				default:
					// 跳出语句并添加表达式
					objectExpression.inner.add(expression);
					break;
			}

			return this.bindingOf();
		},
		/**
		 * 初始化该语句的表达式
		 */
		initExpression: function(){
			this.expression = new PropertyExpression();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			switch(context.content){
				// 如果是冒号
				case ":":
				// 如果是等于号
				case "=":
					// 如果已经赋值过，即 键值对值 或 属性默认值
					if(this.assigned){
						break;
					}

					this.assigned = true;
					return null;

				// 如果是逗号
				case ",":
					return ifComma(parser, this, this.expression, context);
			}

			// 报错
			parser.error(context);
		}
	});

	return PropertyStatement;
}(
	this.PropertyExpression,
	// ifComma
	function(parser, statement, expression, context){
		// 如果是属性访问器
		if(expression.accessible){
			// 核对访问器函数
			expression.accessor.tag.checkFunction(
				parser,
				expression.value.operand,
				context
			);
		}

		// 跳出语句并
		statement.out().inner.add(expression);
		// 返回分隔符标签
		return statement.tagOf().separator;
	}
);

this.PropertyNameSeparatorTag = function(ColonTag, PropertyValueExpression, PropertyValueStatement){
	/**
	 * 对象属性名称的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyNameSeparatorTag(_type){
		ColonTag.call(this, _type);
	};
	PropertyNameSeparatorTag = new Rexjs(PropertyNameSeparatorTag, ColonTag);

	PropertyNameSeparatorTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置对象属性表达式的值
			statement.expression.value = new PropertyValueExpression(context);
			// 设置当前语句
			statements.statement = new PropertyValueStatement(statements);
		}
	});

	return PropertyNameSeparatorTag;
}(
	this.ColonTag,
	this.PropertyValueExpression,
	this.PropertyValueStatement
);

}.call(
	this
);


// 对象字面量属性名相关
!function(require, requireOfMethodName, visitor, visitorOfMathematicalNumeral){

this.LiteralPropertyNameExpression = function(){
	/**
	 * 对象字面量属性名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LiteralPropertyNameExpression(context){
		Expression.call(this, context);
	};
	LiteralPropertyNameExpression = new Rexjs(LiteralPropertyNameExpression, Expression);

	LiteralPropertyNameExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加起始中括号
			contentBuilder.appendString("[");
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
			// 追加结束中括号
			contentBuilder.appendString("]");
		}
	});

	return LiteralPropertyNameExpression;
}();

require = function(){
	/**
	 * 获取此标签接下来所需匹配的标签列表
	 * @param {TagsMap} tagsMap - 标签集合映射
	 */
	return function(tagsMap){
		return tagsMap.propertyNameContextTags;
	};
}();

requireOfMethodName = function(){
	/**
	 * 获取此标签接下来所需匹配的标签列表
	 * @param {TagsMap} tagsMap - 标签集合映射
	 */
	return function(tagsMap){
		return tagsMap.shorthandMethodArgumentsTags;
	};
}();

visitor = function(LiteralPropertyNameExpression){
	/**
	 * 标签访问器
	 * @param {SyntaxParser} parser - 语法解析器
	 * @param {Context} context - 标签上下文
	 * @param {Statement} statement - 当前语句
	 * @param {Statements} statements - 当前语句块
	 */
	return function(parser, context, statement){
		// 设置表达式的 name 属性
		statement.expression.name = new LiteralPropertyNameExpression(context);
	};
}(
	this.LiteralPropertyNameExpression
);

visitorOfMathematicalNumeral = function(){
	/**
	 * 标签访问器
	 * @param {SyntaxParser} parser - 语法解析器
	 * @param {Context} context - 标签上下文
	 * @param {Statement} statement - 当前语句
	 * @param {Statements} statements - 当前语句块
	 */
	return function(parser, context, statement, statements){
		// 如果需要编译
		if(config.es6Base){
			// 给对象表达式设置临时变量名
			statement.expression.setCompiledVariableTo(
				statements,
				statement.target.expression
			);
		}
		
		// 调用 visitor 方法
		visitor.call(this, parser, context, statement, statements);
	};
}();

this.StringPropertyNameTag = function(StringTag){
	/**
	 * 字符串属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function StringPropertyNameTag(_type){
		StringTag.call(this, _type);
	};
	StringPropertyNameTag = new Rexjs(StringPropertyNameTag, StringTag);

	StringPropertyNameTag.props({
		require: require,
		visitor: visitor
	});

	return StringPropertyNameTag;
}(
	this.StringTag
);

this.StringMethodNameTag = function(StringPropertyNameTag){
	/**
	 * 字符串方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function StringMethodNameTag(context){
		StringPropertyNameTag.call(this, context);
	};
	StringMethodNameTag = new Rexjs(StringMethodNameTag, StringPropertyNameTag);

	StringMethodNameTag.props({
		require: requireOfMethodName
	});

	return StringMethodNameTag;
}(
	this.StringPropertyNameTag
);

this.NumberPropertyNameTag = function(NumberTag){
	/**
	 * 数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberPropertyNameTag(_type){
		NumberTag.call(this, _type);
	};
	NumberPropertyNameTag = new Rexjs(NumberPropertyNameTag, NumberTag);

	NumberPropertyNameTag.props({
		require: require,
		visitor: visitor
	});

	return NumberPropertyNameTag;
}(
	this.NumberTag
);

this.NumberMethodNameTag = function(NumberPropertyNameTag){
	/**
	 * 数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberMethodNameTag(context){
		NumberPropertyNameTag.call(this, context);
	};
	NumberMethodNameTag = new Rexjs(NumberMethodNameTag, NumberPropertyNameTag);

	NumberMethodNameTag.props({
		require: requireOfMethodName
	});

	return NumberMethodNameTag;
}(
	this.NumberPropertyNameTag
);

this.BinaryNumberPropertyNameTag = function(BinaryNumberTag){
	/**
	 * 二进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberPropertyNameTag(_type){
		BinaryNumberTag.call(this, _type);
	};
	BinaryNumberPropertyNameTag = new Rexjs(BinaryNumberPropertyNameTag, BinaryNumberTag);
	
	BinaryNumberPropertyNameTag.props({
		require: require,
		visitor: visitorOfMathematicalNumeral
	});
	
	return BinaryNumberPropertyNameTag;
}(
	this.BinaryNumberTag
);

this.BinaryNumberMethodNameTag = function(BinaryNumberPropertyNameTag){
	/**
	 * 二进制数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberMethodNameTag(context){
		BinaryNumberPropertyNameTag.call(this, context);
	};
	BinaryNumberMethodNameTag = new Rexjs(BinaryNumberMethodNameTag, BinaryNumberPropertyNameTag);

	BinaryNumberMethodNameTag.props({
		require: requireOfMethodName
	});

	return BinaryNumberMethodNameTag;
}(
	this.BinaryNumberPropertyNameTag
);

this.OctalNumberPropertyNameTag = function(OctalNumberTag){
	/**
	 * 八进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberPropertyNameTag(_type){
		OctalNumberTag.call(this, _type);
	};
	OctalNumberPropertyNameTag = new Rexjs(OctalNumberPropertyNameTag, OctalNumberTag);
	
	OctalNumberPropertyNameTag.props({
		require: require,
		visitor: visitorOfMathematicalNumeral
	});
	
	return OctalNumberPropertyNameTag;
}(
	this.OctalNumberTag
);

this.OctalNumberMethodNameTag = function(OctalNumberPropertyNameTag){
	/**
	 * 八进制数字方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberMethodNameTag(context){
		OctalNumberPropertyNameTag.call(this, context);
	};
	OctalNumberMethodNameTag = new Rexjs(OctalNumberMethodNameTag, OctalNumberPropertyNameTag);

	OctalNumberMethodNameTag.props({
		require: requireOfMethodName
	});

	return OctalNumberMethodNameTag;
}(
	this.OctalNumberPropertyNameTag
);

}.call(
	this,
	// require
	null,
	// requireOfMethodName
	null,
	// visitor
	null,
	// visitorOfMathematicalNumeral
	null
);


// 对象标识符属性名相关
!function(PropertySeparatorTag, RegExp){

this.IdentifierPropertyNameExpression = function(LiteralPropertyNameExpression){
	/**
	 * 对象标识符属性名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function IdentifierPropertyNameExpression(context){
		LiteralPropertyNameExpression.call(this, context);
	};
	IdentifierPropertyNameExpression = new Rexjs(IdentifierPropertyNameExpression, LiteralPropertyNameExpression);

	IdentifierPropertyNameExpression.props({
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加起始双引号
			contentBuilder.appendString('"');
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
			// 追加结束双引号
			contentBuilder.appendString('"');
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加点访问器
			contentBuilder.appendString(".");
			// 追加属性名上下文
			contentBuilder.appendContext(this.context);
		}
	});

	return IdentifierPropertyNameExpression;
}(
	this.LiteralPropertyNameExpression
);

this.ShorthandPropertyValueExpression = function(PropertyValueExpression){
	/**
	 * 简写属性值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ShorthandPropertyValueExpression(context){
		PropertyValueExpression.call(this, context);
	};
	ShorthandPropertyValueExpression = new Rexjs(ShorthandPropertyValueExpression, PropertyValueExpression);

	ShorthandPropertyValueExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加冒号和变量名
			contentBuilder.appendString("=" + this.context.content);
		},
		/**
		 * 以解构方式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		destructTo: function(contentBuilder, anotherBuilder){
			// 追加逗号表达式分隔符
			contentBuilder.appendString(",");
			// 追加变量名
			contentBuilder.appendContext(this.context);
			// 追加赋值表达式
			contentBuilder.appendString("=" + anotherBuilder.result);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 追加冒号和变量名
				contentBuilder.appendString(":" + this.context.content);
			}
		}
	});

	return ShorthandPropertyValueExpression;
}(
	this.PropertyValueExpression
);

this.IdentifierPropertyValueStatement = function(PropertyValueStatement, ShorthandPropertyValueExpression){
	/**
	 * 对象标识符属性值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IdentifierPropertyValueStatement(statements){
		PropertyValueStatement.call(this, statements);
	};
	IdentifierPropertyValueStatement = new Rexjs(IdentifierPropertyValueStatement, PropertyValueStatement);

	IdentifierPropertyValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句
			var propertyExpression = this.out();

			// 设置 value 为简写属性值表达式
			propertyExpression.value = new ShorthandPropertyValueExpression(propertyExpression.name.context);
		},
		expression: new DefaultExpression(),
		try: function(parser, context){
			// 跳出语句
			var propertyExpression = this.out();

			// 如果是逗号
			if(context.content === ","){
				// 设置 value 为简写属性值表达式
				propertyExpression.value = new ShorthandPropertyValueExpression(propertyExpression.name.context);
			}
		}
	});

	return IdentifierPropertyValueStatement;
}(
	this.PropertyValueStatement,
	this.ShorthandPropertyValueExpression
);

this.IdentifierPropertyNameTag = function(IdentifierTag, IdentifierPropertyNameExpression, ShorthandPropertyValueExpression){
	/**
	 * 标识符属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierPropertyNameTag(_type){
		IdentifierTag.call(this, _type);
	};
	IdentifierPropertyNameTag = new Rexjs(IdentifierPropertyNameTag, IdentifierTag);

	IdentifierPropertyNameTag.props({
		order: ECMAScriptOrders.IDENTIFIER_PROPERTY_NAME,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.identifierPropertyNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 设置表达式的 name 属性
			expression.name = new IdentifierPropertyNameExpression(context);
			// 设置当前语句
			expression.value = new ShorthandPropertyValueExpression(context);
		}
	});

	return IdentifierPropertyNameTag;
}(
	this.IdentifierTag,
	this.IdentifierPropertyNameExpression,
	this.ShorthandPropertyValueExpression
);

this.IdentifierMethodNameTag = function(IdentifierPropertyNameTag){
	/**
	 * 标识符方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierMethodNameTag(context){
		IdentifierPropertyNameTag.call(this, context);
	};
	IdentifierMethodNameTag = new Rexjs(IdentifierMethodNameTag, IdentifierPropertyNameTag);

	IdentifierMethodNameTag.props({
		regexp: new RegExp(IDENTIFIER_REGEXP_SOURCE),
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodArgumentsTags;
		}
	});

	return IdentifierMethodNameTag;
}(
	this.IdentifierPropertyNameTag
);

this.WordPropertyNameTag = function(IdentifierPropertyNameTag, POSTFIX_REGEXP_SOURCE){
	/**
	 * 词组属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function WordPropertyNameTag(_type){
		IdentifierPropertyNameTag.call(this, _type);
	};
	WordPropertyNameTag = new Rexjs(WordPropertyNameTag, IdentifierPropertyNameTag);

	WordPropertyNameTag.static({
		/**
		 * 编译该标识符的表达式
		 * @param {String} identifier - 需提供的标识符，并该正则只匹配该标识符
		 */
		compileRegExp: function(identifier){
			return new RegExp(identifier + POSTFIX_REGEXP_SOURCE);
		}
	});

	WordPropertyNameTag.props({
		order: ECMAScriptOrders.WORD_PROPERTY_NAME,
		regexp: /[A-Za-z]+/
	});

	return WordPropertyNameTag;
}(
	this.IdentifierPropertyNameTag,
	// POSTFIX_REGEXP_SOURCE
	"(?!\\d+|\\d*" + IDENTIFIER_REGEXP_SOURCE + ")"
);

this.KeywordPropertyNameTag = function(WordPropertyNameTag, IdentifierPropertyNameExpression){
	/**
	 * 关键字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function KeywordPropertyNameTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	KeywordPropertyNameTag = new Rexjs(KeywordPropertyNameTag, WordPropertyNameTag);

	KeywordPropertyNameTag.props({
		order: ECMAScriptOrders.KEYWORD_PROPERTY_NAME,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 name 属性
			statement.expression.name = new IdentifierPropertyNameExpression(context); 
		}
	});

	return KeywordPropertyNameTag;
}(
	this.WordPropertyNameTag,
	this.IdentifierPropertyNameExpression
);

}.call(
	this,
	this.PropertySeparatorTag,
	RegExp
);


// 属性初始值标签相关
!function(PropertyValueExpression){

this.PropertyInitializerExpression = function(extractTo, toTernary){
	/**
	 * 属性初始值表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} variable - 对象简写属性所对应的变量名
	 */
	function PropertyInitializerExpression(context, variable){
		PropertyValueExpression.call(this, context);

		this.variable = variable;
	};
	PropertyInitializerExpression = new Rexjs(PropertyInitializerExpression, PropertyValueExpression);

	PropertyInitializerExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 以三元表达式的形式追加
			toTernary(contentBuilder, this, "=");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.rexjs){
				// 以三元表达式的形式追加
				toTernary(contentBuilder, this, ":");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		variable: null
	});

	return PropertyInitializerExpression;
}(
	PropertyValueExpression.prototype.extractTo,
	// toTernary
	function(contentBuilder, expression, assignment){
		var variableContent = expression.variable.context.content;
			
		// 追加 undefined 判断
		contentBuilder.appendString(
			assignment + variableContent + "===void 0?"
		);

		// 提取属性值
		expression.operand.extractTo(contentBuilder);

		// 追加三元运算的否定结果表达式
		contentBuilder.appendString(
			":" + variableContent
		);
	}
);

this.PropertyInitializerTag = function(BasicAssignmentTag, PropertyInitializerExpression, PropertyValueStatement){
	/**
	 * 属性初始值标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyInitializerTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	PropertyInitializerTag = new Rexjs(PropertyInitializerTag, BasicAssignmentTag);

	PropertyInitializerTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new PropertyInitializerExpression(context, statement.expression.name);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置属性表达式的值
			statement.expression.value = this.getBoundExpression(context, statement);
			// 设置当前语句
			statements.statement = new PropertyValueStatement(statements);
		}
	});

	return PropertyInitializerTag;
}(
	this.BasicAssignmentTag,
	this.PropertyInitializerExpression,
	this.PropertyValueStatement
);

}.call(
	this,
	this.PropertyValueExpression
);


// 对象计算式属性相关
!function(closeComputedPropertyNameTag, closeComputedMethodNameTag){

this.ComputedPropertyNameExpression = function(){
	/**
	 * 属性计算式表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ComputedPropertyNameExpression(open){
		PartnerExpression.call(this, open);
	};
	ComputedPropertyNameExpression = new Rexjs(ComputedPropertyNameExpression, PartnerExpression);

	ComputedPropertyNameExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			this.extractTo(contentBuilder);
		},
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 追加起始小括号，防止 inner 里面是逗号表达式，会出现意外
			contentBuilder.appendString("(");
			// 提取 inner
			this.inner.extractTo(contentBuilder);
			// 追加结束小括号
			contentBuilder.appendString(")");
		}
	});

	return ComputedPropertyNameExpression;
}();

this.ObjectComputedNameStatement = function(){
	/**
	 * 对象计算式语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ObjectComputedNameStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ObjectComputedNameStatement = new Rexjs(ObjectComputedNameStatement, ECMAScriptStatement);

	ObjectComputedNameStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束中括号
			if(context.content !== "]"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 inner
			this.out().name.inner = this.expression;
			// 返回结束标签
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.name.context.tag;
		},
		try: function(parser, context){
			// 如果是逗号
			if(context.content === ","){
				// 报错
				parser.error(context);
			}
		}
	})

	return ObjectComputedNameStatement;
}();

this.OpenComputedPropertyNameTag = function(OpenBracketTag, ComputedPropertyNameExpression, ObjectComputedNameStatement){
	/**
	 * 起始对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenComputedPropertyNameTag(_type){
		OpenBracketTag.call(this, _type);
	};
	OpenComputedPropertyNameTag = new Rexjs(OpenComputedPropertyNameTag, OpenBracketTag);

	OpenComputedPropertyNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeComputedPropertyNameTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 name 属性
			statement.expression.name = new ComputedPropertyNameExpression(context);

			// 如果需要编译
			if(config.es6Base){
				// 给对象表达式设置临时变量名
				statement.expression.setCompiledVariableTo(
					statements,
					statement.target.expression
				);
			}
			
			// 设置当前属性
			statements.statement = new ObjectComputedNameStatement(statements);
		}
	});

	return OpenComputedPropertyNameTag;
}(
	this.OpenBracketTag,
	this.ComputedPropertyNameExpression,
	this.ObjectComputedNameStatement
);

this.CloseComputedPropertyNameTag = function(CloseBracketTag){
	/**
	 * 结束对象计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseComputedPropertyNameTag(_type){
		CloseBracketTag.call(this, _type);
	};
	CloseComputedPropertyNameTag = new Rexjs(CloseComputedPropertyNameTag, CloseBracketTag);

	CloseComputedPropertyNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.name.close = context;
		}
	});

	return CloseComputedPropertyNameTag;
}(
	this.CloseBracketTag
);

this.OpenComputedMethodNameTag = function(OpenComputedPropertyNameTag){
	/**
	 * 起始计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenComputedMethodNameTag(context){
		OpenComputedPropertyNameTag.call(this, context);
	};
	OpenComputedMethodNameTag = new Rexjs(OpenComputedMethodNameTag, OpenComputedPropertyNameTag);

	OpenComputedMethodNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeComputedPropertyNameTag;
		}
	});

	return OpenComputedMethodNameTag;
}(
	this.OpenComputedPropertyNameTag
);

this.CloseComputedMethodNameTag = function(CloseComputedPropertyNameTag){
	/**
	 * 结束计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseComputedMethodNameTag(context){
		CloseComputedPropertyNameTag.call(this, context);
	};
	CloseComputedMethodNameTag = new Rexjs(CloseComputedMethodNameTag, CloseComputedPropertyNameTag);

	CloseComputedMethodNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodArgumentsTags;
		}
	});

	return CloseComputedMethodNameTag;
}(
	this.CloseComputedPropertyNameTag
);

closeComputedPropertyNameTag = new this.CloseComputedPropertyNameTag();
closeComputedMethodNameTag = new this.CloseComputedMethodNameTag();

}.call(
	this,
	// closeComputedPropertyNameTag
	null,
	// closeComputedMethodNameTag
	null
);


// 对象简写方法相关
!function(OpenArgumentsTag, closeShorthandMethodArgumentsTag, closeShorthandMethodBodyTag){

this.ShorthandMethodExpression = function(FunctionExpression){
	/**
	 * 简写方法表达式
	 */
	function ShorthandMethodExpression(){
		FunctionExpression.call(this, null);
	};
	ShorthandMethodExpression = new Rexjs(ShorthandMethodExpression, FunctionExpression);

	ShorthandMethodExpression.props({
		head: new DefaultExpression()
	});

	return ShorthandMethodExpression;
}(
	this.FunctionExpression
);
	
this.ShorthandMethodValueExpression = function(PropertyValueExpression, CompiledExpression, complie){
	/**
	 * 简写方法值表达式
	 */
	function ShorthandMethodValueExpression(){
		PropertyValueExpression.call(this, null);
	};
	ShorthandMethodValueExpression = new Rexjs(ShorthandMethodValueExpression, PropertyValueExpression);

	ShorthandMethodValueExpression.props({
		/**
		 * 以函数参数模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		argumentTo: function(contentBuilder){
			// 编译表达式
			complie(this, contentBuilder, "");
		},
		/**
		 * 以定义属性的模式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		defineTo: function(contentBuilder){
			// 编译表达式
			complie(this, contentBuilder, ":");
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 编译表达式
			complie(this, contentBuilder, "=");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 以定义属性的模式提取表达式文本内容
				this.defineTo(contentBuilder);
				return;
			}

			// 直接以简写形式提取表达式文本内容
			this.shortTo(contentBuilder);
		},
		/**
		 * 直接以简写形式提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		shortTo: function(contentBuilder){
			// 提取属性值
			this.operand.extractTo(contentBuilder);
		}
	});

	return ShorthandMethodValueExpression;
}(
	this.PropertyValueExpression,
	Rexjs.CompiledExpression,
	// complie
	function(expression, contentBuilder, separator){
		// 追加 赋值等于号 和 函数头部
		contentBuilder.appendString(separator + "function");
		// 直接以简写形式提取表达式文本内容
		expression.shortTo(contentBuilder);
	}
);

this.ShorthandMethodValueStatement = function(PropertyValueStatement, ShorthandMethodExpression){
	/**
	 * 对象简写方法值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ShorthandMethodValueStatement(statements){
		PropertyValueStatement.call(this, statements);

		this.expression = new ShorthandMethodExpression();
	};
	ShorthandMethodValueStatement = new Rexjs(ShorthandMethodValueStatement, PropertyValueStatement);

	ShorthandMethodValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return this.try(parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 跳出语句并设置属性值表达式的 operand 属性
			this.out().value.operand = this.expression;
		}
	});

	return ShorthandMethodValueStatement;
}(
	this.PropertyValueStatement,
	this.ShorthandMethodExpression
);

this.ShorthandMethodBodyStatements = function(FunctionBodyStatements){
	/**
	 * 简写方法主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function ShorthandMethodBodyStatements(target){
		FunctionBodyStatements.call(this, target);
	};
	ShorthandMethodBodyStatements = new Rexjs(ShorthandMethodBodyStatements, FunctionBodyStatements);

	ShorthandMethodBodyStatements.props({
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(){},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			// 报错
			parser.error(open, ECMAScriptErrors.SUPER_CALL);
		}
	});

	return ShorthandMethodBodyStatements;
}(
	this.FunctionBodyStatements
);

this.PropertyStarTag = function(StarTag){
	/**
	 * 函数声明星号标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyStarTag(_type){
		StarTag.call(this, _type);
	};
	PropertyStarTag = new Rexjs(PropertyStarTag, StarTag);

	PropertyStarTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置属性表达式的星号
			statement.expression.star = context;
		}
	});

	return PropertyStarTag;
}(
	this.StarTag
);

this.OpenShorthandMethodArgumentsTag = function(ShorthandMethodValueExpression, ShorthandMethodValueStatement, visitor){
	/**
	 * 对象起始简写方法参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenShorthandMethodArgumentsTag(_type){
		OpenArgumentsTag.call(this, _type);
	};
	OpenShorthandMethodArgumentsTag = new Rexjs(OpenShorthandMethodArgumentsTag, OpenArgumentsTag);

	OpenShorthandMethodArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeShorthandMethodArgumentsTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyExpression = statement.expression, star = propertyExpression.star;

			// 设置对象属性表达式的属性值
			propertyExpression.value = new ShorthandMethodValueExpression();
			// 初始化简写方法值语句
			statement = new ShorthandMethodValueStatement(statements);
			
			// 如果星号存在
			if(star){
				// 将简写函数表达式转化为生成器
				statement.expression.toGenerator(star);
			}

			// 设置当前语句
			statements.statement = statement;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return OpenShorthandMethodArgumentsTag;
}(
	this.ShorthandMethodValueExpression,
	this.ShorthandMethodValueStatement,
	OpenArgumentsTag.prototype.visitor
);

this.CloseShorthandMethodArgumentsTag = function(CloseArgumentsTag){
	/**
	 * 对象结束简写方法参数标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseShorthandMethodArgumentsTag(_type){
		CloseArgumentsTag.call(this, _type);
	};
	CloseShorthandMethodArgumentsTag = new Rexjs(CloseShorthandMethodArgumentsTag, CloseArgumentsTag);

	CloseShorthandMethodArgumentsTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.shorthandMethodBodyTags;
		}
	});

	return CloseShorthandMethodArgumentsTag;
}(
	this.CloseArgumentsTag
);

this.OpenShorthandMethodBodyTag = function(OpenFunctionBodyTag, ShorthandMethodBodyStatements){
	/**
	 * 对象简写方法参数起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenShorthandMethodBodyTag(_type){
		OpenFunctionBodyTag.call(this, _type);
	};
	OpenShorthandMethodBodyTag = new Rexjs(OpenShorthandMethodBodyTag, OpenFunctionBodyTag);

	OpenShorthandMethodBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeShorthandMethodBodyTag;
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 */
		getBoundStatements: function(statements){
			return new ShorthandMethodBodyStatements(statements);
		}
	});

	return OpenShorthandMethodBodyTag;
}(
	this.OpenFunctionBodyTag,
	this.ShorthandMethodBodyStatements
);

this.CloseShorthandMethodBodyTag = function(CloseFunctionBodyTag){
	/**
	 * 对象简写方法参数结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseShorthandMethodBodyTag(_type){
		CloseFunctionBodyTag.call(this, _type);
	};
	CloseShorthandMethodBodyTag = new Rexjs(CloseShorthandMethodBodyTag, CloseFunctionBodyTag);

	CloseShorthandMethodBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertySeparatorTags;
		}
	});

	return CloseShorthandMethodBodyTag;
}(
	this.CloseFunctionBodyTag
);

closeShorthandMethodArgumentsTag = new this.CloseShorthandMethodArgumentsTag();
closeShorthandMethodBodyTag = new this.CloseShorthandMethodBodyTag();

}.call(
	this,
	this.OpenArgumentsTag,
	// closeShorthandMethodArgumentsTag
	null,
	// closeShorthandMethodBodyTag
	null
);


// 对象属性访问器相关
!function(WordPropertyNameTag){

this.PropertyAccessorTag = function(FunctionExpression, AccessorStatement, visitor){
	/**
	 * 对象属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertyAccessorTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	PropertyAccessorTag = new Rexjs(PropertyAccessorTag, WordPropertyNameTag);

	PropertyAccessorTag.props({
		/**
		 * 核对表达式是否为满足条件的函数表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Expression} expression - 需要核对的表达式
		 * @param {Context} context- 当前解析内容的上下文
		 */
		checkFunction: function(parser, expression, context){
			// 如果是函数表达式
			if(expression instanceof FunctionExpression){
				var length = expression.arguments.inner.length;
				
				switch(true){
					// 如果长度小于最小参数长度
					case length < this.minArgs:
						// 报错
						parser.error(
							(
								expression.arguments.inner[this.minArgs] || expression.arguments
							)
							.context,
							ECMAScriptErrors[this.errorType]
						);
						break;

					// 如果长度大于最大参数长度
					case length > this.maxArgs:
						// 报错
						parser.error(
							(
								expression.arguments.inner[this.maxArgs] || expression.arguments
							)
							.context,
							ECMAScriptErrors[this.errorType]
						);
						break;

					default:
						return true;
				}
			}
			else {
				// 报错
				parser.error(context);
			}
			
			return false;
		},
		errorType: "",
		maxArgs: 0,
		minArgs: 0,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyAccessorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 accessor 属性，记录 context
			statement.expression.accessor = context;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return PropertyAccessorTag;
}(
	this.FunctionExpression,
	this.AccessorStatement,
	WordPropertyNameTag.prototype.visitor
);

this.GetTag = function(PropertyAccessorTag){
	/**
	 * 对象属性访问器 get 标签
	 * @param {Number} _type - 标签类型
	 */
	function GetTag(_type){
		PropertyAccessorTag.call(this, _type);
	};
	GetTag = new Rexjs(GetTag, PropertyAccessorTag);

	GetTag.props({
		errorType: "GETTER",
		regexp: PropertyAccessorTag.compileRegExp("get")
	});

	return GetTag;
}(
	this.PropertyAccessorTag
);

this.SetTag = function(PropertyAccessorTag){
	/**
	 * 对象属性访问器 set 标签
	 * @param {Number} _type - 标签类型
	 */
	function SetTag(_type){
		PropertyAccessorTag.call(this, _type);
	};
	SetTag = new Rexjs(SetTag, PropertyAccessorTag);

	SetTag.props({
		errorType: "SETTER",
		maxArgs: 1,
		minArgs: 1,
		regexp: PropertyAccessorTag.compileRegExp("set")
	});

	return SetTag;
}(
	this.PropertyAccessorTag
);

}.call(
	this,
	this.WordPropertyNameTag
);


// 对象属性拓展项相关
!function(){

this.PropertySpreadExpression = function(PropertyExpression, SpreadExpression){
	/**
	 * 属性拓展表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function PropertySpreadExpression(context){
		PropertyExpression.call(this);

		// 设置属性值
		this.value = new SpreadExpression(context);
	};
	PropertySpreadExpression = new Rexjs(PropertySpreadExpression, PropertyExpression);

	PropertySpreadExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 追加对象赋值方法
			contentBuilder.appendString("Rexjs.SpreadItem.assign(" + anotherBuilder.result + ",");
			// 提取操作对象
			this.value.operand.extractTo(contentBuilder);
			// 追加方法结束小括号以及属性分隔符逗号
			contentBuilder.appendString("),");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 直接提取属性值
			this.value.extractTo(contentBuilder);
		},
		name: new DefaultExpression()
	});

	return PropertySpreadExpression;
}(
	this.PropertyExpression,
	this.SpreadExpression
);

this.PropertySpreadTag = function(SpreadTag, PropertySpreadExpression, SpreadStatement){
	/**
	 * 对象属性拓展项标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertySpreadTag(_type){
		SpreadTag.call(this, _type);
	};
	PropertySpreadTag = new Rexjs(PropertySpreadTag, SpreadTag);
	
	PropertySpreadTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = new PropertySpreadExpression(context), boxStatement = new BoxStatement(statements);

			// 如果需要编译
			if(config.es6Base){
				// 给对象表达式设置临时变量名
				statement.expression.setCompiledVariableTo(
					statements,
					statement.target.expression
				);
			}

			// 设置当前语句的表达式
			statement.expression = expression;
			// 设置盒语句的表达式，以模拟环境
			boxStatement.expression = expression.value;
			// 设置当前语句，以模拟环境
			statements.statement = boxStatement;
			// 再次设置当前语句
			statements.statement = new SpreadStatement(statements);
		}
	});
	
	return PropertySpreadTag;
}(
	this.SpreadTag,
	this.PropertySpreadExpression,
	this.SpreadStatement
);

}.call(
	this
);


// 对象相关
!function(DestructuringExpression, propertySeparatorTag, closeObjectTag, destructItem){

this.ObjectDestructuringExpression = function(){
	/**
	 * 对象解构表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ObjectDestructuringExpression(origin){
		DestructuringExpression.call(this, origin.open, origin);
	};
	ObjectDestructuringExpression = new Rexjs(ObjectDestructuringExpression, DestructuringExpression);

	ObjectDestructuringExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 遍历的提取每一项
			this.origin.inner.forEach(destructItem, contentBuilder, anotherBuilder);
		}
	});

	return ObjectDestructuringExpression;
}();

this.ObjectDestructuringItemExpression = function(DestructuringItemExpression){
	/**
	 * 对象解构项表达式
	 * @param {Expression} origin - 解构赋值源表达式
	 */
	function ObjectDestructuringItemExpression(origin){
		DestructuringItemExpression.call(this, origin);
	};
	ObjectDestructuringItemExpression = new Rexjs(ObjectDestructuringItemExpression, DestructuringItemExpression);

	ObjectDestructuringItemExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var builder = new ContentBuilder();

			// 追加初始化解构目标代码
			builder.appendString("new Rexjs.ObjectDestructuringTarget(" + anotherBuilder.result + ")");

			// 遍历的提取每一项
			this.origin.inner.forEach(
				destructItem,
				contentBuilder,
				this.getVariableBuilder(contentBuilder, builder)
			);
		}
	});

	return ObjectDestructuringItemExpression;
}(
	this.DestructuringItemExpression
);

this.ObjectExpression = function(
	DestructibleExpression, ObjectDestructuringExpression, ObjectDestructuringItemExpression,
	PropertyDestructuringItemExpression, PropertyDestructuringRestItemExpression, PropertyDestructuringDefaultItemExpression,
	LiteralPropertyNameExpression, ComputedPropertyNameExpression, ShorthandMethodExpression, PropertyInitializerExpression,
	IdentifierExpression, AssignableExpression, BinaryExpression, SpreadExpression,
	BasicAssignmentTag,
	extractTo, compileItem, collected, error
){
	/**
	 * 对象表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ObjectExpression(open){
		DestructibleExpression.call(this, open);
	};
	ObjectExpression = new Rexjs(ObjectExpression, DestructibleExpression);

	ObjectExpression.props({
		/**
		 * 将对象每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(parser){
			var inner = this.inner;

			// 遍历
			for(var i = inner.min, j = inner.length;i < j;i++){
				var expression = inner[i], name = expression.name, value = expression.value, operand = value.operand;

				// 判断属性名
				switch(true){
					// 如果是字面量属性名
					case name instanceof LiteralPropertyNameExpression:
						// 如果是简写属性
						if(!operand){
							// 如果已经被收集到常量内
							if(collected(parser, name, true)){
								return;
							}

							// 转化表达式
							expression = new PropertyDestructuringItemExpression(expression);
							break;
						}

						// 如果是简写属性默认值表达式
						if(value instanceof PropertyInitializerExpression){
							// 转化表达式
							expression = new PropertyDestructuringDefaultItemExpression(expression, expression, parser.statements);
							break;
						}

					// 如果是计算式属性名
					case name instanceof ComputedPropertyNameExpression:
						// 判断属性值，这里一定会对应上面的属性名判断，因为在匹配标签上下文的时候，就已经保护了表达式的正确性
						switch(true){
							// 如果是可赋值的属性值
							case operand instanceof AssignableExpression:
								// 如果已经被收集到常量内
								if(collected(parser, operand, operand instanceof IdentifierExpression)){
									return;
								}

								// 转化表达式
								expression = new PropertyDestructuringItemExpression(expression);
								break;

							// 如果是二元表达式
							case operand instanceof BinaryExpression:
								// 如果二元运算表达式的标签是赋值符号
								if(operand.context.tag instanceof BasicAssignmentTag){
									// 如果二元表达式左侧不是解构表达式
									if(!(operand.left instanceof DestructuringExpression)){
										// 转化表达式
										expression = new PropertyDestructuringDefaultItemExpression(expression, operand, parser.statements);
										break;
									}
								}

								// 报错
								error(parser, operand);
								return;

							// 如果是可解构的表达式
							case operand instanceof DestructibleExpression:
								// 表明是嵌套解构子项
								value.destructuringItem = true;
								// 转化为解构子项
								value.operand = operand.toDestructuringItem(parser);

								// 转化表达式
								expression = new PropertyDestructuringItemExpression(expression);
								break;

							// 如果是简写表达式
							case operand instanceof ShorthandMethodExpression:
								// 报错
								error(parser, expression.accessible ? name : operand.arguments);
								return;

							default:
								// 报错
								error(parser, operand);
								return;
						}

						break;

					// 如果是拓展表达式
					case value instanceof SpreadExpression:
						// 如果不是对象最后一项
						if(i !== j - 1){
							// 报错
							error(parser, expression, "REST_ELEMENT");
							return;
						}

						// 如果是可赋值的属性值
						if(operand instanceof AssignableExpression){
							// 如果已经被收集到常量内
							if(collected(parser, operand, operand instanceof IdentifierExpression)){
								return;
							}

							// 转化表达式
							expression = new PropertyDestructuringRestItemExpression(expression);
							break;
						}

						// 报错
						error(parser, operand);
						return;

					default:
						// 报错
						error(parser, name);
						return;
				}

				// 重新设置表达式
				inner[i] = inner.latest = expression;
			}
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var variable = this.variable;

			// 如果存在变量名，说明需要分步设置属性
			if(this.needCompile){
				var anotherBuilder = new ContentBuilder();

				// 追加临时变量名
				anotherBuilder.appendString(variable);
				// 追加临时变量名赋值代码
				contentBuilder.appendString("(" + variable + "={},");
				// 编译内容
				this.inner.forEach(compileItem, contentBuilder, anotherBuilder);
				// 追加结束小括号
				contentBuilder.appendString(variable + ")");
				return;
			}

			// 如果要将该对象用临时变量名记录
			if(variable){
				// 追加变量名赋值代码
				contentBuilder.appendString("(" + variable + "=");
				// 调用父类方法
				extractTo.call(this, contentBuilder);
				// 追加结束小括号
				contentBuilder.appendString(")");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		needCompile: false,
		/**
		 * 转换为解构表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuring: function(parser){
			// 转换内部表达式
			this.convert(parser, this.inner);
			return new ObjectDestructuringExpression(this);
		},
		/**
		 * 转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		toDestructuringItem: function(parser){
			var inner = this.inner, expression = new ObjectDestructuringItemExpression(this);

			// 如果需要解析 而且 长度大于 1（长度为 0 不解析，长度为 1，只需取一次对象，所以都不需要生成变量名）
			if(config.es6Base && inner.length > 1){
				// 设置变量名
				this.setVariableOf(expression, parser.statements);
			}

			// 转换内部表达式
			this.convert(parser, this.inner);
			return expression;
		},
		variable: ""
	});

	return ObjectExpression;
}(
	this.DestructibleExpression,
	this.ObjectDestructuringExpression,
	this.ObjectDestructuringItemExpression,
	this.PropertyDestructuringItemExpression,
	this.PropertyDestructuringRestItemExpression,
	this.PropertyDestructuringDefaultItemExpression,
	this.LiteralPropertyNameExpression,
	this.ComputedPropertyNameExpression,
	this.ShorthandMethodExpression,
	this.PropertyInitializerExpression,
	this.IdentifierExpression,
	this.AssignableExpression,
	this.BinaryExpression,
	this.SpreadExpression,
	this.BasicAssignmentTag,
	PartnerExpression.prototype.extractTo,
	// compileItem
	function(item, contentBuilder, anotherBuilder){
		item.compileTo(contentBuilder, anotherBuilder);
	},
	// collected
	function(parser, expression, identifier){
		// 如果是标识符表达式
		if(identifier){
			var context = expression.context;

			// 判断是否收集到常量中
			return context.tag.collected(parser, context, parser.statements);
		}

		return false;
	},
	// error
	function(parser, expression, _errorName){
		parser.error(
			expression.context,
			_errorName ? ECMAScriptErrors[_errorName] : null
		);
	}
);

this.OpenObjectTag = function(OpenBraceTag, ObjectExpression, PropertyStatement){
	/**
	 * 起始对象标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenObjectTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenObjectTag = new Rexjs(OpenObjectTag, OpenBraceTag);

	OpenObjectTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeObjectTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new ObjectExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new PropertyStatement(statements);
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return propertySeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});

	return OpenObjectTag;
}(
	this.OpenBraceTag,
	this.ObjectExpression,
	this.PropertyStatement
);

this.PropertySeparatorTag = function(CommaTag, PropertyStatement){
	/**
	 * 对象属性的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function PropertySeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	PropertySeparatorTag = new Rexjs(PropertySeparatorTag, CommaTag);

	PropertySeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new PropertyStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.propertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			context.setStatementOf(statements);
		}
	});

	return PropertySeparatorTag;
}(
	this.CommaTag,
	this.PropertyStatement
);

this.CloseObjectTag = function(CloseBraceTag){
	/**
	 * 结束对象标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseObjectTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseObjectTag = new Rexjs(CloseObjectTag, CloseBraceTag);

	CloseObjectTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructibleExpressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 close
			statement.expression.close = context;
		}
	});

	return CloseObjectTag;
}(
	this.CloseBraceTag
);

propertySeparatorTag = new this.PropertySeparatorTag();
closeObjectTag = new this.CloseObjectTag();

}.call(
	this,
	this.DestructuringExpression,
	// propertySeparatorTag
	null,
	// closeObjectTag
	null,
	// destructItem
	function(expression, contentBuilder, anotherBuilder){
		expression.compileTo(contentBuilder, anotherBuilder);
	}
);


// 对象声明解构赋值相关
!function(PropertyDestructuringItemExpression, PropertyStatement, OpenObjectTag, variableDeclarationPropertySeparatorTag, closeDeclarationObjectTag){
	
this.DeclarationObjectExpression = function(ObjectExpression){
	/**
	 * 变量声明数组表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} objectOf - 该对象声明所处语句的表达式
	 */
	function DeclarationObjectExpression(open, objectOf){
		ObjectExpression.call(this, open);

		this.objectOf = objectOf;
	};
	DeclarationObjectExpression = new Rexjs(DeclarationObjectExpression, ObjectExpression);

	DeclarationObjectExpression.props({
		/**
		 * 将对象每一项转换为解构项表达式
		 * @param {SyntaxParser} parser - 语法解析器
		 */
		convert: function(){},
		declaration: true,
		objectOf: null
	});

	return DeclarationObjectExpression;
}(
	this.ObjectExpression
);

this.PropertyDestructuringStatement = function(catchMethod, tryMethod, both){
	/**
	 * 对象属性解构语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PropertyDestructuringStatement(statements){
		PropertyStatement.call(this, statements);
	};
	PropertyDestructuringStatement = new Rexjs(PropertyDestructuringStatement, PropertyStatement);

	PropertyDestructuringStatement.props({
		bound: null,
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var bound = this.bound;

			return both(parser, this, context, bound, bound, catchMethod);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			return both(parser, this, context, this.bound, context.content === ",", tryMethod);
		}
	});

	return PropertyDestructuringStatement;
}(
	PropertyStatement.prototype.catch,
	PropertyStatement.prototype.try,
	// both
	function(parser, statement, context, bound, condition, method){
		// 如果满足条件
		if(condition){
			var tag, inner = statement.target.expression.inner;

			// 调用父类方法
			tag = method.call(statement, parser, context);

			// 替换为解构项表达式
			inner[inner.length - 1] = inner.latest = bound;
			return tag;
		}

		return method.call(statement, parser, context);
	}
);

this.OpenDeclarationObjectTag = function(DeclarationObjectExpression, PropertyDestructuringStatement, visitor){
	/**
	 * 变量声明对象起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenDeclarationObjectTag(_type){
		OpenObjectTag.call(this, _type);
	};
	OpenDeclarationObjectTag = new Rexjs(OpenDeclarationObjectTag, OpenObjectTag);

	OpenDeclarationObjectTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeDeclarationObjectTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new DeclarationObjectExpression(
				context,
				this.getObjectOf(statement)
			);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new PropertyDestructuringStatement(statements);
		},
		/**
		 * 获取拥有该对象的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getObjectOf: function(statement){
			return statement.target.expression;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return variableDeclarationPropertySeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyNameTags;
		}
	});

	return OpenDeclarationObjectTag;
}(
	
	this.DeclarationObjectExpression,
	this.PropertyDestructuringStatement,
	OpenObjectTag.prototype.visitor
);

this.DeclarationPropertySeparatorTag = function(PropertySeparatorTag, PropertyDestructuringStatement){
	/**
	 * 对象属性的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertySeparatorTag(_type){
		PropertySeparatorTag.call(this, _type);
	};
	DeclarationPropertySeparatorTag = new Rexjs(DeclarationPropertySeparatorTag, PropertySeparatorTag);

	DeclarationPropertySeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new PropertyDestructuringStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyNameTags;
		}
	});

	return DeclarationPropertySeparatorTag;
}(
	this.PropertySeparatorTag,
	this.PropertyDestructuringStatement
);

this.CloseDeclarationObjectTag = function(CloseObjectTag){
	/**
	 * 结束变量声明对象标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseDeclarationObjectTag(_type){
		CloseObjectTag.call(this, _type);
	};
	CloseDeclarationObjectTag = new Rexjs(CloseDeclarationObjectTag, CloseObjectTag);

	CloseDeclarationObjectTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.destructuringAssignmentTags;
		}
	});

	return CloseDeclarationObjectTag;
}(
	this.CloseObjectTag
);

variableDeclarationPropertySeparatorTag = new this.DeclarationPropertySeparatorTag();
closeDeclarationObjectTag = new this.CloseDeclarationObjectTag();

}.call(
	this,
	this.PropertyDestructuringItemExpression,
	this.PropertyStatement,
	this.OpenObjectTag,
	// variableDeclarationPropertySeparatorTag
	null,
	// closeDeclarationObjectTag
	null
);


// 对象解构声明的属性名相关
!function(IdentifierPropertyNameTag, PropertyDestructuringItemExpression, closeComputedDeclarationPropertyNameTag, require){

this.IdentifierDeclarationPropertyNameStatement = function(both){
	/**
	 * 标识符声明属性名称语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IdentifierDeclarationPropertyNameStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	IdentifierDeclarationPropertyNameStatement = new Rexjs(IdentifierDeclarationPropertyNameStatement, ECMAScriptStatement);

	IdentifierDeclarationPropertyNameStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			return both(
				parser,
				this,
				context.content === "}"
			);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			return both(
				parser,
				this,
				context.content === ","
			);
		}
	});

	return IdentifierDeclarationPropertyNameStatement;
}(
	// both
	function(parser, statement, isSeparator){
		// 跳出语句并获取表达式
		var expression = statement.out();

		// 如果是分隔符
		if(isSeparator){
			var context = expression.name.context, variable = statement.target.target.expression.objectOf.context.tag.variable;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			context.tag = variable;

			// 收集变量名
			variable.collectTo(parser, context, parser.statements);

			// 绑定解构项表达式
			statement.target.bound = new PropertyDestructuringItemExpression(expression);
		}

		return null;
	}
);

this.IdentifierDeclarationPropertyNameTag = function(IdentifierDeclarationPropertyNameStatement, visitor){
	/**
	 * 标识符声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function IdentifierDeclarationPropertyNameTag(_type){
		IdentifierPropertyNameTag.call(this, _type);
	};
	IdentifierDeclarationPropertyNameTag = new Rexjs(IdentifierDeclarationPropertyNameTag, IdentifierPropertyNameTag);

	IdentifierDeclarationPropertyNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.identifierDeclarationPropertyNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 设置当前语句
			statements.statement = new IdentifierDeclarationPropertyNameStatement(statements);
		}
	});

	return IdentifierDeclarationPropertyNameTag;
}(
	this.IdentifierDeclarationPropertyNameStatement,
	IdentifierPropertyNameTag.prototype.visitor
);

this.NumberDeclarationPropertyNameTag = function(NumberPropertyNameTag){
	/**
	 * 数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function NumberDeclarationPropertyNameTag(_type){
		NumberPropertyNameTag.call(this, _type);
	};
	NumberDeclarationPropertyNameTag = new Rexjs(NumberDeclarationPropertyNameTag, NumberPropertyNameTag);

	NumberDeclarationPropertyNameTag.props({
		require: require
	});

	return NumberDeclarationPropertyNameTag;
}(
	this.NumberPropertyNameTag
);

this.BinaryNumberDeclarationPropertyNameTag = function(BinaryNumberPropertyNameTag){
	/**
	 * 二进制数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function BinaryNumberDeclarationPropertyNameTag(_type){
		BinaryNumberPropertyNameTag.call(this, _type);
	};
	BinaryNumberDeclarationPropertyNameTag = new Rexjs(BinaryNumberDeclarationPropertyNameTag, BinaryNumberPropertyNameTag);

	BinaryNumberDeclarationPropertyNameTag.props({
		require: require
	});

	return BinaryNumberDeclarationPropertyNameTag;
}(
	this.BinaryNumberPropertyNameTag
);

this.OctalNumberDeclarationPropertyNameTag = function(OctalNumberPropertyNameTag){
	/**
	 * 八进制数字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function OctalNumberDeclarationPropertyNameTag(_type){
		OctalNumberPropertyNameTag.call(this, _type);
	};
	OctalNumberDeclarationPropertyNameTag = new Rexjs(OctalNumberDeclarationPropertyNameTag, OctalNumberPropertyNameTag);

	OctalNumberDeclarationPropertyNameTag.props({
		require: require
	});

	return OctalNumberDeclarationPropertyNameTag;
}(
	this.OctalNumberPropertyNameTag
);

this.KeywordDeclarationPropertyNameTag = function(KeywordPropertyNameTag){
	/**
	 * 关键字声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function KeywordDeclarationPropertyNameTag(_type){
		KeywordPropertyNameTag.call(this, _type);
	};
	KeywordDeclarationPropertyNameTag = new Rexjs(KeywordDeclarationPropertyNameTag, KeywordPropertyNameTag);

	KeywordDeclarationPropertyNameTag.props({
		require: require
	});

	return KeywordDeclarationPropertyNameTag;
}(
	this.KeywordPropertyNameTag
);

this.StringDeclarationPropertyNameTag = function(StringPropertyNameTag){
	/**
	 * 字符串声明属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function StringDeclarationPropertyNameTag(_type){
		StringPropertyNameTag.call(this, _type);
	};
	StringDeclarationPropertyNameTag = new Rexjs(StringDeclarationPropertyNameTag, StringPropertyNameTag);

	StringDeclarationPropertyNameTag.props({
		require: require
	});

	return StringDeclarationPropertyNameTag;
}(
	this.StringPropertyNameTag
);

this.OpenComputedDeclarationPropertyNameTag = function(OpenComputedPropertyNameTag){
	/**
	 * 起始计算式属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenComputedDeclarationPropertyNameTag(_type){
		OpenComputedPropertyNameTag.call(this, _type);
	};
	OpenComputedDeclarationPropertyNameTag = new Rexjs(OpenComputedDeclarationPropertyNameTag, OpenComputedPropertyNameTag);

	OpenComputedDeclarationPropertyNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeComputedDeclarationPropertyNameTag;
		}
	});

	return OpenComputedDeclarationPropertyNameTag;
}(
	this.OpenComputedPropertyNameTag
);

this.CloseComputedDeclarationPropertyNameTag = function(CloseComputedPropertyNameTag){
	/**
	 * 结束计算式属性名称标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseComputedDeclarationPropertyNameTag(_type){
		CloseComputedPropertyNameTag.call(this, _type);
	};
	CloseComputedDeclarationPropertyNameTag = new Rexjs(CloseComputedDeclarationPropertyNameTag, CloseComputedPropertyNameTag);

	CloseComputedDeclarationPropertyNameTag.props({
		require: require
	});

	return CloseComputedDeclarationPropertyNameTag;
}(
	this.CloseComputedPropertyNameTag
);

closeComputedDeclarationPropertyNameTag = new this.CloseComputedDeclarationPropertyNameTag();

}.call(
	this,
	this.IdentifierPropertyNameTag,
	this.PropertyDestructuringItemExpression,
	// closeComputedDeclarationPropertyNameTag
	null,
	// require
	function(tagsMap){
		return tagsMap.declarationPropertyNameSeparatorTags;
	}
);


// 对象解构声明的属性名分隔符相关
!function(PropertyInitializerTag, PropertyNameSeparatorTag){

this.DeclarationPropertyNameInitializerTag = function(PropertyDestructuringDefaultItemExpression, visitor){
	/**
	 * 变量声明属性名初始化标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyNameInitializerTag(_type){
		PropertyInitializerTag.call(this, _type);
	};
	DeclarationPropertyNameInitializerTag = new Rexjs(DeclarationPropertyNameInitializerTag, PropertyInitializerTag);

	DeclarationPropertyNameInitializerTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression, ctx = expression.name.context,
			
				variable = statement.target.expression.objectOf.context.tag.variable;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			ctx.tag = variable;

			// 收集变量名
			variable.collectTo(parser, ctx, statements);
			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 绑定解构项表达式
			statement.bound = new PropertyDestructuringDefaultItemExpression(expression, expression, statements);
		}
	});

	return DeclarationPropertyNameInitializerTag;
}(
	this.PropertyDestructuringDefaultItemExpression,
	PropertyInitializerTag.prototype.visitor
);

this.DeclarationPropertyNameSeparatorTag = function(visitor){
	/**
	 * 变量声明属性名称的分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyNameSeparatorTag(_type){
		PropertyNameSeparatorTag.call(this, _type);
	};
	DeclarationPropertyNameSeparatorTag = new Rexjs(DeclarationPropertyNameSeparatorTag, PropertyNameSeparatorTag);

	DeclarationPropertyNameSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyValueTags;
		}
	});

	return DeclarationPropertyNameSeparatorTag;
}(
	PropertyNameSeparatorTag.prototype.visitor
);

}.call(
	this,
	this.PropertyInitializerTag,
	this.PropertyNameSeparatorTag
);


// 对象解构声明的属性值相关
!function(PropertyDestructuringItemExpression, OpenDeclarationObjectTag, CloseDeclarationObjectTag, OpenNestedDeclarationArrayItemTag, VariableDeclarationTag, BasicAssignmentTag, closeArrayDeclarationPropertyValueTag, closeObjectDeclarationPropertyValueTag){

this.OpenObjectDeclarationPropertyValueTag = function(DeclarationObjectExpression, visitor){
	/**
	 * 对象声明属性值（即：对象解构中所嵌套的对象解构）起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenObjectDeclarationPropertyValueTag(_type){
		OpenDeclarationObjectTag.call(this, _type);
	};
	OpenObjectDeclarationPropertyValueTag = new Rexjs(OpenObjectDeclarationPropertyValueTag, OpenDeclarationObjectTag);
	
	OpenObjectDeclarationPropertyValueTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeObjectDeclarationPropertyValueTag;
		},
		/**
		 * 获取拥有该对象的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getObjectOf: function(statement){
			return statement.target.target.expression.objectOf;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyDestructuringStatement = statement.target, propertyExpression = propertyDestructuringStatement.expression;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 设置 destructuringItem 属性，以标识为解构子项
			propertyExpression.value.destructuringItem = true;
			// 绑定解构项表达式
			propertyDestructuringStatement.bound = new PropertyDestructuringItemExpression(propertyExpression);
		}
	});

	return OpenObjectDeclarationPropertyValueTag;
}(
	this.DeclarationObjectExpression,
	OpenDeclarationObjectTag.prototype.visitor
);

this.CloseObjectDeclarationPropertyValueTag = function(visitor){
	/**
	 * 对象声明属性值（即：对象解构中所嵌套的对象解构）结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseObjectDeclarationPropertyValueTag(_type){
		CloseDeclarationObjectTag.call(this, _type);
	};
	CloseObjectDeclarationPropertyValueTag = new Rexjs(CloseObjectDeclarationPropertyValueTag, CloseDeclarationObjectTag);
	
	CloseObjectDeclarationPropertyValueTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertySeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 将表达式转化为解构项
			statement.expression = statement.expression.toDestructuringItem(parser);
		}
	});
	
	return CloseObjectDeclarationPropertyValueTag;
}(
	CloseDeclarationObjectTag.prototype.visitor
);

this.OpenArrayDeclarationPropertyValueTag = function(DeclarationArrayExpression, visitor){
	/**
	 * 数组声明属性值（即：对象解构中所嵌套的对象解构）起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenArrayDeclarationPropertyValueTag(_type){
		OpenNestedDeclarationArrayItemTag.call(this, _type);
	};
	OpenArrayDeclarationPropertyValueTag = new Rexjs(OpenArrayDeclarationPropertyValueTag, OpenNestedDeclarationArrayItemTag);
	
	OpenArrayDeclarationPropertyValueTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeArrayDeclarationPropertyValueTag;
		},
		/**
		 * 获取拥有该数组的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getArrayOf: function(statement){
			return statement.target.target.expression.objectOf;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyDestructuringStatement = statement.target, propertyExpression = propertyDestructuringStatement.expression;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 设置 destructuringItem 属性，以标识为解构子项
			propertyExpression.value.destructuringItem = true;
			// 绑定解构项表达式
			propertyDestructuringStatement.bound = new PropertyDestructuringItemExpression(propertyExpression);
		}
	});

	return OpenArrayDeclarationPropertyValueTag;
}(
	this.DeclarationArrayExpression,
	OpenNestedDeclarationArrayItemTag.prototype.visitor
);

this.CloseArrayDeclarationPropertyValueTag = function(CloseNestedDeclarationArrayItemTag){
	/**
	 * 数组声明属性值（即：对象解构中所嵌套的对象解构）结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseArrayDeclarationPropertyValueTag(_type){
		CloseNestedDeclarationArrayItemTag.call(this, _type);
	};
	CloseArrayDeclarationPropertyValueTag = new Rexjs(CloseArrayDeclarationPropertyValueTag, CloseNestedDeclarationArrayItemTag);
	
	CloseArrayDeclarationPropertyValueTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertySeparatorTags;
		}
	});
	
	return CloseArrayDeclarationPropertyValueTag;
}(
	this.CloseNestedDeclarationArrayItemTag
);

this.DeclarationPropertyValueTag = function(visitor){
	/**
	 * 对象解构声明的属性值标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyValueTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	DeclarationPropertyValueTag = new Rexjs(DeclarationPropertyValueTag, VariableDeclarationTag);
	
	DeclarationPropertyValueTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyValueContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyDestructuringStatement = statement.target, variable = propertyDestructuringStatement.target.expression.objectOf.context.tag.variable;

			// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
			context.tag = variable;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 绑定解构项表达式
			propertyDestructuringStatement.bound = new PropertyDestructuringItemExpression(propertyDestructuringStatement.expression);
		}
	});
	
	return DeclarationPropertyValueTag;
}(
	VariableDeclarationTag.prototype.visitor
);

this.DeclarationPropertyValueInitializerTag = function(PropertyDestructuringDefaultItemExpression, visitor){
	/**
	 * 变量声明属性值初始化标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyValueInitializerTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	DeclarationPropertyValueInitializerTag = new Rexjs(DeclarationPropertyValueInitializerTag, BasicAssignmentTag);

	DeclarationPropertyValueInitializerTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyDestructuringStatement = statement.target;

			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 绑定解构项表达式
			propertyDestructuringStatement.bound = new PropertyDestructuringDefaultItemExpression(propertyDestructuringStatement.expression, statement.expression, statements);
		}
	});

	return DeclarationPropertyValueInitializerTag;
}(
	this.PropertyDestructuringDefaultItemExpression,
	BasicAssignmentTag.prototype.visitor
);

closeArrayDeclarationPropertyValueTag = new this.CloseArrayDeclarationPropertyValueTag();
closeObjectDeclarationPropertyValueTag = new this.CloseObjectDeclarationPropertyValueTag();

}.call(
	this,
	this.PropertyDestructuringItemExpression,
	this.OpenDeclarationObjectTag,
	this.CloseDeclarationObjectTag,
	this.OpenNestedDeclarationArrayItemTag,
	this.VariableDeclarationTag,
	this.BasicAssignmentTag,
	// closeArrayDeclarationPropertyValueTag
	null,
	// closeObjectDeclarationPropertyValueTag
	null
);


// 对象解构声明的省略属性相关
!function(SpreadStatement){

this.DeclarationPropertyRestStatement = function(out){
	/**
	 * 变量声明省略项拓展语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DeclarationPropertyRestStatement(statements){
		SpreadStatement.call(this, statements);
	};
	DeclarationPropertyRestStatement = new Rexjs(DeclarationPropertyRestStatement, SpreadStatement);

	DeclarationPropertyRestStatement.props({
		/**
		 * 跳出该语句
		 */
		out: function(){
			return out.call(this).value;
		}
	});

	return DeclarationPropertyRestStatement;
}(
	SpreadStatement.prototype.out
);

this.DeclarationPropertyRestItemTag = function(IdentifierDeclarationPropertyNameTag, IdentifierExpression){
	/**
	 * 变量声明对象属性省略项标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyRestItemTag(_type){
		IdentifierDeclarationPropertyNameTag.call(this, _type);
	};
	DeclarationPropertyRestItemTag = new Rexjs(DeclarationPropertyRestItemTag, IdentifierDeclarationPropertyNameTag);

	DeclarationPropertyRestItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyRestItemContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			(
				// 修改上下文标签，因为当前标签（即 this）的功能只能替代匹配，而不能替代解析
				context.tag = statement.target.target.expression.objectOf.context.tag.variable
			)
			// 收集变量名
			.collectTo(parser, context, statements);

			// 设置当前表达式
			statement.expression = new IdentifierExpression(context);
		}
	});

	return DeclarationPropertyRestItemTag;
}(
	this.IdentifierDeclarationPropertyNameTag,
	this.IdentifierExpression
);

this.DeclarationPropertyRestTag = function(PropertySpreadTag, PropertyDestructuringRestItemExpression, PropertySpreadExpression, DeclarationPropertyRestStatement){
	/**
	 * 变量声明对象属性省略项拓展符标签
	 * @param {Number} _type - 标签类型
	 */
	function DeclarationPropertyRestTag(_type){
		PropertySpreadTag.call(this, _type);
	};
	DeclarationPropertyRestTag = new Rexjs(DeclarationPropertyRestTag, PropertySpreadTag);
	
	DeclarationPropertyRestTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationPropertyRestItemTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = new PropertySpreadExpression(context);

			// 绑定解构项表达式
			statement.bound = new PropertyDestructuringRestItemExpression(expression);
			// 设置当前表达式
			statement.expression = expression;
			// 设置当前语句
			statements.statement = new DeclarationPropertyRestStatement(statements);
		}
	});

	return DeclarationPropertyRestTag;
}(
	this.PropertySpreadTag,
	this.PropertyDestructuringRestItemExpression,
	this.PropertySpreadExpression,
	this.DeclarationPropertyRestStatement
);

}.call(
	this,
	this.SpreadStatement
);


// 数组声明解构内的对象解构相关
!function(CloseDeclarationObjectTag, closeObjectDeclarationArrayItemTag){

this.OpenObjectDeclarationArrayItemTag = function(OpenDeclarationObjectTag){
	/**
	 * 对象声明数组项（即数组声明解构中，所嵌套的对象解构）起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenObjectDeclarationArrayItemTag(_type){
		OpenDeclarationObjectTag.call(this, _type);
	};
	OpenObjectDeclarationArrayItemTag = new Rexjs(OpenObjectDeclarationArrayItemTag, OpenDeclarationObjectTag);
	
	OpenObjectDeclarationArrayItemTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeObjectDeclarationArrayItemTag;
		},
		/**
		 * 获取拥有该对象的表达式
		 * @param {Statement} statement - 当前语句
		 */
		getObjectOf: function(statement){
			return statement.target.expression.arrayOf;
		}
	});

	return OpenObjectDeclarationArrayItemTag;
}(
	this.OpenDeclarationObjectTag
);

this.CloseObjectDeclarationArrayItemTag = function(visitor){
	/**
	 * 对象声明数组项（即数组声明解构中，所嵌套的对象解构）结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseObjectDeclarationArrayItemTag(_type){
		CloseDeclarationObjectTag.call(this, _type);
	};
	CloseObjectDeclarationArrayItemTag = new Rexjs(CloseObjectDeclarationArrayItemTag, CloseDeclarationObjectTag);
	
	CloseObjectDeclarationArrayItemTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.declarationArrayItemSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类访问器
			visitor.call(this, parser, context, statement, statements);

			// 将表达式转化为解构项
			statement.expression = statement.expression.toDestructuringItem(parser);
		}
	});
	
	return CloseObjectDeclarationArrayItemTag;
}(
	CloseDeclarationObjectTag.prototype.visitor
);

closeObjectDeclarationArrayItemTag = new this.CloseObjectDeclarationArrayItemTag();

}.call(
	this,
	this.CloseDeclarationObjectTag,
	// closeObjectDeclarationArrayItemTag
	null
);


// 标记标签相关
!function(){

this.LabelledExpression = function(GenerableExpression){
	/**
	 * 标记表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function LabelledExpression(context, statements){
		GenerableExpression.call(this, context, statements);
	};
	LabelledExpression = new Rexjs(LabelledExpression, GenerableExpression);

	LabelledExpression.props({
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			// 提取语句表达式内容
			this.statementExpression.extractTo(contentBuilder);
		},
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			// 追加标签名
			contentBuilder.appendContext(this.context);
			// 追加冒号
			contentBuilder.appendString(":");

			// 提取语句表达式内容
			this.statementExpression.extractTo(contentBuilder);
		},
		statementExpression: null
	});
	
	return LabelledExpression;
}(
	this.GenerableExpression
);

this.LabelledStatement = function(){
	/**
	 * 标记语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function LabelledStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	LabelledStatement = new Rexjs(LabelledStatement, ECMAScriptStatement);
	
	LabelledStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 statementExpression
			this.out().statementExpression = this.expression
		}
	});
	
	return LabelledStatement;
}();

this.LabelTag = function(VariableTag){
	/**
	 * 标记标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelTag(_type){
		VariableTag.call(this, _type);
	};
	LabelTag = new Rexjs(LabelTag, VariableTag);
	
	LabelTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.labelContextTags;
		}
	});
	
	return LabelTag;
}(
	this.VariableTag
);

this.LabelColonTag = function(ColonTag, LabelledExpression, LabelledStatement){
	/**
	 * 标记冒号标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelColonTag(_type){
		ColonTag.call(this, _type);
	};
	LabelColonTag = new Rexjs(LabelColonTag, ColonTag);
	
	LabelColonTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new LabelledExpression(statement.expression.context, statements);
			// 设置当前语句
			statements.statement = new LabelledStatement(statements);
		}
	});
	
	return LabelColonTag;
}(
	this.ColonTag,
	this.LabelledExpression,
	this.LabelledStatement
);

}.call(
	this
);


// 中断流相关
!function(){

this.TerminatedFlowExpression = function(GenerableExpression){
	/**
	 * 中断流表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function TerminatedFlowExpression(context, statements){
		GenerableExpression.call(this, context, statements);
	};
	TerminatedFlowExpression = new Rexjs(TerminatedFlowExpression, GenerableExpression);
	
	TerminatedFlowExpression.props({
		branch: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			var tag = this.context.tag, generator = this.contextGeneratorIfNeedCompile;

			// 追加设置生成器索引的字符串
			contentBuilder.appendString(
				generator.currentIndexString + "=" + tag.getCurrentIndexBy(generator, this) + ";"
			);

			// 以常规形式的提取表达式文本内容
			this.normalizeTo(contentBuilder);
			// 追加分号
			contentBuilder.appendString(";");
			
			// 由于上面设置了分号，表示语句已经结束，不需要再添加分号
			this.state = STATE_STATEMENT_ENDED;

			// 追加 case 表达式字符串
			contentBuilder.appendString("case " + tag.getNextIndexBy(generator, this) + ":");
		},
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			var object = this.object;

			// 追加关键字
			contentBuilder.appendContext(this.context);

			// 如果是空表达式
			if(object instanceof EmptyExpression){
				return;
			}

			// 追加空格
			contentBuilder.appendSpace();
			// 提取对象
			object.extractTo(contentBuilder);
		},
		object: null
	});
	
	return TerminatedFlowExpression;
}(
	this.GenerableExpression
);

this.TerminatedFlowStatement = function(){
	/**
	 * 中断流语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TerminatedFlowStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	TerminatedFlowStatement = new Rexjs(TerminatedFlowStatement, ECMAScriptStatement);

	TerminatedFlowStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 object
			this.out().object = this.expression;
		}
	});
	
	return TerminatedFlowStatement;
}();

this.TerminatedFlowTag = function(TerminatedFlowExpression, TerminatedFlowStatement){
	/**
	 * 中断流标签
	 * @param {Number} _type - 标签类型
	 */
	function TerminatedFlowTag(_type){
		SyntaxTag.call(this, _type);
	};
	TerminatedFlowTag = new Rexjs(TerminatedFlowTag, SyntaxTag);
	
	TerminatedFlowTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		flow: ECMAScriptStatement.FLOW_MAIN,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new TerminatedFlowExpression(context, statement.statements);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new TerminatedFlowStatement(statements);
		},
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getCurrentIndexBy: function(){
			return "NaN";
		},
		/**
		 * 从相关生成器中获取下一次所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getNextIndexBy: function(){
			return "NaN";
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});
	
	return TerminatedFlowTag;
}(
	this.TerminatedFlowExpression,
	this.TerminatedFlowStatement
);

}.call(
	this
);


// 中断流标签子类相关
!function(TerminatedFlowTag){

this.ReturnTag = function(SCOPE_CLOSURE, visitor){
	/**
	 * return 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ReturnTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	ReturnTag = new Rexjs(ReturnTag, TerminatedFlowTag);
	
	ReturnTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		flow: ECMAScriptStatement.FLOW_LINEAR,
		regexp: /return/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.returnContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果存在闭包
			if(statements.closure){
				// 调用父类访问器
				visitor.call(this, parser, context, statement, statements);

				// 设置当前表达式为空表达式
				statements.statement.expression = new EmptyExpression(null);
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
			);
		}
	});
	
	return ReturnTag;
}(
	this.ECMAScriptStatements.SCOPE_CLOSURE,
	TerminatedFlowTag.prototype.visitor
);

}.call(
	this,
	this.TerminatedFlowTag,
	this.ECMAScriptStatements
);


// 中断流标签子类相关
!function(){

this.ThrowTag = function(TerminatedFlowTag){
	/**
	 * throw 标签
	 * @param {Number} _type - 标签类型
	 */
	function ThrowTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	ThrowTag = new Rexjs(ThrowTag, TerminatedFlowTag);
	
	ThrowTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /throw/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.throwContextTags;
		}
	});
	
	return ThrowTag;
}(
	this.TerminatedFlowTag
);

this.ThrowContextLineTerminatorTag = function(IllegalLineTerminatorTag){
	/**
	 * throw 关键字上下文的行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function ThrowContextLineTerminatorTag(_type){
		IllegalLineTerminatorTag.call(this, _type);
	};
	ThrowContextLineTerminatorTag = new Rexjs(ThrowContextLineTerminatorTag, IllegalLineTerminatorTag);

	ThrowContextLineTerminatorTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context){
			// 报错
			parser.error(context, ECMAScriptErrors.NEWLINE_AFTER_THROW);
		}
	});

	return ThrowContextLineTerminatorTag;
}(
	this.IllegalLineTerminatorTag
);

}.call(
	this
);


// 迭代中断流类相关
!function(TerminatedFlowExpression, TerminatedFlowStatement, SCOPE_CLOSURE){

this.TerminatedBranchFlowExpression = function(emptyExpression, generateTo){
	/**
	 * 中断分支流表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function TerminatedBranchFlowExpression(context, statements){
		TerminatedFlowExpression.call(this, context, statements);
	};
	TerminatedBranchFlowExpression = new Rexjs(TerminatedBranchFlowExpression, TerminatedFlowExpression);

	TerminatedBranchFlowExpression.props({
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			this.object = emptyExpression;

			// 调用 父类方法
			generateTo.call(this, contentBuilder);
		},
		owner: null
	});

	return TerminatedBranchFlowExpression;
}(
	// emptyExpression
	new EmptyExpression(null),
	TerminatedFlowExpression.prototype.generateTo
);

this.TerminatedBranchFlowStatement = function(catchMethod, withoutAnyFlow){
	/**
	 * 中断分支流语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TerminatedBranchFlowStatement(statements){
		TerminatedFlowStatement.call(this, statements);
		
		this.expression = new EmptyExpression(null);
	};
	TerminatedBranchFlowStatement = new Rexjs(TerminatedBranchFlowStatement, TerminatedFlowStatement);

	TerminatedBranchFlowStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var expression = this.expression, terminatedBranchFlowExpression = this.target.expression;

			switch(false){
				// 如果不是空表达式，说明是属于标记表达式，而标记表达式已经经过验证
				case expression instanceof EmptyExpression:
					break;

				// 如果存在指定的流语句中
				case withoutAnyFlow(terminatedBranchFlowExpression, this.statements):
					break;

				// 默认
				default:
					// 报错
					parser.error(
						terminatedBranchFlowExpression.context,
						ECMAScriptErrors.template(
							"ILLEGAL_STATEMENT",
							terminatedBranchFlowExpression.context.content
						)
					);
					return;
			}

			// 调用父类方法
			return catchMethod.call(this, parser, context);
		}
	});
	
	return TerminatedBranchFlowStatement;
}(
	TerminatedFlowStatement.prototype.catch,
	// withoutAnyFlow
	function(terminatedBranchFlowExpression, statements){
		var flow = terminatedBranchFlowExpression.context.tag.flow;

		// 如果语句块存在
		while(statements){
			var statement = statements.statement;

			// 如果语句存在
			while(statement){
				// 如果流一致
				if((statement.flow & flow) === flow){
					// 设置中断流表达式所属表达式
					terminatedBranchFlowExpression.owner = statement.target.expression;
					return false;
				}

				statement = statement.target;
			}

			// 如果是闭包，返回 null，中断循环，否则获取 target
			statements = (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? null : statements.target;
		}

		return true;
	}
);

this.TerminatedBranchFlowTag = function(TerminatedFlowTag, TerminatedBranchFlowExpression, TerminatedBranchFlowStatement, LabelledStatement){
	/**
	 * 中断分支流标签
	 * @param {Number} _type - 标签类型
	 */
	function TerminatedBranchFlowTag(_type){
		TerminatedFlowTag.call(this, _type);
	};
	TerminatedBranchFlowTag = new Rexjs(TerminatedBranchFlowTag, TerminatedFlowTag);
	
	TerminatedBranchFlowTag.props({
		/**
		 * 核对标记定义语句，是否满足当前中断流所对应的标记
		 * @param {Statement} statement - 需要判断的语句
		 * @param {TerminatedBranchFlowExpression} terminatedBranchFlowExpression - 中断分支流表达式
		 * @param {String} label - 需要核对的标记文本值
		 */
		checkLabelledStatement: function(statement, terminatedBranchFlowExpression, label){
			// 如果当前语句是标记语句
			if(statement instanceof LabelledStatement){
				// 返回标签对比结果
				if(statement.target.expression.context.content === label){
					// 设置中断流表达式所属表达式
					terminatedBranchFlowExpression.owner = statement.expression;
					return true;
				}
			}

			return false;
		},
		flow: ECMAScriptStatement.FLOW_BRANCH,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new TerminatedBranchFlowExpression(context, statement.statements);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new TerminatedBranchFlowStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.terminatedBranchFlowContextTags;
		}
	});
	
	return TerminatedBranchFlowTag;
}(
	this.TerminatedFlowTag,
	this.TerminatedBranchFlowExpression,
	this.TerminatedBranchFlowStatement,
	this.LabelledStatement
);

this.LabelledIdentifierTag = function(LabelTag, withoutAnyFlow){
	/**
	 * 标记标识符标签
	 * @param {Number} _type - 标签类型
	 */
	function LabelledIdentifierTag(_type){
		LabelTag.call(this, _type);
	};
	LabelledIdentifierTag = new Rexjs(LabelledIdentifierTag, LabelTag);
	
	LabelledIdentifierTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果没有存在指定的流语句中
			if(withoutAnyFlow(statement.target.expression, statements, context.content)){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template(
						"LABEL",
						statement.target.expression.context.content,
						context.content
					)
				);

				return;
			}

			// 设置当前表达式
			statement.expression = new Expression(context);
		}
	});
	
	return LabelledIdentifierTag;
}(
	this.LabelTag,
	// withoutAnyFlow
	function(terminatedBranchFlowExpression, statements, content){
		var tag = terminatedBranchFlowExpression.context.tag;

		// 如果语句块存在
		while(statements){
			var statement = statements.statement;

			// 如果语句存在
			while(statement){
				// 如果流语句核对有效
				if(tag.checkLabelledStatement(statement, terminatedBranchFlowExpression, content)){
					return false;
				}

				statement = statement.target;
			}

			// 如果是闭包，则获取 target，否则等于 null，中断循环
			statements = (statements.scope & SCOPE_CLOSURE) === SCOPE_CLOSURE ? null : statements.target;
		}

		return true;
	}
);

}.call(
	this,
	this.TerminatedFlowExpression,
	this.TerminatedFlowStatement,
	this.ECMAScriptStatements.SCOPE_CLOSURE
);


// 迭代中断流子类相关
!function(TerminatedBranchFlowTag){

this.BreakTag = function(){
	/**
	 * break 标签
	 * @param {Number} _type - 标签类型
	 */
	function BreakTag(_type){
		TerminatedBranchFlowTag.call(this, _type);
	};
	BreakTag = new Rexjs(BreakTag, TerminatedBranchFlowTag);
	
	BreakTag.props({
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getCurrentIndexBy: function(generatorExpression, terminatedFlowExpression){
			return terminatedFlowExpression.owner.mainFlowIndex;
		},
		regexp: /break/
	});
	
	return BreakTag;
}();

this.ContinueTag = function(FLOW_CIRCULAR, checkLabelledStatement){
	/**
	 * continue 标签
	 * @param {Number} _type - 标签类型
	 */
	function ContinueTag(_type){
		TerminatedBranchFlowTag.call(this, _type);
	};
	ContinueTag = new Rexjs(ContinueTag, TerminatedBranchFlowTag);
	
	ContinueTag.props({
		/**
		 * 核对标记定义语句，是否满足当前中断流所对应的标记
		 * @param {Statement} statement - 需要判断的语句
		 * @param {TerminatedBranchFlowExpression} terminatedBranchFlowExpression - 中断分支流表达式
		 * @param {String} label - 需要核对的标记文本值
		 */
		checkLabelledStatement: function(statement, terminatedBranchFlowExpression, label){
			// 如果语句流一致
			if((statement.flow & FLOW_CIRCULAR) === FLOW_CIRCULAR){
				// 返回父类判断结果
				return checkLabelledStatement.call(this, statement.target, terminatedBranchFlowExpression, label);
			}

			return false;
		},
		flow: FLOW_CIRCULAR,
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getCurrentIndexBy: function(generatorExpression, terminatedFlowExpression){
			return terminatedFlowExpression.owner.conditionIndex;
		},
		regexp: /continue/
	});
	
	return ContinueTag;
}(
	// FLOW_CIRCULAR
	ECMAScriptStatement.FLOW_CIRCULAR,
	TerminatedBranchFlowTag.prototype.checkLabelledStatement
);

}.call(
	this,
	this.TerminatedBranchFlowTag
);


// var 语句相关
!function(VariableDeclarationTag, closureVariableTag, varDeclarationSeparatorTag){

this.VarExpression = function(GenerableExpression){
	/**
	 * var 表达式
	 * @param {Context} context - 标签上下文
	 * @param {Statements} statements - 当前所处环境的变量收集器集合
	 */
	function VarExpression(context, statements){
		var generator, range = statements.collections.declaration.range();

		GenerableExpression.call(this, context, statements);

		this.list = new ListExpression(null, ",");
		this.range = range;

		generator = this.contextGeneratorIfNeedCompile;
		
		// 如果需要编译的生成器存在
		if(generator){
			// 添加变量收集器范围
			generator.ranges.push(range);
		}
	};
	VarExpression = new Rexjs(VarExpression, GenerableExpression);

	VarExpression.props({
		declaration: true,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			// 提取变量列表
			this.list.extractTo(contentBuilder);
		},
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			// 提取关键字
			contentBuilder.appendContext(this.context);
			// 添加空格
			contentBuilder.appendSpace();

			// 提取变量列表
			this.list.extractTo(contentBuilder);
		},
		list: null,
		range: null
	});

	return VarExpression;
}(
	this.GenerableExpression
);

this.VarStatement = function(){
	/**
	 * var 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function VarStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	VarStatement = new Rexjs(VarStatement, ECMAScriptStatement);
	
	VarStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().list.add(this.expression);
			// 结束 var 表达式的变量名范围
			this.target.expression.range.end();
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				return null;
			}

			// 跳出语句并添加表达式
			this.out().list.add(this.expression);
			// 返回分隔符标签
			return this.bindingOf();
		}
	});
	
	return VarStatement;
}();

this.VarTag = function(VarExpression, VarStatement){
	/**
	 * var 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function VarTag(_type){
		SyntaxTag.call(this, _type);
	};
	VarTag = new Rexjs(VarTag, SyntaxTag);

	VarTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return varDeclarationSeparatorTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new VarExpression(context, statement.statements);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new VarStatement(statements);
		},
		regexp: /var/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.varContextTags;
		},
		/**
		 * 获取绑定的变量名标签
		 */
		get variable(){
			return closureVariableTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});

	return VarTag;
}(
	this.VarExpression,
	this.VarStatement
);

this.ClosureVariableTag = function(){
	/**
	 * 闭包内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosureVariableTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ClosureVariableTag = new Rexjs(ClosureVariableTag, VariableDeclarationTag);
	
	ClosureVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closureVariableContextTags;
		}
	});
	
	return ClosureVariableTag;
}();

this.VarDeclarationBreakTag = function(ExpressionBreakTag){
	/**
	 * var 语句变量声明换行符标签
	 * @param {Number} _type - 标签类型
	 */
	function VarDeclarationBreakTag(_type){
		ExpressionBreakTag.call(this, _type);
	};
	VarDeclarationBreakTag = new Rexjs(VarDeclarationBreakTag, ExpressionBreakTag);

	VarDeclarationBreakTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.varDeclarationBreakContextTags;
		}
	});

	return VarDeclarationBreakTag;
}(
	this.ExpressionBreakTag
);

this.VarDeclarationSeparatorTag = function(CommaTag, VarStatement){
	/**
	 * var 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function VarDeclarationSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	VarDeclarationSeparatorTag = new Rexjs(VarDeclarationSeparatorTag, CommaTag);
	
	VarDeclarationSeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new VarStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.varContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			context.setStatementOf(statements);
		}
	});
	
	return VarDeclarationSeparatorTag;
}(
	this.CommaTag,
	this.VarStatement
);

closureVariableTag = new this.ClosureVariableTag();
varDeclarationSeparatorTag = new this.VarDeclarationSeparatorTag();

}.call(
	this,
	this.VariableDeclarationTag,
	// closureVariableTag
	null,
	// varDeclarationSeparatorTag
	null
);


// let 语句相关
!function(ClosureVariableTag, localVariableTag, letDeclarationSeparatorTag){

this.LetTag = function(VarTag){
	/**
	 * let 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function LetTag(_type){
		VarTag.call(this, _type);
	};
	LetTag = new Rexjs(LetTag, VarTag);

	LetTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return letDeclarationSeparatorTag;
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.es6Base ? "var" : content);
		},
		regexp: /let/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.letContextTags;
		},
		/**
		 * 获取绑定的变量名标签
		 */
		get variable(){
			return localVariableTag;
		}
	});

	return LetTag;
}(
	this.VarTag
);

this.LocalVariableTag = function(collectTo){
	/**
	 * 局部内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function LocalVariableTag(_type){
		ClosureVariableTag.call(this, _type);
	};
	LocalVariableTag = new Rexjs(LocalVariableTag, ClosureVariableTag);
	
	LocalVariableTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			// 调用父类方法
			collectTo.call(this, parser, context, statements);
			// 收集变量名
			statements.collections.blacklist.collect(context.content);
		},
		/**
		 * 判断变量名，是否包含于指定收集器内
		 * @param {String} variable - 需要判断的变量名
		 * @param {ECMAScriptVariableCollections} collections - 指定的变量名集合
		 */
		containsBy: function(variable, collections){
			return collections.declaration.contains(variable);
		}
	});
	
	return LocalVariableTag;
}(
	ClosureVariableTag.prototype.collectTo
);

this.LetDeclarationSeparatorTag = function(VarDeclarationSeparatorTag){
	/**
	 * let 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function LetDeclarationSeparatorTag(_type){
		VarDeclarationSeparatorTag.call(this, _type);
	};
	LetDeclarationSeparatorTag = new Rexjs(LetDeclarationSeparatorTag, VarDeclarationSeparatorTag);
	
	LetDeclarationSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.letContextTags;
		}
	});
	
	return LetDeclarationSeparatorTag;
}(
	this.VarDeclarationSeparatorTag
);

localVariableTag = new this.LocalVariableTag();
letDeclarationSeparatorTag = new this.LetDeclarationSeparatorTag();

}.call(
	this,
	this.ClosureVariableTag,
	// localVariableTag
	null,
	// letDeclarationSeparatorTag
	null
);


// const 语句相关
!function(VarExpression, IdentifierExpression, VarStatement, LocalVariableTag, constVariableTag, constDeclarationSeparatorTag){

this.ConstStatement = function(catchMethod, tryMethod){
	/**
	 * const 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ConstStatement(statements){
		VarStatement.call(this, statements);
	};
	ConstStatement = new Rexjs(ConstStatement, VarStatement);
	
	ConstStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果表达式是可赋值表达式
			if(this.expression instanceof IdentifierExpression){
				// 由于没有赋值操作，则报错
				parser.error(this.expression.context, ECMAScriptErrors.MISSING_INITIALIZER);
				// 返回分隔符标签
				return null;
			}

			return catchMethod.call(this, parser, context);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果表达式是可赋值表达式
			if(this.expression instanceof IdentifierExpression){
				// 由于没有赋值操作，则报错
				parser.error(this.expression.context, ECMAScriptErrors.MISSING_INITIALIZER);
				return null;
			}

			// 调用父类方法
			return tryMethod.call(this, parser, context);
		}
	});
	
	return ConstStatement;
}(
	VarStatement.prototype.catch,
	VarStatement.prototype.try
);

this.ConstTag = function(LetTag, ConstStatement){
	/**
	 * const 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstTag(_type){
		LetTag.call(this, _type);
	};
	ConstTag = new Rexjs(ConstTag, LetTag);

	ConstTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return constDeclarationSeparatorTag;
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.es6Base ? "var" : content);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ConstStatement(statements);
		},
		regexp: /const/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constContextTags;
		},
		/**
		 * 获取绑定的变量名标签
		 */
		get variable(){
			return constVariableTag;
		}
	});

	return ConstTag;
}(
	this.LetTag,
	this.ConstStatement
);

this.ConstVariableTag = function(collectTo){
	/**
	 * 局部内变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstVariableTag(_type){
		LocalVariableTag.call(this, _type);
	};
	ConstVariableTag = new Rexjs(ConstVariableTag, LocalVariableTag);
	
	ConstVariableTag.props({
		/**
		 * 收集变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statements} statements - 当前语句块
		 */
		collectTo: function(parser, context, statements){
			// 调用父类方法
			collectTo.call(this, parser, context, statements);
			// 收集变量名
			statements.collections.const.collect(context.content);
		}
	});
	
	return ConstVariableTag;
}(
	LocalVariableTag.prototype.collectTo
);

this.ConstDeclarationSeparatorTag = function(LetDeclarationSeparatorTag, ConstStatement){
	/**
	 * const 语句变量声明分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstDeclarationSeparatorTag(_type){
		LetDeclarationSeparatorTag.call(this, _type);
	};
	ConstDeclarationSeparatorTag = new Rexjs(ConstDeclarationSeparatorTag, LetDeclarationSeparatorTag);
	
	ConstDeclarationSeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ConstStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constContextTags;
		}
	});
	
	return ConstDeclarationSeparatorTag;
}(
	this.LetDeclarationSeparatorTag,
	this.ConstStatement
);

constVariableTag = new this.ConstVariableTag();
constDeclarationSeparatorTag = new this.ConstDeclarationSeparatorTag();

}.call(
	this,
	this.VarExpression,
	this.IdentifierExpression,
	this.VarStatement,
	this.LocalVariableTag,
	// constVariableTag
	null,
	// constDeclarationSeparatorTag
	null
);


// if 语句相关
!function(closeIfConditionTag, elseTag){

this.IfExpression = function(ConditionalExpression){
	/**
	 * if 表达式
	 * @param {Context} context - 表达式上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function IfExpression(context, statements){
		ConditionalExpression.call(this, context, statements);
	};
	IfExpression = new Rexjs(IfExpression, ConditionalExpression);
	
	IfExpression.props({
		elseBody: null,
		elseContext: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			var mainFlowIndex, elseContext = this.elseContext;

			// 如果存在 else
			if(elseContext){
				// 获取下一个索引，以表示新的主流索引，不直接使用 this.linearFlowIndex，是因为其将要代表 else 分支流索引
				mainFlowIndex = this.branchFlowIndex = this.contextGeneratorIfNeedCompile.nextIndex();
			}

			// 以生成器形式去编译条件代码
			this.generateConditionTo(this.condition.inner, contentBuilder);
			// 编译 if 主体
			this.generateBodyTo(this.ifBody, contentBuilder);

			// 如果存在 else
			if(elseContext){
				// 再将其从 else 分支流中拉回到主流中
				this.mainFlowIndex = mainFlowIndex;

				// 编译 if 主体
				this.generateBodyTo(this.elseBody, contentBuilder);
			}
		},
		ifBody: null,
		/**
		 * 获取 if 关键字上下文
		 */
		get ifContext(){
			return this.context;
		},
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			// 追加 if 关键字
			contentBuilder.appendContext(this.ifContext);
			
			// 追加条件
			this.condition.extractTo(contentBuilder);
			// 追加主体语句
			this.ifBody.extractTo(contentBuilder);
			
			// 如果没有 else 关键字
			if(!this.elseContext){
				return;
			}
			
			// 判断 if 主体表达式是否需要加分号
			if((this.ifBody.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
				// 追加分号
				contentBuilder.appendString(";");
			}
			
			// 追加 else 关键字
			contentBuilder.appendContext(this.elseContext);
			// 追加空格
			contentBuilder.appendSpace();
			
			// 提取 else 主体内容
			this.elseBody.extractTo(contentBuilder);
		}
	});
	
	return IfExpression;
}(
	this.ConditionalExpression
);

this.IfBodyStatement = function(SingleStatement){
	/**
	 * if 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IfBodyStatement(statements){
		SingleStatement.call(this, statements);
	};
	IfBodyStatement = new Rexjs(IfBodyStatement, SingleStatement);
	
	IfBodyStatement.props({
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			var expression = this.expression;

			// 跳出语句并设置 if 表达式的主体
			this.out().ifBody = expression;
			
			switch(false){
				// 如果不是 else
				case context.content === "else":
					break;

				// 如果表达式还没有结束
				case (expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE:
					// 默认
					parser.error(context);
					break;

				default:
					// 返回 else 标签
					return this.bindingOf();
			}
		},
		flow: ECMAScriptStatement.FLOW_LINEAR
	});
	
	return IfBodyStatement;
}(
	this.SingleStatement
);

this.ElseBodyStatement = function(IfBodyStatement){
	/**
	 * else 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ElseBodyStatement(statements){
		IfBodyStatement.call(this, statements);
	};
	ElseBodyStatement = new Rexjs(ElseBodyStatement, IfBodyStatement);
	
	ElseBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 elseBody
			this.out().elseBody = this.expression;
		}
	});
	
	return ElseBodyStatement;
}(
	this.IfBodyStatement
);

this.IfTag = function(IfExpression){
	/**
	 * if 标签
	 */
	function IfTag(_type){
		SyntaxTag.call(this, _type);
	};
	IfTag = new Rexjs(IfTag, SyntaxTag);
	
	IfTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return elseTag;
		},
		regexp: /if/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.ifConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式
			statement.expression = new IfExpression(context, statements);
		}
	});
	
	return IfTag;
}(
	this.IfExpression
);

this.OpenIfConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * if 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenIfConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenIfConditionTag = new Rexjs(OpenIfConditionTag, OpenParenTag);
	
	OpenIfConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeIfConditionTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 if 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenIfConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseIfConditionTag = function(CloseParenTag, IfBodyStatement, IfBodyStatements){
	/**
	 * if 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseIfConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseIfConditionTag = new Rexjs(CloseIfConditionTag, CloseParenTag);
	
	CloseIfConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 if 条件的 close
			statement.expression.condition.close = context;
			// 设置当前语句 及 表达式主体语句
			statements.statement = new IfBodyStatement(statements);
		}
	});
	
	return CloseIfConditionTag;
}(
	this.CloseParenTag,
	this.IfBodyStatement,
	this.IfBodyStatements
);

this.ElseTag = function(ElseExpression, ElseBodyStatement){
	/**
	 * else 标签
	 * @param {Number} _type - 标签类型
	 */
	function ElseTag(_type){
		SyntaxTag.call(this, _type);
	};
	ElseTag = new Rexjs(ElseTag, SyntaxTag);
	
	ElseTag.props({
		regexp: /else/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 else 关键字上下文
			statement.expression.elseContext = context;
			// 设置当前语句
			statements.statement = new ElseBodyStatement(statements);
		}
	});
	
	return ElseTag;
}(
	this.ElseExpression,
	this.ElseBodyStatement
);

closeIfConditionTag = new this.CloseIfConditionTag();
elseTag = new this.ElseTag();

}.call(
	this,
	// closeIfConditionTag
	null,
	// elseTag
	null
);


// while 语句相关
!function(closeWhileConditionTag){

this.WhileExpression = function(ConditionalExpression){
	/**
	 * while 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function WhileExpression(context, statements){
		ConditionalExpression.call(this, context, statements);
	};
	WhileExpression = new Rexjs(WhileExpression, ConditionalExpression);
	
	WhileExpression.props({
		body: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			// 以生成器形式编译逻辑条件
			this.generateConditionTo(this.condition.inner, contentBuilder);
			// 以生成器形式编译主体
			this.generateBodyTo(this.body, contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		normalizeTo: function(contentBuilder){
			// 提取 while 关键字
			contentBuilder.appendContext(this.context);
			
			// 提取 while 条件
			this.condition.extractTo(contentBuilder);
			// 提取 while 主体语句
			this.body.extractTo(contentBuilder);
		}
	});
	
	return WhileExpression;
}(
	this.ConditionalExpression
);

this.WhileBodyStatement = function(SingleStatement){
	/**
	 * while 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function WhileBodyStatement(statements){
		SingleStatement.call(this, statements);
	};
	WhileBodyStatement = new Rexjs(WhileBodyStatement, SingleStatement);
	
	WhileBodyStatement.props({
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = this.expression;
		},
		flow: ECMAScriptStatement.FLOW_CIRCULAR
	});
	
	return WhileBodyStatement;
}(
	this.SingleStatement
);

this.WhileTag = function(WhileExpression){
	/**
	 * while 标签
	 * @param {Number} _type - 标签类型
	 */
	function WhileTag(_type){
		SyntaxTag.call(this, _type);
	};
	WhileTag = new Rexjs(WhileTag, SyntaxTag);
	
	WhileTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /while/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.whileConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new WhileExpression(context, statements);
		}
	});
	
	return WhileTag;
}(
	this.WhileExpression
);

this.OpenWhileConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * while 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenWhileConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenWhileConditionTag = new Rexjs(OpenWhileConditionTag, OpenParenTag);
	
	OpenWhileConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeWhileConditionTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 while 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenWhileConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseWhileConditionTag = function(CloseParenTag, WhileBodyStatement){
	/**
	 * while 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseWhileConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseWhileConditionTag = new Rexjs(CloseWhileConditionTag, CloseParenTag);
	
	CloseWhileConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 条件表达式结束
			statement.expression.condition.close = context;
			// 设置当前语句
			statements.statement = new WhileBodyStatement(statements);
		}
	});
	
	return CloseWhileConditionTag;
}(
	this.CloseParenTag,
	this.WhileBodyStatement
);

closeWhileConditionTag = new this.CloseWhileConditionTag();

}.call(
	this,
	// closeWhileConditionTag
	null
);


// do while 语句相关
!function(doWhileTag, closeDoWhileConditionTag){
	
this.DoExpression = function(ConditionalExpression){
	/**
	 * do 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function DoExpression(context, statements){
		ConditionalExpression.call(this, context, statements);
	};
	DoExpression = new Rexjs(DoExpression, ConditionalExpression);
	
	DoExpression.props({
		body: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			this.adapterIndex = this.mainFlowIndex;

			// 以生成器形式编译主体
			this.generatePrefixBodyTo(this.body, contentBuilder);
			// 以生成器形式编译逻辑条件
			this.generateConditionTo(this.condition.inner, contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		normalizeTo: function(contentBuilder){
			var body = this.body;
			
			// 追加 do 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			
			// 提取主体
			body.extractTo(contentBuilder);
			
			// 判断 do while 主体表达式是否需要加分号
			if((body.state & STATE_STATEMENT_ENDED) !== STATE_STATEMENT_ENDED){
				// 追加分号
				contentBuilder.appendString(";");
			}
			
			// 追加 while 关键字
			contentBuilder.appendContext(this.whileContext);
			// 提取 while 条件
			this.condition.extractTo(contentBuilder);
		},
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} state - 表达式状态
		 */
		set state(state){},
		whileContext: null
	});
	
	return DoExpression;
}(
	this.ConditionalExpression
);

this.DoStatement = function(SingleStatement){
	/**
	 * do 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DoStatement(statements){
		SingleStatement.call(this, statements);
	};
	DoStatement = new Rexjs(DoStatement, SingleStatement);
	
	DoStatement.props({
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			var expression = this.expression;
			
			switch(false){
				// 如果不是 while 关键字
				case context.content === "while":
					break;
				
				// 如果表达式没有结束
				case (expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE:
					break;

				default:
					// 跳出语句并设置 body
					this.out().body = expression;
					// 返回 do while 标签
					return this.bindingOf();
			}

			// 报错
			parser.error(context);
		},
		flow: ECMAScriptStatement.FLOW_CIRCULAR
	});
	
	return DoStatement;
}(
	this.SingleStatement
);

this.DoTag = function(DoExpression, DoStatement){
	/**
	 * do 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DoTag(_type){
		SyntaxTag.call(this, _type);
	};
	DoTag = new Rexjs(DoTag, SyntaxTag);
	
	DoTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return doWhileTag;
		},
		regexp: /do/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new DoExpression(context, statements);
			// 设置当前语句
			statements.statement = new DoStatement(statements);
		}
	});
	
	return DoTag;
}(
	this.DoExpression,
	this.DoStatement
);

this.DoWhileTag = function(WhileTag){
	/**
	 * do while 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function DoWhileTag(_type){
		WhileTag.call(this, _type);
	};
	DoWhileTag = new Rexjs(DoWhileTag, WhileTag);

	DoWhileTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.doWhileConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.whileContext = context;
		}
	});
	
	return DoWhileTag;
}(
	this.WhileTag
);

this.OpenDoWhileConditionTag = function(OpenWhileConditionTag, ConditionStatement){
	/**
	 * do while 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenDoWhileConditionTag(_type){
		OpenWhileConditionTag.call(this, _type);
	};
	OpenDoWhileConditionTag = new Rexjs(OpenDoWhileConditionTag, OpenWhileConditionTag);

	OpenDoWhileConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeDoWhileConditionTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 do while 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenDoWhileConditionTag;
}(
	this.OpenWhileConditionTag,
	this.ConditionStatement
);

this.CloseDoWhileConditionTag = function(CloseWhileConditionTag){
	/**
	 * do while 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseDoWhileConditionTag(_type){
		CloseWhileConditionTag.call(this, _type);
	};
	CloseDoWhileConditionTag = new Rexjs(CloseDoWhileConditionTag, CloseWhileConditionTag);

	CloseDoWhileConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		visitor: function(parser, context, statement){
			statement.expression.condition.close = context;
		}
	});
	
	return CloseDoWhileConditionTag;
}(
	this.CloseWhileConditionTag
);

doWhileTag = new this.DoWhileTag();
closeDoWhileConditionTag = new this.CloseDoWhileConditionTag();
	
}.call(
	this,
	// doWhileTag
	null,
	// closeDoWhileConditionTag
	null
);


// for 语句相关
!function(CompiledExpression){

this.ForExpression = function(ConditionalExpression, compileOf, compileIteratorWithGenerator, compileWithGenerator){
	/**
	 * for 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function ForExpression(context, statements){
		ConditionalExpression.call(this, context, statements);
	};
	ForExpression = new Rexjs(ForExpression, ConditionalExpression);

	ForExpression.props({
		body: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			var iterator = this.iterator, generator = this.contextGeneratorIfNeedCompile;

			// 如果迭代符存在
			if(iterator){
				// 如果是 of 标签而且需要编译
				if(iterator === "of" && config.es6Base){
					// 以生成器形式编译 for of
					compileIteratorWithGenerator(this, generator, contentBuilder, false);
					return;
				}
				
				// 以生成器形式编译 for in
				compileIteratorWithGenerator(this, generator, contentBuilder, true);
				return;
			}

			// 以生成器形式编译 for in
			compileWithGenerator(this, generator, contentBuilder);
		},
		iterator: "",
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			// 添加 for 关键字
			contentBuilder.appendContext(this.context);

			// 如果是 of 标签而且需要编译
			if(this.iterator === "of" && config.es6Base){
				// 编译 for of
				compileOf(
					this.condition,
					this.body,
					contentBuilder,
					new ContentBuilder(),
					this.variable
				);
				
				return;
			}

			// 提取条件
			this.condition.extractTo(contentBuilder);
			// 提取主体
			this.body.extractTo(contentBuilder);
		},
		variable: ""
	});
	
	return ForExpression;
}(
	this.ConditionalExpression,
	// compileOf
	function(condition, body, contentBuilder, builder, variable){
		var inner = condition.inner;

		// 追加 for 循环条件起始小括号
		contentBuilder.appendContext(condition.open);
		// 追加 for 循环初始化语句
		contentBuilder.appendString(variable + "=new Rexjs.Generator(");

		// 追加生成器的对象
		inner.right.extractTo(contentBuilder);

		// 追加 for 循环的逻辑条件
		contentBuilder.appendString(");!" + variable + ".iterator.closed;");
		// 追加 for 循环条件结束小括号
		contentBuilder.appendContext(condition.close);
		// 追加语句块起始大括号，目的是让 let、const 发挥效果
		contentBuilder.appendString("{");

		// 将对象值的初始化表达式提取到新的内容生成器里，目的是防止文档位置（position）的错乱，导致 mappings 不可用 
		inner.left.extractTo(builder);

		// 追加对象值的初始化
		contentBuilder.appendString(
			builder.result + "=" + variable + ".next().value;"
		);

		// 提取主体
		body.extractTo(contentBuilder);
		// 追加语句块结束小括号
		contentBuilder.appendString("}");
	},
	// compileIteratorWithGenerator
	function(expression, generator, contentBuilder, isIn){
		var variable = expression.variable, inner = expression.condition.inner, builder = new ContentBuilder();

		// 追加 for 循环初始化语句
		contentBuilder.appendString(variable + "=new Rexjs.Generator(");

		// 如果是 for in
		if(isIn){
			// 追加获取枚举属性名方法
			contentBuilder.appendString("Rexjs.Object.getEnumerablePropertyNames(");
			// 追加生成器的对象
			inner.right.extractTo(contentBuilder);
			// 追加获取枚举属性名方法的结束小括号
			contentBuilder.appendString(")");
		}
		else {
			// 追加生成器的对象
			inner.right.extractTo(contentBuilder);
		}

		// 追加 Generator 的结束小括号与语句分隔符
		contentBuilder.appendString(");");

		// 以生成器形式编译条件
		expression.generateConditionTo(
			new CompiledExpression("!" + variable + ".iterator.closed"),
			contentBuilder
		);

		// 将对象值的初始化表达式提取到新的内容生成器里，目的是防止文档位置（position）的错乱，导致 mappings 不可用 
		inner.left.extractTo(builder);

		// 追加对象值的初始化
		contentBuilder.appendString(
			builder.result + "=" + variable + ".next().value;"
		);

		// 以生成器形式编译主体
		expression.generateBodyTo(expression.body, contentBuilder);
	},
	// compileWithGenerator
	function(expression, generator, contentBuilder){
		var inner = expression.condition.inner, logicConditionExpression = inner[1];

		// 修改索引值，以配合编译 inner[2]
		expression.adapterIndex = expression.branchFlowIndex = generator.nextIndex();

		// 提取初始化条件
		inner[0].extractTo(contentBuilder);
		// 追加分号
		contentBuilder.appendString(";");

		// 以生成器形式编译逻辑条件
		expression.generateConditionTo(
			logicConditionExpression.default ? new CompiledExpression("true") : logicConditionExpression,
			contentBuilder
		);

		// 提取最终条件
		inner[2].extractTo(contentBuilder);

		// 追加设置索引字符串及 case 表达式
		contentBuilder.appendString(
			";" + generator.currentIndexString + "=" + expression.conditionIndex + ";break;case " + expression.positiveIndex + ":"
		);

		// 以生成器形式编译主体
		expression.generateBodyTo(expression.body, contentBuilder);
	}
);

this.ForBodyStatement = function(SingleStatement){
	/**
	 * for 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForBodyStatement(statements){
		SingleStatement.call(this, statements);
	};
	ForBodyStatement = new Rexjs(ForBodyStatement, SingleStatement);
	
	ForBodyStatement.props({
		flow: ECMAScriptStatement.FLOW_CIRCULAR,
		/**
		 * 请求跳出该语句
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		requestOut: function(parser, context){
			// 跳出语句并设置 body
			this.out().body = this.expression;
		}
	});
	
	return ForBodyStatement;
}(
	this.SingleStatement
);

this.ForTag = function(ForExpression){
	/**
	 * for 标签
	 */
	function ForTag(_type){
		SyntaxTag.call(this, _type);
	};
	ForTag = new Rexjs(ForTag, SyntaxTag);
	
	ForTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /for/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.forConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式为 for 表达式
			statement.expression = new ForExpression(context, statements);
		}
	});
	
	return ForTag;
}(
	this.ForExpression
);

}.call(
	this,
	Rexjs.CompiledExpression
);


// for 循环迭代符表达式相关
!function(){

this.IterationStatement = function(BinaryStatement){
	/**
	 * 迭代语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function IterationStatement(statements){
		BinaryStatement.call(this, statements);
	};
	IterationStatement = new Rexjs(IterationStatement, BinaryStatement);

	IterationStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出当前语句并设置 right
			this.out().right = this.expression;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(){
			return null;
		}
	});

	return IterationStatement;
}(
	this.BinaryStatement
);

this.IteratorTag = function(BinaryKeywordTag, BinaryExpression, IterationStatement, visitor){
	/**
	 * for 循环迭代符标签
	 * @param {Number} _type - 标签类型
	 */
	function IteratorTag(_type){
		BinaryKeywordTag.call(this, _type);
	};
	IteratorTag = new Rexjs(IteratorTag, BinaryKeywordTag);

	IteratorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new IterationStatement(statements);
		},
		/**
		 * 判断编译时是否需要临时变量名
		 * @param {Statements} statements - 当前语句块
		 */
		hasVariable: function(statements){
			return statements.contextGeneratorIfNeedCompile !== null;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression, forExpression = statement.target.expression;

			// 设置 for 表达式的 iterator 属性
			forExpression.iterator = context.content;

			// 如果需要编译
			if(this.hasVariable(statements)){
				// 生成并记录临时变量名
				forExpression.variable = statements.collections.generate();
			}

			// 调用公共访问器方法
			commonVisitor.call(this, parser, context, statement, statements);
			
			// 设置当前表达式的左侧表达式
			statement.expression.left  = expression;
		}
	});

	return IteratorTag;
}(
	this.BinaryKeywordTag,
	this.BinaryExpression,
	this.IterationStatement
);

this.ForInTag = function(IteratorTag){
	/**
	 * for in 标签
	 * @param {Number} _type - 标签类型
	 */
	function ForInTag(_type){
		IteratorTag.call(this, _type);
	};
	ForInTag = new Rexjs(ForInTag, IteratorTag);

	ForInTag.props({
		regexp: /in(?!stanceof)/
	});

	return ForInTag;
}(
	this.IteratorTag
);

this.ForOfTag = function(IteratorTag, hasVariable){
	/**
	 * for of 标签
	 * @param {Number} _type - 标签类型
	 */
	function ForOfTag(_type){
		IteratorTag.call(this, _type);
	};
	ForOfTag = new Rexjs(ForOfTag, IteratorTag);

	ForOfTag.props({
		/**
		 * 判断编译时是否需要临时变量名
		 * @param {Statements} statements - 当前语句块
		 */
		hasVariable: function(statements){
			return config.es6Base || hasVariable.call(this, statements);
		},
		regexp: /of/
	});

	return ForOfTag;
}(
	this.IteratorTag,
	this.IteratorTag.prototype.hasVariable
);

}.call(
	this
);


// for 循环条件表达式相关
!function(IdentifierExpression, VarExpression, CommaStatement, closeForConditionTag, forInitConditionItemSeparatorTag, forInTag, forOfTag, forInitConditionSeparatorTag, forLogicConditionSeparatorTag, getOpenConditionTag){

this.ForConditionInnerStatement = function(){
	/**
	 * for 循环条件内部语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForConditionInnerStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ForConditionInnerStatement = new Rexjs(ForConditionInnerStatement, ECMAScriptStatement);
	
	ForConditionInnerStatement.props({
		expression: new DefaultExpression()
	});

	return ForConditionInnerStatement;
}();

this.ForInitConditionStatement = function(ForConditionInnerStatement, hasError){
	/**
	 * for 循环初始化条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForInitConditionStatement(statements){
		ForConditionInnerStatement.call(this, statements);
	};
	ForInitConditionStatement = new Rexjs(ForInitConditionStatement, ForConditionInnerStatement);
	
	ForInitConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var tag, expression = this.expression, target = this.target;

			// 判断标签内容
			switch(context.content){
				// 如果是分号
				case ";":
					// 设置标签
					tag = getOpenConditionTag(this).forInitConditionSeparator;
					
					(
						// 设置目标语句的表达式
						this.target.expression = new ListExpression(null, ";")
					)
					// 添加表达式
					.add(
						expression
					);
					break;

				// 如果是 in
				case "in":
					tag = getOpenConditionTag(this).forIn;

				// 如果是 of
				case "of":
					// 如果验证出错
					if(hasError(parser, expression, context)){
						return;
					}

					// 设置标签
					tag = tag || getOpenConditionTag(this).forOf;
					// 设置目标语句的表达式
					this.target.expression = expression;
					break;

				default:
					// 报错
					parser.error(context);
					return;
			}

			// 跳出当前语句
			this.out();
			// 返回标签
			return tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 判断标签内容
			switch(context.content){
				// 如果是 in 关键字
				case "in":
					break;

				// 如果是逗号
				case ",":
					return getOpenConditionTag(this).forInitConditionItemSeparator;

				// 默认
				default:
					return null;
			}

			var expression = this.expression;

			// 如果验证出错
			if(hasError(parser, expression, context)){
				return null;
			}

			// 设置目标语句的表达式
			this.target.expression = expression;

			// 跳出当前语句
			this.out();
			return getOpenConditionTag(this).forIn;
		}
	});
	
	return ForInitConditionStatement;
}(
	this.ForConditionInnerStatement,
	// hasError
	function(parser, expression, context){
		// 如果是声明表达式
		if(expression instanceof VarExpression){
			var list = expression.list;

			// 如果声明列表长度等于 1
			if(list.length === 1){
				// 设置表达式为列表的第一项
				expression = list[0];
			}
			else {
				// 返回错误信息
				parser.error(context, ECMAScriptErrors.FOR_IN);
				return true;
			}
		}

		// 如果是标识符表达式
		if(expression instanceof IdentifierExpression){
			return false;
		}

		// 返回错误信息
		parser.error(context, ECMAScriptErrors.FOR);
		return true;
	}
);

this.ForLogicConditionStatement = function(ForConditionInnerStatement){
	/**
	 * for 循环的逻辑判断条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForLogicConditionStatement(statements){
		ForConditionInnerStatement.call(this, statements);
	};
	ForLogicConditionStatement = new Rexjs(ForLogicConditionStatement, ForConditionInnerStatement);
	
	ForLogicConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是分号
			if(context.content !== ";"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并添加表达式
			this.out().add(this.expression);
			// 返回标签
			return getOpenConditionTag(this).forLogicConditionSeparator;
		}
	});
	
	return ForLogicConditionStatement;
}(
	this.ForConditionInnerStatement
);

this.ForFinallyConditionStatement = function(ForConditionInnerStatement){
	/**
	 * for 循环的末条件语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForFinallyConditionStatement(statements){
		ForConditionInnerStatement.call(this, statements);
	};
	ForFinallyConditionStatement = new Rexjs(ForFinallyConditionStatement, ForConditionInnerStatement);
	
	ForFinallyConditionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并添加表达式
			this.out().add(this.expression);
		}
	});
	
	return ForFinallyConditionStatement;
}(
	this.ForConditionInnerStatement
);

this.ForInitConditionSeparatorStatement = function(tryMethod){
	/**
	 * for 循环初始化条件分隔符语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ForInitConditionSeparatorStatement(statements){
		CommaStatement.call(this, statements);
	};
	ForInitConditionSeparatorStatement = new Rexjs(ForInitConditionSeparatorStatement, CommaStatement);

	ForInitConditionSeparatorStatement.props({
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果是 in 关键字
			if(context.content === "in"){
				// 跳出当前语句并添加表达式
				this.out().add(this.expression);
				return null;
			}

			// 返回父类方法处理的结果
			return tryMethod.call(this, parser, context);
		}
	});

	return ForInitConditionSeparatorStatement;
}(
	CommaStatement.prototype.try
);

this.OpenForConditionTag = function(OpenParenTag, ConditionStatement, ForInitConditionStatement){
	/**
	 * for 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenForConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenForConditionTag = new Rexjs(OpenForConditionTag, OpenParenTag);
	
	OpenForConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeForConditionTag;
		},
		/**
		 * 获取绑定的 forInTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forIn(){
			return forInTag;
		},
		/**
		 * 获取绑定的 forInitConditionItemSeparatorTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forInitConditionItemSeparator(){
			return forInitConditionItemSeparatorTag;
		},
		/**
		 * 获取绑定的 forInitConditionSeparatorTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forInitConditionSeparator(){
			return forInitConditionSeparatorTag;
		},
		/**
		 * 获取绑定的 forLogicConditionSeparatorTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forLogicConditionSeparator(){
			return forLogicConditionSeparatorTag;
		},
		/**
		 * 获取绑定的 forOfTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get forOf(){
			return forOfTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.forConditionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 for 表达式的条件
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
			// 再次设置当前语句，目的是 target 要指向 ConditionStatement
			statements.statement = new ForInitConditionStatement(statements);
		}
	});
	
	return OpenForConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement,
	this.ForInitConditionStatement
);

this.ForInitConditionItemSeparatorTag = function(CommaTag, ForInitConditionSeparatorStatement, visitor){
	/**
	 * for 循环初始化条件项分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ForInitConditionItemSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	ForInitConditionItemSeparatorTag = new Rexjs(ForInitConditionItemSeparatorTag, CommaTag);

	ForInitConditionItemSeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ForInitConditionSeparatorStatement(statements);
		}
	});

	return ForInitConditionItemSeparatorTag;
}(
	this.CommaTag,
	this.ForInitConditionSeparatorStatement
);

this.ForConditionSeparatorTag = function(SemicolonTag){
	/**
	 * for 循环条件分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ForConditionSeparatorTag(_type){
		SemicolonTag.call(this, _type);
	};
	ForConditionSeparatorTag = new Rexjs(ForConditionSeparatorTag, SemicolonTag);

	ForConditionSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			context.setStatementOf(statements);
		}
	});

	return ForConditionSeparatorTag;
}(
	this.SemicolonTag
);

this.ForInitConditionSeparatorTag = function(ForConditionSeparatorTag, ForLogicConditionStatement){
	/**
	 * for 循环条件中初始化语句的分隔符标签，即 for 循环条件的第一个分号标签
	 * @param {Number} _type - 标签类型
	 */
	function ForInitConditionSeparatorTag(_type){
		ForConditionSeparatorTag.call(this, _type)
	};
	ForInitConditionSeparatorTag = new Rexjs(ForInitConditionSeparatorTag, ForConditionSeparatorTag);

	ForInitConditionSeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ForLogicConditionStatement(statements);
		}
	});

	return ForInitConditionSeparatorTag;
}(
	this.ForConditionSeparatorTag,
	this.ForLogicConditionStatement
);

this.ForLogicConditionSeparatorTag = function(ForConditionSeparatorTag, ForFinallyConditionStatement){
	/**
	 * for 循环条件中逻辑语句的分号标签，即 for 循环条件的第二个分号标签
	 * @param {Number} _type - 标签类型
	 */
	function ForLogicConditionSeparatorTag(_type){
		ForConditionSeparatorTag.call(this, _type)
	};
	ForLogicConditionSeparatorTag = new Rexjs(ForLogicConditionSeparatorTag, ForConditionSeparatorTag);

	ForLogicConditionSeparatorTag.props({
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ForFinallyConditionStatement(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		}
	});

	return ForLogicConditionSeparatorTag;
}(
	this.ForConditionSeparatorTag,
	this.ForFinallyConditionStatement
);

this.CloseForConditionTag = function(CloseParenTag, ForBodyStatement){
	/**
	 * for 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseForConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseForConditionTag = new Rexjs(CloseForConditionTag, CloseParenTag);
	
	CloseForConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 for 表达式条件的 close
			statement.expression.condition.close = context;
			// 设置当前语句
			statements.statement = new ForBodyStatement(statements);
		}
	});
	
	return CloseForConditionTag;
}(
	this.CloseParenTag,
	this.ForBodyStatement
);

closeForConditionTag = new this.CloseForConditionTag();
forInTag = new this.ForInTag();
forOfTag = new this.ForOfTag();
forInitConditionItemSeparatorTag = new this.ForInitConditionItemSeparatorTag();
forInitConditionSeparatorTag = new this.ForInitConditionSeparatorTag();
forLogicConditionSeparatorTag = new this.ForLogicConditionSeparatorTag();

}.call(
	this,
	this.IdentifierExpression,
	this.VarExpression,
	this.CommaStatement,
	// closeForConditionTag
	null,
	// forInitConditionItemSeparatorTag
	null,
	// forInTag
	null,
	// forOfTag
	null,
	// forInitConditionSeparatorTag
	null,
	// forLogicConditionSeparatorTag
	null,
	// getOpenConditionTag
	function(statement){
		return statement.target.target.expression.condition.open.tag;
	}
);


!function(UnaryExpression, CallExpression, FunctionConvertorExpression){

this.TryFunctionExpression = function(extractTo){
	/**
	 * 尝试执行函数表达式
	 * @param {Context} context - 标签上下文
	 */
	function TryFunctionExpression(context){
		UnaryExpression.call(this, context);
	};
	TryFunctionExpression = new Rexjs(TryFunctionExpression, UnaryExpression);

	TryFunctionExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.rexjs){
				// 直接提取操作对象
				this.operand.extractTo(contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return TryFunctionExpression;
}(
	UnaryExpression.prototype.extractTo
);

this.FunctionConvertorExpression = FunctionConvertorExpression = function(AccessorExpression, extractAccessor){
	/**
	 * 函数转换器表达式
	 * @param {Expression} func - 标签上下文
	 */
	function FunctionConvertorExpression(func){
		Expression.call(this, func.context);

		this.function = func;
	};
	FunctionConvertorExpression = new Rexjs(FunctionConvertorExpression, Expression);

	FunctionConvertorExpression.props({
		called: true,
		function: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var func = this.function;

			// 如果需要编译
			if(config.rexjs){
				// 追加转换方法
				contentBuilder.appendString("(Rexjs.Function.convert(");

				// 如果函数是访问器形式的
				if(func instanceof AccessorExpression){
					// 以访问器形式提取
					extractAccessor(contentBuilder, func, func.property);
				}
				else {
					// 直接提取
					func.extractTo(contentBuilder);
				}

				// 追加转换方法的结束小括号
				contentBuilder.appendString(
					// 如果没有带执行方法的小括号，则加上
					"))" + (this.called ? "" : "()")
				);

				return;
			}

			// 直接提取
			func.extractTo(contentBuilder);
		}
	});

	return FunctionConvertorExpression;
}(
	this.AccessorExpression,
	// extractAccessor
	function(contentBuilder, func, property){
		// 先提取函数所属对象
		func.object.extractTo(contentBuilder);

		// 追加 convert 方法的参数分隔符
		contentBuilder.appendString(",");

		// 如果是匹配组表达式，则说明是中括号 window["a"] 形式的访问器
		if(property instanceof PartnerExpression){
			// 将起始中括号改成小括号
			contentBuilder.appendString("(");
			// 提取括号内部表达式
			property.inner.extractTo(contentBuilder);
			// 将结束中括号改成小括号
			contentBuilder.appendString(")");
			return;
		}

		// 将标识符用双引号包括起来
		contentBuilder.appendString('"');
		// 提取标识符
		contentBuilder.appendContext(property);
		// 将标识符用双引号包括起来
		contentBuilder.appendString('"');
	}
);

this.TryFunctionStatement = function(UnaryStatement, setOperand){
	/**
	 * 尝试执行函数语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TryFunctionStatement(statements){
		UnaryStatement.call(this, statements);
	};
	TryFunctionStatement = new Rexjs(TryFunctionStatement, UnaryStatement);
	
	TryFunctionStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(){
			// 设置 operand
			setOperand(this, this.expression);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var expression = this.expression;

			// 如果一元标签验证该标签为表达式分隔符标签
			if(this.target.expression.context.tag.isSeparator(context, expression)){
				// 设置 operand
				setOperand(this, expression);
			}
		}
	});
	
	return TryFunctionStatement;
}(
	this.UnaryStatement,
	// setOperand
	function(statement, expression){
		// 如果是函数调用表达式
		if(expression instanceof CallExpression){
			// 将函数调用表达式的操作对象设置为 函数转换器表达式
			expression.operand = new FunctionConvertorExpression(expression.operand);
		}
		else {
			// 直接设置表达式为 函数转换器表达式
			expression = new FunctionConvertorExpression(expression);
			// 并告知函数转换器表达式，并没有被手动调用
			expression.called = false;
		}

		// 设置操作对象
		statement.out().operand = expression;
	}
);

this.TryFunctionTag = function(ExecTag, TryFunctionExpression, TryFunctionStatement){
	/**
	 * 尝试执行函数的 try 标签
	 * @param {Number} _type - 标签类型
	 */
	function TryFunctionTag(_type){
		ExecTag.call(this, _type);
	};
	TryFunctionTag = new Rexjs(TryFunctionTag, ExecTag);

	TryFunctionTag.props({
		regexp: /try/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new TryFunctionExpression(context);
			// 设置当前语句
			statements.statement = new TryFunctionStatement(statements);
		}
	});

	return TryFunctionTag;
}(
	this.ExecTag,
	this.TryFunctionExpression,
	this.TryFunctionStatement
);

}.call(
	this,
	this.UnaryExpression,
	this.CallExpression,
	// FunctionConvertorExpression
	null
);


// try catch 语句相关
!function(TryFunctionExpression, TryFunctionStatement, tryFunctionTag, catchTag, finallyTag){
	
this.TryExpression = function(GenerableExpression){
	/**
	 * try 表达式
	 * @param {Context} context - 标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function TryExpression(context, statements){
		GenerableExpression.call(this, context, statements);
	};
	TryExpression = new Rexjs(TryExpression, GenerableExpression);
	
	TryExpression.props({
		catchBlock: null,
		catchContext: null,
		exception: null,
		finallyBlock: null,
		finallyContext: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			var exception = this.exception, generator = this.contextGeneratorIfNeedCompile,
			
				exceptionIndex = generator.nextIndex(), mainFlowIndex = generator.nextIndex(), unobserveIndex = generator.nextIndex(),
				
				variable = generator.variable, currentIndexString = generator.currentIndexString;

			// 追加监听异常代码
			contentBuilder.appendString(
				variable + ".observe(" + exceptionIndex + ");"
			);

			// 提取 try 语句块
			this.tryBlock.inner.extractTo(contentBuilder);

			// 追加设置结束监听的代码
			contentBuilder.appendString(
				currentIndexString + "=" + unobserveIndex + ";break;"
			);

			// 如果异常存在，说明存在 catch 语句
			if(exception){
				// 追加异常索引代码
				contentBuilder.appendString(
					"case " + exceptionIndex + ":"
				);

				// 提取异常信息
				exception.inner.extractTo(contentBuilder);
				// 给异常信息赋值
				contentBuilder.appendString("=" + variable + ".exception;");

				// 提取 catch 语句块
				this.catchBlock.extractTo(contentBuilder);

				// 追加设置主流索引代码
				contentBuilder.appendString(
					currentIndexString + "=" + mainFlowIndex + ";break;"
				);
			}

			contentBuilder.appendString(
				// 追加去掉监视异常的代码
				"case " + unobserveIndex + ":" + variable + ".unobserve();" +
				// 追加设置主流索引代码
				currentIndexString + "=" + mainFlowIndex + ";break;case " + mainFlowIndex + ":"
			);

			// 如果 finally 关键字存在
			if(this.finallyContext){
				// 提取 finally 语句块
				this.finallyBlock.extractTo(contentBuilder);
			}
		},
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			var exception = this.exception, finallyContext = this.finallyContext;
			
			// 追加 try 关键字
			contentBuilder.appendContext(this.tryContext);
			// 提取 try 语句块
			this.tryBlock.extractTo(contentBuilder);
			
			// 如果异常存在，说明存在 catch 语句
			if(exception){
				// 追加 catch 关键字
				contentBuilder.appendContext(this.catchContext);
				// 提取异常内容
				exception.extractTo(contentBuilder);
				// 提取 catch 语句块
				this.catchBlock.extractTo(contentBuilder);
			}
			
			// 如果 finally 关键字存在
			if(finallyContext){
				// 追加 finally 关键字
				contentBuilder.appendContext(finallyContext);
				// 提取 finally 语句块
				this.finallyBlock.extractTo(contentBuilder);
			}
		},
		tryBlock: null,
		/**
		 * 获取 try 关键字上下文
		 */
		get tryContext(){
			return this.context;
		}
	});
	
	return TryExpression;
}(
	this.GenerableExpression
);

this.TryStatement = function(toUnary){
	/**
	 * try 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TryStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	TryStatement = new Rexjs(TryStatement, ECMAScriptStatement);
	
	TryStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var expression = this.expression;

			// 如果是默认表达式，即 try 关键字后面跟的不是起始大括号 "{"，因为起始大括号会给该语句重新设置表达式为 BlockExpression
			if(expression.default){
				return toUnary(parser, this, expression, context);
			}

			// 跳出语句并设置 tryBlock 属性
			this.out().tryBlock = expression;
			
			switch(context.content){
				// 如果是 catch
				case "catch" :
					return this.tagOf().catch;
				
				// 如果是 finally
				case "finally" :
					return this.tagOf().finally;
			}

			// 报错
			parser.error(context, ECMAScriptErrors.TRY);
		},
		expression: new DefaultExpression()
	});
	
	return TryStatement;
}(
	// toUnary
	function(parser, statement, expression, context){
		var tag = context.tag;

		// 如果匹配到的标签是可误解的
		if(tag.type.mistakable){
			var statements = statement.statements, targetContext = statement.out().context;

			// 重置标签
			targetContext.tag = tryFunctionTag;
			// 重置目标语句的表达式
			statement.target.expression = new TryFunctionExpression(targetContext);
			// 设置当前语句为
			statements.statement = new TryFunctionStatement(statements);

			return tag;
		}

		// 报错
		parser.error(context);
	}
);

this.CatchStatement = function(){
	/**
	 * catch 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CatchStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CatchStatement = new Rexjs(CatchStatement, ECMAScriptStatement);
	
	CatchStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 catchBlock 属性
			this.out().catchBlock = this.expression;
			// 如果是 finally，则返回 finallyTag
			return context.content === "finally" ? this.tagOf().finally : null;
		}
	});
	
	return CatchStatement;
}();

this.FinallyStatement = function(){
	/**
	 * finally 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function FinallyStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	FinallyStatement = new Rexjs(FinallyStatement, ECMAScriptStatement);
	
	FinallyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 finallyBlock
			this.out().finallyBlock = this.expression;
		}
	});
	
	return FinallyStatement;
}();

this.TryTag = function(TryExpression, TryStatement){
	/**
	 * try 标签
	 * @param {Number} _type - 标签类型
	 */
	function TryTag(_type){
		SyntaxTag.call(this, _type);
	};
	TryTag = new Rexjs(TryTag, SyntaxTag);
	
	TryTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return this.catch;
		},
		/**
		 * 获取绑定的 catchTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get catch(){
			return catchTag;
		},
		/**
		 * 获取绑定的 finallyTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get finally(){
			return finallyTag;
		},
		regexp: /try/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.tryContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new TryExpression(context, statements);
			// 设置当前语句
			statements.statement = new TryStatement(statements);
		}
	});
	
	return TryTag;
}(
	this.TryExpression,
	this.TryStatement
);

this.CatchTag = function(CatchStatement){
	/**
	 * catch 标签
	 * @param {Number} _type - 标签类型
	 */
	function CatchTag(_type){
		SyntaxTag.call(this, _type);
	};
	CatchTag = new Rexjs(CatchTag, SyntaxTag);
	
	CatchTag.props({
		regexp: /catch/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.catchedExceptionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 catch 关键字上下文
			statement.expression.catchContext = context;
			// 设置当前语句
			statements.statement = new CatchStatement(statements);
		}
	});
	
	return CatchTag;
}(
	this.CatchStatement
);

this.OpenCatchedExceptionTag = function(OpenParenTag){
	/**
	 * try catch 异常起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenCatchedExceptionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenCatchedExceptionTag = new Rexjs(OpenCatchedExceptionTag, OpenParenTag);
	
	OpenCatchedExceptionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.exceptionVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 try catch 表达式的异常信息
			statement.target.expression.exception = new PartnerExpression(context);
		}
	});
	
	return OpenCatchedExceptionTag;
}(
	this.OpenParenTag
);

this.ExceptionVariableTag = function(VariableDeclarationTag){
	/**
	 * 异常变量标签
	 * @param {Number} _type - 标签类型
	 */
	function ExceptionVariableTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ExceptionVariableTag = new Rexjs(ExceptionVariableTag, VariableDeclarationTag);
	
	ExceptionVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.closeCatchedExceptionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var tryExpression = statement.target.expression, generator = tryExpression.contextGeneratorIfNeedCompile;

			// 如果存在需要编译的生成器
			if(generator){
				var range = statements.collections.declaration.range();

				// 添加变量名收集器范围
				generator.ranges.push(range);
				// 收集变量名
				this.collectTo(parser, context, statements);
				// 范围结束
				range.end();
			}
			else {
				// 仅仅只收集变量名
				this.collectTo(parser, context, statements);
			}

			// 设置 inner
			tryExpression.exception.inner = new Expression(context);
		}
	});
	
	return ExceptionVariableTag;
}(
	this.VariableDeclarationTag
);

this.CloseCatchedExceptionTag = function(CloseParenTag){
	/**
	 * try catch 异常结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseCatchedExceptionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseCatchedExceptionTag = new Rexjs(CloseCatchedExceptionTag, CloseParenTag);
	
	CloseCatchedExceptionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.blockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.target.expression.exception.close = context;
		}
	});
	
	return CloseCatchedExceptionTag;
}(
	this.CloseParenTag
);

this.FinallyTag = function(FinallyStatement){
	/**
	 * finally 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function FinallyTag(_type){
		SyntaxTag.call(this, _type);
	};
	FinallyTag = new Rexjs(FinallyTag, SyntaxTag);
	
	FinallyTag.props({
		regexp: /finally/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.blockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 finally 关键字上下文
			statement.expression.finallyContext = context;
			// 设置当前语句
			statements.statement = new FinallyStatement(statements);
		}
	});
	
	return FinallyTag;
}(
	this.FinallyStatement
);

catchTag = new this.CatchTag();
finallyTag = new this.FinallyTag();

}.call(
	this,
	this.TryFunctionExpression,
	this.TryFunctionStatement,
	// tryFunctionTag
	new this.TryFunctionTag(),
	// catchTag
	null,
	// finallyTag
	null
);


// switch 语句相关
!function(OpenBlockTag, CloseBlockTag, closeSwitchConditionTag, closeSwitchBodyTag, generateCase){

this.SwitchExpression = function(ConditionalExpression, generateBody){
	/**
	 * switch 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statements} statements - 当前语句块
	 */
	function SwitchExpression(context, statements){
		ConditionalExpression.call(this, context, statements);

		// 如果存在需要编译的生成器
		if(this.contextGeneratorIfNeedCompile){
			// 记录临时变量名
			this.variable = statements.collections.generate();
		}
	};
	SwitchExpression = new Rexjs(SwitchExpression, ConditionalExpression);

	SwitchExpression.props({
		/**
		 * 获取表达式主体语句块
		 */
		get block(){
			return this.body;
		},
		/**
		 * 设置表达式主体语句块
		 * @param {BlockExpression} value - 需要设置的表达式主体语句块
		 */
		set block(value){
			this.body = value;
		},
		body: null,
		/**
		 * 以生成器形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		generateTo: function(contentBuilder){
			var inner = this.body.inner, variable = this.variable;

			// 追加临时变量赋值操作
			contentBuilder.appendString(variable + "=new Rexjs.SwitchCondition(");
			// 追加条件，将其作为临时变量名的值
			this.condition.inner.extractTo(contentBuilder);
			// 追加赋值操作语句的分号
			contentBuilder.appendString(");");

			// 以生成器形式编译主体
			generateBody(this, inner, variable, this.contextGeneratorIfNeedCompile, contentBuilder);
		},
		hasDefault: false,
		/**
		 * 以常规形式的提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		normalizeTo: function(contentBuilder){
			// 添加 switch 关键字
			contentBuilder.appendContext(this.context);

			// 提取条件
			this.condition.extractTo(contentBuilder);
			// 提取主体
			this.body.extractTo(contentBuilder);
		},
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} value - 状态
		 */
		set state(value){},
		variable: ""
	});

	return SwitchExpression;
}(
	this.ConditionalExpression,
	// generateBody
	function(switchExpression, inner, variable, generator, contentBuilder){
		var currentIndexString = generator.currentIndexString, mainFlowIndex = generator.nextIndex(), branchFlowIndex = generator.nextIndex();

		// 修改主流索引值为刚刚产生的新索引值
		switchExpression.mainFlowIndex = mainFlowIndex;
		// 设置分支流的索引值，用于 default 表达式使用
		switchExpression.branchFlowIndex = branchFlowIndex;

		// 遍历主体
		for(var i = 0, j = inner.length;i < j;i++){
			// 以生成器形式编译 case 表达式
			generateCase(switchExpression, inner[i], generator, variable, currentIndexString, contentBuilder);
		}

		if(switchExpression.hasDefault){
			// 追加判断，是否进入 default 表达式相关语句块代码
			contentBuilder.appendString(
				currentIndexString  + "=" + variable + ".default()?" + branchFlowIndex + ":" + mainFlowIndex + ";break;"
			);
		}

		// 追加主流索引的 case 表达式
		contentBuilder.appendString("case " + mainFlowIndex + ":");
	}
);

this.SwitchStatement = function(){
	/**
	 * switch 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SwitchStatement(statements){
		BoxStatement.call(this, statements);
	};
	SwitchStatement = new Rexjs(SwitchStatement, BoxStatement);

	SwitchStatement.props({
		flow: BoxStatement.FLOW_LINEAR
	});

	return SwitchStatement;
}();

this.SwitchBodyStatement = function(BraceBodyStatement){
	/**
	 * switch 主体语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SwitchBodyStatement(statements){
		BraceBodyStatement.call(this, statements);
	};
	SwitchBodyStatement = new Rexjs(SwitchBodyStatement, BraceBodyStatement);

	SwitchBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是关闭大括号
			if(context.content !== "}"){
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 inner
			this.out(parser).inner = this.statements;
			// 返回结束语句块标签
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.statements.target.statement.expression.open.tag;
		}
	});

	return SwitchBodyStatement;
}(
	this.BraceBodyStatement
);

this.SwitchBodyStatements = function(BlockBodyStatements, SwitchBodyStatement, SwitchVariableCollections){
	/**
	 * switch 主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function SwitchBodyStatements(target){
		BlockBodyStatements.call(this, target);
	};
	SwitchBodyStatements = new Rexjs(SwitchBodyStatements, BlockBodyStatements);

	SwitchBodyStatements.props({
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new SwitchBodyStatement(this);
		}
	});

	return SwitchBodyStatements;
}(
	this.BlockBodyStatements,
	this.SwitchBodyStatement,
	this.SwitchVariableCollections
);

this.SwitchTag = function(SwitchExpression){
	/**
	 * switch 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function SwitchTag(_type){
		SyntaxTag.call(this, _type);
	};
	SwitchTag = new Rexjs(SwitchTag, SyntaxTag);
	
	SwitchTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		regexp: /switch/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.switchConditionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new SwitchExpression(context, statements);
		}
	});
	
	return SwitchTag;
}(
	this.SwitchExpression
);

this.OpenSwitchConditionTag = function(OpenParenTag, ConditionStatement){
	/**
	 * switch 条件起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSwitchConditionTag(_type){
		OpenParenTag.call(this, _type);
	};
	OpenSwitchConditionTag = new Rexjs(OpenSwitchConditionTag, OpenParenTag);
	
	OpenSwitchConditionTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeSwitchConditionTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置条件表达式
			statement.expression.condition = new PartnerExpression(context);
			// 设置当前语句
			statements.statement = new ConditionStatement(statements);
		}
	});
	
	return OpenSwitchConditionTag;
}(
	this.OpenParenTag,
	this.ConditionStatement
);

this.CloseSwitchConditionTag = function(CloseParenTag){
	/**
	 * switch 条件结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseSwitchConditionTag(_type){
		CloseParenTag.call(this, _type);
	};
	CloseSwitchConditionTag = new Rexjs(CloseSwitchConditionTag, CloseParenTag);
	
	CloseSwitchConditionTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.switchBlockTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 条件表达式结束
			statement.expression.condition.close = context;
		}
	});
	
	return CloseSwitchConditionTag;
}(
	this.CloseParenTag
);

this.OpenSwitchBodyTag = function(SwitchStatement, SwitchBodyStatements, visitor){
	/**
	 * switch 主体起始标签
	 */
	function OpenSwitchBodyTag(_type){
		OpenBlockTag.call(this, _type);
	};
	OpenSwitchBodyTag = new Rexjs(OpenSwitchBodyTag, OpenBlockTag);
	
	OpenSwitchBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeSwitchBodyTag;
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 */
		getBoundStatements: function(statements){
			return new SwitchBodyStatements(statements);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openSwitchBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(
				this,
				parser,
				context,
				// 设置当前语句
				statements.statement = new SwitchStatement(statements),
				statements
			);
		}
	});
	
	return OpenSwitchBodyTag;
}(
	this.SwitchStatement,
	this.SwitchBodyStatements,
	OpenBlockTag.prototype.visitor
);

this.CloseSwitchBodyTag = function(visitor){
	/**
	 * switch 主体结束标签
	 */
	function CloseSwitchBodyTag(_type){
		CloseBlockTag.call(this, _type);
	};
	CloseSwitchBodyTag = new Rexjs(CloseSwitchBodyTag, CloseBlockTag);
	
	CloseSwitchBodyTag.props({
		$type: TYPE_UNEXPECTED,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 跳出语句并设置表达式的 block 属性
			statement.out().block = statement.expression;
		}
	});
	
	return CloseSwitchBodyTag;
}(
	CloseBlockTag.prototype.visitor
);

closeSwitchConditionTag = new this.CloseSwitchConditionTag();

closeSwitchBodyTag = new this.CloseSwitchBodyTag();

}.call(
	this,
	this.OpenBlockTag,
	this.CloseBlockTag,
	// closeSwitchConditionTag
	null,
	// closeSwitchBodyTag
	null,
	// generateCase
	function(switchExpression, statement, generator, variable, currentIndexString, contentBuilder){
		var expression = statement.expression;

		// 如果空表达式，说明没有 case 表达式
		if(expression.empty){
			return;
		}

		var value = expression.value, positiveIndex = switchExpression.positiveIndex, negativeIndex = switchExpression.negativeIndex;

		// 如果是 default 表达式
		if(value.default){
			var branchFlowIndex = switchExpression.branchFlowIndex;

			// 追加三元判断的“条件”字符串
			contentBuilder.appendString(
				// 如果已经匹配到值，那么就应该进入 default 表达式对应语句块，否则跳过进入下一项匹配
				currentIndexString + "=" + variable + ".matched?" + branchFlowIndex + ":" + positiveIndex +
				";break;case " + branchFlowIndex + ":"
			);

			// 提取 case 表达式的主体语句块
			expression.statements.extractTo(contentBuilder);

			// 追加三元判断的“不成立”时的相关索引处理
			contentBuilder.appendString(
				currentIndexString + "=" + positiveIndex + ";break;case " + positiveIndex + ":"
			);
		}
		else {
			// 追加三元判断的“条件”字符串
			contentBuilder.appendString(currentIndexString + "=" + variable + ".case(");
			// 追加判断值表达式
			expression.value.extractTo(contentBuilder);

			// 追加 三元判断的执行表达式 与 条件“成立”时相关的 case 表达式字符串
			contentBuilder.appendString(
				")?" + positiveIndex + ":" + negativeIndex + ";break;case " + positiveIndex + ":"
			);

			// 提取 case 表达式的主体语句块
			expression.statements.extractTo(contentBuilder);

			// 追加三元判断的“不成立”时的相关索引处理
			contentBuilder.appendString(
				currentIndexString + "=" + negativeIndex + ";break;case " + negativeIndex + ":"
			);
		}

		// 设置三元判断“成立”时的索引值
		switchExpression.positiveIndex = generator.nextIndex();
		// 设置三元判断“不成立”时的索引值
		switchExpression.negativeIndex = generator.nextIndex();
	}
);


// case 表达式相关
!function(caseTag, defaultTag, caseValueSeparatorTag){

this.CaseExpression = function(){
	/**
	 * case 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function CaseExpression(context){
		Expression.call(this, context);
	};
	CaseExpression = new Rexjs(CaseExpression, Expression);

	CaseExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 添加 case 关键字
			contentBuilder.appendContext(this.context);
			// 添加空格
			contentBuilder.appendSpace();
			// 提取 value
			this.value.extractTo(contentBuilder);
			// 添加冒号
			contentBuilder.appendContext(this.separator);
			// 提取 case 语句块
			this.statements.extractTo(contentBuilder);
		},
		separator: null,
		/**
		 * 获取状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置状态
		 * @param {Number} value - 状态
		 */
		set state(value){},
		statements: null,
		value: null
	});

	return CaseExpression;
}();

this.DefaultCaseExpression = function(CaseExpression){
	/**
	 * 默认 case 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DefaultCaseExpression(context){
		CaseExpression.call(this, context);
	};
	DefaultCaseExpression = new Rexjs(DefaultCaseExpression, CaseExpression);

	DefaultCaseExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容存储列表
		 */
		extractTo: function(contentBuilder){
			// 添加 case 关键字
			contentBuilder.appendContext(this.context);
			// 添加冒号
			contentBuilder.appendContext(this.separator);

			// 提取 case 语句块
			this.statements.extractTo(contentBuilder);
		},
		value: null
	});

	return DefaultCaseExpression;
}(
	this.CaseExpression
);

this.CaseValueStatement = function(){
	/**
	 * case 值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CaseValueStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	CaseValueStatement = new Rexjs(CaseValueStatement, ECMAScriptStatement);
	
	CaseValueStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是冒号
			if(context.content !== ":"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 value
			this.out().value = this.expression;
			return this.bindingOf();
		}
	});
	
	return CaseValueStatement;
}();

this.DefaultValueStatement = function(CaseValueStatement){
	/**
	 * default 值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DefaultValueStatement(statements){
		CaseValueStatement.call(this, statements);
	};
	DefaultValueStatement = new Rexjs(DefaultValueStatement, CaseValueStatement);

	DefaultValueStatement.props({
		expression: new DefaultExpression()
	});
	
	return DefaultValueStatement;
}(
	this.CaseValueStatement
);

this.CaseBodyStatement = function(BraceBodyStatement, isCase, isCloseBrace){
	/**
	 * case 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function CaseBodyStatement(statements){
		BraceBodyStatement.call(this, statements);
	};
	CaseBodyStatement = new Rexjs(CaseBodyStatement, BraceBodyStatement);
	
	CaseBodyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			switch(context.content){
				// 如果是 case 关键字
				case "case":
					return isCase(parser, this, context).case;

				// 如果是 default 关键字
				case "default":
					return isCase(parser, this, context).default;

				// 如果是结束大括号
				case "}":
					isCloseBrace(parser, this.statements);
					return null;

				default:
					return null;
			}
		}
	});
	
	return CaseBodyStatement;
}(
	this.BraceBodyStatement,
	// isCase
	function(parser, statement, context){
		var statements = statement.statements, targetStatements = statements.target,
		
			caseExpression = targetStatements.statement.expression;

		// 如果语句可以结束
		if((statement.expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE){
			// 设置 case 表达式的 statements
			caseExpression.statements = statements;
			// 恢复语句块
			parser.statements = targetStatements;
			// 创建新语句
			targetStatements.newStatement();
		}
		else {
			parser.error(context);
		}

		// 返回 case 标签
		return caseExpression.context.tag;
	},
	// isCloseBrace
	function(parser, statements){
		(
			// 恢复语句块
			parser.statements = statements.target
		)
		.statement
		.expression
		.statements = statements;
	}
);

this.CaseBodyStatements = function(SwitchBodyStatements, CaseBodyStatement){
	/**
	 * case 语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function CaseBodyStatements(target){
		SwitchBodyStatements.call(this, target);
	};
	CaseBodyStatements = new Rexjs(CaseBodyStatements, SwitchBodyStatements);

	CaseBodyStatements.props({
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new CaseBodyStatement(this);
		}
	});

	return CaseBodyStatements;
}(
	this.SwitchBodyStatements,
	this.CaseBodyStatement
);

this.CaseTag = function(CaseExpression, CaseValueStatement){
	/**
	 * case 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function CaseTag(_type){
		SyntaxTag.call(this, _type);
	};
	CaseTag = new Rexjs(CaseTag, SyntaxTag);

	CaseTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return caseValueSeparatorTag;
		},
		/**
		 * 获取当前标签标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get case(){
			return caseTag;
		},
		/**
		 * 获取绑定的 defaultTag 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get default(){
			return defaultTag;
		},
		regexp: /case/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new CaseExpression(context);
			// 设置当前语句
			statements.statement = new CaseValueStatement(statements);
		}
	});

	return CaseTag;
}(
	this.CaseExpression,
	this.CaseValueStatement
);

this.DefaultTag = function(CaseTag, DefaultCaseExpression, DefaultValueStatement){
	/**
	 * switch 语句中的 default 标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultTag(_type){
		CaseTag.call(this, _type);
	};
	DefaultTag = new Rexjs(DefaultTag, CaseTag);

	DefaultTag.props({
		regexp: /default/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.mistakableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var switchExpression = statements.target.statement.target.expression;

			// 如果已经存在 default 表达式
			if(switchExpression.hasDefault){
				// 报错
				parser.error(context, ECMAScriptErrors.DEFAULT_CLAUSE);
				return;
			}

			// 设置当前表达式
			statement.expression = new DefaultCaseExpression(context);
			// 设置当前语句
			statements.statement = new DefaultValueStatement(statements);
			// 设置 hasDefault
			switchExpression.hasDefault = true;
		}
	});

	return DefaultTag;
}(
	this.CaseTag,
	this.DefaultCaseExpression,
	this.DefaultValueStatement
);

this.CaseValueSeparatorTag = function(ColonTag, CaseBodyStatements){
	/**
	 * case 值的分隔符标签，即 case 对应的冒号
	 * @param {Number} _type - 标签类型
	 */
	function CaseValueSeparatorTag(_type){
		ColonTag.call(this, _type);
	};
	CaseValueSeparatorTag = new Rexjs(CaseValueSeparatorTag, ColonTag);

	CaseValueSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置表达式的 separator
			statement.expression.separator = context;
			// 设置当前语句块
			parser.statements = new CaseBodyStatements(statements);
		}
	});

	return CaseValueSeparatorTag;
}(
	this.ColonTag,
	this.CaseBodyStatements
);

caseTag = new this.CaseTag();
defaultTag = new this.DefaultTag();
caseValueSeparatorTag = new this.CaseValueSeparatorTag();

}.call(
	this,
	// caseTag
	null,
	// defaultTag
	null,
	// caseValueSeparatorTag
	null
);


// yield 表达式相关
!function(TerminatedFlowExpression, SingleStatement, ReturnTag){

this.YieldTag = function(visitor){
	/**
	 * yield 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function YieldTag(_type){
		ReturnTag.call(this, _type);
	};
	YieldTag = new Rexjs(YieldTag, ReturnTag);

	YieldTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(config.es6Base ? "return" : content);
		},
		/**
		 * 从相关生成器中获取当前所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getCurrentIndexBy: function(generatorExpression){
			return generatorExpression.nextIndex();
		},
		/**
		 * 从相关生成器中获取下一次所需使用的生成器索引值
		 * @param {GeneratorExpression} generatorExpression - 相关生成器表达式
		 * @param {TerminatedFlowExpression} terminatedFlowExpression - 该标签相关的中断流表达式
		 */
		getNextIndexBy: function(generatorExpression){
			return generatorExpression.index;
		},
		regexp: /yield/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果在生成器内
			if(statements.contextGenerator){
				// 调用父类方法
				visitor.call(this, parser, context, statement, statements);
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("ILLEGAL_STATEMENT", context.content)
			);
		}
	});

	return YieldTag;
}(
	ReturnTag.prototype.visitor
);

}.call(
	this,
	this.TerminatedFlowExpression,
	this.SingleStatement,
	this.ReturnTag
);


// 模板相关
!function(closeTemplateTag){

this.TemplateExpression = function(extractTo, compileItem){
	/**
	 * 模板表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function TemplateExpression(open){
		PartnerExpression.call(this, open);
	};
	TemplateExpression = new Rexjs(TemplateExpression, PartnerExpression);

	TemplateExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 追加起始双引号
				contentBuilder.appendString('("');
				// 直接编译 inner
				this.inner.forEach(compileItem, contentBuilder);
				// 追加结束双引号
				contentBuilder.appendString('")');
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return TemplateExpression;
}(
	PartnerExpression.prototype.extractTo,
	// compileItem
	function(item, contentBuilder){
		item.compileTo(contentBuilder);
	}
);

this.TemplateStatement = function(){
	/**
	 * 模板语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function TemplateStatement(statements){
		ECMAScriptStatement.call(this, statements);

		this.expression = new ListExpression(null, "");
	};
	TemplateStatement = new Rexjs(TemplateStatement, ECMAScriptStatement);

	TemplateStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			parser.error(context, ECMAScriptErrors.TEMPLATE);
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是反引号
			if(context.content !== "`"){
				return null;
			}

			// 跳出语句并设置模板表达式的 inner
			this.out().inner = this.expression;
			// 返回结束标签
			return this.bindingOf();
		}
	});

	return TemplateStatement;
}();

this.OpenTemplateTag = function(TemplateExpression, TemplateStatement){
	/**
	 * 起始模板标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenTemplateTag(_type){
		SyntaxTag.call(this, _type);
	};
	OpenTemplateTag = new Rexjs(OpenTemplateTag, SyntaxTag);

	OpenTemplateTag.props({
		$class: CLASS_EXPRESSION,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeTemplateTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new TemplateExpression(context);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new TemplateStatement(statements);
		},
		regexp: /`/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.templateContentTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: commonVisitor
	});

	return OpenTemplateTag;
}(
	this.TemplateExpression,
	this.TemplateStatement
);

this.CloseTemplateTag = function(){
	/**
	 * 结束模板标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseTemplateTag(_type){
		SyntaxTag.call(this, _type);
	};
	CloseTemplateTag = new Rexjs(CloseTemplateTag, SyntaxTag);

	CloseTemplateTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		$type: TYPE_MISTAKABLE,
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		regexp: /`/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.close = context;
		}
	});

	return CloseTemplateTag;
}();

closeTemplateTag = new this.CloseTemplateTag();

}.call(
	this,
	// closeTemplateTag
	null
);


// 模板内容标签相关
!function(LineTerminatorTag, getUnicode){

this.TemplateUnicodeExpression = function(){
	/**
	 * 模板 Unicode 字符编码表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {String} unicode - 标签文本内容的 unicode 字符编码
	 */
	function TemplateUnicodeExpression(context, unicode){
		Expression.call(this, context);

		this.unicode = unicode;
	};
	TemplateUnicodeExpression = new Rexjs(TemplateUnicodeExpression, Expression);

	TemplateUnicodeExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			contentBuilder.appendString("\\u" + this.unicode);
		},
		unicode: "0000"
	});

	return TemplateUnicodeExpression;
}();

this.TemplateContentTag = function(){
	/**
	 * 模板内容标签
	 * @param {Number} _type - 标签类型
	 */
	function TemplateContentTag(_type){
		SyntaxTag.call(this, _type);
	};
	TemplateContentTag = new Rexjs(TemplateContentTag, SyntaxTag);

	TemplateContentTag.props({
		order: ECMAScriptOrders.TEMPLATE_CONTENT,
		regexp: /(?:\\[\s\S]|[^`])+?(?=\$\{|[`"\r\n\u2028\u2029])/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				// 初始化模板字符串表达式
				new Expression(context)
			);
		}
	});

	return TemplateContentTag;
}();

this.TemplateLineTerminatorTag = function(TemplateUnicodeExpression, RegExp, visitor){
	/**
	 * 模板换行符标签
	 * @param {String} char - 指定的换行符
	 * @param {Number} _type - 标签类型
	 */
	function TemplateLineTerminatorTag(char, _type){
		LineTerminatorTag.call(this, _type);

		this.regexp = new RegExp(char);
		this.unicode = getUnicode(char);
	};
	TemplateLineTerminatorTag = new Rexjs(TemplateLineTerminatorTag, LineTerminatorTag);

	TemplateLineTerminatorTag.props({
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				// 初始化 unicode 字符表达式
				new TemplateUnicodeExpression(context, this.unicode)
			);

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		},
		unicode: "0000"
	});

	return TemplateLineTerminatorTag;
}(
	this.TemplateUnicodeExpression,
	RegExp,
	LineTerminatorTag.prototype.visitor
);

this.TemplateQouteTag = function(TemplateUnicodeExpression, UNICODE){
	/**
	 * 模板双引号标签
	 * @param {Number} _type - 标签类型
	 */
	function TemplateQouteTag(_type){
		SyntaxTag.call(this, _type);
	};
	TemplateQouteTag = new Rexjs(TemplateQouteTag, SyntaxTag);

	TemplateQouteTag.props({
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		regexp: /"/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				// 初始化 unicode 字符表达式
				new TemplateUnicodeExpression(context, UNICODE)
			);
		}
	});

	return TemplateQouteTag;
}(
	this.TemplateUnicodeExpression,
	// UNICODE
	getUnicode('"')
);

}.call(
	this,
	Rexjs.LineTerminatorTag,
	// getUnicode
	function(char){
		var unicode = char.charCodeAt(0).toString(16);

		// 根据长度来生成前面的 0
		for(var i = unicode.length;i < 4;i++){
			unicode = "0" + unicode;
		}

		return unicode;
	}
);


// 模板占位符（模板参数）标签相关
!function(closePlaceHolderTag){

this.PlaceHolderExpression = function(){
	/**
	 * 模板占位符（模板参数）表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function PlaceHolderExpression(open){
		PartnerExpression.call(this, open);
	};
	PlaceHolderExpression = new Rexjs(PlaceHolderExpression, PartnerExpression);

	PlaceHolderExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			/*
				追加：
					1. 上个字符串的结束双引号
					2. 字符串拼接的加号
					3. 表达式分组的起始小括号
			*/
			contentBuilder.appendString('"+(');
			// 提取 inner
			this.inner.extractTo(contentBuilder);
			/*
				追加：
					1. 表达式分组的结束小括号
					2. 字符串拼接的加号
					3. 下个字符串的结束双引号
			*/
			contentBuilder.appendString(')+"');
		},
		/**
		 * 提取并参数化表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		parameterizeTo: function(contentBuilder){
			// 追加参数分隔符与起始小括号，小括号是防止逗号表达式被当做参数分隔符
			contentBuilder.appendString(",(");
			// 提取 inner
			this.inner.extractTo(contentBuilder);
			// 结束小括号
			contentBuilder.appendString(")");
		}
	});

	return PlaceHolderExpression;
}();

this.PlaceHolderStatement = function(){
	/**
	 * 模板占位符（模板参数）语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function PlaceHolderStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	PlaceHolderStatement = new Rexjs(PlaceHolderStatement, ECMAScriptStatement);

	PlaceHolderStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context, ECMAScriptErrors.TEMPLATE);
				return null;
			}

			// 跳出语句并设置最近表达式的 inner
			this.out().latest.inner = this.expression;
			// 返回结束标签
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.latest.context.tag;
		}
	});

	return PlaceHolderStatement;
}();

this.OpenPlaceHolderTag = function(OpenBraceTag, PlaceHolderExpression, PlaceHolderStatement){
	/**
	 * 起始模板占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenPlaceHolderTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenPlaceHolderTag = new Rexjs(OpenPlaceHolderTag, OpenBraceTag);

	OpenPlaceHolderTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closePlaceHolderTag;
		},
		order: ECMAScriptOrders.TEMPLATE_SPECIAL_CONTENT,
		regexp: /\$\{/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加表达式
			statement.expression.add(
				new PlaceHolderExpression(context)
			);

			// 设置当前语句
			statements.statement = new PlaceHolderStatement(statements);
		}
	});

	return OpenPlaceHolderTag;
}(
	this.OpenBraceTag,
	this.PlaceHolderExpression,
	this.PlaceHolderStatement
);

this.ClosePlaceHolderTag = function(CloseBraceTag){
	/**
	 * 结束模板占位符（模板参数）标签
	 * @param {Number} _type - 标签类型
	 */
	function ClosePlaceHolderTag(_type){
		CloseBraceTag.call(this, _type);
	};
	ClosePlaceHolderTag = new Rexjs(ClosePlaceHolderTag, CloseBraceTag);

	ClosePlaceHolderTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.templateContentTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			statement.expression.latest.close = context;
		}
	});

	return ClosePlaceHolderTag;
}(
	this.CloseBraceTag
);

closePlaceHolderTag = new this.ClosePlaceHolderTag();

}.call(
	this,
	// closePlaceHolderTag
	null
);


// 模板参数相关
!function(TemplateExpression, PlaceHolderExpression, OpenTemplateTag){

this.TemplateParameterExpression = function(extractTo, compileInner){
	/**
	 * 模板参数表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {Expression} operand - 被作为函数调用的表达式
	 */
	function TemplateParameterExpression(open, operand){
		TemplateExpression.call(this, open);

		this.operand = operand;
	};
	TemplateParameterExpression = new Rexjs(TemplateParameterExpression, TemplateExpression);

	TemplateParameterExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取操作对象表达式
			this.operand.extractTo(contentBuilder);

			// 如果需要编译
			if(config.es6Base){
				// 编译 inner
				compileInner(this.inner, contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		operand: null
	});

	return TemplateParameterExpression;
}(
	PartnerExpression.prototype.extractTo,
	// compileInner
	function(inner, contentBuilder){
		var placeholders = [];

		/*
			追加：
				1. 函数调用起始小括号
				2. 字符串模板参数的起始中括号
				3. 字符串起始双引号
		*/
		contentBuilder.appendString('(["');

		// 遍历 inner
		for(var i = inner.min, j = inner.length;i < j;i++){
			var expression = inner[i];

			// 如果是模板占位符表达式
			if(expression instanceof PlaceHolderExpression){
				// 分隔两个字符串
				contentBuilder.appendString('","');
				// 添加占位符表达式，目的是滞后编译
				placeholders.push(expression);
				continue;
			}

			// 直接编译该表达式
			expression.compileTo(contentBuilder);
		}

		/*
			追加：
				1. 字符串结束双引号
				2. 字符串模板参数的结束中括号
		*/
		contentBuilder.appendString('"]');

		// 遍历占位符表达式数组
		for(var x = 0, y = placeholders.length;x < y;x++){
			// 参数化提取该占位符表达式
			placeholders[x].parameterizeTo(contentBuilder);
		}

		// 追加函数调用起始小括号
		contentBuilder.appendString(")");
	}
);

this.OpenTemplateParameterTag = function(TemplateParameterExpression, visitor){
	/**
	 * 起始模板参数标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenTemplateParameterTag(_type){
		OpenTemplateTag.call(this, _type);
	};
	OpenTemplateParameterTag = new Rexjs(OpenTemplateParameterTag, OpenTemplateTag);

	OpenTemplateParameterTag.props({
		$class: CLASS_EXPRESSION_CONTEXT,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new TemplateParameterExpression(context, statement.expression);
		},
		order: ECMAScriptOrders.TEMPLATE_PARAMETER
	});

	return OpenTemplateParameterTag;
}(
	this.TemplateParameterExpression,
	OpenTemplateTag.prototype.visitor
);

}.call(
	this,
	this.TemplateExpression,
	this.PlaceHolderExpression,
	this.OpenTemplateTag
);


// 静态标签相关
!function(){

this.StaticTag = function(){
	/**
	 * 静态标签
	 * @param {Number} _type - 标签类型
	 */
	function StaticTag(_type){
		SyntaxTag.call(this, _type);
	};
	StaticTag = new Rexjs(StaticTag, SyntaxTag);

	StaticTag.props({
		regexp: /static/
	});

	return StaticTag;
}();

this.StaticModifierTag = function(StaticTag, IdentifierPropertyNameExpression){
	/**
	 * 静态属性修饰符标签
	 * @param {Number} _type - 标签类型
	 */
	function StaticModifierTag(_type){
		StaticTag.call(this, _type);
	};
	StaticModifierTag = new Rexjs(StaticModifierTag, StaticTag);

	StaticModifierTag.props({
		order: ECMAScriptOrders.STATIC_MODIFIER,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.staticModifierContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var classPropertyExpression = statement.expression;

			// 设置类属性表达式的修饰符
			classPropertyExpression.modifier = context;
			// 设置类属性表达式的属性名
			classPropertyExpression.name = new IdentifierPropertyNameExpression(context);
		}
	});

	return StaticModifierTag;
}(
	this.StaticTag,
	this.IdentifierPropertyNameExpression
);

}.call(
	this
);


// 一些类的辅助表达式相关
!function(PropertyExpression){

this.ExtendsExpression = function(){
	/**
	 * extends 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ExtendsExpression(context){
		Expression.call(this, context);
	};
	ExtendsExpression = new Rexjs(ExtendsExpression, Expression);

	ExtendsExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 直接提取 super 表达式即可
			this.super.extractTo(contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加空格，分离与 class 关键字 或 类名称
			contentBuilder.appendSpace();
			// 追加 extends 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格，分离 super
			contentBuilder.appendSpace();
			// 提取 super 表达式
			this.super.extractTo(contentBuilder);
		},
		super: null
	});

	return ExtendsExpression;
}(

);

this.DefaultExtendsExpression = function(ExtendsExpression){
	/**
	 * 默认 extends 表达式
	 */
	function DefaultExtendsExpression(){
		ExtendsExpression.call(this, null);
	};
	DefaultExtendsExpression = new Rexjs(DefaultExtendsExpression, ExtendsExpression);

	DefaultExtendsExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			contentBuilder.appendString("void 0");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(){}
	});

	return DefaultExtendsExpression;
}(
	this.ExtendsExpression
);
	
this.ClassPropertyExpression = function(extractTo, requestVariableOf){
	/**
	 * 类属性表达式
	 */
	function ClassPropertyExpression(){
		PropertyExpression.call(this);
	};
	ClassPropertyExpression = new Rexjs(ClassPropertyExpression, PropertyExpression);

	ClassPropertyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加 实例化类的属性
			contentBuilder.appendString(
				"new Rexjs." +
				(this.static ? "Static" : "Class") +
				"Property("
			);

			// 提取属性名
			this.name.defineTo(contentBuilder);
			// 追加参数分隔符逗号
			contentBuilder.appendString(",");
			// 以参数形式提取属性值
			this.value.argumentTo(contentBuilder);

			// 如果存在访问器
			if(this.accessible){
				// 追加 属性类型分隔符 及 属性类型
				contentBuilder.appendString(
					',"' + this.accessor.content + '"'
				);
			}

			// 追加实例化的结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果是静态属性
			if(this.static){
				// 追加修饰符
				contentBuilder.appendContext(this.modifier);
				// 追加空格
				contentBuilder.appendSpace();
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		modifier: null,
		/**
		 * 请求获取相关类表达式的临时变量名，如果没有，则先生成变量名
		 * @param {Statements} statements - 对象表达式所处的语句块
		 * @param {ClassExpression} classExpression - 类表达式
		 */
		requestVariableOf: function(statements, classExpression){
			return requestVariableOf.call(this, statements, classExpression) + (this.static ? "" : ".prototype");
		},
		/**
		 * 给相关类表达式设置编译时所需使用的临时变量名
		 * @param {Statements} statements - 类表达式所处的语句块
		 * @param {ClassExpression} classExpression - 类表达式
		 */
		setCompiledVariableTo: function(statements, classExpression){
			this.requestVariableOf(statements, classExpression);
		},
		/**
		 * 获取该属性是否为静态属性
		 */
		get static(){
			return this.named(this.modifier);
		}
	});

	return ClassPropertyExpression;
}(
	PropertyExpression.prototype.extractTo,
	PropertyExpression.prototype.requestVariableOf
);

}.call(
	this,
	this.PropertyExpression
);


// 类标签相关
!function(){

this.ClassExpression = function(DefaultExtendsExpression){
	/**
	 * 类表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ClassExpression(context){
		Expression.call(this, context);
	};
	ClassExpression = new Rexjs(ClassExpression, Expression);

	ClassExpression.props({
		/**
		 * 自动化生成变量，以模拟 ObjectExpression 环境
		 * @param {ECMAScriptStatements} statements - 当前语句块
		 */
		autoVariable: function(statements){},
		extends: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var body = this.body, extendsExpression = this.extends;

			// 如果需要编译
			if(config.es6Base){
				var variable = this.variable;

				// 追加 create 方法头部代码
				contentBuilder.appendString(
					"(" +
					(variable ? variable + "=" : "") +
					"Rexjs.Class.create("
				);

				// 如果存在继承，说明有父类
				if(extendsExpression){
					// 编译继承表达式
					extendsExpression.compileTo(contentBuilder);
				}
				else {
					// 追加 undefined
					contentBuilder.appendString("void 0");
				}

				// 追加 父类 与 属性数组的起始中括号
				contentBuilder.appendString(",[");
				// 编译类主体
				body.compileTo(contentBuilder);
				// 追加 属性数组的结束中括号 和 构造函数的索引值，并传入闭包参数，目的是 更快的访问 及 更小的压缩代码
				contentBuilder.appendString("], " + body.indexOfConstructor.toString() + "))");
				return;
			}

			// 追加 class 关键字上下文
			contentBuilder.appendContext(this.context);
			// 提取类名称
			this.name.extractTo(contentBuilder);

			// 如果存在继承，说明有父类
			if(extendsExpression){
				// 提取 extends 表达式
				extendsExpression.extractTo(contentBuilder);
			}
			
			// 提取主体
			body.extractTo(contentBuilder);
		},
		name: new DefaultExpression(),
		variable: ""
	});

	return ClassExpression;
}(
	this.DefaultExtendsExpression
);

this.ClassTag = function(ClassExpression){
	/**
	 * 类标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassTag(_type){
		SyntaxTag.call(this, _type);
	};
	ClassTag = new Rexjs(ClassTag, SyntaxTag);

	ClassTag.props({
		$class: CLASS_EXPRESSION,
		regexp: /class/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.classContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ClassExpression(context);
		}
	});

	return ClassTag;
}(
	this.ClassExpression
);

this.ClassNameTag = function(VariableDeclarationTag){
	/**
	 * 类名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassNameTag(_type){
		VariableDeclarationTag.call(this, _type);
	};
	ClassNameTag = new Rexjs(ClassNameTag, VariableDeclarationTag);

	ClassNameTag.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加空格
			contentBuilder.appendSpace();
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.classNameContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置类表达式的名称
			statement.expression.name = new Expression(context);
		}
	});

	return ClassNameTag;
}(
	this.VariableDeclarationTag
);

}.call(
	this
);


// 类声明标签相关
!function(ClassExpression, ClassNameTag){

this.ClassDeclarationExpression = function(extractTo){
	/**
	 * 类声明表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ClassDeclarationExpression(context){
		ClassExpression.call(this, context);
	};
	ClassDeclarationExpression = new Rexjs(ClassDeclarationExpression, ClassExpression);

	ClassDeclarationExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 如果还没声明
				if(this.undeclaredIfCompile){
					// 追加 var 关键字
					contentBuilder.appendString("var");
				}
				
				// 提取名称
				this.name.extractTo(contentBuilder);
				// 追加变量赋值等于号
				contentBuilder.appendString("=");
				// 调用父类方法
				extractTo.call(this, contentBuilder);
				// 追加语句结束分号
				contentBuilder.appendString(";");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 获取表达式状态
		 */
		get state(){
			return STATE_STATEMENT_ENDED;
		},
		/**
		 * 设置表达式状态
		 */
		set state(value){},
		undeclaredIfCompile: true
	});

	return ClassDeclarationExpression;
}(
	ClassExpression.prototype.extractTo
);

this.ClassDeclarationTag = function(ClassTag, ClassDeclarationExpression){
	/**
	 * 类声明标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassDeclarationTag(context){
		ClassTag.call(this, context);
	};
	ClassDeclarationTag = new Rexjs(ClassDeclarationTag, ClassTag);

	ClassDeclarationTag.props({
		$class: CLASS_STATEMENT_BEGIN,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.classVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ClassDeclarationExpression(context);
		}
	});

	return ClassDeclarationTag;
}(
	this.ClassTag,
	this.ClassDeclarationExpression
);

this.ClassVariableTag = function(visitor){
	/**
	 * 类名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassVariableTag(_type){
		ClassNameTag.call(this, _type);
	};
	ClassVariableTag = new Rexjs(ClassVariableTag, ClassNameTag);

	ClassVariableTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var generator = statements.contextGeneratorIfNeedCompile;

			// 如果存在需要编译的生成器
			if(generator){
				var range = statements.collections.declaration.range();

				// 添加变量名收集范围
				generator.ranges.push(range);
				// 收集变量名
				this.collectTo(parser, context, statements);
				// 范围结束
				range.end();

				// 设置 undeclaredIfCompile 属性，表示已经被提出到生成器之前声明过
				statement.expression.undeclaredIfCompile = false;
			}
			else {
				// 收集变量名
				this.collectTo(parser, context, statements);
			}
			
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return ClassVariableTag;
}(
	ClassNameTag.prototype.visitor
);

}.call(
	this,
	this.ClassExpression,
	this.ClassNameTag
);


// 构造函数标签相关
!function(IdentifierPropertyNameExpression, ShorthandMethodBodyStatements, OpenShorthandMethodArgumentsTag, CloseShorthandMethodBodyTag, PHASE_NONE, PHASE_WAITING_CALL, PHASE_CALLED, closeConstructorArgumentsTag, closeConstructorBodyTag){

this.ConstructorNameExpression = function(){
	/**
	 * 构造函数名称表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ConstructorNameExpression(context){
		IdentifierPropertyNameExpression.call(this, context);
	};
	ConstructorNameExpression = new Rexjs(ConstructorNameExpression, IdentifierPropertyNameExpression);

	ConstructorNameExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				var context = this.context;
				
				// 如果有类名
				if(context){
					// 追加 空格 和 类名
					contentBuilder.appendString(" " + context.content);
				}
			}
		}
	});

	return ConstructorNameExpression;
}();

this.DefaultConstructorPropertyExpression = function(ClassPropertyExpression, ConstructorNameExpression){
	/**
	 * 默认构造函数表达式
	 * @param {Statements} statements - 当前语句块
	 * @param {Context} name - 类名称标签上下文
	 */
	function DefaultConstructorPropertyExpression(statements, classExpression){
		ClassPropertyExpression.call(this);

		// 初始化构造函数名称表达式
		this.name = new ConstructorNameExpression(classExpression.name.context);

		// 如果 extends 存在，说明有父类
		if(classExpression.extends){
			this.hasSuper = true;
			// 获取属性拥有者变量名
			this.propertyOwner = this.requestVariableOf(statements, classExpression);
		}
	};
	DefaultConstructorPropertyExpression = new Rexjs(DefaultConstructorPropertyExpression, ClassPropertyExpression);

	DefaultConstructorPropertyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加属性初始化代码
			contentBuilder.appendString('new Rexjs.ClassProperty("constructor",function');
			// 提取名称
			this.name.extractTo(contentBuilder);

			// 追加函数参数及主体的起始大括号
			contentBuilder.appendString("(){");

			// 如果有父类
			if(this.hasSuper){
				// 追加父类构造函数的调用
				contentBuilder.appendString(
					"return Rexjs.Super.callConstructor(" + this.propertyOwner + ", this);"
				);
			}

			// 追加函数的结束大括号及 ClassProperty 方法的结束小括号
			contentBuilder.appendString("})");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(){},
		hasSuper: false,
		name: null,
		/**
		 * 获取属性的拥有者
		 * @param {ClassExpression} classExpression - 类表达式
		 */
		owner: function(){
			return this.propertyOwner;
		},
		propertyOwner: ""
	});

	return DefaultConstructorPropertyExpression;
}(
	this.ClassPropertyExpression,
	this.ConstructorNameExpression
);

this.ConstructorBodyStatements = function(extractTo, applyAfterSuperCall){
	/**
	 * 简写方法主体语句块
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 * @param {Number} phase - 该语句块的父类调用阶段
	 */
	function ConstructorBodyStatements(target, phase){
		var extendsExpression = target.statement.target.target.target.expression.extends;

		ShorthandMethodBodyStatements.call(this, target);

		// 如果存在继承关系，说明有父类
		if(extendsExpression){
			this.phase = PHASE_WAITING_CALL;

			// 如果需要编译
			if(config.es6Base){
				this.reference = this.collections.generate();
			}

			return;
		}

		this.phase = PHASE_NONE;
	};
	ConstructorBodyStatements = new Rexjs(ConstructorBodyStatements, ShorthandMethodBodyStatements);

	ConstructorBodyStatements.static({
		PHASE_CALLED: PHASE_CALLED,
		PHASE_NONE: PHASE_NONE,
		PHASE_WAITING_CALL: PHASE_WAITING_CALL
	});

	ConstructorBodyStatements.props({
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 如果是在 super 调用之后
			applyAfterSuperCall(parser, this, context);
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			// 判断阶段
			switch(this.phase){
				// 如果已经调用过 super
				case PHASE_CALLED:
					// 报错
					parser.error(open, ECMAScriptErrors.SUPER_RECALL);
					return;

				// 如果正在等待调用 super
				case PHASE_WAITING_CALL:
					break;

				default:
					// 报错
					parser.error(open, ECMAScriptErrors.SUPER_CALL_UNEXTEND);
					return;
			}

			// 表示已经调用过 super
			this.phase = PHASE_CALLED;
		},
		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 */
		applyThis: function(parser, context){
			// 如果是在 super 调用之后
			if(applyAfterSuperCall(parser, this, context)){
				// 修改 this 上下文的文本内容为临时变量名，因为 this 是要根据 super 的返回值来决定的
				context.content = this.reference;
			}
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			extractTo.call(this, contentBuilder);

			// 如果需要编译
			if(config.es6Base){
				// 如果父类被调用过，说明存在父类
				if(this.phase === PHASE_CALLED){
					// 追加构造函数返回值
					contentBuilder.appendString("return " + this.reference + ";");
				}
			}
		},
		phase: PHASE_NONE
	});

	return ConstructorBodyStatements;
}(
	ShorthandMethodBodyStatements.prototype.extractTo,
	// applyAfterSuperCall
	function(parser, statements, context){
		// 判断阶段
		switch(statements.phase){
			// 无阶段，说明没有父类
			case PHASE_NONE:
				return false;

			// 如果 super 已经被调用
			case PHASE_CALLED:
				return true;
		}

		// 报错，因为进入这里，说明是在没有调用 super 之前
		parser.error(
			context,
			ECMAScriptErrors.template("KEYWORD", context.content)
		);
	}
);

this.ConstructorTag = function(WordPropertyNameTag, ConstructorPropertyExpression){
	/**
	 * 构造函数标签
	 * @param {Number} _type - 标签类型
	 */
	function ConstructorTag(_type){
		WordPropertyNameTag.call(this, _type);
	};
	ConstructorTag = new Rexjs(ConstructorTag, WordPropertyNameTag);

	ConstructorTag.props({
		regexp: WordPropertyNameTag.compileRegExp("constructor"),
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constructorArgumentsTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var propertyExpression = statement.expression;

			// 设置类的名称
			propertyExpression.name = new IdentifierPropertyNameExpression(context);

			// 如果是静态属性
			if(propertyExpression.static){
				return;
			}

			// 如果存在访问器
			if(propertyExpression.accessible){
				// 报错
				parser.error(
					context,
					ECMAScriptErrors.template("CONSTRUCTOR", "an accessor")
				);

				return;
			}

			var classBodyExpression = statement.target.expression.body;

			// 设置类主体表达式的构造函数索引
			classBodyExpression.indexOfConstructor = classBodyExpression.inner.length;
		}
	});

	return ConstructorTag;
}(
	this.WordPropertyNameTag,
	this.ConstructorPropertyExpression
);

this.OpenConstructorArgumentsTag = function(ConstructorNameExpression, visitor){
	/**
	 * 构造函数参数起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenConstructorArgumentsTag(_type){
		OpenShorthandMethodArgumentsTag.call(this, _type);
	};
	OpenConstructorArgumentsTag = new Rexjs(OpenConstructorArgumentsTag, OpenShorthandMethodArgumentsTag);

	OpenConstructorArgumentsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeConstructorArgumentsTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 设置构造函数的函数表达式的名称
			statements.statement.target.expression.name = new ConstructorNameExpression(statement.target.expression.name.context);
		}
	});

	return OpenConstructorArgumentsTag;
}(
	this.ConstructorNameExpression,
	OpenShorthandMethodArgumentsTag.prototype.visitor
);

this.CloseConstructorArgumentsTag = function(CloseShorthandMethodArgumentsTag){
	/**
	 * 构造函数参数结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseConstructorArgumentsTag(_type){
		CloseShorthandMethodArgumentsTag.call(this, _type);
	};
	CloseConstructorArgumentsTag = new Rexjs(CloseConstructorArgumentsTag, CloseShorthandMethodArgumentsTag);

	CloseConstructorArgumentsTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.constructorBodyTags;
		}
	});

	return CloseConstructorArgumentsTag;
}(
	this.CloseShorthandMethodArgumentsTag
);

this.OpenConstructorBodyTag = function(OpenShorthandMethodBodyTag, ConstructorBodyStatements){
	/**
	 * 构造函数起始主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenConstructorBodyTag(_type){
		OpenShorthandMethodBodyTag.call(this, _type);
	};
	OpenConstructorBodyTag = new Rexjs(OpenConstructorBodyTag, OpenShorthandMethodBodyTag);

	OpenConstructorBodyTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeConstructorBodyTag;
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 当前语句块
		 */
		getBoundStatements: function(statements){
			return new ConstructorBodyStatements(statements);
		}
	});

	return OpenConstructorBodyTag;
}(
	this.OpenShorthandMethodBodyTag,
	this.ConstructorBodyStatements
);

this.CloseConstructorBodyTag = function(visitor){
	/**
	 * 构造函数起始主体标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseConstructorBodyTag(_type){
		CloseShorthandMethodBodyTag.call(this, _type);
	};
	CloseConstructorBodyTag = new Rexjs(CloseConstructorBodyTag, CloseShorthandMethodBodyTag);

	CloseConstructorBodyTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果需要调用 super，但没有调用
			if(statement.expression.inner.phase === PHASE_WAITING_CALL){
				// 报错
				parser.error(statement.target.target.expression.name.context, ECMAScriptErrors.WITHOUT_SUPER_CALL);
				return;
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return CloseConstructorBodyTag;
}(
	CloseShorthandMethodBodyTag.prototype.visitor
);

closeConstructorArgumentsTag = new this.CloseConstructorArgumentsTag();
closeConstructorBodyTag = new this.CloseConstructorBodyTag();

}.call(
	this,
	this.IdentifierPropertyNameExpression,
	this.ShorthandMethodBodyStatements,
	this.OpenShorthandMethodArgumentsTag,
	this.CloseShorthandMethodBodyTag,
	// PHASE_NONE
	0,
	// PHASE_WAITING_CALL
	1,
	// PHASE_CALLED
	2,
	// closeConstructorArgumentsTag
	null,
	// closeConstructorBodyTag
	null
);


// 类的属性名相关
(function(closeClassComputedPropertyNameTag, require){

this.ClassIdentifierPropertyNameTag = function(IdentifierPropertyNameTag){
	/**
	 * 类标识符属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassIdentifierPropertyNameTag(_type){
		IdentifierPropertyNameTag.call(this, _type);
	};
	ClassIdentifierPropertyNameTag = new Rexjs(ClassIdentifierPropertyNameTag, IdentifierPropertyNameTag);

	ClassIdentifierPropertyNameTag.props({
		regexp: new RegExp(IDENTIFIER_REGEXP_SOURCE),
		require: require
	});

	return ClassIdentifierPropertyNameTag;
}(
	this.IdentifierPropertyNameTag
);

this.ClassNumberPropertyNameTag = function(NumberPropertyNameTag){
	/**
	 * 类数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassNumberPropertyNameTag(context){
		NumberPropertyNameTag.call(this, context);
	};
	ClassNumberPropertyNameTag = new Rexjs(ClassNumberPropertyNameTag, NumberPropertyNameTag);

	ClassNumberPropertyNameTag.props({
		require: require
	});

	return ClassNumberPropertyNameTag;
}(
	this.NumberPropertyNameTag
);

this.ClassBinaryNumberPropertyNameTag = function(BinaryNumberPropertyNameTag){
	/**
	 * 类二进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassBinaryNumberPropertyNameTag(context){
		BinaryNumberPropertyNameTag.call(this, context);
	};
	ClassBinaryNumberPropertyNameTag = new Rexjs(ClassBinaryNumberPropertyNameTag, BinaryNumberPropertyNameTag);

	ClassBinaryNumberPropertyNameTag.props({
		require: require
	});

	return ClassBinaryNumberPropertyNameTag;
}(
	this.BinaryNumberPropertyNameTag
);

this.ClassOctalNumberPropertyNameTag = function(OctalNumberPropertyNameTag){
	/**
	 * 类八进制数字属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassOctalNumberPropertyNameTag(context){
		OctalNumberPropertyNameTag.call(this, context);
	};
	ClassOctalNumberPropertyNameTag = new Rexjs(ClassOctalNumberPropertyNameTag, OctalNumberPropertyNameTag);

	ClassOctalNumberPropertyNameTag.props({
		require: require
	});

	return ClassOctalNumberPropertyNameTag;
}(
	this.OctalNumberPropertyNameTag
);

this.ClassStringPropertyNameTag = function(StringPropertyNameTag){
	/**
	 * 类字符串属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassStringPropertyNameTag(context){
		StringPropertyNameTag.call(this, context);
	};
	ClassStringPropertyNameTag = new Rexjs(ClassStringPropertyNameTag, StringPropertyNameTag);

	ClassStringPropertyNameTag.props({
		require: require
	});

	return ClassStringPropertyNameTag;
}(
	this.StringPropertyNameTag
);

this.OpenClassComputedPropertyNameTag = function(OpenComputedPropertyNameTag){
	/**
	 * 起始类计算式属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenClassComputedPropertyNameTag(context){
		OpenComputedPropertyNameTag.call(this, context);
	};
	OpenClassComputedPropertyNameTag = new Rexjs(OpenClassComputedPropertyNameTag, OpenComputedPropertyNameTag);

	OpenClassComputedPropertyNameTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeClassComputedPropertyNameTag;
		}
	});

	return OpenClassComputedPropertyNameTag;
}(
	this.OpenComputedPropertyNameTag
);

this.CloseClassComputedPropertyNameTag = function(CloseComputedPropertyNameTag){
	/**
	 * 结束类计算式方法名标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseClassComputedPropertyNameTag(context){
		CloseComputedPropertyNameTag.call(this, context);
	};
	CloseClassComputedPropertyNameTag = new Rexjs(CloseClassComputedPropertyNameTag, CloseComputedPropertyNameTag);

	CloseClassComputedPropertyNameTag.props({
		require: require
	});

	return CloseClassComputedPropertyNameTag;
}(
	this.CloseComputedPropertyNameTag
);

closeClassComputedPropertyNameTag = new this.CloseClassComputedPropertyNameTag();

}.call(
	this,
	// closeClassComputedPropertyNameTag
	null,
	// require
	function(tagsMap){
		return tagsMap.classIdentifierPropertyNameContextTags;
	}
));


// 类的属性初始化表达式相关
(function(){

this.ClassPropertyInitializerExpression = function(PropertyInitializerExpression){
	/**
	 * 类属性初始值表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Expression} variable - 对象简写属性所对应的变量名
	 */
	function ClassPropertyInitializerExpression(context, variable){
		PropertyInitializerExpression.call(this, context, variable);
	};
	ClassPropertyInitializerExpression = new Rexjs(ClassPropertyInitializerExpression, PropertyInitializerExpression);

	ClassPropertyInitializerExpression.props({
		/**
		 * 以参数模式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		argumentTo: function(contentBuilder){
			// 提取并编译表达式文本内容
			this.compileTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 直接提取值
			this.operand.extractTo(contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.rexjs){
				// 提取并编译表达式文本内容
				this.compileTo(contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});

	return ClassPropertyInitializerExpression;
}(
	this.PropertyInitializerExpression
);

this.ClassPropertyInitializerTag = function(PropertyInitializerTag, ClassPropertyInitializerExpression){
	/**
	 * 类属性初始化标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassPropertyInitializerTag(_type){
		PropertyInitializerTag.call(this, _type);
	};
	ClassPropertyInitializerTag = new Rexjs(ClassPropertyInitializerTag, PropertyInitializerTag);

	ClassPropertyInitializerTag.props({
		$type: TYPE_MATCHABLE,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new ClassPropertyInitializerExpression(context, statement.expression.name);
		}
	});

	return ClassPropertyInitializerTag;
}(
	this.PropertyInitializerTag,
	this.ClassPropertyInitializerExpression
);

}.call(
	this
));


// 类属性访问器标签相关
!function(require){

this.GetDescriptorTag = function(GetTag){
	/**
	 * 类属性访问器 get 标签
	 * @param {Number} _type - 标签类型
	 */
	function GetDescriptorTag(context){
		GetTag.call(this, context);
	};
	GetDescriptorTag = new Rexjs(GetDescriptorTag, GetTag);

	GetDescriptorTag.props({
		require: require
	});

	return GetDescriptorTag;
}(
	this.GetTag
);

this.SetDescriptorTag = function(SetTag){
	/**
	 * 类属性访问器 set 标签
	 * @param {Number} _type - 标签类型
	 */
	function SetDescriptorTag(context){
		SetTag.call(this, context);
	};
	SetDescriptorTag = new Rexjs(SetDescriptorTag, SetTag);

	SetDescriptorTag.props({
		require: require
	});

	return SetDescriptorTag;
}(
	this.SetTag
);

}.call(
	this,
	// require
	function(tagsMap){
		return tagsMap.accessorDescriptorContextTags;
	}
);


// 类主体标签相关
!function(DefaultConstructorPropertyExpression, BinaryNumberTag, OctalNumberTag, classPropertySeparatorTag, closeClassBodyTag){

this.ClassBodyExpression = function(ObjectExpression, extractTo, compileItem){
	/**
	 * 对象表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function ClassBodyExpression(open){
		ObjectExpression.call(this, open);
	};
	ClassBodyExpression = new Rexjs(ClassBodyExpression, ObjectExpression);

	ClassBodyExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 执行属性连接
			this.inner.execJoin(compileItem, contentBuilder);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 设置属性的连接符
			this.inner.join = ";";
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		indexOfConstructor: -1
	});

	return ClassBodyExpression;
}(
	this.ObjectExpression,
	PartnerExpression.prototype.extractTo,
	// compileItem
	function(item, contentBuilder){
		item.compileTo(contentBuilder);
	}
);

this.ClassPropertyStatement = function(PropertyStatement, ClassPropertyExpression, ClassPropertyInitializerExpression, IdentifierTag, NumberTag, StringTag, insertConstructorIfNeed, getNumberTag){
	/**
	 * 类属性语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ClassPropertyStatement(statements){
		PropertyStatement.call(this, statements);
	};
	ClassPropertyStatement = new Rexjs(ClassPropertyStatement, PropertyStatement);

	ClassPropertyStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var classExpression = this.out(), classBodyExpression = classExpression.body, propertyExpression = this.expression;

			// 如果名称存在，说明不是空表达式
			if(propertyExpression.name){
				// 如果存在访问器
				if(propertyExpression.accessible){
					// 根据访问器核对函数正确性
					propertyExpression.accessor.tag.checkFunction(
						parser,
						propertyExpression.value.operand,
						context
					);
				}

				// 添加属性表达式
				classBodyExpression.inner.add(propertyExpression);
			}

			var t, tag = this.tagOf(), content = context.content;

			switch(content){
				// 如果是属性分隔符
				case ";":
					return tag.separator;

				// 如果是结束大括号
				case "}":
					// 可能性的插入构造函数，即需要解析时候，又没有定义构造函数属性
					insertConstructorIfNeed(parser, classExpression, classBodyExpression);
					// 返回类主体结束大括号
					return tag.binding;

				// 如果是 static
				case "static":
					t = tag.staticModifier;
					break;

				// 如果是 constructor
				case "constructor":
					t = tag.constructorMethodName;
					break;

				// 如果是 get
				case "get":
					t = tag.getDescriptor;
					break;

				// 如果是 set
				case "set":
					t = tag.setDescriptor;
					break;
				
				// 如果是计算式起始中括号
				case "[":
					t = tag.openClassComputedPropertyName;
					break;

				// 其他
				default: {
					var contextTag = context.tag;

					switch(true){
						// 如果标签是标识符标签
						case contextTag instanceof IdentifierTag:
							t = tag.classIdentifierPropertyNameTag;
							break;

						// 如果是数字标签
						case contextTag instanceof NumberTag:
							// 判断类型，并返回
							t = getNumberTag(tag, contextTag);
							break;

						// 如果是字符串标签
						case contextTag instanceof StringTag:
							t = tag.classStringPropertyName;
							break;
						
						// 如果是关键字标签
						case IdentifierTag.keywords.indexOf(content) > -1:
							t = tag.classIdentifierPropertyNameTag;
							break;

						default:
							// 其他都是非法字符，报错
							parser.error(context);
							return null;
					}
				}
			}

			var statements = this.statements;

			// 如果两属性之间没有换行
			if((propertyExpression.state & STATE_STATEMENT_ENDABLE) !== STATE_STATEMENT_ENDABLE){
				// 如果上一个属性为属性赋值表达式
				if(propertyExpression.value instanceof ClassPropertyInitializerExpression){
					// 报错
					parser.error(context);
					return null;
				}
			}

			// 设置当前语句
			statements.statement = new ClassPropertyStatement(statements);
			return t;
		},
		/**
		 * 初始化类属性表达式
		 */
		initExpression: function(){
			this.expression = new ClassPropertyExpression();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.body.context.tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 直接报错
			parser.error(context);
		}
	});

	return ClassPropertyStatement;
}(
	this.PropertyStatement,
	this.ClassPropertyExpression,
	this.ClassPropertyInitializerExpression,
	this.IdentifierTag,
	this.NumberTag,
	this.StringTag,
	// insertConstructorIfNeed
	function(parser, classExpression, classBodyExpression){
		switch(false){
			// 如果不需要编译
			case config.base6Base:
				return;

			// 如果已有构造函数
			case classBodyExpression.indexOfConstructor === -1:
				return;
		}

		var inner = classBodyExpression.inner;

		// 设置构造函数索引值
		classBodyExpression.indexOfConstructor = inner.length;

		// 添加构造函数表达式
		inner.add(
			new DefaultConstructorPropertyExpression(parser.statements, classExpression)
		);
	},
	// getNumberTag
	function(tag, contextTag){
		// 如果是二进制数字标签
		if(contextTag instanceof BinaryNumberTag){
			return tag.classBinaryNumberPropertyName;
		}

		// 如果是八进制数字标签
		if(contextTag instanceof OctalNumberTag){
			return tag.classOctalNumberPropertyName;
		}

		// 返回 es5 数字标签
		return tag.classNumberPropertyName;
	}
);

this.OpenClassBodyTag = function(
	OpenObjectTag,
	ClassBodyExpression, ClassPropertyStatement,
	classBinaryNumberPropertyNameTag, classIdentifierPropertyNameTag, classNumberPropertyNameTag,
	classOctalNumberPropertyNameTag, classStringPropertyNameTag, openClassComputedPropertyNameTag,
	constructorTag, getDescriptorTag, setDescriptorTag, staticModifierTag
){
	/**
	 * 起始函数主体标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenClassBodyTag(_type){
		OpenObjectTag.call(this, _type);
	};
	OpenClassBodyTag = new Rexjs(OpenClassBodyTag, OpenObjectTag);

	OpenClassBodyTag.props({
		/**
		 * 获取绑定的类主体结束标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeClassBodyTag;
		},
		/**
		 * 获取绑定的二进制数字标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get classBinaryNumberPropertyName(){
			return classBinaryNumberPropertyNameTag;
		},
		/**
		 * 获取绑定的标识符属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get classIdentifierPropertyNameTag(){
			return classIdentifierPropertyNameTag;
		},
		/**
		 * 获取绑定的数字属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get classNumberPropertyName(){
			return classNumberPropertyNameTag;
		},
		/**
		 * 获取绑定的八进制数字属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get classOctalNumberPropertyName(){
			return classOctalNumberPropertyNameTag;
		},
		/**
		 * 获取绑定的字符串属性名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get classStringPropertyName(){
			return classStringPropertyNameTag;
		},
		/**
		 * 获取绑定的构造函数标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get constructorMethodName(){
			return constructorTag;
		},
		/**
		 * 获取绑定的 get 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get getDescriptor(){
			return getDescriptorTag;
		},
		/**
		 * 获取绑定的起始计算式名标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get openClassComputedPropertyName(){
			return openClassComputedPropertyNameTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return classPropertySeparatorTag;
		},
		/**
		 * 获取绑定的 set 标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get setDescriptor(){
			return setDescriptorTag;
		},
		/**
		 * 获取绑定的 static 修饰符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get staticModifier(){
			return staticModifierTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openClassBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置类表达式的主体
			statement.expression.body = new ClassBodyExpression(context);
			// 设置当前语句
			statements.statement = new ClassPropertyStatement(statements);
		}
	});

	return OpenClassBodyTag;
}(
	this.OpenObjectTag,
	this.ClassBodyExpression,
	this.ClassPropertyStatement,
	// classBinaryNumberPropertyNameTag
	new this.ClassBinaryNumberPropertyNameTag(),
	// classIdentifierPropertyNameTag
	new this.ClassIdentifierPropertyNameTag(),
	// classNumberPropertyNameTag
	new this.ClassNumberPropertyNameTag(),
	// classOctalNumberPropertyNameTag
	new this.ClassOctalNumberPropertyNameTag(),
	// classStringPropertyNameTag
	new this.ClassStringPropertyNameTag(),
	// openClassComputedPropertyNameTag
	new this.OpenClassComputedPropertyNameTag(),
	// constructorTag
	new this.ConstructorTag(),
	// getDescriptorTag
	new this.GetDescriptorTag(),
	// setDescriptorTag
	new this.SetDescriptorTag(),
	// staticModifierTag
	new this.StaticModifierTag()
);

this.ClassPropertySeparatorTag = function(SemicolonTag, ClassPropertyStatement){
	/**
	 * 类属性分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassPropertySeparatorTag(_type){
		SemicolonTag.call(this, _type);
	};
	ClassPropertySeparatorTag = new Rexjs(ClassPropertySeparatorTag, SemicolonTag);

	ClassPropertySeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.openClassBodyContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new ClassPropertyStatement(statements);
		}
	});

	return ClassPropertySeparatorTag;
}(
	this.SemicolonTag,
	this.ClassPropertyStatement
);

this.ClassPropertyPlaceholderTag = function(ClassPropertySeparatorTag){
	/**
	 * 类属性占位符（即空属性分隔符）标签
	 * @param {Number} _type - 标签类型
	 */
	function ClassPropertyPlaceholderTag(_type){
		ClassPropertySeparatorTag.call(this, _type);
	};
	ClassPropertyPlaceholderTag = new Rexjs(ClassPropertyPlaceholderTag, ClassPropertySeparatorTag);

	ClassPropertyPlaceholderTag.props({
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(){}
	});

	return ClassPropertyPlaceholderTag;
}(
	this.ClassPropertySeparatorTag
);

this.CloseClassBodyTag = function(CloseObjectTag){
	/**
	 * 类主体结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseClassBodyTag(_type){
		CloseObjectTag.call(this, _type);
	};
	CloseClassBodyTag = new Rexjs(CloseClassBodyTag, CloseObjectTag);

	CloseClassBodyTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap, currentTags, parser){
			return (
				// 如果表达式已结束
				(parser.statements.statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED ?
					tagsMap.mistakableTags :
					tagsMap.expressionContextTags
			);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 close
			statement.expression.body.close = context;
		}
	});

	return CloseClassBodyTag;
}(
	this.CloseObjectTag
);

classPropertySeparatorTag = new this.ClassPropertySeparatorTag();
closeClassBodyTag = new this.CloseClassBodyTag();

}.call(
	this,
	this.DefaultConstructorPropertyExpression,
	this.BinaryNumberTag,
	this.OctalNumberTag,
	// classPropertySeparatorTag
	null,
	// closeClassBodyTag
	null
);


// 继承标签相关
!function(){

this.ExtendsStatement = function(){
	function ExtendsStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ExtendsStatement = new Rexjs(ExtendsStatement, ECMAScriptStatement);

	ExtendsStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果是起始大括号
			if(context.content !== "{"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句并设置 extends 表达式的 super 属性
			this.out().extends.super = this.expression;
			return this.bindingOf();
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.extends.context.tag;
		},
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			switch(context.content){
				// 点属性访问器
				case ".":
					break;

				// 中括号属性访问器
				case "[":
					break;

				// 方法调用
				case "(":
					break;

				// 模板方法调用
				case "`":
					break;

				default:
					// 报错
					parser.error(context);
					return null;
			}

			return context.tag;
		}
	});

	return ExtendsStatement;
}();

this.ExtendsTag = function(ExtendsExpression, ExtendsStatement, openClassBodyTag){
	/**
	 * extends 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ExtendsTag(_type){
		SyntaxTag.call(this, _type);
	};
	ExtendsTag = new Rexjs(ExtendsTag, SyntaxTag);

	ExtendsTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return openClassBodyTag;
		},
		regexp: /extends/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.extendsContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var classExpression = statement.expression;

			// 如果需要编译
			if(config.es6Base){
				// 生成临时变量名
				classExpression.variable = statements.collections.generate();
			}

			// 设置类表达式的 extends 属性
			classExpression.extends = new ExtendsExpression(context);
			// 设置当前语句
			statements.statement = new ExtendsStatement(statements);
		}
	});

	return ExtendsTag;
}(
	this.ExtendsExpression,
	this.ExtendsStatement,
	// openClassBodyTag
	new this.OpenClassBodyTag()
);

}.call(
	this
);


// 父类属性相关
!function(AccessorExpression, BracketAccessorExpression, OpenBracketAccessorTag, DotAccessorTag, closeSuperBracketAccessorTag, compileSuperAccessor){

this.SuperBracketAccessorExpression = function(extractTo){
	/**
	 * 父类中括号属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statement} statement - 当前语句
	 */
	function SuperBracketAccessorExpression(context, statement){
		BracketAccessorExpression.call(this, context, statement.expression);

		this.closureReference = statement.statements.closure.reference;
	};
	SuperBracketAccessorExpression = new Rexjs(SuperBracketAccessorExpression, BracketAccessorExpression);
	
	SuperBracketAccessorExpression.props({
		closureReference: "",
		/**
		 * 提取属性文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compilePropertyTo: function(contentBuilder){
			// 追加起始小括号，以防止 a[x,y,z] 这样的属性所造成 getProperty 方法的参数混乱
			contentBuilder.appendString("(");
			// 提取中括号内部代码
			this.property.inner.extractTo(contentBuilder);
			// 追加结束小括号
			contentBuilder.appendString(")");
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 编译父类属性访问器
				compileSuperAccessor(this, contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});
	
	return SuperBracketAccessorExpression;
}(
	BracketAccessorExpression.prototype.extractTo
);

this.SuperDotAccessorExpression = function(extractTo){
	/**
	 * 父类点属性访问器表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {Statement} statement - 当前语句
	 */
	function SuperDotAccessorExpression(context, statement){
		AccessorExpression.call(this, context, statement.expression);

		this.closureReference = statement.statements.closure.reference;
	};
	SuperDotAccessorExpression = new Rexjs(SuperDotAccessorExpression, AccessorExpression);
	
	SuperDotAccessorExpression.props({
		closureReference: "",
		/**
		 * 提取属性文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compilePropertyTo: function(contentBuilder){
			// 追加起始双引号
			contentBuilder.appendString('"');
			// 追加属性
			contentBuilder.appendContext(this.property);
			// 追加结束双引号
			contentBuilder.appendString('"');
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 编译父类属性访问器
				compileSuperAccessor(this, contentBuilder);
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});
	
	return SuperDotAccessorExpression;
}(
	AccessorExpression.prototype.extractTo
);

this.OpenSuperBracketAccessorTag = function(SuperBracketAccessorExpression, BracketAccessorStatement, visitor){
	/**
	 * 起始父类中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSuperBracketAccessorTag(_type){
		OpenBracketAccessorTag.call(this, _type);
	};
	OpenSuperBracketAccessorTag = new Rexjs(OpenSuperBracketAccessorTag, OpenBracketAccessorTag);
	
	OpenSuperBracketAccessorTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeSuperBracketAccessorTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new SuperBracketAccessorExpression(context, statement);
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new BracketAccessorStatement(statements);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前闭包申请调用 super
			statements.closure.applySuper(parser, statement.expression.context, context);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return OpenSuperBracketAccessorTag;
}(
	this.SuperBracketAccessorExpression,
	this.BracketAccessorStatement,
	OpenBracketAccessorTag.prototype.visitor
);

this.CloseSuperBracketAccessorTag = function(CloseBracketAccessorTag){
	/**
	 * 结束父类中括号属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseSuperBracketAccessorTag(_type){
		CloseBracketAccessorTag.call(this, _type);
	};
	CloseSuperBracketAccessorTag = new Rexjs(CloseSuperBracketAccessorTag, CloseBracketAccessorTag);
	
	CloseSuperBracketAccessorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superAccessorContextTags;
		}
	});
	
	return CloseSuperBracketAccessorTag;
}(
	this.CloseBracketAccessorTag
);

this.SuperDotAccessorTag = function(SuperDotAccessorExpression, visitor){
	/**
	 * 父类点属性访问器标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperDotAccessorTag(_type){
		DotAccessorTag.call(this, _type);
	};
	SuperDotAccessorTag = new Rexjs(SuperDotAccessorTag, DotAccessorTag);
	
	SuperDotAccessorTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new SuperDotAccessorExpression(context, statement);
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superPropertyNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前闭包申请调用 super
			statements.closure.applySuper(parser, statement.expression.context, context);
			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return SuperDotAccessorTag;
}(
	this.SuperDotAccessorExpression,
	DotAccessorTag.prototype.visitor
);

this.SuperPropertyNameTag = function(PropertyNameTag){
	/**
	 * 父类属性名标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyNameTag(_type){
		PropertyNameTag.call(this, _type);
	};
	SuperPropertyNameTag = new Rexjs(SuperPropertyNameTag, PropertyNameTag);
	
	SuperPropertyNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superAccessorContextTags;
		}
	});
	
	return SuperPropertyNameTag;
}(
	this.PropertyNameTag
);

closeSuperBracketAccessorTag = new this.CloseSuperBracketAccessorTag();

}.call(
	this,
	this.AccessorExpression,
	this.BracketAccessorExpression,
	this.OpenBracketAccessorTag,
	this.DotAccessorTag,
	// closeSuperBracketAccessorTag
	null,
	// compileSuperAccessor
	function(expression, contentBuilder, extractProperty){
		// 追加获取父类属性方法的起始代码
		contentBuilder.appendString("(Rexjs.Super.getProperty(");
		// 提取 super 表达式
		expression.object.extractTo(contentBuilder);
		// 追加当前环境的 this 指向
		contentBuilder.appendString("," + expression.closureReference + ",");
		// 提取属性
		expression.compilePropertyTo(contentBuilder);
		// 追加一系列结束小括号
		contentBuilder.appendString("))");
	}
);


// 父类属性赋值相关
!function(UnaryExpression, PostfixUnaryExpression, BinaryExpression, UnaryAssignmentStatement, SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT, extractTo, getBoundPostfixExpression, compileHead){

this.SuperPropertyBasicAssignmentExpression = function(){
	/**
	 * 父类属性基础赋值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SuperPropertyBasicAssignmentExpression(context){
		BinaryExpression.call(this, context);
	};
	SuperPropertyBasicAssignmentExpression = new Rexjs(SuperPropertyBasicAssignmentExpression, BinaryExpression);

	SuperPropertyBasicAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				var left = this.left;

				// 追加设置父类属性方法的起始代码
				contentBuilder.appendString("(Rexjs.Super.setProperty(");
				// 提取 super 表达式
				left.object.extractTo(contentBuilder);
				// 追加当前环境的 this 指向
				contentBuilder.appendString("," + left.closureReference + ",");
				// 编译属性名
				left.compilePropertyTo(contentBuilder);
				// 追加参数分隔符
				contentBuilder.appendString(",");
				// 追加属性值
				this.right.extractTo(contentBuilder);
				// 追加一系列结束小括号
				contentBuilder.appendString("))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		}
	});
	
	return SuperPropertyBasicAssignmentExpression;
}();

this.SuperPropertyShorthandAssignmentExpression = function(extractTo){
	/**
	 * 父类属性简写赋值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SuperPropertyShorthandAssignmentExpression(context){
		BinaryExpression.call(this, context);
	};
	SuperPropertyShorthandAssignmentExpression = new Rexjs(SuperPropertyShorthandAssignmentExpression, BinaryExpression);

	SuperPropertyShorthandAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				var content = this.context.content;

				// 追加获取属性值代码
				contentBuilder.appendString(
					// 编译头部
					compileHead(contentBuilder, this.left, this.variable) +
					content.substring(0, content.length - 1) +
					"("
				);

				// 追加属性值
				this.right.extractTo(contentBuilder);
				// 追加一系列结束小括号
				contentBuilder.appendString(")))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		variable: ""
	});
	
	return SuperPropertyShorthandAssignmentExpression;
}(
	BinaryExpression.prototype.extractTo
);

this.SuperPropertyUnaryAssignmentExpression = function(extractTo){
	/**
	 * 父类属性前置一元赋值表达式
	 * @param {Context} context - 标签上下文
	 */
	function SuperPropertyUnaryAssignmentExpression(context){
		UnaryExpression.call(this, context);
	};
	SuperPropertyUnaryAssignmentExpression = new Rexjs(SuperPropertyUnaryAssignmentExpression, UnaryExpression);
	
	SuperPropertyUnaryAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 追加获取属性值代码
				contentBuilder.appendString(
					// 编译头部
					compileHead(contentBuilder, this.operand, this.variable) +
					this.context.content[0] +
					"1"
				);

				// 追加一系列结束小括号
				contentBuilder.appendString("))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		variable: ""
	});
	
	return SuperPropertyUnaryAssignmentExpression;
}(
	UnaryExpression.prototype.extractTo
);

this.SuperPropertyPostfixUnaryAssignmentExpression = function(extractTo){
	/**
	 * 父类属性后置一元赋值表达式
	 * @param {Context} context - 标签上下文
	 * @param {AssignableExpression} operand - 操作对象表达式
	 */
	function SuperPropertyPostfixUnaryAssignmentExpression(context, operand){
		PostfixUnaryExpression.call(this, context, operand);
	};
	SuperPropertyPostfixUnaryAssignmentExpression = new Rexjs(SuperPropertyPostfixUnaryAssignmentExpression, PostfixUnaryExpression);
	
	SuperPropertyPostfixUnaryAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				var valueVariable = this.valueVariable;

				// 追加获取属性值代码
				contentBuilder.appendString(
					"(" + valueVariable + "=" +
						// 编译头部
						compileHead(contentBuilder, this.operand, this.nameVariable) +
					")" +
					this.context.content[0] +
					"1"
				);

				// 追加一系列结束小括号
				contentBuilder.appendString(")," + valueVariable + ")");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		nameVariable: "",
		valueVariable: ""
	});
	
	return SuperPropertyPostfixUnaryAssignmentExpression;
}(
	PostfixUnaryExpression.prototype.extractTo
);

this.SuperPropertyUnaryAssignmentStatement = function(SuperPropertyUnaryAssignmentExpression, SuperDotAccessorExpression, SuperBracketAccessorExpression, out){
	/**
	 * 父类属性一元赋值语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SuperPropertyUnaryAssignmentStatement(statements){
		UnaryAssignmentStatement.call(this, statements);
	};
	SuperPropertyUnaryAssignmentStatement = new Rexjs(SuperPropertyUnaryAssignmentStatement, UnaryAssignmentStatement);

	SuperPropertyUnaryAssignmentStatement.props({
		/**
		 * 跳出该语句
		 */
		out: function(){
			var expression = this.expression;

			// 如果表达式父类属性访问器表达式
			if(expression instanceof SuperDotAccessorExpression || expression instanceof SuperBracketAccessorExpression){
				var target = this.target, superPropertyUnaryAssignmentExpression = new SuperPropertyUnaryAssignmentExpression(target.expression.context);

				// 如果需要编译
				if(config.es6Base){
					// 生成并记录临时变量名
					superPropertyUnaryAssignmentExpression.variable = this.statements.collections.generate();
				}

				// 设置 target 的表达式
				target.expression = superPropertyUnaryAssignmentExpression;
			}

			// 调用父类方法
			return out.call(this);
		}
	});

	return SuperPropertyUnaryAssignmentStatement;
}(
	this.SuperPropertyUnaryAssignmentExpression,
	this.SuperDotAccessorExpression,
	this.SuperBracketAccessorExpression,
	UnaryAssignmentStatement.prototype.out
);

getBoundPostfixExpression = function(SuperPropertyPostfixUnaryAssignmentExpression){
	/**
	 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
	 * @param {Context} context - 相关的语法标签上下文
	 * @param {Statement} statement - 当前语句
	 */
	return function(context, statement){
		var expression = new SuperPropertyPostfixUnaryAssignmentExpression(context, statement.expression);

		// 如果需要解析
		if(config.es6Base){
			var collections = statement.statements.collections;
			
			// 生成并记录属性名临时变量名
			expression.nameVariable = collections.generate();
			// 生成并记录属性值临时变量名
			expression.valueVariable = collections.generate();
		}

		return expression;
	};
}(
	this.SuperPropertyPostfixUnaryAssignmentExpression
);

this.SuperPropertyBasicAssignmentTag = function(BasicAssignmentTag, SuperPropertyBasicAssignmentExpression){
	/**
	 * 父类属性基础赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyBasicAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	SuperPropertyBasicAssignmentTag = new Rexjs(SuperPropertyBasicAssignmentTag, BasicAssignmentTag);
	
	SuperPropertyBasicAssignmentTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new SuperPropertyBasicAssignmentExpression(context);
		},
		order: ECMAScriptOrders.SUPER_PROPERTY_ASSIGNMENT
	});
	
	return SuperPropertyBasicAssignmentTag;
}(
	this.BasicAssignmentTag,
	this.SuperPropertyBasicAssignmentExpression
);

this.SuperPropertyShorthandAssignmentTag = function(ShorthandAssignmentTag, SuperPropertyShorthandAssignmentExpression){
	/**
	 * 父类属性简写赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyShorthandAssignmentTag(_type){
		ShorthandAssignmentTag.call(this, _type);
	};
	SuperPropertyShorthandAssignmentTag = new Rexjs(SuperPropertyShorthandAssignmentTag, ShorthandAssignmentTag);
	
	SuperPropertyShorthandAssignmentTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			var expression = new SuperPropertyShorthandAssignmentExpression(context);

			// 如果需要解析
			if(config.es6Base){
				// 生成并记录临时变量名
				expression.variable = statement.statements.collections.generate();
			}

			return expression;
		},
		order: ECMAScriptOrders.SUPER_PROPERTY_SHORTHAND_ASSIGNMENT
	});
	
	return SuperPropertyShorthandAssignmentTag;
}(
	this.ShorthandAssignmentTag,
	this.SuperPropertyShorthandAssignmentExpression
);

this.SuperPropertyPostfixIncrementTag = function(PostfixIncrementTag){
	/**
	 * 父类属性后置递增标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyPostfixIncrementTag(_type){
		PostfixIncrementTag.call(this, _type);
	};
	SuperPropertyPostfixIncrementTag = new Rexjs(SuperPropertyPostfixIncrementTag, PostfixIncrementTag);
	
	SuperPropertyPostfixIncrementTag.props({
		getBoundExpression: getBoundPostfixExpression,
		order: SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT
	});
	
	return SuperPropertyPostfixIncrementTag;
}(
	this.PostfixIncrementTag
);

this.SuperPropertyPostfixDecrementTag = function(PostfixDecrementTag){
	/**
	 * 父类属性后置递减标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperPropertyPostfixDecrementTag(_type){
		PostfixDecrementTag.call(this, _type);
	};
	SuperPropertyPostfixDecrementTag = new Rexjs(SuperPropertyPostfixDecrementTag, PostfixDecrementTag);
	
	SuperPropertyPostfixDecrementTag.props({
		getBoundExpression: getBoundPostfixExpression,
		order: SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT
	});
	
	return SuperPropertyPostfixDecrementTag;
}(
	this.PostfixDecrementTag
);

}.call(
	this,
	this.UnaryExpression,
	this.PostfixUnaryExpression,
	this.BinaryExpression,
	this.UnaryAssignmentStatement,
	ECMAScriptOrders.SUPER_PROPERTY_POSTFIX_UNARY_ASSIGNMENT,
	this.BinaryExpression.prototype.extractTo,
	// getBoundPostfixExpression
	null,
	// compileHead
	function(contentBuilder, operand, variable){
		var propertyOwner = operand.object.propertyOwner, closureReference = operand.closureReference;

		// 追加设置 父类属性方法的起始代码、属性变量名 及 当前环境的 this 指向
		contentBuilder.appendString(
			"(Rexjs.Super.setProperty(" + propertyOwner + "," + closureReference + "," + variable + "="
		);

		// 编译属性名
		operand.compilePropertyTo(contentBuilder);
		// 追加分号
		contentBuilder.appendString(",");

		return (
			"Rexjs.Super.getProperty(" +
				propertyOwner + "," +
				closureReference + "," +
				variable +
			")"
		);
	}
);


// 父类调用相关
!function(CallExpression, OpenCallTag){

this.SuperCallExpression = function(extractTo){
	/**
	 * 父类调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 */
	function SuperCallExpression(open, statement){
		CallExpression.call(this, open, statement);

		this.constructorReference = statement.statements.closure.reference;
	};
	SuperCallExpression = new Rexjs(SuperCallExpression, CallExpression);

	SuperCallExpression.props({
		constructorReference: "",
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				contentBuilder.appendString("(" + this.constructorReference + "=Rexjs.Super.");
				
				// 如果有拓展符
				if(this.spread){
					// 设置 boundThis
					this.boundThis = "this";

					// 追加获取返回值函数的起始代码
					contentBuilder.appendString("returnedThis(this,");
					// 因为 super 不可能是对象属性，也不可能使用 new（语法上做了保护），所以直接使用 spreadTo 就可以了
					this.spreadTo(contentBuilder);
				}
				else {
					// 追加获取返回值函数的起始代码
					contentBuilder.appendString("callConstructor(");
					// 提取操作对象
					this.operand.extractTo(contentBuilder);
					// 追加 this 及 参数起始中括号
					contentBuilder.appendString(",this,[");
					// 提取参数
					this.inner.extractTo(contentBuilder);
					// 追加参数结束中括号
					contentBuilder.appendString("]");
				}

				// 追加以上关联的两个结束小括号
				contentBuilder.appendString("))");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 告知该表达式有拓展符
		 * @param {Statements} statements - 当前语句块
		 */
		spreadMatched: function(){
			this.spread = true;
		}
	});

	return SuperCallExpression;
}(
	CallExpression.prototype.extractTo
);

this.SuperMethodCallExpression = function(extractTo){
	/**
	 * 父类方法调用表达式
	 * @param {Context} open - 起始标签上下文
	 * @param {ECMAScriptStatement} statement - 当前语句
	 */
	function SuperMethodCallExpression(open, statement){
		CallExpression.call(this, open, statement);

		this.boundThis = statement.statements.closure.reference;
	};
	SuperMethodCallExpression = new Rexjs(SuperMethodCallExpression, CallExpression);

	SuperMethodCallExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 如果有拓展符
				if(this.spread){
					// 因为 super 不可能是对象属性，也不可能使用 new（语法上做了保护），所以直接使用 spreadTo 就可以了
					this.spreadTo(contentBuilder);
					return;
				}

				// 追加 execMethod 方法头部代码
				contentBuilder.appendString("Rexjs.Super.execMethod(" + this.boundThis + ",");
				// 提取操作对象
				this.operand.extractTo(contentBuilder);
				// 追加 execMethod 方法的参数
				contentBuilder.appendString(",[");
				// 提取 inner
				this.inner.extractTo(contentBuilder);
				// 追加尾部代码
				contentBuilder.appendString("])");
				return;
			}

			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 当匹配到拓展符时的处理逻辑
		 * @param {Statements} statements - 当前语句块
		 */
		spreadMatched: function(){
			this.spread = true;
		}
	});

	return SuperMethodCallExpression;
}(
	CallExpression.prototype.extractTo
);

this.OpenSuperCallTag = function(SuperCallExpression, visitor){
	/**
	 * 起始父类调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSuperCallTag(_type){
		OpenCallTag.call(this, _type);
	};
	OpenSuperCallTag = new Rexjs(OpenSuperCallTag, OpenCallTag);
	
	OpenSuperCallTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new SuperCallExpression(context, statement);
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 向当前闭包申请调用 super
			statements.closure.applySuperCall(parser, statement.expression.context, context);

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});
	
	return OpenSuperCallTag;
}(
	this.SuperCallExpression,
	OpenCallTag.prototype.visitor
);

this.OpenSuperMethodCallTag = function(SuperMethodCallExpression){
	/**
	 * 起始父类方法调用小括号标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenSuperMethodCallTag(_type){
		OpenCallTag.call(this, _type);
	};
	OpenSuperMethodCallTag = new Rexjs(OpenSuperMethodCallTag, OpenCallTag);
	
	OpenSuperMethodCallTag.props({
		$type: TYPE_MISTAKABLE,
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(context, statement){
			return new SuperMethodCallExpression(context, statement);
		},
		order: ECMAScriptOrders.OPEN_SUPER_METHOD_CALL
	});
	
	return OpenSuperMethodCallTag;
}(
	this.SuperMethodCallExpression
);

}.call(
	this,
	this.CallExpression,
	this.OpenCallTag
);


// 父类相关
!function(){

this.SuperExpression = function(LiteralExpression){
	/**
	 * super 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function SuperExpression(context){
		LiteralExpression.call(this, context);
	};
	SuperExpression = new Rexjs(SuperExpression, LiteralExpression);
	
	SuperExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				// 直接追加属性拥有者临时变量
				contentBuilder.appendString(this.propertyOwner);
				return;
			}
			
			// 追加 super 关键字上下文
			contentBuilder.appendContext(this.context);
		},
		propertyOwner: ""
	});

	return SuperExpression;
}(
	this.LiteralExpression
);

this.SuperStatement = function(){
	/**
	 * super 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function SuperStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	SuperStatement = new Rexjs(SuperStatement, ECMAScriptStatement);

	SuperStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var superExpression = this.out();

			// 报错
			parser.error(
				superExpression.context,
				ECMAScriptErrors.template("KEYWORD", superExpression.context.content)
			);
		},
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果标签是可误解的
			if(context.tag.type.mistakable){
				// 跳出语句
				this.out();
				return;
			}

			// 借用 catch 来报错
			this.catch(parser, context);
		}
	});

	return SuperStatement;
}();

this.SuperTag = function(SuperExpression, SuperStatement, UnaryAssignmentStatement, SuperPropertyUnaryAssignmentStatement){
	/**
	 * super 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function SuperTag(_type){
		SyntaxTag.call(this, _type);
	};
	SuperTag = new Rexjs(SuperTag, SyntaxTag);

	SuperTag.props({
		$class: CLASS_EXPRESSION,
		regexp: /super/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.superContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var closure = statements.closure;

			// 如果是一元赋值语句
			if(statement instanceof UnaryAssignmentStatement){
				// 跳出语句：这里不能用 statement.out()，因为 statement.expression 为 null，会报错
				statements.statement = statement.target;
				// 设置当前的一元语句
				statements.statement = statement = new SuperPropertyUnaryAssignmentStatement(statements);
			}

			// 如果存在闭包
			if(closure){
				var superExpression = new SuperExpression(context), targetStatements = closure.target, propertyStatement = targetStatements.statement.target.target;

				// 如果需要编译
				if(config.es6Base){
					// 记录拥有者变量名
					superExpression.propertyOwner = propertyStatement.expression.requestVariableOf(
						targetStatements,
						propertyStatement.target.expression
					);
				}

				// 设置当前表达式
				statement.expression = superExpression;
				// 设置当前语句
				statements.statement = new SuperStatement(statements);
				return;
			}

			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);
		}
	});

	return SuperTag;
}(
	this.SuperExpression,
	this.SuperStatement,
	this.UnaryAssignmentStatement,
	this.SuperPropertyUnaryAssignmentStatement
);

}.call(
	this
);


// import 关键字相关
!function(){

this.ImportExpression = function(compileMember){
	/**
	 * import 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {File} file - 当前解析源文件信息
	 */
	function ImportExpression(context, file){
		Expression.call(this, context);

		this.file = file;
		this.members = new ListExpression(null, ",");
	};
	ImportExpression = new Rexjs(ImportExpression, Expression);

	ImportExpression.props({
		clean: true,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Module){
				// 如果当前 import 没有导入任何成员
				if(this.clean){
					// 返回，因为模块在依赖分析时候就已经加载
					return;
				}

				// 初始化内容生成器
				var anotherBuilder = new ContentBuilder();

				// 如果有 from
				if(this.from){
					// 追加模块名称
					anotherBuilder.appendString(
						this.name.content + ',"' + this.file.url.href + '"'
					);
				}

				// 追加变量声明关键字
				contentBuilder.appendString("var ");
				// 编译每一个成员
				this.members.execJoin(compileMember, contentBuilder, anotherBuilder);
				return;
			}

			var from = this.from;

			// 追加 import 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();

			// 如果有 from
			if(from){
				// 提取成员
				this.members.extractTo(contentBuilder);
				// 追加空格
				contentBuilder.appendSpace();
				// 追加 from
				contentBuilder.appendContext(from);
				// 追加空格
				contentBuilder.appendSpace();
			}

			// 提取模块名称
			contentBuilder.appendContext(this.name);
		},
		file: null,
		from: null,
		members: null,
		name: null
	});

	return ImportExpression;
}(
	// compileMember
	function(member, contentBuilder, anotherBuilder){
		member.compileTo(contentBuilder, anotherBuilder);
	}
);

this.ImportTag = function(ModuleTag, ImportExpression){
	/**
	 * import 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ImportTag(_type){
		ModuleTag.call(this, _type);
	};
	ImportTag = new Rexjs(ImportTag, ModuleTag);

	ImportTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new ImportExpression(context);;
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return statements.statement;
		},
		regexp: /import/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.importContextTags;
		}
	});

	return ImportTag;
}(
	this.ModuleTag,
	this.ImportExpression
);

this.MemberSeparatorTag = function(CommaTag){
	/**
	 * 模块成员分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberSeparatorTag(_type){
		CommaTag.call(this, _type);
	};
	MemberSeparatorTag = new Rexjs(MemberSeparatorTag, CommaTag);

	MemberSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(){}
	});

	return MemberSeparatorTag;
}(
	this.CommaTag
);

this.FromTag = function(){
	/**
	 * from 标签
	 * @param {Number} _type - 标签类型
	 */
	function FromTag(_type){
		SyntaxTag.call(this, _type);
	};
	FromTag = new Rexjs(FromTag, SyntaxTag);

	FromTag.props({
		regexp: /from/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.moduleNameTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 import 表达式的 from 属性
			statement.expression.from = context;
		}
	});

	return FromTag;
}();

this.ModuleNameTag = function(StringTag){
	/**
	 * 模块名称标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleNameTag(_type){
		StringTag.call(this, _type);
	};
	ModuleNameTag = new Rexjs(ModuleNameTag, StringTag);

	ModuleNameTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var content = context.content;

			// 设置 import 表达式的 name 属性
			statement.expression.name = context;

			// 如果需要编译，否则不需要添加依赖，因为统统交给浏览器自己或第三方去处理 import 语句
			if(config.es6Module){
				// 添加模块依赖
				parser.deps.push(
					content.substring(1, content.length - 1)
				);
			}
		}
	});

	return ModuleNameTag; 
}(
	this.StringTag
);

}.call(
	this
);


// 模块多成员表达式相关
!function(multipleMembersSeparatorTag, closeMultipleMembersTag){

this.MultipleMembersExpression = function(importMember, exportMember, exportMemberAs){
	/**
	 * 多成员导入表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function MultipleMembersExpression(open){
		PartnerExpression.call(this, open);

		this.inner = new ListExpression(null, ",");
	};
	MultipleMembersExpression = new Rexjs(MultipleMembersExpression, PartnerExpression);

	MultipleMembersExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			var inner = this.inner;

			// 如果是导入
			if(this.import){
				// 执行成员导入项连接
				inner.execJoin(importMember, contentBuilder, anotherBuilder);
				return;
			}

			var result = anotherBuilder.result, endingString = ")";

			// 追加提取方法
			contentBuilder.appendString("Rexjs.Module.exportAs(");
			// 追加对象起始大括号
			contentBuilder.appendContext(this.open);

			// 如果长度大于 0，则说明是 export from 表达式
			if(result.length > 0){
				// 执行成员输出项连接
				inner.execJoin(exportMemberAs, contentBuilder, anotherBuilder);

				// 添加模块名称
				endingString = "," + result + endingString;
			}
			else {
				// 执行成员输出项连接
				inner.execJoin(exportMember, contentBuilder);
			}

			// 追加对象结束大括号
			contentBuilder.appendContext(this.close);
			// 追加提取方法结束小括号
			contentBuilder.appendString(endingString);
		},
		import: true
	});

	return MultipleMembersExpression;
}(
	// importMember
	function(member, contentBuilder, anotherBuilder){
		member.importTo(contentBuilder, anotherBuilder);
	},
	// exportMember
	function(member, contentBuilder, anotherBuilder){
		member.exportTo(contentBuilder, anotherBuilder);
	},
	// exportMemberAs
	function(member, contentBuilder, anotherBuilder){
		member.exportAsTo(contentBuilder, anotherBuilder);
	}
);

this.MemberExpression = function(){
	/**
	 * 模块成员表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function MemberExpression(context){
		Expression.call(this, context);
	};
	MemberExpression = new Rexjs(MemberExpression, Expression);

	MemberExpression.props({
		/**
		 * 以输出形式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		exportAsTo: function(contentBuilder, anotherBuilder){
			// 追加属性名
			contentBuilder.appendContext(this.variable);
			// 追加属性值
			contentBuilder.appendString(':"' + this.context.content + '"');
		},
		/**
		 * 以输出形式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		exportTo: function(contentBuilder, anotherBuilder){
			// 追加属性名
			contentBuilder.appendContext(this.variable);
			// 追加属性值
			contentBuilder.appendString(":" + this.context.content);
		},
		/**
		 * 以导入形式提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		importTo: function(contentBuilder, anotherBuilder){
			var result = anotherBuilder.result;

			// 追加成员变量赋值字符串
			contentBuilder.appendString(
				this.variable.content + "=" + 'Rexjs.Module.memberOf("' +
					this.context.content + '"' + (result.length > 0 ? "," : "") +
					result +
				")"
			);
		},
		/**
		 * 获取模块成员变量名
		 */
		get variable(){
			return this.context;
		}
	});

	return MemberExpression;
}();

this.MemberAliasExpression = function(MemberExpression){
	/**
	 * 模块成员别名表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function MemberAliasExpression(context){
		MemberExpression.call(this, context);
	};
	MemberAliasExpression = new Rexjs(MemberAliasExpression, MemberExpression);

	MemberAliasExpression.props({
		alias: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加原名称
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			// 追加 as
			contentBuilder.appendContext(this.alias);
			// 追加空格
			contentBuilder.appendSpace();
			// 追加别名变量名
			contentBuilder.appendContext(this.variable);
		},
		variable: null
	});

	return MemberAliasExpression;
}(
	this.MemberExpression
);

this.MultipleMembersStatement = function(out){
	/**
	 * 模板语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function MultipleMembersStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	MultipleMembersStatement = new Rexjs(MultipleMembersStatement, ECMAScriptStatement);

	MultipleMembersStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 如果不是结束大括号
			if(context.content !== "}"){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句
			out(parser, this, true);
			return this.bindingOf();
		},
		collectVariables: true,
		expression: new DefaultExpression(),
		/**
		 * 尝试处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			// 如果不是逗号
			if(context.content !== ","){
				// 报错
				parser.error(context);
				return null;
			}

			// 跳出语句
			out(parser, this, false);
			return this.tagOf().separator;
		},
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.members.latest.open.tag;
		}
	});

	return MultipleMembersStatement;
}(
	// out
	function(parser, statement, fromCatch){
		var expression = statement.expression, importExpression = statement.out(), inner = importExpression.members.latest.inner;

		// 如果来自 catch 方法
		if(fromCatch){
			// 如果设置失败，则说明 expression 是默认表达式
			if(!inner.set(expression)){
				return;
			}
		}
		else {
			// 添加表达式
			inner.add(expression);
		}

		// 收集变量名
		importExpression.context.tag.collectVariables(parser, expression.variable);
	}
);

this.OpenMultipleMembersTag = function(OpenBraceTag, MultipleMembersExpression, MultipleMembersStatement){
	/**
	 * 多成员导入起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenMultipleMembersTag(_type){
		OpenBraceTag.call(this, _type);
	};
	OpenMultipleMembersTag = new Rexjs(OpenMultipleMembersTag, OpenBraceTag);

	OpenMultipleMembersTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeMultipleMembersTag;
		},
		/**
		 * 获取绑定的分隔符标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get separator(){
			return multipleMembersSeparatorTag;
		},
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 添加成员
			statement.expression.members.add(
				new MultipleMembersExpression(context)
			);

			// 设置当前语句
			statements.statement = new MultipleMembersStatement(statements);
		}
	});

	return OpenMultipleMembersTag;
}(
	this.OpenBraceTag,
	this.MultipleMembersExpression,
	this.MultipleMembersStatement
);

this.MemberVariableTag = function(ConstVariableTag, MemberExpression){
	/**
	 * 模块成员变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberVariableTag(_type){
		ConstVariableTag.call(this, _type);
	};
	MemberVariableTag = new Rexjs(MemberVariableTag, ConstVariableTag);

	MemberVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 import 表达式的 clean 属性
			statement.target.expression.clean = false;
			// 设置当前表达式
			statement.expression = new MemberExpression(context);
		}
	});
	
	return MemberVariableTag;
}(
	this.ConstVariableTag,
	this.MemberExpression
);

this.MemberAliasVariableTag = function(MemberVariableTag){
	/**
	 * 模块成员变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberAliasVariableTag(_type){
		MemberVariableTag.call(this, _type);
	};
	MemberAliasVariableTag = new Rexjs(MemberAliasVariableTag, MemberVariableTag);

	MemberAliasVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionContextTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 MemberAliasExpression 表达式的 variable 属性
			statement.expression.variable = context;
		}
	});
	
	return MemberAliasVariableTag;
}(
	this.MemberVariableTag
);

this.MemberAliasTag = function(AsTag, MemberAliasExpression){
	/**
	 * 模块成员标签
	 * @param {Number} _type - 标签类型
	 */
	function MemberAliasTag(_type){
		AsTag.call(this, _type);
	};
	MemberAliasTag = new Rexjs(MemberAliasTag, AsTag);

	MemberAliasTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberAliasVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			(
				// 设置当前表达式
				statement.expression = new MemberAliasExpression(statement.expression.context)
			)
			// 设置 alias 属性
			.alias = context;
		}
	});

	return MemberAliasTag;
}(
	this.AsTag,
	this.MemberAliasExpression
);

this.MultipleMembersSeparatorTag = function(MemberSeparatorTag, MultipleMembersStatement){
	/**
	 * 多成员导入分隔符标签
	 * @param {Number} _type - 标签类型
	 */
	function MultipleMembersSeparatorTag(_type){
		MemberSeparatorTag.call(this, _type);
	};
	MultipleMembersSeparatorTag = new Rexjs(MultipleMembersSeparatorTag, MemberSeparatorTag);

	MultipleMembersSeparatorTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前语句
			statements.statement = new MultipleMembersStatement(statements);
		}
	});

	return MultipleMembersSeparatorTag;
}(
	this.MemberSeparatorTag,
	this.MultipleMembersStatement
);

this.CloseMultipleMembersTag = function(CloseBraceTag){
	/**
	 * 多成员导入结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseMultipleMembersTag(_type){
		CloseBraceTag.call(this, _type);
	};
	CloseMultipleMembersTag = new Rexjs(CloseMultipleMembersTag, CloseBraceTag);

	CloseMultipleMembersTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 MultipleMembersExpression 的 close 属性
			statement.expression.members.latest.close = context;
		}
	});

	return CloseMultipleMembersTag;
}(
	this.CloseBraceTag
);

multipleMembersSeparatorTag = new this.MultipleMembersSeparatorTag();
closeMultipleMembersTag = new this.CloseMultipleMembersTag();

}.call(
	this,
	// multipleMembersSeparatorTag
	null,
	// closeMultipleMembersTag
	null
);


// 模块默认成员标签相关
!function(){

this.DefaultMemberExpression = function(MemberExpression){
	/**
	 * 模块默认成员导入表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DefaultMemberExpression(context){
		MemberExpression.call(this, context);
	};
	DefaultMemberExpression = new Rexjs(DefaultMemberExpression, MemberExpression);

	DefaultMemberExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 追加成员变量赋值字符串
			contentBuilder.appendString(
				this.context.content + "=Rexjs.Module.defaultOf(" + anotherBuilder.result + ")"
			);
		}
	});

	return DefaultMemberExpression;
}(
	this.MemberExpression
);

this.DefaultMemberTag = function(MemberVariableTag, DefaultMemberExpression){
	/**
	 * 模块默认成员标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultMemberTag(_type){
		MemberVariableTag.call(this, _type);
	};
	DefaultMemberTag = new Rexjs(DefaultMemberTag, MemberVariableTag);

	DefaultMemberTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var importExpression = statement.expression;

			// 收集变量名
			this.collectTo(parser, context, statements);

			// 向 import 表达式的添加成员
			importExpression.members.add(
				new DefaultMemberExpression(context)
			);

			// 设置 clean 属性为 false，表示有变量名导入
			importExpression.clean = false;
		}
	});

	return DefaultMemberTag;
}(
	this.MemberVariableTag,
	this.DefaultMemberExpression
);

}.call(
	this
);


// 所有模块成员表达式相关
!function(){

this.AllMembersExpression = function(MemberAliasExpression){
	/**
	 * 所有模块成员表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function AllMembersExpression(context){
		MemberAliasExpression.call(this, context);
	};
	AllMembersExpression = new Rexjs(AllMembersExpression, MemberAliasExpression);

	AllMembersExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			contentBuilder.appendString(
				this.variable.content + "=Rexjs.Module.moduleOf(" + anotherBuilder.result + ")"
			);
		}
	});

	return AllMembersExpression;
}(
	this.MemberAliasExpression
);

this.AllMembersTag = function(AllMembersExpression){
	/**
	 * 所有成员符号标签
	 * @param {Number} _type - 标签类型
	 */
	function AllMembersTag(_type){
		SyntaxTag.call(this, _type);
	};
	AllMembersTag = new Rexjs(AllMembersTag, SyntaxTag);

	AllMembersTag.props({
		regexp: /\*/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.moduleAliasTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var importExpression = statement.expression;

			// 向 import 表达式添加成员
			importExpression.members.add(
				new AllMembersExpression(context)
			);
			
			// 设置 clean 属性为 false，表示有变量名导入
			importExpression.clean = false;
		}
	});

	return AllMembersTag;
}(
	this.AllMembersExpression
);

this.ModuleAliasTag = function(AsTag){
	/**
	 * 模块别名标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleAliasTag(_type){
		AsTag.call(this, _type);
	};
	ModuleAliasTag = new Rexjs(ModuleAliasTag, AsTag);

	ModuleAliasTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.moduleVariableTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置 AllMembersExpression 表达式的 alias 属性
			statement.expression.members.latest.alias = context;
		}
	});

	return ModuleAliasTag;
}(
	this.AsTag
);

this.ModuleVariableTag = function(ConstVariableTag){
	/**
	 * 模块变量名标签
	 * @param {Number} _type - 标签类型
	 */
	function ModuleVariableTag(_type){
		ConstVariableTag.call(this, _type);
	};
	ModuleVariableTag = new Rexjs(ModuleVariableTag, ConstVariableTag);

	ModuleVariableTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.memberSeparatorTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 收集变量名
			this.collectTo(parser, context, statements);

			// 设置 AllMembersExpression 表达式的 variable 属性
			statement.expression.members.latest.variable = context;
		}
	});

	return ModuleVariableTag;
}(
	this.ConstVariableTag
);

}.call(
	this
);


// export 标签相关
!function(VarExpression, FunctionDeclarationExpression, ClassDeclarationExpression, exportVariable){

this.ExportExpression = function(compile){
	/**
	 * export 表达式
	 * @param {Context} context - 语法标签上下文
	 * @param {File} file - 当前解析源文件信息
	 */
	function ExportExpression(context, file){
		Expression.call(this, context);

		this.file = file;
	};
	ExportExpression = new Rexjs(ExportExpression, Expression);

	ExportExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var from = this.from;

			// 如果需要编译
			if(config.es6Module){
				// 编译成员
				compile(this.member, this.from, this.name, this.file, contentBuilder);
				return;
			}

			// 追加 export 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			// 提取成员
			this.member.extractTo(contentBuilder);

			// 如果有 from
			if(from){
				// 追加空格
				contentBuilder.appendSpace();
				// 追加 from 上下文
				contentBuilder.appendContext(from);
				// 追加空格
				contentBuilder.appendSpace();
				// 追加模块名称
				contentBuilder.appendContext(this.name);
			}
		},
		file: null,
		member: null,
		name: null
	});

	return ExportExpression;
}(
	// compile
	function(member, from, name, file, contentBuilder){
		// 初始化内容生成器
		var anotherBuilder = new ContentBuilder();

		// 如果有 from
		if(from){
			// 追加模块名称
			anotherBuilder.appendString(name.content + ',"' + file.url.href + '"');
		}

		// 先编译成员
		member.compileTo(contentBuilder, anotherBuilder);

		switch(true){
			// 如果是 var、let、const 表达式
			case member instanceof VarExpression:
				// 遍历所定义的变量并输出
				member.range.forEach(exportVariable, contentBuilder);
				return;

			// 如果是函数声明
			case member instanceof FunctionDeclarationExpression:
			// 如果是类声明
			case member instanceof ClassDeclarationExpression:
				// 输出表达式名称变量
				exportVariable(member.name.context.content, contentBuilder, true);
				return;
		}
	}
);

this.ExportStatement = function(){
	/**
	 * export 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function ExportStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	ExportStatement = new Rexjs(ExportStatement, ECMAScriptStatement);

	ExportStatement.props({
		allowFrom: false,
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出语句并设置 member
			this.out().member = this.expression;

			// 如果是 from 且 该语句上下文中允许 from 出现
			return context.content === "from" && this.allowFrom ? this.bindingOf() : null;
		}
	});

	return ExportStatement;
}();

this.ExportTag = function(ModuleTag, ExportExpression, ExportStatement, fromTag){
	/**
	 * export 关键字标签
	 * @param {Number} _type - 标签类型
	 */
	function ExportTag(_type){
		ModuleTag.call(this, _type);
	};
	ExportTag = new Rexjs(ExportTag, ModuleTag);

	ExportTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return fromTag;
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new ExportExpression(context);;
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(statements){
			return new ExportStatement(statements);
		},
		/**
		 * 收集该表达式所产生的变量名
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} variable - 变量名标签上下文
		 */
		collectVariables: function(){},
		regexp: /export/,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.exportContextTags;
		}
	});

	return ExportTag;
}(
	this.ModuleTag,
	this.ExportExpression,
	this.ExportStatement,
	// fromTag
	new this.FromTag()
);

}.call(
	this,
	this.VarExpression,
	this.FunctionDeclarationExpression,
	this.ClassDeclarationExpression,
	// exportVariable
	function(variable, contentBuilder, _semicolonAfter){
		var str = 'Rexjs.Module.export("' + variable + '", ' + variable + ")";

		// 如果需要语句后面加分号
		if(_semicolonAfter){
			str += ";";
		}
		// 否则之前加分号
		else {
			str = ";" + str;
		}

		// 追加输出字符串
		contentBuilder.appendString(str);
	}
);


// export default 标签相关
!function(){

this.DefaultExportExpression = function(ExportExpression){
	/**
	 * 模块默认输出表达式
	 * @param {Context} context - 标签上下文
	 */
	function DefaultExportExpression(context){
		ExportExpression.call(this, context, null);
	};
	DefaultExportExpression = new Rexjs(DefaultExportExpression, ExportExpression);

	DefaultExportExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加 default 关键字
			contentBuilder.appendContext(this.context);
			// 追加空格
			contentBuilder.appendSpace();
			// 提取成员
			this.member.extractTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		compileTo: function(contentBuilder){
			// 追加提取方法
			contentBuilder.appendString('Rexjs.Module.export("default",');
			// 提取成员
			this.member.extractTo(contentBuilder);
			// 追加提取方法结束小括号
			contentBuilder.appendString(")");
		}
	});

	return DefaultExportExpression;
}(
	this.ExportExpression
);

this.DefaultExportStatement = function(){
	/**
	 * 模块默认输出语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function DefaultExportStatement(statements){
		ECMAScriptStatement.call(this, statements);
	};
	DefaultExportStatement = new Rexjs(DefaultExportStatement, ECMAScriptStatement);

	DefaultExportStatement.props({
		/**
		 * 捕获处理异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			// 跳出当前语句并设置 member 属性
			this.out().member = this.expression;
		}
	});

	return DefaultExportStatement;
}();

this.DefaultExportTag = function(DefaultTag, DefaultExportExpression, DefaultExportStatement){
	/**
	 * 模块默认输出标签
	 * @param {Number} _type - 标签类型
	 */
	function DefaultExportTag(_type){
		DefaultTag.call(this, _type);
	};
	DefaultExportTag = new Rexjs(DefaultExportTag, DefaultTag);

	DefaultExportTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.expressionTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 如果已经输出过默认成员
			if(parser.defaultExported){
				parser.error(context, ECMAScriptErrors.EXPORT_DEFAULT);
				return;
			}

			// 记录全局解析器属性，标识已经输出过默认成员
			parser.defaultExported = true;
			
			// 设置当前表达式
			statement.expression = new DefaultExportExpression(context);
			// 设置当前语句
			statements.statement = new DefaultExportStatement(statements);
		}
	});

	return DefaultExportTag;
}(
	this.DefaultTag,
	this.DefaultExportExpression,
	this.DefaultExportStatement
);

}.call(
	this
);


// 模块输出多成员表达式相关
!function(OpenMultipleMembersTag, CloseMultipleMembersTag, closeExportMultipleMembersTag){

this.PseudoImportExpression = function(ImportExpression){
	/**
	 * 伪 import 表达式，用于模拟相关环境
	 * @param {Context} context - 标签上下文
	 * @param {File} file - 当前解析源文件信息
	 */
	function PseudoImportExpression(context, file){
		ImportExpression.call(this, context, file);
	};
	PseudoImportExpression = new Rexjs(PseudoImportExpression, ImportExpression);

	PseudoImportExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取成员
			this.members.extractTo(contentBuilder);
		},
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 解析语法时确保过，只有唯一一个，所以直接编译最近且唯一项
			this.members.latest.compileTo(contentBuilder, anotherBuilder);
		}
	});

	return PseudoImportExpression;
}(
	this.ImportExpression
);

this.OpenExportMultipleMembersTag = function(PseudoImportExpression, visitor){
	/**
	 * 多成员输出起始标签
	 * @param {Number} _type - 标签类型
	 */
	function OpenExportMultipleMembersTag(_type){
		OpenMultipleMembersTag.call(this, _type);
	};
	OpenExportMultipleMembersTag = new Rexjs(OpenExportMultipleMembersTag, OpenMultipleMembersTag);

	OpenExportMultipleMembersTag.props({
		/**
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return closeExportMultipleMembersTag;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var pseudoImportExpression = new PseudoImportExpression(
				statement.target.expression.context,
				parser.file
			);

			// 设置当前表达式
			statement.expression = pseudoImportExpression;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 告知该表达式所属语句不是导入语句
			pseudoImportExpression.members.latest.import = false;
		}
	});

	return OpenExportMultipleMembersTag;
}(
	this.PseudoImportExpression,
	OpenMultipleMembersTag.prototype.visitor
);

this.CloseExportMultipleMembersTag = function(visitor){
	/**
	 * 多成员输出结束标签
	 * @param {Number} _type - 标签类型
	 */
	function CloseExportMultipleMembersTag(_type){
		CloseMultipleMembersTag.call(this, _type);
	};
	CloseExportMultipleMembersTag = new Rexjs(CloseExportMultipleMembersTag, CloseMultipleMembersTag);

	CloseExportMultipleMembersTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.statementEndTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置语句允许出现 from
			statement.allowFrom = true;

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);
		}
	});

	return CloseExportMultipleMembersTag;
}(
	CloseMultipleMembersTag.prototype.visitor
);

closeExportMultipleMembersTag = new this.CloseExportMultipleMembersTag();

}.call(
	this,
	this.OpenMultipleMembersTag,
	this.CloseMultipleMembersTag,
	// closeExportMultipleMembersTag
	null
);


// 输出所有成员符号标签相关
!function(){

this.ExportAllMembersExpression = function(){
	/**
	 * 输出所有模块成员表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function ExportAllMembersExpression(context){
		Expression.call(this, context);
	};
	ExportAllMembersExpression = new Rexjs(ExportAllMembersExpression, Expression);

	ExportAllMembersExpression.props({
		/**
		 * 提取并编译表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		compileTo: function(contentBuilder, anotherBuilder){
			// 追加输出字符串
			contentBuilder.appendString(
				"Rexjs.Module.exportFrom(" + anotherBuilder.result + ")"
			);
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加 * 上下文
			contentBuilder.appendContext(this.context);
		}
	});

	return ExportAllMembersExpression;
}();

this.ExportAllMembersTag = function(AllMembersTag, ExportAllMembersExpression){
	/**
	 * 输出所有成员符号标签
	 * @param {Number} _type - 标签类型
	 */
	function ExportAllMembersTag(_type){
		AllMembersTag.call(this, _type);
	};
	ExportAllMembersTag = new Rexjs(ExportAllMembersTag, AllMembersTag);

	ExportAllMembersTag.props({
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 */
		require: function(tagsMap){
			return tagsMap.unexpectedTags;
		},
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			// 设置当前表达式
			statement.expression = new ExportAllMembersExpression(context);
			// 设置 allowFrom 属性，表示检测到 from 是属于正常语句部分
			statement.allowFrom = true;
		}
	});

	return ExportAllMembersTag;
}(
	this.AllMembersTag,
	this.ExportAllMembersExpression
);

}.call(
	this
);


// 解构赋值表达式相关
!function(BinaryExpression, ArrayExpression, ObjectExpression, ObjectDestructuringExpression, BasicAssignmentTag){

this.DestructuringAssignmentExpression = function(extractTo, extractRight){
	/**
	 * 解构赋值表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function DestructuringAssignmentExpression(context){
		BinaryExpression.call(this, context);
	};
	DestructuringAssignmentExpression = new Rexjs(DestructuringAssignmentExpression, BinaryExpression);

	DestructuringAssignmentExpression.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 如果需要编译
			if(config.es6Base){
				var variable = this.variable, left = this.left, builder = new ContentBuilder();

				// 用新的生成器记录临时变量名
				builder.appendString(variable);

				// 如果是声明形式的解构赋值
				if(left.origin.declaration){
					// 追加变量名
					contentBuilder.appendString(variable);
					// 追加等于号上下文
					contentBuilder.appendContext(this.context);
					// 提取右侧表达式
					extractRight(left, this.right, contentBuilder);
					// 提取并编译表达式文本内容
					left.compileTo(contentBuilder, builder);
					return;
				}

				// 起始小括号与追加变量名
				contentBuilder.appendString("(" + variable);
				// 追加等于号上下文
				contentBuilder.appendContext(this.context);
				// 提取右侧表达式
				extractRight(left, this.right, contentBuilder);
				// 提取并编译表达式文本内容
				left.compileTo(contentBuilder, builder);
				// 追加逗号与变量名及结束小括号
				contentBuilder.appendString("," + variable + ")");
				return;
			}

			extractTo.call(this, contentBuilder);
		},
		variable: ""
	});

	return DestructuringAssignmentExpression;
}(
	BinaryExpression.prototype.extractTo,
	// extractRight
	function(left, right, contentBuilder){
		// 如果是对象解构
		if(left instanceof ObjectDestructuringExpression){
			// 追加初始化解构目标起始代码
			contentBuilder.appendString("new Rexjs.ObjectDestructuringTarget((");
			// 提取右侧表达式
			right.extractTo(contentBuilder);
			// 追加初始化解构目标结束代码
			contentBuilder.appendString("))");
			return;
		}
		
		// 提取右侧表达式
		right.extractTo(contentBuilder);
	}
);

this.DestructuringAssignmentTag = function(DestructuringAssignmentExpression, visitor, destructible, setVariableOf){
	/**
	 * 解构赋值标签
	 * @param {Number} _type - 标签类型
	 */
	function DestructuringAssignmentTag(_type){
		BasicAssignmentTag.call(this, _type);
	};
	DestructuringAssignmentTag = new Rexjs(DestructuringAssignmentTag, BasicAssignmentTag);

	DestructuringAssignmentTag.props({
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 */
		getBoundExpression: function(context){
			return new DestructuringAssignmentExpression(context);
		},
		// 防止与 BasicAssignmentTag 冲突
		order: ECMAScriptOrders.DESTRUCTURING_ASSIGNMENT,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser, context, statement, statements){
			var expression = statement.expression;

			// 如果是二元表达式
			if(expression instanceof BinaryExpression){
				var last = expression.last, right = last.right;

				// 判断最后一个二元表达式的右侧表达式是否满足解构条件
				if(destructible(right)){
					// 重新设置右侧表达式为解构表达式
					last.right = right.toDestructuring(parser);
				}
			}
			// 判断当前表达式的右侧表达式是否满足解构条件
			else if(destructible(expression)){
				// 重新当前表达式为解构表达式
				statement.expression = expression.toDestructuring(parser);
			}

			// 调用父类方法
			visitor.call(this, parser, context, statement, statements);

			// 如果需要解析解构赋值
			if(config.es6Base){
				// 给刚生成的解构赋值表达式设置变量名
				setVariableOf(statement.expression.last, statements);
			}
		}
	});

	return DestructuringAssignmentTag;
}(
	this.DestructuringAssignmentExpression,
	BasicAssignmentTag.prototype.visitor,
	// destructible
	function(expression){
		return expression instanceof ArrayExpression || expression instanceof ObjectExpression;
	},
	// setVariableOf
	function(destructuringAssignmentExpression, statements){
		// 设置变量名
		destructuringAssignmentExpression.left.origin.setVariableOf(
			destructuringAssignmentExpression,
			statements
		);
	}
);

}.call(
	this,
	this.BinaryExpression,
	this.ArrayExpression,
	this.ObjectExpression,
	this.ObjectDestructuringExpression,
	this.BasicAssignmentTag
);


// 辅助性的标签列表相关
!function(SyntaxTags){

this.OnlyStatementEndTags = function(LastStatementEndTag, StatementBreakTag, StatementEndTag){
	/**
	 * 只有语句结束符的标签列表
	 */
	function OnlyStatementEndTags(){
		SyntaxTags.call(this);

		this.register(
			new LastStatementEndTag(),
			new StatementBreakTag(),
			new StatementEndTag()
		);
	};
	OnlyStatementEndTags = new Rexjs(OnlyStatementEndTags, SyntaxTags);

	return OnlyStatementEndTags;
}(
	this.LastStatementEndTag,
	this.StatementBreakTag,
	this.StatementEndTag
);

}.call(
	this,
	Rexjs.SyntaxTags
);


// ECMAScript 标签列表相关
!function(){

this.ECMAScriptTags = function(DefaultTags, list){
	/**
	 * ECMAScript 标签列表
	 * @param {Number} _type - 该标签列表中，所有标签的初始化类型
	 */
	function ECMAScriptTags(_type){
		DefaultTags.call(this);

		// 注册标签
		this.delegate(list, _type || TYPE_UNEXPECTED);
	};
	ECMAScriptTags = new Rexjs(ECMAScriptTags, DefaultTags);
	
	return ECMAScriptTags;
}(
	Rexjs.DefaultTags,
	// list
	[
		this.ArrowTag,
		this.BasicAssignmentTag,
		this.BinaryNumberTag,
		this.BitwiseANDTag,
		this.BitwiseNOTTag,
		this.BitwiseORTag,
		this.BitwiseXORTag,
		this.BooleanTag,
		this.BreakTag,
		this.CaseTag,
		this.CatchTag,
		this.ClassDeclarationTag,
		this.CloseBraceTag,
		this.CloseBracketTag,
		this.CloseParenTag,
		this.ColonTag,
		this.CommaTag,
		this.ConstTag,
		this.ContinueTag,
		this.DebuggerTag,
		this.DefaultTag,
		this.DecrementTag,
		this.DeleteTag,
		this.DivisionTag,
		this.DoTag,
		this.DotTag,
		this.ElseTag,
		this.EmptyStatementTag,
		this.EqualityTag,
		this.ExponentiationTag,
		this.ExportTag,
		this.ExtendsTag,
		this.FileEndTag,
		this.FinallyTag,
		this.ForTag,
		this.FunctionDeclarationTag,
		this.GreaterThanOrEqualTag,
		this.GreaterThanTag,
		this.IdentityTag,
		this.IfTag,
		this.ImportTag,
		this.InTag,
		this.IncrementTag,
		this.InequalityTag,
		this.InstanceofTag,
		this.LabelTag,
		this.LeftShiftTag,
		this.LessThanOrEqualTag,
		this.LessThanTag,
		this.LetTag,
		this.LogicalANDTag,
		this.LogicalNOTTag,
		this.LogicalORTag,
		this.MultiplicationTag,
		this.NegationTag,
		this.NewTag,
		this.NonidentityTag,
		this.NullTag,
		this.NumberTag,
		this.OctalNumberTag,
		this.OpenArrayTag,
		this.OpenBlockTag,
		this.OpenGroupingTag,
		this.OpenMultiLineCommentTag,
		this.OpenTemplateTag,
		this.PlusTag,
		this.QuestionAssignmentTag,
		this.QuestionTag,
		this.RegExpTag,
		this.RemainderTag,
		this.ReturnTag,
		this.RightShiftTag,
		this.ShorthandAssignmentTag,
		this.SingleLineCommentTag,
		this.SpreadTag,
		this.StaticTag,
		this.StringTag,
		this.SuperTag,
		this.SwitchTag,
		this.ThisTag,
		this.ThrowTag,
		this.TryTag,
		this.TypeofTag,
		this.UnsignedRightShiftTag,
		this.VarTag,
		this.VoidTag,
		this.WhileTag,
		this.WithTag,
		this.YieldTag
	]
);
	
}.call(
	this
);


// 基类标签列表相关
!function(ECMAScriptTags, OnlyStatementEndTags){

this.ExpressionTags = function(list){
	/**
	 * 表达式标签列表
	 */
	function ExpressionTags(){
		ECMAScriptTags.call(this);
		
		this.delegate(list);
	};
	ExpressionTags = new Rexjs(ExpressionTags, ECMAScriptTags);
	
	ExpressionTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是表达式标签
			if(tag.class.expression){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
			}
			
			return false;
		}
	});
	
	return ExpressionTags;
}(
	// list
	[
		this.ClassTag,
		this.FunctionTag,
		this.OpenObjectTag,
		this.TryFunctionTag,
		this.VariableTag
	]
);

this.ExpressionContextTags = function(list){
	/**
	 * 表达式上下文标签列表
	 */
	function ExpressionContextTags(){
		ECMAScriptTags.call(this);

		this.delegate(list);
	};
	ExpressionContextTags = new Rexjs(ExpressionContextTags, ECMAScriptTags);
	
	ExpressionContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			var tagClass = tag.class;

			switch(true){
				// 如果是表达式上下文标签
				case tagClass.expressionContext:
				// 如果是语句标签
				case tagClass.statementBegin:
					// 重新绑定类型
					tag.type = new TagType(TYPE_MISTAKABLE);
					break;
			}

			return false;
		}
	});
	
	return ExpressionContextTags;
}(
	// list
	[
		this.AdditionTag,
		this.DotAccessorTag,
		this.ExpressionBreakTag,
		this.OnlyStatementEndTags,
		this.OpenBracketAccessorTag,
		this.OpenCallTag,
		this.OpenRestrictedCommentTag,
		this.PostfixDecrementTag,
		this.PostfixIncrementTag,
		this.QuestionAssignmentTag,
		this.SubtractionTag,
		this.OpenTemplateParameterTag
	]
);

this.StatementTags = function(FileEndTag){
	/**
	 * 语句标签列表
	 */
	function StatementTags(){
		ECMAScriptTags.call(this);
	};
	StatementTags = new Rexjs(StatementTags, ECMAScriptTags);
	
	StatementTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(tag.class.statementBegin){
				// 设置标签类型
				tag.type = new TagType(
					tag instanceof FileEndTag ? TYPE_MISTAKABLE : TYPE_MATCHABLE
				);
			}
			
			return false;
		}
	});
	
	return StatementTags;
}(
	this.FileEndTag
);

this.StatementEndTags = function(){
	/**
	 * 语句结束标签列表
	 */
	function StatementEndTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new OnlyStatementEndTags()
		);
	};
	StatementEndTags = new Rexjs(StatementEndTags, ECMAScriptTags);
	
	return StatementEndTags;
}();

this.MistakableTags = function(StatementTags){
	/**
	 * 可能被误解的标签列表
	 */
	function MistakableTags(){
		StatementTags.call(this);
	};
	MistakableTags = new Rexjs(MistakableTags, StatementTags);
	
	MistakableTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(tag.class.statementBegin){
				// 设置类型
				tag.type = new TagType(TYPE_MISTAKABLE);
			}
			
			return false;
		}
	});
	
	return MistakableTags;
}(
	this.StatementTags
);

this.IllegalTags = function(){
	/**
	 * 非法标签列表
	 */
	function IllegalTags(){
		ECMAScriptTags.call(this, TYPE_ILLEGAL);
	};
	IllegalTags = new Rexjs(IllegalTags, ECMAScriptTags);

	return IllegalTags;
}();

}.call(
	this,
	this.ECMAScriptTags,
	this.OnlyStatementEndTags
);


// 其他标签列表
!function(ECMAScriptTags, ExpressionTags, ExpressionContextTags, MistakableTags, StatementTags, StatementEndTags, IllegalTags){

this.ArgumentNameContextTags = function(ArgumentAssignmentTag){
	/**
	 * 参数名上下文标签列表
	 */
	function ArgumentNameContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new ArgumentAssignmentTag()
		);
	};
	ArgumentNameContextTags = new Rexjs(ArgumentNameContextTags, ECMAScriptTags);

	return ArgumentNameContextTags;
}(
	this.ArgumentAssignmentTag
);

this.ArgumentSeparatorContextTags = function(ArgumentNameTag, RestTag){
	/**
	 * 参数分隔符上下文标签列表
	 */
	function ArgumentSeparatorContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ArgumentNameTag(),
			new RestTag()
		);
	};
	ArgumentSeparatorContextTags = new Rexjs(ArgumentSeparatorContextTags, IllegalTags);

	return ArgumentSeparatorContextTags;
}(
	this.ArgumentNameTag,
	this.RestTag
);

this.ArrowContextTags = function(OpenArrowFunctionBodyTag){
	/**
	 * 箭头上下文标签
	 */
	function ArrowContextTags(){
		ExpressionTags.call(this);

		this.register(
			new OpenArrowFunctionBodyTag()
		);
	};
	ArrowContextTags = new Rexjs(ArrowContextTags, ExpressionTags);

	return ArrowContextTags;
}(
	this.OpenArrowFunctionBodyTag
);


this.BlockTags = function(OpenBlockTag){
	/**
	 * 语句块标签列表
	 */
	function BlockTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenBlockTag()
		);
	};
	BlockTags = new Rexjs(BlockTags, IllegalTags);

	return BlockTags;
}(
	this.OpenBlockTag
);

this.CatchedExceptionTags = function(OpenCatchedExceptionTag){
	/**
	 * 被捕获的异常标签列表
	 */
	function CatchedExceptionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenCatchedExceptionTag()
		);
	};
	CatchedExceptionTags = new Rexjs(CatchedExceptionTags, IllegalTags);
	
	return CatchedExceptionTags;
}(
	this.OpenCatchedExceptionTag
);

this.ClassContextTags = function(ClassNameTag, ExtendsTag, OpenClassBodyTag){
	/**
	 * 类关键字上下文标签列表
	 */
	function ClassContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ClassNameTag(),
			new ExtendsTag(),
			new OpenClassBodyTag()
		);
	};
	ClassContextTags = new Rexjs(ClassContextTags, IllegalTags);

	return ClassContextTags;
}(
	this.ClassNameTag,
	this.ExtendsTag,
	this.OpenClassBodyTag
);

this.ClassIdentifierPropertyNameContextTags = function(ClassPropertyInitializerTag, OpenShorthandMethodArgumentsTag){
	/**
	 * 类标识符属性名上下文标签列表
	 */
	function ClassIdentifierPropertyNameContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ClassPropertyInitializerTag(),
			new OpenShorthandMethodArgumentsTag()
		);
	};
	ClassIdentifierPropertyNameContextTags = new Rexjs(ClassIdentifierPropertyNameContextTags, IllegalTags);

	return ClassIdentifierPropertyNameContextTags;
}(
	this.ClassPropertyInitializerTag,
	this.OpenShorthandMethodArgumentsTag
);

this.ClassNameContextTags = function(ExtendsTag, OpenClassBodyTag){
	/**
	 * 类关键字上下文标签列表
	 */
	function ClassNameContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new ExtendsTag(),
			new OpenClassBodyTag()
		);
	};
	ClassNameContextTags = new Rexjs(ClassNameContextTags, IllegalTags);

	return ClassNameContextTags;
}(
	this.ExtendsTag,
	this.OpenClassBodyTag
);

this.ClassPropertyNameTags = function(list){
	/**
	 * 类属性名标签列表
	 */
	function ClassPropertyNameTags(){
		IllegalTags.call(this);
		
		this.delegate(list);
	};
	ClassPropertyNameTags = new Rexjs(ClassPropertyNameTags, IllegalTags);

	return ClassPropertyNameTags;
}(
	// list
	[
		this.CloseClassBodyTag,
		this.ClassPropertyPlaceholderTag,
		this.PropertyStarTag,
		this.ConstructorTag,
		this.GetDescriptorTag,
		this.SetDescriptorTag,
		this.ClassIdentifierPropertyNameTag,
		this.ClassNumberPropertyNameTag,
		this.ClassBinaryNumberPropertyNameTag,
		this.ClassOctalNumberPropertyNameTag,
		this.ClassStringPropertyNameTag,
		this.OpenClassComputedPropertyNameTag
	]
);

this.ClassVariableTags = function(ClassVariableTag){
	/**
	 * 类变量标签列表
	 */
	function ClassVariableTags(){
		IllegalTags.call(this);

		this.register(
			new ClassVariableTag()
		);
	};
	ClassVariableTags = new Rexjs(ClassVariableTags, IllegalTags);

	return ClassVariableTags;
}(
	this.ClassVariableTag
);

this.CloseArrowFunctionBodyContextTags = function(CommaTag, filter){
	/**
	 * 结束箭头函数主体上下文标签列表
	 */
	function CloseArrowFunctionBodyContextTags(){
		MistakableTags.call(this);
	};
	CloseArrowFunctionBodyContextTags = new Rexjs(CloseArrowFunctionBodyContextTags, MistakableTags);
	
	CloseArrowFunctionBodyContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是逗号
			if(tag instanceof CommaTag){
				// 设置类型
				tag.type = new TagType(TYPE_MISTAKABLE);
				return false;
			}

			return filter.call(this, tag);
		}
	});

	return CloseArrowFunctionBodyContextTags;
}(
	this.CommaTag,
	MistakableTags.prototype.filter
);

this.CloseCatchedExceptionTags = function(CloseCatchedExceptionTag){
	/**
	 * 被捕获的异常结束标签标签列表
	 */
	function CloseCatchedExceptionTags(){
		IllegalTags.call(this);
		
		this.register(
			new CloseCatchedExceptionTag()
		);
	};
	CloseCatchedExceptionTags = new Rexjs(CloseCatchedExceptionTags, IllegalTags);
	
	return CloseCatchedExceptionTags;
}(
	this.CloseCatchedExceptionTag
);

this.ClosureVariableContextTags = function(VarDeclarationBreakTag, BasicAssignmentTag, CommaTag){
	/**
	 * 闭包内变量上下文标签列表
	 */
	function ClosureVariableContextTags(){
		StatementEndTags.call(this);

		this.register(
			new VarDeclarationBreakTag()
		);
	};
	ClosureVariableContextTags = new Rexjs(ClosureVariableContextTags, StatementEndTags);

	ClosureVariableContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是赋值标签
			if(tag instanceof BasicAssignmentTag){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
			}
			// 如果是逗号标签
			else if(tag instanceof CommaTag){
				// 设置为可误解的
				tag.type = new TagType(TYPE_MISTAKABLE);
			}
			
			return false;
		}
	});
	
	return ClosureVariableContextTags;
}(
	this.VarDeclarationBreakTag,
	this.BasicAssignmentTag,
	this.CommaTag
);

this.VariableDeclarationTags = function(OpenDeclarationArrayTag, OpenDeclarationObjectTag){
	/**
	 * 变量声明标签列表
	 */
	function VariableDeclarationTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenDeclarationArrayTag(),
			new OpenDeclarationObjectTag()
		);
	};
	VariableDeclarationTags = new Rexjs(VariableDeclarationTags, IllegalTags);

	return VariableDeclarationTags;
}(
	this.OpenDeclarationArrayTag,
	this.OpenDeclarationObjectTag
);

this.ConstContextTags = function(VariableDeclarationTags, ConstVariableTag){
	/**
	 * const 关键字上下文标签列表
	 */
	function ConstContextTags(){
		VariableDeclarationTags.call(this);
		
		this.register(
			new ConstVariableTag()
		);
	};
	ConstContextTags = new Rexjs(ConstContextTags, VariableDeclarationTags);

	return ConstContextTags;
}(
	this.VariableDeclarationTags,
	this.ConstVariableTag
);

this.ConstructorArgumentsTags = function(OpenConstructorArgumentsTag){
	/**
	 * 类的构造函数参数标签列表
	 */
	function ConstructorArgumentsTags(){
		IllegalTags.call(this);

		this.register(
			new OpenConstructorArgumentsTag()
		);
	};
	ConstructorArgumentsTags = new Rexjs(ConstructorArgumentsTags, IllegalTags);

	return ConstructorArgumentsTags;
}(
	this.OpenConstructorArgumentsTag
);

this.ConstructorBodyTags = function(OpenConstructorBodyTag){
	/**
	 * 类的构造函数主体标签列表
	 */
	function ConstructorBodyTags(){
		IllegalTags.call(this);

		this.register(
			new OpenConstructorBodyTag()
		);
	};
	ConstructorBodyTags = new Rexjs(ConstructorBodyTags, IllegalTags);

	return ConstructorBodyTags;
}(
	this.OpenConstructorBodyTag
);

this.DeclarationArrayItemSeparatorTags = function(DeclarationArrayItemSeparatorTag, CloseDeclarationArrayTag){
	/**
	 * 变量声明数组项分隔符列表
	 */
	function DeclarationArrayItemSeparatorTags(){
		IllegalTags.call(this);
		
		this.register(
			new DeclarationArrayItemSeparatorTag(),
			new CloseDeclarationArrayTag()
		);
	};
	DeclarationArrayItemSeparatorTags = new Rexjs(DeclarationArrayItemSeparatorTags, IllegalTags);

	return DeclarationArrayItemSeparatorTags; 
}(
	this.DeclarationArrayItemSeparatorTag,
	this.CloseDeclarationArrayTag
);

this.DeclarationArrayItemContextTags = function(DeclarationArrayItemSeparatorTags, DeclarationArrayItemAssignmentTag){
	/**
	 * 变量声明数组项上下文标签列表
	 */
	function DeclarationArrayItemContextTags(){
		DeclarationArrayItemSeparatorTags.call(this);
		
		this.register(
			new DeclarationArrayItemAssignmentTag()
		);
	};
	DeclarationArrayItemContextTags = new Rexjs(DeclarationArrayItemContextTags, DeclarationArrayItemSeparatorTags);

	return DeclarationArrayItemContextTags; 
}(
	this.DeclarationArrayItemSeparatorTags,
	this.DeclarationArrayItemAssignmentTag
);

this.DeclarationArrayRestItemContextTags = function(DeclarationArrayItemSeparatorTags, DeclarationRestItemSeparatorTag){
	/**
	 * 变量声明数组省略项上下文标签列表
	 */
	function DeclarationArrayRestItemContextTags(){
		DeclarationArrayItemSeparatorTags.call(this);
		
		this.register(
			new DeclarationRestItemSeparatorTag()
		);
	};
	DeclarationArrayRestItemContextTags = new Rexjs(DeclarationArrayRestItemContextTags, DeclarationArrayItemSeparatorTags);

	return DeclarationArrayRestItemContextTags; 
}(
	this.DeclarationArrayItemSeparatorTags,
	this.DeclarationRestItemSeparatorTag
);

this.DeclarationArrayRestItemTags = function(DeclarationArrayRestItemTag){
	/**
	 * 变量声明数组省略项标签列表
	 */
	function DeclarationArrayRestItemTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationArrayRestItemTag()
		);
	};
	DeclarationArrayRestItemTags = new Rexjs(DeclarationArrayRestItemTags, IllegalTags);

	return DeclarationArrayRestItemTags;
}(
	this.DeclarationArrayRestItemTag
);

this.DeclarationPropertyNameSeparatorTags = function(DeclarationPropertyNameSeparatorTag){
	/**
	 * 变量声明属性名分隔符标签列表
	 */
	function DeclarationPropertyNameSeparatorTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertyNameSeparatorTag()
		);
	};
	DeclarationPropertyNameSeparatorTags = new Rexjs(DeclarationPropertyNameSeparatorTags, IllegalTags);

	return DeclarationPropertyNameSeparatorTags; 
}(
	this.DeclarationPropertyNameSeparatorTag
);

this.DeclarationPropertyNameTags = function(list){
	/**
	 * 变量声明属性名标签列表
	 */
	function DeclarationPropertyNameTags(){
		IllegalTags.call(this);

		this.delegate(list);
	};
	DeclarationPropertyNameTags = new Rexjs(DeclarationPropertyNameTags, IllegalTags);

	return DeclarationPropertyNameTags;
}(
	// list
	[
		this.IdentifierDeclarationPropertyNameTag,
		this.NumberDeclarationPropertyNameTag,
		this.BinaryNumberDeclarationPropertyNameTag,
		this.OctalNumberDeclarationPropertyNameTag,
		this.KeywordDeclarationPropertyNameTag,
		this.StringDeclarationPropertyNameTag,
		this.OpenComputedDeclarationPropertyNameTag,
		this.DeclarationPropertyRestTag,
		this.CloseDeclarationObjectTag
	]
);

this.DeclarationPropertyRestItemTags = function(DeclarationPropertyRestItemTag){
	/**
	 * 变量声明对象属性省略项标签列表
	 */
	function DeclarationPropertyRestItemTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertyRestItemTag()
		);
	};
	DeclarationPropertyRestItemTags = new Rexjs(DeclarationPropertyRestItemTags, IllegalTags);

	return DeclarationPropertyRestItemTags;
}(
	this.DeclarationPropertyRestItemTag
);

this.DeclarationPropertySeparatorTags = function(DeclarationPropertySeparatorTag, CloseDeclarationObjectTag){
	/**
	 * 变量声明属性分隔符标签列表
	 */
	function DeclarationPropertySeparatorTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertySeparatorTag(),
			new CloseDeclarationObjectTag()
		);
	};
	DeclarationPropertySeparatorTags = new Rexjs(DeclarationPropertySeparatorTags, IllegalTags);

	return DeclarationPropertySeparatorTags;
}(
	this.DeclarationPropertySeparatorTag,
	this.CloseDeclarationObjectTag
);

this.DeclarationPropertyRestItemContextTags = function(DeclarationPropertySeparatorTags, DeclarationRestItemSeparatorTag){
	/**
	 * 变量声明对象属性省略项上下文标签列表
	 */
	function DeclarationPropertyRestItemContextTags(){
		DeclarationPropertySeparatorTags.call(this);
		
		this.register(
			new DeclarationRestItemSeparatorTag()
		);
	};
	DeclarationPropertyRestItemContextTags = new Rexjs(DeclarationPropertyRestItemContextTags, DeclarationPropertySeparatorTags);

	return DeclarationPropertyRestItemContextTags; 
}(
	this.DeclarationPropertySeparatorTags,
	this.DeclarationRestItemSeparatorTag
);

this.DeclarationPropertyValueContextTags = function(DeclarationPropertySeparatorTags, DeclarationPropertyValueInitializerTag){
	/**
	 * 变量声明属性值上下文标签列表
	 */
	function DeclarationPropertyValueContextTags(){
		DeclarationPropertySeparatorTags.call(this);

		this.register(
			new DeclarationPropertyValueInitializerTag()
		);
	};
	DeclarationPropertyValueContextTags = new Rexjs(DeclarationPropertyValueContextTags, DeclarationPropertySeparatorTags);

	return DeclarationPropertyValueContextTags;
}(
	this.DeclarationPropertySeparatorTags,
	this.DeclarationPropertyValueInitializerTag
);

this.DeclarationPropertyValueTags = function(DeclarationPropertyValueTag, OpenArrayDeclarationPropertyValueTag, OpenObjectDeclarationPropertyValueTag){
	/**
	 * 变量声明属性值标签列表
	 */
	function DeclarationPropertyValueTags(){
		IllegalTags.call(this);

		this.register(
			new DeclarationPropertyValueTag(),
			new OpenArrayDeclarationPropertyValueTag(),
			new OpenObjectDeclarationPropertyValueTag()
		);
	};
	DeclarationPropertyValueTags = new Rexjs(DeclarationPropertyValueTags, IllegalTags);

	return DeclarationPropertyValueTags;
}(
	this.DeclarationPropertyValueTag,
	this.OpenArrayDeclarationPropertyValueTag,
	this.OpenObjectDeclarationPropertyValueTag
);

this.DestructibleExpressionContextTags = function(DestructuringAssignmentTag){
	/**
	 * 可解构表达式上下文标签列表
	 */
	function DestructibleExpressionContextTags(){
		ExpressionContextTags.call(this);
		
		this.register(
			new DestructuringAssignmentTag()
		);
	};
	DestructibleExpressionContextTags = new Rexjs(DestructibleExpressionContextTags, ExpressionContextTags);
	
	return DestructibleExpressionContextTags;
}(
	this.DestructuringAssignmentTag
);

this.DestructuringAssignmentTags = function(DestructuringAssignmentTag){
	/**
	 * 解构赋值标签列表
	 */
	function DestructuringAssignmentTags(){
		IllegalTags.call(this);

		this.register(
			new DestructuringAssignmentTag()
		);
	};
	DestructuringAssignmentTags = new Rexjs(DestructuringAssignmentTags, IllegalTags);

	return DestructuringAssignmentTags;
}(
	this.DestructuringAssignmentTag
);

this.DoWhileConditionTags = function(OpenDoWhileConditionTag){
	/**
	 * do while 条件标签列表
	 */
	function DoWhileConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenDoWhileConditionTag()
		);
	};
	DoWhileConditionTags = new Rexjs(DoWhileConditionTags, IllegalTags);
	
	return DoWhileConditionTags;
}(
	this.OpenDoWhileConditionTag
);

this.DotAccessorContextTags = function(PropertyNameTag){
	/**
	 * 点属性访问器上下文标签列表
	 */
	function DotAccessorContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new PropertyNameTag()
		);
	};
	DotAccessorContextTags = new Rexjs(DotAccessorContextTags, IllegalTags);
	
	return DotAccessorContextTags;
}(
	this.PropertyNameTag
);

this.ExceptionVariableTags = function(ExceptionVariableTag){
	/**
	 * catch 语句异常变量标签列表
	 */
	function ExceptionVariableTags(){
		IllegalTags.call(this);
		
		this.register(
			new ExceptionVariableTag()
		);
	};
	ExceptionVariableTags = new Rexjs(ExceptionVariableTags, IllegalTags);

	return ExceptionVariableTags;
}(
	this.ExceptionVariableTag
);

this.ExportContextTags = function(list){
	/**
	 * export 关键字上下文标签列表
	 */
	function ExportContextTags(){
		IllegalTags.call(this);

		this.delegate(list);
	};
	ExportContextTags = new Rexjs(ExportContextTags, IllegalTags);

	return ExportContextTags;
}(
	// list
	[
		this.VarTag,
		this.LetTag,
		this.ConstTag,
		this.FunctionDeclarationTag,
		this.ClassDeclarationTag,
		this.DefaultExportTag,
		this.OpenExportMultipleMembersTag,
		this.ExportAllMembersTag
	]
);

this.ExtendsContextTags = function(UnaryTag, ExecTag, filter){
	/**
	 * extends 关键字上下文标签列表
	 */
	function ExtendsContextTags(){
		ExpressionTags.call(this);
	};
	ExtendsContextTags = new Rexjs(ExtendsContextTags, ExpressionTags);

	ExtendsContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是一元标签
			if(tag instanceof UnaryTag){
				// 如果是执行标签
				if(tag instanceof ExecTag){
					// 设置为可匹配
					tag.type = new TagType(TYPE_MATCHABLE);
				}
				
				return false;
			}
			
			return filter.call(this, tag);
		}
	});

	return ExtendsContextTags;
}(
	this.UnaryTag,
	this.ExecTag,
	ExpressionTags.prototype.filter
);

this.FileStartTags = function(FileStartTag){
	/**
	 * 文件起始标签列表
	 */
	function FileStartTags(){
		IllegalTags.call(this);
		
		this.register(
			new FileStartTag()
		);
	};
	FileStartTags = new Rexjs(FileStartTags, IllegalTags);
	
	FileStartTags.props({
		entrance: true
	});
	
	return FileStartTags;
}(
	this.FileStartTag
);

this.ForConditionTags = function(OpenForConditionTag){
	/**
	 * for 条件标签列表
	 */
	function ForConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenForConditionTag()
		);
	};
	ForConditionTags = new Rexjs(ForConditionTags, IllegalTags);

	return ForConditionTags;
}(
	this.OpenForConditionTag
);

this.ForConditionContextTags = function(VarTag, filter){
	/**
	 * for 条件上下文标签列表
	 */
	function ForConditionContextTags(){
		ExpressionTags.call(this);
	};
	ForConditionContextTags = new Rexjs(ForConditionContextTags, ExpressionTags);

	ForConditionContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是语句标签
			if(tag instanceof VarTag){
				// 设置为可匹配
				tag.type = new TagType(TYPE_MATCHABLE);
				return false;
			}

			// 调用父类方法
			return filter.call(this, tag);
		}
	});
	
	return ForConditionContextTags;
}(
	this.VarTag,
	ExpressionTags.prototype.filter
);

this.FunctionArgumentTags = function(OpenArgumentsTag){
	/**
	 * 函数参数标签列表
	 */
	function FunctionArgumentTags(){
		IllegalTags.call(this);

		this.register(
			new OpenArgumentsTag()
		);
	};
	FunctionArgumentTags = new Rexjs(FunctionArgumentTags, IllegalTags);

	return FunctionArgumentTags;
}(
	this.OpenArgumentsTag
);

this.FunctionBodyTags = function(OpenFunctionBodyTag){
	/**
	 * 函数主体标签列表
	 */
	function FunctionBodyTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenFunctionBodyTag()
		);
	};
	FunctionBodyTags = new Rexjs(FunctionBodyTags, IllegalTags);

	return FunctionBodyTags;
}(
	this.OpenFunctionBodyTag
);

this.StarContextTags = function(FunctionNameTag, OpenArgumentsTag){
	/**
	 * 生成器星号上下文标签列表
	 */
	function StarContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new FunctionNameTag(),
			new OpenArgumentsTag()
		);
	};
	StarContextTags = new Rexjs(StarContextTags, IllegalTags);

	return StarContextTags;
}(
	this.FunctionNameTag,
	this.OpenArgumentsTag
);

this.FunctionDeclarationStarContextTags = function(FunctionVariableTag){
	/**
	 * 生成器声明上下文标签列表
	 */
	function FunctionDeclarationStarContextTags(){
		IllegalTags.call(this);

		this.register(
			new FunctionVariableTag()
		);
	};
	FunctionDeclarationStarContextTags = new Rexjs(FunctionDeclarationStarContextTags, IllegalTags);

	return FunctionDeclarationStarContextTags;
}(
	this.FunctionVariableTag
);

this.FunctionContextTags = function(StarContextTags, StarTag){
	/**
	 * 函数关键字上下文标签列表
	 */
	function FunctionContextTags(){
		StarContextTags.call(this);
		
		this.register(
			new StarTag()
		);
	};
	FunctionContextTags = new Rexjs(FunctionContextTags, StarContextTags);

	return FunctionContextTags;
}(
	this.StarContextTags,
	this.StarTag
);

this.FunctionDeclarationContextTags = function(FunctionDeclarationStarContextTags, FunctionDeclarationStarTag){
	/**
	 * 函数声明上下文标签列表
	 */
	function FunctionDeclarationContextTags(){
		FunctionDeclarationStarContextTags.call(this);

		this.register(
			new FunctionDeclarationStarTag()
		);
	};
	FunctionDeclarationContextTags = new Rexjs(FunctionDeclarationContextTags, FunctionDeclarationStarContextTags);

	return FunctionDeclarationContextTags;
}(
	this.FunctionDeclarationStarContextTags,
	this.FunctionDeclarationStarTag
);

this.IfConditionTags = function(OpenIfConditionTag){
	/**
	 * if 条件标签列表
	 */
	function IfConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenIfConditionTag()
		);
	};
	IfConditionTags = new Rexjs(IfConditionTags, IllegalTags);

	return IfConditionTags;
}(
	this.OpenIfConditionTag
);

this.LabelContextTags = function(LabelColonTag){
	/**
	 * 标记标签上下文列表
	 */
	function LabelContextTags(){
		ExpressionContextTags.call(this);
		
		this.register(
			new LabelColonTag()
		);
	};
	LabelContextTags = new Rexjs(LabelContextTags, ExpressionContextTags);

	return LabelContextTags;
}(
	this.LabelColonTag
);

this.LetContextTags = function(VariableDeclarationTags, LocalVariableTag){
	/**
	 * let 关键字上下文标签列表
	 */
	function LetContextTags(){
		VariableDeclarationTags.call(this);
		
		this.register(
			new LocalVariableTag()
		);
	};
	LetContextTags = new Rexjs(LetContextTags, VariableDeclarationTags);

	return LetContextTags;
}(
	this.VariableDeclarationTags,
	this.LocalVariableTag
);

this.MemberAliasVariableTags = function(MemberAliasVariableTag){
	/**
	 * 模块成员分隔符上下文标签列表
	 */
	function MemberAliasVariableTags(){
		IllegalTags.call(this);

		this.register(
			new MemberAliasVariableTag()
		);
	};
	MemberAliasVariableTags = new Rexjs(MemberAliasVariableTags, IllegalTags);

	return MemberAliasVariableTags;
}(
	this.MemberAliasVariableTag
);

this.MemberContextTags = function(MemberAliasTag, MultipleMembersSeparatorTag){
	/**
	 * 模块成员上下文标签列表
	 */
	function MemberContextTags(){
		ECMAScriptTags.call(this);

		this.register(
			new MemberAliasTag(),
			new MultipleMembersSeparatorTag()
		);
	};
	MemberContextTags = new Rexjs(MemberContextTags, ECMAScriptTags);

	return MemberContextTags;
}(
	this.MemberAliasTag,
	this.MultipleMembersSeparatorTag
);

this.MemberSeparatorContextTags = function(DefaultMemberTag, AllMembersTag, OpenMultipleMembersTag){
	/**
	 * 模块成员分隔符上下文标签列表
	 */
	function MemberSeparatorContextTags(){
		IllegalTags.call(this);

		this.register(
			new DefaultMemberTag(),
			new AllMembersTag(),
			new OpenMultipleMembersTag()
		);
	};
	MemberSeparatorContextTags = new Rexjs(MemberSeparatorContextTags, IllegalTags);

	return MemberSeparatorContextTags;
}(
	this.DefaultMemberTag,
	this.AllMembersTag,
	this.OpenMultipleMembersTag
);

this.IdentifierDeclarationPropertyNameContextTags = function(DeclarationPropertySeparatorTags, DeclarationPropertyNameInitializerTag, DeclarationPropertyNameSeparatorTag){
	/**
	 * 可声明的标识符属性名上下文标签列表
	 */
	function IdentifierDeclarationPropertyNameContextTags(){
		DeclarationPropertySeparatorTags.call(this);

		this.register(
			new DeclarationPropertyNameInitializerTag(),
			new DeclarationPropertyNameSeparatorTag()
		);
	};
	IdentifierDeclarationPropertyNameContextTags = new Rexjs(IdentifierDeclarationPropertyNameContextTags, DeclarationPropertySeparatorTags);

	return IdentifierDeclarationPropertyNameContextTags;
}(
	this.DeclarationPropertySeparatorTags,
	this.DeclarationPropertyNameInitializerTag,
	this.DeclarationPropertyNameSeparatorTag
);

this.ImportContextTags = function(MemberSeparatorContextTags, ModuleNameTag){
	function ImportContextTags(){
		MemberSeparatorContextTags.call(this);

		this.register(
			new ModuleNameTag()
		);
	};
	ImportContextTags = new Rexjs(ImportContextTags, MemberSeparatorContextTags);

	return ImportContextTags;
}(
	this.MemberSeparatorContextTags,
	this.ModuleNameTag
);

this.MemberSeparatorTags = function(MemberSeparatorTag, FromTag){
	/**
	 * 模块成员分隔符标签列表
	 */
	function MemberSeparatorTags(){
		IllegalTags.call(this);

		this.register(
			new MemberSeparatorTag(),
			new FromTag()
		);
	};
	MemberSeparatorTags = new Rexjs(MemberSeparatorTags, IllegalTags);

	return MemberSeparatorTags;
}(
	this.MemberSeparatorTag,
	this.FromTag
);

this.MemberVariableTags = function(MemberVariableTag){
	/**
	 * 模块成员标签列表
	 */
	function MemberVariableTags(){
		ECMAScriptTags.call(this);

		this.register(
			new MemberVariableTag()
		);
	};
	MemberVariableTags = new Rexjs(MemberVariableTags, ECMAScriptTags);

	return MemberVariableTags;
}(
	this.MemberVariableTag
);

this.ModuleAliasTags = function(ModuleAliasTag){
	/**
	 * as 标签列表
	 */
	function ModuleAliasTags(){
		IllegalTags.call(this);
		
		this.register(
			new ModuleAliasTag()
		);
	};
	ModuleAliasTags = new Rexjs(ModuleAliasTags, IllegalTags);

	return ModuleAliasTags;
}(
	this.ModuleAliasTag
);

this.ModuleNameTags = function(ModuleNameTag){
	/**
	 * 模块名称标签列表
	 */
	function ModuleNameTags(){
		IllegalTags.call(this);
		
		this.register(
			new ModuleNameTag()
		);
	};
	ModuleNameTags = new Rexjs(ModuleNameTags, IllegalTags);

	return ModuleNameTags;
}(
	this.ModuleNameTag
);

this.ModuleVariableTags = function(ModuleVariableTag){
	/**
	 * 模块变量名标签列表
	 */
	function ModuleVariableTags(){
		IllegalTags.call(this);
		
		this.register(
			new ModuleVariableTag()
		);
	};
	ModuleVariableTags = new Rexjs(ModuleVariableTags, IllegalTags);

	return ModuleVariableTags;
}(
	this.ModuleVariableTag
);

this.NegationContextTags = function(NegationSiblingTag, DecrementSiblingTag){
	/**
	 * 正号上下文标签列表
	 */
	function NegationContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new NegationSiblingTag(),
			new DecrementSiblingTag()
		);
	};
	NegationContextTags = new Rexjs(NegationContextTags, ExpressionTags);

	return NegationContextTags;
}(
	this.NegationSiblingTag,
	this.DecrementSiblingTag
);

this.NewContextTags = function(ExtendsContextTags, TargetAccessorTag, SuperTag, filter){
	/**
	 * new 关键字上下文标签列表
	 */
	function NewContextTags(){
		ExtendsContextTags.call(this);

		this.register(
			new TargetAccessorTag()
		);
	};
	NewContextTags = new Rexjs(NewContextTags, ExtendsContextTags);

	NewContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是 super 标签，则不修改 type，因为 new 后面不能接 super 关键字
			if(tag instanceof SuperTag){
				return false;
			}

			// 调用父类方法
			filter.call(this, tag);
		}
	});
	
	return NewContextTags;
}(
	this.ExtendsContextTags,
	this.TargetAccessorTag,
	this.SuperTag,
	this.ExtendsContextTags.prototype.filter
);

this.OpenArgumentsContextTags = function(ArgumentSeparatorContextTags, CloseArgumentsTag){
	/**
	 * 起始参数上下文标签列表
	 */
	function OpenArgumentsContextTags(){
		ArgumentSeparatorContextTags.call(this);
		
		this.register(
			new CloseArgumentsTag()
		);
	};
	OpenArgumentsContextTags = new Rexjs(OpenArgumentsContextTags, ArgumentSeparatorContextTags);

	return OpenArgumentsContextTags;
}(
	this.ArgumentSeparatorContextTags,
	this.CloseArgumentsTag
);

this.OpenArrayContextTags = function(ArraySpreadTag){
	/**
	 * 起始数组上下文标签列表
	 */
	function OpenArrayContextTags(){
		ExpressionTags.call(this);

		this.register(
			new ArraySpreadTag()
		);
	};
	OpenArrayContextTags = new Rexjs(OpenArrayContextTags, ExpressionTags);

	return OpenArrayContextTags;
}(
	this.ArraySpreadTag
);

this.OpenMultiLineCommentContextTags = function(CommentContentTag, CloseMultiLineCommentTag){
	/**
	 * 起始多行注释上下文标签列表
	 */
	function OpenMultiLineCommentContextTags(){
		IllegalTags.call(this);

		this.register(
			new CommentContentTag(),
			new CloseMultiLineCommentTag()
		);
	};
	OpenMultiLineCommentContextTags = new Rexjs(OpenMultiLineCommentContextTags, IllegalTags);

	return OpenMultiLineCommentContextTags;
}(
	this.CommentContentTag,
	this.CloseMultiLineCommentTag
);

this.OpenGroupingContextTags = function(IllegibleRestTag){
	/**
	 * 起始分组小括号上下文标签列表
	 */
	function OpenGroupingContextTags(){
		ExpressionTags.call(this);

		this.register(
			new IllegibleRestTag()
		);
	};
	OpenGroupingContextTags = new Rexjs(OpenGroupingContextTags, ExpressionTags);

	return OpenGroupingContextTags;
}(
	this.IllegibleRestTag
);

this.OpenRestrictedCommentContextTags = function(OpenMultiLineCommentContextTags, CommentBreakTag){
	/**
	 * 起始多行注释上下文标签列表
	 */
	function OpenRestrictedCommentContextTags(){
		OpenMultiLineCommentContextTags.call(this);

		this.register(
			new CommentBreakTag()
		);
	};
	OpenRestrictedCommentContextTags = new Rexjs(OpenRestrictedCommentContextTags, OpenMultiLineCommentContextTags);

	return OpenRestrictedCommentContextTags;
}(
	this.OpenMultiLineCommentContextTags,
	this.CommentBreakTag
);

this.OpenSwitchBodyContextTags = function(CaseTag, DefaultTag, CloseSwitchBodyTag){
	/**
	 * switch 语句块起始上下文标签列表
	 */
	function OpenSwitchBodyContextTags(){
		IllegalTags.call(this);
		
		this.register(
			new CaseTag(),
			new DefaultTag(),
			new CloseSwitchBodyTag()
		);
	};
	OpenSwitchBodyContextTags = new Rexjs(OpenSwitchBodyContextTags, IllegalTags);

	return OpenSwitchBodyContextTags;
}(
	this.CaseTag,
	this.DefaultTag,
	this.CloseSwitchBodyTag
);

this.OpenDeclarationArrayContextTags = function(DeclarationArrayItemSeparatorTags, list){
	/**
	 * 起始变量声明数组上下文标签列表
	 */
	function OpenDeclarationArrayContextTags(){
		DeclarationArrayItemSeparatorTags.call(this);

		this.delegate(list);
	};
	OpenDeclarationArrayContextTags = new Rexjs(OpenDeclarationArrayContextTags, DeclarationArrayItemSeparatorTags);

	return OpenDeclarationArrayContextTags; 
}(
	this.DeclarationArrayItemSeparatorTags,
	// list
	[
		this.DeclarationArrayItemTag,
		this.DeclarationArrayRestTag,
		this.OpenNestedDeclarationArrayItemTag,
		this.OpenObjectDeclarationArrayItemTag
	]
);

this.ParameterTags = function(SpreadTag){
	/**
	 * 函数调用参数标签列表
	 */
	function ParameterTags(){
		ExpressionTags.call(this);
		
		this.register(
			new SpreadTag()
		);
	};
	ParameterTags = new Rexjs(ParameterTags, ExpressionTags);

	return ParameterTags;
}(
	this.SpreadTag
);

this.PlusContextTags = function(PlusSiblingTag, IncrementSiblingTag){
	/**
	 * 正号上下文标签列表
	 */
	function PlusContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new PlusSiblingTag(),
			new IncrementSiblingTag()
		);
	};
	PlusContextTags = new Rexjs(PlusContextTags, ExpressionTags);

	return PlusContextTags;
}(
	this.PlusSiblingTag,
	this.IncrementSiblingTag
);

this.PropertyNameContextTags = function(OpenShorthandMethodArgumentsTag, PropertyNameSeparatorTag, CloseObjectTag, CloseBraceTag){
	/**
	 * 对象名称上下文标签列表
	 */
	function PropertyNameContextTags(){
		ECMAScriptTags.call(this);

		this.register(
			new OpenShorthandMethodArgumentsTag(),
			new PropertyNameSeparatorTag(),
			new CloseObjectTag(TYPE_ILLEGAL)
		);
	};
	PropertyNameContextTags = new Rexjs(PropertyNameContextTags, ECMAScriptTags);

	PropertyNameContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是结束大括号
			if(tag instanceof CloseBraceTag){
				// 如果是结束对象大括号，则不过滤，否则其他都过滤
				return !(tag instanceof CloseObjectTag);
			}
			
			return false;
		}
	});

	return PropertyNameContextTags;
}(
	this.OpenShorthandMethodArgumentsTag,
	this.PropertyNameSeparatorTag,
	this.CloseObjectTag,
	this.CloseBraceTag
);

this.IdentifierPropertyNameContextTags = function(PropertyNameContextTags, PropertySeparatorTag, PropertyInitializerTag, CloseObjectTag){
	/**
	 * 对象标识符名称上下文标签列表
	 */
	function IdentifierPropertyNameContextTags(){
		PropertyNameContextTags.call(this);

		this.register(
			new PropertySeparatorTag(),
			new PropertyInitializerTag(),
			new CloseObjectTag(TYPE_UNEXPECTED)
		);
	};
	IdentifierPropertyNameContextTags = new Rexjs(IdentifierPropertyNameContextTags, PropertyNameContextTags);

	return IdentifierPropertyNameContextTags;
}(
	this.PropertyNameContextTags,
	this.PropertySeparatorTag,
	this.PropertyInitializerTag,
	this.CloseObjectTag
);

this.OpenClassBodyContextTags = function(ClassPropertyNameTags, StaticModifierTag){
	/**
	 * 类主体起始上下文标签列表
	 */
	function OpenClassBodyContextTags(){
		ClassPropertyNameTags.call(this);

		this.register(
			new StaticModifierTag()
		);
	};
	OpenClassBodyContextTags = new Rexjs(OpenClassBodyContextTags, ClassPropertyNameTags);

	return OpenClassBodyContextTags;
}(
	this.ClassPropertyNameTags,
	this.StaticModifierTag
);

this.PropertyNameTags = function(list){
	/**
	 * 对象属性名称标签列表
	 */
	function PropertyNameTags(){
		IllegalTags.call(this);

		this.delegate(list);
	};
	PropertyNameTags = new Rexjs(PropertyNameTags, IllegalTags);

	return PropertyNameTags;
}(
	// list
	[
		this.CloseObjectTag,
		this.IdentifierPropertyNameTag,
		this.NumberPropertyNameTag,
		this.BinaryNumberPropertyNameTag,
		this.OctalNumberPropertyNameTag,
		this.KeywordPropertyNameTag,
		this.StringPropertyNameTag,
		this.OpenComputedPropertyNameTag,
		this.GetTag,
		this.SetTag,
		this.PropertyStarTag,
		this.PropertySpreadTag
	]
);

this.PropertySeparatorTags = function(PropertySeparatorTag){
	/**
	 * 属性分隔符标签列表
	 */
	function PropertySeparatorTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new PropertySeparatorTag()
		);
	};
	PropertySeparatorTags = new Rexjs(PropertySeparatorTags, ECMAScriptTags);

	return PropertySeparatorTags;
}(
	this.PropertySeparatorTag
);

this.RestArgumentNameTags = function(RestArgumentNameTag){
	/**
	 * 省略参数名标签列表
	 */
	function RestArgumentNameTags(){
		IllegalTags.call(this);
		
		this.register(
			new RestArgumentNameTag()
		);
	};
	RestArgumentNameTags = new Rexjs(RestArgumentNameTags, IllegalTags);

	return RestArgumentNameTags;
}(
	this.RestArgumentNameTag
);

this.RestArgumentNameContextTags = function(RestArgumentSeparatorTag){
	/**
	 * 省略参数名上下文标签列表
	 */
	function RestArgumentNameContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new RestArgumentSeparatorTag()
		);
	};
	RestArgumentNameContextTags = new Rexjs(RestArgumentNameContextTags, ECMAScriptTags);

	return RestArgumentNameContextTags;
}(
	this.RestArgumentSeparatorTag
);

this.RestrictedExpressionContextTags = function(PostfixUnaryAssignmentTag, UnaryAssignmentTag, filter){
	/**
	 * 受限制的表达式上下文标签列表
	 */
	function RestrictedExpressionContextTags(){
		ExpressionContextTags.call(this);
	};
	RestrictedExpressionContextTags = new Rexjs(RestrictedExpressionContextTags, ExpressionContextTags);
	
	RestrictedExpressionContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是后置一元赋值标签
			if(tag instanceof PostfixUnaryAssignmentTag){
				// 过滤掉
				return true;
			}

			// 如果是其他的一元赋值标签
			if(tag instanceof UnaryAssignmentTag){
				// 设置为可误解的，目的是报错
				tag.type = new TagType(TYPE_MISTAKABLE);
			}

			return filter.call(this, tag);
		}
	});
	
	return RestrictedExpressionContextTags;
}(
	this.PostfixUnaryAssignmentTag,
	this.UnaryAssignmentTag,
	ExpressionContextTags.prototype.filter
);

this.ReturnContextTags = function(OnlyStatementEndTags){
	/**
	 * return 上下文标签列表
	 */
	function ReturnContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new OnlyStatementEndTags()
		);
	};
	ReturnContextTags = new Rexjs(ReturnContextTags, ExpressionTags);

	return ReturnContextTags;
}(
	this.OnlyStatementEndTags
);

this.ShorthandMethodArgumentsTags = function(OpenShorthandMethodArgumentsTag){
	/**
	 * 简写方法参数标签列表
	 */
	function ShorthandMethodArgumentsTags(){
		IllegalTags.call(this);

		this.register(
			new OpenShorthandMethodArgumentsTag()
		);
	};
	ShorthandMethodArgumentsTags = new Rexjs(ShorthandMethodArgumentsTags, IllegalTags);

	return ShorthandMethodArgumentsTags;
}(
	this.OpenShorthandMethodArgumentsTag
);

this.ShorthandMethodBodyTags = function(OpenShorthandMethodBodyTag){
	/**
	 * 简写方法主体标签列表
	 */
	function ShorthandMethodBodyTags(){
		IllegalTags.call(this);

		this.register(
			new OpenShorthandMethodBodyTag()
		);
	};
	ShorthandMethodBodyTags = new Rexjs(ShorthandMethodBodyTags, IllegalTags);

	return ShorthandMethodBodyTags;
}(
	this.OpenShorthandMethodBodyTag
);

this.ShorthandMethodNameTags = function(list){
	/**
	 * 简写方法名标签列表
	 */
	function ShorthandMethodNameTags(){
		IllegalTags.call(this);
		
		this.delegate(list);
	};
	ShorthandMethodNameTags = new Rexjs(ShorthandMethodNameTags, IllegalTags);

	return ShorthandMethodNameTags;
}(
	// list
	[
		this.CloseObjectTag,
		this.IdentifierMethodNameTag,
		this.NumberMethodNameTag,
		this.BinaryNumberMethodNameTag,
		this.OctalNumberMethodNameTag,
		this.StringMethodNameTag,
		this.OpenComputedMethodNameTag
	]
);

this.AccessorDescriptorContextTags = function(ShorthandMethodNameTags, ConstructorTag, ClassPropertyInitializerTag, OpenShorthandMethodArgumentsTag, PropertyAccessorTag){
	/**
	 * 访问器描述符上下文签列表
	 */
	function AccessorDescriptorContextTags(){
		ShorthandMethodNameTags.call(this);

		this.register(
			new ConstructorTag(),
			new ClassPropertyInitializerTag(),
			new OpenShorthandMethodArgumentsTag()
		);
	};
	AccessorDescriptorContextTags = new Rexjs(AccessorDescriptorContextTags, ShorthandMethodNameTags);

	AccessorDescriptorContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			return tag instanceof PropertyAccessorTag;
		}
	});

	return AccessorDescriptorContextTags;
}(
	this.ShorthandMethodNameTags,
	this.ConstructorTag,
	this.ClassPropertyInitializerTag,
	this.OpenShorthandMethodArgumentsTag,
	this.PropertyAccessorTag
);

this.PropertyAccessorContextTags = function(ShorthandMethodNameTags, OpenShorthandMethodArgumentsTag, PropertyNameSeparatorTag, PropertySeparatorTag){
	/**
	 * 属性访问器上下文标签列表
	 */
	function PropertyAccessorContextTags(){
		ShorthandMethodNameTags.call(this);
		
		this.register(
			new OpenShorthandMethodArgumentsTag(),
			new PropertyNameSeparatorTag(),
			new PropertySeparatorTag()
		);
	};
	PropertyAccessorContextTags = new Rexjs(PropertyAccessorContextTags, ShorthandMethodNameTags);

	return PropertyAccessorContextTags;
}(
	this.ShorthandMethodNameTags,
	this.OpenShorthandMethodArgumentsTag,
	this.PropertyNameSeparatorTag,
	this.PropertySeparatorTag
);

this.StaticModifierContextTags = function(ClassPropertyNameTags, ConstructorTag, CloseObjectTag, ClassPropertyPlaceholderTag, ClassPropertyInitializerTag, OpenShorthandMethodArgumentsTag){
	/**
	 * return 上下文标签列表
	 */
	function StaticModifierContextTags(){
		ClassPropertyNameTags.call(this);
		
		this.register(
			new ClassPropertyInitializerTag(),
			new OpenShorthandMethodArgumentsTag()
		);
	};
	StaticModifierContextTags = new Rexjs(StaticModifierContextTags, ClassPropertyNameTags);

	StaticModifierContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			return (
				// constructor 不能作为静态属性
				tag instanceof ConstructorTag ||
				// 如果是结束大括号
				tag instanceof CloseObjectTag ||
				// 如果是分号
				tag instanceof ClassPropertyPlaceholderTag
			);
		}
	})
	
	return StaticModifierContextTags;
}(
	this.ClassPropertyNameTags,
	this.ConstructorTag,
	this.CloseObjectTag,
	this.ClassPropertyPlaceholderTag,
	this.ClassPropertyInitializerTag,
	this.OpenShorthandMethodArgumentsTag
);

this.SuperAccessorContextTags = function(list){
	/**
	 * 父类属性名上下文标签列表
	 */
	function SuperAccessorContextTags(){
		ExpressionContextTags.call(this);
		
		// 注册标签
		this.delegate(list);
	};
	SuperAccessorContextTags = new Rexjs(SuperAccessorContextTags, ExpressionContextTags);

	return SuperAccessorContextTags;
}(
	// list
	[
		this.OpenSuperMethodCallTag,
		this.SuperPropertyBasicAssignmentTag,
		this.SuperPropertyShorthandAssignmentTag,
		this.SuperPropertyPostfixIncrementTag,
		this.SuperPropertyPostfixDecrementTag
	]
);

this.SuperContextTags = function(OpenSuperCallTag, SuperDotAccessorTag, OpenSuperBracketAccessorTag){
	/**
	 * super 关键字上下文标签列表
	 */
	function SuperContextTags(){
		ECMAScriptTags.call(this);
		
		this.register(
			new OpenSuperCallTag(),
			new SuperDotAccessorTag(),
			new OpenSuperBracketAccessorTag()
		);
	};
	SuperContextTags = new Rexjs(SuperContextTags, ECMAScriptTags);

	return SuperContextTags;
}(
	this.OpenSuperCallTag,
	this.SuperDotAccessorTag,
	this.OpenSuperBracketAccessorTag
);

this.SuperPropertyNameTags = function(SuperPropertyNameTag){
	/**
	 * 父类属性名标签列表
	 */
	function SuperPropertyNameTags(){
		IllegalTags.call(this);
		
		this.register(
			new SuperPropertyNameTag()
		);
	};
	SuperPropertyNameTags = new Rexjs(SuperPropertyNameTags, IllegalTags);

	return SuperPropertyNameTags;
}(
	this.SuperPropertyNameTag
);

this.SwitchBlockTags = function(OpenSwitchBodyTag){
	/**
	 * switch 语句块标签列表
	 */
	function SwitchBlockTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenSwitchBodyTag()
		);
	};
	SwitchBlockTags = new Rexjs(SwitchBlockTags, IllegalTags);

	return SwitchBlockTags;
}(
	this.OpenSwitchBodyTag
);

this.SwitchConditionTags = function(OpenSwitchConditionTag){
	/**
	 * switch 条件标签列表
	 */
	function SwitchConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenSwitchConditionTag()
		);
	};
	SwitchConditionTags = new Rexjs(SwitchConditionTags, IllegalTags);

	return SwitchConditionTags;
}(
	this.OpenSwitchConditionTag
);

this.TargetAccessorContextTags = function(TargetTag){
	/**
	 * new.target 属性访问器上下文标签列表
	 */
	function TargetAccessorContextTags(){
		IllegalTags.call(this);

		this.register(
			new TargetTag()
		);
	};
	TargetAccessorContextTags = new Rexjs(TargetAccessorContextTags, IllegalTags);

	return TargetAccessorContextTags;
}(
	this.TargetTag
);

this.TemplateContentTags = function(TemplateContentTag, OpenPlaceHolderTag, TemplateLineTerminatorTag, TemplateQouteTag, CloseTemplateTag){
	/**
	 * 模板内容上下文标签列表
	 */
	function TemplateContentTags(){
		ECMAScriptTags.call(this);

		this.register(
			new TemplateContentTag(),
			new OpenPlaceHolderTag(),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.CARRIAGE_RETURN),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.LINE_SEPARATOR),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.LINEFEED),
			new TemplateLineTerminatorTag(TemplateLineTerminatorTag.PARAGRAPH_SEPARATOR),
			new TemplateQouteTag(),
			new CloseTemplateTag()
		);
	};
	TemplateContentTags = new Rexjs(TemplateContentTags, ECMAScriptTags);

	return TemplateContentTags;
}(
	this.TemplateContentTag,
	this.OpenPlaceHolderTag,
	this.TemplateLineTerminatorTag,
	this.TemplateQouteTag,
	this.CloseTemplateTag
);

this.TerminatedBranchFlowContextTags = function(LabelledIdentifierTag){
	/**
	 * 中断分支流上下文标签列表
	 */
	function TerminatedBranchFlowContextTags(){
		StatementEndTags.call(this);
		
		this.register(
			new LabelledIdentifierTag()
		);
	};
	TerminatedBranchFlowContextTags = new Rexjs(TerminatedBranchFlowContextTags, StatementEndTags);

	return TerminatedBranchFlowContextTags;
}(
	this.LabelledIdentifierTag
);

this.ThrowContextTags = function(ThrowContextLineTerminatorTag){
	/**
	 * throw 关键字上下文标签
	 */
	function ThrowContextTags(){
		ExpressionTags.call(this);
		
		this.register(
			new ThrowContextLineTerminatorTag()
		);
	};
	ThrowContextTags = new Rexjs(ThrowContextTags, ExpressionTags);

	return ThrowContextTags;
}(
	this.ThrowContextLineTerminatorTag
);

this.TryContextTags = function(ExtendsContextTags, OpenBlockTag, filter){
	/**
	 * try 关键字上下文标签
	 */
	function TryContextTags(){
		ExtendsContextTags.call(this);
		
		this.register(
			new OpenBlockTag()
		);
	};
	TryContextTags = new Rexjs(TryContextTags, ExtendsContextTags);

	TryContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			var value = filter.call(this, tag);

			// 如果是表达式标签
			if(tag.class.expression){
				// 如果是可以匹配的
				if(tag.type.matchable){
					// 设置为可匹配
					tag.type = new TagType(TYPE_MISTAKABLE);
				}
			}
			
			return value;
		}
	});
	
	return TryContextTags;
}(
	this.ExtendsContextTags,
	this.OpenBlockTag,
	this.ExtendsContextTags.prototype.filter
);

this.UnexpectedTags = function(){
	/**
	 * 未捕获的标签列表
	 */
	function UnexpectedTags(){
		ECMAScriptTags.call(this);
	};
	UnexpectedTags = new Rexjs(UnexpectedTags, ECMAScriptTags);

	return UnexpectedTags;
}();

this.VarContextTags = function(VariableDeclarationTags, ClosureVariableTag){
	/**
	 * var 关键字上下文标签列表
	 */
	function VarContextTags(){
		VariableDeclarationTags.call(this);
		
		this.register(
			new ClosureVariableTag()
		);
	};
	VarContextTags = new Rexjs(VarContextTags, VariableDeclarationTags);

	return VarContextTags;
}(
	this.VariableDeclarationTags,
	this.ClosureVariableTag
);

this.VarDeclarationBreakContextTags = function(ClosureVariableContextTags, SpecialLineTerminatorTag, filter){
	/**
	 * var 语句变量声明换行符上下文标签列表
	 */
	function VarDeclarationBreakContextTags(){
		ClosureVariableContextTags.call(this);
	};
	VarDeclarationBreakContextTags = new Rexjs(VarDeclarationBreakContextTags, ClosureVariableContextTags);

	VarDeclarationBreakContextTags.props({
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			// 如果是特殊的换行符
			if(tag instanceof SpecialLineTerminatorTag){
				// 过滤掉
				return true;
			}

			// 如果是语句标签
			if(tag.class.statementBegin){
				// 设置类型
				tag.type = new TagType(TYPE_MISTAKABLE);
				return false;
			}
			
			// 调用父类方法
			return filter.call(this, tag);
		}
	});

	return VarDeclarationBreakContextTags;
}(
	this.ClosureVariableContextTags,
	this.SpecialLineTerminatorTag,
	this.ClosureVariableContextTags.prototype.filter
);

this.WhileConditionTags = function(OpenWhileConditionTag){
	/**
	 * while 条件标签列表
	 */
	function WhileConditionTags(){
		IllegalTags.call(this);
		
		this.register(
			new OpenWhileConditionTag()
		);
	};
	WhileConditionTags = new Rexjs(WhileConditionTags, IllegalTags);

	return WhileConditionTags;
}(
	this.OpenWhileConditionTag
);

}.call(
	this,
	this.ECMAScriptTags,
	this.ExpressionTags,
	this.ExpressionContextTags,
	this.MistakableTags,
	this.StatementTags,
	this.StatementEndTags,
	this.IllegalTags
);


// ECMAScript 解析器相关
!function(SyntaxParser, ECMAScriptTags){

this.ECMAScriptTagsMap = function(SyntaxTagsMap, dataArray){
	/**
	 * ECMAScript 标签列表映射，初始化该类是个耗性能过程，建议作为单例使用
	 */
	function ECMAScriptTagsMap(){
		SyntaxTagsMap.call(this);
		
		dataArray.forEach(
			function(data){
				this.map(
					data.name,
					new data.tags()
				);
			},
			this
		);
	};
	ECMAScriptTagsMap = new Rexjs(ECMAScriptTagsMap, SyntaxTagsMap);

	ECMAScriptTagsMap.static({
		/**
		 * 绑定标签列表
		 * @param {String} name - 标签列表的唯一名称
		 * @param {SyntaxTags} SyntaxTags - 需要绑定的标签列表
		 */
		bind: function(name, SyntaxTags){
			// 如果不存在数据数组中
			if(dataArray.every(function(data){
				// 如果名称一致
				if(data.name === name){
					// 设置标签列表
					data.tags = SyntaxTags;
					return false;
				}

				return true;
			})){
				// 追加新项
				dataArray.push({
					name: name,
					tags: SyntaxTags
				});
			}
		}
	});
	
	return ECMAScriptTagsMap;
}(
	Rexjs.SyntaxTagsMap,
	// dataArray
	Object
		.getOwnPropertyNames(this)
		.filter(
			function(name, i){
				return this[name].prototype instanceof ECMAScriptTags;
			},
			this
		)
		.map(
			function(name){
				return {
					name: name[0].toLowerCase() + name.substring(1),
					tags: this[name]
				};
			},
			this
		)
);

this.ECMAScriptParser = function(SourceBuilder, MappingBuilder, ECMAScriptTagsMap, GlobalStatements, tagsMap, sourceMaps, parse){
	/**
	 * ECMAScript 语法解析器
	 */
	function ECMAScriptParser(){
		SyntaxParser.call(this);
	};
	ECMAScriptParser = new Rexjs(ECMAScriptParser, SyntaxParser);

	ECMAScriptParser.static({
		/**
		 * 获取编译配置
		 */
		get config(){
			return config;
		},
		/**
		 * 设置编译配置
		 * @param {SyntaxConfig} value - 需要设置的配置
		 */
		set config(value){
			config = value;
		},
		/**
		 * 获取是否应该生成 sourceMaps
		 */
		get sourceMaps(){
			return sourceMaps;
		},
		/**
		 * 设置是否应该生成 sourceMaps
		 * @param {Boolean} value - 是否应该生成 sourceMaps
		 */
		set sourceMaps(value){
			sourceMaps = value;
		}
	});

	ECMAScriptParser.props({
		/**
		 * 将解析后的语法生成字符串
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 * @param {Boolean} _withoutModule - 不采用模块形式的入口
		 */
		build: function(_contentBuilder, _withoutModule){
			var file = this.file, url = file.url;

			_contentBuilder = _contentBuilder || (
				// 如果提供了文件路径
				url.href ?
					(
						sourceMaps ? new MappingBuilder(file) : new SourceBuilder(file)
					) :
					// 如果没有提供文件路径
					new ContentBuilder()
			);

			// 追加闭包函数起始部分
			_contentBuilder.appendString(
				(_withoutModule ? "!" : 'new Rexjs.Module("' + url.href + '",') + "function(Rexjs){"
			);

			// 创建新行
			_contentBuilder.newline();
			// 追加严格表达式字符串
			_contentBuilder.appendString('"use strict";');
			// 创建新行
			_contentBuilder.newline();

			// 提取语法列表内容
			this.statements.extractTo(_contentBuilder);

			// 创建新行
			_contentBuilder.newline();
			// 追加闭包函数结束部分
			_contentBuilder.appendString("}" + (_withoutModule ? ".call(this, Rexjs)" : ")") + ";");

			return _contentBuilder.complete();
		},
		defaultExported: false,
		deps: null,
		/**
		 * 开始解析
		 * @param {File} file - 文件信息
		 */
		parse: function(file){
			this.deps = [];

			parse.call(
				this,
				file,
				/*
					如果 tagsMap 没有初始化，则初始化，
					在这里初始化的目的是为了：
					1. 当不使用 ECMAScriptParser 时，不会耗性能
					2. 就算多次使用 ECMAScriptParser，也不会多次初始化 ECMAScriptTagsMap
				*/
				tagsMap || (tagsMap = new ECMAScriptTagsMap()),
				new GlobalStatements()
			);
		}
	});

	return ECMAScriptParser;
}(
	Rexjs.SourceBuilder,
	Rexjs.MappingBuilder,
	this.ECMAScriptTagsMap,
	this.GlobalStatements,
	// tagsMap
	null,
	// sourceMaps
	false,
	SyntaxParser.prototype.parse
);

}.call(
	this,
	Rexjs.SyntaxParser,
	this.ECMAScriptTags
);


Rexjs.static(this);
}(
	Rexjs,
	Rexjs.ContentBuilder,
	Rexjs.Expression,
	Rexjs.ListExpression,
	Rexjs.EmptyExpression,
	Rexjs.DefaultExpression,
	Rexjs.PartnerExpression,
	Rexjs.LeftHandSideExpression,
	// ECMAScriptStatement
	null,
	// BoxStatement
	null,
	// ECMAScriptErrors
	null,
	// ECMAScriptOrders
	null,
	Rexjs.SyntaxTag,
	Rexjs.TagType,
	Rexjs.TagClass.CLASS_STATEMENT_BEGIN,
	Rexjs.TagClass.CLASS_STATEMENT_END,
	Rexjs.TagClass.CLASS_EXPRESSION,
	Rexjs.TagClass.CLASS_EXPRESSION_CONTEXT,
	Rexjs.TagType.TYPE_MATCHABLE,
	Rexjs.TagType.TYPE_UNEXPECTED,
	Rexjs.TagType.TYPE_MISTAKABLE,
	Rexjs.TagType.TYPE_ILLEGAL,
	Rexjs.Expression.STATE_STATEMENT_ENDABLE,
	Rexjs.Expression.STATE_STATEMENT_END,
	Rexjs.Expression.STATE_STATEMENT_ENDED,
	// IDENTIFIER_REGEXP_SOURCE
	/(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*/
		.toString()
		.match(
			/^\/(.+)\/$/
		)[1],
	// config
	new Rexjs.SyntaxConfig("es6Base", "es6Module", "rexjs"),
	// commonVisitor
	function(parser, context, statement, statements){
		// 设置当前表达式
		context.setExpressionOf(statement);
		// 设置当前语句
		context.setStatementOf(statements);
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

this.Module = Module = function(ModuleCompiler, cache, stack, create, defineProperty, readFile){
	/**
	 * 模块
	 * @param {String} name - 模块名称
	 * @param {String, Function} _code - 模块代码
	 * @param {Boolean} _sync - 是否同步
	 */
	function Module(name, _code, _sync){
		var moduleName = moduleReady.parseName(name), href = moduleName.href;

		// 如果缓存里已经存在该模块
		if(cache.hasOwnProperty(href)){
			var module = cache[href];

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
		 * 获取模块缓存信息
		 */
		get cache(){
			return cache;
		},
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
				cache[
					moduleReady.parseName(name, _baseUrlString).href
				]
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
					var href = moduleReady.parseName(dep, name.href).href, module = cache.hasOwnProperty(href) ? cache[href] : new Module(href, null, _sync);

					// 如果是重复导入
					if(imports.indexOf(module) > -1){
						return;
					}

					// 如果是两模块相互引用
					if(module.imports.indexOf(this) > - 1){
						// 报错
						throw (
							"Module has been imported by each other " +
							name.href + " " +
							module.name.href
						);
					}

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
	this.ModuleCompiler,
	// cache
	{},
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

Rexjs.static(this);
}(
	Rexjs,
	Rexjs.URL,
	// Module
	null,
	// global
	Function("return this")()
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
				url.ext = ".js";
				url.filename = "index.js";
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
					new Module(script.src);
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