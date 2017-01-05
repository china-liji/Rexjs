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
	 */
	return function forEach(obj, fn, _this){
		// 如果是数组
		if(
			obj instanceof Array
		){
			// 调用数组自带的 forEach 结果
			obj.forEach(fn, _this);
		}
		else {
			// 遍历
			for(
				var name in obj
			){
				// 调用测试函数
				fn.call(_this, obj[name], name, obj)
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
new function(Rexjs){
"use strict";

// 列表相关
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

this.ListMap = function(List, hasOwnProperty){
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
	this.List,
	Object.prototype.hasOwnProperty
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
		}
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

		// 抛出错误
		throw '"' + name + '"' + "是一个无效的名称。";
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
		 * @param {String} name - 指定的名称
		 */
		getNamedItem : function(namedItemMap, name){
			// 如果有指定项
			if(
				this.hasNamedItem(namedItemMap, name)
			){
				return namedItemMap[name];
			}

			return null;
		},
		/**
		 * 判断是否拥有指定名称的项
		 * @param {NamedItemMap} namedItemMap - 指定的 NamedItemMap 实例
		 * @param {String} name - 指定的名称
		 */
		hasNamedItem : function(namedItemMap, name){
			return hasOwnProperty.call(namedItemMap, name);
		},
		/**
		 * 检索指定名称的项
		 * @param {NamedItemMap} namedItemMap - 指定的 NamedItemMap 实例
		 * @param {String} name - 指定的名称
		 */
		indexNamedItem : function(namedItemMap, name){
			// 如果有指定项
			if(
				this.hasNamedItem(namedItemMap, name)
			){
				return indexOf.call(namedItemMap, namedItemMap[name]);
			}
			
			return -1;
		},
		/**
		 * 移除指定名称的项
		 * @param {NamedItemMap} namedItemMap - 指定的 NamedItemMap 实例
		 * @param {String} name - 指定的名称
		 */
		removeNamedItem : function(namedItemMap, name){
			var index = namedItemMap.indexNamedItem(name);

			// 如果 index 等于 -1，说明此项不存在
			if(
				index === -1
			){
				return;
			}
			
			// 从数组中移除
			splice.call(namedItemMap, index, 1);

			// 从键值对中移除
			delete namedItemMap[name];
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
	Number.isNaN || window.isNaN
));


// 事件相关
(function(NONE_PHASE, CAPTURING_PHASE, USING_PHASE, RELEASING_PHASE){

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
));


// 语法标签相关
(function(){

this.SyntaxTag = function(NamedItem){
	/**
	 * 语法标签，供于语法树匹配
	 * @param {String} name - 标签名称，可重复，将会定义为作用域标签（如：开始标签、结束标签）
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {Number} _type - 标签类型
	 */
	function SyntaxTag(name, _regexp, _id, _type){
		NamedItem.call(this, name);

		this.id = _id || this.name;

		this.assign({
			regexp : _regexp,
			type : _type
		});
	};
	SyntaxTag = new Rexjs(SyntaxTag, NamedItem);

	SyntaxTag.static({
		TYPE_CLAUSE_END : 2,
		TYPE_GROUP_END : 26,
		TYPE_NONE : 0,
		TYPE_STATEMENT_END : 10,
		TYPE_USER_DEFINED : 4
	});

	SyntaxTag.props({
		id : "",
		nextSibling : null,
		regexp : null,
		type : SyntaxTag.TYPE_NONE
	});

	return SyntaxTag;
}(
	this.NamedItem
);

this.TextTag = function(SyntaxTag){
	/**
	 * 文本标签，供于语法树匹配，一般用于空格、换行等空白文本
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function TextTag(name, _regexp, _id){
		SyntaxTag.call(this, name, _regexp, _id);
	};
	TextTag = new Rexjs(TextTag, SyntaxTag);
	
	TextTag.override({
		/**
		 * 将标签转化为文本节点并添加到语法树中
		 * @param {SyntaxTree} syntaxTree - 添加该该标签的目标语法树
		 * @param {String} textContent - 文本内容
		 */
		live : function(syntaxTree, textContent){
			return syntaxTree.appendTextNode(textContent);
		}
	});

	return TextTag;
}(
	this.SyntaxTag
);

this.ElementTag = function(SyntaxTag){
	/**
	 * 元素标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {Number} _type - 标签类型
	 */
	function ElementTag(name, _regexp, _id, _type){
		SyntaxTag.apply(this, arguments);
	};
	ElementTag = new Rexjs(ElementTag, SyntaxTag);
	
	ElementTag.props({
		/**
		 * 将标签转化为元素并添加到语法树中
		 * @param {SyntaxTree} syntaxTree - 添加该该标签的目标语法树
		 * @param {String} textContent - 元素的文本内容
		 */
		live : function(syntaxTree, textContent){
			// 创建并添加元素
			var element = syntaxTree.appendElement(
				this.name,
				textContent
			);
			
			
			// 如果是用户自定义类型
			if(
				(this.type & SyntaxTag.TYPE_USER_DEFINED) > 0
			){
				element.tagType = this.type;
			}
			
			return element;
		}
	});

	return ElementTag;
}(
	this.SyntaxTag
);

this.WordTag = function(ElementTag){
	/**
	 * 单词标签，供于语法树匹配，一般用于变量名和关键字等
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {Number} _type - 标签类型
	 */
	function WordTag(name, _regexp, _id, _type){
		ElementTag.call(this, name, _regexp, _id, _type);
	};
	WordTag = new Rexjs(WordTag, ElementTag);

	return WordTag;
}(
	this.ElementTag
);

this.FragmentTag = function(WordTag){
	/**
	 * 片段标签，供于语法树匹配，一般用于普通变量名
	 */
	function FragmentTag(){
		WordTag.call(this, "fragment");
	};
	FragmentTag = new Rexjs(FragmentTag, WordTag);
	
	FragmentTag.override({
		/**
		 * 将标签转化为片段元素并添加到语法树中
		 * @param {SyntaxTree} syntaxTree - 添加该该标签的目标语法树
		 * @param {String} textContent - 元素的文本内容
		 */
		live : function(syntaxTree, textContent){
			return syntaxTree.appendFragment(textContent);
		}
	});

	return FragmentTag;
}(
	this.WordTag
);

this.KeywordTag = function(WordTag){
	/**
	 * 关键字标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {Number} _type - 标签类型
	 */
	function KeywordTag(name, _regexp, _id, _type){
		WordTag.call(this, name, _regexp, _id, _type);
	};
	KeywordTag = new Rexjs(KeywordTag, WordTag);

	return KeywordTag;
}(
	this.WordTag
);

this.TokenTag = function(ElementTag){
	/**
	 * 标记标签，供于语法树匹配，一般用于加减乘除等符号标记
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 * @param {Number} _type - 标签类型
	 */
	function TokenTag(name, _regexp, _id, _type){
		ElementTag.apply(this, arguments);
	};
	TokenTag = new Rexjs(TokenTag, ElementTag);

	return TokenTag;
}(
	this.ElementTag
);

this.PartnerTag = function(TokenTag){
	/**
	 * 分组标签（如：大中小括号），供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function PartnerTag(name, _regexp, _id){
		TokenTag.call(this, name, _regexp, _id);
	};
	PartnerTag = new Rexjs(PartnerTag, TokenTag);

	return PartnerTag;
}(
	this.TokenTag
);

this.OpenTag = function(PartnerTag){
	/**
	 * 起始标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function OpenTag(name, _regexp, _id){
		PartnerTag.call(this, name, _regexp, _id);
	};
	OpenTag = new Rexjs(OpenTag, PartnerTag);
	
	OpenTag.override({
		/**
		 * 将标签转化为带有起始标记的匹配组的元素并添加到语法树中
		 * @param {SyntaxTree} syntaxTree - 添加该该标签的目标语法树
		 * @param {String} textContent - 文本内容
		 */
		live : function(syntaxTree, textContent){
			var element = syntaxTree.appendElement(this.name);

			// 进入当前元素
			syntaxTree.next(element);
			// 添加 start 元素
			syntaxTree.appendElement("start", textContent);
			// 添加新语句
			syntaxTree.appendStatement();
			
			// 返回元素
			return element;
		}
	});

	return OpenTag;
}(
	this.PartnerTag
);

this.CloseTag = function(PartnerTag){
	/**
	 * 结束标签，供于语法树匹配
	 * @param {String} name - 标签名称
	 * @param {RegExp} _regexp - 需要匹配标签的正则
	 * @param {String} _id - 标签标识符，用于同名标签，默认等于 name
	 */
	function CloseTag(name, _regexp, _id){
		PartnerTag.call(this, name, _regexp, _id);
	};
	CloseTag = new Rexjs(CloseTag, PartnerTag);

	CloseTag.override({
		/**
		 * 为语法树所关联的匹配组元素添加关闭标记，并返回该匹配组元素
		 * @param {SyntaxTree} syntaxTree - 添加该该标签的目标语法树
		 * @param {String} textContent - 文本内容
		 */
		live : function(syntaxTree, textContent){
			var element;
			
			// 跳出当前子语句
			syntaxTree.previous();
			
			element = syntaxTree.root;
			
			switch(
				true
			){
				// 如果元素不存在
				case element === null :
					break;
				
				// 如果标签符合
				case element.tagName === this.name :
					// 添加 end 元素
					syntaxTree.appendElement("end", textContent);
					// 跳出当前匹配组语句
					syntaxTree.previous();
					// 返回元素
					return element;
			}
			
			syntaxTree.error(element, "未正确闭合的标记。");
			return null;
		},
		type : CloseTag.TYPE_GROUP_END
	});

	return CloseTag;
}(
	this.PartnerTag
);

this.SyntaxTags = function(NamedItemMap, setNamedItem){
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
			throw "语法标签集合中的项，一经设定，不得移除。";
		},
		/**
		 * 根据标签 id ，添加语法标签
		 * @param {SyntaxTag} syntaxTag - 需要添加的语法标签
		 * @param {Number} _index - 在指定索引处插入标签
		 */
		setNamedItem : function(syntaxTags, syntaxTag, _index){
			var id = syntaxTag.id;

			// 如果已经存在指定 id 的标签
			if(
				this.hasNamedItem(id)
			){
				// 报错
				throw "不应该添加重复的标签：" + id;
				return;
			}

			// 记录标签
			syntaxTags[syntaxTag.id] = syntaxTag;

			setNamedItem.apply(this, arguments);
		}
	});

	return SyntaxTags;
}(
	this.NamedItemMap,
	this.NamedItemMap.setNamedItem
);

}.call(
	this
));


