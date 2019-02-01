new function(Rexjs, Module, document, forEach){

// 浏览器环境中的模块编译器相关
!function(ModuleCompiler){

this.HTMLCompiler = function(URL_PREFIX_REGEXP){
	/**
	 * HTML 编译器
	 */
	function HTMLCompiler(){
		ModuleCompiler.call(this);
	};
	HTMLCompiler = new Rexjs(HTMLCompiler, ModuleCompiler);

	HTMLCompiler.props({
		/**
		 * 编译模块
		 * @param {Module} module - 编译的模块
		 */
		compile: function(module){
			var url = new URL(module.name.href);

			// 设置依赖
			this.deps = [];

			// 设置结果
			this.result = module.origin.replace(
				URL_PREFIX_REGEXP,
				url.origin + url.dirname + "/"
			);
		},
		/**
		 * 执行模块编译结果
		 * @param {Module} module - 编译的模块
		 */
		exec: function(module){
			var compiler = this;

			// 加载模块
			module.load(function(){
				// 设置默认输出
				Module.export("compiler", compiler);
				// 设置默认输出
				Module.export("default", compiler.result);
			});
		}
	});

	return HTMLCompiler;
}(
	// URL_PREFIX_REGEXP
	/to:\/\/|~\//ig
);

this.CSSSelectorMap = function(CSS_SELECTOR_REGEXP, SEPARATOR_REGEXP, cache, postfix, getOwnPropertyNames, hasOwnProperty){
	/**
	 * CSS 选择器映射表
	 * @param {String} namespaceURI - 映射表命名空间地址
	 */
	function CSSSelectorMap(namespaceURI){
		// 创建一个新的映射表
		cache[namespaceURI] = this;
	};
	CSSSelectorMap = new Rexjs(CSSSelectorMap);

	CSSSelectorMap.static({
		/**
		 * 根据命名空间地址获取映射表，如果没有则创建一个并返回
		 * @param {String} namespaceURI - 映射表命名空间地址
		 */
		getSelectorMapByNS: function(namespaceURI){
			// 如果存在
			if(hasOwnProperty.call(cache, namespaceURI)){
				return cache[namespaceURI];
			}

			// 返回新建的映射表
			return new CSSSelectorMap(namespaceURI);
		}
	});

	CSSSelectorMap.props({
		/**
		 * 合并其他选择器映射表
		 * @param {Array.<CSSSelectorMap>} mapList - 其他的选择器映射表
		 */
		merge: function(mapList){
			var cssSelectorMap = this;

			// 遍历列表
			mapList.forEach(
				function(map){
					// 如果是同一个
					if(map === cssSelectorMap){
						// 不处理
						return;
					}

					// 遍历属性名
					getOwnPropertyNames(map).forEach(this, map);
				},
				function(key){
					// 如果已经有该属性
					if(hasOwnProperty.call(cssSelectorMap, key)){
						return;
					}

					// 设置属性
					cssSelectorMap[key] = this[key];
				}
			);
		},
		/**
		 * 解析选择器
		 * @param {String} selectorText - 选择器文本
		 */
		parse: function(selectorText){
			var cssSelectorMap = this;

			// 返回替换后的字符串
			return (
				selectorText.replace(
					CSS_SELECTOR_REGEXP,
					function(str){
						var key, selector = str.substring(1);

						// 获取 key
						key = selector.replace(
							SEPARATOR_REGEXP,
							function(s){
								return s[1].toUpperCase();
							}
						);

						// 如果没有该属性
						if(!hasOwnProperty.call(cssSelectorMap, key)){
							postfix++;
							// 设置属性
							cssSelectorMap[key] = selector + "-" + postfix.toString(16);
						}

						// 返回结果
						return str[0] + cssSelectorMap[key];
					}
				)
			);
		}
	});

	return CSSSelectorMap;
}(
	// CSS_SELECTOR_REGEXP
	/(?:#|\.)[^#.[+~*>:,\s]+/g,
	// SEPARATOR_REGEXP
	/(?:-|_)\w/g,
	// cache
	{},
	// postfix - 起始 2560 ~ 2816 16 进制后最少有 3 位数，且第一位应该为字母
	Math.round(2560 + Math.random() * 256),
	Object.getOwnPropertyNames,
	Object.prototype.hasOwnProperty
);

this.CSSCompiler = function(CSSSelectorMap, CSSRule, CSS_URL_REGEXP, enableSelectorMap, parse, merge, appendStyleTo){
	/**
	 * CSS 编译器
	 * @param {String} cssText - 源文本
	 * @param {String} sourceURL - 文件地址
	 */
	function CSSCompiler(cssText, sourceURL){
		ModuleCompiler.call(this);
	};
	CSSCompiler = new Rexjs(CSSCompiler, ModuleCompiler);

	CSSCompiler.static({
		/**
		 * 禁止使用选择器解析器
		 */
		disableSelectorMap: function(){
			enableSelectorMap = false;
		}
	});

	CSSCompiler.props({
		/**
		 * 编译模块
		 * @param {Module} module - 编译的模块
		 */
		compile: function(module){
			var sourceURL = module.name.href;
			
			// 初始化引用
			this.deps = [];

			// 处理 css 源文本
			cssText = this.compileURLs(module.origin, sourceURL);

			// 如果需要启用选择器映射
			if(enableSelectorMap){
				// 设置属性
				this.selectorMap = new CSSSelectorMap(sourceURL);

				// 编译选择器
				cssText = this.compileSelectors(
					appendStyleTo(
						cssText,
						document.implementation.createHTMLDocument("").head
					)
					.sheet
					.cssRules
				);
			}

			// 追加 sourceURL
			this.result = cssText + "\n/*# sourceURL=" + sourceURL + " */";
		},
		/**
		 * 编译 CSS 选择器
		 * @param {CSSRuleList} cssRules - css 规则列表
		 */
		compileSelectors: function(cssRules){
			var result = "";

			// 遍历规则
			forEach(
				cssRules,
				function(rule){
					// 判断类型
					switch(rule.type){
						// 如果是 style 规则
						case CSSRule.STYLE_RULE:
							// 解析选择器
							result += parse.call(this.selectorMap, rule.selectorText) + "{" + rule.style.cssText + "}";
							return;

						// 如果是 @media 规则
						case CSSRule.MEDIA_RULE:
							result += "@media " + rule.conditionText;
							break;

						// 如果是 @keyframes 规则
						case CSSRule.KEYFRAMES_RULE:
							result += "@keyframes " + rule.name;
							break;

						// 如果是 @supports 规则
						case CSSRule.SUPPORTS_RULE:
							result += "@supports " + rule.conditionText;
							break;

						// 如果是 @import 规则
						case CSSRule.IMPORT_RULE:
							this.deps.push(rule.href);
							return;

						// 如果是 @namespace 规则
						case CSSRule.NAMESPACE_RULE:
							// 如果是选择器映射空间
							if(rule.prefix === "selector-map"){
								this.selectorMap = CSSSelectorMap.getSelectorMapByNS(rule.namespaceURI);
								return;
							}

						// 其他
						default:
							result += rule.cssText;
							return;
					}

					// 追加起始大括号
					result += "{";
					// 继续编译子规则的选择器
					result += this.compileSelectors(rule.cssRules);
					// 追加结束大括号
					result += "}";
				},
				this,
				true
			);

			return result;
		},
		/**
		 * 编译 URL，将地址转为绝对路径
		 * @param {String} cssText - css 文本内容
		 * @param {String} sourceURL - 当前 css 文件的文件地址
		 */
		compileURLs: function(cssText, sourceURL){
			return cssText.replace(
				CSS_URL_REGEXP,
				function(str, urlStart, urlQuote, url, urlEnd){
					// 如果 url 不存在
					if(!url){
						return str;
					}

					// 返回 url
					return urlStart + new URL(url, sourceURL).href + urlEnd;
				}
			);
		},
		/**
		 * 执行模块编译结果
		 * @param {Module} module - 编译的模块
		 */
		exec: function(module){
			var compiler = this, selectorMap = this.selectorMap;

			// 合并选择器映射表
			merge.call(
				selectorMap,
				module.imports.map(function(mod){
					// 返回依赖模块的选择器映射
					return mod.compiler.selectorMap;
				})
			);

			// 添加到文档中
			this.style = appendStyleTo(this.result, document.head);

			// 加载模块
			module.load(function(){
				// 设置默认输出
				Module.export("compiler", compiler);
				// 设置默认输出
				Module.export("default", selectorMap);
			});
		},
		selectorMap: null,
		style: null
	});

	return CSSCompiler;
}(
	this.CSSSelectorMap,
	CSSRule,
	// CSS_URL_REGEXP
	new RegExp(
		[
			// 注释正则
			/\/\*[\s\S]*?\*\//.source,
			// 字符串正则
			/"(?:\\(?:[^\r]|\r\n?)|[^"\\\r\n\u2028\u2029]+)*"|'(?:\\(?:[^\r]|\r\n?)|[^'\\\r\n\u2028\u2029]+)*'/.source,
			// 路径正则
			/(\burl\s*\(\s*(['"]?))(.*?)(\2\s*\))/.source
		]
		.join("|"),
		"g"
	),
	// enableSelectorMap
	true,
	this.CSSSelectorMap.prototype.parse,
	this.CSSSelectorMap.prototype.merge,
	// appendStyleTo
	function(cssText, parentElement){
		var style = document.createElement("style");

		style.type = "text/css";
		style.textContent = cssText;

		parentElement.appendChild(style);
		return style;
	}
);

}.call(
	this,
	Rexjs.ModuleCompiler
);


// 模块于 浏览器环境 与 node 环境兼容相关
!function(ModuleReady, ECMAScriptParser, URL, baseElement){

this.BrowserReady = function(HTMLCompiler, CSSCompiler, XMLHttpRequest, BASE_URL, domContentLoaded){
	/**
	 * 浏览器模块系统准备就绪
	 */
	function BrowserReady(){
		var compilers;

		ModuleReady.call(this);

		compilers = this.compilers;
		compilers[".html"] = HTMLCompiler;
		compilers[".css"] = CSSCompiler;

		// 监听 DOMContentLoaded
		document.addEventListener("DOMContentLoaded", domContentLoaded);
	};
	BrowserReady = new Rexjs(BrowserReady, ModuleReady);

	BrowserReady.props({
		/**
		 * 解析模块名称
		 * @param {String} moduleName - 模块名称
		 * @param {String} _baseUrlString - 基础地址
		 */
		parseName: function(moduleName, _baseUrlString){
			var url = new URL(
				moduleName,
				_baseUrlString ? new URL(_baseUrlString, BASE_URL).href : BASE_URL
			);

			// 如果文件名不存在
			if(url.filename === ""){
				var pathname = url.pathname;

				return new URL(
					url.protocal + "//" + url.host + (pathname ? pathname : "/index") + (url.ext ? "" : ".js") + url.search + url.hash
				);
			}

			return url;
		},
		/**
		 * 读取文件内容
		 * @param {ModuleName} moduleName - 文件路径
		 * @param {Function} success - 成功回调
		 * @param {Function} fail - 失败回调
		 * @param {Boolean} _sync - 是否为同步
		 */
		readFile: function(moduleName, success, fail, _sync){
			var request = new XMLHttpRequest();

			// 监听 onload 事件
			request.addEventListener(
				"load",
				function(){
					(this.status === 200 ? success : fail)(this.responseText);
				}
			);
			
			// 打开请求，采用异步 get 方式
			request.open("get", moduleName.href, !_sync);
			// 发送请求
			request.send();
		}
	});

	return BrowserReady;
}(
	this.HTMLCompiler,
	this.CSSCompiler,
	XMLHttpRequest,
	// BASE_URL
	new URL(
		baseElement ? baseElement.getAttribute("href") : "./",
		location.href
	)
	.href,
	// domContentLoaded
	function(){
		var count = 0;

		// 遍历元素
		forEach(
			document.querySelectorAll('script[type="text/rexjs"]'),
			function(script){
				// 如果存在 src 属性
				if(script.hasAttribute("src")){
					// 如果要生成 sourceMaps
					if(script.hasAttribute("data-sourcemaps")){
						// 开启 sourceMaps
						Rexjs.ECMAScriptParser.sourceMaps = true;
					}

					// 初始化模块
					new Module(
						script.getAttribute("src")
					);
					return;
				}

				// 初始化内联模块
				new Module("inline-script-" + count++ +".js", script.textContent);
			},
			null,
			true
		);
	}
);

}.call(
	this,
	Rexjs.ModuleReady,
	Rexjs.ECMAScriptParser,
	Rexjs.URL,
	// baseElement
	document.querySelector("base")
);

new this.BrowserReady();
Rexjs.static(this);
}(
	Rexjs,
	Rexjs.Module,
	document,
	Rexjs.forEach
);