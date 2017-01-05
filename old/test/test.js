new function(Class, StaticClass, Interface, Enum, defineProperties){
"use strict";

// 列表相关类
(function(isNaN){

this.List = function(Array, Object, toArray, hasOwnProperty){
	function List(_list){
		///	<summary>
		///	对列表进行管理、操作的类。
		///	</summary>
		///	<param name="_list" type="List、Array">初始化时所拥有的列表集合。</param>
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
			return new List(_list);
		},
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
		even : function(){
			///	<summary>
			///	返回集合中偶数项集合。
			///	</summary>
			return this.alternate(2);
		},
		length : 0,
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
	Array,
	Object,
	Rexjs.toArray,
	Object.prototype.hasOwnProperty
);

this.NamedItem = function(validate){
	function NamedItem(name){
		///	<summary>
		///	已命名项。
		///	</summary>
		///	<param name="name" type="String">指定的名称。</param>
		
		// 验证名称
		if(
			!validate(name)
		){
			return;
		}
		
		this.assign(
			{ name : name }
		);
	};
	NamedItem = new Class(NamedItem);
	
	NamedItem.static({
		validate : validate
	});
	
	NamedItem.props({
		name : ""
	});
	
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
			
			// 如果名称等于length
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

this.NamedItemMap = function(List, NamedItem, validate){
	function NamedItemMap(){
		///	<summary>
		///	已命名项映射集合。
		///	</summary>
	};
	NamedItemMap = new Class(NamedItemMap, List);
	
	NamedItemMap.override({
		clear : function(){
			///	<summary>
			///	清空集合。
			///	</summary>
			this.forEach(
				function(condition){
					delete this[condition.name];
				},
				this
			);
			
			this.splice(0);
			return this;
		}
	});
	
	NamedItemMap.props({
		getNamedItem : function(name){
			///	<summary>
			///	获取已命名项。
			///	</summary>
			///	<param name="name" type="String">指定的名称。</param>
			
			// 如果该项存在
			if(
				this.hasNamedItem(name)
			){
				// 返回该项
				return this[name];
			}
			
			// 返回null
			return null;
		},
		hasNamedItem : function(name){
			///	<summary>
			///	获取已命名项。
			///	</summary>
			///	<param name="name" type="String">指定的名称。</param>
			
			// 如果名称正确
			if(
				validate(name)
			){
				// 返回判断结果
				return this.hasOwnProperty(name);
			}
			
			// 返回false
			return false;
		},
		indexNamedItem : function(name){
			///	<summary>
			///	获取已命名项。
			///	</summary>
			///	<param name="name" type="String">指定的名称。</param>
			var index = -1;
			
			// 如果存在指定标签的名称
			if(
				this.hasNamedItem(name)
			){
				// 记录索引
				index = this.indexOf(this[name]);
			}
			
			return index;
		},
		removeNamedItem : function(name){
			///	<summary>
			///	移除已命名项。
			///	</summary>
			///	<param name="name" type="String">指定的名称。</param>
			
			// 如果有此项
			if(
				this.hasNamedItem(name)
			){
				// 从数组中移除
				this.splice(
					this.indexOf(
						this.getNamedItem(name)
					),
					1
				);
				
				// 从键值对中移除
				delete this[name];
			}
			
			return this;
		},
		setNamedItem : function(namedItem, _index){
			///	<summary>
			///	设置已命名项。
			///	</summary>
			///	<param name="namedItem" type="*">指定的项。</param>
			///	<param name="_index" type="Number">在指定索引处插入该项。</param>
			
			var name = namedItem.name;
			
			// 如果是NamedItem的实例
			if(
				namedItem instanceof NamedItem
			){
				// 设置键值对项
				this[name] = namedItem;
				
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
			}
			// 如果不是
			else {
				// 报错
				throw '第一个参数应该是"NamedItem"的实例。';
			}
			
			return this;
		}
	});
	
	return NamedItemMap;
}(
	this.List,
	this.NamedItem,
	this.NamedItem.validate
);

}.call(
	this,
	Number.isNaN || window.isNaN
));


// 语法标签相关
(function(){

this.SyntaxTag = function(NamedItem){
	function SyntaxTag(name, regexp, _id, _isEnding){
		///	<summary>
		///	语法标签，供于语法树匹配。
		///	</summary>
		///	<param name="name" type="String">标签名称，可重复，将会定义为作用域标签（如：开始标签、结束标签）。</param>
		///	<param name="regexp" type="RegExp">需要匹配标签的正则。</param>
		///	<param name="_id" type="String">标签标识符，用于同名标签，默认等于name。</param>
		///	<param name="_isEnding" type="Boolean">该参数表示指定标签是否为语句或表达式的结束符号，如分号、逗号等。</param>
		this.assign({
			id : _id || name,
			isEnding : _isEnding,
			regexp : regexp
		});
	};
	SyntaxTag = new Class(SyntaxTag, NamedItem);

	SyntaxTag.props({
		id : "",
		ignore : function(){
			///	<summary>
			///	表示该标签将被忽略，被语法树解析为普通文本，也不会触发对应事件。
			///	</summary>
			this.ignored = true;
			return this;
		},
		ignored : false,
		isEnding : false,
		regexp : /[^\S\s]/g,
		unignore : function(){
			///	<summary>
			///	取消忽略，使标签恢复正常。
			///	</summary>
			this.ignored = false;
			return this;
		}
	});

	return SyntaxTag;
}(
	this.NamedItem
);

this.TextTag = function(SyntaxTag){
	function TextTag(name, regexp, _id, _isEnding){
		///	<summary>
		///	语法文本标签，供于语法树匹配。
		///	</summary>
		///	<param name="name" type="String">标签名称。</param>
		///	<param name="regexp" type="RegExp">需要匹配标签的正则。</param>
		///	<param name="_id" type="String">标签标识符，用于同名标签，默认等于name。</param>
		///	<param name="_isEnding" type="Boolean">该参数表示指定标签是否为语句或表达式的结束符号，如分号、逗号等。</param>
	};
	TextTag = new Class(TextTag, SyntaxTag);

	return TextTag;
}(
	this.SyntaxTag
);

this.MultipleTag = function(SyntaxTag){
	function MultipleTag(name, regexp, _id, _isEnding){
		///	<summary>
		///	多样的标签，即同个正则匹配多种值，供于语法树匹配。
		///	</summary>
		///	<param name="name" type="String">标签名称。</param>
		///	<param name="regexp" type="RegExp">需要匹配标签的正则。</param>
		///	<param name="_id" type="String">标签标识符，用于同名标签，默认等于name。</param>
		///	<param name="_isEnding" type="Boolean">该参数表示指定标签是否为语句或表达式的结束符号，如分号、逗号等。</param>
	};
	MultipleTag = new Class(MultipleTag, SyntaxTag);

	return MultipleTag;
}(
	this.SyntaxTag
);

this.OperatorTag = function(MultipleTag){
	function OperatorTag(name, regexp, _id, _isEnding){
		///	<summary>
		///	运算符标签（如：加减乘除等等），供于语法树匹配。
		///	</summary>
		///	<param name="name" type="String">标签名称。</param>
		///	<param name="regexp" type="RegExp">需要匹配标签的正则。</param>
		///	<param name="_id" type="String">标签标识符，用于同名标签，默认等于name。</param>
		///	<param name="_isEnding" type="Boolean">该参数表示指定标签是否为语句或表达式的结束符号，如分号、逗号等。</param>
	};
	OperatorTag = new Class(OperatorTag, MultipleTag);

	return OperatorTag;
}(
	this.MultipleTag
);

this.KeywordTag = function(SyntaxTag){
	function KeywordTag(name, regexp, _id){
		///	<summary>
		///	关键字标签，供于语法树匹配。
		///	</summary>
		///	<param name="name" type="String">标签名称。</param>
		///	<param name="regexp" type="RegExp">需要匹配标签的正则。</param>
		///	<param name="_id" type="String">标签标识符，用于同名标签，默认等于name。</param>
	};
	KeywordTag = new Class(KeywordTag, SyntaxTag);

	return KeywordTag;
}(
	this.SyntaxTag
);

this.DeclarationTag = function(KeywordTag){
	function DeclarationTag(name, regexp, _id){
		///	<summary>
		///	申明标签（var、let、const），供于语法树匹配。
		///	</summary>
		///	<param name="name" type="String">标签名称。</param>
		///	<param name="regexp" type="RegExp">需要匹配标签的正则。</param>
		///	<param name="_id" type="String">标签标识符，用于同名标签，默认等于name。</param>
	};
	DeclarationTag = new Class(DeclarationTag, KeywordTag);

	return DeclarationTag;
}(
	this.KeywordTag
);

this.ExpressionTag = function(KeywordTag){
	function ExpressionTag(name, regexp, _id){
		///	<summary>
		///	表达式标签（如：function、class等），供于语法树匹配。
		///	</summary>
		///	<param name="name" type="String">标签名称。</param>
		///	<param name="regexp" type="RegExp">需要匹配标签的正则。</param>
		///	<param name="_id" type="String">标签标识符，用于同名标签，默认等于name。</param>
	};
	ExpressionTag = new Class(ExpressionTag, KeywordTag);

	return ExpressionTag;
}(
	this.KeywordTag
);

this.GroupingTag = function(SyntaxTag){
	function GroupingTag(name, regexp, _id){
		///	<summary>
		///	分组标签（如：大中小括号），供于语法树匹配。
		///	</summary>
		///	<param name="name" type="String">标签名称。</param>
		///	<param name="regexp" type="RegExp">需要匹配标签的正则。</param>
		///	<param name="_id" type="String">标签标识符，用于同名标签，默认等于name。</param>
	};
	GroupingTag = new Class(GroupingTag, SyntaxTag);

	return GroupingTag;
}(
	this.SyntaxTag
);

this.OpeningTag = function(GroupingTag){
	function OpeningTag(name, regexp, _id, _closingTagId){
		///	<summary>
		///	起始标签，供于语法树匹配。
		///	</summary>
		///	<param name="name" type="String">标签名称。</param>
		///	<param name="regexp" type="RegExp">需要匹配标签的正则。</param>
		///	<param name="_id" type="String">标签标识符，用于同名标签，默认等于name。</param>
		///	<param name="_closingTagId" type="String">如果提供该参数，则当溢出时会自动创建及关闭标签节点，并触该参数事件。</param>
		if(
			!_closingTagId
		){
			return;
		}
		
		this.assign({
			auto : true,
			closingTagId : _closingTagId
		});
	};
	OpeningTag = new Class(OpeningTag, GroupingTag);
	
	OpeningTag.props({
		auto : false,
		closingTagId : ""
	});

	return OpeningTag;
}(
	this.GroupingTag
);

this.ClosingTag = function(GroupingTag){
	function ClosingTag(name, regexp, _id){
		///	<summary>
		///	结束标签，供于语法树匹配。
		///	</summary>
		///	<param name="name" type="String">标签名称。</param>
		///	<param name="regexp" type="RegExp">需要匹配标签的正则。</param>
		///	<param name="_id" type="String">标签标识符，用于同名标签，默认等于name。</param>
	};
	ClosingTag = new Class(ClosingTag, GroupingTag);
	
	ClosingTag.override({
		isEnding : true
	});

	return ClosingTag;
}(
	this.GroupingTag
);

this.SyntaxTags = function(NamedItemMap, setNamedItem){
	function SyntaxTags(){
		///	<summary>
		///	语法标签集合。
		///	</summary>
	};
	SyntaxTags = new Class(SyntaxTags, NamedItemMap);
	
	SyntaxTags.override({
		removeNamedItem : function(){
			///	<summary>
			///	移除指定项。
			///	</summary>
			throw "语法标签集合中的项，一经设定，不得移除。";
			
			return this;
		},
		setNamedItem : function(syntaxTag, _index){
			///	<summary>
			///	根据标签id，添加语法标签。
			///	</summary>
			///	<param name="syntaxTag" type="SyntaxTag">需要添加的语法标签。</param>
			///	<param name="_index" type="Number">在指定索引处插入标签。</param>
			var id = syntaxTag.id;
			
			// 如果已经存在指定id的标签
			if(
				this.hasNamedItem(id)
			){
				// 报错
				throw "不应该添加重复的标签：" + id;
				// 返回false
				return this;
			}
			
			// 记录标签
			this[syntaxTag.id] = syntaxTag;
			setNamedItem.apply(this, arguments);
			
			// 返回true
			return this;
		}
	});
	
	SyntaxTags.props({
		ignore : function(id){
			///	<summary>
			///	表示指定id的标签将被忽略，被语法树解析为普通文本，也不会触发对应事件。
			///	</summary>
			this.getNamedItem(
					id
				)
				.ignore();
			
			return this;
		},
		unignore : function(id){
			///	<summary>
			///	取消忽略指定id的标签，使标签将会被正常解析。
			///	</summary>
			this.getNamedItem(
					id
				)
				.unignore();
				
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


// 语法辅助相关
(function(Node, walker, breakCurrentNode){

this.SyntaxWalker = function(document, walking){
	function SyntaxWalker(){
		///	<summary>
		///	语法节点查询器。
		///	</summary>
	};
	SyntaxWalker = new StaticClass(SyntaxWalker);

	SyntaxWalker.static({
		extractNodesBetween : function(first, second, _rootNode, _includeFirst, _includeSecond){
			///	<summary>
			///	提取2个节点之间的所有节点（提取：移除后并添加到一个DocumentFragment对象内）。
			///	</summary>
			///	<param name="first" type="Node">第一个节点。</param>
			///	<param name="second" type="Node">第二个节点。</param>
			///	<param name="_rootNode" type="Node">指定的根节点。</param>
			///	<param name="_includeFirst" type="Boolean">是否提取第1个节点。</param>
			///	<param name="_includeSecond" type="Boolean">是否连提取第2个节点。</param>
			var parentNode;
			
			if(
				!_rootNode
			){
				_rootNode = document.createDocumentFragment();
			}
			
			parentNode = _rootNode;
			
			// 进行查询
			this.walk(
				first,
				second,
				function(node, containing){
					/*
						如果当前的元素包含target元素，说明只能该元素不能直接从文档中移除，因为target元素之后可能还有其他元素，
						如果移除了当前元素，则target之后的元素也会被移除，这就移除了一些不应该移除的元素，
						所以要克隆当前元素，并把指定父节点设置该克隆节点
					*/
					if(
						containing
					){
						node = node.cloneNode();
						parentNode.appendChild(node);

						parentNode = node;
						return;
					}
					
					parentNode.appendChild(node);
				},
				_includeFirst,
				_includeSecond
			);

			return _rootNode;
		},
		getTextBetween : function(first, second, _includeFirst, _includeSecond){
			///	<summary>
			///	获取2个节点之间的文本字符串。
			///	</summary>
			///	<param name="first" type="Node">第一个节点。</param>
			///	<param name="second" type="Node">第二个节点。</param>
			///	<param name="_includeFirst" type="Boolean">是否要包含第1个节点的文本。</param>
			///	<param name="_includeSecond" type="Boolean">是否要包含第2个节点的文本。</param>
			var texts = [];

			this.walk(
				first,
				second,
				function(node, containing){
					// node节点包括目标target节点，则不添加该节点文本，因为该节点可能还包含target之后的其他节点
					if(
						containing
					){
						return;
					}
					
					// 添加文本内容
					texts.push(node.textContent);
				},
				_includeFirst,
				_includeSecond
			);
			
			return texts.join("");
		},
		walk : function(first, second, callback, _includeFirst, _includeSecond){
			///	<summary>
			///	查询2个节点之间的其他节点，对此些节点，回调函数应将会对其做出处理。
			///	</summary>
			///	<param name="first" type="Node">第一个节点。</param>
			///	<param name="second" type="Node">第二个节点。</param>
			///	<param name="callback" type="Function">回调函数。</param>
			///	<param name="_includeFirst" type="Boolean">是否提取第1个节点。</param>
			///	<param name="_includeSecond" type="Boolean">是否连提取第2个节点。</param>
			var position = first.compareDocumentPosition(second);
			
			// 如果不在同一文档中
			if(
				position & Node.DOCUMENT_POSITION_DISCONNECTED
			){
				return this;
			}
			
			// 如果first和second是同一个元素
			if(
				position === 0
			){
				return this;
			}
			
			// 如果first不是second的子孙元素
			if(
				(position & Node.DOCUMENT_POSITION_CONTAINS) === 0
			){
				// 如果second在first前面
				if(
					(position & Node.DOCUMENT_POSITION_FOLLOWING) === 0
				){
					// first 与 second 互换
					first = second;
					second = arguments[0];
					// _includeFirst 与 _includeSecond 互换
					_includeFirst = _includeSecond;
					_includeSecond = arguments[3];
					// 重置position
					position = first.compareDocumentPosition(second);
				}
			}

			// 设置当前节点
			walker.currentNode = first;
			
			// 如果second不是first的子孙元素
			if(
				(position & Node.DOCUMENT_POSITION_CONTAINED_BY) === 0
			){
				// 如果不包括first
				if(
					!_includeFirst
				){
					breakCurrentNode(walker, second);
				}
			}
			
			// 开始查找符合要求的节点
			walking(second, callback);
			
			// 如果需要包含second元素的文本
			if(
				_includeSecond
			){
				callback(second, false, false);
			}

			return this;
		}
	});

	return SyntaxWalker;
}(
	document,
	// walking
	function(target, callback){
		var position, containing = false, currentNode = walker.currentNode;
		
		// 如果节点一直存在
		while(
			currentNode
		){
			position = currentNode.compareDocumentPosition(target);
			
			// 如果当前节点等于target，就说明查找完毕了
			if(
				position === 0
			){
				return;
			}
			
			// 如果当前节点都出现在target的文档流之后，则也说明查找完毕了
			if(
				(position & Node.DOCUMENT_POSITION_FOLLOWING) === 0
			){
				// 如果currentNode不是target的子孙元素
				if(
					(position & Node.DOCUMENT_POSITION_CONTAINS) === 0
				){
					return;
				}
			}
			
			// 如果当前节点包含目标节点，则为true，否则为false
			containing = !!(position & Node.DOCUMENT_POSITION_CONTAINED_BY);
			
			// 在这一步就要操作walker，因为担心callback里面会对currentNode做移除操作
			if(
				containing
			){
				// 重置currentNode
				walker.nextNode();
			}
			else {
				// 跳出当前节点至下一个兄弟节点
				breakCurrentNode(walker, target);
			}
			
			// 执行回调
			callback(currentNode, containing);
			
			// 设置currentNode
			currentNode = walker.currentNode;
		}
	}
);

this.SyntaxError = function(Array, SIZE_REGEXP){
	function SyntaxError(code, index, offset, description){
		///	<summary>
		///	语法错误信息。
		///	</summary>
		///	<param name="code" type="String">相关代码。</param>
		///	<param name="index" type="Number">出错处的索引。</param>
		///	<param name="offset" type="Number">错误起始处与当前索引的偏移量。</param>
		///	<param name="description" type="String">错误描述。</param>
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
		colNumber = SyntaxError.getStringSize(
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
	SyntaxError = new Class(SyntaxError);
	
	SyntaxError.static({
		getStringSize : function(str){
			///	<summary>
			///	获取字符串的字符长度。
			///	</summary>
			///	<param name="str" type="String">所需提供的字符串。</param>
			var index;
			
			// 替换双字节字符
			str.replace(
				SIZE_REGEXP,
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
	});

	return SyntaxError;
}(
	Array,
	// SIZE_REGEXP
	/[^\x00-\xff]+/g
);

}.call(
	this,
	Node,
	// walker
	document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false),
	// breakCurrentNode
	function(walker, target){
		var currentNode = walker.currentNode, nextSibling = currentNode.nextSibling;
		
		// 如果下一个兄弟节点存在
		if(
			nextSibling
		){
			// 直接设置当前元素为该兄弟节点
			walker.currentNode = nextSibling;
			return;
		}
		
		var childNodes = currentNode.childNodes;
		
		// 如果有子节点
		while(
			childNodes.length > 0
		){
			// 设置当前节点为最后一个子节点
			currentNode = childNodes[childNodes.length - 1];
			// 设置子节点为当前节点的子节点
			childNodes = currentNode.childNodes;
		}
		
		// 设置当前节点
		walker.currentNode = currentNode;
		// 查找下一个节点，下一个节点必定会跳出当前节点，因为已经找不到子节点
		walker.nextNode();
		
		// 如果相等，也说明 currentNode 后面没有节点了
		if(
			walker.currentNode === currentNode
		){
			// 设置为目标节点
			walker.currentNode = target;
		}
	}
));


// 
(function(){
	
this.ConditionAction = new Enum(["Unplain", "Hold", "Split"]);

this.Condition = function(NamedItem, ConditionAction){
	function Condition(name, _action){
		///	<summary>
		///	语法条件，用于语法树纯文本模式时所进行的行为判断。
		///	</summary>
		///	<param name="name" type="String">条件名称，一般为对应标签的id。</param>
		///	<param name="_action" type="ConditionAction">该条件的行为。</param>
		this.assign({
			action : _action
		});
	};
	Condition = new Class(Condition, NamedItem);
	
	Condition.props({
		action : ConditionAction.Unplain
	});
	
	return Condition;
}(
	this.NamedItem,
	this.ConditionAction
);

this.ContinuousCondition = function(Condition, ConditionAction){
	function ContinuousCondition(name){
		///	<summary>
		///	持续语法条件，当语法树纯文本模式时，遇到此标签将会继续保持纯文本模式。
		///	</summary>
		///	<param name="name" type="String">条件名称，一般为对应标签的id。</param>
	};
	ContinuousCondition = new Class(ContinuousCondition, Condition);
	
	ContinuousCondition.override({
		action : ConditionAction.Hold
	});
	
	return ContinuousCondition;
}(
	this.Condition,
	this.ConditionAction
);

this.OrderedCondition = function(Condition, ConditionAction){
	function OrderedCondition(name){
		///	<summary>
		///	有序的语法条件，用于语法树纯文本模式时所进行的行为判断。
		///	</summary>
		///	<param name="name" type="String">条件名称，一般为对应标签的id。</param>
	};
	OrderedCondition = new Class(OrderedCondition, Condition);
	
	OrderedCondition.override({
		action : ConditionAction.Split
	});
	
	return OrderedCondition;
}(
	this.Condition,
	this.ConditionAction
);

this.PlainText = function(NamedItemMap, ConditionAction, forEach, split){
	function PlainText(syntaxTree){
		///	<summary>
		///	纯文本语法类，用于告知语法树是否启用或禁用纯文本模式。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		this.assign({
			conditions : new NamedItemMap(),
			syntaxTree : syntaxTree
		});
	};
	PlainText = new Class(PlainText);
	
	PlainText.props({
		addCondition : function(condition, _index){
			///	<summary>
			///	添加条件。
			///	</summary>
			///	<param name="condition" type="Condition">指定的条件。</param>
			///	<param name="_index" type="Number">在指定索引处插入该条件。</param>
			this.conditions
				.setNamedItem(
					condition,
					_index
				);
				
			return this;
		},
		conditions : null,
		disable : function(){
			///	<summary>
			///	禁用纯文本模式。
			///	</summary>
			this.conditions.clear();
			
			this.disabled = true;
			return this;
		},
		disabled : true,
		enable : function(_rest){
			///	<summary>
			///	开启纯文本模式，即暂停语法树元素的创建，并且当指定的元素标签id出现时才会自动取消暂停，否则只能手动调用disable函数以取消暂停。
			///	</summary>
			///	<param name="_rest" type="Condition">语法条件。</param>
			var conditions = this.conditions, syntaxTree = this.syntaxTree;
			
			// 清空 conditions
			conditions.clear();
			
			forEach(
				arguments,
				function(condition){
					conditions.setNamedItem(condition);
				}
			);
			
			// 表示开启纯文本模式
			this.disabled = false;
			
			// 触发 plained 事件
			syntaxTree.dispatch(
				"plained",
				syntaxTree.parentNode,
				syntaxTree.index,
				syntaxTree.fragment
			);

			return this;
		},
		goto : function(name){
			///	<summary>
			///	跳转到指定名称的条件。
			///	</summary>
			///	<param name="name" type="String">指定的名称。</param>
			var index, conditions = this.conditions, syntaxTree = this.syntaxTree;
			
			// 触发 goto 事件
			syntaxTree.dispatch(
				"goto",
				syntaxTree.parentNode,
				syntaxTree.index,
				syntaxTree.fragment
			);
			
			// 为防止 goto 事件的监听器可能会使用disable，从而清空conditions
			index = conditions.indexNamedItem(name);
			
			// 如果 index 等于-1，则说明没有指定条件
			if(
				index === -1
			){
				// 返回 disabled，这里不能直接返回false，因为 goto 事件的监听器可能会调用disable。
				return this.disabled;
			}
			
			// 判断行为
			switch(
				conditions[name].action
			){
				// 如果是 Split，则删除此标签及其之前标签条件
				case ConditionAction.Split :
					split(conditions, index);
					break;

				// 如果是 Hold，则不做任何处理
				case ConditionAction.Hold :
					break;
				
				// 默认即 Unplain，取消纯文本模式
				default :
					conditions.clear();
					this.disable();
					break;
			}
			
			// 返回true
			return true;
		},
		syntaxTree : null
	});
	
	return PlainText;
}(
	this.NamedItemMap,
	this.ConditionAction,
	Rexjs.forEach,
	// split
	function(conditions, index){
		conditions
			.splice(
				0,
				index + 1
			)
			.forEach(function(condition){
				delete conditions[condition.name];
			});
	}
);
	
}.call(
	this
));


// 语法树相关
(function(SyntaxError, Array, document){
	
this.SyntaxListener = function(getIndex, getName){
	function SyntaxListener(){
		///	<summary>
		///	语法标签监听器，用于触发特定的回调函数，伪DOM事件。
		///	</summary>
		this.assign({
			names : {},
			superIndexs : {},
			storage : {}
		});
	};
	SyntaxListener = new Class(SyntaxListener);

	SyntaxListener.props({
		dispatch : function(name, node, index, fragment){
			///	<summary>
			///	触发指定条件下对应名称的回调函数。
			///	</summary>
			///	<param name="name" type="String">指定的监听器名称。</param>
			///	<param name="node" type="Node">相关的节点。</param>
			///	<param name="index" type="Number">指定的索引数，表明需要触发该索引级别所指定的监听器。</param>
			///	<param name="fragment" type="String">相关节点之间的片段文本。</param>
			var names = this.names, fullname = getName(name, index);
			
			// 如果没有指定名称的监听器
			if(
				!names.hasOwnProperty(fullname)
			){
				// 如果索引是大于0的，那么可能还存在全局的同名监听器
				if(
					index > 0
				){
					// 那么触发全局的同名监听器
					this.dispatch(name, node, 0, fragment);
				}
				
				return this;
			}

			var next, prevent, prevented = false, syntaxListener = this, storage = this.storage, ids = names[fullname], max = ids.length - 1;
			
			// prevent 方法
			prevent = function(){
				prevented = true;
			};
			
			// next方法
			next = function(_fragment){
				// 如果_fragment是字符串
				if(
					typeof _fragment === "string"
				){
					// 重新赋值fragment
					fragment = _fragment;
				}
				
				switch(
					true
				){
					// 如果已经被阻止
					case prevented :
						return;
					
					/*
						如果max等于-1 或者 ids.length等于0，
						说明该索引下面的所有监听器都已经被触发了。
						这里一定要判断ids.length，因为每一个listener都有可能清空ids
					*/
					case max === -1 || ids.length === 0 :
						prevented = true;
						// 如果索引是大于0的，那么可能还存在全局的同名监听器，则触发全局的同名监听器
						index > 0 && syntaxListener.dispatch(name, node, 0, fragment);
						return;
				}
				
				// 调用监听器
				storage[
						ids[max--]
					]
					.listener
					.call(
						syntaxListener,
						node,
						syntaxListener.index,
						fragment,
						next,
						prevent
					);
				
				// 继续执行下一个	
				next();
			};

			// 执行next函数
			next();
			return this;
		},
		id : 0,
		index : 0,
		listen : function(name, listener, _index, _superIndex){
			///	<summary>
			///	监听指定名称的事件，为其分配回调函数。
			///	</summary>
			///	<param name="name" type="String">指定的监听器名称。</param>
			///	<param name="listener" type="Function">需要监听的回调函数。</param>
			///	<param name="_index" type="Number">指定的索引数，表明需要触发该索引级别所指定的监听器。</param>
			///	<param name="_superIndex" type="Number">指定的父索引数，用于判断该何时去除此监听。</param>
			var id = ++this.id;

			switch(
				true
			){
				// 如果没有提供 _superIndex
				case _superIndex === void 0 :
					// 设置为当前索引
					_superIndex = this.index;
					break;
				
				// 如果 _superIndex 小于 0	
				case _superIndex < 0 :
					// 设置为 0
					_superIndex = 0;
					break;
			}

			// 获取 index
			_index = getIndex(_index);
			// 获取 name
			name = getName(name, _index);

			// _index 比 _superIndex 还要小
			if(
				_index < _superIndex
			){
				// 设置 _superIndex 为 _index 的值
				_superIndex = _index;
			}

			[
				this.names,
				this.superIndexs
			]
			.forEach(
				function(obj, i){
					var key = this[i];

					// 如果key已经存在
					if(
						obj.hasOwnProperty(key)
					){
						// 在已有堆栈上添加一个
						obj[key].push(id);
					}
					// 如果不存在
					else {
						// 设置为新的数组
						obj[key] = [id];
					}
				},
				[name, _superIndex]
			);

			// 将数据放在存储器里，确保一对一关系
			this.storage[id] = {
				listener : listener,
				name : name,
				superIndex : _superIndex
			};

			// 返回id，是unlisten的唯一参数
			return id;
		},
		names : null,
		once : function(name, listener, _index, _superIndex){
			///	<summary>
			///	监听指定名称的事件，为其分配回调函数，但，仅一次有效。
			///	</summary>
			///	<param name="name" type="String">指定的监听器名称。</param>
			///	<param name="listener" type="Function">需要监听的回调函数。</param>
			///	<param name="_index" type="Number">指定的索引数，表明需要触发该索引级别所指定的监听器。</param>
			///	<param name="_superIndex" type="Number">指定的父索引数，用于判断该何时去除此监听。</param>
			var id, syntaxListener = this;
			
			// 监听
			id = this.listen(
				name,
				function(){
					// 先去除监听
					syntaxListener.unlisten(id);

					// 再触发监听器
					return listener.apply(this, arguments);
				},
				_index,
				_superIndex
			);

			// 返回id，是unlisten的唯一参数
			return id;
		},
		storage : null,
		setIndex : function(index){
			///	<summary>
			///	设置索引数。
			///	</summary>
			///	<param name="index" type="Number">指定的索引数。</param>
			
			// 如果记录的index比index还要大，就说明已经跳出“作用域”
			if(
				this.index > index
			){
				// 去除所有子监听器
				this.unlistenSubs(index);
			}
			
			this.index = index;
			
			return this;
		},
		superIndexs : null,
		unlisten : function(id){
			///	<summary>
			///	去除监听器。
			///	</summary>
			///	<param name="id" type="Number">需要去除的监听器的唯一标识。</param>
			var names = this.names, storage = this.storage;

			// 如果不存在指定id，则返回
			if(
				!storage.hasOwnProperty(id)
			){
				return false;
			}

			var data = storage[id];

			[
				this.names,
				this.superIndexs
			]
			.forEach(
				function(obj, i){
					var ids = obj[this[i]];

					// 如果ids有记录
					if(
						ids
					){
						var index = ids.indexOf(id);

						// 去除此id
						ids.splice(index, 1);

						// 如果ids已经空了，那么删除记录
						if(
							ids.length === 0
						){
							delete obj[this[i]];
						}
					}
				},
				[data.name, data.superIndex]
			);

			// 删除存储器里的关联数据
			delete storage[id];
			return true;
		},
		unlistenBy : function(name, _index){
			///	<summary>
			///	去除指定条件的监听器。
			///	</summary>
			///	<param name="name" type="String">指定的名称。</param>
			///	<param name="index" type="Number">指定的索引。</param>
			var ids, names = this.names;
			
			// 获取所有id
			ids = names[
				getName(
					name,
					getIndex(_index)
				)
			];
			
			// 如果id不存在
			if(
				!ids
			){
				return false;
			}
			
			// 去除监听
			ids.forEach(this.unlisten, this);
			return true;
		},
		unlistenSubs : function(index){
			///	<summary>
			///	去除所有比指定索引更低的级别监听器。如：index=2，则会去除把比2更大的3、4、5、6...的监听器
			///	</summary>
			///	<param name="index" type="Number">指定的索引。</param>
			var superIndexs = this.superIndexs;
			
			// 去除所有比index大的监听器
			for(
				var i = index + 1, j = this.index + 1;i < j;i++
			){
				var ids = superIndexs[i];
	
				// 如果id不存在
				if(
					!ids
				){
					continue;
				}
				
				// 直接删除记录，防止在unlisten中删除，会导致下面的forEach混乱
				delete superIndexs[i];
		
				// 去除监听
				ids.forEach(this.unlisten, this);
			}
			
			return true;
		}
	});

	return SyntaxListener;
}(
	// getIndex
	function(_index){
		return _index || 0;
	},
	// getName
	function(name, index){
		return name + "-index-" + index;
	}
);

this.SyntaxNode = function(SyntaxListener, set, createText){
	function SyntaxNode(code){
		///	<summary>
		///	语法节点。
		///	</summary>
		///	<param name="code" type="String">需要提供的语法代码。</param>
		this.assign({
			code : code,
			groups : []
		});
	};
	SyntaxNode = new Class(SyntaxNode, SyntaxListener);
	
	SyntaxNode.static({
		createText : createText
	});
	
	SyntaxNode.props({
		appendChild : function(node, _eventName, _eventTarget, _isEnding){
			///	<summary>
			///	添加指定节点到当前的父节点之下，并可触发指定事件。
			///	</summary>
			///	<param name="node" type="Node">指定的节点。</param>
			///	<param name="_eventName" type="String">事件名称。</param>
			///	<param name="_eventTarget" type="Node">指定的触发节点。</param>
			///	<param name="_isEnding" type="Boolean">该参数表示指定节点是否为语句或表达式的结束符号，如分号、逗号等。</param>
			
			// 如果 _eventTarget 不存在，则设置为 node
			_eventTarget = _eventTarget || node;
			
			// 在node上记录数据
			set(
				node,
				{
					codeIndex : this.codeIndex,
					codeContent : node.textContent,
					fragment : this.fragment
				}
			);
			
			// 如果是结束性质的节点
			if(
				_isEnding
			){
				// 触发 beforeEnding 事件
				this.dispatch("beforeEnding", _eventTarget, this.index, this.fragment);
			}
			
			// 添加到当前指定的父节点
			this.parentNode
				.appendChild(
					node
				);
			
			// 如果事件名存在
			if(
				_eventName
			){
				// 触发事件
				this.dispatch(_eventName, _eventTarget, this.index, _eventTarget.fragment);
			}
			
			// 返回节点
			return node;
		},
		appendText : function(textContent, _eventName, _eventTarget, _isEnding){
			///	<summary>
			///	添加文本节点到当前的父节点之下。
			///	</summary>
			///	<param name="textContent" type="String">文本内容。</param>
			///	<param name="_eventName" type="String">事件名称。</param>
			///	<param name="_eventTarget" type="Node">指定的触发节点。</param>
			
			// 添加节点
			return this.appendChild(
				createText(textContent),
				_eventName,
				_eventTarget,
				_isEnding
			);
		},
		code : "",
		codeIndex : 0,
		error : function(node, description){
			///	<summary>
			///	提示错误。
			///	</summary>
			///	<param name="node" type="Node">指定的代码节点。</param>
			///	<param name="description" type="String">错误描述。</param>
			new SyntaxError(this.code, node.codeIndex, node.codeContent.length, description);
			return this;
		},
		fragment : "",
		global : null,
		groups : null,
		parentNode : null,
		setFragment : function(fragment){
			///	<summary>
			///	设置当前语法的片段文本。
			///	</summary>
			///	<param name="fragment" type="String">指定的片段文本。</param>
			this.fragment = fragment;
			
			return this;
		},
		setParentNode : function(parentNode){
			///	<summary>
			///	设置指定的父节点，即之后所解析到的节点都将作为此节点的子节点。
			///	</summary>
			///	<param name="parentNode" type="Node">指定的父节点。</param>
			var groups = this.groups, index = groups.indexOf(parentNode);
				
			// 如果index等于-1，则说明parentNode不存在
			if(
				index === -1
			){
				// 添加到组
				groups.push(parentNode);
			}
			// 如果index不等于-1，说明该父节点已经存在组中
			else {
				// 去除在此父节点之后的父节点
				groups.splice(index + 1);
			}
			
			// 设置索引为组长度
			this.setIndex(groups.length);
			
			// 记录parentNode
			this.parentNode = parentNode;
			return this;
		}
	});
	
	return SyntaxNode;
}(
	this.SyntaxListener,
	Rexjs.set,
	// createText
	function(textContent){
		///	<summary>
		///	创建文本节点。
		///	</summary>
		///	<param name="textContent" type="String">文本内容。</param>
		return document.createTextNode(textContent);
	}
);

this.SyntaxElement = function(SyntaxNode, createElement){
	function SyntaxElement(code){
		///	<summary>
		///	语法元素。
		///	</summary>
		///	<param name="code" type="String">需要提供的语法代码。</param>
		this.assign({
				global : createElement("global")
			})
			.setParentNode(
				this.global
			);
	};
	SyntaxElement = new Class(SyntaxElement, SyntaxNode);
	
	SyntaxElement.static({
		createElement : createElement,
		createOperatorElement : function(value, _textContent){
			///	<summary>
			///	创建运算符元素。
			///	</summary>
			///	<param name="value" type="String">运算符的value属性值。</param>
			///	<param name="_textContent" type="String">运算符的内容文本。</param>
			var operatorElement = createElement("operator");
			
			operatorElement.setAttribute("value", value);
			
			if(
				_textContent !== void 0
			){
				operatorElement.textContent = _textContent;
			}
			
			return operatorElement;
		}
	});
	
	SyntaxElement.props({
		appendClosing : function(tagName, textContent, _eventName){
			///	<summary>
			///	添加关闭（结束）标签元素到父节点之下。
			///	</summary>
			///	<param name="tagName" type="String">标签名。</param>
			///	<param name="textContent" type="String">文本内容。</param>
			///	<param name="_eventName" type="String">需要触发的事件。</param>
			var groups = this.groups, index = groups.length, element = groups[index - 1];

			// 当长度大于0
			while(
				index > 0
			){
				// 如果标签名称一致，则说明配对成功
				if(
					element.tagName === tagName
				){
					// 跳出循环
					break;
				}
				
				var closingTagId = element.getAttribute("auto");
				
				// 如果元素名称不一致，当该元素拥有自动关闭属性
				if(
					closingTagId !== null
				){
					// 添加关闭标签
					this.appendClosing(element.tagName, "", closingTagId);
					
					index = groups.length;
					
					// 触发对应事件
					this.dispatch(closingTagId, element, index + 1, this.fragment);
					// 由于2个元素关闭标记紧邻，所以清空片段文本
					this.setFragment("");
					
					// 获取下一个元素
					element = groups[index - 1];
					// 继续循环
					continue;
				}
				
				// 在这里，说明溢出元素没有自动关闭属性，所以将index设置为0，即可跳出循环更可用于下面的报错
				index = 0;
			}
			
			// 如果没有匹配组的起始记录 或 上一个起始标签的名称不等于结束标签的名称
			if(
				index === 0
			){
				// 报错
				new SyntaxError(this.code, this.codeIndex, textContent.length, "意外的结束标记。");
				return null;
			}

			// 添加end元素
			this.appendElement("end", textContent, _eventName, element, true);
			
			// 设置父节点为group的父节点，意为跳出组匹配
			this.setParentNode(
				element.parentNode
			);
			
			return element;
		},
		appendElement : function(tagName, _textContent, _eventName, _eventTarget, _isEnding, _multiple){
			///	<summary>
			///	添加元素到父节点之下。
			///	</summary>
			///	<param name="tagName" type="String">标签名。</param>
			///	<param name="_textContent" type="String">文本内容。</param>
			///	<param name="_eventName" type="String">事件名称。</param>
			///	<param name="_eventTarget" type="Node">指定的触发节点。</param>
			var element = createElement(tagName);
			
			// 如果提供了文本内容
			if(
				_textContent
			){
				// 设置文本内容
				element.textContent = _textContent;
			}
			
			// 如果可能会匹配多种情况，如：运算符等
			if(
				_multiple
			){
				// 则要给元素设置直观的value属性
				element.setAttribute("value", _textContent);
			}
			
			// 添加元素
			this.appendChild(element, _eventName, _eventTarget, _isEnding);
			// 清空片段文本
			this.setFragment("");
			
			return element;
		},
		appendOpening : function(tagName, textContent, _eventName, _auto, _closingTagId){
			///	<summary>
			///	添加起始元素到父节点之下。
			///	</summary>
			///	<param name="tagName" type="String">标签名。</param>
			///	<param name="textContent" type="String">文本内容。</param>
			///	<param name="_eventName" type="String">需要触发的事件。</param>
			var element = this.appendElement(tagName);

			// 如果是自动闭合标签
			if(
				_auto
			){
				// 设置auto属性
				element.setAttribute("auto", _closingTagId);
			}

			// 设置当前父元素
			this.setParentNode(element);
			// 添加start元素
			this.appendElement("start", textContent, _eventName, element);
			
			// 返回元素
			return element;
		}
	});
	
	return SyntaxElement;
}(
	this.SyntaxNode,
	// createElement
	function(tagName){
		return document.createElementNS("rex", tagName);
	}
);

this.SyntaxTree = function(
	SyntaxElement, SyntaxTags,
	TextTag, MultipleTag, OpeningTag, ClosingTag,
	PlainText, RegExp,
	COMMENT_REGEXP,
	current,
	lastIndexOf, replaceComment
){
	function SyntaxTree(code){
		///	<summary>
		///	语法树，用于代码解析。
		///	</summary>
		///	<param name="code" type="String">需要提供的语法代码。</param>
		this.assign({
			plainText : new PlainText(this),
			syntaxTags : new SyntaxTags()
		});
	};
	SyntaxTree = new Class(SyntaxTree, SyntaxElement);

	SyntaxTree.static({
		get current(){
			///	<summary>
			///	获取当前实例。
			///	</summary>
			return current;
		}
	});

	SyntaxTree.props({
		add : function(syntaxTag, _prior){
			///	<summary>
			///	添加语法标签。
			///	</summary>
			///	<param name="syntaxTag" type="SyntaxTag">需要添加的语法标签。</param>
			///	<param name="_prior" type="Boolean">优先级是否较高。</param>
			var syntaxTags = this.syntaxTags, source = "(?:" + syntaxTag.regexp.source + ")()";
			
			// 添加标签
			syntaxTags.setNamedItem(syntaxTag, _prior ? 0 : null);

			// 如果已经存在正则
			if(
				this.regexp !== null
			){
				// 如果优先级较高
				if(
					_prior	
				){
					// 那么向原正则源数据之前添加
					source += "|" + this.regexp.source;
				}
				else {
					// 那么向原正则源数据之后添加
					source = this.regexp.source + "|" + source;
				}
			}

			this.regexp = new RegExp(source, "g");
			return this;
		},
		create : function(){
			///	<summary>
			///	创建语法树节点。
			///	</summary>
			var syntaxTree = this, code = this.code, syntaxTags = this.syntaxTags, plainText = this.plainText;
			
			// 设置当前的语法树
			current = this;
			
			// 替换注释，ps：如果在解析中替换注释，会影响asi机制
			code = code.replace(COMMENT_REGEXP, replaceComment);
			
			// 解析树
			code.replace(
				this.regexp,
				function(str){
					var tag = syntaxTags[lastIndexOf.call(arguments, "") - 1];
					
					// 如果该标签已经被忽略
					if(
						tag.ignored
					){
						return "";
					}
					
					var substring, id = tag.id, fragment = syntaxTree.fragment;
					
					// 记录substring
					substring = code.substring(
						syntaxTree.codeIndex,
						arguments[arguments.length - 2]
					);

					// 如果片段不为空字符
					if(
						substring.length > 0
					){
						// 添加片段文本
						fragment += substring;
						// 将片段文本添加到树
						syntaxTree.appendText(substring);
					}
					
					// 记录codeIndex：原始索引起始点加上substring的长度
					syntaxTree.codeIndex += substring.length;
					// 记录fragment
					syntaxTree.setFragment(fragment);
					
					// 判断标签类型
					switch(
						true
					){
						// 如果是纯文本模式，而且无法跳转到指定条件
						case !(plainText.disabled || plainText.goto(id)) :
							// 返回
							return "";
						
						// 如果是文本标签
						case tag instanceof TextTag :
							// 添加该文本节点的文本内容要当到片段中，ps：这里不能设置str，因为事件被触发，可能会修改文本内容
							syntaxTree.setFragment(
								fragment +
								// 如果 上一个元素不是dot，dot后面的文本应该是普通文本，不应该被触发事件，如：this.function;
								syntaxTree
									.appendText(
										str,
										id,
										null,
										tag.isEnding
									)
									.textContent
							);
							break;
							
						// 如果是起始标签
						case tag instanceof OpeningTag :
							syntaxTree.appendOpening(tag.name, str, id, tag.auto, tag.closingTagId);
							break;
						
						// 如果是结束标签
						case tag instanceof ClosingTag :
							syntaxTree.appendClosing(tag.name, str, id);
							break;
						
						// 默认
						default :
							syntaxTree.appendElement(tag.name, str, id, null, tag.isEnding, tag instanceof MultipleTag);
							break;
					}
					
					// 索引起始点加上str的长度
					syntaxTree.codeIndex += str.length;
					return "";
				}
			);

			// 添加到树
			this.parentNode
				.appendChild(
					SyntaxElement.createText(
						code.substring(
							syntaxTree.codeIndex
						)	
					)
				);
			
			// 清空current
			current = null;

			// 返回树
			return this.global;
		},
		disableRexMode : function(){
			///	<summary>
			///	关闭rex模式。
			///	</summary>
			this.rexModeEnabled = false;
			return this;
		},
		enableRexMode : function(){
			///	<summary>
			///	启用rex模式。
			///	</summary>
			this.rexModeEnabled = true;
			return this;
		},
		plainText : null,
		regexp : null,
		rexModeEnabled : false,
		syntaxTags : null
	});

	return SyntaxTree;
}(
	this.SyntaxElement,
	this.SyntaxTags,
	this.TextTag,
	this.MultipleTag,
	this.OpeningTag,
	this.ClosingTag,
	this.PlainText,
	RegExp,
	// COMMENT_REGEXP
	/\/\*[\S\s]*?\*\/|\/\/.*/g,
	// current
	null,
	Array.prototype.lastIndexOf,
	// replaceComment
	function(str){
		// 以换行分隔字符串
		return str.split(
				"\n"
			)
			// 对单行做处理
			.map(function(s){
				return new Array(s.length + 1).join(" ");
			})
			// 以换行连接数组
			.join(
				"\n"
			);
	}
);

}.call(
	this,
	this.SyntaxError,
	Array,
	document
));


// 属性相关
(function(){
	
this.Descriptor = function(){
	function Descriptor(_enumerable, _writable, _configurable, _gettable, _settable){
		///	<summary>
		///	属性描述符。
		///	</summary>
		///	<param name="_enumerable" type="Boolean">是否可枚举。</param>
		///	<param name="_writable" type="Boolean">是否可写入。</param>
		///	<param name="_configurable" type="Boolean">是否可再配置。</param>
		///	<param name="_gettable" type="Boolean">是否是通过获取器获取属性值。</param>
		///	<param name="_setter" type="Boolean">是否是通过设置器设置属性值。</param>
		this.assign({
			configurable : _configurable,
			enumerable : _enumerable,
			gettable : _gettable,
			settable : _settable,
			writable : _writable
		});
	};
	Descriptor = new Class(Descriptor);

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
	function Property(value){
		///	<summary>
		///	属性类，一般用于特殊的属性声明。
		///	</summary>
		///	<param name="value" type="*">属性值。</param>
		this.assign(
			{ value : value }
		);
	};
	Property = new Class(Property);

	Property.props({
		value : null
	});

	return Property;
}(
	this.Descriptor
);

this.NamedProperty = function(Property, Descriptor){
	function NamedProperty(name, value, _descriptor){
		///	<summary>
		///	已命名的属性类，一般用于特殊名称的对象属性声明。
		///	</summary>
		///	<param name="name" type="String">属性名称。</param>
		///	<param name="value" type="*">属性值。</param>
		///	<param name="_descriptor" type="Descriptor">属性描述符。</param>
		this.assign({
			descriptor : _descriptor,
			name : name
		});
	};
	NamedProperty = new Class(NamedProperty, Property);

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
	function Accessor(name, _getter, _setter){
		///	<summary>
		///	访问器属性。
		///	</summary>
		///	<param name="name" type="String">属性名称。</param>
		///	<param name="_getter" type="Function">属性获取器。</param>
		///	<param name="_setter" type="Function">属性设置器。</param>
		this.assign({
			value : this.assign.call(
				{},
				{ get : _getter, set : _setter }
			)
		});
	};
	Accessor = new Class(Accessor, NamedProperty);

	Accessor.override({
		descriptor : new Descriptor(true, false, true, true, true)
	});

	return Accessor;
}(
	this.NamedProperty,
	this.Descriptor
);

this.Getter = function(Accessor){
	function Getter(name, getter){
		///	<summary>
		///	访问器属性。
		///	</summary>
		///	<param name="name" type="String">属性名称。</param>
		///	<param name="getter" type="Function">属性获取器。</param>
	};
	Getter = new Class(Getter, Accessor);

	return Getter;
}(
	this.Accessor
);

this.Setter = function(Accessor){
	function Setter(name, setter){
		///	<summary>
		///	访问器属性。
		///	</summary>
		///	<param name="name" type="String">属性名称。</param>
		///	<param name="setter" type="Function">属性设置器。</param>
	};
	Setter = new Class(Setter, Accessor);

	return Setter;
}(
	this.Accessor
);

this.NamedProperties = function(NamedProperty, define, forEach){
	function NamedProperties(){
		///	<summary>
		///	属性集合类，一般用于特殊名称的对象属性声明。
		///	</summary>
		this.add.apply(this, arguments);
	};
	NamedProperties = new Class(NamedProperties);
	
	NamedProperties.props({
		add : function(){
			///	<summary>
			///	添加属性。
			///	</summary>
			
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
		remove : function(name){
			///	<summary>
			///	移除指定名称的属性。
			///	</summary>
			delete this[name];
			
			return this;
		}
	});
	
	return NamedProperties;
}(
	this.NamedProperty,
	Rexjs.define,
	Rexjs.forEach
);

}.call(
	this
));


// 语法解析器基类相关
(function(){

this.IECMAScript6Parser = new Interface(["parse"]);

this.ECMAScript6Parser = function(IECMAScript6Parser, SyntaxWalker, SyntaxTree, OperatorTag, Element, querySpecialSelector){
	function ECMAScript6Parser(syntaxTree){
		///	<summary>
		///	解析器基类。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		this.assign(
				{ syntaxTree : syntaxTree }
			)
			.parse();
	};
	ECMAScript6Parser = new Class(ECMAScript6Parser, IECMAScript6Parser);

	ECMAScript6Parser.static({
		extractNodesBetween : function(first, second, _rootNode, _includeFirst, _includeSecond){
			///	<summary>
			///	提取2个节点之间的所有节点（提取：移除后并添加到一个DocumentFragment对象内）。
			///	</summary>
			///	<param name="first" type="Node">第一个节点。</param>
			///	<param name="second" type="Node">第二个节点。</param>
			///	<param name="_rootNode" type="Node">指定的根节点。</param>
			///	<param name="_includeFirst" type="Boolean">是否提取第1个节点。</param>
			///	<param name="_includeSecond" type="Boolean">是否连提取第2个节点。</param>
			return SyntaxWalker.extractNodesBetween.apply(SyntaxWalker, arguments);
		},
		extractTextBetween : function(first, second){
			///	<summary>
			///	提取2个节点之间的文本内容。
			///	</summary>
			///	<param name="first" type="Node">第一个节点。</param>
			///	<param name="second" type="Node">第二个节点。</param>
			return SyntaxWalker.extractNodesBetween.apply(SyntaxWalker, arguments).textContent;
		},
		getEndElement : function(groupElement){
			///	<summary>
			///	获取匹配组元素的end元素。
			///	</summary>
			///	<param name="groupElement" type="Element">匹配组元素。</param>
			return groupElement.lastElementChild;
		},
		getPreviousElementSibling : function(node){
			///	<summary>
			///	获取指定节点的上一个兄弟元素。
			///	</summary>
			///	<param name="node" type="Node">指定的节点。</param>
			
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
		getSeparatorElement : function(node){
			///	<summary>
			///	获取指定的节点所的处语句分隔符。
			///	</summary>
			///	<param name="node" type="Node">指定的节点。</param>
			var elementSibling = node.previousElementSibling;
			
			while(
				elementSibling
			){
				switch(
					true
				){
					// 如果是分号
					case elementSibling.tagName === "semicolon" :
						break;
						
					// 如果是start元素，说明前面已经没有同级元素了，而且是个新的“作用域”
					case elementSibling.tagName === "start" :
						break;
					
					// 如果是运算符
					case this.isOperator(elementSibling) :
						break;
					
					default :
						// 继续获取上一个兄弟元素
						elementSibling = elementSibling.previousElementSibling;
						continue;
				}
				
				return elementSibling;
			}
			
			return elementSibling;
		},
		getStartElement : function(groupElement){
			///	<summary>
			///	获取匹配组元素的start元素。
			///	</summary>
			///	<param name="groupElement" type="Element">匹配组元素。</param>
			return groupElement.firstElementChild;
		},
		getTextBetween : function(first, second, _includeFirst, _includeSecond){
			///	<summary>
			///	获取2个节点之间的文本字符串。
			///	</summary>
			///	<param name="first" type="Node">第一个节点。</param>
			///	<param name="second" type="Node">第二个节点。</param>
			///	<param name="_includeFirst" type="Boolean">区域是否将包含第1个节点。</param>
			///	<param name="_includeSecond" type="Boolean">区域是否将包含第2个节点。</param>
			return SyntaxWalker.getTextBetween.apply(SyntaxWalker, arguments);
		},
		isEmpty : function(textContent){
			///	<summary>
			///	判断指定字符串是否只包含空白字符串。
			///	</summary>
			///	<param name="textContent" type="String">指定的字符串。</param>
			return textContent.trim() === "";
		},
		isEmptyBetween : function(first, second, _siblingable){
			///	<summary>
			///	判断2个节点之间的文本字符串是否是空的。
			///	</summary>
			///	<param name="first" type="Node">第一个节点。</param>
			///	<param name="second" type="Node">第二个节点。</param>
			///	<param name="_siblingable" type="Boolean">两个节点是否可能属于相邻元素节点。</param>
			
			// 如果两个节点可能属于相邻元素节点 
			if(
				_siblingable
			){
				// 判断两节点的相邻关系，如果为 true，则继续
				if(
					second.previousElementSibling === first
				){
					var fragment = second.fragment;
					
					// 如果 fragment 为字符串
					if(
						typeof fragment === "string"
					){
						// 返回判断结果
						return this.isEmpty(fragment);
					}
				}
			}
			
			// 返回是否为空的结果
			return this.isEmpty(
				// 获取两节点之间的文本
				this.getTextBetween(first, second)
			);
		},
		isOperator : function(element, _value){
			///	<summary>
			///	判断指定元素是否是运算符。
			///	</summary>
			///	<param name="element" type="Element">指定的元素。</param>
			///	<param name="_value" type="String">指定的运算符的value属性值。</param>
			
			// 如果兄弟元素不是运算符
			if(
				!this.tagOf(element, OperatorTag)
			){
				return false;
			}
			
			// 返回判断结果
			return _value ? element.getAttribute("value") === _value : true;
		},
		protectMethod : function(first, second, node, fragment, _firstContent, _secondContent){
			///	<summary>
			///	在第一个节点之前与第二个节点之后，添加保护性的小括号，用于保护解析后文本内容中的方法，防止new的错误调用。
			///	</summary>
			///	<param name="first" type="Node">指定的第一个节点。</param>
			///	<param name="second" type="Node">指定的第二个节点。</param>
			///	<param name="node" type="Node">用于判断withOperator的节点。</param>
			///	<param name="fragment" type="String">用于判断withOperator的片段文本。</param>
			///	<param name="_firstContent" type="String">需要重置第一个节点的文本内容。</param>
			///	<param name="_secondContent" type="String">需要重置第二个节点的文本内容。</param>
			
			var withNew = this.withOperator(node, fragment, "new");
			
			// 设置first文本内容
			first.textContent = (withNew ? "(" : " ") + (_firstContent == null ? first.textContent : _firstContent);
			// 设置second文本内容
			second.textContent = (_secondContent == null ? second.textContent : _secondContent) + (withNew ? ")" : "");
			
			return this;
		},
		querySpecialSelector : function(element, selector){
			///	<summary>
			///	查询指定元素第一个符合条件的节点。
			///	</summary>
			///	<param name="element" type="Element">指定的元素。</param>
			///	<param name="selector" type="String">子节点选择器。</param>
			return querySpecialSelector(element, selector, false);
		},
		querySpecialSelectorAll : function(element, selector){
			///	<summary>
			///	查询指定元素所有符合条件的节点。
			///	</summary>
			///	<param name="element" type="Element">指定的元素。</param>
			///	<param name="selector" type="String">子节点选择器。</param>
			return querySpecialSelector(element, selector, true);
		},
		tagOf : function(element, SyntaxTag){
			///	<summary>
			///	判断元素是否属于指定的标签类型。
			///	</summary>
			///	<param name="element" type="Element">指定的元素。</param>
			///	<param name="SyntaxTag" type="SyntaxTag">指定的类型标签。</param>
			return SyntaxTree.current.syntaxTags[element.tagName] instanceof SyntaxTag;
		},
		withOperator : function(node, fragment, _value){
			///	<summary>
			///	判断指定节点是否与运算符一起存在。
			///	</summary>
			///	<param name="node" type="Node">指定的节点。</param>
			///	<param name="fragment" type="String">该节点之前的片段文本。</param>
			///	<param name="_value" type="String">指定的运算符的value属性值。</param>
			
			// 如果不需要判断运算符的value属性
			if(
				!_value
			){
				// 如果父节点是小括号或中括号，则返回true
				switch(
					node.parentNode.tagName
				){
					case "parenthesis" :
						return true;
	
					case "bracket" :
						return true;
				}
			}

			// 如果文本是空的
			if(
				this.isEmpty(fragment)
			){
				var elementSibling = this.getPreviousElementSibling(node);
				
				// 如果兄弟元素存在
				if(
					elementSibling !== null
				){
					return this.isOperator(elementSibling, _value);
				}
			}

			// 默认返回false
			return false;
		}
	});

	ECMAScript6Parser.props({
		syntaxTree : null
	});

	return ECMAScript6Parser;
}(
	this.IECMAScript6Parser,
	this.SyntaxWalker,
	this.SyntaxTree,
	this.OperatorTag,
	Element,
	// querySpecialSelector
	function(element, selector, shouldGetAll){
		var result;
		
		// 因为在IE11，下面使用 #id > * 或 .class > * 是无法查找子元素的
		element.setAttribute("rex", "");
		
		// 如果是查找子元素
		if(
			selector[0] === ">"
		){
			// 在当前元素查找
			result = element["querySelector" + (shouldGetAll ? "All" : "")]("[rex]" + selector);
		}
		// 如果查找非子元素
		else {
			// 则在该元素的父节点上查找
			result = element.parentNode["querySelector" + (shouldGetAll ? "All" : "")]("[rex]" + selector);
		}

		// 移除rex属性
		element.removeAttribute("rex");

		return result;
	}
);

this.ECMAScript6EmptyParser = function(ECMAScript6Parser){
	function ECMAScript6EmptyParser(syntaxTree){
		///	<summary>
		///	空解析器，一般用于添加语法标签，而不对该标签进行解析。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6EmptyParser = new Class(ECMAScript6EmptyParser, ECMAScript6Parser);
	
	ECMAScript6EmptyParser.props({
		parse : function(){
			///	<summary>
			///	空解析，什么也不做。
			///	</summary>
		}
	});
	
	return ECMAScript6EmptyParser;
}(
	this.ECMAScript6Parser
);

this.ECMAScript6Exception = function(ECMAScript6Parser){
	function ECMAScript6Exception(syntaxTree){
		///	<summary>
		///	异常解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6Exception = new Class(ECMAScript6Exception, ECMAScript6Parser);
	
	ECMAScript6Exception.props({
		catch : function(name, description){
			// 监听指定的事件名称
			return this
				.syntaxTree
				.listen(
					name,
					function(element){
						// 只要进入回调函数，则说明出现异常，报错
						this.error(element, description);
					}
				);
		}
	});
	
	return ECMAScript6Exception;
}(
	this.ECMAScript6Parser
);

}.call(
	this
));


// 包相关
(function(){

this.IPackage = new Interface(["contents"]);

this.Package = function(List, toArray){
	function Package(syntaxTree){
		///	<summary>
		///	一系列依赖语法树的类所组成的包。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		this.forEach(function(Content){
			new Content(syntaxTree);
		});
	};
	Package = new Class(Package, List);
	
	Package.static({
		package : function(_rest){
			///	<summary>
			///	打包一系列依赖语法树的类。
			///	</summary>
			toArray(
				arguments
			)
			.forEach(
				function(Content){
					this.push(Content);
				},
				this.prototype
			);
			
			return this;
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


// 一些基本的空解析器
(function(ECMAScript6Parser, ECMAScript6EmptyParser, SyntaxTag, MultipleTag, OperatorTag, OpeningTag, ClosingTag, Condition){

this.ECMAScript6String = function(STRING_REGEXP){
	function ECMAScript6String(syntaxTree){
		///	<summary>
		///	字符串解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new SyntaxTag(
				"string",
				STRING_REGEXP
			)
		);
	};
	ECMAScript6String = new Class(ECMAScript6String, ECMAScript6EmptyParser);
	
	return ECMAScript6String;
}(
	// STRING_REGEXP
	/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/
);

this.ECMAScript6RegExp = function(REGEXP_REGEXP){
	function ECMAScript6RegExp(syntaxTree){
		///	<summary>
		///	正则解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new SyntaxTag(
				"regexp",
				REGEXP_REGEXP
			)
		);
	};
	ECMAScript6RegExp = new Class(ECMAScript6RegExp, ECMAScript6EmptyParser);
	
	return ECMAScript6RegExp;
}(
	// REGEXP_REGEXP
	/\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])/
);

this.ECMAScript6Brace = function(OPENING_BRACE_REGEXP, CLOSING_BRACE_REGEXP){
	function ECMAScript6Brace(syntaxTree){
		///	<summary>
		///	大括号解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree
			// 左大括号
			.add(
				new OpeningTag(
					"brace",
					OPENING_BRACE_REGEXP,
					"openingBrace"
				)
			)
			// 右大括号
			.add(
				new ClosingTag(
					"brace",
					CLOSING_BRACE_REGEXP,
					"closingBrace"
				)
			);
	};
	ECMAScript6Brace = new Class(ECMAScript6Brace, ECMAScript6EmptyParser);
	
	return ECMAScript6Brace;
}(
	// OPENING_BRACE_REGEXP
	/\{/,
	// CLOSING_BRACE_REGEXP
	/\}/
);

this.ECMAScript6Bracket = function(OPENING_BRACKET_REGEXP, CLOSING_BRACKET_REGEXP){
	function ECMAScript6Bracket(syntaxTree){
		///	<summary>
		///	中括号解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree
			// 左小括号
			.add(
				new OpeningTag(
					"bracket",
					OPENING_BRACKET_REGEXP,
					"openingBracket"
				)
			)
			// 右中括号
			.add(
				new ClosingTag(
					"bracket",
					CLOSING_BRACKET_REGEXP,
					"closingBracket"
				)
			);
	};
	ECMAScript6Bracket = new Class(ECMAScript6Bracket, ECMAScript6EmptyParser);
	
	return ECMAScript6Bracket;
}(
	// OPENING_BRACKET_REGEXP
	/\[/,
	// CLOSING_BRACKET_REGEXP
	/\]/
);

this.ECMAScript6Parenthesis = function(OPENING_PARENTHESISI_REGEXP, CLOSING_PARENTHESIS_WITH_BRACE_REGEXP, CLOSING_PARENTHESIS_REGEXP){
	function ECMAScript6Parenthesis(syntaxTree){
		///	<summary>
		///	小括号解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree
			// 左小括号
			.add(
				new OpeningTag(
					"parenthesis",
					OPENING_PARENTHESISI_REGEXP,
					"openingParenthesis"
				)
			)
			// 右小括号
			.add(
				new ClosingTag(
					"parenthesis",
					CLOSING_PARENTHESIS_REGEXP,
					"closingParenthesis"
				)
			)
			// 后面紧邻大括号的右小括号，用于语句块的判断
			.add(
				new ClosingTag(
					"parenthesis",
					CLOSING_PARENTHESIS_WITH_BRACE_REGEXP,
					"closingParenthesisWithBrace"
				),
				true
			);
	};
	ECMAScript6Parenthesis = new Class(ECMAScript6Parenthesis, ECMAScript6EmptyParser);
	
	return ECMAScript6Parenthesis;
}(
	// OPENING_PARENTHESISI_REGEXP
	/\(/,
	// CLOSING_PARENTHESIS_WITH_BRACE_REGEXP
	/\)\s*(?=\{)/,
	// CLOSING_PARENTHESIS_REGEXP
	/\)/
);

this.ECMAScript6Semicolon = function(SEMICOLON_REGEXP){
	function ECMAScript6Semicolon(syntaxTree){
		///	<summary>
		///	分号解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new SyntaxTag(
				"semicolon",
				SEMICOLON_REGEXP,
				"semicolon",
				true
			)
		);
	};
	ECMAScript6Semicolon = new Class(ECMAScript6Semicolon, ECMAScript6Parser);
	
	ECMAScript6Parser.props({
		parse : function(){
			///	<summary>
			///	解析分号。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"semicolon",
					function(element, index){
						// 表示当前语句完结，去除当前层级所有的监听器
						this.unlistenSubs(index - 1);
					}
				);
		}
	});
	
	return ECMAScript6Semicolon;
}(
	// SEMICOLON_REGEXP
	/(?:;\s*)+/
);

this.ECMAScript6Double = function(DOUBLE_REGEXP){
	function ECMAScript6Double(syntaxTree){
		///	<summary>
		///	双字符解析器，如：递增、递减、幂。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new MultipleTag(
				"double",
				DOUBLE_REGEXP
			),
			true
		);
	};
	ECMAScript6Double = new Class(ECMAScript6Double, ECMAScript6EmptyParser);
	
	return ECMAScript6Double;
}(
	// DOUBLE_REGEXP
	/\+\+|--|\*\*/
);

this.ECMAScript6Condition = function(CONDITION_REGEXP){
	function ECMAScript6Condition(syntaxTree){
		///	<summary>
		///	条件解析器，如：if、for、while、switch语句。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new MultipleTag(
				"condition",
				CONDITION_REGEXP
			),
			true
		);
	};
	ECMAScript6Condition = new Class(ECMAScript6Condition, ECMAScript6EmptyParser);
	
	return ECMAScript6Condition;
}(
	// CONDITION_REGEXP
	/\b(?:if|for|while|switch)\b(?=\s*\()/
);

this.ECMAScript6Comma = function(COMMA_REGEXP){
	function ECMAScript6Comma(syntaxTree){
		///	<summary>
		///	逗号解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new OperatorTag(
				"comma",
				COMMA_REGEXP,
				"comma",
				true
			)
		);
	};
	ECMAScript6Comma = new Class(ECMAScript6Comma, ECMAScript6EmptyParser);
	
	return ECMAScript6Comma;
}(
	// COMMA_REGEXP
	/,/
);

this.ECMAScript6Spread = function(SPREAD_REGEXP){
	function ECMAScript6Spread(syntaxTree){
		///	<summary>
		///	拓展符解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new OperatorTag(
				"spread",
				SPREAD_REGEXP
			),
			true
		);
	};
	ECMAScript6Spread = new Class(ECMAScript6Spread, ECMAScript6EmptyParser);
	
	return ECMAScript6Spread;
}(
	// SPREAD_REGEXP
	/\.{3}/
);

this.ECMAScript6Dot = function(DOT_REGEXP){
	function ECMAScript6Dot(syntaxTree){
		///	<summary>
		///	点解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new SyntaxTag(
				"dot",
				DOT_REGEXP
			)
		);
	};
	ECMAScript6Dot = new Class(ECMAScript6Dot, ECMAScript6Parser);
	
	ECMAScript6Dot.props({
		parse : function(){
			///	<summary>
			///	解析点。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"dot",
					function(element, index, fragment){
						var id, plainText = this.plainText;
						
						// 监听 goto 事件
						id = this.listen(
							"goto",
							function(e, i, f){
								// 如果是片段文本是空的
								if(
									ECMAScript6Parser.isEmpty(f)
								){
									// 返回
									return;
								}
								
								// 取消 goto 事件的监听
								this.unlisten(id);
								// 关闭纯文本模式
								plainText.disable();
							},
							index
						);
						
						// 开启纯文本模式
						plainText.enable();
					}
				);
		}
	});
	
	return ECMAScript6Dot;
}(
	// DOT_REGEXP
	/\./
);

