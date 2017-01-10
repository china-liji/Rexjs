new function(Rexjs){

// 迭代器相关
void function(){

this.IteratorIndex = function(){
	/**
	 * 迭代器索引
	 * @param {Number} max - 索引最大值
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

			this.current = current > max ? max + 1 : current;
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

this.Iterator = function(IteratorIndex, IteratorResult, Infinity){
	/**
	 * 迭代器
	 * @param {*} iterable - 可迭代的对象
	 */
	function Iterator(iterable){
		block:
		{
			// 如果是 null 或 undefined
			if(
				iterable == null
			){
				break block;
			}

			var length = iterable.length;

			// 如果长度属性不是数字
			if(
				typeof length !== "number"
			){
				// 取 size 属性
				length = iterable.size;

				// 如果还不是数字
				if(
					typeof length !== "number"
				){
					break block;
				}
			}

			// 初始化索引
			this.index = new IteratorIndex(length - 1);
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

			return index.current > index.max;
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
	this.IteratorResult,
	Infinity
);

this.Generator = function(Iterator){
	/**
	 * 生成器
	 * @param {*} iterable - 可迭代的对象
	 */
	function Generator(iterable){
		// 初始化迭代器
		this.iterator = new Iterator(iterable);
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
	this
);


// 类相关
void function(){

this.ClassProperty = function(){
	function ClassProperty(name, value, _type){
		this.name = name;
		this.value = value;

		if(
			_type
		){
			this.type = _type;
		}
	};
	ClassProperty = new Rexjs(ClassProperty);

	ClassProperty.props({
		name: "",
		type: "value",
		value: null
	});

	return ClassProperty;
}();

this.StaticProperty = function(ClassProperty){
	function StaticProperty(name, value, _type){
		ClassProperty.call(this, name, value, _type);
	};
	StaticProperty = new Rexjs(StaticProperty, ClassProperty);

	return StaticProperty;
}(
	this.ClassProperty
);

this.Class = function(ClassProperty, StaticProperty, defineProperty){
	function Class(){

	};
	Class = new Rexjs(Class);

	Class.static({
		create: function(SuperClass, allProps, indexOfConstructor){
			var constructor = allProps[indexOfConstructor].value;

			if(
				typeof constructor !== "function"
			){
				throw "Class extends value " + constructor.toString() + " is not a constructor or null";
			}

			var CreatedClass = new Rexjs(constructor, SuperClass);

			allProps.forEach(
				function(property, index){
					if(
						index === indexOfConstructor
					){
						return;
					}

					var type = property.type, descriptor = { enumerable: false, configurable: true };

					if(
						type === "value"
					){
						descriptor.writable = true;
						descriptor.value = property.value;
					}
					else {
						descriptor[type] = property.value;
					}

					defineProperty(
						property instanceof StaticProperty ? CreatedClass : this,
						property.name,
						descriptor
					);
				},
				CreatedClass.prototype
			);

			return CreatedClass;
		}
	});

	return Class;
}(
	this.ClassProperty,
	this.StaticProperty,
	Object.defineProperty
);

}.call(
	this
);


// 其他
void function(){

this.Parameter = function(forEach, push){
	function Parameter(value){
		this.value = value;
	};
	Parameter = new Rexjs(Parameter);

	Parameter.static({
		toSpreadArray: function(_args){
			var array = [];

			forEach.call(
				arguments,
				function(item){
					if(
						item instanceof Parameter
					){
						push.apply(array, item.value);
						return;
					}

					array.push(item);
				}
			);

			return array;
		},
		toTemplateArray: function(_args){
			var templates = [], array = [templates];

			forEach.call(
				arguments,
				function(item){
					(
						item instanceof Parameter ? array : templates
					)
					.push(
						item.value
					);
				}
			);

			return array;
		}
	});

	Parameter.props({
		value: null
	});

	return Parameter;
}(
	Array.prototype.forEach,
	Array.prototype.push
);

}.call(
	this
);

Rexjs.static(this);
}(
	Rexjs
);