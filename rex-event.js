
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
	function NamedItemMap(){};
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
				case _index >= namedItemMap.length :
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