this.ECMAScript6This = function(THIS_REGEXP){
	function ECMAScript6This(syntaxTree){
		///	<summary>
		///	this 关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new SyntaxTag(
				"this",
				THIS_REGEXP
			)
		);
	};
	ECMAScript6This = new Class(ECMAScript6This, ECMAScript6EmptyParser);
	
	return ECMAScript6This;
}(
	// THIS_REGEXP
	/\bthis\b/
);

this.ECMAScript6Operator = function(OPERATOR_REGEXP){
	function ECMAScript6Operator(syntaxTree){
		///	<summary>
		///	操作符解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new OperatorTag(
				"operator",
				OPERATOR_REGEXP
			)
		);
	};
	ECMAScript6Operator = new Class(ECMAScript6Operator, ECMAScript6EmptyParser);
	
	return ECMAScript6Operator;
}(
	// OPERATOR_REGEXP
	/[+-/*|&!~^%?:=<>]/
);

this.ECMAScript6Result = function(RESULT_REGEXP){
	function ECMAScript6Result(syntaxTree){
		///	<summary>
		///	具有返回结果性质的操作符解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new OperatorTag(
				"result",
				RESULT_REGEXP
			),
			true
		);
	};
	ECMAScript6Result = new Class(ECMAScript6Result, ECMAScript6EmptyParser);
	
	return ECMAScript6Result;
}(
	// RESULT_REGEXP
	/\b(?:void|typeof|instanceof|new|in)\b|\b(?:return|throw)\b(?=[^\S\n]*\S)\b/
);

this.BasicPackage = function(Package, contents){
	function BasicPackage(syntaxTree){
		///	<summary>
		///	基础的语法包。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	BasicPackage = new Class(BasicPackage, Package);
	
	BasicPackage
		.package
		.apply(
			BasicPackage,
			contents
		);
	
	return BasicPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScript6String,
		this.ECMAScript6RegExp,
		this.ECMAScript6Brace,
		this.ECMAScript6Bracket,
		this.ECMAScript6Parenthesis,
		this.ECMAScript6Semicolon,
		this.ECMAScript6Double,
		this.ECMAScript6Condition,
		this.ECMAScript6Comma,
		this.ECMAScript6Spread,
		this.ECMAScript6Dot,
		this.ECMAScript6This,
		this.ECMAScript6Operator,
		this.ECMAScript6Result
	]
);
	
}.call(
	this,
	this.ECMAScript6Parser,
	this.ECMAScript6EmptyParser,
	this.SyntaxTag,
	this.MultipleTag,
	this.OperatorTag,
	this.OpeningTag,
	this.ClosingTag,
	this.Condition
));


// 一些面向对象和模块的共用类
(function(ECMAScript6Parser, SyntaxTree, Condition){
	
this.ECMAScript6Member = function(ExpressionTag, AS_REGEXP, commaCondition, closingBraceCondition, toArray, appendValue){
	function ECMAScript6Member(syntaxTree){
		///	<summary>
		///	成员类，一般是用于赋予成员或提取成员。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		
		// 添加as标签
		syntaxTree.add(
			new ExpressionTag(
				"as",
				AS_REGEXP
			)
		);
		
		// 忽略as标签
		syntaxTree
			.syntaxTags
			.ignore(
				"as"
			);
	};
	ECMAScript6Member = new Class(ECMAScript6Member, ECMAScript6Parser);
	
	ECMAScript6Member.props({
		parse : function(){
			///	<summary>
			///	解析成员。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"member",
					function(element, index){
						var separatorElement, asElement = null, syntaxTags = this.syntaxTags, plainText = this.plainText;
						
						// 将首个分隔元素设置为 start 元素
						separatorElement = ECMAScript6Parser.getStartElement(element);
						
						// 取消 as 标签的忽略
						syntaxTags.unignore("as");
						
						// 监听 wrap 事件，目的是防止asi机制
						this.listen(
							"wrap",
							function(e, i, f, n, p){
								// 阻止其他监听器执行
								p();
							},
							index
						);
						
						// 监听 as 事件
						this.listen(
							"as",
							function(asEl){
								// 如果与分隔符中间的文本是空的，则说明 as 也就是一个变量名
								if(
									ECMAScript6Parser.isEmptyBetween(separatorElement, asEl)
								){
									return;
								}
								
								// 开启纯文本模式
								plainText.enable(commaCondition, closingBraceCondition);
								
								// 记录元素并清空文本
								(asElement = asEl).textContent = "";
							},
							index
						);
						
						// 监听 comma 事件
						this.listen(
							"comma",
							function(commaElement){
								// 设置分隔符
								separatorElement = commaElement;
							},
							index
						);
						
						// 监听 closingBrace 事件
						this.once(
							"closingBrace",
							function(){
								// 忽略 as 标签
								syntaxTags.ignore("as");
							},
							index
						);
						
						// 监听 appendMemberValue 事件
						this.listen(
							"appendMemberValue",
							function(){
								// 添加值
								appendValue(
									element,
									separatorElement,
									asElement ? asElement : element,
									asElement ? true : false
								);
							},
							index
						);
						
						// 监听 beforeEnding
						this.listen(
							"beforeEnding",
							function(){
								// 触发 appendMemberValue 事件
								this.dispatch("appendMemberValue", element, index);
								
								// 清空as元素记录
								asElement = null;
							},
							index
						);
					}
				);
		}
	});
	
	return ECMAScript6Member;
}(
	this.ExpressionTag,
	// AS_REGEXP
	/\bas\b/g,
	// commaCondition
	new Condition("comma"),
	// closingBraceCondition
	new Condition("closingBrace"),
	Rexjs.toArray,
	// appendValue
	function(element, separatorElement, targetElement, hasAs){
		element.appendChild(
			 SyntaxTree.createText(
				// 添加冒号
				":" +
				// 获取文本
				ECMAScript6Parser[
					(hasAs ? "extract" : "get") + "TextBetween"
				](
					separatorElement,
					targetElement
				)[
					// 如果有as，则不需要去除空格
					hasAs ? "toString" : "trim"
				]()
			)
		);
	}
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.Condition
));


// 函数相关解析器
(function(ECMAScript6Parser, SyntaxTree, OpeningTag, ExpressionTag, toArray){
	
this.ECMAScript6Arguments = function(fillArguments){
	function ECMAScript6Arguments(syntaxTree){
		///	<summary>
		///	函数参数解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6Arguments = new Class(ECMAScript6Arguments, ECMAScript6Parser);
	
	ECMAScript6Arguments.props({
		parse : function(){
			return this
				.syntaxTree
				.listen(
					"arguments",
					function(element, index){
						var separatorElements = toArray(
							ECMAScript6Parser.querySpecialSelectorAll(
								element,
								">comma"
							)
						);
				
						// 将end标签添加到数组中，否则最后一个参数不会被解析
						separatorElements.push(
							// end标签为父元素的最后一个元素
							ECMAScript6Parser.getEndElement(element)
						);
						
						this.once(
							"openingBrace",
							function(e){
								// 填充参数
								fillArguments(ECMAScript6Parser, SyntaxTree, element, e, separatorElements);
							},
							index,
							index - 1
						);
					}
				);
		}
	});
	
	return ECMAScript6Arguments;
}(
	// fillArguments
	function(ECMAScript6Parser, SyntaxTree, parenthesisElement, braceElement, separatorElements){
		var last, argumentNames = [], max = separatorElements.length - 1;

		// 初始化第一个分隔元素，即start元素
		last = ECMAScript6Parser.getStartElement(parenthesisElement);

		// 遍历数组
		separatorElements.forEach(
			function(separatorElement, i){
				var name, fragment, equalElement;

				// 提取单个参数
				fragment = ECMAScript6Parser.extractNodesBetween(last, separatorElement, null, true);
				// 查找等于号
				equalElement = ECMAScript6Parser.querySpecialSelector(last, '+operator[value="="]');

				// 移除 "{" 或 ","，确保片段文本是以参数名称开头
				fragment.removeChild(last);

				// 存储参数信息函数
				this(fragment, equalElement, i);

				// 记录上一个分隔元素
				last = separatorElement;
			},
			function(fragment, equalElement, i){
				var name, withoutDefault = true;
				
				// 如果等号存在，说明定义了默认值
				if(
					equalElement
				){
					// 记录 name
					name = ECMAScript6Parser.getTextBetween(
							fragment,
							equalElement
						)
						.trim();
						
					withoutDefault = false;
					// 重新设置等号内文本为默认值
					equalElement.textContent = "=" + name + "!== void 0 ?" + name + ":";
				}
				else {
					// 如果没有等号，则说明是普通参数或是省略参数
					name = fragment.textContent;
	
					// 如果i等于max，说明是最后一个参数
					if(
						i === max
					){
						// 如果是空字符串
						if(
							ECMAScript6Parser.isEmpty(name)
						){
							// 返回
							return;
						}
						
						var spreadElement = fragment.querySelector("spread");
						
						// 如果存在spread子元素，则说明是有省略参数
						if(
							spreadElement && spreadElement.parentNode === fragment
						){
							// 清空文本内容
							spreadElement.textContent = "";
							// 重新设置为没有拓展符的字符串
							name = fragment.textContent;
							// 重新设置文本内容
							fragment.textContent = name + "= Rexjs.toArray(arguments, " + i + ")";
							withoutDefault = false;
						}
						
						// 清除空格
						name = name.trim();
					}
				}
					
				// 添加名称
				argumentNames.push(name);
				
				// 如果没有默认值
				if(
					withoutDefault
				){
					// 返回
					return;
				}
				
				// 添加分号
				fragment.appendChild(
					SyntaxTree.createText(";")
				);
				
				// 添加默认值参数
				braceElement.appendChild(fragment);
			}
		);
		
		// 设置小括号内文本内容
		parenthesisElement.textContent = "(" + argumentNames.join(",") + ")";
	}
);

this.ECMAScript6Function = function(FUNCTION_REGEXP){
	function ECMAScript6Function(syntaxTree){
		///	<summary>
		///	函数解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		
		// 添加函数语法标签
		syntaxTree.add(
			new ExpressionTag(
				"function",
				FUNCTION_REGEXP
			)
		);
		
		// 解析rex模式
		this.parseRexMode(syntaxTree.global, syntaxTree.index);
	};
	ECMAScript6Function = new Class(ECMAScript6Function, ECMAScript6Parser);

	ECMAScript6Function.props({
		parse : function(){
			///	<summary>
			///	解析函数。
			///	</summary>
			var ecmaScript6Function = this, syntaxTree = this.syntaxTree;

			syntaxTree.listen(
				"closingParenthesisWithBrace",
				function(element, index, fragment){
					var sibling = element.previousElementSibling;

					// 如果没有使用function定义，则认定为if、for、while等语句
					if(
						sibling === null || sibling.tagName !== "function"
					){
						return;
					}

					this.dispatch("closingParenthesisOfFunction", element, index, fragment);
				}
			);
			
			return syntaxTree.listen(
				"closingParenthesisOfFunction",
				function(element, index, fragment){
					// 解析主体
					ecmaScript6Function.parseBody(index);
					
					// 触发 arguments 事件，以解析参数
					this.dispatch("arguments", element, index, fragment);
				}
			);
		},
		parseBody : function(index){
			///	<summary>
			///	解析函数主体。
			///	</summary>
			///	<param name="index" type="Number">索引。</param>
			var ecmaScript6Function = this;
			
			return this
				.syntaxTree
				.once(
					"openingBrace",
					function(element, i, fragment, next, prevent){
						// 阻止其他监听器执行
						prevent();
						
						// 如果rex模式已经开启
						if(
							this.rexModeEnabled
						){
							// 则不需要继续解析rex模式
							return;
						}
						
						// 监听rexMode事件
						this.once(
							"rexMode",
							function(){
								// 监听函数的结束大括号标志
								this.once(
									"closingBrace",
									function(){
										// 关闭rex模式
										this.disableRexMode();
									},
									index
								);
							},
							index
						);
						
						// 解析模式
						ecmaScript6Function.parseRexMode(element, index);
					},
				index,
				index - 1
			);
		},
		parseRexMode : function(braceElement, index){
			///	<summary>
			///	解析模式。
			///	</summary>
			///	<param name="braceElement" type="Node">函数主体大括号元素。</param>
			///	<param name="index" type="Number">索引。</param>
			
			// 监听字符串
			return this
				.syntaxTree
				.once(
					"string",
					function(element, i, fragment){
						var textContent = element.textContent;
						
						// 确认文本
						if(
							textContent.substring(1, textContent.length - 1) !== "use strict -rex"
						){
							return;
						}
						
						// 如果与 start 元素之间的文本不为空，那么说明不是函数的第一个语句
						if(
							!ECMAScript6Parser.isEmptyBetween(
								ECMAScript6Parser.getStartElement(braceElement),
								element
							)
						){
							// 返回
							return;
						}
						
						// 重置文本内容
						element.textContent = '"use strict"';
						
						// 开启rex模式
						this.enableRexMode();
						
						// 触发rexMode事件
						this.dispatch("rexMode", element, index, fragment);
					},
					index
				);
		}
	});

	return ECMAScript6Function;
}(
	// FUNCTION_REGEXP
	/\bfunction\b/
);

this.ECMAScript6ArrowFunction = function(ARROW_REGEXP, resetStartElement, insertFunction){
	function ECMAScript6ArrowFunction(syntaxTree){
		///	<summary>
		///	箭头函数解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new OpeningTag(
				"brace",
				ARROW_REGEXP,
				"arrow",
				"closingBrace"
			),
			true
		);
	};
	ECMAScript6ArrowFunction = new Class(ECMAScript6ArrowFunction, ECMAScript6Parser);
	
	ECMAScript6ArrowFunction.props({
		parse : function(){
			///	<summary>
			///	开始解析箭头函数。
			///	</summary>
			var ecmaScript6ArrowFunction = this;
			
			return this
				.syntaxTree
				.listen(
					"arrow",
					function(element, index){
						var eid, functionElement, hasOpeningBrace = resetStartElement(element);
						
						// 如果箭头函数有参数的小括号
						functionElement = insertFunction(element, this, index);
						
						// 触发openingBrace事件
						this.dispatch("openingBrace", element, index, "");
						
						// 监听结束大括号
						this.once(
							"closingBrace",
							function(){
								// 取消 parseEnding 的监听，当然eid也可能是undefined，因为parseEnding不一定会执行到
								this.unlisten(eid);
								
								// 给 functionElement 加保护
								ECMAScript6Parser.protectMethod(
									functionElement,
									ECMAScript6Parser.getEndElement(element),
									functionElement,
									"",
									null,
									// 并修改end的文本内容
									";}.bind(this)"
								);
							},
							index
						);
						
						// 如果已经有大括号
						if(
							hasOpeningBrace
						){
							return;
						}
						
						// 创建 result 元素
						var resultElement = SyntaxTree.createElement("result");
						
						// 设置文本内容
						resultElement.textContent = "return ";
						// 添加到 element 之下
						element.appendChild(resultElement);
						
						// 解析结束
						ecmaScript6ArrowFunction.parseEnding(element, index);
					}
				);
		},
		parseEnding : function(arrorElement, index){
			///	<summary>
			///	解析分号。
			///	</summary>
			return this
				.syntaxTree
				.once(
					"beforeEnding",
					function(element){
						// 添加结束大括号并触发closingBrace事件
						this.appendClosing("brace", "}", "closingBrace");
						
						// 这里要触发父级的 beforeEnding，因为本来就是插入了一层brace，从而拦截了父级的 beforeEnding 事件，所以index - 1
						this.dispatch("beforeEnding", element, index - 1, "");
					},
					index
				);
		}
	});
	
	return ECMAScript6ArrowFunction;
}(
	// ARROW_REGEXP
	/=>\s*\{?/,
	// resetStartElement
	function(element){
		var startElement = ECMAScript6Parser.getStartElement(element),
		
			textContent = startElement.textContent, hasOpeningBrace = textContent[textContent.length - 1] === "{";
		
		// 设置start元素的文本内容
		startElement.textContent = textContent.substring(2) + (hasOpeningBrace ? "" : "{");
		
		return hasOpeningBrace;
	},
	// insertFunction
	function(element, syntaxTree, index){
		var functionElement = SyntaxTree.createElement("function"), siblingNode = element.previousElementSibling;
		
		// 设置文本
		functionElement.textContent = " function";
		
		// 如果有小括号
		if(
			siblingNode.tagName === "parenthesis"
		){
			// 插入function元素
			siblingNode
				.parentNode
				.insertBefore(
					functionElement,
					siblingNode
				);
				
			// 触发arguments事件，目的是解析函数参数				
			syntaxTree.dispatch("closingParenthesisWithBrace", siblingNode, index, "");
		}
		else {
			// 设置function关键字文本，加上起始小括号
			functionElement.textContent += "(";
			// 设置箭头关键字文本，加上结束小括号
			element.textContent = ")" + element.textContent;
			
			// 插入function元素到当前的兄弟节点的下一个节点（即参数文本节点）
			siblingNode
				.parentNode
				.insertBefore(
					functionElement,
					siblingNode.nextSibling
				);
			
			// 监听 openingBrace 事件，目的是拦截对象的监听
			syntaxTree.once("openingBrace", function(){}, index, index - 1);
		}
		
		return functionElement;
	}
);

this.ECMAScript6FunctionCall = function(value, bind, withoutThis){
	function ECMAScript6FunctionCall(syntaxTree){
		///	<summary>
		///	函数调用解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6FunctionCall = new Class(ECMAScript6FunctionCall, ECMAScript6Parser);
	
	ECMAScript6FunctionCall.static({
		bind : function(fn, _this, _arguments){
			///	<summary>
			///	给指定函数绑定this和参数。
			///	</summary>
			///	<param name="fn" type="Function">指定的函数。</param>
			///	<param name="_this" type="需要绑定的this">依赖的语法树。</param>
			///	<param name="_arguments" type="Array">需要绑定的参数列表。</param>
			var args = [_this];
			
			if(
				_arguments
			){
				args.push.apply(args, _arguments);
			}
			
			return bind.apply(fn, args);
		},
		get this(){
			// 记录当前值
			var val = value;
			
			// 清空当前值
			value = null;
			// 返回记录值
			return val;
		},
		set this(val){
			value = val;
		}
	});
	
	ECMAScript6FunctionCall.props({
		parse : function(){
			///	<summary>
			///	解析函数调用。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"closingParenthesis",
					function(element, index, fragment){
						// 如果没有找到拓展符，则返回，不做任何处理
						if(
							ECMAScript6Parser.querySpecialSelector(element, ">spread") === null
						){
							return;
						}
						
						var previousElementSibling = element.previousElementSibling,
						
							separator = ECMAScript6Parser.getSeparatorElement(element);
						
						// 如果分隔符存在 而且 分隔符就不等于上一个元素，则说明该函数是对象的属性，需要绑定this
						if(
							previousElementSibling !== null && separator !== previousElementSibling
						){
							var startNode, endNode, parentNode = element.parentNode;
						
							startNode = SyntaxTree.createText("Rexjs.ECMAScript6FunctionCall.bind((Rexjs.ECMAScript6FunctionCall.this = ");
							endNode = SyntaxTree.createText(")");
						
							// 在分隔符之后插入：调用bind函数的代码
							parentNode.insertBefore(
								startNode,
								separator ? separator.nextSibling : parentNode.firstChild
							);
							
							// 在上一个元素（dot元素 或 bracket元素）之前插入：定义this的结束小括号代码
							parentNode.insertBefore(
								SyntaxTree.createText(")"),
								previousElementSibling
							);
							
							// 在当前执行小括号之前插入：bind函数所需传入的this代码
							parentNode.insertBefore(
								SyntaxTree.createText(", Rexjs.ECMAScript6FunctionCall.this, "),
								element
							);
							
							// 在当前执行小括号之后插入结束文本
							parentNode.appendChild(endNode);
							
							// 保护bind方法
							ECMAScript6Parser.protectMethod(startNode, endNode, startNode, "");
							
							// 添加 立即执行的小括号
							endNode.textContent += "()";
						}
						else {
							// 不需要绑定this的函数调用
							withoutThis(separator, element);
						}
						
						// 触发结束的中括号事件，让其把当前小括号当成中括号解析成数组，便于bind或apply使用
						this.dispatch("closingBracket", element, index, "");
					}
				);
		}
	});
	
	return ECMAScript6FunctionCall;
}(
	// value
	null,
	Function.prototype.bind,
	// withoutThis
	function(separator, element){
		var parentNode = element.parentNode;
		
		switch(
			true
		){
			// 如果两者之间的文本不是空的，则视为函数名
			case !ECMAScript6Parser.isEmptyBetween(separator || parentNode, element) :
				break;
				
			// 如果分隔符是小括号，则视其返回值为函数
			case separator.tagName === "parenthesis" :
				break;
			
			// 其他情况下，无法提供函数，则返回
			default :
				return;
		}
		
		// 插入apply及this
		parentNode.insertBefore(
			SyntaxTree.createText(".apply(void 0, "),
			element
		);
		
		// 添加apply函数的结束小括号
		parentNode.appendChild(
			SyntaxTree.createText(")")
		);
	}
);

this.FunctionPackage = function(Package, contents){
	function FunctionPackage(syntaxTree){
		///	<summary>
		///	函数解析器包。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	FunctionPackage = new Class(FunctionPackage, Package);
	
	FunctionPackage
		.package
		.apply(
			FunctionPackage,
			contents
		);
	
	return FunctionPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScript6Arguments,
		this.ECMAScript6Function,
		this.ECMAScript6ArrowFunction,
		this.ECMAScript6FunctionCall
	]
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.OpeningTag,
	this.ExpressionTag,
	Rexjs.toArray
));


// 对象相关解析器
(function(ECMAScript6Parser, SyntaxTree, SyntaxTag, DeclarationTag, Condition, OrderedCondition, toArray){

this.ProtectedListeners = function(ids){
	function ProtectedListeners(){
		///	<summary>
		///	受保护的监听器类。
		///	</summary>
	};
	ProtectedListeners = new StaticClass(ProtectedListeners);
	
	ProtectedListeners.static({
		add : function(id){
			///	<summary>
			///	添加受保护的监听器id。
			///	</summary>
			///	<param name="id" type="Number">监听器id。</param>
			ids.push(id);
			
			return this;
		},
		clear : function(){
			///	<summary>
			///	清除所有监听器id，并取消对应监听器的监听。
			///	</summary>
			var syntaxTree = SyntaxTree.current;
			
			// 取消监听
			ids.forEach(syntaxTree.unlisten, syntaxTree);
			// 清空集合
			ids.splice(0);
			
			return this;
		}
	});
	
	return ProtectedListeners;
}(
	// ids
	[]
);

this.ECMAScript6Value = function(ProtectedListeners){
	function ECMAScript6Value(syntaxTree){
		///	<summary>
		///	对象值解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6Value = new Class(ECMAScript6Value, ECMAScript6Parser);
	
	ECMAScript6Value.props({
		parse : function(){
			///	<summary>
			///	解析对象值。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"value",
					function(){
						// 忽略访问器标签
						this.syntaxTags
							.unignore(
								"accessor"
							);
						
						// 清除所保护的监听器
						ProtectedListeners.clear();
					}
				);
		}
	});
	
	return ECMAScript6Value;
}(
	this.ProtectedListeners
);

this.ECMAScript6PlainedKey = function(closingBraceCondition, commaCondition){
	function ECMAScript6PlainedKey(syntaxTree){
		///	<summary>
		///	纯文本的对象键（名称）解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6PlainedKey = new Class(ECMAScript6PlainedKey, ECMAScript6Parser);
	
	ECMAScript6PlainedKey.props({
		parse : function(){
			///	<summary>
			///	解析纯文本的对象键（名称）。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"plainedKey",
					function(){
						// 添加条件：换行、逗号、结束大括号
						this.plainText
							.addCondition(
								closingBraceCondition
							)
							.addCondition(
								commaCondition
							);
					}
				);
		}
	});
	
	return ECMAScript6PlainedKey;
}(
	// closingBraceCondition
	new Condition("closingBrace"),
	// commaCondition
	new Condition("comma")
);

this.ECMAScript6Key = function(ProtectedListeners, ACCESSOR_REGEXP, accessorCondition, stringCondition, openingParenthesisCondition, openingBracketCondition, OperatorCondition){
	function ECMAScript6Key(syntaxTree){
		///	<summary>
		///	对象键（名称）解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new SyntaxTag(
				"accessor",
				ACCESSOR_REGEXP
			)
		);
		
		// 忽略访问器标签，使其处在非对象属性的时候，能被正常解析成普通文本，如：var get = 1;
		syntaxTree
			.syntaxTags
			.ignore(
				"accessor"
			);
	};
	ECMAScript6Key = new Class(ECMAScript6Key, ECMAScript6Parser);
	
	ECMAScript6Key.props({
		parse : function(){
			///	<summary>
			///	解析对象的键。
			///	</summary>
			var ecmaScript6Key = this, syntaxTree = this.syntaxTree,
			
				syntaxTags = syntaxTree.syntaxTags, plainText = syntaxTree.plainText;
			
			// 监听key事件
			return syntaxTree.listen(
				"key",
				function(element, index){
					// 取消上一次的全部监听
					ProtectedListeners.clear();
					
					// 添加监听器相关id
					ProtectedListeners
						.add(
							// 保护函数小括号
							ecmaScript6Key.protectParenthesis(index + 1)
						)
						.add(
							// 保护运算符
							ecmaScript6Key.protectOperator(index)
						);
					
					// 监听语法树的纯文本模式事件
					this.listen(
						"plained",
						function(e, i, f, n){
							// 触发 plainedKey 事件
							this.dispatch("plainedKey", e, i, f);
						},
						index
					);

					// 开启纯文本模式
					plainText.enable(accessorCondition, stringCondition, openingBracketCondition, openingParenthesisCondition, OperatorCondition);
					
					// 去除访问器标签的忽略
					syntaxTags.unignore("accessor");
				}
			);
		},
		protectOperator : function(index){
			///	<summary>
			///	保护操作符。
			///	</summary>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.listen(
					"operator",
					function(element){
						var value = element.getAttribute("value");
						
						switch(
							value
						){
							case ":" :
								// 监听到冒号，就说明之后是对象值部分，所以触发value事件
								this.dispatch("value", element, index, "");
								return;
								
							case "=" :
								// 监听到等号，就说明之后是对象默认值部分，所以触发value事件
								this.dispatch("value", element, index, "");
								return;

							case "*" :
								// 当遇到 字符串、小括号、计算式 或 冒号 时，会自动解除纯文本模式
								this.plainText.enable(stringCondition, openingParenthesisCondition, openingBracketCondition, OperatorCondition);
								return;
						}
						
						// 其他的运算符要报错
						this.error(element, "意外的运算符。");
					},
					index
				);
		},
		protectParenthesis : function(index){
			///	<summary>
			///	保护小括号。
			///	</summary>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.once(
					"openingParenthesis",
					function(element){
						var id, cid;
				
						// 监听到小括号，就说明之后是函数参数与主体部分，即为对象值部分，所以触发value事件
						this.dispatch("value", element, index - 1, "");
						
						// 监听函数表达式的关闭小括号
						cid = this.once(
							"closingParenthesisWithBrace",
							function(e, i, f){
								this.unlisten(id);
								
								/*
									因为一般的函数是根据function关键字定义，
									而这里可能是简写模式，没有function关键字，
									所以手动触发一次，告诉函数解析器，这是个函数
								*/
								this.dispatch("closingParenthesisOfFunction", element, i, f);
							},
							index
						);
						
						// 监听其他类型的关闭小括号
						id = this.once(
							"closingParenthesis",
							function(e){
								this.unlisten(cid);
								
								// 抛出错误
								this.error(element, "此处应该是一个函数表达式。");
							},
							index
						);
					},
					index
				);
		}
	});
	
	return ECMAScript6Key;
}(
	this.ProtectedListeners,
	// ACCESSOR_REGEXP
	/\b(?:get|set)\b(?!\s*[(:])/,
	// accessorCondition
	new OrderedCondition("accessor"),
	// stringCondition
	new OrderedCondition("string"),
	// openingParenthesisCondition
	new Condition("openingParenthesis"),
	// openingBracketCondition
	new Condition("openingBracket"),
	// OperatorCondition
	new Condition("operator")
);


this.ECMAScript6ComputedName = function(){
	function ECMAScript6ComputedName(syntaxTree){
		///	<summary>
		///	对象计算式名称解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6ComputedName = new Class(ECMAScript6ComputedName, ECMAScript6Parser);
	
	ECMAScript6ComputedName.props({
		parse : function(){
			///	<summary>
			///	解析计算式名称。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"computedName",
					function(element, index){
						// colonElement一定存在，因为在parseProperty中已经做了确保
						var colonElement = element.nextElementSibling, propertyElement = element.parentNode;
						
						ECMAScript6Parser
							.getStartElement(
								element
							)
							.textContent = "new Rexjs.NamedProperty((";
							
						ECMAScript6Parser
							.getEndElement(
								element
							)
							.textContent = ")";
						
						colonElement.textContent = ",";

						// 设置属性
						propertyElement.setAttribute("computed", "");

						// 添加NamedProperty的结束小括号
						propertyElement.appendChild(
							SyntaxTree.createText(")")
						);

						// 触发分隔属性事件
						this.dispatch("separateProperty", propertyElement, index, "");
					}
				);
		}
	});
	
	return ECMAScript6ComputedName;
}();

this.ECMAScript6ComputedMethod = function(){
	function ECMAScript6ComputedMethod(syntaxTree){
		///	<summary>
		///	对象计算式方法解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6ComputedMethod = new Class(ECMAScript6ComputedMethod, ECMAScript6Parser);
	
	ECMAScript6ComputedMethod.props({
		parse : function(){
			///	<summary>
			///	解析计算式访问器。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"computedMethod",
					function(element, index){
						// element.nextSibling一定存在，因为已经加了保护，确定是一个计算式方法
						var parenthesisElement = element.nextElementSibling,
						
							colonElement = SyntaxTree.createOperatorElement(":");
						
						// 如果计算式与小括号之间有其他文本
						if(
							!ECMAScript6Parser.isEmpty(
								parenthesisElement.fragment
							)
						){
							// 报错
							this.error(parenthesisElement, "计算式方法名与计算式参数小括号之间不应该存在其他文本。");
							return;
						}
						
						// 插入分号元素，模拟键值对属性
						element
							.parentNode
							.insertBefore(
								colonElement,
								parenthesisElement
							);
						
						// 触发computedName事件
						this.dispatch("computedName", element, index);
						
						colonElement.textContent = ", function ";
					}
				);
		}
	});
	
	return ECMAScript6ComputedMethod;
}();

this.ECMAScript6ComputedAccessor = function(){
	function ECMAScript6ComputedAccessor(syntaxTree){
		///	<summary>
		///	对象计算式访问器解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6ComputedAccessor = new Class(ECMAScript6ComputedAccessor, ECMAScript6Parser);
	
	ECMAScript6ComputedAccessor.props({
		parse : function(){
			///	<summary>
			///	解析计算式访问器。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"computedAccessor",
					function(element, index){
						// bracketElement元素一定会存在，因为已经在parseProperty中做了确保
						var bracketElement = element.nextElementSibling, textContent = element.textContent;
						
						// 清空访问器的文本内容
						element.textContent = "";
						
						// 触发计算式方法事件
						this.dispatch("computedMethod", bracketElement, index, "");
						
						// 设置开始中括号的文本内容
						ECMAScript6Parser
							.getStartElement(
								bracketElement
							)
							// 不需要使用protectMethod来保护，因为访问器的正则里使用了\b，来确保访问器单词的独立性
							.textContent = "new Rexjs." + (textContent === "get" ? "Getter" : "Setter") + "((";
					}
				);
		}
	});
	
	return ECMAScript6ComputedAccessor;
}();

this.ECMAScript6ShorthandMethod = function(){
	function ECMAScript6ShorthandMethod(syntaxTree){
		///	<summary>
		///	对象简写方法解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6ShorthandMethod = new Class(ECMAScript6ShorthandMethod, ECMAScript6Parser);
	
	ECMAScript6ShorthandMethod.props({
		parse : function(){
			///	<summary>
			///	解析简写方法。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"shorthandMethod",
					function(element){
						element.textContent = " : function" + element.textContent;
					}
				);
		}
	});
	
	return ECMAScript6ShorthandMethod;
}();

this.ECMAScript6ShorthandString = function(ECMAScript6Exception){
	function ECMAScript6ShorthandString(syntaxTree){
		///	<summary>
		///	简写的字符串属性解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6ShorthandString = new Class(ECMAScript6ShorthandString, ECMAScript6Exception);
	
	ECMAScript6ShorthandString.props({
		parse : function(){
			///	<summary>
			///	解析简写的字符串。
			///	</summary>
			return this.catch("shorthandString", "对象不应该将简写的字符串做为属性名称。");
		}
	});
	
	return ECMAScript6ShorthandString;
}(
	this.ECMAScript6Exception
);

this.ECMAScript6ShorthandName = function(){
	function ECMAScript6ShorthandName(syntaxTree){
		///	<summary>
		///	对象简写名称解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6ShorthandName = new Class(ECMAScript6ShorthandName, ECMAScript6Parser);
	
	ECMAScript6ShorthandName.props({
		parse : function(){
			///	<summary>
			///	解析简写属性。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"shorthandName",
					function(element){
						var textContent = element.textContent;
						
						element.textContent = textContent + ": " + textContent.trim();
					}
				);
		}
	});
	
	return ECMAScript6ShorthandName;
}();

this.ECMAScript6DefaultValue = function(){
	function ECMAScript6DefaultValue(syntaxTree){
		///	<summary>
		///	对象属性默认值解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6DefaultValue = new Class(ECMAScript6DefaultValue, ECMAScript6Parser);
	
	ECMAScript6DefaultValue.props({
		parse : function(){
			///	<summary>
			///	解析对象属性默认值。
			///	</summary>
			
			// 监听 defaultValue 事件
			return this
				.syntaxTree
				.listen(
					"defaultValue",
					function(element, index){
						// 如果没有开启rex模式
						if(
							!this.rexModeEnabled
						){
							// 报错
							this.error(element, "如需使用默认值方式赋值，请开启rex模式。");
							return;
						}
						
						var textContent, propertyElement = element.parentNode,
						
							// 提取等于号与propertyElement之间的文本，即默认值文本
							defaultString = ECMAScript6Parser.extractTextBetween(element, propertyElement);
						
						// 移除等于号
						propertyElement.removeChild(element);
						
						// 记录去除空格的文本内容
						textContent = propertyElement.textContent.trim();
						
						// 触发 shorthandName 事件
						this.dispatch("shorthandName", propertyElement, index, "");
						
						// 重置文本内容
						propertyElement.textContent += " === void 0 ? (" + defaultString + ") : " + textContent;
					}
				);
		}
	});
	
	return ECMAScript6DefaultValue;
}();

this.ECMAScript6Property = function(toSwitch){
	function ECMAScript6Property(syntaxTree){
		///	<summary>
		///	对象属性解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6Property = Class(ECMAScript6Property, ECMAScript6Parser);
	
	ECMAScript6Property.props({
		parse : function(){
			///	<summary>
			///	解析属性。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"property",
					function(element, index){
						var elementChild = element.firstElementChild;
						
						if(
							elementChild === null
						){
							// 如果没有子元素，说明是简写属性，触发简写属性事件
							this.dispatch("shorthandName", element, index, "");
							return;
						}
						
						// 多情况处理
						toSwitch(this, element, elementChild, index);
					}
				);
		}
	});
	
	return ECMAScript6Property;
}(
	// toSwitch
	function(syntaxTree, element, elementChild, index){
		var tagName = elementChild.tagName;
		
		// 访问器
		if(
			tagName === "accessor"
		){
			switch(
				true
			){
				// 简写的属性名，但访问器关键字不支持简写，直接由浏览器报错，如：var obj = { get };
				case element.textContent.trim() === elementChild.textContent :
					// 报错
					syntaxTree.error(elementChild, "不应该将访问器关键字作为简写属性。");
					return;
				
				// 计算式访问器，如：var obj = { get ["a" + "b"](){} };
				case ECMAScript6Parser.querySpecialSelector(elementChild, "+bracket+parenthesis+brace") !== null :
					syntaxTree.dispatch("computedAccessor", elementChild, index, "");
					return;
				
				// 普通模式的访问器，所有浏览器都支持，只触发事件，不需要解析，如：var obj = { get name(){} };
				default :
					syntaxTree.dispatch("accessorMethod", elementChild, index, "");
					return;
			}
		}
		
		// 如果是运算符
		if(
			tagName === "operator"
		){
			var value = elementChild.getAttribute("value");
			
			switch(
				value
			){
				// 如果是冒号，说明是基本形式的键值对属性定义，不做任何处理
				case ":" :
					return;
				
				// 如果是生成器
				case "*" :
					// 暂不解析，报错
					syntaxTree.error(elementChild, "意外的运算符。");
					break;
					
				// 如果是等于号，则说明是默认值
				case "=" :
					// 触发默认值事件
					syntaxTree.dispatch("defaultValue", elementChild, index, "");
					return;
				
				// 其他
				default :
					// 报错
					syntaxTree.error(elementChild, "意外的运算符。");
					return;
			}
			
			elementChild = elementChild.nextElementSibling;
			tagName = elementChild.tagName;
		}
		
		// 计算式
		if(
			tagName === "bracket"
		){
			switch(
				true
			){
				// 确保是一个计算式属性名
				case !!ECMAScript6Parser.querySpecialSelector(elementChild, '+operator[value=":"]') :
					syntaxTree.dispatch("computedName", elementChild, index, "");
					break;
				
				// 确保是一个函数
				case !!ECMAScript6Parser.querySpecialSelector(elementChild, '+parenthesis+brace') :
					syntaxTree.dispatch("computedMethod", elementChild, index, "");
					break;
					
				default :
					// 报错
					syntaxTree.error(elementChild, "意外的中括号。");
					break;
			}

			return;
		}
		
		// 字符串，可能是函数简写名称也可能是属性名
		if(
			tagName === "string"
		){
			var stringElement = elementChild;
			
			elementChild = elementChild.nextElementSibling;
			
			// 如果元素不存在
			if(
				elementChild === null
			){
				// 触发shorthandString事件
				syntaxTree.dispatch("shorthandString", stringElement, index, "");
				return;
			}
			
			tagName = elementChild.tagName;
		}
		
		// 函数简写模式
		if(
			tagName === "parenthesis"
		){
			// 确保是个函数
			if(
				ECMAScript6Parser.querySpecialSelector(elementChild, "+brace")
			){
				syntaxTree.dispatch("shorthandMethod", elementChild, index, "");
			}
			
			return;
		}
	}
);

this.ECMAScript6Object = function(commaElement, add, getSeparatorElements, insertProperties){
	function ECMAScript6Object(syntaxTree){
		///	<summary>
		///	对象解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6Object = new Class(ECMAScript6Object, ECMAScript6Parser);

	ECMAScript6Object.static({
		create : function(){
			///	<summary>
			///	创建一个Object对象，该对象将会合并arguments中所有参数中的子对象。
			///	</summary>
			var object = {};
		
			add.apply(object, arguments);
			return object;
		}
	});
	
	ECMAScript6Object.props({
		parse : function(){
			///	<summary>
			///	解析对象主体。
			///	</summary>
			var ecmaScript6Object = this;
			
			return this
				.syntaxTree
				.listen(
					"object",
					function(element, index, fragment){
						// 获取分隔符元素
						var separatorElements = getSeparatorElements(element);
						
						// 如果长度为0，则不继续
						if(
							separatorElements.length === 0
						){
							return;
						}
						
						// 插入属性
						insertProperties(this, element, separatorElements, index + 1);
					}
				);
		}
	});

	return ECMAScript6Object;
}(
	// commaElement
	SyntaxTree.createElement("comma"),
	this.NamedProperties.prototype.add,
	// getSeparatorElements
	function(element){
		var separatorElements = [],
		
			startElement = ECMAScript6Parser.getStartElement(element), endElement = ECMAScript6Parser.getEndElement(element);
		
		// 如果对象是空的，则直接返回separatorElements
		if(
			ECMAScript6Parser.isEmptyBetween(startElement, endElement)
		){
			return separatorElements;
		}
		
		// 添加start元素
		separatorElements.push(startElement);
		
		// 添加所有逗号
		separatorElements
			.push
			.apply(
				separatorElements,
				ECMAScript6Parser.querySpecialSelectorAll(element, ">comma")
			);
		
		// 添加end元素
		separatorElements.push(endElement);
		
		// 返回该集合
		return separatorElements;
	},
	// insertProperties
	function(syntaxTree, element, separatorElements, index){
		var withSeparator = false, lastSeparatorElement = null;
		
		// 遍历元素
		separatorElements.forEach(function(separatorElement){
			// 如果上一个元素不存在，就返回
			if(
				lastSeparatorElement === null
			){
				lastSeparatorElement = separatorElement;
				return;
			}
			
			var isSeparator = false, propertyElement = SyntaxTree.createElement("property");
			
			// 设置codeIndex
			propertyElement.codeIndex = lastSeparatorElement.codeIndex;
			
			// 设置索引，目的是让所有监听归于该父索引之下，便于监听及使用unlistenSubs
			syntaxTree.setIndex(index);
			
			// 提取所有节点至properyElement中
			ECMAScript6Parser.extractNodesBetween(lastSeparatorElement, separatorElement, propertyElement);
			
			// 监听分隔属性事件
			syntaxTree.once(
				"separateProperty",
				function(e, i, f, n){
					isSeparator = true;
					
					// 先执行next函数，因为可能会对start、end标签做处理
					n();
					
					// 如果是start元素
					if(
						lastSeparatorElement.tagName === "start"
					){
						var textContent = lastSeparatorElement.textContent;
						
						// 设置lastSeparatorElement的文本内容
						lastSeparatorElement.textContent = textContent.substring(0, textContent.length - 1);
					}
					else {
						// 设置lastSeparatorElement的文本内容
						lastSeparatorElement.textContent = withSeparator ? "," : "},";
					}
					
					// 设置separatorElement的文本内容
					separatorElement.textContent = separatorElement.tagName === "end" ? ")" : ", {";
				},
				index
			);
			
			// 将property元素插入到对象中
			element.insertBefore(propertyElement, separatorElement);
		
			// 触发property事件
			syntaxTree.dispatch("property", propertyElement, index, "");
			// 设置语法树的索引级别，表示跳出property元素
			syntaxTree.setIndex(index - 1);
			
			// 记录状态
			withSeparator = isSeparator;
			lastSeparatorElement = separatorElement;
		});
	}
);

this.ECMAScript6ObjectExpression = function(){
	function ECMAScript6ObjectExpression(syntaxTree){
		///	<summary>
		///	对象表达式解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6ObjectExpression = new Class(ECMAScript6ObjectExpression, ECMAScript6Parser);
	
	ECMAScript6ObjectExpression.props({
		parse : function(){
			// 监听左大括号
			return this
				.syntaxTree
				.listen(
					"openingBrace",
					function(element, index, fragment){
						// 如果大括号没有与运算符一起存在，则说明这个大括号不是对象的一部分
						if(
							ECMAScript6Parser.withOperator(element, fragment) === false
						){
							return;
						}
						
						var syntaxTags = this.syntaxTags;
						
						// 去除访问器标签的忽略
						syntaxTags.unignore("accessor");
						
						// 监听分隔属性事件
						this.once(
							"separateProperty",
							function(){
								// 保护create方法
								ECMAScript6Parser.protectMethod(
									ECMAScript6Parser.getStartElement(element),
									ECMAScript6Parser.getEndElement(element),
									element,
									fragment,
									// 重置start元素的文本内容
									"Rexjs.ECMAScript6Object.create({",
									// 重置end元素的文本内容
									"})"
								);
							},
							index + 1
						);
						
						// 监听右大括号
						this.once(
							"closingBrace",
							function(){
								// 忽略访问器标签
								syntaxTags.ignore("accessor");
								
								// 触发object事件，从而解析对象主体
								this.dispatch("object", element, index, fragment);
							},
							index
						);
						
						// 此意为拦截ASI机制：让ASI监听不到换行，则不会触发ASI机制
						this.listen(
							"wrap",
							function(e, i, f, n, p){
								// 阻止其他监听器执行
								p();
							},
							index
						);
						
						// 监听逗号，因为逗号标识着下一个属性的开始
						this.listen(
							"comma",
							function(){
								this.dispatch("key", null, index, "");
							},
							index
						);
						
						// 触发key事件，因为对象开始的时候没有逗号
						this.dispatch("key", null, index, "");
					}
				);
		}
	});
	
	return ECMAScript6ObjectExpression;
}();

this.ECMAScript6ObjectDestructuring = function(ClosingTag, OBJECT_DESTRUCTURING_REGEXP, forEach, removeASI, getDeclaration, transcode){
	function ECMAScript6ObjectDestructuring(syntaxTree){
		syntaxTree.add(
			new ClosingTag(
				"brace",
				OBJECT_DESTRUCTURING_REGEXP,
				"objectDestructuring"
			),
			true
		);
	};
	ECMAScript6ObjectDestructuring = new Class(ECMAScript6ObjectDestructuring, ECMAScript6Parser);
	
	ECMAScript6ObjectDestructuring.static({
		destruct : function(obj, target, boundThis, boundArguments){
			forEach(
				obj,
				function(accessor, name){
					accessor
						.value
						.set(
							target[name],
							boundThis,
							boundArguments
						);
				}
			);
			
			return target;
		}
	});
	
	ECMAScript6ObjectDestructuring.props({
		parse : function(){
			var ecmaScript6ObjectDestructuring = this;
			
			return this
				.syntaxTree
				.listen(
					"objectDestructuring",
					function(element, index, fragment){
						var subIndex = index + 1, supIndex = index - 1, variables = [],
						
							declarationElement = getDeclaration(element, fragment), withDeclaration = declarationElement !== null;
						
						// 移除所有ASI机制插入的分号
						removeASI(element);
						
						this.listen(
							"shorthandMethod",
							function(e){
								// 报错
								this.error(e, "解构赋值中不能使用简写函数。");
							},
							subIndex
						);
						
						this.listen(
							"shorthandName",
							function(propertyElement, i, f, n, p){
								// 阻止其他监听器执行
								p();
								
								variables.push(
									transcode(propertyElement, "void 0")
								);
							},
							subIndex
						);
						
						this.listen(
							"defaultValue",
							function(operatorElement){
								var propertyElement = operatorElement.parentNode,
								
									defaultString = ECMAScript6Parser.extractTextBetween(operatorElement, propertyElement);
								
								propertyElement.removeChild(operatorElement);
								
								variables.push(
									transcode(propertyElement, defaultString)
								);
							},
							subIndex
						);
						
						this.dispatch("object", element, index, "");
						
						ecmaScript6ObjectDestructuring.parseEnding(supIndex);
						
						if(
							variables.length === 0
						){
							if(
								withDeclaration
							){
								
							}
							
							return;
						}
						
						element
							.parentNode
							.insertBefore(
								SyntaxTree.createText(
									(withDeclaration ? variables.join(",") : "") + ";Rexjs.ECMAScript6ObjectDestructuring.destruct("
								),
								element	
							);
						
						this.once(
							"operator",
							function(el){
								el.textContent = ",";
							},
							supIndex,
							supIndex
						)
						
						this.once(
							"destructuringEnd",
							function(el){
								el.textContent = ', this, typeof arguments === "undefined" ? null : arguments)' + el.textContent;
							},
							supIndex,
							supIndex
						)
					}
				);
		},
		parseEnding : function(index){
			var sid, syntaxTree = this.syntaxTree;
			
			sid = syntaxTree.once(
				"semicolon",
				function(element, i, fragment){
					this.dispatch("destructuringEnd", element, index, fragment);
				},
				index,
				index
			);
			
			syntaxTree.once(
				"comma",
				function(element, i, fragment){
					this.unlisten(sid);
					
					this.dispatch("destructuringEnd", element, index, fragment);
				},
				index,
				index
			);
			
			return -1;
		}
	});
	
	return ECMAScript6ObjectDestructuring;
}(
	this.ClosingTag,
	// OBJECT_DESTRUCTURING_REGEXP
	/\}(?=\s*=)/,
	Rexjs.forEach,
	// removeASI
	function(element){
		// 查找所有自动插入的分号子元素
		toArray(
			ECMAScript6Parser.querySpecialSelectorAll(
				element,
				">semicolon[asi]"
			)
		)
		.forEach(function(semicolonElement){
			// 移除所有插入的分号
			element.removeChild(semicolonElement);
		});
	},
	// getDeclaration
	function(element, fragment){
		var declarationElement = element.previousElementSibling;
		
		switch(
			true
		){
			case declarationElement === null :
				break;

			case !ECMAScript6Parser.tagOf(declarationElement, DeclarationTag) :
				break;
				
			case !ECMAScript6Parser.isEmpty(fragment) :
				break;
			
			default :
				return declarationElement;
		}
		
		return null;
	},
	// transcode
	function(propertyElement, value){
		var variable = propertyElement.textContent.trim();
		
		// 重置文本内容
		propertyElement.textContent = propertyElement.textContent + " : " +
			"new Rexjs.Accessor(" + 
				'"",' +
				"function(){ return " + value + "; }," +
				"function(){ " + variable + " = arguments[0] === void 0 ? this.get.apply(arguments[1], arguments[2]) : arguments[0]; }" +
			")";
			
		return variable;
	}
);

this.ObjectPackage = function(Package, contents){
	function ObjectPackage(syntaxTree){
		///	<summary>
		///	对象解析器包。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ObjectPackage = new Class(ObjectPackage, Package);
	
	ObjectPackage
		.package
		.apply(
			ObjectPackage,
			contents
		);
	
	return ObjectPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScript6Value,
		this.ECMAScript6PlainedKey,
		this.ECMAScript6Key,
		this.ECMAScript6ComputedMethod,
		this.ECMAScript6ComputedAccessor,
		this.ECMAScript6ComputedName,
		this.ECMAScript6ShorthandMethod,
		this.ECMAScript6ShorthandString,
		this.ECMAScript6ShorthandName,
		this.ECMAScript6DefaultValue,
		this.ECMAScript6Property,
		this.ECMAScript6ObjectExpression,
		this.ECMAScript6Object,
		this.ECMAScript6ObjectDestructuring
	]
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.SyntaxTag,
	this.DeclarationTag,
	this.Condition,
	this.OrderedCondition,
	Rexjs.toArray
));


// 数组解析相关
(function(ECMAScript6Parser, Property){

this.SpreadArrayItem = function(){
	function SpreadArrayItem(value){
		///	<summary>
		///	拓展的数组项。
		///	</summary>
		///	<param name="value" type="*">属性值。</param>
	};
	SpreadArrayItem = new Class(SpreadArrayItem, Property);

	return SpreadArrayItem;
}();

this.ECMAScript6Array = function(SpreadArrayItem, forEach, toArray){
	function ECMAScript6Array(syntaxTree){
		///	<summary>
		///	数组解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6Array = new Class(ECMAScript6Array, ECMAScript6Parser);
	
	ECMAScript6Array.static({
		create : function(_rest){
			///	<summary>
			///	创建一个新的数组，该数组包括arguments中所有的属性项。
			///	</summary>
			var array = [];
		
			// 遍历参数
			forEach(
				arguments,
				function(item){
					// 如果该项是拓展数据项
					if(
						item instanceof SpreadArrayItem
					){
						// 将该拓展数组内的所有对象添加到array数组内
						array.push.apply(array, item.value);
						return;
					}
					
					// 添加单项
					array.push(item);
				}
			);
			
			// 返回该数组
			return array;
		}
	});
	
	ECMAScript6Array.props({
		parse : function(){
			///	<summary>
			///	解析数组。
			///	</summary>
			var ecmaScript6Array = this;
			
			// 监听关闭中括号
			return this
				.syntaxTree
				.listen(
					"closingBracket",
					function(element, index, fragment){
						var spreadElements = ECMAScript6Parser.querySpecialSelectorAll(element, ">spread");
			
						// 如果没有发现拓展数组项
						if(
							spreadElements.length === 0
						){
							// 返回
							return;
						}
						
						// 获取end元素
						var endElement = ECMAScript6Parser.getEndElement(element);
						
						// 保护create方法
						ECMAScript6Parser.protectMethod(
							ECMAScript6Parser.getStartElement(element),
							endElement,
							element,
							fragment,
							// start元素的文本内容，这里要在最前面加空格，因为不加空格可能会和其他字符连在一块，造成语法错误
							" Rexjs.ECMAScript6Array.create(",
							// end元素的文本内容
							")"
						);
						
						// 转为数组，并遍历
						toArray(
							spreadElements
						)
						.forEach(function(spreadElement){
							// 获取下一个兄弟元素
							var nextElementSibling = ECMAScript6Parser.querySpecialSelector(spreadElement, "~comma");
							
							// 如果兄弟元素不存在
							if(
								nextElementSibling === null
							){
								// 设置为end元素
								nextElementSibling = endElement;
							}
							
							// 重置文本内容
							spreadElement.textContent = "new Rexjs.SpreadArrayItem(";
							// 重置兄弟元素的文本内容
							nextElementSibling.textContent = ")" + nextElementSibling.textContent;
						});
					}
				);
		}
	});
	
	return ECMAScript6Array;
}(
	this.SpreadArrayItem,
	Rexjs.forEach,
	Rexjs.toArray
);

this.ECMAScript6ArrayDestructuring = function(ClosingTag, ARRAY_DESTRUCTURING_REGEXP, toArray){
	function ECMAScript6ArrayDestructuring(syntaxTree){
		///	<summary>
		///	数组解构解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ClosingTag(
				"bracket",
				ARRAY_DESTRUCTURING_REGEXP,
				"arrayDestructuring"
			),
			true
		);
	};
	ECMAScript6ArrayDestructuring = new Class(ECMAScript6ArrayDestructuring, ECMAScript6Parser);
	
	ECMAScript6ArrayDestructuring.props({
		parse : function(){
			///	<summary>
			///	解析数组的解构赋值。
			///	</summary>
			return -1;
			
			return this
				.syntaxTree
				.listen(
					"arrayDestructuring",
					function(element, index){
						var separatorElements = toArray(
							ECMAScript6Parser.querySpecialSelectorAll(element, ">comma")
						);
						
						separatorElements.push(
							ECMAScript6Parser.getEndElement(element)
						);
						
						separatorElements.forEach(function(){
							
						});
					}
				);
		}
	});
	
	return ECMAScript6ArrayDestructuring;
}(
	this.ClosingTag,
	// ARRAY_DESTRUCTURING_REGEXP
	/\](?=\s*=)/,
	Rexjs.toArray
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.Property
));


// 申明相关解析器
(function(ECMAScript6Parser, SyntaxTree, DeclarationTag){

this.ECMAScript6Declaration = function(DECLARATION_REGEXP){
	function ECMAScript6Declaration(syntaxTree){
		///	<summary>
		///	申明关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new DeclarationTag(
				"declaration",
				DECLARATION_REGEXP
			)
		);
	};
	ECMAScript6Declaration = new Class(ECMAScript6Declaration, ECMAScript6Parser);
	
	ECMAScript6Declaration.static({
		autoInsert : function(name, firstNode, fragment, _secondNode){
			///	<summary>
			///	在指定节点之前尽可能的自动定义并插入变量名。
			///	</summary>
			///	<param name="name" type="String">变量名。</param>
			///	<param name="firstNode" type="Node">指定的节点。</param>
			///	<param name="fragment" type="String">该节点之前的片段文本。</param>
			///	<param name="_secondNode" type="Node">如果提供该元素，则会在firstNode节点之前与_secondNode之后插入保护性质的小括号。</param>
			
			// 判断在指定节点前面是否满足插入变量名的条件
			if(
				!this.insertable(firstNode, fragment)
			){
				return false;
			}
			
			// 在指定节点之前自动定义并插入变量名。
			this.insert(name, firstNode, _secondNode);
			return true;
		},
		insert : function(name, firstNode, _secondNode){
			///	<summary>
			///	在指定节点之前自动定义并插入变量名。
			///	</summary>
			///	<param name="name" type="String">变量名。</param>
			///	<param name="firstNode" type="Node">指定的节点。</param>
			///	<param name="_secondNode" type="Node">如果提供该元素，则会在firstNode节点之前与_secondNode之后插入保护性质的小括号。</param>
			
			// 如果名称为空
			if(
				ECMAScript6Parser.isEmpty(name)
			){
				// 报错
				SyntaxTree
					.current
					.error(
						firstNode,
						"在此处应该定义变量名。"
					);
				return this;
			}
			
			var parentNode = firstNode.parentNode, declarationElement = SyntaxTree.createElement("declaration")	;
			
			// ps：在这里分步操作，目的是：1.语句明确；2.export语句的需要，如export var a = 1;
			
			// 设置申明元素的文本内容
			declarationElement.textContent = "var";
			
			// 插入申明文明
			parentNode.insertBefore(
				declarationElement,
				firstNode
			);
			
			// 插入名称
			parentNode.insertBefore(
				SyntaxTree.createText(" " + name),
				firstNode
			);
			
			// 插入等于号运算符
			parentNode.insertBefore(
				SyntaxTree.createOperatorElement(
					"=",
					// 如果_secondNode存在，加上保护性质的小括号
					(_secondNode ? ";(" + name : "") + "="
				),
				firstNode
			);
			
			// 如果_secondNode存在
			if(
				_secondNode
			){
				// 获取下一个兄弟节点
				var nextSibling = _secondNode.nextSibling;
				
				// 插入或追加保护性质的小括号
				_secondNode
					.parentNode[
						nextSibling ? "insertBefore" : "appendChild"
					](
						SyntaxTree.createText(")"),
						nextSibling
					);
			}
				
			return this;
		},
		insertable : function(node, fragment){
			///	<summary>
			///	判断在指定节点前面是否满足插入变量名的条件。
			///	</summary>
			///	<param name="name" type="String">变量名。</param>
			///	<param name="node" type="Node">指定的节点。</param>
			///	<param name="fragment" type="String">该节点之前的片段文本。</param>
			///	<param name="_throwError" type="Boolean">是否报错。</param>
			return !ECMAScript6Parser.withOperator(node, fragment);
		}
	});
	
	ECMAScript6Declaration.props({
		parse : function(){
			///	<summary>
			///	解析申明关键字。
			///	</summary>
			///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
			return this
				.syntaxTree
				.listen(
					"declaration",
					function(element){
						element.textContent = "var";
					}
				);
		}
	});
	
	return ECMAScript6Declaration;
}(
	// DECLARATION_REGEXP
	/\b(?:var|let|const)\b/
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.DeclarationTag
));


// 面向对象相关解析器
(function(
	ECMAScript6Parser, ECMAScript6Exception,
	ECMAScript6Declaration,
	SyntaxTree, SyntaxTag, ExpressionTag,
	Condition, NamedProperties, ProtectedListeners,
	staticCondition, constructorCondition,
	toArray
){

this.StaticProperties = function(){
	function StaticProperties(){
		///	<summary>
		///	静态属性集合类，一般用于类的静态属性声明
		///	</summary>
		this.add.apply(this, arguments);
	};
	StaticProperties = new Class(StaticProperties, NamedProperties);
	
	return StaticProperties;
}();

this.ECMAScript6Extends = function(EXTENDS_REGEXP){
	function ECMAScript6Extends(syntaxTree){
		///	<summary>
		///	extends关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"extends",
				EXTENDS_REGEXP
			)
		);
	};
	ECMAScript6Extends = new Class(ECMAScript6Extends, ECMAScript6Exception);
	
	ECMAScript6Extends.props({
		parse : function(){
			///	<summary>
			///	解析extends关键字。
			///	</summary>
			return this.catch("extends", "extends关键字应该存在于class表达式中。");
		}
	});
	
	return ECMAScript6Extends;
}(
	// EXTENDS_REGEXP
	/\bextends\b/
);

this.ECMAScript6Super = function(SUPER_REGEXP){
	function ECMAScript6Super(syntaxTree){
		///	<summary>
		///	super关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"super",
				SUPER_REGEXP
			)
		);
	};
	ECMAScript6Super = new Class(ECMAScript6Super, ECMAScript6Exception);
	
	ECMAScript6Super.props({
		parse : function(){
			///	<summary>
			///	解析super关键字。
			///	</summary>
			return this.catch("super", "super关键字应该使用在类的构造函数中，且在同一个构造函数中只能使用一次。");
		}
	});
	
	return ECMAScript6Super;
}(
	// SUPER_REGEXP
	/\bsuper\b/
);

