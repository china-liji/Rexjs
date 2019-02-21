// 基于 Rexjs 语法相关
new function(Rexjs, forEach){
"use strict";

// 变量名集合相关
!function(collectionToString){

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

this.CollectionRange = function(){
	/**
	 * 变量收集器范围
	 * @param {VariableCollection} collection - 所相关的变量收集器
	 */
	function CollectionRange(collection){
		this.collection = collection;

		this.open();
	};
	CollectionRange = new Rexjs(CollectionRange);

	CollectionRange.props({
		/**
		 * 是否闭合
		 */
		get collapsed(){
			return this.from >= this.to;
		},
		/**
		 * 记录结束点（范围不包括该点）
		 */
		close: function(){
			this.to = this.collection.length;
		},
		collection: null,
		/**
		 * 根据该范围执行回调，并传入对应变量名作为参数
		 * @param {Function} callback - 回调函数
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		forEach: function(callback, _contentBuilder, _anotherBuilder){
			var collection = this.collection;

			for(var i = this.from, j = this.to;i < j;i++){
				// 执行回调
				callback(collection[i], _contentBuilder, _anotherBuilder);
			}
		},
		from: 0,
		/**
		 * 记录起始点（范围包括该点）
		 */
		open: function(){
			this.from = this.collection.length;
		},
		to: 0,
		/**
		 * 转化为字符串
		 * @param {String} before - 变量之前的字符串
		 * @param {String} join - 变量连接字符串
		 * @param {String} after - 变量之后的字符串
		 */
		toString: function(before, join, after){
			return collectionToString(this.collection, before, join, after, this.from, this.to);
		}
	});

	return CollectionRange;
}();

this.VariableCollection = function(CollectionRange){
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
		contains: function(variable){
			for(var i = 0, j = this.length;i < j;i++){
				// 如果变量名相同
				if(this[i] === variable){
					return true;
				}
			}

			return false;
		},
		length: 0,
		/**
		 * 返回一个收集器范围
		 */
		range: function(){
			return new CollectionRange(this);
		},
		/**
		 * 转化为字符串
		 * @param {String} before - 变量之前的字符串
		 * @param {String} join - 变量连接字符串
		 * @param {String} after - 变量之后的字符串
		 */
		toString: function(before, join, after){
			return collectionToString(this, before, join, after, 0, this.length);
		}
	});

	return VariableCollection;
}(
	this.CollectionRange
);

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
		index: 0,
		/**
		 * 提供一个变量名
		 */
		provide: function(){
			var index = this.index, variable = PREFIX + index.value;

			index.increase();
			return variable;
		}
	});

	return VariableCollections;
}(
	// PREFIX
	"$Rexjs_"
);

}.call(
	this,
	// collectionToString
	function(collection, before, join, after, start, end){
		var i = start + 1;

		// 如果长度不够
		if(end < i){
			return "";
		}

		var result = before + collection[start];

		for(;i < end;i++){
			// 拼接连接符
			result += join;
			// 拼接变量名
			result += collection[i];
		}

		return result + after;
	}
);


