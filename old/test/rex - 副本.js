;
// Rexjs 面向对象基础类的实现
new function(global, descriptor, defineProperty, getPrototypeOf, setPrototypeOf, getOwnPropertyNames){
"use strict";

this.Rexjs = function(Function, create, getProperties, setPrototypeOf){
	/**
	 * 面向对象基础类的构造器
	 * @param {Function} constructor - 构造函数
	 * @param {Rexjs} _SuperClass - 需要继承的父类
	 */
	return function Rexjs(constructor, _SuperClass){
		var prototype, properties = getProperties(constructor);

		// 判断父类类型
		switch(
			typeof _SuperClass
		){
			// 如果是函数
			case "function" :
				prototype = _SuperClass.prototype;
				break;

			// 如果是 undefined
			case "undefined" :
				prototype = this.getOwnClass().prototype;
				break;

			// 默认
			default :
				prototype = _SuperClass;
				break;
		}

		// 设置 __proto__
		setPrototypeOf(
			constructor,
			// 如果 prototype 存在
			prototype ?
				(
					// 如果父类存在，则是父类，否则取 Rexjs 的构造函数的原型链
					_SuperClass || this.constructor.getOwnPrototype()
				) :
				// 创建一个空的对象
				create(null, properties)
		);

		// 设置 prototype
		constructor.prototype = create(prototype, properties);

		// 返回类的构造函数
		return constructor;
	};
}(
	Function,
	Object.create,
	// getProperties
	function(constructor){
		return {
			constructor : {
				value : constructor,
				configurable : true,
				writable : true
			}
		};
	},
	// setPrototypeOf
	setPrototypeOf || (
		descriptor ?
			function(obj, prototype){
				// 兼容 ： IE10
				descriptor.set.call(obj, prototype);
			} :
			function(obj, prototype){
				// 兼容 ： IE9、Android
				do {
					getOwnPropertyNames(
						prototype
					)
					.forEach(function(name){
						if(
							obj.hasOwnProperty(name)	
						){
							return;
						}

						obj[name] = prototype[name];
					});

					prototype = getPrototypeOf(prototype);
				}
				while(
					prototype
				);
			}
	)
);

this.value = function(Rexjs){
	return new Rexjs(Rexjs, null);
}(
	this.Rexjs
);

defineProperty(global, "Rexjs", this);
}(
	typeof window === "undefined" ? global : window,
	// descriptor
	Object.getOwnPropertyDescriptor(
		Object.prototype,
		"__proto__"
	),
	Object.defineProperty,
	Object.getPrototypeOf,
	Object.setPrototypeOf,
	Object.getOwnPropertyNames
);


// 基本方法和属性的定义
new function(Rexjs, Object, Array, getOwnPropertyNames, getOwnPropertyDescriptor, createPrototype, definePrototype){
"use strict";

this.every = function(){
	/**
	 * 确定对象的所有成员是否满足指定的测试
	 * @param {Object} obj - 需要测试成员的对象
	 * @param {Function} fn - 用于测试对象成员的测试函数
	 * @param {*} _this - 指定测试函数的 this 对象
	 */
	return function every(obj, fn, _this){
		// 如果obj是数组
		if(
			obj instanceof Array
		){
			// 调用并返回数组自带的every结果
			return obj.every(fn, _this);
		}

		// 遍历obj
		for(
			var name in obj
		){
			if(
				// 调用测试函数
				fn.call(_this, obj[name], name, obj)
			){
				continue;
			}

			return false;
		}

		return true;
	};
}();

this.forEach = function(every){
	/**
	 * 遍历对象的所有成员并对其执行指定操作函数
	 * @param {Object} obj - 需要遍历的对象
	 * @param {Function} fn - 指定操作的函数
	 * @param {*} _this - 指定操作函数的 this 对象
	 */
	return function forEach(obj, fn, _this){
		every(
			obj,
			function(){
				fn.apply(this, arguments);
			
				return true;
			},
			_this
		);

		return obj;
	};
}(
	this.every
);

this.set = function(forEach){
	/**
	 * 添加或修改指定对象的属性
	 * @param {Object} obj - 需要添加或修改属性的对象
	 * @param {Object} props - 需要添加或修改的属性集合
	 */
	return function set(obj, props){
		forEach(
			props,
			function(val, name){
				obj[name] = val;
			}
		);

		return obj;
	};
}(
	this.forEach
);
		
this.defineProperties = function(set, defineProperty, empty, toObject){
	/**
	 * 将一个或多个属性添加到对象，并/或修改现有属性的特性
	 * @param {Object} obj - 对其添加或修改属性的对象
	 * @param {Object, Array} props - 包含一个或多个属性的键值对或者是带有name、value的对象数组
	 * @param {Object} _descriptor - 需要添加或修改的属性描述符
	 */
	return function defineProperties(obj, props, _descriptor){
		// 如果是数组
		if(
			props instanceof Array
		){
			// 将数组转化为对象
			props = toObject(props, set, _descriptor);
		}

		// 获取所有props里面的属性名称
		getOwnPropertyNames(
				props
			)
			.forEach(
				function(propertyName){
					// 获取描述符
					var descriptor = getOwnPropertyDescriptor(props, propertyName);

					// 默认设置不可枚举
					descriptor.enumerable = false;

					// 处理描述符
					this(descriptor);

					// 如果存在访问器
					if(
						descriptor.set || descriptor.get
					){
						// 删除writable
						delete descriptor.writable;
						// 删除value
						delete descriptor.value;
					}

					// 定义属性
					defineProperty(obj, propertyName, descriptor);
				},
				_descriptor ?
					// 处理描述符
					function(descriptor){
						// 将_descriptor里面的属性设置到descriptor
						set(descriptor, _descriptor);

						// 如果存在访问器
						if(
							descriptor.gettable || descriptor.settable
						){
							// 将value里面的属性设置到descriptor里
							set(descriptor, descriptor.value);
						}
					} :
					empty
			);

		return obj;
	};
}(
	this.set,
	Object.defineProperty,
	// empty
	Function.prototype,
	// toObject
	function(array, set, _descriptor){
		var props = {};

		// 遍历数组
		array.forEach(
			// 如果存在访问器
			_descriptor && (_descriptor.gettable || _descriptor.settable) ?
				function(item){
					var name = item.name;

					// 如果属性已经存在，说明是访问器的 value，因为只有访问器的 value 存在 get、set 多种值的情况
					if(
						props.hasOwnProperty(name)
					){
						// 合并 get、set 在同一个 value 中
						set(props[name], item.value);
					}
					else {
						// 设置新属性
						props[name] = item.value;
					}
				} :
				// 如果不是访问器
				function(item){
					// 直接设置属性
					props[item.name] = item.value;
				}
		);

		return props;
	}
);

this.define = function(defineProperties, set){
	/**
	 * 将属性添加到对象或修改现有属性的特性
	 * @param {Object} obj - 对其添加或修改属性的对象
	 * @param {String} name - 需要添加或修改的属性名
	 * @param {*} value - 需要添加或修改的属性值
	 * @param {Object} _descriptor - 需要添加或修改的属性描述符
	 */
	return function define(obj, name, value, _descriptor){
		return defineProperties(
			obj,
			[
				{ name : name, value : value }
			],
			_descriptor
		);
	};
}(
	this.defineProperties,
	this.set
);

this.except = function(set, forEach){
	/**
	 * 返回一个不包含所有指定属性名称的对象
	 * @param {Object} obj - 需要排除属性的对象
	 * @param {Array} props - 需要排除的属性名称数组
	 */
	return function except(obj, props){
		var result = set({}, obj);

		forEach(
			props,
			function(name){
				delete result[name];
			}
		);
		
		return result;
	};
}(
	this.set,
	this.forEach
);

this.isInstanceOf = function(getPrototypeOf){
	/**
	 * 判断对象是否为指定类构造函数的一级实例（即直接由该类实例化）
	 * @param {Object} obj - 用于判断的实例对象
	 * @param {Function} constructor - 指定的类的构造函数
	 */
	return function isInstanceOf(obj, constructor){
		return getPrototypeOf(obj) === constructor.prototype;
	};
}(
	Object.getPrototypeOf
);

this.isPropertyOf = function(every){
	/**
	 * 检测对象自己是否具有指定属性或访问器
	 * @param {Object} obj - 一个可能具有指定属性或访问器的对象
	 * @param {*} property - 用于检测的属性或访问器
	 */
	return function isPropertyOf(obj, property){
		return !every(
			getOwnPropertyNames(obj),
			function(name){
				// 判断该属性的描述符内的value、get、set三个值是否有一个等于指定检测的属性或访问器
				return every(
					this,
					function(n){
						return this[n] !== property;
					},
					getOwnPropertyDescriptor(obj, name)
				);
			},
			["value", "get", "set"]
		);
	};
}(
	this.every
);

this.map = function(){
	/**
	 * 遍历对象的所有成员并对其执行指定操作函数，取其返回值作为新对象集合的同名值，最后返回此新对象
	 * @param {Object} obj - 需要遍历的对象
	 * @param {Function} fn - 指定操作的函数
	 * @param {*} _this - 指定操作函数的 this 对象
	 */
	return function map(obj, fn, _this){
		// 如果是数组
		if(
			obj instanceof Array
		){
			// 调用并返回数组自带的map结果
			return obj.map(fn, _this);
		}

		var result = new obj.constructor();

		// 遍历对象
		for(
			var name in obj
		){
			// 设置值为fn的返回值
			result[name] = fn.apply(
				_this,
				[obj[name], name, obj]
			);
		}

		return result;
	};
}();

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

		if(
			name
		){
			return "function " + name + "() { [native code] }";
		}

		return "function (){ [native code] }";
	};
}();

this.forEach(
	this,
	function(property, name, self){
		// 如果属性是函数
		if(
			typeof property === "function"
		){
			// 将函数的toString设置为self.toString，实现模拟native code
			property.toString = self.toString;
		}

		// 如果不是函数，则直接设置属性
		this[name] = property;
	},
	Rexjs
);

}(
	Rexjs,
	Object,
	Array,
	Object.getOwnPropertyNames,
	Object.getOwnPropertyDescriptor,
	// createPrototype
	function(){
		return Object.create(
			null,
			{
				constructor : {
					value : Rexjs,
					writable : true
				}
			}
		);
	}
);


// 原型链属性的定义
new function(Function, prototype, forEach, defineProperties, propertyIsEnumerable, hasOwnProperty, isPrototypeOf, getPrototypeOf, definePrototype){
"use strict";

this.hasOwnProperty = hasOwnProperty;

this.isPrototypeOf = isPrototypeOf;

this.propertyIsEnumerable = propertyIsEnumerable;

this.assign = function(){
	/**
	 * 给该类的属性赋值
	 * @param {Object} props - 包含一个或多个属性的键值对
	 */
	return function(props){
		// 遍历属性
		forEach(
			props,
			function(val, name){
				// 如果值是undefined
				if(
					val === void 0
				){
					// 则不设置，返回
					return;
				}

				// 设置值
				this[name] = val;
			},
			this
		);

		return this;
	};
}();

this.getSuperClass = function(getPrototypeOf){
	/**
	 * 获取父类
	 */
	return function(){
		return getPrototypeOf(
				this.getOwnClass()
					.prototype
			)
			.constructor;
	};
}(
	Object.getPrototypeOf
);

this.constructor = function(FUNCTION_NAME_REGX, constructor, assign, call, apply, bind, toString, getOwnPrototype){
	return defineProperties(
		definePrototype(
			// 兼容 ： IE9、IE10、Android
			getOwnPrototype.call(constructor)
		),
		{
			apply : apply,
			assign : assign,
			bind : bind,
			call : call,
			getOwnPrototype : getOwnPrototype,
			/**
			 * 获取父类
			 */
			getSuperClass : function(){
				return this.prototype.getSuperClass();
			},
			/**
			 * 获取该类的名称：毕竟 Function.name 不是标准，就连 IE11 就没有实现这个属性
			 */
			get name(){
				return (
					toString
						.call(
							// 因为在调试工具点开 __proto__ 属性的时候，要获取 __proto__ 的信息，
							// 所以当前对象 this 就为 __proto__，但 __proto__ 也有可能不是函数。
							typeof this === "function" ? this : this.constructor
						)
						.match(
							FUNCTION_NAME_REGX
						) ||
					["", ""]
				)[1];
			},
			/**
			 * 设置名称：因为 Function.name 是不可写属性，所以也不让设置
			 * @param {String} name - 需要设置的名称
			 */
			set name(name){},
			/**
			 * 重写一个或多个属性的值
			 * @param {Object} props - 包含一个或多个属性的键值对
			 * @param {Object} _descriptor - 被添加或修改属性的描述符
			 */
			override : function(props, _descriptor){
				this.props(props, _descriptor);
				return this;
			},
			/**
			 * 将一个或多个属性添加到该类，并/或修改现有属性的特性
			 * @param {Object} props - 包含一个或多个属性的键值对
			 * @param {Object} _descriptor - 被添加或修改属性的描述符
			 */
			props : function(props, _descriptor){
				defineProperties(this.prototype, props, _descriptor);
				return this;
			},
			/**
			 * 将一个或多个静态属性添加到该类，并/或修改现有属性的特性
			 * @param {Object} props - 包含一个或多个属性的键值对
			 * @param {Object} _descriptor - 被添加或修改属性的描述符
			 */
			static : function(props, _descriptor){
				defineProperties(this, props, _descriptor);
				return this;
			},
			/**
			 * 对象字符串
			 */
			toString : function(){
				return "function " + this.name + "() { native code }";
			}
		}
	)
	.constructor;
}(
	// FUNCTION_NAME_REGX
	/^\S+\s+([A-z_$]+[\w$]*)/,
	prototype.constructor,
	this.assign,
	Function.prototype.call,
	Function.prototype.apply,
	Function.prototype.bind,
	Function.prototype.toString,
	// getOwnPrototype
	function(){
		return this instanceof Function ? this : getPrototypeOf(this);
	}
);

this.getOwnClass = function(){
	/**
	 * 获取自身类
	 */
	return function(){
		return this.constructor;
	};
}();

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

defineProperties(
	definePrototype(prototype),
	this
);
}(
	Function,
	Rexjs.prototype,
	Rexjs.forEach,
	Rexjs.defineProperties,
	Object.prototype.propertyIsEnumerable,
	Object.prototype.hasOwnProperty,
	Object.prototype.isPrototypeOf,
	Object.getPrototypeOf,
	// definePrototype
	function(obj){
		/*
			考虑到ES6初稿已经将__proto__属性移除标准，所以在支持ES6的情况下，就不做处理；
			再者，IE10及以下也没有__proto__属性，也不用处理；
			最后，就算其他支持__proto__属性的浏览器，不定义__proto__也没关系，
			通过Object.getPrototypeOf方法一样可以获取，只不过在控制台里看不到__proto__属性而已。
		*/
		if(
			!Object.prototype.hasOwnProperty("__proto__")
		){
			return obj;
		}

		Object.defineProperty(
			obj,
			"__proto__",
			Object.getOwnPropertyDescriptor(
				Object.prototype,
				"__proto__"
			)
		);

		return obj;
	}
);


