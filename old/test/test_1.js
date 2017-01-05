new function(Class, StaticClass, Enum, replaceRegExp, toMark, getDeclaration, isSupported){
"use strict";

this.SyntaxRegExp = function(OPERATOR_REGEXP){
	return new Enum({
		// 访问器get、set
		Accessor : /(?:\b(?:get|set)\b)/g,
		// 所有字符，非贪婪模式
		All : /(?:[\S\s]*?)/g,
		// 评论
		Comment : /(?:\/\*[\S\s]*?\*\/|\/\/.*)/g,
		// 运算符
		Operator : OPERATOR_REGEXP,
		// 运算符标记
		OperatorMark : replaceRegExp(
			/(?:\0?${Operator}(?:\0\d+\0)?)/g,
			{
				Operator : OPERATOR_REGEXP
			}
		),
		// 字符串
		String : /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*')/g,
		// 正则
		RegExp : /(?:\/(?:\\\/|[^\/\r\n])+\/(?=[^\/]))/g,
		// 变量
		Variable : /(?:[_$A-z][$\w]*)/
	});
}(
	// OPERATOR_REGEXP
	/(?:[+-/*|&!~^%(\[?:=,<>]|\b(?:void|typeof|instanceof|new|in|of)\b|\b(?:return|throw|export|yeild)\b(?=[^\S\n]*\S))/g
);

this.SyntaxMarker = function(RegExp, DEFAULT_REGEXP, UNMARK_REGEXP, TO_EMPTY_REGEXP, lastIndexOf){
	function SyntaxMarker(){
		this.assign({
				all : [],
				autoClose : []
			})
			// 添加大括号标记与函数标记
			.add(
				/*
					1. 匹配"function(a,b){}"字符串的"){"；
					2. 匹配"var obj = {};"字符串的"{"。
					必须在添加小括号标记前添加此标记，因为正则里用到了右小括号")"。
				*/
				// /\{|\)\s*\{/,
				/\{/,
				// 匹配右大括号
				/\}/
			)
			// 添加中括号标记
			.add(
				/\[/,
				/\]/
			)
			// 添加匹配右小括号，或者函数参数结束的空字符标识
			.add(
				// 匹配左小括号
				/\(/,
				/*
					1. 匹配"function(a, b){};"字符串中"b"字符之后且"){"之前的""空字符；
					2. 匹配"(a = 1);"字符串中的 ")"。
					目的是不与函数标记匹配冲突，也能更好的匹配 "class A extends new function(){ return class B {}; }{}"。
				*/
				// /(?:)(?=\)\s*\{)|\)/
				/\)/
			);
	};
	SyntaxMarker = new Class(SyntaxMarker);
	
	SyntaxMarker.props({
		add : function(start, _end, _autoClose){
			var source = this.regexp.source;

			this.regexp = new RegExp(
				(
					// 如果source等于DEFAULT_REGEXP，那么说明是第一次使用此add方法
					source === DEFAULT_REGEXP.source ?
						source + "|(" :
						source.substring(0, source.length - 1) + "|"
				) +
				"(?:" + start.source + ")" + (_end ? "()|(?:" + _end.source + ")()" : "") + ")",
				"g"
			);

			this.all.push(start);

			// 如果存在结束标记
			if(
				_end
			){
				// 储存自动闭合
				this.autoClose.push(!!_autoClose, false);

				this.all.push(_end);
			}

			return this;
		},
		all : null,
		autoClose : null,
		mark : function(code){
			var indexs = [], autoClose = this.autoClose;

			return code.replace(
					TO_EMPTY_REGEXP,
					""
				)
				.replace(
					this.regexp,
					function(str, mark){
						// 如果匹配到的是字符串或正则表达式，则不需要标记
						if(
							mark === void 0
						){
							return str;
						}

						/*
							使用正则 与 当前匹配 模式的效率对比：
							条件1：5万行代码的对比；
							条件2：浏览器环境chrome 44；
							结果 ：使用当前匹配比使用正则的速度快一倍。
						*/
						var unexpected = true,
								
							// arguments的前两个参数是[字符串匹配结果，括号匹配结果]，所以要排除可能性。
							index = lastIndexOf.call(arguments, "") - 2;

						/*
							如果index在正常范围内：
							条件1：排除arguments的最前2个参数，详见上面index赋值解释；
							条件2：排除arguments的最后2个参数，因为arguments的后2个参数是[索引值，原字符串]；
							条件3：排除长度与索引的换算值（长度 = 索引 + 1）；
							结果 ：2 + 2 + 1 = 5 
						*/
						if(
							index > arguments.length - 5
						){
							index = -1;
						}

						/* 
							如果索引大于-1，说明该标记属于组匹配；
							组匹配比非组匹配要多一个数字标识，用于确定对应的结束标识。
						*/
						if(
							index > -1
						){
							// 如果是属于双数，那么说明是起始标识
							if(
								index % 2 === 0
							){
								indexs.push(index);

								unexpected = false;
								mark = mark + "\0" + indexs.length;
							}
							// 否则属于结束标识
							else {
								var length = indexs.length;

								while(
									length > 0	
								){
									var lastIndex = indexs[length - 1];

									// 如果上一个索引的值加1等于index，那么说明匹配成功
									if(
										lastIndex + 1 === index
									){
										unexpected = false;
										mark = mark + "\0" + length;
										
										indexs.splice(length - 1, 1);
										break;
									}

									// 进入这里，说明代码不规范，有意外的结束标识。

									// 如果起始标识应该在非规范代码情况下自动闭合
									if(
										autoClose[lastIndex]
									){
										unexpected = false;
										// 给自动闭合的起始标识加上对应的（length）结束标识
										mark = toMark("", length) + mark;
										
										// 从堆栈中移除该起始标识
										indexs.splice(length-- - 1, 1);
										// 重新检测上一个起始标识与当前标记的符合性
										continue;
									}
									
									// 如果不自动闭合，那么就说明是真正的意外标记了
									unexpected = true;
									break;
								}
							}
						}
						else {
							unexpected = false;
							mark = mark + "\0" + indexs.length;
						}

						return unexpected ? mark : "\0" + mark + "\0";
					}
				);
		},
		regexp : DEFAULT_REGEXP,
		unmark : function(code){
			return code.replace(UNMARK_REGEXP, "$1");
		}
	});

	return SyntaxMarker;
}(
	RegExp,
	// DEFAULT_REGEXP
	replaceRegExp(
		/${String}|${RegExp}/g,
		this.SyntaxRegExp
	),
	// UNMARK_REGEXP
	/\0([^\0]*)\0(?:\d+)?\0/g,
	// TO_EMPTY_REGEXP
	replaceRegExp(
		/(?:(\n\s*)*${Comment}(?:[^\S\n]*)?)|\0/g,
		this.SyntaxRegExp
	),
	Array.prototype.lastIndexOf
);

this.ECMAScript6SyntaxMarker = function(SyntaxMarker, argumentsList, toArray){
	function ECMAScript6SyntaxMarker(){
		// 添加绑定的标记
		argumentsList.forEach(
			function(args){
				this.add.apply(this, args);
			},
			this
		);

		// 添加逗号标记
		this.add(/,/);
	};
	ECMAScript6SyntaxMarker = new Class(ECMAScript6SyntaxMarker, SyntaxMarker);

	ECMAScript6SyntaxMarker.static({
		bind : function(start, _end, _autoClose){
			argumentsList.push(
				toArray(arguments)
			);

			return this;
		}
	});

	return ECMAScript6SyntaxMarker;
}(
	this.SyntaxMarker,
	// argumentsList
	[],
	jQun.toArray
);

this.ECMAScript6SyntaxError = function(syntaxMarker){
	function ECMAScript6SyntaxError(description, _code){
		this.assign({
			code : _code,
			description : description
		});
	};
	ECMAScript6SyntaxError = new Class(ECMAScript6SyntaxError);

	ECMAScript6SyntaxError.props({
		code : "",
		description : ""
	});

	ECMAScript6SyntaxError.override({
		toString : function(){
			var code = this.code;

			return this.constructor.name + " : " + this.description + (code ? "\n" + syntaxMarker.unmark(this.code) : "");
		}
	});

	return ECMAScript6SyntaxError;
}(
	new this.SyntaxMarker()
);

this.ECMAScript6Function = function(ECMAScript6SyntaxError, PARSE_REGEXP, prefectRexExp){
	function ECMAScript6Function(){
		/*
			与PARSE_REGEXP的区别就是，该正则只匹配一次，没有"g"标识；
			也不能写成/^${PARSE_REGEXP}$/，因为这会将多个函数当成一个函数匹配
		*/
		prefectRexExp = replaceRegExp(
			/${PARSE_REGEXP}/,
			{
				PARSE_REGEXP : PARSE_REGEXP
			}
		);
	};
	ECMAScript6Function = new StaticClass(ECMAScript6Function);

	ECMAScript6Function.static({
		join : function(staticModifier, declaration, accessor, generator, name, computation, i, args, body){
			return [
				staticModifier,
				declaration || accessor,
				generator,
				computation ? toMark("[", i) + computation + toMark("]", i) : name,
				toMark("(", i) + args + toMark("){", i, true) + body + toMark("}", i)
			]
			.join(" ")
		},
		parse : function(code, factory){
			return code.replace(
				PARSE_REGEXP,
				function(str, staticModifier, declaration, generator1, name1, accessor, generator2, name2, i, computation, j, args, body){
					// 如果body不存在，说明不是函数定义语句
					if(
						body === void 0
					){
						return str;
					}

					var generator = generator1 || generator2;

					// 如果访问器存在
					if(
						accessor
					){
						if(
							generator
						){
							throw new ECMAScript6SyntaxError("函数不能同时拥有访问器与生成器", str);
						}
					}

					return factory(str, staticModifier, declaration, accessor, generator, name1 || name2, computation, j, args, body);
				}
			);
		},
		perfectParse : function(code, factory, _fail){
			// 此方法仅限简写模式
			var factoryArgs, parsed = false;

			// 如果没有解析过（parsed = false）或者解析后有多余代码（length > 0）
			if(
				code.replace(
					prefectRexExp,
					function(str, staticModifier, declaration, generator1, name1, accessor, generator2, name2, i, computation, j, args, body){
						var name = name1 || name2, generator = generator1 || generator2;

						// 如果访问器存在
						if(
							accessor
						){
							// 如果生成器也存在
							if(
								generator
							){
								// 抛出错误
								throw new ECMAScript6SyntaxError("属性不能同时拥有访问器与生成器", str);
							}
						}

						switch(
							void 0
						){
							// 如果body不存在，说明不是函数定义语句
							case body :
								return str;

							// 如果name和computation不存在，说明匹配到declaration，因为只有function定义函数的时候，允许名称不存在
							case name || computation :
								// 因为是简写模式，而且name不存在，所以要将declaration（"function"）认为是函数名称
								name = declaration;
								break;

							// 如果函数名存在，而且declaration等于"function"，说明是错误的简写方式
							case declaration ? void 0 : true :
								return str;
						}

						parsed = true;
						factoryArgs = [str, staticModifier, declaration, accessor, generator, name, computation, j, args, body];
						return "";
					}
				)
				.length > 0 || !parsed
			){
				// 进入这里，说明解析失败，返回指定结果
				return typeof _fail === "function" ? _fail() : code;
			}

			return factory.apply(void 0, factoryArgs);
		}
	});

	return ECMAScript6Function;
}(
	this.ECMAScript6SyntaxError,
	// PARSE_REGEXP
	replaceRegExp(
		/\s*(\bstatic\b)?\s*(?:(function)\s*(\*)?\s*(${Variable})?|(${Accessor})?\s*(\*)?\s*(?:(${Variable}|${String})|\0\[\0(\d+)\0(${All})\0\]\0\8\0))\s*\0\(\0(\d+)\0(${All})\0\)\0\10\0(?:\s*\0\{\0\10\0(${All})\0\}\0\10\0)?\s*/g,
		this.SyntaxRegExp
	),
	// prefectRexExp
	null
);

this.ECMAScript6ClassMethod = function(ECMAScript6Function, ECMAScript6SyntaxError, SPACE_REGEXP){
	function ECMAScript6ClassMethod(){
	
	};
	ECMAScript6ClassMethod = new StaticClass(ECMAScript6ClassMethod);

	ECMAScript6ClassMethod.static({
		parse : function(code, index, onconstructor, factory, _validate){
			var properties, lastItem, braceMark = toMark("}", index - 0 + 1);

			// 将body拆分成多个方法的集合
			properties = code.split(
					toMark(";", index)
				)
				// 将分隔方法的分号去掉
				.join(
					""
				)
				// 以右大括号为标准，分割单个方法
				.split(
					braceMark
				);

			// properties的最后一项不是方法，得去掉
			lastItem = properties
				.splice(
					properties.length - 1,
					1
				)
				.join(
					""
				);

			// 并判断是否存在非空白字符
			if(
				!SPACE_REGEXP.test(lastItem)
			){
				throw new ECMAScript6SyntaxError("存在非标准的类方法定义", lastItem);
			}

			var staticProps = [], props = [], hasConstructor = false;

			properties.forEach(function(property){
				// 利用函数的完美匹配
				ECMAScript6Function.perfectParse(
					property + braceMark,
					function(str, staticModifier, declaration, accessor, generator, name, computation, i, args, body){
						if(
							name === "constructor" && staticModifier === void 0
						){
							// 可能的错误
							if(
								accessor || generator
							){
								throw new ECMAScript6SyntaxError("构造函数不应该是一个访问器或生成器", str);
								return str;
							}

							hasConstructor = true;

							onconstructor(str, staticModifier, accessor, generator, name, i, args, body);
							return;
						}

						// 如果其他方法需要验证
						if(
							typeof _validate === "function"
						){
							// 如果验证失败，则返回
							if(
								!_validate(
									str, staticModifier, accessor, generator, name, i, args, body
								)
							){
								return;
							}
						}

						// 添加属性
						(
							staticModifier ? staticProps : props
						)
						.push(
							staticModifier ?
								str.substring(
									str.indexOf("static") + "static".length
								) :
								str
						);
					},
					function(){
						// 抛出错误
						throw new ECMAScript6SyntaxError("存在非标准的类方法定义", property + braceMark);
						return property;
					}
				);
			});

			if(
				!hasConstructor
			){
				onconstructor("constructor(){};", void 0, void 0, void 0, "constructor", -1, "", "");
			}

			// 返回处理后的代码
			return factory(
				staticProps.join(
					toMark(",", index)
				),
				props.join(
					toMark(",", index)
				)
			);
		}
	});

	return ECMAScript6ClassMethod;
}(
	this.ECMAScript6Function,
	this.ECMAScript6SyntaxError,
	// SPACE_REGEXP
	/^\s*$/
);

// 此函数作用域内的对象将会被公开
new function(
	jQun,
	SyntaxRegExp,
	SyntaxMarker, ECMAScript6SyntaxMarker,
	ECMAScript6SyntaxError,
	ECMAScript6Function, ECMAScript6ClassMethod,
	defineProperties
){

this.SyntaxRegExp = SyntaxRegExp;

this.SyntaxMarker = SyntaxMarker;

this.ECMAScript6SyntaxMarker = ECMAScript6SyntaxMarker;

this.ECMAScript6SyntaxError = ECMAScript6SyntaxError;

this.ECMAScript6Function = ECMAScript6Function;

this.ECMAScript6Mode = function(MODE_REGEXP){
	function ECMAScript6Mode(){
	
	};
	ECMAScript6Mode = new StaticClass(ECMAScript6Mode);

	ECMAScript6Mode.static({
		parse : function(code, factory){
			return code.replace(
				MODE_REGEXP,
				function(str, head, i, quote, extension, body){
					// 去掉可能存在的扩展模式("-jQun")字符串片段
					return factory(
						head + '"use strict";' + body,
						!!extension
					);
				}
			);
		}
	});

	return ECMAScript6Mode;
}(
	// MODE_REGEXP
	replaceRegExp(
		/((?:^|function(?:\s+${Variable})?\s*\0\(\0(\d+)\0${All}\0\)\0\2\0\s*\0\{\0\2\0)\s*)(["'])use\sstrict(?:\s(-jQun))?\3\s*(?:\0;\0\d+\0)?(${All}(?:\0\}\0\2\0|$))/g,
		SyntaxRegExp
	)
);

this.AutoSemicolonInsertion = function(SEMICOLON_REGEXP){
	function AutoSemicolonInsertion(){
	
	};
	AutoSemicolonInsertion = new StaticClass(AutoSemicolonInsertion);

	AutoSemicolonInsertion.static({
		parse : function(code){
			return code.replace(
				SEMICOLON_REGEXP,
				function(str, keyword, operator, increment){
					if(
						keyword
					){
						return keyword + ";";
					}

					if(
						operator
					){
						return str;
					}

					if(
						increment
					){
						return ";" + increment;
					}

					return ";";
				}
			);
		}
	});

	return AutoSemicolonInsertion;
}(
	// SEMICOLON_REGEXP
	/(?:(continue|return|break|throw|exports|yeild)\s*?)\n(?!\s*;)|([;+-/*|&!~^%?:=,<>()\[\]{])(?:\s*?\n)+|\n\s*(?:[+-]{2})|(?![\s;+-/*|&!~^%?:=,<>()\[\]}]))/g
);

this.ECMAScript6Declaration = function(PARSE_REGEXP){
	function ECMAScript6Declaration(){
		ECMAScript6SyntaxMarker
			.bind(
				/\b(?:var|let|const)\b/
			)
			.bind(
				/=|;/
			);
	};
	ECMAScript6Declaration = new StaticClass(ECMAScript6Declaration);

	ECMAScript6Declaration.static({
		parse : function(code){
			return code.replace(
				PARSE_REGEXP,
				function(str){
					console.log(arguments);

					return str;
				}
			);
		}
	});

	return ECMAScript6Declaration;
}(
	// PARSE_REGEXP
	replaceRegExp(
		/\0(var|let|const)\0(\d+)\0(${All})\0;\2\0/g,
		this.SyntaxRegExp
	)
);

this.ECMAScript6Template = function(PARSE_REGEXP, REPLACEMENT_REGEXP, syntaxMarker, keywords, supportable, toArray, protect){
	function ECMAScript6Template(){
		// 就算浏览器支持，也要解析，因为模板中可能存在\0标记
		ECMAScript6SyntaxMarker.bind(/`/);
	};
	ECMAScript6Template = new StaticClass(ECMAScript6Template);

	ECMAScript6Template.static({
		parse : function(code){
			return code.replace(
				PARSE_REGEXP,
				function(str, method, backquote, body){
					// 如果浏览器支持
					if(
						supportable	
					){
						// 去除模板中的所有标记，当普通字符串使用
						return syntaxMarker.unmark(str);
					}

					var replacements = [], substrings = [], lastStartIndex = 0;

					body.replace(
						REPLACEMENT_REGEXP,
						function(s, backslash, i, replacement, startIndex){
							// 如果存在反斜杠转义
							if(
								backslash
							){
								// 匹配的替换内容要加上反引号，当做新的模板处理
								replacement = backquote + replacement + backquote;
							}

							// 因为可能出现嵌套的模板，所以要再解析
							replacement = ECMAScript6Template.parse(replacement);

							replacements.push(
								syntaxMarker.unmark(replacement)
							);

							substrings.push(
								protect(
									syntaxMarker.unmark(
										body.substring(
											lastStartIndex,
											// 如果反斜杠转义符存在，那么截取的字符串要包括 /$\0{\0\d+\0/g 的部分
											startIndex + (backslash ? (backslash + "$" + toMark("{", i)).length : 0)
										)
									)
								)
							);

							// 如果反斜杠转义符存在，那么不要算上 /\0}\0\d+\0/g 的部分
							lastStartIndex = startIndex + s.length - (backslash ? toMark("}", i).length : 0);
							return "";
						}
					);

					// 添加最后一段子字符串
					substrings.push(
						protect(
							syntaxMarker.unmark(
								body.substring(lastStartIndex)
							)
						)
					);

					// 如果method为undefiend或为带返回性质的关键字
					if(
						keywords.indexOf(method) > -1
					){
						method = (method === void 0 ? "" : method + " ") + "jQun.ECMAScript6Template.render";
					}

					// 不能使用JSON.stringify(substrings)，stringify会转义太多不需要转义的字符
					return method + '(["' + substrings.join('", "') + '"]' + (replacements.length > 0 ? ", " + replacements.join(", ") : "") + ")";
				}
			);
		},
		render : function(substrings, _replacements){
			var str = "";

			toArray(
				arguments,
				1
			)
			.forEach(function(replacement, i){
				str += substrings[i] + replacement;
			});

			str += substrings[substrings.length - 1] || "";
			return str;
		}
	});

	return ECMAScript6Template;
}(
	// PARSE_REGEXP
	replaceRegExp(
		/(?:((?:\)|\])\0\d+\0|${Variable})\s*)?(\0`\0\d+\0)(${All})\2/g,
		SyntaxRegExp
	),
	// REPLACEMENT_REGEXP
	replaceRegExp(
		/(\\)?\$\0\{\0(\d+)\0(${All})\0\}\0\2\0/g,
		SyntaxRegExp
	),
	// syntaxMarker
	new SyntaxMarker(),
	// keywords
	[void 0, "return", "break", "continue", "throw", "export", "void"],
	// supportable
	isSupported("``;"),
	jQun.toArray,
	// protect
	function(substring){
		// 保护换行和双引号
		return substring
			.split(
				"\n"
			)
			.join(
				"\\n"
			)
			.split(
				'"'
			)
			.join(
				'\\"'
			);
	}
);

this.ECMAScript6StaticClass = function(PARSE_REGEXP, DEFAULT_NAME, join){
	function ECMAScript6StaticClass(){
	
	};
	ECMAScript6StaticClass = new StaticClass(ECMAScript6StaticClass);

	ECMAScript6StaticClass.static({
		parse : function(code){
			return code.replace(
				PARSE_REGEXP,
				function(str, operator, name, i, body){
					var arr = [];

					if(
						!name	
					){
						name = DEFAULT_NAME;
					}
					
					// 创建静态类空间并公开
					arr.push(
						getDeclaration(name, operator) + "(function(){"
					);

					arr.push(
						ECMAScript6StaticClass.parseBody(
							// 可能出现再嵌套的静态类，所以得再解析
							ECMAScript6StaticClass.parse(body),
							name,
							i
						)
					);

					// 静态类空间结束
					arr.push(
						"}())"
					);

					return arr.join("");
				}
			);
		},
		parseBody : function(body, name, index){
			var constructors = [];

			return ECMAScript6ClassMethod.parse(
				body,
				index,
				function(str, staticModifier, accessor, generator, functionName, i, args, functionBody){
					// 构造函数头部信息
					constructors.push(
						"function " + name + "(" + args + "){"
					);

					// 构造函数主体内容
					constructors.push(functionBody);
					// 添加结束
					constructors.push("};");
				},
				function(staticPropsString){
					return join(
						name,
						constructors.join(""),
						staticPropsString,
						index
					);
				},
				function(str, staticModifier, accessor, generator, functionName, i, args, functionBody){
					if(
						staticModifier
					){
						return true;
					}

					// 语法错误
					throw new ECMAScript6SyntaxError("静态类不能定义非静态方法", str);
					return false;
				}
			);
		}
	});

	return ECMAScript6StaticClass;
}(
	// PARSE_REGEXP
	replaceRegExp(
		/(${OperatorMark})?\s*\bstatic\s+class(?:\s+(${Variable}))?\s*\0\{\0(\d+)\0(${All})\0\}\0\3\0/g,
		SyntaxRegExp
	),
	// DEFAULT_NAME
	new StaticClass().name,
	// join
	function(name, constructor, staticPropsString, index){
		var arr = [];

		// 构造函数的定义
		arr.push(
			constructor === "" ? "function " + name + "(){};" : constructor
		);

		// 静态类的初始化，起始点
		arr.push(name + " = new jQun.StaticClass(");

		// 传入构造函数
		arr.push(name + ", ");

		// 添加静态属性
		if(
			staticPropsString.length > 0
		){
			arr.push(
				toMark("{", index)  + staticPropsString + toMark("}", index)
			);
		}
		else {
			arr.push("null");
		}

		// 静态类初始化，结束点
		arr.push(");");

		// 返回该静态类，目的是公开此静态类
		arr.push("return " + name + ";");

		return arr.join("");
	}
);

this.ECMAScript6Class = function(PARSE_REGEXP, DEFAULT_NAME, supportable, join){
	function ECMAScript6Class(){
		ECMAScript6SyntaxMarker.bind(/super|this/);
	};
	ECMAScript6Class = new StaticClass(ECMAScript6Class);

	ECMAScript6Class.static({
		parse : function(code, _extensible){
			var extensible = !!_extensible;

			// 如果原生态支持class关键字且不需要拓展的话，就直接返回code
			if(
				supportable && !extensible
			){
				return code;
			}

			return code.replace(
				PARSE_REGEXP,
				function(str, operator, name, superName, index, body){
					var arr = [];

					if(
						!name
					){
						name = DEFAULT_NAME;
					}

					// 创建类空间并公开
					arr.push(
						getDeclaration(name, operator) + "(function(){"
					);

					arr.push(
						ECMAScript6Class.parseBody(
							// 可能会出现再嵌套的类，所以必须得再解析
							ECMAScript6Class.parse(body, extensible),
							name,
							superName,
							index,
							extensible
						)
					);

					// 类空间结束
					arr.push(
						"}())"
					);

					return arr.join("");
				}
			);
		},
		parseBody : function(code, name, superName, index, extensible){
			var constructor = [];

			return ECMAScript6ClassMethod.parse(
				code,
				index,
				function(str, staticModifier, accessor, generator, functionName, i, args, functionBody){
					// 构造函数头部信息
					constructor.push(
						"function " + name + "(" + args + "){"
					);

					// 构造函数主体内容
					constructor.push(
						ECMAScript6Class.parseSuper(functionBody, name, superName, i, extensible)
					);

					// 添加结束
					constructor.push("};");
				},
				function(staticPropsString, propsString){
					return join(
						name,
						superName,
						constructor.join(""),
						staticPropsString,
						propsString,
						index,
						extensible
					);
				}
			);
		},
		parseSuper : function(code, name, superName, index, extensible){
			var superMark = toMark("super", index), superIndex = code.indexOf(superMark);

			if(
				superIndex === -1
			){
				// 如果父类存在（因为super就是调用父类构造函数），而且不属于拓展。
				if(
					superName && !extensible
				){
					// 语法错误
					throw new ECMAScript6SyntaxError("必须在子类的构造函数使用super关键字调用父类", code);
				}

				return code;
			}

			if(
				superName
			){
				// 拓展后，不需要开发者自行调用super
				if(
					extensible
				){
					// 语法错误
					throw new ECMAScript6SyntaxError("拓展后的类，不需要开发者自行调用super，只需要保持子类与父类构造函数参数名称一致即可", code);
					return "";
				}

				var thisIndex = code.indexOf(
					toMark("this", index)
				);

				if(
					thisIndex > -1 && thisIndex < superIndex
				){
					// 语法错误
					throw new ECMAScript6SyntaxError("不能在super关键字之前使用this关键字", code);
				}

				// 调用父类
				return code.substring(0, superIndex) + name + ".getSuperClass().bind(this)" + code.substring(superIndex + superMark.length);
			}

			// 语法错误
			throw new ECMAScript6SyntaxError("构造函数无法使用super关键字调用父类，因为该类并没有继承任何类", str);
			return "";
		}
	});

	return ECMAScript6Class;
}(
	// PARSE_REGEXP
	replaceRegExp(
		/(${OperatorMark})?\s*\bclass(?:\s+(${Variable}))?\s*(?:extends\s*(${Variable})\s*)?\0\{\0(\d+)\0(${All})\0\}\0\4\0/g,
		SyntaxRegExp
	),
	// DEFAULT_NAME
	new Class().name,
	// supportable
	isSupported("void class{};"),
	// join
	function(name, superName, constructor, staticPropsString, propsString, index, extensible){
		var arr = [];

		// 构造函数的定义
		arr.push(
			constructor === "" ? "function " + name + "(){};" : constructor
		);

		// 类的初始化
		arr.push(
			name + " = new jQun" + (extensible ? ".Class" : "") +"(" + name + ( superName ? ", " + superName : "" ) + ");"
		);

		// 添加静态属性或原型链属性
		[
			"static", "props"
		].forEach(
			function(method, i){
				var str = this[i];

				if(
					str.length === 0
				){
					return;
				}

				arr.push(
					name + "." + method + toMark("({", index, true) + str + toMark("})", index, true) + ";"
				);
			},
			[ staticPropsString, propsString ]
		);

		// 返回该类，目的是公开此类
		arr.push("return " + name + ";");

		return arr.join("");
	}
);

this.ECMAScript6EAI = function(PARSE_REGEXP, SINGLE_REGEXP, SHORTHAND_REGEXP){
	function ECMAScript6EAI(){
	
	};
	ECMAScript6EAI = new StaticClass(ECMAScript6EAI);

	ECMAScript6EAI.static({
		parse : function(code){
			return code.replace(
				PARSE_REGEXP,
				function(str, operator, declaration, name, body, index, content){
					var isInterface = declaration === "interface";
					
					// 判断是否存在逗号分隔符，如果有，则抛出错误
					if(
						content.indexOf(
							toMark(",", index)
						) > -1
					){
						// 抛出错误
						throw new ECMAScript6SyntaxError(
							(isInterface ? "接口" : "枚举") + "的属性必须以分号分隔，而不是逗号",
							str
						);
					}

					var isFirst = true, isShorthand = false,
						
						// 以"="为标识，分隔单个变量定义
						arr = body.split(
							toMark("=", index)
						);

					// 如果长度为1，说明分割"="无效，则为简写模式
					if(
						arr.length === 1
					){
						// 简写模式是以分号为标准分割
						arr = content.split(
							toMark(";", index)
						);

						isShorthand = true;
					}
					else {
						if(
							isInterface
						){
							throw new ECMAScript6SyntaxError("不应该对接口属性进行赋值", str);
						}
					}

					// 因为可能出现嵌套，理应再解析
					body = ECMAScript6EAI.parse(
						// 将单个变量语句替换成有效的、带逗号的对象属性
						arr.map(function(single){
							return single.replace(
								SHORTHAND_REGEXP,
								function(s, variable, vs){
									// 如果是简写模式
									if(
										isShorthand
									){
										// 简写模式都将替换为数组成员，故变量名应转成字符串
										if(
											vs === void 0
										){
											variable = '"' + variable + '"';
										}
									}
									else {
										// 如果不是简写模式，并且变量名称为字符串
										if(
											vs !== void 0	
										){
											// 抛出错误
											throw new ECMAScript6SyntaxError("非简写模式的枚举中，不应该将字符串作为变量名称。", str);
										}
									}

									// 如果是第一个变量语句，则不需要加上逗号
									if(
										isFirst
									){
										isFirst = false;

										return variable;
									}

									return toMark(",", index) + variable;
								}
							);
						})
						// 替换之前分割掉的"="或者";"
						.join(
							isShorthand ? "" : toMark(":", index)
						)
					);

					if(
						isShorthand
					){
						body = "[" + body + "]";
					}

					return getDeclaration(name, operator) + "new jQun." + (isInterface ? "Interface" : "Enum") + "(" + body + ")";
				}
			);
		}
	});

	return ECMAScript6EAI;
}(
	// PARSE_REGEXP
	replaceRegExp(
		/(${OperatorMark})?\s*\b(enum|interface)(?:\s+(${Variable}))?\s*(\0\{\0(\d+)\0(${All})\0\}\0\5\0)/g,
		SyntaxRegExp
	),
	// SINGLE_REGEXP
	replaceRegExp(
		/(?:\0;\0\d+\0\s*)*(${Variable})\s*$/g,
		SyntaxRegExp
	),
	// SHORTHAND_REGEXP
	replaceRegExp(
		/(?:\0;\0\d+\0\s*)*(${Variable}|(${String}))\s*$/g,
		SyntaxRegExp
	)
);

this.ECMAScript6BAO = function(PARSE_REGEXP, PARSER_INT, supported){
	function ECMAScript6BAO(){
		if(
			supported
		){
			return;
		}

		ECMAScript6SyntaxMarker.bind(/\b(?:0b|0B|0O|0o)/);
	};
	ECMAScript6BAO = new StaticClass(ECMAScript6BAO);

	ECMAScript6BAO.static({
		parse : function(code){
			if(
				supported
			){
				return code;
			}

			return code.replace(
				PARSE_REGEXP,
				function(str, binary, Octal){
					return PARSER_INT + "(" + (binary ? binary + ", 2" : Octal + ", 8" )+ ")";
				}
			);
		}
	});
	
	return ECMAScript6BAO;
}(
	// PARSE_REGEXP
	/(?:\0(?:0b|0B)\0\d+\0([01]+)|\0(?:0O|0o)\0\d+\0([0-7]+))\b/g,
	// PARSER_INT
	Number.parseInt ? "Number.parseInt" : "parseInt",
	// supported
	isSupported("0b1 + 0o1;")
);


this.ECMAScript6Object = function(PARSE_REGEXP, SINGLE_REGEXP, supported){
	function ECMAScript6Object(){
		
	};
	ECMAScript6Object = new StaticClass(ECMAScript6Object);

	ECMAScript6Object.static({
		defineProperties : function(obj, properties, _accessibleProperties){
			[
				properties,
				_accessibleProperties
			]
			.forEach(
				function(props, i){
					if(
						props
					){
						defineProperties(obj, props, this[i]);
					}
				},
				[
					{ enumerable : true },
					{ enumerable : true, gettable : true, settable : true }
				]
			);

			return obj;
		},
		parse : function(code){
			if(
				supported
			){
				return code;
			}

			return code.replace(
				PARSE_REGEXP,
				function(str, operator, index, body){
					var properties = [], computedProperties = [], computedAccessors = [];

					// 根据逗号分隔属性
					body.split(
							toMark(",", index)
						)
						.forEach(function(property){
							var parsed = false;

							property = ECMAScript6Function.perfectParse(
								property,
								// 匹配的到函数简写属性
								function(str, staticModifier, declaration, accessor, generator, name, computation, i, args, body){
									body = "(" + args + "){" + body + "}";

									// 如果存在计算名称
									if(
										computation
									){
										// 归属类型
										(
											accessor ? computedAccessors : computedProperties
										)
										.push(
											"{" +
												"name : " + computation + "," +
												"value : " + (
													accessor ?
														"{" + accessor + " : function" + body + "}" :
														"function " + (generator || "") + body
												) +
											"}"
										);

										return "";
									}

									// 如果存在访问器get、set
									if(
										accessor
									){
										// 按原来的返回，因为所有浏览器都已经支持
										return accessor + " " + name + body;
									}

									// 函数的简写转为基本写法
									return name + " : " + "function " + (generator || "") + body;
								},
								// 当匹配不到函数简写的属性时
								function(){
									return property.replace(
										SINGLE_REGEXP,
										function(s, key, i, computation, value){
											if(
												key === void 0
											){
												computedProperties.push("{ name : " + computation + ", value : " + value + " }");
											}
											else {
												// 将属性简写转成基本写法
												return key + ":" + key;
											}

											return "";
										}
									);
								}
							);

							// 当property不等于空字符串，则说明不属于计算类型的属性，并已解析成基本写法
							if(
								property !== ""
							){
								properties.push(
									// 因为可能出现嵌套，所以必须得再解析
									ECMAScript6Object.parse(property)
								);
							}

							return "";
						});

					if(
						computedProperties.length > 0 || computedAccessors.length > 0
					){
						return operator + " " +
							"jQun.ECMAScript6Object.defineProperties(" +
								"{" + properties.join(",") + "}" +
								[
									computedProperties,
									computedAccessors
								]
								.map(function(props, i){
									if(
										props.length === 0
									){
										return ", null";
									}

									return ",[" + props.join(",") + "]";
								})
								.join("") +
							")";
					}

					return operator + " " + "{" + properties.join(",") + "}";
				}
			);
		}
	});

	return ECMAScript6Object;
}(
	// PARSE_REGEXP
	replaceRegExp(
		/(${OperatorMark})\s*\0\{\0(\d+)\0(${All})\0\}\0(\2)\0/g,
		SyntaxRegExp
	),
	// SINGLE_REGEXP
	replaceRegExp(
		/^\s*(?:(${Variable})|\0\[\0(\d+)\0(${All})\0\]\0\2\0\s*:(${All}))\s*$/,
		SyntaxRegExp
	),
	// supported
	isSupported('var obj = { obj, name(){}, ["boolean"] : true };')
);

this.ECMAScript6Arguments = function(REST_REGEXP, statements, supported){
	function ECMAScript6Arguments(){
	
	};
	ECMAScript6Arguments = new StaticClass(ECMAScript6Arguments);

	ECMAScript6Arguments.static({
		parse : function(code){
			if(
				supported	
			){
				return code;
			}

			return ECMAScript6Function.parse(
				code,
				function(str, staticModifier, declaration, accessor, generator, name, computation, index, args, body){
					// 如果是
					if(
						statements.indexOf(name) > -1
					){
						return ECMAScript6Function.join(
							staticModifier,
							declaration,
							accessor,
							generator,
							name,
							computation,
							index,
							args,
							ECMAScript6Arguments.parse(body)
						);
					}

					var argumentNames = [], defaults = [], equalMark = toMark("=", index);

					args.split(
							toMark(",", index)
						)
						.forEach(function(single, i, arr){
							var result = single.split(equalMark);

							if(
								result.length === 1
							){
								if(
									single.indexOf("...") === -1
								){
									argumentNames.push(single);
									return;
								}

								var rest = single.match(REST_REGEXP);

								if(
									rest === null
								){
									throw new ECMAScript6SyntaxError("函数省略参数定义错误，请参考格式：function name(...args){};", str);
								}
								else {
									if(
										arr.length - 1 > i
									){
										throw new ECMAScript6SyntaxError("定义函数省略参数，应该是参数的最后一个参数", str);
									}

									defaults.unshift(
										"var " + rest[1] + " = jQun.toArray(arguments, " + i + ");"
									);
								}

								return;
							}

							var name = result[0];

							argumentNames.push(name);

							defaults.push(
								name + " = " + name + " === void 0 ? " + result[1] + " : " + name + ";"
							);
						});

					return ECMAScript6Function.join(
						staticModifier,
						declaration,
						accessor,
						generator,
						name,
						computation,
						index,
						argumentNames.join(","),
						ECMAScript6Arguments.parse(
							defaults.join("") + body
						)
					);
				}
			);
		}
	});

	return ECMAScript6Arguments;
}(
	// REST_REGEXP
	replaceRegExp(
		/^\s*\.{3}\s*(${Variable})\s*$/,
		SyntaxRegExp
	),
	// statements
	["if", "for", "while", "switch", "with", "catch"],
	// supported
	isSupported("function name(value = 1, ...others){};")
);

this.ECMAScript6Destructuring = function(PARSE_REGEXP){
	function ECMAScript6Destructuring(){
	
	};
	ECMAScript6Destructuring = new StaticClass(ECMAScript6Destructuring);

	ECMAScript6Destructuring.static({
		parse : function(code){
			return code.replace(
				PARSE_REGEXP,
				function(str, index1, index2, names, value){
					var index = index1 === void 0 ? index2 : index1;

					//console.log(arguments);
					return "a = 1";
				}
			);
		}
	});

	return ECMAScript6Destructuring;
}(
	// PARSE_REGEXP
	replaceRegExp(
		/\0(?:\[\0(\d+)|\{\0(\d+))\0(${All})\0(?:\]\0\1|\}\0\2)\0\s*\0=\0\d+\0\s*(\0(?:\[\0(\d+)|\{\0(\d+))\0${All}\0(?:\]\0\5|\}\0\6)\0)/g,
		SyntaxRegExp
	)
);

this.ECMAScript6 = function(ECMAScript6Mode, ecmaScript6SyntaxMarker, previousParsers, extensibleParsers, nextParsers, toString){
	function ECMAScript6(code, callback){
		console.time("es6");

		code = typeof code === "function" ? toString.call(code) : code;
		// 将一些需要语法进行标记，便于解析
		code = ecmaScript6SyntaxMarker.mark(code);

		code = ECMAScript6Mode.parse(
			code,
			function(str, extensible){
				// 以下解析必须按一定顺序进行，跟优先级有关
				[
					previousParsers, extensibleParsers, nextParsers
				]
				.forEach(
					function(parsers, i){
						if(
							parsers === extensibleParsers
						){
							if(
								!extensible	
							){
								return;
							}
						}

						parsers.forEach(this);
					},
					function(Parser){
						str = Parser.parse(str, extensible);
					}
				);

				return str;
			}
		);

		code = ECMAScript6.format(code, true);

		// 去掉标记
		code = ecmaScript6SyntaxMarker.unmark(code);

		console.timeEnd("es6");
		callback(code);
	};
	ECMAScript6 = new Class(ECMAScript6);

	ECMAScript6.static({
		format : function(code, _marked){
			return code;
		}
	});

	return ECMAScript6;
}(
	this.ECMAScript6Mode,
	// ecmaScript6SyntaxMarker
	new ECMAScript6SyntaxMarker(),
	// previousParsers
	[
		// 先解析模板，因为模板可以换行，而且还可能会存在一些\0标记
		this.ECMAScript6Template,
	],
	// extensibleParsers
	[
		this.ECMAScript6StaticClass,
		this.ECMAScript6EAI
	],
	// nextParsers
	[
		this.ECMAScript6Arguments,
		this.ECMAScript6Class,
		this.ECMAScript6BAO,
		this.ECMAScript6Object,
		this.ECMAScript6Destructuring
	],
	Function.prototype.toString
);

defineProperties(jQun, this);
}(
	jQun,
	this.SyntaxRegExp,
	this.SyntaxMarker,
	this.ECMAScript6SyntaxMarker,
	this.ECMAScript6SyntaxError,
	this.ECMAScript6Function,
	this.ECMAScript6ClassMethod,
	jQun.defineProperties
);

}(
	jQun.Class,
	jQun.StaticClass,
	jQun.Enum,
	// replaceRegExp
	function(regx, SyntaxRegExp, _alias){
		var alias = _alias || {};

		return new RegExp(
			regx.source
				.replace(
					/\$\{(\w+)\}/g,
					function(str, name){
						if(
							name in alias
						){
							name = alias[name];
						}

						return SyntaxRegExp[name].source;
					}
				),
			[
				"global", "multiline", "ignoreCase"
			]
			.map(function(flag){
				return regx[flag] ? flag.substring(0, 1) : "";
			})
			.join("")
		);
	},
	// toMark
	function(str, i, _multiple){
		if(
			_multiple
		){
			return str.split(
					""
				)
				.map(function(s){
					return "\0" + s + "\0" + i + "\0";
				})
				.join("");
		}

		return "\0" + str + "\0" + i + "\0";
	},
	// getDeclaration
	function(name, operator){
		return operator ?
			operator + " " :
			name ?
				"var " + name + "=" :
				"";
	},
	// isSupported
	function(code){
		try {
			new Function('"use strict";' + code);

			// 打开测试环境，即所有的都必须解析
			return false;
			//return true;
		}
		catch(e){
			return false;
		}
	}
);

var filename = "es6.js";
new jQun.RequestConnection("", filename, null, jQun.RequestMethod.Get ,jQun.ResponseType.Text).open(null, function(response){

new jQun.ECMAScript6(response, function(code){
	//console.log(code);
	new Function(code + "\n//# sourceURL=" + jQun.Ajax.requestURLPrefix + filename)();
});
});