// 文件相关
!function(){

this.File = function(){
	/**
	 * 文件信息
	 * @param {Url} url - 文件路径
	 * @param {String} source - 源文件内容
	 * @param {Url} _alias - 文件路径别名
	 */
	function File(url, source, _alias){
		this.url = url;
		this.source = source;
		this.alias = _alias || url;
	};
	File = new Rexjs(File);
	
	File.props({
		alias: null,
		source: "",
		url: null
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
		position: 0,
		/**
		 * 给语句设置相关表达式，此方法存在的目的是保证 getBoundExpression 必须传入 context 与 statement 这 2 个参数
		 * @param {Statement} statement - 当前语句
		 */
		setExpressionOf: function(statement){
			return statement.expression = this.tag.getBoundExpression(this, statement);
		},
		/**
		 * 给语句块设置相关语句，此方法存在的目的是为了保持与 setExpressionOf 的使用一致性
		 * @param {Statements} statements - 当前语句块
		 */
		setStatementOf: function(statements){
			return statements.statement = this.tag.getBoundStatement(statements);
		},
		/**
		 * 给解析设置相关语句块，此方法存在的目的是为了保持与 setExpressionOf 的使用一致性
		 * @param {Statements} statements - 当前语句块
		 */
		setStatementsOf: function(parser){
			return parser.statements = this.tag.getBoundStatements(parser.statements);
		},
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
		 * 追加内容上下文
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
		 * 清除内容
		 */
		clear: function(){
			this.result = "";
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

this.SourceBuilder = function(ContentBuilder){
	/**
	 * 源码生成器，用来生成 sourceURL
	 * @param {File} file - 生成器相关文件
	 */
	function SourceBuilder(file){
		ContentBuilder.call(this);

		this.file = file;
	};
	SourceBuilder = new Rexjs(SourceBuilder, ContentBuilder);
	
	SourceBuilder.props({
		/**
		 * 完成生成，返回结果
		 */
		complete: function(){
			// 追加新行
			this.newline();
			// 追加 sourceURL
			this.appendString("//# sourceURL=" + this.file.url.href);

			return this.result;
		},
		file: null
	});
	
	return SourceBuilder;
}(
	this.ContentBuilder
);

}.call(
	this
);


// 映射生成器相关
!function(SourceBuilder){

this.Base64 = function(chars, parseInt, btoa){
	/**
	 * base64 相关处理类
	 */
	function Base64(){};
	Base64 = new Rexjs(Base64);
	
	Base64.static({
		/**
		 * 绑定编码 base64 的方法
		 * @param {Function} method - 编码 base64 的方法
		 * 
		 */
		bindBtoa: function(method){
			btoa = method;
		},
		/**
		 * 将字符串编码为 base64，返回是否支持编码
		 * @param {String} string - 源字符串
		 * @param {Function} callback - 回调函数
		 * @param {*} _this - callback 所需绑定的 this
		 * @returns {Boolean}
		 */
		btoa: function(string, callback, _this){
			// 如果方法存在
			if(typeof btoa === "function"){
				// 执行回调
				callback.call(
					_this,
					// 编码
					btoa(string)
				);

				return true;
			}

			return false;
		},
		/**
		 * 将指定数字进行 base64 VLQ 编码
		 * @param {Number} num - 所需提供的数字
		 */
		vlq: function(num){
			var binary, length, result = "";

			// 如果数字小于 0
			if(num < 0){
				// 将数字以正数形式转化为二进制，并在后面加 1，表示负数
				binary = (-num).toString(2) + "1";
			}
			else {
				// 将数字转化为二进制，并在后面加 0，表示正数
				binary = num.toString(2) + "0";
			}

			length = binary.length;
			
			// 字符串从后往前逆序循环，当长度大于 5 时
			while(length > 5){
				// 拼接结果
				result += chars[
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
			result += chars[
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
	
	return Base64;
}(
	// chars
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
	parseInt,
	// btoa
	typeof btoa === "undefined" ? null : btoa
);

this.MappingPosition = function(Position){
	/**
	 * 源码映射生成器中所记录的位置
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

this.MappingBuilder = function(URL, MappingPosition, Base64, JSON, appendContext, appendString, complete, merge, newline){
	/**
	 * 源码映射生成器，用来生成 sourceMap
	 * @param {File} file - 生成器相关文件
	 */
	function MappingBuilder(file){
		SourceBuilder.call(this, file);
		
		this.position = new MappingPosition();
	};
	MappingBuilder = new Rexjs(MappingBuilder, SourceBuilder);
	
	MappingBuilder.static({
		/**
		 * 判断是否支持 sourceMaps
		 */
		get supported(){
			return Base64.btoa(
				"",
				function(){}
			);
		}
	});
	
	MappingBuilder.props({
		/**
		 * 追加内容上下文，同时会更新 sourceMap
		 * @param {Context} context - 标签内容上下文
		 */
		appendContext: function(context){
			var diff, diffVLQ, contextPosition = context.position, builderPosition = this.position,
			
				line = contextPosition.line, column = contextPosition.column;

			// 如果不是空行
			if(builderPosition.generatedLineOffset !== builderPosition.generatedColumnOffset){
				// 追加逗号
				this.appendMappings(",");
			}

			// 追加映射当前信息
			this.appendMappings(
				Base64.vlq(builderPosition.generatedColumnDiff) +
				"A" +
				Base64.vlq(line - builderPosition.line) +
				Base64.vlq(column - builderPosition.column)
			);
			
			// 先要清空一次列的差值
			builderPosition.generatedColumnDiff = 0;

			// 调用父类方法
			appendContext.call(this, context);

			// 获取刚刚上下文所产生的生成列偏移值
			diff = builderPosition.generatedColumnDiff;
			// 获取对应 vlq 编码
			diffVLQ = Base64.vlq(diff);

			/*
				将映射点向右移动等同于 生成列偏移值 的量，并指向原来的位置，
				如：context 所添加的值为 var，
				在此之前，位置是在 var 之前，即 v 的索引位置，
				那么下面的代码，目的是将位置移动到 var 之后，即 r 后面的索引位置，
				而且源代码的位置还是在 var 之前。
			*/
			this.appendMappings("," + diffVLQ + "AAA");
			// 这段代码的目的就是将上面源代码的位置，也移动到 var 之后
			this.appendMappings(",AAA" + diffVLQ);

			// 记录源码的行
			builderPosition.line = line;
			// 记录源码的列
			builderPosition.column = column + diff;
			// 记录列的偏移量
			builderPosition.generatedColumnOffset += diff;
			// 清空列的差值
			builderPosition.generatedColumnDiff = 0;
		},
		/**
		 * 追加映射内容
		 * @param {String} content - 映射内容
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
			var url = this.file.url;

			// 如果支持解析 base64
			if(Base64.btoa(
				JSON.stringify({
					version: 3,
					sources: [ url.href ],
					names: [],
					mappings: this.mappings
				}),
				function(result){
					// 追加新行
					this.newline();
					// 追加 sourceURL
					this.appendString("//# sourceURL=" + new URL("http://sourceURL" + url.pathname).href);
					// 追加新行
					this.newline();
					// 追加 mappingURL 头部
					this.appendString("//# sourceMappingURL=data:application/json;base64,");
					// 追加 mappings
					this.appendString(result);
				},
				this
			)){
				return this.result;
			}

			// 返回结果
			return complete.call(this);
		},
		mappings: "",
		/**
		 * 追加新行，同时会更新 sourceMap
		 */
		newline: function(){
			var position = this.position;
			
			// 给 mappings 添加分号，表示新行的开始
			this.appendMappings(";");
			// 追加换行符
			newline.call(this);
			
			// 设置偏移量
			position.generatedLineOffset = position.generatedColumnOffset += position.generatedColumnDiff;
			// 清空差值
			position.generatedLineDiff = position.generatedColumnDiff = 0;
		},
		position: null
	});
	
	return MappingBuilder;
}(
	Rexjs.URL,
	this.MappingPosition,
	this.Base64,
	JSON,
	SourceBuilder.prototype.appendContext,
	SourceBuilder.prototype.appendString,
	SourceBuilder.prototype.complete,
	SourceBuilder.prototype.merge,
	SourceBuilder.prototype.newline
);

}.call(
	this,
	this.SourceBuilder
);


// 语法相关
!function(){

this.SyntaxElement = function(){
	/**
	 * 语法元素
	 */
	function SyntaxElement(){};
	SyntaxElement = new Rexjs(SyntaxElement);
	
	SyntaxElement.props({
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(){}
	});
	
	return SyntaxElement;
}();

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
		 * 执行正则表达式进行匹配
		 * @param {RegExp} regexp - 初始化的表达式
		 * @param {String} source - 需要匹配的源代码内容字符串
		 * @param {Function} regexpCallback - 正则表达式匹配出来的回调函数
		 */
		exec: function(regexp, source, callback){
			var result, content = "", index = -1, lastIndex = this.lastIndex;

			// 初始化
			this.lastIndex = 0;
			
			for(;;){
				regexp.lastIndex = lastIndex = this.lastIndex;
				result = regexp.exec(source);

				// 如果没匹配到结果
				if(result === null){
					// 跳出循环
					break;
				}
				
				// 如果相等，说明中间没有其他字符
				if(result.index === lastIndex){
					content = result[0];
					index = result.indexOf("", 1) - 1;
				}
				else {
					// 取第一个字符
					content = source[lastIndex];
					index = -1;
				}

				// 进行回调
				regexp = callback(content, index);
				// 计算 lastIndex
				this.lastIndex += content.length;
			}

			// 如果成立，说明已经没有未处理的代码
			if(this.lastIndex >= source.length){
				return;
			}
			
			// 进行回调
			callback(
				source.substring(this.lastIndex),
				-1
			);

			// 中断匹配
			this.break();
		},
		lastIndex: 0
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
!function(){

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
!function(TagData, parseInt){

this.TagClass = function(CLASS_NONE, CLASS_STATEMENT, CLASS_STATEMENT_BEGIN, CLASS_STATEMENT_END, CLASS_EXPRESSION, CLASS_EXPRESSION_CONTEXT){
	/**
	 * 标签性质定位的类别
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
		// 表达式标签类别
		CLASS_EXPRESSION: CLASS_EXPRESSION,
		// 表达式上下文标签类别
		CLASS_EXPRESSION_CONTEXT: CLASS_EXPRESSION_CONTEXT,
		// 无标签分类
		CLASS_NONE: CLASS_NONE,
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

this.TagType = function(TYPE_NONE, TYPE_MATCHABLE, TYPE_UNEXPECTED, TYPE_MISTAKABLE, TYPE_ILLEGAL){
	/**
	 * 标签正则捕获类型
	 * @param {Number} value - 标签类型
	 */
	function TagType(value){
		TagData.call(this, value);

		this.illegal = (value & TYPE_ILLEGAL) === TYPE_ILLEGAL;
		this.matchable = (value & TYPE_MATCHABLE) === TYPE_MATCHABLE;
		this.mistakable = (value & TYPE_MISTAKABLE) === TYPE_MISTAKABLE;
		this.unexpected = (value & TYPE_UNEXPECTED) === TYPE_UNEXPECTED;
	};
	TagType = new Rexjs(TagType, TagData);

	TagType.static({
		// 非法标签类型
		TYPE_ILLEGAL: TYPE_ILLEGAL,
		// 无标签类型
		TYPE_NONE: TYPE_NONE,
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
	// TYPE_NONE
	parseInt(0, 2),
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
		 * 获取绑定的标签，该标签列表一般是用于语句的 try、catch 的返回值
		 */
		get binding(){
			return null;
		},
		class: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {String} content - 标签内容
		 */
		extractTo: function(contentBuilder, content){
			// 追加标签内容
			contentBuilder.appendString(content);
		},
		/**
		 * 获取绑定的表达式，一般在子类使用父类逻辑，而不使用父类表达式的情况下使用
		 * @param {Context} context - 相关的语法标签上下文
		 * @param {Statement} statement - 当前语句
		 */
		getBoundExpression: function(){
			return null;
		},
		/**
		 * 获取绑定的语句，一般在子类使用父类逻辑，而不使用父类语句的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatement: function(){
			return null;
		},
		/**
		 * 获取绑定的语句块，一般在子类使用父类逻辑，而不使用父类语句块的情况下使用
		 * @param {Statements} statements - 该语句将要所处的语句块
		 */
		getBoundStatements: function(){
			return null;
		},
		order: 0,
		regexp: null,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 上一个标签所需匹配的标签列表
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
		visitor: function(){}
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
!function(SyntaxTag){

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
	
	LineTerminatorTag.static({
		CARRIAGE_RETURN: "\r",
		LINE_SEPARATOR: "\u2028",
		LINEFEED: "\n",
		PARAGRAPH_SEPARATOR: "\u2029"
	});

	LineTerminatorTag.props({
		regexp: /\r\n?|\n|\u2028|\u2029/,
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
!function(SyntaxTag, RegExp){

this.SyntaxTags = function(List, getSortedValue, distinct){
	/**
	 * 语法标签列表
	 */
	function SyntaxTags(){
		List.call(this);
	};
	SyntaxTags = new Rexjs(SyntaxTags, List);

	SyntaxTags.props({
		/**
		 * 将一系列标签类托管给当前标签列表来实例化，并进行注册
		 * @param {Array} list - 一系列标签类
		 * @param {Number} _type - 所有标签初始化的标签类型
		 */
		delegate: function(list, _type){
			// 注册标签
			this.register.apply(
				this,
				// 映射标签
				list.map(function(SyntaxTag){
					// 实例化标签
					return new SyntaxTag(_type);
				})
			);
		},
		entrance: false,
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			return false;
		},
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
		 * 注册添加语法标签，与 push 方法不同的是，register 会进过滤器，而 push 不会
		 * @param {SyntaxTag, SyntaxTags} _rest - 需要添加的 语法标签 或 语法标签列表
		 */
		register: function(_rest){
			forEach(
				arguments,
				function(obj){
					// 如果对象也是一个标签列表
					if(obj instanceof SyntaxTags){
						// 再次调用注册方法
						this.register.apply(this, obj);
						return;
					}

					// 检查是否应该过滤该标签
					if(this.filter(obj)){
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
	Rexjs.List,
	// getSortedValue
	function(copy, tag1, tag2, property, value, _bothNot){
		var type1 = tag1.type, type2 = tag2.type;

		switch(value){
			// 如果第一个类型属性值为 value
			case type1[property]:
				// 如果第二个类型属性值不为 value
				if(type2[property] !== value){
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
				if(_bothNot){
					break;
				}

				// 进行下一个属性的比较
				return 0;
		}

		// 如果 tag1 的排序更大
		if(tag1.order - tag2.order > 0){
			// 将 tag1 插入到 tag2 前面
			return -1;
		}
		
		// 如果 tag2 的排序更大
		if(tag1.order - tag2.order < 0){
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
					if(regexp === null){
						tags[-1] = tag;
						return;
					}
					
					var source = regexp.source;
					
					// 如果已经存在
					if(this(source)){
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
	function DefaultTags(){
		SyntaxTags.call(this);
		
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
		 * @param {String} name - 标签唯一名称
		 * @param {SyntaxTags} tags - 需要映射的标签列表
		 */
		map: function(name, tags){
			// 标签列表就绪
			tags.ready();
			
			// 如果是入口标签列表
			if(tags.entrance){
				// 设置入口标签
				this.entranceTags = tags;
			}
			
			// 根据 name 设置标签列表
			this[name] = tags;
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
!function(SyntaxElement, SyntaxTag){

this.Expression = function(parseInt){
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
		// 语句结束状态，当开始编译，进行语句连接时，应该在两语句之间加语句连接符，如分号等
		STATE_STATEMENT_END: parseInt(1110, 2),
		// 语句已结束状态，当开始编译，进行语句连接时，不需要再加语句连接符，如分号等
		STATE_STATEMENT_ENDED: parseInt(11110, 2)
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
		 * 获取是否为默认表达式
		 */
		get default(){
			return false;
		},
		/**
		 * 获取是否为空表达式
		 */
		get empty(){
			return false;
		},
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
		// 文档流主流
		FLOW_MAIN: parseInt(10, 2),
		// 文档流分支流
		FLOW_BRANCH: parseInt(100, 2),
		// 文档流线性分支流
		FLOW_LINEAR: parseInt(1100, 2),
		// 文档流循环分支流
		FLOW_CIRCULAR: parseInt(10100, 2)
	});
	
	Statement.props({
		/**
		 * 获取该语句 try、catch 方法所需返回的默认绑定标签
		 */
		bindingOf: function(){
			return this.tagOf().binding;
		},
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
		flow: Statement.FLOW_MAIN,
		/**
		 * 跳出该语句
		 */
		out: function(){
			var target = this.target, expression = target.expression;

			// 记录当前表达式的状态，这里不能用 "|="，因为该状态是覆盖操作
			expression.state = this.expression.state;
			// 恢复语句
			this.statements.statement = target;

			// 返回目标语句的表达式
			return expression;
		},
		statements: null,
		/**
		 * 获取该语句 try、catch 方法中所需使用到的标签，一般是指向实例化该语句的标签
		 */
		tagOf: function(){
			return this.target.expression.context.tag;
		},
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
	 * @param {Statements} target - 目标语句块，即上一层语句块
	 */
	function Statements(target){
		SyntaxElement.call(this);
		
		// 记录目标语句块
		this.target = target;

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
		// 惰性闭包作用域，一般用于特殊的闭包处理使用，如箭头函数
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
			for(var i = this.min, j = this.length;i < j;i++){
				var statement = this[i];

				// 提取语句
				statement.extractTo(contentBuilder);

				// 如果表达式状态是 STATE_STATEMENT_ENDED，则说明不需要加语句连接符
				if((statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED){
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
		reference: "this",
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
!function(Expression){

this.CompiledExpression = function(){
	/**
	 * 已编译的表达式，一般用于将已编译过的文本作为表达式的形式委托出去使用
	 * @param {String} value - 已编译过的代码字符串
	 */
	function CompiledExpression(value){
		Expression.call(this, null);

		this.value = value;
	};
	CompiledExpression = new Rexjs(CompiledExpression, Expression);
	
	CompiledExpression.props({
		/**
		 * 提取文本内容，空函数，不做任何处理
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			contentBuilder.appendString(this.value);
		},
		value: ""
	});
	
	return CompiledExpression;
}();

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
		 * 获取是否为空表达式
		 */
		get empty(){
			return true;
		},
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
		 * 获取是否为默认表达式
		 */
		get default(){
			return true;
		},
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

this.ListExpression = function(extractItem){
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
			this[this.length++] = this.latest = expression;
		},
		/**
		 * 执行连接所有表达式
		 * @param {Function} callback - 回调函数
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		execJoin: function(callback, contentBuilder, _anotherBuilder){
			var min = this.min, length = this.length;

			// 如果长度小于等于最小索引值
			if(length <= min){
				return;
			}

			var join = this.join;

			// 回调第一项
			callback(this[min], contentBuilder, _anotherBuilder);

			// 遍历项
			for(var i = min + 1, j = length;i < j;i++){
				// 添加表达式连接符
				contentBuilder.appendString(join);

				// 回调第 i 项
				callback(this[i], contentBuilder, _anotherBuilder);
			}
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, _anotherBuilder){
			// 执行连接所有表达式
			this.execJoin(extractItem, contentBuilder, _anotherBuilder);
		},
		/**
		 * 遍历每一个有效项
		 * @param {Function} callback - 回调函数
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		forEach: function(callback, _contentBuilder, _anotherBuilder){
			for(var i = this.min, j = this.length;i < j;i++){
				// 执行回调
				callback(this[i], _contentBuilder, _anotherBuilder, i);
			}
		},
		join: "",
		latest: null,
		length: 0,
		min: 0,
		/**
		 * 设置表达式，与 add 不同，当 expession 为默认表达式时，会忽略该操作
		 * @param {Expression} expression - 需要添加的表达式
		 */
		set: function(expression){
			// 如果是默认表达式
			if(expression.default){
				return false;
			}

			// 添加表达式
			this.add(expression);
			return true;
		}
	});
	
	return ListExpression;
}(
	// extractItem
	function(item, contentBuilder, _anotherBuilder){
		item.extractTo(contentBuilder, _anotherBuilder);
	}
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

this.PartnerExpression = function(){
	/**
	 * 匹配组表达式
	 * @param {Context} opening - 起始标签上下文
	 */
	function PartnerExpression(opening){
		Expression.call(this, opening);
		
		this.opening = opening;
	};
	PartnerExpression = new Rexjs(PartnerExpression, Expression);
	
	PartnerExpression.props({
		closing: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 * @param {ContentBuilder} _anotherBuilder - 另一个内容生成器，一般用于副内容的生成或记录
		 */
		extractTo: function(contentBuilder, _anotherBuilder){
			// 追加起始标签内容
			contentBuilder.appendContext(this.opening);
			// 追加中间内容
			this.inner.extractTo(contentBuilder, _anotherBuilder);
			// 追加结束标签内容
			contentBuilder.appendContext(this.closing);
		},
		inner: null,
		opening: null
	});
	
	return PartnerExpression;
}();

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
!function(Expression, ListExpression, LeftHandSideExpression, STATE_STATEMENT_ENDABLE){

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
		if(MappingBuilder.supported){
			// 生成源文件 map
			e(
				new MappingBuilder(file).complete()
			);
		}

		// 如果是引用错误
		if(_reference){
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

			return (this.reference ? "Reference" : "Syntax") + "Error: " + this.description + " @ " + this.file.url.href + ":" + (position.line + 1) + ":" + (position.column + 1);
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
		if(!(info instanceof Expression)){
			// 认为是 context，直接返回
			return info;
		}

		var expression = info;

		for(;;){
			// 如果是列表表达式
			if(info instanceof ListExpression){
				// 如果长度为 0
				if(info.length > 0){
					// 记录表达式
					expression = info;
					// 取第一项
					info = info[0];
					continue;
				}
			}
			// 如果是左侧表达式
			else if(info instanceof LeftHandSideExpression){
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
		 * 将解析后的语法生成字符串，并返回
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 */
		build: function(_contentBuilder){
			var contentBuilder = _contentBuilder || new ContentBuilder();
			
			this.statements.extractTo(contentBuilder);
			return contentBuilder.complete();
		},
		details: null,
		/**
		 * 抛出错误
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
		 * 开始解析语法文件
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
			// 清空错误信息
			this.details = null;
			// 初始化语句块
			this.statements = statements;
			
			// 执行正则
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
					if(tag.type.unexpected){
						// 进入异常捕获处理
						context.tag = tag = toTryCatch(parser, context, tag, parser.statements);
					}

					// 获取语句块，以防在 toTryCatch 中被修改过
					statements = parser.statements;
					
					// 访问标签
					tag.visitor(parser, context, statements.statement, statements);

					// 获取下一步需要匹配的标签列表
					tags = tag.require(tagsMap, tags, parser);
					// 返回下一步需要匹配的正则
					return tags.regexp;
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
		if(statement.expression){
			var tagClass = tag.class, tagType = tag.type, mistakable = tagType.mistakable;

			// 如果标签是可能被误解的而且是语句标签 或 标签是合法的非误解标签
			if(mistakable ? tagClass.statement : !tagType.illegal){
				for(;;){
					// 获取 catch 所返回的标签
					var t = statement.catch(parser, context);

					// 如果标签存在
					if(t){
						// 返回该标签
						return t;
					}

					// 获取当前语句
					var s = (statements = parser.statements).statement;

					// 如果等于当前语句
					if(statement === s){
						// 获取 target
						s = statement.target;

						// 如果 target 存在
						if(s){
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
				if(mistakable){
					// 如果是语句结束标签
					if(tagClass.statementEnd){
						// 返回标签
						return tag;
					}

					// 如果表达式可以结束
					if((statements.statement.expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE){
						// 创建新语句
						statements.newStatement();
						// 返回标签
						return tag;
					}
				}

				// 跳出外层语句块
				break outerBlock;
			}

			// 如果是可误解的，且不是语句标签（上面的判断保证了一定不是语句标签）
			if(mistakable){
				// 如果语句存在
				while(statement){
					// 获取 try 所返回的标签
					var t = statement.try(parser, context);

					// 如果标签存在
					if(t){
						// 返回该标签
						return t;
					}

					// 获取当前语句
					var s = parser.statements.statement;

					// 如果等于当前语句，说明没有跳出语句
					if(statement === s){
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

Rexjs.static(this);
}(
	Rexjs,
	Rexjs.forEach
);