this.ECMAScript6Static = function(STATIC_REGEXP, STATIC_WITH_PARENTHESIS_REGEXP){
	function ECMAScript6Static(syntaxTree){
		///	<summary>
		///	static关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree
			.add(
				new SyntaxTag(
					"static-with-parenthesis",
					STATIC_WITH_PARENTHESIS_REGEXP,
					"staticWithParenthesis"
				)
			)
			.add(
				new ExpressionTag(
					"static",
					STATIC_REGEXP
				)
			);
	};
	ECMAScript6Static = new Class(ECMAScript6Static, ECMAScript6Exception);
	
	ECMAScript6Static.props({
		parse : function(){
			///	<summary>
			///	解析static关键字。
			///	</summary>
			var description = "static关键字应该与类的属性一起使用。";
			
			this.catch("staticWithParenthesis", description);
			
			return this.catch("static", description);
		}
	});
	
	return ECMAScript6Static;
}(
	// STATIC_REGEXP
	/\bstatic\b/,
	// STATIC_WITH_PARENTHESIS_REGEXP
	/\bstatic\b(?=\s*\()/
);

this.ECMAScript6StaticProperty = function(){
	function ECMAScript6StaticProperty(syntaxTree){
		///	<summary>
		///	静态属性解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6StaticProperty = new Class(ECMAScript6StaticProperty, ECMAScript6Parser);
	
	ECMAScript6StaticProperty.props({
		parse : function(){
			///	<summary>
			///	解析静态属性。
			///	</summary>
			var lastElement = null, lastEndText = null, withComputed = false;
			
			return this
				.syntaxTree
				.listen(
					"staticProperty",
					function(element, index){
						var startText, endText,
						
							childNodes = element.childNodes, computed = element.hasAttribute("computed");
						
						// 设置static特性
						element.setAttribute("static", "");
						
						// 创建start文本
						startText = SyntaxTree.createText(
							"new Rexjs.StaticProperties(" + (computed ? "" : "{")
						);
						
						// 创建end文本
						endText = SyntaxTree.createText(
							(computed ? "" : "}") + ")"
						);
						
						// 如果上一个属性元素存在
						if(
							lastElement
						){
							// 而且该元素的的下一个property元素是当前元素，则说明，是两个紧邻的静态属性
							if(
								element === ECMAScript6Parser.querySpecialSelector(lastElement, "~property")
							){
								// 重置start文本节点的文本内容，如果是计算式 或 上一个不是计算式，则为起始大括号，否则是空字符串
								startText.textContent = computed || !withComputed ? "" : "{";
								// 重置end文本节点的文本内容，如果是计算式 或 上一个不是计算式，则为结束大括号，否则是空字符串
								lastEndText.textContent = computed && !withComputed ? "}" : "";
							}
						}
						
						// 触发分隔属性事件，目的是将静态属性和非静态属性分隔开
						this.dispatch("separateProperty", element, index, "");
						
						// 插入start文本
						if(
							childNodes.length > 0
						){
							element.insertBefore(
								startText,
								childNodes[0]
							);
						}
						else {
							element.appendChild(startText);
						}
						
						// 添加end文本
						element.appendChild(endText);
						
						// 记录当前状态
						withComputed = computed;
						lastElement = element;
						lastEndText = endText;
					}
				);
		}
	});
	
	return ECMAScript6StaticProperty;
}();

this.ECMAScript6Assign = function(ASSIGN_REGEXP){
	function ECMAScript6Assign(syntaxTree){
		///	<summary>
		///	assign 表达式解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"assign",
				ASSIGN_REGEXP
			)
		);
		
		// 忽略 assign 标签
		syntaxTree
			.syntaxTags
			.ignore(
				"assign"
			);
	};
	ECMAScript6Assign = new Class(ECMAScript6Assign, ECMAScript6Parser);
	
	ECMAScript6Assign.props({
		parse : function(){
			///	<summary>
			///	解析 assign 表达式。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"assign",
					function(element, index){
						// 监听起始大括号
						this.once(
							"openingBrace",
							function(braceElement, i, f, n, p){
								// 如果与 assign 关键字之间存在其他字符
								if(
									!ECMAScript6Parser.isEmptyBetween(element, braceElement, true)
								){
									// 报错
									this.error(element, "assign关键字与其成员之间不应该存在字符。");
									return;
								}
								
								// 阻止其他监听器执行
								p();
								
								// 触发 member 事件
								this.dispatch("member", braceElement, i, f);
							},
							index + 1
						);
						
						// 监听结束大括号
						this.once(
							"closingBrace",
							function(e, i, f, n){
								n();
								
								// 重置文本内容
								element.textContent = "this.assign(";
								
								// 添加结束小括号
								element
									.parentNode
									.appendChild(
										SyntaxTree.createText(")")
									);
							},
							index + 1
						);
					}
				);
		}
	});
	
	return ECMAScript6Assign;
}(
	// ASSIGN_REGEXP
	/\bassign\b/
);

