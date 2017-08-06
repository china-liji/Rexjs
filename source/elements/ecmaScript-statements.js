// 语句块相关
~function(Statements){

this.ECMAScriptVariableCollections = function(VariableCollections, VariableCollection){
	/**
	 * 变量名收集器集合
	 * @param {VariableIndex} index - 变量名索引
	 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
	 */
	function ECMAScriptVariableCollections(index, _prevCollections){
		VariableCollections.call(this, index);

		this.initBlackList(_prevCollections);
		this.initConst(_prevCollections);
		this.initDeclaration(_prevCollections);
		this.initRex(_prevCollections);
	};
	ECMAScriptVariableCollections = new Rexjs(ECMAScriptVariableCollections, VariableCollections);

	ECMAScriptVariableCollections.props({
		blacklist: null,
		const: null,
		declaration: null,
		/**
		 * 生成一个临时变量名，并记搜集到 rex 变量名集合中
		 */
		generate: function(){
			var variable = this.provide();

			this.rex.collect(variable);
			return variable;
		},
		/**
		 * 初始化黑名单变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initBlackList: function(){
			this.blacklist = new VariableCollection();
		},
		/**
		 * 初始化常量变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initConst: function(){
			this.const = new VariableCollection();
		},
		/**
		 * 初始化声明变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initDeclaration: function(){
			this.declaration = new VariableCollection();
		},
		/**
		 * 初始化 rex 临时变量名
		 * @param {ECMAScriptVariableCollections} _prevCollections - 可参考上一个收集器集合
		 */
		initRex: function(){
			this.rex = new VariableCollection();
		},
		rex: null
	});

	return ECMAScriptVariableCollections;
}(
	Rexjs.VariableCollections,
	Rexjs.VariableCollection
);

this.ECMAScriptStatements = function(ECMAScriptStatement, extractTo){
	/**
	 * ECMAScript 语句块
	 * @param {ECMAScriptVariableCollections} collections - 变量名收集器集合
	 */
	function ECMAScriptStatements(collections){
		Statements.call(this);

		// 初始化变量名集合
		this.collections = collections;
	};
	ECMAScriptStatements = new Rexjs(ECMAScriptStatements, Statements);

	ECMAScriptStatements.props({
		/**
		 * 获取当前所处闭包
		 */
		get closure(){
			return this.target.closure;
		},
		/**
		 * 申请应用 super 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 */
		applySuper: function(parser, context){
			// 报错
			parser.error(
				context,
				ECMAScriptErrors.template("KEYWORD", context.content)
			);

			return 0;
		},
		/**
		 * 申请父类调用
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - super 关键字上下文
		 * @param {Context} open - 起始父类调用小括号标签上下文
		 */
		applySuperCall: function(parser, context, open){
			return this.applySuper(parser, context);
		},
		/**
		 * 申请应用 this 关键字
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - this 关键字上下文
		 */
		applyThis: function(){
			// 什么也不做，即默认允许应用
		},
		collections: null,
		/**
		 * 声明变量名
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		declareTo: function(contentBuilder){
			// 添加临时变量名
			contentBuilder.appendString(
				this.collections.rex.toString("var ", ",", ";")
			);
		},
		/**
		 * 提取语句块文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 插入变量名
			this.declareTo(contentBuilder);
			// 调用父类方法
			extractTo.call(this, contentBuilder);
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new ECMAScriptStatement(this);
		}
	});

	return ECMAScriptStatements;
}(
	this.ECMAScriptStatement,
	Statements.prototype.extractTo
);

this.GlobalStatements = function(ECMAScriptStatements, ECMAScriptVariableCollections, VariableIndex){
	/**
	 * 全局语句块
	 */
	function GlobalStatements(){
		ECMAScriptStatements.call(
			this,
			new ECMAScriptVariableCollections(
				new VariableIndex()
			)
		);
	};
	GlobalStatements = new Rexjs(GlobalStatements, ECMAScriptStatements);

	GlobalStatements.props({
		/**
		 * 获取当前所处闭包
		 */
		get closure(){
			return null;
		}
	});

	return GlobalStatements;
}(
	this.ECMAScriptStatements,
	this.ECMAScriptVariableCollections,
	Rexjs.VariableIndex
);

}.call(
	this,
	Rexjs.Statements
);