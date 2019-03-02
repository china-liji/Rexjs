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
			var parser = new Rexjs.ECMAScriptParser();
			
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

this.ModuleCache = function(cache, hasOwnProperty, getModuleHref, getCachedModule, deleteCachedModule){
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
		 * 获取所有被缓存的模块
		 */
		get all(){
			return this.names.map(this.item, this);
		},
		/**
		 * 缓存模块
		 * @param {Module} module - 需要缓存的模块
		 */
		cache: function(module){
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
		 * 获取所有被缓存的模块名称
		 */
		get names(){
			var names = [];

			// 遍历缓存对象
			for(var name in cache){
				names.push(name);
			}

			return names;
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
		import: function(nameString, _baseUrlString){
			// 解析名称，此操作的结果可能会被污染，比如添加 ".js" 拓展名
			var name = moduleReady.parseName(nameString, _baseUrlString);

			toThrow:
			{
				// 如果有此模块
				if(ModuleCache.cached(name.href)){
					// 返回模块输出
					return ModuleCache.item(name.href).exports;
				}

				// 重新生成无污染的 url
				var url = new URL(nameString, _baseUrlString);
				
				// 如果有详细的文件名
				if(url.filename){
					break toThrow;
				}
				
				var dirname = url.dirname;

				// 如果存在目录
				if(dirname.length !== "/"){
					// 利用目录名加拓展名，生成新的 dirname 的 url
					var u = new URL(dirname + ".js");

					// 覆盖 dirname
					url.dirname = u.dirname;
					// 覆盖 filename
					url.filename = u.filename;

					try {
						// 以 ".js" 的形式导入模块，如果成功，则直接返回结果
						return this.import(url.href);
					}
					catch(e){
						// 找不到带 ".js" 的模块，进入下一步
					}
				}

				// 恢复当初的目录名
				url.dirname = dirname;
				// 设置文件名
				url.filename = "index.js";

				try {
					// 以 "/index.js" 形式导入模块，如果成功，则直接返回结果
					return this.import(url.href);
				}
				catch(e){
					break toThrow;
				}
			}

			// 抛出错误
			throw 'Cannot import module "' + nameString + '"' + (_baseUrlString ? ' from "' + _baseUrlString + '"' : "") + ".";
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

					// 如果引入的是自己
					if(module === this){
						throw "Module has been imported by itself " + href + ".";
					}

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

				// 触发监听器
				trigger(module);
				// 抛出错误信息
				throw 'Load module "' + module.name.href + '" error: ' + error + ".";
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