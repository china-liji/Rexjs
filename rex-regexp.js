void function(Rexjs){

this.RegExpEmptyRange = function(){
	function RegExpEmptyRange(){};
	RegExpEmptyRange = new Rexjs(RegExpEmptyRange);
	
	RegExpEmptyRange.props({
		greedy: true,
		grow: function(range){
			this.max += range.max;
			this.min += range.min;
			//this.greedy = range.greedy;
		},
		max: 1,
		min: 1,
		length: 0
	});
	
	return RegExpEmptyRange;
}();

this.RegExpRange = function(RegExpEmptyRange, Infinity, curly){
	function RegExpRange(source, index){
		RegExpEmptyRange.call(this);
		
		index++;
		
		switch(
			source[index]
		){
			// 如果是 "*"
			case "*":
				this.min = 0;
				this.max = Infinity;
				this.length = 1;
				break;
			
			// 如果是 "+"
			case "+":
				this.max = Infinity;
				this.length = 1;
				break;
			
			// 如果是 "?"
			case "?":
				this.min = 0;
				this.length = 1;
				break;
			
			// 如果是 "{"
			case "{":
				curly(this, source, index + 1);
				break;
		}
		
		// 如果接下来的字符是问号，说明是非贪婪模式
		if(
			source[index + this.length] === "?"
		){
			// 贪婪模式设置为 false
			this.greedy = false;
			// 长度加 1
			this.length++;
		}
	};
	RegExpRange = new Rexjs(RegExpRange, RegExpEmptyRange);
	
	RegExpRange.props({
		equal: function(){
			
		},
		in: function(min, max){
			
		}
	});
	
	return RegExpRange;
}(
	this.RegExpEmptyRange,
	Infinity,
	// curly
	function(range, source, index){
		var min = 1, maxIndex = index;
				
		// 依次检测后续字符
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
				return;
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
						return;
					}
					
					// 设置 max 的起始索引
					maxIndex = i + 1;
					// 设置 min
					min = source.substring(index, i) - 0;
					continue;
				
				// 如果是 "}"
				case 125: {
					// 设置最大值
					range.max = source.substring(maxIndex, i) - 0;
					// 设置最小值，如果 max 的起始索引等于 index，则说明，该大括号内就 1 组数字
					range.min = maxIndex === index ? item.max : min;
					
					if(
						range.min > range.max
					){
						throw "numbers out of order in {} quantifier";
					}
					
					// 设置长度
					range.length = i - (index - 2);
					return;
				}
				
				default:
					return;
			}
		}
	}
);