this.ECMAScript6OOP = function(COMMA_ATTRIBUTE, semicolonCondition){
	function ECMAScript6OOP(syntaxTree){
		///	<summary>
		///	面向对象解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6OOP = new Class(ECMAScript6OOP, ECMAScript6Parser);
	
	ECMAScript6OOP.props({
		parse : function(){
			///	<summary>
			///	解析面向对象。
			///	</summary>
			var ecmaScript6OOP = this;
			
			return this
				.syntaxTree
				.listen(
					"oop",
					function(element, index, fragment){
						var named = false, subIndex = index + 1, parentNode = element.parentNode;
						
						// 添加小括号
						element.textContent += "(";
						
						// 解析主体
						ecmaScript6OOP.parseBody(subIndex);
						
						// 监听起始大括号
						this.once(
							"openingBrace",
							function(braceElement, i, f, n){
								var commaElement = SyntaxTree.createElement("comma");
								
								// 将逗号元素添加至大括号前面
								parentNode.insertBefore(commaElement, braceElement);
									
								// 触发插入逗号事件
								this.dispatch("insertComma", commaElement, subIndex, "");
								
								// 执行下一个处理函数
								n();
								
								// 监听大括号结束
								this.once(
									"closingBrace",
									function(braceElement, i, f, n){
										var closingText = SyntaxTree.createText(")");
										
										// 先执行下一个处理函数
										n();
										
										// 保护方法
										ECMAScript6Parser.protectMethod(element, closingText, element, fragment);
										
										// 添加结束小括号
										parentNode.appendChild(closingText);
									},
									subIndex
								);
							},
							subIndex
						);
					}
				);
		},
		parseBody : function(index){
			///	<summary>
			///	解析面向对象主体。
			///	</summary>
			///	<param name="index" type="Number">索引值。</param>
			var ecmaScript6OOP = this;
			
			return this
				.syntaxTree
				.once(
					"openingBrace",
					function(element, i, fragment, next){
						// 监听 plainedKey 事件
						this.listen(
							"plainedKey",
							function(){
								// 添加中断纯文本的条件：分号
								this.plainText
									.addCondition(
										semicolonCondition
									);
							},
							index
						);
						
						// 监听属性关键字事件
						this.listen(
							"key",
							function(e, i, f, n){
								// 先执行下一个处理函数
								n();
								
								// 添加监听器相关id
								ProtectedListeners.add(
									// 保护运算符
									ecmaScript6OOP.protectOperator(index)
								);
							},
							index
						);
						
						// 执行下一个处理函数，传入空字符串作为新的fragment
						next("");
						
						// 解析属性
						ecmaScript6OOP.parseProperty(index + 1);
						// 解析分号
						ecmaScript6OOP.parseSemicolon(index);
						// 解析逗号
						ecmaScript6OOP.parseComma(index);
						
						// 取消监听wrap事件，目的是启用自动分号插入
						this.unlistenBy("wrap", index);
					},
					index
				);
		},
		parseComma : function(index){
			///	<summary>
			///	解析逗号。
			///	</summary>
			///	<param name="index" type="Number">索引值。</param>
			return this
				.syntaxTree
				.listen(
					"comma",
					function(element){
						// 如果有指定的属性，则说明是由parseSemicolon中的分号转换而来
						if(
							element.hasAttribute(COMMA_ATTRIBUTE)
						){
							return;
						}
						
						// 如果逗号不是由parseSemicolon来插入的逗号，则报错
						this.error(element, "此处的属性分隔符应该是分号而不是逗号");
					},
					index
				);
		},
		parseProperty : function(index){
			///	<summary>
			///	解析类的属性。
			///	</summary>
			///	<param name="index" type="Number">指定的索引</param>
			return this
				.syntaxTree
				.listen(
					"property",
					function(element, i, fragment, next, prevent){
						var elementChild = element.firstElementChild, rexModeEnabled = this.rexModeEnabled;
						
						// 如果没有子元素
						if(
							elementChild === null
						){
							// 如果文本内容是空的
							if(
								ECMAScript6Parser.isEmpty(element.textContent)
							){
								// 阻止其他监听器执行
								prevent();
								return;
							}
								
							// 如果没有开启了rex模式
							if(
								!rexModeEnabled
							){
								// 报错
								this.error(element.parentNode, "不应该对类使用简写属性。");
								return;
							}
						}
						
						// 监听默认值
						this.once(
							"defaultValue",
							function(operatorElement, i, f, n, p){
								// 如果开启了rex模式
								if(
									!rexModeEnabled
								){
									return;	
								}
								
								// 阻止其他监听器的执行
								p();
								
								// 将文本改为冒号
								operatorElement.textContent = ":";
							},
							index
						);
					},
					index
				);
		},
		parseSemicolon : function(index, _onlyOnce){
			///	<summary>
			///	移除所有分号。
			///	</summary>
			///	<param name="index" type="Number">索引值。</param>
			///	<param name="_onlyOnce" type="Boolean">是否只执行一次</param>
			return this
				.syntaxTree[
					_onlyOnce ? "once" : "listen"
				](
					"semicolon",
					function(element, i, fragment, next, prevent){
						var parentNode = element.parentNode, commaElement = SyntaxTree.createElement("comma");

						// 阻止其他监听器的执行，因为在最底层，分号将会移除当前索引级别的所有监听器
						prevent();

						// 设置逗号文本
						commaElement.textContent = ",";
						// 添加属性，标记为分号替换的逗号
						commaElement.setAttribute(COMMA_ATTRIBUTE, "");

						// 替换为没有分号的文本节点
						parentNode.replaceChild(
							// 创建文本
							SyntaxTree.createText(
								element.textContent.split(";").join("")
							),
							element
						);
						
						// 添加逗号元素
						parentNode.appendChild(commaElement);
				
						// 分配事件
						this.dispatch("comma", commaElement, index, "");
					},
					index
				);
		},
		protectOperator : function(index){
			///	<summary>
			///	保护操作符。
			///	</summary>
			///	<param name="index" type="Number">指定的索引</param>
			return this
				.syntaxTree
				.once(
					"operator",
					function(element){
						// 如果本来就是冒号
						if(
							element.getAttribute("value") === ":"
						){
							// 报错
							this.error(element, "不应该是用冒号进行属性赋值。");
							return;
						}
					},
					index
				);
		}
	});
	
	return ECMAScript6OOP;
}(
	// COMMA_ATTRIBUTE
	"semicolon",
	// semicolonCondition
	new Condition("semicolon")
);

this.ECMAScript6Class = function(Rexjs, StaticProperties, CLASS_REGEXP, CONSTRUCTOR_REGEXP, remove, getOwnPropertyDescriptor){
	function ECMAScript6Class(syntaxTree){
		///	<summary>
		///	类解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree
			.add(
				new ExpressionTag(
					"class",
					CLASS_REGEXP
				)
			)
			.add(
				new SyntaxTag(
					"constructor",
					CONSTRUCTOR_REGEXP
				)
			);
		
		syntaxTree
			.syntaxTags
			// 忽略 constructor 标签
			.ignore(
				"constructor"
			);
	};
	ECMAScript6Class = new Class(ECMAScript6Class, ECMAScript6Parser);
	
	ECMAScript6Class.static({
		create : function(constructor, _SuperClass, _rexMode, _rest){
			///	<summary>
			///	根据参数生成并返回一个类。
			///	</summary>
			///	<param name="constructor" type="Function">类的构造函数。</param>
			///	<param name="_SuperClass" type="Class">需要继承的父类。</param>
			///	<param name="_rexMode" type="Boolean">是否属于rex模式。</param>
			///	<param name="_rest" type="NamedProperties, Object">类的属性集合。</param>
			var createdClass, properties = [], staticProperties = [];
			
			toArray(
				arguments,
				3
			)
			.forEach(function(props){
				// 如果是静态属性
				if(
					props instanceof StaticProperties
				){
					staticProperties.push(props);
					return;
				}
				
				// 如果属性里有构造函数
				if(
					props.hasOwnProperty("constructor")
				){
					var descriptor = getOwnPropertyDescriptor(props, "constructor");
					
					// 设置构造函数
					constructor = descriptor.value;
					
					if(
						typeof constructor !== "function"
					){
						throw "构造函数应该是一个非访问器性质的普通函数。";
					}
					
					// 删除constructor属性
					remove.call(props, "constructor");
				}
				
				properties.push(props);
			});
			
			// 创建类
			createdClass = new (_rexMode ? Class : Rexjs)(constructor, _SuperClass || void 0);
			
			// 定义属性
			[
				properties, staticProperties
			]
			.forEach(
				function(props, i){
					var method = this[i];
					
					props.forEach(function(property){
						createdClass[method](property);
					})
				},
				["props", "static"]
			);
			
			return createdClass;
		}
	});
	
	ECMAScript6Class.props({
		parse : function(){
			///	<summary>
			///	解析类。
			///	</summary>
			var ecmaScript6Class = this;
			
			// 监听class关键字
			return this
				.syntaxTree
				.listen(
					"class",
					function(element, index, fragment){
						var id, className, extendsElement, subIndex = index + 1, hasSuper = false;
						
						// 触发oop事件
						this.dispatch("oop", element, index, fragment);
						
						// 设置文本内容
						element.textContent = "Rexjs.ECMAScript6Class.create(function "
						
						// 监听extends关键字
						id = this.once(
							"extends",
							function(extendsEl, i, f, n, p){
								// 阻止其他监听器执行
								p();
								
								// 存储类名
								className = ECMAScript6Parser.getTextBetween(element, extendsEl).trim();
								// 记录 super
								hasSuper = true;
								// 记录元素，并设置文本内容
								(extendsElement = extendsEl).textContent = "(){" + (this.rexModeEnabled ? "" : className + ".getSuperClass().call(this);") + "},";
							},
							index
						);
						
						// 监听类的大括号
						this.once(
							"openingBrace",
							function(braceElement, i, f, n){
								var commaElement, withoutConstructor = true, syntaxTags = this.syntaxTags;
								
								// 取消extends关键字的监听
								this.unlisten(id);
								
								// 去除构造函数标签的忽略
								syntaxTags.unignore("constructor");
								
								// 监听insertComma事件
								this.once(
									"insertComma",
									function(commaEl){
										// 记录commaElement
										commaElement = commaEl;
										// 设置逗号文本
										commaElement.textContent = (hasSuper ? "" : "(){}, null") + ", " + (this.rexModeEnabled ? "true" : "false") + ",";
										
										// 如果有父类
										if(
											hasSuper
										){
											// 不再继续
											return;
										}
										
										// 存储类名
										className = ECMAScript6Parser.getTextBetween(element, commaElement).trim();
									},
									subIndex
								);
								
								// 先执行下一个处理函数
								n();
									
								// 解析类大括号的结束标记
								this.once(
									"closingBrace",
									function(braceElement){
										// 忽略构造函数标签
										syntaxTags.ignore("constructor");
										
										// 尽可能的自动定义并插入变量名
										ECMAScript6Declaration.autoInsert(className, element, fragment, braceElement);
									},
									subIndex
								);
								
								// 解析构造函数
								ecmaScript6Class.parseConstructor(className, hasSuper, subIndex);
							},
							subIndex
						);
						
						// 解析body
						ecmaScript6Class.parseBody(subIndex);
					}
				);
		},
		parseBody : function(index){
			///	<summary>
			///	解析类主体。
			///	</summary>
			///	<param name="index" type="Number">指定的索引。</param>
			var ecmaScript6Class = this;
			
			return this
				.syntaxTree
				.once(
					"openingBrace",
					function(element, i, fragment, next){
						var syntaxTags = this.syntaxTags;
						
						// 监听属性关键字事件
						this.listen(
							"key",
							function(e, i, f, n){
								// 先执行下一个处理函数
								n();
								
								// 添加监听器相关id
								ProtectedListeners.add(
									// 保护static关键字
									ecmaScript6Class.protectStatic(index)
								);
						
								// 去除构造函数标签的忽略
								syntaxTags.unignore("constructor");
								
								// 添加纯文本模式的条件：静态关键字、构造函数关键字
								this.plainText
									.addCondition(
										staticCondition,
										0
									)
									.addCondition(
										constructorCondition
									);
							},
							index
						);
						
						this.listen(
							"value",
							function(){
								// 忽略构造函数标签
								syntaxTags.ignore("constructor");
							},
							index
						);
						
						// 解析属性
						ecmaScript6Class.parseProperty(index + 1);
						
						// 执行下一个处理函数
						next();
						
						// 取消监听separateProperty事件，目的是防止使用Rexjs.ECMAScript6Object.create
						this.unlistenBy("separateProperty", index + 1);
					},
					index
				);
		},
		parseConstructor : function(className, hasSuper, index){
			///	<summary>
			///	解析 constructor 关键字。
			///	</summary>
			///	<param name="className" type="String">类的名称。</param>
			///	<param name="hasSuper" type="Boolean">是否继承父类。</param>
			///	<param name="index" type="Number">索引。</param>
			var ecmaScript6Class = this;
			
			return this
				.syntaxTree
				.listen(
					"constructor",
					function(element){
						var sid;
						
						element.textContent = "constructor : function " + className;
						
						// 如果 rex 模式已经开启
						if(
							this.rexModeEnabled
						){
							// 取消 assign 标签的忽略
							this.syntaxTags
								.unignore(
									"assign"
								);
						}
						// rex 模式没有开启，而且还有父类
						else if(
							hasSuper
						){
							// 监听属性分隔符，只要此监听没有被移除，则会提示没有调用 super 的错误
							sid = this.once(
								"semicolon",
								function(){
									// 报错
									this.error(element, "应该在构造函数内调用super关键字。");
								},
								index
							);
						}
						
						// 解析 super 关键字
						ecmaScript6Class.parseSuper(className, hasSuper, index + 1);
						
						// 监听 super 关键字
						this.once(
							"super",
							function(superElement, i, f, n, p){
								// 取消分号的监听，以免报错
								this.unlisten(sid);
							},
							index + 1
						);
					},
					index
				);
		},
		parseProperty : function(index){
			///	<summary>
			///	解析类的属性。
			///	</summary>
			///	<param name="index" type="Number">指定的索引</param>
			return this
				.syntaxTree
				.listen(
					"property",
					function(element, i, fragment, next){
						var elementChild = element.firstElementChild;
						
						// 如果elementChild不存在
						if(
							elementChild === null
						){
							return;
						}
						
						// 如果是static属性
						if(
							elementChild.tagName !== "static"
						){
							return;
						}
						
						// 设置static特性
						element.setAttribute("static", "");
						// 移除static元素
						element.removeChild(elementChild);
						
						// 如果文本内容是空的
						if(
							ECMAScript6Parser.isEmpty(element.textContent)
						){
							// 报错
							this.error(elementChild, "static关键字不应该作为简写属性来定义。");
							return;
						}
									
						// 先执行下一个处理函数
						next();
						
						// 触发staticProperty事件
						this.dispatch("staticProperty", element, index, "");
					},
					index
				);
		},
		protectStatic : function(index){
			///	<summary>
			///	保护static关键字。
			///	</summary>
			///	<param name="index" type="Number">指定的索引</param>
			return this
				.syntaxTree
				.once(
					"static",
					function(element, i, fragment, next, prevent){
						// 阻止其他监听器执行
						prevent();
					},
					index
				);
		},
		parseSuper : function(className, hasSuper, index){
			///	<summary>
			///	解析 super 关键字。
			///	</summary>
			///	<param name="className" type="String">类的名称。</param>
			///	<param name="hasSuper" type="Boolean">是否继承父类。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.once(
					"super",
					function(element, i, fragment, next, prevent){
						var description;
								
						// 阻止其他监听器执行
						prevent();
						
						switch(
							true
						){
							// 如果没有父类
							case !hasSuper :
								description = "该类没有继承任何类，不应该使用super关键字。";
								break;
							
							// 如果开启了rex模式
							case this.rexModeEnabled :
								description = "开启了rex模式后，系统将会自行调用super关键字，只要保持相应的参数名一致即可。";
								break;
							
							// 如果在this关键字之后调用
							case ECMAScript6Parser.querySpecialSelector(element.parentNode, ">this") !== null :
								description = "super关键字应该在this关键字之前调用。";
								break;
							
							// 默认
							default :
								// 重新设置文本内容
								element.textContent = className + ".getSuperClass().bind(this)";
								return;
						}
						
						// 报错
						this.error(element, description);
					},
					index
				);
		}
	});

	return ECMAScript6Class;
}(
	Rexjs,
	this.StaticProperties,
	// CLASS_REGEXP
	/\bclass\b/,
	// CONSTRUCTOR_REGEXP
	/\bconstructor\b(?=\s*\()/,
	NamedProperties.prototype.remove,
	Object.getOwnPropertyDescriptor
);

this.ECMAScript6StaticClass = function(StaticProperties, STATIC_CLASS_REGEXP, getOwnPropertyNames){
	function ECMAScript6StaticClass(syntaxTree){
		///	<summary>
		///	静态类解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"static-class",
				STATIC_CLASS_REGEXP,
				"staticClass"
			),
			true
		);
	};
	ECMAScript6StaticClass = new Class(ECMAScript6StaticClass, ECMAScript6Parser);
	
	ECMAScript6StaticClass.static({
		create : function(constructor, _rest){
			///	<summary>
			///	根据参数生成并返回一个静态类。
			///	</summary>
			///	<param name="constructor" type="Function">静态类的构造函数。</param>
			///	<param name="_rest" type="NamedProperties, Object">静态类的属性集合。</param>
			var staticProperties = new StaticProperties();
			
			// 将省略参数（属性）转化为数组
			toArray(
				arguments,
				1
			)
			// 遍历数组
			.forEach(function(props){
				// 如果当前属性是静态属性
				if(
					props instanceof StaticProperties
				){
					// 添加静态属性
					staticProperties.add(props);
					return;
				}
				
				// 获取所有属性的名称数组
				var names = getOwnPropertyNames(props);
				
				// 判断名称数组的长度
				switch(
					names.length
				){
					// 如果是0，说明是空的，则返回
					case 0 :
						return;
	
					// 如果属性是构造函数而且长度是1
					case names[0] === "constructor" ? 1 : 0 :
						// 记录构造函数
						constructor = props.constructor;
						// 返回
						return;
				}
				
				// 进入到这，说明存在非静态方法，报错
				throw "静态类不应该定义非静态方法。";
			});
			
			// 创建静态类
			return new StaticClass(constructor, staticProperties);
		}
	});
	
	ECMAScript6StaticClass.props({
		parse : function(){
			///	<summary>
			///	解析静态类。
			///	</summary>
			var ecmaScript6StaticClass = this;
			
			// 监听static-class
			return this
				.syntaxTree
				.listen(
					"staticClass",
					function(element, index, fragment){
						var textContent = element.textContent;
						
						// 如果没有启用rex模式
						if(
							!this.rexModeEnabled
						){
							// 报错
							this.error(element, "若要使用静态类，请开启rex模式。");
							return;
						}
						
						// 触发class事件
						this.dispatch("class", element, index , fragment);
						
						// 设置文本内容
						element.textContent = "Rexjs.ECMAScript6StaticClass.create(function ";
						
						// 监听extends关键字
						this.once(
							"extends",
							function(e){
								// 如果进入此函数，则说明有extends关键字，报错
								this.error(e, "静态类不应该使用，因为它无法继承与被继承。");
							},
							index
						);
						
						// 监听插入逗号事件
						this.once(
							"insertComma",
							function(commaElement, i){
								// 设置逗号文本
								commaElement.textContent = "(){},";
							},
							index + 1
						);
						
						// 解析属性
						ecmaScript6StaticClass.parseProperty(index + 2);
					}
				);
		},
		parseProperty : function(index){
			///	<summary>
			///	解析静态类属性。
			///	</summary>
			///	<param name="index" type="Number">索引值。</param>
			return this
				.syntaxTree
				.listen(
					"property",
					function(element, idx, fragment, next){
						// 先执行下一个处理函数
						next();
						
						// 如果是静态属性，则返回
						if(
							element.hasAttribute("static")
						){
							return;
						}
						
						// 构造函数应该是特殊的非静态方法
						if(
							ECMAScript6Parser.querySpecialSelector(element, ">constructor") !== null
						){
							return;
						}
						
						// 非静态属性，一律报错
						this.error(element.parentNode, "静态类不允许定义非构造函数之外的非静态属性。");
					},
					index,
					index - 1
				);
		}
	});
	
	return ECMAScript6StaticClass;
}(
	this.StaticProperties,
	// STATIC_CLASS_REGEXP
	/\bstatic\s+class\b/,
	Object.getOwnPropertyNames
);