// 面向对象的基础
new function(
	Rexjs, Interface,
	ARG_LIST_REGX, ARG_REGX,
	prototype,
	emptyArray, defineProperties, forEach, freeze, getOwnPropertyDescriptor, toString
){
"use strict";

// 构造函数与继承：类、静态类、接口
(function(Function, toFunctionString, toString, getNameOf, getPassableArguments, checkPropertyNames){

this.Class = function(getSuperClass, getPrototypeOf, getArgumentNames, getConstructor){
	/**
	 * 定义类
	 * @param {Function} constructor - 源构造函数
	 * @param {Class, Interface} _SuperClass - 需要继承的父类 或 接口
	 * @param {String} _name - 重命名构造函数，一个非空字符串 
	 */
	function Class(constructor, _SuperClass, _name){
		return new Rexjs(
			// 获取构造函数
			getConstructor(
				// 源构造函数
				constructor,
				// 构造函数名称
				_name || constructor.name || getNameOf.call(constructor),
				// 构造函数参数
				getArgumentNames(constructor),
				// 父类构造函数参数
				getArgumentNames(
					_SuperClass ?
						(
							// 判断是否为接口，是接口则获取接口的父类
							getPrototypeOf(_SuperClass) === Interface ? _SuperClass.getSuperClass() : _SuperClass
						) :
						null
				),
				_SuperClass
			),
			_SuperClass || this.getOwnClass()
		);
	};
	Class = new Rexjs(Class);

	Class.override({
		/**
		 * 	获取父类
		 */
		getSuperClass : function(){
			var Super = getSuperClass.call(this);

			return Super === Class ? null : Super;
		},
		/**
		 * 	对象字符串
		 */
		toString : function(){
			return "[Class " + this.constructor.name + "]";
		}
	});

	Class.static({
		/**
		 * 	对象字符串
		 */
		toString : function(){
			// 如果是自身类
			if(
				this === Class
			){
				// 返回 toString 的结果
				return toString.call(this);
			}

			// 返回拼接字符串
			return "class " + this.name + " { native code }";
		}
	});

	return Class;
}(
	Rexjs.prototype.getSuperClass,
	Object.getPrototypeOf,
	// getArgumentNames
	function(constructor){
		// 如果构造函数不存在，放回空数组
		if(
			!constructor
		){
			return emptyArray;
		}

		// 返回匹配的参数名称数组
		return toFunctionString.call(
				constructor
			)
			.match(
				ARG_LIST_REGX
			)[1]
			.match(
				ARG_REGX
			) ||
			emptyArray;
	},
	// getConstructor
	function(source, name, argumentNames, superArgumentNames, _SuperClass){
		var factoryName = "$" + name;

		// 遍历参数
		argumentNames.every(function(n, i){
			// 如果参数与 factoryName 一样
			if(
				argumentNames.indexOf(factoryName) > -1
			){
				// 为避免一样而导致访问不到外层作用域的 factoryName 参数，需要重新设置 factoryName
				factoryName = "$" + name + i;
				// 继续检测新的 factoryName 是否又被定义
				return true;
			}

			// factoryName 已安全，不再检测
			return false;
		});

		// 返回新的构造函数
		return new Function(
			// 参数 factoryName
			factoryName,
			// 构造函数主体
			[
				// 定义函数
				"return function " + name + " (" + argumentNames.join(", ") + "){",
				// 函数主体：调用 factoryName 参数所指向的函数
				"	return " + factoryName + ".apply(this, arguments);",
				// 函数结束
				"};",
			].join("\r\n")
		)(
			// factoryName
			_SuperClass ?
				function(){
					var superReturns, sourceReturns;
					
					// 调用父类并传入所需参数，并记录返回值
					superReturns = _SuperClass.apply(
						this,
						getPassableArguments(
							superArgumentNames,
							argumentNames,
							arguments
						)
					);
					
					// 如果父类返回值等于 undefined
					if(
						superReturns === void 0
					){
						// 那么父类的返回值就为当前的 this
						superReturns = this;
					}
					
					// 调用用户自定义的原构造函数，并记录返回值
					sourceReturns = source.apply(superReturns, arguments);
					
					// 如果 sourceReturns 等于 undefined，那么就返回 superReturns，否则返回 sourceReturns
					return sourceReturns === void 0 ? superReturns : sourceReturns;
				} :
				source
		);
	}
);

this.StaticClass = function(getConstructor){
	/**
	 * 定义静态类
	 * @param {Function} constructor - 源构造函数
	 * @param {Object} _staticProps - 静态属性
	 * @param {Object} _descriptor - 被添加属性的描述符
	 */
	function StaticClass(constructor, _staticProps, _descriptor){
		var CreatedStaticClass;

		// 创建类
		CreatedStaticClass = new Rexjs(
			getConstructor(
				constructor.name || getNameOf.call(constructor)
			),
			this.getOwnClass()
		);

		// 如果属性存在
		if(
			_staticProps
		){
			// 定义静态属性
			CreatedStaticClass.static(_staticProps, _descriptor);
		}

		// 因为是静态类，构造函数需要马上得到运行
		constructor.call(CreatedStaticClass);
		// 返回该静态类 
		return CreatedStaticClass;
	};
	StaticClass = new Rexjs(StaticClass);

	StaticClass.override({
		/**
		 * 获取父类
		 */
		getSuperClass : function(){
			return null;
		},
		/**
		 * 对象字符串
		 */
		toString : function(){
			return "[StaticClass " + this.constructor.name + "]";
		}
	});

	StaticClass.static({
		/**
		 * 对象字符串
		 */
		toString : function(){
			// 如果是自身类
			if(
				this === StaticClass	
			){
				// 返回 toString 的结果
				return toString.call(this);
			}

			// 返回拼接字符串
			return "static class " + this.name + " { native code }";
		}
	});

	return StaticClass;
}(
	// getConstructor
	function(name){
		return getOwnPropertyDescriptor(
				new Function("return { get '" + name + "' (){} };")(),
				name
			)
			.get;
	}
);

this.Interface = Interface = function(Class, toClassString, toString, isInstanceOf, getPrototypeOf, getConstructor){
	/**
	 * 定义接口
	 * @param {Array} propertyNames - 该接口所规定拥有的属性名称
	 */
	function Interface(propertyNames){
		// 如果不是Interface的直接实例（使用new）
		if(
			!isInstanceOf(this, Interface)
		){
			// 返回
			return;
		}

		var CreatedInterface;

		// 创建特殊的接口类
		CreatedInterface = new Rexjs(
			getConstructor(propertyNames),
			Interface
		);

		// 冻结该接口，不允许队该接口再定义或删除任何属性
		return freeze(CreatedInterface);
	};
	Interface = new Rexjs(Interface, Class);
	
	Interface.static({
		/**
		 * 对象字符串
		 */
		toString : function(){
			// 如果是接口本身
			if(
				this === Interface
			){
				// 调用并返回Rexjs.toString的结果
				return toString.call(this);
			}
			
			// 如果是接口
			if(
				getPrototypeOf(this) === Interface
			){
				// 返回接口字符串
				return this.name + " { native code }";
			}
			
			// 如果是继承接口的类，那么调用并返回Class.prototype.toString的结果
			return toClassString.call(this);
		}
	});

	return Interface;
}(
	this.Class,
	this.Class.toString,
	Rexjs.toString,
	Rexjs.isInstanceOf,
	Object.getPrototypeOf,
	// getConstructor
	function(propertyNames){
		var name = "Interface <" + propertyNames.join(", ") + ">";

		return new Function(
			"propertyNames",
			"getOwnPropertyDescriptor",
			"checkPropertyNames",
			[
				"return getOwnPropertyDescriptor(",
				"	{",
				"		get '" + name + "' (){",
				"			checkPropertyNames.call(this, propertyNames, arguments);",
				"		}",
				"	},",
				"	'" + name + "'",
				").get;"
			].join("\r\n")
		)(
			propertyNames,
			getOwnPropertyDescriptor,
			checkPropertyNames
		);
	}
);

}.call(
	this,
	Function,
	Function.prototype.toString,
	prototype.toString,
	// getNameOf
	getOwnPropertyDescriptor(prototype, "name").get,
	// getPassableArguments
	function(superArgumentNames, argumentNames, currentArguments){
		// 如果参数或父类参数有一个长度为0，则不需要继续
		if(
			(superArgumentNames.length || argumentNames.length) === 0
		){
			// 返回空数组
			return emptyArray;
		}

		return superArgumentNames
			.map(
				function(name){
					var i = argumentNames.indexOf(name);

					// 如果i===-1，说明可能没有指定的参数
					if(
						i === -1
					){
						// 如果name的第一个字符是下划线
						if(
							name[0] === "_"
						){
							// 重新检索name的存在性
							i = argumentNames.indexOf(name.substring(1));
						}
					}

					// 返回当前传入参数的指定项
					return currentArguments[i];
				}
			);
	},
	// checkPropertyNames
	function(propertyNames, args){
		var name;

		// 遍历属性名称
		propertyNames.every(
			function(propertyName){
				// 如果拥有指定名称的属性
				if(
					propertyName in this	
				){
					// 返回true
					return true;
				}

				// 记录名称
				name = propertyName;
				// 返回false
				return false;
			},
			this
		);

		// 如果名称存在，说明没有定义该名称的属性
		if(
			typeof name === "string"
		){
			// 报错
			throw '接口 ' + this.toString() + ' ：必须定义属性 \"' + name + '\" ！';
			return;
		}
	}
));

// 枚举
(function(Class){
	
this.EnumItem = function(){
	/**
	 * 枚举项
	 * @param {String} name - 该项对应的名称
	 * @param {*} _value - 该项对应的值
	 */
	function EnumItem(name, _value){
		this.assign({
			name : name,
			value : _value === void 0 ? this.getOwnClass().default++ : _value
		});
	};
	EnumItem = new Class(EnumItem);
	
	EnumItem.static({
		/**
		 * 获取该枚举类型的默认值
		 */
		get default(){
			// 设置并返回 0
			return this.default = 0;
		},
		/**
		 * 设置该枚举类型的默认值
		 * @param {Number} _value - 需要设置的默认值
		 */
		set default(value){
			// 如果是 EnumItem
			if(
				this === EnumItem
			){
				// 不做任何处理，因为下面的代码会重新定义本访问器
				return;
			}
			
			// 重新定义 default 属性
			this.static({
				get default(){
					return value;
				},
				set default(val){
					value = val;
				}
			});
		}
	});
	
	EnumItem.props({
		name : "",
		value : void 0
	});
	
	EnumItem.override({
		/**
		 * 将该枚举项转化成字符串
		 */
		toString : function(){
			return this.value.toString();
		},
		/**
		 * 获取该枚举项的值
		 */
		valueOf : function(){
			return this.value;
		}
	});

	return EnumItem;
}();

this.Enum = function(EnumItem, Array, every, toArray, hasOwnProperty){
	/**
	 * 定义枚举
	 * @param {Array, Object} items - 枚举数据数组或键值对
	 */
	function Enum(items){
		// 如果参数是枚举项
		if(
			items instanceof EnumItem
		){
			// 将参数转化成数组
			items = toArray(arguments);
		}
		
		// 遍历属性
		forEach(
			items,
			items instanceof Array ?
				function(name, value){
					// 如果 name 是 EnumItem 实例
					if(
						name instanceof EnumItem
					){
						this[name.name] = name;
						// 返回
						return;
					}
					
					this[name] = new EnumItem(name, value);
				} :
				function(value, name){
					// 如果 value 是 EnumItem 实例
					if(
						value instanceof EnumItem
					){
						this[value.name] = value;
						// 返回
						return;
					}
					
					this[name] = new EnumItem(name, value);
				},
			this
		);

		// 冻结该枚举，不允许添加、删除、修改属性
		freeze(this);
	};
	Enum = new Rexjs(Enum);
	
	Enum.props({
		/**
		 * 确定枚举的所有成员是否满足指定的测试
		 * @param {Function} fn - 用于测试对象成员的测试函数
		 * @param {*} _this - 指定测试函数的 this 对象
		 */
		every : function(fn, _this){
			return every(this, fn, _this);
		},
		/**
		 * 遍历枚举的所有成员并对其执行指定操作函数
		 * @param {Function} fn - 指定操作的函数
		 * @param {*} _this - 指定测试函数的 this 对象
		 */
		forEach : function(fn, _this){
			return forEach(this, fn, _this);
		},
		/**
		 * 判断是否有指定名称的枚举
		 * @param {String} propertyName - 指定的名称
		 */
		has : function(propertyName){
			return hasOwnProperty.call(this, propertyName);
		}
	});

	return Enum;
}(
	this.EnumItem,
	Array,
	Rexjs.every,
	Rexjs.toArray,
	Object.prototype.hasOwnProperty
);

}.call(
	this,
	this.Class
));

defineProperties(Rexjs, this);
}(
	Rexjs,
	// Interface
	null,
	// ARG_LIST_REGX
	/function[^\(]*\(([^\)]*)/,
	// ARG_REGX
	/([\$\_a-zA-Z]+[\w\$]*)/g,
	// prototype
	Rexjs.getOwnPrototype(),
	// emptyArray
	Object.freeze([]),
	Rexjs.defineProperties,
	Rexjs.forEach,
	Object.freeze,
	Object.getOwnPropertyDescriptor
);


// 基于 Rexjs 面向对象的拓展类
new function(Class, StaticClass, Interface, Enum, EnumItem, defineProperties){
"use strict";

// 列表相关类
(function(isNaN){

this.List = function(Array, Object, toArray, hasOwnProperty){
	/**
	 * 对列表进行管理、操作的类
	 * @param {List、Array} _list - 初始化时所拥有的列表集合
	 */
	function List(_list){
		if(
			!_list
		){
			return;
		}

		this.combine(_list);
	};
	List = new Class(List);

	List.props({
		/**
		 * 交替性取出集合索引值所符合的项
		 * @param {Number} num - 取模运算值
		 * @param {Number} _remainder - 余数
		 */
		alternate : function(num, _remainder){
			var list = this.createList();

			_remainder = _remainder || 0;

			this.forEach(function(item, i){
				if(
					i % num === _remainder
				){
					list.push(item);
				}
			});
			return list;
		},
		/**
		 * 清空整个集合
		 */
		clear : function(){
			this.splice(0);
			return this;
		},
		/**
		 * 在原列表上，合并另一个集合
		 * @param {List, Array} list - 另一个集合
		 */
		combine : function(list){
			this.push.apply(this, toArray(list));
			return this;
		},
		/**
		 * 创建新的列表
		 * @param {List, Array} _list - 初始化时所拥有的列表集合
		 */
		createList : function(_list){
			return new List(_list);
		},
		/**
		 * 对列表进行去重
		 */
		distinct : function(){
			///	<summary>
			///	对列表进行去重。
			///	</summary>
			this.splice(
					0
				)
				.forEach(
					function(item){
						if(
							this.indexOf(item) > -1
						){
							return;
						}
	
						this.push(item);
					},
					this
				);

			return this;
		},
		/**
		 * 返回集合中偶数项集合
		 */
		even : function(){
			return this.alternate(2);
		},
		length : 0,
		/**
		 * 返回集合中奇数项集合
		 */
		odd : function(){
			return this.alternate(2, 1);
		}
	});
	
	Object
		.getOwnPropertyNames(
			Array.prototype
		)
		.forEach(
			function(name){
				if(
					hasOwnProperty.call(List.prototype, name)
				){
					return;
				}

				if(
					name === "toString"
				){
					return;
				}

				var props = {};

				props[name] = this[name];

				List.props(props);
			},
			Array.prototype
		);

	List.override({
		/**
		 * 合并另外一个数组，并返回合并后的新数组
		 * @param {Array} list - 另一个集合
		 */
		concat : function(array){
			return toArray(
					this
				)
				.concat(
					toArray(array)
				);
		}
	});

	return List;
}(
	Array,
	Object,
	Rexjs.toArray,
	Object.prototype.hasOwnProperty
);

this.NamedItem = function(validate){
	/**
	 * 已命名项
	 * @param {String} name - 项的名称
	 */
	function NamedItem(name){
		// 验证名称
		if(
			!validate(name)
		){
			return;
		}
		
		this.assign(
			{ name : name }
		);
	};
	NamedItem = new Class(NamedItem);
	
	NamedItem.static(
		{ validate : validate }
	);
	
	NamedItem.props(
		{ name : "" }
	);
	
	return NamedItem;
}(
	// validate
	function(name){
		switch(
			true
		){
			// 如果是数字
			case !isNaN(name - 0) :
				break;
			
			// 如果不是字符串
			case typeof name !== "string" :
				break;
			
			// 如果名称等于 length
			case name === "length" :
				break;
			
			// 默认，返回true
			default :
				return true;
		}
		
		// 抛出错误
		throw '"' + name + '"' + "是一个无效的名称。";
		// 返回false
		return false;
	}
);

this.NamedItemMap = function(List, NamedItem, validate){
	/**
	 * 已命名项的映射集合
	 */
	function NamedItemMap(){};
	NamedItemMap = new Class(NamedItemMap, List);
	
	NamedItemMap.override({
		clear : function(){
			///	<summary>
			///	清空集合。
			///	</summary>
			this.forEach(
				function(item){
					delete this[item.name];
				},
				this
			);
			
			this.splice(0);
			return this;
		}
	});
	
	NamedItemMap.props({
		/**
		 * 获取已命名项
		 * @param {String} name - 指定的名称
		 */
		getNamedItem : function(name){
			var namedItem = this[name];
			
			// 如果是 NamedItem 实例，则返回 namedItem，否则返回 null
			return namedItem instanceof NamedItem ? namedItem : null;
		},
		/**
		 * 判断是否拥有指定名称的项
		 * @param {String} name - 指定的名称
		 */
		hasNamedItem : function(name){
			// 如果名称正确
			if(
				validate(name)
			){
				// 返回判断结果
				return this.hasOwnProperty(name);
			}
			
			// 返回false
			return false;
		},
		/**
		 * 检索指定名称的项
		 * @param {String} name - 指定的名称
		 */
		indexNamedItem : function(name){
			var namedItem = this[name];
			
			return namedItem instanceof NamedItem ? this.indexOf(namedItem) : -1;
		},
		/**
		 * 移除指定名称的项
		 * @param {String} name - 指定的名称
		 */
		removeNamedItem : function(name){
			var index = this.indexNamedItem(name);
			
			// 如果 index 大于 -1，说明存在此项
			if(
				index > -1
			){
				// 从数组中移除
				this.splice(index, 1);
				
				// 从键值对中移除
				delete this[name];
			}
			
			return this;
		},
		/**
		 * 设置项
		 * @param {*} namedItem - 指定的项
		 * @param {Number} _index - 在指定索引处插入该项
		 */
		setNamedItem : function(namedItem, _index){
			// 如果不是 NamedItem 的实例
			if(
				namedItem instanceof NamedItem === false
			){
				// 报错
				throw '第一个参数应该是"NamedItem"的实例。';
				return this;
			}
			
			// 设置键值对项
			this[namedItem.name] = namedItem;
			
			// 如果索引存在
			if(
				typeof _index === "number"
			){
				// 插入项
				this.splice(_index, 0, namedItem);
			}
			else {
				// 追加项
				this.push(namedItem);
			}
			
			return this;
		}
	});
	
	return NamedItemMap;
}(
	this.List,
	this.NamedItem,
	this.NamedItem.validate
);

}.call(
	this,
	Number.isNaN || window.isNaN
));


// 属性相关
(function(){
	
this.Descriptor = function(){
	/**
	 * 属性描述符
	 * @param {Boolean} _enumerable - 是否可枚举
	 * @param {Boolean} _writable - 是否可写入
	 * @param {Boolean} _configurable - 是否可再配置
	 * @param {Boolean} _gettable - 是否是通过获取器获取属性值
	 * @param {Boolean} _setter - 是否是通过设置器设置属性值
	 */
	function Descriptor(_enumerable, _writable, _configurable, _gettable, _settable){
		this.assign({
			configurable : _configurable,
			enumerable : _enumerable,
			gettable : _gettable,
			settable : _settable,
			writable : _writable
		});
	};
	Descriptor = new Class(Descriptor);

	Descriptor.props(
		{
			configurable : true,
			enumerable : true,
			gettable : false,
			settable : false,
			writable : true
		},
		{ enumerable : true }
	);

	return Descriptor;
}();

this.Property = function(Descriptor){
	/**
	 * 属性类，一般用于特殊的属性声明
	 * @param {*} value - 属性值
	 */
	function Property(value){
		this.assign(
			{ value : value }
		);
	};
	Property = new Class(Property);

	Property.props(
		{ value : null }
	);

	return Property;
}(
	this.Descriptor
);

this.NamedProperty = function(Property, Descriptor){
	/**
	 * 已命名的属性类，一般用于特殊名称的对象属性声明
	 * @param {String} name - 属性名称
	 * @param {*} value - 属性值
	 * @param {Descriptor} _descriptor - 属性描述符
	 */
	function NamedProperty(name, value, _descriptor){
		this.assign({
			descriptor : _descriptor,
			name : name
		});
	};
	NamedProperty = new Class(NamedProperty, Property);

	NamedProperty.props({
		descriptor : new Descriptor(),
		name : ""
	});

	return NamedProperty;
}(
	this.Property,
	this.Descriptor
);

this.Accessor = function(NamedProperty, Descriptor){
	/**
	 * 访问器属性
	 * @param {String} name - 属性名称
	 * @param {Function} _getter - 属性获取器
	 * @param {Function} _setter - 属性设置器
	 */
	function Accessor(name, _getter, _setter){
		this.assign({
			value : this.assign.call(
				{},
				{ get : _getter, set : _setter }
			)
		});
	};
	Accessor = new Class(Accessor, NamedProperty);

	Accessor.override(
		{ descriptor : new Descriptor(true, false, true, true, true) }
	);

	return Accessor;
}(
	this.NamedProperty,
	this.Descriptor
);

this.Getter = function(Accessor){
	/**
	 * 属性获取器
	 * @param {String} name - 属性名称
	 * @param {Function} getter - 属性获取器
	 */
	function Getter(name, getter){};
	Getter = new Class(Getter, Accessor);

	return Getter;
}(
	this.Accessor
);

this.Setter = function(Accessor){
	/**
	 * 属性设置器
	 * @param {String} name - 属性名称
	 * @param {Function} setter - 属性设置器
	 */
	function Setter(name, setter){};
	Setter = new Class(Setter, Accessor);

	return Setter;
}(
	this.Accessor
);

this.NamedProperties = function(NamedProperty, define, forEach){
	/**
	 * 属性集合类，一般用于特殊名称的对象属性声明
	 */
	function NamedProperties(){
		this.add.apply(this, arguments);
	};
	NamedProperties = new Class(NamedProperties);
	
	NamedProperties.props({
		/**
		 * 添加属性
		 */
		add : function(){
			// 遍历参数
			forEach(
				arguments,
				function(obj){
					// 如果是特殊的属性，如：计算式属性，计算式访问器等转换而来
					if(
						obj instanceof NamedProperty
					){
						define(this, obj.name, obj.value, obj.descriptor);
						return;
					}
	
					defineProperties(this, obj, { enumerable : true });
				},
				this
			);
			
			return this;
		},
		/**
		 * 移除指定名称的属性
		 * @param {String} name - 指定的名称
		 */
		remove : function(name){
			delete this[name];
			return this;
		}
	});
	
	return NamedProperties;
}(
	this.NamedProperty,
	Rexjs.define,
	Rexjs.forEach
);

}.call(
	this
));


// 语法标签相关
(function(){

this.EndingType = function(){
	/**
	 * 标签结束符类型
	 * @param {String} name - 类型名称
	 * @param {Number} value - 类型值
	 */
	function EndingType(name, value){};
	EndingType = new Class(EndingType, EnumItem);
	
	return EndingType;
}();

this.EndingTypes = function(EndingType){
	return new Enum(
		new EndingType("None", 1),
		new EndingType("Clause", 2),
		new EndingType("Statement", 6),
		new EndingType("Group", 14)
	);
}(
	this.EndingType
);

this.SyntaxTag = function(NamedItem, EndingTypes){
	/**
	 * 语法标签，供于语法树匹配
	 * @param {String} name - 标签名称，可重复，将会定义为作用域标签（如：开始标签、结束标签）
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {EndingTypes} _endingType - 该参数表示指定标签是否为子句或表达式的结束符号
	 */
	function SyntaxTag(name, regexp, _id, _endingType){
		this.assign({
			endingType : _endingType,
			id : _id || name,
			regexp : regexp
		});
	};
	SyntaxTag = new Class(SyntaxTag, NamedItem);

	SyntaxTag.props({
		endingType : EndingTypes.None,
		id : "",
		/**
		 * 表示该标签将被忽略，被语法树解析为普通文本，也不会触发对应事件
		 */
		ignore : function(){
			this.ignored = true;
			return this;
		},
		ignored : false,
		regexp : /[^\S\s]/g,
		/**
		 * 取消忽略，使标签恢复正常
		 */
		unignore : function(){
			this.ignored = false;
			return this;
		}
	});

	return SyntaxTag;
}(
	this.NamedItem,
	this.EndingTypes
);

this.TextTag = function(SyntaxTag){
	/**
	 * 语法文本标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {EndingTypes} _endingType - 该参数表示指定标签是否为子句或表达式的结束符号
	 */
	function TextTag(name, regexp, _id, _endingType){};
	TextTag = new Class(TextTag, SyntaxTag);

	return TextTag;
}(
	this.SyntaxTag
);

this.MultipleTag = function(SyntaxTag){
	/**
	 * 多样的标签，即同个正则匹配多种值，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {EndingTypes} _endingType - 该参数表示指定标签是否为子句或表达式的结束符号
	 */
	function MultipleTag(name, regexp, _id, _endingType){};
	MultipleTag = new Class(MultipleTag, SyntaxTag);

	return MultipleTag;
}(
	this.SyntaxTag
);

this.OperatorTag = function(MultipleTag){
	/**
	 * 运算符标签（如：加减乘除等等），供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {EndingTypes} _endingType - 该参数表示指定标签是否为子句或表达式的结束符号
	 */
	function OperatorTag(name, regexp, _id, _endingType){};
	OperatorTag = new Class(OperatorTag, MultipleTag);

	return OperatorTag;
}(
	this.MultipleTag
);

this.DoubleOperatorTag = function(OperatorTag){
	/**
	 * 双操作符标签（如：递增、递减等等），供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {EndingTypes} _endingType - 该参数表示指定标签是否为子句或表达式的结束符号
	 */
	function DoubleOperatorTag(name, regexp, _id, _endingType){};
	DoubleOperatorTag = new Class(DoubleOperatorTag, OperatorTag);

	return DoubleOperatorTag;
}(
	this.OperatorTag
);

this.KeywordTag = function(SyntaxTag){
	/**
	 * 关键字标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function KeywordTag(name, regexp, _id){};
	KeywordTag = new Class(KeywordTag, SyntaxTag);

	return KeywordTag;
}(
	this.SyntaxTag
);

this.DeclarationTag = function(KeywordTag){
	/**
	 * 申明标签（var、let、const），供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function DeclarationTag(name, regexp, _id){};
	DeclarationTag = new Class(DeclarationTag, KeywordTag);

	return DeclarationTag;
}(
	this.KeywordTag
);

this.ExpressionTag = function(KeywordTag){
	/**
	 * 表达式标签（如：function、class等），供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function ExpressionTag(name, regexp, _id){};
	ExpressionTag = new Class(ExpressionTag, KeywordTag);

	return ExpressionTag;
}(
	this.KeywordTag
);

this.GroupingTag = function(SyntaxTag){
	/**
	 * 分组标签（如：大中小括号），供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function GroupingTag(name, regexp, _id){};
	GroupingTag = new Class(GroupingTag, SyntaxTag);

	return GroupingTag;
}(
	this.SyntaxTag
);

this.OpeningingTag = function(GroupingTag){
	/**
	 * 起始标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {String} _closingTagId - 如果提供该参数，则当溢出时会自动创建及关闭标签节点，并触该参数事件
	 */
	function OpeningingTag(name, regexp, _id, _closingTagId){
		if(
			!_closingTagId
		){
			return;
		}
		
		this.assign({
			auto : true,
			closingTagId : _closingTagId
		});
	};
	OpeningingTag = new Class(OpeningingTag, GroupingTag);
	
	OpeningingTag.props({
		auto : false,
		closingTagId : ""
	});

	return OpeningingTag;
}(
	this.GroupingTag
);

this.ClosingTag = function(GroupingTag, EndingTypes){
	/**
	 * 结束标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function ClosingTag(name, regexp, _id){};
	ClosingTag = new Class(ClosingTag, GroupingTag);
	
	ClosingTag.override({
		endingType : EndingTypes.Group
	});

	return ClosingTag;
}(
	this.GroupingTag,
	this.EndingTypes
);

this.SyntaxTags = function(NamedItemMap, setNamedItem){
	/**
	 * 语法标签集合
	 */
	function SyntaxTags(){};
	SyntaxTags = new Class(SyntaxTags, NamedItemMap);
	
	SyntaxTags.override({
		/**
		 * 移除指定项
		 */
		removeNamedItem : function(){
			throw "语法标签集合中的项，一经设定，不得移除。";
			return this;
		},
		/**
		 * 根据标签 id ，添加语法标签
		 * @param {SyntaxTag} syntaxTag - 需要添加的语法标签
		 * @param {Number} _index - 在指定索引处插入标签
		 */
		setNamedItem : function(syntaxTag, _index){
			var id = syntaxTag.id;
			
			// 如果已经存在指定 id 的标签
			if(
				this.hasNamedItem(id)
			){
				// 报错
				throw "不应该添加重复的标签：" + id;
				// 返回 false
				return this;
			}
			
			// 记录标签
			this[syntaxTag.id] = syntaxTag;
			setNamedItem.apply(this, arguments);
			
			// 返回true
			return this;
		}
	});
	
	SyntaxTags.props({
		/**
		 * 表示指定 id 的标签将被忽略，被语法树解析为普通文本，也不会触发对应事件
		 * @param {String} id - 指定的标签 id
		 */
		ignore : function(id){
			this.getNamedItem(
					id
				)
				.ignore();
			
			return this;
		},
		/**
		 * 取消忽略指定id的标签，使标签将会被正常解析
		 * @param {String} id - 指定的标签 id
		 */
		unignore : function(id){
			this.getNamedItem(
					id
				)
				.unignore();
				
			return this;
		}
	});
	
	return SyntaxTags;
}(
	this.NamedItemMap,
	this.NamedItemMap.prototype.setNamedItem
);

}.call(
	this
));


// 语法辅助相关
(function(List, Node, DOUBLE_REGEXP, walker, breakCurrentNode){

this.SyntaxWalker = function(document, walking){
	/**
	 * 语法节点查询器
	 */
	function SyntaxWalker(){};
	SyntaxWalker = new StaticClass(SyntaxWalker);

	SyntaxWalker.static({
		/**
		 * 提取2个节点之间的所有节点（提取：移除后并添加到一个DocumentFragment对象内）
		 * @param {Node} first - 第一个节点
		 * @param {Node} second - 第二个节点
		 * @param {Node} _rootNode - 指定的根节点
		 * @param {Boolean} _includeFirst - 是否提取第1个节点
		 * @param {Boolean} _includeSecond - 是否连提取第2个节点
		 */
		extractNodesBetween : function(first, second, _rootNode, _includeFirst, _includeSecond){
			var parentNode;
			
			// 如果不存在
			if(
				!_rootNode
			){
				// 创建根节点
				_rootNode = document.createDocumentFragment();
			}
			
			parentNode = _rootNode;
			
			// 进行查询
			this.walk(
				first,
				second,
				function(node, containing){
					/*
						如果当前的元素包含target元素，说明只能该元素不能直接从文档中移除，因为target元素之后可能还有其他元素，
						如果移除了当前元素，则target之后的元素也会被移除，这就移除了一些不应该移除的元素，
						所以要克隆当前元素，并把指定父节点设置该克隆节点
					*/
					if(
						containing
					){
						node = node.cloneNode();
						parentNode.appendChild(node);

						parentNode = node;
						return;
					}
					
					parentNode.appendChild(node);
				},
				_includeFirst,
				_includeSecond
			);

			return _rootNode;
		},
		/**
		 * 获取2个节点之间的文本字符串
		 * @param {Node} first - 第一个节点
		 * @param {Node} second - 第二个节点
		 * @param {Boolean} _includeFirst - 是否提取第1个节点
		 * @param {Boolean} _includeSecond - 是否连提取第2个节点
		 */
		getTextBetween : function(first, second, _includeFirst, _includeSecond){
			var texts = [];

			this.walk(
				first,
				second,
				function(node, containing){
					// node节点包括目标target节点，则不添加该节点文本，因为该节点可能还包含target之后的其他节点
					if(
						containing
					){
						return;
					}
					
					// 添加文本内容
					texts.push(node.textContent);
				},
				_includeFirst,
				_includeSecond
			);
			
			return texts.join("");
		},
		/**
		 * 查询2个节点之间的其他节点，对此些节点，回调函数应将会对其做出处理
		 * @param {Node} first - 第一个节点
		 * @param {Node} second - 第二个节点
		 * @param {Function} callback - 回调函数
		 * @param {Boolean} _includeFirst - 是否提取第1个节点
		 * @param {Boolean} _includeSecond - 是否连提取第2个节点
		 */
		walk : function(first, second, callback, _includeFirst, _includeSecond){
			var position = first.compareDocumentPosition(second);
			
			switch(
				true
			){
				// 如果不在同一文档中
				case (position & Node.DOCUMENT_POSITION_DISCONNECTED) > 0 :
					return this;
				
				// 如果 first 和 second 是同一个元素
				case position === 0 :
					return this;
			}
			
			// 如果first不是second的子孙元素
			if(
				(position & Node.DOCUMENT_POSITION_CONTAINS) === 0
			){
				// 如果second在first前面
				if(
					(position & Node.DOCUMENT_POSITION_FOLLOWING) === 0
				){
					// first 与 second 互换
					first = second;
					second = arguments[0];
					// _includeFirst 与 _includeSecond 互换
					_includeFirst = _includeSecond;
					_includeSecond = arguments[3];
					// 重置position
					position = first.compareDocumentPosition(second);
				}
			}

			// 设置当前节点
			walker.currentNode = first;
			
			// 如果second不是first的子孙元素
			if(
				(position & Node.DOCUMENT_POSITION_CONTAINED_BY) === 0
			){
				// 如果不包括first
				if(
					!_includeFirst
				){
					breakCurrentNode(walker, second);
				}
			}
			
			// 开始查找符合要求的节点
			walking(second, callback);
			
			// 如果需要包含second元素的文本
			if(
				_includeSecond
			){
				callback(second, false, false);
			}

			return this;
		}
	});

	return SyntaxWalker;
}(
	document,
	// walking
	function(target, callback){
		var position, containing = false, currentNode = walker.currentNode;
		
		// 如果节点一直存在
		while(
			currentNode
		){
			position = currentNode.compareDocumentPosition(target);
			
			// 如果当前节点等于target，就说明查找完毕了
			if(
				position === 0
			){
				return;
			}
			
			// 如果当前节点都出现在target的文档流之后，则也说明查找完毕了
			if(
				(position & Node.DOCUMENT_POSITION_FOLLOWING) === 0
			){
				// 如果currentNode不是target的子孙元素
				if(
					(position & Node.DOCUMENT_POSITION_CONTAINS) === 0
				){
					return;
				}
			}
			
			// 如果当前节点包含目标节点，则为true，否则为false
			containing = !!(position & Node.DOCUMENT_POSITION_CONTAINED_BY);
			
			// 在这一步就要操作walker，因为担心callback里面会对currentNode做移除操作
			if(
				containing
			){
				// 重置currentNode
				walker.nextNode();
			}
			else {
				// 跳出当前节点至下一个兄弟节点
				breakCurrentNode(walker, target);
			}
			
			// 执行回调
			callback(currentNode, containing);
			
			// 设置currentNode
			currentNode = walker.currentNode;
		}
	}
);

this.SyntaxError = function(Array, getStringSize){
	/**
	 * 语法错误信息
	 * @param {String} code - 相关代码
	 * @param {Number} index - 出错处的索引
	 * @param {Number} offset - 错误起始处与当前索引的偏移量
	 * @param {String} description - 错误描述
	 */
	function SyntaxError(code, index, offset, description){
		var colNumber, sub = code.substring(0, index), lines = sub.split("\n"),
			
			lastWrap = sub.lastIndexOf("\n"), lineNumber = lines.length;
			
		// 只保留最后4行
		lines.splice(0, lines.length - 4);
		// 去除最后一行，因为最后一行代码不全
		lines.splice(lines.length - 1);
		// 添加当前行的后续3行，包括当前行就是4行
		lines.push
			.apply(
				lines,
				// 截取到下一个字符
				code.substring(
						lastWrap + 1
					)
					.split(
						"\n",
						4
					)
			);
		
		// 记录列数
		colNumber = getStringSize(
			code.substring(
				// 列数不包括换行符
				lastWrap + 1,
				index
			)
		);

		throw [
			description,
			"\t",
			"行：" + lineNumber + "，",
			"列：" + colNumber,
			"\n",
			// lines目前只包括 当前行的前三行 + 当前行 + 当前行的后三行，共7行
			lines.map(function(content, i){
				var mod, prefix = "", ln = lineNumber - 3, joinString = "|";
				
				// 如果行数小于1
				if(
					ln < 1
				){
					// 设置等于1
					ln = 1;
				}
				
				// 加上当前的索引数
				ln += i;
				
				// 取模
				mod = (ln.toString().length + joinString.length) % 4;
				
				// 如果模大于0
				if(
					mod > 0
				){
					// 加上缩进空白，保证代码的缩进正确
					prefix = "    ".substring(mod);
				}
				
				prefix += ln + joinString;

				// 返回结果
				return prefix + content + (
					ln === lineNumber ?
						"\n" + new Array(prefix.length + colNumber + 1).join(" ") + new Array((offset || 1) + 1).join("↑") :
						""
				);
			})
			.join("\n")
		]
		.join("");
	};
	SyntaxError = new Class(SyntaxError);

	return SyntaxError;
}(
	Array,
	// getStringSize
	function(str){
		var index;
		
		// 替换双字节字符
		str.replace(
			DOUBLE_REGEXP,
			function(s){
				return s + s;
			}
		);
		
		// 获取tab索引
		index = str.indexOf("\t");
		
		// 如果有tab
		while(
			index > -1
		){
			// 将tab替换成空格，1个标准tab等于4个空格，根据列数变化
			str = str.substring(0, index) + "    ".substring(index % 4) + str.substring(index + 1);
			index = str.indexOf("\t");
		}
		
		// 返回str长度
		return str.length;
	}
);

this.SyntaxRegExp = function(RegExp, substring){
	/**
	 * 语法正则表达式类，用于语法树匹配
	 */
	function SyntaxRegExp(){};
	SyntaxRegExp = new Class(SyntaxRegExp);
	
	SyntaxRegExp.props({
		/**
		 * 添加子正则
		 * @param {RegExp} regexp - 正则表达式
		 * @param {Boolean} _prior - 指示优先是否较高
		 */
		add : function(regexp, _prior){
			var s = "(?:" + regexp.source + ")()", source = this.source;
			
			switch(
				true
			){
				// 如果当前 source 是空的，说明是首次添加
				case source === "" :
					source = s;
					break;
				
				// 如果优先级较高
				case !!_prior :
					// 在已有的正则字符串之前添加新的子正则字符串表达式 
					source = s + "|" + source;
					break;
				
				// 默认
				default :
					// 往后面添加
					source += "|" + s;
					break;
			}
			
			// 记录
			this.source = source;
			return this;
		},
		/**
		 * 执行正则表达式进行匹配
		 * @param {String} codeString - 需要匹配的代码字符串
		 * @param {Function} regexpCallback - 正则表达式匹配出来的回调函数
		 * @param {Function} fragmentCallback - 子字符串回调函数，即两个正则匹配结果之间的字符串回调函数
		 */
		exec : function(code, regexpCallback, fragmentCallback, spaceCallback, boundThis){
			var regexp = new RegExp(this.source, "g"), length = code.length;
			
			// 初始化
			this.lastIndex = 0;

			// 当 length 大于 regexp.lastIndex 而且 匹配到了结果
			while(
				length > regexp.lastIndex
			){
				var result = regexp.exec(code);
			
				// 如果结果是 null，说明已经匹配结束了
				if(
					result === null
				){
					// 跳出循环
					break;
				}
				
				var str = result[0];
				
				// 子字符串处理
				substring(
					this,
					code.substring(this.lastIndex, result.index),
					fragmentCallback,
					spaceCallback,
					boundThis
				);
				
				// 执行正则表达式匹配的回调函数
				if(
					regexpCallback.call(boundThis, str, result.lastIndexOf("") - 1)
				){
					this.lastIndex += str.length;
					continue;
				}
				
				// 当做子字符串处理
				substring(this, str, fragmentCallback, spaceCallback, boundThis);
			}
			
			// 如果 length 大于 this.lastIndex，说明尾部还有一些未处理的代码
			if(
				length > this.lastIndex
			){
				// 剩余子字符串处理
				substring(
					this,
					code.substring(this.lastIndex),
					fragmentCallback,
					spaceCallback,
					boundThis
				);
			}
			
			return this;
		},
		lastIndex : 0,
		source : ""
	});
	
	return SyntaxRegExp;
}(
	RegExp,
	// substring
	function(regexp, substr, fragmentCallback, spaceCallback, boundThis){
		var s, length = substr.length;
		
		switch(
			true
		){
			// 如果长度等于 0
			case length === 0 :
				return;
			
			// 如果去除空白字符后为空字符串，则说明，全是空白字符串
			case (s = substr.trim()) === "" :
				// 执行空白回调函数
				spaceCallback.call(boundThis, substr);
				break;
			
			// 如果长度相等，则说明，两端没有空白字符
			case length === s.length :
				// 执行片段回调函数
				fragmentCallback.call(boundThis, substr);
				break;
			
			// 默认，两端可能有空白字符
			default :
				substr
					.split(s)
					.forEach(function(space, i){
						if(
							i === 1
						){
							// 执行片段回调函数
							fragmentCallback.call(boundThis, s);
							// 计算 lastIndex
							regexp.lastIndex += s.length;
						}
						
						// 如果长度为 0
						if(
							space.length === 0
						){
							// 返回
							return;
						}
						
						// 执行空白回调函数
						spaceCallback.call(boundThis, space);
						// 计算 lastIndex
						regexp.lastIndex += space.length;
					});

				return;
		}
		
		// 计算 lastIndex
		regexp.lastIndex += substr.length;
	}
);

this.PlainText = function(indexOf){
	/**
	 * 纯文本语法类，用于告知语法树是否启用或禁用纯文本模式
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function PlainText(syntaxTree){
		this.assign(
			{ syntaxTree : syntaxTree }
		);
	};
	PlainText = new Class(PlainText, List);
	
	PlainText.override({
		/**
		 * 跳转到指定名称的条件
		 * @param {String} name - 指定的名称
		 */
		indexOf : function(name){
			var syntaxTree = this.syntaxTree;
			
			// 触发 indexedPlainText 事件
			syntaxTree.dispatch(
				"indexedPlainText",
				syntaxTree.parentNode,
				syntaxTree.index
			);
			
			// condition 不存在
			if(
				indexOf.call(this, name) === -1
			){
				// 返回 disabled，这里不能直接返回 false，因为 indexedPlainText 事件的监听器可能会调用 disable。
				return this.disabled;
			}
			
			// 返回true
			return true;
		}
	});
	
	PlainText.props({
		/**
		 * 禁用纯文本模式
		 */
		disable : function(){
			this.clear();
			
			this.disabled = true;
			return this;
		},
		disabled : true,
		/**
		 * 开启纯文本模式，即暂停语法树其他元素的创建，并且当指定的元素标签名称出现时才会创建其对应元素，否则其他都将创建 fragment 元素
		 * @param {String} _rest - 指定的条件标签名称
		 */
		enable : function(_rest){
			// 清空 conditions
			this.clear();
				
			this.push
				.apply(
					this,
					arguments
				);
			
			// 表示开启纯文本模式
			this.disabled = false;
			return this;
		},
		syntaxTree : null
	});
	
	return PlainText;
}(
	List.prototype.indexOf
);

}.call(
	this,
	this.List,
	Node,
	// DOUBLE_REGEXP
	/[^\x00-\xff]+/g,
	// walker
	document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false),
	// breakCurrentNode
	function(walker, target){
		var currentNode = walker.currentNode, nextSibling = currentNode.nextSibling;
		
		// 如果下一个兄弟节点存在
		if(
			nextSibling
		){
			// 直接设置当前元素为该兄弟节点
			walker.currentNode = nextSibling;
			return;
		}
		
		var childNodes = currentNode.childNodes;
		
		// 如果有子节点
		while(
			childNodes.length > 0
		){
			// 设置当前节点为最后一个子节点
			currentNode = childNodes[childNodes.length - 1];
			// 设置子节点为当前节点的子节点
			childNodes = currentNode.childNodes;
		}
		
		// 设置当前节点
		walker.currentNode = currentNode;
		// 查找下一个节点，下一个节点必定会跳出当前节点，因为已经找不到子节点
		walker.nextNode();
		
		// 如果相等，也说明 currentNode 后面没有节点了
		if(
			walker.currentNode === currentNode
		){
			// 设置为目标节点
			walker.currentNode = target;
		}
	}
));

