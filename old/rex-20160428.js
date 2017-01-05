// Rexjs 的实现
new function(window, descriptor, defineProperty, getPrototypeOf, setPrototypeOf, getOwnPropertyNames){
"use strict";

this.Rexjs = function(Function, create, getProperties, setPrototypeOf){
	/**
	 * 创建一个继承至指定父类的子类
	 * @param {Function} constructor - 构造函数
	 * @param {Rexjs} _SuperClass - 需要继承的父类
	 */
	return function Rexjs(constructor, _SuperClass){
		var __proto__, prototype, properties = getProperties(constructor);

		// 判断父类类型
		switch(
			typeof _SuperClass
		){
			// 如果是函数
			case "function" :
				__proto__ = _SuperClass;
				prototype = _SuperClass.prototype;
				break;

			// 如果是 undefined
			case "undefined" :
				__proto__ = Rexjs.getOwnPrototype();
				prototype = this.getOwnClass().prototype;
				break;

			// 默认
			default :
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

defineProperty(window, "Rexjs", this);
}(
	window,
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


// 原型链属性的定义
new function(Function, prototype, propertyIsEnumerable, hasOwnProperty, isPrototypeOf, getPrototypeOf, defineProperty, getOwnPropertyDescriptor, definePrototype){
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
		for(
			var name in props
		){
			var val = props[name];

			// 如果值是 undefined
			if(
				val === void 0
			){
				continue;
			}

			// 设置属性
			this[name] = val;
		}
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

this.constructor = function(constructor, assign, call, apply, bind, toString, getOwnPrototype, defineProperties){
	defineProperties(
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
			 */
			override : function(props){
				defineProperties(this.prototype, props);
			},
			/**
			 * 将一个或多个属性添加到该类，并/或修改现有属性的特性
			 * @param {Object} props - 包含一个或多个属性的键值对
			 */
			props : function(props){
				defineProperties(this.prototype, props);
			},
			/**
			 * 将一个或多个静态属性添加到该类，并/或修改现有属性的特性
			 * @param {Object} props - 包含一个或多个属性的键值对
			 */
			static : function(props){
				defineProperties(this, props);
			},
			/**
			 * 对象字符串
			 */
			toString : function(){
				return "function " + this.name + "() { native code }";
			}
		}
	);

	return constructor;
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
	},
	// defineProperties
	function(obj, props){
		for(
			var name in props
		){
			var descriptor = getOwnPropertyDescriptor(props, name);

			descriptor.enumerable = false;

			defineProperty(obj, name, descriptor);
		}
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

prototype
	.constructor
	.static
	.call(
		definePrototype(prototype),
		this
	);
}(
	Function,
	Rexjs.prototype,
	Object.prototype.propertyIsEnumerable,
	Object.prototype.hasOwnProperty,
	Object.prototype.isPrototypeOf,
	Object.getPrototypeOf,
	Object.defineProperty,
	Object.getOwnPropertyDescriptor,
	// definePrototype
	function(obj){
		/*
			考虑到ES6初稿已经将 __proto__ 属性移除标准，所以在支持ES6的情况下，就不做处理；
			再者，IE10及以下也没有 __proto__ 属性，也不用处理；
			最后，就算其他支持 __proto__ 属性的浏览器，不定义 __proto__ 也没关系，
			通过 Object.getPrototypeO f方法一样可以获取，只不过在控制台里看不到 __proto__ 属性而已。
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


// 基本方法和属性的定义
new function(Rexjs, Array){
"use strict";

this.except = function(){
	/**
	 * 返回一个不包含所有指定属性名称的对象
	 * @param {Object} obj - 需要排除属性的对象
	 * @param {Array} props - 需要排除的属性名称数组
	 */
	return function except(obj, props){
		var result = {};

		for(
			var name in obj
		){
			if(
				props.indexOf(name) > -1
			){
				continue;
			}

			result[name] = obj[name];
		}

		return result;
	};
}();

this.every = function(){
	/**
	 * 确定对象的所有成员是否满足指定的测试
	 * @param {*} obj - 需要测试成员的对象
	 * @param {Function} fn - 用于测试对象成员的测试函数
	 * @param {*} _this - 指定测试函数的 this 对象
	 */
	return function every(obj, fn, _this){
		// 如果是数组
		if(
			obj instanceof Array
		){
			// 调用数组自带的 every
			return obj.every(fn, _this);
		}

		// 遍历
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
	 * @param {*} obj - 需要遍历的对象
	 * @param {Function} fn - 指定操作的函数
	 * @param {*} _this - 指定操作函数的 this 对象
	 * @param {Boolean} _arrayLike - 对象是否是一种伪数组
	 */
	return function forEach(obj, fn, _this, _arrayLike){
		// 如果是数组
		if(
			_arrayLike
		){
			for(
				var i = 0, n = obj.length;i < n;i++
			){
				// 调用测试函数
				fn.call(_this, obj[i], i, obj);
			}
		}
		else {
			// 遍历
			for(
				var name in obj
			){
				// 调用测试函数
				fn.call(_this, obj[name], name, obj);
			}
		}

		return obj;
	};
}(
	this.every
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

this.set = function(){
	/**
	 * 添加或修改指定对象的属性
	 * @param {*} obj - 需要添加或修改属性的对象
	 * @param {Object} props - 需要添加或修改的属性集合
	 */
	return function set(obj, props){
		for(
			var name in props
		){
			obj[name] = props[name];
		}

		return obj;
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
	Array
);


// 基于 Rexjs 的拓展类
new function(Rexjs, forEach){
"use strict";

// 列表相关
void function(isNaN, hasOwnProperty){

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
			var list = new this.constructor();

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
		},
		/**
		 * 在原列表上，合并另一个集合
		 * @param {List, Array} list - 另一个集合
		 */
		combine : function(list){
			this.push.apply(this, toArray(list));
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

this.ListMap = function(List){
	/**
	 * 列表映射
	 */
	function ListMap(){};
	ListMap = new Rexjs(ListMap);

	ListMap.static({
		/**
		 * 创建一个新的空列表
		 */
		createList : function(){
			return new List();
		},
		/**
		 * 删除指定关键字所对应属性中指定的对象
		 * @param {ListMap} listMap - 指定的 ListMap 实例
		 * @param {String} key - 指定的关键字
		 * @param {*} val - 需要删除的对象
		 * @param {Boolean} _all - 是否删除所有满足匹配的项
		 */
		delete : function(listMap, key, value, _all){
			var list = listMap[key];

			// 如果需要移除所有匹配项
			if(
				_all
			){
				// 遍历
				for(
					var i = 0, j = list.length;
					i < j;
					i++
				){
					// 如果相等
					if(
						list[i] === value
					){
						// 去除此项
						list.splice(i, 1);
						j--;
						i--;
					}
				}
			}
			else {
				// 去除此项
				list.splice(
					typeof value === "number" ? index : list.indexOf(value),
					1
				);
			}

			// 如果 list 不为空
			if(
				list.length === 0
			){
				// 删除记录
				delete listMap[key];
			}
		},
		/**
		 * 通过索引删除指定关键字所对应属性中指定的对象
		 * @param {ListMap} listMap - 指定的 ListMap 实例
		 * @param {String} key - 指定的关键字
		 * @param {Number} index - 指定的索引
		 */
		deleteBy : function(listMap, key, index){
			this.delete(listMap, key, index);
		},
		/**
		 * 获取指定关键字所对应的列表
		 * @param {ListMap} listMap - 指定的 ListMap 实例
		 * @param {String} key - 指定的关键字
		 */
		get : function getList(listMap, key){
			return this.has(listMap, key) ? listMap[key] : null;
		},
		/**
		 * 判断映射表中是否有指定的映射
		 * @param {ListMap} listMap - 指定的 ListMap 实例
		 * @param {String} key - 指定的关键字
		 * @param {*} _value - 可指定的映射值
		 */
		has : function(listMap, key, _value){
			// 如果列表存在
			if(
				hasOwnProperty.call(listMap, key)
			){
				// 如果 _value 不存在，返回 true，否则返回检索结果
				return _value ? listMap[key].indexOf(_value) > -1 : true;
			}
			
			return false;
		},
		/**
		 * 往指定关键字的列表中设置新的对象
		 * @param {ListMap} listMap - 指定的列表映射
		 * @param {String} key - 指定的关键字
		 * @param {*} val - 需要设置的对象
		 * @param {Boolean} _distinct - 是否去重
		 */
		set : function(listMap, key, value, _distinct){
			// 如果列表不存在
			if(
				!this.has(listMap, key)
			){
				(
					// 设置为新的列表
					listMap[key] = this.createList()
				)
				// 添加新项
				.push(
					value
				);
				
				return;
			}
			
			var list = listMap[key];
			
			switch(
				true
			){
				// 如果不需要去重
				case !_distinct :
					// 添加项
					list.push(value);
					return;
				
				// 如果在需要去重的情况下且列表中没有该项
				case list.indexOf(value) === -1 :
					// 添加项
					list.push(value);
					return;
			}
		}
	});

	return ListMap;
}(
	this.List
);

this.NamedItem = function(namable){
	/**
	 * 已命名项
	 * @param {String} name - 项的名称
	 */
	function NamedItem(name){
		// 验证名称
		if(
			namable(name)
		){
			this.name = name;
			return;
		}
		
		// 抛出错误
		throw '"' + name + '"' + "是一个无效的名称";
	};
	NamedItem = new Rexjs(NamedItem);

	NamedItem.props({
		name : ""
	});

	return NamedItem;
}(
	// namable
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

		// 返回 false
		return false;
	}
);

this.NamedItemMap = function(NamedItem, push, splice, indexOf){
	/**
	 * 已命名项的映射集合
	 */
	function NamedItemMap(){
		this.length = 0;
	};
	NamedItemMap = new Rexjs(NamedItemMap);
	
	NamedItemMap.static({
		/**
		 * 获取已命名项
		 * @param {NamedItemMap} namedItemMap - 指定的 NamedItemMap 实例
		 * @param {String, Number} key - 指定的名称或索引
		 */
		getNamedItem : function(namedItemMap, key){
			// 如果有指定项
			if(
				hasOwnProperty.call(namedItemMap, key)
			){
				var nameItem = namedItemMap[key];
				
				// 如果是 NamedItem 的实例
				if(
					nameItem instanceof NamedItem
				){
					return nameItem;
				}
			}
			
			return null;
		},
		/**
		 * 检索指定名称的项
		 * @param {NamedItemMap} namedItemMap - 指定的 NamedItemMap 实例
		 * @param {String, Number} key - 指定的名称或索引
		 */
		indexNamedItem : function(namedItemMap, key){
			var namedItem = this.getNamedItem(namedItemMap, key);
			
			// 如果有指定项
			if(
				namedItem === null
			){
				return indexOf.call(namedItemMap, namedItem);
			}
			
			return -1;
		},
		/**
		 * 移除指定名称的项
		 * @param {NamedItemMap} namedItemMap - 指定的 NamedItemMap 实例
		 * @param {String, Number} key - 指定的名称或索引
		 */
		removeNamedItem : function(namedItemMap, key){
			var index = namedItemMap.indexNamedItem(key);

			// 如果 index 等于 -1，说明此项不存在
			if(
				index === -1
			){
				return;
			}
			
			// 从数组中移除
			splice.call(namedItemMap, index, 1);

			// 如果 key 不是索引
			if(
				isNaN(key - 0)
			){
				// 从键值对中移除
				delete namedItemMap[key];
			}
		},
		/**
		 * 设置项
		 * @param {NamedItemMap} namedItemMap - 指定的 NamedItemMap 实例
		 * @param {*} namedItem - 指定的项
		 * @param {Number} _index - 在指定索引处插入该项
		 */
		setNamedItem : function(namedItemMap, namedItem, _index){
			// 如果不是 NamedItem 的实例
			if(
				namedItem instanceof NamedItem === false
			){
				// 报错
				throw '第一个参数应该是"NamedItem"的实例。';
				return;
			}
			
			// 设置键值对项
			namedItemMap[namedItem.name] = namedItem;

			switch(
				true
			){
				// 如果没有提供索引项
				case typeof _index !== "number" :
				// 或者大于等于长度
				case _index >= this.length :
					// 追加项
					push.call(namedItemMap, namedItem);
					return;
				
				// 如果等于 -1，则说明不需要作为数组项看待
				case _index === -1 :
					return;
				
				// 默认	
				default :
					// 插入项
					splice.call(namedItemMap, _index, 0, namedItem);
					return;
			}
		}
	});

	NamedItemMap.props({
		length : 0
	});

	return NamedItemMap;
}(
	this.NamedItem,
	Array.prototype.push,
	Array.prototype.splice,
	Array.prototype.indexOf
);

}.call(
	this,
	Number.isNaN || window.isNaN,
	Object.prototype.hasOwnProperty
);


// 事件相关
void function(NONE_PHASE, CAPTURING_PHASE, USING_PHASE, RELEASING_PHASE){

this.Event = function(){
	/**
	 * 事件
	 * @param {String} type - 事件类型
	 */
	function Event(type){
		this.type = type;
	};
	Event = new Rexjs(Event);

	Event.static({
		CAPTURING_PHASE : CAPTURING_PHASE,
		NONE_PHASE : NONE_PHASE,
		RELEASING_PHASE : RELEASING_PHASE,
		USING_PHASE : USING_PHASE
	});

	Event.props({
		cancelBubble : false,
		defaultPrevented : false,
		eventPhase : NONE_PHASE,
		/**
		 * 初始化事件
		 * @param {String} type - 事件类型
		 */
		initEvent : function(type){
			this.type = type;
		},
		/**
		 * 阻止事件默认事件
		 */
		preventDefault : function(){
			this.defaultPrevented = true;
		},
		/**
		 * 设置事假阶段
		 * @param {Number} eventPhase - 事件阶段
		 */
		setEventPhase : function(eventPhase){
			this.eventPhase = eventPhase;
		},
		/**
		 * 阻止事件冒泡
		 */
		stopPropagation : function(){
			this.cancelBubble = true;
		},
		target : null,
		type : ""
	});

	return Event;
}();

this.DevisionPoint = function(pointToPoint){
	/**
	 * 分割点，一般用于3段式的线性数组分割
	 */
	function DevisionPoint(target){
		this.target = target;
	};
	DevisionPoint = new Rexjs(DevisionPoint);
	
	DevisionPoint.props({
		/**
		 * 从结束点到左分割点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		endToLeft : function(callback, _this){
			var target = this.target;
			
			pointToPoint(target.length, this.left, target, callback, _this);
		},
		/**
		 * 从结束点到右分割点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		endToRight : function(callback, _this){
			var target = this.target;
			
			pointToPoint(target.length, this.right, target, callback, _this);
		},
		/**
		 * 从结束点到起始点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		endToStart : function(callback, _this){
			var target = this.target;
			
			pointToPoint(target.length, 0, target, callback, _this);
		},
		left : 0,
		/**
		 * 从左分割点到结束点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		leftToEnd : function(callback, _this){
			var target = this.target;
			
			pointToPoint(this.left, target.length, target, callback, _this);
		},
		/**
		 * 从左分割点到右分割点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		leftToRight : function(callback, _this){
			pointToPoint(this.left, this.right, this.target, callback, _this);
		},
		/**
		 * 从左分割点到起始点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		leftToStart : function(callback, _this){
			pointToPoint(this.left, 0, this.target, callback, _this);
		},
		right : 0,
		/**
		 * 从右分割点到结束点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		rightToEnd : function(callback, _this){
			var target = this.target;
			
			pointToPoint(this.right, target.length, target, callback, _this);
		},
		/**
		 * 从右分割点到左分割点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		rightToLeft : function(callback, _this){
			pointToPoint(this.right, this.left, this.target, callback, _this);
		},
		/**
		 * 从右分割点到起始点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		rightToStart : function(callback, _this){
			pointToPoint(this.right, 0, this.target, callback, _this);
		},
		/**
		 * 从起始点到结束点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		startToEnd : function(callback, _this){
			var target = this.target;
			
			pointToPoint(0, target.length, target, callback, _this);
		},
		/**
		 * 从起始点到左分割点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		startToLeft : function(callback, _this){
			pointToPoint(0, this.left, this.target, callback, _this);
		},
		/**
		 * 从起始点到右分割点，期间每个点将执行一次指定的回调函数
		 * @param {Function} callback - 指定的回调函数
		 * @param {*} _this - 回调函数需要绑定的 this 对象
		 */
		startToRight : function(callback, _this){
			pointToPoint(0, this.right, this.target, callback, _this);
		},
		target : null
	});
	
	return DevisionPoint;
}(
	// pointToPoint
	function(point1, point2, target, callback, _this){
		if(
			point1 > point2
		){
			while(
				--point1 >= point2
			){
				if(
					callback.call(_this, target[point1], point1)
				){
					break;
				}
			}
			
			return;
		}
		
		while(
			point1 < point2
		){
			if(
				callback.call(_this, target[point1], point1)
			){
				break;	
			}
			
			point1++;
		}
	}
);

this.ListenerListMap = function(ListMap, DevisionPoint){
	/**
	 * 监听器列表映射
	 */
	function ListenerListMap(){
		ListMap.call(this);
	};
	ListenerListMap = new Rexjs(ListenerListMap, ListMap);
	
	ListenerListMap.static({
		/**
		 * 创建一个新的空监听器列表
		 */
		createList : function(){
			// 这里不适用 Rexjs.List，因为毕竟它不是原生态的数组，在性能上比数组慢了3倍左右
			var list = [];
			
			list.point = new DevisionPoint(list);
			return list;
		},
		/**
		 * 删除指定事件名称所对应属性中指定的监听器
		 * @param {ListenerListMap} listenerListMap - 指定的 ListMap 实例
		 * @param {String} type - 监听器所关联的事件名称
		 * @param {Function, Number} value - 需要删除的监听器或监听器索引
		 */
		delete : function(listenerListMap, type, value){
			var list = listenerListMap[type], point = list.point, index = typeof value === "number" ? value : list.indexOf(value);
			
			// 去除此项
			list.splice(index, 1);
			
			switch(
				true
			){
				// 如果 index 小于 left，说明删除的是捕获阶段的监听器
				case index < point.left :
					point.left--;
					point.right--;
					break;
				
				// 如果 index 大于 left，且小于 right，说明删除的是引用阶段的监听器
				case index < point.right :
					point.right--;
					break;
			}

			// 如果 list 不为空
			if(
				list.length === 0
			){
				// 删除记录
				delete listenerListMap[type];
			}
		},
		/**
		 * 往指定事件名称的列表中设置新的监听器
		 * @param {ListenerListMap} listenerListMap - 指定的列表映射
		 * @param {String} type - 监听器所关联的事件名称
		 * @param {Function} listener - 需要设置的监听器
		 */
		set : function(listenerListMap, type, listener, _phase){
			var list;
			
			// 如果列表不存在
			if(
				!this.has(listenerListMap, type)
			){
				// 设置为新的列表
				list = listenerListMap[type] = this.createList();
			}
			else {
				list = listenerListMap[type];
				
				// 如果在列表存在该项
				if(
					list.indexOf(listener) > -1
				){
					return;
				}
			}
			
			// 判断阶段
			switch(
				_phase
			){
				// 如果是捕获阶段
				case CAPTURING_PHASE :
					var point = list.point;
					
					list.splice(point.left, 0, listener);
				
					point.left++;
					point.right++;
					break;
				
				// 如果是释放阶段
				case RELEASING_PHASE :
					list.push(listener);
					break;
				
				// 默认，即引用阶段
				default :
					list.splice(list.point.right++, 0, listener);
					break;
			}
		}
	});
	
	return ListenerListMap;
}(
	this.ListMap,
	this.DevisionPoint
);

this.EventTarget = function(ListenerListMap){
	/**
	 * 事件目标
	 */
	function EventTarget(){
		this.map = new ListenerListMap();
	};
	EventTarget = new Rexjs(EventTarget);

	EventTarget.props({
		/**
		 * 添加事件监听器
		 * @param {String} type - 事件类型
		 * @param {Function} listener - 指定的监听器
		 * @param {Number} _phase - 监听的阶段
		 */
		addEventListener : function(type, listener, _phase){
			ListenerListMap.set(this.map, type, listener, _phase);
		},
		/**
		 * 触发事件
		 * @param {Event} event - 已经初始完毕的事件对象
		 */
		dispatchEvent : function(event){
			var map = this.map, type = event.type;
			
			// 设置 target
			event.target = this;
			
			// 如果没有对应监听器
			if(
				!ListenerListMap.has(map, type)
			){
				// 设置捕获阶段
				event.setEventPhase(CAPTURING_PHASE);
				// 设置引用阶段
				event.setEventPhase(USING_PHASE);
				// 设置释放阶段
				event.setEventPhase(RELEASING_PHASE);
				// 设置无阶段
				event.setEventPhase(NONE_PHASE);
				return;
			}
			
			var callback, point = map[type].point;
			
			// 回调函数
			callback = function(listener, index){
				switch(
					true
				){
					// 如果已经取消冒泡，则不再继续
					case event.cancelBubble :
						return true;
					
					// 如果监听器返回 true
					case listener.call(this, event) :
						// 取消监听
						ListenerListMap.deleteBy(map, type, index);
						return false;
				}
			};
			
			// 设置捕获阶段
			event.setEventPhase(CAPTURING_PHASE);
			// 调用捕获阶段事件监听器
			point.leftToStart(callback, this);
			
			// 设置引用阶段
			event.setEventPhase(USING_PHASE);
			// 调用引用阶段事件监听器
			point.rightToLeft(callback, this);
			
			// 设置释放阶段
			event.setEventPhase(RELEASING_PHASE);
			// 调用释放阶段事件监听器
			point.endToRight(callback, this);
			
			// 设置无阶段
			event.setEventPhase(NONE_PHASE);
		},
		maps : null,
		/**
		 * 移除指定的事件监听器
		 * @param {String} type - 事件类型
		 * @param {Function} listener - 指定的监听器
		 */
		removeEventListener : function(type, listener){
			ListenerListMap.delete(this.map, type, listener);
		}
	});

	return EventTarget;
}(
	this.ListenerListMap
);

}.call(
	this,
	// NONE_PHASE
	0,
	// CAPTURING_PHASE
	1,
	// USING_PHASE
	2,
	// RELEASING_PHASE
	3
);


void function(){

this.Property = function(Descriptor){
	/**
	 * 属性类，一般用于特殊的属性声明
	 * @param {*} value - 属性值
	 */
	function Property(value){
		this.value = value;
	};
	Property = new Rexjs(Property);

	Property.props({ value : null });
	return Property;
}(
	this.Descriptor
);

this.NamedProperty = function(Property){
	/**
	 * 已命名的属性类，一般用于特殊名称的对象属性声明
	 * @param {String} name - 属性名称
	 * @param {*} value - 属性值
	 */
	function NamedProperty(name, value){
		Property.call(this, value);
		
		this.name = name;
	};
	NamedProperty = new Rexjs(NamedProperty, Property);

	NamedProperty.props({ name : ""});
	return NamedProperty;
}(
	this.Property
);

this.Accessor = function(NamedProperty){
	/**
	 * 访问器属性
	 * @param {String} name - 属性名称
	 * @param {Function} callback - 属性访问器回调函数
	 */
	function Accessor(name, callback){
		NamedProperty.call(this, name, callback);
	};
	Accessor = new Rexjs(Accessor, NamedProperty);

	return Accessor;
}(
	this.NamedProperty
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
		Accessor.call(this, name, setter);
	};
	Setter = new Rexjs(Setter, Accessor);

	return Setter;
}(
	this.Accessor
);
	
}.call(
	this
);


// 语法标签相关
void function(){

this.SyntaxTag = function(NamedItem){
	/**
	 * 语法标签
	 * @param {String} name - 标签名称，可重复，将会定义为作用域标签（如：开始标签、结束标签）
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {Function} _visitor - 访问器，即语法树完全创建后，被回访时触发
	 */
	function SyntaxTag(name, _regexp, _visitor, _transformer){
		NamedItem.call(this, name);

		this.assign({
			regexp : _regexp,
			transformer : _transformer,
			visitor : _visitor
		});
	};
	SyntaxTag = new Rexjs(SyntaxTag, NamedItem);

	SyntaxTag.props({
		/**
		 * 将标签添加到语法树中
		 * @param {SyntaxTree} syntaxTree - 添加该该标签的目标语法树
		 * @param {String} textContent - 元素的文本内容
		 */
		live : function(syntaxTree, textContent){
			return syntaxTree.appendTag(this, textContent);
		},
		regexp : null,
		transformer : null,
		visitor : null
	});

	return SyntaxTag;
}(
	this.NamedItem
);

this.TextTag = function(SyntaxTag){
	/**
	 * 文本标签，一般用于空格、换行等空白文本
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {Function} _visitor - 访问器，即语法树完全创建后，被回访时触发
	 */
	function TextTag(name, _regexp, _visitor, _transformer){
		SyntaxTag.apply(this, arguments);
	};
	TextTag = new Rexjs(TextTag, SyntaxTag);

	return TextTag;
}(
	this.SyntaxTag
);

this.ElementTag = function(SyntaxTag){
	/**
	 * 元素标签
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {Function} _visitor - 访问器，即语法树完全创建后，被回访时触发
	 */
	function ElementTag(name, _regexp, _visitor, _transformer){
		SyntaxTag.apply(this, arguments);
	};
	ElementTag = new Rexjs(ElementTag, SyntaxTag);
	
	return ElementTag;
}(
	this.SyntaxTag
);

this.TokenTag = function(ElementTag){
	/**
	 * 标记标签，一般用于加减乘除等符号标记
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {Function} _visitor - 访问器，即语法树完全创建后，被回访时触发
	 * @param {Number} _type - 标签类型
	 */
	function TokenTag(name, _regexp, _visitor, _transformer){
		ElementTag.apply(this, arguments);
	};
	TokenTag = new Rexjs(TokenTag, ElementTag);

	return TokenTag;
}(
	this.ElementTag
);

this.WordTag = function(ElementTag){
	/**
	 * 单词标签，一般用于变量名和关键字等
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {Function} _visitor - 访问器，即语法树完全创建后，被回访时触发
	 */
	function WordTag(name, _regexp, _visitor, _transformer){
		ElementTag.apply(this, arguments);
	};
	WordTag = new Rexjs(WordTag, ElementTag);

	return WordTag;
}(
	this.ElementTag
);

this.KeywordTag = function(WordTag, TYPE_KEYWORD_OPERATOR){
	/**
	 * 关键字标签
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {Function} _visitor - 访问器，即语法树完全创建后，被回访时触发
	 */
	function KeywordTag(name, _regexp, _visitor, _transformer){
		WordTag.apply(this, arguments);
	};
	KeywordTag = new Rexjs(KeywordTag, WordTag);

	KeywordTag.override({
		type : KeywordTag.TYPE_KEYWORD
	});

	return KeywordTag;
}(
	this.WordTag
);

this.BeforeTag = function(ElementTag){
	/**
	 * before 标签，一般用于分组标签的主内容之前，用于显示起始标签的文本内容
	 */
	function BeforeTag(){
		ElementTag.call(this, "before");
	};
	BeforeTag = new Rexjs(BeforeTag, ElementTag);
	
	BeforeTag.override({
		/**
		 * 重写访问器
		 */
		visitor : function(){
			var parentNode = this.parentNode, onopen = parentNode.onopen;
			
			// 如果存在
			if(
				onopen
			){
				// 立即调用
				onopen.call(parentNode);
			}
		}
	});
	
	return BeforeTag;
}(
	this.ElementTag
);

this.AfterTag = function(ElementTag){
	/**
	 * after 标签，一般用于分组标签的主内容之后，用于显示结束标签的文本内容
	 */
	function AfterTag(){
		ElementTag.call(this, "after");
	};
	AfterTag = new Rexjs(AfterTag, ElementTag);
	
	AfterTag.override({
		/**
		 * 重写访问器
		 */
		visitor : function(){
			var parentNode = this.parentNode, onclose = parentNode.onclose;
			
			// 如果存在
			if(
				onclose
			){
				// 立即调用
				onclose.call(parentNode);
			}
		}
	});
	
	return AfterTag;
}(
	this.ElementTag
);

this.PartnerTag = function(TokenTag){
	/**
	 * 分组标签（如：大中小括号）
	 * @param {String} name - 标签名称
	 * @param {String} alias - 标签别名，用于区分起始标签和结束标签
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {Function} _visitor - 访问器，即语法树完全创建后，被回访时触发
	 */
	function PartnerTag(name, alias, _regexp, _visitor, _transformer){
		TokenTag.call(this, name, _regexp, _visitor, _transformer);
		
		this.alias = alias;
	};
	PartnerTag = new Rexjs(PartnerTag, TokenTag);
	
	PartnerTag.props({
		alias : ""
	});

	return PartnerTag;
}(
	this.TokenTag
);

this.OpenTag = function(PartnerTag){
	/**
	 * 起始标签
	 * @param {String} name - 标签名称
	 * @param {String} alias - 标签别名，用于区分起始标签和结束标签
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {Function} _visitor - 访问器，即语法树完全创建后，被回访时触发
	 * @param {Number} _type - 标签类型
	 */
	function OpenTag(name, alias, _regexp, _visitor, _transformer){
		PartnerTag.apply(this, arguments);
	};
	OpenTag = new Rexjs(OpenTag, PartnerTag);
	
	OpenTag.override({
		/**
		 * 将标签转化为带有起始标记的匹配组的元素并添加到语法树中
		 * @param {SyntaxTree} syntaxTree - 添加该该标签的目标语法树
		 * @param {String} textContent - 文本内容
		 */
		live : function(syntaxTree, textContent){
			var before, block, tags = syntaxTree.tags, element = syntaxTree.appendTag(this, "");

			// 进入当前元素
			syntaxTree.in(element);
			
			// 添加 before 元素
			before = syntaxTree.appendTag(tags.before, textContent);
			// 添加 block 元素
			block = syntaxTree.appendTag(tags.block, "");
			
			// 添加 onopen 属性
			element.onopen = this.visitor;
			// 记录 before 元素
			element.before = before;
			// 记录 block 元素
			element.block = block;
			
			// 进入 block 元素
			syntaxTree.in(block);
			
			// 返回元素
			return before;
		}
	});

	return OpenTag;
}(
	this.PartnerTag
);

this.CloseTag = function(PartnerTag){
	/**
	 * 结束标签
	 * @param {String} name - 标签名称
	 * @param {String} alias - 标签别名，用于区分起始标签和结束标签
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {Function} _visitor - 访问器，即语法树完全创建后，被回访时触发
	 * @param {Number} _type - 标签类型
	 */
	function CloseTag(name, alias, _regexp, _visitor, _transformer){
		PartnerTag.apply(this, arguments);
	};
	CloseTag = new Rexjs(CloseTag, PartnerTag);

	CloseTag.override({
		/**
		 * 为语法树所关联的匹配组元素添加关闭标记，并返回该匹配组元素
		 * @param {SyntaxTree} syntaxTree - 添加该该标签的目标语法树
		 * @param {String} textContent - 文本内容
		 */
		live : function(syntaxTree, textContent){
			var after, element, node = syntaxTree.node;
			
			// 跳出当前子语句
			syntaxTree.out();
			
			element = syntaxTree.node;
			
			switch(
				true
			){
				// 如果元素不存在
				case element === null :
					syntaxTree.error(node, "未正确闭合的标记");
					break;
				
				// 如果标签符合
				case element.tagName === this.name :
					// 添加 after 元素
					after = syntaxTree.appendTag(syntaxTree.tags.after, textContent);
					
					// 添加 onclose 属性
					element.onclose = this.visitor;
					// 记录 after 元素
					element.after = after;
					
					// 跳出当前匹配组语句
					syntaxTree.out();
					// 返回元素
					return after;
					
				default :
					syntaxTree.error(element, "未正确闭合的标记");
					break;
			}
			
			return null;
		},
		type : CloseTag.TYPE_GROUP_END
	});

	return CloseTag;
}(
	this.PartnerTag
);

this.SyntaxTags = function(NamedItemMap, PartnerTag, setNamedItem){
	/**
	 * 语法标签集合
	 */
	function SyntaxTags(){
		NamedItemMap.call(this);
	};
	SyntaxTags = new Rexjs(SyntaxTags, NamedItemMap);

	SyntaxTags.static({
		/**
		 * 移除指定项
		 */
		removeNamedItem : function(){
			throw "语法标签集合中的项，一经设定，不得移除";
		},
		/**
		 * 设置项
		 * @param {*} syntaxTag - 语法标签
		 * @param {Number} _index - 在指定索引处插入该语法标签
		 */
		setNamedItem : function(syntaxTags, syntaxTag, _index){
			// 如果是分组标签
			if(
				syntaxTag instanceof PartnerTag
			){
				// 记录标签
				syntaxTags[syntaxTag.alias] = syntaxTag;
			}
			
			setNamedItem.apply(this, arguments);
		}
	});

	return SyntaxTags;
}(
	this.NamedItemMap,
	this.PartnerTag,
	this.NamedItemMap.setNamedItem
);

}.call(
	this
);


// DOM 拓展
void function(SHOW_ELEMENT, ELEMENT_NODE, document){

this.DOMFunctions = function(EventTarget, prototypes){
	function DOMFunctions(){};
	DOMFunctions = new Rexjs(DOMFunctions);
	
	DOMFunctions.props({
		/**
		 * 附加 DOM 方法，同一个方法名，只允许添加一次
		 * @param {String} name - 方法名称
		 * @param {Function} value - 方法函数
		 */
		attach : function(constructor, name, value){
			var prototype = constructor.prototype;
			
			switch(
				true
			){
				// 如果不是函数
				case typeof constructor !== "function" :
					break;
				
				// 如果不是继承至 EventTarget
				case prototype instanceof EventTarget === false :
					break;
				
				// 如果 prototype 存在此属性
				case prototype.hasOwnProperty(name) :
					break;
				
				// 如果 prototypes 存在此属性
				case prototypes.hasOwnProperty(name) :
					break;
					
				// 如果是函数
				case typeof value === "function" :
					prototypes[name] = prototype;
					prototype[name] = value;
					return true;
			}
			
			return false;
		},
		/**
		 * 移除所有附加的 DOM 方法
		 */
		detach : function(){
			// 遍历已存储的 prototype
			forEach(
				prototypes,
				function(prototype, name){
					// 删除方法
					delete prototype[name];
				}
			);
		}
	});
	
	return DOMFunctions;
}(
	EventTarget,
	// prototypes
	{}
);

this.NodeFunctions = function(DOMFunctions, Node, extractSiblings){
	function NodeFunctions(){
		DOMFunctions.call(this);
		
		this.attach(Node, "extractSiblings", extractSiblings);
	};
	NodeFunctions = new Rexjs(NodeFunctions, DOMFunctions);
	
	return NodeFunctions;
}(
	this.DOMFunctions,
	Node,
	// extractSiblings
	function(_targetTagName, _important){
		var nextSibling = this, parentNode = this.parentNode, fragment = document.createDocumentFragment();
		
		do {
			var ns = nextSibling.nextSibling;
			
			// 提取节点
			fragment.appendChild(nextSibling);
			
			switch(
				false
			){
				// 如果不是元素节点
				case nextSibling.nodeType === ELEMENT_NODE :
					break;
				
				// 如果不是指定名称的标签
				case nextSibling.tagName === _targetTagName :
					break;
				
				// 默认：是指定名称的元素标签	
				default :
					return fragment;
			}
			
			nextSibling = ns;
		}
		while(
			nextSibling
		);
		
		// 进入这里没有匹配到指定标签名
		if(
			_important
		){
			// 添加回父节点之中，即回滚操作
			parentNode.appendChild(fragment);
			// 返回 null
			return null;
		}
		
		// 返回 fragment
		return fragment;
	}
);

this.ElementFunctions = function(NodeFunctions, Element, matches, queryElementSibling){
	/**
	 * 元素方法
	 */
	function ElementFunctions(){
		NodeFunctions.call(this);
		
		this.attach(Element, "matches", matches);
		this.attach(Element, "queryElementSibling", queryElementSibling);
	};
	ElementFunctions = new Rexjs(ElementFunctions, NodeFunctions);
	
	new ElementFunctions();
	
	return ElementFunctions;
}(
	this.NodeFunctions,
	Element,
	// matches
	Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector,
	// queryElementSibling
	function(tagName){
		var parentNode = this.parentNode;
		
		// 如果父节点不存在
		if(
			parentNode === null
		){
			return null;
		}
		
		// 创建 treeWalker
		var walker = document.createTreeWalker(
			// 根节点
			parentNode,
			// 只找元素
			SHOW_ELEMENT,
			// 过滤函数
			function(element){
				return element.tagName === tagName;
			},
			false
		);
		
		// 设置当前节点
		walker.currentNode = this;
		// 返回下一个满足条件的兄弟节点
		return walker.nextSibling();
	}
);

}.call(
	this,
	NodeFilter.SHOW_ELEMENT,
	Node.ELEMENT_NODE,
	document
);


// 语法树辅助相关
void function(DOUBLE_CHAR_REGEXP){
	
this.DefaultSyntaxTagRegister = function(TextTag, ElementTag, WordTag, BeforeTag, AfterTag, WHITESPACE_REGEXP, WORD_REGEXP){
	/**
	 * 语法树默认标签注册器
	 * @param {SyntaxTree} syntaxTree - 相关的语法树
	 * @param {Number} _config - 相关配置，决定可选标签是否应该被注册
	 */
	function DefaultSyntaxTagRegister(syntaxTree, _config){
		var config = _config || DefaultSyntaxTagRegister.ALL;
		
		// 注册不可匹配的 before 标签
		syntaxTree.register(
			new BeforeTag()
		);
		
		// 注册不可匹配的 after 标签
		syntaxTree.register(
			new AfterTag()
		);
		
		// 如果需要空白标签
		if(
			config & DefaultSyntaxTagRegister.WHITESPACE
		){
			// 注册可匹配的空白标签
			syntaxTree.register(
				new TextTag(
					"whitespace",
					WHITESPACE_REGEXP
				)
			);
		}
		
		// 如果需要词组标签
		if(
			config & DefaultSyntaxTagRegister.WORD
		){
			// 注册可匹配的词组标签
			syntaxTree.register(
				new WordTag(
					"word",
					WORD_REGEXP
				)
			);
		}
		
		// 注册无正则的、不可匹配的元素标签
		[
			"global", "block", "token"
		]
		.forEach(function(tagName){
			syntaxTree.register(
				new ElementTag(tagName)
			);
		});
	};
	DefaultSyntaxTagRegister = new Rexjs(DefaultSyntaxTagRegister);
	
	DefaultSyntaxTagRegister.static({
		ALL : 6,
		WHITESPACE : 2,
		WORD : 4
	});
	
	return DefaultSyntaxTagRegister;
}(
	this.TextTag,
	this.ElementTag,
	this.WordTag,
	this.BeforeTag,
	this.AfterTag,
	// WHITESPACE_REGEXP
	/\s+/,
	// WORD_REGEXP
	/(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*/
);

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
			" 行：" + lineNumber,
			" 列：" + colNumber,
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
			DOUBLE_CHAR_REGEXP,
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

this.SyntaxRegExp = function(RegExp, success){
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
		},
		/**
		 * 执行正则表达式进行匹配
		 * @param {String} context - 需要匹配的内容字符串
		 * @param {Function} regexpCallback - 正则表达式匹配出来的回调函数
		 * @param {*} boundThis - 需要绑定的 this 对象 
		 */
		exec : function(context, callback, boundThis){
			var result, repeat = false, regexp = new RegExp(this.source, "g");

			// 初始化
			this.lastIndex = 0;
			
			// 如果匹配到了结果
			while(
				result = regexp.exec(context)
			){
				var lastIndex = this.lastIndex;
				
				// 如果相等，则说明当前匹配了空字符串，如：()、^、$ 等
				if(
					lastIndex === regexp.lastIndex
				){
					// 如果之前已经是重复匹配了，则说明已经进入到死循环
					if(
						repeat
					){
						// 手动设置 lastIndex + 1，目的是往下匹配
						regexp.lastIndex += 1;
						// 设置 repeat 为 false
						repeat = false;
						continue;
					}
					
					// 设置 repeat 为 true
					repeat = true;
				}
				
				var substring = context.substring(lastIndex, result.index), length = substring.length;
				
				// 如果长度大于 0
				if(
					length > 0
				){
					success(this, callback, substring, -1, boundThis);
				}

				// 执行正则表达式匹配的回调函数
				success(this, callback, result[0], result.lastIndexOf("") - 1, boundThis);
			}

			// 如果相等，说明尾部已经没有未处理的代码
			if(
				context.length === this.lastIndex
			){
				return;
			}
			
			// 剩余子字符串处理
			success(this, callback, context.substring(this.lastIndex), -1, boundThis);
		},
		lastIndex : 0,
		source : ""
	});

	return SyntaxRegExp;
}(
	RegExp,
	// success
	function(syntaxRegExp, callback, textContent, index, boundThis){
		// 进行回调
		callback.call(boundThis, textContent, index);

		// 计算 lastIndex
		syntaxRegExp.lastIndex += textContent.length;
	}
);

}.call(
	this,
	// DOUBLE_CHAR_REGEXP
	/[^\x00-\xff]+/g
);


void function(){
	
this.NodeRange = function(){
	function NodeRange(target){
		this.start = this.end = this.target = target;
	};
	NodeRange = new Rexjs(NodeRange);
	
	NodeRange.props({
		end : null,
		start : null,
		target : null
	});
	
	return NodeRange;
}();

this.Expression = function(NodeRange){
	function Expression(target){
		this.range = new NodeRange(target);
	};
	Expression = new Rexjs(Expression);
	
	Expression.props({
		binaryExpression : true,
		endExpression : true,
		expression : false,
		nextBinaryExpression : function(expression, statement){
			return this.nextExpression(expression, statement, this.binaryExpression);
		},
		nextExpression : function(expression, statement, _checked){
			if(
				arguments.length < 3 ? this.expression : _checked
			){
				statement.current = expression;
				return true;
			}
			
			console.error("expression");
			return false;
		},
		order : 0,
		range : new NodeRange(null)
	});
	
	return Expression;
}(
	this.NodeRange
);

this.EmptyExpression = function(Expression){
	function EmptyExpression(){
		Expression.call(this, null);
	};
	EmptyExpression = new Rexjs(EmptyExpression, Expression);
	
	EmptyExpression.override({
		nextExpression : function(expression, statement){
			statement.current = statement.root = expression;
			return true;
		}
	});
	
	return EmptyExpression;
}(
	this.NodeRange
);

this.OperatorExpression = function(Expression){
	function OperatorExpression(target){
		Expression.apply(this, arguments);
	};
	OperatorExpression = new Rexjs(OperatorExpression, Expression);
	
	return OperatorExpression;
}(
	this.Expression
);

this.UnaryExpression = function(OperatorExpression, nextExpression){
	function UnaryExpression(statement, target){
		OperatorExpression.apply(this, arguments);
	};
	UnaryExpression = new Rexjs(UnaryExpression, OperatorExpression);
	
	UnaryExpression.override({
		binaryExpression : false,
		endExpression : false,
		expression : true,
		nextExpression : function(expression, statement, _checked){
			if(
				nextExpression.apply(this, arguments)
			){
				this.operand = expression;
				return true;
			}
			
			return false;
		}
	});
	
	UnaryExpression.props({
		operand : null
	});
	
	return UnaryExpression;
}(
	this.OperatorExpression,
	this.OperatorExpression.prototype.nextExpression
);

this.BinaryExpression = function(OperatorExpression, next, nextBinaryExpression, nextExpression, nextIdentifierExpression){
	function BinaryExpression(target, type){
		OperatorExpression.call(this, target);
		
		this.type = type;
	};
	BinaryExpression = new Rexjs(BinaryExpression, OperatorExpression);
	
	BinaryExpression.props({
		left : null,
		precedence : 0,
		right : null
	});
	
	BinaryExpression.override({
		binaryExpression : false,
		endExpression : false,
		expression : true,
		nextExpression : function(expression, statement){
			if(
				statement instanceof BinaryExpression
			){
				console.log(123)
			}
		}
	});
	
	return BinaryExpression;
}(
	this.OperatorExpression,
	this.OperatorExpression.prototype.next,
	this.OperatorExpression.prototype.nextBinaryExpression
);

this.MemberExpression = function(Expression, OperatorExpression){
	function MemberExpression(statement, target){
		Expression.apply(this, arguments);
	};
	MemberExpression = new Rexjs(MemberExpression, Expression);
	
	MemberExpression.props({
		name : null,
		owner : null
	});
	
	return MemberExpression;
}(
	this.Expression,
	this.OperatorExpression
);

this.IdentifierExpression = function(Expression){
	function IdentifierExpression(target){
		Expression.call(this, target);
	};
	IdentifierExpression = new Rexjs(IdentifierExpression, Expression);
	
	return IdentifierExpression;
}(
	this.Expression
);

this.Statement = function(emptyExpression){
	function Statement(){
		
	};
	Statement = new Rexjs(Statement);
	
	Statement.props({
		appendExpression : function(expression){
			return this.current.nextExpression(expression, this);
		},
		current : emptyExpression,
		end : function(){
			
		},
		max : 0,
		root : emptyExpression
	});
	
	return Statement;
}(
	new this.EmptyExpression()
);

}.call(
	this
);


// 语法树相关
void function(document){

this.SyntaxTree = function(SyntaxRegExp, SyntaxTags, SyntaxError, ElementTag, CloseTag, DefaultSyntaxTagRegister, Statement, CODE_POINTS_REGEXP, createElement, createText, initProperties){
	/**
	 * 语法树类
	 * @param {Number} _registerConfig - 默认标签注册器相关配置，决定可选标签是否应该被注册
	 */
	function SyntaxTree(_registerConfig){
		this.regexp = new SyntaxRegExp();
		this.tags = new SyntaxTags();
		
		new DefaultSyntaxTagRegister(this, _registerConfig);
	};
	SyntaxTree = new Rexjs(SyntaxTree);
	
	SyntaxTree.static({
		createElement : createElement,
		createText : createText
	});
	
	SyntaxTree.props({
		Statement : Statement,
		/**
		 * 添加标签
		 * @param {SyntaxTag} tag - 需要添加的标签
		 * @param {String} textContent - 该标签的文本内容
		 */
		appendTag : function(tag, textContent){
			var node, transformer = tag.transformer;
			
			// 如果是元素标签
			if(
				tag instanceof ElementTag
			){
				// 创建元素
				node = createElement(tag.name);
				// 设置文本内容
				node.textContent = textContent;
			}
			else {
				// 创建文本
				node = createText(textContent);
			}
			
			// 初始化节点属性
			initProperties(node, this, tag);
			
			// 添加节点
			this.node
				.appendChild(
					node
				);
			
			// 如果转换器存在
			if(
				transformer !== null
			){
				// 调用转换器
				transformer.call(node);
			}

			return node;
		},
		content : "",
		/**
		 * 创建语法树节点
		 * @param {String} content - 语法内容
		 */
		create : function(content){
			var tags = this.tags, tokenTag = tags.token, global = createElement("global"), nodes = [global];

			var p = parseInt, f = String.fromCodePoint; 

			// 初始化 global 属性
			initProperties(global, this, tags.global);
			
			[].splice.call(this, 0);
			this.statement = this[0] = new this.Statement(this);
			
			// 进入 global 节点
			this.in(global);
			
			this.content = content = content.replace(
					CODE_POINTS_REGEXP,
					function(str, backslashs, codePoint1, codePoint2){
						if(
							backslashs.length % 2 === 0
						){
							return str;
						}
						
						var A = p(codePoint1 || codePoint2, 16);
          					return (backslashs.length > 1? backslashs.substring(0, backslashs.length - 1)  : "") + (A >= 55296 && 57343 >= A ? str : f(A))
					}
				);
			
			// 执行表达式
			this.regexp.exec(
				content,
				function(textContent, tagIndex){
					// 添加到堆栈中
					nodes.push(
						(
							tagIndex === - 1 ? tokenTag : tags[tagIndex]
						)
						.live(
							this,
							textContent
						)
					);
				},
				this
			);
			
			this.statement.end();
			
			// 如果当前根节点是 global
			if(
				this.node === global
			){
				// 遍历
				nodes.forEach(function(node){
					var onvisit = node.onvisit;
				
					// 尝试调用访问器
					onvisit && onvisit.call(node);
				});
				
				return global;
			}
			
			throw "语法树没有正确的闭合";
			return null;
		},
		/**
		 * 抛出错误
		 * @param {Node} node - 指定的代码节点
		 * @param {String} description - 错误描述
		 */
		error : function(node, description){
			new SyntaxError(this.content, node.index || 0, node.textContent.length, description);
		},
		/**
		 * 进入某个节点，使该节点成为当前的父节点
		 * @param {Node} node - 指定的节点
		 */
		in : function(node){
			this.node = node;
		},
		length : 0,
		node : null,
		/**
		 * 跳出某个节点，使该节点的父节点成为当前的父节点
		 */
		out : function(){
			this.node = this.node.parentNode;
		},
		regexp : null,
		/**
		 * 注册语法标签
		 * @param {SyntaxTag} syntaxTag - 需要添加的语法标签
		 * @param {Boolean} _prior - 优先级是否较高
		 */
		register : function(syntaxTag, _prior){
			var regexp = syntaxTag.regexp;
			
			switch(
				true
			){
				// 如果正则不存在
				case regexp === null :
					// 添加标签
					SyntaxTags.setNamedItem(this.tags, syntaxTag, -1);
					return;
				
				// 如果优先级较高
				case _prior :
					// 添加标签
					SyntaxTags.setNamedItem(this.tags, syntaxTag, 0);
					break;
				
				// 默认
				default :
					// 添加标签
					SyntaxTags.setNamedItem(this.tags, syntaxTag);
					break;
			}

			// 添加正则
			this.regexp.add(regexp, _prior);
		},
		rex : false,
		statement : null,
		tags : null
	});
	
	return SyntaxTree;
}(
	this.SyntaxRegExp,
	this.SyntaxTags,
	this.SyntaxError,
	this.ElementTag,
	this.CloseTag,
	this.DefaultSyntaxTagRegister,
	this.Statement,
	// CODE_POINTS_REGEXP
	/(\\+)u(?:([a-fA-F0-9]{4})|\{([a-fA-F0-9]+)\})/g,
	// createElement
	function(tagName){
		return document.createElementNS("rexjs", tagName);
	},
	// createText
	function(textContent){
		return document.createTextNode(textContent);
	},
	// initProperties
	function(node, syntaxTree, tag){
		node.index = syntaxTree.regexp.lastIndex;
		node.onvisit = tag.visitor;
		node.oncheck = tag.checker;
		node.tag = tag;
	}
);

}.call(
	this,
	document
);


// 包相关
void function(){

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
	Package = new Rexjs(Package, List);
	
	Package.static({
		/**
		 * 打包一系列依赖语法树的类
		 * @param {ECMAScriptParser, Package, Array} content - 依赖语法树的类
		 */
		package : function(content){
			var prototype = this.prototype;
			
			switch(
				true
			){
				// 如果是数组
				case content instanceof Array :
					content.length > 0 && content.forEach(this.package, this);
					return;
				
				// 如果已经存在
				case prototype.indexOf(content) > -1 :
					return;
				
				// 如果也是一个 Package 类
				case content.prototype instanceof Package :
					this.package(
						toArray(content.prototype)
					);
					return;
			}
			
			// 添加项
			prototype.push(content);
		}
	});
	
	return Package;
}(
	this.List,
	Rexjs.toArray
);

}.call(
	this
);


// 语法解析器相关
void function(Element){

this.SyntaxParser = function(TYPE_OPERATOR, TYPE_DOUBLE_OPERATOR, getElementSibling){
	/**
	 * 解析器基类
	 */
	function SyntaxParser(syntaxTree){
		this.syntaxTree = syntaxTree;
	};
	SyntaxParser = new Rexjs(SyntaxParser);

	SyntaxParser.static({
		/**
		 * 获取指定节点的下一个兄弟元素
		 * @param {Node} node - 指定的节点
		 */
		getNextElementSibling : function(node){
			return getElementSibling(node, true);
		},
		/**
		 * 获取指定节点的上一个兄弟元素
		 * @param {Node} node - 指定的节点
		 */
		getPreviousElementSibling : function(node){
			return getElementSibling(node, false);
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
		 * 判断指定元素是否是运算符
		 * @param {Element} element - 指定的元素
		 */
		isOperator : function(element){
			return (element.tag.type & TYPE_OPERATOR) === TYPE_OPERATOR;
		},
		/**
		 * 判断指定节点是否处于运算状态下
		 * @param {Node} node - 指定的节点
		 */
		operating : function(node){
			var parentNode = node.parentNode;
			
			// 如果父节点是元素
			if(
				parentNode instanceof Element
			){
				// 判断父节点是否为操作符
				if(
					this.isOperator(parentNode)
				){
					return true;
				}
			}
			
			// 获取上一个元素
			var elementSibling = this.getPreviousElementSibling(node);
			
			switch(
				true
			){
				// 如果元素不存在，则说明该换行所处作用域目前没有语句
				case elementSibling === null :
					return false;
				
				// 如果不是操作符
				case !this.isOperator(elementSibling) :
					return false;
				
				// 如果是双操作符标签
				case (elementSibling.tag.tagType & TYPE_DOUBLE_OPERATOR) === TYPE_DOUBLE_OPERATOR  :
					// 如果两元素是兄弟元素，则说明2个元素之间不存在其他文本内容，属于前置性双操作符
					return elementSibling.previousElementSibling === ECMAScriptParser.getSeparatorElement(elementSibling);
				
				default :
					return true;
			}
		}
	});
	
	SyntaxParser.props({
		/**
		 * 捕获异常
		 * @param {String} eventName - 所需监听的事件名称
		 * @param {String} description - 捕获异常的描述
		 */
		catch : function(eventName, description){
			// 监听指定的事件名称
			return this
				.syntaxTree
				.addEventListener(
					eventName,
					function(element){
						// 只要进入回调函数，则说明出现异常，报错
						this.error(element, description);
					}
				);
		},
		syntaxTree : null
	});

	return SyntaxParser;
}(
	this.ElementTag.TYPE_OPERATOR,
	this.TokenTag.TYPE_DOUBLE_OPERATOR,
	// getElementSibling
	function(node, isNext){
		// 如果是元素
		if(
			node instanceof Element
		){
			// 直接返回
			return node[isNext ? "nextElementSibling" : "previousElementSibling"];
		}
		
		var method = isNext ? "nextSibling" : "previousSibling", sibling = node[method];
		
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
			
			// 继续获取兄弟节点
			sibling = sibling[method];
		}
		
		// 找不到，则返回null
		return null;
	}
);

this.ECMAScriptParser = function(SyntaxParser){
	/**
	 * ECMAScript 语法解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptParser(syntaxTree){
		SyntaxParser.call(this, syntaxTree);
	};
	ECMAScriptParser = new Rexjs(ECMAScriptParser, SyntaxParser);
	
	return ECMAScriptParser;
}(
	this.SyntaxParser
);

}.call(
	this,
	Element
);


// 一些独立的标签解析器
void function(ECMAScriptParser, ElementTag){

this.ECMAScriptNumber = function(WordTag, REGEXP){
	/**
	 * 数字解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptNumber(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 注册标签
		syntaxTree.register(
			new WordTag("number", REGEXP)
		);
	};
	ECMAScriptNumber = new Rexjs(ECMAScriptNumber, ECMAScriptParser);
	
	return ECMAScriptNumber;
}(
	this.WordTag,
	// REGEXP
	/0x[0-9a-fA-F]+|\d+(?:\.\d+)?(?:e\d+)?/
);

this.ECMAScriptString = function(REGEXP){
	/**
	 * 字符串解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptString(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 注册标签
		syntaxTree.register(
			new ElementTag("string", REGEXP)
		);
	};
	ECMAScriptString = new Rexjs(ECMAScriptString, ECMAScriptParser);
	
	return ECMAScriptString;
}(
	// REGEXP
	/"(?:\\"|[^"\n])*"|'(?:\\'|[^'\n])*'/
);

this.ECMAScriptRegExp = function(REGEXP){
	/**
	 * 正则解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptRegExp(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 注册标签
		syntaxTree.register(
			new ElementTag(
				"regexp",
				REGEXP,
				function(){
					var nextSibling = this.nextSibling;
					
					if(
						nextSibling.tagName !== "word"
					){
						return;
					}
					
					nextSibling.onvisit = null;
					this.textContent += nextSibling.textContent;
					
					nextSibling
						.parentNode
						.removeChild(
							nextSibling
						);
				}
			)
		);
	};
	ECMAScriptRegExp = new Rexjs(ECMAScriptRegExp, ECMAScriptParser);
	
	return ECMAScriptRegExp;
}(
	// REGEXP
	/\/(?:\\\/|[^\/\n])+\//
);

this.ECMAScriptComment = function(TextTag, REGEXP){
	/**
	 * 注释解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptComment(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 注册标签
		syntaxTree.register(
			new TextTag("comment", REGEXP),
			true
		);
	};
	ECMAScriptComment = new Rexjs(ECMAScriptComment, ECMAScriptParser);
	
	return ECMAScriptComment;
}(
	this.TextTag,
	// REGEXP
	/\/\*[\S\s]*?\*\/|\/\/.*/
);

this.ECMAScriptIndependentPackage = function(Package, contents){
	/**
	 * 独立的解析器包
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptIndependentPackage(syntaxTree){
		Package.call(this, syntaxTree);
	};
	ECMAScriptIndependentPackage = new Rexjs(ECMAScriptIndependentPackage, Package);
	
	ECMAScriptIndependentPackage.package(contents);
	return ECMAScriptIndependentPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScriptNumber,
		this.ECMAScriptString,
		this.ECMAScriptRegExp,
		this.ECMAScriptComment
	]
);

}.call(
	this,
	this.ECMAScriptParser,
	this.ElementTag
);


// 词组解析器相关
void function(ECMAScriptParser, KeywordTag){

this.ECMAScriptKeyword = function(SyntaxTags, RegExp, list){
	/**
	 * 关键字解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptKeyword(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 遍历列表
		list.forEach(function(data){
			var type = data.type;
			
			// 遍历名称
			data.names
				.forEach(function(name){
					var tag = new KeywordTag(name, new RegExp(name), null, type);
					
					// 注册标签
					syntaxTree.register(tag, true);
				});
		});
	};
	ECMAScriptKeyword = new Rexjs(ECMAScriptKeyword, ECMAScriptParser);
	
	return ECMAScriptKeyword;
}(
	this.SyntaxTags,
	RegExp,
	// list
	[
		// 普通的关键字
		{
			names : [
				"break", "case", "catch", "class", "const", "continue",
				"debugger", "default", "do", "else", "enum", "export", "extends",
				"finally", "for", "function", "if", "import", "let",
				"return", "static", "super", "switch", "throw", "try",
				"var", "while", "with", "yield"
			],
			type : KeywordTag.TYPE_KEYWORD
		},
		// 常量关键字
		{
			names : [ "false", "null", "this", "true" ],
			type : KeywordTag.TYPE_KEYWORD_PRIMITIVE_VALUE
		},
		// 关键字操作符
		{
			names : [ "delete", "in", "instanceof", "new", "typeof", "void" ],
			type : KeywordTag.TYPE_KEYWORD_OPERATOR
		}
	]
);

this.ECMAScriptVariable = function(ECMAScriptKeyword, IdentifierExpression){
	/**
	 * 变量解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptVariable(syntaxTree){
		var tags = syntaxTree.tags;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		// 重写 word 标签的访问器
		syntaxTree
			.tags
			.word
			.transformer = function(){
				syntaxTree
					.statement
					.appendExpression(
						new IdentifierExpression(this)
					);
			};
	};
	ECMAScriptVariable = new Rexjs(ECMAScriptVariable, ECMAScriptParser);
	
	return ECMAScriptVariable;
}(
	this.ECMAScriptKeyword,
	this.IdentifierExpression
);

this.ECMAScriptWordPackage = function(Package, contents){
	/**
	 * 词组解析器包
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptWordPackage(syntaxTree){
		Package.call(this, syntaxTree);
	};
	ECMAScriptWordPackage = new Rexjs(ECMAScriptWordPackage, Package);
	
	ECMAScriptWordPackage.package(contents);
	return ECMAScriptWordPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScriptKeyword,
		this.ECMAScriptVariable
	]
);

}.call(
	this,
	this.ECMAScriptParser,
	this.KeywordTag
);


// 标记解析器相关
void function(ECMAScriptParser, TokenTag, BinaryExpression, live){

this.ECMAScriptOperatorToken = function(SyntaxTag, list){
	/**
	 * 操作符标记解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptOperatorToken(syntaxTree){
		var expressionTag = syntaxTree.tags.expression;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		// 遍历列表
		list.forEach(
			function(data){
				// 注册标签
				syntaxTree.register(
					new TokenTag(data.name, data.regexp, this, function(){
						syntaxTree
							.statement
							.appendExpression(
								new BinaryExpression(this, data.type)
							);
						
					})
				);
			},
			function(){
				//console.log(123);
			}
		);
	};
	ECMAScriptOperatorToken = new Rexjs(ECMAScriptOperatorToken, ECMAScriptParser);
	
	return ECMAScriptOperatorToken;
}(
	this.SyntaxTag,
	// list
	[
		{
			// Unsigned right shift assignment
			name : "ursa",
			regexp : />>>=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			name : "spread",
			regexp : /\.{3}/
		}, {
			name : "identity",
			regexp : /===/,
			type : BinaryExpression.TYPE_RELATIONAL
		}, {
			name : "nonidentity",
			regexp : /!==/,
			type : BinaryExpression.TYPE_RELATIONAL
		}, {
			name : "increment",
			regexp : /\+\+/
		}, {
			name : "decrement",
			regexp : /--/
		}, {
			name : "equality",
			regexp : /==/,
			type : BinaryExpression.TYPE_RELATIONAL
		}, {
			name : "inequality",
			regexp : /!=/,
			type : BinaryExpression.TYPE_RELATIONAL
		}, {
			// Multiplication assignment
			name : "ma",
			regexp : /\*=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			// Division assignment
			name : "da",
			regexp : /\/=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			// Remainder assignment
			name : "ra",
			regexp : /%=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			// Addition assignment
			name : "aa",
			regexp : /\+=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			// Subtraction assignment
			name : "sa",
			regexp : /-=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			// Left shift assignment
			name : "lsa",
			regexp : /<<=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			// Right shift assignment
			name : "rsa",
			regexp : />>=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			// Bitwise AND assignment
			name : "baa",
			regexp : /\&=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			// Bitwise XOR assignment
			name : "bxa",
			regexp : /\^=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			// Bitwise OR assignment
			name : "boa",
			regexp : /\|=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			// Less than or equal
			name : "ltoe",
			regexp : /<=/,
			type : BinaryExpression.TYPE_RELATIONAL
		}, {
			// Greater than or equal
			name : "gtoe",
			regexp : />=/,
			type : BinaryExpression.TYPE_RELATIONAL
		}, {
			// Left shift
			name : "ls",
			regexp : /<</,
			type : BinaryExpression.TYPE_SHIFT
		}, {
			// Right shift
			name : "rs",
			regexp : />>/,
			type : BinaryExpression.TYPE_SHIFT
		}, {
			// Bitwise unsigned right shift 
			name : "burs",
			regexp : />>>/,
			type : BinaryExpression.TYPE_SHIFT
		}, {
			// Logical AND
			name : "la",
			regexp : /\&\&/,
			type : BinaryExpression.TYPE_LOGICAL
		}, {
			// Logical OR
			name : "lo",
			regexp : /\|\|/,
			type : BinaryExpression.TYPE_LOGICAL
		}, {
			name : "plus",
			regexp : /\+/
		}, {
			name : "minus",
			regexp : /-/
		}, {
			name : "star",
			regexp : /\*/
		}, {
			name : "slash",
			regexp : /\//
		}, {
			name : "bar",
			regexp : /\|/,
			type : BinaryExpression.TYPE_BITWISE
		}, {
			name : "ampersand",
			regexp : /\&/,
			type : BinaryExpression.TYPE_BITWISE
		}, {
			name : "bang",
			regexp : /!/
		}, {
			// close angle
			name : "ca",
			regexp : />/,
			type : BinaryExpression.TYPE_RELATIONAL
		}, {
			// open angle
			name : "oa",
			regexp : /</,
			type : BinaryExpression.TYPE_RELATIONAL
		}, {
			name : "equal",
			regexp : /=/,
			type : BinaryExpression.TYPE_ASSIGNMENT
		}, {
			name : "tilde",
			regexp : /~/
		}, {
			name : "caret",
			regexp : /\^/,
			type : BinaryExpression.TYPE_BITWISE
		}, {
			name : "precent",
			regexp : /%/
		}, {
			name : "question",
			regexp : /\?/
		}, {
			name : "colon",
			regexp : /:/
		}, {
			name : "dot",
			regexp : /\./
		}, {
			name : "comma",
			regexp : /,/
		}, {
			name : "semicolon",
			regexp : /;/
		}
	]
);

this.ECMAScriptUnaryOperatorToken = function(Expression, UnaryExpression, IdentifierExpression){
	/**
	 * 一元操作符标记解析器
	 */
	function ECMAScriptUnaryOperatorToken(syntaxTree){
		var tags = syntaxTree.tags;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		// 设置双元操作符（即可以当二元运算符也可以当一元运算符的加号和减号）标记标签的访问器
		[ "plus", "minus" ].forEach(
			function(name){
				tags[name].visitor = this;
			},
			function(){return;
				var statement = this.parentNode.statement;
				
				// 如果可以接二元表达式
				if(
					statement.binaryExpression
				){
					// 添加二元表达式 
					statement.nextBinaryExpression(
						new BinaryExpression(syntaxTree),
						this
					);
					return;
				}
				
				// 添加一元表达式
				statement.nextExpression(
					new UnaryExpression(syntaxTree),
					this
				);
			}
		);
		
		// 递增、递减两个一元运算符
		[ "increment", "decrement" ].forEach(
			function(name){
				tags[name].transformer = this;
			},
			function(){
				return;
				var statement = this.parentNode.statement;
				
				// 如果当前语句不是表达式
				if(
					statement instanceof Expression === false
				){
					//syntaxTree.error(this, "");
					return;
				}
				
				switch(
					false
				){
					// 如果不是标识符表达式
					case statement instanceof IdentifierExpression :
						break;
					
					// 如果不是 word 标签
					case statement.target.tagName === "word" :
						syntaxTree.error(statement.target, "后置一元操作符的左侧表达式不正确");
						return;
				}
				
				// 作为普通表达式添加
				statement.next(
					new Expression(syntaxTree),
					this,
					true
				);
			}
		);
		
		// 设置其他一元运算符标记标签的访问器
		[ "bang", "tilde" ].forEach(
			function(name){
				tags[name].transformer = this;
			},
			function(){
				// 添加一元表达式
				syntaxTree
					.statement
					.appendExpression(
						new UnaryExpression(this),
						this
					)
			}
		);
	};
	ECMAScriptUnaryOperatorToken = new Rexjs(ECMAScriptUnaryOperatorToken, ECMAScriptParser);
	
	return ECMAScriptUnaryOperatorToken;
}(
	this.Expression,
	this.UnaryExpression,
	this.IdentifierExpression
);

this.ECMAScriptDot = function(MemberExpression){
	/**
	 * 点解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptDot(syntaxTree){
		var dotTag = syntaxTree.tags.dot;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		dotTag.transformer = function(){syntaxTree
			console.log(123)
		};
	};
	ECMAScriptDot = new Rexjs(ECMAScriptDot, ECMAScriptParser);
	
	return ECMAScriptDot;
}(
	this.MemberExpression
);

this.ECMAScriptSemicolon = function(IdentifierExpression){
	/**
	 * 分号解析器
	 */
	function ECMAScriptSemicolon(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree
			.tags
			.semicolon
			.visitor = function(){return;
				this.parentNode
					.statement
					.end(
						new IdentifierExpression(syntaxTree),
						this
					);
			}
	};
	ECMAScriptSemicolon = new Rexjs(ECMAScriptSemicolon, ECMAScriptParser);
	
	return ECMAScriptSemicolon;
}(
	this.IdentifierExpression
);

this.ECMAScriptTokenPackage = function(Package, contents){
	/**
	 * 标记解析器包
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptTokenPackage(syntaxTree){
		Package.call(this, syntaxTree);
	};
	ECMAScriptTokenPackage = new Rexjs(ECMAScriptTokenPackage, Package);
	
	ECMAScriptTokenPackage.package(contents);
	return ECMAScriptTokenPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScriptOperatorToken,
		this.ECMAScriptUnaryOperatorToken,
		this.ECMAScriptDot,
		this.ECMAScriptSemicolon
	]
);

}.call(
	this,
	this.ECMAScriptParser,
	this.TokenTag,
	this.BinaryExpression,
	this.TokenTag.prototype.live
);


// 函数解析器相关
void function(ECMAScriptParser, ECMAScriptKeyword, SyntaxTag, SyntaxTree, singleArgument){
	
this.ECMAScriptRestParameter = function(){
	/**
	 * 函数省略参数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptRestParameter(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"restParameter",
				null,
				function(){
					var spread = this.firstElementChild, nextElementSibling = spread.nextElementSibling;
					
					switch(
						true
					){
						// 如果下一个元素不存在
						case nextElementSibling === null :
							syntaxTree.error(spread, "函数省略参数缺少参数名");
							return;
						
						// 如果下一个元素不是最后一个元素
						case nextElementSibling.nextElementSibling !== null :
							syntaxTree.error(nextElementSibling, "不规范的函数省略参数");
							return;
						
						// 如果不是 word 标签
						case nextElementSibling.tagName !== "word" :
							syntaxTree.error(nextElementSibling, "不规范的函数省略参数名称");
							return;
					}
					
					// 清空访问器
					spread.onvisit = null;
					// 清空文本
					spread.textContent = "";
					
					// 设置参数文本
					this.argumentText = nextElementSibling.textContent + " = Rexjs.toArray(arguments, " + this.argumentIndex + ")";
				}
			)
		);
	};
	ECMAScriptRestParameter = new Rexjs(ECMAScriptRestParameter, ECMAScriptParser);
	
	return ECMAScriptRestParameter;
}();

this.ECMAScriptDefaultParameter = function(){
	/**
	 * 函数默认值解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptDefaultParameter(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"defaultParameter",
				null,
				function(){
					var name = this.firstElementChild, equal = name.nextElementSibling, nameText = name.textContent;
					
					// 清空访问器
					name.onvisit = equal.onvisit = null;
					
					// 清空等于号文本
					equal.textContent = "";
					
					// 设置 argumentText
					this.argumentText = name.extractSiblings();
					// 重置父节点文本内容
					this.textContent = nameText;
					
					// 重置文本内容
					name.textContent += " = " + nameText + " !== void 0 ? " + nameText + " : ";
				}
			)
		);
	};
	ECMAScriptDefaultParameter = new Rexjs(ECMAScriptDefaultParameter, ECMAScriptParser);
	
	return ECMAScriptDefaultParameter;
}();
	
this.ECMAScriptArguments = function(extractFragments){
	/**
	 * 函数参数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptArguments(syntaxTree){
		var tags = syntaxTree.tags, dpTag = tags.defaultParameter, rpTag = tags.restParameter;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"arguments",
				null,
				function(){
					var fragments = extractFragments(this, this.block, syntaxTree, dpTag, rpTag);
					
					// 如果长度为 0
					if(
						fragments.length === 0
					){
						this.argumentText = "";
						return;
					}
					
					// 设置 onclose 事件
					this.onclose = function(){
						var argumentTexts = [];
						
						// 重置 textContent
						this.textContent = "(" +
							// 遍历每个参数片段文档
							fragments
								.map(function(argument){
									var argumentText = argument.argumentText;
									
									argumentText = typeof argumentText === "string" ? argumentText : argumentText.textContent;
									
									// 如果长度大于 0
									if(
										argumentText.length > 0
									){
										// 添加到数组中
										argumentTexts.push(argumentText);
									}
									
									// 返回 textContent
									return argument.textContent;
								})
								.join(
									", "
								) +
							")";
						
						// 设置 argumentText
						this.argumentText = argumentTexts.join(";") + ";";
					};
				}
			)
		);
	};
	ECMAScriptArguments = new Rexjs(ECMAScriptArguments, ECMAScriptParser);
	
	return ECMAScriptArguments;
}(
	// extractFragments
	function(paren, block, syntaxTree, dpTag, rpTag){
		var index = 0, fragments = [], childNodes = block.childNodes;
		
		// 如果还存在子节点
		while(
			childNodes.length > 0
		){
			var fragment = childNodes[0].extractSiblings("comma"), element = fragment.lastElementChild;
			
			// 初始化 argumentText 属性
			fragment.argumentText = "";
			// 初始化 argumentIndex 属性
			fragment.argumentIndex = index++;
			
			// 记录片段
			fragments.push(fragment);
			
			switch(
				true
			){
				// 如果 element 不存在，说明是空的参数
				case element === null :
					continue;
				
				// 如果是逗号
				case element.tagName === "comma" :
					// 清空回调
					element.onvisit = null;
					// 移除逗号
					fragment.removeChild(element);
					
					// 如果逗号的下个元素存在，则报错
					block.firstElementChild === null ? syntaxTree.error(element, "多余的函数分隔符") : null;
					break;
			}
			
			// 解析属性
			singleArgument(paren, fragment, syntaxTree, dpTag, rpTag);
		}
		
		return fragments;
	}
);

this.ECMAScriptFunctionBody = function(hasMode){
	/**
	 * 函数主体解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptFunctionBody(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"functionBody",
				null,
				function(){
					var block = this.block, firstElementChild = block.firstElementChild, argumentText = this.previousElementSibling.argumentText;
					
					if(
						argumentText.length > 0
					){
						if(
							hasMode(firstElementChild, syntaxTree)
						){
							
						}
						else {
							this.insertBefore(
								SyntaxTree.createText(argumentText),
								block
							);
						}
					}
					
				}
			)
		);
	};
	ECMAScriptFunctionBody = new Rexjs(ECMAScriptFunctionBody, ECMAScriptParser);
	
	return ECMAScriptFunctionBody;
}(
	// hasMode
	function(firstElementChild, syntaxTree){
		switch(
			true
		){
			case firstElementChild === null :
				return false;
				
			case firstElementChild.tagName === "string" :
				break;
				
			default :
				return false;
		}
		
		var textContent = firstElementChild.textContent;
			
		switch(
			textContent.substring(1, textContent.length - 1)
		){
			case "use strict" :
				return true;
				
			case "use strict -rex" :
				syntaxTree.rex = true;
				firstElementChild.textContent = '"use strict"';
				return true;
		}
		
		return false;
	}
);

this.ECMAScriptFunction = function(){
	/**
	 * 函数解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptFunction(syntaxTree){
		var tags = syntaxTree.tags, argumentsTag = tags.arguments, bodyTag = tags.functionBody;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		tags.function
			.visitor = function(){
				var curly = this.queryElementSibling("curly");
				
				this.setAttribute("current", "");
				
				switch(
					true
				){
					// 如果不存在
					case curly === null :
						break;
					
					// 确保函数表达式的完整
					case curly.matches("function[current] + paren + curly, function[current] + word + paren + curly") :
						this.removeAttribute("current");

						curly.previousElementSibling.onopen = argumentsTag.visitor;
						curly.onopen = bodyTag.visitor;
						return;
				}
				
				this.removeAttribute("current");
				this.error(this, "不完整的函数表达式");
			};
	};
	ECMAScriptFunction = new Rexjs(ECMAScriptFunction, ECMAScriptParser);
	
	return ECMAScriptFunction;
}();

this.ECMAScriptFunctionPackage = function(Package, contents){
	/**
	 * 函数解析器包
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptFunctionPackage(syntaxTree){
		Package.call(this, syntaxTree);
	};
	ECMAScriptFunctionPackage = new Rexjs(ECMAScriptFunctionPackage, Package);
	
	ECMAScriptFunctionPackage.package(contents);
	return ECMAScriptFunctionPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScriptRestParameter,
		this.ECMAScriptDefaultParameter,
		this.ECMAScriptArguments,
		this.ECMAScriptFunctionBody,
		this.ECMAScriptFunction
	]
);

}.call(
	this,
	this.ECMAScriptParser,
	this.ECMAScriptKeyword,
	this.SyntaxTag,
	this.SyntaxTree,
	// singleArgument
	function(paren, fragment, syntaxTree, dpTag, rpTag){
		var element = fragment.firstElementChild;
		
		switch(
			true
		){
			// 如果元素不存在，说明是空的
			case element === null :
				// 如果不是第一个参数，则报错
				fragment.argumentIndex === 0 ? null : syntaxTree.error(fragment.childNodes[0] || paren, "函数参数缺少参数名");
				return;
			
			// 如果是拓展符
			case element.tagName === "spread" :
				// 调用访问器
				rpTag.visitor.call(fragment);
				return;
			
			// 如果是 word 元素
			case element.tagName === "word" :
				break;
			
			// 其他
			default :
				syntaxTree.error(element, "不规范的函数参数名");
				return;
		}
		
		var nextElementSibling = element.nextElementSibling;
		
		switch(
			true
		){
			// 如果下个元素不存在，则说明是普通模式的函数参数
			case nextElementSibling === null :
				// 不解析
				break;
			
			// 如果是等于号，则说明是默认值
			case nextElementSibling.tagName === "equal" :
				// 调用访问器
				dpTag.visitor.call(fragment);
				break;
			
			// 其他
			default :
				// 报错
				syntaxTree.error(nextElementSibling, "不规范的函数参数");
				break;
		}
	}
);


// 对象解析器相关
void function(ECMAScriptParser, SyntaxTag, WordTag, SyntaxTree){

this.ECMAScriptComputedName = function(){
	/**
	 * 对象计算式名称解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptComputedName(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"computedName",
				null,
				function(){
					var square = this.firstElementChild;
					
					// 计算式标识
					this.computed = true;
					
					// 清空访问器
					square.onopen = null;
					// 修改 before 文本内容
					square.before.textContent = "new Rexjs.NamedProperty((";
					// 修改 after 文本内容
					square.after.textContent = ")";
					// 修改冒号文本内容
					square.nextElementSibling.textContent = ",";
					
					// 添加 before 文本内容中缺少的结束小括号
					this.appendChild(
						SyntaxTree.createText(")")
					);
				}
			)
		);
	};
	ECMAScriptComputedName = new Rexjs(ECMAScriptComputedName, ECMAScriptParser);
	
	return ECMAScriptComputedName;
}();

this.ECMAScriptComputedMethod = function(){
	/**
	 * 对象计算式方法解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptComputedMethod(syntaxTree){
		var tags = syntaxTree.tags, argumentsTag = tags.arguments, functionBodyTag = tags.functionBody;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"computedMethod",
				null,
				function(){
					var square = this.firstElementChild, paren = square.nextElementSibling;
					
					// 计算式标识
					this.computed = true;
					
					// 清空访问器
					square.onopen = null;
					// 修改 before 文本内容
					square.before.textContent = "new Rexjs.NamedProperty((";
					// 修改 after 文本内容
					square.after.textContent = "), function ";
					
					// 设置参数访问器
					paren.onopen = argumentsTag.visitor;
					// 设置函数主体访问器
					paren.nextElementSibling.onopen = functionBodyTag.visitor;
					
					// 添加 before 文本内容中缺少的结束小括号
					this.appendChild(
						SyntaxTree.createText(")")
					);
				}
			)
		);
	};
	ECMAScriptComputedMethod = new Rexjs(ECMAScriptComputedMethod, ECMAScriptParser);
	
	return ECMAScriptComputedMethod;
}();

this.ECMAScriptComputedAccessor = function(){
	/**
	 * 对象计算式访问器解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptComputedAccessor(syntaxTree){
		var computedMethodTag = syntaxTree.tags.computedMethod;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"computedAccessor",
				null,
				function(){
					var accessor = this.firstElementChild, square = accessor.nextElementSibling;
					
					// 清空访问器
					accessor.onvisit = null;
					
					// 移除此访问器元素
					this.removeChild(accessor);
					// 访问计算式方法访问器
					computedMethodTag.visitor.call(this);
					
					// 修改 before 文本内容
					square.before.textContent = "new Rexjs." + (accessor.textContent === "get" ? "Getter" : "Setter") + "((";
				}
			)
		);
	};
	ECMAScriptComputedAccessor = new Rexjs(ECMAScriptComputedAccessor, ECMAScriptParser);
	
	return ECMAScriptComputedAccessor;
}();

this.ECMAScriptAccessor = function(){
	/**
	 * 对象访问器解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptAccessor(syntaxTree){
		var tags = syntaxTree.tags, argumentsTag = tags.arguments, functionBodyTag = tags.functionBody;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"accessor",
				null,
				function(){
					var accessor = this.firstElementChild, name = accessor.nextElementSibling,  paren = name.nextElementSibling;
					
					// 清空访问器
					accessor.onvisit = name.onvisit = null;
					// 设置参数访问器
					paren.onopen = argumentsTag.visitor;
					// 设置函数主体访问器
					paren.nextElementSibling.onopen = functionBodyTag.visitor;
				}
			)
		);
	};
	ECMAScriptAccessor = new Rexjs(ECMAScriptAccessor, ECMAScriptParser);
	
	return ECMAScriptAccessor;
}();

this.ECMAScriptShorthandName = function(ECMAScriptKeyword){
	/**
	 * 对象简写属性解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptShorthandName(syntaxTree){
		var tags = syntaxTree.tags;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"shorthandName",
				null,
				function(){
					var name = this.firstElementChild;
					
					// 如果是 word 元素
					if(
						name.tagName === "word"
					){
						// 清空访问器
						name.onvisit = null;
						// 加上冒号和变量名
						name.textContent += " : " + name.textContent;
						return;
					}
					
					// 报错
					syntaxTree.error(name, "不合法的对象简写属性");
				}
			)
		);
	};
	ECMAScriptShorthandName = new Rexjs(ECMAScriptShorthandName, ECMAScriptParser);
	
	return ECMAScriptShorthandName;
}(
	this.ECMAScriptKeyword
);

this.ECMAScriptShorthandMethod = function(){
	/**
	 * 对象简写方法解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptShorthandMethod(syntaxTree){
		var tags = syntaxTree.tags, argumentsTag = tags.arguments, functionBodyTag = tags.functionBody;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"shorthandMethod",
				null,
				function(){
					var name = this.firstElementChild, paren = name.nextElementSibling;
					
					// 清空访问器
					name.onvisit = null;
					// 加上冒号和 function
					name.textContent += " : function ";
					
					// 设置参数访问器
					paren.onopen = argumentsTag.visitor;
					// 设置函数主体访问器
					paren.nextElementSibling.onopen = functionBodyTag.visitor;
				}
			)
		);
	};
	ECMAScriptShorthandMethod = new Rexjs(ECMAScriptShorthandMethod, ECMAScriptParser);
	
	return ECMAScriptShorthandMethod;
}();
	
this.ECMAScriptProperty = function(computed, accessor, others){
	/**
	 * 对象属性解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptProperty(syntaxTree){
		var tags = syntaxTree.tags,
		
			computedNameTag = tags.computedName, computedMethodTag = tags.computedMethod,
		
			computedAccessorTag = tags.computedAccessor, accessorTag = tags.accessor,
			
			shorthandNameTag = tags.shorthandName, shorthandMethodTag = tags.shorthandMethod;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"property",
				null,
				function(){
					var element = this.firstElementChild;
					
					// 如果元素不存在，说明是空属性
					if(
						element === null
					){
						return;
					}
					
					// 如果是词组标签
					if(
						element.tag instanceof WordTag
					){
						// 判断元素文本内容
						switch(
							element.textContent
						){
							// 如果是 get
							case "get" :
								break;

							// 如果是 set
							case "set" :
								break;

							// 其他
							default :
								others(this, element, syntaxTree, shorthandNameTag, shorthandMethodTag);
								return;
						}
						
						// 访问器
						accessor(this, element, syntaxTree, computedAccessorTag, accessorTag);
						return;
					}
					
					// 判断元素标签
					switch(
						element.tagName
					){
						// 如果是字符串
						case "string" :
							others(this, element, syntaxTree, shorthandNameTag, shorthandMethodTag);
							return;
						
						// 如果是计算式
						case "square" :
							computed(this, element, syntaxTree, computedNameTag, computedMethodTag);
							return;
					}
					
					syntaxTree.error(element, "未捕获的标记");
				}
			)
		);
	};
	ECMAScriptProperty = new Rexjs(ECMAScriptProperty, ECMAScriptParser);
	
	return ECMAScriptProperty;
}(
	// computed
	function(property, element, syntaxTree, computedNameTag, computedMethodTag){
		var nextElementSibling = element.nextElementSibling;
		
		switch(
			true
		){
			// 如果不存在
			case nextElementSibling === null :
				break;
			
			// 确保是一个计算式属性名
			case nextElementSibling.tagName === "colon" :
				// 解析计算式
				computedNameTag.visitor.call(property);
				return;
		}
		
		var lastElementChild = property.lastElementChild;
		
		// 匹配计算式方法
		if(
			lastElementChild.matches("square:first-child + paren + curly")
		){
			// 解析计算式
			computedMethodTag.visitor.call(property);
			return;
		}

		// 报错
		syntaxTree.error(element, "不完整的计算式属性");
	},
	// accessor
	function(property, element, syntaxTree, computedAccessorTag, accessorTag){
		// 确保访问器的完整
		if(
			!property
				.lastElementChild
				.matches(
					"word:first-child + * + paren + curly"
				)
		){
			// 报错
			syntaxTree.error(element, "不完整的属性访问器");
			return;
		}
		
		var nextElementSibling = element.nextElementSibling;
		
		// 判断 nextElementSibling 是否为词组标签
		if(
			nextElementSibling.tag instanceof WordTag
		){
			accessorTag.visitor.call(property);
			return
		}
	
		// 判断 nextElementSibling 名称
		switch(
			nextElementSibling.tagName
		){
			// 如果是字符串，说明是普通访问器
			case "string" :
				accessorTag.visitor.call(property);
				return;
			
			// 如果是中括号
			case "square" :
				computedAccessorTag.visitor.call(property);
				return;
		}
		
		// 报错
		syntaxTree.error(element.nextElementSibling, "缺少访问器名称");
	},
	// others
	function(property, element, syntaxTree, shorthandNameTag, shorthandMethodTag){
		var nextElementSibling = element.nextElementSibling;

		switch(
			true
		){
			// 如果兄弟元素不存在，则说明可能是简写
			case nextElementSibling === null :
				shorthandNameTag.visitor.call(property);
				return;
			
			// 如果是冒号，说明是键值对模式
			case nextElementSibling.tagName === "colon" :
				// 不解析
				return;
		}
		
		var lastElementChild = property.lastElementChild;
		
		// 匹配简写方法
		if(
			lastElementChild.matches("*:first-child + paren + curly")
		){
			// 调用访问器
			shorthandMethodTag.visitor.call(property);
			return;
		}
		
		syntaxTree.error(element, "不支持的对象属性");
	}
);

this.ECMAScriptObject = function(NamedProperty, Getter, Setter, defineProperty, getOwnPropertyDescriptor, getTextContent){
	/**
	 * 对象解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptObject(syntaxTree){
		var propertyTag = syntaxTree.tags.property;
		
		ECMAScriptParser.call(this, syntaxTree);

		syntaxTree.register(
			new SyntaxTag(
				"object",
				null,
				function(){
					var fragments = [], childNodes = this.block.childNodes;
					
					// 如果还存在子节点
					while(
						childNodes.length > 0
					){
						var fragment = childNodes[0].extractSiblings("comma"), element = fragment.lastElementChild;
						
						switch(
							true
						){
							// 如果 element 不存在
							case element === null :
								break;
							
							// 如果是逗号
							case element.tagName === "comma" :
								// 清空回调
								element.onvisit = null;
								// 移除逗号
								fragment.removeChild(element);
								break;
						}
						
						// 记录片段
						fragments.push(fragment);
						// 解析属性
						propertyTag.visitor.call(fragment);
					}
					
					if(
						fragments.length === 0
					){
						return;
					}
					
					// 设置 onclose 事件
					this.onclose = function(){
						this.textContent = getTextContent(fragments);
					}
				}
			)
		);
	};
	ECMAScriptObject = new Rexjs(ECMAScriptObject, ECMAScriptParser);
	
	ECMAScriptObject.static({
		create : function(_property){
			var obj = {};
			
			forEach(
				arguments,
				function(property){
					var descriptor = { configurable : true, enumerable : true };
					
					switch(
						true
					){
						case property instanceof Getter :
							descriptor.get = property.value;
							return;
							
						case property instanceof Getter :
							descriptor.set = property.value;
							break;
							
						case property instanceof NamedProperty :
							descriptor.value = property.value;
							descriptor.writable = true;
							break;
							
						default :
							this(property);
							return;
					}
					
					defineProperty(obj, property.name, descriptor);
				},
				function(properties){
					for(
						var name in properties
					){
						defineProperty(
							obj,
							name,
							getOwnPropertyDescriptor(properties, name)
						);
					}
				},
				true
			);
			
			return obj;
		}
	});
	
	return ECMAScriptObject;
}(
	this.NamedProperty,
	this.Getter,
	this.Setter,
	Object.defineProperty,
	Object.getOwnPropertyDescriptor,
	// getTextContent
	function(fragments){
		var lastIndex = 0, contents = [], computed = false, max = fragments.length - 1;
		
		// 遍历属性
		fragments.forEach(function(fragment, index){
			// 如果是计算式
			if(
				fragment.computed
			){
				// 如果索引大于 0
				if(
					index > 0
				){
					// 如果上一个属性也是计算式，则设置上一个分隔符为逗号，否则为结束大括号加逗号
					contents[contents.length - 1] = lastIndex === index - 1 ? "," : "},";
				}
				
				// 添加当前属性的文本和分隔符，如果是最有一个，则为空字符串，否则是逗号加起始大括号
				contents.push(fragment.textContent, index === max ? "" : ", {");
				
				computed = true;
				lastIndex = index;
				return;
			}
			
			// 添加当前属性的文本和分隔符，如果是最后一个，则为空字符串，否则为逗号
			contents.push(fragment.textContent, index === max ? "" : ",");
		});
		
		// 如果有计算式	
		if(
			computed
		){
			// 返回 create 调用方法
			return "(Rexjs.ECMAScriptObject.create(" + (fragments[0].computed ? "" : "{") + contents.join("") + (fragments[max].computed ? "" : "}") + "))";
		}
		
		return "{" + contents.join("") + "}";
	}
);

this.ECMAScriptObjectDestructuring = function(){
	function ECMAScriptObjectDestructuring(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.register(
			new SyntaxTag(
				"objectDestructuring",
				null,
				function(){
					//console.log(this);
				}
			)
		);
	};
	ECMAScriptObjectDestructuring = new Rexjs(ECMAScriptObjectDestructuring, ECMAScriptParser);
	
	return ECMAScriptObjectDestructuring;
}();

this.ECMAScriptObjectPackage = function(Package, contents){
	/**
	 * 对象解析器包
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptObjectPackage(syntaxTree){
		Package.call(this, syntaxTree);
	};
	ECMAScriptObjectPackage = new Rexjs(ECMAScriptObjectPackage, Package);
	
	ECMAScriptObjectPackage.package(contents);
	return ECMAScriptObjectPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScriptComputedName,
		this.ECMAScriptComputedMethod,
		this.ECMAScriptComputedAccessor,
		this.ECMAScriptAccessor,
		this.ECMAScriptShorthandName,
		this.ECMAScriptShorthandMethod,
		this.ECMAScriptProperty,
		this.ECMAScriptObject,
		this.ECMAScriptObjectDestructuring
	]
);

}.call(
	this,
	this.ECMAScriptParser,
	this.SyntaxTag,
	this.WordTag,
	this.SyntaxTree
);


// ECMAScript 分组标签相关
void function(ECMAScriptParser, OpenTag, CloseTag, TYPE_OPERATOR){

this.ECMAScriptParen = function(OPEN_PARAN_REGEXP, CLOSE_PARENT_REGEXP, CLOSE_PARENT_WITH_BRACE_REGEXP){
	/**
	 * 小括号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptParen(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 起始小括号
		syntaxTree.register(
			new OpenTag("paren", "openParen", OPEN_PARAN_REGEXP, null, TYPE_OPERATOR)
		);
		
		// 结束小括号
		syntaxTree.register(
			new CloseTag("paren", "closeParen", CLOSE_PARENT_REGEXP)
		);
	};
	ECMAScriptParen = new Rexjs(ECMAScriptParen, ECMAScriptParser);
	
	return ECMAScriptParen;
}(
	// OPEN_PARAN_REGEXP
	/\(/,
	// CLOSE_PARENT_REGEXP
	/\)/
);

this.ECMAScriptSquare = function(OPEN_SQUARE_REGEXP, CLOSE_SQUARE_REGEXP){
	/**
	 * 中括号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptSquare(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 起始小括号
		syntaxTree.register(
			new OpenTag("square", "openSquare", OPEN_SQUARE_REGEXP, null, TYPE_OPERATOR)
		);
		
		// 结束中括号
		syntaxTree.register(
			new CloseTag("square", "closeSquare", CLOSE_SQUARE_REGEXP)
		);
	};
	ECMAScriptSquare = new Rexjs(ECMAScriptSquare, ECMAScriptParser);
	
	return ECMAScriptSquare;
}(
	// OPEN_SQUARE_REGEXP
	/\[/,
	// CLOSE_SQUARE_REGEXP
	/\]/
);

this.ECMAScriptCurly = function(OPEN_CURLY_REGEXP, CLOSE_CURLY_REGEXP){
	/**
	 * 大括号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptCurly(syntaxTree){
		var tags = syntaxTree.tags, objectTag = tags.object, objectDestructuringTag = tags.objectDestructuring;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		// 起始大括号
		syntaxTree.register(
			new OpenTag(
				"curly",
				"openCurly",
				OPEN_CURLY_REGEXP,
				function(){
					var nextElementSibling = this.nextElementSibling;
					
					// 如果下一个兄弟元素是等于号
					if(
						nextElementSibling && nextElementSibling.tagName === "equal"
					){
						// 触发对象结构访问器
						objectDestructuringTag.visitor.call(this);
						return;
					}
					
					// 如果与操作符在一起
					if(
						ECMAScriptParser.operating(this)
					){
						// 触发对象访问器
						objectTag.visitor.call(this);
					}
				}
			)
		);
		
		// 结束大括号
		syntaxTree.register(
			new CloseTag("curly", "closeCurly", CLOSE_CURLY_REGEXP)
		);
	};
	ECMAScriptCurly = new Rexjs(ECMAScriptCurly, ECMAScriptParser);
	
	return ECMAScriptCurly;
}(
	// OPEN_CURLY_REGEXP
	/\{/,
	// CLOSE_CURLY_REGEXP
	/\}/
);

this.ECMAScriptPartnerPackage = function(Package, contents){
	/**
	 * 匹配组解析器包
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptPartnerPackage(syntaxTree){
		Package.call(this, syntaxTree);
	};
	ECMAScriptPartnerPackage = new Rexjs(ECMAScriptPartnerPackage, Package);
	
	ECMAScriptPartnerPackage.package(contents);
	return ECMAScriptPartnerPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScriptParen,
		this.ECMAScriptSquare,
		this.ECMAScriptCurly
	]
);

}.call(
	this,
	this.ECMAScriptParser,
	this.OpenTag,
	this.CloseTag,
	this.ElementTag.TYPE_OPERATOR
);


// ECMAScript 解析器包
void function(){

this.ECMAScriptPackage = function(Package, contents){
	/**
	 * ECMAScript 所支持的解析器包。
	 */
	function ECMAScriptPackage(syntaxTree){
		Package.call(this, syntaxTree);
	};
	ECMAScriptPackage = new Rexjs(ECMAScriptPackage, Package);
	
	ECMAScriptPackage.package(contents);
	return ECMAScriptPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScriptIndependentPackage,
		this.ECMAScriptWordPackage,
		this.ECMAScriptTokenPackage,
		this.ECMAScriptFunctionPackage,
		this.ECMAScriptObjectPackage,
		this.ECMAScriptPartnerPackage
	]
);

}.call(
	this
);


// 初始化模块
void function(){

this.Launcher = function(Module, ECMAScript6, document, id, forEach){
	/**
	 * 模块启动器
	 */
	function Launcher(){
		// 监听 DOMContentLoaded 事件
		document.addEventListener(
			"DOMContentLoaded",
			function(){
				// 转为数组
				forEach(
					this.querySelectorAll('script[type="module"]'),
					function(script){
						var src = script.src;
						
						// 如果存在src
						if(
							src.length > 0
						){
							// 初始化模块
							new Module(src, ECMAScript, true);
							return;
						}
						
						// 初始化模块
						new Module(
							// 如果指定了名称，则使用指定名称，否则由系统生成
							script.getAttribute("data-name") || ("inline_script_" + id++ + ".js"),
							ECMAScript,
							true,
							script.textContent
						);
					},
					null,
					true
				);
			}
		);
	};
	Launcher = new Rexjs(Launcher);
	
	return Launcher;
}(
	this.Module,
	this.ECMAScript6,
	document,
	// id
	0
);

}.call(
	this
);

Rexjs.static(this);
}(
	Rexjs,
	Rexjs.forEach
);