this.ECMAScript6LessLogicOOP = function(){
	function ECMAScript6LessLogicOOP(syntaxTree){
		///	<summary>
		///	少逻辑的面向对象解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6LessLogicOOP = new Class(ECMAScript6LessLogicOOP, ECMAScript6Parser);
	
	ECMAScript6LessLogicOOP.props({
		parse : function(){
			///	<summary>
			///	解析少逻辑的面向对象。
			///	</summary>
			var ecmaScript6LessLogicOOP = this;
			
			return this
				.syntaxTree
				.listen(
					"lessLogicOOP",
					function(element, index, fragment){
						// 如果没有开启rex模式
						if(
							!this.rexModeEnabled
						){
							// 报错
							this.error(element, "若要使用" + element.codeContent + "，必须开启rex模式。");
							return;
						}
						
						// 触发oop事件
						this.dispatch("oop", element, index, fragment);
						
						this.once(
							"openingBrace",
							function(braceElement){
								// 如果满足插入变量名的条件
								if(
									ECMAScript6Declaration.insertable(element, fragment)
								){
									// 自动定义并插入变量名
									ECMAScript6Declaration.insert(
										// 获取文本内容作为变量名
										ECMAScript6Parser.extractTextBetween(
											element,
											braceElement
										),
										element,
										braceElement
									);
									
									return;
								}
								
								// 加上起始注释，屏蔽自带的名称，如：var e = enum myEnum {};屏蔽“myEnum”
								element.textContent += "/*";
								
								// 添加结束的注释
								braceElement
									.parentNode
									.insertBefore(
										SyntaxTree.createText("*/"),
										braceElement
									);
							},
							index + 1
						);
						
						// 解析枚举的主体
						ecmaScript6LessLogicOOP.parseBody(index + 1);
					}
				);
		},
		parseBody : function(index){
			///	<summary>
			///	解析枚举主体。
			///	</summary>
			///	<param name="index" type="Number">索引值。</param>
			var ecmaScript6LessLogicOOP = this;
			
			return this
				.syntaxTree
				.once(
					"openingBrace",
					function(element){
						var syntaxTags = this.syntaxTags;
						
						// 监听key事件
						this.listen(
							"key",
							function(e, i, f, n){
								// 先执行下一个处理函数
								n();
								
								// 忽略访问器，当做普通文本处理
								syntaxTags.ignore("accessor");
							},
							index
						);
						
						// 解析属性
						ecmaScript6LessLogicOOP.parseProperty(index + 1);
					},
					index
				);
		},
		parseProperty : function(index){
			///	<summary>
			///	解析属性。
			///	</summary>
			///	<param name="index" type="Number">索引值。</param>
			return this
				.syntaxTree
				.listen(
					"property",
					function(element){
						// 监听计算式
						this.once(
							"computedName",
							function(e){
								// 报错
								this.error(e, "此处的属性名称应该是一个确定的值，不应该使用不确定性的计算式。");
							},
							index
						);
						
						// 监听简写方法
						this.once(
							"shorthandMethod",
							function(e){
								// 报错
								this.error(e, "此处的属性不应该是一个简写方法。");
							},
							index
						);
						
						// 监听简写字符串
						this.listen(
							"shorthandString",
							function(e, i, f, n, p){
								// 阻止其他监听器执行
								p();
								
								// 将其作为简写名称，从而触发shorthandName
								this.dispatch("shorthandName", e, i, f);
							},
							index
						);
					},
					index
				);
		}
	});
	
	return ECMAScript6LessLogicOOP;
}();

this.ECMAScript6Enum = function(ENUM_REGEXP){
	function ECMAScript6Enum(syntaxTree){
		///	<summary>
		///	枚举解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"enum",
				ENUM_REGEXP
			)
		);
	};
	ECMAScript6Enum = new Class(ECMAScript6Enum, ECMAScript6Parser);
	
	ECMAScript6Enum.props({
		parse : function(){
			///	<summary>
			///	解析枚举。
			///	</summary>
			var ecmaScript6Enum = this;
			
			return this
				.syntaxTree
				.listen(
					"enum",
					function(element, index, fragment){
						var value = 0;
						
						// 修改文本内容
						element.textContent = "new Rexjs.Enum";
						
						// 触发 lessLogicOOP 事件
						this.dispatch("lessLogicOOP", element, index, fragment);
						
						// 监听 shorthandName
						this.listen(
							"shorthandName",
							function(e, i, f, n, p){
								// 阻止其他监听器执行
								p();
								
								// 转化成键值对模式，设为递增值
								e.textContent += ":" + value++;
							},
							index + 2,
							// 设置此参数，目的是为了在closeBrace之后，清除此监听器，毕竟当前不是在大括号内
							index + 1
						);
					}
				);
		}
	});
	
	return ECMAScript6Enum;
}(
	// ENUM_REGEXP
	/\benum\b/
);