// 语法树相关
(function(Array, EndingTypes, document, supportRepeat){
	
this.EventMaps = function(set, del){
	/**
	 * 监听器数据映射
	 */
	function EventMaps(){
		this.assign({
			blacklist : [],
			indexMap : {},
			idMap : {},
			nameMap : {}
		});
	};
	EventMaps = new Class(EventMaps);
	
	EventMaps.props({
		blacklist : null,
		count : 0,
		/**
		 * 移除指定 id 的监听器数据
		 * @param {Number} id - 指定的 id
		 */
		delete : function(id){
			var idMap = this.idMap, data = idMap[id];

			switch(
				true
			){
				// 如果不存在指定 id
				case data === void 0 :
					return false;
				
				// 如果已经被锁定
				case this.count > 0 :
					// 将数据设置为不可用
					data.disabled = true;
					// 添加到黑名单
					this.blacklist
						.push(
							id
						);
					return true;
			}

			// 从 nameMap 从删除记录
			del(this.nameMap, data.name, id);
			// 从 indexMap 中删除记录
			del(this.indexMap, data.parentIndex, id);

			// 删除存储器里的关联数据
			delete idMap[id];
			return true;
		},
		/**
		 * 移除所有在指定索引范围内的监听器数据。如：index1 = 2，index2 = 6，则会去除把比2更大比6更小的3、4、5的监听器移除
		 * @param {Number} index1 - 较小的索引
		 * @param {Number} index2 - 较大的索引
		 */
		deleteBetween : function(index1, index2){
			var indexMap = this.indexMap;
			
			// 去除所有索引比 index1 大 且比 index2 小的监听器
			for(
				var i = index1 + 1, j = index2 + 1;i < j;i++
			){
				var ids = indexMap[i];
	
				// 如果 id 不存在
				if(
					ids === void 0
				){
					continue;
				}
				
				// 直接删除记录，防止在 delete 中删除，会导致下面的 forEach 混乱
				delete indexMap[i];

				// 去除监听
				ids.forEach(this.delete, this);
			}
			
			return true;
		},
		id : 0,
		idMap : null,
		indexMap : null,
		/**
		 * 锁定数据，锁定后，数据不会被删除，并被添加到黑名单中
		 */
		lock : function(){
			this.count++;
			return this;
		},
		nameMap : null,
		/**
		 * 设置监听器数据
		 * @param {String} name - 监听器名称
		 * @param {Function} listener - 监听器回调函数
		 * @param {Number} index - 监听器索引值
		 * @param {Number} parentIndex - 监听器父索引值
		 * @param {Boolean} one - 是否只执行一次
		 */
		set : function(name, listener, index, parentIndex, one){
			var id = ++this.id;
			
			// 在 nameMap 中设置 id
			set(this.nameMap, name, id);
			// 在 indexMap 中设置 id
			set(this.indexMap, parentIndex, id);

			// 将数据放在存储器里，确保一对一关系
			this.idMap[id] = {
				disabled : false,
				index : index,
				listener : listener,
				name : name,
				one : one,
				parentIndex : parentIndex
			};
			
			return id;
		},
		/**
		 * 解除数据锁定，并将黑名单里的数据删除
		 */
		unlock : function(){
			// 如果等于 0
			if(
				--this.count === 0
			){
				this.blacklist
					// 清空黑名单
					.splice(
						0
					)
					// 删除数据
					.forEach(
						this.delete,
						this
					);
			}
			
			return this;
		}
	});
	
	return EventMaps;
}(
	// set
	function(obj, key, val){
		var arr = obj[key];
		
		// 如果 key 已存在
		if(
			arr instanceof Array
		){
			// 在已有堆栈上添加一个
			obj[key].push(val);
			return;
		}
		
		// 设置为新的数组
		obj[key] = [val];
	},
	// del
	function(obj, key, val){
		var arr = obj[key];
		
		// 如果不是数组，说明不存在 或 为原生属性
		if(
			arr instanceof Array === false
		){
			return;
		}
		
		var index = arr.indexOf(val);

		// 去除此 val
		arr.splice(index, 1);

		// 如果 arr 不为空
		if(
			arr.length > 0
		){
			return;
		}
		
		// 删除记录
		delete obj[key];
	}
); 
	
this.SyntaxEventTarget = function(EventMaps, getIndex, getParentIndex){
	/**
	 * 语法标签监听器，用于触发特定的回调函数，伪DOM事件
	 */
	function SyntaxEventTarget(){
		this.assign(
			{ maps : new EventMaps()	}
		);
	};
	SyntaxEventTarget = new Class(SyntaxEventTarget);

	SyntaxEventTarget.props({
		/**
		 * 将事件 event1 委托给 event2，当 event2 被触发时，event1 也将会被触发
		 * @param {String} event1 - 事件名称
		 * @param {String} event2 - 事件名称
		 * @param {Number} _index - 索引值
		 * @param {Boolean} _one - 是否只委托一次
		 */
		delegate : function(event1, event2, _index, _one){
			this[
				_one ? "one" : "listen"
			](
				event2,
				function(element, index){
					this.dispatch(event1, element, index);
				},
				_index
			);
			
			return this;
		},
		/**
		 * 触发指定条件下对应名称的回调函数
		 * @param {String} name - 指定的监听器名称
		 * @param {Node} node - 相关的节点
		 * @param {Number} index - 指定的索引数，表明需要触发该索引级别所指定的监听器
		 */
		dispatch : function(name, node, index){
			var max, maps = this.maps, ids = maps.nameMap[name];
			
			switch(
				true
			){
				// 如果 ids 不存在
				case ids === void 0 :
					// 返回
					return this;
				
				// 如果 max 等于 -1
				case (max = ids.length - 1) === -1 :
					return this;
			}
			
			var next, prevent, syntaxEventTarget = this;
			
			// prevent 方法
			prevent = function(){
				max = -1;
			};
			
			// next方法
			next = function(){
				var id = ids[max--], data = maps.idMap[id], i = data.index;
				
				switch(
					true
				){
					case data.disabled :
						break;
						
					case i === 0 || i === index :
						data.one && maps.delete(id);
						
						// 调用监听器
						data.listener
							.call(
								syntaxEventTarget,
								node,
								index,
								next,
								prevent
							);
						break;
				}
				
				// 如果 max 等于 -1
				if(
					max === -1
				){
					return;
				}
				
				// 继续执行下一个
				next();
			};

			maps.lock();
			// 执行 next 函数
			next();
			maps.unlock();
			return this;
		},
		index : 0,
		/**
		 * 监听指定名称的事件，为其分配回调函数
		 * @param {String} name - 指定的监听器名称
		 * @param {Function} listener - 需要监听的回调函数
		 * @param {Number} _index - 指定的索引数，表明需要触发该索引级别所指定的监听器
		 * @param {Number} _parentIndex - 指定的父索引数，用于判断该何时去除此监听
		 */
		listen : function(name, listener, _index, _parentIndex){
			// 获取 index
			_index = getIndex(_index);

			// 返回 id，是 unlisten 的唯一参数
			return this
				.maps
				.set(
					name,
					listener,
					_index,
					getParentIndex(this.index, _index, _parentIndex),
					false
				);
		},
		maps : null,
		/**
		 * 监听指定名称的事件，为其分配回调函数，但，仅一次有效
		 * @param {String} name - 指定的监听器名称
		 * @param {Function} listener - 需要监听的回调函数
		 * @param {Number} _index - 指定的索引数，表明需要触发该索引级别所指定的监听器
		 * @param {Number} _parentIndex - 指定的父索引数，用于判断该何时去除此监听
		 */
		one : function(name, listener, _index, _parentIndex){
			// 获取 index
			_index = getIndex(_index);
			
			// 返回 id，是 unlisten 的唯一参数
			return this
				.maps
				.set(
					name,
					listener,
					_index,
					getParentIndex(this.index, _index, _parentIndex),
					true
				);
		},
		/**
		 * 设置索引数
		 * @param {Number} index - 指定的索引数
		 */
		setIndex : function(index){
			var currentIndex = this.index;
			
			// 如果记录的 index 比 index 还要大，就说明已经跳出“作用域”
			if(
				currentIndex > index
			){
				// 去除所有子监听器
				this.maps
					.deleteBetween(
						index,
						currentIndex
					);
			}
			
			this.index = index;
			return this;
		},
		/**
		 * 去除监听器
		 * @param {Number} id - 需要去除的监听器的唯一标识
		 */
		unlisten : function(id){
			return this.maps.delete(id);
		}
	});

	return SyntaxEventTarget;
}(
	this.EventMaps,
	// getIndex
	function(_index){
		return _index || 0;
	},
	// getParentIndex
	function(currentIndex, index, _parentIndex){
		switch(
			true
		){
			// 如果没有提供 _parentIndex
			case _parentIndex === void 0 :
				// 设置为当前索引
				_parentIndex = index < currentIndex ? index : currentIndex;
				break;
			
			// 如果 _parentIndex 小于 0
			case _parentIndex < 0 :
				// 设置为 0
				_parentIndex = 0;
				break;
		}
		
		return _parentIndex;
	}
);

this.SyntaxNode = function(SyntaxEventTarget, SyntaxError, SyntaxRegExp, SyntaxTags, createText, endingType){
	/**
	 * 语法节点
	 * @param {String} code - 需要提供的语法代码
	 */
	function SyntaxNode(code){
		this.assign({
			code : code,
			regexp : new SyntaxRegExp(),
			stack : [],
			tags : new SyntaxTags()
		});
	};
	SyntaxNode = new Class(SyntaxNode, SyntaxEventTarget);
	
	SyntaxNode.static(
		{ createText : createText }
	);
	
	SyntaxNode.props({
		/**
		 * 添加语法标签
		 * @param {SyntaxTag} syntaxTag - 需要添加的语法标签
		 * @param {Boolean} _prior - 优先级是否较高
		 */
		add : function(syntaxTag, _prior){
			// 添加标签
			this.tags
				.setNamedItem(
					syntaxTag,
					_prior ? 0 : null
				);
			
			// 添加正则
			this.regexp
				.add(
					syntaxTag.regexp,
					_prior
				);

			return this;
		},
		/**
		 * 添加指定节点到当前的父节点之下，并可触发指定事件
		 * @param {Node} node - 指定的节点
		 * @param {String} _eventName - 事件名称
		 * @param {Node} _eventTarget - 指定的触发节点
		 * @param {EndingTypes} _endingType - 该参数表示指定节点是否为子句或表达式的结束标识
		 */
		appendChild : function(node, _eventName, _eventTarget, _endingType){
			var callback;
			
			// 在 node 上记录 codeIndex
			node.codeIndex = this.regexp.lastIndex;
			// 在 node 上记录 codeContent
			node.codeContent = node.textContent;
			
			// 如果事件触发节点
			_eventTarget = _eventTarget || node;
			// 获取重置父节点函数
			callback = endingType(this, _eventTarget, _endingType || EndingTypes.None);
			
			// 添加到当前指定的父节点
			this.parentNode
				.appendChild(
					node
				);
			
			// 如果事件名存在，立即触发事件
			_eventName && this.dispatch(_eventName, _eventTarget, this.index);
			// 如果 callback 存在，则立即执行
			callback && callback();

			// 返回节点
			return node;
		},
		/**
		 * 添加文本节点到当前的父节点之下
		 * @param {String} textContent - 文本内容
		 * @param {String} _eventName - 事件名称
		 * @param {Node} _eventTarget - 指定的触发节点
		 * @param {EndingTypes} _endingType - 该参数表示指定节点是否为子句或表达式的结束标识
		 */
		appendText : function(textContent, _eventName, _eventTarget, _endingType){
			// 添加节点
			return this.appendChild(
				createText(textContent),
				_eventName,
				_eventTarget,
				_endingType
			);
		},
		code : "",
		/**
		 * 往下进入子节点，意味着新语句的开始，并将指定节点设置为当前的父节点
		 * @param {Node} node - 指定的节点
		 */
		down : function(node){
			var parentNode = this.parentNode;
		
			switch(
				true
			){
				// 如果父节点不存在
				case parentNode === null :
					break;
				
				// 如果相等，则说明是两个紧邻的父子节点
				case node.parentNode === parentNode :
					break;
				
				// 默认
				default :
					return this;
			}
			
			var stack = this.stack;
			
			// 添加堆栈
			stack.push(node);
			// 设置 index
			this.setIndex(stack.length);
			
			// 设置父节点
			this.parentNode = node;
			return this;
		},
		/**
		 * 抛出错误
		 * @param {Node} node - 指定的代码节点
		 * @param {String} description - 错误描述
		 */
		error : function(node, description){
			new SyntaxError(this.code, node.codeIndex || 0, (node.codeContent || "").length, description);
			return this;
		},
		parentNode : null,
		regexp : null,
		stack : null,
		tags : null,
		/**
		 * 往上进入节点，即意味着当前语句的结束
		 */
		up : function(){
			var index = this.index, stack = this.stack, parentNode = this.parentNode;
			
			// 触发 beforeClauseEnding 事件，表示整个子语句已经结束
			this.dispatch("beforeClauseEnding", parentNode, index);
			// 还要触发 beforeEnding 事件，表示整个语句已经结束
			this.dispatch("beforeEnding", parentNode, index);
			
			// 设置 index
			index = stack.length - 1;
			
			// 从堆栈中去除当前父节点
			stack.splice(index);
			// 设置语法索引
			this.setIndex(index);
			
			// 设置父节点
			this.parentNode = index === 0 ? null : stack[index - 1];
			return this;
		}
	});
	
	return SyntaxNode;
}(
	this.SyntaxEventTarget,
	this.SyntaxError,
	this.SyntaxRegExp,
	this.SyntaxTags,
	// createText
	function(textContent){
		return document.createTextNode(textContent);
	},
	// endingType
	function(syntaxNode, eventTarget, endingType){
		var endingTypeValue = endingType.valueOf(), clauseValue = EndingTypes.Clause.valueOf();
		
		switch(
			true
		){
			// 如果不是子句类型的结束标识
			case (endingTypeValue & clauseValue) === 0 :
				return null;
			
			// 如果仅仅只是子句类型的结束标识
			case (endingTypeValue & EndingTypes.Statement.valueOf()) === clauseValue :
				// 触发 beforeClauseEnding 事件，表示子句将结束
				syntaxNode.dispatch("beforeClauseEnding", eventTarget, syntaxNode.index);
				return null;
		}

		var parentNode = syntaxNode.parentNode, groupValue = EndingTypes.Group.valueOf();
		
		// 如果是组结束标签
		if(
			(endingTypeValue & groupValue) === groupValue
		){
			// 返回此回调函数
			return function(){
				syntaxNode.up();
			};
		}
		
		// 设置父节点
		syntaxNode.up();
		
		// 返回此回调函数
		return function(){
			// 再次设置父节点
			syntaxNode.down(
				// 添加节点
				syntaxNode.appendChild(
					// 克隆节点
					parentNode.cloneNode()
				)
			);
		};
	}
);

this.SyntaxElement = function(SyntaxNode, createElement){
	/**
	 * 语法元素
	 * @param {String} code - 需要提供的语法代码
	 */
	function SyntaxElement(code){
		this.assign(
				{ global : createElement("global") }
			)
			.down(
				this.global
			)
			.appendStatement();
	};
	SyntaxElement = new Class(SyntaxElement, SyntaxNode);
	
	SyntaxElement.static({
		createElement : createElement,
		/**
		 * 创建运算符元素
		 * @param {String} value - 运算符的 value 属性值
		 */
		createOperatorElement : function(value){
			var operatorElement = createElement("operator");
			
			// 设置属性
			operatorElement.setAttribute("value", value);
			
			// 设置文本内容
			operatorElement.textContent = value;
			return operatorElement;
		}
	});
	
	SyntaxElement.props({
		/**
		 * 添加关闭（结束）标签元素到父节点之下
		 * @param {String} tagName - 标签名
		 * @param {String} textContent - 文本内容
		 * @param {String} _eventName - 需要触发的事件
		 */
		appendClosing : function(tagName, textContent, _eventName){
			var element;
			
			// 跳出当前子语句
			this.up();
			
			element = this.parentNode;
			
			switch(
				true
			){
				// 如果元素不存在
				case element === null :
					break;
				
				// 如果标签不符合
				case element.tagName !== tagName :
					break;
				
				// 默认
				default :
					// 添加 end 元素
					this.appendElement("end", textContent, _eventName, element, EndingTypes.Group);
					return element;
			}
			
			this.error(element, "未正确闭合的标记。");
			return null;
		},
		/**
		 * 添加元素到父节点之下
		 * @param {String} tagName - 标签名
		 * @param {String} textContent - 文本内容
		 * @param {String} _eventName - 需要触发的事件
		 * @param {Node} _eventTarget - 指定的触发节点
		 * @param {EndingTypes} _endingType - 该参数表示指定节点是否为子句或表达式的结束符号
		 * @param {Boolean} _multiple - 该参数表示指定节点是否为子句或表达式的结束符号，如分号、逗号等
		 */
		appendElement : function(tagName, _textContent, _eventName, _eventTarget, _endingType, _multiple){
			var element = createElement(tagName, _textContent);
			
			// 如果可能会匹配多种情况，如：运算符等
			if(
				_multiple
			){
				// 则要给元素设置直观的 value 属性
				element.setAttribute("value", _textContent);
			}
			
			// 添加元素
			this.appendChild(element, _eventName, _eventTarget, _endingType);
			
			return element;
		},
		/**
		 * 添加片段元素到当前的父节点之下
		 * @param {String} textContent - 文本内容
		 */
		appendFragment : function(textContent){
			return this.appendElement("fragment", textContent);
		},
		/**
		 * 添加起始元素到父节点之下
		 * @param {String} tagName - 标签名
		 * @param {String} textContent - 文本内容
		 * @param {String} _eventName - 需要触发的事件
		 * @param {Boolean} _auto - 是否在未正确处理的情况下自动关闭
		 * @param {String} _closingTagId - 当标签自动关闭时，所对应的关闭标签 id
		 */
		appendOpening : function(tagName, textContent, _eventName, _auto, _closingTagId){
			var element = this.appendElement(tagName);

			// 如果是自动闭合标签
			if(
				_auto
			){
				// 设置auto属性
				element.setAttribute("auto", _closingTagId);
			}

			// 进入当前元素，即设置父元素
			this.down(element);
			// 添加 start 元素
			this.appendElement("start", textContent, _eventName, element);
			// 添加新语句
			this.appendStatement();
			
			// 返回元素
			return element;
		},
		/**
		 * 添加语句元素
		 */
		appendStatement : function(){
			var statementElement = this.appendElement("statement", "");
			
			this.down(statementElement);
			return statementElement;
		},
		/**
		 * 判断指定的元素是否满足闭合条件
		 * @param {String} tagName - 指定的元素标签 或 元素标签名称
		 * @param {Boolean} _throwError - 在不满足闭合情况下，是否报错
		 */
		closable : function(target, _throwError){
			var closingTagId, stack = this.stack, element = this.parentNode,
			
				index = stack.indexOf(element), isString = typeof target === "string";
			
			// 如果大于 -1
			while(
				index > -1
			){
				switch(
					true
				){
					// 如果目标一致，则说明配对成功
					case (isString ? element.tagName : element) === target :
						return true;
						
					// 如果元素是语句标签
					case element.tagName === "statement" :
						// 设置父节点，意为跳出该语句标签
						this.up();
						break;
					
					// 如果元素名称不一致，当该元素拥有自动关闭属性
					case (closingTagId = element.getAttribute("auto")) === null :
						index = -1;
						continue;
					
					// 默认
					default :
						// 添加关闭标签
						this.appendClosing(element.tagName, "", closingTagId);
						break;
				}
				
				// 获取父元素
				element = this.parentNode;
				// 设置索引
				index = stack.indexOf(element)
			}
			
			switch(
				true
			){
				// 如果大于 -1，则说明配对成功
				case index > -1 :
					return true;
				
				// 如果需要报错
				case !!_throwError :
					// 报错
					this.error(element, "未正确闭合的标记。");
					break;
			}
			
			return false;
		},
		global : null
	});
	
	return SyntaxElement;
}(
	this.SyntaxNode,
	// createElement
	function(tagName, _textContent){
		var element = document.createElementNS("rex", tagName);
		
		// 如果提供了文本内容
		if(
			_textContent
		){
			// 设置文本内容
			element.textContent = _textContent;
		}
		
		return element;
	}
);

this.SyntaxTree = function(SyntaxElement, PlainText, TextTag, MultipleTag, OpeningingTag, ClosingTag, COMMENT_REGEXP, current, repeat){
	/**
	 * 语法树，用于代码解析
	 * @param {String} code - 需要提供的语法代码
	 */
	function SyntaxTree(code){
		this.assign(
			{ plainText : new PlainText(this) }
		);
	};
	SyntaxTree = new Class(SyntaxTree, SyntaxElement);

	SyntaxTree.static({
		/**
		 * 获取当前实例
		 */
		get current(){
			return current;
		}
	});

	SyntaxTree.props({
		/**
		 * 创建语法树节点
		 */
		create : function(){
			var global = this.global, tags = this.tags, plainText = this.plainText;
			
			// 设置当前的语法树
			current = this;
			
			// 执行表达式
			this.regexp
				.exec(
					// 替换注释，因为注释的存在会影响匹配，如 ASI 机制
					this.code
						// 在这不要盲目的使用 exec，exec 在这种情况下还是比 replace 更慢
						.replace(
							COMMENT_REGEXP,
							function(str){
								var length = str.split("\n").length - 1;
								
								// 返回等量空格及将换行移至最前
								return repeat("\n", length) + repeat(" ", str.length - length);
							}
						),
					function(str, tagIndex){
						var tag = tags[tagIndex];
						
						switch(
							true
						){
							// 如果该标签已经被忽略
							case tag.ignored :
								return false;
							
							// 如果是纯文本模式，而且无法跳转到指定条件
							case !(
								plainText.disabled || plainText.indexOf(tag.name)
							) :
								return false;
		
							// 如果是文本标签
							case tag instanceof TextTag :
								this.appendText(str, tag.id, null, tag.endingType);
								break;
								
							// 如果是起始标签
							case tag instanceof OpeningingTag :
								this.appendOpening(tag.name, str, tag.id, tag.auto, tag.closingTagId);
								break;
							
							// 如果是结束标签
							case tag instanceof ClosingTag :
								this.appendClosing(tag.name, str, tag.id);
								break;
							
							// 默认
							default :
								this.appendElement(tag.name, str, tag.id, null, tag.endingType, tag instanceof MultipleTag);
								break;
						}
						
						return true;
					},
					this.appendFragment,
					this.appendText,
					this
				);
			
			// 检测未闭合的标记
			this.closable(global, true);
			
			// 清空 current
			current = null;
			// 返回树
			return global;
		},
		/**
		 * 关闭 rex 模式
		 */
		disableRexMode : function(){
			this.rexModeEnabled = false;
			return this;
		},
		/**
		 * 启用 rex 模式
		 */
		enableRexMode : function(){
			this.rexModeEnabled = true;
			return this;
		},
		plainText : null,
		rexModeEnabled : false
	});

	return SyntaxTree;
}(
	this.SyntaxElement,
	this.PlainText,
	this.TextTag,
	this.MultipleTag,
	this.OpeningingTag,
	this.ClosingTag,
	// COMMENT_REGEXP
	/\/\*[\S\s]*?\*\/|\/\/.*/g,
	// current
	null,
	// repeat
	function(str, length){
		return supportRepeat ? str.repeat(length) : new Array(length + 1).join(" ");
	}
);

}.call(
	this,
	Array,
	this.EndingTypes,
	document,
	// supportRepeat
	!!"".repeat
));


// 语法解析器基类相关
(function(){

this.ECMAScript6Parser = function(SyntaxWalker, SyntaxTree, OperatorTag, Element, querySelector){
	/**
	 * 解析器基类
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Parser(syntaxTree){
		this.assign(
			{ syntaxTree : syntaxTree }
		);
	};
	ECMAScript6Parser = new Class(ECMAScript6Parser);

	ECMAScript6Parser.static({
		deps : [],
		/**
		 * 提取2个节点之间的所有节点（提取：移除后并添加到一个 DocumentFragment 对象内）
		 * @param {Node} first - 第一个节点
		 * @param {Node} second - 第二个节点
		 * @param {Node} _rootNode - 指定的根节点
		 * @param {Boolean} _includeFirst - 是否提取第1个节点
		 * @param {Boolean} _includeSecond - 是否连提取第2个节点
		 */
		extractNodesBetween : function(first, second, _rootNode, _includeFirst, _includeSecond){
			return SyntaxWalker.extractNodesBetween.apply(SyntaxWalker, arguments);
		},
		/**
		 * 提取2个节点之间的文本内容
		 * @param {Node} first - 第一个节点
		 * @param {Node} second - 第二个节点
		 */
		extractTextBetween : function(first, second){
			///	<summary>
			///	提取2个节点之间的文本内容。
			///	</summary>
			///	<param name="first" type="Node">第一个节点。</param>
			///	<param name="second" type="Node">第二个节点。</param>
			return SyntaxWalker.extractNodesBetween.apply(SyntaxWalker, arguments).textContent;
		},
		/**
		 * 获取匹配组元素的 end 元素
		 * @param {Element} groupElement - 匹配组元素
		 * @param {Node} second - 第二个节点
		 */
		getEndElement : function(groupElement){
			var endElement = groupElement.lastElementChild;
			
			switch(
				true
			){
				// 如果不存在
				case endElement === null :
					break;
				
				// 如果是 end 元素
				case endElement.tagName === "end" :
					// 返回该元素
					return endElement;
			}
			
			// 返回 null
			return null;
		},
		/**
		 * 获取指定节点的上一个兄弟元素
		 * @param {Node} node - 指定的节点
		 */
		getPreviousElementSibling : function(node){
			// 如果是元素
			if(
				node instanceof Element
			){
				// 直接返回previousElementSibling
				return node.previousElementSibling;
			}
			
			var sibling = node.previousSibling;
			
			// 遍历兄弟节点
			while(
				sibling
			){
				// 如果兄弟节点是元素
				if(
					sibling instanceof Element
				){
					// 返回元素
					return sibling;
				}
				
				// 继续获取上一个兄弟节点
				sibling = sibling.previousSibling;
			}
			
			// 找不到，则返回null
			return null;
		},
		/**
		 * 获取当前表达式与上一个表达式的分隔符元素
		 * @param {Node} node - 所属当前表达式的第一个节点
		 */
		getSeparatorElement : function(node){
			var separatorElement = this.getPreviousElementSibling(node);

			// 如果元素存在
			while(
				separatorElement
			){
				// 如果是操作符
				if(
					this.isOperator(separatorElement)
				){
					break;
				}
				
				// 继续获取上一个兄弟元素
				separatorElement = separatorElement.previousElementSibling;
			}
		
			// 直接返回回调函数的返回值
			return separatorElement;
		}, 
		/**
		 * 获取匹配组元素的 start 元素
		 * @param {Element} groupElement - 匹配组元素
		 */
		getStartElement : function(groupElement){
			var startElement = groupElement.firstElementChild;
			
			switch(
				true
			){
				// 如果不存在
				case startElement === null :
					break;
				
				// 如果是 start 元素
				case startElement.tagName === "start" :
					// 返回该元素
					return startElement;
			}
			
			// 返回 null
			return null;
		},
		/**
		 * 获取2个节点之间的文本字符串
		 * @param {Node} first - 第一个节点
		 * @param {Node} second - 第二个节点
		 * @param {Boolean} _includeFirst - 是否将包含第1个节点
		 * @param {Boolean} _includeSecond - 是否将包含第2个节点
		 */
		getTextBetween : function(first, second, _includeFirst, _includeSecond){
			return SyntaxWalker.getTextBetween.apply(SyntaxWalker, arguments);
		},
		/**
		 * 判断指定字符串是否只包含空白字符串
		 * @param {String} textContent - 指定的字符串
		 */
		isEmpty : function(textContent){
			return textContent.trim() === "";
		},
		/**
		 * 判断2个节点之间的文本字符串是否是空的
		 * @param {Node} first - 第一个节点
		 * @param {Node} second - 第二个节点
		 */
		isEmptyBetween : function(first, second){
			// 返回是否为空的结果
			return this.isEmpty(
				// 获取两节点之间的文本
				this.getTextBetween(first, second)
			);
		},
		/**
		 * 判断指定元素是否为指定条件的运算符
		 * @param {Element} element - 指定的元素
		 * @param {String} _value - 指定的运算符的 value 属性值
		 */
		isOperator : function(element, _value){
			// 如果兄弟元素不是运算符
			if(
				!this.tagOf(element, OperatorTag)
			){
				return false;
			}
			
			// 返回判断结果
			return _value ? element.getAttribute("value") === _value : true;
		},
		/**
		 * 在第一个节点之前与第二个节点之后，添加保护性的小括号，用于保护解析后文本内容中的方法，防止 new 的错误调用
		 * @param {Node} first - 第一个节点
		 * @param {Node} second - 第二个节点
		 * @param {Node} node - 用于判断 withOperator 的节点
		 * @param {String} _firstContent - 需要重置第一个节点的文本内容
		 * @param {String} _secondContent - 需要重置第二个节点的文本内容
		 */
		protectMethod : function(first, second, node, _firstContent, _secondContent){
			var withNew = this.withOperator(node, "new");
			
			// 设置 first 节点的文本内容
			first.textContent = (withNew ? "(" : " ") + (_firstContent == null ? first.textContent : _firstContent);
			// 设置 second 节点文本内容
			second.textContent = (_secondContent == null ? second.textContent : _secondContent) + (withNew ? ")" : "");
			
			return this;
		},
		/**
		 * 查询指定元素第一个符合条件的元素
		 * @param {Element} element - 指定的元素
		 * @param {String} selector - 元素选择器
		 */
		querySelector : function(element, selector){
			return querySelector(element, selector, false);
		},
		/**
		 * 查询指定元素所有符合条件的节点
		 * @param {Element} element - 指定的元素
		 * @param {String} selector - 元素选择器
		 */
		querySelectorAll : function(element, selector){
			return querySelector(element, selector, true);
		},
		/**
		 * 设置匹配组 end 元素的文本内容
		 * @param {Element} groupElement - 匹配组元素
		 * @param {String} textContent - 需要设置的文本内容
		 */
		setEndContent : function(groupElement, textContent){
			this.getEndElement(
					groupElement
				)
				.textContent = textContent;
			
			return this;
		},
		/**
		 * 设置匹配组 start 元素的文本内容
		 * @param {Element} groupElement - 匹配组元素
		 * @param {String} textContent - 需要设置的文本内容
		 */
		setStartContent : function(groupElement, textContent){
			this.getStartElement(
					groupElement
				)
				.textContent = textContent;
			
			return this;
		},
		/**
		 * 判断元素是否属于指定的标签类型
		 * @param {Element} element - 指定的元素
		 * @param {SyntaxTag} SyntaxTag - 指定的类型标签
		 */
		tagOf : function(element, SyntaxTag){
			return SyntaxTree.current.tags[element.tagName] instanceof SyntaxTag;
		},
		/**
		 * 判断指定节点是否与指定条件的运算符一起存在
		 * @param {Node} node - 指定的节点
		 * @param {String} _value - 指定的运算符的 value 属性值
		 */
		withOperator : function(node, _value){
			// 如果不需要判断运算符的 value 属性
			if(
				!_value
			){
				var parentNode = node.parentNode;
				
				// 如果父元素是 statement 元素
				if(
					parentNode.tagName === "statement"
				){
					// 再次获取 parentNode
					parentNode = parentNode.parentNode;
				}
				
				// 如果父节点是小括号或中括号，则返回 true
				switch(
					parentNode.tagName
				){
					case "parenthesis" :
						return true;
	
					case "bracket" :
						return true;
				}
			}
			
			// 获取上一个元素
			var elementSibling = this.getPreviousElementSibling(node);

			// 如果元素不存在，返回 false，否则返回判断结果
			return elementSibling === null ? false : this.isOperator(elementSibling, _value);
		}
	});

	ECMAScript6Parser.props(
		{ syntaxTree : null }
	);

	return ECMAScript6Parser;
}(
	this.SyntaxWalker,
	this.SyntaxTree,
	this.OperatorTag,
	Element,
	// querySelector
	function(element, selector, isAll){
		var result, target = element;
		
		// 因为在IE11，下面使用 #id > * 或 .class > * 是无法查找子元素的
		element.setAttribute("rex", "");
		
		// 判断第一个有效字符
		switch(
			selector.trim()[0]
		){
			// 子元素查询
			case ">" :
				break;
			
			// 下一个紧邻兄弟元素查询
			case "+" :
				target = element.parentNode;
				break;
			
			// 兄弟元素查询
			case "~" :
				target = element.parentNode;
				break;
		}
		
		// 如果有多个子选择器
		if(
			selector.indexOf(",") > -1
		){
			// 给每个子选择器加上前缀
			selector = selector.split(",").join(",[rex] ");
		}
		
		// 查询符合条件的元素
		result = target["querySelector" + (isAll ? "All" : "")]("[rex] " + selector);

		// 移除rex属性
		element.removeAttribute("rex");
		return result;
	}
);

this.ECMAScript6ExceptionParser = function(ECMAScript6Parser){
	/**
	 * 异常解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ExceptionParser(syntaxTree){
		///	<summary>
		///	异常解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6ExceptionParser = new Class(ECMAScript6ExceptionParser, ECMAScript6Parser);
	
	ECMAScript6ExceptionParser.props({
		/**
		 * 捕获异常
		 * @param {String} name - 所需监听的事件名称
		 * @param {String} description - 捕获异常的描述
		 */
		catch : function(name, description){
			// 监听指定的事件名称
			return this
				.syntaxTree
				.listen(
					name,
					function(element){
						// 只要进入回调函数，则说明出现异常，报错
						this.error(element, description);
					}
				);
		}
	});
	
	return ECMAScript6ExceptionParser;
}(
	this.ECMAScript6Parser
);

}.call(
	this
));


// 包相关
(function(){

this.IPackage = new Interface(["contents"]);

this.Package = function(List, toArray){
	/**
	 * 一系列依赖语法树的类所组成的包
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function Package(syntaxTree){
		this.forEach(function(Content){
			new Content(syntaxTree);
		});
	};
	Package = new Class(Package, List);
	
	Package.static({
		/**
		 * 打包一系列依赖语法树的类
		 * @param {ECMAScript6Parser, Package, Array} content - 依赖语法树的类
		 */
		package : function(content){
			var prototype = this.prototype;
			
			switch(
				true
			){
				// 如果是数组
				case content instanceof Array :
					content.length > 0 && content.forEach(this.package, this);
					return this;
				
				// 如果已经存在
				case prototype.indexOf(content) > -1 :
					return this;
				
				// 如果也是一个 Package 类
				case content.prototype instanceof Package :
					this.package(
						toArray(content.prototype)
					);
					return this;
			}
			
			// 添加项
			prototype.push(content);
			// 添加依赖
			this.package(content.deps);
			return this;
		}
	});
	
	return Package;
}(
	this.List,
	Rexjs.toArray
);

}.call(
	this
));


// 一些基本的解析器
(function(ECMAScript6Parser, SyntaxTree, SyntaxTag, OperatorTag, OpeningingTag, ClosingTag, TextTag, DoubleOperatorTag, DeclarationTag, KeywordTag, EndingTypes){

this.ECMAScript6Expression = function(storage){
	/**
	 * 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Expression(syntaxTree){
		syntaxTree.listen(
			"expressionStart",
			function(element, index){
				var eid, bid, list = storage[index];
				
				// 如果列表不存在
				if(
					list === void 0
				){
					// 初始化一个新列表
					list = storage[index] = [];
				}
				
				// 添加索引与元素标签名称
				list.push(element);
				
				// 监听表达式结束事件
				eid = this.listen(
					"expressionEnd",
					function(e){
						// 如果不是同一个表达式
						if(
							e !== element
						){
							return;
						}
						
						// 取消对 expressionEnd 事件的拦截
						this.unlisten(eid);
						// 取消对 beforeEnding 事件的拦截
						this.unlisten(bid);
						
						// 删除记录
						list.splice(
							list.indexOf(element),
							1
						);
						
						// 如果已经清空
						if(
							list.length === 0
						){
							// 彻底删除
							delete storage[index];
						}
					},
					index
				);
				
				// 监听 beforeEnding 事件
				bid = this.listen(
					"beforeEnding",
					function(e, i){
						// 如果大于或等于
						if(
							i >= index
						){
							// 返回
							return;
						}
						
						// 取消对 expressionEnd 事件的拦截
						this.unlisten(eid);
						// 取消对 beforeEnding 事件的拦截
						this.unlisten(bid);
						// 如果进入该函数，则说明 expressionEnd 没有被调用
						this.error(element, "未结束的表达式。");
					}
				);
			}
		);
	};
	ECMAScript6Expression = new Class(ECMAScript6Expression, ECMAScript6Parser);
	
	ECMAScript6Expression.static({
		/**
		 * 判断是否处于指定索引级别的表达式内
		 * @param {String} name - 表达式名称：如果该参数不为 null，将会判断是否为指定标签所触发的表达式
		 * @param {Number} index - 指定的索引
		 */
		in : function(name, index){
			// 如果标签名称存在
			if(
				name === null
			){
				// 返回判断结果
				return storage.hasOwnProperty(index);
			}
			
			// 返回获取结果
			return this.get(name, index) !== null;
		},
		/**
		 * 获取表达式所关联的元素
		 * @param {String} name - 表达式名称
		 * @param {Number} index - 指定的索引
		 */
		get : function(name, index){
			var element = null;
			
			// 如果存在
			if(
				this.in(null, index)
			){
				// 遍历数组
				storage[
					index
				]
				.every(function(el){
					// 如果名称相同
					if(
						name === (el.getAttribute("expression") || el.tagName)
					){
						// 记录
						element = el;
						// 不再继续遍历，返回 false
						return false;
					}
					
					// 继续遍历
					return true;
				});
			}
			
			// 返回 element
			return element;
		}
	});
	
	return ECMAScript6Expression;
}(
	// storage
	{}
);

