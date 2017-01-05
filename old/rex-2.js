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
new function(Rexjs, Object, Array, getOwnPropertyNames, getOwnPropertyDescriptor, definePrototype){
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
			// 将函数的 toString 设置为 self.toString，实现模拟 native code
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
	Object.getOwnPropertyDescriptor
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
				// 如果值是 undefined
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

this.constructor = function(constructor, assign, call, apply, bind, toString, getOwnPrototype){
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


// 基于 Rexjs 的拓展类
new function(Rexjs, defineProperties){
"use strict";

// 列表相关类
(function(isNaN){

this.List = function(Array, Object, toArray){
	/**
	 * 对列表进行管理、操作的类
	 * @param {*} _rest - 初始化时所拥有的列表项
	 */
	function List(_rest){
		if(
			arguments.length === 0
		){
			return;
		}

		this.push.apply(this, arguments);
	};
	List = new Rexjs(List);

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
					List.prototype.hasOwnProperty(name)
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
	Rexjs.toArray
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
		
		this.name = name;
	};
	NamedItem = new Rexjs(NamedItem);
	
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

this.NamedItemMap = function(List, NamedItem){
	/**
	 * 已命名项的映射集合
	 */
	function NamedItemMap(){
		List.call(this);
	};
	NamedItemMap = new Rexjs(NamedItemMap, List);
	
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
				NamedItem.validate(name)
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
	this.NamedItem
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
	Descriptor = new Rexjs(Descriptor);

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
		this.value = value;
	};
	Property = new Rexjs(Property);

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
		Property.call(this, value);
		
		this.name = name;
		
		this.assign(
			{ descriptor : _descriptor }
		);
	};
	NamedProperty = new Rexjs(NamedProperty, Property);

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
		var value = {};
		
		if(
			_getter
		){
			value.get = _getter
		}
		
		if(
			_setter
		){
			value.set = _setter;
		}
		
		NamedProperty.call(this, name, value);
	};
	Accessor = new Rexjs(Accessor, NamedProperty);

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
	function Getter(name, getter){
		Accessor.call(this, name, getter);
	};
	Getter = new Rexjs(Getter, Accessor);

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
	function Setter(name, setter){
		Accessor.call(this, name, null, setter);
	};
	Setter = new Rexjs(Setter, Accessor);

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
	NamedProperties = new Rexjs(NamedProperties);
	
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
	Array.prototype.forEach
);

}.call(
	this
));


// 语法辅助相关
(function(List, DOUBLE_REGEXP){

this.SyntaxError = function(getStringSize){
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
	SyntaxError = new Rexjs(SyntaxError);

	return SyntaxError;
}(
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
	SyntaxRegExp = new Rexjs(SyntaxRegExp);
	
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
		this.syntaxTree = syntaxTree;
	};
	PlainText = new Rexjs(PlainText, List);
	
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
	// DOUBLE_REGEXP
	/[^\x00-\xff]+/g
));

