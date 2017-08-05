// Rexjs 的实现
new function(global, descriptor, defineProperty, getPrototypeOf, setPrototypeOf, getOwnPropertyNames){
"use strict";

this.Rexjs = function(Function, create, getPrototypeOf, getProperties, setPrototypeOf){
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
	Function,
	Object.create,
	getPrototypeOf,
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
						if(obj.hasOwnProperty(name)){
							return;
						}

						obj[name] = prototype[name];
					});

					prototype = getPrototypeOf(prototype);
				}
				while(prototype);
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


// 原型链属性的定义
new function(Function, prototype, propertyIsEnumerable, hasOwnProperty, isPrototypeOf, defineProperty, getOwnPropertyDescriptor, definePrototype){
"use strict";

this.hasOwnProperty = hasOwnProperty;
this.isPrototypeOf = isPrototypeOf;
this.propertyIsEnumerable = propertyIsEnumerable;

this.constructor = function(constructor, call, apply, bind, toString, getPrototypeOf, defineProperties){
	defineProperties(
		definePrototype(
			// 兼容 ： IE9、IE10、Android
			getPrototypeOf(constructor)
		),
		{
			apply: apply,
			bind: bind,
			call: call,
			/**
			 * 将一个或多个属性添加到该类，并/或修改现有属性的特性
			 * @param {Object} props - 包含一个或多个属性的键值对
			 */
			props: function(props){
				defineProperties(this.prototype, props);
			},
			/**
			 * 将一个或多个静态属性添加到该类，并/或修改现有属性的特性
			 * @param {Object} props - 包含一个或多个属性的键值对
			 */
			static: function(props){
				defineProperties(this, props);
			},
			/**
			 * 对象字符串
			 */
			toString: function(){
				return "function " + this.name + "() { native code }";
			}
		}
	);

	return constructor;
}(
	prototype.constructor,
	Function.prototype.call,
	Function.prototype.apply,
	Function.prototype.bind,
	Function.prototype.toString,
	Object.getPrototypeOf,
	// defineProperties
	function(obj, props){
		for(var name in props){
			var descriptor = getOwnPropertyDescriptor(props, name);

			descriptor.enumerable = false;

			defineProperty(obj, name, descriptor);
		}
	}
);

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
		if(!Object.prototype.hasOwnProperty("__proto__")){
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

		for(var name in obj){
			if(props.indexOf(name) > -1){
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
				fn.call(_this, obj[i], i, obj)
			}
		}
		else {
			// 遍历
			for(var name in obj){
				// 调用测试函数
				fn.call(_this, obj[name], name, obj)
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

this.set = function(){
	/**
	 * 添加或修改指定对象的属性
	 * @param {*} obj - 需要添加或修改属性的对象
	 * @param {Object} props - 需要添加或修改的属性集合
	 */
	return function set(obj, props){
		for(var name in props){
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

		if(name){
			return "function " + name + "() { [native code] }";
		}

		return "function (){ [native code] }";
	};
}();

this.version = "1.0.0";

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
	Rexjs,
	Array
);