this.ECMAScript6ASI = function(ECMAScript6Expression, EndingTypes, WRAP_REGEXP, withPostfixDoubleOperator, lint, initSemicolon){
	/**
	 * 自动分号插入机制
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ASI(syntaxTree){
		syntaxTree
			.add(
				new TextTag(
					"wrap",
					WRAP_REGEXP
				)
			)
			// 监听换行
			.listen(
				"wrap",
				function(textNode, index){
					switch(
						true
					){
						// 如果在任何表达式内
						case ECMAScript6Expression.in(null, index) :
							// 返回不再继续
							return;
						
						// 如果与运算符在一起
						case ECMAScript6Parser.withOperator(textNode) :
							// 如果与后置的双操作符在一起
							if(
								withPostfixDoubleOperator(textNode)
							){
								// 跳出判断语句，去添加分号
								break;
							}
							else {
								// 返回不再继续
								return;
							}
						
						// 校验上下文，如果中有能力提供连接上下文性质的元素
						case lint(textNode, this) :
							// 返回不再继续
							return;
					}
					
					// 利用当前父节点移除该文本节点
					textNode
						.parentNode
						.removeChild(
							textNode
						);
					
					// 添加分号，此操作会改变父节点
					this.appendChild(
						initSemicolon(),
						"semicolon",
						null,
						EndingTypes.Statement
					);
					
					// 在新的父节点下添加该文本节点
					this.appendChild(textNode);
				}
			);
	};
	ECMAScript6ASI = new Class(ECMAScript6ASI, ECMAScript6Parser);
	
	return ECMAScript6ASI;
}(
	this.ECMAScript6Expression,
	this.EndingTypes,
	// WRAP_REGEXP
	/(?:\s*\n\s*(?![\s;+\-/*|&!~`^%?:=,.<>()\[\]]))|$/,
	// withPostfixDoubleOperator
	function(textNode){
		var elementSibling = ECMAScript6Parser.getPreviousElementSibling(textNode);
		
		switch(
			true
		){
			// 如果元素不存在
			case elementSibling === null :
				return false;
			
			// 如果不是双操作符标签
			case !ECMAScript6Parser.tagOf(elementSibling, DoubleOperatorTag) :
				return false;
			
			// 如果两元素不是兄弟元素，则说明2个元素之间存在文本内容，属于后置性双操作符
			default :
				return elementSibling.previousElementSibling !== ECMAScript6Parser.getSeparatorElement(elementSibling);
		}
	},
	// lint
	function(textNode, syntaxTree){
		var elementSibling = ECMAScript6Parser.getPreviousElementSibling(textNode);
		
		switch(
			true
		){
			// 如果兄弟元素不存在，则说明该换行所处作用域目前没有语句
			case elementSibling === null :
				return true;
			
			// 如果标签名是 fragment，说明片段问题不为空，存在其他文本
			case elementSibling.tagName === "fragment" :
				return false;
				
			// 如果之间没有其他文本，而且上一个兄弟元素还是分号
			case elementSibling.tagName === "semicolon" :
				return true;

			// 如果是申明类型的元素
			case ECMAScript6Parser.tagOf(elementSibling, KeywordTag) :
				return true;
				
			// 默认
			default :
				return false;
		}
	},
	// initSemicolon
	function(){
		// 创建分号
		var semicolonElement = SyntaxTree.createElement("semicolon", ";");
		
		// 设置asi属性
		semicolonElement.setAttribute("asi", "");
			
		return semicolonElement;
	}
);

this.ECMAScript6Float = function(FLOAT_REGEXP){
	/**
	 * 浮点数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Float(syntaxTree){
		syntaxTree.add(
			new SyntaxTag(
				"float",
				FLOAT_REGEXP
			)
		);
	};
	ECMAScript6Float = new Class(ECMAScript6Float, ECMAScript6Parser);
	
	return ECMAScript6Float;
}(
	// FLOAT_REGEXP
	/\b\d+(?:\.\d+)?\b/g
);

this.ECMAScript6String = function(STRING_REGEXP){
	/**
	 * 字符串解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6String(syntaxTree){
		syntaxTree.add(
			new SyntaxTag(
				"string",
				STRING_REGEXP
			)
		);
	};
	ECMAScript6String = new Class(ECMAScript6String, ECMAScript6Parser);
	
	return ECMAScript6String;
}(
	// STRING_REGEXP
	/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/
);

this.ECMAScript6RegExp = function(REGEXP_REGEXP){
	/**
	 * 正则解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6RegExp(syntaxTree){
		syntaxTree.add(
			new SyntaxTag(
				"regexp",
				REGEXP_REGEXP
			)
		);
	};
	ECMAScript6RegExp = new Class(ECMAScript6RegExp, ECMAScript6Parser);
	
	return ECMAScript6RegExp;
}(
	// REGEXP_REGEXP
	/\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])/
);

this.ECMAScript6Wrapper = function(){
	/**
	 * 包装器解析器，此包装器会对内部进行语句分隔，分隔标准是逗号
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Wrapper(syntaxTree){
		syntaxTree.listen(
			"wrapper",
			function(element, index){
				// 如果 element 不是当前的父节点
				if(
					element !== this.parentNode
				){
					// 返回
					return;
				}
				
				// 监听逗号
				this.listen(
					"comma",
					function(e, i, n, p){
						// 阻止其他监听器执行
						p();
						
						// 跳出当前语句
						this.up();
						// 将逗号添加至 element 下
						this.appendChild(e, "comma");
						// 添加语句元素
						this.appendStatement();
					},
					index + 1
				);
			}
		);
	};
	ECMAScript6Wrapper = new Class(ECMAScript6Wrapper, ECMAScript6Parser);
	
	return ECMAScript6Wrapper;
}();

this.ECMAScript6Brace = function(OPENING_BRACE_REGEXP, CLOSING_BRACE_REGEXP){
	/**
	 * 大括号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Brace(syntaxTree){
		syntaxTree
			// 起始大括号
			.add(
				new OpeningingTag(
					"brace",
					OPENING_BRACE_REGEXP,
					"openingBrace"
				)
			)
			// 结束大括号
			.add(
				new ClosingTag(
					"brace",
					CLOSING_BRACE_REGEXP,
					"closingBrace"
				)
			)
			// 监听起始大括号
			.listen(
				"openingBrace",
				function(element, index){
					// 如果大括号没有与运算符一起存在，则说明这个大括号不是对象的一部分
					if(
						ECMAScript6Parser.withOperator(element) === false
					){
						// 返回
						return;
					}
					
					// 触发对象表达式事件
					this.dispatch("objectExpression", element, index);
				}
			);
	};
	ECMAScript6Brace = new Class(ECMAScript6Brace, ECMAScript6Parser);
	
	return ECMAScript6Brace;
}(
	// OPENING_BRACE_REGEXP
	/\{/,
	// CLOSING_BRACE_REGEXP
	/\}/
);

this.ECMAScript6Bracket = function(OPENING_BRACKET_REGEXP, CLOSING_BRACKET_REGEXP){
	/**
	 * 中括号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Bracket(syntaxTree){
		syntaxTree
			// 起始小括号
			.add(
				new OpeningingTag(
					"bracket",
					OPENING_BRACKET_REGEXP,
					"openingBracket"
				)
			)
			// 结束中括号
			.add(
				new ClosingTag(
					"bracket",
					CLOSING_BRACKET_REGEXP,
					"closingBracket"
				)
			)
			// 将事件 wrapper 委托给 openingBracket
			.delegate(
				"wrapper",
				"openingBracket"
			);
	};
	ECMAScript6Bracket = new Class(ECMAScript6Bracket, ECMAScript6Parser);
	
	return ECMAScript6Bracket;
}(
	// OPENING_BRACKET_REGEXP
	/\[/,
	// CLOSING_BRACKET_REGEXP
	/\]/
);

this.ECMAScript6Parenthesis = function(OPENING_PARENTHESISI_REGEXP, CLOSING_PARENTHESIS_REGEXP, CLOSING_PARENTHESIS_WITH_BRACE_REGEXP, deps){
	/**
	 * 小括号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Parenthesis(syntaxTree){
		syntaxTree
			// 起始小括号
			.add(
				new OpeningingTag(
					"parenthesis",
					OPENING_PARENTHESISI_REGEXP,
					"openingParenthesis"
				)
			)
			// 结束小括号
			.add(
				new ClosingTag(
					"parenthesis",
					CLOSING_PARENTHESIS_REGEXP,
					"closingParenthesis"
				)
			)
			// 后面紧跟大括号的结束小括号
			.add(
				new ClosingTag(
					"parenthesis",
					CLOSING_PARENTHESIS_WITH_BRACE_REGEXP,
					"closingParenthesisWithBrace"
				),
				true
			)
			// 将事件 wrapper 委托给 openingParenthesis
			.delegate(
				"wrapper",
				"openingParenthesis"
			)
			// 将事件 closingParenthesis 委托给 closingParenthesisWithBrace
			.delegate(
				"closingParenthesis",
				"closingParenthesisWithBrace"
			);
	};
	ECMAScript6Parenthesis = new Class(ECMAScript6Parenthesis, ECMAScript6Parser);
	
	ECMAScript6Parenthesis.static(
		{ deps : deps }
	);
	
	return ECMAScript6Parenthesis;
}(
	// OPENING_PARENTHESISI_REGEXP
	/\(/,
	// CLOSING_PARENTHESIS_REGEXP
	/\)/,
	// CLOSING_PARENTHESIS_WITH_BRACE_REGEXP
	/\)(?=\s*\{)/,
	// deps
	[ this.ECMAScript6Wrapper ]
);

this.ECMAScript6Semicolon = function(SEMICOLON_REGEXP){
	/**
	 * 分号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Semicolon(syntaxTree){
		syntaxTree.add(
			new SyntaxTag(
				"semicolon",
				SEMICOLON_REGEXP,
				null,
				EndingTypes.Statement
			)
		);
	};
	ECMAScript6Semicolon = new Class(ECMAScript6Semicolon, ECMAScript6Parser);
	
	return ECMAScript6Semicolon;
}(
	// SEMICOLON_REGEXP
	/;/
);

this.ECMAScript6DoubleOperator = function(DOUBLE_REGEXP, WRAP_WITH_DOUBLE_OPERATOR_REGEXP){
	/**
	 * 双字符操作符解析器，如：递增、递减、幂
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6DoubleOperator(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new DoubleOperatorTag(
					"double-operator",
					DOUBLE_REGEXP,
					"doubleOperator"
				),
				true
			)
			// 添加标签
			.add(
				new TextTag(
					"wrap",
					WRAP_WITH_DOUBLE_OPERATOR_REGEXP,
					"wrapWithDoubleOperator"
				),
				true
			)
			// 将 wrap 事件委托给 wrapWithDoubleOperator
			.delegate(
				"wrap",
				"wrapWithDoubleOperator"
			);
	};
	ECMAScript6DoubleOperator = new Class(ECMAScript6DoubleOperator, ECMAScript6Parser);
	
	return ECMAScript6DoubleOperator;
}(
	// DOUBLE_REGEXP
	/\+\+|--|\*\*/,
	// WRAP_WITH_DOUBLE_OPERATOR_REGEXP
	/\s*\n\s*(?=\+\+|--|\*\*)/
);

this.ECMAScript6Comma = function(COMMA_REGEXP){
	/**
	 * 逗号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Comma(syntaxTree){
		syntaxTree.add(
			new OperatorTag(
				"comma",
				COMMA_REGEXP,
				"comma",
				EndingTypes.Clause
			)
		);
	};
	ECMAScript6Comma = new Class(ECMAScript6Comma, ECMAScript6Parser);
	
	return ECMAScript6Comma;
}(
	// COMMA_REGEXP
	/,/
);

this.ECMAScript6Dot = function(DOT_REGEXP){
	/**
	 * 点解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Dot(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new SyntaxTag(
					"dot",
					DOT_REGEXP
				)
			)
			// 监听符号点
			.listen(
				"dot",
				function(element, index){
					var id, plainText = this.plainText;
					
					// 监听 indexedPlainText 事件
					id = this.listen(
						"indexedPlainText",
						function(){
							// 如果是片段文本是空的
							if(
								element.nextElementSibling === null
							){
								// 返回
								return;
							}
							
							// 取消 indexedPlainText 事件的监听
							this.unlisten(id);
							// 关闭纯文本模式
							plainText.disable();
						},
						index
					);
					
					// 开启纯文本模式
					plainText.enable();
				}
			);
	};
	ECMAScript6Dot = new Class(ECMAScript6Dot, ECMAScript6Parser);
	
	return ECMAScript6Dot;
}(
	// DOT_REGEXP
	/\./
);

this.ECMAScript6This = function(KeywordTag, THIS_REGEXP){
	/**
	 * this 关键字解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6This(syntaxTree){
		syntaxTree.add(
			new KeywordTag(
				"this",
				THIS_REGEXP
			)
		);
	};
	ECMAScript6This = new Class(ECMAScript6This, ECMAScript6Parser);
	
	return ECMAScript6This;
}(
	this.KeywordTag,
	// THIS_REGEXP
	/\bthis\b/
);

this.ECMAScript6Operator = function(OPERATOR_REGEXP){
	/**
	 * 操作符解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Operator(syntaxTree){
		syntaxTree.add(
			new OperatorTag(
				"operator",
				OPERATOR_REGEXP
			)
		);
	};
	ECMAScript6Operator = new Class(ECMAScript6Operator, ECMAScript6Parser);
	
	return ECMAScript6Operator;
}(
	// OPERATOR_REGEXP
	/[+-/*|&!~^%=<>]/
);

this.ECMAScript6Colon = function(COLON_REGEXP){
	/**
	 * 冒号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Colon(syntaxTree){
		syntaxTree.add(
			new OperatorTag(
				"colon",
				COLON_REGEXP,
				null,
				EndingTypes.Clause
			)
		);
	};
	ECMAScript6Colon = new Class(ECMAScript6Colon, ECMAScript6Parser);
	
	return ECMAScript6Colon;
}(
	// COLON_REGEXP
	/:/
);

this.ECMAScript6TernaryOperator = function(TERNARY_REGEXP, dispatchBeforeEnding){
	/**
	 * 三元运算符解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6TernaryOperator(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new OperatorTag(
					"ternary",
					TERNARY_REGEXP,
					null,
					EndingTypes.Clause
				)
			)
			// 监听标签事件
			.listen(
				"ternary",
				function(element, index){
					// 监听运算符
					this.one(
						"colon",
						function(operatorElement, i, n, p){
							// 阻止其他监听器执行
							p();
						},
						index
					);
				}
			);
	};
	ECMAScript6TernaryOperator = new Class(ECMAScript6TernaryOperator, ECMAScript6Parser);
	
	return ECMAScript6TernaryOperator;
}(
	// TERNARY_REGEXP
	/\?/
);

this.ECMAScript6KeywordOperator = function(KEYWORD_OPERATOR_REGEXP){
	/**
	 * 关键字操作符解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6KeywordOperator(syntaxTree){
		syntaxTree.add(
			new OperatorTag(
				"keyword-operator",
				KEYWORD_OPERATOR_REGEXP,
				"keywordOperator"
			),
			true
		);
	};
	ECMAScript6KeywordOperator = new Class(ECMAScript6KeywordOperator, ECMAScript6Parser);
	
	return ECMAScript6KeywordOperator;
}(
	// KEYWORD_OPERATOR_REGEXP
	/\b(?:void|typeof|instanceof|new|in)\b|\b(?:return|throw)\b(?=[^\S\n]*\S)\b/
);

this.ECMAScript6ConditionWithoutBrace = function(){
	/**
	 * 没有紧跟大括号的条件解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ConditionWithoutBrace(syntaxTree){
		syntaxTree.listen(
			"conditionWithoutBrace",
			function(element, index){
				this.up();
				
				// 添加起始大括号，但是文本是空的，目的是增加作用域，防止表达式影响 ASI 机制
				this.appendOpening("brace", "", "openingBrace");
				
				// 监听 beforeEnding 事件
				this.one(
					"beforeEnding",
					function(e, i, n, p){
						// 添加结束大括号
						this.appendClosing("brace", "", "closingBrace");
					},
					index + 2
				);
				
				this.appendStatement();
			}
		);
	};
	ECMAScript6ConditionWithoutBrace = new Class(ECMAScript6ConditionWithoutBrace, ECMAScript6Parser);
	
	return ECMAScript6ConditionWithoutBrace;
}();

this.ECMAScript6Condition = function(){
	/**
	 * 条件解析器，是 if、for、while、switch 等条件语句的依赖类
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Condition(syntaxTree){
		syntaxTree.listen(
			"condition",
			function(element, index){
				var cid;
				
				// 触发表达式起始事件
				this.dispatch("expressionStart", element, index);
				
				// 监听小括号
				cid = this.one(
					"closingParenthesis",
					function(e, i, n, p){
						// 触发 closingParenthesisWithBrace 事件
						this.dispatch("closingParenthesisWithBrace", e, i);
						
						// 触发 conditionWithoutBrace 事件
						this.dispatch("conditionWithoutBrace", element, index);
					},
					index + 1
				);
				
				// 监听紧跟大括号的小括号
				this.one(
					"closingParenthesisWithBrace",
					function(e, i, n, p){
						// 取消 closingParenthesis 的监听
						this.unlisten(cid);
					},
					index + 1
				);
				
				// 监听起始大括号
				this.one(
					"openingBrace",
					function(e, i, n, p){
						p();
					},
					index + 1
				);
				
				// 监听结束大括号
				this.one(
					"closingBrace",
					function(e, i, n, p){
						p();
						
						// 触发表达式结束事件
						this.dispatch("expressionEnd", element, index);
					},
					index + 1
				);
			}
		);
	};
	ECMAScript6Condition = new Class(ECMAScript6Condition, ECMAScript6Parser);
	
	return ECMAScript6Condition;
}();

this.ECMAScript6If = function(ECMAScript6Expression, IF_REGEXP){
	/**
	 * if 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6If(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"if",
					IF_REGEXP
				)
			)
			// 将 condition 事件委托给 if 事件
			.delegate(
				"condition",
				"if"
			);
	};
	ECMAScript6If = new Class(ECMAScript6If, ECMAScript6Parser);

	return ECMAScript6If;
}(
	this.ECMAScript6Expression,
	// IF_REGEXP
	/\bif\b/
);

this.ECMAScript6WrapWithElse = function(ECMAScript6Expression, WRAP_WITH_ELSE_REGEXP){
	/**
	 * 紧跟 else 表达式的换行解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6WrapWithElse(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new TextTag(
					"wrap",
					WRAP_WITH_ELSE_REGEXP,
					"wrapWithElse"
				),
				true
			)
			// 监听事件
			.listen(
				"wrapWithElse",
				function(textNode, index){
					// 获取上一个兄弟元素
					var previousElementSibling = ECMAScript6Parser.getPreviousElementSibling(textNode);
					
					switch(
						true
					){
						// 如果兄弟元素不存在
						case previousElementSibling === null :
							return;
						
						// 如果是大括号
						case previousElementSibling.tagName === "brace" :
							return;
						
						// 如果在 if 表达式内
						case ECMAScript6Expression.in("if", index - 2) :
							// 触发 wrap 事件
							this.dispatch("wrap", textNode, index);
							return;
					}
				}
			);
	};
	ECMAScript6WrapWithElse = new Class(ECMAScript6WrapWithElse, ECMAScript6Parser);
	
	return ECMAScript6WrapWithElse;
}(
	this.ECMAScript6Expression,
	// WRAP_WITH_ELSE_REGEXP
	/\s*\n\s*(?=else\b)/
);

this.ECMAScript6Else = function(ELSE_REGEXP, ELSE_WITHOUT_IF_AND_BRACE_REGEXP, deps){
	/**
	 * else 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Else(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"else",
					ELSE_REGEXP
				)
			)
			// 添加标签
			.add(
				new KeywordTag(
					"else",
					ELSE_WITHOUT_IF_AND_BRACE_REGEXP,
					"elseWithoutIfAndBrace"
				),
				true
			)
			// 将 else 事件委托给 elseWithoutIfAndBrace 事件
			.delegate(
				"condition",
				"elseWithoutIfAndBrace"
			);
	};
	ECMAScript6Else = new Class(ECMAScript6Else, ECMAScript6Parser);
	
	ECMAScript6Else.static(
		{ deps : deps }
	);
	
	return ECMAScript6Else;
}(
	// ELSE_REGEXP
	/\belse\b/,
	// ELSE_WITHOUT_IF_AND_BRACE_REGEXP
	/\belse\b(?!\s*(?:{|if))/,
	// deps
	[ this.ECMAScript6Condition ]
);

this.ECMAScript6While = function(WHILE_REGEXP, deps){
	/**
	 * while 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6While(syntaxTree){
		syntaxTree.add(
			new KeywordTag(
				"while",
				WHILE_REGEXP
			)
		);
		
		// 将 condition 事件委托给 while 事件
		syntaxTree.delegate("condition", "while");
	};
	ECMAScript6While = new Class(ECMAScript6While, ECMAScript6Parser);
	
	ECMAScript6While.static(
		{ deps : deps }
	);
	
	return ECMAScript6While;
}(
	// WHILE_REGEXP
	/\bwhile\b/,
	// deps
	[ this.ECMAScript6Condition ]
);

this.ECMAScript6Do = function(DO_REGEXP){
	/**
	 * do while 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Do(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"do",
					DO_REGEXP
				)
			)
			// 监听事件
			.listen(
				"do",
				function(element, index){
					var syntaxTree = this;
					
					// 触发表达式起始事件
					this.dispatch("expressionStart", element, index);
					
					// 遍历这4个事件
					[
						"openingBrace",
						"closingBrace",
						"while",
						"openingParenthesis"
					]
					.forEach(
						function(name){
							// 监听事件
							syntaxTree.one(name, this, name === "while" ? index : index + 1);
						},
						function(e, i, n, p){
							// 阻止其他监听器执行
							p();
						}
					);
					
					// 监听结束小括号事件
					this.one(
						"closingParenthesis",
						function(){
							// 触发表达式结束事件
							this.dispatch("expressionEnd", element, index);
						},
						index + 1
					);
				}
			);
	};
	ECMAScript6Do = new Class(ECMAScript6Do, ECMAScript6Parser);
	
	return ECMAScript6Do;
}(
	// DO_REGEXP
	/\bdo\b/
);

this.ECMAScript6DoWithoutBrace = function(DO_WITHOUT_BRACE_REGEXP, deps){
	/**
	 * 没有紧跟大括号的 do while 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6DoWithoutBrace(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new SyntaxTag(
					"do",
					DO_WITHOUT_BRACE_REGEXP,
					"doWithoutBrace"
				),
				true
			)
			// 将 do 事件委托给 doWithoutBrace 事件
			.delegate(
				"do",
				"doWithoutBrace"
			)
			// 将 conditionWithoutBrace 事件委托给 doWithoutBrace 事件
			.delegate(
				"conditionWithoutBrace",
				"doWithoutBrace"
			);
	};
	ECMAScript6DoWithoutBrace = new Class(ECMAScript6DoWithoutBrace, ECMAScript6Parser);
	
	ECMAScript6DoWithoutBrace.static(
		{ deps : deps });
	
	return ECMAScript6DoWithoutBrace;
}(
	// DO_WITHOUT_BRACE_REGEXP
	/\bdo\b(?!\s*{)/,
	// deps
	[ this.ECMAScript6Do ]
);

this.ECMAScript6For = function(FOR_REGEXP, deps){
	/**
	 * for 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6For(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"for",
					FOR_REGEXP
				)
			)
			// 将 condition 事件委托给 for 事件
			.delegate(
				"condition",
				"for"
			);
	};
	ECMAScript6For = new Class(ECMAScript6For, ECMAScript6Parser);
	
	ECMAScript6For.static(
		{ deps : deps }
	);
	
	return ECMAScript6For;
}(
	// FOR_REGEXP
	/\bfor\b/,
	// deps
	[ this.ECMAScript6Condition ]
);

this.ECMAScript6With = function(WITH_REGEXP, deps){
	/**
	 * with 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6With(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"with",
					WITH_REGEXP
				)
			)
			// 将 condition 事件委托给 with 事件
			.delegate(
				"condition",
				"with"
			);
	};
	ECMAScript6With = new Class(ECMAScript6With, ECMAScript6Parser);
	
	ECMAScript6With.static(
		{ deps : deps }
	);
	
	return ECMAScript6With;
}(
	// WITH_REGEXP
	/\bwith\b/,
	// deps
	[ this.ECMAScript6Condition ]
);

this.ECMAScript6Switch = function(SWITCH_REGEXP, deps){
	/**
	 * switch 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Switch(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"switch",
					SWITCH_REGEXP
				)
			)
			// 将 condition 事件委托给 switch 事件
			.delegate(
				"condition",
				"switch"
			);
	};
	ECMAScript6Switch = new Class(ECMAScript6Switch, ECMAScript6Parser);
	
	ECMAScript6Switch.static(
		{ deps : deps }
	);
	
	return ECMAScript6Switch;
}(
	// SWITCH_REGEXP
	/\bswitch\b/,
	// deps
	[ this.ECMAScript6Condition ]
);

this.ECMAScript6Case = function(ECMAScript6Expression, CASE_REGEXP){
	/**
	 * case 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Case(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"case",
					CASE_REGEXP
				)
			)
			// 监听事件
			.listen(
				"case",
				function(element, index){
					// 触发表达式开始事件
					this.dispatch("expressionStart", element, index)
					
					// 监听冒号
					this.one(
						"colon",
						function(e){
							// 触发表达式结束事件
							this.dispatch("expressionEnd", element, index);
						},
						index
					);
				}
			);
	};
	ECMAScript6Case = new Class(ECMAScript6Case, ECMAScript6Parser);
	
	return ECMAScript6Case;
}(
	this.ECMAScript6Expression,
	// CASE_REGEXP
	/\bcase\b/
);

this.BasicPackage = function(Package, contents){
	/**
	 * 基础的语法包
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function BasicPackage(syntaxTree){};
	BasicPackage = new Class(BasicPackage, Package);
	
	BasicPackage.package(contents);
	
	return BasicPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScript6Expression,
		this.ECMAScript6ASI,
		this.ECMAScript6Float,
		this.ECMAScript6String,
		this.ECMAScript6RegExp,
		this.ECMAScript6Wrapper,
		this.ECMAScript6Brace,
		this.ECMAScript6Bracket,
		this.ECMAScript6Parenthesis,
		this.ECMAScript6Semicolon,
		this.ECMAScript6DoubleOperator,
		this.ECMAScript6Comma,
		this.ECMAScript6Dot,
		this.ECMAScript6This,
		this.ECMAScript6Operator,
		this.ECMAScript6Colon,
		this.ECMAScript6TernaryOperator,
		this.ECMAScript6KeywordOperator,
		this.ECMAScript6ConditionWithoutBrace,
		this.ECMAScript6Condition,
		this.ECMAScript6If,
		this.ECMAScript6WrapWithElse,
		this.ECMAScript6Else,
		this.ECMAScript6While,
		this.ECMAScript6Do,
		this.ECMAScript6For,
		this.ECMAScript6With,
		this.ECMAScript6Switch,
		this.ECMAScript6Case
	]
);
	
}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.SyntaxTag,
	this.OperatorTag,
	this.OpeningingTag,
	this.ClosingTag,
	this.TextTag,
	this.DoubleOperatorTag,
	this.DeclarationTag,
	this.KeywordTag,
	this.EndingTypes
));


// 一些面向对象和模块的共用类
(function(ECMAScript6Parser, SyntaxTree, Condition){

this.ECMAScript6As = function(KeywordTag, AS_REGEXP, commaCondition, closingBraceCondition){
	/**
	 * as关键字解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6As(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"as",
					AS_REGEXP
				)
			)
			// 监听事件
			.listen(
				"as",
				function(element, index){
					var parentNode = element.parentNode;
				
					// 如果 as 是第一个子元素，则说明该 as 应视为属性名
					if(
						element === parentNode.firstElementChild
					){
						// 移除此元素
						parentNode.removeChild(element);
						// 添加片段文本
						this.appendFragment(element.textContent);
						// 返回
						return;
					}
					
					var plainText = this.plainText;
					
					// 启用纯文本模式
					plainText.enable("string", "comma", "brace");
					
					// 监听 beforeClauseEnding 事件
					this.one(
						"beforeClauseEnding",
						function(){
							// 关闭纯文本模式
							plainText.disable();
						},
						index
					);
				}
			);
		
		// 忽略as标签
		syntaxTree
			.tags
			.ignore(
				"as"
			);
	};
	ECMAScript6As = new Class(ECMAScript6As, ECMAScript6Parser);
	
	return ECMAScript6As;
}(
	this.KeywordTag,
	// AS_REGEXP
	/\bas\b/g
);

this.ECMAScript6Member = function(deps, forEach, compile){
	/**
	 * 成员解析器，一般是用于赋予成员或提取成员
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Member(syntaxTree){
		// 添加 as 标签
		syntaxTree
			// 将事件 wrapper 委托给 member
			.delegate(
				"wrapper",
				"member"
			)
			// 监听事件
			.listen(
				"member",
				function(element, index){
					var parentIndex = index + 1, tags = this.tags;
					
					// 设置表达式名称
					element.setAttribute("expression", "member");
					// 触发表达式起始事件
					this.dispatch("expressionStart", element, parentIndex);
					
					// 监听 beforeEnding 事件
					this.one(
						"beforeEnding",
						function(){
							// 忽略 as 标签
							tags.ignore("as");

							// 触发表达式结束事件
							this.dispatch("expressionEnd", element, parentIndex);
							
							// 单语句编译
							forEach.call(
								ECMAScript6Parser.querySelectorAll(element, ">statement"),
								compile,
								this
							);
						},
						index
					);
					
					// 取消 as 标签的忽略
					tags.unignore("as");
				}
			);
	};
	ECMAScript6Member = new Class(ECMAScript6Member, ECMAScript6Parser);
	
	ECMAScript6Member.static(
		{ deps : deps }
	);
	
	return ECMAScript6Member;
}(
	// deps
	[ this.ECMAScript6As ],
	Array.prototype.forEach,
	// compile
	function(statement){
		var nextElementSibling, firstElementChild = statement.firstElementChild, asElement = ECMAScript6Parser.querySelector(statement, ">as");
		
		switch(
			true
		){
			// 如果 as 元素不存在
			case asElement === null :
				break;
			
			// 如果 as 之后没有其他元素，而且 as 不可能单独存在
			case (nextElementSibling = asElement.nextElementSibling) === null :
				// 报错
				this.error(asElement, "不完整的as表达式。");
				return;
			
			// 如果还有其他多余的元素
			case nextElementSibling !== statement.lastElementChild :
				// 报错
				this.error(nextElementSibling.nextElementSibling, "两个成员属性之间应该用逗号进行分隔。");
				return;
			
			// 默认
			default :
				// 设置文本内容
				asElement.textContent = ":";
				
				// 将 as 插入到最前面
				statement.insertBefore(asElement, firstElementChild);
				// 将 nextElementSibling 插入到 as 之前 
				statement.insertBefore(nextElementSibling, asElement);
				return;
		}
		
		switch(
			true
		){
			// 如果元素不存在，说明是空属性
			case firstElementChild === null :
				return;

			// 如果不是 fragment 元素
			case firstElementChild.tagName !== "fragment" :
				break;

			// 如果还有其他元素存在
			case firstElementChild !== statement.lastElementChild :
				break;

			// 默认
			default :
				// 添加节点
				statement.appendChild(
					// 创建文本
					SyntaxTree.createText(
						":" + firstElementChild.textContent
					)
				);
				return;
		}
		
		// 报错
		this.error(firstElementChild, "不规范的成员属性。");
	}
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.Condition
));


// 对象相关解析器
(function(ECMAScript6Parser, ECMAScript6ExceptionParser, SyntaxTree, SyntaxTag, DeclarationTag, forEach){

this.ProtectedListeners = function(ids){
	/**
	 * 受保护的监听器类
	 */
	function ProtectedListeners(){};
	ProtectedListeners = new StaticClass(ProtectedListeners);
	
	ProtectedListeners.static({
		/**
		 * 添加受保护的监听器 id
		 * @param {Number} _rest - 监听器 id
		 */
		add : function(_rest){
			ids.push.apply(ids, arguments);
			return this;
		},
		/**
		 * 清除所有监听器 id，并取消对应监听器的监听
		 */
		clear : function(){
			var syntaxTree = SyntaxTree.current;
			
			// 取消监听
			ids.forEach(syntaxTree.unlisten, syntaxTree);
			// 清空集合
			ids.splice(0);
			
			syntaxTree
				.plainText
				.disable();
			
			return this;
		}
	});
	
	return ProtectedListeners;
}(
	// ids
	[]
);

