/*
 *  类库名称 ：jQun
 *  中文释义 ：聚集在一起的千里马
 *  文档状态 ：1.0.0.0
 *  本次修改 ：初始化jQun-node.js
 *  官方网站 ：http://www.jqunjs.com
 */

// jQun的定义
new function(global, defineProperty){

this.jQun = (function(create){
	function jQun(theConstructor, _SubperClass){
		///	<summary>
		///	生成一个继承指定父类的新生类。
		///	</summary>
		///	<param name="theConstructor" type="Function">新生类的构造函数。</param>
		///	<param name="_SubperClass" type="jQun">需要继承的父类。</param>
		var callee = arguments.callee;

		theConstructor.toString = callee.toString;
		
		return theConstructor.prototype = create(
			_SubperClass || this.getOwnClass(),
			{
				constructor : {
					value : theConstructor,
					writable : true,
					configurable : true
				}
			}
		);
	}

	return jQun;
}(
	Object.create
));

defineProperty(global, "jQun", { value : this.jQun });
}(
	global,
	Object.defineProperty
);


// 基本方法和属性的定义
new function(jQun, Object, Array, require){

this.every = (function(){
	return function(obj, fn, _this){
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
}());

this.forEach = (function(every){
	return function(obj, fn, _this){
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
));

this.define = (function(forEach, defineProperty){
	return function(obj, name, value, _descriptor){
		///	<summary>
		///	将属性添加到对象或修改现有属性的特性。
		///	</summary>
		///	<param name="obj" type="Object">对其添加或修改属性的对象。</param>
		///	<param name="name" type="String">需要添加或修改的属性名。</param>
		///	<param name="value" type="*">需要添加或修改的属性值。</param>
		///	<param name="_descriptor" type="Object">需要添加或修改的属性描述符。</param>
		var desc = { configurable : true, writable : true };

		forEach(
			_descriptor,
			function(value, name){
				desc[name] = value;
			}
		);

		if(
			_descriptor && !!(_descriptor.gettable || _descriptor.settable)
		){
			desc.get = value.get;
			desc.set = value.set;

			delete desc["writable"];
		}
		else{
			desc.value = value;
		}

		defineProperty(obj, name, desc);
		return obj;
	};
}(
	this.forEach,
	Object.defineProperty
));

this.defineProperties = (function(forEach, define){
	return function(obj, props, _descriptor){
		///	<summary>
		///	将一个或多个属性添加到对象，并/或修改现有属性的特性。
		///	</summary>
		///	<param name="obj" type="Object">对其添加或修改属性的对象。</param>
		///	<param name="props" type="Object">包含一个或多个属性的键值对。</param>
		///	<param name="_descriptor" type="Object">需要添加或修改的属性描述符。</param>
		forEach(
			props,
			function(value, name){
				define(obj, name, value, _descriptor);
			}
		);

		return obj;
	};
}(
	this.forEach,
	this.define
));

this.set = (function(forEach){
	return function(obj, props){
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
));

this.except = (function(set, forEach){
	return function(obj, props){
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
));

this.isInstanceOf = (function(getPrototypeOf){
	return function(obj, constructor){
		///	<summary>
		///	判断对象是否为指定类构造函数的一级实例（即直接由该类实例化）。
		///	</summary>
		///	<param name="obj" type="Object">用于判断的实例对象。</param>
		///	<param name="constructor" type="Function">指定的类的构造函数。</param>
		return getPrototypeOf(obj) === constructor.prototype;
	};
}(
	Object.getPrototypeOf
));

this.isPropertyOf = (function(every, getOwnPropertyNames, getOwnPropertyDescriptor){
	return function(obj, property){
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
	this.every,
	Object.getOwnPropertyNames,
	Object.getOwnPropertyDescriptor
));

this.nesting = (function(forEach){
	return function(obj, fn, _this){
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
));

this.toArray = (function(slice){
	return function(obj, _start, _end){
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
));

this.merge = (function(nesting, toArray){
	return function(obj, args){
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
			arguments.callee
		);
		
		return result;
	};
}(
	this.nesting,
	this.toArray
));

this.toString = (function(){
	return function(){
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
}());

this.prototype = (function(prototype, forEach, define, defineProperties, getPrototypeOf){
	defineProperties(
		prototype,
		{
			assign : function(props){
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
			},
			baseURI : "/",
			getOwnClass : function(){
				///	<summary>
				///	获取自身类。
				///	</summary>
				return this.constructor.prototype;
			},
			getSubperClass : function(){
				///	<summary>
				///	获取父类。
				///	</summary>
				return getPrototypeOf(this.getOwnClass());
			},
			isSubOf : function(SubperClass){
				///	<summary>
				///	判断该类是否是指定类的子孙类。
				///	</summary>
				///	<param name="SubperClass" type="jQun, Function">指定的类，或指定类的构造函数。</param>
				return this instanceof SubperClass.constructor;
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
				defineProperties(this, props, _descriptor);

				return this;
			},
			toString : function(){
				///	<summary>
				///	对象字符串。
				///	</summary>
				return "[jQun " + this.constructor.name + "]";
			}
		}
	);
	
	/*
		bug：Object.prototype.__proto__ 为 null，每个对象将自带__proto__属性，
		而新版本的chrome等浏览器并非如此。
		
		(2013.08.20)目前有些浏览器不支持，如：手机QQ浏览器，手机百度浏览器；
		(2015.01.06)目前最新版的nodejs也不支持。
	*/

	try {
		define(
			prototype,
			"__proto__",
			Object.getOwnPropertyDescriptor(
				Object.prototype,
				"__proto__"
			),
			{ settable : true, gettable : true }
		);
	}
	catch(e){}

	return prototype;
}(
	Object.create(
		null,
		{
			constructor : {
				value : jQun,
				writable : true
			}
		}
	),
	this.forEach,
	this.define,
	this.defineProperties,
	Object.getPrototypeOf
));

this.setBaseURI = (function(prototype, path){
	return function(baseURI){
		///	<summary>
		///	统一设置文件根目录，便于所有基于jQun的对象调用。
		///	</summary>
		prototype.baseURI = path.dirname(baseURI) + "/";

		return baseURI;
	};
}(
	this.prototype,
	require("path")
));

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
	require
);


// 面向对象的基础
new function(
	jQun, Function,
	getSubperClass, defineProperties, forEach, toString,
	getDescriptor, freeze, console, require,
	getArgumentsString
){

this.Class = (function(AnonymousClass, ARG_LIST_REGX, ARG_REGX, getConstructor){
	function Class(_constructor, _name, _SubperClass){
		///	<summary>
		///	派生出一个类。
		///	</summary>
		///	<param name="_constructor" type="Function">源构造函数。</param>
		///	<param name="_name" type="String">构造函数的名称。</param>
		///	<param name="_SubperClass" type="Class, Interface">需要继承的父类或接口。</param>
		var constructor = _constructor ? _constructor : AnonymousClass;

		return new jQun(
			getConstructor(
				constructor,
				_name ? _name : (constructor.name || AnonymousClass.name),
				constructor
					.toString()
					.match(
						ARG_LIST_REGX
					)[1]
					.match(
						ARG_REGX
					),
				_SubperClass ? _SubperClass.constructor.argumentNames : null
			),
			_SubperClass || this.getOwnClass()
		);
	};
	Class = new jQun(Class);

	Class.override({
		getSubperClass : function(){
			///	<summary>
			///	获取父类。
			///	</summary>
			var Subper = getSubperClass.call(this);

			return Subper === Class ? null : Subper;
		},
		toString : function(){
			///	<summary>
			///	对象字符串。
			///	</summary>
			return "[Class " + this.constructor.name + "]";
		}
	});

	return Class.constructor;
}(
	// AnonymousClass
	function AnonymousClass(){},
	// ARG_LIST_REGX
	/function[^\(]*\(([^\)]*)/,
	// ARG_REGX
	/([^\s\,]+)/g,
	// getConstructor
	function(source, name, argumentNames, parentArgumentNames){
		return defineProperties(
			getDescriptor(
				new Function([
					"return {",
						"get '" + name + "' (){",
							"var callee = arguments.callee, Subper = this.getSubperClass.call(callee.prototype);",

							"if(",
								"Subper",
							"){",
								"Subper",
									".constructor",
									".call(",
										"this",
										getArgumentsString(
											parentArgumentNames,
											argumentNames
										),
									");",
							"}",
							"return callee.source.apply(this, arguments);",
						"}",
					" };"
				].join(""))(),
				name
			).get,
			{
				argumentNames : argumentNames,
				source : source
			}
		);
	}
));

this.StaticClass = (function(AnonymousStaticClass, getConstructor){
	function StaticClass(_constructor, _name, _props, _descriptor){
		///	<summary>
		///	派生出一个静态类。
		///	</summary>
		///	<param name="_constructor" type="Function">源构造函数。</param>
		///	<param name="_name" type="String">构造函数的名称。</param>
		///	<param name="_props" type="Object">类的属性。</param>
		///	<param name="_descriptor" type="Object">被添加属性的描述符。</param>
		var CreatedStaticClass,
		
			constructor = _constructor ? _constructor : AnonymousStaticClass;

		CreatedStaticClass = new jQun(
			getConstructor(
				_name ? _name : (constructor.name || AnonymousStaticClass.name)
			),
			this.getOwnClass()
		);

		if(
			_props
		){
			CreatedStaticClass.props(_props, _descriptor);
		}

		constructor.call(CreatedStaticClass);
		return CreatedStaticClass;
	};
	StaticClass = new jQun(StaticClass);

	StaticClass.override({
		getSubperClass : function(){
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

	return StaticClass.constructor;
}(
	// AnonymousStaticClass
	function AnonymousStaticClass(){},
	// getConstructor
	function(name){
		return getDescriptor(
			new Function("return { get '" + name + "' (){} };")(),
			name
		).get;
	}
));

this.Enum = (function(every, set, hasOwnProperty){
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
			///	<param name="value" type="*">是否应该返回驼峰式的值。</param>
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

	return Enum.constructor;
}(
	jQun.every,
	jQun.set,
	Object.prototype.hasOwnProperty
));

this.Interface = (function(Class, isInstanceOf, getConstructor, getName){
	function Interface(propertyNames, _Class){
		///	<summary>
		///	定义接口。
		///	</summary>
		///	<param name="propertyNames" type="Array">该接口所规定拥有的属性名称。</param>
		///	<param name="_Class" type="Interface, Class">需要继承的父接口或父类。</param>
		if(
			!isInstanceOf(this, Interface.constructor)
		){
			return;
		}

		var NewInterface = new Class(
			getConstructor(
				propertyNames,
				(_Class || Interface).constructor.argumentNames || []
			),
			getName(propertyNames),
			_Class || Interface
		);

		defineProperties(
			NewInterface.constructor.source,
			{ toString : toString }
		);

		return freeze(NewInterface);
	};
	Interface = new jQun(Interface);

	return Interface.constructor;
}(
	this.Class,
	jQun.isInstanceOf,
	// getConstructor
	function(propertyNames, argumentNames){
		return defineProperties(
			function(){
				if(
					propertyNames.length === 0
				){
					return;
				}

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
					typeof name !== "string"
				){
					return;
				}

				throw '接口 ' + this.toString() + ' ：必须定义属性 "' + name + '" ！';
			},
			{
				toString : function(){
					return "function (" + argumentNames.join(", ") + "){}";
				}
			}
		);
	},
	// getName
	function(propertyNames){
		return "Interface [" + propertyNames.join(", ") + "]";
	}
));

this.UnopenedNamespace = (function(){
	function UnopenedNamespace(filename, _auto){
		///	<summary>
		///	表示一个尚未开辟的命名空间，当第一次作为命名空间访问时，
		/// 会根据文件路径去实例化该命名空间里的上下文，并返回一个已开辟的命名空间。
		/// 目的主要是便于管理文件路径和自动化加载文件。
		///	</summary>
		///	<param name="filename" type="String">文件路径。</param>
		///	<param name="_auto" type="Boolean">是否自动打开。</param>
		this.assign({
			auto : _auto,
			filename : filename
		});
	};
	UnopenedNamespace = new jQun(UnopenedNamespace);

	UnopenedNamespace.props({
		auto : false,
		filename : ""
	});

	return UnopenedNamespace.constructor;
}());

this.Namespace = (function(UnopenedNamespace, AP_REGEXP, array, path, define){
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
			var constructor = this.constructor;

			forEach(
				members,
				function(member, name){
					if(
						member instanceof UnopenedNamespace === false
					){
						this[name] = member;
						return;
					}

					define(
						this,
						name,
						{
							get : function(){
								if(
									array.length > 0
								){
									array
										.splice(
											0
										)
										.forEach(function(item){
											item.sub[item.name];
										});

									if(
										member.auto
									){
										return this[name];
									}
								}

								var ns = this[name] = new constructor(), filename = member.filename;

								require(
									filename.match(AP_REGEXP) ?
										filename :
										path.join(
											this.baseURI,
											filename
										)
								);

								return ns;
							},
							set : function(ns){
								define(
									this,
									name,
									ns,
									{
										enumerable : true
									}
								);
							}
						},
						{
							gettable : true,
							settable : true,
							enumerable : true
						}
					);

					if(
						!member.auto
					){
						return;
					}

					array.push(
						{ sub : this, name : name }
					);
				},
				this
			);

			return this;
		}
	});

	return Namespace.constructor;
}(
	this.UnopenedNamespace,
	// AP_REGEXP
	/^\w+:[\/\\]/i,
	// array
	[],
	require("path"),
	jQun.define
));

defineProperties(jQun, this);
}(
	jQun,
	Function,
	jQun.prototype.getSubperClass,
	jQun.defineProperties,
	jQun.forEach,
	jQun.toString,
	Object.getOwnPropertyDescriptor,
	Object.freeze,
	console,
	require,
	// getArgumentsString
	function(parentArgumentNames, argumentNames){
		if(
			parentArgumentNames === null
		){
			return "";
		}

		if(
			argumentNames === null
		){
			return "";
		}

		return parentArgumentNames
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

					return ", arguments[" + i + "]";
				}
			)
			.join("");
	}
);


new function(jQun, Class, StaticClass, Interface, Enum, forEach, defineProperties, require){

// 列表相关
(function(){
this.List = (function(NaN, define, toArray, hasOwnProperty){
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
	List = new Class(List, "jQun.List");

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
					hasOwnProperty.call(List, name)
				){
					return;
				}

				if(
					name === "toString"
				){
					return;
				}

				define(List, name, this[name]);
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

	return List.constructor;
}(
	NaN,
	jQun.define,
	jQun.toArray,
	Object.prototype.hasOwnProperty
));

}.call(
	this
));


// 与事件相关
(function(){

this.Event = (function(Date, set){
	function Event(type){
		///	<summary>
		///	事件类。
		///	</summary>
		///	<param name="type" type="String">用户自定义事件类型。</param>
		this.assign(
			{ type : type }
		);
	};
	Event = new Class(Event, "jQun.Event");

	Event.props({
		target : null,
		trigger : function(eventTarget, _attrs){
			///	<summary>
			///	触发事件。
			///	</summary>
			///	<param name="eventTarget" type="EventTarget">触发该事件的目标对象。</param>
			///	<param name="_attrs" type="Object">附加的属性键值对。</param>
			eventTarget
				.emitter
				.emit(
					this.type,
					set(
						new this.constructor(this.type),
						set(
							{
								timeStamp : new Date().getTime(),
								target : eventTarget
							},
							_attrs
						)
					)
				);

			return this;
		},
		type : null
	});

	return Event.constructor;
}(
	Date,
	jQun.set
));

this.EventTarget = (function(EventEmitter, Infinity){
	function EventTarget(){
		///	<summary>
		///	事件目标类。
		///	</summary>
		this.assign(
			{ emitter : new EventEmitter() }
		);

		// 使监听不会超出上限
		this.emitter.setMaxListeners(Infinity);
	};
	EventTarget = new Class(EventTarget, "jQun.EventTarget");

	EventTarget.props({
		attach : function(events){
			///	<summary>
			///	注册事件侦听器。
			///	</summary>
			///	<param name="events" type="Object">事件侦听器键值对。</param>
			var eventTarget = this;

			forEach(
				events,
				function(fn, type){
					this.addListener(
						type,
						function(){
							fn.apply(eventTarget, arguments);
						}
					);
				},
				this.emitter
			);

			return this;
		},
		detach : function(events){
			///	<summary>
			///	移除集合中所有的事件侦听器。
			///	</summary>
			///	<param name="events" type="Object">事件侦听器键值对。</param>
			forEach(
				events,
				function(fn, type){
					this.removeListener(type, fn);
				},
				this.emitter
			);

			return this;
		},
		dispatch : function(event, _attrs){
			///	<summary>
			///	分配事件。
			///	</summary>
			///	<param name="event" type="Event">事件。</param>
			///	<param name="_attrs" type="Object">附加的属性键值对。</param>
			event.trigger(this, _attrs);
			return this;
		},
		emitter : null
	});

	return EventTarget.constructor;
}(
	require("events").EventEmitter,
	// Infinity
	Infinity
));

}.call(
	this
));


// 与Socket相关的类
(function(EventTarget, Event, TYPE){

this.PortList = (function(List){
	function PortList(){
		///	<summary>
		///	与socket相关的端口列表。
		///	</summary>
	};
	PortList = new Class(PortList, "jQun.PortList", List.prototype);

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

	return PortList.constructor;
}(
	this.List
));

this.Socket = (function(portList){
	function Socket(){
		///	<summary>
		///	通信接口，用于管理所有的端口。
		///	</summary>
	};
	Socket = new StaticClass(Socket, "jQun.Socket");

	Socket.props({
		call : function(portName, value, _from){
			///	<summary>
			///	发送信息给指定名称的端口。
			///	</summary>
			///	<param name="portName" type="String">端口名称。</param>
			///	<param name="value" type="*">需要发送的数据值。</param>
			///	<param name="_from" type="jQun.Port">信息来源。</param>
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
			///	<param name="port" type="jQun.Port">指定的端口。</param>
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
			///	<param name="port" type="jQun.Port">指定的端口。</param>
			var index = portList.indexOfName(port.name);

			if(
				index > -1
			){
				portList[index].stop()
			}
			
			portList.push(port);
			return this;
		}
	});

	return Socket;
}(
	// portList
	new this.PortList()
));

this.Port = (function(Socket, messageEvent, attach, set){
	function Port(name){
		///	<summary>
		///	通信端口。
		///	</summary>
		///	<param name="name" type="String">端口名称。</param>
		///	<param name="_eventTarget" type="EventTarget">监听信息的目标。</param>
		///	<param name="_isArray" type="Boolean">监听目标是否为数组。</param>
		this.assign(
			{ name : name }
		);
		
		this.start();
	};
	Port = new Class(Port, "jQun.Port", EventTarget.prototype);

	Port.override({
		attach : function(events){
			///	<summary>
			///	向该端口附加事件监听。
			///	</summary>
			///	<param name="events" type="Object">事件侦听器键值对。</param>
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

					func.call(this, e);
				};
			}

			return attach.call(this, events);
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
			///	<param name="_from" type="jQun.Port">信息来源。</param>
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

	return Port.constructor;
}(
	this.Socket,
	// messageEvent
	new Event("message"),
	EventTarget.prototype.attach,
	jQun.set
));

}.call(
	this,
	this.EventTarget,
	this.Event,
	// TYPE
	"__jQun.Port__"
));


// 与存储数据相关
(function(){

this.Storage = (function(hasOwnProperty){
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
	Storage = new Class(Storage, "jQun.Storage");

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

	return Storage.constructor;
}(
	Object.prototype.hasOwnProperty
));

this.SessionCache = (function(Storage){
	function SessionCache(_duration){
		///	<summary>
		///	缓存数据。
		///	</summary>
		/// <param name="duration" type="Number">周期，以分钟计。</param>
		this.assign({
			duration : _duration,
			storage : new Storage()
		});

		this.updateTimeout();
	};
	SessionCache = new Class(SessionCache, "jQun.SessionCache");

	SessionCache.props({
		clear : function(){
			///	<summary>
			///	删除所有缓存数据。
			///	</summary>
			this.storage.clear();

			return this;
		},
		del : function(key){
			///	<summary>
			///	删除某一条缓存数据。
			///	</summary>
			/// <param name="key" type="String">缓存数据的主键。</param>
			this.storage.del(key);

			return this;
		},
		duration : 20,
		get : function(key){
			///	<summary>
			///	获取某一条缓存数据。
			///	</summary>
			/// <param name="key" type="String">缓存数据的主键。</param>
			return this.storage.get(key);
		},
		isTimeout : function(){
			///	<summary>
			///	判断该缓存是否过期。
			///	</summary>
			return this.timeout - new Date().getTime() > 0 === false;
		},
		set : function(key, value){
			///	<summary>
			///	设置某一条缓存数据。
			///	</summary>
			/// <param name="key" type="String">缓存数据的主键。</param>
			/// <param name="value" type="*">缓存数据的值。</param>
			this.storage.set(key, value);

			return this;
		},
		setDuration : function(duration){
			///	<summary>
			///	设置缓存周期。
			///	</summary>
			/// <param name="duration" type="Number">周期，以分钟计。</param>
			this.duration = duration;

			this.updateTimeout();
			return this;
		},
		storage : null,
		timeout : new Date().getTime(),
		updateTimeout : function(){
			///	<summary>
			///	更新超时时间。
			///	</summary>
			this.timeout = new Date().getTime() + this.duration * 60 * 1000;

			return this;
		}
	});

	return SessionCache.constructor;
}(
	this.Storage
));

}.call(
	this
));


// 与字符串处理有关的类
(function(){

this.VerificationRegExpString = (function(EMAILS, WEB_URLS, toPerfectMatchString){
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
));

this.Text = (function(Array, T_REGX, encodeURIComponent){
	function Text(text){
		///	<summary>
		///	用于操作字符串文本的类。
		///	</summary>
		///	<param name="text" type="String, Array">字符串文本。</param>
		this.assign({
			text : text instanceof Array ? text.join("") : text
		});
	};
	Text = new Class(Text, "jQun.Text");

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

	return Text.constructor;
}(
	Array,
	// T_REGX
	/\{\s*(?:\?([^\{\}\s]{1}))?\s*([^\{\}]*?)\s*\}/g,
	encodeURIComponent
));

this.HTML = (function(Function, SPACE_REGEXP, FOR_REGEXP, WORD_TEXT, replace, toArray, console){
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
	HTML = new Class(HTML, "jQun.HTML");

	HTML.props({
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

	return HTML.constructor;
}(
	Function,
	// SPACE_REGEXP => space(查找特殊的空白字符)
	/[\r\t\n]/g,
	// FOR_REGEXP => for(查找for语句)
	/@for\s*\(([\s\S]+?)(?:\s*->>\s*([\s\S]+?))*?\)\s*\{/g,
	// WORD_TEXT
	"');this.push(typeof ({word}) === 'undefined' ? ({shouldEmpty} ? '' : '{word}') : {word});this.push('",
	this.Text.prototype.replace,
	jQun.toArray,
	console
));

this.Verification = (function(VerificationRegExpString, RegExp){
	function Verification(){
		///	<summary>
		///	验证。
		///	</summary>
	};
	Verification = new StaticClass(Verification, "jQun.Verification");

	Verification.props({
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
));

}.call(
	this
));



// 与Ajax相关
(function(){

this.ConnectionMethods = (function(){
	return new Enum(
		[ "Get", "Post" ]
	);
}());

this.ResponseTypes = (function(){
	return new Enum(
		[ "Text", "Json" ]
	);
}());


this.RequestConnection = (function(ConnectionMethods, ResponseTypes, http, url, querystring, set, parse, implements){
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
	RequestConnection = new Class(RequestConnection, "jQun.RequestConnection");

	RequestConnection.props({
		Interface : null,
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
			var request, method = this.method, responseType = this.responseType;

			implements(this.Interface, params);

			params = set({}, params);
			params[this.key] = this.name;

			request = http.request(
				set(
					url.parse(
						this.url +
						(
							method === ConnectionMethods.Post ?
								"" :
								"?" + querystring.stringify(params)
						)
					),
					{
						method : ConnectionMethods.getNameByValue(method),
						headers : {
							 "Content-Type" : "application/x-www-form-urlencoded"
						}
					}
				),
				_load ?
					function(response){
						response.setEncoding("utf-8");

						response.on(
							"data",
							function(data){
								_load(responseType === ResponseTypes.Json ? parse(data) : data);
							}
						);
					} :
					null
			);

			if(
				_error
			){
				request.on("error", _error);
			}

			if(
				method === ConnectionMethods.Post
			){
				request.write(
					querystring.stringify(params)
				);
			}

			if(
				_beforeSend
			){
				_beforeSend(request);
			}

			request.end();
			return request;
		},
		responseType : ResponseTypes.Json,
		url : ""
	});

	return RequestConnection.constructor;
}(
	this.ConnectionMethods,
	this.ResponseTypes,
	require("http"),
	require("url"),
	require("querystring"),
	jQun.set,
	JSON.parse,
	// implements
	function(Interface, params){
		if(
			!Interface
		){
			return;
		}

		new (
			new Class(
				null,
				"jQun.Ajax.CheckParameters",
				Interface
			)
			.props(params)
			.constructor
		);
	}
));

this.Ajax = (function(Storage, RequestConnection, ResponseTypes){
	function Ajax(){
		///	<summary>
		///	ajax异步类。
		///	</summary>
	};
	Ajax = new StaticClass(Ajax, "jQun.Ajax", { enabled : false });

	Ajax.props({
		defaultKey : "",
		open : function(name, params, _load, _error, _beforeSend){
			///	<summary>
			///	打开指定名称的请求连接。
			///	</summary>
			///	<param name="name" type="String">连接名称。</param>
			///	<param name="params" type="Object">url的替换参数及post方法的传递参数。</param>
			///	<param name="_load" type="Function">异步完成后所执行的回调函数。</param>
			///	<param name="_error" type="Function">异步报错所执行的回调函数。</param>
			///	<param name="_beforeSend" type="Function">在发送请求之前的回调函数。</param>
			var requestConnection = this.requestStorage.get(name);

			if(
				!requestConnection
			){
				throw 'Ajax请求信息错误：请检查连接名称"' + name + '"是否正确。';
				return null;
			}

			return requestConnection.open(params, _load, _error, _beforeSend);
		},
		requestStorage : new Storage(),
		requestURLPrefix : "http://localhost/",
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
	this.Storage,
	this.RequestConnection,
	this.ResponseTypes
));

}.call(
	this
));


// 与路由相关
(function(Storage, Text, Date, path, url, querystring, crypto, round, random){

this.MimeTypes = (function(){
	return new Enum({
		htm : "text/html",
		html : "text/html",
		css : "text/css",
		js : "text/javascript",
		txt : "text/plain",
		xml : "text/xml",
		md : "text/plain",
		ico : "image/x-icon",
		gif : "image/gif",
		jpeg : "image/jpeg",
		jpg : "image/jpeg",
		png : "image/png",
		bmp : "image/bmp",
		svg : "image/svg+xml",
		pdf : "application/pdf",
		xhtml : "application/xhtml+xml",
		swf : "application/x-shockwave-flash",
		wav : "audio/x-wav",
		wma : "audio/x-ms-wma",
		m4a : "audio/mp4",
		mp3 : "audio/mpeg",
		flv : "video/x-flv",
		mp4 : "video/mp4",
		mp4v : "video/mp4",
		wmv : "video/x-ms-wmv",
		ogg : "video/ogg",
		otf : "font/otf",
		woff : "font/x-woff"
	});
}());

this.RouteEvent = (function(Event, SessionCache, storage, count, getSessionName, createSessionName){
	function RouteEvent(type){
		///	<summary>
		///	路由事件类。
		///	</summary>
		///	<param name="type" type="String">用户自定义事件类型。</param>
	};
	RouteEvent = new Class(RouteEvent, "jQun.RouteEvent", Event.prototype);

	RouteEvent.props({
		error : "",
		request : null,
		response : null,
		status : 200,
		url : null
	});

	RouteEvent.props({
		basename : {
			get : function(){
				return path.basename(this.pathname);
			}
		},
		dirname : {
			get : function(){
				return path.dirname(this.pathname);
			}
		},
		extname : {
			get : function(){
				return path.extname(this.pathname);
			}
		},
		mimeType : {
			get : function(){
				var mimeType = "", extname = this.extname.toLowerCase().substring(1);

				this.target
					.mimeTypesList
					.every(function(MimeTypesEnum){
						if(
							MimeTypesEnum.has(extname)
						){
							mimeType = MimeTypesEnum[extname];
							return false;
						}

						return true
					});

				return mimeType;
			}
		},
		pathname : {
			get : function(){
				return this.url.pathname;
			}
		},
		session : {
			get : function(){
				var sessionName, sessionCache, shouldReset = false;

				sessionName = getSessionName(this);

				if(
					sessionName
				){
					sessionCache = storage.get(sessionName);

					if(
						sessionCache
					){
						if(
							sessionCache.isTimeout()
						){
							if(
								storage.del(sessionName)
							){
								count--;
							}

							shouldReset = true;
						}
						else {
							sessionCache.updateTimeout();
						}
					}
					else {
						shouldReset = true;
					}
				}
				else {
					shouldReset = true;
				}

				if(
					shouldReset
				){
					sessionName = createSessionName();
					sessionCache = new SessionCache();

					storage.set(sessionName, sessionCache);
					count++;
				}

				this.response.setHeader("Set-Cookie", "sessionName=" + sessionName);
				return sessionCache;
			}
		}
	}, { gettable : true });

	return RouteEvent.constructor;
}(
	this.Event,
	this.SessionCache,
	// storage
	new Storage(),
	// count
	0,
	// getSessionName
	function(routeEvent){
		return querystring
				.parse(
					(
						routeEvent
							.request
							.headers
							.cookie || ""
					)
					.replace(
						/\&/g,
						"%26"
					)
					.replace(
						/\s*;\s*/g,
						"&"
					)
				)
				.sessionName;
	},
	// createSessionName
	function(){
		return crypto
				.createHash(
					"md5"
				)
				.update(
					(
						new Date().getTime() + round(random() * 9999)
					)
					.toString()
				)
				.digest("hex");
	},
	// gc
	function(){
		
	}
));

this.Route = (function(EventTarget, RegExp, MimeTypes, accessEvent, errEvent, ruleText){
	function Route(ruleRegexp){
		///	<summary>
		///	路由。
		///	</summary>
		///	<param name="ruleRegexp" type="RegExp, String">路由规则正则或字符串。</param>
		var regexp;

		if(
			ruleRegexp instanceof RegExp
		){
			regexp = ruleRegexp;
		}
		else {
			regexp = new RegExp(
				ruleText.replace({ rule : ruleRegexp }),
				"i"
			);
		}

		this.assign({
			mimeTypesList : [MimeTypes],
			regexp : regexp
		});
	};
	Route = new Class(Route, "jQun.Route", EventTarget.prototype);

	Route.props({
		access : function(request, response, _url){
			///	<summary>
			///	进入路由。
			///	</summary>
			///	<param name="request" type="ClientRequest">客户端请求对象。</param>
			///	<param name="response" type="ServerResponse">服务端响应对象。</param>
			///	<param name="_url" type="Object">请求地址信息的解析对象。</param>
			this.dispatch(
				accessEvent,
				{
					request : request,
					response : response,
					url : _url ? _url : url.parse(request.url)
				}
			);

			return this;
		},
		addMimeTypes : function(MimeTypesEnum){
			///	<summary>
			///	添加文件类型。
			///	</summary>
			///	<param name="MimeTypesEnum" type="Enum">文件类型枚举。</param>
			this.mimeTypesList.push(MimeTypesEnum);

			return this;
		},
		check : function(pathname){
			///	<summary>
			///	核对指定路径是否满足当前路由的筛选要求。
			///	</summary>
			return !!pathname.match(this.regexp);
		},
		error : function(request, response, status, error, _url){
			///	<summary>
			///	通告错误。
			///	</summary>
			///	<param name="request" type="ClientRequest">客户端请求对象。</param>
			///	<param name="response" type="ServerResponse">服务端响应对象。</param>
			///	<param name="status" type="Number">错误状态码</param>
			///	<param name="error" type="String">错误信息。</param>
			///	<param name="_url" type="Object">请求地址信息的解析对象。</param>
			this.dispatch(
				errEvent,
				{
					request : request,
					response : response,
					url : _url ? _url : url.parse(request.url),
					error : error,
					status : status
				}
			);

			return this;
		},
		mimeTypesList : null,
		regexp : null
	});

	return Route.constructor;
}(
	this.EventTarget,
	RegExp,
	this.MimeTypes,
	// accessEvent
	new this.RouteEvent("access"),
	// errEvent
	new this.RouteEvent("err"),
	// ruleText
	new Text("^(?:/)?{rule}[^/]*$")
));

this.StaticRoute = (function(Route, MimeTypes, fileSystem){
	function StaticRoute(ruleRegexp, _path){
		///	<summary>
		///	静态路由，此目录下的文件将作为静态文件返回。
		///	</summary>
		///	<param name="ruleRegexp" type="RegExp, String">路由规则正则或字符串。</param>
		///	<param name="_path" type="String">模拟伪静态地址时所需提供指定真实的文件路径。</param>
		var baseURI = this.baseURI;

		this.attach({
			access : function(e){
				var mimeType = e.mimeType, response = e.response;

				if(
					mimeType === ""
				){
					this.error(e.request, response, 404, "不安全的文件类型传输..", e.url);
					response.end();
					return;
				}

				var content;

				response.writeHead(
					200,
					{ "Content-Type" : mimeType }
				);

				try {
					content = fileSystem.readFileSync(
						path.join(baseURI, _path || "", e.pathname)
					);
				}
				catch(ex){
					this.error(e.request, response, 404, "找不到指定文件..", e.url);
					response.end();
					return;
				}
				
				response.write(content);
				response.end();
			}
		});
	};
	StaticRoute = new Class(StaticRoute, "jQun.StaticRoute", Route.prototype);

	return StaticRoute.constructor;
}(
	this.Route,
	this.MimeTypes,
	require("fs")
));

this.RouteList = (function(List){
	function RouteList(){
		///	<summary>
		///	路由集合列表。
		///	</summary>
	};
	RouteList = new Class(RouteList, "jQun.RouteList", List.prototype);

	RouteList.props({
		indexOfPathname : function(pathname){
			///	<summary>
			///	根据指定路径检索路由。
			///	</summary>
			///	<param name="pathname" type="String">指定的路径。</param>
			var index = -1;

			this.every(function(route, i){
				if(
					route.check(pathname)
				){
					index = i;
					return false;
				}

				return true;
			});

			return index;
		}
	});

	return RouteList.constructor;
}(
	this.List
));

this.Router = (function(ConnectionMethods, Infinity, process, routeList, set){
	function Router(){
		///	<summary>
		///	路由(管理)器。
		///	</summary>
		process.on(
			"uncaughtException",
			function(error){
				console.log(error);
			}
		);

		process.setMaxListeners(Infinity);
	};
	Router = new StaticClass(Router, "jQun.Router");

	Router.props({
		add : function(route){
			///	<summary>
			///	添加路由。
			///	</summary>
			///	<param name="route" type="Route">需要添加的路由。</param>
			routeList.push(route);
			
			return this;
		},
		clear : function(){
			///	<summary>
			///	清除所有路由。
			///	</summary>
			routeList.clear();

			return this;
		},
		receive : function(request, response, _shouldKeepQueryString){
			///	<summary>
			///	接受并处理服务器信息。
			///	</summary>
			///	<param name="request" type="ClientRequest">客户端请求对象。</param>
			///	<param name="response" type="ServerResponse">服务端响应对象。</param>
			///	<param name="_shouldKeepQueryString" type="Boolean">是否保持url的查询字符串状态。</param>
			var urlJson = url.parse(request.url, !_shouldKeepQueryString),

				index = routeList.indexOfPathname(urlJson.pathname);

			if(
				index === -1
			){
				response.end();
				return false;
			}

			var data = "";

			response.setHeader("Content-Type", "text/plain;charset=utf-8");

			request.addListener(
				"end",
				function(){
					if(
						_shouldKeepQueryString
					){
						urlJson.query += (data ? "&" : "") + data;
					}
					else {
						set(
							urlJson.query,
							querystring.parse(data)
						);
					}

					request.removeListener("end", arguments.callee);
					routeList[index].access(request, response, urlJson);
				}
			);

			if(
				request.method.toLowerCase() === ConnectionMethods.getNameByValue(ConnectionMethods.Post)
			){
				request.on(
					"data",
					function(dt){
						data += dt;
					}
				);
			}
			else {
				request.emit("end");
			}
			
			return true;
		},
		remove : function(route){
			///	<summary>
			///	移除路由。
			///	</summary>
			///	<param name="route" type="Route">需要移除的路由。</param>
			var index = routeList.indexOf(route);

			if(
				index > -1
			){
				routeList.splice(index, 1);
				return true;
			}

			return false;
		}
	});

	return Router;
}(
	this.ConnectionMethods,
	Infinity,
	process,
	// routeList
	new this.RouteList(),
	jQun.set
));

}.call(
	this,
	this.Storage,
	this.Text,
	Date,
	require("path"),
	require("url"),
	require("querystring"),
	require("crypto"),
	Math.round,
	Math.random
));


defineProperties(jQun, this);
}(
	jQun,
	jQun.Class,
	jQun.StaticClass,
	jQun.Interface,
	jQun.Enum,
	jQun.forEach,
	jQun.defineProperties,
	require
);