// 语法标签相关
(function(){

this.SyntaxTag = function(NamedItem, EndingTypes){
	/**
	 * 语法标签，供于语法树匹配
	 * @param {String} name - 标签名称，可重复，将会定义为作用域标签（如：开始标签、结束标签）
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {Number} _endingType - 该参数表示指定标签是否为子句或表达式的结束符号
	 */
	function SyntaxTag(name, regexp, _id, _endingType){
		NamedItem.call(this, name);
		
		this.id = _id || this.name;
		this.regexp = regexp;
		
		this.assign(
			{ endingType : _endingType }
		);
	};
	SyntaxTag = new Rexjs(SyntaxTag, NamedItem);

	SyntaxTag.static({
		ENDING_TYPE_CLAUSE : 2,
		ENDING_TYPE_GROUP : 14,
		ENDING_TYPE_NONE : 0,
		ENDING_TYPE_STATEMENT : 6
	});

	SyntaxTag.props({
		endingType : SyntaxTag.ENDING_TYPE_NONE,
		id : "",
		regexp : /[^\S\s]/g
	});

	return SyntaxTag;
}(
	this.NamedItem,
	this.EndingTypes
);

this.SpaceTag = function(SyntaxTag){
	/**
	 * 空白标签，供于语法树匹配，一般用于空格、换行等空白文本
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function SpaceTag(name, regexp, _id){
		SyntaxTag.call(this, name, regexp, _id);
	};
	SpaceTag = new Rexjs(SpaceTag, SyntaxTag);

	return SpaceTag;
}(
	this.SyntaxTag
);

this.WordTag = function(SyntaxTag){
	/**
	 * 单词标签，供于语法树匹配，一般用于变量名和关键字等
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {EndingTypes} _endingType - 该参数表示指定标签是否为子句或表达式的结束符号
	 */
	function WordTag(name, regexp, _id){
		SyntaxTag.call(this, name, regexp, _id);
	};
	WordTag = new Rexjs(WordTag, SyntaxTag);
	
	return WordTag;
}(
	this.SyntaxTag
);

this.KeywordTag = function(WordTag){
	/**
	 * 关键字标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function KeywordTag(name, regexp, _id){
		WordTag.call(this, name, regexp, _id);
	};
	KeywordTag = new Rexjs(KeywordTag, WordTag);
	
	return KeywordTag;
}(
	this.WordTag
);

this.TokenTag = function(SyntaxTag){
	/**
	 * 标记标签，供于语法树匹配，一般用于加减乘除等符号标记
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {EndingTypes} _endingType - 该参数表示指定标签是否为子句或表达式的结束符号
	 */
	function TokenTag(name, regexp, _id, _endingType){
		SyntaxTag.call(this, name, regexp, _id, _endingType);
	};
	TokenTag = new Rexjs(TokenTag, SyntaxTag);
	
	return TokenTag;
}(
	this.SyntaxTag
);

this.OperatorTag = function(TokenTag){
	/**
	 * 操作符标签，供于语法树匹配，一般用于加减乘除等运算符标记
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function OperatorTag(name, regexp, _id){
		TokenTag.call(this, name, regexp, _id);
	};
	OperatorTag = new Rexjs(OperatorTag, TokenTag);
	
	return OperatorTag;
}(
	this.TokenTag
);

this.GroupingTag = function(SyntaxTag){
	/**
	 * 分组标签（如：大中小括号），供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function GroupingTag(name, regexp, _id){
		SyntaxTag.call(this, name, regexp, _id);
	};
	GroupingTag = new Rexjs(GroupingTag, SyntaxTag);
	
	return GroupingTag;
}(
	this.SyntaxTag
);

this.OpeningTag = function(GroupingTag){
	/**
	 * 起始标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function OpeningTag(name, regexp, _id){
		GroupingTag.call(this, name, regexp, _id);
	};
	OpeningTag = new Rexjs(OpeningTag, GroupingTag);
	
	return OpeningTag;
}(
	this.GroupingTag
);

this.ClosingTag = function(GroupingTag){
	/**
	 * 结束标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function ClosingTag(name, regexp, _id){
		GroupingTag.call(this, name, regexp, _id);
	};
	ClosingTag = new Rexjs(ClosingTag, GroupingTag);
	
	ClosingTag.override({
		endingType : ClosingTag.ENDING_TYPE_GROUP
	});
	
	return ClosingTag;
}(
	this.GroupingTag
);

this.SyntaxTags = function(NamedItemMap, setNamedItem){
	/**
	 * 语法标签集合
	 */
	function SyntaxTags(){
		NamedItemMap.call(this);
	};
	SyntaxTags = new Rexjs(SyntaxTags, NamedItemMap);
	
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


// 语法事件相关
(function(Array){

this.Listener = function(){
	function Listener(name, value, index, superIndex){
		this.name = name;
		this.value = value;
		this.index = index;
		this.superIndex = superIndex;
	};
	Listener = new Rexjs(Listener);
	
	Listener.props({
		disbale : function(){
			this.disbaled = true;
			return this;
		},
		disbaled : false,
		index : 0,
		superIndex : 0,
		value : function(){}
	});
	
	return Listener;
}();

this.DisposableListener = function(Listener){
	function DisposableListener(name, value, index, superIndex){
		Listener.call(this, name, value, index, superIndex);
	};
	DisposableListener = new Rexjs(DisposableListener, Listener);
	
	return DisposableListener;
}(
	this.Listener
);

this.IDList = function(List){
	function IDList(_rest){
		List.apply(this, arguments);
	};
	IDList = new Rexjs(IDList, List);
	
	return IDList;
}(
	this.List
);

this.ListenerMap = function(){
	function ListenerMap(){};
	ListenerMap = new Rexjs(ListenerMap);
	
	ListenerMap.props({
		delete : function(key){
			return delete this[key];
		},
		set : function(key, val){
			this[key] = val;
			return this;
		}
	});
	
	return ListenerMap;
}();

this.ListMap = function(IDList){
	function ListMap(){};
	ListMap = new Rexjs(ListMap);
	
	ListMap.props({
		delete : function(key, val){
			var list = this[key];
			
			// 如果不是 IDList，说明不存在
			if(
				list instanceof IDList === false
			){
				return false;
			}
			
			var index = list.indexOf(val);

			// 去除此 val
			list.splice(index, 1);

			// 如果 list 不为空
			if(
				list.length === 0
			){
				// 删除记录
				delete this[key];
			}
			
			return true;
		},
		set : function(key, val){
			var list = this[key];
			
			// 如果 key 已存在
			if(
				list instanceof IDList
			){
				// 在已有堆栈上添加一个
				list.push(val);
			}
			else {
				// 设置为新的数组
				this[key] = new IDList(val);
			}
			
			return this;
		}
	});
	
	return ListMap;
}(
	this.IDList
);
	
this.EventMaps = function(IDList, ListenerMap, ListMap, Listener){
	/**
	 * 监听器数据映射
	 */
	function EventMaps(){
		this.blackList = new IDList();
		this.idMap = new ListenerMap();
		this.nameMap = new ListMap();
		this.superIndexMap = new ListMap();
	};
	EventMaps = new Rexjs(EventMaps);
	
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
			this.nameMap
				.delete(
					data.name,
					id
				);
			
			// 从 superIndexMap 中删除记录
			this.superIndexMap
				.delete(
					data.superIndex,
					id
				);

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
			var superIndexMap = this.superIndexMap;
			
			// 去除所有索引比 index1 大 且比 index2 小的监听器
			for(
				var i = index1 + 1, j = index2 + 1;i < j;i++
			){
				var ids = superIndexMap[i];
	
				// 如果 id 不存在
				if(
					ids === void 0
				){
					continue;
				}
				
				// 直接删除记录，防止在 delete 中删除，会导致下面的 forEach 混乱
				delete superIndexMap[i];

				// 去除监听
				ids.forEach(this.delete, this);
			}
			
			return true;
		},
		id : 0,
		idMap : null,
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
		 * @param {Number} superIndex - 监听器父索引值
		 * @param {Boolean} one - 是否只执行一次
		 */
		set : function(name, listener, index, superIndex, one){
			var id = ++this.id;
			
			// 在 nameMap 中设置 id
			this.nameMap
				.set(
					name,
					id
				);
			
			// 在 superIndexMap 中设置 id
			this.superIndexMap
				.set(
					superIndex,
					id
				);

			// 将数据放在存储器里，确保一对一关系
			this.idMap
				.set(
					id,
					new Listener(name, listener, index, superIndex)
				);

			return id;
		},
		superIndexMap : null,
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
	this.IDList,
	this.ListenerMap,
	this.ListMap,
	this.Listener
);

this.SyntaxEvent = function(){
	/**
	 * 语法事件
	 * @param {String} type - 事件类型
	 */
	function SyntaxEvent(type){
		this.type = type;
	};
	SyntaxEvent = new Rexjs(SyntaxEvent);
	
	SyntaxEvent.static({
		PHASE_MAIN : 2,
		PHASE_CAPTURING : 1,
		PHASE_NONE : 0,
		PHASE_RELEASING : 3
	});
	
	SyntaxEvent.props({
		cancelBubble : false,
		/**
		 * 捕获事件阶段
		 * @param {Number} id - 指定的 id
		 */
		capture : function(){
			this.eventPhase = SyntaxEvent.PHASE_CAPTURING;
			return this;
		},
		defaultPrevented : false,
		eventMaps : null,
		eventPhase : SyntaxEvent.PHASE_NONE,
		index : 0,
		/**
		 * 初始化事件
		 * @param {String} name - 事件名称
		 * @param {Node} target - 事件目标
		 * @param {Number} index - 事件索引
		 */
		initEvent : function(name, target, index){
			this.name = name;
			this.target = target;
			this.index = index;

			return this;
		},
		/**
		 * 开始冒泡阶段
		 * @param {Number} id - 指定的 id
		 */
		main : function(){
			this.eventPhase = SyntaxEvent.PHASE_MAIN;
			return this;
		},
		name : "",
		/**
		 * 阻止事件默认事件
		 */
		preventDefault : function(){
			this.defaultPrevented = true;
			return this;
		},
		/**
		 * 阻止事件冒泡
		 */
		stopPropagation : function(){
			this.cancelBubble = true;
			return this;
		},
		/**
		 * 释放事件阶段
		 */
		release : function(){
			this.eventPhase = SyntaxEvent.PHASE_RELEASING;
			return this;
		},
		target : null,
		type : ""
	});
	
	return SyntaxEvent;
}();

this.NodeEvent = function(SyntaxEvent, capture, release){
	/**
	 * 节点事件
	 * @param {String} type - 事件类型
	 */
	function NodeEvent(name){
		SyntaxEvent.call(this, name);
	};
	NodeEvent = new Rexjs(NodeEvent, SyntaxEvent);
	
	NodeEvent.override({
		/**
		 * 捕获事件阶段
		 * @param {String} name - 事件名称
		 */
		capture : function(){
			capture.call(this);
			
			if(
				!this.defaultPrevented
			){
				this.syntaxNode
					.parentNode
					.appendChild(
						this.target
					);
			}
			
			return this;
		},
		/**
		 * 释放事件阶段
		 * @param {String} name - 事件名称
		 */
		release : function(){
			release.call(this);
			
			if(
				!this.defaultPrevented
			){
				
			}
			
			return this;
		}
	});
	
	NodeEvent.props({
		syntaxNode : null,
		/**
		 * 初始化节点事件
		 * @param {String} name - 事件名称
		 * @param {Node} target - 事件目标
		 * @param {Number} index - 事件索引
		 * @param {Number} endingType - 事件目标的结束类型
		 */
		initNodeEvent : function(name, target, index, endingType){
			this.syntaxNode = syntaxNode;
			this.endingType = endingType;
			
			this.initEvent(name, target, index);
			return this;
		}
	});
	
	return NodeEvent;
}(
	this.SyntaxEvent,
	this.SyntaxEvent.prototype.capture,
	this.SyntaxEvent.prototype.release
);

this.SyntaxEventTarget = function(EventMaps, SyntaxEvent, getIndex, getParentIndex){
	/**
	 * 语法标签监听器，用于触发特定的回调函数，伪DOM事件
	 */
	function SyntaxEventTarget(){
		this.captorMaps = new EventMaps();
		this.mainMaps = new EventMaps();
		this.releasorMaps = new EventMaps();
	};
	SyntaxEventTarget = new Rexjs(SyntaxEventTarget);

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
		dispatchEvent : function(SyntaxEvent){
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
		addListener : function(listener, _phase){
			var maps;
			
			switch(
				_phase
			){
				case void 0 :
					maps = this.mainMaps;
					break;
					
				case SyntaxEvent.PHASE_CAPTURING :
					maps = this.captorMaps;
					break;
					
				case SyntaxEvent.PHASE_RELEASING :
					maps = this.releasorMaps;
					break;
				
				default :
					maps = this.mainMaps;
					break;
			}

			// 返回 id，是 unlisten 的唯一参数
			return maps.set(
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
	this.SyntaxEvent,
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
	},
	// dispatch
	function(){
		
	}
);

}.call(
	this,
	Array
));


// 语法树相关 
(function(Array, document, supportRepeat){



}.call(
	this,
	Array,
	document,
	!!"".repeat	
));

defineProperties(Rexjs, this);
}(
	Rexjs,
	Rexjs.defineProperties
);