this.ECMAScript6Value = function(ProtectedListeners){
	/**
	 * 对象值解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Value(syntaxTree){
		syntaxTree.listen(
			"value",
			function(){
				// 清除所保护的监听器
				ProtectedListeners.clear();
			}
		);
	};
	ECMAScript6Value = new Class(ECMAScript6Value, ECMAScript6Parser);
	
	return ECMAScript6Value;
}(
	this.ProtectedListeners
);

this.ECMAScript6Accessor = function(ACCESSOR_REGEXP){
	/**
	 * 访问器解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Accessor(syntaxTree){
		// 添加标签
		syntaxTree.add(
			new SyntaxTag(
				"fragment",
				ACCESSOR_REGEXP,
				"accessor"
			)
		);
	};
	ECMAScript6Accessor = new Class(ECMAScript6Accessor, ECMAScript6Parser);
	
	return ECMAScript6Accessor;
}(
	// ACCESSOR_REGEXP
	/\b(?:get|set)\b(?!\s*[(:])/
);

this.ECMAScript6Key = function(ProtectedListeners, deps, protectColon, protectOperator, protectParenthesis, protectBracket){
	/**
	 * 对象键（名称）解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Key(syntaxTree){
		var ecmaScript6Key = this, plainText = syntaxTree.plainText;
		
		// 监听事件
		syntaxTree.listen(
			"key",
			function(element, index){
				// 添加监听器
				ProtectedListeners.add(
					// 保护冒号
					protectColon(this, index),
					// 保护运算符
					protectOperator(this, index),
					// 保护函数小括号
					protectParenthesis(this, index + 1),
					// 保护中括号
					protectBracket(this, index + 1)
				);
					
				// 开启纯文本模式
				plainText.enable("accessor", "string", "fragment", "bracket", "parenthesis", "operator", "colon", "comma", "brace");
				// 触发 plainedKey 事件
				this.dispatch("plainedKey", null, index);
				
				this.one(
					"beforeClauseEnding",
					function(){
						// 清空监听器
						ProtectedListeners.clear();
					},
					index
				);
			}
		);
	};
	ECMAScript6Key = new Class(ECMAScript6Key, ECMAScript6Parser);
	
	ECMAScript6Key.static(
		{ deps : deps }
	);
	
	return ECMAScript6Key;
}(
	this.ProtectedListeners,
	// deps
	[ this.ECMAScript6Value ],
	// protectColon
	function(syntaxTree, index){
		return syntaxTree.one(
			"colon",
			function(element){
				// 监听到冒号，就说明之后是对象值部分，所以触发 value 事件
				this.dispatch("value", element, index);
			},
			index
		);
	},
	// protectOperator
	function(syntaxTree, index){
		return syntaxTree.one(
			"operator",
			function(element){
				var value = element.getAttribute("value");
				
				switch(
					value
				){
					case "=" :
						// 监听到等号，就说明之后是对象默认值部分，所以触发 value 事件
						this.dispatch("value", element, index);
						return;

					case "*" :
						return;
				}
				
				// 其他的运算符要报错
				this.error(element, "意外的运算符。");
			},
			index
		);
	},
	// protectParenthesis
	function(syntaxTree, index){
		return syntaxTree.one(
			"openingParenthesis",
			function(element, i, next, prevent){
				// 监听到小括号，就说明之后是函数参数与主体部分，即为对象值部分，所以触发 value 事件
				this.dispatch("value", element, index - 1);
				// 触发 functionContext 事件
				this.dispatch("functionContext", element, index);
			},
			index
		);
	},
	// protectBracket
	function(syntaxTree, index){
		return syntaxTree.one(
			"openingBracket",
			function(element, i, next, prevent){
				// 阻止其他监听器执行
				prevent();
				
				this.plainText
					.disable();
			},
			index
		);
	}
);

this.ECMAScript6ComputedName = function(){
	/**
	 * 对象计算式名称解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ComputedName(syntaxTree){
		syntaxTree.listen(
			"computedName",
			function(element, index){
				var colonElement = element.nextElementSibling, parentNode = element.parentNode;
				
				// 设置 start 元素文本内容
				ECMAScript6Parser.setStartContent(element, "new Rexjs.NamedProperty((");
				// 设置 end 元素文本内容
				ECMAScript6Parser.setEndContent(element, ")");
				
				// 设置分号文本，修改为逗号
				colonElement.textContent = ",";

				// 设置属性
				parentNode.setAttribute("computed", "");

				// 添加 NamedProperty 的结束小括号
				parentNode.appendChild(
					SyntaxTree.createText(")")
				);

				// 触发分隔属性事件
				this.dispatch("separateProperty", parentNode, index);
			}
		);
	};
	ECMAScript6ComputedName = new Class(ECMAScript6ComputedName, ECMAScript6Parser);
	
	return ECMAScript6ComputedName;
}();

this.ECMAScript6ComputedMethod = function(deps){
	/**
	 * 对象计算式方法解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ComputedMethod(syntaxTree){
		syntaxTree.listen(
			"computedMethod",
			function(element, index){
				// element.nextElementSibling 一定存在，因为已经加了保护，确定是一个计算式方法
				var colonElement = SyntaxTree.createElement("colon", ":");
				
				// 插入分号元素，模拟键值对属性
				element
					.parentNode
					.insertBefore(
						colonElement,
						element.nextElementSibling
					);
				
				// 触发computedName事件
				this.dispatch("computedName", element, index);
				
				// 修改冒号文本内容
				colonElement.textContent = ", function ";
			}
		);
	};
	ECMAScript6ComputedMethod = new Class(ECMAScript6ComputedMethod, ECMAScript6Parser);
	
	ECMAScript6ComputedMethod.static(
		{ deps : deps }
	);
	
	return ECMAScript6ComputedMethod;
}(
	// deps
	[ this.ECMAScript6ComputedName ]
);

this.ECMAScript6ComputedAccessor = function(deps){
	/**
	 * 对象计算式访问器解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ComputedAccessor(syntaxTree){
		syntaxTree.listen(
			"computedAccessor",
			function(element, index){
				// bracketElement 元素一定会存在，因为已经在parseProperty中做了确保
				var bracketElement = element.nextElementSibling, textContent = element.textContent;
				
				// 清空访问器的文本内容
				element.textContent = "";
				
				// 触发计算式方法事件
				this.dispatch("computedMethod", bracketElement, index);
				
				// 设置开始中括号的文本内容
				ECMAScript6Parser.setStartContent(
					bracketElement,
					// 这不需要使用 protectMethod 来保护，因为访问器的正则里使用了\b，来确保访问器单词的独立性
					"new Rexjs." + (textContent === "get" ? "Getter" : "Setter") + "(("
				);
			}
		);
	};
	ECMAScript6ComputedAccessor = new Class(ECMAScript6ComputedAccessor, ECMAScript6Parser);
	
	ECMAScript6ComputedAccessor.static(
		{ deps : deps }
	);
	
	return ECMAScript6ComputedAccessor;
}(
	// deps
	[ this.ECMAScript6ComputedMethod ]
);

this.ECMAScript6ShorthandMethod = function(){
	/**
	 * 对象简写方法解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ShorthandMethod(syntaxTree){
		syntaxTree.listen(
			"shorthandMethod",
			function(element){
				// 插入文本
				element
					.parentNode
					.insertBefore(
						SyntaxTree.createText(" : function"),
						element.nextElementSibling
					);
			}
		);
	};
	ECMAScript6ShorthandMethod = new Class(ECMAScript6ShorthandMethod, ECMAScript6Parser);
	
	return ECMAScript6ShorthandMethod;
}();

this.ECMAScript6ShorthandString = function(){
	/**
	 * 简写的字符串属性解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ShorthandString(syntaxTree){
		// 捕获 shorthandString 事件，报错
		this.catch("shorthandString", "对象不应该将简写的字符串做为属性名称。");
	};
	ECMAScript6ShorthandString = new Class(ECMAScript6ShorthandString, ECMAScript6ExceptionParser);
	
	return ECMAScript6ShorthandString;
}();

this.ECMAScript6ShorthandName = function(){
	/**
	 * 对象简写名称解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ShorthandName(syntaxTree){
		syntaxTree.listen(
			"shorthandName",
			function(element){
				// 添加文本
				element
					.parentNode
					.appendChild(
						SyntaxTree.createText(" : " + element.textContent)
					);
			}
		);
	};
	ECMAScript6ShorthandName = new Class(ECMAScript6ShorthandName, ECMAScript6Parser);
	
	return ECMAScript6ShorthandName;
}();

this.ECMAScript6DefaultValue = function(){
	/**
	 * 对象属性默认值解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6DefaultValue(syntaxTree){
		syntaxTree.listen(
			"defaultValue",
			function(element, index){
				// 如果没有开启rex模式
				if(
					!this.rexModeEnabled
				){
					// 报错
					this.error(element, "如需使用默认值方式赋值，请开启rex模式。");
					return;
				}
				
				var textContent = element.previousElementSibling.textContent;
				
				// 修改文本
				element.textContent = " : " + textContent + " !== void 0 ? " + textContent + " : ";
			}
		);
	};
	ECMAScript6DefaultValue = new Class(ECMAScript6DefaultValue, ECMAScript6Parser);
	
	return ECMAScript6DefaultValue;
}();

this.ECMAScript6EmptyProperty = function(){
	/**
	 * 空属性解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6EmptyProperty(syntaxTree){
		// 捕获 emptyProperty 事件，报错
		this.catch("emptyProperty", "空的对象属性。");
	};
	ECMAScript6EmptyProperty = new Class(ECMAScript6EmptyProperty, ECMAScript6ExceptionParser);
	
	return ECMAScript6EmptyProperty;
}();

this.ECMAScript6Property = function(deps, accessor, compute, others){
	/**
	 * 对象属性解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Property(syntaxTree){
		syntaxTree.listen(
			"property",
			function(element, index){
				var elementChild = element.firstElementChild;
				
				// 判断元素标签
				switch(
					elementChild.tagName
				){
					// 如果是片段文本
					case "fragment" :
						break;
					
					// 如果是字符串
					case "string" :
						others(this, elementChild, true, index);
						return;
					
					// 如果是计算式
					case "bracket" :
						compute(this, elementChild, index);
						return;
					
					// 默认
					default :
						this.error(elementChild, "意外的标记。");
						return;
				}
				
				// 判断 fragment 元素文本内容
				switch(
					elementChild.textContent
				){
					// 如果是 get
					case "get" :
						break;

					// 如果是 set
					case "set" :
						break;

					// 其他
					default :
						others(this, elementChild, false, index);
						return;
				}
				
				// 访问器
				accessor(this, elementChild, index);
			}
		);
	};
	ECMAScript6Property = Class(ECMAScript6Property, ECMAScript6Parser);
	
	ECMAScript6Property.static(
		{ deps : deps }
	);
	
	return ECMAScript6Property;
}(
	// deps
	[
		this.ECMAScript6Accessor,
		this.ECMAScript6ComputedName,
		this.ECMAScript6ComputedMethod,
		this.ECMAScript6ComputedAccessor,
		this.ECMAScript6ShorthandMethod,
		this.ECMAScript6ShorthandString,
		this.ECMAScript6ShorthandName,
		this.ECMAScript6DefaultValue,
		this.ECMAScript6EmptyProperty
	],
	// accessor
	function(syntaxTree, accessorElement, index){
		// 确保访问器的完整
		if(
			ECMAScript6Parser.querySelector(accessorElement, "+*+parenthesis+brace:last-child")
		){
			var name;
			
			// 判断下一个标签的名称
			switch(
				accessorElement
					.nextElementSibling
					.tagName
			){
				// 如果是文本
				case "fragment" :
					name = "accessorMethod";
					break;

				// 如果是字符串
				case "string" :
					name = "accessorMethod";
					break;
				
				// 如果是中括号
				case "bracket" :
					name = "computedAccessor";
					break;
					
				default :
					// 报错
					syntaxTree.error(accessorElement.nextElementSibling, "不规范的访问器名称。");
					return;
			}
			
			// 触发事件
			syntaxTree.dispatch(name, accessorElement, index);
			return;
		}
		
		// 报错
		syntaxTree.error(accessorElement, "不完整的属性访问器。");
	},
	// compute
	function(syntaxTree, bracketElement, index){
		var nextElementSibling = bracketElement.nextElementSibling;
		
		switch(
			true
		){
			// 如果不存在
			case nextElementSibling === null :
				break;
			
			// 确保是一个计算式属性名
			case nextElementSibling.tagName === "colon" :
				syntaxTree.dispatch("computedName", bracketElement, index);
				return;
			
			// 确保是一个函数
			case ECMAScript6Parser.querySelector(bracketElement, "+parenthesis+brace:last-child") !== null :
				syntaxTree.dispatch("computedMethod", bracketElement, index);
				return;
		}
		
		// 报错
		syntaxTree.error(bracketElement, "不完整的计算式属性。");
	},
	// others
	function(syntaxTree, elementChild, isString, index){
		var nextElementSibling = elementChild.nextElementSibling;

		switch(
			true
		){
			// 如果兄弟元素不存在，则说明是简写
			case nextElementSibling === null :
				// 触发事件
				syntaxTree.dispatch(isString ? "shorthandString" : "shorthandName", elementChild, index);
				return;
			
			// 如果是冒号，说明是键值对模式
			case nextElementSibling.tagName === "colon" :
				syntaxTree.dispatch("keyValuePair", elementChild, index);
				return;
				
			// 匹配简写方法
			case ECMAScript6Parser.querySelector(elementChild, "+parenthesis+brace:last-child") !== null :
				syntaxTree.dispatch("shorthandMethod", elementChild, index);
				return;
				
			// 匹配默认值
			case !isString && ECMAScript6Parser.querySelector(elementChild, '+operator[value="="]') !== null :
				syntaxTree.dispatch("defaultValue", nextElementSibling, index);
				return;
		}
		
		// 报错
		syntaxTree.error(elementChild, "键值对属性缺少对象值。");
	}
);

this.ECMAScript6ObjectCreator = function(add){
	/**
	 * 对象创建解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ObjectCreator(syntaxTree){
		syntaxTree.listen(
			"objectCreator",
			function(element){
				var startElement = ECMAScript6Parser.getStartElement(element), endElement = ECMAScript6Parser.getEndElement(element);
		
				// 保护create方法
				ECMAScript6Parser.protectMethod(
					startElement,
					endElement,
					element,
					// 重置start元素的文本内容
					"Rexjs.ECMAScript6ObjectCreator.create(" + startElement.textContent,
					// 重置end元素的文本内容
					endElement.textContent + ")"
				);
			}
		);
	};
	ECMAScript6ObjectCreator = new Class(ECMAScript6ObjectCreator, ECMAScript6Parser);
	
	ECMAScript6ObjectCreator.static({
		/**
		 * 创建一个 Object 对象，该对象将会合并 arguments 中所有参数中的子对象
		 * @param {Object} _rest - 子对象
		 */
		create : function(_rest){
			var object = {};
		
			add.apply(object, arguments);
			return object;
		}
	});
	
	return ECMAScript6ObjectCreator;
}(
	this.NamedProperties.prototype.add
);

this.ECMAScript6Object = function(deps, lint, resetTextContent, useCreate){
	/**
	 * 对象解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Object(syntaxTree){
		syntaxTree.listen(
			"object",
			function(element, index){
				// 获取分隔符元素
				var max, withSeparator = false, separated = false,
				
					statementElements = ECMAScript6Parser.querySelectorAll(element, ">statement");
				
				// 设置 max
				max = statementElements.length - 1;
				
				// 遍历数组
				forEach.call(
					statementElements,
					function(statementElement, i){
						var isLast = i === max;
						
						// 验证，如果是空属性
						if(
							lint(this, statementElement, isLast, index)
						){
							// 返回，不再解析
							return;
						}
						
						var isSeparator = false;
						
						// 进入 statementElement 语句，一定要在监听以下事件之前，因为可以利用下面的还原父节点，移除之后监听的事件
						this.down(statementElement);
				
						// 监听分隔属性事件
						this.one(
							"separateProperty",
							function(){
								separated = isSeparator = true;
								
								// 重置某些元素的文本内容
								resetTextContent(element, statementElement, withSeparator, i === 0, isLast);
							},
							index + 1
						);
						
						// 触发 property 事件
						this.dispatch("property", statementElement, index + 1);
						// 跳出 statementElement 语句
						this.up();
						
						// 记录状态
						withSeparator = isSeparator;
					},
					this
				);
				
				// 如果已经分隔过属性，触发 objectCreator 事件
				separated && this.dispatch("objectCreator", element, index);
			}
		);
	};
	ECMAScript6Object = new Class(ECMAScript6Object, ECMAScript6Parser);
	
	ECMAScript6Object.static(
		{ deps : deps }
	);

	return ECMAScript6Object;
}(
	// deps
	[ this.ECMAScript6Key, this.ECMAScript6Property, this.ECMAScript6ObjectCreator ],
	// lint
	function(syntaxTree, statementElement, isLast, index){
		switch(
			false
		){
			// 如果文本内容部是空的
			case ECMAScript6Parser.isEmpty(statementElement.textContent) :
				// 跳出判断
				return false;
			
			// 如果不是最后一个属性
			case isLast :
				// 触发空属性事件
				syntaxTree.dispatch("emptyProperty", statementElement, index);
				return true;
			
			// 默认，说明最后一个属性是空的
			default :
				return true;
		}
	},
	// resetTextContent
	function(braceElement, statementElement, withSeparator, isFirst, isLast){
		// 设置文本内容
		statementElement
			.previousElementSibling
			.textContent =
				(
					// 如果是第一个属性
					isFirst ?
						// 设置 start 元素的文本内容为空字符串
						"" :
						// 如果不是第一个属性
						(
							// 设置上一个逗号的文本内容
							withSeparator ? "," : "},"
						)
				);

		// 设置文本内容
		statementElement
			.nextElementSibling
			.textContent =
				(
					// 如果是最后一个属性
					isLast ?
						// 设置 end 元素文本内容为空字符串
						"" :
						// 如果不是最后一个属性，设置逗号文本内容
						", {"
				);
	},
	// useCreate
	function(syntaxTree, index){
		syntaxTree.once(
			"useCreate",
			function(element){
				var startElement = ECMAScript6Parser.getStartElement(element), endElement = ECMAScript6Parser.getEndElement(element);
		
				// 保护create方法
				ECMAScript6Parser.protectMethod(
					startElement,
					endElement,
					element,
					// 重置start元素的文本内容
					"Rexjs.ECMAScript6Object.create(" + startElement.textContent,
					// 重置end元素的文本内容
					endElement.textContent + ")"
				);
			},
			index
		);
	}
);

this.ECMAScript6ObjectExpression = function(deps){
	/**
	 * 对象表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ObjectExpression(syntaxTree){
		syntaxTree
			// 将 wrapper 事件委托给 objectExpression 事件
			.delegate(
				"wrapper",
				"objectExpression"
			)
			// 监听事件
			.listen(
				"objectExpression",
				function(element, index){					
					// 设置表达式名称
					element.setAttribute("expression", "object");
					// 表达式开始
					this.dispatch("expressionStart", element, index + 1);
					
					// 监听 beforeEnding 事件
					this.one(
						"beforeEnding",
						function(){
							// 表达式结束
							this.dispatch("expressionEnd", element, index + 1);
							// 触发object事件，从而解析对象主体
							this.dispatch("object", element, index);
						},
						index
					);
					
					// 监听逗号，因为逗号标识着下一个属性的开始
					this.listen(
						"comma",
						function(){
							this.dispatch("key", null, index + 1);
						},
						index
					);
					
					// 触发key事件，因为对象开始的时候没有逗号
					this.dispatch("key", null, index + 1);
				}
			);
	};
	ECMAScript6ObjectExpression = new Class(ECMAScript6ObjectExpression, ECMAScript6Parser);
	
	ECMAScript6ObjectExpression.static(
		{ deps : deps }
	);
	
	return ECMAScript6ObjectExpression;
}(
	// deps
	[ this.ECMAScript6Brace, this.ECMAScript6Object, this.ECMAScript6Wrapper ]
);

this.ECMAScript6ObjectDestructuring = function(ClosingTag, OBJECT_DESTRUCTURING_REGEXP, forEach, removeASI, getDeclaration, compile){
	function ECMAScript6ObjectDestructuring(syntaxTree){
		syntaxTree.add(
			new ClosingTag(
				"brace",
				OBJECT_DESTRUCTURING_REGEXP,
				"objectDestructuring"
			),
			true
		);
	};
	ECMAScript6ObjectDestructuring = new Class(ECMAScript6ObjectDestructuring, ECMAScript6Parser);
	
	ECMAScript6ObjectDestructuring.static({
		destruct : function(obj, target, boundThis, boundArguments){
			forEach(
				obj,
				function(accessor, name){
					accessor
						.value
						.set(
							target[name],
							boundThis,
							boundArguments
						);
				}
			);
			
			return target;
		}
	});
	
	ECMAScript6ObjectDestructuring.props({
		parse : function(){
			var ecmaScript6ObjectDestructuring = this;
			
			return this
				.syntaxTree
				.listen(
					"objectDestructuring",
					function(element, index){
						var subIndex = index + 1, supIndex = index - 1, variables = [],
						
							declarationElement = getDeclaration(element), withDeclaration = declarationElement !== null;
						
						// 移除所有ASI机制插入的分号
						removeASI(element);
						
						this.listen(
							"shorthandMethod",
							function(e){
								// 报错
								this.error(e, "解构赋值中不能使用简写函数。");
							},
							subIndex
						);
						
						this.listen(
							"shorthandName",
							function(propertyElement, i, n, p){
								// 阻止其他监听器执行
								p();
								
								variables.push(
									compile(propertyElement, "void 0")
								);
							},
							subIndex
						);
						
						this.listen(
							"defaultValue",
							function(operatorElement){
								var propertyElement = operatorElement.parentNode,
								
									defaultString = ECMAScript6Parser.extractTextBetween(operatorElement, propertyElement);
								
								propertyElement.removeChild(operatorElement);
								
								variables.push(
									compile(propertyElement, defaultString)
								);
							},
							subIndex
						);
						
						this.dispatch("object", element, index);
						
						ecmaScript6ObjectDestructuring.parseEnding(supIndex);
						
						if(
							variables.length === 0
						){
							if(
								withDeclaration
							){
								
							}
							
							return;
						}
						
						element
							.parentNode
							.insertBefore(
								SyntaxTree.createText(
									(withDeclaration ? variables.join(",") : "") + ";Rexjs.ECMAScript6ObjectDestructuring.destruct("
								),
								element	
							);
						
						this.one(
							"operator",
							function(el){
								el.textContent = ",";
							},
							supIndex,
							supIndex
						)
						
						this.one(
							"destructuringEnd",
							function(el){
								el.textContent = ', this, typeof arguments === "undefined" ? null : arguments)' + el.textContent;
							},
							supIndex,
							supIndex
						)
					}
				);
		},
		parseEnding : function(index){
			var sid, syntaxTree = this.syntaxTree;
			
			sid = syntaxTree.one(
				"semicolon",
				function(element){
					this.dispatch("destructuringEnd", element, index);
				},
				index,
				index
			);
			
			syntaxTree.one(
				"comma",
				function(element){
					this.unlisten(sid);
					
					this.dispatch("destructuringEnd", element, index);
				},
				index,
				index
			);
			
			return -1;
		}
	});
	
	return ECMAScript6ObjectDestructuring;
}(
	this.ClosingTag,
	// OBJECT_DESTRUCTURING_REGEXP
	/\}(?=\s*=)/,
	Rexjs.forEach,
	// removeASI
	function(element){
		// 查找所有自动插入的分号子元素
		forEach.call(
			ECMAScript6Parser.querySelectorAll(
				element,
				">semicolon[asi]"
			),
			function(semicolonElement){
				// 移除所有插入的分号
				element.removeChild(semicolonElement);
			}
		);
	},
	// getDeclaration
	function(element){
		var declarationElement = element.previousElementSibling;
		
		switch(
			true
		){
			case declarationElement === null :
				break;

			case !ECMAScript6Parser.tagOf(declarationElement, DeclarationTag) :
				break;
				
			case !ECMAScript6Parser.isEmptyBetween(declarationElement, element) :
				break;
			
			default :
				return declarationElement;
		}
		
		return null;
	},
	// compile
	function(propertyElement, value){
		var variable = propertyElement.textContent.trim();
		
		// 重置文本内容
		propertyElement.textContent = propertyElement.textContent + " : " +
			"new Rexjs.Accessor(" + 
				'"",' +
				"function(){ return " + value + "; }," +
				"function(){ " + variable + " = arguments[0] === void 0 ? this.get.apply(arguments[1], arguments[2]) : arguments[0]; }" +
			")";
			
		return variable;
	}
);

this.ObjectPackage = function(Package, contents){
	/**
	 * 对象解析器包
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ObjectPackage(syntaxTree){};
	ObjectPackage = new Class(ObjectPackage, Package);
	
	ObjectPackage.package(contents);
	return ObjectPackage;
}(
	this.Package,
	// contents
	[ this.ECMAScript6Object, this.ECMAScript6ObjectExpression, this.ECMAScript6ObjectDestructuring ]
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.ECMAScript6ExceptionParser,
	this.SyntaxTree,
	this.SyntaxTag,
	this.DeclarationTag,
	Array.prototype.forEach
));


// 数组解析相关
(function(ECMAScript6Parser){

this.ECMAScript6ArrayDestructuring = function(ClosingTag, ARRAY_DESTRUCTURING_REGEXP, toArray){
	/**
	 * 数组解构解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ArrayDestructuring(syntaxTree){
		syntaxTree.add(
			new ClosingTag(
				"bracket",
				ARRAY_DESTRUCTURING_REGEXP,
				"arrayDestructuring"
			),
			true
		);
	};
	ECMAScript6ArrayDestructuring = new Class(ECMAScript6ArrayDestructuring, ECMAScript6Parser);
	
	ECMAScript6ArrayDestructuring.props({
		parse : function(){
			///	<summary>
			///	解析数组的解构赋值。
			///	</summary>
			return -1;
			
			return this
				.syntaxTree
				.listen(
					"arrayDestructuring",
					function(element, index){
						var separatorElements = toArray(
							ECMAScript6Parser.querySelectorAll(element, ">comma")
						);
						
						separatorElements.push(
							ECMAScript6Parser.getEndElement(element)
						);
						
						separatorElements.forEach(function(){
							
						});
					}
				);
		}
	});
	
	return ECMAScript6ArrayDestructuring;
}(
	this.ClosingTag,
	// ARRAY_DESTRUCTURING_REGEXP
	/\](?=\s*=)/,
	Rexjs.toArray
);

}.call(
	this,
	this.ECMAScript6Parser
));


// 函数相关解析器
(function(ECMAScript6Parser, SyntaxTree, SyntaxTag, OpeningingTag, KeywordTag, forEach){

this.ECMAScript6DefaultArgument = function(){
	/**
	 * 函数默认参数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6DefaultArgument(syntaxTree){
		syntaxTree.listen(
			"defaultParameter",
			function(element){
				var name, parentNode = element.parentNode, statementElement = parentNode.cloneNode();
		
				// 获取名称
				name = ECMAScript6Parser.getTextBetween(
						parentNode,
						element
					)
					.trim();
					
				// 重新设置等号内文本
				element.textContent = "=" + name + "!== void 0 ?" + name + ":";
				
				// 添加 fragment 元素
				statementElement.appendChild(
					SyntaxTree.createElement("fragment", name)
				);
				
				// 将新创建的 statement 元素替换现在有的元素
				parentNode
					.parentNode
					.replaceChild(
						statementElement,
						parentNode
					);
				
				// 将现有的元素作为默认值参数添加
				this.appendChild(parentNode);
				
				// 添加分号
				this.appendChild(
					SyntaxTree.createElement("semicolon", ";")
				);
			}
		);
	};
	ECMAScript6DefaultArgument = new Class(ECMAScript6DefaultArgument, ECMAScript6Parser);
	
	return ECMAScript6DefaultArgument;
}();

this.ECMAScript6RestArgument = function(){
	/**
	 * 函数省略参数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6RestArgument(syntaxTree){
		syntaxTree.listen(
			"restParameter",
			function(element){
				var name, parentNode = element.parentNode;
				
				// 如果是最后一个元素
				if(
					element === parentNode.lastElementChild
				){
					// 报错
					this.error(element, "函数省略参数缺少参数名称。");
					return;
				}
				
				// 移除拓展符
				parentNode.removeChild(element);
				
				// 获取名称
				name = parentNode.textContent.trim();
				
				// 添加 statement 元素
				this.appendChild(
					SyntaxTree.createElement(
						"statement",
						name + "= Rexjs.toArray(arguments, " + parentNode.getAttribute("index") + ")"
					)
				);

				// 添加分号
				this.appendChild(
					SyntaxTree.createElement("semicolon", ";")
				);
			}
		);
	};
	ECMAScript6RestArgument = new Class(ECMAScript6RestArgument, ECMAScript6Parser);
	
	return ECMAScript6RestArgument;
}();

this.ECMAScript6Argument = function(deps, format){
	/**
	 * 函数参数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Argument(syntaxTree){
		syntaxTree.listen(
			"argument",
			function(element, index){
				var equalElement, elementChild = element.firstElementChild;
		
				switch(
					true
				){
					// 如果第一个元素不存在
					case elementChild === null :
						return;
					
					// 如果是拓展符
					case elementChild.tagName === "spread" :
						// 触发 restParameter 事件
						this.dispatch("restParameter", elementChild, index);
						// 重新获取第一个子元素，此元素一定存在，因为在 restParameter 事件中已得以确认
						elementChild = element.firstElementChild;
						break;
					
					// 如果能查询到等于号
					case !!(
						equalElement = ECMAScript6Parser.querySelector(element, '>operator[value="="]')
					) :
						// 触发 defaultParameter 事件
						this.dispatch("defaultParameter", equalElement, index);
						return;
				}
				
				// 格式化，目的是保持换行的一致性
				format(this, element, elementChild);
			}
		);
	};
	ECMAScript6Argument = new Class(ECMAScript6Argument, ECMAScript6Parser);
	
	ECMAScript6Argument.static(
		{ deps : deps }
	);
	
	return ECMAScript6Argument;
}(
	// deps
	[ this.ECMAScript6DefaultArgument, this.ECMAScript6RestArgument ],
	// format
	function(syntaxTree, element, elementChild){
		// 如果不是最后一个子元素
		if(
			elementChild !== element.lastElementChild
		){
			// 报错
			syntaxTree.error(element.lastElementChild, "格式不正确的函数参数。");
			// 返回
			return;
		}
		
		var textContent;
		
		// 先移除此参数名称节点
		element.removeChild(elementChild);
		
		// 记录空白文本
		textContent = element.textContent;
		// 清除子节点
		element.textContent = "";
		
		// 再将名称节点添加回来
		element.appendChild(elementChild);
		// 添加空白文本至当前父节点下
		syntaxTree.appendText(textContent);
	}
);

this.ECMAScript6FunctionContext = function(OPENING_BRACE_WITH_STRING_REGEXP, deps, preventThis, appendDefaults, rexMode){
	/**
	 * 函数上下文（包括函数参数及主体部分）解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6FunctionContext(syntaxTree){
		syntaxTree
			.add(
				new OpeningingTag(
					"brace",
					OPENING_BRACE_WITH_STRING_REGEXP,
					"openingBraceWithString"
				),
				true
			)
			// 将事件 wrapper 委托给 functionContext
			.delegate(
				"wrapper",
				"functionContext"
			)
			// 将事件 openingBrace 委托给 openingBraceWithString
			.delegate(
				"openingBrace",
				"openingBraceWithString"
			)
			// 监听事件
			.listen(
				"functionContext",
				function(element, index){
					var rexModeEnabled = false, parentIndex = index - 1;
					
					// 拦截 this 事件
					preventThis(this, parentIndex);
					
					// 监听起始大括号
					this.one(
						"openingBrace",
						function(e, i, n, p){
							// 阻止其他监听器执行
							p();
							
							// 添加默认参数
							appendDefaults(this, element, index);
						},
						index,
						parentIndex
					);
					
					// 监听伴随着字符串的起始大括号
					this.one(
						"openingBraceWithString",
						function(e, i, n, p){
							var syntaxTree = this;
							
							// 阻止其他监听器执行，因为默认行为会触发 openingBrace 事件，这是不希望的
							p();
							
							// 解析 rex 模式
							rexMode(
								this,
								ECMAScript6Parser.getStartElement(e),
								// 回调函数
								function(enabled){
									if(
										enabled
									){
										// 开启rex模式
										syntaxTree.enableRexMode();
										
										rexModeEnabled = true;
									}
									
									// 添加默认参数
									appendDefaults(syntaxTree, element, index);
								},
								i
							);
						},
						index,
						parentIndex
					);
					
					// 监听结束大括号
					this.one(
						"closingBrace",
						function(e, i, n, p){
							// 阻止其他事件执行
							p();
							
							// 如果 rex 模式是在当前函数开启的，则关闭 rex 模式
							rexModeEnabled && this.disableRexMode();
						},
						index,
						parentIndex
					);
				}
			);
		
		// 解析 rex 模式
		rexMode(
			syntaxTree,
			syntaxTree.global,
			function(enabled){
				// 开启rex模式
				enabled && syntaxTree.enableRexMode();
			},
			syntaxTree.index - 1
		);
	};
	ECMAScript6FunctionContext = new Class(ECMAScript6FunctionContext, ECMAScript6Parser);
	
	ECMAScript6FunctionContext.static(
		{ deps : deps }
	);
	
	return ECMAScript6FunctionContext;
}(
	// OPENING_BRACE_WITH_STRING_REGEXP
	/\{(?=\s*['"])/,
	// deps
	[ this.ECMAScript6Parenthesis, this.ECMAScript6Brace, this.ECMAScript6Wrapper, this.ECMAScript6Argument ],
	// preventThis
	function(syntaxTree, index){
		// 监听 this
		syntaxTree.listen(
			"this",
			function(e, i, n, p){
				// 阻止其他监听器执行，因为 this 只有在当前域才有效果
				p();
			},
			0,
			index
		);
	},
	// appendDefaults
	function(syntaxTree, parenthesisElement, index){
		// 遍历数组
		forEach.call(
			ECMAScript6Parser.querySelectorAll(parenthesisElement, ">statement"),
			function(element, i){
				// 记录索引
				element.setAttribute("index", i);
				// 触发 argument 事件
				syntaxTree.dispatch("argument", element, index);
			}
		);
	},
	// rexMode
	function(syntaxTree, targetElement, callback, index){
		// 如果 rex 模式已经开启
		if(
			syntaxTree.rexModeEnabled
		){
			callback(false);
			return;
		}
		
		// 监听第一个语句的分号
		syntaxTree.one(
			"semicolon",
			function(element){
				var text, stringElement, statementElement = element.previousElementSibling;
				
				switch(
					true
				){
					// 确认语法标签的存在性
					case statementElement === null :
						break; 
					
					// 确认字符串标签的存在性
					case (stringElement = statementElement.firstElementChild) === null :
						break;
					
					// 确认标签名
					case stringElement.tagName !== "string" :
						break;
					
					// 确认后面没有其他元素
					case stringElement.nextElementSibling !== null :
						break;
						
					// 检测 "use strict"
					case (
							text = stringElement.textContent.substring(1, stringElement.textContent.length - 1)
						)
						.indexOf(
							"use strict"
						) !== 0 :
						break;
					
					// 默认
					default :
						// 重置文本内容
						stringElement.textContent = '"use strict"';
					
						// 执行回调
						callback(text === "use strict -rex");
						return;
				}
				
				var parentNode = element.parentNode;
				
				// 移除语句元素
				parentNode.removeChild(statementElement);
				// 移除分号
				parentNode.removeChild(element);
				
				// 执行回调
				callback(false);
				
				// 再将语句元素添加回来
				parentNode.appendChild(statementElement);
				// 再将分号元素添加回来
				parentNode.appendChild(element);
			},
			index
		);
	}
);

this.ECMAScript6Function = function(FUNCTION_REGEXP, deps){
	/**
	 * 函数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Function(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"function",
					FUNCTION_REGEXP
				)
			)
			// 监听事件
			.listen(
				"function",
				function(element, index){
					// 触发 expressionStart 事件，表示表达式已经开始
					this.dispatch("expressionStart", element, index);
					
					// 监听起始小括号
					this.one(
						"openingParenthesis",
						function(e, i, n, p){
							// 触发 functionContext 事件
							this.dispatch("functionContext", e, i);
							
							// 监听结束大括号
							this.one(
								"closingBrace",
								function(e, i, n, p){
									// 触发 expressionEnd 事件，表示表达式到此结束
									this.dispatch("expressionEnd", element, index);
								},
								index + 1,
								index
							);
						},
						index + 1
					);
				}
			);
	};
	ECMAScript6Function = new Class(ECMAScript6Function, ECMAScript6Parser);
	
	ECMAScript6Function.static(
		{ deps : deps }
	);

	return ECMAScript6Function;
}(
	// FUNCTION_REGEXP
	/\bfunction\b/,
	// deps
	[ this.ECMAScript6FunctionContext ]
);

this.ECMAScript6ArrowFunctionWithBrace = function(ARROW_REGEXP, deps, insertFunction){
	/**
	 * 带有大括号的箭头函数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ArrowFunctionWithBrace(syntaxTree){
		syntaxTree
			// 监听标签
			.add(
				new SyntaxTag(
					"arrow",
					ARROW_REGEXP,
					"arrowFunctionWithBrace"
				),
				true
			)
			// 监听事件
			.listen(
				"arrowFunctionWithBrace",
				function(element, index){
					var functionElement;
					
					// 插入 function 关键字
					functionElement = insertFunction(element, this, index);
					
					// 监听结束大括号
					this.one(
						"closingBrace",
						function(braceElement){
							// 给 functionElement 加保护
							ECMAScript6Parser.protectMethod(
								functionElement,
								ECMAScript6Parser.getEndElement(braceElement),
								functionElement,
								null,
								// 并修改end的文本内容
								"}.bind(this)"
							);
						},
						index + 1
					);
				}
			);
	};
	ECMAScript6ArrowFunctionWithBrace = new Class(ECMAScript6ArrowFunctionWithBrace, ECMAScript6Parser);
	
	ECMAScript6ArrowFunctionWithBrace.static(
		{ deps : deps }
	);
	
	return ECMAScript6ArrowFunctionWithBrace;
}(
	// ARROW_REGEXP
	/=>(?=\s*\{)/,
	// deps
	[ this.ECMAScript6FunctionContext ],
	// insertFunction
	function(element, syntaxTree, index){
		var previousElementSibling = element.previousElementSibling;
		
		// 如果元素不存在
		if(
			previousElementSibling === null
		){
			// 报错
			syntaxTree.error(element, "不完整的箭头函数表达式。");
			return null;
		}
		
		var parenthesisElement, parentNode = element.parentNode, functionElement = SyntaxTree.createElement("function", "function");
		
		// 如果没有小括号
		if(
			previousElementSibling.tagName !== "parenthesis"
		){			
			// 创建 start 和 end 标签
			var startElement = SyntaxTree.createElement("start", "("), endElement = SyntaxTree.createElement("end", ")");
			
			// 创建小括号元素
			parenthesisElement = SyntaxTree.createElement("parenthesis");
			
			// 将小括号添加到父节点中
			parentNode.replaceChild(parenthesisElement, previousElementSibling);
			
			// 添加 start 元素
			parenthesisElement.appendChild(startElement);
			// 添加参数名
			parenthesisElement.appendChild(previousElementSibling);
			// 添加 end 元素
			parenthesisElement.appendChild(endElement);
		}
		else {
			// 设置小括号
			parenthesisElement = previousElementSibling;
		}
		
		// 插入 function 元素
		parentNode.insertBefore(functionElement, parenthesisElement);
		// 移除箭头元素
		parentNode.removeChild(element);
		
		// 触发 functionContext 事件，目的是解析函数参数
		syntaxTree.dispatch("functionContext", parenthesisElement, index + 1);
		return functionElement;
	}
);

this.ECMAScript6ArrowFunction = function(ARROW_FUNCTION_WITHOUT_BRACE, deps){
	/**
	 * 没有大括号的箭头函数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6ArrowFunction(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new SyntaxTag(
					"arrow",
					ARROW_FUNCTION_WITHOUT_BRACE
				),
				true
			)
			// 将事件 arrowFunctionWithBrace 委托给 arrow
			.delegate(
				"arrowFunctionWithBrace",
				"arrow"
			)
			// 监听事件
			.listen(
				"arrow",
				function(element, index, next){
					var braceElement;
					
					// 先执行下一个处理函数，去触发 arrow 事件
					next();
					
					// 添加大括号
					this.appendOpening("brace", "{", "openingBrace");
					// 添加 return 和起始小括号
					this.appendText("return (");
					
					// 监听子句结束事件
					this.one(
						"beforeClauseEnding",
						function(){
							// 添加结束小括号和分号
							this.appendText(");");
							// 添加结束大括号并触发 closingBrace 事件
							this.appendClosing("brace", "}", "closingBrace");
							// 这里要触发父级的 beforeClauseEnding，因为本来就是插入了一层 brace，从而拦截了父级的事件，所以 index - 1
							this.dispatch("beforeClauseEnding", element, index - 1);
						},
						index + 2
					);
				}
			);
	};
	ECMAScript6ArrowFunction = new Class(ECMAScript6ArrowFunction, ECMAScript6Parser);
	
	ECMAScript6ArrowFunction.static(
		{ deps : deps }
	);
	
	return ECMAScript6ArrowFunction;
}(
	// ARROW_FUNCTION_WITHOUT_BRACE
	/=>(?!\s*\{)/,
	// deps
	[ this.ECMAScript6ArrowFunctionWithBrace ]
);

this.FunctionPackage = function(Package, contents){
	/**
	 * 函数解析器包
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function FunctionPackage(syntaxTree){};
	FunctionPackage = new Class(FunctionPackage, Package);
	
	FunctionPackage.package(contents);
	return FunctionPackage;
}(
	this.Package,
	// contents
	[ this.ECMAScript6Function, this.ECMAScript6ArrowFunction ]
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.SyntaxTag,
	this.OpeningingTag,
	this.KeywordTag,
	Array.prototype.forEach
));


// 申明相关解析器
(function(ECMAScript6Parser, SyntaxTree, DeclarationTag){

this.ECMAScript6Declaration = function(DECLARATION_REGEXP){
	/**
	 * 申明关键字解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Declaration(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new DeclarationTag(
					"declaration",
					DECLARATION_REGEXP
				)
			)
			// 监听事件
			.listen(
				"declaration",
				function(element){
					element.textContent = "var";
				}
			);
	};
	ECMAScript6Declaration = new Class(ECMAScript6Declaration, ECMAScript6Parser);
	
	ECMAScript6Declaration.static({
		/**
		 * 在指定节点之前尽可能的自动定义并插入变量名
		 * @param {String} name - 变量名
		 * @param {Node} node - 指定的节点
		 */
		autoInsert : function(name, node){
			// 判断在指定节点前面是否满足插入变量名的条件
			if(
				!this.insertable(node)
			){
				return false;
			}
			
			// 在指定节点之前自动定义并插入变量名。
			this.insert(name, node);
			return true;
		},
		/**
		 * 在指定节点之前定义并插入变量名
		 * @param {String} name - 变量名
		 * @param {Node} node - 指定的节点
		 */
		insert : function(name, node){
			///	<summary>
			///	在指定节点之前自动定义并插入变量名。
			///	</summary>
			///	<param name="name" type="String">变量名。</param>
			///	<param name="node" type="Node">指定的节点。</param>
			
			// 如果名称为空
			if(
				ECMAScript6Parser.isEmpty(name)
			){
				// 报错
				SyntaxTree
					.current
					.error(
						node,
						"在此处应该定义变量名。"
					);
					
				return this;
			}
			
			var parentNode = node.parentNode, declarationElement = SyntaxTree.createElement("declaration")	;
			
			// ps：在这里分步操作，目的是：1.语句明确；2.export语句的需要，如export var a = 1;
			
			// 设置申明元素的文本内容
			declarationElement.textContent = "var";
			
			// 插入申明文明
			parentNode.insertBefore(
				declarationElement,
				node
			);
			
			// 插入名称
			parentNode.insertBefore(
				SyntaxTree.createText(" " + name + " "),
				node
			);
			
			// 插入等于号运算符
			parentNode.insertBefore(
				SyntaxTree.createOperatorElement("="),
				node
			);
				
			return this;
		},
		/**
		 * 判断在指定节点前面是否满足插入变量名的条件
		 * @param {Node} node - 指定的节点
		 */
		insertable : function(node){
			return !ECMAScript6Parser.withOperator(node);
		}
	});
	
	return ECMAScript6Declaration;
}(
	// DECLARATION_REGEXP
	/\b(?:var|let|const)\b/
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.DeclarationTag
));