this.ECMAScript6Interface = function(INTERFACE_REGEXP, forEach, isArray){
	function ECMAScript6Interface(syntaxTree){
		///	<summary>
		///	接口解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"interface",
				INTERFACE_REGEXP
			)
		);
	};
	ECMAScript6Interface = new Class(ECMAScript6Interface, ECMAScript6Parser);
	
	ECMAScript6Interface.static({
		create : function(propertyNames){
			///	<summary>
			///	创建接口。
			///	</summary>
			///	<param name="propertyNames" type="Object, Array">规定的属性名称。</param>
			
			// 如果不是数组
			if(
				!isArray(propertyNames)
			){
				var names = propertyNames;
				
				propertyNames = [];
				
				// 遍历名称
				forEach(
					names,
					function(value, name){
						propertyNames.push(name);
					}
				);
			}
			
			// 返回接口
			return new Interface(propertyNames);
		}
	});
	
	ECMAScript6Interface.props({
		parse : function(){
			///	<summary>
			///	解析接口。
			///	</summary>
			var ecmaScript6Interface = this;
			
			return this
				.syntaxTree
				.listen(
					"interface",
					function(element, index, fragment){
						// 修改文本内容
						element.textContent = "Rexjs.ECMAScript6Interface.create";
						
						// 触发 lessLogicOOP 事件
						this.dispatch("lessLogicOOP", element, index, fragment);
						
						// 监听简写属性
						this.listen(
							"shorthandName",
							function(e, i, f, n, p){
								// 阻止其他监听器执行
								p();
								
								// 转化成键值对模式，设为递增值
								e.textContent += ": true";
							},
							index + 2,
							// 设置此参数，目的是为了在closeBrace之后，清除此监听器，毕竟当前不是在大括号内
							index + 1
						);
					}
				);
		}
	});
	
	return ECMAScript6Interface;
}(
	// INTERFACE_REGEXP
	/\binterface\b/,
	Rexjs.forEach,
	Array.isArray
);

this.OOPPackage = function(Package, contents){
	function OOPPackage(syntaxTree){
		///	<summary>
		///	面向对象解析器包。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	OOPPackage = new Class(OOPPackage, Package);
	
	OOPPackage
		.package
		.apply(
			OOPPackage,
			contents
		);
	
	return OOPPackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScript6Extends,
		this.ECMAScript6Super,
		this.ECMAScript6Static,
		this.ECMAScript6StaticProperty,
		this.ECMAScript6Assign,
		this.ECMAScript6OOP,
		this.ECMAScript6LessLogicOOP,
		this.ECMAScript6Class,
		this.ECMAScript6StaticClass,
		this.ECMAScript6Enum,
		this.ECMAScript6Interface
	]
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.ECMAScript6Exception,
	this.ECMAScript6Declaration,
	this.SyntaxTree,
	this.SyntaxTag,
	this.ExpressionTag,
	this.Condition,
	this.NamedProperties,
	this.ProtectedListeners,
	// staticCondition
	new this.OrderedCondition("static"),
	// constructorCondition
	new this.Condition("constructor"),
	Rexjs.toArray
));


