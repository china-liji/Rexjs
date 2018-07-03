!function(Rexjs, Object, defineProperty, getPrototypeOf){

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
	Object.defineProperty,
	Object.getPrototypeOf
);