// 面向对象相关解析器
(function(
	ECMAScript6Parser, ECMAScript6ExceptionParser, ECMAScript6Expression, ECMAScript6Declaration,
	SyntaxTree, SyntaxTag, KeywordTag,
	NamedProperty, NamedProperties, Function, AnonymousClass,
	ProtectedListeners,
	toArray
){

this.StaticProperties = function(){
	/**
	 * 静态属性集合类，一般用于类的静态属性声明
	 */
	function StaticProperties(){
		this.add.apply(this, arguments);
	};
	StaticProperties = new Class(StaticProperties, NamedProperties);
	
	return StaticProperties;
}();

this.ECMAScript6Extends = function(EXTENDS_REGEXP){
	/**
	 * extends 关键字解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Extends(syntaxTree){
		syntaxTree.add(
			new KeywordTag(
				"extends",
				EXTENDS_REGEXP
			)
		);
		
		// 捕获 extends 事件，报错
		this.catch("extends", "extends关键字应该存在于class表达式中。");
	};
	ECMAScript6Extends = new Class(ECMAScript6Extends, ECMAScript6ExceptionParser);
	
	return ECMAScript6Extends;
}(
	// EXTENDS_REGEXP
	/\bextends\b/
);

this.ECMAScript6Super = function(KeywordTag, SUPER_REGEXP){
	/**
	 * super 关键字解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Super(syntaxTree){
		syntaxTree.add(
			new KeywordTag(
				"super",
				SUPER_REGEXP
			)
		);
		
		// 捕获 super 事件，报错
		this.catch("super", "super关键字应该使用在非rex模式下的子类构造函数中，且在同一个构造函数中只能使用一次。");
	};
	ECMAScript6Super = new Class(ECMAScript6Super, ECMAScript6ExceptionParser);
	
	return ECMAScript6Super;
}(
	this.KeywordTag,
	// SUPER_REGEXP
	/\bsuper\b/
);

this.ECMAScript6Static = function(STATIC_REGEXP, STATIC_WITH_PARENTHESIS_REGEXP){
	/**
	 * static 关键字解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Static(syntaxTree){
		var description = "static关键字应该与类的属性一起使用。";
		
		syntaxTree
			.add(
				new SyntaxTag(
					"static-with-parenthesis",
					STATIC_WITH_PARENTHESIS_REGEXP,
					"staticWithParenthesis"
				)
			)
			.add(
				new KeywordTag(
					"static",
					STATIC_REGEXP,
					"staticKeyword"
				)
			);
		
		// 捕获 staticWithParenthesis 事件，报错
		this.catch("staticWithParenthesis", description);
		// 捕获 static 事件，报错
		this.catch("staticKeyword", description);
	};
	ECMAScript6Static = new Class(ECMAScript6Static, ECMAScript6ExceptionParser);
	
	return ECMAScript6Static;
}(
	// STATIC_REGEXP
	/\bstatic\b/,
	// STATIC_WITH_PARENTHESIS_REGEXP
	/\bstatic\b(?=\s*\()/
);

this.ECMAScript6StaticProperty = function(){
	/**
	 * 静态属性解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6StaticProperty(syntaxTree){
		var lastElement = null, lastEndText = null, withComputed = false;
		
		syntaxTree.listen(
			"staticProperty",
			function(element, index){
				var startText, endText,
				
					childNodes = element.childNodes, computed = element.hasAttribute("computed");
				
				// 创建 start 文本
				startText = SyntaxTree.createText(
					"new Rexjs.StaticProperties(" + (computed ? "" : "{")
				);
				
				// 创建 end 文本
				endText = SyntaxTree.createText(
					(computed ? "" : "}") + ")"
				);
				
				switch(
					true
				){
					// 如果上一个属性元素不存在
					case lastElement === null :
						break;
					
					// 或者该元素的下一个元素不是当前元素
					case element !== ECMAScript6Parser.querySelector(lastElement, "~" + element.tagName) :
						break;
					
					// 默认：则说明，lastElement 与 element 是两个紧邻的静态属性
					default :
						// 重置 startText 文本节点的文本内容，如果是计算式 或 上一个不是计算式，则为起始大括号，否则是空字符串
						startText.textContent = computed || !withComputed ? "" : "{";
						// 重置 lastEndText 文本节点的文本内容，如果是计算式 或 上一个不是计算式，则为结束大括号，否则是空字符串
						lastEndText.textContent = computed && !withComputed ? "}" : "";
						break;
				}
				
				// 触发分隔属性事件，目的是将静态属性和非静态属性分隔开
				this.dispatch("separateProperty", element, index, "");
				
				// 插入 start 文本
				element[childNodes.length > 0 ? "insertBefore" : "appendChild"](startText, childNodes[0]);
				// 添加end文本
				element.appendChild(endText);
				
				// 记录当前状态
				withComputed = computed;
				lastElement = element;
				lastEndText = endText;
			}
		);
	};
	ECMAScript6StaticProperty = new Class(ECMAScript6StaticProperty, ECMAScript6Parser);
	
	return ECMAScript6StaticProperty;
}();

this.ECMAScript6Assign = function(ASSIGN_REGEXP, deps){
	/**
	 * assign 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Assign(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"assign",
					ASSIGN_REGEXP
				)
			)
			// 监听事件
			.listen(
				"assign",
				function(element, index){
					// 如果与 new 操作符在一起
					if(
						ECMAScript6Parser.withOperator(element, "new")
					){
						// 报错
						this.error(element, "assign表达式并不是一个构造函数。");
						return;
					}
					
					// 触发表达式起始事件
					this.dispatch("expressionStart", element, index);
					
					// 监听起始大括号
					this.one(
						"openingBrace",
						function(braceElement, i, n, p){
							// 如果与 assign 关键字之间存在其他字符
							if(
								element.nextElementSibling !== braceElement
							){
								// 报错
								this.error(element, "assign关键字与其成员之间不应该存在字符。");
								return;
							}
							
							// 阻止其他监听器执行
							p();
							
							// 触发 member 事件
							this.dispatch("member", braceElement, i);
						},
						index + 1
					);
					
					// 监听结束大括号
					this.one(
						"closingBrace",
						function(e, i, n, p){
							// 重置文本内容
							element.textContent = "this.assign(";
							
							// 添加结束小括号
							this.appendText(")");
							// 阻止其他监听器执行
							p();
							// 触发表达式结束事件
							this.dispatch("expressionEnd", element, index);
						},
						index + 1
					);
				}
			);
			
		
		// 忽略 assign 标签
		syntaxTree
			.tags
			.ignore(
				"assign"
			);
	};
	ECMAScript6Assign = new Class(ECMAScript6Assign, ECMAScript6Parser);
	
	ECMAScript6Assign.static(
		{ deps : deps }
	);
	
	return ECMAScript6Assign;
}(
	// ASSIGN_REGEXP
	/\bassign\b/,
	// deps
	[ this.ECMAScript6Member ]
);

this.ECMAScript6Constructor = function(CONSTRUCTOR_REGEXP, deps, lint, assign, sp){
	/**
	 * 构造函数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Constructor(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new SyntaxTag(
					"fragment",
					CONSTRUCTOR_REGEXP,
					"constructorFragment"
				)
			)
			// 监听事件
			.listen(
				"constructor",
				function(element, index){
					switch(
						true
					){
						// 如果验证失败
						case !lint(this, element, index) :
							return;
						
						// 如果 rex 模式已经开启
						case this.rexModeEnabled :
							// 解析 assign 表达式
							assign(this, index);
							return;
						
						// rex 模式没有开启，而且还有父类
						case element.hasAttribute("super") :
							break;

						// 默认：没有开启 rex 模式也没有父类
						default :
							return;
					}
					
					// 监听 super 关键字
					sp(this, element, index);
				}
			);
	};
	ECMAScript6Constructor = new Class(ECMAScript6Constructor, ECMAScript6Parser);
	
	ECMAScript6Constructor.static(
		{ deps : deps }
	);
	
	return ECMAScript6Constructor;
}(
	// CONSTRUCTOR_REGEXP
	/\bconstructor\b/,
	// deps
	[ this.ECMAScript6Assign ],
	// lint
	function(syntaxTree, element, index){
		var firstElementChild = element.parentNode.firstElementChild;

		switch(
			true
		){
			case !ECMAScript6Expression.in("class", index - 2) :
				return false; 
			
			case element === firstElementChild :
				break;
			
			case firstElementChild.tagName === "static" :
				return false;
				
			default :
				// 报错
				syntaxTree.error(element, "构造函数之前不应该有任何修饰符。");
				return false;
		}

		// 监听 beforeEnding 事件
		syntaxTree.listen(
			"beforeEnding",
			function(){
				switch(
					false
				){
					// 匹配简写模式
					case ECMAScript6Parser.querySelector(
						element,
						"+ parenthesis + brace:last-child"
					) === null :
						return;

					// 匹配等号赋值模式
					case ECMAScript6Parser.querySelector(
						element,
						'+ operator[value="="] + function + parenthesis + brace:last-child'
					) === null :
						return;
				}
				
				// 报错
				this.error(element, "构造函数应该以函数的形式进行定义。");
			},
			index
		);
		
		return true;
	},
	// assign
	function(syntaxTree, index){
		var tags = syntaxTree.tags;
		
		// 取消 assign 标签的忽略
		tags.unignore("assign");
		
		// 监听 beforeClauseEnding 事件
		syntaxTree.listen(
			"beforeClauseEnding",
			function(){
				// 继续忽略 assign 标签
				tags.ignore("assign");
			},
			index
		);
	},
	// sp
	function(syntaxTree, element, index){
		var bid, tid, name = element.getAttribute("name");
					
		// 监听 beforeClauseEnding 事件，只要此事件没有被取消，就会报错
		bid = syntaxTree.one(
			"beforeClauseEnding",
			function(e, i, n){
				n();
				
				this.error(element, "应该在构造函数内调用super关键字。");
			},
			index
		);
		
		// 监听函数上下文
		syntaxTree.one(
			"functionContext",
			function(e, i, n){
				// 先执行其他监听器，因为这里会拦截 this
				n();
				
				// 监听 this 事件，只要此事件没有被取消，就会报错
				tid = this.one(
					"this",
					function(e){
						// 报错
						this.error(e, "this关键字应该在super关键字之后调用。");
					}
				);
			},
			index + 1
		);
		
		// 监听 super 关键字
		syntaxTree.one(
			"super",
			function(e, i, n, p){
				// 阻止其他监听器执行
				p();
				// 取消监听，防止报错
				this.unlisten(bid);
				// 捕获 this，如果有则报错
				this.unlisten(tid);
				
				// 重新设置文本内容
				e.textContent = name + ".getSuperClass().bind(this)";
			},
			0,
			index
		);
	}
);

this.ECMAScript6ConstructorString = function(CONSTRUCTOR_STRING_REGEXP, deps){
	function ECMAScript6ConstructorString(syntaxTree){
		var tags = syntaxTree.tags;
		
		syntaxTree
			.add(
				new SyntaxTag(
					"string",
					CONSTRUCTOR_STRING_REGEXP,
					"constructorString"
				),
				true
			)
			.delegate(
				"string",
				"constructorString"
			)
			.listen(
				"constructorString",
				function(element, index, next, prevent){
					if(
						tags.constructor.ignored
					){
						return;
					}
					
					prevent();
					this.dispatch("constructor", element, index);
				}
			);
	};
	ECMAScript6ConstructorString = new Class(ECMAScript6ConstructorString, ECMAScript6Parser);
	
	ECMAScript6ConstructorString.static(
		{ deps : deps }
	);
	
	return ECMAScript6ConstructorString;
}(
	// CONSTRUCTOR_STRING_REGEXP
	/"constructor"|'constructor'/,
	// deps
	[ this.ECMAScript6Constructor ]
);

this.ECMAScript6OOP = function(COMMA_ATTRIBUTE, deps, plainedKey, objectExpression, beforeEnding, colon, emptyProperty, property, semicolon, comma){
	/**
	 * 面向对象解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6OOP(syntaxTree){
		syntaxTree.listen(
			"oop",
			function(element, index){
				var parentNode = element.parentNode;
				
				// 触发表达式起始事件
				this.dispatch("expressionStart", element, index);
				
				// 监听起始大括号事件
				this.one(
					"openingBrace",
					function(e, i, n, p){
						var subIndex = i + 1;
						
						// 阻止其他监听执行
						p();
						// 解析纯文本代码
						plainedKey(this, subIndex);
						// 解析对象表达式
						objectExpression(this, e, i);
						// 解析 beforeEnding 事件，防止分号的出现会导致表达式报错
						beforeEnding(this, subIndex);
						// 解析冒号
						colon(this, subIndex);
						// 解析空属性
						emptyProperty(this, i);
						// 解析属性
						property(this, i);
						// 解析分号
						semicolon(this, i);
						// 解析逗号
						comma(this, i);
					},
					index + 1
				);
				
				// 监听结束大括号事件
				this.one(
					"closingBrace",
					function(){
						var openingText = SyntaxTree.createText("("), closingText = SyntaxTree.createText(")");
						
						// 添加起始小括号
						parentNode.insertBefore(openingText, element);
						// 添加结束小括号
						parentNode.appendChild(closingText);
						// 保护方法
						ECMAScript6Parser.protectMethod(element, closingText, element);
						// 触发表达式结束事件
						this.dispatch("expressionEnd", element, index);
					},
					index + 1
				);
			}
		);
	};
	ECMAScript6OOP = new Class(ECMAScript6OOP, ECMAScript6Parser);
	
	ECMAScript6OOP.static(
		{ deps : deps }
	);
	
	return ECMAScript6OOP;
}(
	// COMMA_ATTRIBUTE
	"semicolon",
	// deps
	[ this.ECMAScript6ObjectExpression ],
	// plainedKey
	function(syntaxTree, index){
		// 监听 plainedKey 事件
		syntaxTree.listen(
			"plainedKey",
			function(){
				// 添加中断纯文本的条件：分号
				this.plainText
					.push(
						"semicolon"
					);
			},
			index
		);
	},
	// objectExpression
	function(syntaxTree, braceElement, index){
		// 监听表达式开始事件，目的是拦截对象表达式，启用 ASI 机制
		syntaxTree.one(
			"expressionStart",
			function(e, i, n, p){
				// 阻止其他监听器执行
				p();
			},
			index + 1
		);
		
		// 触发 objectExpression 事件
		syntaxTree.dispatch("objectExpression", braceElement, index);
	},
	// beforeEnding
	function(syntaxTree, index){
		syntaxTree.listen(
			"beforeEnding",
			function(element, i, next, prevent){
				// 阻止其他监听器执行
				prevent();
			},
			index
		);
	},
	// colon
	function(syntaxTree, index){
		syntaxTree.listen(
			"colon",
			function(element){
				// 如果本来就是冒号，报错
				this.error(element, "不应该用冒号对类的属性进行赋值。");
			},
			index
		);
	},
	// emptyProperty
	function(syntaxTree, index){
		syntaxTree.listen(
			"emptyProperty",
			function(element, e, next, prevent){
				// 阻止其他监听器执行，防止报错
				prevent();
			},
			index
		);
	},
	// property
	function(syntaxTree, index){
		syntaxTree.listen(
			"property",
			function(element, i, next, prevent){
				var elementChild = element.firstElementChild;
				
				switch(
					true
				){
					// 如果没有子元素
					case elementChild === null :
						// 空属性，阻止其他监听器执行
						prevent();
						// 返回
						return;
					
					// 如果没有开启 rex 模式
					case !this.rexModeEnabled :
						// 监听简写名称
						this.one(
							"shorthandName",
							function(){
								// 报错
								this.error(element.parentNode, "不应该对类使用简写属性。");
							},
							index
						);
						return;
				}
				
				// 监听默认值
				this.one(
					"defaultValue",
					function(equalElement, i, n, p){
						// 阻止其他监听器的执行
						p();
						
						// 将等于号改为冒号
						equalElement.textContent = ":";
					},
					index
				);
			},
			index
		);
	},
	// semicolon
	function(syntaxTree, index){
		syntaxTree.listen(
			"semicolon",
			function(element){
				var parentNode = element.parentNode, previousElementSibling = element.previousElementSibling;
				
				// 触发逗号事件，目的是为了对象解析而触发 key 事件
				this.dispatch("comma", element, index);
				
				switch(
					true
				){
					// 如果上一个元素不存在
					case previousElementSibling === null :
						break;
					
					// 如果上一个元素是 statement 元素，而且该元素没有其他元素节点，则说明是空语句
					case previousElementSibling.tagName === "statement" && previousElementSibling.firstElementChild === null :
						// 替换空语句
						parentNode.replaceChild(
							SyntaxTree.createText(
								previousElementSibling.textContent
							),
							previousElementSibling
						);
						break;
					
					// 默认
					default :
						// 将文本修改为逗号
						element.textContent = ",";
						return;
				}

				// 移除此分号
				parentNode.removeChild(element);
			},
			index
		);
	},
	// comma
	function(syntaxTree, index){
		syntaxTree.listen(
			"comma",
			function(element){
				// 如果是分号
				if(
					element.tagName === "semicolon"
				){
					// 返回
					return;
				}
				
				// 进入这里，说明本来插入的就是逗号，报错
				this.error(element, "此处的属性分隔符应该是分号而不是逗号");
			},
			index
		);
	}
);

this.ECMAScript6Class = function(
	// 类
	Rexjs, Constructor, StaticProperties,
	// 常量
	CLASS_REGEXP,
	// 非函数参数
	deps,
	// 早已存在的函数
	getOwnPropertyDescriptor,
	// 静态属性中使用到的函数
	getConstructor,
	// 构造函数中使用到的函数
	getClassName, insertComma, compile, constructor, key, defaultValue, property, objectCreator
){
	/**
	 * 类解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6Class(syntaxTree){
		var ecmaScript6Class = this;
		
		syntaxTree
			// 添加 class 标签
			.add(
				new KeywordTag(
					"class",
					CLASS_REGEXP
				)
			)
			// 监听事件
			.listen(
				"class",
				function(element, index){
					var id, extendsElement;
					
					// 触发 oop 事件
					this.dispatch("oop", element, index);
					
					// 设置文本内容
					element.textContent = "Rexjs.ECMAScript6Class.create";
					
					// 监听 extends 关键字
					id = this.one(
						"extends",
						function(e, i, n, p){
							// 阻止其他监听器执行
							p();
							
							// 记录元素
							extendsElement = e;
						},
						index
					);
					
					// 监听类的大括号
					this.one(
						"openingBrace",
						function(braceElement, i, n){
							var name, commaText, subIndex = i + 1;
							
							// 取消 extends 关键字的监听
							this.unlisten(id);
							
							// 存储类名
							name = getClassName(this, element);
							
							// 监听 insertComma 事件
							this.one(
								"insertComma",
								function(t){
									// 记录逗号
									commaText = t;
								},
								i
							);
							
							// 解析类大括号的结束标记
							this.one(
								"closingBrace",
								function(e, i){
									// 插入逗号
									insertComma(this, braceElement, i);
									// 编译
									compile(element, extendsElement, commaText, name, this.rexModeEnabled);
									// 尽可能的自动定义并插入变量名
									ECMAScript6Declaration.autoInsert(name, element);
								},
								i
							);
							
							// 监听构造函数
							constructor(this, extendsElement, name, subIndex);
							// 监听属性键
							key(this, subIndex);
							// 监听默认值
							defaultValue(this, subIndex);
							// 监听属性
							property(this, subIndex);
							// 先执行下一个处理函数
							n();
							// 监听属性创建
							objectCreator(this, i);
						},
						index + 1
					);
				}
			);
	};
	ECMAScript6Class = new Class(ECMAScript6Class, ECMAScript6Parser);
	
	ECMAScript6Class.static(
		{ deps : deps }
	);
	
	ECMAScript6Class.static({
		/**
		 * 根据参数生成并返回一个类
		 * @param {String} name - 构造函数名称
		 * @param {Class} _SuperClass - 需要继承的父类
		 * @param {Boolean} _rexMode - 是否属于 rex 模式
		 * @param {NamedProperties, Object} _rest - 类的属性集合
		 */
		create : function(name, _SuperClass, _rexMode, _rest){
			var CreatedClass, constructor = null, properties = new NamedProperties(), staticProperties = new NamedProperties();
			
			toArray(
				arguments,
				3
			)
			.forEach(function(props){
				switch(
					true
				){
					// 如果是静态属性
					case props instanceof StaticProperties :
						staticProperties.add(props);
						return;

					case props instanceof NamedProperty :
						break;

					// 如果属性里没有 constructor 属性
					case !props.hasOwnProperty("constructor") :
						break;

					// 默认
					default :
						// 记录 constructor
						constructor = props.constructor;
						// 删除 constructor 属性
						delete props.constructor;
						break;
				}
				
				// 添加属性
				properties.add(props);
			});
			
			// 如果开启了 rex 模式
			if(
				_rexMode
			){
				// 创建类
				CreatedClass = new Class(constructor || AnonymousClass, _SuperClass, name);
			}
			else {
				// 创建类
				CreatedClass = new Rexjs(
					getConstructor(
						constructor,
						name,
						_SuperClass
					),
					_SuperClass
				);
			}
			
			// 定义属性
			CreatedClass.props(properties);
			// 定义静态属性
			CreatedClass.static(staticProperties);
			// 返回 CreatedClass
			return CreatedClass;
		}
	});

	return ECMAScript6Class;
}(
	Rexjs,
	this.Constructor,
	this.StaticProperties,
	// CLASS_REGEXP
	/\bclass\b/,
	// deps
	[ this.ECMAScript6OOP, this.ECMAScript6ConstructorString ],
	Object.getOwnPropertyDescriptor,
	// getConstructor
	function(constructor, name, _SuperClass){
		switch(
			true
		){
			// 如果构造函数已经存在
			case constructor !== null :
				break;
			
			// 如果有父类
			case !!_SuperClass :
				constructor = function(){
					return _SuperClass.call(this);
				};
				break;
			
			// 如果没有父类
			default :
				constructor = AnonymousClass;
				break;
		}
		
		// 返回重命名后的构造函数
		return new Function(
			"constructor",
			[
				"return function " + name + "(){",
				"	return constructor.apply(this, arguments);",
				"};"
			]
			.join("\r\n")
		)(
			constructor
		);
	},
	// getClassName
	function(syntaxTree, element){
		var nextElementSibling = element.nextElementSibling;
		
		// 判断标签名称
		switch(
			nextElementSibling.tagName
		){
			// 如果是片段文本，说明是类的名称
			case "fragment" :
				// 移除该元素
				nextElementSibling
					.parentNode
					.removeChild(
						nextElementSibling
					);

				// 返回文本
				return nextElementSibling.textContent;
			
			// 如果是 extends 元素
			case "extends" :
				break;
			
			// 如果是 brace 元素
			case "brace" :
				break;
			
			// 默认
			default :
				syntaxTree.error(nextElementSibling, "没有正确的定义类名称。");
				break;
		}
		
		// 返回空字符串
		return "";
	},
	// insertComma
	function(syntaxTree, braceElement, index){
		var commaText = SyntaxTree.createText(",");

		// 将逗号元素添加至大括号前面
		braceElement
			.parentNode
			.insertBefore(
				commaText,
				braceElement
			);

		// 触发插入逗号事件
		syntaxTree.dispatch("insertComma", commaText, index);
	},
	// compile
	function(classElement, extendsElement, commaText, name, rexModeEnabled){
		var hasSuper = !!extendsElement;
		
		// 设置文本内容
		classElement.textContent = classElement.textContent + '("' + name + '"';
		
		// 如果有父类
		if(
			hasSuper
		){
			// 记录元素，并设置文本内容
			extendsElement.textContent = ",";
		}

		// 可能不存在，因为 insertComma 事件可能被拦截
		if(
			commaText
		){
			// 设置逗号文本
			commaText.textContent = (hasSuper ? "" : ", void 0") + ", " + (rexModeEnabled ? "true" : "false") + ",";
		}
		
		// 添加一些结束标志
		classElement
			.parentNode
			.appendChild(
				SyntaxTree.createText(")")
			);
	},
	// constructor
	function(syntaxTree, extendsElement, name, index){
		// 监听构造函数
		syntaxTree.one(
			"constructorFragment",
			function(element){
				// 如果 extends 元素存在
				if(
					extendsElement
				){
					// 设置 super 特性
					element.setAttribute("super", "");
				}
				
				// 设置 name 特性
				element.setAttribute("name", name);
				// 触发构造函数事件
				this.dispatch("constructor", element, index);
			},
			index
		);
	},
	// key
	function(syntaxTree, index){
		// 监听 key 事件
		syntaxTree.listen(
			"key",
			function(element, i, n){
				var id;
				
				// 先执行下一个处理函数
				n();
				
				// 监听 staticKeyword 关键字
				id = this.one(
					"staticKeyword",
					function(e, i, n, p){
						// 阻止其他监听器执行
						p();
						// 触发 static 事件
						this.dispatch("static", e, i);
					},
					index
				);

				// 添加监听器相关 id
				ProtectedListeners.add(id);
				
				// 添加 static 标签
				this.plainText.push("static");
			},
			index,
			index - 1
		);
	},
	// defaultValue
	function(syntaxTree, index){
		syntaxTree.listen(
			"defaultValue",
			function(element, i, next, prevent){
				element.textContent = ":";
				prevent();
			},
			index
		);
	},
	// property
	function(syntaxTree, index){
		syntaxTree.listen(
			"property",
			function(element, i, next){
				var elementChild = element.firstElementChild;
				
				switch(
					true
				){
					// 如果 elementChild 不存在，说明是空属性
					case elementChild === null :
						return;
					
					// 如果不是 static 属性
					case elementChild.tagName !== "static" :
						return;

					case elementChild === element.lastElementChild :
						// 报错
						this.error(elementChild, "static关键字不应该作为简写属性来定义。");
						return;
				}
				
				// 移除 static 元素
				element.removeChild(elementChild);
				// 先执行下一个处理函数
				next();
				// 触发 staticProperty 事件
				this.dispatch("staticProperty", element, index);
			},
			index
		);
	},
	// objectCreator
	function(syntaxTree, index){
		syntaxTree.one(
			"objectCreator",
			function(e, i, n, p){
				// 阻止其他监听器执行
				p();
			},
			index
		);
	}
);

this.ECMAScript6StaticClass = function(StaticProperties, STATIC_WITH_CLASS_REGEXP, deps, getOwnPropertyNames, body, property){
	/**
	 * 静态类解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScript6StaticClass(syntaxTree){
		syntaxTree
			// 添加标签
			.add(
				new KeywordTag(
					"static",
					STATIC_WITH_CLASS_REGEXP,
					"staticWithClass"
				),
				true
			)
			// 监听事件
			.listen(
				"staticWithClass",
				function(element, index){
					// 如果没有启用 rex 模式
					if(
						!this.rexModeEnabled
					){
						// 报错
						this.error(element, "若要使用静态类，请开启rex模式。");
						return;
					}
					
					// 设置表达式属性
					element.setAttribute("expression", "staticClass");
					// 触发表达式起始事件
					this.dispatch("expressionStart", element, index);
					
					// 监听 extends 关键字
					var eid = this.one(
						"extends",
						function(e){
							// 如果进入此函数，则说明有 extends 关键字，报错
							this.error(e, "静态类无法继承与被继承。");
						},
						index
					);
					
					// 监听 class 事件
					this.one(
						"class",
						function(e, i, n){
							// 先执行其他监听器
							n();
							// 解析主体
							body(this, element, property, eid, i + 1);
							
							// 修改 class 元素文本内容
							e.textContent = "Rexjs.ECMAScript6StaticClass.create";
						},
						index
					);
					
					// 移除此元素，因为会影响变量名的插入判断
					element
						.parentNode
					 	.removeChild(
							element
						);
				}
			);
	};
	ECMAScript6StaticClass = new Class(ECMAScript6StaticClass, ECMAScript6Parser);
	
	ECMAScript6StaticClass.static({
		/**
		 * 根据参数生成并返回一个静态类。
		 * @param {String} name - 构造函数名称
		 * @param {NamedProperties, Object} _rest - 类的属性集合
		 */
		create : function(constructor, _rest){
			var staticProperties = new StaticProperties();
			
			// 将省略参数（属性）转化为数组
			toArray(
				arguments,
				1
			)
			// 遍历数组
			.forEach(function(props){
				// 如果当前属性是静态属性
				if(
					props instanceof StaticProperties
				){
					// 添加静态属性
					staticProperties.add(props);
					return;
				}
				
				// 获取所有属性的名称数组
				var names = getOwnPropertyNames(props);
				
				// 判断名称数组的长度
				switch(
					names.length
				){
					// 如果是0，说明是空的，则返回
					case 0 :
						return;
	
					// 如果属性是构造函数而且长度是1
					case names[0] === "constructor" ? 1 : 0 :
						// 记录构造函数
						constructor = props.constructor;
						// 返回
						return;
				}
				
				// 进入到这，说明存在非静态方法，报错
				throw "静态类不应该定义非静态方法。";
			});
			
			// 创建静态类
			return new StaticClass(constructor, staticProperties);
		},
		deps : deps
	});
	
	return ECMAScript6StaticClass;
}(
	this.StaticProperties,
	// STATIC_WITH_CLASS_REGEXP
	/\bstatic(?=\s+class\b)/,
	// deps
	[ this.ECMAScript6Class ],
	Object.getOwnPropertyNames,
	// body
	function(syntaxTree, staticElement, property, eid, index){
		// 监听 openingBrace 事件
		syntaxTree.one(
			"openingBrace",
			function(element, i, next){
				// 取消 extends 的监听
				this.unlisten(eid);
				// 先执行其他监听器
				next();
				// 监听属性
				property(this, i + 1);
				
				// 监听插入逗号事件
				this.one(
					"insertComma",
					function(e, i, n, p){
						// 阻止其他监听器执行
						p();
					},
					i
				);
			},
			index
		);
		
		// 监听 closingBrace 事件
		syntaxTree.one(
			"closingBrace",
			function(){
				// 触发表达式结束事件
				this.dispatch("expressionEnd", staticElement, index - 1);
			},
			index
		);
	},
	// property
	function(syntaxTree, index){
		var isStatic = false;
		
		// 监听静态属性事件
		syntaxTree.listen(
			"staticProperty",
			function(){
				// 将 isStatic 设置为 true
				isStatic = true;
			},
			index
		);
		
		// 监听属性事件
		syntaxTree.listen(
			"property",
			function(element, i, next){
				// 将 isStatic 设置为 false
				isStatic = false;
				
				// 先执行其他监听器，因为其他监听器可能会触发 staticProperty 事件
				next();
				
				switch(
					true
				){
					// 如果是静态属性
					case isStatic :
						return;
					
					// 如果是构造函数
					case ECMAScript6Parser.querySelector(element, ">fragment[constructor]") !== null :
						return;
				}
				
				// 非静态属性，一律报错
				this.error(element, "静态类不允许定义非构造函数之外的非静态属性。");
			},
			index
		);
	}
);