// 模块相关解析器
(function(ECMAScript6Parser, SyntaxTree, DeclarationTag, ExpressionTag, NamedItem, NamedItemMap, URL_REGEXP, SPACE_REGEXP, current, toArray, encodeURI, decodeURI){

this.ModuleStatus = new Enum([ "None", "Created", "Loaded", "Ready", "Completed" ]);

this.URL = function(Blob, FileReader, join, toString, toObject, error){
	function URL(urlString, _baseURLstring){
		///	<summary>
		///	地址类。
		///	</summary>
		///	<param name="urlString" type="*">地址。</param>
		///	<param name="_baseURLstring" type="*">基本地址。</param>
		
		// 转化为字符串
		var urlObj;
		
		// 转化为字符串
		urlString = toString(urlString);
		// 获取url对象
		urlObj = toObject(urlString);
		
		// 如果 urlObj 不存在，则说明转换失败
		if(
			urlObj === null
		){
			var baseUrlObj;
			
			// 将 _baseURLstring 转换为字符串
			_baseURLstring = toString(_baseURLstring);
			// 获取url对象
			baseUrlObj = toObject(_baseURLstring);
			
			// 如果 baseUrlObj 也不存在
			if(
				baseUrlObj === null
			){
				// 报错
				error(arguments[0]);
				return;
			}
			
			// 根据拼接的地址重新转为对象
			urlObj = toObject(
				baseUrlObj.origin + (urlString[0] === "/" ? "" : baseUrlObj.dirname + "/") + urlString
			);
			
			// 如果 urlObj 不存在
			if(
				urlObj === null
			){
				// 报错
				error(arguments[0]);
				return;
			}
		}
		
		// 赋值
		this.assign(urlObj);
	};
	URL = new Class(URL);
	
	URL.static({
		convert : function(string, type, callback, _error){
			///	<summary>
			///	将字符串转换为一个包含其内容的且具有指定格式文件地址。
			///	</summary>
			///	<param name="string" type="String">内容性质的字符串。</param>
			///	<param name="type" type="String">文件格式。</param>
			///	<param name="callback" type="Function">成功的回调函数。</param>
			///	<param name="_error" type="Function">错误的回调函数。</param>
			
			// 如果Blob或FileReader不存在
			if(
				!Blob || !FileReader
			){
				_error && _error();
				return this;
			}
		
			var fileReader = new FileReader();
			
			// 添加onload
			fileReader.onload = function(){
				// 执行回调
				callback(this.result);
			};
			
			// 添加onerror
			fileReader.onerror = _error;
			
			// 读取dataURL
			fileReader.readAsDataURL(
				// 实例化Blob
				new Blob(
					[ string ],
					{ type : type }
				)
			);
			
			return this;
		},
		join : function(_rest){
			///	<summary>
			///	将本函数所有参数地址拼装成一个新的地址，并返回。
			///	</summary>
			///	<param name="_rest" type="String">地址字符串。</param>
			return new URL(
					join.call(arguments, "/")	
				)
				.toString();
		}
	});
	
	URL.props({
		dirname : "",
		filename : "",
		hash : "",
		host : "",
		hostname : "",
		href : "",
		origin : "",
		pathname : "",
		port : "",
		protocal : "",
		search : "",
		toString : function(){
			///	<summary>
			///	该对象的字符串结果。
			///	</summary>
			return this.href;
		}
	});
	
	return URL;
}(
	typeof Blob === "undefined" ? null : Blob,
	typeof FileReader === "undefined" ? null : FileReader,
	Array.prototype.join,
	// toString
	function(urlString){
		// 如果不是字符串
		if(
			typeof urlString !== "string"
		){
			// 如果是 undefined 或者 null，则为空字符串，否则为toString的返回值
			urlString = urlString == null ? "" : urlString.toString();
		}
		
		// 返回转码后的字符串
		return encodeURI(
			urlString.trim()
		);
	},
	// toObject
	function(urlString){
		var result;
		
		result = urlString
			// 去掉除空格之外的空白字符
			.replace(
				SPACE_REGEXP,
				""
			)
			// 匹配地址
			.match(
				URL_REGEXP
			);
		
		// 如果没有匹配结果
		if(
			result === null
		){
			return result;
		}
		
		var urlObject, protocal = result[1], hostname = result[2] || "", port = result[3] || "";
		
		// 初始化对象
		urlObject = {
			dirname : "",
			filename : "",
			hash : result[6] || "",
			host : hostname + (port ? ":" + port : ""),
			hostname : hostname,
			href : "",
			origin : "",
			port : port,
			pathname : result[4] || "",
			protocal : protocal,
			search : result[5] || ""
		};
		
		// 如果不是http与https地址
		if(
			protocal !== "http:" && protocal !== "https:"
		){
			var index;
			
			// 还原链接字符串
			urlString = decodeURI(urlString);
			
			// 如果存在 search
			if(
				urlObject.search.length > 0
			){
				// 设置 index
				index = urlString.indexOf("?");
			}
			// 如果存在 hash
			else if(
				urlObject.hash.length > 0
			){
				// 设置 index
				index = urlString.indexOf("#");
			}
			else {
				// 设置 index
				index = urlString.length;
			}
			
			// 重置urlObject部分属性
			urlObject.pathname = urlString.substring(protocal.length, index);
			urlObject.hostname = urlObject.host = urlObject.port = "";
			urlObject.href = urlString;
			urlObject.search = decodeURI(urlObject.search);
			urlObject.hash = decodeURI(urlObject.hash);
			
			// 返回urlObject
			return urlObject;
		}
		
		// 如果不存在hostname，则说明地址不规范
		if(
			!urlObject.hostname
		){
			// 返回 null
			return null;
		}
		
		var dirname, length, pathnameArray = [];
		
		// 分割路径
		urlObject
			.pathname
			.split(
				"/"
			)
			.forEach(function(name){
				switch(
					name
				){
					// 如果是1点，说明是保持当前层目录，不需要做任何处理
					case "." :
						break;
					
					// 如果是2点，说明是返回上一层目录，则去掉数组的最后一个
					case ".." :
						pathnameArray.splice(pathnameArray.length - 1);
						break;
						
					case "" :
						break;
					
					// 添加目录
					default :
						pathnameArray.push(name);
						break;
				}
			});
		
		// 设置length
		length = pathnameArray.length;
		
		// 重置urlObject部分属性
		urlObject.pathname = "/" + pathnameArray.join("/");
		urlObject.dirname = "/" + pathnameArray.slice(0, length - 1).join("/");
		urlObject.filename = (length > 1 ? pathnameArray[length - 1] : "");
		urlObject.origin = urlObject.protocal + "//" + urlObject.host;
		urlObject.href = urlObject.origin + urlObject.pathname + urlObject.search + urlObject.hash;
		
		// 返回 urlObject
		return urlObject;
	},
	// error
	function(urlString){
		throw "无效的地址：" + urlString + "。";
	}
);

this.Module = function(ModuleStatus, URL, XMLHttpRequest, Date, BASE_URI, cache, storage, nativeEval, repeat, loadDeps){
	function Module(name, Package, _auto, _code){
		///	<summary>
		///	模块类。
		///	</summary>
		///	<param name="name" type="String">模块名称，通常是一个文件地址。</param>
		///	<param name="Package" type="Package">该模块所支持的包。</param>
		///	<param name="_auto" type="Boolean">当该模块准备就绪后，是否自动运行。</param>
		///	<param name="_code" type="String">该模块代码，当提供此参数，将不会再下载代码。</param>
		var data, callback, mod = this, deps = [], hasCode = typeof _code === "string";
		
		// 格式化名称
		name = new URL(name, BASE_URI).toString();
		
		this.assign({
			auto : _auto,
			deps : deps,
			name : name,
			status : ModuleStatus.Created
		});
		
		// 添加至缓存
		cache.setNamedItem(this);
		
		// 初始化数据
		data = storage[name] = {
			Package : Package,
			callbacks : [],
			hasCode : hasCode,
			result : ""
		};
		
		callback = function(code){
			// 实例化语法树
			var syntaxTree = new SyntaxTree(code);
			
			// 监听from事件
			syntaxTree.listen(
				"dependency",
				function(element){
					// 添加依赖
					deps.push(
						new URL(
							// 去掉字符串的双引号或单引号
							element.textContent.substring(1, element.textContent.length - 1),
							name
						)
						.toString()
					);
					
					// 重置文本内容
					element.textContent = '"' + deps[deps.length - 1] + '"';
				}
			);
			
			// 初始化解析器包
			new Package(syntaxTree);
			
			// 改变状态
			mod.status = ModuleStatus.Loaded;
			// 记录current
			current = mod;
			// 创建语法树并记录代码内容
			data.result = syntaxTree.create().textContent;
			// 清空current
			current = null;
			
			// 加载依赖
			loadDeps(Module, ModuleStatus, mod, data, cache, storage);
		};
		
		// 如果已有现在的代码
		if(
			hasCode
		){
			// 立刻执行回调
			callback(_code);
			return;
		}
		
		// 加载模块
		Module.load(name, callback);
	};
	Module = new Class(Module, NamedItem);
	
	Module.static({
		cache : cache,
		eval : function(code, filename, _withoutMapping){
			///	<summary>
			///	运行代码，代码将被添加source和map。
			///	</summary>
			///	<param name="code" type="String">需要运行的代码。</param>
			///	<param name="filename" type="String">文件名。</param>
			///	<param name="_withoutMapping" type="Boolean">如果该参数被提供，则不会给代码添加mappingURL。</param>
			
			// 如果不需要添加mapping
			if(
				_withoutMapping
			){
				nativeEval(code += "\n//# sourceURL=http://sources/" + filename);
				return this;
			}
			
			URL.convert(
				[
					"{",
						'"sources" : ["' + filename + "?" + Date.now() + '"],',
						'"names" : [],',
						'"mappings":"AAAA;' + repeat("AACA;", code.split("\n").length - 1) + '"',
					"}"
				]
				.join(""),
				"application/json",
				function(mappingURL){
					// 运行代码
					nativeEval(
						code +
						// 添加map
						"\n//# sourceMappingURL=" + mappingURL +
						// 添加source
						"\n//# sourceURL=http://sources/" + filename
					);
				},
				function(){
					nativeEval(code += "\n//# sourceURL=http://sources/" + filename);
				}
			);
			
			return this;
		},
		load : function(url, callback){
			///	<summary>
			///	加载模块代码。
			///	</summary>
			///	<param name="url" type="String">模块地址。</param>
			///	<param name="callback" type="Function">回调函数。</param>
			var request = new XMLHttpRequest();
			
			// 监听onload
			request.addEventListener(
				"load",
				function(){
					// 如果存在错误
					if(
						this.status !== 200
					){
						throw '加载模块 "' + url + '" 错误，status：' + this.status + "。";
						return;
					}
					
					// 执行回调
					callback(this.responseText);
				}
			);
			
			// 打开请求，采用异步get方式
			request.open("get", url, true);
			// 发送请求
			request.send();
			
			return request;
		}
	});
	
	Module.props({
		auto : false,
		deps : null,
		exec : function(){
			// 如果已经准备完毕
			if(
				this.status === ModuleStatus.Ready
			){
				var name = this.name;
				
				// 执行代码
				Module.eval(storage[name].result, name, storage[name].hasCode);
				
				// 删除此模块对应的存储数据
				delete storage[name];
				
				this.status = ModuleStatus.Completed;
			}
			
			return this;
		},
		status : ModuleStatus.None
	});
	
	return Module;
}(
	this.ModuleStatus,
	this.URL,
	XMLHttpRequest,
	Date,
	// BASE_URI
	location.href,
	// cache
	new NamedItemMap(),
	// storage
	{},
	eval,
	// repeat
	function(str, count){
		// 如果str自带repeat
		if(
			str.repeat
		){
			// 返回repeat结果
			return str.repeat(count);
		}
		
		var arr = [];
		
		// 利用循环添加
		for(
			var i = 0,
				j = count;
			i < j;
			i++
		){
			arr.push("AACA;");
		}
		
		return arr.join("");
	},
	// loadDeps
	function(Module, ModuleStatus, mod, data, cache, storage){
		var callback, name = mod.name, deps = mod.deps, length = deps.length + 1;
		
		callback = function(){
			// 如果所有依赖都已经加载完毕
			if(
				--length > 0
			){
				return;
			}
			
			// 改变状态
			mod.status = ModuleStatus.Ready;
			
			// 遍历这些函数
			data.callbacks
				.forEach(function(event){
					event();
				});
			
			// 如果模块需要马上自动运行
			if(
				mod.auto
			){
				// 立即执行
				mod.exec();
			}
		};
		
		// 立即执行，判断一次
		callback();
		
		// 等待依赖
		deps.forEach(function(dep){
			// 如果缓存不存在，则说明该模块尚未加载
			if(
				!cache.hasNamedItem(dep)
			){
				// 初始化模块
				new Module(dep, data.Package);
			}
			
			// 判断状态
			switch(
				cache[dep].status
			){
				// 如果是已准备，则跳出判断
				case ModuleStatus.Ready :
					break;
				
				// 如果是已完成，则跳出判断
				case ModuleStatus.Completed :
					break;
				
				// 默认，认为依赖尚未加载完毕
				default :
					// 添加回调函数
					storage[dep].callbacks.push(callback);
					return;
			}
			
			// 如果模块已经就绪，执行回调函数
			callback();
		});
	}
);

this.Exports = function(Module, cache, forEach, create){
	function Exports(name){
		///	<summary>
		///	模块输出内容。
		///	</summary>
		///	<param name="name" type="String">模块名称，通常是一个文件地址。</param>
		this.assign(
			{ data : create(null) }
		);
	};
	Exports = new Class(Exports, NamedItem);
	
	Exports.static({
		cache : cache,
		create : function(name){
			///	<summary>
			///	创建指定名称模块的输出对象。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			
			// 如果已经创建
			if(
				cache.hasOwnProperty(name)
			){
				// 返回 true
				return true;
			}
			
			var moduleCache = Module.cache;
				
			// 如果缓存中没有该模块
			if(
				!moduleCache.hasNamedItem(name)
			){
				// 返回 false
				return false;
			}
			
			// 初始化输出
			cache.setNamedItem(
				new Exports(name)
			);
			
			// 运行模块代码
			moduleCache
				.getNamedItem(
					name
				)
				.exec();

			return true;
		},
		dataOf : function(name){
			///	<summary>
			///	获取指定名称模块输出的值。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			return this.get(name).data;
		},
		defaultOf : function(name){
			///	<summary>
			///	获取指定名称模块的默认输出。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			return this.get(name).default;
		},
		get : function(name){
			///	<summary>
			///	获取指定名称模块的输出对象。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			this.create(name);
			
			// 返回 exports
			return cache.getNamedItem(name);
		},
		set : function(name, key, _value){
			///	<summary>
			///	给指定名称的模块设置输出对象。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			///	<param name="key" type="String, Object">输出对象的键名或键值对集合。</param>
			///	<param name="_value" type="*">输出对象的值。</param>
			var exports = this.get(name);
			
			// 如果键名是字符串
			if(
				typeof key === "string"
			){
				exports.set(key, _value);
			}
			else {
				// 遍历集合
				forEach(
					key,
					function(v, k){
						// 设置单个输出
						exports.set(k, v);
					}
				);
			}
			
			return this;
		},
		setDefault : function(name, key, value){
			///	<summary>
			///	给指定名称的模块设置默认输出对象。
			///	</summary>
			///	<param name="name" type="String">模块名称。</param>
			///	<param name="key" type="String">输出对象的键名。</param>
			///	<param name="value" type="*">默认输出的对象。</param>
			this.get(
					name
				)
				.setDefault(
					key,
					value
				);
				
			return this;
		}
	});
	
	Exports.props({
		data : null,
		default : void 0,
		set : function(key, value){
			///	<summary>
			///	设置输出对象。
			///	</summary>
			///	<param name="key" type="String, Object">输出对象的键名。</param>
			///	<param name="_value" type="*">输出对象的值。</param>
			this.data[key] = value;
			
			return this;
		},
		setDefault : function(key, value){
			///	<summary>
			///	设置默认的输出对象。
			///	</summary>
			///	<param name="key" type="String">输出对象的键名。</param>
			///	<param name="value" type="*">默认输出的对象。</param>
			this.set(key, value);
			this.default = value;
			
			return this;
		}
	});
	
	return Exports;
}(
	this.Module,
	// cache
	new NamedItemMap(),
	Rexjs.forEach,
	Object.create
);

this.ECMAScript6Import = function(IMPORT_REGEXP, currentElement, protectMemberExpression){
	function ECMAScript6Import(syntaxTree){
		///	<summary>
		///	import 表达式解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new DeclarationTag(
				"import",
				IMPORT_REGEXP
			)
		);
	};
	ECMAScript6Import = new Class(ECMAScript6Import, ECMAScript6Parser);
	
	ECMAScript6Import.static({
		get currentElement(){
			///	<summary>
			///	获取当前的 import 元素。
			///	</summary>
			return currentElement;
		}
	});
	
	ECMAScript6Import.props({
		parse : function(){
			///	<summary>
			///	解析 import 表达式。
			///	</summary>
			var ecmaScript6Import = this;
			
			return this
				.syntaxTree
				.listen(
					"import",
					function(element, index){
						var ids, imported = false, syntaxTags = this.syntaxTags;
						
						// 设置当前的 import 元素
						currentElement = element;
						// 修改文本内容
						element.textContent = "var";
						
						// 各种情况的解析器
						ids = [
							ecmaScript6Import.parseModuleName(element, index),
							ecmaScript6Import.parseMember(element, index + 1)
						];
						
						syntaxTags
							// 取消 as 关键字的忽略
							.unignore(
								"as"
							)
							// 取消 from 关键字的忽略
							.unignore(
								"from"
							);
						
						// 监听 imported 事件
						this.once(
							"imported",
							function(){
								// 表示已经正确的引入模块
								imported = true;
								
								// 取消监听其他情况的监听
								ids.forEach(this.unlisten, this);
							},
							index
						);
						
						// 监听分号
						this.once(
							"semicolon",
							function(){
								// 清空当前所记录的 import 元素
								currentElement = null;
								
								syntaxTags
									// 忽略 as 关键字
									.ignore(
										"as"
									)
									// 忽略 from 关键字
									.ignore(
										"from"
									);
								
								// 如果已经有正确的引入模块
								if(
									imported
								){
									// 返回
									return;
								}
								
								// 说明没有正确的引入模块，报错
								this.error(element, "不完整的import表达式。");
							},
							index
						);
					}
				);
		},
		parseMember : function(importElement, index){
			///	<summary>
			///	解析模块成员的方式。
			///	</summary>
			///	<param name="importElement" type="Element">import元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.once(
					"openingBrace",
					function(element, i, fragment, next, prevent){
						// 如果大括号与 import 元素之间的文本不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(importElement, element, true)
						){
							// 报错
							this.error(element, "import关键字与引用成员对象之间不应该存在其他字符。");
							return;
						}
						
						// 阻止其他监听器的执行
						prevent();
						
						// 触发 imported 事件，告知主监听已有引入模块
						this.dispatch("imported", importElement, index - 1, "");
						// 触发 member 事件
						this.dispatch("member", element, index, "");
						
						// 监听 as 关键字
						this.listen(
							"as",
							function(asElement, i, f, n){
								// 先执行其他监听器
								n();
								
								// 将 as 元素替换成冒号操作符
								element.replaceChild(
									SyntaxTree.createOperatorElement(":", ":"),
									asElement
								);
							},
							index
						);
						
						// 监听 appendMemberValue 事件
						this.listen(
							"appendMemberValue",
							function(e, i, f, n ,p){
								// 阻止其他监听器执行
								p();
							},
							index
						);
						
						// 监听关闭大括号
						this.once(
							"closingBrace",
							function(){
								// 触发 objectDestructuring 事件，采用解构赋值
								this.dispatch("objectDestructuring", element, index, fragment);
							},
							index
						);
						
						// 保护成员表达式
						protectMemberExpression(this, importElement, index);
					},
					index
				);
		},
		parseModuleName : function(importElement, index){
			///	<summary>
			///	解析模块名称的方式。
			///	</summary>
			///	<param name="importElement" type="Element">import元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.once(
					"string",
					function(element, i, fragment){
						// 如果模块名称与 import 元素之间的文本不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(importElement, element, true)
						){
							// 报错
							this.error(element, "import关键字与模块名称之间不应该存在其他字符。");
							return;
						}
						
						// 触发 imported 事件，告知主监听已有引入模块
						this.dispatch("imported", importElement, index, "");
						// 触发 dependency 事件，以模块添加依赖
						this.dispatch("dependency", element, index, fragment);
						
						// 重置 import 元素的文本内容
						importElement.textContent = ";Rexjs.Exports.dataOf(";
						// 添加小括号
						element.textContent += ")";
						
						// 监听 beforeEnding 事件
						this.once(
							"beforeEnding",
							function(e){
								switch(
									true
								){
									// 如果是逗号
									case e.tagName === "comma" :
										// 报错
										this.error(e, "此处的分隔符应该是分号，而不是逗号。");
										// 返回
										return;
									
									// 如果模块名称后面没有其他字符
									case ECMAScript6Parser.isEmptyBetween(element, element.parentNode) :
										// 返回
										return;
								}
								
								// 进入这里，说明模块名称后面还有其他字符，报错
								this.error(element, "模块名称后面应该紧跟分号，而不应该存在其他字符。");
							},
							index
						);
					},
					index
				);
		}
	});
	
	return ECMAScript6Import;
}(
	// IMPORT_REGEXP
	/\bimport\b/,
	// currentElement
	null,
	// protectMemberExpression
	function(syntaxTree, importElement, index){
		// 要使用 superIndex ，是因为当前还是处理大括号内，而 from 与分号都是与大括号同级的语句
		var hasFrom = false, superIndex = index - 1;
		
		// 监听 from 事件
		syntaxTree.once(
			"from",
			function(){
				hasFrom = true;
			},
			superIndex,
			superIndex
		);
		
		// 监听 semicolon 事件
		syntaxTree.once(
			"semicolon",
			function(){
				// 如果有 from 关键字
				if(
					hasFrom
				){
					return;
				}
				
				// 报错
				this.error(importElement, "import表达式缺少from子句。");
			},
			superIndex,
			superIndex
		);
	}
);

this.ECMAScript6From = function(ECMAScript6Import, FROM_REGEXP, reappend){
	function ECMAScript6From(syntaxTree){
		///	<summary>
		///	from 关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"from",
				FROM_REGEXP
			)
		);
		
		// 忽略 from 标签
		syntaxTree
			.syntaxTags
			.ignore(
				"from"
			);
	};
	ECMAScript6From = new Class(ECMAScript6From, ECMAScript6Parser);
	
	ECMAScript6From.props({
		parse : function(){
			///	<summary>
			///	解析 from 关键字。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"from",
					function(element, index){
						var hasString = false, importElement = ECMAScript6Import.currentElement;
						
						// 监听字符串，即模块名称
						this.once(
							"string",
							function(stringElement, i, f, n){
								// 如果字符串与 from 关键字不是兄弟元素，则说明中间有其他文本内容
								if(
									element.nextElementSibling !== stringElement
								){
									// 返回，不继续解析
									return;
								}
								
								var fragmentElement = SyntaxTree.createElement("fragment"); 
								
								// 提取 import 元素与模块名称之间的内容
								ECMAScript6Parser.extractNodesBetween(importElement, stringElement, fragmentElement);
								
								// 先执行其他监听器
								n();
								
								// 重置 import 元素文本内容
								importElement.textContent = "var";
								// 重置字符串元素文本内容
								element.textContent = "";
								
								// 如果为真，则说明添加成功，语法成立
								if(
									reappend(this, fragmentElement, element, stringElement)
								){
									// 记录，说明有模块名称
									hasString = true;
									return;
								}
								
								// 报错
								this.error(importElement, "缺少输出变量名。");
							},
							index
						);
						
						// 监听分号
						this.once(
							"semicolon",
							function(){
								// 如果有模块名称
								if(
									hasString
								){
									// 返回
									return;
								}
								
								// 报错
								this.error(importElement, "指定的模块名称应该是一个非模板形式的普通字符串。");
							},
							index
						);
					}
				);
		}
	});
	
	return ECMAScript6From;
}(
	this.ECMAScript6Import,
	// FROM_REGEXP
	/\bfrom\b/,
	// reappend
	function(syntaxTree, fragmentElement, fromElement, stringElement){
		var method = "defaultOf", firstElementChild = fragmentElement.firstElementChild;
		
		// 如果第一个元素存在
		if(
			firstElementChild
		){
			var tagName = firstElementChild.tagName;
			
			// 如果是大括号
			if(
				tagName === "brace"
			){
				// 判断 false
				switch(
					false
				){
					// 如果与 from 元素不是兄弟节点
					case firstElementChild.nextElementSibling === fromElement :
						// 返回 false
						return false;
					
					// 如果与 from 元素之间文本不为空
					case ECMAScript6Parser.isEmptyBetween(firstElementChild, fromElement, true) :
						// 返回 false
						return false;
				}
				
				method = "dataOf";
			}
			// 如果是操作符
			else if(
				tagName === "operator"
			){
				var asElement = firstElementChild.nextElementSibling;
				
				// 判断 false
				switch(
					false
				){
					// 如果不是 *
					case firstElementChild.getAttribute("value") === "*" :
						// 返回 false
						return false;
					
					// 如果操作符与 import 元素之间文本不为空
					case ECMAScript6Parser.isEmptyBetween(fragmentElement, firstElementChild, true) :
						// 返回 false
						return false;
				
					// 如果操作符与 as 元素之间文本不为空
					case ECMAScript6Parser.isEmptyBetween(firstElementChild, asElement, true) :
						// 返回 false
						return false;
				}
				
				method = "dataOf";
				// 清空操作符文本内容
				firstElementChild.textContent = "";
				// 清空 as 元素文本内容
				asElement.textContent = "";
			}
		}
		
		var textContent = fragmentElement.textContent;
		
		// 如果是空文本
		if(
			ECMAScript6Parser.isEmpty(textContent)
		){
			// 返回 false
			return false;
		}
		
		var parentNode = stringElement.parentNode;
		
		// 先移 string 元素
		parentNode.removeChild(stringElement);
		
		// 添加之前提取的片段代码文本
		syntaxTree.appendText(textContent);
		// 添加等于号，目的是让解构赋值能监听到该事件
		syntaxTree.appendElement("operator", "=", "operator", null, false, true);
		
		// 重置 string 元素文本内容
		stringElement.textContent = "Rexjs.Exports." + method + "(" + stringElement.textContent;
		
		// 重新添加到文档中
		parentNode.appendChild(stringElement);
		return true;
	}
);