this.RegExpCharacter = function(List, RegExpEmptyRange){
	function RegExpCharacter(c){
		List.call(this);
		
		if(c){
			this.charCode = c;
		}
	};
	RegExpCharacter = new Rexjs(RegExpCharacter, List);
	
	RegExpCharacter.props({
		caches: 0,
		charCode: -1,
		compare: function(charCode){
			return this.charCode === charCode;
		},
		count: 0,
		endable: false,
		from: function(regexpCharacter){
			for(
				var i = 0, j = regexpCharacter.length;i < j;i++
			){
				this[i] = regexpCharacter[i];
			}
		},
		get: function(charCode){
			
		},
		/*
		get: function(charCode){
			// 遍历每个项
			for(
				var i = 0, j = this.length;i < j;i++
			){
				var regexpItem = this[i];
				
				// 如果满足比较条件
				if(
					regexpItem.compare(charCode)
				){
					// 返回该项的映射
					return regexpItem.map;
				}
				
				// 如果当前项可以忽略
				if(
					regexpItem.min === 0
				){
					// 通过该项映射获取 charCode 所对应项
					regexpItem = regexpItem.map.get(charCode);
					
					// 如果该存在
					if(
						regexpItem
					){
						// 返回该项的映射
						return regexpItem.map;
					}
				}
			}
			
			return null;
		},
		
		get: function(charCode, range){
			var regexpCharacter = null;
			
			// 遍历每个项
			for(
				var i = 0, j = this.length;i < j;i++
			){
				var character = this[i];

				if(
					!character.compare(charCode)
				){
					continue;
				}
				
				var rg = character.range;
					
				if(
					range.min === rg.min && range.max === rg.max
				){
					regexpCharacter = character;
					break;
				}
				
				switch(
					true
				){
					case range.min >= rg.min && range.min <= rg.max: {
						debugger
						
						if(
							range.max > rg.max
						){
							var r = new RegExpEmptyRange(), map = new RegExpCharacter(charCode);
							
							
							
							r.min = range.min;
							r.max = rg.max;
							rg.max = r.min - 1;
							range.min = r.max + 1;
						}
						else {
							var range2 = new RegExpEmptyRange(), char1 = new RegExpCharacter(charCode), char2 = new RegExpCharacter(charCode);
							
							range2.min = range.max + 1;
							range2.max = rg.max;
							
							rg.max = range.min - 1;
							
							char1.range = range;
							char2.range = range2;
							
							char1.from(character);
							char2.from(character);
							
							this.splice(i + 1, 0, char1, char2);
							return char1;
						}
						
						break;
					}
					
					case rg.max >= range.min && rg.max <= range.max: {
						break;
					}
				}
				
				
			}
			
			return regexpCharacter;
		},*/
		isRoot: function(){
			return this.caches > 0;
		},
		map: null,
		max: 1,
		min: 1,
		next: function(charCode, prev){
			var count = this.count;
			
			switch(
				true
			){
				case count >= this.max:
					break;
					
				case this.compare(charCode):
					return this;
					
				case count < this.min:
					return null;
			}
			
			for(
				var i = 0, j = this.length;i < j;i++
			){
				var regexpItem = this[i];
				
				// 如果满足比较条件
				if(
					regexpItem.compare(charCode)
				){
					// 返回该项的映射
					return regexpItem;
				}
				
				// 如果当前项可以忽略
				if(
					regexpItem.min === 0
				){
					// 通过该项映射获取 charCode 所对应项
					regexpItem = regexpItem.get(charCode);
					
					// 如果该存在
					if(
						regexpItem
					){
						// 返回该项的映射
						return regexpItem.map;
					}
				}
			}
			
			return null;
		},
		self: function(){
			
		},
		set: function(regexpItem, range){
			regexpItem.range = range;
			
			this.push(regexpItem);
			return regexpItem;
		}
	});
	
	return RegExpCharacter; 
}(
	this.List,
	this.RegExpEmptyRange
);

this.RegExpGroupItem = function(RegExpCharacter){
	function RegExpGroupItem(){
		RegExpCharacter.call(this);
	};
	RegExpGroupItem = new Rexjs(RegExpGroupItem, RegExpCharacter);
	
	return RegExpGroupItem;
}(
	this.RegExpCharacter
);