this.ECMAScript6LessLogicOOP = function(){
	function ECMAScript6LessLogicOOP(syntaxTree){
		///	<summary>
		///	少逻辑的面向对象解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6LessLogicOOP = new Class(ECMAScript6LessLogicOOP, ECMAScript6Parser);
	
	ECMAScript6LessLogicOOP.props({
		parse : function(){
			///	<summary>
			///	解析少逻辑的面向对象。
			///	</summary>
			var ecmaScript6LessLogicOOP = this;
			
			return this
				.syntaxTree
				.listen(
					"lessLogicOOP",
					function(element, index){
						// 如果没有开启rex模式
						if(
							!this.rexModeEnabled
						){
							// 报错
							this.error(element, "若要使用" + element.codeContent + "，必须开启rex模式。");
							return;
						}
						
						// 触发oop事件
						this.dispatch("oop", element, index);
						
						this.one(
							"openingBrace",
							function(braceElement){
								// 如果满足插入变量名的条件
								if(
									ECMAScript6Declaration.insertable(element)
								){
									// 自动定义并插入变量名
									ECMAScript6Declaration.insert(
										// 获取文本内容作为变量名
										ECMAScript6Parser.extractTextBetween(
											element,
											braceElement
										),
										element,
										braceElement
									);
									
									return;
								}
								
								// 加上起始注释，屏蔽自带的名称，如：var e = enum myEnum {};屏蔽“myEnum”
								element.textContent += "/*";
								
								// 添加结束的注释
								braceElement
									.parentNode
									.insertBefore(
										SyntaxTree.createText("*/"),
										braceElement
									);
							},
							index + 1
						);
						
						// 解析枚举的主体
						ecmaScript6LessLogicOOP.parseBody(index + 1);
					}
				);
		},
		parseBody : function(index){
			///	<summary>
			///	解析枚举主体。
			///	</summary>
			///	<param name="index" type="Number">索引值。</param>
			var ecmaScript6LessLogicOOP = this;
			
			return this
				.syntaxTree
				.one(
					"openingBrace",
					function(element){
						var tags = this.tags;
						
						// 监听key事件
						this.listen(
							"key",
							function(e, i, n){
								// 先执行下一个处理函数
								n();
								
								// 忽略访问器，当做普通文本处理
								tags.ignore("accessor");
							},
							index
						);
						
						// 解析属性
						ecmaScript6LessLogicOOP.parseProperty(index + 1);
					},
					index
				);
		},
		parseProperty : function(index){
			///	<summary>
			///	解析属性。
			///	</summary>
			///	<param name="index" type="Number">索引值。</param>
			return this
				.syntaxTree
				.listen(
					"property",
					function(element){
						// 监听计算式
						this.one(
							"computedName",
							function(e){
								// 报错
								this.error(e, "此处的属性名称应该是一个确定的值，不应该使用不确定性的计算式。");
							},
							index
						);
						
						// 监听简写方法
						this.one(
							"shorthandMethod",
							function(e){
								// 报错
								this.error(e, "此处的属性不应该是一个简写方法。");
							},
							index
						);
						
						// 监听简写字符串
						this.listen(
							"shorthandString",
							function(e, i, n, p){
								// 阻止其他监听器执行
								p();
								
								// 将其作为简写名称，从而触发shorthandName
								this.dispatch("shorthandName", e, i);
							},
							index
						);
					},
					index
				);
		}
	});
	
	return ECMAScript6LessLogicOOP;
}();

this.ECMAScript6Enum = function(ENUM_REGEXP){
	function ECMAScript6Enum(syntaxTree){
		///	<summary>
		///	枚举解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new KeywordTag(
				"enum",
				ENUM_REGEXP
			)
		);
	};
	ECMAScript6Enum = new Class(ECMAScript6Enum, ECMAScript6Parser);
	
	ECMAScript6Enum.props({
		parse : function(){
			///	<summary>
			///	解析枚举。
			///	</summary>
			var ecmaScript6Enum = this;
			
			return this
				.syntaxTree
				.listen(
					"enum",
					function(element, index){
						var value = 0;
						
						// 修改文本内容
						element.textContent = "new Rexjs.Enum";
						
						// 触发 lessLogicOOP 事件
						this.dispatch("lessLogicOOP", element, index);
						
						// 监听 shorthandName
						this.listen(
							"shorthandName",
							function(e, i, n, p){
								// 阻止其他监听器执行
								p();
								
								// 转化成键值对模式，设为递增值
								e.textContent += ":" + value++;
							},
							index + 2,
							// 设置此参数，目的是为了在closeBrace之后，清除此监听器，毕竟当前不是在大括号内
							index + 1
						);
					}
				);
		}
	});
	
	return ECMAScript6Enum;
}(
	// ENUM_REGEXP
	/\benum\b/
);

this.ECMAScript6Interface = function(INTERFACE_REGEXP, forEach, isArray){
	function ECMAScript6Interface(syntaxTree){
		///	<summary>
		///	接口解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new KeywordTag(
				"interface",
				INTERFACE_REGEXP
			)
		);
	};
	ECMAScript6Interface = new Class(ECMAScript6Interface, ECMAScript6Parser);
	
	ECMAScript6Interface.static({
		create : function(propertyNames){
			///	<summary>
			///	创建接口。
			///	</summary>
			///	<param name="propertyNames" type="Object, Array">规定的属性名称。</param>
			
			// 如果不是数组
			if(
				!isArray(propertyNames)
			){
				var names = propertyNames;
				
				propertyNames = [];
				
				// 遍历名称
				forEach(
					names,
					function(value, name){
						propertyNames.push(name);
					}
				);
			}
			
			// 返回接口
			return new Interface(propertyNames);
		}
	});
	
	ECMAScript6Interface.props({
		parse : function(){
			///	<summary>
			///	解析接口。
			///	</summary>
			var ecmaScript6Interface = this;
			
			return this
				.syntaxTree
				.listen(
					"interface",
					function(element, index){
						// 修改文本内容
						element.textContent = "Rexjs.ECMAScript6Interface.create";
						
						// 触发 lessLogicOOP 事件
						this.dispatch("lessLogicOOP", element, index);
						
						// 监听简写属性
						this.listen(
							"shorthandName",
							function(e, i, n, p){
								// 阻止其他监听器执行
								p();
								
								// 转化成键值对模式，设为递增值
								e.textContent += ": true";
							},
							index + 2,
							// 设置此参数，目的是为了在closeBrace之后，清除此监听器，毕竟当前不是在大括号内
							index + 1
						);
					}
				);
		}
	});
	
	return ECMAScript6Interface;
}(
	// INTERFACE_REGEXP
	/\binterface\b/,
	Rexjs.forEach,
	Array.isArray
);

this.OOPPackage = function(Package, contents){
	function OOPPackage(syntaxTree){
		///	<summary>
		///	面向对象解析器包。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	OOPPackage = new Class(OOPPackage, Package);
	
	OOPPackage.package(contents);
	return OOPPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScript6Extends,
		this.ECMAScript6Super,
		this.ECMAScript6Static,
		this.ECMAScript6StaticProperty,
		this.ECMAScript6Assign,
		this.ECMAScript6OOP,
		this.ECMAScript6LessLogicOOP,
		this.ECMAScript6Class,
		this.ECMAScript6StaticClass,
		this.ECMAScript6Enum,
		this.ECMAScript6Interface
	]
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.ECMAScript6ExceptionParser,
	this.ECMAScript6Expression,
	this.ECMAScript6Declaration,
	this.SyntaxTree,
	this.SyntaxTag,
	this.KeywordTag,
	this.NamedProperty,
	this.NamedProperties,
	Function,
	// AnonymousClass
	function AnonymousClass(){},
	this.ProtectedListeners,
	Rexjs.toArray
));


// 模块相关解析器
(function(ECMAScript6Parser, SyntaxTree, ExpressionTag, NamedItem, NamedItemMap, URL_REGEXP, SPACE_REGEXP, current, toArray, encodeURI, decodeURI){

this.ModuleStatus = function(){
	function ModuleStatus(name){
		///	<summary>
		///	模块状态。
		///	</summary>
		///	<param name="name" type="String">状态名称。</param>
	};
	ModuleStatus = new Class(ModuleStatus, EnumItem);
	
	return ModuleStatus;
}();

this.ModuleStatuses = function(ModuleStatus){
	return new Enum(
		new ModuleStatus("None"),
		new ModuleStatus("Created"),
		new ModuleStatus("Loaded"),
		new ModuleStatus("Ready"),
		new ModuleStatus("Completed")
	);
}(
	this.ModuleStatus
);

this.URL = function(Blob, FileReader, join, toString, toObject, error){
	function URL(urlString, _baseURLstring){
		///	<summary>
		///	地址类。
		///	</summary>
		///	<param name="urlString" type="*">地址。</param>
		///	<param name="_baseURLstring" type="*">基本地址。</param>
		
		// 转化为字符串
		var urlObj;
		
		// 转化为字符串
		urlString = toString(urlString);
		// 获取url对象
		urlObj = toObject(urlString);
		
		switch(
			true
		){
			// 如果 urlObj 不存在，则说明转换失败
			case urlObj !== null :
				// 赋值
				this.assign(urlObj);
				return;
			
			// 如果 baseURL 不存在
			case typeof _baseURLstring !== "string" :
				// 报错
				error(urlString);
				return;
		}
		
		// 实例化 baseUrl
		var baseUrl = new URL(_baseURLstring);
		
		// 根据新地址调用构造函数，利用构造函数给 this 赋值
		URL.call(
			this,
			baseUrl.origin + (baseUrl.dirname + "/") + urlString
		);
	};
	URL = new Class(URL);
	
	URL.static({
		convert : function(string, type, callback, _error){
			///	<summary>
			///	将字符串转换为一个包含其内容的且具有指定格式文件地址。
			///	</summary>
			///	<param name="string" type="String">内容性质的字符串。</param>
			///	<param name="type" type="String">文件格式。</param>
			///	<param name="callback" type="Function">成功的回调函数。</param>
			///	<param name="_error" type="Function">错误的回调函数。</param>
			
			// 如果Blob或FileReader不存在
			if(
				!Blob || !FileReader
			){
				_error && _error();
				return this;
			}
		
			var fileReader = new FileReader();
			
			// 添加onload
			fileReader.onload = function(){
				// 执行回调
				callback(this.result);
			};
			
			// 添加onerror
			fileReader.onerror = _error;
			
			// 读取dataURL
			fileReader.readAsDataURL(
				// 实例化Blob
				new Blob(
					[ string ],
					{ type : type }
				)
			);
			
			return this;
		},
		join : function(_rest){
			///	<summary>
			///	将本函数所有参数地址拼装成一个新的地址，并返回。
			///	</summary>
			///	<param name="_rest" type="String">地址字符串。</param>
			return new URL(
					join.call(arguments, "/")	
				)
				.toString();
		}
	});
	
	URL.props({
		dirname : "",
		filename : "",
		hash : "",
		get host(){
			///	<summary>
			///	获取 host 信息。
			///	</summary>
			return this.hostname + (this.port ? ":" + this.port : "");
		},
		hostname : "",
		get href(){
			///	<summary>
			///	获取 href 信息。
			///	</summary>
			return this.origin + this.pathname + this.search + this.hash;	
		},
		get origin(){
			///	<summary>
			///	获取 origin 信息。
			///	</summary>
			return this.protocal + "//" + this.host;	
		},
		get pathname(){
			///	<summary>
			///	获取 pathname 信息。
			///	</summary>
			var dirname = this.dirname;
			
			return dirname + (dirname[dirname.length - 1] === "/" ? "" : "/") + this.filename;
		},
		port : "",
		protocal : "",
		search : "",
		toString : function(){
			///	<summary>
			///	该对象的字符串结果。
			///	</summary>
			return this.href;
		}
	});
	
	return URL;
}(
	typeof Blob === "undefined" ? null : Blob,
	typeof FileReader === "undefined" ? null : FileReader,
	Array.prototype.join,
	// toString
	function(urlString){
		// 如果不是字符串
		if(
			typeof urlString !== "string"
		){
			// 如果是 undefined 或者 null，则为空字符串，否则为toString的返回值
			urlString = urlString == null ? "" : urlString.toString();
		}
		
		// 返回转码后的字符串
		return encodeURI(
			urlString.trim()
		);
	},
	// toObject
	function(urlString){
		var result;
		
		result = urlString
			// 去掉除空格之外的空白字符
			.replace(
				SPACE_REGEXP,
				""
			)
			// 匹配地址
			.match(
				URL_REGEXP
			);
		
		// 如果没有匹配结果
		if(
			result === null
		){
			return result;
		}
		
		var urlObject, pathname = result[4] || "", protocal = result[1], hostname = result[2] || "", port = result[3] || "";
		
		// 初始化对象
		urlObject = {
			dirname : "",
			filename : "",
			hash : result[6] || "",
			hostname : hostname,
			port : port,
			protocal : protocal,
			search : result[5] || ""
		};
		
		// 如果不是http与https地址
		if(
			protocal !== "http:" && protocal !== "https:"
		){
			var index;
			
			// 还原链接字符串
			urlString = decodeURI(urlString);
			
			switch(
				true
			){
				// 如果存在 search
				case urlObject.search.length > 0 :
					// 设置 index
					index = urlString.indexOf("?");
					break;
				
				// 如果存在 hash
				case urlObject.hash.length > 0 :
					// 设置 index
					index = urlString.indexOf("#");
					break;
					
				default :
					// 设置 index
					index = urlString.length;
					break;
			}
			
			// 重置 urlObject 部分属性
			pathname = urlString.substring(protocal.length, index);
			urlObject.hostname = urlObject.port = "";
			urlObject.search = decodeURI(urlObject.search);
			urlObject.hash = decodeURI(urlObject.hash);
		}
		// 如果不存在hostname，则说明地址不规范
		else if(
			!urlObject.hostname
		){
			// 返回 null
			return null;
		}
		
		var length, hasFilename, pathnameArray = [];
		
		// 分割路径
		pathname
			.split(
				"/"
			)
			.forEach(function(name){
				switch(
					name
				){
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
		
		// 设置 length
		length = pathnameArray.length;
		
		// 如果长度大于 0
		if(
			length > 0
		){
			// 设置 hasFilename
			hasFilename = pathnameArray[length - 1].indexOf(".") > -1;
		}
		
		// 设置 dirname
		urlObject.dirname = "/" + (hasFilename ? pathnameArray.slice(0, length - 1) : pathnameArray).join("/");
		// 设置 filename
		urlObject.filename = hasFilename ? pathnameArray[length - 1] : "";
		
		// 返回 urlObject
		return urlObject;
	},
	// error
	function(urlString){
		throw "无效的地址：" + urlString + "。";
	}
);

this.Module = function(ModuleStatuses, URL, XMLHttpRequest, Date, BASE_URI, cache, storage, nativeEval, repeat, loadDeps){
	function Module(name, Package, _auto, _code){
		///	<summary>
		///	模块类。
		///	</summary>
		///	<param name="name" type="String">模块名称，通常是一个文件地址。</param>
		///	<param name="Package" type="Package">该模块所支持的包。</param>
		///	<param name="_auto" type="Boolean">当该模块准备就绪后，是否自动运行。</param>
		///	<param name="_code" type="String">该模块代码，当提供此参数，将不会再下载代码。</param>
		var data, callback, mod = this, deps = [], hasCode = typeof _code === "string";
		
		// 格式化名称
		name = new URL(name, BASE_URI).toString();
		
		this.assign({
			auto : _auto,
			deps : deps,
			name : name,
			status : ModuleStatuses.Created
		});
		
		// 添加至缓存
		cache.setNamedItem(this);
		
		// 初始化数据
		data = storage[name] = {
			Package : Package,
			callbacks : [],
			hasCode : hasCode,
			result : ""
		};
		
		callback = function(code){
			// 实例化语法树
			var syntaxTree = new SyntaxTree(code);
			
			// 监听from事件
			syntaxTree.listen(
				"dependency",
				function(element){
					// 添加依赖
					deps.push(
						new URL(
							// 去掉字符串的双引号或单引号
							element.textContent.substring(1, element.textContent.length - 1),
							name
						)
						.toString()
					);
					
					// 重置文本内容
					element.textContent = '"' + deps[deps.length - 1] + '"';
				}
			);
			
			// 初始化解析器包
			new Package(syntaxTree);
			
			// 改变状态
			mod.status = ModuleStatuses.Loaded;
			// 记录current
			current = mod;
			// 创建语法树并记录代码内容
			code = syntaxTree.create().textContent;
			// 清空current
			current = null;
			
			// 添加
			Module.appendSourceURL(
				code,
				name,
				function(result){
					data.result = result;
					
					// 加载依赖
					loadDeps(Module, ModuleStatuses, mod, data, cache, storage);
				},
				hasCode
			);
		};
		
		// 如果已有现在的代码
		if(
			hasCode
		){
			// 立刻执行回调
			callback(_code);
			return;
		}
		
		// 加载模块
		Module.load(name, callback);
	};
	Module = new Class(Module, NamedItem);
	
	Module.static({
		appendSourceURL : function(code, fileURL, callback, _withoutMapping){
			///	<summary>
			///	给代码添加 sourceURL 和 sourceMappingURL。
			///	</summary>
			///	<param name="code" type="String">需要运行的代码。</param>
			///	<param name="fileURL" type="String">文件路径。</param>
			///	<param name="callback" type="Function">回调函数。</param>
			///	<param name="_withoutMapping" type="Boolean">如果该参数被提供，则不会给代码添加mappingURL。</param>
			
			var url = new URL(fileURL), filename = url.filename;
			
			// 将文件名修改为 .rex 文件
			url.filename = filename.substring(0, filename.lastIndexOf(".")) + ".rex";
			
			// 如果不需要添加 mapping
			if(
				_withoutMapping
			){
				// 直接调用 callback
				callback(code + "\n//# sourceURL=" + url.href);
				return this;
			}
			
			// 将 mapping 信息转化为地址
			URL.convert(
				[
					"{",
						'"sources" : ["' + fileURL + '"],',
						'"names" : [],',
						'"mappings":"AAAA;' + repeat("AACA;", code.split("\n").length - 1) + '"',
					"}"
				]
				.join(""),
				"application/json",
				// 成功回调
				function(mappingURL){
					// 运行代码
					callback(
						code +
						// 添加map
						"\n//# sourceMappingURL=" + mappingURL +
						// 添加source
						"\n//# sourceURL=" + url.href
					);
				},
				// 失败回调
				function(){
					callback(code + "\n//# =" + url.href);
				}
			);
			
			return this;
		},
		cache : cache,
		load : function(url, callback){
			///	<summary>
			///	加载模块代码。
			///	</summary>
			///	<param name="url" type="String">模块地址。</param>
			///	<param name="callback" type="Function">回调函数。</param>
			var request = new XMLHttpRequest();
			
			// 监听onload
			request.addEventListener(
				"load",
				function(){
					// 如果存在错误
					if(
						this.status !== 200
					){
						throw '加载模块 "' + url + '" 错误，status：' + this.status + "。";
						return;
					}
					
					// 执行回调
					callback(this.responseText);
				}
			);
			
			// 打开请求，采用异步get方式
			request.open("get", url, true);
			// 发送请求
			request.send();
			
			return request;
		}
	});
	
	Module.props({
		auto : false,
		deps : null,
		exec : function(){
			// 如果已经准备完毕
			if(
				this.status === ModuleStatuses.Ready
			){
				var name = this.name;
				
				// 执行代码
				nativeEval(storage[name].result);
				
				// 删除此模块对应的存储数据
				delete storage[name];
				
				this.status = ModuleStatuses.Completed;
			}
			
			return this;
		},
		status : ModuleStatuses.None
	});
	
	return Module;
}(
	this.ModuleStatuses,
	this.URL,
	XMLHttpRequest,
	Date,
	// BASE_URI
	location.href,
	// cache
	new NamedItemMap(),
	// storage
	{},
	eval,
	// repeat
	function(str, count){
		// 如果str自带repeat
		if(
			str.repeat
		){
			// 返回repeat结果
			return str.repeat(count);
		}
		
		var arr = [];
		
		// 利用循环添加
		for(
			var i = 0,
				j = count;
			i < j;
			i++
		){
			arr.push("AACA;");
		}
		
		return arr.join("");
	},
	// loadDeps
	function(Module, ModuleStatuses, mod, data, cache, storage){
		var callback, name = mod.name, deps = mod.deps, length = deps.length + 1;
		
		callback = function(){
			// 如果所有依赖都已经加载完毕
			if(
				--length > 0
			){
				return;
			}
			
			// 改变状态
			mod.status = ModuleStatuses.Ready;
			
			// 遍历这些函数
			data.callbacks
				.forEach(function(event){
					event();
				});
			
			// 如果模块需要马上自动运行
			if(
				mod.auto
			){
				// 立即执行
				mod.exec();
			}
		};
		
		// 立即执行，判断一次
		callback();
		
		// 等待依赖
		deps.forEach(function(dep){
			// 如果缓存不存在，则说明该模块尚未加载
			if(
				!cache.hasNamedItem(dep)
			){
				// 初始化模块
				new Module(dep, data.Package);
			}
			
			// 判断状态
			switch(
				cache[dep].status
			){
				// 如果是已准备，则跳出判断
				case ModuleStatuses.Ready :
					break;
				
				// 如果是已完成，则跳出判断
				case ModuleStatuses.Completed :
					break;
				
				// 默认，认为依赖尚未加载完毕
				default :
					// 添加回调函数
					storage[dep].callbacks.push(callback);
					return;
			}
			
			// 如果模块已经就绪，执行回调函数
			callback();
		});
	}
);

this.Exports = function(Module, cache, forEach, create){
	function Exports(name){
		///	<summary>
		///	模块输出内容。
		///	</summary>
		///	<param name="name" type="String">模块名称，通常是一个文件地址。</param>
		this.assign(
			{ data : create(null) }
		);
	};
	Exports = new Class(Exports, NamedItem);
	
	Exports.static({
		cache : cache,
		create : function(name){
			///	<summary>
			///	创建指定名称模块的输出对象。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			
			// 如果已经创建
			if(
				cache.hasOwnProperty(name)
			){
				// 返回 true
				return true;
			}
			
			var moduleCache = Module.cache;
				
			// 如果缓存中没有该模块
			if(
				!moduleCache.hasNamedItem(name)
			){
				// 返回 false
				return false;
			}
			
			// 初始化输出
			cache.setNamedItem(
				new Exports(name)
			);
			
			// 运行模块代码
			moduleCache
				.getNamedItem(
					name
				)
				.exec();

			return true;
		},
		dataOf : function(name){
			///	<summary>
			///	获取指定名称模块输出的值。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			return this.get(name).data;
		},
		defaultOf : function(name){
			///	<summary>
			///	获取指定名称模块的默认输出。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			return this.get(name).default;
		},
		get : function(name){
			///	<summary>
			///	获取指定名称模块的输出对象。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			this.create(name);
			
			// 返回 exports
			return cache.getNamedItem(name);
		},
		set : function(name, key, _value){
			///	<summary>
			///	给指定名称的模块设置输出对象。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			///	<param name="key" type="String, Object">输出对象的键名或键值对集合。</param>
			///	<param name="_value" type="*">输出对象的值。</param>
			var exports = this.get(name);
			
			// 如果键名是字符串
			if(
				typeof key === "string"
			){
				exports.set(key, _value);
			}
			else {
				// 遍历集合
				forEach(
					key,
					function(v, k){
						// 设置单个输出
						exports.set(k, v);
					}
				);
			}
			
			return this;
		},
		setDefault : function(name, value){
			///	<summary>
			///	给指定名称的模块设置默认输出对象。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			///	<param name="value" type="*">默认输出的对象。</param>
			this.get(
					name
				)
				.setDefault(
					value
				);
				
			return this;
		}
	});
	
	Exports.props({
		data : null,
		default : void 0,
		set : function(key, value){
			///	<summary>
			///	设置输出对象。
			///	</summary>
			///	<param name="key" type="String, Object">输出对象的键名。</param>
			///	<param name="_value" type="*">输出对象的值。</param>
			this.data[key] = value;
			return this;
		},
		setDefault : function(value){
			///	<summary>
			///	设置默认输出对象。
			///	</summary>
			///	<param name="_value" type="*">默认输出对象的值。</param>
			this.default = value;
			return this;
		}
	});
	
	return Exports;
}(
	this.Module,
	// cache
	new NamedItemMap(),
	Rexjs.forEach,
	Object.create
);

this.ECMAScript6Import = function(IMPORT_REGEXP, currentElement, protectMemberExpression){
	function ECMAScript6Import(syntaxTree){
		///	<summary>
		///	import 表达式解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"import",
				IMPORT_REGEXP
			)
		);
	};
	ECMAScript6Import = new Class(ECMAScript6Import, ECMAScript6Parser);
	
	ECMAScript6Import.static({
		get currentElement(){
			///	<summary>
			///	获取当前的 import 元素。
			///	</summary>
			return currentElement;
		}
	});
	
	ECMAScript6Import.props({
		parse : function(){
			///	<summary>
			///	解析 import 表达式。
			///	</summary>
			var ecmaScript6Import = this;
			
			return this
				.syntaxTree
				.listen(
					"import",
					function(element, index){
						var ids, imported = false, tags = this.tags;
						
						// 设置当前的 import 元素
						currentElement = element;
						// 修改文本内容
						element.textContent = "var";
						
						// 各种情况的解析器
						ids = [
							ecmaScript6Import.parseModuleName(element, index),
							ecmaScript6Import.parseMember(element, index + 1)
						];
						
						// 取消 as 关键字的忽略
						tags.unignore(
								"as"
							)
							// 取消 from 关键字的忽略
							.unignore(
								"from"
							);
						
						// 监听 imported 事件
						this.one(
							"imported",
							function(){
								// 表示已经正确的引入模块
								imported = true;
								
								// 取消监听其他情况的监听
								ids.forEach(this.unlisten, this);
							},
							index
						);
						
						// 监听分号
						this.one(
							"semicolon",
							function(){
								// 清空当前所记录的 import 元素
								currentElement = null;
								
								// 忽略 as 关键字
								tags.ignore(
										"as"
									)
									// 忽略 from 关键字
									.ignore(
										"from"
									);
								
								// 如果已经有正确的引入模块
								if(
									imported
								){
									// 返回
									return;
								}
								
								// 说明没有正确的引入模块，报错
								this.error(element, "不完整的import表达式。");
							},
							index
						);
					}
				);
		},
		parseMember : function(importElement, index){
			///	<summary>
			///	解析模块成员的方式。
			///	</summary>
			///	<param name="importElement" type="Element">import元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.one(
					"openingBrace",
					function(element, i, next, prevent){
						// 如果大括号与 import 元素之间的文本不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(importElement, element)
						){
							// 报错
							this.error(element, "import关键字与引用成员对象之间不应该存在其他字符。");
							return;
						}
						
						// 阻止其他监听器的执行
						prevent();
						
						// 触发 imported 事件，告知主监听已有引入模块
						this.dispatch("imported", importElement, index - 1);
						// 触发 member 事件
						this.dispatch("member", element, index);
						
						// 监听 as 关键字
						this.listen(
							"as",
							function(asElement, i, n){
								// 先执行其他监听器
								n();
								
								// 将文本内容修改为冒号
								as.textContent = ":";
							},
							index
						);
						
						// 监听 appendMemberValue 事件
						this.listen(
							"appendMemberValue",
							function(e, i, n ,p){
								// 阻止其他监听器执行
								p();
							},
							index
						);
						
						// 监听关闭大括号
						this.one(
							"closingBrace",
							function(){
								// 触发 objectDestructuring 事件，采用解构赋值
								this.dispatch("objectDestructuring", element, index);
							},
							index
						);
						
						// 保护成员表达式
						protectMemberExpression(this, importElement, index);
					},
					index
				);
		},
		parseModuleName : function(importElement, index){
			///	<summary>
			///	解析模块名称的方式。
			///	</summary>
			///	<param name="importElement" type="Element">import元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.one(
					"string",
					function(element){
						// 如果模块名称与 import 元素之间的文本不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(importElement, element)
						){
							// 报错
							this.error(element, "import关键字与模块名称之间不应该存在其他字符。");
							return;
						}
						
						// 触发 imported 事件，告知主监听已有引入模块
						this.dispatch("imported", importElement, index);
						// 触发 dependency 事件，以模块添加依赖
						this.dispatch("dependency", element, index);
						
						// 重置 import 元素的文本内容
						importElement.textContent = ";Rexjs.Exports.dataOf(";
						// 添加小括号
						element.textContent += ")";
						
						// 监听 beforeEnding 事件
						this.one(
							"beforeEnding",
							function(e){
								// 如果模块名称后面没有其他字符
								if(
									ECMAScript6Parser.isEmptyBetween(element, element.parentNode)
								){
									// 返回
									return;
								}
								
								// 进入这里，说明模块名称后面还有其他字符，报错
								this.error(element, "模块名称后面应该紧跟分号，而不应该存在其他字符。");
							},
							index
						);
					},
					index
				);
		}
	});
	
	return ECMAScript6Import;
}(
	// IMPORT_REGEXP
	/\bimport\b/,
	// currentElement
	null,
	// protectMemberExpression
	function(syntaxTree, importElement, index){
		// 要使用 parentIndex ，是因为当前还是处理大括号内，而 from 与分号都是与大括号同级的语句
		var hasFrom = false, parentIndex = index - 1;
		
		// 监听 from 事件
		syntaxTree.one(
			"from",
			function(){
				hasFrom = true;
			},
			parentIndex,
			parentIndex
		);
		
		// 监听 semicolon 事件
		syntaxTree.one(
			"semicolon",
			function(){
				// 如果有 from 关键字
				if(
					hasFrom
				){
					return;
				}
				
				// 报错
				this.error(importElement, "import表达式缺少from子句。");
			},
			parentIndex,
			parentIndex
		);
	}
);

this.ECMAScript6From = function(ECMAScript6Import, FROM_REGEXP, reappend){
	function ECMAScript6From(syntaxTree){
		///	<summary>
		///	from 关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"from",
				FROM_REGEXP
			)
		);
		
		// 忽略 from 标签
		syntaxTree
			.tags
			.ignore(
				"from"
			);
	};
	ECMAScript6From = new Class(ECMAScript6From, ECMAScript6Parser);
	
	ECMAScript6From.props({
		parse : function(){
			///	<summary>
			///	解析 from 关键字。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"from",
					function(element, index){
						var hasString = false, importElement = ECMAScript6Import.currentElement;
						
						// 监听字符串，即模块名称
						this.one(
							"string",
							function(stringElement, i, n){
								// 如果字符串与 from 关键字不是兄弟元素，则说明中间有其他文本内容
								if(
									element.nextElementSibling !== stringElement
								){
									// 返回，不继续解析
									return;
								}
								
								var rootElement = SyntaxTree.createElement("root"); 
								
								// 提取 import 元素与模块名称之间的内容
								ECMAScript6Parser.extractNodesBetween(importElement, stringElement, rootElement);
								
								// 先执行其他监听器
								n();
								
								// 重置 import 元素文本内容
								importElement.textContent = "var";
								// 重置字符串元素文本内容
								element.textContent = "";
								
								// 如果为真，则说明添加成功，语法成立
								if(
									reappend(this, rootElement, element, stringElement)
								){
									// 记录，说明有模块名称
									hasString = true;
									return;
								}
								
								// 报错
								this.error(importElement, "缺少输出变量名。");
							},
							index
						);
						
						// 监听分号
						this.one(
							"semicolon",
							function(){
								// 如果有模块名称
								if(
									hasString
								){
									// 返回
									return;
								}
								
								// 报错
								this.error(importElement, "指定的模块名称应该是一个非模板形式的普通字符串。");
							},
							index
						);
					}
				);
		}
	});
	
	return ECMAScript6From;
}(
	this.ECMAScript6Import,
	// FROM_REGEXP
	/\bfrom\b/,
	// reappend
	function(syntaxTree, rootElement, fromElement, stringElement){
		var method = "defaultOf", firstElementChild = rootElement.firstElementChild;
		
		// 如果第一个元素存在
		if(
			firstElementChild
		){
			var tagName = firstElementChild.tagName;
			
			// 如果是大括号
			if(
				tagName === "brace"
			){
				// 判断 false
				switch(
					false
				){
					// 如果与 from 元素不是兄弟节点
					case firstElementChild.nextElementSibling === fromElement :
						// 返回 false
						return false;
					
					// 如果与 from 元素之间文本不为空
					case ECMAScript6Parser.isEmptyBetween(firstElementChild, fromElement) :
						// 返回 false
						return false;
				}
				
				method = "dataOf";
			}
			// 如果是操作符
			else if(
				tagName === "operator"
			){
				var asElement = firstElementChild.nextElementSibling;
				
				// 判断 false
				switch(
					false
				){
					// 如果不是 *
					case firstElementChild.getAttribute("value") === "*" :
						// 返回 false
						return false;
					
					// 如果操作符与 import 元素之间文本不为空
					case ECMAScript6Parser.isEmptyBetween(rootElement, firstElementChild) :
						// 返回 false
						return false;
				
					// 如果操作符与 as 元素之间文本不为空
					case ECMAScript6Parser.isEmptyBetween(firstElementChild, asElement) :
						// 返回 false
						return false;
				}
				
				method = "dataOf";
				// 清空操作符文本内容
				firstElementChild.textContent = "";
				// 清空 as 元素文本内容
				asElement.textContent = "";
			}
		}
		
		var textContent = rootElement.textContent;
		
		// 如果是空文本
		if(
			ECMAScript6Parser.isEmpty(textContent)
		){
			// 返回 false
			return false;
		}
		
		var parentNode = stringElement.parentNode;
		
		// 先移 string 元素
		parentNode.removeChild(stringElement);
		
		// 添加之前提取的片段代码文本
		syntaxTree.appendText(textContent);
		// 添加等于号，目的是让解构赋值能监听到该事件
		syntaxTree.appendElement("operator", "=", "operator", null, null, true);
		
		// 重置 string 元素文本内容
		stringElement.textContent = "Rexjs.Exports." + method + "(" + stringElement.textContent;
		
		// 重新添加到文档中
		parentNode.appendChild(stringElement);
		return true;
	}
);

