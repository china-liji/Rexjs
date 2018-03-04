new function(Rexjs, File, String){

this.SimpleTest = function(ECMAScriptParser, XMLHttpRequest, Error, INNER_CONTENT_REGEXP, file, console, toArray, e, catchErrors){
	/**
	 * 解析器测试
	 */
	function SimpleTest(){};
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
			var parser = new ECMAScriptParser();
			
			try {
				// 设置文件源代码
				file.source = source;
				
				// 解析文件
				parser.parse(file);
				// 如果进入这里，说明上面解析没有报错，而我们是希望报错的，说明解析有 bug
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
		/**
		 * 测试结果为真的代码，即代码正确解析
		 * @param {String} description - 该测试的描述
		 * @param {String} source - 需要测试的代码
		 * @param {Boolean} _eval - 代码解析完，是否需要立马执行
		 * @param {Function} _callbacks - 解析成功后的分析回调
		 */
		true: function(description, source, _eval, _callbacks){
			try {
				var parser = new ECMAScriptParser(), result = "";
				
				// 设置文件源代码
				file.source = source;
				
				// 解析文件
				parser.parse(file);
				
				// 如果需要执行
				if(_eval){
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
				console.error(
					"Fail: " + description + " - " + (e instanceof Error ? e.stack : e),
					e
				);
			}
		},
		unit: function(deps, callback){
			var length = deps.length;

			if(length === 0){
				callback.call(this);
				return;
			}

			var test = this, testTexts = [];

			deps.forEach(
				function(u, i, all){
					var request = new XMLHttpRequest();

					request.onload = function(){
						if(this.status !== 200){
							return;
						}

						testTexts.push(this.responseText);

						if(--length !== 0){
							return;
						}

						callback.apply(test, testTexts);
					};

					request.open("get", u, true);
					request.send();
				}
			);
		}
	});
	
	return SimpleTest;
}(
	Rexjs.ECMAScriptParser,
	XMLHttpRequest,
	Error,
	// INNER_CONTENT_REGEXP
	/\{([\s\S]*)\}\s*$/,
	// file
	new File(
		new Rexjs.URL("test.js"),
		""
	),
	console,
	Rexjs.toArray,
	eval,
	// catchErrors
	function(description, callbacks, parser, error){
		// 遍历回调
		return !callbacks.every(function(callback){
			var err = callback(parser, error);
			
			if(!err){
				return true;
			}

			// 输出错误
			console.error(
				description + " - Callback Error" + (
					err instanceof String ? ":" + err : "!"
				)
			);

			return false;
		});
	}
);

Rexjs.static(this);
}(
	Rexjs,
	Rexjs.File,
	String
);