this.RegExpRangeItem = function(RegExpCharacter){
	function RegExpRangeItem(){
		RegExpCharacter.call(this);
	};
	RegExpRangeItem = new Rexjs(RegExpRangeItem, RegExpCharacter);
	
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
	this.RegExpCharacter
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

this.RegExpTree = function(RegExpCharacter){
	function RegExpTree(){
		RegExpCharacter.call(this);
	};
	RegExpTree = new Rexjs(RegExpTree, RegExpCharacter);
	
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
	this.RegExpCharacter
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

this.RegExpParser = function(RegExpCharacter, RegExpGroupItem, RegExpDotItem, RegExpTree, RegExpStacks, RegExpRange, throwError){
	function RegExpParser(source){
		var stacks = new RegExpStacks(), cacheStacks = new RegExpStacks();
		
		stacks.add(
			this.tree = new RegExpTree()
		);
		
		for(
			var i = 0, length = source.length;i < length;i++
		){
			var charCode = source.charCodeAt(i);
			
			switch(
				charCode
			){
				// "."
				case 46:
					stacks.add(
						stacks.item.set(
							new RegExpDotItem()
						)
					);
					break;
				
				// "\\"
				case 92:
					continue;

				// "("
				case 40:
					stacks.item.caches++;
					
					cacheStacks.add(
						new RegExpGroupItem()
					);
					continue;
				
				// ")"
				case 41: {
					var item = cacheStacks.item, root = stacks.root;
					
					stacks.item.map = item;
					root.caches--;
					
					cacheStacks.clearAfter(item, true);
					
					stacks.clearAfter(root);
					stacks.add(item);
					break;
				}
					
				// "["
				case 91:
					continue;
				
				// "]"
				case 93:
					continue;
				
				// "|"
				case 124:
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
				
				// "^"
				case 94:
					continue;
				
				// "$"
				case 36:
					continue;
				
				// "*"
				case 42:
				// "?"
				case 63:
				// "+"
				case 43:
					throwError(source, "Nothing to repeat");
					return;
					
				default: {
					var item = stacks.item, range = new RegExpRange(source, i);
			
					stacks.add(
						RegExpParser.getCharacterOf(item, charCode, range) || item.set(new RegExpCharacter(charCode), range)
					);
					break;
				}
			}
			
			i += (stacks.item.range = new RegExpRange(source, i)).length;
		}
		
		stacks.end();
	};
	RegExpParser = new Rexjs(RegExpParser);
	
	RegExpParser.static({
		getCharacterOf: function(prevCharacter, charCode, range){
			if(
				prevCharacter.compare(charCode)
			){
				debugger
				prevCharacter.range.grow(range);
				return prevCharacter;
			}
			
			var character = null;
			
			if(
				character === null
			){
				character = new RegExpCharacter(charCode, range);
				character.range = range;
				
				prevCharacter.set(character);
			}
			
			return character;
			
			// 遍历每个项
			for(
				var i = 0, j = prevCharacter.length;i < j;i++
			){
				var char = prevCharacter[i];
				
				if(
					!char.compare(charCode)
				){
					continue;
				}
				
				var rg = char.range;
				
				if(
					range.min === rg.min && range.max === rg.max
				){
					character = char;
					break;
				}
				
				switch(
					true
				){
					case range.min >= rg.min && range.min <= rg.max: {
						debugger
						
						
					}
				}
			}
			
			return character;
		}
	});
	
	return RegExpParser;
}(
	this.RegExpCharacter,
	this.RegExpGroupItem,
	this.RegExpDotItem,
	this.RegExpTree,
	this.RegExpStacks,
	this.RegExpRange,
	// throwError
	function(source, error){
		throw "SyntaxError: Invalid regular expression: /" + source + "/: " + error;
	}
);

this.RegExp = function(RegExpParser){
	function RegExp(regexp){
		console.log(regexp)
		
		console.log(
			new RegExpParser(
				this.source = typeof regexp === "string" ? regexp : regexp.source || ""
			)
			.tree
		)
		
		window.xx = this;
	};
	RegExp = new Rexjs(RegExp);
	
	RegExp.props({
		exec: function(input){
			var index = -1, i = 0, t = 0, min = 0, max = 0, length = input.length, character = this.tree;

			while(
				i < length
			){
				var char = character.get(
					input.charCodeAt(i)
				);
				
				if(
					char
				){
					if(
						index === -1
					){
						index = i;
					}
					
					character = char;
				}
				else {
					if(
						index > -1
					){
						break;
					}
				}
				
				i++;
			}
			
			if(
				character.endable
			){
				var result = [input.substring(index, i)];
				
				result.index = index;
				result.input = input;
				return result;
			}
			
			var charCode = input.charCodeAt(i), it = character.get(charCode);
			
			
			
			return null;
		},
		flags: "",
		lastIndex: 0,
		source: ""
	});
	
	return RegExp;
}(
	this.RegExpParser
);

new this.RegExp("a{2,8}?a{3,7}a{4,5}?a");
//new this.RegExp("a1((b|c)d{2,4})e");
//new this.RegExp("ab{00000001,1000}.*(c|w)*");
//new this.RegExp(/a1((b|c|x456|y|z|o|p|q)8|9)f|w/);
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