/*
 *  类库名称 ：jQun
 *  文档状态 ：2.0.0
 *  本次修改 ：
 *		1. 针对Chrome 42版本，进行全面改版：去除自定义类名称，如：new Class(constructor, "name", SuperClass) 改为 new Class(constructor, SuperClass)；
 *		2. 优化类的代码，提高运行效率；
 *		3. 增加模块加载所需支持的基础类：UnopenedNamespace、AnonymousSpace；
 *		4. 增加文件名相关类：Filename、FilenameConfig；
 *		5. 其他逻辑均不变。
 *  开发浏览器信息 ：firefox 20.0+、chrome 26.0+、IE 10+、基于webkit的手机及pc浏览器
 *  官方网站 ：http://www.jqunjs.com
 */

// jQun的定义
;
new function(window, descriptor, defineProperty, getPrototypeOf, setPrototypeOf, getOwnPropertyNames){
"use strict";

this.jQun = function(create, getProperties, setPrototypeOf){
	return function jQun(constructor, _SuperClass){
		///	<summary>
		///	面向对象基础类的构造器：生成一个继承指定父类的子类；
		/// 子类将继承父类的属性（prototype）和静态属性(__proto__)。
		///	</summary>
		///	<param name="constructor" type="Function">子类的构造函数。</param>
		///	<param name="_SuperClass" type="jQun">需要继承的父类。</param>
		var prototype, properties = getProperties(constructor);

		switch(
			typeof _SuperClass
		){
			case "function" :
				prototype = _SuperClass.prototype;
				break;

			case "undefined" :
				prototype = this.getOwnClass().prototype;
				break;

			default :
				prototype = _SuperClass;
				break;
		}

		setPrototypeOf(
			constructor,
			prototype ?
				(
					_SuperClass ? prototype.constructor : getPrototypeOf(this.constructor)
				) :
				create(null, properties)
		);

		constructor.prototype = create(prototype, properties);

		return constructor;
	};
}(
	Object.create,
	// getProperties
	function(constructor){
		return {
			constructor : {
				value : constructor,
				writable : true,
				configurable : true
			}
		};
	},
	// setPrototypeOf
	setPrototypeOf || (
		descriptor ?
			function(obj, prototype){
				descriptor.set.call(obj, prototype);
			} :
			function(obj, prototype){
				// 兼容 ： IE9、IE10、Android
				do {
					getOwnPropertyNames(
						prototype
					)
					.forEach(
						function(name){
							if(
								obj.hasOwnProperty(name)	
							){
								return;
							}

							obj[name] = prototype[name];
						}
					);

					prototype = getPrototypeOf(prototype);
				}
				while(prototype);
			}
	)
);

this.value = function(jQun){
	return new jQun(jQun, null);
}(
	this.jQun
);

defineProperty(window, "jQun", this);
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


// 基本方法和属性的定义
new function(jQun, Object, Array, getOwnPropertyNames, getOwnPropertyDescriptor, createPrototype, definePrototype){
"use strict";

this.every = function(){
	return function every(obj, fn, _this){
		///	<summary>
		///	确定对象的所有成员是否满足指定的测试。
		///	</summary>
		///	<param name="obj" type="Object">需要测试成员的对象。</param>
		///	<param name="fn" type="Function">用于测试对象成员的测试函数。</param>
		///	<param name="_this" type="*">指定测试函数的 this 对象。</param>
		if(
			obj instanceof Array
		){
			return obj.every(fn, _this);
		}

		var isNumber = typeof obj === "number";

		if(
			typeof _this !== "undefined"
		){
			fn = fn.bind(_this);
		}

		if(
			isNumber
		){
			obj = new Array(obj + 1).join(" ");
		}

		for(
			var o in obj
		){
			if(
				fn.apply(
					_this,
					isNumber ? [o - 0] : [obj[o], o, obj]
				)
			){
				continue;
			}

			return false;
		}

		return true;
	};
}();

this.forEach = function(every){
	return function forEach(obj, fn, _this){
		///	<summary>
		///	遍历对象的所有成员并对其执行指定操作函数。
		///	</summary>
		///	<param name="obj" type="Object">需要遍历的对象。</param>
		///	<param name="fn" type="Function">指定操作的函数。</param>
		///	<param name="_this" type="*">指定操作函数的 this 对象。</param>
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
	return function set(obj, props){
		///	<summary>
		///	添加或修改指定对象的属性。
		///	</summary>
		///	<param name="obj" type="Object">需要添加或修改属性的对象。</param>
		///	<param name="props" type="Object">需要添加或修改的属性集合。</param>
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

this.defineProperties = function(set, defineProperty){
	return function defineProperties(obj, props, _descriptor){
		///	<summary>
		///	将一个或多个属性添加到对象，并/或修改现有属性的特性。
		///	</summary>
		///	<param name="obj" type="Object">对其添加或修改属性的对象。</param>
		///	<param name="props" type="Object">包含一个或多个属性的键值对。</param>
		///	<param name="_descriptor" type="Object">需要添加或修改的属性描述符。</param>
		getOwnPropertyNames(
				props
			)
			.forEach(function(propertyName){
				var descriptor = getOwnPropertyDescriptor(props, propertyName);

				descriptor.enumerable = false;

				if(
					_descriptor
				){
					set(descriptor, _descriptor);

					if(
						descriptor.gettable || descriptor.settable
					){
						set(descriptor, descriptor.value);
					}
				}

				if(
					descriptor.set || descriptor.get
				){
					delete descriptor.writable;
					delete descriptor.value;
				}

				defineProperty(obj, propertyName, descriptor);
			});

		return obj;
	};
}(
	this.set,
	Object.defineProperty
);

this.define = function(defineProperties, set){
	return function define(obj, name, value, _descriptor){
		///	<summary>
		///	将属性添加到对象或修改现有属性的特性。
		///	</summary>
		///	<param name="obj" type="Object">对其添加或修改属性的对象。</param>
		///	<param name="name" type="String">需要添加或修改的属性名。</param>
		///	<param name="value" type="*">需要添加或修改的属性值。</param>
		///	<param name="_descriptor" type="Object">需要添加或修改的属性描述符。</param>
		var props = {};

		props[name] = value;

		defineProperties(obj, props, _descriptor);
		return obj;
	};
}(
	this.defineProperties,
	this.set
);

this.except = function(set, forEach){
	return function except(obj, props){
		///	<summary>
		///	返回一个不包含所有指定属性名称的对象。
		///	</summary>
		///	<param name="obj" type="Object">需要排除属性的对象。</param>
		///	<param name="props" type="Array">需要排除的属性名称数组。</param>
		var result = set({}, obj);

		forEach(
			props,
			function(name){
				delete result[name];
			}
		);
		
		return result;
	}
}(
	this.set,
	this.forEach
);

this.isInstanceOf = function(getPrototypeOf){
	return function isInstanceOf(obj, constructor){
		///	<summary>
		///	判断对象是否为指定类构造函数的一级实例（即直接由该类实例化）。
		///	</summary>
		///	<param name="obj" type="Object">用于判断的实例对象。</param>
		///	<param name="constructor" type="Function">指定的类的构造函数。</param>
		return getPrototypeOf(obj) === constructor.prototype;
	};
}(
	Object.getPrototypeOf
);

this.isPropertyOf = function(every){
	return function isPropertyOf(obj, property){
		///	<summary>
		///	检测对象自己是否具有指定属性或访问器。
		///	</summary>
		///	<param name="obj" type="Object">一个可能具有指定属性或访问器的对象。</param>
		///	<param name="property" type="*">用于检测的属性或访问器。</param>
		return !every(
			getOwnPropertyNames(obj),
			function(name){
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

this.nesting = function(forEach){
	return function nesting(obj, fn, _this){
		///	<summary>
		///	将对象中的每个枚举元素进行再枚举并执行指定操作（双重嵌套的forEach）。
		///	</summary>
		///	<param name="obj" type="Object">需要嵌套枚举并执行指定操作的对象（一般为json）。</param>
		///	<param name="fn" type="Function">指定的操作函数。</param>
		///	<param name="_this" type="*">指定操作函数的 this 对象。</param>
		forEach(
			obj,
			function(o){
				forEach(o, fn, _this);
			}
		);

		return obj;
	};
}(
	this.forEach
);

this.toArray = function(slice){
	return function toArray(obj, _start, _end){
		///	<summary>
		///	将类似数组的对象转化为数组。
		///	</summary>
		///	<param name="obj" type="Object">需要转化为数组的对象。</param>
		///	<param name="_start" type="Number">进行截取，截取的起始索引。</param>
		///	<param name="_end" type="Number">需要截取的末尾索引。</param>
		return slice.call(obj, _start || 0, _end);
	};
}(
	Array.prototype.slice
);

this.merge = function(nesting, toArray){
	return function merge(obj, args){
		///	<summary>
		///	深度合并对象中所有项，返回新的集合。
		///	</summary>
		///	<param name="obj" type="Object, Array">需要合并的项。</param>
		///	<param name="args" type="Object, Array">其他需要合并的项列表。</param>
		if(
			obj instanceof Array
		){
			return obj
				.concat
				.apply(
					obj,
					toArray(arguments, 1)
				);
		}

		var result = {}, another = arguments[1];

		nesting(
			arguments,
			function(value, name){
				result[name] = typeof value === "object" ? this(value) : value;
			},
			merge
		);
		
		return result;
	};
}(
	this.nesting,
	this.toArray
);

this.toString = function(){
	return function toString(){
		///	<summary>
		///	使函数在控制台里看起来像本地代码。
		///	</summary>
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
		if(
			typeof property === "function"
		){
			property.toString = self.toString;
		}

		this[name] = property;
	},
	jQun
);

}(
	jQun,
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
					value : jQun,
					writable : true
				}
			}
		);
	}
);


// 原型链属性的定义
new function(Function, prototype, forEach, defineProperties, definePrototype){
"use strict";

this.assign = function(){
	return function(props){
		///	<summary>
		///	给该类的属性赋值。
		///	</summary>
		///	<param name="props" type="Object">包含一个或多个属性的键值对。</param>
		/// <returns>this</returns>
		forEach(
			props,
			function(val, name){
				if(
					typeof val === "undefined"
				){
					return;
				}

				this[name] = val;
			},
			this
		);

		return this;
	};
}();

this.getSuperClass = function(getPrototypeOf){
	return function(){
		///	<summary>
		///	获取父类。
		///	</summary>
		return getPrototypeOf(
				this.getOwnClass()
					.prototype
			)
			.constructor;
	};
}(
	Object.getPrototypeOf
);

this.constructor = function(constructor, FUNCTION_NAME_REGX, assign, getPrototypeOf, call, apply, toString){
	return defineProperties(
		definePrototype(
			// 兼容 ： IE9、IE10、Android
			constructor instanceof Function ? constructor : getPrototypeOf(constructor)
		),
		{
			apply : apply,
			assign :assign,
			call : call,
			getSuperClass : function(){
				///	<summary>
				///	获取父类。
				///	</summary>
				return this.prototype.getSuperClass();
			},
			get name(){
				///	<summary>
				///	获取该类的名称：毕竟Function.name不是标准，就连IE11就没有实现这个属性。
				///	</summary>
				return (
					toString
						.call(
							// 因为在调试工具点开__proto__属性的时候，要获取__proto__的信息，
							// 所以当前对象this就为__proto__，但__proto__也有可能不是函数。
							typeof this === "function" ? this : this.constructor
						)
						.match(
							FUNCTION_NAME_REGX
						) ||
					["", ""]
				)[1];
			},
			set name(name){
				///	<summary>
				///	设置名称：因为Function.name是不可写属性，所以也不让设置。
				///	</summary>
			},
			override : function(props, _descriptor){
				///	<summary>
				///	重写一个或多个属性的值。
				///	</summary>
				///	<param name="props" type="Object">包含一个或多个属性的键值对。</param>
				///	<param name="_descriptor" type="Object">被添加或修改属性的描述符。</param>
				this.props(props, _descriptor);

				return this;
			},
			props : function(props, _descriptor){
				///	<summary>
				///	将一个或多个属性添加到该类，并/或修改现有属性的特性。
				///	</summary>
				///	<param name="props" type="Object">包含一个或多个属性的键值对。</param>
				///	<param name="_descriptor" type="Object">被添加或修改属性的描述符。</param>
				defineProperties(this.prototype, props, _descriptor);

				return this;
			},
			static : function(props, _descriptor){
				///	<summary>
				///	将一个或多个静态属性添加到该类，并/或修改现有属性的特性。
				///	</summary>
				///	<param name="props" type="Object">包含一个或多个属性的键值对。</param>
				///	<param name="_descriptor" type="Object">被添加或修改属性的描述符。</param>
				defineProperties(this, props, _descriptor);

				return this;
			},
			toString : function(){
				///	<summary>
				///	对象字符串。
				///	</summary>
				return "function " + this.name + "() { native code }";
			}
		}
	).constructor;
}(
	prototype.constructor,
	// FUNCTION_NAME_REGX
	/^\S+\s+([A-z_$]+[\w$]*)/,
	this.assign,
	Object.getPrototypeOf,
	Function.prototype.call,
	Function.prototype.apply,
	Function.prototype.toString
);

this.getOwnClass = function(){
	return function(){
		///	<summary>
		///	获取自身类。
		///	</summary>
		return this.constructor;
	};
}();

this.toString = function(){
	return function(){
		///	<summary>
		///	对象字符串。
		///	</summary>
		return "[jQun " + this.constructor.name + "]";
	};
}();

defineProperties(
	definePrototype(prototype),
	this
);
}(
	Function,
	jQun.prototype,
	jQun.forEach,
	jQun.defineProperties,
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
	jQun,
	ARG_LIST_REGX, ARG_REGX,
	prototype,
	emptyArray, defineProperties, forEach, freeze, getOwnPropertyDescriptor, toString
){
"use strict";

// 构造函数与继承：类、静态类、接口
(function(Function, toString, getNameOf, getArgumentNames, getSuperArguments, checkPropertyNames){

this.Class = function(AnonymousClass, getSuperClass, isFrozen, getConstructor){
	function Class(_constructor, _SuperClass){
		///	<summary>
		///	派生出一个类。
		///	</summary>
		///	<param name="_constructor" type="Function">源构造函数。</param>
		///	<param name="_SuperClass" type="Class, Interface">需要继承的父类或接口。</param>
		var constructor = _constructor ? _constructor : AnonymousClass;
		
		return new jQun(
			getConstructor(
				constructor,
				constructor.name || AnonymousClass.name || getNameOf.call(constructor),
				getArgumentNames(constructor),
				getArgumentNames(
					_SuperClass ?
						(
							// 若isFrozen结果为true，那么说明这个类不能添加静态属性，则判断为Interface
							isFrozen(_SuperClass) ? _SuperClass.getSuperClass() : _SuperClass
						) :
						null
				),
				_SuperClass
			),
			_SuperClass || this.getOwnClass()
		);
	};
	Class = new jQun(Class);

	Class.override({
		getSuperClass : function(){
			///	<summary>
			///	获取父类。
			///	</summary>
			var Super = getSuperClass.call(this);

			return Super === Class ? null : Super;
		},
		toString : function(){
			///	<summary>
			///	对象字符串。
			///	</summary>
			return "[Class " + this.constructor.name + "]";
		}
	});

	Class.static({
		toString : function(){
			///	<summary>
			///	对象字符串。
			///	</summary>
			if(
				this === Class	
			){
				return toString.call(this);
			}

			return "class " + this.name + " { native code }";
		}
	});

	return Class;
}(
	// AnonymousClass
	function AnonymousClass(){},
	jQun.prototype.getSuperClass,
	Object.isFrozen,
	// getConstructor
	function(source, name, argumentNames, superArgumentNames, _SuperClass){
		var factoryName = "$" + name;

		argumentNames.every(function(n, i){
			if(
				argumentNames.indexOf(factoryName) > -1
			){
				factoryName = "$" + name + i;
				return true;
			}

			return false;
		});

		return new Function(
			factoryName,
			[
				"return function " + name + " (" + argumentNames.join(", ") + "){",
				"	" + factoryName + ".apply(this, arguments);",
				"};",
			].join("\r\n")
		)(
			function(){
				if(
					_SuperClass
				){
					_SuperClass.apply(
						this,
						getSuperArguments(
							superArgumentNames,
							argumentNames,
							arguments
						)
					);
				}

				source.apply(this, arguments);
			}
		);
	}
);

this.StaticClass = function(AnonymousStaticClass, getConstructor){
	function StaticClass(_constructor, _props, _descriptor){
		///	<summary>
		///	派生出一个静态类。
		///	</summary>
		///	<param name="_constructor" type="Function">源构造函数。</param>
		///	<param name="_props" type="Object">类的属性。</param>
		///	<param name="_descriptor" type="Object">被添加属性的描述符。</param>
		var CreatedStaticClass,
		
			constructor = _constructor ? _constructor : AnonymousStaticClass;

		CreatedStaticClass = new jQun(
			getConstructor(
				constructor.name || AnonymousStaticClass.name || getNameOf.call(constructor)
			),
			this.getOwnClass()
		);

		if(
			_props
		){
			CreatedStaticClass.static(_props, _descriptor);
		}

		constructor.call(CreatedStaticClass);
		return CreatedStaticClass;
	};
	StaticClass = new jQun(StaticClass);

	StaticClass.override({
		getSuperClass : function(){
			///	<summary>
			///	获取父类。
			///	</summary>
			return null;
		},
		toString : function(){
			///	<summary>
			///	对象字符串。
			///	</summary>
			return "[StaticClass " + this.constructor.name + "]";
		}
	});

	StaticClass.static({
		toString : function(){
			///	<summary>
			///	对象字符串。
			///	</summary>
			if(
				this === StaticClass	
			){
				return toString.call(this);
			}

			return "static class " + this.name + " { native code }";
		}
	});

	return StaticClass;
}(
	// AnonymousStaticClass
	function AnonymousStaticClass(){},
	// getConstructor
	function(name){
		return getOwnPropertyDescriptor(
				new Function("return { get '" + name + "' (){} };")(),
				name
			)
			.get;
	}
);

this.Interface = function(Class, isInstanceOf, getConstructor){
	function Interface(propertyNames, _Super){
		///	<summary>
		///	定义接口。
		///	</summary>
		///	<param name="propertyNames" type="Array">该接口所规定拥有的属性名称。</param>
		///	<param name="_Super" type="Interface, Class">需要继承的父接口或父类。</param>
		if(
			!isInstanceOf(this, Interface)
		){
			return;
		}

		var CreatedInterface, Super = _Super || Class;

		CreatedInterface = new jQun(
			getConstructor(
				propertyNames,
				getArgumentNames(Super)
			),
			Super
		);

		return freeze(CreatedInterface);
	};
	Interface = new jQun(Interface);

	return Interface;
}(
	this.Class,
	jQun.isInstanceOf,
	// getConstructor
	function(propertyNames, argumentNames){
		var names = "Interface <" + propertyNames.join(", ") + ">";

		return new Function(
			"propertyNames",
			"getOwnPropertyDescriptor",
			"checkPropertyNames",
			[
				"var constructor = getOwnPropertyDescriptor(",
				"	{",
				"		get '" + names + "' (){",
				"			checkPropertyNames.call(this, propertyNames, constructor, arguments);",
				"		}",
				"	},",
				"	'" + names + "'",
				").get;",
				"",
				"return constructor;"
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
	prototype.toString,
	// getNameOf
	getOwnPropertyDescriptor(prototype, "name").get,
	// getArgumentNames
	function(constructor){
		if(
			!constructor
		){
			return emptyArray;
		}

		return toString.call(
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
	// getSuperArguments
	function(superArgumentNames, argumentNames, currentArguments){
		if(
			(superArgumentNames.length || argumentNames.length) === 0
		){
			return emptyArray;
		}

		return superArgumentNames
			.map(
				function(name){
					var i = argumentNames.indexOf(name);

					if(
						i === -1
					){
						if(
							name.indexOf("_") === 0
						){
							i = argumentNames.indexOf(name.substring(1));
						}
					}

					return currentArguments[i];
				}
			);
	},
	// checkPropertyNames
	function(propertyNames, constructor, args){
		var name;

		propertyNames.every(
			function(propertyName){
				if(
					propertyName in this	
				){
					return true;
				}

				name = propertyName;
				return false;
			},
			this
		);

		if(
			typeof name === "string"	
		){
			throw '接口 ' + this.toString() + ' ：必须定义属性 \"' + name + '\" ！';
			return;
		}

		this.getSuperClass
			.call(
				constructor.prototype
			)
			.apply(
				this,
				args
			);
	}
));

// 枚举
(function(){

this.Enum = function(every, set, hasOwnProperty){
	function Enum(data){
		///	<summary>
		///	枚举。
		///	</summary>
		///	<param name="data" type="Array, Object">枚举数据数组或键值对。</param>
		if(
			data instanceof Array
		){
			forEach(
				data,
				function(val, i){
					this[val] = i;
				},
				this
			);
		}
		else {
			set(this, data);
		}

		freeze(this);
	};
	Enum = new jQun(Enum);

	Enum.props({
		every : function(fn, _this){
			///	<summary>
			///	确定枚举的所有成员是否满足指定的测试。
			///	</summary>
			///	<param name="fn" type="Function">用于测试对象成员的测试函数。</param>
			///	<param name="_this" type="*">指定测试函数的 this 对象。</param>
			return every(this, fn, _this);
		},
		forEach : function(fn, _this){
			///	<summary>
			///	遍历枚举的所有成员并对其执行指定操作函数。
			///	</summary>
			///	<param name="fn" type="Function">指定操作的函数。</param>
			///	<param name="_this" type="*">指定操作函数的 this 对象。</param>
			return forEach(this, fn, _this);
		},
		getNameByValue : function(value, _shouldReturnCamelCasing){
			///	<summary>
			///	根据枚举值获取枚举名称。
			///	</summary>
			///	<param name="value" type="*">指定的枚举值。</param>
			///	<param name="_shouldReturnCamelCasing" type="*">是否应该返回驼峰式的值。</param>
			var name;

			this.every(function(v, n){
				if(value === v){
					name = n;
					return false;
				}
				
				return true;
			});

			return _shouldReturnCamelCasing ? name.substring(0, 1).toLowerCase() + name.substring(1) : name;
		},
		has : function(propertyName){
			///	<summary>
			///	判断是否有指定名称的枚举。
			///	</summary>
			///	<param name="propertyName" type="String">指定的名称。</param>
			return hasOwnProperty.call(this, propertyName);
		}
	});

	return Enum;
}(
	jQun.every,
	jQun.set,
	Object.prototype.hasOwnProperty
);

}.call(this));

// 空间的定义
(function(CurrentlyNamespace, currentlyCallback, currentlyRefs, document, callbackStorage){

this.UnopenedNamespace = function(pesudoElement, createElement, getOnload){
	function UnopenedNamespace(filename, _onopen, _cssFilename, _waitCssLoad){
		///	<summary>
		///	未开辟的命名空间，适用于模块化开发。
		///	</summary>
		///	<param name="filename" type="String, Filename">需要异步加载模块的javascript文件名。</param>
		///	<param name="_onopen" type="Function">该命名空间被开辟的该回调函数。</param>
		///	<param name="_cssFilename" type="String, Filename">需要加载的模块相关css文件名。</param>
		///	<param name="_waitCssLoad" type="Boolean">该命名空间被开辟的该回调函数。</param>
		var link, list = [], cssLoaded = !_waitCssLoad;

		// 目的是支持传入对象，只要对象的toString函数能返回字符串就ok。
		filename = filename.toString();
		_cssFilename = _cssFilename ? _cssFilename.toString() : "";

		this.assign({
			filename : filename
		});

		// 创建以文件名为标识的回调函数列表。
		callbackStorage[filename] = list;

		// 创建script元素，并添加到文档
		createElement(
			filename,
			false,
			getOnload(
				this,
				list,
				function(loading){
					// 如果还有依赖的加载项，就返回
					if(
						loading.length > 0
					){
						return;
					}

					// 进行到这里，说明所有的依赖项都已经加载完毕

					/*
						如果如要等待css加载完毕，而且css还没有加载完毕，
						那么添加onload事件的就是link标签，
						否则，css已经加载完毕，onload已经被执行，
						所以要给pesudoElement添加onload事件，
						而且当pesudoElement的onload事件一旦被赋值，就会马上执行。
					*/
					(
						_waitCssLoad && !cssLoaded ? link : pesudoElement
					)
					.onload = function(){
						// 依次调用当前匿名空间的回调函数
						list.forEach(function(cb){
							// 传入转换后的命名空间
							cb(CurrentlyNamespace);
						});

						// 如果存在_onopen回调函数，则执行
						if(
							typeof _onopen === "function"
						){
							_onopen.call(CurrentlyNamespace);
						}

						// 清空记录的命名空间
						CurrentlyNamespace = null;
					};
				}
			)
		);
		
		if(
			!_cssFilename
		){
			return;
		}

		// 创建link标签
		link = createElement(
			_cssFilename,
			true,
			_waitCssLoad ?
				function(){
					// 进入此函数，说明css已经加载完毕
					cssLoaded = true;
				} :
				null
		);
	};
	UnopenedNamespace = new jQun(UnopenedNamespace);

	UnopenedNamespace.props({
		filename : ""
	});

	return UnopenedNamespace.constructor;
}(
	// pesudoElement
	{
		set onload(onload){
			onload();
		}
	},
	// createElement
	function(filename, isCss, _onload){
		var head = document.head,
		
			// 创建元素
			element = document.createElement(isCss ? "link" : "script");

		if(
			isCss
		){
			// 如果是CSS
			element.rel = "stylesheet";
			element.type = "text/css";
			element.href = filename;
		}
		else {
			// 其他默认为js
			element.async = true;
			element.src = filename;
		}

		// 添加onload事件
		element.onload = function(){
			// 清空onload事件的引用
			this.onload = null;

			if(
				typeof _onload === "function"
			){
				// 回调传入的参数onload
				_onload.call(this);
			}
			
			if(
				isCss
			){
				return;
			}

			// 移除该元素
			head.removeChild(this);
		};

		// 添加到文档
		head.appendChild(element);

		return element;
	},
	// getOnload
	function(UnopenedNamespace, list, end){
		var callback, refs;

		/*
			首先向等待列表中存储调用callback的处理函数，
			因为该空间被其他空间引用，所以被引用的空间必须先初始化，即调用callback。
		*/
		list.push(function(){
			// 检索引用参数中，是否引用了该匿名空间
			var index = refs.indexOf(UnopenedNamespace);

			if(
				index > -1
			){
				/*
					如果引用了，那么要将该匿名空间替换成最近创建的命名空间。
					CurrentlyNamespace是由list第一个回调函数（通过Namespace的member方法中的unshift）赋值的，
					所以此函数是list的第二个回调，所以能获取到CurrentlyNamespace的值。
					此后，当list回调函数全部处理完毕的时候，将清空CurrentlyNamespace（CurrentlyNamespace = null）。
				*/
				refs.splice(index, 1, CurrentlyNamespace);
			}

			// 执行用户回调函数，传入参数
			callback.apply({}, refs);
		});

		return function(){
			// 创建依赖项的加载列表
			var loading = [];

			// 将currentlyCallback、currentlyRefs用当前空间环境存储起来，避免后续的清空
			callback = currentlyCallback;
			refs = currentlyRefs;

			// 遍历所有引用，添加对应的匿名空间的回调函数
			refs.forEach(
				function(ref, i){
					// 如果不是匿名空间 或者 是当前匿名空间，则不做处理（不添加回调函数）
					if(
						ref instanceof this.constructor === false || ref === this
					){
						return;
					}

					// 文件名称
					var name = ref.filename;

					// 当前文件名称添加至加载列表
					loading.push(name);

					// 添加对应的匿名空间的回调函数
					callbackStorage[
							name
						]
						.push(function(ns){
							// 进入此函数，说明对应的匿名空间已经初始化完毕

							// 从加载列表中删除记录
							loading.splice(loading.indexOf(name), 1);
							// 将参数中对应的匿名空间，替换为匿名空间
							refs.splice(i, 1, ns);
							// 回调结束函数
							end(loading);
						});
				},
				UnopenedNamespace
			);

			// 回调结束函数
			end(loading);

			// 清空currentlyCallback、currentlyRefs
			currentlyCallback = currentlyRefs = null;
		};
	}
);

this.AnonymousSpace = function(toArray){
	function AnonymousSpace(callback, _ref){
		///	<summary>
		///	开辟一个匿名空间，匿名空间的目的是为了管理引用项与回调。
		///	</summary>
		///	<param name="callback" type="Function">当引用加载项全部加载完成时所执行的回调函数。</param>
		///	<param name="_ref" type="*">引用项：arguments参数的第2至N个参数都为引用项。</param>
		currentlyCallback = callback;
		currentlyRefs = toArray(arguments, 1);
	};
	AnonymousSpace = new jQun(AnonymousSpace);

	return AnonymousSpace.constructor;
}(
	jQun.toArray
);

this.Namespace = function(UnopenedNamespace){
	function Namespace(_members){
		///	<summary>
		///	开辟一个命名空间，并可赋予初始成员。
		///	</summary>
		///	<param name="members" type="Object">成员键值对。</param>
		if(
			!_members
		){
			return;
		}

		this.members(_members);
	};
	Namespace = new jQun(Namespace);

	Namespace.props({
		members : function(members){
			///	<summary>
			///	给该命名空间赋予成员。
			///	</summary>
			///	<param name="members" type="Object">成员键值对。</param>
			var currentNS = this, constructor = this.constructor;

			forEach(
				members,
				function(member, name){
					currentNS[name] = member;

					if(
						member instanceof UnopenedNamespace === false
					){
						return;
					}

					callbackStorage[
							member.filename
						]
						.unshift(function(){
							CurrentlyNamespace = currentNS[name] = new constructor();
						});
				}
			);

			return this;
		}
	});

	return Namespace.constructor;
}(
	this.UnopenedNamespace
);

}.call(
	this,
	// CurrentlyNamespace
	null,
	// currentlyCallback
	null,
	// currentlyRefs
	null,
	document,
	// callbackStorage
	{}
));

defineProperties(jQun, this);
}(
	jQun,
	// ARG_LIST_REGX
	/function[^\(]*\(([^\)]*)/,
	// ARG_REGX
	/([\$\_a-zA-Z]+[\w\$]*)/g,
	// prototype
	Object.getPrototypeOf(jQun),
	// emptyArray
	Object.freeze([]),
	jQun.defineProperties,
	jQun.forEach,
	Object.freeze,
	Object.getOwnPropertyDescriptor,
	Function.prototype.toString
);


new function(jQun, Class, StaticClass, Interface, Enum, defineProperties, forEach){
"use strict";

// 一些独立的基础类
(function(forEach){

this.OSs = function(){
	return new Enum(
		["Unknow", "Windows", "Macintosh", "Linux", "Android", "IPhone", "IPad", "IPod", "WindowsPhone"]
	);
}();

this.BrowserCores = function(){
	return new Enum(
		["Unknow", "Blink", "AppleWebKit", "Gecko", "Trident"]
	);
}();

this.BrowserAgents = function(){
	return new Enum(
		["Unknow", "Chrome", "Firefox", "MSIE", "Safari", "Opera", "MicroMessenger", "MQQBrowser"]
	);
}();

this.Browser = function(OSs, BrowserCores, BrowserAgents, userAgent, parseInt){
	function Browser(){
		///	<summary>
		///	浏览器信息。
		///	</summary>
		var core, info = {};

		[
			/Mozilla\/[\d\.]+ \(([^; ]+).*(AppleWebKit)\/([\d\.]+).*(Chrome|MicroMessenger|MQQBrowser|Version)\/([\d\.]+)/,
			/Mozilla\/[\d\.]+ \(([^; ]+).*rv\s*\:\s*([\d\.]+).*(Gecko)\/[\d\.]+ ([^\/\s]+)\/([\d\.]+)/,
			/(MSIE) ([\d\.]+).*(Windows).*(Trident)\/([\d\.]+)/,
			/Mozilla\/[\d\.]+ \(([^; ]+).*(Trident)\/([\d\.]+).*rv\s*\:\s*([\d\.]+)/
		].every(function(regx, i){
			var result = userAgent.match(regx);

			if(
				result === null
			){
				return true;
			}

			result.splice(0, 1);

			this[i].forEach(
				function(key, i){
					var value = result[i];

					info[key] = key in this ? this[key][value.substring(0, 1).toUpperCase() + value.substring(1)] : value;
				},
				{ agent : BrowserAgents, core : BrowserCores, os : OSs }
			);

			return false;
		}, [
			["os", "core", "coreVersion", "agent", "version"],
			["os", "coreVersion", "core", "agent", "version"],
			["agent", "version", "os", "core", "coreVersion"],
			["os", "core", "coreVersion", "version"]
		]);

		core = info.core;

		if(
			core === BrowserCores.AppleWebKit
		){
			if(
				userAgent.indexOf("Android") > -1
			){
				info.os = OSs.Android;
			}

			if(
				info.agent === BrowserAgents.Chrome
			){
				if(
					parseInt(info.version) > 27
				){
					info.core = BrowserCores.Blink;
				}
			}
			else if(
				!info.agent
			){
				info.agent = BrowserAgents.Safari;
			}
		}
		else if(
			core === BrowserCores.Trident
		){
			info.agent = BrowserAgents[info.isMobile ? "WindowsPhone" : "MSIE"];
		}

		info.name = BrowserAgents.getNameByValue(info.agent);

		this.assign(info);
	};
	Browser = new StaticClass(Browser, {
		// 浏览器代理商
		agent : BrowserAgents.Unknow,
		// 浏览器核心
		core : BrowserCores.Unknow,
		// 浏览器核心版本
		coreVersion : "0",
		// 浏览器名称
		name : BrowserAgents.getNameByValue(BrowserAgents.Unknow),
		// 操作系统
		os : OSs.Unknow,
		// 浏览器版本
		version : "0"
	});

	Browser.static({
		getMobileOSVersion : function(){
			///	<summary>
			///	获取移动操作系统的版本，精确到浮点数。
			///	</summary>
			var version;

			if(
				this.isMobile
			){
				var result = userAgent.match(this.os === OSs.Android ? /Android ([\d\.]+)/ : /OS ([\d\_]+)/);

				if(
					result
				){
					version = result[1].replace("_", ".");
				}
			}

			return parseFloat(version);
		},
		// 是否为移动端浏览器
		isMobile : userAgent.indexOf("Mobile") > -1
	});

	return Browser;
}(
	this.OSs,
	this.BrowserCores,
	this.BrowserAgents,
	navigator.userAgent,
	parseInt,
	parseFloat
);

this.List = function(NaN, toArray, hasOwnProperty){
	function List(_list){
		///	<summary>
		///	对列表进行管理、操作的类。
		///	</summary>
		///	<param name="_list" type="List、Array">初始化时所拥有的列表集合。</param>
		this.assign({ length : 0 });

		if(
			!_list
		){
			return;
		}

		this.combine(_list);
	};
	List = new Class(List);

	List.props({
		alternate : function(num, _remainder){
			///	<summary>
			///	交替性取出集合索引值所符合的项。
			///	</summary>
			///	<param name="num" type="Number">取模运算值。</param>
			///	<param name="_remainder" type="Number">余数。</param>
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
		clear : function(){
			///	<summary>
			///	清空整个集合。
			///	</summary>
			this.splice(0);
			return this;
		},
		combine : function(list){
			///	<summary>
			///	在原列表上，合并另一个集合。
			///	</summary>
			///	<param name="list" type="List, Array">另一个集合。</param>
			this.push.apply(this, toArray(list));
			return this;
		},
		createList : function(_list){
			///	<summary>
			///	创建个新的列表。
			///	</summary>
			///	<param name="_list" type="List、Array">初始化时所拥有的列表集合。</param>
			return new List.constructor(_list);
		},
		distinct : function(){
			///	<summary>
			///	对列表进行去重。
			///	</summary>
			var list = this;

			this.splice(
					0
				)
				.forEach(function(item){
					if(
						list.indexOf(item) > -1
					){
						return;
					}

					list.push(item);
				});

			return list;
		},
		even : function(){
			///	<summary>
			///	返回集合中偶数项集合。
			///	</summary>
			return this.alternate(2);
		},
		length : NaN,
		odd : function(){
			///	<summary>
			///	返回集合中奇数项集合。
			///	</summary>
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
		concat : function(array){
			///	<summary>
			///	合并另外一个数组，并返回合并后的新数组。
			///	</summary>
			///	<param name="list" type="Array">另一个集合。</param>
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
	NaN,
	jQun.toArray,
	Object.prototype.hasOwnProperty
);

}.call(
	this
));


// 与文件名有关的类
(function(alias, baseUri, search, searchFilter, set){
	
this.Filename = function(){
	function Filename(value){
		///	<summary>
		///	文件名。
		///	</summary>
		///	<param name="value" type="String">文件名字符串。</param>
		this.assign({
			value : value
		});
	};
	Filename = new Class(Filename);

	Filename.override({
		toString : function(){
			///	<summary>
			///	根据baseUri、search、searchFilter来处理文件名，返回处理后的文件名。
			///	</summary>
			var value = this.value;

			if(
				alias.hasOwnProperty(value)	
			){
				value = alias[value];
			}

			return baseUri + value + (searchFilter.test(value) ? search : "");
		}
	});

	Filename.props({
		value : ""
	});

	return Filename;
}();

this.FilenameConfig = function(){
	function FilenameConfig(){
		///	<summary>
		///	文件名配置。
		///	</summary>
	};
	FilenameConfig = new StaticClass(FilenameConfig);

	FilenameConfig.static({
		addAlias : function(aliasObject){
			///	<summary>
			/// 添加文件名简称。
			///	</summary>
			///	<param name="aliasObject" type="Object">简称键值对。</param>
			set(alias, aliasObject);

			return this;
		},
		setBaseUri : function(uri){
			///	<summary>
			///	设置文件名的baseUri。
			///	</summary>
			///	<param name="uri" type="String">需要设置的baseUri。</param>
			baseUri = uri;

			return this;
		},
		setSearch : function(searchString){
			///	<summary>
			///	设置文件名的search字符串，一般用于添加时间戳、版本号等。
			///	</summary>
			///	<param name="searchString" type="String">需要设置的search字符串。</param>
			search = "?" + searchString;

			return this;
		},
		setSearchFilter : function(filter){
			///	<summary>
			///	设置search过滤，当满足过滤条件的时候，才会给文件名添加search值。
			///	</summary>
			///	<param name="filter" type="RegExp">过滤的正则表达式。</param>
			searchFilter = filter;

			return this;
		}
	});

	return FilenameConfig;
}();

}.call(
	this,
	// alias
	{},
	// baseUri
	"",
	// search
	"",
	// searchFilter
	/(?:)/,
	jQun.set
));


// 与字符串处理有关的类
(function(){

this.VerificationRegExpString = function(EMAILS, WEB_URLS, toPerfectMatchString){
	return new Enum({
		Chinese : "[\\u4e00-\\u9fa5]+",
		Email : toPerfectMatchString(EMAILS),
		Emails : EMAILS,
		Empty : "^$",
		Landline : "^(?:(?:\\d{3}|\\d{4})-)?\\d{7,8}$",
		NotEmpty : "\\S+",
		Telephone : "^(?:(?:\\d{3}|\\d{4})-)?\\d{11}$",
		UserInfo : "^\\w{6,16}$",
		WebURL : toPerfectMatchString(WEB_URLS),
		WebURLs : WEB_URLS
	});
}(
	// EMAILS
	"(\\w+(?:[-+.]\\w+)*)@(\\w+(?:[-.]\\w+)*)\\.(\\w+(?:[-.]\\w+)*)",
	// WEB_URLS
	"\\w+:\\/\\/.+",
	// toPerfectMatchString
	function(str){
		return "^" + str + "$";
	}
);

this.JSON = function(JSONBase, location, encodeURIComponent, decodeURIComponent){
	function JSON(){
		///	<summary>
		///	JSON功能类。
		///	</summary>
	};
	JSON = new StaticClass(JSON);

	JSON.static({
		parse : function(string){
			///	<summary>
			///	将字符串转化成JSON对象。
			///	</summary>
			///	<param name="string" type="String">需要转化的字符串。</param>
			return JSONBase.parse(string);
		},
		parseAddressParameters : function(_isHash){
			///	<summary>
			///	解析地址栏参数。
			///	</summary>
			///	<param name="_isHash" type="Boolean">是否为hash（#号）参数。</param>
			return this.parse(
				decodeURIComponent([
					"{",
					(
						location[
								_isHash ? "hash" : "search"
							]
							.substring(1)
							.match(
								/([^&=]+)=([^\&]+)/g
							) || []
					)
					.join(
						'","'
					)
					.split(
						"="
					)
					.join(
						'":"'
					)
					.replace(
						/^(.+)$/,
						'"$1"'
					),
					"}"
				].join(""))
			);
		},
		stringify : function(object){
			///	<summary>
			///	将JSON对象转化成字符串。
			///	</summary>
			///	<param name="object" type="Object">需要转化的JSON对象。</param>
			return JSONBase.stringify(object);
		},
		stringifyAddressParameters : function(object){
			///	<summary>
			///	将对象转化为地址参数字符串。
			///	</summary>
			var result = [];

			forEach(
				object,
				function(value, key){
					if(
						typeof value === "object"
					){
						value = this.stringify(value);
					}

					result.push(
						encodeURIComponent(key) + "=" + encodeURIComponent(value)
					);
				},
				this
			);

			return result.join("&");
		}
	});

	return JSON;
}(
	JSON,
	location,
	encodeURIComponent,
	decodeURIComponent
);

this.Text = function(Array, T_REGX, encodeURIComponent){
	function Text(text){
		///	<summary>
		///	用于操作字符串文本的类。
		///	</summary>
		///	<param name="text" type="String, Array">字符串文本。</param>
		this.assign({
			text : text instanceof Array ? text.join("") : text
		});
	};
	Text = new Class(Text);

	Text.props({
		removeSpace : function(){
			///	<summary>
			///	 移除字符串中的前后空格。
			///	</summary>
			return this.text.match(/^\s*([\S\s]*?)\s*$/)[1];
		},
		replace : function(replacement){
			///	<summary>
			///	返回一个替换数据后的字符串。
			///	</summary>
			///	<param name="replacement" type="Object, Function">需要替换的数据或者自行替换的处理函数。</param>
			return this.text.replace(
				T_REGX,
				typeof replacement === "function" ?
					replacement :
					function(str, modifier, word){
						if(
							modifier === ":"
						){
							return "{" + word + "}";
						}

						var val = replacement[word];

						return val == null ? modifier === "~" ? "" : word : val;
					}
			);
		},
		toUrlParams : function(params){
			///	<summary>
			///	返回一个替换数据后的连接字符串。
			///	</summary>
			///	<param name="params" type="Object, Function">需要替换的数据或者自行替换的处理函数。</param>
			return this.replace(function(str, modifier, word){
				return encodeURIComponent(params[word]);
			});
		},
		text : ""
	});

	return Text;
}(
	Array,
	// T_REGX
	/\{\s*(?:\?([^\{\}\s]{1}))?\s*([^\{\}]*?)\s*\}/g,
	encodeURIComponent
);

this.Verification = function(VerificationRegExpString, RegExp){
	function Verification(){
		///	<summary>
		///	验证。
		///	</summary>
	};
	Verification = new StaticClass(Verification);

	Verification.static({
		every : function(arr){
			///	<summary>
			///	验证列表中每一项是否拥有正确的返回值，函数返回错误项的索引。
			///	</summary>
			///	<param name="arr" type="Array, List">需要提供的验证列表。</param>
			var index = -1;

			arr.every(function(func, i){
				if(
					func()
				){
					return true;
				}

				index = i;
				return false;
			});

			return index;
		},
		match : function(str, regExpString, _regxAttrs){
			///	<summary>
			///	验证匹配，返回匹配值。
			///	</summary>
			///	<param name="str" type="String">字符串需要验证的。</param>
			///	<param name="regExpString" type="String">用于匹配的正则字符串。</param>
			///	<param name="_regxAttrs" type="String">正则属性。</param>
			return str.match(new RegExp(regExpString, _regxAttrs));
		},
		result : function(str, regExpString){
			///	<summary>
			///	验证结果，返回匹配结果。
			///	</summary>
			///	<param name="str" type="String">需要验证的字符串。</param>
			///	<param name="regExpString" type="String">用于匹配的正则字符串。</param>
			return !!this.match(str, regExpString);
		}
	});

	return Verification;
}(
	this.VerificationRegExpString,
	RegExp
);

}.call(
	this
));


// 元素属性基类
(function(List){

this.IElementPropertyCollection = function(){
	return new Interface(
		["propertyName"], List
	);
}();

this.ElementPropertyCollection = function(IElementPropertyCollection){
	function ElementPropertyCollection(elementList){
		///	<summary>
		///	所有元素属性的基类。
		///	</summary>
		///	<param name="elementList" type="Array, List">元素列表。</param>
		var name = this.propertyName;

		this.assign({
			sources : elementList
		});

		if(
			name === ""
		){
			return;
		}

		elementList.forEach(
			function(element){
				this.push(element[name]);
			},
			this
		);
	};
	ElementPropertyCollection = new Class(ElementPropertyCollection, IElementPropertyCollection);

	ElementPropertyCollection.props({
		sources : null,
		valueOf : function(){
			///	<summary>
			///	返回当前对象。
			///	</summary>
			return this;
		}
	});

	return ElementPropertyCollection;
}(
	this.IElementPropertyCollection
);

}.call(
	this,
	this.List
));


// 与ElementPropertyCollection（元素属性）有关的类
(function(ElementPropertyCollection){

this.AttributesCollection = function(){
	function AttributesCollection(elementList){
		///	<summary>
		///	元素特性集合。
		///	</summary>
		///	<param name="name" type="ElementList">元素列表。</param>
	};
	AttributesCollection = new Class(AttributesCollection, ElementPropertyCollection);

	AttributesCollection.props({
		contains : function(name){
			///	<summary>
			///	判断集合内的第一个元素是否包含指定名称的属性，返回true或false。
			///	</summary>
			///	<param name="name" type="String">属性的名称。</param>
			if(
				this.sources.length === 0
			){
				return false;
			}

			return this.sources[0].hasAttribute(name);
		},
		get : function(name){
			///	<summary>
			///	获取集合内第一个元素所指定名称的属性。
			///	</summary>
			///	<param name="name" type="String">需要获取属性的名称。</param>
			if(
				this.sources.length === 0
			){
				return null;
			}

			return this.sources[0].getAttribute(name);
		},
		propertyName : "attributes",
		remove : function(name){
			///	<summary>
			///	移除集合内所有元素所指定名称的属性。
			///	</summary>
			///	<param name="name" type="String">需要移除属性的名称。</param>
			this.sources
				.forEach(function(element){
					element.removeAttribute(name);
				});

			return this;
		},
		replace : function(oldAttrName, newAttrName, newAttrValue){
			///	<summary>
			///	移除指定的旧属性，添加指定的新属性。
			///	</summary>
			///	<param name="oldAttrName" type="String">需要移除属性的名称。</param>
			///	<param name="newAttrName" type="String">需要添加属性的名称。</param>
			///	<param name="newAttrValue" type="*">需要添加属性的值。</param>
			this.sources
				.forEach(function(element){
					element.removeAttribute(oldAttrName);
					element.setAttribute(newAttrName, newAttrValue);
				});

			return this;
		},
		set : function(name, _value){
			///	<summary>
			///	设置集合中所有元素的属性。
			///	</summary>
			///	<param name="name" type="String">需要设置属性的名称。</param>
			///	<param name="_value" type="String">需要设置属性的值。</param>
			if(
				_value == null
			){
				_value = "";
			}

			this.sources.forEach(function(element){
				element.setAttribute(name, _value);
			});
			return this;
		},
		toggle : function(name, _value){
			///	<summary>
			///	自行判断集合中每一个元素是否含有指定的属性：有则移除，无则添加并设置指定的值。
			///	</summary>
			///	<param name="name" type="String">需要设置或移除属性的名称。</param>
			///	<param name="_value" type="String">需要设置属性的值。</param>
			if(
				this.contains(name)
			){
				return this.remove(name);
			}

			return this.set(name, _value);
		}
	});

	return AttributesCollection;
}();

this.CSSPropertyCollection = function(isNaN, hasOwnProperty){
	function CSSPropertyCollection(elementList){
		///	<summary>
		///	元素CSS属性集合。
		///	</summary>
	};
	CSSPropertyCollection = new Class(CSSPropertyCollection, ElementPropertyCollection);

	CSSPropertyCollection.props({
		get : function(name){
			///	<summary>
			///	获取集合中第一个元素的CSS属性。
			///	</summary>
			///	<param name="name" type="String">CSS属性名。</param>
			if(
				this.length === 0
			){
				return "";
			}

			return this[0][name];
		},
		propertyName : "style",
		set : function(name, value){
			///	<summary>
			///	设置集合中所有元素的CSS属性。
			///	</summary>
			///	<param name="name" type="String">需要设置的CSS属性名。</param>
			///	<param name="value" type="String">需要设置的CSS属性值。</param>
			this.forEach(function(style){
				style[name] = value;
			});
			return this;
		}
	});

	forEach(
		getComputedStyle(document.documentElement),
		function(value, name, CSSStyle){
			// firefox、chrome 与 IE 的 CSSStyleDeclaration 结构都不一样
			var cssName = isNaN(name - 0) ? name : value;

			if(
				hasOwnProperty.call(CSSPropertyCollection, cssName)
			){
				return;
			}

			if(
				typeof CSSStyle[cssName] !== "string"
			){
				return;
			}

			var property = {};

			property[cssName] = {
				get : function(){
					return this.get(cssName);
				},
				set : function(value){
					this.set(cssName, value);
				}
			};

			CSSPropertyCollection.props(property, { gettable : true, settable : true });
		}
	);

	return CSSPropertyCollection.constructor;
}(
	isNaN,
	Object.prototype.hasOwnProperty
);

this.ChildrenCollection = function(){
	function ChildrenCollection(elementList){
		///	<summary>
		///	children集合。
		///	</summary>
		///	<param name="elementList" type="ElementList">指定的父元素集合。</param>
	};
	ChildrenCollection = new Class(ChildrenCollection, ElementPropertyCollection);

	ChildrenCollection.props({
		append : function(element){
			///	<summary>
			///	在第一个父元素最后添加一个子元素。
			///	</summary>
			///	<param name="element" type="Element">需要添加的子元素。</param>
			return this.insert(element);
		},
		contains : function(element){
			///	<summary>
			///	返回一个布尔值，该值表示该集合内的所有子元素是否含有指定的元素。
			///	</summary>
			///	<param name="element" type="Element">可能包含的子元素。</param>
			return this.valueOf().indexOf(element) > -1;
		},
		insert : function(element, _idx){
			///	<summary>
			///	在指定的索引处插入元素。
			///	</summary>
			///	<param name="element" type="Element">需要插入的元素。</param>
			///	<param name="_idx" type="Number">指定的索引处。</param>
			var sources = this.sources;

			if(
				sources.length > 0
			){
				sources.insertTo.call([element], sources[0], _idx);
			}

			return this;
		},
		propertyName : "children",
		remove : function(_element){
			///	<summary>
			///	移除指定的子元素，如果没指定子元素，则移除所有子元素。
			///	</summary>
			///	<param name="element" type="Element">需要移除的子元素。</param>
			var children = this.valueOf();

			if(
				_element
			){
				var index = children.indexOf(_element);

				if(
					index > -1
				){
					children.splice(index, 1);
					children.remove();
				}
			}
			else {
				children.remove();
			}

			return this;
		},
		valueOf : function(){
			///	<summary>
			///	返回所有子元素的集合。
			///	</summary>
			return this.sources.query(">*");
		}
	});

	return ChildrenCollection;
}();

this.ClassListCollection = function(){
	function ClassListCollection(elementList){
		///	<summary>
		///	classList集合。
		///	</summary>
	};
	ClassListCollection = new Class(ClassListCollection, ElementPropertyCollection);

	ClassListCollection.props({
		add : function(className){
			///	<summary>
			///	为集合中每一个元素添加指定的单个class。
			///	</summary>
			///	<param name="className" type="String">指定的单个class。</param>
			this.forEach(function(classList){
				classList.add(className);
			});
			return this;
		},
		contains : function(className){
			///	<summary>
			///	判断集合中第一个元素是否包含指定的class。
			///	</summary>
			///	<param name="className" type="String">指定的单个class。</param>
			if(
				this.length === 0
			){
				return false;
			}

			return this[0].contains(className);
		},
		propertyName : "classList",
		remove : function(className){
			///	<summary>
			///	为集合中每一个元素移除指定的单个class。
			///	</summary>
			///	<param name="className" type="String">指定的单个class。</param>
			this.forEach(function(classList){
				classList.remove(className);
			});
			return this;
		},
		replace : function(oldClass, newClass){
			///	<summary>
			///	为集合中每一个元素移除指定的旧class，添加指定的新class。
			///	</summary>
			///	<param name="oldClass" type="String">指定的旧class。</param>
			///	<param name="newClass" type="String">指定的新class。</param>
			this.forEach(function(classList){
				classList.remove(oldClass);
				classList.add(newClass);
			});
			return this;
		},
		toggle : function(className){
			///	<summary>
			///	自行判断集合中每一个元素是否含有指定的class：有则移除，无则添加。
			///	</summary>
			///	<param name="className" type="String">指定的单个class。</param>
			this.forEach(function(classList){
				classList.toggle(className);
			});
			return this;
		},
		valueOf : function(){
			///	<summary>
			///	返回集合中第一个元素的className。
			///	</summary>
			if(
				this.length === 0
			){
				return "";
			}

			return this[0].toString();
		}
	});

	return ClassListCollection;
}();

this.DatasetCollection = function(AttributesCollection, PREFIX){
	function DatasetCollection(elementList){
		///	<summary>
		///	dataset集合。
		///	</summary>
	};
	DatasetCollection = new Class(DatasetCollection, AttributesCollection);

	DatasetCollection.override({
		contains : function(name){
			///	<summary>
			///	判断集合中第一个元素是否包含指定名称的数据。
			///	</summary>
			///	<param name="name" type="String">数据的名称。</param>
			return AttributesCollection.prototype.contains.call(this, PREFIX + name);
		},
		get : function(name){
			///	<summary>
			///	通过指定名称获取数据。
			///	</summary>
			///	<param name="name" type="String">需要获取数据的名称。</param>
			return AttributesCollection.prototype.get.call(this, PREFIX + name);
		},
		propertyName : "dataset",
		remove : function(name){
			///	<summary>
			///	移除具有指定名称的数据。
			///	</summary>
			///	<param name="name" type="String">需要移除数据的名称。</param>
			return AttributesCollection.prototype.remove.call(this, PREFIX + name);
		},
		replace : function(oldDataName, newDataName, newDataValue){
			///	<summary>
			///	移除指定的旧数据，添加指定的新数据。
			///	</summary>
			///	<param name="oldDataName" type="String">需要移除数据的名称。</param>
			///	<param name="newDataName" type="String">需要添加数据的名称。</param>
			///	<param name="newDataValue" type="String">需要添加数据的值。</param>
			return AttributesCollection.prototype.replace.call(this, PREFIX + oldDataName, PREFIX + newDataName, newDataValue);
		},
		set : function(name, _value){
			///	<summary>
			///	设置集合中所有元素的数据。
			///	</summary>
			///	<param name="name" type="String">需要设置数据的名称。</param>
			///	<param name="_value" type="String">需要设置数据的值。</param>
			return AttributesCollection.prototype.set.call(this, PREFIX + name, _value);
		}
	});

	return DatasetCollection;
}(
	this.AttributesCollection,
	// PREFIX
	"data-"
);

}.call(
	this,
	// AttributesCollection.prototype
	this.ElementPropertyCollection
));


// 与DOM有关的类
(function(
	List,
	AttributesCollection, CSSPropertyCollection, ChildrenCollection, ClassListCollection, DatasetCollection,
	Text, Window,
	forEach, define
){

this.EventTargetList = function(toArray){
	function EventTargetList(_list){
		///	<summary>
		///	事件目标列表类。
		///	</summary>
		///	<param name="_list" type="Array">事件目标数组。</param>
	};
	EventTargetList = new Class(EventTargetList, List);

	EventTargetList.props({
		attach : function(events, _capture, _priority, _useWeakReference){
			///	<summary>
			///	向集合中所有目标注册事件侦听器。
			///	</summary>
			///	<param name="events" type="Object">事件侦听器键值对。</param>
			///	<param name="_capture" type="Boolean">侦听器是否运行于捕获阶段。</param>
			///	<param name="_priority" type="Number">优先级，数字越大，优先级越高。</param>
			///	<param name="_useWeakReference" type="Boolean">是否是属于强引用。</param>
			var eventTargetList = this, otherArgs = toArray(arguments, 1);
			
			forEach(
				events,
				function(fn, type){
					var eventArgs = [
							type,
							fn.length === 2 ?
								function(e){
									fn.call(
										this,
										e,
										eventTargetList.createList(e.target)
									);
								} :
								fn
						].concat(
							otherArgs
						);

					eventTargetList.forEach(function(eventTarget){
						eventTarget
							.addEventListener
							.apply(
								eventTarget,
								eventArgs
							);
					});
				}
			);

			return this;
		},
		detach : function(events){
			///	<summary>
			///	移除集合中所有目标的事件侦听器。
			///	</summary>
			///	<param name="events" type="Object">事件侦听器键值对。</param>
			this.forEach(function(eventTarget){
				forEach(
					events,
					function(fn, type){
						eventTarget.removeEventListener(type, fn);
					}
				);
			});

			return this;
		},
		dispatch : function(event){
			///	<summary>
			///	给所有目标分配事件。
			///	</summary>
			///	<param name="event" type="Event">需要分配的事件。</param>
			this.forEach(
				function(eventTarget){
					eventTarget.dispatchEvent(event);
				}
			);

			return this;
		}
	});

	return EventTargetList;
}(
	jQun.toArray
);

this.DOM = function(EventTargetList, document, parseFloat){
	function DOM(){
		///	<summary>
		///	DOM类。
		///	</summary>
	};
	DOM = new StaticClass(DOM);

	DOM.static({
		getCSSNumberValue : function(cssValue){
			///	<summary>
			///	对css的值进行处理，获取其数值部分。
			///	</summary>
			///	<param name="cssValue" type="String">css值。</param>
			return parseFloat(cssValue);
		},
		loaded : function(handler){
			///	<summary>
			///	当文档内容加载完毕的时候，所执行的函数。
			///	</summary>
			///	<param name="handler" type="Function">处理函数。</param>
			var docTarget = new EventTargetList([document]),
				
				loaded = function(){
					handler.apply(this, arguments);
					docTarget.detach({ DOMContentLoaded : loaded });
				};

			docTarget.attach({
				DOMContentLoaded : loaded
			});

			return this;
		}
	});

	return DOM;
}(
	this.EventTargetList,
	document,
	parseFloat
);

this.NodeList = function(EventTargetList, DOCUMENT_POSITION_SAME, DOCUMENT_POSITION_CONTAINED_BY, DOCUMENT_POSITION_FOLLOWING_AND_CONTAINED_BY){
	function NodeList(_list){
		///	<summary>
		///	节点列表类。
		///	</summary>
		///	<param name="_list" type="Array, List">初始化时所拥有的列表集合。</param>
	};
	NodeList = new Class(NodeList, EventTargetList);

	NodeList.override({
		createList : function(_list){
			///	<summary>
			///	创建个新的节点集合。
			///	</summary>
			///	<param name="_list" type="Array, List">初始化时所拥有的列表集合。</param>
			return new NodeList.constructor(_list);
		}
	});

	NodeList.props({
		appendTo : function(parentNode){
			///	<summary>
			///	将集合中所有节点添加至指定的父节点。
			///	</summary>
			///	<param name="parentNode" type="Node">指定的父节点。</param>
			this.insertTo(parentNode);
			return this;
		},
		contains : function(childNode){
			///	<summary>
			///	判断指定节点是否是该集合中某个节点的后代节点。
			///	</summary>
			///	<param name="childNode" type="Node">指定的节点。</param>
			return !this.every(function(node){
				return [
					DOCUMENT_POSITION_SAME,
					DOCUMENT_POSITION_CONTAINED_BY,
					DOCUMENT_POSITION_FOLLOWING_AND_CONTAINED_BY
				].indexOf(
					node.compareDocumentPosition(childNode)
				) === -1;
			});
		},
		get : function(name){
			///	<summary>
			///	获取集合中第一个节点的节点属性。
			///	</summary>
			///	<param name="name" type="String">属性名。</param>
			if(
				this.length === 0
			){
				return null;
			}

			return this[0][name];
		},
		insertAfter : function(targetNode){
			///	<summary>
			///	将集合中所有节点插入至指定的节点之后。
			///	</summary>
			///	<param name="targetNode" type="Node">指定节点。</param>
			var sibling = targetNode.nextElementSibling;

			if(
				sibling
			){
				this.insertBefore(sibling);
			}
			else {
				this.appendTo(targetNode.parentNode);
			}

			return this;
		},
		insertBefore : function(targetNode){
			///	<summary>
			///	将集合中所有节点插入至指定的节点之前。
			///	</summary>
			///	<param name="targetNode" type="Node">指定节点。</param>
			this.forEach(
				function(node){
					this.insertBefore(node, targetNode);
				},
				targetNode.parentNode
			);

			return this;
		},
		insertTo : function(parentNode, _idx){
			///	<summary>
			///	将集合中所有节点插入至指定索引的节点之前。
			///	</summary>
			///	<param name="parentNode" type="Node">指定的父节点。</param>
			///	<param name="_idx" type="Number">指定节点的索引值。</param>
			if(
				typeof _idx !== "undefined"
			){
				var childNodes = parentNode.childNodes;

				if(
					childNodes.length > 0
				){
					return this.insertBefore(childNodes[_idx]);
				}
			}

			this.forEach(function(node){
				parentNode.appendChild(node);
			});
			return this;
		},
		remove : function(){
			///	<summary>
			///	将集合中的节点从其父节点内移除。
			///	</summary>
			this.forEach(function(node){
				var parentNode = node.parentNode;

				if(
					parentNode
				){
					parentNode.removeChild(node);
				}
			});
			return this;
		},
		replace : function(targetNode){
			///	<summary>
			///	将集合中所有节点去替换指定的节点。
			///	</summary>
			///	<param name="targetNode" type="Node">指定的节点。</param>
			this.insertBefore(targetNode);
			this.remove.call([targetNode]);

			return this;
		},
		set : function(name, value){
			///	<summary>
			///	设置集合中所有节点的属性。
			///	</summary>
			///	<param name="name" type="String">属性名。</param>
			///	<param name="value" type="*">属性值。</param>
			this.forEach(function(element){
				element[name] = value;
			});
			return this;
		}
	});

	NodeList.props({
		get textContent(){
			return this.get("textContent");
		},
		set textContent(value){
			this.set("textContent", value);
		}
	});

	return NodeList;
}(
	this.EventTargetList,
	// DOCUMENT_POSITION_SAME
	0,
	// DOCUMENT_POSITION_CONTAINED_BY
	16,
	// DOCUMENT_POSITION_FOLLOWING_AND_CONTAINED_BY
	20
);

this.ElementList = function(NodeList, Node, ID, selectorText, document){
	function ElementList(_selector, _parent){
		///	<summary>
		///	通过指定选择器筛选元素。
		///	</summary>
		///	<param name="_selector" type="String, Element">选择器或dom元素。</param>
		///	<param name="_parent" type="Element">指定查询的父节元素。</param>
		if(
			!_selector
		){
			return;
		}

		this.assign(
			{ selector : _selector }
		);

		if(
			typeof _selector === "string"
		){
			var parent = _parent || document;

			if(
				parent.id === ""
			){
				parent.setAttribute("id", ID);

				this.combine(
					parent.querySelectorAll(
						selectorText.replace(["#", ID, _selector])
					)
				);

				parent.removeAttribute("id");
			}
			else {
				this.combine(
					parent.querySelectorAll(
						selectorText.replace(
							parent === document ? ["", "", _selector] : ["#", parent.id, _selector]
						)
					)
				);
			}

			return;
		}

		if(
			_selector instanceof Node || _selector instanceof Window
		){
			if(
				_parent
			){
				if(
					_parent.contains(_selector) === false
				){
					return;
				}
			}

			this.push(_selector);
			return;
		}

		if(
			"length" in _selector
		){
			this.combine(_selector);
			return;
		}
	};
	ElementList = new Class(ElementList, NodeList);

	ElementList.override({
		createList : function(_selector, _parent){
			///	<summary>
			///	创建个新的元素集合。
			///	</summary>
			///	<param name="_selector" type="String, Element">选择器、html或dom元素。</param>
			///	<param name="_parent" type="Element">指定查询的父节点。</param>
			return new ElementList.constructor(_selector, _parent);
		}
	});

	ElementList.props({
		get attributes(){
			///	<summary>
			///	获取属性集合。
			///	</summary>
			return new AttributesCollection(this);
		},
		set attributes(attrs){
			///	<summary>
			///	设置属性。
			///	</summary>
			///	<param name="attrs" type="Object">属性键值对。</param>
			var elementList = this;

			forEach(
				attrs,
				function(value, name){
					elementList.setAttribute(name, value);
				}
			);
		},
		blur : function(){
			///	<summary>
			///	让聚焦元素的失去焦点。
			///	</summary>
			this.forEach(function(element){
				element.blur();
			});

			return this;
		},
		btw : function(_selector, _ancestor){
			///	<summary>
			///	在该集合内的每一个元素与指定的祖先元素之间，查找其他符合条件的元素。
			///	</summary>
			///	<param name="_selector" type="String, Element">指定查找的祖先元素选择器。</param>
			///	<param name="_ancestor" type="Element">指定的一个祖先元素。</param>
			var list = [], elements = this.createList(_selector || "*", _ancestor);

			elements.forEach(
				function(element){
					this.every(function(elem){
						if(
							element.contains(elem)
						){
							list.push(element);
							return false;
						}

						return true;
					});
				},
				this
			);

			elements.splice(0);
			elements.combine(list);

			return elements;
		},
		get children(){
			///	<summary>
			///	获取子元素集合。
			///	</summary>
			return new ChildrenCollection(this);
		},
		set children(elements){
			///	<summary>
			///	移除所有现有子元素，添加指定的子元素。
			///	</summary>
			///	<param name="elements" type="Array, jQun.NodeList">需要添加的子元素集合。</param>
			if(
				this.length === 0
			){
				return;
			}
			
			this.children.remove();
			this.appendTo.call(elements, this[0]);
		},
		get dataset(){
			///	<summary>
			///	获取数据集合。
			///	</summary>
			return new DatasetCollection(this);
		},
		set dataset(data){
			///	<summary>
			///	设置数据。
			///	</summary>
			///	<param name="data" type="Object">数据键值对。</param>
			var elementList = this; 

			forEach(
				data,
				function(value, name){
					elementList.setData(name, value);
				}
			);
		},
		del : function(name){
			///	<summary>
			///	将指定属性从集合的所有元素中删除。
			///	</summary>
			///	<param name="name" type="String">需要删除的属性名。</param>
			this.forEach(function(element){
				delete element[name];
			});

			return this;
		},
		focus : function(){
			///	<summary>
			///	聚焦元素。
			///	</summary>
			var length = this.length;

			if(
				length > 0
			){
				this[length - 1].focus();
			}

			return this;
		},
		getAttribute : function(name){
			///	<summary>
			///	获取集合中第一个元素的特性属性。
			///	</summary>
			///	<param name="name" type="String">属性名。</param>
			return AttributesCollection.prototype.get.call({ sources : this }, name);
		},
		getData : function(name){
			///	<summary>
			///	获取集合中第一个元素的数据值。
			///	</summary>
			///	<param name="name" type="String">数据名。</param>
			return DatasetCollection.prototype.get.call({ sources : this }, name);
		},
		isBtw : function(_selector, _ancestor){
			///	<summary>
			///	判断在该集合内的每一个元素与指定的祖先元素之间，是否能查找到其他符合条件的元素。
			///	</summary>
			///	<param name="_selector" type="String, Element">指定查找的祖先元素选择器。</param>
			///	<param name="_ancestor" type="Element">指定的一个祖先元素。</param>
			return this.btw.apply(this, arguments).length > 0;
		},
		parent : function(){
			///	<summary>
			///	返回该集合所有元素的父元素。
			///	</summary>
			var list = this.createList();

			this.forEach(function(element){
				var parent = element.parentElement;

				if(!parent || list.contains(parent))
					return;

				list.push(parent);
			});
			return list;
		},
		query : function(_selector){
			///	<summary>
			///	通过选择器查找子孙元素。
			///	</summary>
			///	<param name="_selector" type="String, Element">选择器。</param>
			var source = ElementList.constructor.source, list = this.createList();

			this.forEach(function(Element){
				source.call(list, _selector, Element);
			});

			if(
				this.length < 2
			){
				return list;
			}

			return list.distinct();
		},
		removeAttribute : function(name){
			///	<summary>
			///	根据指定名称，移除集合中每一个元素的特性属性。
			///	</summary>
			///	<param name="name" type="String">属性名。</param>
			AttributesCollection.prototype.remove.call({ sources : this }, name);
			return this;
		},
		removeData : function(name){
			///	<summary>
			///	根据指定名称，移除集合中每一个元素的数据。
			///	</summary>
			///	<param name="name" type="String">数据名。</param>
			DatasetCollection.prototype.remove.call({ sources : this }, name);
			return this;
		},
		selector : "",
		setAttribute : function(name, _value){
			///	<summary>
			///	设置集合中每一个元素的特性属性。
			///	</summary>
			///	<param name="name" type="String">属性名。</param>
			///	<param name="_value" type="String">属性值。</param>
			AttributesCollection.prototype.set.call({ sources : this }, name, _value);
			return this;
		},
		setData : function(name, _value){
			///	<summary>
			///	设置集合中每一个元素的数据值。
			///	</summary>
			///	<param name="name" type="String">数据名。</param>
			///	<param name="_value" type="String">数据值。</param>
			DatasetCollection.prototype.set.call({ sources : this }, name, _value);
			return this;
		}
	});

	forEach(
		["header", "article", "section", "footer"],
		function(name){
			var property = {};
			
			property[name] = {
				get : function(){
					return this.query(">" + name);
				},
				set : function(element){
					this.createList(element).replace(this[name][0]);
				}
			};

			ElementList.props(property, this);
		},
		{ gettable : true, settable : true }
	);

	return ElementList;
}(
	this.NodeList,
	Node,
	// ID
	"__jQun__",
	// selectorText
	new Text("{0}{1} {2}"),
	document
);

this.HTMLElementList = function(ElementList, getCSSNumberValue, getComputedStyle, addProperty){
	function HTMLElementList(_selector, _parent){
		///	<summary>
		///	通过指定选择器筛选HTML元素。
		///	</summary>
		///	<param name="_selector" type="String, Element">选择器或dom元素。</param>
		///	<param name="_parent" type="Element">指定查询的父元素。</param>
	};
	HTMLElementList = new Class(HTMLElementList, ElementList);

	forEach(
		[
			"className", "hidden", "href",
			"id", "innerHTML", "src",
			"tabIndex", "title", "value"
		],
		addProperty,
		HTMLElementList
	);

	HTMLElementList.override({
		createList : function(_selector, _parent){
			///	<summary>
			///	创建个新的HTML元素集合。
			///	</summary>
			///	<param name="_selector" type="String, Element">选择器或dom元素。</param>
			///	<param name="_parent" type="Element">指定查询的父元素。</param>
			return new HTMLElementList.constructor(_selector, _parent);
		}
	});

	HTMLElementList.props({
		get classList(){
			///	<summary>
			///	获取class列表集合。
			///	</summary>
			return new ClassListCollection(this);
		},
		set classList(className){
			///	<summary>
			///	设置集合中所有元素的class属性。
			///	</summary>
			///	<param name="className" type="String">需要设置的class字符串。</param>
			this.set("className", className);
		},
		getCSSPropertyValue : function(name){
			///	<summary>
			///	获取集合中第一个元素的css属性。
			///	</summary>
			///	<param name="name" type="String">属性名。</param>
			if(
				this.length === 0
			){
				return "";
			}

			return getComputedStyle(this[0])[name];
		},
		getMetrics : function(name){
			///	<summary>
			///	获取元素指定盒模型属性值。
			///	</summary>
			///	<param name="name" type="String">盒模型属性名称。</param>
			return getCSSNumberValue(
				this.getCSSPropertyValue(name)
			);
		},
		hasTag : function(tagName){
			///	<summary>
			///	判断集合类是否含有指定标签名称的元素。
			///	</summary>
			///	<param name="tagName" type="String">标签名称。</param>
			tagName = tagName.toUpperCase();

			return !this.every(function(htmlElement){
				return htmlElement.tagName !== tagName;
			});
		},
		get height(){
			///	<summary>
			///	获取集合中每一个元素的高。
			///	</summary>
			return this.getMetrics("height");
		},
		set height(height){
			///	<summary>
			///	设置集合中每一个元素的高。
			///	</summary>
			///	<param name="height" type="String, Number">元素的高。</param>
			this.setMetrics("height", height);
		},
		hide : function(){
			///	<summary>
			///	隐藏元素。
			///	</summary>
			return this.setAttribute("hidden", "");
		},
		rect : function(_name){
			///	<summary>
			///	获取第一个元素的客户端属性。
			///	</summary>
			///	<param name="_name" type="String">需要只返回单个属性值的属性名称。</param>
			if(
				this.length === 0
			){
				return _name ? 0 : null;
			}

			var rect = this[0].getBoundingClientRect();

			return _name in rect ? rect[_name] : rect;
		},
		setCSSPropertyValue : function(name, value){
			///	<summary>
			///	设置集合中每一个元素的css属性。
			///	</summary>
			///	<param name="name" type="String">属性名。</param>
			///	<param name="value" type="String">属性值。</param>
			this.forEach(function(element){
				element.style[name] = value;
			});
			return this;
		},
		setMetrics : function(name, value){
			///	<summary>
			///	设置元素指定盒模型属性值。
			///	</summary>
			///	<param name="name" type="String">盒模型属性名称。</param>
			///	<param name="value" type="String, Number">盒模型属性值。</param>
			if(
				typeof value === "number"
			){
				value += "px";
			}

			this.setCSSPropertyValue(name, value);
			return this;
		},
		show : function(){
			///	<summary>
			///	显示元素。
			///	</summary>
			///	<param name="_display" type="String">修改元素display的css值。</param>
			return this.removeAttribute("hidden");
		},
		get style(){
			///	<summary>
			///	获取style属性集合。
			///	</summary>
			return new CSSPropertyCollection(this);
		},
		set style(cssText){
			///	<summary>
			///	设置集合中每一个元素的style属性。
			///	</summary>
			///	<param name="cssText" type="String">需要设置的style属性字符串。</param>
			AttributesCollection
				.prototype
				.set
				.call(
					{ sources : this },
					"style",
					cssText
				);
		},
		toggle : function(){
			///	<summary>
			///	显示或隐藏元素。
			///	</summary>
			return this[this.getAttribute("hidden") === null ? "hide" : "show"]();
		},
		get width(){
			///	<summary>
			///	获取集合中每一个元素的宽。
			///	</summary>
			return this.getMetrics("width");
		},
		set width(width){
			///	<summary>
			///	设置集合中每一个元素的宽。
			///	</summary>
			///	<param name="width" type="String, Number">元素的宽。</param>
			this.setMetrics("width", width);
		}
	});

	return HTMLElementList;
}(
	this.ElementList,
	this.DOM.getCSSNumberValue,
	getComputedStyle,
	// addProperty
	function(name){
		define(
			this,
			name,
			null,
			{
				get : function(){
					return this.get(name);
				},
				set : function(value){
					this.set(name, value);
				}
			}
		);
	}
);

}.call(
	this,
	this.List,
	this.AttributesCollection,
	this.CSSPropertyCollection,
	this.ChildrenCollection,
	this.ClassListCollection,
	this.DatasetCollection,
	this.Text,
	// Window
	window.constructor,
	forEach,
	jQun.define
));


// 与事件有关
(function(EventTargetList, document, dispatch, set){

this.Event = function(generate){
	function Event(type, _baseType, _initEventArgs){
		///	<summary>
		///	DOM事件类。
		///	</summary>
		///	<param name="type" type="String">用户自定义事件类型。</param>
		///	<param name="_baseType" type="String">事件基础类型(MouseEvent、UIEvent、WheelEvent等)。</param>
		///	<param name="_initEventArgs" type="Array">初始化事件的其他参数列表。</param>
		this.assign({
			initEventArgs : [type].concat(_initEventArgs || [true, true]),
			type : type,
			baseType : _baseType
		});
	};
	Event = new Class(Event);

	Event.props({
		baseType : "Event",
		initEventArgs : null,
		trigger : function(eventTarget, _attrs){
			///	<summary>
			///	触发事件。
			///	</summary>
			///	<param name="eventTarget" type="EventTarget">触发该事件的目标对象。</param>
			///	<param name="_attrs" type="Object">附加的属性键值对。</param>
			EventTargetList
				.prototype
				.dispatch
				.call(
					[eventTarget],
					generate(
						this.baseType,
						this.initEventArgs,
						_attrs
					)
				);

			/* 为了兼容chrome 冒泡bug，启用上面（虽然性能耗的比较多），直到chrome修复bug
				dispatch.call(
					[eventTarget],
					generate(
						this.baseType,
						this.initEventArgs,
						_attrs
					)
				);
			*/

			return this;
		},
		type : ""
	});

	return Event;
}(
	// generate
	function(baseType, initEventArgs, _attrs){
		var event = document.createEvent(baseType);

		event[
			"init" + baseType
		].apply(
			event,
			initEventArgs
		);

		return set(event, _attrs);
	}
);

}.call(
	this,
	this.EventTargetList,
	document,
	this.EventTargetList.prototype.dispatch,
	jQun.set
));


// 自定义事件相关
(function(HTMLElementList, Event, window, document){

this.ReposcursorEvent = function(Browser, BrowserAgents, reposcursorEvent, selection){
	function ReposcursorEvent(){
		///	<summary>
		///	创建游标重新定位事件。
		///	</summary>

		// 简单的模拟，为firefox创建selectionchange事件
		forEach(
			1,
			function(){
				new HTMLElementList(
					document
				).attach(
					[
						BrowserAgents.Firefox,
						BrowserAgents.MSIE
					].indexOf(
						Browser.agent
					) > -1 ?
						{
							mouseup : this,
							keyup : this
						} :
						{
							selectionchange : this
						}
				);
			},
			function(e){
				if(
					selection.rangeCount === 0
				){
					return;
				}
			
				var range = selection.getRangeAt(0);

				reposcursorEvent.trigger(
					e.type === "selectionchange" ? range.commonAncestorContainer : e.target,
					{ range : range	}
				);
			}
		);
	};
	ReposcursorEvent = new StaticClass(ReposcursorEvent);

	return ReposcursorEvent;
}(
	this.Browser,
	this.BrowserAgents,
	// reposcursorEvent
	new Event("reposcursor"),
	// selection
	document.getSelection()
);

this.UserclickEvent = function(){
	function UserclickEvent(){
		///	<summary>
		///	生成userclick事件，防止安卓点击不灵而且出现蓝框的问题。
		///	</summary>
		
		/*
			安卓上，元素只要监听了click事件，浏览器会自动在点击的时候出现蓝框，
			不仅有时点击不灵，而且非常难看。
			此静态类目的就是解决这2个问题，ps：无法对button和a标签消除蓝框。
		*/
		new HTMLElementList(
				window
			)
			.attach({
				click : function(e){
					new Event(
							"userclick",
							"MouseEvent",
							[
								e.bubbles, e.cancelable,
								window, e.detail,
								e.screenX, e.screenY, e.clientX, e.clientY,
								e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
								e.button, e.target
							]
						)
						.trigger(
							e.target
						);
				}
			});
	};
	UserclickEvent = new StaticClass(UserclickEvent);

	return UserclickEvent;
}();

this.ShakeEvent = function(shakeEvent, abs){
	function ShakeEvent(){
		///	<summary>
		///	摇晃事件。
		///	</summary>
		var lastX = 0, lastY = 0, lastZ = 0, lastTime = 0;

		new HTMLElementList(
				window
			)
			.attach({
				devicemotion : function(e){
					var acceleration = e.accelerationIncludingGravity,
				
						time = new Date().getTime(), diffTime = time - lastTime;

					if(
						diffTime > 50
					){
						lastTime = time; 

						var x = acceleration.x, y = acceleration.y, z = acceleration.z; 

						var offset = abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000; 

						if(
							offset > 1500
						){
　　						shakeEvent.trigger(
								window,
								{
									offset : offset
								}
							);
						}

						lastX = x; 
						lastY = y; 
						lastZ = z; 
					} 
				}
			});
	};
	ShakeEvent = new StaticClass(ShakeEvent);

	return ShakeEvent;
}(
	// shakeEvent
	new Event("shake"),
	Math.abs
);

}.call(
	this,
	this.HTMLElementList,
	this.Event,
	window,
	document
));


// 与模板相关的类
(function(HTMLElementList, Event, Text, DOM, JSON, document){

this.HTML = function(Function, SPACE_REGEXP, FOR_REGEXP, WORD_TEXT, replace, toArray, console){
	function HTML(template){
		///	<summary>
		///	html模板。
		///	</summary>
		///	<param name="template" type="String, HTMLScriptElement">html模板源字符串或script、noscript标签。</param>
		this.assign({
			template : [
				"with(this){ return (function(){ this.push('",
				// 使用Text类的replace替换参数
				replace.call({
					text : (typeof template === "string" ? template : template.textContent)
						// 给单引号加保护
						.split("'")
						.join("\\'")
						// 替换掉特殊的空白字符
						.replace(
							SPACE_REGEXP,
							""
						)
						// 替换for循环
						.replace(
							FOR_REGEXP,
							function(str, condition, i){
								return [
									"');forEach(",
									condition
										// 将循环参数内的单引号去保护
										.split("\\'")
										.join("'")
										// 替换左大括号
										.split("{")
										.join("\t")
										// 替换右大括号
										.split("}")
										.join("\n"),
									", function(" + (i || "") + ")\t this.push('"
								].join("");
							}
						)
				}, function(str, modifier, word){
					if(
						modifier === ":"
					){
						return "\t" + word + "\n";
					}

					if(
						modifier === ">"
					){
						return "');console.log(" + word + ");this.push('";
					}

					return replace.call(
						{ text : WORD_TEXT },
						{ word : word, shouldEmpty : modifier === "~" }
					);
				})
				// 替换for循环的结束标识“}”
				.split("}")
				.join("');}, this);this.push('")
				// 替换临时产生的大括号
				.split("\t")
				.join("{")
				.split("\n")
				.join("}"),
				"');return this.join('');}.call([])); }"
			].join("")
		});
	};
	HTML = new Class(HTML);

	HTML.props({
		create : function(_data, _shouldReturnArray){
			///	<summary>
			///	将模板转化为html节点。
			///	</summary>
			///	<param name="data" type="Object, Array">需要渲染的数据。</param>
			///	<param name="_shouldReturnArray" type="Boolean">是否以普通数组形式返回节点。</param>
			var parent = document.createElement("div");

			parent.innerHTML = this.render(_data);

			if(
				_shouldReturnArray
			){
				var childNodes = toArray(parent.childNodes);
				
				parent.textContent = "";
				return childNodes;
			}

			var htmlElementList = new HTMLElementList("");

			htmlElementList.combine(parent.childNodes);
			htmlElementList.remove();

			return htmlElementList;
		},
		render : function(_data){
			///	<summary>
			///	渲染模板，生成html字符串。
			///	</summary>
			///	<param name="_data" type="Object, Array">需要渲染的数据。</param>
			return new Function(
				"forEach",
				"console",
				this.template
			).call(
				_data || {},
				forEach,
				console
			);
		},
		template : ""
	});

	return HTML;
}(
	Function,
	// SPACE_REGEXP => space(查找特殊的空白字符)
	/[\r\t\n]/g,
	// FOR_REGEXP => for(查找for语句)
	/@for\s*\(([\s\S]+?)(?:\s*->>\s*([\s\S]+?))*?\)\s*\{/g,
	// WORD_TEXT
	"');this.push(typeof ({word}) === 'undefined' ? ({shouldEmpty} ? '' : '{word}') : {word});this.push('",
	Text.prototype.replace,
	jQun.toArray,
	console
);

this.CHTML = function(componentreadyEvent, selectorText, array, contentRegx, parse){
	function CHTML(){
		///	<summary>
		///	组件html模板(Conponent HTML)：如果里面嵌入了JSON字符串，那么将其转化为JSON数据，作为参数传入类的构造函数。
		///	</summary>
		array.indexOf = function(name){
			var i = 0;

			this.every(function(item, n){
				if(
					item.name === name
				){
					i = n;
					return false;
				}

				return true;
			});

			return i;
		};

		DOM.loaded(
			function(){
				new HTMLElementList(
					array
						.map(function(item){
							return selectorText.replace(item);
						})
						.join(", ")
				).forEach(function(script, i){
					var scriptList = new HTMLElementList(script),
				
						result = scriptList.textContent.match(contentRegx);

					new array[
							array.indexOf(
								new HTMLElementList(script).getData("name")
							)
						]
						.Class(
								result === null ? null : parse(result[1])
							)
						.replace(
							script
						)
						.dispatch(
							componentreadyEvent
						);
				});
			},
			true
		);
	};
	CHTML = new StaticClass(CHTML);

	CHTML.static({
		bind : function(Class, name){
			///	<summary>
			///	绑定模板的类与名称。
			///	</summary>
			///	<param name="Class" type="Class">需要绑定的类。</param>
			///	<param name="name" type="String">需要绑定的名称。</param>
			array.push({ Class : Class, name : name });

			return this;
		}
	});

	return CHTML;
}(
	// componentreadyEvent
	new Event("componentready"),
	// selectorText
	new Text([
		'script[type="text/chtml"][data-name="{name}"]',
		'noscript[type="text/chtml"][data-name="{name}"]'
	].join(",")),
	// array
	[],
	// contentRegx
	/^\s*(\S[\s\S]*?)\s*$/,
	JSON.parse
);

this.SHTML = function(HTML){
	function SHTML(){
		///	<summary>
		///	静态html模板(Static HTML)。
		///	</summary>
		DOM.loaded(
			function(){
				new HTMLElementList(
					[
						'script[type="text/shtml"]:not(:empty)',
						'noscript[type="text/shtml"]:not(:empty)'
					].join(",")
				).forEach(function(htmlElement, i){
					new HTML(
							htmlElement.textContent
						)
						.create()
						.replace(
							htmlElement
						);
				});
			},
			true
		);
	};
	SHTML = new StaticClass(SHTML);

	return SHTML;
}(
	this.HTML
);

}.call(
	this,
	this.HTMLElementList,
	this.Event,
	this.Text,
	this.DOM,
	this.JSON,
	document
));


// 与重写有关
(function(EventTargetList, Event, HTMLElementList, HTML, Browser, BrowserAgents, document, dispatch){

this.OverrideDispatch = function(div, contains){
	function OverrideDispatch(){
		///	<summary>
		///	使EventTargetList的dispatch函数能够支持jQun.Event参数。
		///	</summary>
		EventTargetList.override({
			dispatch : function(event, _attrs){
				///	<summary>
				///	给所有目标分配事件。
				///	</summary>
				///	<param name="event" type="Event, jQun.Event">事件。</param>
				///	<param name="_attrs" type="Object">如果第一个参数是jQun.Event实例，则该参数为附加的属性键值对，否则该参数形同虚设。</param>
				if(
					event instanceof Event
				){
					this.forEach(function(eventTarget){
						event.trigger(eventTarget, _attrs);
					});

					return this;
				}

				/*
					2014.5.26 chrome bug：
					因为chrome的捕获事件必须由文档开始；
					所以未添加到文档中的元素，不会有事件冒泡，IE、FF正常。
				*/
				if(
					Browser.agent !== BrowserAgents.Chrome
				){
					dispatch.call(this, event);
					return this;
				}
					
				// 如果chrome修复了bug  把上面的判断去掉 以下都可以删除了
				this.forEach(function(eventTarget){
					var body = document.body;

					if(
						!contains.call([body], eventTarget)
					){
						var element = eventTarget.parentElement;

						if(
							element
						){
							while(
								element.parentElement
							){
								element = element.parentElement;
							}

							div.appendChild(element);
							body.appendChild(div);

							dispatch.call([eventTarget], event);

							div.innerHTML = "";

							body.removeChild(div);
							return;
						}
					}

					dispatch.call([eventTarget], event);
				});
					
				return this;
			}
		});
	};
	OverrideDispatch = new StaticClass(OverrideDispatch);

	return OverrideDispatch;
}(
	// div
	new HTML(
			'<div style="display:none !important;"></div>'
		)
		.create(
			null,
			true
		)[0],
	HTMLElementList.prototype.contains
);

}.call(
	this,
	this.EventTargetList,
	this.Event,
	this.HTMLElementList,
	this.HTML,
	this.Browser,
	this.BrowserAgents,
	document,
	this.EventTargetList.prototype.dispatch
));


// 与数据有关的类
(function(JSON, window){

this.Storage = function(hasOwnProperty){
	function Storage(_data){
		///	<summary>
		///	储存空间。一旦页面刷新，数据全部清空。
		///	</summary>
		/// <param name="_data" type="Object">初始化的数据</param>
		if(
			!_data
		){
			return;
		}

		forEach(
			_data,
			function(value, key){
				this.set(key, value);
			},
			this
		);
	};
	Storage = new Class(Storage);

	Storage.props({
		clear : function(){
			///	<summary>
			///	清空所有储存数据。
			///	</summary>
			forEach(
				this,
				function(value, key){
					this.del(key);
				},
				this
			);

			return this;
		},
		del : function(key){
			///	<summary>
			///	删除一项储存数据。
			///	</summary>
			///	<param name="key" type="String">数据主键。</param>
			if(
				hasOwnProperty.call(this, key)
			){
				delete this[key];
				return true;
			}

			return false;
		},
		get : function(key){
			///	<summary>
			///	获取数据。
			///	</summary>
			///	<param name="key" type="String">数据主键。</param>
			return this[key];
		},
		set : function(key, value){
			///	<summary>
			///	设置数据。
			///	</summary>
			///	<param name="key" type="String">数据主键。</param>
			///	<param name="value" type="*">数据值。</param>
			this[key] = value;
			return this;
		}
	});

	return Storage;
}(
	Object.prototype.hasOwnProperty
);

this.ICache = function(){
	return new Interface([ "type" ]);
}();

this.Cache = function(ICache, Storage, storages, get, set, remove){
	function Cache(name){
		///	<summary>
		///	缓存数据。
		///	</summary>
		/// <param name="name" type="String">缓存数据的标识名称。</param>
		var key = this.type + "-" + name, storage = storages[key];

		if(
			!storage
		){
			storage = storages[key] = new Storage(
				get(
					this.type,
					name
				)
			);
		}

		this.assign({
			name : name,
			storage : storage
		});
	};
	Cache = new Class(Cache, ICache);

	Cache.props({
		clear : function(){
			///	<summary>
			///	删除所有缓存数据。
			///	</summary>
			this.storage.clear();
			remove(this.type, this.name);

			return this;
		},
		del : function(key){
			///	<summary>
			///	删除某一条缓存数据。
			///	</summary>
			/// <param name="key" type="String">缓存数据的主键。</param>
			this.storage.del(key);
			this.sync();

			return this;
		},
		get : function(key){
			///	<summary>
			///	获取某一条缓存数据。
			///	</summary>
			/// <param name="key" type="String">缓存数据的主键。</param>
			return this.storage.get(key);
		},
		name : "",
		set : function(key, value){
			///	<summary>
			///	设置某一条缓存数据。
			///	</summary>
			/// <param name="key" type="String">缓存数据的主键。</param>
			/// <param name="value" type="*">缓存数据的值。</param>
			this.storage.set(key, value);
			this.sync();

			return this;
		},
		storage : null,
		sync : function(){
			///	<summary>
			///	同步到浏览器缓存中。
			///	</summary>
			set(this.type, this.name, this.storage);
			return this;
		}
	});

	return Cache;
}(
	this.ICache,
	this.Storage,
	// storages
	{},
	// get
	function(type, name){
		return JSON.parse(window[type + "Storage"].getItem(name));
	},
	// set
	function(type, name, storage){
		window[type + "Storage"].setItem(name, JSON.stringify(storage));
	},
	// remove
	function(type, name){
		window[type + "Storage"].removeItem(name);
	}
);

this.LocalCache = function(Cache){
	function LocalCache(name){
		///	<summary>
		///	本地缓存数据，只要不清空浏览器数据，就算浏览器关闭重启，也一直存在。无法跨域存储。
		///	</summary>
		/// <param name="name" type="String">缓存数据的标识名称。</param>
	};
	LocalCache = new Class(LocalCache, Cache);
	
	LocalCache.props({
		type : "local"
	});

	return LocalCache;
}(
	this.Cache
);

this.SessionCache = function(Cache){
	function SessionCache(name){
		///	<summary>
		///	创建一个会话缓存。只要所有相关页面不关闭，数据一直存在。
		///	</summary>
		/// <param name="name" type="String">缓存数据的标识名称。</param>
	};
	SessionCache = new Class(SessionCache, Cache);
	
	SessionCache.props({
		type : "session"
	});

	return SessionCache;
}(
	this.Cache
);

}.call(
	this,
	this.JSON,
	window // iphone safari，出于安全考虑，不能将sessionStorage赋予给其他变量..
));


// 与ajax相关的类
(function(JSON, XMLHttpRequest, forEach, set){

this.ConnectionMethods = function(){
	return new Enum(
		["Get", "Post"]
	);
}();

this.ResponseTypes = function(){
	return new Enum(
		["Text", "Json", "ArrayBuffer", "Document", "Blob"]
	);
}();

this.RequestConnection = function(ConnectionMethods, ResponseTypes, toCheck, getEncodedParams){
	function RequestConnection(name, url, _Interface, _method, _responseType, _key){
		///	<summary>
		///	ajax请求连接。
		///	</summary>
		///	<param name="name" type="String">请求名称字符串，在后台可以通过名称关键字获取。</param>
		///	<param name="url" type="String">连接url。</param>
		///	<param name="_Interface" type="Interface">发送数据的接口规范。</param>
		///	<param name="_method" type="ConnectionMethods">发送数据的方式。</param>
		///	<param name="_responseType" type="ResponseTypes">返回的数据格式。</param>
		///	<param name="_key" type="String">名称关键字，默认：__request__。</param>
		this.assign({
			Interface : _Interface,
			name : name,
			responseType : _responseType,
			method : _method,
			url : url,
			key : _key
		});
	};
	RequestConnection = new Class(RequestConnection);

	RequestConnection.props({
		Interface : null,
		create : function(urlQueryString, _formData, _load, _error, _beforeSend){
			///	<summary>
			///	创建ajax连接。
			///	</summary>
			///	<param name="urlQueryString" type="String">url查询参数字符串。</param>
			///	<param name="_formData" type="FormData">需要上传的formData。</param>
			///	<param name="_load" type="Function">异步完成后所执行的回调函数。</param>
			///	<param name="_error" type="Function">异步报错所执行的回调函数。</param>
			///	<param name="_beforeSend" type="Function">在发送请求之前的回调函数。</param>
			var request = new XMLHttpRequest(), responseType = this.responseType;

			request.open(
				ConnectionMethods.getNameByValue(
					_formData ? ConnectionMethods.Post : this.method,
					true
				),
				this.url + (urlQueryString ? "?" + urlQueryString : ""),
				true
			);

			try{
				// QQ浏览器下设置json等其他不支持的type，会报错
				request.responseType = ResponseTypes.getNameByValue(responseType, true);
			}
			catch(e){}

			request.addEventListener(
				"load",
				function(){
					var response = this.response;

					if(
						this.status !== 200
					){
						if(
							_error
						){
							_error(this.status);
						}

						return;
					}

					if(
						!_load
					){
						return;
					}

					if(
						responseType === ResponseTypes.Json
					){
						// ie不能设置json，需要转换
						if(
							typeof response === "string"
						){
							response = JSON.parse(response);
						}
					}

					_load(response);
				}
			);

			if(
				_beforeSend
			){
				_beforeSend(request);
			}

			request.send(_formData);

			return request;
		},
		key : "__request__",
		method : ConnectionMethods.Get,
		name : "",
		open : function(params, _load, _error, _beforeSend){
			///	<summary>
			///	开打一个ajax连接。
			///	</summary>
			///	<param name="params" type="Object">url的替换参数及post方法的传递参数。</param>
			///	<param name="_load" type="Function">异步完成后所执行的回调函数。</param>
			///	<param name="_error" type="Function">异步报错所执行的回调函数。</param>
			///	<param name="_beforeSend" type="Function">在发送请求之前的回调函数。</param>
			toCheck(this.Interface, params);

			if(
				this.method === ConnectionMethods.Post
			){
				var formData = new FormData();

				forEach(
					params,
					function(value, name){
						formData.append(name, value);
					}
				);

				return this.create(
					getEncodedParams(this.key, this.name),
					formData,
					_load,
					_error,
					_beforeSend
				);
			}

			return this.create(
				getEncodedParams(this.key, this.name, params),
				null,
				_load,
				_error,
				_beforeSend
			);
		},
		responseType : ResponseTypes.Json,
		upload : function(blob, _load, _error, _beforeSend, _progress){
			///	<summary>
			///	使用ajax上传文件。
			///	</summary>
			///	<param name="blob" type="Blob">需要上传的二进制数据，一般是文件。</param>
			///	<param name="_load" type="Function">异步完成后所执行的回调函数。</param>
			///	<param name="_error" type="Function">异步报错所执行的回调函数。</param>
			///	<param name="_beforeSend" type="Function">在发送请求之前的回调函数。</param>
			///	<param name="_progress" type="Function">数据上传进度回调函数。</param>
			var formData = new FormData();

			formData.append("blob", blob);

			return this.create(
				getEncodedParams(this.key, this.name),
				formData,
				_load,
				_error,
				_progress ?
					function(request){
						request.addEventListener(
							"progress",
							function(e){
								var loaded = e.loaded, total = e.total;

								_progress(
									(loaded / total).toFixed(2) - 0,
									loaded,
									total
								);
							}
						);

						if(
							!_beforeSend
						){
							return;
						}

						_beforeSend(request);
					} :
					_beforeSend
			);
		},
		url : ""
	});

	return RequestConnection;
}(
	this.ConnectionMethods,
	this.ResponseTypes,
	// toCheck
	function(Interface, params){
		if(
			!Interface
		){
			return;
		}

		new (
			new Class(
				null,
				Interface
			)
			.props(params)
			.constructor
		);
	},
	// getEncodedParams
	function(key, name, _params){
		var params = set({}, _params);

		params[key] = name;
		return JSON.stringifyAddressParameters(params);
	}
);

this.Ajax = function(RequestConnection, Storage, Blob, ResponseTypes, console, location){
	function Ajax(){
		///	<summary>
		///	ajax异步类。
		///	</summary>
		if(
			!!XMLHttpRequest
		){
			this.enabled = true;
			return;
		}

		console.warn("当前浏览器不支持XMLHttpRequest。");
	};
	Ajax = new StaticClass(Ajax, { enabled : false });

	Ajax.static({
		beginTesting : function(){
			///	<summary>
			///	开始启动测试模式。
			///	</summary>
			this.isTesting = true;
			return this;
		},
		defaultKey : "",
		isTesting : false,
		open : function(name, data, _load, _error, _beforeSend, _progress){
			///	<summary>
			///	打开指定名称的请求连接。
			///	</summary>
			///	<param name="name" type="String">连接名称。</param>
			///	<param name="data" type="Object, Blob">url的替换参数及post方法的传递参数 或者 二进制数据（一般是文件）。</param>
			///	<param name="_load" type="Function">异步完成后所执行的回调函数。</param>
			///	<param name="_error" type="Function">异步报错所执行的回调函数。</param>
			///	<param name="_beforeSend" type="Function">在发送请求之前的回调函数。</param>
			///	<param name="_progress" type="Function">数据上传进度回调函数。</param>
			if(
				!this.enabled
			){
				return;
			}

			var requestConnection = this.requestStorage.get(name);

			if(
				!requestConnection
			){
				throw 'Ajax请求信息错误：请检查连接名称"' + name + '"是否正确。';
				return null;
			}

			if(
				this.isTesting
			){
				if(
					_load
				){
					_load(requestConnection.responseType === ResponseTypes.Json ? {} : "");
				}

				return null;
			}

			if(
				data instanceof Blob
			){
				return requestConnection.upload(data, _load, _error, _beforeSend, _progress);
			}

			return requestConnection.open(data, _load, _error, _beforeSend);
		},
		requestStorage : new Storage(),
		requestURLPrefix : [location.protocol, "", location.host, ""].join("/"),
		save : function(allSettings){
			///	<summary>
			///	存储请求连接信息。
			///	</summary>
			///	<param name="allSettings" type="Array">ajax连接信息。</param>
			var key, requestStorage = this.requestStorage, requestURLPrefix = this.requestURLPrefix;

			if(
				this.defaultKey !== ""
			){
				key = this.defaultKey;
			}

			forEach(
				allSettings,
				function(settings){
					var name = settings[0];

					requestStorage.set(
						name,
						new RequestConnection(
							name,
							requestURLPrefix + settings[1],
							settings[2],
							settings[3],
							settings[4],
							key
						)
					);
				}
			);

			return requestStorage;
		},
		setDefaultKey : function(key){
			///	<summary>
			///	设置默认的请求名称关键字。
			///	</summary>
			///	<param name="key" type="String">名称关键字。</param>
			this.defaultKey = key;
			return this;
		},
		setRequestURLPrefix : function(urlPrefix){
			///	<summary>
			///	设置请求连接地址的前缀。
			///	</summary>
			///	<param name="urlPrefix" type="String">地址前缀。</param>
			this.requestURLPrefix = urlPrefix;
			return this;
		}
	});

	return Ajax;
}(
	this.RequestConnection,
	this.Storage,
	Blob,
	this.ResponseTypes,
	console,
	location
);

}.call(
	this,
	this.JSON,
	XMLHttpRequest,
	forEach,
	jQun.set
));


// 与socket相关的类
(function(EventTargetList, Event, TYPE, window, attach){

this.PortList = function(List){
	function PortList(){
		///	<summary>
		///	与socket相关的端口列表。
		///	</summary>
	};
	PortList = new Class(PortList, List);

	PortList.props({
		getPortByName : function(portName){
			///	<summary>
			///	通过端口名称获取端口。
			///	</summary>
			///	<param name="portName" type="String">端口名称。</param>
			return this[this.indexOfName(portName)] || null;
		},
		indexOfName : function(portName){
			///	<summary>
			///	通过名称检索端口。
			///	</summary>
			///	<param name="portName" type="String">端口名称。</param>
			var index = -1;

			this.every(function(port, i){
				if(
					port.name === portName
				){
					index = i;
					return false;
				}

				return true;
			});

			return index;
		}
	});

	return PortList;
}(
	this.List
);

this.Socket = function(portList){
	function Socket(){
		///	<summary>
		///	建立窗口之间的接口。
		///	</summary>
	};
	Socket = new StaticClass(Socket);

	Socket.static({
		call : function(portName, value, _from){
			///	<summary>
			///	发送信息给指定名称的端口。
			///	</summary>
			///	<param name="portName" type="String">端口名称。</param>
			///	<param name="value" type="*">需要发送的数据值。</param>
			///	<param name="_from" type="Port">信息来源。</param>
			var port = portList.getPortByName(portName);

			if(
				!port
			){
				return false;
			}

			port.receive(value, _from);
			return true;
		},
		close : function(port){
			///	<summary>
			///	关闭指定的端口。
			///	</summary>
			///	<param name="port" type="Port">指定的端口。</param>
			var index = portList.indexOfName(port.name);

			if(
				index > -1
			){
				portList.splice(index, 1);
			}

			return this;
		},
		exist : function(portName){
			///	<summary>
			///	检查是否存在指定端口名称的端口。
			///	</summary>
			///	<param name="portName" type="String">端口名称。</param>
			return portList.indexOfName(portName) > -1;
		},
		open : function(port){
			///	<summary>
			///	在接口中开打指定端口。
			///	</summary>
			///	<param name="port" type="Port">指定的端口。</param>
			var index = portList.indexOfName(port.name);

			if(
				index > -1
			){
				portList[index].stop();
			}
			
			portList.push(port);
			return this;
		}
	});

	return Socket;
}(
	// portList
	new this.PortList()
);

this.Port = function(Socket, WINDOW_OBJECT_STRING, undefined, messageEvent, dispatch, set, toArray){
	function Port(name, _eventTarget, _isArray){
		///	<summary>
		///	通信端口。
		///	</summary>
		///	<param name="name" type="String">端口名称。</param>
		///	<param name="_eventTarget" type="EventTarget">监听信息的目标。</param>
		///	<param name="_isArray" type="Boolean">监听目标是否为数组。</param>
		this.assign({
			name : name
		});

		if(
			_eventTarget
		){
			if(
				_isArray
			){
				_eventTarget.forEach(
					function(evenTarget){
						if(evenTarget){
							this.push(evenTarget);
						}
					},
					this
				);
			}
			else {
				this.push(_eventTarget);
			}
		}

		this.start();
	};
	Port = new Class(Port, EventTargetList);

	Port.override({
		attach : function(events, _capture, _priority, _useWeakReference){
			///	<summary>
			///	向该端口中的所有目标附加事件监听。
			///	</summary>
			///	<param name="events" type="Object">事件侦听器键值对。</param>
			///	<param name="_capture" type="Boolean">侦听器是否运行于捕获阶段。</param>
			///	<param name="_priority" type="Number">优先级，数字越大，优先级越高。</param>
			///	<param name="_useWeakReference" type="Boolean">是否是属于强引用。</param>
			var func = events.message;

			events = set({}, events);

			if(
				func
			){
				var port = this, name = this.name;

				events.message = function(e){
					var data = e.data;

					if(
						data
					){
						if(
							data.type === TYPE
						){
							if(
								data.name !== name
							){
								return;
							}
						}
					}
					else {
						return;
					}

					func.call(this, e, func.length === 2 ? null : undefined);
				};
			}

			return attach.call(this, events, _capture, _priority, _useWeakReference);
		},
		dispatch : function(event, _attrs){
			///	<summary>
			///	给所有目标分配事件。
			///	</summary>
			///	<param name="event" type="Event, jQun.Event">需要分配的事件。</param>
			///	<param name="_attrs" type="Object">附加的属性键值对。</param>
			var list = [], data = _attrs ? _attrs.data : null;

			if(
				event.type !== "message"
			){
				return dispatch.call(this, event, _attrs);
			}

			this.forEach(
				function(eventTarget){
					if(
						eventTarget.toString() === WINDOW_OBJECT_STRING
					){
						eventTarget.postMessage(data, "*");
						return;
					}

					list.push(eventTarget);
				}
			);

			return dispatch.call(list, event, _attrs);
		}
	});

	Port.props({
		enabled : false,
		name : "",
		receive : function(value, _from){
			///	<summary>
			///	接收数据。
			///	</summary>
			///	<param name="value" type="*">数据值。</param>
			///	<param name="_from" type="Port">信息来源。</param>
			this.dispatch(
				messageEvent,
				{
					data : {
						from : _from ? _from.name : "",
						name : this.name,
						type : TYPE,
						value : value
					}
				}
			);

			return this;
		},
		send : function(portName, value){
			///	<summary>
			///	发送信息给指定名称的端口。
			///	</summary>
			///	<param name="portName" type="String">端口名称。</param>
			///	<param name="value" type="*">需要发送的数据值。</param>
			Socket.call(portName, value, this);
			return this;
		},
		start : function(){
			///	<summary>
			///	启动端口服务。
			///	</summary>
			if(
				this.enabled
			){
				return this;
			}

			Socket.open(this);

			this.enabled = true;
			return this;
		},
		stop : function(){
			///	<summary>
			///	停止端口服务。
			///	</summary>
			if(
				!this.enabled
			){
				return this;
			}

			Socket.close(this);

			this.enabled = false;
			return this;
		}
	});

	return Port;
}(
	this.Socket,
	// WINDOW_OBJECT_STRING
	window.toString(),
	undefined,
	// messageEvent
	new Event("message", "Event", [false, true]),
	EventTargetList.prototype.dispatch,
	jQun.set,
	jQun.toArray
);

this.CrossWindowPort = function(Port){
	function CrossWindowPort(name, _window){
		///	<summary>
		///	跨窗口通信的端口。
		///	</summary>
		///	<param name="name" type="String">端口名称。</param>
		///	<param name="_window" type="Window">通信窗口。</param>
		this.push(_window || window);
	};
	CrossWindowPort = new Class(CrossWindowPort, Port);

	CrossWindowPort.override({
		send : function(portName, value){
			///	<summary>
			///	发送信息给该窗口内指定名称的端口。
			///	</summary>
			///	<param name="portName" type="String">端口名称。</param>
			///	<param name="value" type="*">需要发送的数据值。</param>
			this.forEach(
				function(win){
					win.postMessage(this, "*");
				},
				{
					from : this.name,
					name : portName,
					type : TYPE,
					value : value
				}
			);

			return this;
		}
	});

	return CrossWindowPort;
}(
	this.Port
);

this.TransferPort = function(CrossWindowPort, Socket){
	function TransferPort(name, _window){
		///	<summary>
		///	中转端口，主要用于接收其他窗体发送来的消息，并转送到指定端口。
		///	</summary>
		///	<param name="name" type="String">端口名称。</param>
		///	<param name="_window" type="Window">中转消息的窗口。</param>
		var transferPort = this;

		attach.call(
			this,
			{
				message : function(e){
					var data = e.data, name = data.name;

					if(
						name === transferPort.name
					){
						return;
					}

					Socket.call(name, data.value, transferPort);
				}
			}
		);
	};
	TransferPort = new Class(TransferPort, CrossWindowPort);

	return TransferPort;
}(
	this.CrossWindowPort,
	this.Socket
);

}.call(
	this,
	this.EventTargetList,
	this.Event,
	// TYPE
	"__jQun.Port__",
	window,
	this.EventTargetList.prototype.attach
));

defineProperties(jQun, this);
}(
	jQun,
	jQun.Class,
	jQun.StaticClass,
	jQun.Interface,
	jQun.Enum,
	jQun.defineProperties,
	jQun.forEach
);