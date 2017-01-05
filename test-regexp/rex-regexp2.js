void function(Rexjs){

this.RegExpItem = function(List){
	function RegExpItem(){
		List.call(this);
		
		this.map = this;
	};
	RegExpItem = new Rexjs(RegExpItem, List);
	
	RegExpItem.props({
		caches: 0,
		charCode: -1,
		compare: function(charCode){
			return this.charCode === charCode;
		},
		endable: false,
		isRoot: function(){
			return this.caches > 0;
		},
		map: null,
		max: 1,
		min: 1
	});
	
	return RegExpItem; 
}(
	this.List
);

this.RegExpGroupItem = function(RegExpItem){
	function RegExpGroupItem(){
		RegExpItem.call(this);
	};
	RegExpGroupItem = new Rexjs(RegExpGroupItem, RegExpItem);
	
	return RegExpGroupItem;
}(
	this.RegExpItem
);

this.RegExpRangeItem = function(RegExpItem){
	function RegExpRangeItem(){
		RegExpItem.call(this);
	};
	RegExpRangeItem = new Rexjs(RegExpRangeItem, RegExpItem);
	
	RegExpRangeItem.props({
		get charCode(){
			return this.start;
		},
		compare: function(charCode){
			return charCode >= this.startCharCode && charCode <= this.endCharCode;
		},
		endCharCode: -1,
		startCharCode: -1
	});
	
	return RegExpRangeItem;
}(
	this.RegExpItem
);

this.RegExpDotItem = function(RegExpRangeItem){
	function RegExpDotItem(){
		RegExpRangeItem.call(this);
	};
	RegExpDotItem = new Rexjs(RegExpDotItem, RegExpRangeItem);
	
	RegExpDotItem.props({
		get charCode(){
			return this.start;
		},
		compare: function(charCode){
			switch(
				charCode
			){
				// \n
				case 10:
				// \r
				case 13:
				// \u2028
				case 8232:
				// \u2029
				case 8233:
					return false;
				
				default:
					return true;
			}
		},
		endCharCode: Infinity,
		startCharCode: 0
	});
	
	return RegExpDotItem;
}(
	this.RegExpRangeItem
);

this.RegExpTree = function(RegExpItem){
	function RegExpTree(){
		RegExpItem.call(this);
	};
	RegExpTree = new Rexjs(RegExpTree, RegExpItem);
	
	RegExpTree.props({
		caches: 1,
		compare: function(){
			return false;
		},
		get endable(){
			return false;
		}
	});
	
	return RegExpTree;
}(
	this.RegExpItem
);

this.RegExpStacks = function(RegExpIndexs){
	function RegExpStacks(){};
	RegExpStacks = new Rexjs(RegExpStacks);
	
	RegExpStacks.props({
		add: function(item){
			this[this.length] = item;
			this.length++;
		},
		clearAfter: function(item, _includeSelf){
			var i = this.length - 1;
			
			do {
				var it = this[i];
				
				if(
					it === item
				){
					if(
						_includeSelf
					){
						delete this[i];
						i--;
					}
					
					break;
				}
				
				delete this[i];
				i--;
			}
			while(
				i > -1
			);
			
			this.length = i + 1;
		},
		end: function(){
			// 逆序设置 endable
			for(
				var i = this.length - 1;i > -1;i--
			){
				var item = this[i];
				
				item.endable = true;
				
				if(
					item.min === 0
				){
					continue;
				}
				
				break;
			}
		},
		get item(){
			return this[this.length - 1] || null;
		},
		length: 0,
		get root(){
			for(
				var i = this.length - 1;i > -1;i--
			){
				var item = this[i];
				
				if(
					item.isRoot()
				){
					return item;
				}
			}
			
			return null;
		}
	});
	
	return RegExpStacks;
}(
	this.RegExpIndexs
);

this.RegExp = function(RegExpItem, RegExpGroupItem, RegExpDotItem, RegExpTree, RegExpStacks, throwError, setRange, getSubItemOf){
	function RegExp(regexp){console.log(regexp)
		var item, stacks = new RegExpStacks(), cacheStacks = new RegExpStacks(), source = typeof regexp === "string" ? regexp : regexp.source || "";
		
		stacks.add(
			this.tree = new RegExpTree()
		);
		
		this.source = source;
		
		for(
			var i = 0, length = source.length;i < length;i++
		){
			var char = source[i];
			
			switch(
				char
			){
				case ".":
					item = new RegExpDotItem();
				
					stacks.item.push(item);
					stacks.add(item);
					break;
				
				case "\\":
					continue;

				case "(":
					stacks.item.caches++;
					
					cacheStacks.add(
						new RegExpGroupItem()
					);
					continue;
					
				case ")": {
					item = cacheStacks.item, root = stacks.root;
					
					stacks.item.map = item;
					root.caches--;
					
					cacheStacks.clearAfter(item, true);
					
					stacks.clearAfter(root);
					stacks.add(item);
					break;
				}
					
				case "[":
					continue;
					
				case "]":
					continue;
					
				case "|":
					if(
						!stacks.item.isRoot()
					){
						if(
							stacks.root instanceof RegExpTree
						){
							stacks.end();
						}
						else {
							stacks.item.map = cacheStacks.item;
						}
						
						stacks.clearAfter(stacks.root);
					}
					
					continue;
					
				case "^":
					continue;
					
				case "$":
					continue;
					
				case "*":
				case "?":
				case "+":
					throwError(source, "Nothing to repeat");
					return;
					
				default: {
					var charCode = char.charCodeAt(0);
					
					item = getSubItemOf(stacks.item, charCode, getSubItemOf);
					
					if(
						item === null
					){
						item = new RegExpItem();
						item.charCode = charCode;
						
						stacks.item.push(item);
					}
					
					stacks.add(item);
					break;
				}
			}
			
			i += setRange(item, source, i);
		}
		
		stacks.end();
		
		console.log(this.tree)
		window.xx = this;
	};
	RegExp = new Rexjs(RegExp);
	
	RegExp.props({
		exec: function(input){
			var index = -1, i = 0, length = input.length, item = this.tree;

			while(
				i < length
			){
				var it = getSubItemOf(item, input.charCodeAt(i), getSubItemOf);
				
				if(
					it
				){
					if(
						index === -1
					){
						index = i;
					}
					
					item = it;
				}
				else {
					if(
						index > -1
					){
						return null;
					}
				}
				
				i++;
			}
			
			if(
				item.endable
			){
				var result = [input.substring(index, i)];
				
				result.index = index;
				result.input = input;
				return result;
			}
			
			return null;
		},
		flags: "",
		lastIndex: 0,
		source: ""
	});
	
	return RegExp;
}(
	this.RegExpItem,
	this.RegExpGroupItem,
	this.RegExpDotItem,
	this.RegExpTree,
	this.RegExpStacks,
	// throwError
	function(source, error){
		throw "SyntaxError: Invalid regular expression: /" + source + "/: " + error;
	},
	// setRange
	function(item, source, index){
		var length = 0;
		
		index++;
		
		switch(
			source[index]
		){
			// 如果是 "*"
			case "*":
				item.min = 0;
				item.max = Infinity;
				length = 1;
				break;
			
			// 如果是 "+"
			case "+":
				item.max = Infinity;
				length = 1;
				break;
			
			// 如果是 "?"
			case "?":
				item.min = 0;
				length = 1;
				break;
			
			// 如果是 "{"
			case "{": {
				var min = 1, maxIndex = index = index + 1;
				
				// 依次检测后续字符
				loop:
				for(
					var i = index, j = source.length;i < j;i++
				){
					// 获取字符
					var charCode = source.charCodeAt(i);
					
					// 如果是数字，则继续循环
					if(
						charCode > 47 && charCode < 58
					){
						continue;
					}

					// 如果成立，则说明起始大括号后面没有有效的数字，不能构成一个区域范围
					if(
						i === index
					){
						return length;
					}
					
					// 继续判断字符
					switch(
						charCode
					){
						// 如果是 ","
						case 44:
							// 如果成立，则说明最小值已经被设置，既是多余的字符
							if(
								maxIndex > index
							){
								return length;
							}
							
							// 设置 max 的起始索引
							maxIndex = i + 1;
							// 设置 min
							min = source.substring(index, i) - 0;
							continue;
						
						// 如果是 "}"
						case 125:
							// 如果 max 的起始索引等于 index，则说明，该大括号内就 1 组数字
							if(
								maxIndex === index
							){
								// 设置最大值和最小值
								item.max = min = source.substring(maxIndex, i) - 0;
							}
							else {
								// 设置最大值
								item.max = source.substring(maxIndex, i) - 0 || Infinity;
							}
							
							// 设置最小值
							item.min = min;
							// 返回长度
							length = i - (index - 2);
							break loop;
						
						default:
							return length;
					}
				}
				
				return length;
			}

			default:
				return length;
		}
		
		return length;
	},
	// getSubItemOf
	function(item, charCode, self){
		for(
			var i = 0, j = item.length;i < j;i++
		){
			var regexpItem = item[i];
			
			if(
				regexpItem.compare(charCode)
			){
				return regexpItem.map;
			}
			
			if(
				regexpItem.min === 0
			){
				regexpItem = self(regexpItem, charCode, self);
				
				if(
					regexpItem
				){
					return regexpItem;
				}
			}
		}
		
		return null;
	}
);

//new this.RegExp("a1((b|c)d)e");
//new this.RegExp("ab{00000001,1000}.*(c|w)*");
new this.RegExp(/a1((b|c|x456|y|z|o|p|q)8|9)f|w/);
/a(b|c)d/;

var a = { source: "a" };

var prototype = {};

	a["b"] = Object.create(prototype)

	a["c"] = Object.create(prototype)

prototype["d"] = { d:"d" }



}.call(
	Rexjs,
	Rexjs
);