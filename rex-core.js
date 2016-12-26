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
			case "function":
				__proto__ = _SuperClass;
				prototype = _SuperClass.prototype;
				break;

			// 如果是 undefined
			case "undefined":
				__proto__ = Rexjs.getOwnPrototype();
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

this.constructor = function(constructor, call, apply, bind, toString, getOwnPrototype, defineProperties){
	defineProperties(
		definePrototype(
			// 兼容 ： IE9、IE10、Android
			getOwnPrototype.call(constructor)
		),
		{
			apply: apply,
			bind: bind,
			call: call,
			getOwnPrototype: getOwnPrototype,
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
	 * @param {Boolean} _arrayLike - 对象是否是一种伪数组
	 */
	return function every(obj, fn, _this, _arrayLike){
		// 如果是数组
		if(
			_arrayLike
		){
			for(
				var i = 0, n = obj.length;i < n;i++
			){
				// 调用测试函数
				if(
					fn.call(_this, obj[i], i, obj)
				){
					continue;
				}
				
				return false;
			}
		}
		else {
			// 遍历
			for(
				var name in obj
			){
				// 调用测试函数
				if(
					fn.call(_this, obj[name], name, obj)
				){
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
		if(
			_arrayLike
		){
			for(
				var i = 0, n = obj.length;i < n;i++
			){
				// 调用测试函数
				fn.call(_this, obj[i], i, obj)
			}
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
void function(isNaN){

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
		length: 0
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

	return List;
}(
	Array,
	Object,
	Rexjs.toArray
);

}.call(
	this
);


// 变量名集合相关
void function(){

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

this.VariableCollection = function(){
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
		contain: function(variable){
			for(
				var i = 0, j = this.length;i < j;i++
			){
				// 如果变量名相同
				if(
					this[i] === variable
				){
					return true;
				}
			}

			return false;
		},
		length: 0,
		/**
		 * 转化为字符串
		 * @param {String} before - 变量之前的字符串
		 * @param {String} join - 变量连接字符串
		 * @param {String} after - 变量之后的字符串
		 */
		toString: function(before, join, after){
			var length = this.length;

			// 如果有效长度是 0
			if(
				length === 0
			){
				return "";
			}

			var result = before + this[0];

			for(
				var i = 1;i < length;i++
			){
				// 拼接连接符
				result += join;
				// 拼接变量名
				result += this[i];
			}

			return result + after;
		}
	});

	return VariableCollection;
}();

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
		/**
		 * 生成一个变量名
		 */
		generate: function(){
			var index = this.index, variable = PREFIX + index.value;

			index.increase();
			return variable;
		},
		index: 0
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
void function(){

this.File = function(){
	/**
	 * 文件信息
	 * @param {String} filename - 文件名
	 * @param {String} source - 源文件内容
	 */
	function File(filename, source){
		this.filename = filename;
		this.source = source;
	};
	File = new Rexjs(File);
	
	File.props({
		filename: "",
		source: ""
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
		content: "",
		position: 0,
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
		 * 追加内容上下文，同时会更新 source map
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

}.call(
	this
);


// 映射生成器相关
void function(ContentBuilder){

this.Base64VLQ = function(base64, parseInt){
	/**
	 * base64 VLQ 编码
	 */
	function Base64VLQ(){};
	Base64VLQ = new Rexjs(Base64VLQ);
	
	Base64VLQ.static({
		/**
		 * 将指定数字进行 base64 VLQ 编码
		 * @param {Number} num - 所需提供的数字
		 */
		encode: function(num){
			// 将数字转化为二进制，并在后面加 0，表示正数
			var result = "", binary = num.toString(2) + "0", length = binary.length;
			
			// 字符串从后往前逆序循环，当长度大于 5 时
			while(
				length > 5
			){
				// 拼接结果
				result += base64[
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
			result += base64[
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
	
	return Base64VLQ;
}(
	// base64
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
	parseInt
);

this.MappingPosition = function(Position){
	/**
	 * 映射生成器中所记录的位置
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

this.MappingBuilder = function(MappingPosition, Base64VLQ, JSON, appendContext, appendString, complete, merge, newline, btoa){
	/**
	 * 映射生成器
	 * @param {File} file - 生成器相关文件
	 */
	function MappingBuilder(file){
		ContentBuilder.call(this);
		
		this.file = file;
		this.position = new MappingPosition();
	};
	MappingBuilder = new Rexjs(MappingBuilder, ContentBuilder);
	
	MappingBuilder.static({
		supported: !!btoa
	});
	
	MappingBuilder.props({
		/**
		 * 追加内容上下文，同时会更新 source map
		 * @param {Context} context - 标签内容上下文
		 */
		appendContext: function(context){
			var contextPosition = context.position, builderPosition = this.position,
			
				line = contextPosition.line, column = contextPosition.column,
				
				generatedColumnDiff = builderPosition.generatedColumnDiff;
				
			// 如果不是空行
			if(
				builderPosition.generatedLineOffset !== builderPosition.generatedColumnOffset
			){
				// 追加逗号
				this.appendMappings(",");
			}
			
			// 追加映射当前信息
			this.appendMappings(
				Base64VLQ.encode(generatedColumnDiff) +
				"A" +
				Base64VLQ.encode(line - builderPosition.line) +
				Base64VLQ.encode(line === builderPosition.line ? column - builderPosition.column : column)
			);
			
			// 记录源码的行
			builderPosition.line = line;
			// 记录源码的列
			builderPosition.column = column;
			// 记录列的偏移量
			builderPosition.generatedColumnOffset += generatedColumnDiff;
			// 清空列的差值
			builderPosition.generatedColumnDiff = 0;

			// 调用父类方法
			appendContext.call(this, context);
		},
		/**
		 * 追加映射内容
		 * @param {String} mappings - 映射内容
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
			var filename = this.file.filename;
			
			// 追加新行
			this.newline();

			// 追加 sourceURL
			this.appendString("//# sourceURL=http://rexjs.org/" + filename);
			
			// 如果 btoa 存在，则添加 mappingURL，否则不支持 btao 的环境，应该也不会支持 source map
			if(
				btoa
			){
				// 追加新行
				this.newline();

				// 追加 mappingURL 头部
				this.appendString("//# sourceMappingURL=data:application/json;base64,");
				
				// 追加 mappingURL 主体
				this.appendString(
					btoa(
						JSON.stringify({
							sources: [ filename ],
							names: [],
							mappings: this.mappings
						})
					)
				);
			}
			
			// 返回结果
			return complete.call(this);
		},
		file: null,
		mappings: "",
		/**
		 * 追加新行
		 */
		newline: function(){
			var position = this.position;
			
			// 给 mappings 添加分号，表示新行的开始
			this.appendMappings(";");
			// 追加换行符
			newline.call(this);
			
			// 设置便宜量
			position.generatedLineOffset = position.generatedColumnOffset += position.generatedColumnDiff;
			// 清空差值
			position.generatedLineDiff = position.generatedColumnDiff = 0;
		},
		position: null
	});
	
	return MappingBuilder;
}(
	this.MappingPosition,
	this.Base64VLQ,
	JSON,
	ContentBuilder.prototype.appendContext,
	ContentBuilder.prototype.appendString,
	ContentBuilder.prototype.complete,
	ContentBuilder.prototype.merge,
	ContentBuilder.prototype.newline,
	typeof btoa === "undefined" ? null : btoa
);

}.call(
	this,
	this.ContentBuilder
);


// 语法相关
void function(){

this.SyntaxElement = function(){
	/**
	 * 语法元素
	 */
	function SyntaxElement(){};
	SyntaxElement = new Rexjs(SyntaxElement);
	
	SyntaxElement.props({
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){}
	});
	
	return SyntaxElement;
}();

this.SyntaxConfigItem = function(){
	/**
	 * 语法配置项
	 * @param {String} key - 配置项的键
	 * @param {Boolean} value - 配置项的值
	 */
	function SyntaxConfigItem(key, value){
		this.key = key;
		this.value = value;
	};
	SyntaxConfigItem = new Rexjs(SyntaxConfigItem);

	SyntaxConfigItem.props({
		key: "",
		value: true
	});

	return SyntaxConfigItem;
}();

this.SyntaxConfig = function(SyntaxConfigItem){
	/**
	 * 语法配置，用于管理是否编译指定表达式
	 */
	function SyntaxConfig(){
		// 遍历所有参数
		forEach(
			arguments,
			function(item){
				// 如果是 SyntaxConfigItem 的实例
				if(
					item instanceof SyntaxConfigItem
				){
					// 记录配置
					this[item.key] = item.value;
					return;
				}

				// 记录配置
				this[item] = true;
			},
			this,
			true
		);
	};
	SyntaxConfig = new Rexjs(SyntaxConfig);

	return SyntaxConfig;
}(
	this.SyntaxConfigItem
);

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
		 * 重新编辑表达式
		 * @param {RegExp} regexp - 新的表达式
		 */
		compile: function(regexp){
			this.originalRegExp = regexp;
		},
		/**
		 * 执行正则表达式进行匹配
		 * @param {RegExp} regexp - 初始化的表达式
		 * @param {String} source - 需要匹配的源代码内容字符串
		 * @param {Function} regexpCallback - 正则表达式匹配出来的回调函数
		 */
		exec: function(regexp, source, callback){
			var result, content = "", diff = 0, index = -1, lastIndex = this.lastIndex;

			// 编译表达式
			this.compile(regexp);
			
			// 初始化
			this.lastIndex = 0;
			
			for(
				;;
			){
				regexp = this.originalRegExp;
				regexp.lastIndex = lastIndex = this.lastIndex;
				result = regexp.exec(source);

				// 如果没匹配到结果
				if(
					result === null
				){
					// 跳出循环
					break;
				}
				
				diff = result.index - lastIndex;
				
				// 存在中间未捕获的内容
				if(
					diff === 0
				){
					content = result[0];
					index = result.lastIndexOf("") - 1;
				}
				else {
					// 取第一个字符
					content = source[lastIndex];
					index = -1;
				}

				// 进行回调
				callback.call(this, content, index);

				// 计算 lastIndex
				this.lastIndex += content.length;
			}

			// 如果成立，说明已经没有未处理的代码
			if(
				this.lastIndex >= source.length
			){
				return;
			}
			
			// 剩余子字符串处理
			content = source.substring(this.lastIndex);
			index = -1;
			
			// 进行回调
			callback.call(this, content, index);

			// 计算 lastIndex
			this.lastIndex += content.length;
		},
		lastIndex: 0,
		originalRegExp: /(?:)/
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
void function(){

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
void function(TagData, parseInt){

this.TagClass = function(CLASS_NONE, CLASS_STATEMENT, CLASS_STATEMENT_BEGIN, CLASS_STATEMENT_END, CLASS_EXPRESSION, CLASS_EXPRESSION_CONTEXT){
	/**
	 * 标签类别
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
		// 无标签分类
		CLASS_NONE: CLASS_NONE,
		// 表达式标签类别
		CLASS_EXPRESSION: CLASS_EXPRESSION,
		// 表达式上下文标签类别
		CLASS_EXPRESSION_CONTEXT: CLASS_EXPRESSION_CONTEXT,
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

this.TagType = function(TYPE_MATCHABLE, TYPE_UNEXPECTED, TYPE_MISTAKABLE, TYPE_ILLEGAL){
	/**
	 * 标签类型
	 * @param {Number} value - 标签类型
	 */
	function TagType(value){
		TagData.call(this, value);

		this.illegal = (value & TYPE_ILLEGAL) === TYPE_ILLEGAL;
		this.matchable = (value & TYPE_MATCHABLE) === TYPE_MATCHABLE;
		this.mistakable = (value & TYPE_MISTAKABLE) === TYPE_MISTAKABLE;
		this.unexpected = (value & TYPE_UNEXPECTED) === TYPE_UNEXPECTED;
	};
	TagType = new Rexjs(TagType);

	TagType.static({
		// 非法标签类型
		TYPE_ILLEGAL: TYPE_ILLEGAL,
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
		 * 获取绑定的标签，该标签一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return null;
		},
		class: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(content);
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
		visitor: function(parser, context, statement, statements){}
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
void function(SyntaxTag){

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
	
	LineTerminatorTag.props({
		regexp: /[\r\n\u2028\u2029]/,
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
void function(SyntaxTag, RegExp){

this.SyntaxTags = function(List, getSortedValue, distinct){
	/**
	 * 语法标签列表
	 */
	function SyntaxTags(){
		List.call(this);
	};
	SyntaxTags = new Rexjs(SyntaxTags, List);

	SyntaxTags.props({
		entrance: false,
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			return false;
		},
		id: "",
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
		 * 注册添加语法标签，与 push 方法不同的是，register 会进过过滤器，而 push 不会
		 */
		register: function(_rest){
			forEach(
				arguments,
				function(obj){
					// 如果对象也是一个标签列表
					if(
						obj instanceof SyntaxTags
					){
						// 再次调用注册方法
						this.register.apply(this, obj);
						return;
					}

					// 检查是否应该过滤该标签
					if(
						this.filter(obj)
					){
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
	this.List,
	// getSortedValue
	function(copy, tag1, tag2, property, value, _bothNot){
		var type1 = tag1.type, type2 = tag2.type;

		switch(
			value
		){
			// 如果第一个类型属性值为 value
			case type1[property]:
				// 如果第二个类型属性值不为 value
				if(
					type2[property] !== value
				){
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
				if(
					_bothNot
				){
					break;
				}

				// 进行下一个属性的比较
				return 0;
		}

		// 如果 tag1 的排序更大
		if(
			tag1.order - tag2.order > 0
		){
			// 将 tag1 插入到 tag2 前面
			return -1;
		}
		
		// 如果 tag2 的排序更大
		if(
			tag1.order - tag2.order < 0
		){
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
					if(
						regexp === null
					){
						tags[-1] = tag;
						return;
					}
					
					var source = regexp.source;
					
					// 如果已经存在
					if(
						this(source)
					){
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
	function DefaultTags(_id){
		SyntaxTags.call(this, _id);
		
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
		 * @param {SyntaxTags} tags - 需要映射的标签列表
		 */
		map: function(tags){
			// 标签列表就绪
			tags.ready();
			
			// 如果是入口标签列表
			if(
				tags.entrance
			){
				// 设置入口标签
				this.entranceTags = tags;
			}
			
			// 根据 id 设置标签列表
			this[tags.id] = tags;
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
void function(SyntaxElement, SyntaxTag){

this.Expression = function(SyntaxConfig, parseInt){
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
		// 语句结束状态，当进行语句连接时，应该在两语句之间加语句连接符（如分号等）
		STATE_STATEMENT_END: parseInt(1110, 2),
		// 语句已结束状态，当进行语句连接时，不需要再加语句连接符（如分号等）
		STATE_STATEMENT_ENDED: parseInt(11110, 2),
		config: new SyntaxConfig()
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
	this.SyntaxConfig,
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
		FLOW_INHERIT: parseInt(10, 2),
		FLOW_BRANCH: parseInt(100, 2),
		FLOW_LINEAR: parseInt(1100, 2),
		FLOW_CIRCULAR: parseInt(10100, 2)
	});
	
	Statement.props({
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
		flow: Statement.FLOW_INHERIT,
		/**
		 * 跳出该语句
		 */
		out: function(){
			var target = this.target;

			// 记录当前表达式的状态
			target.expression.state = this.expression.state;
			// 恢复语句
			this.statements.statement = target;

			// 返回目标语句的表达式
			return target.expression;
		},
		statements: null,
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
	 */
	function Statements(target){
		SyntaxElement.call(this);
		
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
			for(
				var i = this.min, j = this.length;i < j;i++
			){
				var statement = this[i];

				// 提取语句
				statement.extractTo(contentBuilder);

				// 如果表达式状态是 STATE_STATEMENT_ENDED，则说明不需要加语句连接符
				if(
					(statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED
				){
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
	this.SyntaxTag
);


// 其他表达式
void function(Expression){

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

this.ListExpression = function(DefaultExpression){
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
			this[this.length++] = expression;
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, _anotherBuilder){
			var min = this.min, length = this.length;

			// 如果长度小于等于最小索引值
			if(
				length <= min
			){
				return;
			}

			var join = this.join;

			// 先提取第一项
			this[min].extractTo(contentBuilder, _anotherBuilder);

			// 遍历项
			for(
				var i = min + 1, j = length;i < j;i++
			){
				// 添加表达式连接符
				contentBuilder.appendString(join);

				// 提取项表达式
				this[i].extractTo(contentBuilder, _anotherBuilder);
			}
		},
		join: "",
		length: 0,
		min: 0,
		/**
		 * 设置表达式，与 add 不同，当 expession 为 DefaultExpression 实例时，会忽略该操作
		 * @param {Expression} expression - 需要添加的表达式
		 */
		set: function(expression){
			// 如果是默认表达式
			if(
				expression instanceof DefaultExpression
			){
				return;
			}

			// 添加表达式
			this.add(expression);
		}
	});
	
	return ListExpression;
}(
	this.DefaultExpression
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

this.PartnerExpression = function(end, endWith){
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
}(
	Expression.prototype.end,
	Expression.prototype.endWith
);

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
void function(Expression, ListExpression, LeftHandSideExpression, STATE_STATEMENT_ENDABLE){

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
		if(
			MappingBuilder.supported
		){
			// 生成源文件 map
			e(
				new MappingBuilder(file).complete()
			);
		}

		// 如果是引用错误
		if(
			_reference
		){
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

			return (this.reference ? "Reference" : "Syntax") + "Error: " + this.description + " @ " + this.file.filename + ":" + (position.line + 1) + ":" + (position.column + 1);
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
		if(
			!(info instanceof Expression)
		){
			// 认为是 context，直接返回
			return info;
		}

		var expression = info;

		for(
			;;
		){
			// 如果是列表表达式
			if(
				info instanceof ListExpression
			){
				// 如果长度为 0
				if(
					info.length > 0
				){
					// 记录表达式
					expression = info;
					// 取第一项
					info = info[0];
					continue;
				}
			}
			// 如果是左侧表达式
			else if(
				info instanceof LeftHandSideExpression
			){
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
		 * 将解析后的语法生成字符串
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 */
		build: function(_contentBuilder){
			var contentBuilder = _contentBuilder || new ContentBuilder();
			
			this.statements.extractTo(contentBuilder);
			return contentBuilder.complete();
		},
		details: null,
		/**
		 * 报错
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
		 * 开始解析
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
			// 清空错误
			this.details = null;
			// 初始化语句
			this.statements = statements;
			
			// 执行表达式
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
					if(
						tag.type.unexpected
					){
						// 如果表达式存在，则进入异常捕获处理
						context.tag = tag = toTryCatch(parser, context, tag, parser.statements);
					}

					// 获取语句块
					statements = parser.statements;
					
					// 访问标签
					tag.visitor(parser, context, statements.statement, statements);
					
					// 编译正则
					this.compile(
						(
							// 获取需要匹配的标签集合
							tags = tag.require(tagsMap, tags, parser)
						)
						.regexp
					);
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
		if(
			statement.expression
		){
			var tagClass = tag.class, tagType = tag.type, mistakable = tagType.mistakable;

			if(
				// 如果标签是可能被误解的而且是语句标签 或 标签是合法的非误解标签
				mistakable ? tagClass.statement : !tagType.illegal
			){
				for(
					;;
				){
					// 获取 catch 所返回的标签
					var t = statement.catch(parser, context);

					// 如果标签存在
					if(
						t
					){
						// 返回该标签
						return t;
					}

					// 获取当前语句
					var s = (statements = parser.statements).statement;

					// 如果等于当前语句
					if(
						statement === s
					){
						// 获取 target
						s = statement.target;

						// 如果 target 存在
						if(
							s
						){
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
				if(
					mistakable
				){
					// 如果是语句结束标签
					if(
						tagClass.statementEnd
					){
						// 返回标签
						return tag;
					}

					// 如果表达式可以结束
					if(
						(statements.statement.expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE
					){
						// 创建新语句，这里不能直接用 statements，因为在上面可能当前语句块已经发生改变
						statements.newStatement();
						// 返回标签
						return tag;
					}
				}

				// 跳出外层语句块
				break outerBlock;
			}

			// 如果是可误解的，且不是语句标签（上面的判断保证了一定不是语句标签）
			if(
				mistakable
			){
				// 如果语句存在
				while(
					statement
				){
					// 获取 try 所返回的标签
					var t = statement.try(parser, context);

					// 如果标签存在
					if(
						t
					){
						// 返回该标签
						return t;
					}

					// 获取当前语句
					var s = parser.statements.statement;

					// 如果等于当前语句，说明没有跳出语句
					if(
						statement === s
					){
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


// 解析器测试相关
void function(File){

this.SimpleTest = function(INNER_CONTENT_REGEXP, file, console, toArray, e, catchErrors){
	/**
	 * 解析器测试
	 * @param {SyntaxParser} parser - 相关的语法解析器
	 */
	function SimpleTest(parser){
		this.parser = parser;
	};
	SimpleTest = new Rexjs(SimpleTest);
	
	SimpleTest.static({
		/**
		 * 获取函数主体代码
		 * @param {Function} func - 需要获取主体代码的函数
		 */
		innerContentOf: function(func){
			return func.toString().match(INNER_CONTENT_REGEXP)[1];
		}
	});
	
	SimpleTest.props({
		/**
		 * 测试结果为假的代码，即代码解析时候正确应该报错
		 * @param {String} description - 该测试的描述
		 * @param {String} source - 需要测试的代码
		 * @param {Function} _callbacks - 解析错误分析回调
		 */
		false: function(description, source, _callbacks){
			var parser = this.parser;
			
			try {
				// 设置文件源代码
				file.source = source;
				
				// 解析文件
				parser.parse(file);
				// 如果进入这里，说明上面解析没有报错，而我们是希望报错的，说明解析器有 bug
				console.error("Uncaught Exceptions: " + description);
			}
			catch(e){
				// 如果没有捕获到错误
				if(
					!catchErrors(
						description,
						toArray(arguments, 2),
						parser,
						parser.details || e
					)
				){
					// 打印成功捕获信息
					console.log("Caught Exceptions: " + description);
				}
			}
		},
		/**
		 * 测试分组
		 * @param {String} name - 分组名称
		 */
		group: function(name){
			this.groupName = name;
			
			console.group(name);
		},
		/**
		 * 测试分组结束
		 * @param {String} name - 分组名称
		 */
		groupEnd: function(){
			console.groupEnd(this.groupName);
			
			this.groupName = "";
		},
		groupName: "",
		parser: null,
		/**
		 * 测试结果为真的代码，即代码正确解析
		 * @param {String} description - 该测试的描述
		 * @param {String} source - 需要测试的代码
		 * @param {Boolean} _eval - 代码解析完，是否需要立马执行
		 * @param {Function} _callbacks - 解析成功后的分析回调
		 */
		true: function(description, source, _eval, _callbacks){
			try {
				var parser = this.parser, result = "";
				
				// 设置文件源代码
				file.source = source;
				
				// 解析文件
				parser.parse(file);
				
				// 如果需要执行
				if(
					_eval
				){
					// 获取解析结果
					result = parser.build();

					// 执行代码
					e(result);
				}
				
				// 如果没有捕获到错误
				if(
					!catchErrors(
						description,
						toArray(arguments, 3),
						parser,
						null
					)
				){
					// 打印成功解析信息
					console.log("Success: " + description);
				}
			}
			catch(e){
				// 输出错误
				console.error("Fail: " + description + " %o", e);
			}
		}
	});
	
	return SimpleTest;
}(
	// INNER_CONTENT_REGEXP
	/\{([\s\S]*)\}\s*$/,
	// file
	new File("test.js", ""),
	console,
	Rexjs.toArray,
	eval,
	// catchErrors
	function(description, callbacks, parser, error){
		// 遍历回调
		return !callbacks.every(function(callback){
			var err = callback(parser, error);
			
			// 如果返回了错误信息
			if(
				err
			){
				// 输出错误
				console.error(description + " - Callback Error: " + err);
				return false;
			}

			return true;
		});
	}
);

}.call(
	this,
	this.File
);

Rexjs.static(this);
}(
	Rexjs,
	Rexjs.forEach
);