this.ECMAScript6Export = function(EXPORT_REGEXP, getNamesOfDeclaration, getNameOfFunction){
	function ECMAScript6Export(syntaxTree){
		///	<summary>
		///	export 关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"export",
				EXPORT_REGEXP
			)
		);
	};
	ECMAScript6Export = new Class(ECMAScript6Export, ECMAScript6Parser);
	
	ECMAScript6Export.props({
		parse : function(){
			///	<summary>
			///	解析 export 关键字。
			///	</summary>
			var ecmaScript6Export = this;

			return this
				.syntaxTree
				.listen(
					"export",
					function(element, index, fragment){
						// 如果不在顶层（es6本身只支持export在顶层输出），而且也没有开启rex模式
						if(
							index !== 1 && !this.rexModeEnabled
						){
							// 报错
							this.error(element, "若要在非最外层作用域使用export表达式，请开启rex模式。");
							return;
						}
						
						var ids, exported = false, separatorElement = element;
						
						// 设置文本内容
						element.textContent = ';Rexjs.Exports.set("' + current.name + '", ';
						
						// 各种输出类型的解析
						ids = [
							ecmaScript6Export.parseDeclaration(element, index),
							ecmaScript6Export.parseMember(element, index + 1),
							ecmaScript6Export.parseOOP(element, index),
							ecmaScript6Export.parseFunction(element, index),
							ecmaScript6Export.parseVariables(element, index)
						];
						
						// 监听 exported 事件
						this.once(
							"exported",
							function(){
								// 设置为true，说明已经有输出内容
								exported = true;
								
								// 取消监听
								ids.forEach(this.unlisten, this);
							},
							index
						);
						
						// 监听 逗号
						this.once(
							"comma",
							function(commaElement){
								// 如果还没有输出
								if(
									!exported
								){
									return;
								}
								
								var declarationElement = element.nextElementSibling;
								
								// 如果存在申明
								if(
									declarationElement
								){
									// 确实是申明
									if(
										declarationElement.tagName === "declaration"
									){
										return;
									}
								}
								
								// 报错
								this.error(commaElement, "export语句应该是以分号结束，而不是逗号。");
							},
							index
						);
						
						// 监听分号
						this.once(
							"semicolon",
							function(semicolonElement){
								var parentNode = element.parentNode;
								
								// 如果已经有输出
								if(
									exported
								){
									// 插入结束的小括号至分号前面
									parentNode.insertBefore(
										SyntaxTree.createText(")"),
										semicolonElement	
									);
									
									return;
								}
								
								var name = ECMAScript6Parser.extractTextBetween(element, semicolonElement);
								
								// 如果没有输出，而且变量名为空
								if(
									ECMAScript6Parser.isEmpty(name)
								){
									// 报错
									this.error(element, "不应该做无效的输出。");
									return;
								}
								
								// 如果存在变量名，则移除分号
								parentNode.removeChild(semicolonElement);
								
								// 添加变量名文本
								parentNode.appendChild(
									SyntaxTree.createText(
										'"' + name.trim() + '", ' + name + ")" + semicolonElement.textContent
									)
								);
								
								// 触发 exported 事件，通知主解析已有输出
								this.dispatch("exported", element, index, "");
							},
							index
						);
					}
				);
		},
		parseDeclaration : function(exportElement, index){
			///	<summary>
			///	解析申明输出。
			///	</summary>
			///	<param name="exportElement" type="Element">export关键字元素。</param>
			///	<param name="index" type="Number">索引。</param>
			var ecmaScript6Export = this;
			
			return this
				.syntaxTree
				.once(
					"declaration",
					function(element){
						// 如果与 export 关键字之间不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(exportElement, element, true)
						){
							// 报错
							this.error(element, "无法输出的申明表达式。");
							// 返回
							return;
						}
						
						var parentNode = element.parentNode;
						
						// 触发 exported 事件，通知主解析已有输出
						this.dispatch("exported", exportElement, index, "");
						
						// 监听分号
						this.once(
							"semicolon",
							function(e){
								var fragment = ECMAScript6Parser.extractNodesBetween(exportElement, e), names = getNamesOfDeclaration(fragment);
								
								// 把申明插入到 export 关键字前面
								parentNode.insertBefore(fragment, exportElement);
								// 先移除分号
								parentNode.removeChild(e);
								
								// 解析成员，因为下面会利用到解析成员的原理
								ecmaScript6Export.parseMember(exportElement, index + 1);
								
								// 设置片段文本为空字符串
								this.setFragment("");
								// 添加起始大括号
								this.appendOpening("brace", "{", "openingBrace");
								
								// 遍历变量名
								names.forEach(
									function(name, i){
										// 如果 i 大于 0
										if(
											i > 0
										){
											// 添加逗号分隔符
											this.appendElement("comma", ",", "comma", null, true);
										}
										
										// 添加变量名
										this.appendText(name);
									},
									this
								);
								
								// 添加结束大括号
								this.appendClosing("brace", "}", "closingBrace");
								// 将分号添加回来
								parentNode.appendChild(e);
							},
							index
						);
					},
					index
				);
		},
		parseFunction : function(exportElement, index){
			///	<summary>
			///	解析函数输出。
			///	</summary>
			///	<param name="exportElement" type="Element">export关键字元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.once(
					"function",
					function(element){
						// 如果与 function 关键字之间不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(exportElement, element, true)
						){
							// 报错
							this.error(element, "无法输出的函数表达式。");
							// 返回
							return;
						}
						
						// 触发 exported 事件，通知主解析已有输出
						this.dispatch("exported", exportElement, index, "");
						
						// 监听分号
						this.once(
							"semicolon",
							function(e){
								// 获取函数名
								var name = getNameOfFunction(element);
								
								// 如果是匿名函数
								if(
									ECMAScript6Parser.isEmpty(name)
								){
									// 报错
									this.error(element, "不应该输出匿名函数。");
									return;
								}
								
								var parentNode = exportElement.parentNode;
								
								// 把函数申明插入到 export 关键字之前
								parentNode.insertBefore(
									ECMAScript6Parser.extractNodesBetween(
										exportElement,
										e
									),
									exportElement
								);
								
								// 添加函数名
								parentNode.insertBefore(
									SyntaxTree.createText('"' + name + '", ' + name),
									e
								);
							},
							index
						);
					},
					index
				);
		},
		parseMember : function(exportElement, index){
			///	<summary>
			///	解析成员输出。
			///	</summary>
			///	<param name="exportElement" type="Element">export关键字元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.once(
					"openingBrace",
					function(element, i, fragment, next, prevent){
						// 如果与 export 关键字之间不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(exportElement, element, true)
						){
							// 报错
							this.error(element, "无法输出的成员子句。");
							return;
						}
						
						// 阻止其他监听器执行
						prevent();
						
						// 触发 exported 事件，通知主解析已有输出
						this.dispatch("exported", exportElement, index - 1, "");
						// 触发 member 事件
						this.dispatch("member", element, index, "");
						
						// 监听结束大括号
						this.once(
							"closingBrace",
							function(e){
								// 设置 start 元素文本内容
								ECMAScript6Parser
									.getStartElement(
										e
									)
									.textContent = "new Rexjs.NamedProperties({";
								
								// 设置 end 元素文本内容
								ECMAScript6Parser
									.getEndElement(
										e
									)
									.textContent = "})";
							},
							i
						);
					},
					index
				);
		},
		parseOOP : function(exportElement, index){
			///	<summary>
			///	解析面向对象输出。
			///	</summary>
			///	<param name="exportElement" type="Element">export关键字元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.once(
					"oop",
					function(element){
						// 如果与 export 关键字之间不是空的
						if(
							!ECMAScript6Parser.isEmptyBetween(exportElement, element, true)
						){
							// 报错
							this.error(element, "无法输出的面向对象表达式。");
							return;
						}
						
						var parentNode = element.parentNode;
						
						// 触发 exported 事件，通知主解析已有输出
						this.dispatch("exported", exportElement, index, "");
						
						// 监听分号
						this.once(
							"semicolon",
							function(e){
								var name, declarationElement = exportElement.nextElementSibling;
								
								// 获取名称
								name = ECMAScript6Parser.getTextBetween(
										declarationElement,
										ECMAScript6Parser.querySpecialSelector(
											declarationElement,
											'+operator[value="="]'
										)
									)
									.trim();
								
								// 将面向对象申明插入到 export 关键字前面
								parentNode.insertBefore(
									ECMAScript6Parser.extractNodesBetween(
										exportElement,
										e
									),
									exportElement
								);
								
								// 插入变量名
								parentNode.insertBefore(
									SyntaxTree.createText('"' + name + '", ' + name),
									e
								);
							},
							index
						);
					},
					index
				);
		},
		parseVariables: function(exportElement, index){
			///	<summary>
			///	解析多个变量名输出。
			///	</summary>
			///	<param name="exportElement" type="Element">export关键字元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.once(
					"comma",
					function(element){
						var fragment = ECMAScript6Parser.extractNodesBetween(exportElement, element);
						
						// 先移除此逗号
						element
							.parentNode
							.removeChild(
								element
							);
						
						// 设置片段文本为空
						this.setFragment("");
						// 添加大括号
						this.appendOpening("brace", "{", "openingBrace");
						
						// 忽略 as 关键字
						this.syntaxTags
							.ignore(
								"as"
							);
						
						// 添加之前提取的节点片段
						this.appendChild(fragment);
						// 将此逗号添加回文档，并触发 comma 事件
						this.appendChild(element, "comma", element, true);
						
						// 监听 beforeEnding
						this.listen(
							"beforeEnding",
							function(endingElement){
								// 如果结束元素不是分号
								if(
									endingElement.tagName !== "semicolon"
								){
									return;
								}
								
								// 添加结束大括号
								this.appendClosing("brace", "}", "closingBrace");
							},
							index + 1
						);
					},
					index
				);
		}
	});
	
	return ECMAScript6Export;
}(
	// EXPORT_REGEXP
	/\bexport\b/,
	// getNamesOfDeclaration
	function(fragment){
		var elements, names = [], lastElement = fragment.firstElementChild;
		
		// 转为数组
		elements = toArray(
			ECMAScript6Parser.querySpecialSelectorAll(lastElement, "~comma")
		);
		
		// 添加节点片段
		elements.push(fragment);
		
		// 遍历
		elements.forEach(function(commaElement){
			// 添加名称
			names.push(
				// 获取名称
				ECMAScript6Parser.getTextBetween(
					lastElement,
					// 查询等号
					ECMAScript6Parser.querySpecialSelector(
						lastElement,
						'+operator[value="="]'
					) ||
					// 否则使用逗号
					commaElement
				)
				// 去除空白
				.trim()
			);
			
			// 记录上一个分隔元素
			lastElement = commaElement;
		});
		
		// 返回名称
		return names;
	},
	// getNameOfFunction
	function(functionElement){
		var parenthesisElement = functionElement.nextElementSibling;
		
		// 判断true			
		switch(
			true
		){
			// 如果没有小括号，则break
			case parenthesisElement === null :
				break;
			
			// 如果小括号确认失败，则break
			case parenthesisElement.tagName !== "parenthesis" :
				break;
			
			// 默认
			default :
				// 返回已获取的函数名
				return ECMAScript6Parser
					.getTextBetween(
						functionElement,
						parenthesisElement
					)
					// 去除空白
					.trim();
		}
		
		// 返回空字符串
		return "";
	}
);

this.ECMAScript6Default = function(KeywordTag, DEFAULT_REGEXP, protect){
	function ECMAScript6Default(syntaxTree){
		///	<summary>
		///	default 关键字解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"default",
				DEFAULT_REGEXP
			)
		);
	};
	ECMAScript6Default = new Class(ECMAScript6Default, ECMAScript6Parser);
	
	ECMAScript6Default.props({
		parse : function(){
			///	<summary>
			///	解析 default 关键字。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"default",
					function(element, index, fragment){
						var exportElement = element.previousElementSibling;
						
						// 判断 true
						switch(
							true
						){
							// 如果片段文本不是空的，则返回
							case !ECMAScript6Parser.isEmpty(fragment) :
								return;
							
							// 如果 export 关键字不存在，则返回
							case exportElement === null :
								return;
							
							// 如果 export 关键字确认失败，则返回
							case exportElement.tagName !== "export" :
								return;
						}
						
						// 移除该 default 关键字
						element
							.parentNode
							.removeChild(
								element
							);
						
						// 重新设置 export 元素的文本内容
						exportElement.textContent = ';Rexjs.Exports.setDefault("' + current.name + '", ';
						
						// 保护，监听不能与 default 搭配的输出类型
						protect(
							this,
							index,
							function(){
								// 报错
								this.error(element, "不应该输出不明确的默认值。");
							}
						);
					}
				);
		}
	});
	
	return ECMAScript6Default;
}(
	this.KeywordTag,
	// DEFAULT_REGEXP
	/\bdefault\b/,
	// protect
	function(syntaxTree, index, callback){
		var oid, did;
		
		// 监听大括号
		oid = syntaxTree.once("openingBrace", callback, index + 1);
		// 监听申明
		did = syntaxTree.once("declaration", callback, index);
		
		// 监听 exported 事件，就算
		syntaxTree.once(
			"exported",
			function(){
				// 取消大括号的监听
				this.unlisten(oid);
				// 取消申明的监听
				this.unlisten(did);
			},
			index
		);
	}
);

this.ECMAScript6Module = function(MODULE_REGEXP){
	function ECMAScript6Module(syntaxTree){
		///	<summary>
		///	module 表达式解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new ExpressionTag(
				"module",
				MODULE_REGEXP
			)
		);
	};
	ECMAScript6Module = new Class(ECMAScript6Module, ECMAScript6Parser);
	
	ECMAScript6Module.props({
		parse : function(){
			///	<summary>
			///	解析 module 表达式。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"module",
					function(element){
						// 移除该元素
						element
							.parentNode
							.removeChild(
								element
							);
						
						// 添加 import 元素，并设置文本，继触发事件
						this.appendElement("import", "import", "import");
						// 添加 operator 元素，并设置文本，继触发事件
						this.appendElement("operator", "*", "operator", null, false, true);
						// 添加 as 元素，并设置文本，继触发事件
						this.appendElement("as", "as", "as");
					}	
				);
		}
	});
	
	return ECMAScript6Module;
}(
	// MODULE_REGEXP
	/\bmodule\b/
);

this.ModulePackage = function(Package, contents){
	function ModulePackage(syntaxTree){
		///	<summary>
		///	模块解析器包。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ModulePackage = new Class(ModulePackage, Package);
	
	ModulePackage
		.package
		.apply(
			ModulePackage,
			contents
		);
	
	return ModulePackage;
}(
	this.Package,
	// contents
	[
		this.ECMAScript6From,
		this.ECMAScript6Import,
		this.ECMAScript6Export,
		this.ECMAScript6Default,
		this.ECMAScript6Module
	]
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.DeclarationTag,
	this.ExpressionTag,
	this.NamedItem,
	this.NamedItemMap,
	// URL_REGEXP
	/^([A-Za-z][A-Za-z0-9]*?:)\/*(?:([^\/#?:]+?)(?:\:([0-9]+))?(\/.*?)?)?(?:(\?.*?)?(#.*)?)?$/,
	// SPACE_REGEXP
	/[^\S ]*/g,
	// current
	null,
	Rexjs.toArray,
	encodeURI,
	decodeURI
));


// for of相关解析器
(function(ECMAScript6Parser, SyntaxTree, OperatorTag){

this.ForOfIterator = function(){
	function ForOfIterator(value){
		///	<summary>
		///	for of迭代器。
		///	</summary>
		///	<param name="value" type="*">迭代对象。</param>
		var names = [];
		
		this.assign({
			names : names,
			value : value
		});
		
		for(
			var name in value
		){
			names.push(name);
		}
	};
	ForOfIterator = new Class(ForOfIterator);
	
	ForOfIterator.props({
		get current(){
			///	<summary>
			///	获取当前index所对应名称的对象值。
			///	</summary>
			return this.value[
				this.names[this.index]
			];
		},
		index : 0,
		names : null,
		next : function(){
			///	<summary>
			///	进行到下一个，如果已经超出作用域返回false，否则返回true。
			///	</summary>
			return this.index++ < this.names.length;
		},
		value : null
	});
	
	return ForOfIterator;
}();

this.ECMAScript6ForOf = function(ForOfIterator, OF_REGEXP, id, withoutConditionElement){
	function ECMAScript6ForOf(syntaxTree){
		///	<summary>
		///	for of解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new OperatorTag(
				"of",
				OF_REGEXP
			)
		);
	};
	ECMAScript6ForOf = new Class(ECMAScript6ForOf, ECMAScript6Parser);
	
	ECMAScript6ForOf.props({
		parse : function(){
			///	<summary>
			///	解析for of。
			///	</summary>
			var ecmaScript6ForOf = this;

			return this
				.syntaxTree
				.listen(
					"of",
					function(element, index){
						// 如果条件元素不存在
						if(
							withoutConditionElement(element.parentNode)
						){
							// 抛出错误
							this.error(element, "of语句必须与for循环一起使用");
							return;
						}
						
						// 解析条件
						ecmaScript6ForOf.parseCondition(element, index);
					}	
				);
		},
		parseCondition : function(ofElement, index){
			///	<summary>
			///	解析for of条件。
			///	</summary>
			///	<param name="ofElement" type="Element">of元素。</param>
			///	<param name="index" type="Number">索引。</param>
			return this
				.syntaxTree
				.once(
					"closingParenthesisWithBrace",
					function(element){
						var variable, $of = "$rex_of_" + id++;

						// 获取用户定义的变量名
						variable = ECMAScript6Parser.extractNodesBetween(
							ECMAScript6Parser.querySpecialSelector(element, ">declaration") || ECMAScript6Parser.getStartElement(element),
							ofElement
						)
						.textContent;
						
						// 重置文本内容
						element.textContent = "(" +
							// 定义变量
							"var " + $of + " = new Rexjs.ForOfIterator(" +
									// 获取需要遍历的对象相关文本
									ECMAScript6Parser.extractNodesBetween(
										ofElement,
										ECMAScript6Parser.getEndElement(element)
									)
									.textContent +
								"), " +
								variable + " = " + $of + ".current;" +
							// 下一个
							$of + ".next();" +
							// 获取当前值
							variable + " = " + $of + ".current)";
					},
					index
				);
		}
	});
	
	return ECMAScript6ForOf;
}(
	this.ForOfIterator,
	// OF_REGEXP
	/\bof\b/,
	// id
	0,
	// withoutConditionElement
	function(parenthesisElement){
		// 如果parenthesisElement不是小括号
		if(
			parenthesisElement.tagName !== "parenthesis"
		){
			return true;
		}
		
		var elementSibling = parenthesisElement.previousElementSibling;
		
		switch(
			true
		){
			// 如果兄弟元素不存在
			case elementSibling === null :
				break;
			
			// 如果兄弟元素不是条件元素
			case elementSibling.tagName !== "condition" :
				break;
			
			// 如果文本内容最后三字节不等于for
			case elementSibling.textContent !== "for" :
				break;
			
			// 默认，返回elementSibling
			default :
				return false;
		}
		
		return true;
	}
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.OperatorTag
));


// 模板相关
(function(ECMAScript6Parser, SyntaxTree, SyntaxTag, Array, plain){

this.ECMAScript6Template = function(OpeningTag, BACKTICK_REGEXP, $OPENING_BRACE_REGEXP, toArray, withBackslash, protectFragmentBetween){
	function ECMAScript6Template(syntaxTree){
		///	<summary>
		///	模板解析器。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree
			.add(
				new SyntaxTag(
					"backtick",
					BACKTICK_REGEXP
				)
			)
			.add(
				new OpeningTag(
					"brace",
					$OPENING_BRACE_REGEXP,
					"$openingBrace"
				)
			);
	};
	ECMAScript6Template = new Class(ECMAScript6Template, ECMAScript6Parser);
	
	ECMAScript6Template.static({
		render : function(substrings, _rest){
			///	<summary>
			///	渲染模板。
			///	</summary>
			///	<param name="substrings" type="Array">模板字符串集合。</param>
			var arr = [];
	
			substrings.forEach(
				function(substr, i){
					if(
						i > 0
					){
						arr.push(this[i]);
					}
					
					arr.push(substr);
				},
				arguments
			);
	
			return arr.join("");
		}
	});
	
	ECMAScript6Template.props({
		parse : function(){
			///	<summary>
			///	开始解析模板。
			///	</summary>
			var ecmaScript6Template = this;
			
			// 监听起始符号
			return this
				.syntaxTree
				.listen(
					"backtick",
					function(element, index, fragment){
						var id, pid, parameters = [], withOperator = ECMAScript6Parser.withOperator(element, fragment);
						
						// 纯文本语法树
						plain(this);
						
						// 重置元素的文本内容
						element.textContent = (withOperator ? "(Rexjs.ECMAScript6Template.render" : "") + '(["';
						// 监听参数
						pid = ecmaScript6Template.parseParameters(parameters, index + 1);
						
						// 监听结束符号
						id = this.listen(
							"backtick",
							function(el, index, fragment){
								// 如果与反斜杠转义符在一起
								if(
									withBackslash(el, this, index, fragment, false)
								){
									// 返回，当做普通字符串
									return;
								}
								
								// 取消结束符号的监听
								this.unlisten(id);
								// 取消参数的监听
								this.unlisten(pid);
								
								// 重置文本内容
								el.textContent = '"]' +
									// 添加参数
									(
										parameters.length > 0 ? "," + parameters.join(",") : ""
									) +
									")" +
									(
										withOperator ? ")" : ""
									) + 
									// 给中间的片段文本内容加保护，并返回被处理掉的换行
									protectFragmentBetween(
										el,
										el.previousElementSibling
									);
							},
							index
						);
					}
				);
		},
		parseParameters : function(parameters, index){
			///	<summary>
			///	解析模板参数。
			///	</summary>
			///	<param name="index" type="Number">依赖的语法树。</param>
			return this
				.syntaxTree
				.listen(
					"$openingBrace",
					function(element, index, fragment){
						// 如果与反斜杠转义符在一起
						if(
							withBackslash(element, this, index, fragment, true)
						){
							// 返回，当做普通字符串
							return;
						}
						
						// 监听换行，阻止ECMAScript6ASI
						this.listen(
							"wrap",
							function(e, i, f, n, p){
								// 阻止其他监听器执行
								p();
							},
							index
						);
						
						// 监听结束大括号
						this.once(
							"closingBrace",
							function(){
								var textContent = element.textContent;
								
								// 纯文本模式
								plain(this);
								
								// 添加参数
								parameters.push(
									// 给中间的片段文本内容加保护，并返回被处理掉的换行
									protectFragmentBetween(
										element,
										element.previousElementSibling
									) +
									// 截取大括号中间的文本内容
									textContent.substring(
										ECMAScript6Parser.getStartElement(element).textContent.length,
										textContent.length - ECMAScript6Parser.getEndElement(element).textContent.length
									)
								);
								
								element.textContent = '", "';
							},
							index
						)
					},
					index
				);
		}
	});
	
	return ECMAScript6Template;
}(
	this.OpeningTag,
	// BACKTICK_REGEXP
	/`/,
	// $OPENING_BRACE_REGEXP
	/\$\{/,
	Rexjs.toArray,
	// withBackslash
	function(element, syntaxTree, index, fragment, isBrace){
		// 当片段字符串的最后一个字节是反斜杠
		if(
			fragment[fragment.length - 1] === "\\"
		){
			// 纯文本模式
			plain(syntaxTree);
			
			// 如果是大括号
			if(
				isBrace
			){
				// 添加关闭标签
				syntaxTree.appendClosing("brace", "");
			}
			
			// 将元素替换为普通文本
			element
				.parentNode
				.replaceChild(
					SyntaxTree.createText(element.textContent),
					element
				);

			return true;
		}
		
		return false;
	},
	// protectFragmentBetween
	function(element, previousElement){
		// 如果上一个元素不存在
		if(
			previousElement === null
		){
			// 返回
			return;
		}
		
		// 获取每一行内容数组
		var lines = ECMAScript6Parser
			.extractNodesBetween(
				previousElement,
				element
			)
			.textContent
			.split(
				"\n"
			);

		element
			.parentNode
			.insertBefore(
				// 创建替换文本：转义换行、转义双引号、加上结束文本、加上已转义的换行符
				SyntaxTree.createText(
					lines.join("\\n").split("\r").join("\\r").split('"').join('\\"')
				),
				element
			);
		
		// 返回被转义的换行符字符串
		return new Array(lines.length).join("\n");
	}
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.SyntaxTree,
	this.SyntaxTag,
	Array,
	// plain
	function(backtickCondition, $openingBraceCondition){
		return function(syntaxTree){
			// 开启纯文本模式
			syntaxTree.plainText.enable(backtickCondition, $openingBraceCondition);
		}
	}(
		new this.Condition("backtick"),
		new this.Condition("$openingBrace")
	)
));

// 其他单功能解析器
(function(ECMAScript6Parser, ECMAScript6Object, SyntaxTree, SyntaxTag, TextTag, ExpressionTag, DeclarationTag){

this.ECMAScript6Number = function(NUMBER_REGEXP, PARSER_INT){
	function ECMAScript6Number(syntaxTree){
		///	<summary>
		///	数字解析，主要是二进制和八进制。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new SyntaxTag(
				"number",
				NUMBER_REGEXP
			)	
		);
	};
	ECMAScript6Number = new Class(ECMAScript6Number, ECMAScript6Parser);
	
	ECMAScript6Number.props({
		parse : function(){
			///	<summary>
			///	解析数字。
			///	</summary>
			return this
				.syntaxTree
				.listen(
					"number",
					function(element){
						var textContent = element.textContent;
						
						// 用parseInt方法，重新设置文本
						element.textContent = "(" + PARSER_INT + '("' +
							textContent.substring(2) + '", ' +
							(
								textContent.substring(1, 2).toLowerCase() === "b" ? "2" : "8"
							) +
							"))";
					}
				);
		}
	});
	
	return ECMAScript6Number;
}(
	// NUMBER_REGEXP
	/(?:0[Bb][01]+|0[Oo][0-7]+)\b/,
	// PARSER_INT
	Number.parseInt ? "Number.parseInt" : "parseInt"
);

this.ECMAScript6ASI = function(WRAP_REGEXP, checkContext, initSemicolon){
	function ECMAScript6ASI(syntaxTree){
		///	<summary>
		///	自动分号插入机制。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
		syntaxTree.add(
			new TextTag(
				"wrap",
				WRAP_REGEXP
			)
		);
	};
	ECMAScript6ASI = new Class(ECMAScript6ASI, ECMAScript6Parser);
	
	ECMAScript6ASI.props({
		parse : function(){
			///	<summary>
			///	解析换行符，在必要的时候插入分号。
			///	</summary>

			// 监听换行符
			return this
				.syntaxTree
				.listen(
					"wrap",
					function(textNode, index, fragment){
						switch(
							true
						){
							// 如果与运算符在一起
							case ECMAScript6Parser.withOperator(textNode, fragment) :
								return;
							
							// 核对上下文，如果中有能力提供连接上下文性质的元素
							case checkContext(textNode, this, fragment) :
								return;
						}
						
						// 移除该文本
						textNode
							.parentNode
							.removeChild(
								textNode
							);
						
						// 添加分号
						this.appendChild(
							initSemicolon(textNode),
							"semicolon",
							null,
							true
						);
					}
				);
		}
	});
	
	return ECMAScript6ASI;
}(
	// WRAP_REGEXP
	/(?:\s*\n\s*(?:(?=\+\+|--)|(?![\s;+\-/*|&!~`^%?:=,.<>()\[\]])))|\s*(?=\}|$)/,
	// checkContext
	function(textNode, syntaxTree, fragment){
		var sibling = ECMAScript6Parser.getPreviousElementSibling(textNode);
		
		// 如果兄弟元素不存在，则说明该换行所处作用域目前没有语句
		if(
			sibling === null
		){
			// 如果fragment为空，则说明，之前没有语句
			return ECMAScript6Parser.isEmpty(fragment);
		}
		
		var tagName = sibling.tagName, syntaxTag = syntaxTree.syntaxTags[tagName];
		
		switch(
			true
		){
			// 如果是表达式
			case syntaxTag instanceof ExpressionTag :
				return true;
			
			// 如果片段问题不为空，说明中间还有其他文本
			case !ECMAScript6Parser.isEmpty(fragment) :
				return false;

			// 如果是申明
			case syntaxTag instanceof DeclarationTag :
				return true;
			
			// 如果之间没有其他文本，而且兄弟元素属于以下三种：大中小括号内的第一个空文本换行、分号、双符号（++、--、**）
			case ["start", "semicolon", "double"].indexOf(tagName) > -1 :
				return true;
			
			// 如果上一个兄弟元素不是小括号
			case tagName !== "parenthesis" :
				return false;
		}
		
		// 尝试获取条件（if、for、while）元素
		var condition = sibling.previousElementSibling;
		
		// 如果条件元素存在，返回true，否则返回false
		return condition ? condition.tagName === "condition" : false;
	},
	// initSemicolon
	function(textNode){
		// 创建分号
		var semicolonElement = SyntaxTree.createElement("semicolon");
		
		// 设置文本
		semicolonElement.textContent = ";" + textNode.textContent;
		
		// 设置asi属性
		semicolonElement.setAttribute("asi", "");
			
		return semicolonElement;
	}
);

}.call(
	this,
	this.ECMAScript6Parser,
	this.ECMAScript6Object,
	this.SyntaxTree,
	this.SyntaxTag,
	this.TextTag,
	this.ExpressionTag,
	this.DeclarationTag
));


// ECMAScript各版本相关包
(function(){
	
this.ECMAScript6 = function(Package, contents){
	function ECMAScript6(syntaxTree){
		///	<summary>
		///	ES6所支持的解析器包。
		///	</summary>
		///	<param name="syntaxTree" type="SyntaxTree">依赖的语法树。</param>
	};
	ECMAScript6 = new Class(ECMAScript6, Package);
	
	ECMAScript6
		.package
		.apply(
			ECMAScript6,
			contents
		);
	
	return ECMAScript6;
}(
	this.Package,
	// contents
	[
		this.BasicPackage,
		this.ObjectPackage,
		this.FunctionPackage,
		this.OOPPackage,
		this.ModulePackage,
		this.ECMAScript6Member,
		this.ECMAScript6Array,
		this.ECMAScript6ArrayDestructuring,
		this.ECMAScript6Declaration,
		this.ECMAScript6Number,
		this.ECMAScript6ForOf,
		this.ECMAScript6Template,
		this.ECMAScript6ASI
	]
);

}.call(
	this
));


// 初始化模块
(function(){

this.Launcher = function(Module, ECMAScript6, document, id, toArray){
	function Launcher(){
		///	<summary>
		///	模块启动器。
		///	</summary>
		
		// 监听 DOMContentLoaded 事件
		document.addEventListener(
			"DOMContentLoaded",
			function(){
				// 转为数组
				toArray(
					this.querySelectorAll('script[type="module"]')
				)
				.forEach(function(script){
					var src = script.src;
					
					// 如果存在src
					if(
						src.length > 0
					){
						// 初始化模块
						new Module(src, ECMAScript6, true);
						return;
					}
					
					// 初始化模块
					new Module(
						// 如果指定了名称，则使用指定名称，否则由系统生成
						script.getAttribute("data-name") || ("inline_script_" + id++),
						ECMAScript6,
						true,
						script.textContent
					);
				});
			}
		);
	};
	Launcher = new StaticClass(Launcher);
	
	return Launcher;
}(
	this.Module,
	this.ECMAScript6,
	document,
	// id
	0,
	Rexjs.toArray
);

}.call(
	this
));

defineProperties(Rexjs, this);
}(
	Rexjs.Class,
	Rexjs.StaticClass,
	Rexjs.Interface,
	Rexjs.Enum,
	Rexjs.defineProperties
);