// 基础依赖类
new function(Rexjs, URL_REGEXP, DIR_SEPARATOR_REGEXP, encodeURI, getUrlInfo){

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
						if(this.indexOf(item) > -1){
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
				if(List.prototype.hasOwnProperty(name)){
					return;
				}

				if(name === "toString"){
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

this.URL = function(toString, parse){
	/**
	 * 地址
	 * @param {String} urlString - 地址字符串
	 * @param {String} _baseURLstring - 基准地址
	 */
	function URL(urlString, _baseURLstring){
		// 如果提供的是 null 或 undefined
		if(urlString == null){
			return;
		}

		// 转化为字符串
		urlString = toString(urlString);

		// 如果解析后存在 protocal 或者 没有提供基础路径
		if(parse(this, urlString) || !_baseURLstring){
			return;
		}

		var baseURL = new URL(_baseURLstring);

		parse(
			this,
			(
				baseURL.protocal + "//" + baseURL.host +
				// 如果是根目录路径，则忽略 dirname
				(urlString[0] === "/" ? "" : baseURL.dirname + "/") +
				urlString
			)
		);
	};
	URL = new Rexjs(URL);

	URL.props({
		ext: "",
		dirname : "",
		filename: "",
		hash : "",
		/**
		 * 获取主机地址
		 */
		get host(){
			var hostname = this.hostname;

			// 如果存在 hostname
			if(hostname){
				var port = this.port;

				// 拼接 host
				return hostname + (port ? ":" + port : "");
			}

			// 返回空字符串
			return "";
		},
		hostname : "",
		/**
		 * 获取完整连接
		 */
		get href(){
			var protocal = this.protocal;

			return (
				(
					protocal ?
						protocal + (
							this.host ?
								"//" + (this.username ? this.username + "@" : "") + this.host :
								"/"
						) :
						""
				) +
				this.pathname + this.search + this.hash
			);
		},
		/**
		 * 获取域地址
		 */
		get origin(){
			var host = this.host;

			// 如果 host 存在
			if(host){
				return this.protocal + "//" + host;
			}

			return "";
		},
		/**
		 * 获取路径名
		 */
		get pathname(){
			var filename = this.filename, dirname = this.dirname;

			// 如果文件名存在
			if(filename){
				// 拼接目录名和文件名
				return dirname + (dirname[dirname.length - 1] === "/" ? "" : "/") + filename;
			}

			// 直接返回目录名
			return dirname;
		},
		port : "",
		protocal : "",
		search : "",
		/**
		 * 转化为字符串
		 */
		toString : function(){
			return this.href;
		},
		username: ""
	});

	return URL;
}(
	// toString
	function(urlString){
		// 如果不是字符串
		if(typeof urlString !== "string"){
			// 如果是 undefined 或者 null，则为空字符串，否则为 toString 的返回值
			urlString = urlString == null ? "" : urlString.toString();
		}
		
		// 返回转码后的字符串
		return encodeURI(
			urlString.trim()
		);
	},
	// parse
	function(url, urlString){
		// 匹配地址
		var result = urlString.match(URL_REGEXP);
		
		// 如果没有匹配结果
		if(!result){
			// 报错
			throw "Invalid URL: " + urlString;
		}
		
		var dirnameArray = [],

			protocal = getUrlInfo(result, 1).toLowerCase(),

			dirname = getUrlInfo(result, 5),

			filename = getUrlInfo(result, 6);

		url.protocal = protocal;
		url.hostname = getUrlInfo(result, 3).toLowerCase();
		url.username = getUrlInfo(result, 2);
		url.port = getUrlInfo(result, 4);
		url.filename = filename;
		url.ext = getUrlInfo(result, 7);
		url.search = getUrlInfo(result, 8);
		url.hash = getUrlInfo(result, 9);

		// 判断协议
		switch(protocal){
			// 如果是 http
			case "http:":
			// 如果是 https
			case "https:":
				// 如果主机名不存在
				if(!url.hostname){
					return false;
				}

				break;
			
			// 如果没有 protocal
			case "":
				break;

			default: {
				var index;
		
				// 还原链接字符串
				urlString = decodeURI(urlString);
				
				switch(true){
					// 如果存在 search
					case url.search.length > 0 :
						// 设置 index
						index = urlString.indexOf("?");
						break;
					
					// 如果存在 hash
					case url.hash.length > 0 :
						// 设置 index
						index = urlString.indexOf("#");
						break;

					default :
						// 设置 index
						index = urlString.length;
						break;
				}

				// 清空 host 与 port
				url.hostname = url.port = "";

				// 如果是 dataURL
				if(protocal === "data:"){
					// 直接设置 dirname
					url.dirname = urlString.substring(protocal.length, index);
					// 清空 filename 与 ext
					url.filename = url.ext = "";
					return true;
				}
				
				// 重置 url 部分属性
				dirname = urlString.substring(protocal.length, index - filename.length);
				// 解码 search
				url.search = decodeURI(url.search);
				// 解码 hash
				url.hash = decodeURI(url.hash);
				break;
			}
		}
		
		// 分割路径
		dirname
			.split(
				DIR_SEPARATOR_REGEXP
			)
			.forEach(function(name){
				switch(name){
					// 如果是1点，说明是保持当前层目录，不需要做任何处理
					case "." :
						break;
					
					// 如果是2点，说明是返回上一层目录，则去掉数组的最后一个
					case ".." :
						dirnameArray.splice(dirnameArray.length - 1);
						break;
						
					case "" :
						break;
					
					// 添加目录
					default :
						dirnameArray.push(name);
						break;
				}
			});

		// 如果 文件名不存在 而且 路径名最后是 "/"
		if(!filename && dirname[dirname.length - 1] === "/"){
			// 那么添加空字符串，方便下面的 dirname 在末尾加上 "/"
			dirnameArray.push("");
		}

		// 设置 dirname
		url.dirname = "/" + dirnameArray.join("/");
		return protocal.length > 0;
	}
);

Rexjs.static(this);
}(
	Rexjs,
	// URL_REGEXP
	/^(?:([^:/?#.]+:)(?:\/+(?:([^/?#]*)@)?([\w\d\-\u0100-\uffff.%]*)(?::([0-9]+))?)?)?(?:([^?#]*?)([^\/]+?(\.[^.?#\/]+))?)?(?:(\?[^#]*))?(?:(#.*))?$/,
	// DIR_SEPARATOR_REGEXP
	/\/|\\/g,
	encodeURI,
	// getUrlInfo
	function(result, index){
		return result[index] || "";
	}
);