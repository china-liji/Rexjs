// ECMAScript 解析器相关
!function(SyntaxParser, ECMAScriptTags, TAGS_NAME_REGEXP){

this.ECMAScriptTagsMap = function(SyntaxTagsMap, dataArray){
	/**
	 * ECMAScript 标签列表映射，初始化该类是个耗性能过程，建议作为单例使用
	 */
	function ECMAScriptTagsMap(){
		SyntaxTagsMap.call(this);
		
		dataArray.forEach(
			function(data){
				this.map(
					data.name,
					new data.tags()
				);
			},
			this
		);
	};
	ECMAScriptTagsMap = new Rexjs(ECMAScriptTagsMap, SyntaxTagsMap);

	ECMAScriptTagsMap.static({
		/**
		 * 绑定标签列表
		 * @param {String} name - 标签列表的唯一名称
		 * @param {SyntaxTags} SyntaxTags - 需要绑定的标签列表
		 */
		bind: function(name, SyntaxTags){
			// 如果不存在数据数组中
			if(dataArray.every(function(data){
				// 如果名称一致
				if(data.name === name){
					// 设置标签列表
					data.tags = SyntaxTags;
					return false;
				}

				return true;
			})){
				// 追加新项
				dataArray.push({
					name: name,
					tags: SyntaxTags
				});
			}
		}
	});
	
	return ECMAScriptTagsMap;
}(
	Rexjs.SyntaxTagsMap,
	// dataArray
	Object
		.getOwnPropertyNames(this)
		.filter(
			function(name, i){
				return this[name].prototype instanceof ECMAScriptTags;
			},
			this
		)
		.map(
			function(name){
				var n, result = name.match(TAGS_NAME_REGEXP);

				if(result){
					n = result[1].toLowerCase() + result[2];
				}
				else {
					n = name[0].toLowerCase() + name.substring(1);
				}

				return {
					name: n,
					tags: this[name]
				};
			},
			this
		)
);

this.ECMAScriptParser = function(SourceBuilder, MappingBuilder, ECMAScriptTagsMap, GlobalStatements, tagsMap, sourceMaps, parse){
	/**
	 * ECMAScript 语法解析器
	 */
	function ECMAScriptParser(){
		SyntaxParser.call(this);
	};
	ECMAScriptParser = new Rexjs(ECMAScriptParser, SyntaxParser);

	ECMAScriptParser.static({
		/**
		 * 获取编译配置
		 */
		get config(){
			return config;
		},
		/**
		 * 设置编译配置
		 * @param {SyntaxConfig} value - 需要设置的配置
		 */
		set config(value){
			config = value;
		},
		/**
		 * 获取是否应该生成 sourceMaps
		 */
		get sourceMaps(){
			return sourceMaps;
		},
		/**
		 * 设置是否应该生成 sourceMaps
		 * @param {Boolean} value - 是否应该生成 sourceMaps
		 */
		set sourceMaps(value){
			sourceMaps = value;
		}
	});

	ECMAScriptParser.props({
		/**
		 * 将解析后的语法生成字符串
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 * @param {Boolean} _withoutModule - 不采用模块形式的入口
		 */
		build: function(_contentBuilder, _withoutModule){
			var file = this.file, url = file.url;

			_contentBuilder = _contentBuilder || (
				// 如果提供了文件路径
				url.href ?
					(
						sourceMaps ? new MappingBuilder(file) : new SourceBuilder(file)
					) :
					// 如果没有提供文件路径
					new ContentBuilder()
			);

			// 追加闭包函数起始部分
			_contentBuilder.appendString(
				(_withoutModule ? "!" : 'new Rexjs.Module("' + url.href + '",') + "function(Rexjs){"
			);

			// 创建新行
			_contentBuilder.newline();
			// 追加严格表达式字符串
			_contentBuilder.appendString('"use strict";');
			// 创建新行
			_contentBuilder.newline();

			// 提取语法列表内容
			this.statements.extractTo(_contentBuilder);

			// 创建新行
			_contentBuilder.newline();
			// 追加闭包函数结束部分
			_contentBuilder.appendString("}" + (_withoutModule ? ".call(this, Rexjs)" : ")") + ";");

			return _contentBuilder.complete();
		},
		defaultExported: false,
		deps: null,
		/**
		 * 开始解析
		 * @param {File} file - 文件信息
		 */
		parse: function(file){
			this.deps = [];

			parse.call(
				this,
				file,
				/*
					如果 tagsMap 没有初始化，则初始化，
					在这里初始化的目的是为了：
					1. 当不使用 ECMAScriptParser 时，不会耗性能
					2. 就算多次使用 ECMAScriptParser，也不会多次初始化 ECMAScriptTagsMap
				*/
				tagsMap || (tagsMap = new ECMAScriptTagsMap()),
				new GlobalStatements()
			);
		}
	});

	return ECMAScriptParser;
}(
	Rexjs.SourceBuilder,
	Rexjs.MappingBuilder,
	this.ECMAScriptTagsMap,
	this.GlobalStatements,
	// tagsMap
	null,
	// sourceMaps
	false,
	SyntaxParser.prototype.parse
);

}.call(
	this,
	Rexjs.SyntaxParser,
	this.ECMAScriptTags,
	// TAGS_NAME_REGEXP
	/^([A-Z]+)([A-Z][^A-Z].*)$/
);