// 语法事件相关
(function(Event, CAPTURING_PHASE, USING_PHASE, setEventPhase){

this.SyntaxEvent = function(){
	/**
	 * 语法树事件
	 * @param {String} type - 事件类型
	 */
	function SyntaxEvent(type){
		Event.call(this, type);
	};
	SyntaxEvent = new Rexjs(SyntaxEvent, Event);
	
	SyntaxEvent.props({
		index : 0,
		/**
		 * 初始化语法事件
		 * @param {SyntaxTag} tag - 相关语法标签
		 * @param {String} textContent - 标签文本内容
		 * @param {Number} index - 标签在语法树中的索引值
		 * @param {Node} _node - 相关语法树节点
		 */
		initSyntaxEvent : function(tag, textContent, index, _node){
			this.tag = tag;
			this.textContent = textContent;
			this.index = index;
			
			// 如果节点存在
			if(
				_node
			){
				this.node = _node;
			}
		},
		/**
		 * 通过另一个语法事件来初始化当前语法事件
		 * @param {SyntaxEvent} syntaxEvent - 另一个语法事件
		 */
		initSyntaxEventBy : function(syntaxEvent){
			this.initSyntaxEvent(
				syntaxEvent.tag,
				syntaxEvent.textContent,
				syntaxEvent.index,
				syntaxEvent.node
			);
		},
		node : null,
		tag : null,
		textContent : ""
	});
	
	return SyntaxEvent;
}();

this.NodeEvent = function(SyntaxEvent, TYPE_CLAUSE_END, dispatchEndEvent){
	/**
	 * 节点事件
	 * @param {String} type - 事件类型
	 */
	function NodeEvent(type){
		SyntaxEvent.call(this, type);
	};
	NodeEvent = new Rexjs(NodeEvent, SyntaxEvent);
	
	NodeEvent.override({
		/**
		 * 设置事件阶段
		 * @param {Number} eventPhase - 语法标签
		 */
		setEventPhase : function(eventPhase){
			// 如果默认行为被阻止
			if(
				this.defaultPrevented
			){
				setEventPhase.call(this, eventPhase);
				return;
			}
			
			// 判断事件阶段
			switch(
				eventPhase
			){
				// 如果当前是捕获阶段
				case CAPTURING_PHASE :
					// 如果成立，则说明有是结束性质的标签
					if(
						(this.tag.type & TYPE_CLAUSE_END) > 0
					){
						// 触发 end 事件
						dispatchEndEvent(
							this,
							new SyntaxEvent("end")
						);
					}
					break;
				
				// 如果当前是引用阶段
				case USING_PHASE :
					// 添加标签
					this.node = this.tag.live(this.target, this.textContent);
					break;
			}
			
			setEventPhase.call(this, eventPhase);
		}
	});
	
	NodeEvent.props({
		/**
		 * 初始化节点事件
		 * @param {SyntaxTag} tag - 相关语法标签
		 * @param {String} textContent - 标签文本内容
		 * @param {Number} index - 标签在语法树中的索引值
		 */
		initNodeEvent : function(tag, textContent, index){
			this.initSyntaxEvent(tag, textContent, index);
		},
		/**
		 * 通过另一个语法事件来初始化当前节点事件
		 * @param {SyntaxEvent} syntaxEvent - 另一个语法事件
		 */
		initNodeEventBy : function(syntaxEvent){
			this.initSyntaxEvent(
				syntaxEvent.tag,
				syntaxEvent.textContent,
				syntaxEvent.index
			);
		}
	});

	return NodeEvent;
}(
	this.SyntaxEvent,
	this.SyntaxTag.TYPE_CLAUSE_END,
	// dispatchEndEvent
	function(nodeEvent, endEvent){
		// 初始化 endEvent
		endEvent.initSyntaxEventBy(nodeEvent);
		
		// 分配 endEvent
		nodeEvent
			.target
			.dispatchEvent(
				endEvent
			);
		
		// 如果 endEvent 被用户阻止了默认行为
		if(
			endEvent.defaultPrevented
		){
			// 取消 nodeEvent 的传递
			nodeEvent.stopPropagation();
			// 取消 nodeEvent 的默认行为
			nodeEvent.preventDefault();
		}
	}
);

this.IndexChangeEvent = function(SyntaxEvent, setIndex){
	/**
	 * 索引改变事件
	 * @param {String} type - 事件类型
	 */
	function IndexChangeEvent(type){
		SyntaxEvent.call(this, type);
	};
	IndexChangeEvent = new Rexjs(IndexChangeEvent, SyntaxEvent);
	
	IndexChangeEvent.override({
		setEventPhase : function(eventPhase){
			switch(
				true
			){
				// 如果默认行为被阻止
				case this.defaultPrevented :
					break;
				
				// 如果不是引用阶段
				case eventPhase !== USING_PHASE :
					break;
				
				// 默认
				default :
					setIndex(this.target, this.index, this.node);
					break;
			}
			
			setEventPhase.call(this, eventPhase);
		}
	});
	
	IndexChangeEvent.props({
		/**
		 * 初始化索引改变事件
		 * @param {Number} index - 标签在语法树中的索引值
		 * @param {Node} node - 当前语法树根节点
		 */
		initIndexChangeEvent : function(index, node){
			this.index = index;
			this.node = node;
		},
		/**
		 * 通过另一个语法事件来初始化当前索引改变事件
		 * @param {SyntaxEvent} syntaxEvent - 另一个语法事件
		 */
		initIndexChangeEventBy : function(syntaxEvent){
			this.index = syntaxEvent.index;
			this.node = syntaxEvent.node;
		}
	});

	return IndexChangeEvent;
}(
	this.SyntaxEvent,
	// setIndex
	function(syntaxTree, index, node){
		var diff = syntaxTree.index - index;
		
		if(
			diff > 0
		){
			syntaxTree.splice(diff);
		}
		else {
			syntaxTree
				.getBy(
					index
				)
				.root = node;
		}
		
		syntaxTree.index = index;
	}
);

this.StarEvent = function(SyntaxEvent, NodeEvent, TextTag, WordTag){
	/**
	 * 星(*)事件，当语法树匹配到每一个结果时，将会触发此事件
	 */
	function StarEvent(){
		SyntaxEvent.call(this, "*");
	};
	StarEvent = new Rexjs(StarEvent, SyntaxEvent);
	
	StarEvent.static({
		/**
		 * 解析的星(*)事件中的信息
		 * @param {StarEvent} event - 星(*)事件
		 */
		parse : function(event){
			var plainTextEnabled = false, syntaxTree = event.target, tag = event.tag, textContent = event.textContent;
			
			switch(
				true
			){
				// 如果纯文本模式没有开启
				case !syntaxTree.plainText :
					break;
				
				// 如果是文本标签
				case tag instanceof TextTag :
					plainTextEnabled = true;
					break;
				
				// 如果是其他标签
				default :
					// 关闭纯文本模式
					syntaxTree.plainText = false;
					// 如果是 WordTag，要把标签作为片段文本，确保此次能正确保留有效字符
					plainTextEnabled = tag instanceof WordTag;
					break;
			}
			
			// 如果纯文本模式依然开启
			if(
				plainTextEnabled
			){
				// 添加节点
				syntaxTree[tag instanceof TextTag ? "appendTextNode" : "appendFragment"](textContent);
				return;
			}
			
			// 创建事件
			var nodeEvent = new NodeEvent(tag.id);

			// 初始化节点事件
			nodeEvent.initNodeEvent(tag, textContent, event.index);
			// 触发节点事件
			syntaxTree.dispatchEvent(nodeEvent);
		}
	});
	
	StarEvent.override({
		/**
		 * 设置事件阶段
		 * @param {Number} eventPhase - 语法标签
		 */
		setEventPhase : function(eventPhase){
			switch(
				true
			){
				// 如果默认行为被阻止
				case this.defaultPrevented :
					break;
				
				// 如果不是引用阶段
				case eventPhase !== USING_PHASE :
					break;
				
				// 默认
				default :
					StarEvent.parse(this);
					break;
			}
			
			setEventPhase.call(this, eventPhase);
		}
	});
	
	return StarEvent;
}(
	this.SyntaxEvent,
	this.NodeEvent,
	this.TextTag,
	this.WordTag
);

}.call(
	this,
	this.Event,
	this.Event.CAPTURING_PHASE,
	this.Event.USING_PHASE,
	this.Event.prototype.setEventPhase
));