this.ECMAScript6Export = function(EndingTypes, EXPORT_REGEXP, appendSemicolon, getNamesOfDeclaration, getNameOfFunction){
	function ECMAScript6Export(syntaxTree){
		///	<summary>
		///	export 关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"export",
				EXPORT_REGEXP
			)
		);
	};
	ECMAScript6Export = new Class(ECMAScript6Export, ECMAScript6Parser);
	
	ECMAScript6Export.props({
		parse : function(){
			///	<summary>
			///	解析 export 关键字。
			///	</summary>
			var ecmaScript6Export = this;

			return this
				.syntaxTree
				.listen(
					"export",
					function(element, index){
						// 如果不在顶层（es6本身只支持export在顶层输出），而且也没有开启rex模式
						if(
							index !== 1 && !this.rexModeEnabled
						){
							// 报错
							this.error(element, "若要在非最外层作用域使用export表达式，请开启rex模式。");
							return;
						}
						
						var ids, exported = false;
						
						// 设置文本内容
						element.textContent = ';Rexjs.Exports.set("' + current.name + '", ';
						
						// 各种输出类型的解析
						ids = [
							ecmaScript6Export.parseDeclaration(element, index),
							ecmaScript6Export.parseMember(element, index + 1),
							ecmaScript6Export.parseOOP(element, index),
							ecmaScript6Export.parseFunction(element, index),
							ecmaScript6Export.parseVariables(element, index)
						];
						
						// 监听 exported 事件
						this.one(
							"exported",
							function(){
								// 设置为true，说明已经有输出内容
								exported = true;
								
								// 取消监听
								ids.forEach(this.unlisten, this);
							},
							index
						);
						
						// 监听 逗号
						this.one(
							"comma",
							function(commaElement){
								// 如果还没有输出
								if(
									!exported
								){
									return;
								}
								
								var declarationElement = element.nextElementSibling;
								
								// 如果存在申明
								if(
									declarationElement
								){
									// 确实是申明
									if(
										declarationElement.tagName === "declaration"
									){
										return;
									}
								}
								
								// 报错
								this.error(commaElement, "export语句应该是以分号结束，而不是逗号。");
							},
							index
						);
						
						// 监听分号
						this.one(
							"semicolon",
							function(semicolonElement){
								var parentNode = element.parentNode;
								
								// 如果已经有输出
								if(
									exported
								){
									// 插入结束的小括号至分号前面
									parentNode.insertBefore(
										SyntaxTree.createText(")"),
										semicolonElement	
									);
									
									return;
								}
								
								var name = ECMAScript6Parser.extractTextBetween(element, semicolonElement);
								
								// 如果没有输出，而且变量名为空
								if(
									ECMAScript6Parser.isEmpty(name)
								){
									// 报错
									this.error(element, "不应该做无效的输出。");
									return;
								}
								
								// 如果存在变量名，则移除分号
								parentNode.removeChild(semicolonElement);
								
								// 添加变量名文本
								parentNode.appendChild(
									SyntaxTree.createText(
										'"' + name.trim() + '", ' + name + ")" + semicolonElement.textContent
									)
								);
								
								// 触发 exported 事件，通知主解析已有输出
								this.dispatch("exported", element, index);
							},
							index
						);
					}
				);
		},
		parseDeclaration : function(exportElement, index){
			///	<summary>
			///	解析申明输出。
			///	</summary>
			///	<param name="exportElement" type="Element">export关键字元素。</param>
			///	<param name="index" type="Number">索引。</param>
			var ecmaScript6Export = this;
			
			return this
				.syntaxTree
				.one(
					"declaration",
					function(element){
						// 如果与 export 关键字之间不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(exportElement, element)
						){
							// 报错
							this.error(element, "无法输出的申明表达式。");
							// 返回
							return;
						}
						
						var parentNode = element.parentNode;
						
						// 触发 exported 事件，通知主解析已有输出
						this.dispatch("exported", exportElement, index);
						
						// 监听分号
						this.one(
							"semicolon",
							function(e){
								var fragment = ECMAScript6Parser.extractNodesBetween(exportElement, e), names = getNamesOfDeclaration(fragment);
								
								// 把申明插入到 export 关键字前面
								parentNode.insertBefore(fragment, exportElement);
								// 先移除分号
								parentNode.removeChild(e);
								
								// 解析成员，因为下面会利用到解析成员的原理
								ecmaScript6Export.parseMember(exportElement, index + 1);
								
								// 添加起始大括号
								this.appendOpening("brace", "{", "openingBrace");
								
								// 遍历变量名
								names.forEach(
									function(name, i){
										// 如果 i 大于 0
										if(
											i > 0
										){
											// 添加逗号分隔符
											this.appendElement("comma", ",", "comma", null, EndingTypes.Clause);
										}
										
										// 添加变量名
										this.appendText(name);
									},
									this
								);
								
								// 添加结束大括号
								this.appendClosing("brace", "}", "closingBrace");
								// 将分号添加回来
								parentNode.appendChild(e);
							},
							index
						);
					},
					index
				);
		},
		parseFunction : function(exportElement, index){
			///	<summary>
			///	解析函数输出。
			///	</summary>
			///	<param name="exportElement" type="Element">export关键字元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.one(
					"function",
					function(element){
						// 如果与 function 关键字之间不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(exportElement, element)
						){
							// 报错
							this.error(element, "无法输出的函数表达式。");
							// 返回
							return;
						}
						
						// 触发 exported 事件，通知主解析已有输出
						this.dispatch("exported", exportElement, index);
						
						// 监听分号
						this.one(
							"closingBrace",
							function(e){
								// 获取函数名
								var name = getNameOfFunction(element);
								
								// 如果是匿名函数
								if(
									ECMAScript6Parser.isEmpty(name)
								){
									// 报错
									this.error(element, "不应该输出匿名函数。");
									return;
								}
								
								var parentNode = exportElement.parentNode;
								
								// 把 export 关键字添加在函数之后
								parentNode.appendChild(exportElement);
								
								// 再添加函数名
								parentNode.appendChild(
									SyntaxTree.createText('"' + name + '", ' + name)
								);
								
								// 添加分号
								appendSemicolon(parentNode, this, index);
							},
							index + 1
						);
					},
					index
				);
		},
		parseMember : function(exportElement, index){
			///	<summary>
			///	解析成员输出。
			///	</summary>
			///	<param name="exportElement" type="Element">export关键字元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.one(
					"openingBrace",
					function(element, i, next, prevent){
						// 如果与 export 关键字之间不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(exportElement, element)
						){
							// 报错
							this.error(element, "无法输出的成员子句。");
							return;
						}
						
						// 阻止其他监听器执行
						prevent();
						
						// 触发 exported 事件，通知主解析已有输出
						this.dispatch("exported", exportElement, index - 1);
						// 触发 member 事件
						this.dispatch("member", element, index);
						
						// 监听结束大括号
						this.one(
							"closingBrace",
							function(e){
								// 设置 start 元素文本内容
								ECMAScript6Parser.setStartContent(e, "new Rexjs.NamedProperties({");
								// 设置 end 元素文本内容
								ECMAScript6Parser.setEndContent(e, "})");
								
								// 添加分号
								appendSemicolon(exportElement.parentNode, this, index - 1);
							},
							i
						);
					},
					index
				);
		},
		parseOOP : function(exportElement, index){
			///	<summary>
			///	解析面向对象输出。
			///	</summary>
			///	<param name="exportElement" type="Element">export关键字元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.one(
					"oop",
					function(element){
						// 如果与 export 关键字之间不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(exportElement, element)
						){
							// 报错
							this.error(element, "无法输出的面向对象表达式。");
							return;
						}
						
						var parentNode = element.parentNode;
						
						// 触发 exported 事件，通知主解析已有输出
						this.dispatch("exported", exportElement, index);
						
						// 监听分号
						this.one(
							"closingBrace",
							function(e){
								var name, declarationElement = exportElement.nextElementSibling;
								
								// 获取名称
								name = ECMAScript6Parser.getTextBetween(
										declarationElement,
										ECMAScript6Parser.querySelector(
											declarationElement,
											'+operator[value="="]'
										)
									)
									.trim();
								
								// 将面向对象申明插入到 export 关键字前面
								parentNode.appendChild(exportElement);
								
								// 插入变量名
								parentNode.appendChild(
									SyntaxTree.createText('"' + name + '", ' + name)
								);
								
								// 添加分号
								appendSemicolon(parentNode, this, index);
							},
							index + 1
						);
					},
					index
				);
		},
		parseVariables: function(exportElement, index){
			///	<summary>
			///	解析多个变量名输出。
			///	</summary>
			///	<param name="exportElement" type="Element">export关键字元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.one(
					"comma",
					function(element){
						var fragment = ECMAScript6Parser.extractNodesBetween(exportElement, element);
						
						// 先移除此逗号
						element
							.parentNode
							.removeChild(
								element
							);
						
						// 添加大括号
						this.appendOpening("brace", "{", "openingBrace");
						
						// 忽略 as 关键字
						this.tags
							.ignore(
								"as"
							);
						
						// 添加之前提取的节点片段
						this.appendChild(fragment);
						// 将此逗号添加回文档，并触发 comma 事件
						this.appendChild(element, "comma", element, EndingTypes.Clause);
						
						// 监听 beforeEnding
						this.listen(
							"beforeEnding",
							function(endingElement){
								// 添加结束大括号
								this.appendClosing("brace", "}", "closingBrace");
							},
							index + 1
						);
					},
					index
				);
		}
	});
	
	return ECMAScript6Export;
}(
	this.EndingTypes,
	// EXPORT_REGEXP
	/\bexport\b/,
	// appendSemicolon
	function(parentNode, syntaxTree, index){
		var semicolonElement = SyntaxTree.createElement("semicolon");

		// 设置分号文本
		semicolonElement.textContent = ";";
		
		// 故意添加分号
		parentNode.appendChild(semicolonElement);
		
		// 触发分号事件，表示表达式结束
		syntaxTree.dispatch("semicolon", semicolonElement, index);
	},
	// getNamesOfDeclaration
	function(fragment){
		var elements, names = [], lastElement = fragment.firstElementChild;
		
		// 转为数组
		elements = toArray(
			ECMAScript6Parser.querySelectorAll(lastElement, "~comma")
		);
		
		// 添加节点片段
		elements.push(fragment);
		
		// 遍历
		elements.forEach(function(commaElement){
			// 添加名称
			names.push(
				// 获取名称
				ECMAScript6Parser.getTextBetween(
					lastElement,
					// 查询等号
					ECMAScript6Parser.querySelector(
						lastElement,
						'+operator[value="="]'
					) ||
					// 否则使用逗号
					commaElement
				)
				// 去除空白
				.trim()
			);
			
			// 记录上一个分隔元素
			lastElement = commaElement;
		});
		
		// 返回名称
		return names;
	},
	// getNameOfFunction
	function(functionElement){
		var parenthesisElement = functionElement.nextElementSibling;
		
		// 判断true			
		switch(
			true
		){
			// 如果没有小括号，则break
			case parenthesisElement === null :
				break;
			
			// 如果小括号确认失败，则break
			case parenthesisElement.tagName !== "parenthesis" :
				break;
			
			// 默认
			default :
				// 返回已获取的函数名
				return ECMAScript6Parser
					.getTextBetween(
						functionElement,
						parenthesisElement
					)
					// 去除空白
					.trim();
		}
		
		// 返回空字符串
		return "";
	}
);

this.ECMAScript6Default = function(KeywordTag, DEFAULT_REGEXP, protect){
	function ECMAScript6Default(syntaxTree){
		///	<summary>
		///	default 关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"default",
				DEFAULT_REGEXP
			)
		);
	};
	ECMAScript6Default = new Class(ECMAScript6Default, ECMAScript6Parser);
	
	ECMAScript6Default.props({
		parse : function(){
			///	<summary>
			///	解析 default 关键字。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"default",
					function(element, index){
						var exportElement = element.previousElementSibling;
						
						// 判断 true
						switch(
							true
						){
							// 如果 export 关键字不存在，则返回
							case exportElement === null :
								return;
								
							// 如果片段文本不是空的，则返回
							case !ECMAScript6Parser.isEmptyBetween(exportElement, element) :
								return;
							
							// 如果 export 关键字确认失败，则返回
							case exportElement.tagName !== "export" :
								return;
						}
						
						// 移除该 default 关键字
						element
							.parentNode
							.removeChild(
								element
							);
						
						// 重新设置 export 元素的文本内容
						exportElement.textContent = ';Rexjs.Exports.setDefault("' + current.name + '", ';
						
						// 保护，监听不能与 default 搭配的输出类型
						protect(
							this,
							index,
							function(){
								// 报错
								this.error(element, "不应该输出不明确的默认值。");
							}
						);
						
						// 触发 exported 事件，通知主解析已有输出
						this.dispatch("exported", exportElement, index);
					}
				);
		}
	});
	
	return ECMAScript6Default;
}(
	this.KeywordTag,
	// DEFAULT_REGEXP
	/\bdefault\b/,
	// protect
	function(syntaxTree, index, callback){
		var oid, did;
		
		// 监听大括号
		oid = syntaxTree.one("openingBrace", callback, index + 1);
		// 监听申明
		did = syntaxTree.one("declaration", callback, index);
		
		// 监听 exported 事件，就算
		syntaxTree.one(
			"exported",
			function(){
				// 取消大括号的监听
				this.unlisten(oid);
				// 取消申明的监听
				this.unlisten(did);
			},
			index
		);
	}
);

this.ECMAScript6Module = function(MODULE_REGEXP){
	function ECMAScript6Module(syntaxTree){
		///	<summary>
		///	module 表达式解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"module",
				MODULE_REGEXP
			)
		);
	};
	ECMAScript6Module = new Class(ECMAScript6Module, ECMAScript6Parser);
	
	ECMAScript6Module.props({
		parse : function(){
			///	<summary>
			///	解析 module 表达式。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"module",
					function(element){
						// 移除该元素
						element
							.parentNode
							.removeChild(
								element
							);
						
						// 添加 import 元素，并设置文本，继触发事件
						this.appendElement("import", "import", "import");
						// 添加 operator 元素，并设置文本，继触发事件
						this.appendElement("operator", "*", "operator", null, null, true);
						// 添加 as 元素，并设置文本，继触发事件
						this.appendElement("as", "as", "as");
					}	
				);
		}
	});
	
	return ECMAScript6Module;
}(
	// MODULE_REGEXP
	/\bmodule\b/
);

this.ModulePackage = function(Package, contents){
	function ModulePackage(syntaxTree){
		///	<summary>
		///	模块解析器包。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ModulePackage = new Class(ModulePackage, Package);
	
	ModulePackage.package(contents);
	return ModulePackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScript6From,
		this.ECMAScript6Import,
		this.ECMAScript6Export,
		this.ECMAScript6Default,
		this.ECMAScript6Module
	]
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.ExpressionTag,
	this.NamedItem,
	this.NamedItemMap,
	// URL_REGEXP
	/^([A-Za-z][A-Za-z0-9]*?:)\/*(?:([^\/#?:]+?)(?:\:([0-9]+)?)?(\/.*?)?)?(?:(\?.*?)?(#.*)?)?$/,
	// SPACE_REGEXP
	/[^\S ]*/g,
	// current
	null,
	Rexjs.toArray,
	encodeURI,
	decodeURI
));


// 拓展符解析器相关
(function(ECMAScript6Parser, SyntaxTree, ECMAScript6Expression){
	
this.SpreadItem = function(Property){
	function SpreadItem(value){
		///	<summary>
		///	拓展的数组项。
		///	</summary>
		///	<param name="value" type="*">属性值。</param>
	};
	SpreadItem = new Class(SpreadItem, Property);

	return SpreadItem;
}(
	this.Property
);

this.ECMAScript6Spread = function(OperatorTag, SpreadItem, SPREAD_REGEXP, value, forEach, hasNameSeparatorElement, spreadArray, spreadFunctionCall){
	function ECMAScript6Spread(syntaxTree){
		///	<summary>
		///	拓展符解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new OperatorTag(
				"spread",
				SPREAD_REGEXP
			),
			true
		);
	};
	ECMAScript6Spread = new Class(ECMAScript6Spread, ECMAScript6Parser);
	
	ECMAScript6Spread.static({
		get this(){
			///	<summary>
			///	获取当前绑定的 this。
			///	</summary>
			
			// 记录当前值
			var val = value;
			
			// 清空当前值
			value = null;
			// 返回记录值
			return val;
		},
		set this(val){
			///	<summary>
			///	设置当前需要绑定的 this。
			///	</summary>
			///	<param name="val" type="*">需要绑定的 this。</param>
			value = val;
		},
		unspread : function(_rest){
			///	<summary>
			///	去除参数列表中的拓展项，并返回一个新的数组。
			///	</summary>
			///	<param name="_rest" type="*">数组项，可以为 SpreadItem 实例。</param>
			var result = [];
			
			// 遍历数组
			forEach.call(
				arguments,
				function(item){
					// 如果该项是拓展数据项
					if(
						item instanceof SpreadItem
					){
						// 将该拓展数组内的所有对象添加到 array 数组内
						this.apply(result, item.value);
						return;
					}
					
					// 添加单项
					result.push(item);
				},
				result.push
			);
			
			return result;
		}
	});
	
	ECMAScript6Spread.props({
		parse : function(){
			///	<summary>
			///	解析拓展符。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"spread",
					function(element, index){
						var unexcepted = true, parentNode = element.parentNode;
						
						// 判断父节点名称
						switch(
							parentNode.tagName
						){
							// 如果是中括号
							case "bracket" :
								unexcepted = hasNameSeparatorElement(parentNode, this, index, null, spreadArray);
								break;
							
							// 如果是小括号
							case "parenthesis" :
								// 如果在函数表达式内
								if(
									ECMAScript6Expression.in("function", index - 1)
								){
									// 返回不再继续
									return;
								}
							
								unexcepted = !hasNameSeparatorElement(parentNode, this, index, spreadFunctionCall);
								break;
						}
						
						// 如果是未捕获的
						if(
							unexcepted
						){
							// 返回
							return;
						}
						
						// 覆盖监听拓展符
						this.listen(
							"spread",
							function(spreadElement, i, n, p){
								// 阻止其他监听器执行
								p();
								
								// 设置文本内容
								spreadElement.textContent = " new Rexjs.SpreadItem(";
								
								// 监听子句结束事件
								this.one(
									"beforeClauseEnding",
									function(){
										// 添加结束小括号
										this.appendText(")");
									},
									index
								);
							},
							index
						);
						
						// 再触发分隔符事件，这里不会造成死循环，因为上面已经对该事件做了拦截
						this.dispatch("spread", element, index);
					}
				);
		}
	});
	
	return ECMAScript6Spread;
}(
	this.OperatorTag,
	this.SpreadItem,
	// SPREAD_REGEXP
	/\.{3}/,
	// value
	null,
	Array.prototype.forEach,
	// hasNameSeparatorElement
	function(element, syntaxTree, index, _success, _fail){
		return ECMAScript6Parser.getSeparatorElement(
			element,
			function(nameSeparatorElement, expressionSeparatorElement){
				var callback = nameSeparatorElement ? _success : _fail;
				
				// 如果回调函数存在
				if(
					callback
				){
					// 执行回调
					callback(syntaxTree, index, element, nameSeparatorElement, expressionSeparatorElement);
				}
				
				return !!nameSeparatorElement;
			}
		);
	},
	// spreadArray
	function(syntaxTree, index){
		syntaxTree.one(
			"closingBracket",
			function(element){
				// 保护 create 方法
				ECMAScript6Parser.protectMethod(
					ECMAScript6Parser.getStartElement(element),
					ECMAScript6Parser.getEndElement(element),
					element,
					"Rexjs.ECMAScript6Spread.unspread(",
					")"
				);
			},
			index
		);
	},
	// spreadFunctionCall
	function(syntaxTree, index, parenthesisElement, nameSeparator, expressionSeparator){
		var startNode, endNode, parentNode = parenthesisElement.parentNode, isSameElement = nameSeparator === expressionSeparator;
		
		// 监听结束小括号
		syntaxTree.one(
			"closingParenthesis",
			function(){
				// 清空 start 元素文本内容
				ECMAScript6Parser.setStartContent(parenthesisElement, "");
				// 清空 end 元素文本内容
				ECMAScript6Parser.setEndContent(parenthesisElement, "");
			},
			index,
			index
		);
		
		// 创建起始文本
		startNode = SyntaxTree.createText(
			"Function.prototype.bind.apply((Rexjs.ECMAScript6Spread.this = " + (isSameElement ? "void 0," : "")
		);
		
		// 创建结束文本
		endNode = SyntaxTree.createText("))");
		
		// 插入调用 bind 函数的代码
		parentNode.insertBefore(
			startNode,
			expressionSeparator.nextSibling
		);
		
		// 插入 bind.apply 函数的第一个参数的结束小括号代码：
		parentNode.insertBefore(
			SyntaxTree.createText(")"),
			isSameElement ? parenthesisElement : nameSeparator
		);
		
		// 插入 bind.apply 函数的第二个参数
		parentNode.insertBefore(
			SyntaxTree.createText(", Rexjs.ECMAScript6Spread.unspread(Rexjs.ECMAScript6Spread.this, "),
			parenthesisElement
		);

		// 在当前执行小括号之后插入结束文本
		parentNode.appendChild(endNode);
		
		// 保护 bind 方法
		ECMAScript6Parser.protectMethod(startNode, endNode, startNode);
		
		// 添加立即执行的小括号
		endNode.textContent += "()";
	}
);
	
}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.ECMAScript6Expression
));

// for of 相关解析器
(function(ECMAScript6Parser, SyntaxTree){

this.OfIterator = function(){
	function OfIterator(value){
		///	<summary>
		///	for of迭代器。
		///	</summary>
		///	<param name="value" type="*">迭代对象。</param>
		var names = [];
		
		this.assign({
			names : names,
			value : value
		});
		
		for(
			var name in value
		){
			names.push(name);
		}
	};
	OfIterator = new Class(OfIterator);
	
	OfIterator.props({
		get current(){
			///	<summary>
			///	获取当前index所对应名称的对象值。
			///	</summary>
			return this.value[
				this.names[this.index]
			];
		},
		index : 0,
		names : null,
		next : function(){
			///	<summary>
			///	进行到下一个，如果已经超出作用域返回false，否则返回true。
			///	</summary>
			return this.index++ < this.names.length;
		},
		value : null
	});
	
	return OfIterator;
}();

this.ECMAScript6Of = function(ECMAScript6Expression, OfIterator, KeywordTag, OF_REGEXP, id){
	function ECMAScript6Of(syntaxTree){
		///	<summary>
		///	of 操作符解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new KeywordTag(
				"of",
				OF_REGEXP
			)
		);
	};
	ECMAScript6Of = new Class(ECMAScript6Of, ECMAScript6Parser);
	
	ECMAScript6Of.props({
		parse : function(){
			///	<summary>
			///	解析 of 操作符。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"of",
					function(element, index){
						var conditionElement = ECMAScript6Expression.get("condition", index - 1);
						
						// 如果条件元素不存在 或者 不是 for 关键字
						if(
							conditionElement === null || conditionElement.getAttribute("value") !== "for"
						){
							// 报错
							this.error(element, "of语句必须与for循环一起使用");
							// 返回，不再继续
							return;
						}
						
						// 监听关闭小括号事件
						this.one(
							"closingParenthesisWithBrace",
							function(parenthesisElement){
								var variable, $of = "$rex_of_" + id++,
								
									declarationElement = ECMAScript6Parser.querySelector(parenthesisElement, ">declaration");
		
								// 获取用户定义的变量名
								variable = ECMAScript6Parser
									.extractNodesBetween(
										declarationElement || ECMAScript6Parser.getStartElement(parenthesisElement),
										element
									)
									.textContent;
								
								// 设置文本内容
								element.textContent = (declarationElement === null ? "var " : "") + $of + " = new Rexjs.OfIterator(";
								
								// 在 end 标签前插入文本
								parenthesisElement.insertBefore(
									SyntaxTree.createText(
										"), " +
											variable + " = " + $of + ".current;" +
										// 下一个
										$of + ".next();" +
										// 获取当前值
										variable.trim() + " = " + $of + ".current"
									),
									ECMAScript6Parser.getEndElement(parenthesisElement)
								);
							},
							index
						);
					}	
				);
		}
	});
	
	return ECMAScript6Of;
}(
	this.ECMAScript6Expression,
	this.OfIterator,
	this.KeywordTag,
	// OF_REGEXP
	/\bof\b/,
	// id
	0
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree
));


// 模板相关
(function(ECMAScript6Parser, SyntaxTree, SyntaxTag, Array){

this.ECMAScript6Template = function(OpeningingTag, BACKTICK_REGEXP, $OPENING_BRACE_REGEXP, plain, withBackslash, protectFragmentBetween){
	function ECMAScript6Template(syntaxTree){
		///	<summary>
		///	模板解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree
			.add(
				new SyntaxTag(
					"backtick",
					BACKTICK_REGEXP
				)
			)
			.add(
				new OpeningingTag(
					"brace",
					$OPENING_BRACE_REGEXP,
					"$openingBrace"
				)
			);
	};
	ECMAScript6Template = new Class(ECMAScript6Template, ECMAScript6Parser);
	
	ECMAScript6Template.static({
		render : function(substrings, _rest){
			///	<summary>
			///	渲染模板。
			///	</summary>
			///	<param name="substrings" type="Array">模板字符串集合。</param>
			var arr = [];
	
			substrings.forEach(
				function(substr, i){
					if(
						i > 0
					){
						arr.push(this[i]);
					}
					
					arr.push(substr);
				},
				arguments
			);
	
			return arr.join("");
		}
	});
	
	ECMAScript6Template.props({
		parse : function(){
			///	<summary>
			///	开始解析模板。
			///	</summary>
			var ecmaScript6Template = this;
			
			// 监听起始符号
			return this
				.syntaxTree
				.listen(
					"backtick",
					function(element, index){
						var id, pid, parameters = [], withOperator = ECMAScript6Parser.withOperator(element);
						
						// 纯文本语法树
						plain(this);
						
						// 重置元素的文本内容
						element.textContent = (withOperator ? "(Rexjs.ECMAScript6Template.render" : "") + '(["';
						// 监听参数
						pid = ecmaScript6Template.parseParameters(parameters, index + 1);
						
						// 监听结束符号
						id = this.listen(
							"backtick",
							function(el, i, n, p){
								// 阻止其他监听器执行
								p();
								
								// 如果与反斜杠转义符在一起
								if(
									withBackslash(el, this, index, this.fragment, false)
								){
									// 纯文本模式
									plain(this);
									// 返回，当做普通字符串
									return;
								}
								
								// 取消结束符号的监听
								this.unlisten(id);
								// 取消参数的监听
								this.unlisten(pid);
								
								// 重置文本内容
								el.textContent = '"]' +
									// 添加参数
									(
										parameters.length > 0 ? "," + parameters.join(",") : ""
									) +
									")" +
									(
										withOperator ? ")" : ""
									) + 
									// 给中间的片段文本内容加保护，并返回被处理掉的换行
									protectFragmentBetween(
										el,
										el.previousElementSibling
									);
							},
							index
						);
					}
				);
		},
		parseParameters : function(parameters, index){
			///	<summary>
			///	解析模板参数。
			///	</summary>
			///	<param name="index" type="Number">依赖的语法树。</param>
			return this
				.syntaxTree
				.listen(
					"$openingBrace",
					function(element, index){
						// 如果与反斜杠转义符在一起
						if(
							withBackslash(element, this, index, this.fragment, true)
						){
							// 纯文本模式
							plain(this);
							// 返回，当做普通字符串
							return;
						}
						
						// 触发表达式开始事件
						this.dispatch("expressionStart", element, index);
						
						// 监听结束大括号
						this.one(
							"closingBrace",
							function(e, i, n, p){
								var textContent = element.textContent;
								
								// 阻止其他监听器执行
								p();
								
								// 触发表达式结束事件
								this.dispatch("expressionEnd", element, index);
								
								// 纯文本模式
								plain(this);
								
								// 添加参数
								parameters.push(
									// 给中间的片段文本内容加保护，并返回被处理掉的换行
									protectFragmentBetween(
										element,
										element.previousElementSibling
									) +
									// 截取大括号中间的文本内容
									textContent.substring(
										ECMAScript6Parser.getStartElement(element).textContent.length,
										textContent.length - ECMAScript6Parser.getEndElement(element).textContent.length
									)
								);
								
								element.textContent = '", "';
							},
							index
						)
					},
					index
				);
		}
	});
	
	return ECMAScript6Template;
}(
	this.OpeningingTag,
	// BACKTICK_REGEXP
	/`/,
	// $OPENING_BRACE_REGEXP
	/\$\{/,
	// plain
	function(syntaxTree){
		// 开启纯文本模式
		syntaxTree
			.plainText
			.enable(
				"backtick", "$openingBrace"
			);
	},
	// withBackslash
	function(element, syntaxTree, index, fragment, isBrace){
		// 当片段字符串的最后一个字节是反斜杠
		if(
			fragment[fragment.length - 1] === "\\"
		){
			// 如果是大括号
			if(
				isBrace
			){
				// 添加关闭标签
				syntaxTree.appendClosing("brace", "");
			}
			
			// 将元素替换为普通文本
			element
				.parentNode
				.replaceChild(
					SyntaxTree.createText(element.textContent),
					element
				);

			return true;
		}
		
		return false;
	},
	// protectFragmentBetween
	function(element, previousElement){
		// 如果上一个元素不存在
		if(
			previousElement === null
		){
			// 返回
			return;
		}
		
		// 获取每一行内容数组
		var lines = ECMAScript6Parser
			.extractNodesBetween(
				previousElement,
				element
			)
			.textContent
			.split(
				"\n"
			);

		element
			.parentNode
			.insertBefore(
				// 创建替换文本：转义换行、转义双引号、加上结束文本、加上已转义的换行符
				SyntaxTree.createText(
					lines.join("\\n").split("\r").join("\\r").split('"').join('\\"')
				),
				element
			);
		
		// 返回被转义的换行符字符串
		return new Array(lines.length).join("\n");
	}
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.SyntaxTag,
	Array
));

// 其他单功能解析器
(function(ECMAScript6Parser, ECMAScript6Object, SyntaxTree, SyntaxTag){

this.ECMAScript6Number = function(NUMBER_REGEXP, PARSER_INT){
	function ECMAScript6Number(syntaxTree){
		///	<summary>
		///	数字解析，主要是二进制和八进制。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new SyntaxTag(
				"number",
				NUMBER_REGEXP
			)	
		);
	};
	ECMAScript6Number = new Class(ECMAScript6Number, ECMAScript6Parser);
	
	ECMAScript6Number.props({
		parse : function(){
			///	<summary>
			///	解析数字。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"number",
					function(element){
						var textContent = element.textContent;
						
						// 用parseInt方法，重新设置文本
						element.textContent = "(" + PARSER_INT + '("' +
							textContent.substring(2) + '", ' +
							(
								textContent.substring(1, 2).toLowerCase() === "b" ? "2" : "8"
							) +
							"))";
					}
				);
		}
	});
	
	return ECMAScript6Number;
}(
	// NUMBER_REGEXP
	/(?:0[Bb][01]+|0[Oo][0-7]+)\b/,
	// PARSER_INT
	Number.parseInt ? "Number.parseInt" : "parseInt"
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.ECMAScript6Object,
	this.SyntaxTree,
	this.SyntaxTag
));


// ECMAScript各版本相关包
(function(){
	
this.ECMAScript6 = function(Package, contents){
	function ECMAScript6(syntaxTree){
		///	<summary>
		///	ES6所支持的解析器包。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6 = new Class(ECMAScript6, Package);
	
	ECMAScript6.package(contents);
	return ECMAScript6;
}(
	this.Package,
	// contents
	[
		this.BasicPackage,
		this.ObjectPackage,
		this.FunctionPackage,
		this.OOPPackage,
		this.ModulePackage,
		this.ECMAScript6Member,
		this.ECMAScript6ArrayDestructuring,
		this.ECMAScript6Declaration,
		this.ECMAScript6Number,
		this.ECMAScript6Spread,
		this.ECMAScript6Of,
		this.ECMAScript6Template
	]
);

}.call(
	this
));


// 初始化模块
(function(){

this.Launcher = function(Module, ECMAScript6, document, id, forEach){
	function Launcher(){
		///	<summary>
		///	模块启动器。
		///	</summary>
		
		// 监听 DOMContentLoaded 事件
		document.addEventListener(
			"DOMContentLoaded",
			function(){
				// 转为数组
				forEach.call(
					this.querySelectorAll('script[type="module"]'),
					function(script){
						var src = script.src;
						
						// 如果存在src
						if(
							src.length > 0
						){
							// 初始化模块
							new Module(src, ECMAScript6, true);
							return;
						}
						
						// 初始化模块
						new Module(
							// 如果指定了名称，则使用指定名称，否则由系统生成
							script.getAttribute("data-name") || ("inline_script_" + id++ + ".js"),
							ECMAScript6,
							true,
							script.textContent
						);
					}
				);
			}
		);
	};
	Launcher = new StaticClass(Launcher);
	
	return Launcher;
}(
	this.Module,
	this.ECMAScript6,
	document,
	// id
	0,
	Array.prototype.forEach
);

}.call(
	this
));

defineProperties(Rexjs, this);
}(
	Rexjs.Class,
	Rexjs.StaticClass,
	Rexjs.Interface,
	Rexjs.Enum,
	Rexjs.EnumItem,
	Rexjs.defineProperties
);