// 语法解析器相关
(function(){

this.SyntaxParser = function(Element, querySelector){
	/**
	 * 解析器基类
	 */
	function SyntaxParser(syntaxTree){
		this.syntaxTree = syntaxTree;
	};
	SyntaxParser = new Rexjs(SyntaxParser);

	SyntaxParser.static({
		deps : [],
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
		 * 在第一个节点之前与第二个节点之后，添加保护性的小括号，用于保护解析后文本内容中的方法，防止 new 的错误调用
		 * @param {Node} first - 第一个节点
		 * @param {Node} second - 第二个节点
		 * @param {Node} node - 用于判断 operating 的节点
		 * @param {String} _firstContent - 需要重置第一个节点的文本内容
		 * @param {String} _secondContent - 需要重置第二个节点的文本内容
		 */
		protectMethod : function(first, second, node, _firstContent, _secondContent){
			var withNew = this.operating(node, "new");
			
			// 设置 first 节点的文本内容
			first.textContent = (withNew ? "(" : " ") + (_firstContent == null ? first.textContent : _firstContent);
			// 设置 second 节点文本内容
			second.textContent = (_secondContent == null ? second.textContent : _secondContent) + (withNew ? ")" : "");
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

this.SyntaxExpression = function(SyntaxParser, storage){
	/**
	 * 表达式解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function SyntaxExpression(syntaxTree){
		SyntaxParser.call(this, syntaxTree);
		
		syntaxTree.addEventListener(
			"expressionStart",
			function(event){
				var arr, expressionEndListener, previousListener, index = event.index, node = event.node;
				
				// 如果数组不存在
				if(
					storage.hasOwnProperty(index)
				){
					arr = storage[index];
					
					// 添加节点
					arr.push(node);
				}
				else {
					// 初始化一个新列表
					arr = storage[index] = [node];
				}
				
				// 监听 beforeEnding 事件
				previousListener = function(e){
					// 如果大于或等于
					if(
						e.index >= index
					){
						// 返回
						return false;
					}
					
					// 如果进入该函数，则说明 expressionEnd 没有被调用
					this.error(node, "未结束的表达式。");
					return true;
				};
				
				this.addEventListener(
					"expressionEnd",
					function(e){
						// 如果不是同一个表达式
						if(
							e.node !== node
						){
							return false;
						}
						
						// 取消对 previous 事件的监听
						this.removeEventListener("previous", previousListener);
						
						// 删除记录
						arr.splice(
							arr.indexOf(node),
							1
						);
						
						// 如果已经清空
						if(
							arr.length === 0
						){
							// 彻底删除
							delete storage[index];
						}
						
						return true;
					},
					index
				);
				
				this.addEventListener("previous", previousListener);
			}
		);
	};
	SyntaxExpression = new Rexjs(SyntaxExpression, SyntaxParser);
	
	SyntaxExpression.static({
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
	
	return SyntaxExpression;
}(
	this.SyntaxParser,
	// storage
	{}
);

}.call(
	this
));


// 语法树默认行为
(function(){

this.DefaultSyntaxTagRegister = function(TextTag, WHITESPACE_REGEXP){
	/**
	 * 语法树默认标签注册器
	 * @param {SyntaxTree} syntaxTree - 相关的语法树
	 */
	function DefaultSyntaxTagRegister(syntaxTree){
		// 注册空白标签
		syntaxTree.register(
			new TextTag(
				"whitespace",
				WHITESPACE_REGEXP
			)
		);
	};
	DefaultSyntaxTagRegister = new Rexjs(DefaultSyntaxTagRegister);
	
	return DefaultSyntaxTagRegister;
}(
	this.TextTag,
	// WHITESPACE_REGEXP
	/\s+/
);
	
this.DefaultSyntaxListener = function(SyntaxExpression){
	/**
	 * 语法树默认监听器
	 * @param {SyntaxTree} syntaxTree - 相关的语法树
	 */
	function DefaultSyntaxListener(syntaxTree){
		new SyntaxExpression(syntaxTree);
	};
	DefaultSyntaxListener = new Rexjs(DefaultSyntaxListener);
	
	return DefaultSyntaxListener;
}(
	this.SyntaxExpression
);
	
}.call(
	this
));


// 语法树辅助相关
(function(DOUBLE_CHAR_REGEXP){

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
));


// 语法树相关
(function(ListenerListMap, SyntaxEvent, StarEvent, CloseTag, DEFAULT_INDEX, currentSyntaxTree, fragmentTag, document, splice){

this.SyntaxEventTarget = function(EventTarget){
	/**
	 * 语法事件目标
	 */
	function SyntaxEventTarget(){
		EventTarget.call(this);
	};
	SyntaxEventTarget = new Rexjs(SyntaxEventTarget, EventTarget);

	SyntaxEventTarget.props({
		root : null
	});

	return SyntaxEventTarget;
}(
	this.EventTarget
);

this.SyntaxEventTargetList = function(SyntaxEventTarget, ListenerListMap, IndexChangeEvent, NONE_PHASE, CAPTURING_PHASE, USING_PHASE, RELEASING_PHASE, map, dispatchEvent, dispatchEventByPoints){
	/**
	 * 语法事件目标列表
	 */
	function SyntaxEventTargetList(){
		this.next(null);
	};
	SyntaxEventTargetList = new Rexjs(SyntaxEventTargetList);
	
	SyntaxEventTargetList.props({
		/**
		 * 添加事件监听器
		 * @param {String} type - 事件类型
		 * @param {Function} listener - 指定的监听器
		 * @param {Number} _phase - 监听的阶段
		 */
		addEventListener  : function(type, listener, _index, _phase){
			this.getBy(
					_index
				)
				.addEventListener(
					type,
					listener,
					_phase
				);
		},
		/**
		 * 触发事件
		 * @param {Event} event - 已经初始完毕的事件对象
		 */
		dispatchEvent : function(event){
			var index = event.index, type = event.type, indexedMap = this.getBy(index).map, defaultMap = this.getBy(DEFAULT_INDEX).map;
			
			// 清空 map
			map = null;
			
			switch(
				true
			){
				// 如果当前索引等于默认索引
				case index === DEFAULT_INDEX :
					map = defaultMap;
					break;
				
				// 如果检索的映射中没有对应监听器
				case !ListenerListMap.has(indexedMap, type) :
					map = defaultMap;
					break;
				
				// 如果没有默认监听器
				case !ListenerListMap.has(defaultMap, type) :
					map = indexedMap;
					break;
			}
			
			// 如果 map 存在，说明只有一个 SyntaxEventTarget
			if(
				map
			){
				// 触发事件
				dispatchEvent.call(this, event);
				// 清空 map
				map = null;
				return;
			}
			
			var callback, syntaxEventTargetList = this, defaultPoint = defaultMap[type].point, indexedPoint = indexedMap[type].point;
			
			callback = function(listener, index){
				switch(
					true
				){
					// 如果已经取消冒泡，则不再继续
					case event.cancelBubble :
						return true;
					
					// 如果监听器返回 true
					case listener.call(syntaxEventTargetList, event) :
						// 取消监听
						ListenerListMap.deleteBy(this, type, index);
						return false;
				}
			};
			
			// 设置 target
			event.target = this;
		
			// 设置捕获阶段
			event.setEventPhase(CAPTURING_PHASE);
			
			// 调用捕获阶段事件监听器
			indexedPoint.leftToStart(callback, indexedMap);
			defaultPoint.leftToStart(callback, defaultMap);
			
			// 设置引用阶段
			event.setEventPhase(USING_PHASE);
			
			// 调用引用阶段事件监听器
			indexedPoint.rightToLeft(callback, indexedMap);
			defaultPoint.rightToLeft(callback, defaultMap);
			
			// 设置释放阶段
			event.setEventPhase(RELEASING_PHASE);
			
			// 调用引用阶段事件监听器
			indexedPoint.endToRight(callback, indexedMap);
			defaultPoint.endToRight(callback, defaultMap);
			
			// 设置无阶段
			event.setEventPhase(NONE_PHASE);
		},
		/**
		 * 获取指定索引的事件目标对象，如果不存在，将自动创建并返回
		 * @param {Number} _index - 指定的索引
		 */
		getBy : function(_index){
			var index = _index || DEFAULT_INDEX, length = this.length;

			// 如果索引大于等于长度，则说明不存在
			if(
				index >= length
			){
				this.splice(0, index + 1 - length);
			}

			return this[index];
		},
		index : -1,
		length : 0,
		get map(){
			return map;
		},
		/**
		 * 下一个索引
		 */
		next : function(node){
			// 创建 next 事件
			var nextEvent = new IndexChangeEvent("next");
			
			// 初始化 next 事件
			nextEvent.initIndexChangeEvent(this.index + 1, node);
			// 分配 next 事件
			this.dispatchEvent(nextEvent);
		},
		/**
		 * 上一个索引
		 */
		previous : function(){
			// 创建 previous 事件
			var previousEvent = new IndexChangeEvent("previous");
			
			// 初始化 previous 事件
			previousEvent.initIndexChangeEvent(this.index - 1, this.root);
			// 分配 previous 事件
			this.dispatchEvent(previousEvent);
		},
		/**
		 * 移除指定的事件监听器
		 * @param {String} type - 事件类型
		 * @param {Function} listener - 指定的监听器
		 * @param {Number} _phase - 监听的阶段
		 */
		removeEventListener : function(type, listener, _index, _phase){
			this.getBy(
					_index
				)
				.removeEventListener(
					type,
					listener,
					_phase
				);
		},
		/**
		 * 从当前索引处删除指定数量的事件目标并再添加指定数量的监听器目标
		 * @param {String} type - 事件类型
		 * @param {Function} listener - 指定的监听器
		 * @param {Number} _phase - 监听的阶段
		 */
		splice : function(dc, _ac){
			var len, length = this.length, ac = _ac || 0;
			
			// 如果数量删除大于 0
			if(
				dc > 0
			){
				len = length - dc;
				
				for(
					var i = length - 1;i >= len;i--
				){
					// 删除当前索引的事件目标
					delete this[i];
				}
				
				length = len;
			}
			
			// 如果添加数量大于 0
			if(
				ac > 0
			){
				len = length + ac;
			
				// 依次添加事件目标
				for(
					var i = length;i < len;i++
				){
					this[i] = new SyntaxEventTarget();
				}
			}
			
			// 设置长度
			this.length = len;
		}
	});

	return SyntaxEventTargetList;
}(
	this.SyntaxEventTarget,
	this.ListenerListMap,
	this.IndexChangeEvent,
	SyntaxEvent.NONE_PHASE,
	SyntaxEvent.CAPTURING_PHASE,
	SyntaxEvent.USING_PHASE,
	SyntaxEvent.RELEASING_PHASE,
	// map
	null,
	this.SyntaxEventTarget.prototype.dispatchEvent
);

this.SyntaxTree = function(
	SyntaxEventTargetList, SyntaxRegExp, SyntaxTags, SyntaxError,
	DefaultSyntaxTagRegister, DefaultSyntaxListener,
	callback, init
){
	/**
	 * 语法树类
	 */
	function SyntaxTree(){
		SyntaxEventTargetList.call(this);
		
		this.regexp = new SyntaxRegExp();
		this.tags = new SyntaxTags();
		
		new DefaultSyntaxTagRegister(this);
		new DefaultSyntaxListener(this);
	};
	SyntaxTree = new Rexjs(SyntaxTree, SyntaxEventTargetList);
	
	SyntaxTree.static({
		/**
		 * 创建语法树元素
		 * @param {String} tagName - 标签名称
		 * @param {String} _textContent - 元素文本内容
		 */
		createElement : function(tagName, _textContent){
			var element = document.createElementNS("rexjs", tagName);
			
			// 如果提供了文本内容
			if(
				_textContent
			){
				// 设置文本内容
				element.textContent = _textContent;
			}
			
			return element;
		},
		/**
		 * 创建语法树文本节点
		 * @param {String} _textContent - 节点文本内容
		 */
		createText : function(textContent){
			return document.createTextNode(textContent);
		},
		/**
		 * 获取当前语法树实例
		 */
		get current(){
			return currentSyntaxTree;
		}
	});
	
	SyntaxTree.props({
		/**
		 * 添加指定节点到当前语法树
		 * @param {Node} node - 指定的节点
		 */
		appendChild : function(node){
			// 在 node 上记录 index
			node.index = this.regexp.lastIndex;
			// 在 node 上记录 originalContent
			node.originalContent = node.textContent;
			
			// 往当前根节点中添加节点
			this.root
				.appendChild(
					node
				);
			
			return node;
		},
		/**
		 * 添加元素
		 * @param {String} tagName - 标签名
		 * @param {String} textContent - 文本内容
		 */
		appendElement : function(tagName, _textContent){
			return this.appendChild(
				SyntaxTree.createElement(tagName, _textContent)
			);
		},
		/**
		 * 添加片段文本
		 * @param {String} textContent - 文本内容
		 */
		appendFragment : function(textContent){
			return this.appendElement("fragment", textContent);
		},
		/**
		 * 添加语句元素
		 */
		appendStatement : function(){
			var statementElement = this.appendElement("statement", "");
			
			this.next(statementElement);
			return statementElement;
		},
		/**
		 * 添加文本节点
		 * @param {String} textContent - 文本内容
		 */
		appendTextNode : function(textContent){
			// 添加节点
			return this.appendChild(
				SyntaxTree.createText(textContent)
			);
		},
		content : "",
		/**
		 * 创建语法树节点
		 * @param {String} content - 语法内容
		 */
		create : function(content){
			// 如果正在创建其他语法树
			if(
				currentSyntaxTree
			){
				// 报错
				throw "请等待其他语法树创建完毕再进行创建当前语法树。";
				return null;
			}
			
			var docFragment = document.createDocumentFragment();

			// 初始化语法树
			init(this, this, content, docFragment);
			
			// 初始化第一个语句元素
			this.appendStatement();
			// 执行表达式
			this.regexp.exec(content, callback, this);
			// 返回上一层
			this.previous();
			
			// 如果当前根节点是 docFragment
			if(
				this.root === docFragment
			){
				// 将语法树还原到初始状态
				init(this, null, "", null);
				// 返回元素
				return docFragment;
			}
			
			throw "语法树没有正确的闭合。";
			return null;
		},
		/**
		 * 抛出错误
		 * @param {Node} node - 指定的代码节点
		 * @param {String} description - 错误描述
		 */
		error : function(node, description){
			new SyntaxError(this.content, node.index || 0, (node.originalContent || "").length, description);
		},
		plainText : false,
		regexp : null,
		/**
		 * 注册语法标签
		 * @param {SyntaxTag} syntaxTag - 需要添加的语法标签
		 * @param {Boolean} _prior - 优先级是否较高
		 */
		register : function(syntaxTag, _prior){
			// 添加标签
			SyntaxTags.setNamedItem(
				this.tags,
				syntaxTag,
				_prior ? 0 : null
			);
			
			// 添加正则
			this.regexp
				.add(
					syntaxTag.regexp,
					_prior
				);
		},
		restore : function(current){
			// 设置当前的语法树
			currentSyntaxTree = this;
			// 记录内容
			this.content = content;
			// 重置索引
			this.index = DEFAULT_INDEX;
			
			// 删除非默认监听器以外所有监听器
			this.splice(DEFAULT_INDEX + 1);
			
			this.getBy(
					DEFAULT_INDEX
				)
				.root = element;
		},
		rex : false,
		get root(){
			return this[this.index].root;
		},
		tags : null
	});
	
	return SyntaxTree;
}(
	this.SyntaxEventTargetList,
	this.SyntaxRegExp,
	this.SyntaxTags,
	this.SyntaxError,
	this.DefaultSyntaxTagRegister,
	this.DefaultSyntaxListener,
	// callback
	function(textContent, tagIndex){
		var event = new StarEvent(), tag = tagIndex === - 1 ? fragmentTag : this.tags[tagIndex];
		
		// 初始化转码事件
		event.initSyntaxEvent(
			tag,
			textContent,
			tag instanceof CloseTag ? this.index - 2 : this.index
		);
		
		// 分配转码事件
		this.dispatchEvent(event);
	},
	// init
	function(syntaxTree, current, content, root){
		// 设置当前的语法树
		currentSyntaxTree = current;
		// 记录内容
		syntaxTree.content = content;
		
		// 删除非默认监听器以外所有监听器
		splice.call(syntaxTree, DEFAULT_INDEX + 1);
		
		// 设置默认监听器的根节点
		syntaxTree
			.getBy(
				DEFAULT_INDEX
			)
			.root = root;
	}
);

}.call(
	this,
	this.ListenerListMap,
	this.SyntaxEvent,
	this.StarEvent,
	this.CloseTag,
	// DEFAULT_INDEX
	0,
	// currentSyntaxTree
	null,
	// fragmentTag
	new this.FragmentTag(),
	document,
	Array.prototype.splice
));


// 包相关
(function(){

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
			// 添加依赖
			this.package(content.deps);
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


// ECMAScript 解析器基类相关
(function(){

this.ECMAScriptParser = function(SyntaxParser, SyntaxTree, TAG_TYPE_OPERATOR, TAG_TYPE_DOUBLE_OPERATOR, TAG_TYPE_NOWRAP_OPERATOR){
	/**
	 * ECMAScript 语法解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptParser(syntaxTree){
		SyntaxParser.call(this, syntaxTree);
	};
	ECMAScriptParser = new Rexjs(ECMAScriptParser, SyntaxParser);
	
	ECMAScriptParser.static({
		TAG_TYPE_DOUBLE_OPERATOR : TAG_TYPE_DOUBLE_OPERATOR,
		TAG_TYPE_NOWRAP_OPERATOR : TAG_TYPE_NOWRAP_OPERATOR,
		TAG_TYPE_OPERATOR : TAG_TYPE_OPERATOR,
		/**
		 * 判断指定元素是否是运算符
		 * @param {Element} element - 指定的元素
		 */
		isOperator : function(element){
			return (element.tagType & TAG_TYPE_OPERATOR) > 0;
		},
		/**
		 * 判断指定节点是否处于运算状态下
		 * @param {Node} _node - 指定的节点
		 */
		operating : function(_node){
			var parentNode = _node ? _node.parentNode : SyntaxTree.current.root, pnode = parentNode;
			
			// 如果父元素是 statement 元素
			while(
				pnode.tagName === "statement"
			){
				// 再次获取 parentNode
				pnode = pnode.parentNode;
			}
			
			// 如果父节点是小括号或中括号，则返回 true
			switch(
				pnode.tagName
			){
				case "paren" :
					return true;

				case "bracket" :
					return true;
			}
			
			// 获取上一个元素
			var elementSibling = _node ? this.getPreviousElementSibling(_node) : parentNode.lastElementChild;
			
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
				case (elementSibling.tagType & TAG_TYPE_DOUBLE_OPERATOR) === TAG_TYPE_DOUBLE_OPERATOR  :
					// 如果两元素是兄弟元素，则说明2个元素之间不存在其他文本内容，属于前置性双操作符
					return elementSibling.previousElementSibling === ECMAScriptParser.getSeparatorElement(elementSibling);
				
				default :
					return true;
			}
		}
	});
	
	ECMAScriptParser.props({
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
		}
	});
	
	return ECMAScriptParser;
}(
	this.SyntaxParser,
	this.SyntaxTree,
	// TAG_TYPE_OPERATOR
	36,
	// TAG_TYPE_DOUBLE_OPERATOR
	100,
	// TAG_TYPE_NOWRAP_OPERATOR
	164
);

}.call(
	this
));


// ECMAScript 分组标签相关
(function(ECMAScriptParser, OpenTag, CloseTag){

this.ECMAScriptParen = function(OPEN_PARAN_REGEXP, CLOSE_PARENT_REGEXP, CLOSE_PARENT_WITH_BRACE_REGEXP){
	/**
	 * 小括号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptParen(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 起始小括号
		syntaxTree.register(
			new OpenTag(
				"paren",
				OPEN_PARAN_REGEXP,
				"openParan"
			)
		);
		
		// 结束小括号
		syntaxTree.register(
			new CloseTag(
				"paren",
				CLOSE_PARENT_REGEXP,
				"closeParan"
			)
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
			new OpenTag(
				"square",
				OPEN_SQUARE_REGEXP,
				"openSquare"
			)
		);
		
		// 结束中括号
		syntaxTree.register(
			new CloseTag(
				"square",
				CLOSE_SQUARE_REGEXP,
				"closeSquare"
			)
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
		ECMAScriptParser.call(this, syntaxTree);
		
		// 起始大括号
		syntaxTree.register(
			new OpenTag(
				"curly",
				OPEN_CURLY_REGEXP,
				"openCurly"
			)
		);
		
		// 结束大括号
		syntaxTree.register(
			new CloseTag(
				"curly",
				CLOSE_CURLY_REGEXP,
				"closeCurly"
			)
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

}.call(
	this,
	this.ECMAScriptParser,
	this.OpenTag,
	this.CloseTag
));


// 元素标签解析器相关
(function(ECMAScriptParser, ElementTag){

this.ECMAScriptNumber = function(REGEXP){
	/**
	 * 数字解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptNumber(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 注册标签
		syntaxTree.register(
			new ElementTag(
				"number",
				REGEXP
			)
		);
	};
	ECMAScriptNumber = new Rexjs(ECMAScriptNumber, ECMAScriptParser);
	
	return ECMAScriptNumber;
}(
	// REGEXP
	/\b\d+(?:\.\d+)?\b/g
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
			new ElementTag(
				"string",
				REGEXP
			)
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
				REGEXP
			)
		);
	};
	ECMAScriptRegExp = new Rexjs(ECMAScriptRegExp, ECMAScriptParser);
	
	return ECMAScriptRegExp;
}(
	// REGEXP
	/\/(?:\\\/|[^\/\n])+\/[img]?/
);

}.call(
	this,
	this.ECMAScriptParser,
	this.ElementTag
));


// 一些基本的标记符号解析器
(function(ECMAScriptParser, TokenTag, CAPTURING_PHASE, RELEASING_PHASE){

this.ECMAScriptDot = function(REGEXP, TAG_TYPE_OPERATOR){
	/**
	 * 点解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptDot(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 添加标签
		syntaxTree.register(
			new TokenTag(
				"dot",
				REGEXP,
				null,
				TAG_TYPE_OPERATOR
			)
		);
		
		// 监听符号点
		syntaxTree.addEventListener(
			"dot",
			function(event){
				// 开启纯文本模式
				this.plainText = true;
			}
		);
	};
	ECMAScriptDot = new Rexjs(ECMAScriptDot, ECMAScriptParser);
	
	return ECMAScriptDot;
}(
	// REGEXP
	/\./,
	ECMAScriptParser.TAG_TYPE_OPERATOR
);

this.ECMAScriptComma = function(REGEXP){
	/**
	 * 逗号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptComma(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 注册标签
		syntaxTree.register(
			new TokenTag(
				"comma",
				REGEXP,
				null,
				TokenTag.TYPE_CLAUSE_END
			)
		);
		
		// 添加捕获节点的监听
		syntaxTree.addEventListener(
			"comma",
			function(){
				// 跳出当前语句
				this.previous();
			},
			0,
			CAPTURING_PHASE
		);
		
		// 添加释放阶段的监听
		syntaxTree.addEventListener(
			"comma",
			function(){
				// 添加新语句
				this.appendStatement();
			},
			0,
			RELEASING_PHASE
		);
	};
	ECMAScriptComma = new Rexjs(ECMAScriptComma, ECMAScriptParser);
	
	return ECMAScriptComma;
}(
	// REGEXP
	/,/
);

this.ECMAScriptSemicolon = function(REGEXP){
	/**
	 * 分号解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptSemicolon(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 注册标签
		syntaxTree.register(
			new TokenTag(
				"semicolon",
				REGEXP,
				null,
				TokenTag.TYPE_STATEMENT_END
			)
		);
		
		// 添加捕获节点的监听
		syntaxTree.addEventListener(
			"semicolon",
			function(){
				// 跳出当前语句
				this.previous();
			},
			0,
			CAPTURING_PHASE
		);
		
		// 添加释放阶段的监听
		syntaxTree.addEventListener(
			"semicolon",
			function(){
				// 添加新语句
				this.appendStatement();
			},
			0,
			RELEASING_PHASE
		);
	};
	ECMAScriptSemicolon = new Rexjs(ECMAScriptSemicolon, ECMAScriptParser);
	
	return ECMAScriptSemicolon;
}(
	// REGEXP
	/;/
);

}.call(
	this,
	this.ECMAScriptParser,
	this.TokenTag,
	this.Event.CAPTURING_PHASE,
	this.Event.RELEASING_PHASE
));


// 关键字解析器相关
(function(ECMAScriptParser){

this.ECMAScriptKeywordTags = function(SyntaxTags, KeywordTag, TAG_TYPE_OPERATOR){
	/**
	 * 关键字标签
	 */
	function ECMAScriptKeywordTags(){
		SyntaxTags.call(this);
		
		// 普通的关键字
		[
			"break", "case", "catch", "class", "const", "continue",
			"debugger", "default", "do", "else", "enum", "export", "extends",
			"false", "finally", "for", "function", "if", "import", "let", "null",
			"return", "static", "super", "switch", "this", "true", "try",
			"var", "while", "with", "yield"
		]
		.forEach(
			function(name){
				ECMAScriptKeywordTags.setNamedItem(
					this,
					new KeywordTag(name)
				);
			},
			this
		);
		
		// 关键字操作符
		[
			"delete", "in", "instanceof", "new", "throw", "typeof", "void"
		]
		.forEach(
			function(name){
				ECMAScriptKeywordTags.setNamedItem(
					this,
					new KeywordTag(
						name,
						null,
						null,
						TAG_TYPE_OPERATOR
					)
				);
			},
			this
		);
	};
	ECMAScriptKeywordTags = new Rexjs(ECMAScriptKeywordTags, SyntaxTags);
	
	return ECMAScriptKeywordTags;
}(
	this.SyntaxTags,
	this.KeywordTag,
	ECMAScriptParser.TAG_TYPE_OPERATOR
);

this.ECMAScriptKeyword = function(NodeEvent, CAPTURING_PHASE, tags){
	/**
	 * 关键字解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptKeyword(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 监听 fragment 事件
		syntaxTree.addEventListener(
			"fragment",
			function(event){
				var textContent = event.textContent;
				
				// 如果不是关键字标签
				if(
					!tags.hasOwnProperty(textContent)
				){
					// 返回
					return;
				}
				
				var tag = tags[textContent], keywordEvent = new NodeEvent(textContent);
				
				// 阻止默认事件
				event.preventDefault();
				// 阻止冒泡
				event.stopPropagation();
				
				// 初始化事件
				keywordEvent.initNodeEvent(tag, textContent, event.index);
				// 分配事件
				this.dispatchEvent(keywordEvent);
			},
			0,
			CAPTURING_PHASE
		);
	};
	ECMAScriptKeyword = new Rexjs(ECMAScriptKeyword, ECMAScriptParser);
	
	ECMAScriptKeyword.static({
		get tags(){
			return tags;
		}
	});
	
	return ECMAScriptKeyword;
}(
	this.NodeEvent,
	this.Event.CAPTURING_PHASE,
	// tags
	new this.ECMAScriptKeywordTags()
);

}.call(
	this,
	this.ECMAScriptParser
));


// 符号操作符解析器相关
(function(ECMAScriptParser){

this.ECMAScriptOperatorTags = function(SyntaxTags, TokenTag, TAG_TYPE_OPERATOR, TAG_TYPE_DOUBLE_OPERATOR, list){
	/**
	 * 操作符标签
	 */
	function ECMAScriptOperatorTags(){
		SyntaxTags.call(this);
		
		// 遍历列表
		list.forEach(
			function(data){
				// 注册标签
				ECMAScriptOperatorTags.setNamedItem(
					this,
					new TokenTag(
						data.name,
						data.regexp,
						null,
						data.double ? TAG_TYPE_DOUBLE_OPERATOR : TAG_TYPE_OPERATOR
					)
				);
			},
			this
		);
	};
	ECMAScriptOperatorTags = new Rexjs(ECMAScriptOperatorTags, SyntaxTags);
	
	return ECMAScriptOperatorTags;
}(
	this.SyntaxTags,
	this.TokenTag,
	ECMAScriptParser.TAG_TYPE_OPERATOR,
	ECMAScriptParser.TAG_TYPE_DOUBLE_OPERATOR,
	// list
	[
		{
			name : "increment",
			regexp : /\+\+/,
			double : true
		}, {
			name : "decrement",
			regexp : /--/,
			double : true
		}, {
			name : "spread",
			regexp : /\.{3}/
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
			regexp : /\|/
		}, {
			name : "ampersand",
			regexp : /\&/
		}, {
			name : "bang",
			regexp : /!/
		}, {
			// close angle
			name : "ca",
			regexp : />/
		}, {
			// open angle
			name : "oa",
			regexp : /</
		}, {
			name : "equal",
			regexp : /=/
		}, {
			name : "tilde",
			regexp : /~/
		}, {
			name : "caret",
			regexp : /\^/
		}, {
			name : "precent",
			regexp : /%/
		}, {
			name : "blackslash",
			regexp : /\\/
		}
	]
);

this.ECMAScriptOperator = function(tags, forEach){
	/**
	 * 操作符解析器
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptOperator(syntaxTree){
		ECMAScriptParser.call(this, syntaxTree);
		
		// 遍历标签
		forEach.call(
			tags,
			function(tag){
				// 注册标签
				syntaxTree.register(tag);
			}
		);
	};
	ECMAScriptOperator = new Rexjs(ECMAScriptOperator, ECMAScriptParser);
	
	ECMAScriptOperator.static({
		get tags(){
			return tags;
		}
	});
	
	return ECMAScriptOperator;
}(
	// tags
	new this.ECMAScriptOperatorTags(),
	Array.prototype.forEach
);

}.call(
	this,
	this.ECMAScriptParser
));


// 条件解析器相关
(function(){

this.ECMAScriptCondition = function(ECMAScriptParser, SyntaxEvent, TextTag, CAPTURING_PHASE){
	function ECMAScriptCondition(syntaxTree, keyword){return;
		ECMAScriptParser.call(this, syntaxTree);
		
		syntaxTree.addEventListener(
			keyword,
			function(event){
				var index = event.index, condition = event.node, expressionStartEvent = new SyntaxEvent("expressionStart");
				
				// 初始化表达式开始事件
				expressionStartEvent.initSyntaxEventBy(event);
				// 触发表达式开始事件
				this.dispatchEvent(expressionStartEvent);
				
				this.addEventListener(
					"closeParan",
					function(closeParanEvent){
						var paran = closeParanEvent.node;
						
						if(
							condition.nextElementSibling !== paran
						){
							this.error(condition, "不完整的" + event.textContent + "表达式。");
							return true;
						}
						
						var openCurlyTag = this.tags.openCurly;
						
						this.addEventListener(
							"*",
							function(starEvent){
								var tag = starEvent.tag;
								
								switch(
									true
								){
									case tag instanceof TextTag :
										return false;
										
									case tag === openCurlyTag :
										break;
										
									default :
										openCurlyTag.live(this, "{");
										
										this.addEventListener(
											"end",
											function(){
												console.log(333)
											},
											index + 1
										);
										break;
								}
								
								return true;
							},
							index,
							CAPTURING_PHASE
						);
						
						return true;
					},
					index
				);
				
				this.addEventListener(
					"closeCurly",
					function(e){
						var expressionEndEvent = new SyntaxEvent("expressionEnd");
				
						// 初始化表达式结束事件
						expressionEndEvent.initSyntaxEventBy(event);
						// 触发表达式结束事件
						this.dispatchEvent(expressionEndEvent);
						return true;
					},
					index
				);
			}
		);
	};
	ECMAScriptCondition = new Rexjs(ECMAScriptCondition, ECMAScriptParser);
	
	return ECMAScriptCondition;
}(
	this.ECMAScriptParser,
	this.SyntaxEvent,
	this.TextTag,
	this.SyntaxEvent.CAPTURING_PHASE
);

this.ECMAScriptIf = function(ECMAScriptCondition){
	function ECMAScriptIf(syntaxTree){
		ECMAScriptCondition.call(this, syntaxTree, "if");
		
		syntaxTree.addEventListener(
			"if",
			function(event){
				
			}
		);
	};
	ECMAScriptIf = new Rexjs(ECMAScriptIf, ECMAScriptCondition);
	
	return ECMAScriptIf;
}(
	this.ECMAScriptCondition
);

}.call(
	this
));


// 基本的文本标签解析器相关
(function(ECMAScriptParser, SyntaxExpression, TextTag, TYPE_CLAUSE_END, TAG_TYPE_OPERATOR, TAG_TYPE_DOUBLE_OPERATOR){

this.ECMAScriptComment = function(REGEXP){
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
	// REGEXP
	/\/\*[\S\s]*?\*\/|\/\/.*/g
);

this.ECMAScriptASI = function(NodeEvent, StarEvent, CAPTURING_PHASE, REGEXP, parse, returnable, insertable){
	/**
	 * 自动分号插入机制
	 * @param {SyntaxTree} syntaxTree - 依赖的语法树
	 */
	function ECMAScriptASI(syntaxTree){
		var semicolonTag = syntaxTree.tags.semicolon;
		
		ECMAScriptParser.call(this, syntaxTree);
		
		// 注册
		syntaxTree.register(
			new TextTag("asi", REGEXP),
			true
		);
		
		// 监听换行
		syntaxTree.addEventListener(
			"asi",
			function(event){
				var index = event.index;
				
				// 如果满足返回条件
				if(
					returnable(event, this.root, index)
				){
					// 返回，不再继续
					return;
				}
				
				var starEvents = [];
				
				// 监听 * 事件
				this.addEventListener(
					"*",
					function(e){
						var tag = e.tag;
						
						switch(
							true
						){
							// 如果是文本标签
							case tag instanceof TextTag :
								// 阻止默认行为
								e.preventDefault();
								// 停止冒泡
								e.stopPropagation();
								// 添加到堆栈中
								starEvents.push(e);
								return false;
						
							// 如果满足插入条件
							case insertable(tag) :
								var semicolonEvent = new NodeEvent("semicolon");
				
								// 初始化分号节点事件
								semicolonEvent.initNodeEvent(semicolonTag, ";", index);
								// 触发分号事件
								this.dispatchEvent(semicolonEvent);
								break;
						}
						
						// 添加该标签到文档中
						event.tag.live(this, event.textContent);
						// 将存储的文本标签按顺序添加到文档中
						starEvents.forEach(parse, StarEvent);
						return true;
					},
					index,
					CAPTURING_PHASE
				);
				
				// 阻止默认行为
				event.preventDefault();
			},
			0,
			CAPTURING_PHASE
		);
	};
	ECMAScriptASI = new Rexjs(ECMAScriptASI, ECMAScriptParser);
	
	return ECMAScriptASI;
}(
	this.NodeEvent,
	this.StarEvent,
	this.Event.CAPTURING_PHASE,
	// REGEXP
	/\s*(?:\n\s*|$)/,
	this.StarEvent.parse,
	// returnable
	function(event, root, index){
		switch(
			true
		){
			// 如果是结束标识 $
			case event.textContent === "" :
				return true;
			
			// 如果处于任何表达式内
			case SyntaxExpression.in(null, index) :
				return true;
			
			// 如果处于运算中
			case ECMAScriptParser.operating() :
				return true;
		}
		
		var lastElementChild = root.lastElementChild;
		
		// 如果元素不存在，则说明是该语句目前是空的，也不需要插入分号
		return lastElementChild === null;
	},
	// insertable
	function(tag){
		switch(
			tag.name
		){
			// 如果是小括号
			case "paran" :
				break;
			
			// 如果是中括号	
			case "square" :
				break;
			
			// 如果是逗号
			case "comma" :
				break;
			
			// 如果是分号
			case "semicolon" :
				break;
				
			default :
				var type = tag.type;
				
				return (
						// 判断当前标签是否为操作符标签
						type & TAG_TYPE_OPERATOR
					) > 0 ?
						// 如果上面判断是操作符，则继续判断是否为双操作符，是则返回 true，否则 false
						(type & TAG_TYPE_DOUBLE_OPERATOR) === TAG_TYPE_DOUBLE_OPERATOR :
						// 不是操作符，返回 true
						true;
		}
		
		return false;
	}
);
	
}.call(
	this,
	this.ECMAScriptParser,
	this.SyntaxExpression,
	this.TextTag,
	this.SyntaxTag.TYPE_CLAUSE_END,
	this.ECMAScriptParser.TAG_TYPE_OPERATOR,
	this.ECMAScriptParser.TAG_TYPE_DOUBLE_OPERATOR
));


// ECMAScript 解析器包
(function(){

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
		this.ECMAScriptParen,
		this.ECMAScriptSquare,
		this.ECMAScriptCurly,
		this.ECMAScriptNumber,
		this.ECMAScriptString,
		this.ECMAScriptRegExp,
		this.ECMAScriptDot,
		this.ECMAScriptComma,
		this.ECMAScriptSemicolon,
		this.ECMAScriptKeyword,
		this.ECMAScriptOperator,
		this.ECMAScriptIf,
		this.ECMAScriptComment,
		this.ECMAScriptASI
	]
);

}.call(
	this
));


// 初始化模块
(function(){

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
				forEach.call(
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
					}
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
	0,
	Array.prototype.forEach
);

}.call(
	this
));

Rexjs.static(this);
}(
	Rexjs
);